import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, "../src/content/posts");
const R2_DEST_DIR = "/home/pgntgz/r2/posts";
const CDN_BASE_URL = "https://box.pgntgz.top/posts";

// 常见图片扩展名正则
const IMAGE_EXT_REGEX = /\.(png|jpg|jpeg|gif)$/i;

async function exists(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function getPostFolders(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const folders = [];
	for (const entry of entries) {
		if (entry.isDirectory()) {
			folders.push(path.join(dir, entry.name));
		}
	}
	return folders;
}

async function run() {
	console.log("🚀 开始启动图片转换与 R2 迁移脚本...");

	// 确认 R2 挂载目录存在
	if (!(await exists("/home/pgntgz/r2"))) {
		console.error("✘ 错误: 未检测到 /home/pgntgz/r2 挂载点，请确认 R2 存储桶已成功挂载本地！");
		process.exit(1);
	}

	const postFolders = await getPostFolders(POSTS_DIR);
	console.log(`发现 ${postFolders.length} 个文章文件夹。`);

	let totalConverted = 0;
	let totalReferencesReplaced = 0;

	for (const folder of postFolders) {
		const postName = path.basename(folder);
		const files = await fs.readdir(folder);

		// 搜集该文章下的所有图片
		const imageFiles = files.filter(f => IMAGE_EXT_REGEX.test(f));
		if (imageFiles.length === 0) continue;

		console.log(`\n📂 正在处理文章 [${postName}]，发现 ${imageFiles.length} 张图片：`);

		// 保存替换映射关系
		// key: 原始文件名 (如 py.jpg), value: 新的绝对 CDN URL
		const replacementMap = {};
		const filesToDelete = [];

		for (const imgFile of imageFiles) {
			const originalExt = path.extname(imgFile).toLowerCase();
			const baseName = path.basename(imgFile, originalExt);
			const sourceImgPath = path.join(folder, imgFile);

			let destExt = originalExt;
			let format = null;

			if (originalExt === ".png") {
				destExt = ".webp";
				format = "webp";
			} else if (originalExt === ".jpg" || originalExt === ".jpeg") {
				destExt = ".avif";
				format = "avif";
			}

			const destImgName = `${baseName}${destExt}`;
			const destFolder = path.join(R2_DEST_DIR, postName);
			const destImgPath = path.join(destFolder, destImgName);

			// 确保 R2 挂载点下的文章文件夹存在
			await fs.mkdir(destFolder, { recursive: true });

			console.log(`  - 正在转换: ${imgFile} -> ${destImgName}`);

			try {
				if (format === "webp") {
					// PNG 转 WebP，质量设为 85
					await sharp(sourceImgPath)
						.webp({ quality: 85 })
						.toFile(destImgPath);
				} else if (format === "avif") {
					// JPG/JPEG 转 AVIF，质量设为 75
					await sharp(sourceImgPath)
						.avif({ quality: 75 })
						.toFile(destImgPath);
				} else {
					// 其它格式（如 GIF）直接复制
					await fs.copyFile(sourceImgPath, destImgPath);
				}

				const cdnUrl = `${CDN_BASE_URL}/${postName}/${destImgName}`;
				replacementMap[imgFile] = cdnUrl;
				filesToDelete.push(sourceImgPath);
				totalConverted++;
			} catch (err) {
				console.error(`  ✘ 转换/上传图片失败: ${imgFile}`, err);
			}
		}

		// 开始修改该文章文件夹下的 Markdown 文本引用
		const markdownFiles = files.filter(f => /\.(md|mdx)$/i.test(f));
		for (const mdFile of markdownFiles) {
			const mdPath = path.join(folder, mdFile);
			let content = await fs.readFile(mdPath, "utf-8");
			let isModified = false;

			for (const [origFile, cdnUrl] of Object.entries(replacementMap)) {
				// 转义文件名字符以便安全用于正则表达式
				const escapedFile = origFile.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

				// 1. 匹配 Frontmatter 中的图片引用 (例如 image: ./py.jpg 或 image: py.jpg)
				const frontmatterRegex = new RegExp(`(image:\\s*['"]?)(?:\\.\\/)?${escapedFile}(['"]?)`, "g");
				if (frontmatterRegex.test(content)) {
					content = content.replace(frontmatterRegex, `$1${cdnUrl}$2`);
					isModified = true;
				}

				// 2. 匹配 Markdown 正文图片引用 (例如 ![alt](./py.jpg) 或 ![alt](py.jpg))
				const markdownRegex = new RegExp(`(!\\[[^\\]]*\\]\\()([\\.\\]/]*)(?:\\.\\/)?${escapedFile}(\\))`, "g");
				if (markdownRegex.test(content)) {
					// 替换时注意不要把括号也破坏了
					content = content.replace(markdownRegex, `$1${cdnUrl}$3`);
					isModified = true;
				}

				// 3. 匹配 HTML img 标签 (例如 <img src="./py.jpg" 或 <img src="py.jpg")
				const htmlRegex = new RegExp(`(src=['"])(?:\\.\\/)?${escapedFile}(['"])`, "g");
				if (htmlRegex.test(content)) {
					content = content.replace(htmlRegex, `$1${cdnUrl}$2`);
					isModified = true;
				}
			}

			if (isModified) {
				await fs.writeFile(mdPath, content, "utf-8");
				console.log(`  ✓ 成功更新文档引用: ${mdFile}`);
				totalReferencesReplaced++;
			}
		}

		// 确认迁移并修改链接无误后，删除本地博文图片
		for (const pathToDelete of filesToDelete) {
			await fs.unlink(pathToDelete);
			console.log(`  🗑 已删除本地博文旧图: ${path.basename(pathToDelete)}`);
		}
	}

	console.log(`\n🎉 迁移完成！`);
	console.log(`共成功转换与同步图片：${totalConverted} 张`);
	console.log(`共更新博文文件引用：${totalReferencesReplaced} 处`);
}

run().catch(console.error);

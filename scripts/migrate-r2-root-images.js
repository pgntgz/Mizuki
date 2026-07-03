import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(__dirname, "../src/content/posts");
const R2_ROOT_DIR = "/home/pgntgz/r2";
const R2_DEST_DIR = "/home/pgntgz/r2/posts";
const CDN_BASE_URL = "https://box.pgntgz.top";

// 匹配直链到 R2 根目录下图片的正则（排除 posts 子目录）
// 匹配形如：https://box.pgntgz.top/filename.ext 
// 需要解码并排除有二次斜杠的
const R2_ROOT_IMG_REGEX = /https:\/\/box\.pgntgz\.top\/([^/?\s]+?\.(?:png|jpg|jpeg|gif))/gi;

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
	console.log("🚀 开始启动 R2 根目录图片二次优化迁移脚本...");

	if (!(await exists(R2_ROOT_DIR))) {
		console.error("✘ 错误: 未检测到 R2 本地挂载点 /home/pgntgz/r2");
		process.exit(1);
	}

	const postFolders = await getPostFolders(POSTS_DIR);
	let totalConverted = 0;
	let totalReplaced = 0;

	// 用于记录已被成功迁移的文件，方便后续删除
	const migratedFilesLog = [];

	for (const folder of postFolders) {
		const postName = path.basename(folder);
		const files = await fs.readdir(folder);
		const markdownFiles = files.filter(f => /\.(md|mdx)$/i.test(f));

		for (const mdFile of markdownFiles) {
			const mdPath = path.join(folder, mdFile);
			let content = await fs.readFile(mdPath, "utf-8");
			let isModified = false;

			// 收集该 Markdown 中匹配到的 R2 根目录图片引用
			const matches = [...content.matchAll(R2_ROOT_IMG_REGEX)];
			if (matches.length === 0) continue;

			console.log(`\n📂 正在处理博文 [${mdFile}] (${postName})，发现 ${matches.length} 个 R2 根目录直链图片：`);

			// 去重
			const uniqueImages = [...new Set(matches.map(m => m[1]))];

			for (const encodedImgName of uniqueImages) {
				// 重要：URL 编码还原为正常的 UTF-8 文件名
				const imgName = decodeURIComponent(encodedImgName);
				const sourceImgPath = path.join(R2_ROOT_DIR, imgName);

				if (!(await exists(sourceImgPath))) {
					console.warn(`  ⚠ 警告: 无法在本地 R2 挂载点找到文件: ${imgName} (路径: ${sourceImgPath})`);
					continue;
				}

				const originalExt = path.extname(imgName).toLowerCase();
				const baseName = path.basename(imgName, originalExt);

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

				// 创建目标 posts 子目录
				await fs.mkdir(destFolder, { recursive: true });

				console.log(`  - 正在转换提取: ${imgName} ➔ ${postName}/${destImgName}`);

				try {
					if (format === "webp") {
						await sharp(sourceImgPath)
							.webp({ quality: 85 })
							.toFile(destImgPath);
					} else if (format === "avif") {
						await sharp(sourceImgPath)
							.avif({ quality: 75 })
							.toFile(destImgPath);
					} else {
						await fs.copyFile(sourceImgPath, destImgPath);
					}

					const newCdnUrl = `${CDN_BASE_URL}/posts/${postName}/${destImgName}`;

					// 将 Markdown 内容中所有的旧直链链接批量改写
					// 需要同时匹配原始链接和 URL 编码后的链接
					const escapedRawUrl = `${CDN_BASE_URL}/${imgName}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
					const escapedEncodedUrl = `${CDN_BASE_URL}/${encodedImgName}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

					const regexRaw = new RegExp(escapedRawUrl, "g");
					const regexEncoded = new RegExp(escapedEncodedUrl, "g");

					console.log(`    DEBUG: regexRaw = "${regexRaw.toString()}"`);
					console.log(`    DEBUG: content.includes(escapedRawUrl) = ${content.includes(escapedRawUrl.replace(/\\/g, ""))}`);

					const nextContent = content.replace(regexRaw, newCdnUrl).replace(regexEncoded, newCdnUrl);
					if (nextContent !== content) {
						content = nextContent;
						isModified = true;
						totalReplaced++;
						console.log(`    DEBUG: 成功替换链接！`);
					} else {
						console.log(`    DEBUG: 替换未生效（内容未发生改变）`);
					}

					migratedFilesLog.push({
						source: sourceImgPath,
						target: destImgPath,
						imgName: imgName
					});

					totalConverted++;
				} catch (err) {
					console.error(`  ✘ 迁移失败: ${imgName}`, err);
				}
			}

			if (isModified) {
				await fs.writeFile(mdPath, content, "utf-8");
				console.log(`  ✓ 成功更新博文内的图片引用！`);
			}
		}
	}

	// 将需要清理的 R2 根目录图片清单保存，供以后删除时读取
	if (migratedFilesLog.length > 0) {
		const logPath = path.join(__dirname, "migrated-r2-files-log.json");
		await fs.writeFile(logPath, JSON.stringify(migratedFilesLog, null, 2), "utf-8");
		console.log(`\n💾 已生成可清理的原始图片清单: scripts/migrated-r2-files-log.json`);
	}

	console.log(`\n🎉 根目录直链优化迁移完成！`);
	console.log(`共优化并同步图片：${totalConverted} 张`);
	console.log(`共重写直链引用：${totalReplaced} 处`);
}

run().catch(console.error);

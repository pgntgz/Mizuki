import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// --- 配置区喵 ---
const API_BASE = "https://api.bgm.tv";
const ACCESS_TOKEN = "9LnkbAb0CFBaydcSla5SEQOjDgni93YakaBqrVTU";
const USER_AGENT = "Mizuki-Bangumi-Crawler/1.0 (https://github.com/pgntgz)";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, "../src/config.ts");
const OUTPUT_FILE = path.join(__dirname, "../src/data/bangumi-data.json");
// --- --- --- ---

/**
 * 封装带认证的请求喵
 */
async function fetchWithAuth(url) {
	const response = await fetch(url, {
		headers: {
			"Authorization": `Bearer ${ACCESS_TOKEN}`,
			"User-Agent": USER_AGENT,
			"Accept": "application/json",
		},
	});
	return response;
}

async function getUserIdFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/bangumi:\s*\{[\s\S]*?userId:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			const userId = match[1];
			// 简单校验一下是不是没填
			if (["your-bangumi-id", "your-user-id", ""].includes(userId)) {
				console.warn("⚠ 警告: src/config.ts 里的 userId 好像还是默认值喵！");
			}
			return userId;
		}
		throw new Error("在 config.ts 中找不到 bangumi.userId");
			} catch (error) {
				console.error("✘ 读取 config.ts 失败，主人你确认路径对吗喵？");
				throw error;
			}
	}

	async function getAnimeModeFromConfig() {
		try {
			const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
			const match = configContent.match(
				/anime:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/,
			);
			return match ? match[1] : "bangumi";
				} catch (error) {
					return "bangumi";
				}
		}

		const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

		async function fetchSubjectDetail(subjectId) {
			try {
				const response = await fetchWithAuth(`${API_BASE}/v0/subjects/${subjectId}`);
				if (!response.ok) return null;
				return await response.json();
			} catch (error) {
				return null;
			}
		}

		function getStudioFromInfobox(infobox) {
			if (!Array.isArray(infobox)) return "Unknown";
			const targetKeys = ["动画制作", "制作", "製作", "开发", "制作公司"];
			for (const key of targetKeys) {
				const item = infobox.find((i) => i.key === key);
				if (item) {
					if (typeof item.value === "string") return item.value;
					if (Array.isArray(item.value)) {
						const validItem = item.value.find((v) => v.v);
						if (validItem) return validItem.v;
					}
				}
			}
			return "Unknown";
		}

		async function fetchCollection(userId, type) {
			let allData = [];
			let offset = 0;
			const limit = 50;
			let hasMore = true;

			console.log(`正在获取类型为 ${type} 的收藏数据喵...`);

			while (hasMore) {
				// subject_type=2 代表动画
				const url = `${API_BASE}/v0/users/${userId}/collections?subject_type=2&type=${type}&limit=${limit}&offset=${offset}`;
				try {
					const response = await fetchWithAuth(url);

					if (!response.ok) {
						if (response.status === 404) {
							console.log(`  用户 ${userId} 不存在或没有此类收藏喵。`);
							return [];
						}
						throw new Error(`API 返回错误: ${response.status}`);
					}

					const data = await response.json();

					if (data.data && data.data.length > 0) {
						allData = [...allData, ...data.data];
						process.stdout.write(`  已抓取 ${allData.length} 条记录... \r`);
					}

					if (!data.data || data.data.length < limit) {
						hasMore = false;
					} else {
						offset += limit;
						await delay(500); // 稍微慢点，别把人家服务器搞挂了喵
					}
				} catch (e) {
					console.error(`\n抓取失败 (类型 ${type}):`, e.message);
					hasMore = false;
				}
			}
			console.log("");
			return allData;
		}

		async function processData(items, status) {
			const results = [];
			let count = 0;
			const total = items.length;

			for (const item of items) {
				count++;
				process.stdout.write(`[${status}] 处理进度: ${count}/${total} (ID: ${item.subject_id})\r`);

				const subjectDetail = await fetchSubjectDetail(item.subject_id);
				await delay(200); // 详情查询限制更严，慢一点喵

				const year = item.subject?.date ? item.subject.date.slice(0, 4) : "Unknown";
				const rating = item.rate || item.subject?.score || 0;

				const progress = item.ep_status || 0;
				const totalEpisodes = item.subject?.eps || progress;

				results.push({
					title: item.subject?.name_cn || item.subject?.name || "未知标题",
					status: status,
					rating: Number(rating.toFixed(1)),
							 cover: item.subject?.images?.large || item.subject?.images?.medium || "",
							 description: (subjectDetail?.summary || item.subject?.short_summary || "").trim(),
							 episodes: `${totalEpisodes} episodes`,
							 year: year,
							 genre: item.subject?.tags ? item.subject.tags.slice(0, 3).map(t => t.name) : [],
							 studio: getStudioFromInfobox(subjectDetail?.infobox),
							 link: `https://bgm.tv/subject/${item.subject_id}`,
							 progress: progress,
							 totalEpisodes: totalEpisodes,
							 startDate: item.subject?.date || "",
				});
			}
			console.log(`\n✓ ${status} 列表处理完成喵！`);
			return results;
		}

		async function main() {
			console.log("🚀 开始更新 Bangumi 数据...");

			const animeMode = await getAnimeModeFromConfig();
			if (animeMode !== "bangumi") {
				console.log(`当前模式为 "${animeMode}"，不是 "bangumi"，脚本罢工了喵！`);
				return;
			}

			const USER_ID = await getUserIdFromConfig();
			console.log(`读取到用户 ID: ${USER_ID}`);

			const collections = [
				{ type: 3, status: "watching" },  // 在看
				{ type: 1, status: "planned" },   // 想看
				{ type: 2, status: "completed" }, // 看过
			];

			let finalAnimeList = [];

			for (const c of collections) {
				const rawData = await fetchCollection(USER_ID, c.type);
				if (rawData.length > 0) {
					const processed = await processData(rawData, c.status);
					finalAnimeList = [...finalAnimeList, ...processed];
				}
			}

			const dir = path.dirname(OUTPUT_FILE);
			try {
				await fs.access(dir);
			} catch {
				await fs.mkdir(dir, { recursive: true });
			}

			await fs.writeFile(OUTPUT_FILE, JSON.stringify(finalAnimeList, null, 2));
			console.log(`\n✨ 更新成功！数据已保存至: ${OUTPUT_FILE}`);
			console.log(`共计收集了 ${finalAnimeList.length} 部作品喵！`);
		}

		main().catch((err) => {
			console.error("\n✘ 脚本炸了喵:");
			console.error(err);
			process.exit(1);
		});

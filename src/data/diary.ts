// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	{
		id: 1,
		content:
		"为了酒馆买的5刀grok,结果发现grok输出特别适合在galqq，聊人表现特别的棒，我真他妈怀疑老马偷推特的文爱记录练ai了。grok个人感觉逻辑能力是真的差，不过可能因为开放nsfw训练资料吧，情商和淫商表现巨好。希望开放nsfw的厂商越来越多",
		date: "2026-04-01T20:51:00Z",
		images: [],
	},
{
	id: 2,
	content:
	"妈的Mundfish会不会做机制？没有人喜欢你那个沟槽的响指锁，还有有效提高游戏难度系数的贪吃蛇。",
	date: "2026-04-06T15:05:00Z",
	images: [],
},
{
	id: 3,
	content:
	"奇异搞笑了，搞不懂byd DC为啥要是双击自动回应上次使用的表情，这才后知后觉的发现自己因为沟槽的误触给一堆无关内容回复了🇹🇼",
	date: "2026-04-07T19:14:00Z",
	images: [],
},
];

// 获取日记统计数据
export const getDiaryStats = () => {
	const total = diaryData.length;
	const hasImages = diaryData.filter(
		(item) => item.images && item.images.length > 0,
	).length;
	const hasLocation = diaryData.filter((item) => item.location).length;
	const hasMood = diaryData.filter((item) => item.mood).length;

	if (total === 0) return { total: 0, hasImages: 0, hasLocation: 0, hasMood: 0, imagePercentage: 0, locationPercentage: 0, moodPercentage: 0 };

	return {
		total,
		hasImages,
		hasLocation,
		hasMood,
		imagePercentage: Math.round((hasImages / total) * 100),
		locationPercentage: Math.round((hasLocation / total) * 100),
		moodPercentage: Math.round((hasMood / total) * 100),
	};
};

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = [...diaryData].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取最新的日记
export const getLatestDiary = () => {
	return getDiaryList(1)[0];
};

// 根据ID获取日记
export const getDiaryById = (id: number) => {
	return diaryData.find((item) => item.id === id);
};

// 获取包含图片的日记
export const getDiaryWithImages = () => {
	return diaryData.filter((item) => item.images && item.images.length > 0);
};

// 根据标签筛选日记
export const getDiaryByTag = (tag: string) => {
	return diaryData
	.filter((item) => item.tags?.includes(tag))
	.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	diaryData.forEach((item) => {
		if (item.tags) {
			item.tags.forEach((tag) => tags.add(tag));
		}
	});
	return Array.from(tags).sort();
};

export default diaryData;

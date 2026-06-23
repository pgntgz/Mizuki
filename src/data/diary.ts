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
  {
    id: 4,
    content:
      "嚯嚯嚯，Strong Keybox Official竟然真的有三绿的key,不过大概一段时间就会过期吧",
    date: "2026-04-18T23:34",
    images: [],
  },
  {
    id: 5,
    content:
      "个人原因鸽了20天整啊，不过Google还没给我引流，我的SEO权重依旧被OSU账号吊打，好像也没事就是了。这下必须更了，GFW下不想更新，主要最近政策变化的太快，等到稳定点（或许64后？）再更，考虑更一个哔哩哔哩第三方客户端的评测，哦，对了，该管管SEO问题了",
    date: "2026-05-10T22:23",
    images: [],
  },
  {
    id: 6,
    content:
      "希望gurubot/self-after-dark这种专注单一领域非微调而是直接面对NSFW需求的的LLM模型多一点，这个8b的参数模型真的惊艳到我，可惜我英文烂。",
    date: "2026-05-11T18:46",
    images: [],
  },
  {
    id: 7,
    content:
      "熬夜看了Android Show 2026....液态玻璃loga吓人一跳，不过Google看了没有去全盘果化，MD3还是主要，只是Gemini intelligence加了，有点看不下去了，还有emoji新版本真的丑，不过自订微件看起来不错？",
    date: "2026-05-13T01:31",
    images: [],
  },
  {
    id: 8,
    content:
      "真讨厌那种看不得自己角色色图还攻击作者的，没有人逼你看这玩意，你完全可以屏蔽，不涉及儿少暴力和一览子歧视问题我觉得都是创作自由，当然，前提是版权方没意见。别人爱画什么管你鸟事情",
    date: "2026-06-17T00:14",
    images: [],
  },
  {
    id: 9,
    content:
      "熬夜看了GoogleIO2026Google要在多模态一条路走到黑了啊，ai，ai，ai，gmini新的UI丑，其他都挺惊艳的说实话，有意思的是gemini3.5首发就是GA,我们亲爱的3,0还是预览版",
    date: "2026-05-20T02:40",
    images: [],
  },
  {
    id: 10,
    content:
      "发现幽默的一点是Google flow免费账户每天是50免费点数每天刷新，但当你买了20美元的PRO你一个月就是固定1000点，花20刀少500点，虽说多了可额外买和gemini生成，还是感觉有点幽默",
    date: "2026-05-28T20:40",
    images: [],
  },
  {
    id: 10,
    content:
      "马斯克死妈妈了，grok大概今年3.4月份的时候就在没有邮件或任何方式通知开发者的情况下把过滤器调的贼鸡巴严。更死妈的另一个更新是非思考模型NSFW请求会被罚Usage guidelines violation，而且一次就是5美分，并且被罚同样没有邮件和任何通知，只有翻月底的账单会有巨小一行告诉你。grok NSFW内容的文笔确实更好，但就现在这个过滤器就算了吧。只要稍微BDSM就说涉及暴力，角色提示词里必须说已经满了18岁，还要提心吊胆会不会被罚钱。",
    date: "2026-06-07T21:09",
    images: [],
  },
  {
    id: 11,
    content:
      "感觉大概有半年没怎么用推特，今天闲得没事用别人的号开了一会，结论就是真傻逼。就是说不是咱歧视lgbt，我自己就是lgbt，但我是真的·不理解中国的大概80%的MTF怎么他妈都是个NPC，做的事情就是注册一个被已经傻逼马斯克收购的推特，会做的事情把一万年前的梗图拿出来每年重新发一次，配一个不同的文，就当是新的。不但不好笑而且很多梗简直是他妈刻板印象制造机，还有巨他妈讨厌的就是路径依赖，一帮人谁的创意火了就他妈抄来抄去，在可能很久我还是会倾向于远离社交媒体。",
    date: "2026-06-23T19:01",
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

  if (total === 0)
    return {
      total: 0,
      hasImages: 0,
      hasLocation: 0,
      hasMood: 0,
      imagePercentage: 0,
      locationPercentage: 0,
      moodPercentage: 0,
    };

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

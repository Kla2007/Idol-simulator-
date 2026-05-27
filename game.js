const setupScreen = document.querySelector("#setupScreen");
const homeScreen = document.querySelector("#homeScreen");
const appScreen = document.querySelector("#appScreen");
const appTitle = document.querySelector("#appTitle");
const appContent = document.querySelector("#appContent");
const toastBox = document.querySelector("#toast");

const playerNameInput = document.querySelector("#playerNameInput");
const fanNameInput = document.querySelector("#fanNameInput");
const ageInput = document.querySelector("#ageInput");
const avatarInput = document.querySelector("#avatarInput");
const setupAvatarPreview = document.querySelector("#setupAvatarPreview");

const colorThemes = {
  pink: { name: "粉色", theme: "#ef9bc8", dark: "#d46ba8", light: "#ffe4f2", soft: "#fff7fb" },
  blue: { name: "藍色", theme: "#74c3df", dark: "#3688aa", light: "#daf4ff", soft: "#f4fbff" },
  purple: { name: "紫色", theme: "#ca83d7", dark: "#9950a8", light: "#f2ddff", soft: "#fcf7ff" },
  green: { name: "綠色", theme: "#85d879", dark: "#4f9a45", light: "#dcffd7", soft: "#f7fff5" },
  yellow: { name: "黃色", theme: "#e9cc60", dark: "#a88c27", light: "#fff7c8", soft: "#fffdf3" },
  black: { name: "黑色", theme: "#34343b", dark: "#111116", light: "#dddddf", soft: "#f7f7f8" }
};

let selectedColor = "pink";
let currentChat = "manager";
let currentApp = "home";

const state = {
  name: "接不接",
  fanName: "雨🌧️",
  age: 18,
  color: "pink",
  avatar: "⭐",
  year: 1,
  month: 2,
  phase: "上旬",
  career: "練習生",
  fans: 502,
  blackFans: 0,
  popularity: 15,
  energy: 80,
  skill: 20,
  love: 0,
  money: 0,
  companyTrust: 50,
  scandalRisk: 8,
  comebackProgress: 0,
  brandFavor: 60,
  wardrobe: 0,
  shoppingHistory: [],
  appViews: {},
  lastGenerated: {},
  refreshLog: [],
  activeMissionSet: 1,
  missions: [
    { id: "m_post_weverse", title: "在 WVS 發一條日常", detail: "完成一條Weverse貼文。", target: 1, progress: 0, done: false, reward: { fans: 120, popularity: 3, money: 300 } },
    { id: "m_activity", title: "完成一次公開活動", detail: "參加演唱會、fan meeting、綜藝、音樂節目或品牌拍攝。", target: 1, progress: 0, done: false, reward: { fans: 180, popularity: 4, money: 800 } },
    { id: "m_reply_fans", title: "回覆 2 條粉絲留言", detail: "在WVS/IG/泡泡留言下回覆粉絲。", target: 2, progress: 0, done: false, reward: { fans: 180, blackFans: -10, love: 3 } }
  ],
  privateDMs: [
    { id: "dm_ig_photo", source: "Instagram", name: "匿名攝影師", risk: 8, unread: true, messages: [{ from: "them", text: "我有你後台照片，要不要先看？" }] },
    { id: "dm_staff", source: "staff", name: "後台staff", risk: 5, unread: true, messages: [{ from: "them", text: "今天下班別走正門，有人蹲。" }] },
    { id: "dm_airdrop", source: "AirDrop", name: "附近的iPhone", risk: 14, unread: true, messages: [{ from: "them", text: "AirDrop 傳來一張模糊照片：你和某人同框。" }] }
  ],
  activePrivateDM: null,
  posts: { weverse: [], instagram: [], bubble: [], live: [] },
  chats: {
    manager: [
      { from: "them", text: "月底評級不要遲到。" },
      { from: "them", text: "公司在看你的數據，最近少碰危險話題。" }
    ],
    member: [{ from: "them", text: "今天練習後要不要一起吃拉麵？" }],
    crush: [{ from: "them", text: "你在宿舍嗎？我在樓下。" }],
    staff: [{ from: "them", text: "這次活動後台人多，私下聯絡注意別被拍。" }],
    fan: [{ from: "them", text: "寶寶今天泡泡會來嗎ㅠㅠ" }]
  },
  companyNotices: [
    { title: "經紀人通知", text: "月底有練習生評級，遲到扣公司信任。", read: false },
    { title: "回歸情報", text: "公司正在測試新歌demo，完成度達到100可觸發回歸期。", read: false },
    { title: "公關提醒", text: "私聯、深夜同框、曖昧文案都會提高緋聞風險。", read: false }
  ],
  trends: [
    { platform: "微博", title: "新人練習生直拍出圈", heat: "4.3w", danger: false },
    { platform: "X/Twitter", title: "fans are calling " + "接不接" + " the next it idol", heat: "32k", danger: false },
    { platform: "微博", title: "深夜同框是戀愛還是營業？", heat: "1.8w", danger: true }
  ],
  letters: [
    "你不是誰的替代品，你就是你。",
    "惡評不要看太久，我們會一直在。",
    "想你想到哭了，什麼時候才能見到你啊。"
  ],
  activityHistory: [],
  liveActive: false,
  liveViewers: 0,
  liveChat: [],
  bubbleChat: [
    { from: "them", name: "雨🌧️", text: "今天也等你來泡泡ㅠㅠ" },
    { from: "them", name: "熬夜粉", text: "寶寶今天練習辛苦了嗎？" }
  ],
  kakaoUnlocked: {
    manager: true,
    member: true,
    crush: true,
    staff: true,
    fan: true
  },
  sasaengRisk: 12,
  privacy: 55,
  sasaengIncidents: [
    { title: "機場跟拍", text: "有人在機場過度靠近，staff提醒你走VIP通道。", severity: 2, handled: false },
    { title: "宿舍附近疑似蹲點", text: "粉絲群有人提到你的宿舍區域，風險上升。", severity: 3, handled: false }
  ]
};

const appNames = {
  profile: "主頁",
  missions: "任務",
  company: "公司",
  weverse: "WVS",
  kakao: "KakaoTalk",
  bubble: "泡泡",
  instagram: "Instagram",
  privateContact: "私聯",
  sasaeng: "私生",
  hotsearch: "熱搜",
  activities: "活動",
  call: "打Call",
  mail: "粉絲信",
  live: "直播",
  shop: "消費",
  save: "存檔",
  stats: "數據"
};

const activityTypes = {
  concert: [
    { name: "小型拼盤演唱會", pay: 1200, fans: 520, pop: 8, energy: -24, risk: 2, text: "舞台直拍出圈，現場粉絲大喊你的名字。" },
    { name: "單獨mini concert", pay: 4200, fans: 1600, pop: 16, energy: -35, risk: 5, text: "你的第一場mini concert完成，收入和人氣一起上升。" }
  ],
  fanmeeting: [
    { name: "線下粉絲見面會", pay: 1800, fans: 900, pop: 10, energy: -20, risk: 4, text: "repo刷屏，大家說你本人超會營業。" },
    { name: "生日fan meeting", pay: 2600, fans: 1300, pop: 12, energy: -26, risk: 3, text: "你和粉絲一起過生日，飯圈黏性上升。" }
  ],
  variety: [
    { name: "綜藝飛行嘉賓", pay: 2200, fans: 700, pop: 14, energy: -18, risk: 7, text: "你在綜藝接梗成功，但也有片段被剪出爭議。" },
    { name: "團綜固定錄製", pay: 1500, fans: 620, pop: 9, energy: -16, risk: 4, text: "團綜播出後，觀眾覺得你很有反差感。" }
  ],
  musicshow: [
    { name: "音樂節目打歌", pay: 900, fans: 800, pop: 11, energy: -22, skill: 6, risk: 3, text: "打歌舞台很穩，唱跳數值上升。" },
    { name: "特別MC舞台", pay: 1300, fans: 560, pop: 13, energy: -17, skill: 3, risk: 5, text: "你做特別MC被誇反應快，熱搜小爆。" }
  ],
  photoshoot: [
    { name: "雜誌拍攝", pay: 2000, fans: 520, pop: 9, energy: -12, risk: 2, brandOnly: true, text: "雜誌預告照放出，顏粉暴漲。" },
    { name: "品牌廣告拍攝", pay: 5500, fans: 680, pop: 12, energy: -15, risk: 4, brandOnly: true, text: "品牌方很滿意，商業價值提升。" }
  ]
};

function escapeHTML(text) {
  return String(text).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}

function toast(text) {
  toastBox.textContent = text;
  toastBox.classList.remove("hidden");
  setTimeout(() => toastBox.classList.add("hidden"), 2000);
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function applyTheme() {
  const theme = colorThemes[state.color] || colorThemes.pink;
  document.documentElement.style.setProperty("--theme", theme.theme);
  document.documentElement.style.setProperty("--theme-dark", theme.dark);
  document.documentElement.style.setProperty("--theme-light", theme.light);
  document.documentElement.style.setProperty("--theme-soft", theme.soft);
}

function updateHomeStats() {
  applyTheme();
  document.querySelector("#fansHome").textContent = state.fans.toLocaleString();
  document.querySelector("#fanNameHome").textContent = state.fanName;
  document.querySelector("#moneyHome").textContent = "₩" + state.money.toLocaleString();
  document.querySelector("#popularityHome").textContent = state.popularity;
  document.querySelector("#energyHome").textContent = state.energy;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function addStats(delta) {
  Object.entries(delta).forEach(([key, value]) => state[key] += value);
  state.fans = Math.max(0, state.fans);
  state.blackFans = Math.max(0, state.blackFans);
  state.money = Math.max(0, state.money);
  state.popularity = clamp(state.popularity, 0, 100);
  state.energy = clamp(state.energy, 0, 100);
  state.skill = clamp(state.skill, 0, 100);
  state.love = clamp(state.love, 0, 100);
  state.companyTrust = clamp(state.companyTrust, 0, 100);
  state.scandalRisk = clamp(state.scandalRisk, 0, 100);
  state.comebackProgress = clamp(state.comebackProgress, 0, 100);
  state.sasaengRisk = clamp(state.sasaengRisk, 0, 100);
  state.privacy = clamp(state.privacy, 0, 100);
  state.brandFavor = clamp(state.brandFavor, 0, 100);
  state.wardrobe = Math.max(0, state.wardrobe);

  if (state.popularity >= 70 && state.career === "練習生") {
    state.career = "預備出道組";
    toast("🎉 公司通知你進入預備出道組！");
  }
  if (state.comebackProgress >= 100) {
    state.comebackProgress = 0;
    state.trends.unshift({ platform: "微博", title: `${state.name} 回歸預告公開`, heat: "8.9w", danger: false });
    addStats({ popularity: 12, fans: 1200, money: 3000 });
    toast("🎤 回歸期觸發！新熱搜已生成。");
  }
}

function textScore(text) {
  const risky = ["戀愛", "討厭", "退團", "罵", "崩潰", "恨", "私聯", "酒店", "喝酒", "親", "不想幹"];
  const sweet = ["想你", "愛你", "謝謝", "辛苦", "晚安", "寶寶", "開心", "見面", "喜歡", "陪我"];
  let score = { fans: 80, popularity: 2, blackFans: 0, energy: -3, love: 0, scandalRisk: 0 };
  if (text.length > 30) { score.fans += 80; score.popularity += 2; }
  if (sweet.some(word => text.includes(word))) { score.fans += 120; score.love += 3; }
  if (risky.some(word => text.includes(word))) { score.popularity += 6; score.blackFans += 20; score.fans += 30; score.scandalRisk += 8; }
  if (text.length < 3) score.fans -= 35;
  return score;
}

function classifyText(text) {
  const t = text.toLowerCase();
  if (/(練習|舞|唱|聲樂|rap|舞台|排練|評級|出道|直拍)/i.test(t)) return "practice";
  if (/(回歸|comeback|新歌|demo|專輯|mv|錄音)/i.test(t)) return "comeback";
  if (/(累|困|睡|晚安|休息|生病|頭痛|崩潰|哭|撐不住)/i.test(t)) return "tired";
  if (/(飯|吃|拉麵|咖啡|蛋糕|奶茶|早餐|晚餐|餓)/i.test(t)) return "food";
  if (/(想你|愛你|喜歡|寶寶|見面|陪|想見|miss|love)/i.test(t)) return "love";
  if (/(自拍|照片|漂亮|好看|妝|衣服|造型|髮|顏)/i.test(t)) return "visual";
  if (/(黑粉|惡評|罵|討厭|熱搜|澄清|道歉)/i.test(t)) return "drama";
  return "daily";
}

function generateRelatedComments(text, platform) {
  const topic = classifyText(text);
  const pools = {
    practice: [
      `練習辛苦了，${state.fanName}真的會心疼ㅠㅠ`,
      "月底評級一定會過的，你進步超明顯。",
      "舞台直拍我已經準備好反覆看了。",
      "別練到受傷，出道不是靠一天拼命。"
    ],
    comeback: [
      "新歌？？？是不是要回歸了！",
      "公司最好給你配一個好妝造。",
      "我已經準備好錢包了。",
      "MV什麼時候出，我要蹲首播。"
    ],
    tired: [
      "快去睡覺！！手機放下！！",
      "累了就休息，不要硬撐啊。",
      `${state.fanName}給你充電🔋`,
      "看到你說累真的有點想哭。"
    ],
    food: [
      "吃飽才有力氣練習！",
      "這個看起來好好吃，求同款。",
      "寶寶不要只喝咖啡，要吃正餐。",
      "下次開吃播吧我求你。"
    ],
    love: [
      "你也想我們嗎ㅠㅠ 我瞬間活了。",
      `${state.fanName}今天直接過年。`,
      "這句話我截圖保存了。",
      "不要這麼會講，心臟受不了。"
    ],
    visual: [
      "照片呢？？？只發文字不夠。",
      "今天造型是不是很漂亮，快給我看。",
      "你的自拍永遠值得熱搜。",
      "不用懷疑，你真的很好看。"
    ],
    drama: [
      "別看惡評，我們會控評。",
      "公司能不能做點事啊？",
      "清者自清，但你也要保護自己。",
      "我相信你，不要被那些話傷到。"
    ],
    daily: [
      "日常也好喜歡，多發一點。",
      "感覺像真的陪你過了一天。",
      "今天也有被你治癒到。",
      "你一出現，我一天都好了。"
    ]
  };

  let chosen = [...pools[topic]];
  if (platform === "bubble") {
    chosen.push("泡泡一響我就知道是你。");
    chosen.push("這條我要反覆看一百遍。");
  }
  if (platform === "weverse") chosen.push("WVS通知一來我直接衝進來。");
  if (platform === "instagram") chosen.push("caption好會寫，照片也好會拍。");
  if (platform === "live") chosen.push("聽到了聽到了，聲音好近。");

  const names = [state.fanName, "追星女孩⭐", "打工人💼", "米精🐰", "草莓🍓", "彩虹🌈", "熬夜粉"];
  return Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => ({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    name: randomFrom(names),
    text: randomFrom(chosen),
    replies: []
  }));
}

function generateRelatedChatReply(text, chat) {
  const topic = classifyText(text);
  const asksWhy = /(why|點解|為什麼|为什么|為啥|原因|怎麼了|怎么了|幹嘛|干嘛)/i.test(text);
  const asksSchedule = /(行程|schedule|幾點|几点|時間|时间|明天|today|tomorrow|when)/i.test(text);
  const asksComeback = /(回歸|comeback|新歌|demo|mv|專輯|专辑|資料|资料|外傳|外传)/i.test(text);
  const shortReply = /^(ok|okay|k|哦|喔|嗯|why|\?|？)$/i.test(text.trim());

  const special = {
    manager: {
      why: [
        "因為回歸資料還在保密期，外傳會被公司追責。",
        "因為現在熱搜風險高，公司不想再放大話題。",
        "因為明天行程還沒完全定稿，我只能先提醒你看表。",
        "因為品牌方最近也在觀察你，說錯一句都可能被截圖。"
      ],
      schedule: [
        "明天早上8:30到公司，10點妝髮，下午音樂節目預錄。",
        "明天先看行程表，時間有變我會再發你。",
        "你明天有練習、採訪和一個短拍攝，別睡太晚。",
        "行程還有一個待確認，確定後我會丟到公司通知。"
      ],
      comeback: [
        "回歸資料現在不能外傳，連隊友群也不要亂發。",
        "demo已經在走流程，你先把狀態練穩。",
        "MV概念還在改，正式版出來前不要劇透。",
        "公司想看你最近數據，再決定part和造型比重。"
      ],
      short: [
        "不要只回ok，真的要看明天行程表。",
        "你每次都ok然後第二天睡過頭。",
        "知道你嫌我囉嗦，但這次真的很重要。",
        "嗯，記得別外傳。"
      ]
    },
    staff: {
      why: [
        "因為外面有站姐和私生，走錯門很容易被拍。",
        "因為今天後台人太多，不安全。",
        "因為你的位置已經有人在論壇猜了。"
      ],
      schedule: [
        "你等我訊息，我會帶你走側門。",
        "車大概十五分鐘後到，別自己出去。",
        "下一個點先別公開，到了再發泡泡。"
      ],
      short: [
        "收到，但你別自己亂跑。",
        "嗯，我盯著門口。",
        "ok，記得戴口罩。"
      ]
    },
    crush: {
      why: [
        "因為我想見你，但又怕你被拍到。",
        "因為你剛剛那句話讓我有點在意。",
        "因為你一說累，我就想過來。"
      ],
      short: [
        "你就只回我ok？",
        "好冷淡喔。",
        "那我先不上去了，怕你不方便。"
      ]
    },
    member: {
      why: [
        "因為你看起來快累死了，我才叫你吃飯。",
        "因為我也不想一個人練到凌晨。",
        "因為經紀人剛剛又在群裡催行程。"
      ],
      short: [
        "你這個回覆也太敷衍了吧哈哈。",
        "ok什麼ok，吃不吃一句話。",
        "懂了，你又累到省字。"
      ]
    },
    fan: {
      why: [
        "因為我們真的很想你啊ㅠㅠ",
        "因為泡泡一響就像你真的在旁邊。",
        "因為你太久沒來，我們會亂想。"
      ],
      short: [
        "寶寶只回ok也很可愛。",
        "多說一點嘛ㅠㅠ",
        "收到！今天也喜歡你。"
      ]
    }
  };

  if (asksWhy && special[chat]?.why) return randomFrom(special[chat].why);
  if (asksSchedule && special[chat]?.schedule) return randomFrom(special[chat].schedule);
  if (asksComeback && special[chat]?.comeback) return randomFrom(special[chat].comeback);
  if (shortReply && special[chat]?.short) return randomFrom(special[chat].short);

  const replies = {
    manager: {
      practice: [
        "知道你努力，但不要受傷。",
        "明天評級我幫你確認時間。",
        "練習可以，但不要再凌晨才回宿舍。",
        "這段可以留到月評展示，別提前發出去。"
      ],
      comeback: [
        "回歸資料還不能外傳。",
        "demo已經在走流程，你先管好狀態。",
        "這個概念還沒定，別在直播提。",
        "公司會看這週數據再決定曝光量。"
      ],
      tired: [
        "累就早點睡，別再刷手機了。",
        "明早行程我幫你往後挪半小時。",
        "你今天先休息，別把狀態拖垮。",
        "我知道你累，但明天不能遲到。"
      ],
      drama: [
        "熱搜先別回，公司會處理。",
        "截圖給我，我去問公關。",
        "先不要發長文，等公司口徑。",
        "這件事越回越亂，先冷靜。"
      ],
      daily: [
        "收到。記得看明天行程表。",
        "我知道了，等下把更新版行程發你。",
        "先不要外傳，尤其是回歸相關。",
        "嗯，今天早點睡，明天有拍攝。",
        "可以，但先報備給我。"
      ]
    },
    staff: {
      practice: [
        "我幫你留了練習室。",
        "攝影機那邊我會提醒別拍到你。",
        "你練完從側門走，外面有人等。"
      ],
      love: [
        "這種話不要在公開平台說。",
        "小心點，今天後台有站姐。",
        "我可以幫你傳話，但別留下截圖。"
      ],
      drama: [
        "先別走正門，我安排車。",
        "我知道了，公關那邊會處理。",
        "論壇那條我看到了，先別自己回。"
      ],
      daily: [
        "收到，我幫你安排。",
        "可以，我先問經紀人。",
        "別急，等我確認一下。"
      ]
    },
    member: {
      practice: [
        "你又偷偷加練？等我一起。",
        "下次副歌part我們再摳一下。",
        "你今天那段其實比昨天穩很多。"
      ],
      food: [
        "便利店走起，我請你吃拉麵。",
        "我也餓了，現在去嗎？",
        "你要辣的還是不辣的？"
      ],
      tired: [
        "別硬撐，我在休息室等你。",
        "你今天臉色真的不太好。",
        "你先躺一下，我幫你盯著經紀人。"
      ],
      love: [
        "哎呦，突然這麼會講？",
        "這句我截圖了哈哈哈。",
        "你這樣說粉絲會瘋。"
      ],
      daily: [
        "哈哈哈哈你真的很有梗。",
        "懂了，那我等你。",
        "你又開始省字了。"
      ]
    },
    crush: {
      love: [
        "那我現在可以去見你嗎？",
        "你這樣說，我真的會當真。",
        "我也想你，但今天外面有人拍。"
      ],
      tired: [
        "我在樓下，帶了熱飲。",
        "別哭，我陪你一會兒。",
        "我不吵你，見一面就走。"
      ],
      visual: [
        "我拍到你素顏了，真的好美。",
        "不用修圖，你本來就好看。",
        "今天那件衣服很適合你。"
      ],
      drama: [
        "別怕，我知道你是什麼樣的人。",
        "需要我的話，我一直在。",
        "先別回熱搜，會被截圖。"
      ],
      daily: [
        "我看到了，今天也很想你。",
        "那我晚點再找你。",
        "你現在方便講電話嗎？"
      ]
    },
    fan: {
      practice: [
        "你一定會出道的！我相信你！",
        "別受傷，慢慢來也可以。",
        "練習辛苦了，我們都看得到。"
      ],
      tired: [
        "快去睡！我們會等你。",
        "心疼死了，不准熬夜。",
        "今天不用營業也可以，休息最重要。"
      ],
      love: [
        "啊啊啊啊你說想我們！！",
        "我今晚不用睡了。",
        "這句話我要截圖保存。"
      ],
      visual: [
        "自拍自拍自拍！",
        "你肯定又漂亮了。",
        "今天造型一定很好看吧。"
      ],
      daily: [
        "寶寶回我了，人生圓滿。",
        "今天也等到你了。",
        "你說什麼我都愛聽。"
      ]
    }
  };

  return randomFrom((replies[chat] && (replies[chat][topic] || replies[chat].daily)) || [
    "收到啦。",
    "我知道了。",
    "等一下再跟你說。",
    "你這樣說我有點在意。"
  ]);
}


function updateMission(id, amount = 1) {
  const mission = state.missions.find(m => m.id === id);
  if (!mission || mission.done) return;
  mission.progress = Math.min(mission.target, mission.progress + amount);
  if (mission.progress >= mission.target) {
    mission.done = true;
    addStats(mission.reward || {});
    toast(`🎯 任務完成：${mission.title}`);
  }
}

function missionPercent(mission) {
  return Math.round((mission.progress / mission.target) * 100);
}

function newMissionSet() {
  const pool = [
    { id: "m_bubble_3_" + Date.now(), title: "發 3 條泡泡", detail: "和粉絲保持聯繫。", target: 3, progress: 0, done: false, reward: { fans: 260, love: 5, money: 500 } },
    { id: "m_hotsearch_" + Date.now(), title: "處理 1 條熱搜", detail: "在熱搜裡澄清/道歉/回應偶遇文。", target: 1, progress: 0, done: false, reward: { brandFavor: 5, companyTrust: 4, blackFans: -20 } },
    { id: "m_shop_" + Date.now(), title: "完成 1 次消費", detail: "買粉絲禮物或自己的造型。", target: 1, progress: 0, done: false, reward: { popularity: 3, brandFavor: 3 } },
    { id: "m_dm_" + Date.now(), title: "回覆 1 個私聯DM", detail: "打開私聯訊息並回覆。", target: 1, progress: 0, done: false, reward: { love: 4, popularity: 2, scandalRisk: 3 } },
    { id: "m_live_" + Date.now(), title: "完成一次直播", detail: "開直播並結束直播。", target: 1, progress: 0, done: false, reward: { fans: 300, money: 700, popularity: 4 } }
  ];
  state.activeMissionSet += 1;
  state.missions = [];
  while (state.missions.length < 3) {
    const picked = randomFrom(pool);
    if (!state.missions.some(m => m.title === picked.title)) state.missions.push({ ...picked });
  }
  saveGame(false);
  renderMissions();
  toast("新任務已刷新。");
}
window.newMissionSet = newMissionSet;

function renderMissions() {
  const completeCount = state.missions.filter(m => m.done).length;
  appContent.innerHTML = `
    <div class="card">
      <b>🎯 今日任務 Set ${state.activeMissionSet}</b>
      <p>完成任務可以拿獎勵。做完一組可以刷新下一組。</p>
      <p>完成度：${completeCount}/${state.missions.length}</p>
      <button onclick="newMissionSet()">刷新下一組任務</button>
    </div>
    ${state.missions.map(m => `
      <div class="schedule-item ${m.done ? "mission-done" : ""}">
        <b>${m.done ? "✅" : "⬜"} ${escapeHTML(m.title)}</b>
        <p>${escapeHTML(m.detail)}</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${missionPercent(m)}%"></div></div>
        <p>${m.progress}/${m.target}</p>
        <p>獎勵：${Object.entries(m.reward || {}).map(([k,v]) => `${k} ${v > 0 ? "+" : ""}${v}`).join(" · ")}</p>
      </div>
    `).join("")}
  `;
}
window.renderMissions = renderMissions;

function addPrivateDM(source = "Instagram", name = "陌生人", text = "你好，可以聊一下嗎？", risk = 6) {
  const id = "dm_" + Date.now() + "_" + Math.floor(Math.random() * 999);
  state.privateDMs.unshift({
    id,
    source,
    name,
    risk,
    unread: true,
    messages: [{ from: "them", text }]
  });
  state.privateDMs = state.privateDMs.slice(0, 20);
}

function generatePrivateDM() {
  const pool = [
    { source: "Instagram", name: "圈內前輩", text: "看到你今天的舞台了，有空聊聊嗎？", risk: 6 },
    { source: "Instagram", name: "匿名小號", text: "我知道你和誰在一起，想不想先聽我說？", risk: 16 },
    { source: "staff", name: "攝影棚staff", text: "今天那張後台合照我可以先發你。", risk: 7 },
    { source: "活動後台", name: "隔壁團成員", text: "剛剛彩排很帥，下次可以一起練嗎？", risk: 10 },
    { source: "AirDrop", name: "附近的iPhone", text: "AirDrop收到：一張未公開行程表截圖。", risk: 18 },
    { source: "AirDrop", name: "Unknown iPhone", text: "AirDrop收到：『別走正門，有人在拍。』", risk: 12 }
  ];
  const dm = randomFrom(pool);
  addPrivateDM(dm.source, dm.name, dm.text, dm.risk);
  pushRefreshLog("收到新的私聯DM");
}

function renderPrivateDMList() {
  const unread = state.privateDMs.filter(d => d.unread).length;
  appContent.innerHTML = `
    <div class="card">
      <b>💌 私聯 DM 收件箱</b>
      <p>可以透過 Instagram、活動後台、staff，甚至 AirDrop 開始私聯對話。</p>
      <p>未讀：${unread} · 緋聞風險：${state.scandalRisk} · 私生風險：${state.sasaengRisk}</p>
      <div class="composer-row">
        <button onclick="generatePrivateDM(); renderPrivateDMList();">刷新DM</button>
        <button class="ghost" onclick="addAirdropDM()">模擬 AirDrop</button>
      </div>
    </div>
    ${state.privateDMs.map(dm => `
      <div class="schedule-item dm-contact">
        <div>
          <b>${dm.unread ? "🔴" : "⚪"} ${escapeHTML(dm.name)}</b>
          <p class="dm-source">${escapeHTML(dm.source)} · 風險 ${dm.risk}</p>
          <p>${escapeHTML(dm.messages[dm.messages.length - 1].text)}</p>
        </div>
        <button onclick="openPrivateDM('${dm.id}')">打開</button>
      </div>
    `).join("") || `<div class="post">暫時沒有DM。</div>`}
  `;
}
window.renderPrivateDMList = renderPrivateDMList;

function addAirdropDM() {
  const options = [
    "AirDrop收到：一張你在後台和某人說話的照片。",
    "AirDrop收到：未公開行程表截圖。",
    "AirDrop收到：『你手機號是不是這個？』",
    "AirDrop收到：一張模糊的約會路透。"
  ];
  addPrivateDM("AirDrop", randomFrom(["附近的iPhone", "Unknown iPhone", "匿名設備"]), randomFrom(options), randomFrom([12, 15, 18, 22]));
  renderPrivateDMList();
  toast("收到一個 AirDrop 私聯。");
}
window.addAirdropDM = addAirdropDM;

function openPrivateDM(id) {
  const dm = state.privateDMs.find(d => d.id === id);
  if (!dm) return;
  dm.unread = false;
  state.activePrivateDM = id;
  renderPrivateDMChat(id);
}
window.openPrivateDM = openPrivateDM;

function dmReplyFor(text, dm) {
  const topic = classifyText(text);
  if (dm.source === "AirDrop") {
    if (/誰|who|你是誰|你是谁/i.test(text)) return randomFrom(["先別問我是誰，你只要知道有人在拍。", "我只是提醒你，別走正門。", "你不信也可以，等下熱搜見。"]);
    if (/不要|別|stop|滾|走開/i.test(text)) return randomFrom(["你越緊張越像真的。", "好啊，那我發論壇。", "只是提醒你，別生氣。"]);
    return randomFrom(["你最好小心一點。", "照片我還有別張。", "有人比我更早知道你的行程。"]);
  }
  if (dm.source === "Instagram") {
    if (topic === "love") return randomFrom(["你這樣說，我會當真。", "那今晚可以見一面嗎？", "我不會截圖，但你要小心。"]);
    if (topic === "drama") return randomFrom(["熱搜我看到了，你還好嗎？", "需要我幫你說話嗎？", "先別自己回，會被放大。"]);
    return randomFrom(["剛剛看到你回我了。", "你真的會回私訊啊？", "那我可以繼續找你嗎？"]);
  }
  if (dm.source === "staff" || dm.source === "活動後台") {
    if (topic === "schedule" || /門|車|行程|路線/.test(text)) return randomFrom(["我帶你走側門。", "車在B1，不要走正門。", "我先幫你看一下外面有沒有人。"]);
    return randomFrom(["收到，我幫你安排。", "這邊可以，但不要被拍。", "你等我消息。"]);
  }
  return randomFrom(["收到。", "你這樣說有點危險。", "先別公開講。"]);
}

function renderPrivateDMChat(id) {
  const dm = state.privateDMs.find(d => d.id === id);
  if (!dm) return renderPrivateDMList();
  appContent.innerHTML = `
    <div class="card">
      <button class="ghost" onclick="renderPrivateDMList()">← 回到DM列表</button>
      <h3>${escapeHTML(dm.name)}</h3>
      <p>${escapeHTML(dm.source)} · 風險 ${dm.risk}</p>
      ${dm.source === "AirDrop" ? `<div class="airdrop-card card"><b>AirDrop 私聯</b><p>這類訊息風險高，可能觸發私生/黑料。</p></div>` : ""}
    </div>
    <div class="chat-window" id="privateDMWindow">
      ${dm.messages.map(m => `<div class="bubble ${m.from === "me" ? "me" : "them"}">${escapeHTML(m.text)}</div>`).join("")}
    </div>
    <div class="chat-input-bar">
      <input id="privateDMInput" placeholder="回覆私聯..." />
      <button onclick="sendPrivateDM('${id}')">➤</button>
    </div>
  `;
  setTimeout(() => {
    const box = document.querySelector("#privateDMWindow");
    if (box) box.scrollTop = box.scrollHeight;
  }, 0);
}
window.renderPrivateDMChat = renderPrivateDMChat;

function sendPrivateDM(id) {
  const dm = state.privateDMs.find(d => d.id === id);
  const input = document.querySelector("#privateDMInput");
  if (!dm || !input) return;
  const text = input.value.trim();
  if (!text) return toast("先輸入回覆。");

  dm.messages.push({ from: "me", text });
  dm.messages.push({ from: "them", text: dmReplyFor(text, dm) });

  addStats({
    love: dm.source === "Instagram" ? 3 : 0,
    scandalRisk: Math.ceil(dm.risk / 3),
    sasaengRisk: dm.source === "AirDrop" ? Math.ceil(dm.risk / 2) : 1,
    privacy: dm.source === "AirDrop" ? -4 : -1,
    energy: -2
  });

  if (dm.risk > 14 && Math.random() < 0.55) {
    createBlackMaterialTrend(`${dm.source} 私聯`);
  }

  updateMission("m_dm", 1);
  saveGame(false);
  updateHomeStats();
  renderPrivateDMChat(id);
}
window.sendPrivateDM = sendPrivateDM;

function nowStamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function pushRefreshLog(text) {
  state.refreshLog.unshift(`${nowStamp()} · ${text}`);
  state.refreshLog = state.refreshLog.slice(0, 20);
}

function makeFanCommentForContext(contextText) {
  return generateRelatedComments(contextText, "weverse")[0];
}

function addAutoPost(platform, text, image = "") {
  if (!state.posts[platform]) state.posts[platform] = [];
  state.posts[platform].unshift({
    text,
    image,
    likes: makeLikeCount(80),
    comments: generateRelatedComments(text, platform),
    time: "新"
  });
  state.posts[platform] = state.posts[platform].slice(0, 12);
}

function generateCompanyUpdate() {
  const updates = [
    { title: "經紀人通知", text: "公司更新了明天行程，音樂節目預錄提前半小時。", delta: { companyTrust: 1 } },
    { title: "回歸情報", text: "新歌demo二輪評估通過，請準備錄音試唱。", delta: { comebackProgress: 5 } },
    { title: "品牌窗口", text: "有品牌在觀察你的最近輿論，保持低風險會增加邀約機率。", delta: { brandFavor: 1 } },
    { title: "公關提醒", text: "熱搜區有新的討論，建議先不要自己下場回覆。", delta: { scandalRisk: 1 } }
  ];
  const u = randomFrom(updates);
  state.companyNotices.unshift({ title: u.title, text: u.text, read: false });
  state.companyNotices = state.companyNotices.slice(0, 10);
  addStats(u.delta);
  pushRefreshLog("公司有新通知");
}

function generateHotsearchUpdate() {
  const roll = Math.random();
  if (roll < 0.34) {
    createBlackMaterialTrend("系統刷新");
  } else if (roll < 0.72) {
    createEncounterTrend("路人偶遇刷新");
  } else {
    state.trends.unshift({
      platform: randomFrom(["微博", "X/Twitter", "論壇", "小紅書"]),
      title: randomFrom([
        `${state.name} 新飯拍討論度上升`,
        `${state.name} 練習室片段被剪成安利視頻`,
        `${state.name} 粉絲名 ${state.fanName} 上小熱搜`,
        `${state.name} 今日機場穿搭討論`
      ]),
      heat: randomFrom(["1.1w", "2.8w", "35k", "5.4w"]),
      danger: false,
      kind: "normal",
      handled: false
    });
    addStats({ popularity: 2, fans: 45 });
  }
  state.trends = state.trends.slice(0, 14);
  pushRefreshLog("熱搜刷新了新話題");
}

function generateBubbleUpdate() {
  const prompts = [
    "寶寶今天會來泡泡嗎ㅠㅠ",
    "剛剛看到你的飯拍了，狀態好好。",
    "今天也要好好吃飯，不要只喝咖啡。",
    "熱搜不要看，我們都在。",
    "想你了，可以發一句話嗎？"
  ];
  state.bubbleChat.push({
    from: "them",
    name: randomFrom([state.fanName, "晚睡粉", "續費成功", "前排粉", "泡泡蹲守"]),
    text: randomFrom(prompts)
  });
  state.bubbleChat = state.bubbleChat.slice(-60);
  pushRefreshLog("泡泡收到粉絲新訊息");
}

function generateKakaoUpdate() {
  const chatKeys = ["manager", "member", "crush", "staff", "fan"];
  const key = randomFrom(chatKeys);
  const messages = {
    manager: [
      "我剛更新了公司通知，你看一下。",
      "熱搜那邊有新話題，先不要自己回。",
      "品牌那邊問你最近狀態，這幾天穩一點。",
      "明天行程可能提前，別太晚睡。"
    ],
    member: [
      "我看到新飯拍了，你今天好出圈。",
      "等下練習室見？",
      "你有看到群裡新通知嗎？",
      "經紀人又開始催了哈哈。"
    ],
    crush: [
      "剛剛看到有人拍你，注意一點。",
      "今天累嗎？",
      "想見你，但我怕被拍。",
      "你是不是又沒吃飯？"
    ],
    staff: [
      "今天外面人多，等下走側門。",
      "車已經到了，別自己出來。",
      "論壇有人在猜你行程，我會處理。",
      "後台通道我幫你確認好了。"
    ],
    fan: [
      "寶寶今天狀態好好。",
      "不要被惡評影響，我們在。",
      "什麼時候來泡泡啊？",
      "今天也好喜歡你。"
    ]
  };
  if (!state.chats[key]) state.chats[key] = [];
  state.chats[key].push({ from: "them", text: randomFrom(messages[key]) });
  state.chats[key] = state.chats[key].slice(-50);
  pushRefreshLog(`Kakao 有新的 ${key} 訊息`);
}

function generateMailUpdate() {
  const letters = [
    "今天偶遇你的人說你很有禮貌，我真的很替你開心。",
    "就算有黑料熱搜，我也會先相信你。",
    "你送的小禮物收到了，真的很用心。",
    "舞台上的你很亮，不要懷疑自己。",
    "希望你不要被公司和熱搜壓垮，慢慢來。"
  ];
  state.letters.unshift(randomFrom(letters));
  state.letters = state.letters.slice(0, 12);
  pushRefreshLog("收到新的粉絲信");
}

function generateActivityUpdate() {
  const surprise = randomFrom([
    "公司臨時加了一個綜藝邀約。",
    "音樂節目彩排時間更新。",
    "有品牌詢問你的檔期。",
    "粉絲見面會新增一個互動環節。"
  ]);
  state.activityHistory.unshift(surprise);
  state.activityHistory = state.activityHistory.slice(0, 12);
  if (surprise.includes("品牌")) addStats({ brandFavor: 2 });
  pushRefreshLog("活動行程有新變化");
}

function generateSasaengUpdate() {
  if (Math.random() * 100 < state.sasaengRisk + 18) {
    const incident = randomFrom([
      { title: "陌生號碼騷擾", text: "有陌生號碼連續打來，疑似資訊外流。", severity: 2, handled: false },
      { title: "站姐蹲點", text: "staff提醒你公司門口有人長時間蹲守。", severity: 2, handled: false },
      { title: "行程被猜中", text: "論壇有人猜到你下一個行程地點。", severity: 3, handled: false }
    ]);
    state.sasaengIncidents.unshift(incident);
    addStats({ sasaengRisk: incident.severity * 2, privacy: -incident.severity * 3 });
    pushRefreshLog("私生中心有新警報");
  } else {
    pushRefreshLog("私生中心已刷新，暫無新事件");
  }
}

function generateShopUpdate() {
  const sale = randomFrom([
    "造型師推薦了新的私服方向。",
    "粉絲禮物供應商更新了包裝選項。",
    "高奢造型折扣窗口出現，但還是很貴。",
    "你最近的穿搭討論度上升，買衣服更容易出偶遇文。"
  ]);
  state.shoppingHistory.unshift(`系統提示：${sale}`);
  state.shoppingHistory = state.shoppingHistory.slice(0, 12);
  pushRefreshLog("消費商店刷新了提示");
}

function generateContentForApp(app, force = false) {
  state.appViews[app] = (state.appViews[app] || 0) + 1;
  const viewCount = state.appViews[app];

  // Do not flood every single tap unless forced. First view after upload/refresh always creates content.
  const shouldGenerate = force || viewCount === 1 || Math.random() < 0.75;
  if (!shouldGenerate) return;

  if (app === "company") generateCompanyUpdate();
  else if (app === "hotsearch") generateHotsearchUpdate();
  else if (app === "bubble") generateBubbleUpdate();
  else if (app === "kakao") generateKakaoUpdate();
  else if (app === "mail") generateMailUpdate();
  else if (app === "activities") generateActivityUpdate();
  else if (app === "sasaeng") generateSasaengUpdate();
  else if (app === "shop") generateShopUpdate();
  else if (app === "weverse") {
    const text = randomFrom([
      `${state.fanName} 今天在WVS發了新的安利帖。`,
      `粉絲整理了 ${state.name} 的舞台高光合集。`,
      `有人在WVS問你什麼時候再來回覆留言。`
    ]);
    addAutoPost("weverse", text, "");
    pushRefreshLog("WVS 刷新了粉絲內容");
  } else if (app === "instagram") {
    const text = randomFrom([
      "新飯拍在IG流傳，評論都在問衣服品牌。",
      "粉絲標記了你的新story截圖。",
      "有人整理了你的今日穿搭。"
    ]);
    addAutoPost("instagram", text, randomFrom(["📷", "🪞", "🎤"]));
    pushRefreshLog("Instagram 刷新了新內容");
  } else if (app === "live") {
    if (!state.liveActive) {
      state.liveChat.push({ from: "them", name: randomFrom([state.fanName, "路人粉", "直播蹲守"]), text: "什麼時候開直播啊？" });
    }
    pushRefreshLog("直播區有新留言");
  } else if (app === "profile" || app === "stats") {
    if (Math.random() < 0.5) createEncounterTrend("主頁訪問");
    pushRefreshLog("主頁數據刷新");
  } else if (app === "privateContact") {
    if (Math.random() < 0.75) generatePrivateDM();
    if (Math.random() < 0.35) maybePublicBuzz("私聯風聲", "bad");
    pushRefreshLog("私聯線索刷新");
  } else if (app === "call") {
    addStats({ fans: 35, popularity: 1 });
    pushRefreshLog("打Call數據刷新");
  }

  state.lastGenerated[app] = Date.now();
}
window.generateContentForApp = generateContentForApp;

function showScreen(screen) {
  setupScreen.classList.remove("active");
  homeScreen.classList.remove("active");
  appScreen.classList.remove("active");
  screen.classList.add("active");
}

function saveGame(show = true) {
  localStorage.setItem("idolSimulatorAgencyActivitySave", JSON.stringify(state));
  if (show) toast("💾 已存檔");
}

function loadGame() {
  const raw = localStorage.getItem("idolSimulatorAgencyActivitySave");
  if (!raw) return false;
  Object.assign(state, JSON.parse(raw));
  selectedColor = state.color;
  applyTheme();
  updateHomeStats();
  return true;
}

function startGame(random = false) {
  if (random) {
    const names = ["接不接", "君渡", "米朵", "夏眠", "林霧", "小椿", "宋梨"];
    const fanNames = ["雨🌧️", "小月亮", "渡口", "雲朵", "薄荷糖", "星火", "梨渦"];
    const avatars = ["⭐", "🌸", "🦋", "🍒", "🐈", "🌙"];
    playerNameInput.value = randomFrom(names);
    fanNameInput.value = randomFrom(fanNames);
    avatarInput.value = randomFrom(avatars);
    ageInput.value = Math.floor(Math.random() * 8) + 16;
  }
  state.name = playerNameInput.value.trim() || "接不接";
  state.fanName = fanNameInput.value.trim() || "雨🌧️";
  state.age = clamp(Number(ageInput.value) || 18, 14, 35);
  state.avatar = avatarInput.value.trim() || "⭐";
  state.color = selectedColor;
  state.trends = state.trends.map(t => ({ ...t, title: t.title.replace("接不接", state.name) }));
  applyTheme();
  updateHomeStats();
  saveGame(false);
  showScreen(homeScreen);
}

function editCharacter() {
  playerNameInput.value = state.name;
  fanNameInput.value = state.fanName;
  ageInput.value = state.age;
  avatarInput.value = state.avatar;
  setupAvatarPreview.textContent = state.avatar;
  selectedColor = state.color;
  document.querySelectorAll(".color-dot").forEach(dot => dot.classList.toggle("selected", dot.dataset.color === selectedColor));
  showScreen(setupScreen);
}
window.editCharacter = editCharacter;

function openApp(app) {
  currentApp = app;
  appTitle.textContent = appNames[app] || app;
  generateContentForApp(app);
  saveGame(false);
  updateHomeStats();
  renderApp(app);
  showScreen(appScreen);
}

function renderApp(app) {
  if (app === "profile") return renderProfile();
  if (app === "missions") return renderMissions();
  if (app === "company") return renderCompany();
  if (app === "weverse") return renderWeverseUI();
  if (app === "bubble") return renderBubbleChat();
  if (app === "instagram") return renderInstagramUI();
  if (app === "live") return renderLiveRoom();
  if (app === "kakao") return renderKakaoTalkUI();
  if (app === "privateContact") return renderPrivateContact();
  if (app === "sasaeng") return renderSasaeng();
  if (app === "hotsearch") return renderHotsearch();
  if (app === "activities") return renderActivities();
  if (app === "mail") return renderMail();
  if (app === "shop") return renderShop();
  if (app === "save") return renderSave();
  if (app === "stats") return renderStats();
  if (app === "call") return renderActionApp("打Call", [
    ["發起舞台打榜", { fans: 260, popularity: 6, energy: -5 }, `${state.fanName}開始衝播放量。`],
    ["空降粉絲群鼓勵", { fans: 180, popularity: 5, love: 4, scandalRisk: 2 }, "你短暫出現，粉絲群直接炸了。"]
  ]);
}

function renderProfile() {
  appContent.innerHTML = `
    <div class="card profile-card">
      <div class="profile-avatar">${escapeHTML(state.avatar)}</div>
      <h2>${escapeHTML(state.name)}</h2>
      <span class="badge-pill">${escapeHTML(state.career)}</span>
      <span class="badge-pill">${escapeHTML(colorThemes[state.color].name)}應援色</span>
      <p>${state.age}歲 · 第${state.year}年 ${state.month}月${state.phase}</p>
      <div class="profile-stats">
        <div><b>${state.posts.weverse.length + state.posts.instagram.length + state.posts.bubble.length}</b><span>帖子</span></div>
        <div><b>${state.fans.toLocaleString()}</b><span>${escapeHTML(state.fanName)}</span></div>
        <div><b>₩${state.money.toLocaleString()}</b><span>收入</span></div>
      </div>
      <div class="card">
        <b>人氣板</b>
        <p>人氣 ${state.popularity} · 體力 ${state.energy} · 唱跳 ${state.skill} · 黑粉 ${state.blackFans}</p>
        <p>公司信任 ${state.companyTrust} · 緋聞風險 ${state.scandalRisk} · 私生風險 ${state.sasaengRisk}</p>
        <p>品牌好感 ${state.brandFavor} · 衣櫥值 ${state.wardrobe} · 回歸進度 ${state.comebackProgress}%</p>
        <p>隱私安全 ${state.privacy}</p>
      </div>
      <button onclick="editCharacter()">修改身份</button>
    </div>
  `;
}

function renderCompany() {
  const notices = state.companyNotices.map((n, i) => `
    <div class="schedule-item">
      <b>${escapeHTML(n.title)}</b>
      <p>${escapeHTML(n.text)}</p>
      <button onclick="readCompanyNotice(${i})">${n.read ? "已讀" : "確認收到"}</button>
    </div>
  `).join("");

  appContent.innerHTML = `
    <div class="card">
      <b>🏢 公司中心</b>
      <p>經紀人 / 回歸情報 / 公關提醒都在這裡。</p>
      <p>公司信任：${state.companyTrust} · 回歸進度：${state.comebackProgress}% · 緋聞風險：${state.scandalRisk}</p>
      <p>品牌好感：${state.brandFavor} · 黑粉：${state.blackFans} · 收入：₩${state.money.toLocaleString()}</p>
      <div class="composer-row">
        <button onclick="companyAction('demo')">聽新歌demo</button>
        <button onclick="companyAction('meeting')">開回歸會議</button>
      </div>
      <div class="composer-row">
        <button onclick="companyAction('pr')">公關降熱搜</button>
        <button onclick="companyAction('train')">公司訓練</button>
      </div>
    </div>
    ${notices}
  `;
}

function readCompanyNotice(index) {
  state.companyNotices[index].read = true;
  addStats({ companyTrust: 2 });
  saveGame(false);
  updateHomeStats();
  renderCompany();
  toast("公司信任 +2");
}
window.readCompanyNotice = readCompanyNotice;

function companyAction(type) {
  const map = {
    demo: ["你聽了新歌demo，開始理解這次回歸概念。", { comebackProgress: 18, energy: -5, companyTrust: 3 }],
    meeting: ["你參加回歸會議，提出的造型想法被採納。", { comebackProgress: 22, companyTrust: 6, energy: -8 }],
    pr: ["公司發了公關通稿，熱搜降溫，但花了一筆錢。", { scandalRisk: -12, blackFans: -20, money: -800, companyTrust: 4 }],
    train: ["公司安排高強度訓練，實力變強但很累。", { skill: 9, energy: -18, companyTrust: 4 }]
  };
  const [text, delta] = map[type];
  addStats(delta);
  saveGame(false);
  updateHomeStats();
  renderCompany();
  toast(text);
}
window.companyAction = companyAction;


function generateLiveComments(text) {
  const topic = classifyText(text);
  const pools = {
    practice: [
      "練習室直播也太真實了。",
      "你喘氣聲我都聽到了，快喝水。",
      "今天舞台練到哪一段了？",
      "唱兩句新part可以嗎ㅠㅠ"
    ],
    comeback: [
      "你是不是劇透回歸了？？？",
      "新歌！新歌！新歌！",
      "公司會不會殺過來關直播哈哈哈。",
      "這個表情絕對有事。"
    ],
    tired: [
      "快下播去睡！",
      "臉色真的有點累，別硬撐。",
      "我們可以少看直播，但你不能少睡。",
      "今天辛苦了，抱抱。"
    ],
    food: [
      "吃播開起來！",
      "給我看你吃什麼。",
      "你不要又只喝咖啡。",
      "這個點吃飯好有生活感。"
    ],
    love: [
      "你剛剛說想誰？？？",
      "啊啊啊啊你在撒嬌嗎。",
      "這句話我錄屏了。",
      "不要這樣看鏡頭，我會暈。"
    ],
    visual: [
      "今天妝造好好看。",
      "鏡頭太糊也擋不住漂亮。",
      "截圖了，這張可以當頭像。",
      "你臉真的太小了。"
    ],
    drama: [
      "別管熱搜，我們都在。",
      "公司快來做事。",
      "不要看惡評！",
      "我們相信你。"
    ],
    daily: [
      "聽得到！",
      "今天也來了ㅠㅠ",
      "你說什麼我都愛聽。",
      "直播間人越來越多了。"
    ]
  };
  const names = [state.fanName, "追星女孩⭐", "打工人💼", "熬夜粉", "米精🐰", "草莓🍓"];
  return Array.from({ length: Math.floor(Math.random() * 4) + 4 }, () => ({
    name: randomFrom(names),
    text: randomFrom(pools[topic] || pools.daily)
  }));
}

function generateBubbleReplies(text) {
  const topic = classifyText(text);
  const pools = {
    practice: [
      "練習辛苦了ㅠㅠ 不准受傷。",
      "月底評級一定會過的，我們都相信你。",
      "你努力的樣子真的會被看見。"
    ],
    comeback: [
      "這是在暗示回歸嗎？？？",
      "我開始存錢了，專輯來吧。",
      "拜託公司這次給你好造型。"
    ],
    tired: [
      "去睡覺！現在！",
      "不要硬撐，我們明天也在。",
      "心疼死了，今天不許熬夜。"
    ],
    food: [
      "吃飽了嗎？不要只吃一點點。",
      "下次發照片給我們看嘛。",
      "這個點吃飯好可愛。"
    ],
    love: [
      "啊啊啊啊你說想我們了！",
      "這條泡泡我要截圖供起來。",
      "今天也最喜歡你。"
    ],
    visual: [
      "自拍呢自拍呢自拍呢？",
      "不用看也知道你今天很好看。",
      "發照片，我們很需要。"
    ],
    drama: [
      "不要看那些話，我們陪你。",
      "黑粉真的很吵，別理。",
      "公司能不能保護一下你啊。"
    ],
    daily: [
      "收到泡泡的瞬間心情好了。",
      "今天也等到你了。",
      "你講什麼都可以，多講點。",
      "寶寶今天也要開心。"
    ]
  };
  const names = [state.fanName, "小號蹲泡泡", "晚睡粉", "前排粉", "續費成功"];
  return Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => ({
    from: "them",
    name: randomFrom(names),
    text: randomFrom(pools[topic] || pools.daily)
  }));
}

function renderBubbleChat() {
  appContent.innerHTML = `
    <div class="card">
      <b>🫧 Bubble</b>
      <p>像真正泡泡一樣，你發一句，粉絲會根據內容回你。甜一點會漲粉，太危險會升緋聞風險。</p>
      <p>${state.fanName} 在線：${Math.floor(state.fans * 0.18).toLocaleString()}</p>
    </div>
    <div class="chat-window" id="bubbleWindow">
      ${state.bubbleChat.map(m => `
        <div class="bubble ${m.from === "me" ? "me" : "them"}">
          ${m.from === "them" ? `<b>${escapeHTML(m.name)}</b><br>` : ""}
          ${escapeHTML(m.text)}
        </div>`).join("")}
    </div>
    <div class="chat-input-bar">
      <input id="bubbleInput" placeholder="給 ${escapeHTML(state.fanName)} 發泡泡..." />
      <button onclick="sendBubble()">➤</button>
    </div>
  `;
  setTimeout(() => {
    const box = document.querySelector("#bubbleWindow");
    if (box) box.scrollTop = box.scrollHeight;
  }, 0);
}

function sendBubble() {
  const input = document.querySelector("#bubbleInput");
  const text = input.value.trim();
  if (!text) return toast("先輸入泡泡內容。");
  state.bubbleChat.push({ from: "me", name: state.name, text });
  const replies = generateBubbleReplies(text);
  state.bubbleChat.push(...replies);
  addStats(textScore(text));
  addStats({ fans: replies.length * 18, energy: -2 });
  updateMission("m_bubble_3", 1);
  state.posts.bubble.unshift({
    text,
    image: "",
    likes: makeLikeCount(60),
    comments: replies.map(r => ({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      name: r.name,
      text: r.text,
      replies: []
    })),
    time: "剛剛"
  });
  saveGame(false);
  updateHomeStats();
  renderBubbleChat();
  toast("泡泡已發送，粉絲回覆了你。");
}
window.sendBubble = sendBubble;

function renderLiveRoom() {
  if (!state.liveActive) {
    appContent.innerHTML = `
      <div class="card">
        <b>🎙️ 直播</b>
        <p>開直播後，你可以自由輸入你想說的話，彈幕會根據你說的內容即時回應。</p>
        <div class="composer-row">
          <button onclick="startLive('practice')">練習室直播</button>
          <button onclick="startLive('chat')">深夜聊天</button>
        </div>
        <div class="composer-row">
          <button onclick="startLive('food')">吃播</button>
          <button onclick="startLive('comeback')">回歸倒數直播</button>
        </div>
      </div>
    `;
    return;
  }

  appContent.innerHTML = `
    <div class="card">
      <b>🔴 LIVE · ${state.liveViewers.toLocaleString()} viewers</b>
      <p>人氣 ${state.popularity} · 緋聞風險 ${state.scandalRisk}</p>
      <button class="ghost wide" onclick="endLive()">結束直播</button>
    </div>
    <div class="chat-window" id="liveWindow">
      ${state.liveChat.map(m => `
        <div class="bubble ${m.from === "me" ? "me" : "them"}">
          ${m.from === "them" ? `<b>${escapeHTML(m.name)}</b><br>` : ""}
          ${escapeHTML(m.text)}
        </div>`).join("")}
    </div>
    <div class="chat-input-bar">
      <input id="liveInput" placeholder="直播中說點什麼..." />
      <button onclick="sendLiveLine()">➤</button>
    </div>
  `;
  setTimeout(() => {
    const box = document.querySelector("#liveWindow");
    if (box) box.scrollTop = box.scrollHeight;
  }, 0);
}

function startLive(type) {
  state.liveActive = true;
  state.liveViewers = Math.max(120, Math.floor(state.fans * (Math.random() * 0.7 + 0.35)));
  const intro = {
    practice: "我現在在練習室，聽得到嗎？",
    chat: "今天想和你們聊聊天。",
    food: "我終於吃飯了，你們吃了嗎？",
    comeback: "有些事情還不能說，但快了。"
  }[type];
  state.liveChat = [{ from: "me", name: state.name, text: intro }, ...generateLiveComments(intro).map(c => ({ from: "them", ...c }))];
  addStats({ popularity: 3, fans: 120, energy: -6 });
  saveGame(false);
  updateHomeStats();
  maybeSasaengIncident("直播");
  maybePublicBuzz("直播片段", "mixed");
  renderLiveRoom();
  toast("直播開始了。");
}
window.startLive = startLive;

function sendLiveLine() {
  const input = document.querySelector("#liveInput");
  const text = input.value.trim();
  if (!text) return toast("先輸入直播內容。");
  state.liveChat.push({ from: "me", name: state.name, text });
  state.liveChat.push(...generateLiveComments(text).map(c => ({ from: "them", ...c })));
  state.liveViewers += Math.floor(Math.random() * 180) + 40;
  addStats(textScore(text));
  addStats({ popularity: 2, fans: 80, energy: -3 });
  if (state.scandalRisk > 55) {
    state.trends.unshift({ platform: "微博", title: `${state.name} 直播發言引爭議`, heat: "5.1w", danger: true });
  }
  saveGame(false);
  updateHomeStats();
  renderLiveRoom();
}
window.sendLiveLine = sendLiveLine;

function endLive() {
  state.liveActive = false;
  state.posts.live.unshift({
    text: `直播結束，最高觀看 ${state.liveViewers.toLocaleString()} 人。`,
    image: "🎙️",
    likes: makeLikeCount(100),
    comments: generateRelatedComments("直播結束 今天也辛苦了", "live"),
    time: "剛剛"
  });
  addStats({ energy: -4, money: Math.floor(state.liveViewers * 0.03) });
  updateMission("m_live", 1);
  saveGame(false);
  updateHomeStats();
  renderLiveRoom();
  toast("直播結束，獲得直播收益。");
}
window.endLive = endLive;

function renderKakaoEnhanced() {
  const contacts = {
    manager: "經紀人",
    member: "隊友",
    crush: "生佐",
    staff: "staff",
    fan: state.fanName
  };
  const quickPrompts = {
    manager: ["回歸資料發我一下", "明天行程幾點", "熱搜要回應嗎"],
    member: ["下班吃拉麵嗎", "今天舞台一起練嗎", "你看到評論了嗎"],
    crush: ["你還在樓下嗎", "今天有點想你", "不要被拍到"],
    staff: ["幫我避開正門", "後台可以見一下嗎", "公關那邊怎麼說"],
    fan: ["今天也謝謝你", "不要熬夜等我", "想你們了"]
  };

  appContent.innerHTML = `
    <div class="tabs">
      ${Object.entries(contacts).map(([key, name]) => `<button class="tab ${currentChat === key ? "active" : ""}" onclick="switchChat('${key}')">${escapeHTML(name)}</button>`).join("")}
    </div>
    <div class="card">
      <b>${escapeHTML(contacts[currentChat])}</b>
      <p>${currentChat === "manager" ? "公司/回歸/熱搜相關會更像工作對話。" : currentChat === "crush" ? "私下聊天會增加好感，也會提高緋聞風險。" : "你可以自由輸入，對方會根據你說的內容回覆。"}</p>
      <div class="composer-row">
        ${quickPrompts[currentChat].map(p => `<button class="ghost" onclick="insertPrompt('chatInput', '${escapeHTML(p)}')">${escapeHTML(p)}</button>`).join("")}
      </div>
    </div>
    <div class="chat-window" id="chatWindow">
      ${state.chats[currentChat].map(m => `<div class="bubble ${m.from}">${escapeHTML(m.text)}</div>`).join("")}
    </div>
    <div class="chat-input-bar">
      <input id="chatInput" placeholder="說點什麼..." />
      <button onclick="sendChat()">➤</button>
    </div>
  `;
  setTimeout(() => {
    const chatWindow = document.querySelector("#chatWindow");
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 0);
}


function renderInstagramUI() {
  const postCount = state.posts.instagram.length;
  const tiles = state.posts.instagram.slice(0, 12).map(post => `
    <div class="ig-tile">
      <span>${post.image || "📷"}</span>
      <p>${escapeHTML(post.text).slice(0, 34)}</p>
    </div>
  `).join("");

  const feed = state.posts.instagram.slice(0, 5).map((post, postIndex) => `
    <article class="ig-post">
      <div class="ig-post-head">
        <div class="ig-mini-avatar">${escapeHTML(state.avatar)}</div>
        <span>${escapeHTML(state.name)}</span>
        <span style="margin-left:auto;">•••</span>
      </div>
      <div class="ig-post-image">${post.image || "📷"}</div>
      <div class="ig-post-actions"><span>♡</span><span>💬</span><span>↗</span><span style="margin-left:auto;">▱</span></div>
      <b>${post.likes} likes</b>
      <p><b>${escapeHTML(state.name)}</b> ${escapeHTML(post.text)}</p>
      ${post.comments.slice(0, 2).map((c, commentIndex) => `
        <div class="comment">
          <b>${escapeHTML(c.name)}</b> ${escapeHTML(c.text)}
          ${c.replies.map(r => `<div class="reply"><b>${escapeHTML(state.name)}：</b>${escapeHTML(r)}</div>`).join("")}
          <div class="reply-box">
            <input id="reply-instagram-${postIndex}-${commentIndex}" placeholder="Reply..." />
            <button onclick="replyToComment('instagram', ${postIndex}, ${commentIndex})">↩</button>
          </div>
        </div>`).join("")}
    </article>
  `).join("");

  appContent.innerHTML = `
    <div class="ig-app">
      <div class="ig-header">
        <div class="ig-logo">Instagram</div>
        <div class="ig-icons"><span>♡</span><span>＋</span><span>☰</span></div>
      </div>

      <section class="ig-profile-row">
        <div class="ig-avatar">${escapeHTML(state.avatar)}</div>
        <div class="ig-counts">
          <div><b>${postCount}</b><span>posts</span></div>
          <div><b>${state.fans.toLocaleString()}</b><span>followers</span></div>
          <div><b>${Math.max(8, Math.floor(state.popularity / 2))}</b><span>following</span></div>
        </div>
      </section>

      <section class="ig-bio">
        <b>${escapeHTML(state.name)}</b><br>
        ${escapeHTML(state.career)} · ${escapeHTML(state.fanName)}<br>
        Brand favor ${state.brandFavor} · wardrobe ${state.wardrobe}
      </section>

      <div class="ig-actions">
        <button>Edit profile</button>
        <button>Share profile</button>
        <button>＋</button>
      </div>

      <div class="ig-story-row">
        ${["🎤 stage", "🪞 mirror", "🍜 food", "🏢 company", "💌 fans"].map(s => {
          const [emoji, label] = s.split(" ");
          return `<div class="ig-story"><div class="ig-story-circle">${emoji}</div>${label}</div>`;
        }).join("")}
      </div>

      <div class="ig-composer">
        <b>New post</b>
        <select id="imageSelect">
          <option value="📷">Photo</option>
          <option value="🪞">Mirror selfie</option>
          <option value="🍜">Food</option>
          <option value="🎤">Stage</option>
          <option value="🏢">Company</option>
        </select>
        <textarea id="instagramText" placeholder="Write a caption..."></textarea>
        <div class="composer-row">
          <button onclick="publishPost('instagram')">Share</button>
          <button class="ghost" onclick="insertPrompt('instagramText', '오늘도 연습실. 凌晨練習室。')">Prompt</button>
        </div>
      </div>

      <div class="ig-tabs"><div class="active">▦</div><div>▶</div><div>👤</div></div>
      <div class="ig-grid">${tiles || `<div class="ig-tile"><span>＋</span><p>first post</p></div>`}</div>

      ${feed}
    </div>
  `;
}

function renderWeverseUI() {
  const posts = state.posts.weverse.map((post, postIndex) => `
    <article class="wv-card">
      <div class="wv-card-head">
        <div class="wv-avatar">${escapeHTML(state.avatar)}</div>
        <div>
          ${escapeHTML(state.name)}
          <div class="wv-meta">Artist · ${post.time}</div>
        </div>
      </div>
      <p>${escapeHTML(post.text)}</p>
      ${post.image ? `<div class="post-image">${post.image}</div>` : ""}
      <div class="wv-reactions"><span>💜 ${post.likes}</span><span>💬 ${post.comments.length}</span><span>↗ Share</span></div>
      ${post.comments.map((c, commentIndex) => `
        <div class="wv-comment">
          <b>${escapeHTML(c.name)}</b><br>${escapeHTML(c.text)}
          ${c.replies.map(r => `<div class="reply"><b>${escapeHTML(state.name)} 回覆：</b>${escapeHTML(r)}</div>`).join("")}
          <div class="reply-box">
            <input id="reply-weverse-${postIndex}-${commentIndex}" placeholder="回覆粉絲..." />
            <button onclick="replyToComment('weverse', ${postIndex}, ${commentIndex})">↩</button>
          </div>
        </div>`).join("")}
    </article>
  `).join("");

  appContent.innerHTML = `
    <div class="wv-app">
      <div class="wv-header">
        <div class="wv-logo">Weverse</div>
        <div>🔔 ⚙️</div>
      </div>
      <section class="wv-banner">
        <h3>${escapeHTML(state.name)} Community</h3>
        <p>${escapeHTML(state.fanName)} with ${state.name} · comeback ${state.comebackProgress}%</p>
      </section>

      <div class="wv-tabs">
        <button class="wv-tab active">Artist</button>
        <button class="wv-tab">Fan</button>
        <button class="wv-tab">Media</button>
        <button class="wv-tab">LIVE</button>
        <button class="wv-tab">Notice</button>
      </div>

      <section class="wv-composer">
        <div class="profile-avatar-small">${escapeHTML(state.avatar)}</div>
        <div>
          <textarea id="weverseText" placeholder="分享你的日常..."></textarea>
          <div class="composer-row">
            <button onclick="publishPost('weverse')">Post</button>
            <button class="ghost" onclick="insertPrompt('weverseText', '今天也在練習，想到你們就有力氣。')">填一句</button>
          </div>
        </div>
      </section>

      ${posts || `<div class="wv-card">還沒有內容。發第一條Artist post吧。</div>`}
    </div>
  `;
}

function renderKakaoTalkUI() {
  const contacts = { manager: "經紀人", member: "隊友", crush: "生佐", staff: "staff", fan: state.fanName };
  const quickPrompts = {
    manager: ["回歸資料發我一下", "明天行程幾點", "熱搜要回應嗎"],
    member: ["下班吃拉麵嗎", "今天舞台一起練嗎", "你看到評論了嗎"],
    crush: ["你還在樓下嗎", "今天有點想你", "不要被拍到"],
    staff: ["幫我避開正門", "後台可以見一下嗎", "公關那邊怎麼說"],
    fan: ["今天也謝謝你", "不要熬夜等我", "想你們了"]
  };

  appContent.innerHTML = `
    <div class="kt-app">
      <div class="kt-top">
        <div class="kt-title-row">
          <div class="kt-avatar">${escapeHTML(currentChat === "manager" ? "💼" : currentChat === "staff" ? "🎧" : currentChat === "crush" ? "🌙" : currentChat === "fan" ? "💛" : state.avatar)}</div>
          <div>
            <h3>${escapeHTML(contacts[currentChat])}</h3>
            <small>${currentChat === "manager" ? "company account" : "online"}</small>
          </div>
        </div>
        <div class="kt-icons"><span>🔍</span><span>☰</span></div>
      </div>

      <div class="kt-tabs">
        ${Object.entries(contacts).map(([key, name]) => `<button class="kt-tab ${currentChat === key ? "active" : ""}" onclick="switchChat('${key}')">${escapeHTML(name)}</button>`).join("")}
      </div>

      <div class="card" style="margin: 12px 14px; border-radius: 18px;">
        <b>Quick reply</b>
        <div class="composer-row">
          ${quickPrompts[currentChat].map(p => `<button class="ghost" onclick="insertPrompt('chatInput', '${escapeHTML(p)}')">${escapeHTML(p)}</button>`).join("")}
        </div>
      </div>

      <div class="kt-window" id="chatWindow">
        <div class="kt-date">Today</div>
        ${state.chats[currentChat].map(m => `
          <div class="kt-bubble-row ${m.from === "me" ? "me" : "them"}">
            ${m.from === "them" ? `<div class="kt-avatar">${escapeHTML(currentChat === "manager" ? "💼" : currentChat === "staff" ? "🎧" : currentChat === "crush" ? "🌙" : currentChat === "fan" ? "💛" : state.avatar)}</div>` : ""}
            ${m.from === "me" ? `<span class="kt-time">${nowStamp ? nowStamp() : ""}</span>` : ""}
            <div class="kt-bubble ${m.from === "me" ? "me" : "them"}">${escapeHTML(m.text)}</div>
            ${m.from === "them" ? `<span class="kt-time">${nowStamp ? nowStamp() : ""}</span>` : ""}
          </div>
        `).join("")}
      </div>

      <div class="kt-input">
        <span>＋</span>
        <input id="chatInput" placeholder="Message" />
        <button onclick="sendChat()">➤</button>
      </div>
    </div>
  `;

  setTimeout(() => {
    const chatWindow = document.querySelector("#chatWindow");
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 0);
}

function renderPostApp(platform, title, buttonText, filler) {
  const photoSelect = platform === "instagram" ? `
    <select id="imageSelect">
      <option value="📷">相冊</option>
      <option value="🪞">鏡子自拍</option>
      <option value="🍜">食物照</option>
      <option value="🎤">舞台照</option>
      <option value="🏢">公司練習室</option>
    </select>` : "";
  const tabs = platform === "weverse" ? `
    <div class="tabs">
      <button class="tab active">日常</button><button class="tab">練習</button><button class="tab">舞台</button><button class="tab">回歸</button>
    </div>` : "";
  const posts = state.posts[platform].map((post, postIndex) => postHTML(platform, post, postIndex)).join("");
  appContent.innerHTML = `
    <div class="card composer">
      <b>${escapeHTML(title)}</b>
      ${tabs}
      ${photoSelect}
      <textarea id="${platform}Text" placeholder="你可以自己輸入任何內容。"></textarea>
      <div class="composer-row">
        <button onclick="publishPost('${platform}')">${buttonText}</button>
        <button class="ghost" onclick="insertPrompt('${platform}Text', '${escapeHTML(filler)}')">填一句</button>
      </div>
    </div>
    ${posts || `<div class="post">還沒有內容。發第一條吧。</div>`}
  `;
}

function postHTML(platform, post, postIndex) {
  const comments = post.comments.map((c, commentIndex) => `
    <div class="comment">
      <b>${escapeHTML(c.name)}</b><br>${escapeHTML(c.text)}
      ${c.replies.map(r => `<div class="reply"><b>${escapeHTML(state.name)} 回覆：</b>${escapeHTML(r)}</div>`).join("")}
      <div class="reply-box">
        <input id="reply-${platform}-${postIndex}-${commentIndex}" placeholder="回覆這條留言..." />
        <button onclick="replyToComment('${platform}', ${postIndex}, ${commentIndex})">↩</button>
      </div>
    </div>`).join("");

  return `
    <article class="post">
      <b>${escapeHTML(state.name)}</b>
      <p>${escapeHTML(post.text)}</p>
      ${post.image ? `<div class="post-image">${post.image}</div>` : ""}
      <div class="post-meta"><span>♡ ${post.likes}</span><span>💬 ${post.comments.length}</span><span>${post.time}</span></div>
      ${comments}
    </article>`;
}

function insertPrompt(id, text) {
  const el = document.querySelector("#" + id);
  if (el) el.value = text;
}
window.insertPrompt = insertPrompt;

function publishPost(platform) {
  const input = document.querySelector(`#${platform}Text`);
  const text = input.value.trim();
  if (!text) return toast("先寫點東西再發啦。");

  const score = textScore(text);
  addStats(score);

  const image = platform === "instagram" ? document.querySelector("#imageSelect").value : platform === "live" ? "🎙️" : "";
  const post = {
    text,
    image,
    likes: makeLikeCount(score.fans),
    comments: generateRelatedComments(text, platform),
    time: "剛剛"
  };

  state.posts[platform].unshift(post);
  if (platform === "weverse") updateMission("m_post_weverse", 1);
  if (platform === "bubble") updateMission("m_bubble_3", 1);
  if (classifyText(text) === "comeback") addStats({ comebackProgress: 4, companyTrust: -1 });
  maybeSasaengIncident(platform === "instagram" ? "Instagram" : platform === "weverse" ? "Weverse" : "公開平台");
  if (platform === 'instagram' || platform === 'weverse') maybePublicBuzz(platform === 'instagram' ? 'Instagram 發文' : 'Weverse 發文', 'mixed');
  saveGame(false);
  updateHomeStats();
  toast("發布成功！留言會根據你的內容生成。");
  renderApp(platform);
}
window.publishPost = publishPost;

function replyToComment(platform, postIndex, commentIndex) {
  const input = document.querySelector(`#reply-${platform}-${postIndex}-${commentIndex}`);
  const text = input.value.trim();
  if (!text) return toast("先輸入回覆。");
  state.posts[platform][postIndex].comments[commentIndex].replies.push(text);
  updateMission("m_reply_fans", 1);
  addStats(textScore(text));
  saveGame(false);
  updateHomeStats();
  toast("已回覆粉絲。");
  renderApp(platform);
}
window.replyToComment = replyToComment;

function makeLikeCount(base) {
  const number = Math.max(20, Math.floor(base * (Math.random() * 30 + 15)));
  if (number > 10000) return (number / 10000).toFixed(1) + "w";
  return number.toLocaleString();
}

function renderKakao() {
  const contacts = { manager: "經紀人", member: "隊友", crush: "生佐", staff: "staff", fan: state.fanName };
  appContent.innerHTML = `
    <div class="tabs">
      ${Object.entries(contacts).map(([key, name]) => `<button class="tab ${currentChat === key ? "active" : ""}" onclick="switchChat('${key}')">${escapeHTML(name)}</button>`).join("")}
    </div>
    <div class="chat-window" id="chatWindow">
      ${state.chats[currentChat].map(m => `<div class="bubble ${m.from}">${escapeHTML(m.text)}</div>`).join("")}
    </div>
    <div class="chat-input-bar">
      <input id="chatInput" placeholder="說點什麼..." />
      <button onclick="sendChat()">➤</button>
    </div>
  `;
  setTimeout(() => {
    const chatWindow = document.querySelector("#chatWindow");
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 0);
}

function switchChat(chat) {
  currentChat = chat;
  renderKakaoTalkUI();
}
window.switchChat = switchChat;

function sendChat() {
  const input = document.querySelector("#chatInput");
  const text = input.value.trim();
  if (!text) return toast("先輸入訊息。");

  state.chats[currentChat].push({ from: "me", text });
  addStats(textScore(text));

  const reply = generateRelatedChatReply(text, currentChat);
  state.chats[currentChat].push({ from: "them", text: reply });
  if (currentChat === "crush") addStats({ love: 3, popularity: 1, scandalRisk: 4 });
  if (currentChat === "staff") addStats({ companyTrust: 1, scandalRisk: -1 });
  if (currentChat === "manager") addStats({ energy: -1, companyTrust: 1 });

  saveGame(false);
  updateHomeStats();
  renderKakaoTalkUI();
}
window.sendChat = sendChat;

function renderPrivateContact() {
  renderPrivateDMList();
}

function privateContact(type) {
  const map = {
    instagram: ["你回了一條IG私訊，對方秒回。好感上升，但截圖風險也上升。", { love: 8, scandalRisk: 10, popularity: 2 }],
    backstage: ["你在後台短暫見面，被staff提醒小心站姐。", { love: 12, scandalRisk: 14, energy: -8 }],
    staff: ["staff幫你傳話成功，但公司信任下降。", { love: 6, scandalRisk: 4, companyTrust: -6 }],
    fanletter: ["你回覆了一封粉絲信，粉絲圈開始說你超寵粉。", { fans: 260, popularity: 5, energy: -4 }]
  };
  const [text, delta] = map[type];
  addStats(delta);
  if (state.scandalRisk > 60) {
    state.trends.unshift({ platform: "微博", title: `${state.name} 私聯疑雲`, heat: "6.6w", danger: true });
  }
  saveGame(false);
  updateHomeStats();
  maybeSasaengIncident("私聯");
  maybePublicBuzz("私聯曝光", "bad");
  renderPrivateContact();
  toast(text);
}
window.privateContact = privateContact;


function maybeSasaengIncident(source) {
  const roll = Math.random() * 100;
  const risk = state.sasaengRisk + state.scandalRisk * 0.25;
  if (roll < risk * 0.18) {
    const incidents = [
      { title: "行程洩露", text: `${source}後，有人提前出現在你的下一個行程地點。`, severity: 3, handled: false },
      { title: "私生跟車", text: `回宿舍路上疑似被跟車，經紀人讓司機繞路。`, severity: 4, handled: false },
      { title: "電話騷擾", text: `陌生號碼連續打來，疑似私生買到了聯絡方式。`, severity: 3, handled: false },
      { title: "酒店樓層曝光", text: `有人在論壇暗示你的入住樓層，公司要求立刻換房。`, severity: 5, handled: false }
    ];
    const incident = randomFrom(incidents);
    state.sasaengIncidents.unshift(incident);
    state.trends.unshift({ platform: "論壇", title: `${state.name} 疑似遭私生打擾`, heat: randomFrom(["2.4w", "4.1w", "38k"]), danger: true });
    addStats({ sasaengRisk: incident.severity * 3, privacy: -incident.severity * 4, energy: -incident.severity * 3 });
    toast("🚨 發生私生事件，去「私生」處理。");
  }
}

function renderSasaeng() {
  const unhandled = state.sasaengIncidents.filter(i => !i.handled).length;
  appContent.innerHTML = `
    <div class="card sasaeng-alert">
      <b>🚨 私生 / 安全中心</b>
      <p>這裡是負面事件系統：跟車、蹲點、行程洩露、電話騷擾。處理得好可以降低風險；不處理會影響體力、隱私和熱搜。</p>
      <p>私生風險：<span class="${state.sasaengRisk > 55 ? "safety-bad" : "safety-good"}">${state.sasaengRisk}</span></p>
      <p>隱私安全：<span class="${state.privacy < 40 ? "safety-bad" : "safety-good"}">${state.privacy}</span></p>
      <p>未處理事件：${unhandled}</p>
      <div class="composer-row">
        <button onclick="sasaengAction('security')">加強安保</button>
        <button onclick="sasaengAction('route')">更換路線</button>
      </div>
      <div class="composer-row">
        <button onclick="sasaengAction('statement')">公司聲明</button>
        <button onclick="sasaengAction('legal')">法律警告</button>
      </div>
    </div>
    ${state.sasaengIncidents.map((incident, i) => `
      <div class="schedule-item ${incident.handled ? "" : "sasaeng-alert"}">
        <b>${incident.handled ? "✅" : "⚠️"} ${escapeHTML(incident.title)}</b>
        <p>${escapeHTML(incident.text)}</p>
        <p>嚴重度：${"★".repeat(incident.severity)}</p>
        ${incident.handled ? "<p>已處理</p>" : `<button onclick="handleIncident(${i})">處理事件</button>`}
      </div>
    `).join("")}
  `;
}

function handleIncident(index) {
  const incident = state.sasaengIncidents[index];
  if (!incident || incident.handled) return;
  incident.handled = true;
  addStats({
    sasaengRisk: -incident.severity * 4,
    privacy: incident.severity * 5,
    companyTrust: 2,
    energy: -2
  });
  saveGame(false);
  updateHomeStats();
  renderSasaeng();
  toast("事件已處理，安全度回升。");
}
window.handleIncident = handleIncident;

function sasaengAction(type) {
  const actions = {
    security: ["公司加派安保，私生風險下降，但花了錢。", { sasaengRisk: -12, privacy: 8, money: -900, companyTrust: 3 }],
    route: ["你更換上下班路線，蹲點失效。", { sasaengRisk: -8, privacy: 10, energy: -2 }],
    statement: ["公司發聲明譴責私生，粉絲支持你，但熱度上升。", { sasaengRisk: -6, privacy: 5, popularity: 4, blackFans: -8 }],
    legal: ["法律警告發出，嚴重私生退縮。", { sasaengRisk: -18, privacy: 12, money: -1500, companyTrust: 5 }]
  };
  const [text, delta] = actions[type];
  addStats(delta);
  saveGame(false);
  updateHomeStats();
  renderSasaeng();
  toast(text);
}
window.sasaengAction = sasaengAction;


function createBlackMaterialTrend(source = "熱搜") {
  const scandalPool = [
    { title: `${state.name} 被爆學生時期霸凌同學`, desc: "舊同學發長文指控你在學生時期排擠別人。", fanLoss: 220, haters: 180, brand: 18, risk: 18 },
    { title: `${state.name} 深夜約會照曝光`, desc: "路透照片被搬上微博，網友開始猜測戀愛實錘。", fanLoss: 160, haters: 120, brand: 12, risk: 14 },
    { title: `${state.name} 被指對staff態度不好`, desc: "後台片段流出，有人說你對工作人員不耐煩。", fanLoss: 120, haters: 140, brand: 16, risk: 10 },
    { title: `${state.name} 喝酒夜歸話題發酵`, desc: "論壇爆出模糊照片，路人開始帶節奏。", fanLoss: 90, haters: 100, brand: 10, risk: 12 }
  ];
  const picked = randomFrom(scandalPool);
  state.trends.unshift({
    platform: randomFrom(["微博", "X/Twitter", "論壇"]),
    title: picked.title,
    heat: randomFrom(["6.8w", "9.1w", "42k", "11.3w"]),
    danger: true,
    kind: "black",
    desc: picked.desc,
    handled: false,
    source,
    payload: picked
  });
  addStats({ fans: -picked.fanLoss, blackFans: picked.haters, popularity: 8, brandFavor: -picked.brand, scandalRisk: picked.risk, energy: -8 });
}

function createEncounterTrend(source = "偶遇") {
  const pool = [
    { title: `${state.name} 偶遇文出圈：主動幫staff搬東西`, desc: "路人發偶遇文，說你私下很有禮貌也很照顧工作人員。", fans: 180, pop: 5, brand: 8 },
    { title: `${state.name} 偶遇文：耐心和粉絲打招呼`, desc: "一篇偶遇文說你本人比鏡頭裡還溫柔。", fans: 240, pop: 6, brand: 6 },
    { title: `${state.name} 被偶遇低調做公益`, desc: "路人稱你默默參與公益活動，好感度上升。", fans: 210, pop: 7, brand: 10 }
  ];
  const picked = randomFrom(pool);
  state.trends.unshift({
    platform: randomFrom(["微博", "小紅書", "X/Twitter"]),
    title: picked.title,
    heat: randomFrom(["2.3w", "4.7w", "29k"]),
    danger: false,
    kind: "encounter",
    desc: picked.desc,
    handled: false,
    source,
    payload: picked
  });
  addStats({ fans: picked.fans, popularity: picked.pop, brandFavor: picked.brand, blackFans: -12 });
}

function maybePublicBuzz(source = "活動", bias = "mixed") {
  const badChance = state.scandalRisk * 0.18 + (state.blackFans > state.fans * 0.35 ? 14 : 0);
  const goodChance = 22 + Math.max(0, state.brandFavor - 45) * 0.25 + Math.max(0, state.wardrobe - 10) * 0.2;
  if (bias !== "good" && Math.random() * 100 < badChance) {
    createBlackMaterialTrend(source);
    toast("⚠️ 黑料衝上熱搜了。你掉粉了，品牌邀約也會受影響。");
    return "black";
  }
  if (bias !== "bad" && Math.random() * 100 < goodChance) {
    createEncounterTrend(source);
    toast("✨ 偶遇文出圈，你吸到新粉了。");
    return "good";
  }
  return "none";
}

function renderHotsearch() {
  const tabs = `<div class="tabs"><button class="tab active">全部</button><button class="tab">微博</button><button class="tab">X/Twitter</button><button class="tab">論壇</button><button class="tab">小紅書</button></div>`;
  appContent.innerHTML = `
    <div class="card">
      <b>🔥 熱搜 / 舆論</b>
      <p>黑料會讓你掉粉、漲黑粉、影響品牌活動；偶遇文會幫你吸粉、拉回好感。</p>
      <p>黑粉 ${state.blackFans.toLocaleString()} · 品牌好感 ${state.brandFavor} · 緋聞風險 ${state.scandalRisk}</p>
      <div class="composer-row">
        <button onclick="maybePublicBuzz('日常曝光', 'mixed'); saveGame(false); updateHomeStats(); renderHotsearch();">模擬新熱搜</button>
        <button class="ghost" onclick="createEncounterTrend('路人偶遇'); saveGame(false); updateHomeStats(); renderHotsearch();">生成偶遇文</button>
      </div>
      ${tabs}
      ${state.trends.map((t, i) => `
        <div class="trend ${t.kind === 'black' ? 'sasaeng-alert' : ''}">
          <b>${i + 1}. [${escapeHTML(t.platform)}] ${escapeHTML(t.title)}</b>
          <p>熱度 ${t.heat} ${t.danger ? "· <span class='danger-text'>有爭議</span>" : "· <span class='good-text'>好感上升</span>"}</p>
          ${t.desc ? `<p>${escapeHTML(t.desc)}</p>` : ''}
          ${t.kind === 'black' && !t.handled ? `<div class="composer-row"><button onclick="handleTrend('clarify', ${i})">澄清</button><button onclick="handleTrend('apologize', ${i})">道歉</button><button class="ghost" onclick="handleTrend('ignore', ${i})">不回應</button></div>` : ''}
          ${t.kind === 'encounter' && !t.handled ? `<div class="composer-row"><button onclick="handleTrend('thank', ${i})">感謝路人</button><button class="ghost" onclick="handleTrend('saveface', ${i})">低調處理</button></div>` : ''}
          ${t.handled ? `<p>${t.kind === 'black' ? '已處理這條黑料。' : '已回應這條偶遇文。'}</p>` : ''}
        </div>`).join('')}
    </div>`;
}

function handleTrend(mode, index) {
  const trend = state.trends[index];
  if (!trend) return;
  if (trend.kind === 'black') {
    if (mode === 'clarify') {
      addStats({ fans: 60, blackFans: -35, brandFavor: 6, scandalRisk: -10, companyTrust: 2, energy: -5 });
      toast('已澄清，部分路人回頭了。');
    } else if (mode === 'apologize') {
      addStats({ fans: 35, blackFans: -50, brandFavor: 8, companyTrust: 4, popularity: -1, energy: -6 });
      toast('你道歉了，黑粉下降更多。');
    } else {
      addStats({ fans: -70, blackFans: 45, brandFavor: -6, scandalRisk: 8, popularity: 3 });
      toast('你冷處理了，掉粉更明顯。');
    }
    trend.handled = true;
  } else if (trend.kind === 'encounter') {
    if (mode === 'thank') {
      addStats({ fans: 110, popularity: 3, brandFavor: 4, companyTrust: 1 });
      toast('你溫柔回應，口碑更好了。');
    } else {
      addStats({ popularity: 1, brandFavor: 2 });
      toast('你低調處理，沒有過度消耗熱度。');
    }
    trend.handled = true;
  } else {
    if (mode === 'clarify') {
      addStats({ blackFans: -10, popularity: 3, energy: -5, scandalRisk: -10, companyTrust: 2 });
      toast('已澄清，黑粉/風險下降但你有點累。');
    } else {
      addStats({ blackFans: 8, popularity: 4, scandalRisk: 6 });
      toast('你選擇沉默，熱度上升但風險也增加。');
    }
  }
  updateMission("m_hotsearch", 1);
  updateHomeStats();
  saveGame(false);
  renderHotsearch();
}
window.handleTrend = handleTrend;

function renderActivities(type = "concert") {
  const labels = {
    concert: "演唱會",
    fanmeeting: "Fan Meeting",
    variety: "綜藝",
    musicshow: "音樂節目",
    photoshoot: "雜誌/廣告"
  };
  const tabs = Object.entries(labels).map(([key, name]) => `<button class="tab ${type === key ? "active" : ""}" onclick="renderActivities('${key}')">${name}</button>`).join("");
  const items = activityTypes[type].map((a, i) => {
    const locked = !!a.brandOnly && (state.brandFavor < 40 || state.blackFans > state.fans * 0.45);
    return `
    <div class="schedule-item">
      <b>${escapeHTML(a.name)}</b>
      <p>${escapeHTML(a.text)}</p>
      <p><span class="money">收入 ₩${a.pay.toLocaleString()}</span> · 粉絲 +${a.fans} · 人氣 +${a.pop} · 體力 ${a.energy}</p>
      ${locked ? `<p class="lock-note">品牌方暫停邀約：黑料/黑粉過多，或品牌好感太低。</p><button class="disabled-btn" disabled>暫時無法參加</button>` : `<button onclick="doActivity('${type}', ${i})">參加活動</button>`}
    </div>`;
  }).join("");

  appContent.innerHTML = `
    <div class="card">
      <b>🎫 活動</b>
      <p>參加活動可以賺錢，也會增加粉絲/人氣。黑料過多時，品牌類活動會變少。</p>
      <p>目前收入：<span class="money">₩${state.money.toLocaleString()}</span> · 品牌好感 ${state.brandFavor}</p>
      <div class="tabs">${tabs}</div>
    </div>
    ${items}
    <div class="card">
      <b>活動記錄</b>
      ${state.activityHistory.slice(0, 5).map(h => `<p>· ${escapeHTML(h)}</p>`).join("") || "<p>還沒有活動記錄。</p>"}
    </div>
  `;
}
window.renderActivities = renderActivities;

function doActivity(type, index) {
  const a = activityTypes[type][index];
  if (a.brandOnly && (state.brandFavor < 40 || state.blackFans > state.fans * 0.45)) {
    toast('品牌方現在不敢找你，先去處理熱搜/黑料。');
    return;
  }
  addStats({
    money: a.pay,
    fans: a.fans,
    popularity: a.pop,
    energy: a.energy,
    skill: a.skill || 0,
    scandalRisk: a.risk || 0,
    comebackProgress: type === "musicshow" ? 8 : 3,
    brandFavor: a.brandOnly ? 4 : 1
  });
  state.activityHistory.unshift(`${a.name}：收入 ₩${a.pay.toLocaleString()}`);
  updateMission("m_activity", 1);
  if (a.risk >= 6) {
    state.trends.unshift({ platform: randomFrom(["微博", "X/Twitter", "論壇"]), title: `${state.name} ${a.name} 片段引熱議`, heat: randomFrom(["1.9w", "3.4w", "28k"]), danger: true });
  } else {
    state.trends.unshift({ platform: randomFrom(["微博", "X/Twitter"]), title: `${state.name} ${a.name} 飯拍出圈`, heat: randomFrom(["2.6w", "4.8w", "51k"]), danger: false });
  }
  saveGame(false);
  updateHomeStats();
  maybeSasaengIncident(a.name);
  if (type === 'photoshoot') maybePublicBuzz(a.name, 'mixed');
  else if (type === 'fanmeeting' || type === 'concert') maybePublicBuzz(a.name, 'good');
  else if (type === 'variety') maybePublicBuzz(a.name, 'mixed');
  renderActivities(type);
  toast(`${a.name}完成，收入 ₩${a.pay.toLocaleString()}！`);
}
window.doActivity = doActivity;

function renderMail() {
  appContent.innerHTML = `<div class="card"><b>✉️ 粉絲信</b>${state.letters.map(l => `<div class="letter">${escapeHTML(l)}</div>`).join("")}<button onclick="readLetters()">慢慢讀完</button></div>`;
}
function readLetters() {
  addStats({ energy: 15, fans: 60, love: 2 });
  updateHomeStats();
  saveGame(false);
  toast("你被粉絲信治癒了。");
}
window.readLetters = readLetters;

function renderActionApp(title, actions) {
  appContent.innerHTML = `<div class="card"><b>${escapeHTML(title)}</b>${actions.map((a, i) => `<div class="schedule-item"><b>${escapeHTML(a[0])}</b><p>${escapeHTML(a[2])}</p><button onclick="doAction('${title}', ${i})">執行</button></div>`).join("")}</div>`;
  window[`actions_${title}`] = actions;
}

function doAction(title, index) {
  const action = window[`actions_${title}`][index];
  addStats(action[1]);
  updateHomeStats();
  saveGame(false);
  toast(action[2]);
}
window.doAction = doAction;

function renderShop() {
  appContent.innerHTML = `
    <div class="card">
      <b>🛍️ 消費 / 花錢</b>
      <p>你可以用收入買粉絲禮物、買自己的衣服。花得對會提升口碑和品牌好感。</p>
      <p>目前餘額：<span class="money">₩${state.money.toLocaleString()}</span> · 衣櫥值 ${state.wardrobe}</p>
      <div class="schedule-item">
        <b>買粉絲禮物包</b>
        <p>送小卡、零食、應援小禮物給粉絲。成本 ₩1,200。</p>
        <button onclick="buyItem('giftSmall')">購買</button>
      </div>
      <div class="schedule-item">
        <b>準備高級應援禮盒</b>
        <p>提高粉圈黏性，黑粉聲量也會被蓋掉一點。成本 ₩3,200。</p>
        <button onclick="buyItem('giftBig')">購買</button>
      </div>
      <div class="schedule-item">
        <b>買私服 / 日常穿搭</b>
        <p>讓你的偶遇文和自拍更容易出圈。成本 ₩1,500。</p>
        <button onclick="buyItem('clothesBasic')">購買</button>
      </div>
      <div class="schedule-item">
        <b>買高奢造型</b>
        <p>提升品牌好感，適合衝雜誌/品牌活動。成本 ₩4,500。</p>
        <button onclick="buyItem('clothesLuxury')">購買</button>
      </div>
    </div>
    <div class="card">
      <b>最近消費</b>
      ${state.shoppingHistory.slice(0, 6).map(h => `<p>· ${escapeHTML(h)}</p>`).join('') || '<p>還沒有消費記錄。</p>'}
    </div>
  `;
}
window.renderShop = renderShop;

function buyItem(type) {
  const items = {
    giftSmall: { cost: 1200, text: '你準備了粉絲小禮物，大家覺得你很用心。', delta: { fans: 220, popularity: 4, blackFans: -8 } },
    giftBig: { cost: 3200, text: '高級應援禮盒讓粉圈超開心，偶遇帖都在誇你寵粉。', delta: { fans: 420, popularity: 7, blackFans: -18, brandFavor: 3 } },
    clothesBasic: { cost: 1500, text: '你買了新的私服，自拍和偶遇照更容易出圈。', delta: { popularity: 4, brandFavor: 4, wardrobe: 6 } },
    clothesLuxury: { cost: 4500, text: '你入手了一套高奢造型，品牌方對你更有興趣了。', delta: { popularity: 8, brandFavor: 10, wardrobe: 12 } }
  };
  const item = items[type];
  if (!item) return;
  if (state.money < item.cost) {
    toast('錢不夠，先去跑活動賺錢。');
    return;
  }
  addStats({ money: -item.cost, ...item.delta });
  updateMission("m_shop", 1);
  state.shoppingHistory.unshift(`${item.text}（花費 ₩${item.cost.toLocaleString()}）`);
  if (type.includes('clothes')) maybePublicBuzz('偶遇穿搭', 'good');
  saveGame(false);
  updateHomeStats();
  renderShop();
  toast(item.text);
}
window.buyItem = buyItem;

function renderSave() {
  appContent.innerHTML = `
    <div class="card">
      <b>💾 存檔</b>
      <p>目前會自動存檔，也可以手動存。</p>
      <button onclick="saveGame(true)">手動存檔</button>
      <button class="wide" onclick="generateContentForApp(currentApp || 'hotsearch', true); saveGame(false); updateHomeStats(); renderApp(currentApp || 'hotsearch'); toast('已刷新當前 app 內容');">刷新當前 app</button>
      <button class="ghost wide" onclick="resetGame()">刪除存檔重開</button>
    </div>`;
}
window.saveGame = saveGame;

function resetGame() {
  localStorage.removeItem("idolSimulatorAgencyActivitySave");
  location.reload();
}
window.resetGame = resetGame;

function renderStats() {
  appContent.innerHTML = `
    <div class="card">
      <b>📊 數據</b>
      <p>${state.fanName}：${state.fans.toLocaleString()}</p>
      <p>黑粉：${state.blackFans.toLocaleString()}</p>
      <p>人氣：${state.popularity}</p>
      <p>體力：${state.energy}</p>
      <p>唱跳：${state.skill}</p>
      <p>好感：${state.love}</p>
      <p>收入：<span class="money">₩${state.money.toLocaleString()}</span></p>
      <p>公司信任：${state.companyTrust}</p>
      <p>緋聞風險：${state.scandalRisk}</p>
      <p>回歸進度：${state.comebackProgress}%</p>
      <p>品牌好感：${state.brandFavor}</p>
      <p>衣櫥值：${state.wardrobe}</p>
      <p>私生風險：${state.sasaengRisk}</p>
      <p>隱私安全：${state.privacy}</p>
    </div>
    <div class="card">
      <b>🔄 最近刷新</b>
      ${state.refreshLog.slice(0, 8).map(x => `<p>· ${escapeHTML(x)}</p>`).join("") || "<p>還沒有刷新記錄。</p>"}
    </div>`;
}

document.querySelector("#startBtn").addEventListener("click", () => startGame(false));
document.querySelector("#randomBtn").addEventListener("click", () => startGame(true));
document.querySelector("#backHome").addEventListener("click", () => { updateHomeStats(); showScreen(homeScreen); });
document.querySelector("#quickSave").addEventListener("click", () => saveGame(true));

document.querySelectorAll(".color-dot").forEach(dot => {
  dot.addEventListener("click", () => {
    selectedColor = dot.dataset.color;
    state.color = selectedColor;
    document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
    dot.classList.add("selected");
    applyTheme();
  });
});

avatarInput.addEventListener("input", () => {
  setupAvatarPreview.textContent = avatarInput.value.trim() || "⭐";
});

document.querySelectorAll("[data-app]").forEach(btn => btn.addEventListener("click", () => openApp(btn.dataset.app)));

if (loadGame()) {
  showScreen(homeScreen);
} else {
  applyTheme();
}

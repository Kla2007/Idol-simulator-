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
  const replies = {
    manager: {
      practice: ["知道你努力，但不要受傷。", "明天評級我幫你確認時間。"],
      comeback: ["回歸資料還不能外傳。", "demo已經在走流程，你先管好狀態。"],
      tired: ["累就早點睡，別再刷手機了。", "明早行程我幫你往後挪半小時。"],
      drama: ["熱搜先別回，公司會處理。", "截圖給我，我去問公關。"],
      daily: ["收到。記得看明天行程表。"]
    },
    staff: {
      practice: ["我幫你留了練習室。", "攝影機那邊我會提醒別拍到你。"],
      love: ["這種話不要在公開平台說。", "小心點，今天後台有站姐。"],
      drama: ["先別走正門，我安排車。", "我知道了，公關那邊會處理。"],
      daily: ["收到，我幫你安排。"]
    },
    member: {
      practice: ["你又偷偷加練？等我一起。", "下次副歌part我們再摳一下。"],
      food: ["便利店走起，我請你吃拉麵。", "我也餓了，現在去嗎？"],
      tired: ["別硬撐，我在休息室等你。", "你今天臉色真的不太好。"],
      love: ["哎呦，突然這麼會講？", "這句我截圖了哈哈哈。"],
      daily: ["哈哈哈哈你真的很有梗。"]
    },
    crush: {
      love: ["那我現在可以去見你嗎？", "你這樣說，我真的會當真。"],
      tired: ["我在樓下，帶了熱飲。", "別哭，我陪你一會兒。"],
      visual: ["我拍到你素顏了，真的好美。", "不用修圖，你本來就好看。"],
      drama: ["別怕，我知道你是什麼樣的人。", "需要我的話，我一直在。"],
      daily: ["我看到了，今天也很想你。"]
    },
    fan: {
      practice: ["你一定會出道的！我相信你！", "別受傷，慢慢來也可以。"],
      tired: ["快去睡！我們會等你。", "心疼死了，不准熬夜。"],
      love: ["啊啊啊啊你說想我們！！", "我今晚不用睡了。"],
      visual: ["自拍自拍自拍！", "你肯定又漂亮了。"],
      daily: ["寶寶回我了，人生圓滿。"]
    }
  };
  return randomFrom((replies[chat] && (replies[chat][topic] || replies[chat].daily)) || ["收到啦。"]);
}

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
  renderApp(app);
  showScreen(appScreen);
}

function renderApp(app) {
  if (app === "profile") return renderProfile();
  if (app === "company") return renderCompany();
  if (app === "weverse") return renderPostApp("weverse", "分享你的日常...", "發布動態", "今天練習到凌晨，但想到你們就有力氣了。");
  if (app === "bubble") return renderBubbleChat();
  if (app === "instagram") return renderPostApp("instagram", "◎ 發布 Instagram", "發布", "凌晨練習室。");
  if (app === "live") return renderLiveRoom();
  if (app === "kakao") return renderKakaoEnhanced();
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
  renderKakaoEnhanced();
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
  renderKakaoEnhanced();
}
window.sendChat = sendChat;

function renderPrivateContact() {
  appContent.innerHTML = `
    <div class="card">
      <b>💌 私聯方式</b>
      <p>私聯可以透過 Instagram、活動後台、staff、粉絲信。收益高，但緋聞風險也會升。</p>
      <div class="schedule-item">
        <b>Instagram 私訊</b>
        <p>回覆一條曖昧DM，增加好感和風險。</p>
        <button onclick="privateContact('instagram')">打開IG私訊</button>
      </div>
      <div class="schedule-item">
        <b>活動後台交換訊息</b>
        <p>在音樂節目/綜藝後台偷偷見面。</p>
        <button onclick="privateContact('backstage')">後台見面</button>
      </div>
      <div class="schedule-item">
        <b>透過 staff 傳話</b>
        <p>比較安全，但會扣公司信任。</p>
        <button onclick="privateContact('staff')">找staff傳話</button>
      </div>
      <div class="schedule-item">
        <b>粉絲信回覆</b>
        <p>選中一封信回覆，粉絲黏性上升。</p>
        <button onclick="privateContact('fanletter')">回覆粉絲信</button>
      </div>
    </div>
  `;
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

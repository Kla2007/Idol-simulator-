const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const playerNameInput = document.querySelector("#playerNameInput");
const startBtn = document.querySelector("#startBtn");
const randomBtn = document.querySelector("#randomBtn");
const log = document.querySelector("#log");

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const closeModal = document.querySelector("#closeModal");

const state = {
  name: "君渡",
  year: 1,
  month: 2,
  phase: "上旬",
  age: 18,
  career: "練習生",
  fans: 502,
  blackFans: 0,
  popularity: 15,
  energy: 80,
  skill: 20,
  love: 0,
  day: 1
};

const apps = {
  home: {
    title: "主頁",
    html: () => `
      <div class="feed-card">
        <b>${state.name}</b> <span style="color:#e95a93">練習生</span><br>
        清純系 · 全能 · 永遠<br>
        人氣 ${state.popularity} · 粉絲 ${state.fans.toLocaleString()} · 黑粉 ${state.blackFans.toLocaleString()}
      </div>
      <div class="feed-card">人氣板：人氣 ${state.popularity}萬 · 黑粉 ${state.blackFans / 10000 >= 1 ? (state.blackFans / 10000).toFixed(1) + "萬" : state.blackFans}</div>
    `
  },
  weverse: {
    title: "Weverse",
    html: () => `
      <div class="feed-card">💬 粉絲：寶寶今天也辛苦了ㅠㅠ</div>
      <div class="feed-card">💬 粉絲：求自拍，求直播，求出道。</div>
      <div class="feed-card">🔥 熱帖：${state.name} 的直拍表情管理是不是進步了？</div>
      <div class="choice-row">
        <button onclick="appChoice('weverseReply')">回覆粉絲留言</button>
        <button onclick="appChoice('weverseIgnore')">潛水不回</button>
      </div>
    `
  },
  kakao: {
    title: "KakaoTalk",
    html: () => `
      <div class="chat-bubble them">經紀人：月底評級不要再遲到了。</div>
      <div class="chat-bubble them">生佐：你在宿舍嗎？我在樓下。</div>
      <div class="chat-bubble me">我：等我三分鐘。</div>
      <div class="choice-row">
        <button onclick="appChoice('kakaoManager')">回經紀人</button>
        <button onclick="appChoice('kakaoSecret')">回生佐</button>
      </div>
    `
  },
  instagram: {
    title: "Instagram",
    html: () => `
      <div class="feed-card">◎ 限時動態草稿：練習室鏡子自拍 + 一句「凌晨也是新的開始」</div>
      <div class="feed-card">♡ 12,402 likes · 留言區正在猜你是不是要出道了</div>
      <div class="choice-row">
        <button onclick="appChoice('instaPost')">發出去</button>
        <button onclick="appChoice('instaDelete')">刪掉草稿</button>
      </div>
    `
  },
  bubble: {
    title: "泡泡",
    html: () => `
      <div class="chat-bubble me">今天練習到很晚，但看到你們留言就充電了。</div>
      <div class="chat-bubble them">粉絲們：ㅠㅠㅠㅠㅠㅠ</div>
      <div class="choice-row">
        <button onclick="appChoice('bubbleSweet')">發甜甜語音</button>
        <button onclick="appChoice('bubbleHonest')">發真心話長文</button>
      </div>
    `
  },
  call: {
    title: "打Call",
    html: () => `
      <div class="feed-card">粉絲應援任務：今晚 8 點衝新舞台播放量。</div>
      <div class="choice-row">
        <button onclick="appChoice('callFans')">組織應援</button>
      </div>
    `
  },
  mail: {
    title: "粉絲信",
    html: () => `
      <div class="feed-card">✉️「你不是誰的替代品，你就是你。」</div>
      <div class="feed-card">✉️「惡評不要看太久，我們會一直在。」</div>
      <div class="choice-row">
        <button onclick="appChoice('readMail')">慢慢讀完</button>
      </div>
    `
  },
  schedule: {
    title: "行程",
    html: () => `
      <div class="schedule-item">09:00 聲樂課</div>
      <div class="schedule-item">13:00 舞蹈評級</div>
      <div class="schedule-item">18:30 團綜錄製</div>
      <div class="schedule-item">23:00 泡泡營業</div>
    `
  }
};

const appEffects = {
  weverseReply: ["你回覆了一句「今天也見面吧」，粉絲開始截圖尖叫。", { fans: 120, popularity: 3, energy: -4 }],
  weverseIgnore: ["你選擇不看評論，心情穩定了一點。", { energy: 7 }],
  kakaoManager: ["你乖乖回覆經紀人，避免了被罵。", { energy: -2, skill: 2 }],
  kakaoSecret: ["你回了生佐：『別站太久，我下來。』心跳有點失控。", { love: 10, popularity: 1 }],
  instaPost: ["Instagram 自拍爆了，路人開始問你是誰。", { fans: 260, popularity: 8, blackFans: 6 }],
  instaDelete: ["你刪掉草稿，避免了不必要的猜測。", { energy: 3, popularity: -1 }],
  bubbleSweet: ["泡泡語音太甜，粉絲說你像小貓撒嬌。", { fans: 180, popularity: 5, energy: -3 }],
  bubbleHonest: ["你發了一段真心話，粉絲心軟得一塌糊塗。", { fans: 240, popularity: 6, energy: -6 }],
  callFans: ["粉絲團開始打榜，你的舞台播放量升了。", { fans: 300, popularity: 7 }],
  readMail: ["你把粉絲信讀完，突然覺得自己還能再撐一下。", { energy: 16, love: 2 }]
};

const events = {
  practice: [
    ["練習室的燈亮到凌晨，你的舞蹈被老師誇了。", { skill: 8, energy: -14, popularity: 2 }],
    ["你練到腳踝發酸，但月底評級的信心上升了。", { skill: 6, energy: -10 }],
    ["你被拍到獨自加練，路人好感增加。", { skill: 5, energy: -8, fans: 45, popularity: 2 }]
  ],
  post: [
    ["你發了一張練習自拍，評論區全是「寶寶出道吧」。", { fans: 120, popularity: 4, energy: -4 }],
    ["你的文案太真誠，小範圍出圈了。", { fans: 210, popularity: 6, blackFans: 3 }],
    ["你手滑發了奇怪表情包，粉絲覺得你很有梗。", { fans: 80, popularity: 3 }]
  ],
  dm: [
    ["你回覆了一位老粉，粉圈開始說你很寵粉。", { fans: 70, love: 2, popularity: 1 }],
    ["你深夜看私信，看到惡評心情崩了一下。", { energy: -10, blackFans: 5 }],
    ["你收到神秘前輩的鼓勵訊息。", { love: 8, popularity: 2 }]
  ],
  love: [
    ["你和對方在公司樓下擦肩而過，沒說話但眼神很明顯。", { love: 10, popularity: 1 }],
    ["戀愛緋聞衝上熱搜，粉絲吵翻了。", { love: 14, fans: 40, blackFans: 25, popularity: 8 }],
    ["你選擇暫時專心事業，把心動藏起來。", { skill: 3, love: -3, popularity: 2 }]
  ],
  team: [
    ["團隊合練時你幫隊友補位，大家對你改觀。", { skill: 4, popularity: 3, fans: 50 }],
    ["你們被安排做團綜，意外很好笑。", { popularity: 7, fans: 180, energy: -8 }],
    ["隊內小摩擦被剪進花絮，黑粉開始帶節奏。", { blackFans: 18, popularity: 3 }]
  ],
  senior: [
    ["前輩在採訪裏提到你，說你『很有眼神』。", { popularity: 10, fans: 300 }],
    ["你向前輩請教舞台管理，學到很多。", { skill: 7, energy: -5 }],
    ["你被拍到和前輩一起下班，論壇開始亂猜。", { popularity: 6, blackFans: 12, love: 4 }]
  ],
  pet: [
    ["你領養了一隻小貓，粉絲說你的生活感很可愛。", { fans: 90, energy: 8 }],
    ["寵物直播大成功，大家都在截表情包。", { fans: 160, popularity: 5 }],
    ["小貓把你的練習服抓壞了，但你心情好了。", { energy: 12, skill: -1 }]
  ],
  cp: [
    ["你和隊友的互動被剪成CP視頻，播放量爆了。", { fans: 260, popularity: 8, blackFans: 6 }],
    ["你們在鏡頭前太自然，粉絲開始嗑瘋。", { fans: 190, love: 4, popularity: 5 }],
    ["公司提醒你控制距離，營業感突然變重。", { popularity: -1, energy: -6 }]
  ],
  kitchen: [
    ["你煮了一碗很離譜的拉麵，但大家笑得很開心。", { energy: 10, fans: 60 }],
    ["你學會了做低卡餐，體力恢復了一點。", { energy: 14 }],
    ["廚房直播翻車，鹽放多了三倍。", { fans: 50, blackFans: 4, popularity: 2 }]
  ],
  gym: [
    ["你完成了體能課，舞台耐力上升。", { energy: -8, skill: 4, popularity: 1 }],
    ["你太累了，訓練後直接在休息室睡著。", { energy: 6, skill: 2 }],
    ["健身房偶遇攝影師，出了一組神圖。", { fans: 220, popularity: 7 }]
  ]
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function applyDelta(delta) {
  Object.entries(delta).forEach(([key, value]) => {
    state[key] += value;
  });
  state.energy = clamp(state.energy, 0, 100);
  state.skill = clamp(state.skill, 0, 100);
  state.love = clamp(state.love, 0, 100);
  state.popularity = clamp(state.popularity, 0, 100);
  state.blackFans = Math.max(0, state.blackFans);
  state.fans = Math.max(0, state.fans);
}

function updateUI() {
  document.querySelector("#idolName").textContent = state.name;
  document.querySelector("#statusLine").textContent =
    `第${state.year}年 ${state.month}月${state.phase} · ${state.age}歲 · ${state.career}`;
  document.querySelector("#fans").textContent = state.fans.toLocaleString();
  document.querySelector("#blackFans").textContent = state.blackFans.toLocaleString();
  document.querySelector("#popularity").textContent = state.popularity;
  document.querySelector("#energy").textContent = state.energy;
  document.querySelector("#skillVal").textContent = state.skill;
  document.querySelector("#loveVal").textContent = state.love;
  document.querySelector("#skillBar").value = state.skill;
  document.querySelector("#loveBar").value = state.love;

  if (state.popularity >= 70 && state.career === "練習生") {
    state.career = "預備出道組";
    addLog("🎉 公司通知你進入預備出道組。真正的主線開始了。");
  }
  if (state.fans >= 10000 && state.career !== "solo愛豆") {
    state.career = "solo愛豆";
    addLog("👑 你粉絲破萬，正式成為solo愛豆。");
  }
}

function addLog(text) {
  const item = document.createElement("div");
  item.className = "logItem";
  item.textContent = text;
  log.prepend(item);
}

function nextTime() {
  state.day += 1;
  const phases = ["上旬", "中旬", "下旬"];
  state.phase = phases[state.day % 3];
  if (state.day % 3 === 0) state.month += 1;
  if (state.month > 12) {
    state.month = 1;
    state.year += 1;
    state.age += 1;
  }
}

function play(action) {
  const pool = events[action];
  const [text, delta] = pool[Math.floor(Math.random() * pool.length)];
  applyDelta(delta);

  if (state.energy <= 5) {
    addLog("⚠️ 你快累垮了，最好去廚房/休息類行動回血。");
  }

  document.querySelector("#eventTitle").textContent = "事件發生";
  document.querySelector("#eventText").textContent = text;
  addLog(text);
  nextTime();
  updateUI();
}

function openApp(appName) {
  modalTitle.textContent = apps[appName].title;
  modalBody.innerHTML = apps[appName].html();
  modal.classList.remove("hidden");
}

function appChoice(choice) {
  const [text, delta] = appEffects[choice];
  applyDelta(delta);
  document.querySelector("#eventTitle").textContent = "手機事件";
  document.querySelector("#eventText").textContent = text;
  addLog(text);
  nextTime();
  updateUI();
  modal.classList.add("hidden");
}

window.appChoice = appChoice;

function startGame(name) {
  state.name = name || "君渡";
  startScreen.classList.remove("active");
  gameScreen.classList.add("active");
  addLog(`🌟 ${state.name} 的愛豆人生開始了。`);
  updateUI();
}

startBtn.addEventListener("click", () => startGame(playerNameInput.value.trim()));
randomBtn.addEventListener("click", () => {
  const names = ["君渡", "米朵", "夏眠", "林霧", "小椿", "宋梨"];
  startGame(names[Math.floor(Math.random() * names.length)]);
});

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => play(button.dataset.action));
});

document.querySelectorAll("[data-app]").forEach(button => {
  button.addEventListener("click", () => openApp(button.dataset.app));
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.classList.add("hidden");
});

document.querySelector("#saveBtn").addEventListener("click", () => {
  localStorage.setItem("idolSimulatorSaveSocial", JSON.stringify(state));
  addLog("💾 已存檔。");
});

document.querySelector("#loadBtn").addEventListener("click", () => {
  const save = localStorage.getItem("idolSimulatorSaveSocial");
  if (!save) return addLog("沒有找到存檔。");
  Object.assign(state, JSON.parse(save));
  addLog("📂 已讀取存檔。");
  updateUI();
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  localStorage.removeItem("idolSimulatorSaveSocial");
  location.reload();
});

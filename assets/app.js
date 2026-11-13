// ---------- 0. Interface Language (Default: English, Optional: Chinese) ----------
const LS_LANG_KEY = 'zoey-hanzi-v2-lang';
let uiLang = 'en';
try {
  const savedLang = localStorage.getItem(LS_LANG_KEY);
  if (savedLang === 'zh' || savedLang === 'en') uiLang = savedLang;
} catch (e) {}

function t(en, zh) {
  return uiLang === 'zh' ? zh : en;
}

function setLang(lang) {
  uiLang = (lang === 'zh') ? 'zh' : 'en';
  try { localStorage.setItem(LS_LANG_KEY, uiLang); } catch (e) {}
  applyStaticI18n();
  renderAllViews();
  toast(t('Interface switched to English', '界面已切换为中文'));
}

function toggleLang() {
  setLang(uiLang === 'en' ? 'zh' : 'en');
}

function applyStaticI18n() {
  if (document.documentElement) document.documentElement.lang = uiLang === 'zh' ? 'zh-Hans' : 'en';
  document.title = t('Zoey Learns Hanzi — Character Map', 'Zoey学汉字 — 汉字星图点亮版');

  const setTxt = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
  const setHtml = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  setTxt('#brandTitle', t('Zoey Learns Hanzi', 'Zoey学汉字'));
  setTxt('#brandSub', t('Character Map · Light Up All 3,837 Hanzi', '汉字星图 · 点亮全部 3,837 字'));
  setTxt('#langToggleBtn', t('🌐 中文', '🌐 EN'));
  setHtml('#bylineText', t(
    '<span class="slogan-main">✨ One Character at a Time — Light Up All 3,837 Characters on Your Map!</span><span class="byline-credit">By <b>Larry Yin</b></span>',
    '<span class="slogan-main">✨ 一字一星光 —— 点亮属于你的全部 3,837 个汉字星图！</span><span class="byline-credit"><b>Larry Yin</b> 出品</span>'
  ));

  const msi = $('#mapSearchInput');
  if (msi) msi.placeholder = t('Search character, pinyin (e.g. xue), or English…', '搜汉字、拼音(如 xue)、或英文释义…');
  syncDensityButtons();

  setTxt('#testHeading', t('Checkup & Calibration', '测评与巩固'));
  setTxt('#testIntro', t('Estimate your vocabulary with a character checklist, then take ongoing checkups to promote lit characters or catch shaky ones.', '初始字表评估确定你的起点与基础微亮字；途中测验抽查已点亮字与前沿难度，答对升级点亮、答错降级或熄灭。'));

  setTxt('#exploreHeading', t('Word Bank · 7,618 Words', '主题词库 · 7,618 词'));
  setTxt('#exploreIntro', t('Browse 7,618 real words across 16 everyday topics or search by character, pinyin, or English. Tap any character inside a word to study and light it up.', '7,618 个真实词条（16 个生活主题），支持汉字、拼音与英文检索。点击词条中的任意汉字可直接进入单字学习舱点亮。'));
  const si = $('#searchInput');
  if (si) si.placeholder = t('Search words… e.g. “xué”, “school”, or 学', '搜索词汇… 如 “xué”、“school” 或 学');
  setTxt('#topicBackBtn', t('← All topics', '← 全部主题'));
  setTxt('#exploreEmpty', t('No matching words found.', '没有找到匹配的词条。'));

  setTxt('#specialsHeading', t('Special Practices', '专项辨析训练'));
  setTxt('#specialsIntro', t('Master Chinese’s trickiest characters with side-by-side contrast and random light-up quizzes across Look-alikes, Polyphones, and Multiple Meanings.', '针对汉字三大高频难点：形近字、多音字、同音多义字，提供对比记忆与随机闯关点亮。'));

  setTxt('#laHeading', t('Look-alikes · 28 Pairs', '形近字 · 28 对易混辨析'));
  setTxt('#laIntro', t('Spot tiny stroke differences and sound twins in no-pinyin blind quizzes. Pass a pair to light it up here and glow on your Character Map.', '28 对形近与同音易混字无拼音盲测。闯关答对即可在本页点亮，并在星图上同步微亮！'));
  setTxt('#laQuizTitle', t('Blind Look-Alike Trainer', '形近字随机盲测'));
  const lsi = $('#laSearchInput');
  if (lsi) lsi.placeholder = t('Search character, pinyin, or English gloss…', '搜形近字、拼音或英文词义…');

  document.querySelectorAll('.js-to-la').forEach(el => { el.textContent = t('Look-alikes (28)', '形近字 (28)'); });
  document.querySelectorAll('.js-to-poly').forEach(el => { el.textContent = t('Polyphones (89)', '多音字 (89)'); });
  document.querySelectorAll('.js-to-semy').forEach(el => { el.textContent = t('Multiple Meanings (12)', '多义字 (12)'); });

  setTxt('#polyHeading', t('Polyphones · One Char, Multiple Sounds', '多音字 · 一字多音'));
  setTxt('#polyIntro', t('89 polyphonic characters (182 readings) whose pronunciation changes depending on the word.', '89 个多音字（182 个读音），在真实词组中区分不同发音与词义。'));
  setTxt('#toSemyLabel', t('Multiple Meanings (12)', '多义字 (12)'));
  setTxt('#polyQuizTitle', t('Context Reading Trainer', '语境读音训练'));
  const psi = $('#polySearchInput');
  if (psi) psi.placeholder = t('Search character, pinyin (e.g. xing, hang), or English…', '搜多音字、拼音（如 xing, hang）或英文词义…');
  setTxt('#polyListHeading', t('All Polyphones (89)', '多音字总表（89字）'));

  setTxt('#polySemyHeading', t('Multiple Meanings · Same Sound, Different Senses', '多义字 · 同音不同义'));
  setTxt('#polySemyIntro', t('12 high-frequency characters (34 senses) that keep the same pronunciation while shifting meaning across words.', '12 个高频多义字（34 种常见义项），读音相同但在不同词组中含义截然不同。'));
  setTxt('#toPolyLabel', t('Polyphones (89)', '多音字 (89)'));
  setTxt('#semyQuizTitle', t('Context Meaning Trainer', '语境词义训练'));
  const ssi = $('#semySearchInput');
  if (ssi) ssi.placeholder = t('Search character, pinyin, sense, or word…', '搜多义字、拼音、义项或词汇…');
  setTxt('#semyListHeading', t('All Multi-Sense Characters (12)', '同音多义字总表（12字）'));

  setTxt('#savedHeading', t('Saved', '我的收藏'));
  const pName = escapeHTML(currentProfile().name);
  setHtml('#savedIntro', t(
    `Bookmarked characters, words, and recent activity for <b id="wordsLearnerName" style="color:var(--ink)">${pName}</b> (stored locally in this browser).`,
    `<b id="wordsLearnerName" style="color:var(--ink)">${pName}</b> 收藏的汉字、词汇与最近学习/测试记录（保存在本地浏览器）。`
  ));

  setTxt('#studioRandomBtn', t('🎲 Another Random Char', '🎲 换个随机字'));
  setTxt('#learnerChev', t('Switch learner ▾', '切换学习者 ▾'));
  setHtml('#profileHeading', t('Learner Profiles <span>Each learner keeps their own map brightness & checkup history</span>', '学习者档案 <span>每位学习者独立保存字图亮度与测评记录</span>'));
  setHtml('#addLearnerHeading', t('Add a Learner <span>Start fresh or calibrate via initial checklist</span>', '新建学习者 <span>从零或通过初始测评开启</span>'));
  const nli = $('#newLearnerInput');
  if (nli) nli.placeholder = t('Enter name, e.g. Mia, Leo…', '输入名字，例如 Mia, Leo…');
  setTxt('#addLearnerBtn', t('Add', '添加'));
  setTxt('#footerLangLabel', t('🌐 Switch to 中文界面', '🌐 Switch to English'));
  setTxt('#closePanelLabel', t('Close', '收起'));

  setTxt('#navMap', t('Char Map', '汉字星图'));
  setTxt('#navTest', t('Checkup', '测评巩固'));
  setTxt('#navSpecials', t('Specials', '专项训练'));
  setTxt('#navExplore', t('Word Bank', '主题词库'));
  setTxt('#navSaved', t('Saved', '我的收藏'));

  updateBackUI();
}

function renderAllViews() {
  renderLearnerBar();
  renderProfileList();
  renderMap();
  renderTopics();
  renderExplore();
  renderSpecialsHub();
  renderLookalikes();
  renderPolyphones();
  renderPolysemyView();
  renderTestCenter();
  renderSaved();
  if (currentView === 'char-studio' && studioState.charObj) renderCharStudio();
  if (currentView === 'word-detail' && currentWordId) openWord(currentWordId, true);
}

// ---------- 1. Tiers & Character Database Construction ----------
const TIERS = [
  { id: 1, enName: 'Tier 1 · Starter Core', zhName: '一阶 · 启蒙星域', enShort: 'Tier 1', zhShort: '一阶', start: 0, end: 300, enDesc: 'Essential everyday characters', zhDesc: '日常核心高频字' },
  { id: 2, enName: 'Tier 2 · Everyday Life', zhName: '二阶 · 基础星域', enShort: 'Tier 2', zhShort: '二阶', start: 300, end: 800, enDesc: 'Home, school & nature basics', zhDesc: '生活校园家庭基础字' },
  { id: 3, enName: 'Tier 3 · Story & Action', zhName: '三阶 · 进阶星域', enShort: 'Tier 3', zhShort: '三阶', start: 800, end: 1500, enDesc: 'Stories, feelings & actions', zhDesc: '叙事动作与事物描写' },
  { id: 4, enName: 'Tier 4 · Fluent Reading', zhName: '四阶 · 熟练星域', enShort: 'Tier 4', zhShort: '四阶', start: 1500, end: 2300, enDesc: 'News, culture & general reading', zhDesc: '故事新闻与常识阅读' },
  { id: 5, enName: 'Tier 5 · Literary & Idiom', zhName: '五阶 · 畅读星域', enShort: 'Tier 5', zhShort: '五阶', start: 2300, end: 3100, enDesc: 'Written prose, idioms & science', zhDesc: '书面表达与成语典故' },
  { id: 6, enName: 'Tier 6 · Mastery Finale', zhName: '六阶 · 博学星域', enShort: 'Tier 6', zhShort: '六阶', start: 3100, end: 3837, enDesc: 'Level-1 table completion & nuance', zhDesc: '一级字表收官与雅字' }
];
function tierName(tier) { return t(tier.enName, tier.zhName); }
function tierShort(tier) { return t(tier.enShort, tier.zhShort); }
function tierDesc(tier) { return t(tier.enDesc, tier.zhDesc); }

function stripTone(py) {
  return (py || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function escapeHTML(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function wordById(id) { return WORD_BY_ID.get(id); }

const WORD_BY_ID = new Map();
const WORD_BY_ZH = new Map();
for (const w of WORDS) {
  WORD_BY_ID.set(w.id, w);
  if (!WORD_BY_ZH.has(w.zh)) WORD_BY_ZH.set(w.zh, w);
}

const POLY_BY_CHAR = new Map();
for (const p of POLY) POLY_BY_CHAR.set(p.char, { type: 'poly', data: p });
for (const s of POLYSEMY) {
  if (!POLY_BY_CHAR.has(s.char)) POLY_BY_CHAR.set(s.char, { type: 'polysemy', data: s });
}

const LOOKALIKE_BY_CHAR = new Map();
for (const pair of LOOKALIKES) {
  for (const ch of [pair.a.g, pair.b.g]) {
    if (!LOOKALIKE_BY_CHAR.has(ch)) LOOKALIKE_BY_CHAR.set(ch, []);
    LOOKALIKE_BY_CHAR.get(ch).push(pair);
  }
}

function tierForIndex(idx) {
  for (const tObj of TIERS) {
    if (idx >= tObj.start && idx < tObj.end) return tObj.id;
  }
  return 6;
}

const CHAR_DB_MAP = new Map();
const CHAR_DB_LIST = [];

(function buildCharDB() {
  for (let i = 0; i < HANZI_CHARS.length; i++) {
    const g = HANZI_CHARS[i];
    const obj = {
      g,
      index: i,
      tier: tierForIndex(i),
      pys: [],
      py: '',
      pyPlain: '',
      meanings: [],
      strokeCount: '',
      strokesRaw: '',
      radicalNote: '',
      words: [],
      sentences: [],
      poly: POLY_BY_CHAR.get(g) || null,
      lookalikes: LOOKALIKE_BY_CHAR.get(g) || []
    };
    CHAR_DB_MAP.set(g, obj);
    CHAR_DB_LIST.push(obj);
  }

  for (const w of WORDS) {
    const chars = w.chars || [];
    const seenInWord = new Set();
    for (const c of chars) {
      const entry = CHAR_DB_MAP.get(c.g);
      if (!entry) continue;
      if (c.py && !entry.pys.includes(c.py)) entry.pys.push(c.py);
      if (c.en && !entry.meanings.includes(c.en) && entry.meanings.length < 4) entry.meanings.push(c.en);
      if (!entry.strokeCount && w.strokes) {
        const m = w.strokes.match(new RegExp(c.g + '\\s*(\\d+)'));
        if (m) entry.strokeCount = m[1];
        else {
          const m2 = w.strokes.trim().match(/^(\d+)画$/);
          if (m2) entry.strokeCount = m2[1];
        }
      }
      if (!entry.strokesRaw && w.strokes) entry.strokesRaw = w.strokes;
      if (!entry.radicalNote && w.radical) {
        if (w.zh === c.g || w.radical.includes(c.g)) entry.radicalNote = w.radical;
      }
      if (!seenInWord.has(c.g)) {
        seenInWord.add(c.g);
        entry.words.push(w);
        if (w.sent && w.sent.zh && w.sent.zh.includes(c.g) && entry.sentences.length < 4) {
          if (!entry.sentences.some(s => s.zh === w.sent.zh)) entry.sentences.push({ ...w.sent, wordZh: w.zh, wordId: w.id });
        }
      }
    }
  }

  for (const entry of CHAR_DB_LIST) {
    entry.py = entry.pys[0] || '';
    entry.pyPlain = entry.pys.map(stripTone).join(' ');
    if (!entry.radicalNote && entry.words[0]) entry.radicalNote = entry.words[0].radical || '';
    entry.enShort = entry.meanings[0] || (entry.words[0] ? entry.words[0].en : '');
  }

  for (const w of WORDS) {
    let maxIdx = 0;
    for (const c of (w.chars || [])) {
      const entry = CHAR_DB_MAP.get(c.g);
      if (entry && entry.index > maxIdx) maxIdx = entry.index;
    }
    w._lvlIdx = maxIdx;
  }
})();

function formatStrokes(ch) {
  if (ch.strokeCount) return uiLang === 'zh' ? ch.strokeCount + '画' : ch.strokeCount + ' strokes';
  return ch.strokesRaw || '';
}

// ---------- 2. Learner Profiles & 4-Level Brightness State ----------
const LS_PROFILES_KEY = 'zoey-hanzi-v2-profiles';
const LS_LAST_KEY = 'zoey-hanzi-v2-last-learner';

function uid() { return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function makeProfile(name, isDefault) {
  const now = Date.now();
  const charLevels = {};
  if (isDefault) {
    ['你', '好', '我', '是'].forEach(c => { charLevels[c] = 2; });
  }
  return {
    id: uid(),
    name,
    createdAt: now,
    lastActive: now,
    charLevels,
    savedChars: isDefault ? ['学', '好'] : [],
    savedWords: isDefault ? ['xuesheng', 'nihao'] : [],
    frontierIndex: isDefault ? 4 : 0,
    assessed: false,
    estChars: isDefault ? 4 : 0,
    estWords: isDefault ? 8 : 0,
    studiedSinceTest: 0,
    recentChars: isDefault ? ['是', '我', '好', '你'] : [],
    testHistory: [],
    polyMastered: {},
    laMastered: {},
    v3BulkCleaned: true
  };
}

function cleanupLegacyBulkLit(p) {
  if (!p || p.v3BulkCleaned) return false;
  let changed = false;
  if (p.charLevels && typeof p.charLevels === 'object') {
    for (const g of Object.keys(p.charLevels)) {
      if (p.charLevels[g] === 1) {
        delete p.charLevels[g];
        changed = true;
      }
    }
  }
  p.v3BulkCleaned = true;
  return true;
}

function resetUnverifiedLitChars() {
  const p = currentProfile();
  if (!p || !p.charLevels) return;
  let cleared = 0;
  for (const g of Object.keys(p.charLevels)) {
    if (p.charLevels[g] === 1) {
      delete p.charLevels[g];
      cleared++;
    }
  }
  persistCurrent();
  renderAllViews();
  toast(t(`Cleared ${cleared} Soft-Glow (Lv.1) characters. Studied Lv.2/Lv.3 kept!`, `已清除 ${cleared} 个基础微亮 (Lv.1) 汉字，保留所有已学 Lv.2/Lv.3！`));
}

function loadProfiles() {
  try {
    const raw = localStorage.getItem(LS_PROFILES_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length) {
        let dirty = false;
        const list = arr.filter(p => p && p.id && p.name).map(p => {
          const norm = { ...p, polyMastered: p.polyMastered || {}, laMastered: p.laMastered || {} };
          if (cleanupLegacyBulkLit(norm)) dirty = true;
          return norm;
        });
        if (dirty && list.length) {
          try { localStorage.setItem(LS_PROFILES_KEY, JSON.stringify(list)); } catch (e) {}
        }
        return list;
      }
    }
  } catch (e) {}
  return null;
}
function saveProfiles() {
  try {
    localStorage.setItem(LS_PROFILES_KEY, JSON.stringify(profiles));
    localStorage.setItem(LS_LAST_KEY, currentId);
  } catch (e) {}
}

let profiles = loadProfiles();
if (!profiles || !profiles.length) profiles = [makeProfile('Zoey', true)];
let currentId = null;
try { currentId = localStorage.getItem(LS_LAST_KEY); } catch (e) {}
if (!profiles.some(p => p.id === currentId)) {
  currentId = [...profiles].sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0))[0].id;
}
function currentProfile() { return profiles.find(p => p.id === currentId) || profiles[0]; }

function getCharLevel(g) {
  const p = currentProfile();
  return (p.charLevels && p.charLevels[g]) ? p.charLevels[g] : 0;
}
function isPolyMastered(g) {
  const p = currentProfile();
  return Boolean(p.polyMastered && p.polyMastered[g]);
}
function markPolyMastered(g) {
  const p = currentProfile();
  if (!p.polyMastered) p.polyMastered = {};
  p.polyMastered[g] = true;
}
function laPairKey(i) {
  const pair = LOOKALIKES[i];
  return pair ? (pair.a.g + '-' + pair.b.g) : String(i);
}
function isLaMastered(i) {
  const p = currentProfile();
  return Boolean(p.laMastered && p.laMastered[laPairKey(i)]);
}
function markLaMastered(i) {
  const p = currentProfile();
  if (!p.laMastered) p.laMastered = {};
  p.laMastered[laPairKey(i)] = true;
}
function setCharLevel(g, lvl) {
  const p = currentProfile();
  if (!p.charLevels) p.charLevels = {};
  if (lvl <= 0) delete p.charLevels[g];
  else p.charLevels[g] = Math.min(3, lvl);
}
function levelMeta(lvl) {
  if (lvl === 3) return { label: t('Radiant Gold Lv.3', '金辉精通 Lv.3'), short: '✦', cls: 'lvl3' };
  if (lvl === 2) return { label: t('Lit Bamboo Lv.2', '翠竹点亮 Lv.2'), short: '●', cls: 'lvl2' };
  if (lvl === 1) return { label: t('Soft Glow Lv.1', '基础微亮 Lv.1'), short: '◐', cls: 'lvl1' };
  return { label: t('Unlit Lv.0', '未点亮 Lv.0'), short: '○', cls: 'lvl0' };
}

function rankWordsForLearner(words, focusCharG) {
  const p = currentProfile();
  const frontier = (p && p.frontierIndex) || 0;
  const focusIdx = (focusCharG && CHAR_DB_MAP.has(focusCharG)) ? CHAR_DB_MAP.get(focusCharG).index : 0;
  const targetIdx = Math.max(frontier, focusIdx);
  return [...words].sort((a, b) => {
    const idxA = a._lvlIdx || 0;
    const idxB = b._lvlIdx || 0;
    let scoreA = Math.abs(idxA - targetIdx);
    let scoreB = Math.abs(idxB - targetIdx);
    if (targetIdx >= 200 && idxA < targetIdx * 0.35) scoreA += 600;
    if (targetIdx >= 200 && idxB < targetIdx * 0.35) scoreB += 600;
    if ((a.chars || []).some(c => getCharLevel(c.g) === 0)) scoreA -= 35;
    if ((b.chars || []).some(c => getCharLevel(c.g) === 0)) scoreB -= 35;
    return scoreA - scoreB;
  });
}

function computeStats() {
  const p = currentProfile();
  const c = [0, 0, 0, 0];
  for (const ch of CHAR_DB_LIST) {
    const l = getCharLevel(ch.g);
    c[l]++;
  }
  const lit = c[1] + c[2] + c[3];
  let knownWords = 0;
  const frontier = p.frontierIndex || 0;
  const estScope = Math.max(frontier, lit);
  let estLevelWords = 0;
  for (const w of WORDS) {
    const cs = w.chars || [];
    if (cs.length && cs.every(x => getCharLevel(x.g) >= 1)) knownWords++;
    if ((w._lvlIdx || 0) <= estScope) estLevelWords++;
  }
  const estChars = Math.max(lit, p.assessed ? (p.estChars || lit) : lit);
  p.estChars = estChars;
  p.estWords = knownWords;
  return { counts: c, lit, knownWords, estChars, estLevelWords, total: CHAR_DB_LIST.length };
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
function getDailyCount(p = currentProfile()) {
  if (!p) return 0;
  return p.dailyDate === todayKey() ? (p.dailyCount || 0) : 0;
}
function recordDailyActivity() {
  const p = currentProfile();
  if (!p) return;
  const today = todayKey();
  if (p.dailyDate !== today) {
    p.dailyDate = today;
    p.dailyCount = 1;
  } else {
    p.dailyCount = (p.dailyCount || 0) + 1;
  }
}

function persistCurrent() {
  const p = currentProfile();
  if (!p) return;
  p.lastActive = Date.now();
  saveProfiles();
  renderLearnerBar();
}

// ---------- 3. Helpers & Speech ----------
const $ = s => document.querySelector(s);
function toast(msg) {
  const tEl = $('#toast');
  if (!tEl) return;
  tEl.textContent = msg;
  tEl.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => tEl.classList.remove('show'), 2600);
}
function speak(text, mode) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = mode === 'slow' ? 0.55 : 0.92;
    const vs = speechSynthesis.getVoices();
    const zh = vs.find(v => v.lang && v.lang.toLowerCase().startsWith('zh'));
    if (zh) u.voice = zh;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch (e) {
    toast(t('Browser Chinese speech not ready — tap again to retry', '浏览器暂不支持中文语音合成，请点击重试'));
  }
}
if (typeof speechSynthesis !== 'undefined') speechSynthesis.getVoices();

function shuffleArr(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- 4. Origin-Aware Navigation Stack & Scroll Restoration ----------
function viewLabel(name) {
  const labels = {
    map: t('Char Map', '汉字星图'),
    test: t('Checkup', '测评巩固'),
    specials: t('Specials', '专项训练'),
    explore: t('Word Bank', '主题词库'),
    saved: t('Saved', '我的收藏'),
    lookalikes: t('Look-alikes', '形近字'),
    polyphones: t('Polyphones', '多音字'),
    polysemy: t('Multiple Meanings', '多义字'),
    'char-studio': t('Char Studio', '单字学习舱'),
    'word-detail': t('Word Card', '词条详情')
  };
  return labels[name] || '';
}
let navStack = [];
let currentView = 'map';
let currentWordId = null;
let lastNavScrollToken = 0;

function scrollIntoViewAsync(element, options) {
  if (!element || typeof element.scrollIntoView !== 'function') return Promise.resolve();
  const result = element.scrollIntoView(options);
  if (result && typeof result.then === 'function') return result;
  return new Promise(resolve => {
    let tid;
    const finish = () => {
      clearTimeout(tid);
      if (typeof window.removeEventListener === 'function') {
        window.removeEventListener('scrollend', finish);
        window.removeEventListener('scroll', onScroll);
      }
      resolve();
    };
    const onScroll = () => {
      clearTimeout(tid);
      tid = setTimeout(finish, 90);
    };
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('scrollend', finish, { once: true });
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    tid = setTimeout(finish, 90);
  });
}

async function flashReturnAnchor(anchorId) {
  if (!anchorId) return;
  const el = document.getElementById(anchorId);
  if (!el) return;
  const token = ++lastNavScrollToken;
  if (typeof el.getBoundingClientRect === 'function' && typeof window.innerHeight === 'number') {
    const rect = el.getBoundingClientRect();
    const outOfView = rect.top < 56 || rect.bottom > window.innerHeight - 64;
    if (outOfView) {
      await scrollIntoViewAsync(el, { behavior: 'smooth', block: 'center' });
    }
  }
  if (token !== lastNavScrollToken) return;
  el.classList.add('return-highlight');
  setTimeout(() => el.classList.remove('return-highlight'), 1900);
}

function getOriginNavEntry() {
  for (let i = navStack.length - 1; i >= 0; i--) {
    if (navStack[i].view !== currentView) return { entry: navStack[i], idx: i };
  }
  return null;
}

function activateView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + name);
  if (el) el.classList.add('active');
  currentView = name;
  const tabFor = {
    map: 'map',
    test: 'test',
    specials: 'specials',
    lookalikes: 'specials',
    polyphones: 'specials',
    polysemy: 'specials',
    explore: 'explore',
    saved: 'saved'
  }[name];
  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === tabFor));
  if (name === 'map') renderMap();
  if (name === 'test') renderTestCenter();
  if (name === 'specials') renderSpecialsHub();
  if (name === 'lookalikes') renderLookalikes();
  if (name === 'polyphones') renderPolyphones();
  if (name === 'polysemy') renderPolysemyView();
  if (name === 'saved') renderSaved();
  updateBackUI();
}
function updateBackUI() {
  const topEntry = navStack.length ? navStack[navStack.length - 1] : null;
  const target = topEntry ? topEntry.view : null;
  document.querySelectorAll('[data-backlabel]').forEach(el => {
    const dest = target || el.dataset.fallback;
    const lbl = viewLabel(dest);
    const ctxChar = topEntry && topEntry.contextChar && topEntry.view !== 'char-studio' ? topEntry.contextChar : '';
    const base = t('← Back', '← 返回') + (lbl ? (uiLang === 'zh' ? ' ' + lbl : ' to ' + lbl) : '');
    el.textContent = ctxChar ? (uiLang === 'zh' ? `${base}（${ctxChar}）` : `${base} (${ctxChar})`) : base;
  });
  document.querySelectorAll('[data-backwrap]').forEach(el => {
    el.style.display = navStack.length ? 'flex' : 'none';
  });
  const originBtn = $('#originBackBtn');
  if (originBtn) {
    const orig = getOriginNavEntry();
    const showOrigin = currentView === 'char-studio' && orig && orig.idx < navStack.length - 1;
    originBtn.style.display = showOrigin ? 'inline-flex' : 'none';
    if (showOrigin) {
      const lbl = viewLabel(orig.entry.view);
      const ctx = orig.entry.contextChar ? (uiLang === 'zh' ? `（${orig.entry.contextChar}）` : ` (${orig.entry.contextChar})`) : '';
      originBtn.textContent = t('↩ Return to ', '↩ 直回') + lbl + ctx;
    }
  }
}
function navGo(name, meta = {}) {
  navStack.push({
    view: currentView,
    scroll: window.scrollY || window.pageYOffset || 0,
    anchorId: meta.anchorId || null,
    contextChar: meta.contextChar || null
  });
  activateView(name);
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function restoreViewPosition(entry) {
  activateView(entry.view);
  const y = entry.scroll || 0;
  requestAnimationFrame(() => {
    window.scrollTo({ top: y, behavior: 'instant' });
    setTimeout(() => {
      window.scrollTo({ top: y, behavior: 'instant' });
      flashReturnAnchor(entry.anchorId);
    }, 60);
  });
}
function navBack() {
  const prev = navStack.pop();
  if (!prev) { activateView('map'); window.scrollTo({ top: 0, behavior: 'instant' }); return; }
  restoreViewPosition(prev);
}
function navBackToOrigin() {
  const orig = getOriginNavEntry();
  if (!orig) { navBack(); return; }
  navStack = navStack.slice(0, orig.idx);
  restoreViewPosition(orig.entry);
}
function showView(name) {
  navStack = [];
  activateView(name);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ---------- 5. Adaptive Random Character Picker ----------
function pickRandomCharForLearner(excludeChar) {
  const p = currentProfile();
  const frontier = Math.max(0, Math.min(CHAR_DB_LIST.length - 1, p.frontierIndex || 0));
  const lo = Math.max(0, frontier - 30);
  const hi = Math.min(CHAR_DB_LIST.length - 1, frontier + 180);
  const reviewLo = Math.max(0, frontier - 150);

  const windowLv0 = [];
  const lv1Review = [];
  const higherLv0 = [];
  for (let i = 0; i < CHAR_DB_LIST.length; i++) {
    const ch = CHAR_DB_LIST[i];
    if (ch.g === excludeChar) continue;
    const lvl = getCharLevel(ch.g);
    if (i >= lo && i <= hi) {
      if (lvl === 0) windowLv0.push(ch);
      else if (lvl === 1) lv1Review.push(ch);
    } else if (i > hi && i <= hi + 350 && lvl === 0) {
      higherLv0.push(ch);
    } else if (i >= reviewLo && i < lo && lvl === 1) {
      lv1Review.push(ch);
    }
  }

  const r = Math.random();
  let pool = [];
  if (r < 0.72 && windowLv0.length) pool = windowLv0;
  else if (r < 0.88 && lv1Review.length) pool = lv1Review;
  else if (higherLv0.length) pool = higherLv0;

  if (!pool.length) pool = windowLv0.length ? windowLv0 : (higherLv0.length ? higherLv0 : lv1Review);
  if (!pool.length) pool = CHAR_DB_LIST.filter((c, i) => i >= lo && c.g !== excludeChar && getCharLevel(c.g) === 0);
  if (!pool.length) pool = CHAR_DB_LIST.filter(c => c.g !== excludeChar && getCharLevel(c.g) === 0);
  if (!pool.length) pool = CHAR_DB_LIST.filter(c => c.g !== excludeChar && getCharLevel(c.g) < 3);
  if (!pool.length) pool = CHAR_DB_LIST;
  return pool[Math.floor(Math.random() * pool.length)];
}

function learnRandomChar() {
  const currentG = studioState.charObj ? studioState.charObj.g : null;
  const pick = pickRandomCharForLearner(currentG);
  openCharStudio(pick.g, true);
}

// ---------- 6. Map View (Home) ----------
let mapState = {
  tierFilter: 0,
  levelFilter: -1,
  query: '',
  compact: false
};

function onMapSearch(val) {
  mapState.query = (val || '').trim().toLowerCase();
  renderMapGrid();
}
function setTierFilter(tid) {
  mapState.tierFilter = tid;
  renderMap();
}
function setLevelFilter(lvl) {
  mapState.levelFilter = (mapState.levelFilter === lvl) ? -1 : lvl;
  renderMap();
}
function syncDensityButtons() {
  const stdBtn = $('#densityStandardBtn');
  const ovBtn = $('#densityBtn');
  if (stdBtn) {
    stdBtn.classList.toggle('active', !mapState.compact);
    stdBtn.textContent = t('⊞ Standard Grid', '⊞ 标准字格');
  }
  if (ovBtn) {
    ovBtn.classList.toggle('active', mapState.compact);
    ovBtn.textContent = t('⠿ Overview Grid', '⠿ 全景星图');
  }
}
function setMapDensity(compact) {
  mapState.compact = Boolean(compact);
  syncDensityButtons();
  renderMapGrid();
}
function toggleMapDensity() {
  setMapDensity(!mapState.compact);
}

function jumpToFrontierOnMap() {
  const p = currentProfile();
  const frontier = Math.max(0, Math.min(CHAR_DB_LIST.length - 1, p.frontierIndex || 0));
  const ch = CHAR_DB_LIST[frontier];
  if (!ch) return;
  mapState.tierFilter = 0;
  mapState.levelFilter = -1;
  mapState.query = '';
  const msi = $('#mapSearchInput');
  if (msi) msi.value = '';
  renderMap();
  requestAnimationFrame(() => flashReturnAnchor('mapNode-' + ch.g));
}

function renderMap() {
  const p = currentProfile();
  const stats = computeStats();
  const frontier = p.frontierIndex || 0;
  const fTier = TIERS.find(tObj => tObj.id === tierForIndex(frontier)) || TIERS[0];

  $('#topMapChip').textContent = stats.lit + ' / ' + stats.total + t(' lit', ' 字点亮');

  const pct3 = (stats.counts[3] / stats.total * 100).toFixed(2);
  const pct2 = (stats.counts[2] / stats.total * 100).toFixed(2);
  const pct1 = (stats.counts[1] / stats.total * 100).toFixed(2);
  const totalPct = (stats.lit / stats.total * 100).toFixed(1);

  const remindHTML = (p.studiedSinceTest >= 10) ? `
    <div class="remind-banner">
      <span>🎯 ${t(
        `You’ve learned <b>${p.studiedSinceTest}</b> new characters — time for a quick checkup!`,
        `你已新学了 <b>${p.studiedSinceTest}</b> 个字，建议做一次途中程度测试与亮度抽查！`
      )}</span>
      <button onclick="startOngoingTest('mixed')">${t('Checkup Now', '立即测评')}</button>
    </div>` : '';

  const testBtnLabel = p.assessed
    ? t('🎯 Ongoing Checkup & Spot-Test', '🎯 途中程度测试 / 亮度抽查')
    : t('📋 Initial Level Test (Checklist)', '📋 初始字表测评（测词汇量）');

  const testBtnAction = p.assessed
    ? "navGo('test')"
    : "startChecklistAssessment()";

  const dailyCount = getDailyCount(p);
  const dailyGoal = 5;
  const nextMilestone = [10, 25, 50, 100, 250, 500, 1000, 2000, 3837].find(m => m > stats.lit) || 3837;
  const recentHTML = (p.recentChars || []).slice(0, 6).map(g =>
    `<button class="quick-char-btn" onclick="openCharStudio('${g}')" title="${t('Continue studying ', '继续学习 ')}${g}">${g}</button>`
  ).join('');
  const upliftBanner = `
    <div class="uplift-strip">
      <div class="uplift-main">
        <span>${dailyCount >= dailyGoal ? '🌟' : '🌱'}</span>
        <span>${dailyCount >= dailyGoal
          ? t(`Daily goal reached (${dailyCount}/${dailyGoal} practiced)! Keep shining!`, `今日目标已达成（${dailyCount}/${dailyGoal} 字）！继续发光吧！`)
          : t(`Today’s Momentum: <b>${dailyCount} / ${dailyGoal}</b> chars practiced`, `今日学习进度：已练 <b>${dailyCount} / ${dailyGoal}</b> 字`)}</span>
      </div>
      <span class="uplift-pill">${t(`Next Milestone: ${stats.lit} / ${nextMilestone} lit`, `下一里程碑：${stats.lit} / ${nextMilestone} 点亮`)}</span>
    </div>`;
  const quickHTML = `
    <div class="quick-strip">
      <div class="quick-chars">
        <span class="muted" style="font-size:12px;font-weight:600">${t('Recent:', '最近学习：')}</span>
        ${recentHTML || `<span class="muted" style="font-size:12px">${t('Tap any char below to begin', '点击下方任意汉字开始')}</span>`}
      </div>
      <button class="audio-btn" style="min-height:32px;padding:4px 11px;font-size:12px" onclick="jumpToFrontierOnMap()">🎯 ${t('Jump to Frontier #', '定位前沿 #')}${frontier + 1} ↓</button>
    </div>`;

  const howToHTML = `
    <div class="how-to-grid">
      <div class="how-to-item">
        <span class="how-to-ic">📖</span>
        <div><b>${t('1. Learn to Light Up (● Lv.2)', '1. 学习单字点亮（● 翠竹 Lv.2）')}</b>${t('Tap any character below or click Random Character, then pass its 2-step quiz to light it up.', '点击下方任意汉字或「随机学一字」，完成 2 步小测即可点亮。')}</div>
      </div>
      <div class="how-to-item">
        <span class="how-to-ic">🎯</span>
        <div><b>${t('2. Test to Brighten (◐ Lv.1 → ✦ Lv.3)', '2. 测评升级金辉（◐ Lv.1 → ✦ Lv.3）')}</b>${t('Take Checkups or Specials quizzes to spot-light characters and promote lit ones to Radiant Gold!', '通过「测评巩固」或「专项训练」抽查点亮新字，并将已学字升级为金辉精通！')}</div>
      </div>
    </div>`;

  $('#heroDash').innerHTML = `
    <div class="hero-top">
      <div>
        <div class="label">
          <span>${t(escapeHTML(p.name) + '’s Character Map', escapeHTML(p.name) + ' 的汉字星图')}</span>
          <span>${t('Light a char · Unlock its words', '点亮一字 · 解锁一组词')}</span>
        </div>
        <h1>${t(`<em>${stats.lit}</em> <span style="font-size:19px;color:var(--ink2);font-weight:600">/ ${stats.total}</span> Lit`, `已点亮 <em>${stats.lit}</em> <span style="font-size:19px;color:var(--ink2);font-weight:600">/ ${stats.total}</span> 字`)} <small style="font-size:15px;color:var(--ink2);font-weight:600">(${totalPct}%)</small></h1>
      </div>
      <div class="level-badge">
        ${tierName(fTier)}
        <small>${t(`Frontier #${frontier + 1} · ~${stats.knownWords} words`, `程度前沿 #${frontier + 1} · 覆盖约 ${stats.knownWords} 词`)}</small>
      </div>
    </div>

    <div class="bright-bar" title="${t('Radiant Gold / Lit Bamboo / Soft Glow', '金辉精通 / 翠竹点亮 / 基础微亮')}">
      <div class="seg3" style="width:${pct3}%"></div>
      <div class="seg2" style="width:${pct2}%"></div>
      <div class="seg1" style="width:${pct1}%"></div>
    </div>

    <div class="bright-stats">
      <button class="bstat ${mapState.levelFilter===3?'active':''}" onclick="setLevelFilter(3)">
        <b><i class="dot l3"></i>${stats.counts[3]}</b><span>✦ ${t('Radiant Gold (Lv.3)', '金辉精通 (Lv.3)')}</span>
      </button>
      <button class="bstat ${mapState.levelFilter===2?'active':''}" onclick="setLevelFilter(2)">
        <b><i class="dot l2"></i>${stats.counts[2]}</b><span>● ${t('Lit Bamboo (Lv.2)', '翠竹点亮 (Lv.2)')}</span>
      </button>
      <button class="bstat ${mapState.levelFilter===1?'active':''}" onclick="setLevelFilter(1)">
        <b><i class="dot l1"></i>${stats.counts[1]}</b><span>◐ ${t('Soft Glow (Lv.1)', '基础微亮 (Lv.1)')}</span>
      </button>
      <button class="bstat ${mapState.levelFilter===0?'active':''}" onclick="setLevelFilter(0)">
        <b><i class="dot l0"></i>${stats.counts[0]}</b><span>○ ${t('Unlit (Lv.0)', '未点亮 (Lv.0)')}</span>
      </button>
    </div>

    <div class="hero-actions">
      <button class="cta" onclick="learnRandomChar()">
        <span>${t('🎲 Random Character (Your Level)', '🎲 按当前程度 · 随机学一字')}</span><span>→</span>
      </button>
      <button class="cta ${p.assessed ? 'ghost' : 'gold'}" onclick="${testBtnAction}">
        <span>${testBtnLabel}</span><span>→</span>
      </button>
    </div>
    ${howToHTML}
    ${upliftBanner}
    ${quickHTML}
    ${remindHTML}
  `;

  $('#tierFilters').innerHTML = [
    { id: 0, label: t('All (3837)', '全部 (3837)') },
    ...TIERS.map(tObj => ({ id: tObj.id, label: tierShort(tObj) + ' (' + (tObj.end - tObj.start) + ')' }))
  ].map(x => `<button class="${mapState.tierFilter === x.id ? 'active' : ''}" onclick="setTierFilter(${x.id})">${x.label}</button>`).join('');

  const lvlTabs = [
    { id: -1, label: t('All Brightness', '全部亮度') },
    { id: 0, label: t('○ Unlit', '○ 未点亮') },
    { id: 1, label: t('◐ Soft Glow', '◐ 基础微亮') },
    { id: 2, label: t('● Lit Bamboo', '● 翠竹点亮') },
    { id: 3, label: t('✦ Radiant Gold', '✦ 金辉精通') }
  ];
  $('#levelFilters').innerHTML = lvlTabs.map(x =>
    `<button class="${mapState.levelFilter === x.id ? 'active' : ''}" onclick="setLevelFilter(${x.id})">${x.label}</button>`
  ).join('');

  syncDensityButtons();
  renderMapGrid();
}

function renderMapGrid() {
  const p = currentProfile();
  const frontier = p.frontierIndex || 0;
  const q = mapState.query;
  const qPlain = stripTone(q);
  const container = $('#mapContent');
  const activeTiers = mapState.tierFilter === 0 ? TIERS : TIERS.filter(tObj => tObj.id === mapState.tierFilter);
  let html = '';

  activeTiers.forEach((tObj, idx) => {
    const slice = CHAR_DB_LIST.slice(tObj.start, tObj.end);
    let tierLit = 0;
    const tc = [0, 0, 0, 0];
    const filtered = [];
    for (const ch of slice) {
      const l = getCharLevel(ch.g);
      tc[l]++;
      if (l > 0) tierLit++;
      if (mapState.levelFilter >= 0 && l !== mapState.levelFilter) continue;
      if (q) {
        const hit = ch.g.includes(q)
          || ch.py.toLowerCase().includes(q)
          || ch.pyPlain.includes(qPlain)
          || ch.meanings.some(m => m.toLowerCase().includes(q));
        if (!hit) continue;
      }
      filtered.push({ ch, l });
    }
    if (!filtered.length && (q || mapState.levelFilter >= 0)) return;

    const totalT = slice.length;
    const isDeferred = (idx > 0 && !q && mapState.tierFilter === 0 && mapState.levelFilter === -1);
    const cells = filtered.map(({ ch, l }) => {
      const m = levelMeta(l);
      const isFrontier = (ch.index === frontier);
      const badge = l === 3 ? '<span class="cbadge">✦</span>' : (l === 1 ? '<span class="cbadge">◐</span>' : '');
      return `<button id="mapNode-${ch.g}" class="cnode ${m.cls}${isFrontier ? ' frontier-mark' : ''}" title="${ch.g} ${ch.py} — ${escapeHTML(ch.enShort)}" onclick="openCharStudio('${ch.g}')">${badge}<span class="cg">${ch.g}</span><span class="cpy">${ch.py}</span></button>`;
    }).join('');

    html += `
      <section class="tier-section${isDeferred ? ' deferred' : ''}">
        <div class="tier-head">
          <h2>${tierName(tObj)} <span class="pill">${tierDesc(tObj)}</span></h2>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <span class="tier-meta">${tierLit} / ${totalT} ${t('lit', '点亮')}（✦${tc[3]} · ●${tc[2]} · ◐${tc[1]}）</span>
            <button class="tier-view-btn" onclick="toggleMapDensity()" title="${t('Switch between Standard Grid and Overview Grid', '切换标准字格与全景星图')}">${mapState.compact ? t('⊞ Standard Grid', '⊞ 切回标准字格') : t('⠿ Overview Grid', '⠿ 切换全景星图')}</button>
          </div>
        </div>
        <div class="tier-mini-bar">
          <i style="width:${(tc[3]/totalT*100).toFixed(2)}%;background:var(--gold)"></i>
          <i style="width:${(tc[2]/totalT*100).toFixed(2)}%;background:var(--bamboo)"></i>
          <i style="width:${(tc[1]/totalT*100).toFixed(2)}%;background:#92B5A0"></i>
        </div>
        <div class="char-grid${mapState.compact ? ' compact' : ''}">${cells}</div>
      </section>`;
  });

  if (!html) {
    html = `<div class="empty"><b>${t('No characters match your filter', '当前筛选下没有匹配的汉字')}</b><p>${t('Try clearing your search query or switching the brightness filter.', '试试清空搜索关键词或切换亮度过滤器。')}</p></div>`;
  }
  container.innerHTML = html;
}

// ---------- 7. Single-Character Learning Studio (4-Step Flow) ----------
let studioState = {
  charObj: null,
  step: 0,
  maskContext: false,
  showAllWords: false,
  quiz1: null,
  quiz2: null,
  q1Picked: null,
  q2Picked: null,
  q1Correct: false,
  q2Correct: false,
  completedNow: false
};

function openCharStudio(g, replaceCurrent = false, anchorId = null, contextChar = null) {
  const ch = CHAR_DB_MAP.get(g);
  if (!ch) { toast(t('Character not found: ', '未找到汉字：') + g); return; }

  const p = currentProfile();
  if (!Array.isArray(p.recentChars)) p.recentChars = [];
  p.recentChars = [g, ...p.recentChars.filter(x => x !== g)].slice(0, 20);
  persistCurrent();

  studioState = {
    charObj: ch,
    step: 0,
    maskContext: false,
    showAllWords: false,
    quiz1: buildCharQuiz1(ch),
    quiz2: buildCharQuiz2(ch),
    q1Picked: null,
    q2Picked: null,
    q1Correct: false,
    q2Correct: false,
    completedNow: false
  };
  if (replaceCurrent && currentView === 'char-studio') {
    renderCharStudio();
    window.scrollTo({ top: 0, behavior: 'instant' });
  } else {
    let resolvedAnchor = anchorId;
    if (!resolvedAnchor) {
      if (currentView === 'polyphones') resolvedAnchor = 'polyCard-' + (contextChar || g);
      else if (currentView === 'polysemy') resolvedAnchor = 'semyCard-' + (contextChar || g);
      else if (currentView === 'lookalikes') resolvedAnchor = 'laCard-' + (contextChar || 0);
      else if (currentView === 'map') resolvedAnchor = 'mapNode-' + g;
    }
    navGo('char-studio', { anchorId: resolvedAnchor, contextChar: contextChar || g });
    renderCharStudio();
  }
}

function setStudioStep(stepIdx) {
  studioState.step = stepIdx;
  renderCharStudio();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSaveChar(g) {
  const p = currentProfile();
  if (!Array.isArray(p.savedChars)) p.savedChars = [];
  if (p.savedChars.includes(g)) {
    p.savedChars = p.savedChars.filter(x => x !== g);
    toast(t(`Removed “${g}” from Saved`, `已取消收藏「${g}」`));
  } else {
    p.savedChars.unshift(g);
    toast(t(`Saved “${g}” ♥`, `已收藏汉字「${g}」♥`));
  }
  persistCurrent();
  renderCharStudio();
}

function pickDistractors(targetCharObj, count = 3) {
  const picks = [];
  const used = new Set([targetCharObj.g]);
  for (const pair of targetCharObj.lookalikes) {
    const other = pair.a.g === targetCharObj.g ? pair.b.g : pair.a.g;
    const obj = CHAR_DB_MAP.get(other);
    if (obj && !used.has(obj.g)) { used.add(obj.g); picks.push(obj); }
  }
  const lo = Math.max(0, targetCharObj.index - 120);
  const hi = Math.min(CHAR_DB_LIST.length - 1, targetCharObj.index + 120);
  const nearby = shuffleArr(CHAR_DB_LIST.slice(lo, hi + 1));
  for (const c of nearby) {
    if (picks.length >= count) break;
    if (!used.has(c.g) && c.py !== targetCharObj.py) {
      used.add(c.g);
      picks.push(c);
    }
  }
  while (picks.length < count) {
    const rand = CHAR_DB_LIST[Math.floor(Math.random() * CHAR_DB_LIST.length)];
    if (!used.has(rand.g)) { used.add(rand.g); picks.push(rand); }
  }
  return picks.slice(0, count);
}

function buildCharQuiz1(ch) {
  const distractors = pickDistractors(ch, 3);
  const opts = shuffleArr([ch, ...distractors]);
  return {
    type: 'recognition',
    target: ch.g,
    promptEn: ch.enShort,
    promptPy: ch.py,
    opts: opts.map(o => ({ g: o.g, py: o.py, en: o.enShort }))
  };
}

function buildCharQuiz2(ch) {
  const sent = ch.sentences[0];
  const rankedWords = rankWordsForLearner(ch.words, ch.g);
  const multiWord = rankedWords.find(w => w.zh.length >= 2 && w.zh.includes(ch.g));
  let blankText = '';
  let pyHint = '';
  let enHint = '';
  if (sent && sent.zh.includes(ch.g)) {
    blankText = sent.zh.replace(ch.g, ' [ ? ] ');
    pyHint = sent.py;
    enHint = sent.en;
  } else if (multiWord) {
    blankText = multiWord.zh.replace(ch.g, ' [ ? ] ');
    pyHint = multiWord.py;
    enHint = multiWord.en;
  } else {
    blankText = ' [ ? ] (' + ch.py + ')';
    enHint = ch.enShort;
  }
  const distractors = pickDistractors(ch, 3);
  const opts = shuffleArr([ch, ...distractors]);
  return {
    type: 'cloze',
    target: ch.g,
    blankText,
    pyHint,
    enHint,
    opts: opts.map(o => ({ g: o.g, py: o.py }))
  };
}

function answerStudioQuiz(qNum, pickedG) {
  const st = studioState;
  const ch = st.charObj;
  if (qNum === 1 && st.q1Picked === null) {
    st.q1Picked = pickedG;
    st.q1Correct = (pickedG === ch.g);
  }
  if (qNum === 2 && st.q2Picked === null) {
    st.q2Picked = pickedG;
    st.q2Correct = (pickedG === ch.g);
  }
  if (st.q1Picked !== null && st.q2Picked !== null && st.q1Correct && st.q2Correct && !st.completedNow) {
    st.completedNow = true;
    const oldLvl = getCharLevel(ch.g);
    const newLvl = Math.max(oldLvl, 2);
    setCharLevel(ch.g, newLvl);
    const p = currentProfile();
    p.studiedSinceTest = (p.studiedSinceTest || 0) + 1;
    recordDailyActivity();
    if (ch.index >= (p.frontierIndex || 0) - 10 && ch.index <= (p.frontierIndex || 0) + 200) {
      p.frontierIndex = Math.max(p.frontierIndex || 0, Math.min(CHAR_DB_LIST.length - 1, ch.index + 1));
    }
    persistCurrent();
    toast(t(`✨ “${ch.g}” learned & lit up!`, `✨「${ch.g}」已学会并点亮为翠竹绿！`));
  }
  renderCharStudio();
}

function retryStudioQuiz() {
  const ch = studioState.charObj;
  studioState.quiz1 = buildCharQuiz1(ch);
  studioState.quiz2 = buildCharQuiz2(ch);
  studioState.q1Picked = null;
  studioState.q2Picked = null;
  studioState.q1Correct = false;
  studioState.q2Correct = false;
  studioState.completedNow = false;
  renderCharStudio();
}

function manualResetCharLevel(g, lvl) {
  setCharLevel(g, lvl);
  persistCurrent();
  renderCharStudio();
  toast(lvl === 0
    ? t(`Reset “${g}” to Unlit so you can re-learn it`, `已将「${g}」熄灭重置，可重新学习测试`)
    : t(`Updated brightness of “${g}”`, `已更新「${g}」的亮度`));
}

function renderCharStudio() {
  const st = studioState;
  const ch = st.charObj;
  if (!ch) return;
  const p = currentProfile();
  const lvl = getCharLevel(ch.g);
  const meta = levelMeta(lvl);
  const isSaved = (p.savedChars || []).includes(ch.g);
  const tier = TIERS.find(tObj => tObj.id === ch.tier) || TIERS[0];

  const steps = uiLang === 'zh'
    ? ['① 观形辨音', '② 构词连珠', '③ 语境浸润', '④ 闯关点亮']
    : ['① Form & Sound', '② Build Words', '③ Sentences', '④ Light Up'];
  const stepTabsHTML = steps.map((label, i) => {
    const cls = st.step === i ? 'active' : (i < st.step || (i === 3 && lvl >= 2) ? 'done' : '');
    return `<button class="studio-step ${cls}" onclick="setStudioStep(${i})">${label}</button>`;
  }).join('');

  let innerHTML = '';

  if (st.step === 0) {
    const polyHTML = ch.poly ? (
      ch.poly.type === 'poly'
        ? `<div class="notice" style="margin-top:14px"><b>🔀 ${t('Polyphone Note:', '多音字提示：')}</b> ${t(`“${ch.g}” has multiple readings:`, `「${ch.g}」有多个读音：`)} ${ch.poly.data.readings.map(r => '<b>' + r.py + '</b> (' + escapeHTML(r.sense) + ')').join(' · ')}. <button class="text-btn" style="min-height:auto;padding:0 4px" onclick="navGo('polyphones');jumpToPolyCard('${ch.g}')">${t('Compare in Polyphones →', '去多音字对比 →')}</button></div>`
        : `<div class="notice" style="margin-top:14px"><b>💡 ${t('Multiple Meanings:', '一字多义：')}</b> ${t(`“${ch.g}” (${ch.poly.data.py}) shifts meaning by word:`, `「${ch.g}」(${ch.poly.data.py}) 在不同词中含义不同：`)} ${ch.poly.data.senses.map(s => escapeHTML(s.sense)).join(' / ')}. <button class="text-btn" style="min-height:auto;padding:0 4px" onclick="navGo('polysemy');jumpToSemyCard('${ch.g}')">${t('Explore Senses →', '去多义字对比 →')}</button></div>`
    ) : '';

    const laHTML = ch.lookalikes.length ? ch.lookalikes.map(pair => {
      const other = pair.a.g === ch.g ? pair.b : pair.a;
      return `<div class="la-diff" style="margin-top:12px">👀 <b>${t('Look-alike Alert:', '易混形近对比：')}</b> <span class="zh" style="font-size:18px;font-weight:900">${ch.g}</span> vs <button class="text-btn" style="padding:0;min-height:auto;font-size:18px" onclick="openCharStudio('${other.g}')"><span class="zh">${other.g}</span> (${other.py})</button> — ${pair.diff}</div>`;
    }).join('') : '';

    innerHTML = `
      <div style="text-align:center">
        <div class="mizige"><span class="glyph">${ch.g}</span></div>
        <div class="pinyin-big">${ch.pys.join(' / ')}</div>
        <div class="gloss">${escapeHTML(ch.meanings.join(' · '))}</div>
        <div class="audio-row">
          <button class="audio-btn primary" onclick="speak('${ch.g}')">▶ ${t('Listen', '听发音')}</button>
          <button class="audio-btn" onclick="speak('${ch.g}','slow')">🐢 ${t('Slow', '慢速跟读')}</button>
          <button class="audio-btn" onclick="toggleSaveChar('${ch.g}')">${isSaved ? t('♥ Saved', '♥ 已收藏') : t('♡ Save Char', '♡ 收藏字')}</button>
        </div>
      </div>
      <div style="margin-top:18px">
        <div class="kv"><b>${t('Strokes & Rank', '笔画与位置')}</b><span>${escapeHTML(formatStrokes(ch))} · ${t(`Frequency #${ch.index + 1} / 3837`, `难度序 #${ch.index + 1} / 3837`)}</span></div>
        <div class="kv"><b>${t('Origin & Components', '字源与部件拆解')}</b><span style="text-align:left;max-width:72%">${escapeHTML(ch.radicalNote)}</span></div>
      </div>
      ${polyHTML}
      ${laHTML}
      <button class="cta" onclick="setStudioStep(1)"><span>${t(`Next: See words built with “${ch.g}”`, `下一步：看看「${ch.g}」能组什么词`)}</span><span>${t('② Build Words →', '② 构词连珠 →')}</span></button>
    `;
  } else if (st.step === 1) {
    const limit = st.showAllWords ? 24 : 6;
    const rankedWords = rankWordsForLearner(ch.words, ch.g);
    const list = rankedWords.slice(0, limit);
    const combosHTML = list.map(w => {
      const charNodes = w.zh.split('').map(c => {
        if (c === ch.g) return `<span class="hi">${c}</span>`;
        const cLvl = getCharLevel(c);
        const dot = cLvl >= 2 ? '●' : (cLvl === 1 ? '◐' : '○');
        return `<span class="partner" title="${t(`Click to study “${c}”`, `点击去学「${c}」`)}" onclick="openCharStudio('${c}')">${c}<sup style="font-size:10px">${dot}</sup></span>`;
      }).join('');
      return `
        <div class="combo-card">
          <div class="combo-top">
            <div class="combo-word">${charNodes}</div>
            <div class="combo-chips">
              <button class="audio-btn" style="min-height:34px;padding:6px 11px;font-size:12.5px" onclick="speak('${w.zh}')">▶ ${w.py}</button>
              <button class="audio-btn" style="min-height:34px;padding:6px 11px;font-size:12.5px" onclick="openWord('${w.id}')">${t('Word Card →', '词卡 →')}</button>
            </div>
          </div>
          <div class="combo-meta">
            <span>${escapeHTML(w.en)}</span>
            <span class="pill">${escapeHTML(w.topic)}</span>
          </div>
        </div>`;
    }).join('');

    innerHTML = `
      <div class="label">${t(`Build Words with “${ch.g}”`, `字不离词 · 用「${ch.g}」组词`)} <span>${t(`${ch.words.length} words (tap any partner char to study it)`, `共关联 ${ch.words.length} 个词条（点击搭档字可跳转学习）`)}</span></div>
      <div class="combo-grid">${combosHTML || `<div class="empty">${t('No multi-character words found', '暂无关联多字词条')}</div>`}</div>
      ${ch.words.length > 6 && !st.showAllWords ? `<button class="show-more" onclick="studioState.showAllWords=true;renderCharStudio()">${t(`Show more words (${ch.words.length} total)`, `展开更多词组（共 ${ch.words.length} 个）`)}</button>` : ''}
      <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:8px;margin-top:14px">
        <button class="cta ghost" style="margin-top:0" onclick="setStudioStep(0)"><span>${t('← Back', '← 上一步')}</span><span></span></button>
        <button class="cta" style="margin-top:0" onclick="setStudioStep(2)"><span>${t('Read in real sentences', '在真实句子里读它')}</span><span>${t('③ Sentences →', '③ 语境浸润 →')}</span></button>
      </div>
    `;
  } else if (st.step === 2) {
    const sentsHTML = ch.sentences.map(s => {
      const highlighted = escapeHTML(s.zh).split(ch.g).join('<mark>' + ch.g + '</mark>');
      const cleanZh = s.zh.replace(/'/g, '');
      return `
        <div class="sent-card">
          <div class="sent-zh">${highlighted}</div>
          <div class="sent-py ${st.maskContext ? 'mask-hidden' : ''}">${escapeHTML(s.py)}</div>
          <div class="sent-en ${st.maskContext ? 'mask-hidden' : ''}">${escapeHTML(s.en)}</div>
          <div class="audio-row" style="justify-content:flex-start;margin-top:10px">
            <button class="audio-btn primary" onclick="speak('${cleanZh}')">▶ ${t('Listen', '听整句')}</button>
            <button class="audio-btn" onclick="speak('${cleanZh}','slow')">🐢 ${t('Slow', '慢速')}</button>
            <button class="audio-btn" onclick="openWord('${s.wordId}')">${t('Word:', '出处词：')} ${s.wordZh}</button>
          </div>
        </div>`;
    }).join('');

    innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <div class="label" style="margin:0">${t('Read in Context', '词不离句 · 语境跟读')}</div>
        <button class="audio-btn" onclick="studioState.maskContext=!studioState.maskContext;renderCharStudio()">${st.maskContext ? t('👁 Show Pinyin & English', '👁 显示拼音与释义') : t('🙈 Blind-Read (Hide Hints)', '🙈 遮住拼音试读')}</button>
      </div>
      ${sentsHTML || `<div class="empty">${t('No example sentences available', '暂无例句')}</div>`}
      <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:8px;margin-top:16px">
        <button class="cta ghost" style="margin-top:0" onclick="setStudioStep(1)"><span>${t('← Back', '← 上一步')}</span><span></span></button>
        <button class="cta" style="margin-top:0" onclick="setStudioStep(3)"><span>${t('Take quick quiz to light up', '学完去闯关 · 点亮此字')}</span><span>${t('④ Light Up →', '④ 闯关点亮 →')}</span></button>
      </div>
    `;
  } else {
    const q1 = st.quiz1;
    const q2 = st.quiz2;
    const q1Done = st.q1Picked !== null;
    const q2Done = st.q2Picked !== null;
    const allDone = q1Done && q2Done;
    const allPassed = st.q1Correct && st.q2Correct;

    const q1Opts = q1.opts.map(o => {
      let cls = '';
      if (q1Done) {
        if (o.g === ch.g) cls = ' correct';
        else if (o.g === st.q1Picked) cls = ' wrong';
      }
      return `<button class="quiz-opt${cls}" ${q1Done ? 'disabled' : ''} onclick="answerStudioQuiz(1,'${o.g}')"><span class="zh">${o.g}</span><span style="color:var(--ink2);font-size:13px">${q1Done ? o.py + ' · ' + escapeHTML(o.en) : ''}</span></button>`;
    }).join('');

    const q2Opts = q2.opts.map(o => {
      let cls = '';
      if (q2Done) {
        if (o.g === ch.g) cls = ' correct';
        else if (o.g === st.q2Picked) cls = ' wrong';
      }
      return `<button class="quiz-opt${cls}" ${q2Done ? 'disabled' : ''} onclick="answerStudioQuiz(2,'${o.g}')"><span class="zh">${o.g}</span><span style="color:var(--ink2);font-size:13px">${q2Done ? o.py : ''}</span></button>`;
    }).join('');

    let resultBanner = '';
    if (allDone && allPassed) {
      const orig = getOriginNavEntry();
      const backOriginBtn = orig
        ? `<button class="cta secondary" style="margin-top:0;grid-column:1 / -1" onclick="navBackToOrigin()"><span>↩ ${t('Return to ', '返回')}${viewLabel(orig.entry.view)}${orig.entry.contextChar ? ' (' + orig.entry.contextChar + ')' : ''}</span><span>→</span></button>`
        : '';
      resultBanner = `
        <div class="feedback show good" style="margin-top:16px">
          <b>${t('🎉 Character Lit Up!', '🎉 闯关成功！')}</b> ${t(`“<b class="zh" style="font-size:18px">${ch.g}</b>” is now <b>${levelMeta(getCharLevel(ch.g)).label}</b>!`, `汉字「<b class="zh" style="font-size:18px">${ch.g}</b>」已点亮为 <b>${levelMeta(getCharLevel(ch.g)).label}</b>！`)}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
            ${backOriginBtn}
            <button class="cta" style="margin-top:0" onclick="learnRandomChar()"><span>${t('🎲 Next Random Char', '🎲 随机学下一字')}</span><span>→</span></button>
            <button class="cta ghost" style="margin-top:0" onclick="showView('map')"><span>${t('🗺️ View Character Map', '🗺️ 回星图看点亮')}</span><span></span></button>
          </div>
        </div>`;
    } else if (allDone && !allPassed) {
      resultBanner = `
        <div class="feedback show bad" style="margin-top:16px">
          <b>${t('Almost there:', '还差一点点：')}</b> ${t(`Answer both checks correctly to light up “${ch.g}”. Review the answers above and try again!`, `两关全部答对即可点亮「${ch.g}」。看看上面解析后再试一次！`)}
          <button class="la-again" style="margin-top:10px" onclick="retryStudioQuiz()">↻ ${t('Try New Questions', '重新出题测试')}</button>
        </div>`;
    }

    innerHTML = `
      <div class="label">${t('④ Light Up Check · Pass both to light this character', '④ 闯关点亮 · 学过且测过即点亮')} <span>${t('2/2 correct → Lit Bamboo (Lv.2)', '两题全对 → 翠竹点亮 (Lv.2)')}</span></div>

      <div style="margin-top:14px;padding:14px;border:1px solid var(--line);border-radius:18px;background:var(--bg)">
        <div class="label">${t('Check 1 · Recognition & Sound', '第 1 关 · 听音辨义认字')} <button class="audio-btn" style="min-height:32px;padding:4px 10px;font-size:12px" onclick="speak('${ch.g}')">▶ ${t('Play Sound', '听读音')}</button></div>
        <p style="font-weight:700;font-size:16px;margin:8px 0 6px">${t(`Which character is pronounced <span style="color:var(--bamboo)">${q1.promptPy}</span> and means “${escapeHTML(q1.promptEn)}”?`, `哪个汉字读作 <span style="color:var(--bamboo)">${q1.promptPy}</span>，意思是 “${escapeHTML(q1.promptEn)}”？`)}</p>
        ${q1Opts}
      </div>

      <div style="margin-top:14px;padding:14px;border:1px solid var(--line);border-radius:18px;background:var(--bg)">
        <div class="label">${t('Check 2 · Context Cloze', '第 2 关 · 语境填空运用')}</div>
        <p class="zh" style="font-size:20px;font-weight:700;margin:8px 0 4px">${escapeHTML(q2.blankText)}</p>
        <p class="muted" style="margin:0 0 8px;font-size:13px">${escapeHTML(q2.enHint)}</p>
        ${q2Opts}
      </div>

      ${resultBanner}
    `;
  }

  $('#studioBody').innerHTML = `
    <div class="studio-card">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--line);flex-wrap:wrap;gap:8px">
        <div>
          <span class="pill">${tierName(tier)}</span>
          <span class="pill ${meta.cls}">${meta.short} ${meta.label}</span>
        </div>
        ${lvl > 0 ? `<button class="text-btn" style="font-size:12.5px;color:var(--ink2)" onclick="manualResetCharLevel('${ch.g}', 0)">${t('Reset to Unlit', '熄灭重学')}</button>` : ''}
      </div>
      <div class="studio-steps">${stepTabsHTML}</div>
      <div class="studio-body">${innerHTML}</div>
    </div>
  `;
}

// ---------- 8. Test Center: Initial Checklist + Adaptive Ongoing Quiz ----------
const SAMPLE_PER_TIER = 8;
function buildRandomChecklistSamples() {
  return TIERS.map(tObj => {
    const len = tObj.end - tObj.start;
    const step = len / SAMPLE_PER_TIER;
    const chars = [];
    for (let k = 0; k < SAMPLE_PER_TIER; k++) {
      const idx = Math.min(tObj.end - 1, Math.floor(tObj.start + k * step + Math.random() * step));
      chars.push(CHAR_DB_LIST[idx]);
    }
    return { tier: tObj, chars };
  });
}
function getChecklistSamples() {
  if (!testState.samples || !testState.samples.length) {
    testState.samples = buildRandomChecklistSamples();
    testState.displayChars = shuffleArr(testState.samples.flatMap(s => s.chars));
  }
  return testState.samples;
}

let testState = {
  mode: 'hub',
  checked: new Set(),
  samples: [],
  displayChars: [],
  tierRates: [],
  questions: [],
  qIdx: 0,
  picked: null,
  results: [],
  testKind: 'mixed'
};

function startChecklistAssessment() {
  const samples = buildRandomChecklistSamples();
  const displayChars = shuffleArr(samples.flatMap(s => s.chars));
  const checked = new Set();
  testState = {
    mode: 'checklist',
    checked,
    samples,
    displayChars,
    tierRates: [],
    questions: [],
    qIdx: 0,
    picked: null,
    results: [],
    testKind: 'calibrate'
  };
  if (currentView !== 'test') navGo('test');
  renderTestCenter();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function reshuffleChecklist() {
  const samples = buildRandomChecklistSamples();
  const displayChars = shuffleArr(samples.flatMap(s => s.chars));
  testState.samples = samples;
  testState.displayChars = displayChars;
  testState.checked = new Set();
  renderTestCenter();
}

function toggleCheckChar(g) {
  if (testState.checked.has(g)) testState.checked.delete(g);
  else testState.checked.add(g);
  renderTestCenter();
}
function toggleCheckAll(selectAll) {
  getChecklistSamples();
  for (const ch of testState.displayChars) {
    if (selectAll) testState.checked.add(ch.g);
    else testState.checked.delete(ch.g);
  }
  renderTestCenter();
}
function toggleCheckTier(tierId, selectAll) {
  const samples = getChecklistSamples().find(s => s.tier.id === tierId);
  if (!samples) return;
  for (const ch of samples.chars) {
    if (selectAll) testState.checked.add(ch.g);
    else testState.checked.delete(ch.g);
  }
  renderTestCenter();
}

function proceedToCalibration() {
  const samples = getChecklistSamples();
  testState.tierRates = samples.map(s => {
    const hit = s.chars.filter(c => testState.checked.has(c.g)).length;
    return { tierId: s.tier.id, tier: s.tier, rate: hit / s.chars.length, hit, total: s.chars.length };
  });

  let highestSelectedTier = 1;
  for (const tr of testState.tierRates) {
    if (tr.hit >= 2) highestSelectedTier = tr.tierId;
  }
  const candPool = [];
  for (const s of samples) {
    if (s.tier.id === highestSelectedTier || s.tier.id === Math.max(1, highestSelectedTier - 1)) {
      for (const ch of s.chars) {
        if (testState.checked.has(ch.g)) candPool.push(ch);
      }
    }
  }
  let pool = shuffleArr(candPool);
  if (pool.length < 5) {
    const extra = shuffleArr(samples[0].chars).filter(c => !pool.some(x => x.g === c.g));
    pool = [...pool, ...extra];
  }
  testState.questions = pool.slice(0, 5).map(ch => buildTestQuestion(ch, 'boundary'));
  testState.qIdx = 0;
  testState.picked = null;
  testState.results = [];
  testState.mode = 'calibrate';
  testState.testKind = 'calibrate';
  renderTestCenter();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function buildTestQuestion(ch, kind) {
  const distractors = pickDistractors(ch, 3);
  const opts = shuffleArr([ch, ...distractors]);
  const useCloze = ch.sentences.length && Math.random() < 0.45;
  if (useCloze) {
    const s = ch.sentences[0];
    return {
      g: ch.g,
      kind,
      style: 'cloze',
      prompt: s.zh.replace(ch.g, ' [ ? ] '),
      sub: s.en,
      py: ch.py,
      opts: opts.map(o => ({ g: o.g, py: o.py, en: o.enShort }))
    };
  }
  return {
    g: ch.g,
    kind,
    style: 'meaning',
    prompt: ch.enShort,
    py: ch.py,
    opts: opts.map(o => ({ g: o.g, py: o.py, en: o.enShort }))
  };
}

function startOngoingTest(testKind = 'mixed') {
  const p = currentProfile();
  const frontier = p.frontierIndex || 0;
  const litChars = CHAR_DB_LIST.filter(c => getCharLevel(c.g) >= 1);
  const lv1Chars = litChars.filter(c => getCharLevel(c.g) === 1);
  const lv2Chars = litChars.filter(c => getCharLevel(c.g) === 2);
  const lv3Chars = litChars.filter(c => getCharLevel(c.g) === 3);

  const pickedSet = new Set();
  const questions = [];

  function pickLitChar() {
    const r = Math.random();
    let pool = [];
    if (r < 0.50 && lv1Chars.length) pool = lv1Chars;
    else if (r < 0.88 && lv2Chars.length) pool = lv2Chars;
    else if (lv3Chars.length) pool = lv3Chars;
    else pool = litChars;
    const avail = pool.filter(c => !pickedSet.has(c.g));
    if (!avail.length) return null;
    const c = avail[Math.floor(Math.random() * avail.length)];
    pickedSet.add(c.g);
    return c;
  }

  const totalQ = 10;
  const litQuota = (testKind === 'litOnly') ? totalQ : Math.min(litChars.length, 6);

  for (let i = 0; i < litQuota; i++) {
    const c = pickLitChar();
    if (c) questions.push(buildTestQuestion(c, 'lit-check'));
  }

  const lo = Math.max(0, frontier - 50);
  const hi = Math.min(CHAR_DB_LIST.length - 1, frontier + 220);
  const frontierPool = shuffleArr(
    CHAR_DB_LIST.slice(lo, hi + 1).filter(c => !pickedSet.has(c.g) && (testKind === 'litOnly' ? getCharLevel(c.g) >= 1 : getCharLevel(c.g) === 0))
  );
  for (const c of frontierPool) {
    if (questions.length >= totalQ) break;
    pickedSet.add(c.g);
    questions.push(buildTestQuestion(c, getCharLevel(c.g) >= 1 ? 'lit-check' : 'frontier'));
  }
  for (const c of shuffleArr(CHAR_DB_LIST)) {
    if (questions.length >= totalQ) break;
    if (!pickedSet.has(c.g)) {
      pickedSet.add(c.g);
      questions.push(buildTestQuestion(c, getCharLevel(c.g) >= 1 ? 'lit-check' : 'frontier'));
    }
  }

  if (!questions.length) {
    toast(t('Light up at least one character or run the initial checklist first', '请先点亮至少一个汉字或进行初始测评'));
    return;
  }

  testState = {
    mode: 'ongoing',
    checked: new Set(),
    tierRates: [],
    questions: shuffleArr(questions),
    qIdx: 0,
    picked: null,
    results: [],
    testKind
  };
  if (currentView !== 'test') navGo('test');
  renderTestCenter();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function answerTestQuestion(pickedG) {
  if (testState.picked !== null) return;
  const q = testState.questions[testState.qIdx];
  const ok = (pickedG === q.g);
  testState.picked = pickedG;

  const oldLvl = getCharLevel(q.g);
  let newLvl = oldLvl;
  if (testState.mode === 'ongoing') {
    if (ok) {
      newLvl = Math.min(3, oldLvl + 1);
    } else if (oldLvl >= 1) {
      newLvl = Math.max(0, oldLvl - 1);
    }
    setCharLevel(q.g, newLvl);
  } else if (testState.mode === 'calibrate') {
    // Placement calibration strictly measures level & frontier without lighting Map stars
    newLvl = oldLvl;
  }

  testState.results.push({ g: q.g, ok, oldLvl, newLvl, kind: q.kind });
  if (ok) recordDailyActivity();
  persistCurrent();
  renderTestCenter();
}

function nextTestQuestion() {
  if (testState.qIdx < testState.questions.length - 1) {
    testState.qIdx++;
    testState.picked = null;
    renderTestCenter();
    return;
  }
  finalizeTestSession();
}

function finalizeTestSession() {
  const p = currentProfile();
  const okCount = testState.results.filter(r => r.ok).length;
  const acc = testState.results.length ? okCount / testState.results.length : 0;

  if (testState.mode === 'calibrate') {
    const factor = 0.65 + 0.35 * acc;
    let estChars = 0;
    let newFrontier = 0;
    let foundFrontier = false;

    for (const tr of testState.tierRates) {
      const mastery = tr.rate * factor;
      const tierSize = tr.tier.end - tr.tier.start;
      estChars += Math.round(tierSize * mastery);
      if (mastery < 0.75 && !foundFrontier) {
        foundFrontier = true;
        newFrontier = Math.min(tr.tier.end - 1, Math.round(tr.tier.start + tierSize * mastery));
      }
    }
    if (!foundFrontier) newFrontier = CHAR_DB_LIST.length - 1;

    p.assessed = true;
    p.frontierIndex = newFrontier;
    p.estChars = estChars;
    p.studiedSinceTest = 0;
  } else {
    const frontierRes = testState.results.filter(r => r.kind === 'frontier');
    if (frontierRes.length) {
      const fAcc = frontierRes.filter(r => r.ok).length / frontierRes.length;
      if (fAcc >= 0.7) p.frontierIndex = Math.min(CHAR_DB_LIST.length - 1, (p.frontierIndex || 0) + 60);
      else if (fAcc < 0.4) p.frontierIndex = Math.max(0, (p.frontierIndex || 0) - 40);
    }
    p.studiedSinceTest = 0;
  }

  const stats = computeStats();
  if (!Array.isArray(p.testHistory)) p.testHistory = [];
  p.testHistory.unshift({
    ts: Date.now(),
    kind: testState.testKind,
    score: okCount,
    total: testState.results.length,
    litAfter: stats.lit
  });
  p.testHistory = p.testHistory.slice(0, 15);
  persistCurrent();

  testState.mode = 'report';
  renderTestCenter();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTestCenter() {
  const box = $('#testBody');
  if (!box) return;
  const p = currentProfile();
  const stats = computeStats();

  if (testState.mode === 'hub') {
    const historyHTML = (p.testHistory || []).length
      ? p.testHistory.slice(0, 5).map(h => {
          const dt = new Date(h.ts).toLocaleDateString([], { month: 'short', day: 'numeric' });
          const label = h.kind === 'calibrate'
            ? t('Initial Checklist Calibration', '初始字表校准')
            : (h.kind === 'litOnly' ? t('Lit-Character Spot-Check', '已点亮字巩固抽查') : t('Mixed Level Checkup', '途中综合程度测验'));
          return `<div class="delta-row"><span><b>${label}</b><small class="muted" style="display:block">${dt} · ${t(`${h.litAfter} chars lit after test`, `测后点亮 ${h.litAfter} 字`)}</small></span><span class="pill green">${h.score} / ${h.total}</span></div>`;
        }).join('')
      : `<div class="empty">${t('No checkup history yet — start with the Initial Character Checklist to calibrate your map.', '还没有测评记录 — 建议先做一次「初始字表测评」来校准星图起点。')}</div>`;

    box.innerHTML = `
      <div class="plan-card">
        <div class="label">${t('Your Level Snapshot', '当前水平画像')} <span>${p.assessed ? t('Initial check completed', '已完成摸底定级') : t('Not calibrated yet', '尚未完成摸底测评')}</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:12px;text-align:center">
          <div style="background:var(--bg);padding:12px;border-radius:16px;border:1px solid var(--line)"><big style="font-size:24px;font-weight:800;display:block">~${stats.estChars}</big><span style="font-size:12px;color:var(--ink2)">${t('Est. Vocabulary', '估算识字水平')}</span></div>
          <div style="background:var(--bg);padding:12px;border-radius:16px;border:1px solid var(--line)"><big style="font-size:24px;font-weight:800;display:block">${stats.lit}</big><span style="font-size:12px;color:var(--ink2)">${t('Earned Lit Chars', '实学实测点亮')}</span></div>
          <div style="background:var(--bg);padding:12px;border-radius:16px;border:1px solid var(--line)"><big style="font-size:24px;font-weight:800;display:block">#${(p.frontierIndex||0)+1}</big><span style="font-size:12px;color:var(--ink2)">${t('Current Frontier', '推荐难度前沿')}</span></div>
        </div>
      </div>

      <div class="grid" style="margin-top:14px">
        <div class="stat-card">
          <div class="label">${t('Mode 1 · Initial Placement', '模式一 · 摸底定级')}</div>
          <h3 style="margin-top:8px">📋 ${t('Character Checklist Test', '识字水平摸底测评')}</h3>
          <p class="muted">${t('Pick characters you know from a random 48-char map, then pass 5 quick questions. Calibrates recommendation level only — never bulk-lights your Character Map.', '从随机 48 字星图中勾选认识的字，再测 5 题真伪校准。只测定你的推词/推字起点，不会点亮或批量点亮星图中的字。')}</p>
          <button class="cta gold" onclick="startChecklistAssessment()"><span>${p.assessed ? t('Retake Checklist Test', '重新进行摸底定级') : t('Start Checklist Test', '开始摸底定级')}</span><span>→</span></button>
        </div>
        <div class="stat-card">
          <div class="label">${t('Mode 2 · Ongoing Checkup', '模式二 · 途中测试')}</div>
          <h3 style="margin-top:8px">🎯 ${t('Adaptive Mixed Checkup', '程度与亮度混合抽查')}</h3>
          <p class="muted">${t('10 questions mixing lit-character spot-checks and frontier probes. Right answers step up brightness (Lv.0→1→2→3); misses dim or unlight!', '10 题混合抽查（已点亮字巩固 + 程度前沿探底）。答对逐级点亮与升级（Lv.0→1→2→3），答错降级或熄灭！')}</p>
          <button class="cta" onclick="startOngoingTest('mixed')"><span>${t('Start 10-Question Checkup', '开始 10 题混合测评')}</span><span>→</span></button>
        </div>
      </div>

      <div class="plan-card" style="margin-top:14px">
        <div class="label">${t('Mode 3 · Lit Spot-Check', '模式三 · 专项巩固')} <span>${t('100% sampled from your lit characters', '100% 抽查已点亮的汉字')}</span></div>
        <p class="muted" style="margin:6px 0 0">${t('Verify your Soft Glow (Lv.1) and Lit Bamboo (Lv.2) characters. Solid recall upgrades them to Radiant Gold; misses dim them back for re-study.', '把「基础微亮 Lv.1」或「翠竹点亮 Lv.2」字拿出来抽查检验，淘汰假认识，把真学会的字升到 ✦ 金辉精通。')}</p>
        <button class="cta secondary" onclick="startOngoingTest('litOnly')"><span>🔍 ${t('Spot-Check Lit Characters (10 Qs)', '仅抽查已点亮汉字（10 题）')}</span><span>→</span></button>
      </div>

      ${stats.counts[1] > 0 ? `
        <div class="notice" style="margin-top:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
          <span>${t(`You have ${stats.counts[1]} Soft-Glow (Lv.1) characters. Want to clear Lv.1 and keep only Studio/Gold mastered characters?`, `当前星图还有 ${stats.counts[1]} 个基础微亮 (Lv.1) 汉字。如需清空 Lv.1、仅保留完整学过的 Lv.2/Lv.3 汉字可点击右侧：`)}</span>
          <button class="audio-btn" style="min-height:34px;padding:5px 12px;font-size:12.5px" onclick="resetUnverifiedLitChars()">🧹 ${t('Clear Lv.1 Chars', '清空 Lv.1 微亮字')}</button>
        </div>` : ''}

      <section>
        <div class="sec-head"><div><h2>${t('Recent Checkups', '最近测评记录')}</h2></div></div>
        ${historyHTML}
      </section>
    `;
    return;
  }

  if (testState.mode === 'checklist') {
    getChecklistSamples();
    const chars = testState.displayChars;
    const totalChars = chars.length || 48;
    const btns = chars.map(ch => {
      const sel = testState.checked.has(ch.g);
      return `<button class="chk-btn ${sel ? 'selected' : ''}" onclick="toggleCheckChar('${ch.g}')"><span class="cg">${ch.g}</span><span class="cpy">${ch.py}</span></button>`;
    }).join('');
    const estPreview = Math.round(testState.checked.size / totalChars * CHAR_DB_LIST.length);
    box.innerHTML = `
      <div class="plan-card">
        <div class="label">
          <span>📋 ${t('Placement Test Guide · Step 1 of 2', '摸底定级说明 · 第 1 步 / 共 2 步')}</span>
          <button class="text-btn" style="min-height:auto;padding:2px 6px;font-size:12.5px;color:var(--ink2)" onclick="testState.mode='hub';renderTestCenter()">✕ ${t('Cancel', '取消')}</button>
        </div>
        <h3 style="margin:8px 0 6px;font-family:Fraunces,serif;font-size:20px">${t('How This 2-Step Placement Works', '如何进行摸底定级（简单两步）')}</h3>
        <div style="display:grid;gap:8px;font-size:13.5px;line-height:1.55;color:var(--ink2)">
          <div><b>① ${t('Tap Characters You Know Below:', '在下方点选你认识的汉字：')}</b> ${t('Below are 48 characters sampled randomly across all difficulty levels (none pre-selected). Tap every character whose sound & meaning you already know; leave unfamiliar ones blank.', '下方是从全字库随机抽取的 48 个汉字（默认全未选）。请点击所有你已经认识（知道读音和意思）的字，不认识的留空。')}</div>
          <div><b>② ${t('5-Question Verification:', '完成 5 题真伪校准：')}</b> ${t('When finished, click the green button below the grid to answer 5 quick multiple-choice questions that verify your vocabulary size & starting frontier.', '点选完成后，点击字表底部的绿色按钮回答 5 道快速选择题，系统会校准你的真实识字量与推荐起点。')}</div>
        </div>
      </div>
      <div class="check-tier">
        <div class="check-tier-head">
          <div>
            <b>${t('Random 48-Character Map', '随机 48 字摸底图')}</b>
            <span class="muted" style="font-size:12.5px;margin-left:6px">${t(`${testState.checked.size} / ${totalChars} selected (est. ~${estPreview} chars)`, `已选 ${testState.checked.size} / ${totalChars} 字（初估 ~${estPreview} 字）`)}</span>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            <button class="audio-btn" style="min-height:32px;padding:4px 10px;font-size:12px" onclick="reshuffleChecklist()">🎲 ${t('New Random Set', '换一批随机字')}</button>
            <button class="audio-btn" style="min-height:32px;padding:4px 10px;font-size:12px" onclick="toggleCheckAll(true)">${t('Select All', '全选')}</button>
            <button class="audio-btn" style="min-height:32px;padding:4px 10px;font-size:12px" onclick="toggleCheckAll(false)">${t('Clear', '清空')}</button>
          </div>
        </div>
        <div class="check-grid">${btns}</div>
      </div>
      <div style="margin-top:14px;display:grid;gap:8px">
        <button class="cta" onclick="proceedToCalibration()"><span>${t(`Step 2: Start 5-Question Calibration (${testState.checked.size} selected) →`, `第 2 步：选好了（已选 ${testState.checked.size} 字），开始 5 题校准 →`)}</span><span>→</span></button>
        <button class="cta ghost" style="margin-top:0" onclick="testState.mode='hub';renderTestCenter()"><span>${t('← Back to Checkup Hub', '← 返回测评中心')}</span><span></span></button>
      </div>
    `;
    return;
  }

  if (testState.mode === 'calibrate' || testState.mode === 'ongoing') {
    const q = testState.questions[testState.qIdx];
    const done = testState.picked !== null;
    const isOk = done && testState.picked === q.g;
    const kindLabel = q.kind === 'lit-check'
      ? t('Lit Spot-Check (right = brighter · wrong = dimmer)', '已点亮字抽查（答对升亮 · 答错降级）')
      : q.kind === 'frontier'
      ? t('Frontier Probe (right = Soft Glow Lv.1)', '前沿程度探底（答对微亮 Lv.1）')
      : t('Placement Verification (calibrates level only)', '摸底真伪校准（仅定级，不改星图）');

    const optsHTML = q.opts.map(o => {
      let cls = '';
      if (done) {
        if (o.g === q.g) cls = ' correct';
        else if (o.g === testState.picked) cls = ' wrong';
      }
      return `<button class="quiz-opt${cls}" ${done ? 'disabled' : ''} onclick="answerTestQuestion('${o.g}')"><span class="zh">${o.g}</span><span style="color:var(--ink2);font-size:13px">${done ? o.py + ' · ' + escapeHTML(o.en) : ''}</span></button>`;
    }).join('');

    let fbText = '';
    if (done) {
      const lastRes = testState.results[testState.results.length - 1];
      const deltaNote = testState.mode === 'calibrate'
        ? t('Used to calibrate your starting frontier (Map stays unchanged).', '已记入摸底校准精度（保持星图未批量点亮）。')
        : (lastRes.newLvl > lastRes.oldLvl
          ? t(`Brightness upgraded: ${levelMeta(lastRes.oldLvl).label} → <b>${levelMeta(lastRes.newLvl).label}</b>`, `亮度提升：${levelMeta(lastRes.oldLvl).label} → <b>${levelMeta(lastRes.newLvl).label}</b>`)
          : (lastRes.newLvl < lastRes.oldLvl
            ? t(`⚠️ Missed spot-check: dimmed to <b>${levelMeta(lastRes.newLvl).label}</b>`, `⚠️ 抽查未通过：亮度降为 <b>${levelMeta(lastRes.newLvl).label}</b>`)
            : t(`Kept at <b>${levelMeta(lastRes.newLvl).label}</b>`, `保持 <b>${levelMeta(lastRes.newLvl).label}</b>`)));
      fbText = (isOk
        ? t('<b>✓ Correct!</b> ', '<b>✓ 回答正确！</b> ')
        : t(`<b>✗ Not quite — the answer is “${q.g}” (${q.py}).</b> `, `<b>✗ 答错了，正确答案是「${q.g}」(${q.py})。</b> `)) + deltaNote;
    }

    const subText = q.style === 'cloze' ? q.sub : (t('Pinyin: ', '读音：') + q.py);
    box.innerHTML = `
      <div class="plan-card">
        <div class="label">${t(`Question ${testState.qIdx + 1} / ${testState.questions.length}`, `第 ${testState.qIdx + 1} / ${testState.questions.length} 题`)} <span>${kindLabel}</span></div>
        <div style="margin-top:12px">
          ${q.style === 'cloze'
            ? `<div class="zh" style="font-size:24px;font-weight:800">${escapeHTML(q.prompt)}</div><p class="muted" style="margin:4px 0 0">${escapeHTML(subText)}</p>`
            : `<div style="font-size:22px;font-weight:800;font-family:Fraunces,serif">${escapeHTML(q.prompt)}</div><p class="muted" style="margin:4px 0 0">${escapeHTML(subText)} <button class="audio-btn" style="min-height:30px;padding:3px 10px;font-size:12px;margin-left:6px" onclick="speak('${q.g}')">▶ ${t('Play', '听音')}</button></p>`}
        </div>
        <div style="margin-top:12px">${optsHTML}</div>
        <div class="feedback ${done ? 'show ' + (isOk ? 'good' : 'bad') : ''}">${fbText}</div>
        ${done ? `<button class="cta" onclick="nextTestQuestion()"><span>${testState.qIdx >= testState.questions.length - 1 ? t('See Results ✓', '查看本次测评结果 ✓') : t('Next Question →', '下一题 →')}</span><span></span></button>` : ''}
      </div>
    `;
    return;
  }

  if (testState.mode === 'report') {
    const okCount = testState.results.filter(r => r.ok).length;
    const upgraded = testState.results.filter(r => r.newLvl > r.oldLvl);
    const downgraded = testState.results.filter(r => r.newLvl < r.oldLvl);
    const title = testState.testKind === 'calibrate'
      ? t('Initial Calibration Complete', '初始识字量测评完成')
      : t('Checkup Complete', '途中测评结算');

    const listRows = testState.results.map(r => {
      const mOld = levelMeta(r.oldLvl);
      const mNew = levelMeta(r.newLvl);
      const statusTxt = testState.testKind === 'calibrate'
        ? (r.ok ? t('✓ Verified for Placement', '✓ 校准答对（已计入水平）') : t('✗ Missed in Placement', '✗ 校准未对（已下调边界）'))
        : (r.newLvl > r.oldLvl
          ? t('✨ Brightened', '✨ 升级点亮')
          : (r.newLvl < r.oldLvl ? t('⚠️ Dimmed / Reset', '⚠️ 答错降级') : (r.ok ? t('✓ Confirmed', '✓ 稳固保持') : t('○ Unlit', '○ 未点亮'))));
      const lvlSub = testState.testKind === 'calibrate'
        ? t(`Map unchanged (${mNew.short} ${mNew.label})`, `星图保持不变（${mNew.short} ${mNew.label}）`)
        : `${mOld.short} ${mOld.label} → ${mNew.short} ${mNew.label}`;
      return `
        <div class="delta-row">
          <div style="display:flex;align-items:center;gap:10px">
            <span class="dg">${r.g}</span>
            <div>
              <b>${statusTxt}</b>
              <small class="muted" style="display:block;font-size:12px">${lvlSub}</small>
            </div>
          </div>
          <button class="audio-btn" style="min-height:34px;padding:5px 12px;font-size:12.5px" onclick="openCharStudio('${r.g}')">${r.ok ? t('Study / Inspect', '去学 / 查看') : t('Learn →', '去学习 →')}</button>
        </div>`;
    }).join('');

    box.innerHTML = `
      <div class="plan-card">
        <div class="label">${title} <span>${t('Score', '正确率')} ${okCount} / ${testState.results.length}</span></div>
        <h2 class="serif" style="margin:8px 0 4px">${testState.testKind === 'calibrate'
          ? t(`Est. Vocabulary ~${stats.estChars} Chars · ${stats.lit} Lit on Map`, `估算识字水平约 ${stats.estChars} 字 · 星图实点亮 ${stats.lit} 字`)
          : t(`${stats.lit} Characters Lit (~ ${stats.knownWords} words)`, `当前星图已点亮 ${stats.lit} 字（覆盖约 ${stats.knownWords} 词）`)}</h2>
        <p class="muted" style="margin:0">
          ${testState.testKind === 'calibrate'
            ? t(`Level calibrated! Random characters and recommended words will now start near Frontier #${(p.frontierIndex||0)+1} (skipping overly basic beginner words). No untested characters were lit on your Character Map — characters light up only when you study or test them.`,
                `摸底定级完成！后续随机推字与词库推荐将直接从你的前沿 #${(p.frontierIndex||0)+1} 匹配（跳过太简单的初级词）。本次摸底不会批量点亮星图上的字，保持零误亮 — 每个字只在真正学过、测过之后才点亮。`)
            : t(`${upgraded.length} character(s) brightened and ${downgraded.length} dimmed/unlit in this session.`,
                `本轮共有 ${upgraded.length} 个字亮度升级，${downgraded.length} 个字因答错降级或熄灭。`)}
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px">
          <button class="cta" style="margin-top:0" onclick="showView('map')"><span>🗺️ ${t('View Character Map', '查看我的汉字星图')}</span><span>→</span></button>
          <button class="cta secondary" style="margin-top:0" onclick="learnRandomChar()"><span>🎲 ${t('Random Char at My Level', '按当前程度随机学一字')}</span><span>→</span></button>
        </div>
        <button class="cta ghost" onclick="testState.mode='hub';renderTestCenter()"><span>${t('Back to Checkup Hub', '返回测评中心')}</span><span></span></button>
      </div>
      <section>
        <div class="sec-head"><div><h2>${t('Brightness Changes', '本轮逐字亮度变化')}</h2></div></div>
        ${listRows}
      </section>
    `;
  }
}

// ---------- 9. Explore: Words, Look-alikes & Polyphones ----------
const TOPICS = ['All','Greetings','People','Family','Numbers','Animals','Colors','Body','School','Food & Drink','Places','Actions','Feelings','Time','Nature','Home','Daily Life'];
let topic = 'All';
const EXPLORE_PAGE = 20;
let exploreShown = EXPLORE_PAGE;
let explorePrevQuery = '';
let exploreRecSeed = 0;

function refreshExploreRecs() {
  exploreRecSeed++;
  renderExplore();
}

function setTopic(tName) {
  topic = tName;
  exploreShown = EXPLORE_PAGE;
  renderTopics();
  renderExplore();
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function onExploreSearch(input) {
  explorePrevQuery = (input.value || '').trim();
  exploreShown = EXPLORE_PAGE;
  renderExplore();
}
function backToTopics() {
  topic = 'All';
  exploreShown = EXPLORE_PAGE;
  explorePrevQuery = '';
  const si = $('#searchInput');
  if (si) si.value = '';
  renderTopics();
  renderExplore();
}
function renderTopics() {
  $('#topicFilters').innerHTML = TOPICS.map(tName =>
    `<button class="${tName===topic?'active':''}" onclick="setTopic('${tName}')">${tName}</button>`
  ).join('');
}
function renderExplore() {
  const q = ($('#searchInput').value || '').trim().toLowerCase();
  const home = $('#exploreHome'), grid = $('#exploreGrid'), count = $('#exploreCount'), more = $('#exploreMore'), empty = $('#exploreEmpty');
  const tb = $('#topicBackBtn');
  if (tb) tb.style.display = (topic !== 'All' || q) ? 'inline-flex' : 'none';

  const p = currentProfile();
  if (!q && topic === 'All') {
    grid.innerHTML = '';
    count.style.display = 'none';
    more.style.display = 'none';
    empty.style.display = 'none';
    home.style.display = 'block';

    const frontier = Math.max(0, Math.min(CHAR_DB_LIST.length - 1, p.frontierIndex || 0));
    const recLo = Math.max(0, frontier - 60);
    const recHi = Math.min(CHAR_DB_LIST.length - 1, frontier + 260);
    let recPool = WORDS.filter(w => {
      const idx = w._lvlIdx || 0;
      return idx >= recLo && idx <= recHi && (w.chars || []).some(c => getCharLevel(c.g) === 0);
    });
    if (recPool.length < 8) {
      recPool = WORDS.filter(w => (w._lvlIdx || 0) >= recLo && (w._lvlIdx || 0) <= recHi);
    }
    if (!recPool.length) recPool = rankWordsForLearner(WORDS);
    const rotated = recPool.length > 8
      ? shuffleArr(recPool).slice(0, 8)
      : recPool.slice(0, 8);
    const recCardsHTML = rotated.map(w => {
      const saved = (p.savedWords || []).includes(w.id);
      return `<button class="list-row" onclick="openWord('${w.id}')"><span class="lg">${w.zh}</span><span style="flex:1;min-width:0"><b>${w.py}</b> — ${escapeHTML(w.en)}<small>${w.topic} · ${t('Level-matched word', '匹配当前程度')}</small></span><span class="heart ${saved?'saved':''}" onclick="event.stopPropagation();toggleSaveWord('${w.id}')">${saved?'♥':'♡'}</span></button>`;
    }).join('');

    home.innerHTML = `
      <div class="plan-card" style="margin-top:14px">
        <div class="label">
          <span>🎯 ${t('Recommended Words for Your Level', '按当前水平推荐词汇')}</span>
          <span>${t('Frontier #', '难度前沿 #')}${frontier + 1}</span>
        </div>
        <p class="muted" style="margin:6px 0 10px">${t('Matched to your calibrated level so you skip overly basic words.', '根据你的摸底定级与学习前沿匹配，避开过于简单的初级词。')}</p>
        <div class="grid" style="margin-top:0">${recCardsHTML}</div>
        <button class="audio-btn" style="margin-top:10px" onclick="refreshExploreRecs()">🎲 ${t('Refresh Picks', '换一批推荐词')}</button>
      </div>
      <h2 class="serif" style="font-size:21px;margin:20px 0 0">${t('Browse by Topic (16 Topics · 7,618 Words)', '按 16 个主题浏览词库（7,618 词）')}</h2>
      <div class="grid" style="margin-top:10px">` + TOPICS.slice(1).map(tName => {
        const ws = WORDS.filter(w => w.topic === tName);
        const done = ws.filter(w => (w.chars || []).every(c => getCharLevel(c.g) >= 1)).length;
        return `<button class="topic-card" onclick="setTopic('${tName}')"><div class="tc-name">${tName}</div><div class="tc-count">${ws.length} ${t('words', '词')}</div><div class="tc-preview">${ws.slice(0,6).map(w=>w.zh).join(' ')}</div><div class="tc-bar"><i style="width:${Math.round(done/ws.length*100)}%"></i></div><div class="tc-prog">${done ? done + t(' words lit', ' 词汉字已点亮') : t('Not lit yet', '尚未点亮')}</div></button>`;
      }).join('') + '</div>';
    return;
  }

  home.style.display = 'none';
  let list = WORDS.filter(w => q ? (w.zh.includes(q) || w.py.toLowerCase().includes(q) || stripTone(w.py).includes(q) || w.en.toLowerCase().includes(q)) : w.topic === topic);
  if (!q && topic !== 'All') list = rankWordsForLearner(list);
  const shown = list.slice(0, exploreShown);
  grid.innerHTML = shown.map(w => {
    const saved = (p.savedWords || []).includes(w.id);
    const allLit = (w.chars || []).every(c => getCharLevel(c.g) >= 1);
    return `<button class="list-row" onclick="openWord('${w.id}')"><span class="lg">${w.zh}</span><span style="flex:1;min-width:0"><b>${w.py}</b> — ${escapeHTML(w.en)}<small>${w.topic} · ${allLit ? t('All chars lit', '字已点亮') : t('Has unlit chars', '含未点亮字')}</small></span><span class="heart ${saved?'saved':''}" onclick="event.stopPropagation();toggleSaveWord('${w.id}')">${saved?'♥':'♡'}</span></button>`;
  }).join('');
  empty.style.display = list.length ? 'none' : 'block';
  count.style.display = list.length ? 'flex' : 'none';
  count.innerHTML = `<span><b>${list.length}</b> ${t('matching words', '个匹配词条')}</span><span>${t('Showing ' + shown.length, '显示 ' + shown.length + ' 个')}</span>`;
  const left = list.length - shown.length;
  more.style.display = left > 0 ? 'block' : 'none';
  if (left > 0) more.textContent = t(`Show more (${left} remaining)`, `加载更多（还剩 ${left} 个）`);
}

function toggleSaveWord(id) {
  const p = currentProfile();
  if (!Array.isArray(p.savedWords)) p.savedWords = [];
  if (p.savedWords.includes(id)) {
    p.savedWords = p.savedWords.filter(x => x !== id);
    toast(t('Removed from Saved Words', '已移出收藏词条'));
  } else {
    p.savedWords.unshift(id);
    toast(t('Saved to My Words ♥', '已收藏词条 ♥'));
  }
  persistCurrent();
  if (currentView === 'explore') renderExplore();
  if (currentView === 'word-detail') openWord(id, true);
  if (currentView === 'saved') renderSaved();
}

function openWord(id, replace = false, anchorId = null, contextChar = null) {
  const w = wordById(id);
  if (!w) return;
  currentWordId = id;
  if (!replace && currentView !== 'word-detail') {
    navGo('word-detail', { anchorId, contextChar });
  }
  const p = currentProfile();
  const isSaved = (p.savedWords || []).includes(w.id);
  const charButtons = (w.chars || []).map(c => {
    const m = levelMeta(getCharLevel(c.g));
    return `<div class="kv"><b><button class="text-btn" style="padding:0;font-size:22px" onclick="openCharStudio('${c.g}')"><span class="zh">${c.g}</span></button> ${c.py} <span class="pill ${m.cls}" style="font-size:11px;padding:2px 7px">${m.short}</span></b><span>${escapeHTML(c.en)} <button class="text-btn" style="font-size:12.5px" onclick="openCharStudio('${c.g}')">${t('Study Char →', '学此字 →')}</button></span></div>`;
  }).join('');

  const familyButtons = (w.family || []).map(f => {
    const fw = WORD_BY_ZH.get(f);
    const action = fw ? `openWord('${fw.id}')` : (f.length === 1 && CHAR_DB_MAP.has(f) ? `openCharStudio('${f}')` : `toast('${t('Related phrase: ', '扩展词组：')}${f}')`);
    return `<button class="audio-btn" onclick="${action}"><b class="zh">${f}</b></button>`;
  }).join('');

  $('#detailBody').innerHTML = `
    <div class="studio-card" style="padding:22px 20px">
      <div style="text-align:center">
        <div class="label" style="justify-content:center"><span>${w.topic}</span></div>
        <div class="zh" style="font-size:64px;font-weight:900;line-height:1.1;margin-top:8px">${w.zh}</div>
        <div class="pinyin-big">${w.py}</div>
        <div class="gloss">${escapeHTML(w.en)}</div>
        <div class="audio-row">
          <button class="audio-btn primary" onclick="speak('${w.zh}')">▶ ${t('Listen', '听发音')}</button>
          <button class="audio-btn" onclick="speak('${w.zh}','slow')">🐢 ${t('Slow', '慢速')}</button>
          <button class="audio-btn" onclick="toggleSaveWord('${w.id}')">${isSaved ? t('♥ Saved', '♥ 已收藏') : t('♡ Save Word', '♡ 收藏词')}</button>
        </div>
      </div>
      <div class="sent-card" style="margin-top:18px">
        <div class="sent-zh">${escapeHTML(w.sent.zh)}</div>
        <div class="sent-py">${escapeHTML(w.sent.py)}</div>
        <div class="sent-en">${escapeHTML(w.sent.en)}</div>
        <button class="audio-btn" style="margin-top:10px" onclick="speak('${w.sent.zh.replace(/'/g,'')}')">▶ ${t('Hear Sentence', '听例句')}</button>
      </div>
      <h3>${t('Characters in This Word (tap to study & light up)', '组成汉字（点击单字进入学习舱点亮）')}</h3>
      ${charButtons}
      <div class="kv"><b>${t('Strokes & Parts', '笔画与部件')}</b><span>${escapeHTML(w.strokes)} · ${escapeHTML(w.radical)}</span></div>
      <h3>${t('Word Family', '相关词族')}</h3>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">${familyButtons}</div>
    </div>`;
  window.scrollTo({ top: 0 });
}

// ---------- 9S. Special Practices Hub & Look-alikes (Random Quiz + Light-Up) ----------
function renderSpecialsHub() {
  const box = $('#specialsBody');
  if (!box) return;
  const laPassed = LOOKALIKES.filter((_, i) => isLaMastered(i)).length;
  const polyPassed = POLY.filter(p => isPolyMastered(p.char)).length;
  const semyPassed = POLYSEMY.filter(s => isPolyMastered(s.char)).length;
  const totalItems = LOOKALIKES.length + POLY.length + POLYSEMY.length;
  const totalPassed = laPassed + polyPassed + semyPassed;
  const totalPct = totalItems ? (totalPassed / totalItems * 100).toFixed(1) : 0;

  const mods = [
    {
      view: 'lookalikes',
      mini: '未<i>/</i>末',
      title: t('Look-alikes · 28 Confusable Pairs', '形近字 · 28 对易混辨析'),
      desc: t('Blind no-pinyin trainer for stroke twins, shared components & same-sound traps.', '无拼音随机盲测：辨析一笔之差、同部件字与同音混淆字，答对即点亮。'),
      done: laPassed,
      total: LOOKALIKES.length,
      unit: t('pairs lit', '对已点亮')
    },
    {
      view: 'polyphones',
      mini: '行<i>/</i>乐',
      title: t('Polyphones · 89 Chars, 182 Readings', '多音字 · 89 字 182 个读音'),
      desc: t('One character, shifting pronunciations & meanings in real word context.', '一字多音语境辨析与随机测验，答对同步点亮星图。'),
      done: polyPassed,
      total: POLY.length,
      unit: t('chars lit', '字已点亮')
    },
    {
      view: 'polysemy',
      mini: '面<i>·</i>开',
      title: t('Multiple Meanings · 12 Chars, 34 Senses', '多义字 · 12 字 34 种义项'),
      desc: t('Same sound, different senses across everyday compound words.', '同音不同义高频字精讲与语境词义快测，答对同步点亮。'),
      done: semyPassed,
      total: POLYSEMY.length,
      unit: t('chars lit', '字已点亮')
    }
  ];

  box.innerHTML = `
    <div class="poly-dash">
      <div class="label">
        <span>${t('Overall Special Practices Progress', '专项辨析总点亮进度')}</span>
        <span>${totalPassed} / ${totalItems} ${t('items lit', '项已闯关点亮')} (${totalPct}%)</span>
      </div>
      <div class="bright-bar" style="margin:10px 0 4px">
        <div class="seg2" style="width:${totalPct}%"></div>
      </div>
    </div>
    ${mods.map(m => `
      <button class="la-entry" style="margin-top:12px" onclick="navGo('${m.view}')">
        <span class="la-pair-mini">${m.mini}</span>
        <span style="flex:1;min-width:0">
          <b>${m.title}</b>
          <p style="margin:3px 0 8px">${m.desc}</p>
          <div class="bright-bar" style="margin:0 0 4px;height:7px"><div class="seg2" style="width:${m.total ? (m.done/m.total*100).toFixed(1) : 0}%"></div></div>
          <small style="color:var(--bamboo);font-weight:700">✓ ${m.done} / ${m.total} ${m.unit}</small>
        </span>
        <span class="la-go">→</span>
      </button>`).join('')}
  `;
}

const laFilter = { cat: 'all', status: 'all', query: '', quizMode: 'all' };
let laQuiz = { gi: -1, side: 0, answered: false, pick: -1, score: 0, total: 0 };

function laCats() {
  return [
    { key: 'shape', name: t('One Tiny Stroke', '差一笔'), sub: t('Shape twins where one stroke or length changes the character.', '形体极其相似，差一笔或长短不同。') },
    { key: 'part', name: t('Shared Component', '同部件'), sub: t('Share a sound or radical block — the other half sets the meaning.', '共享声旁或形旁，靠另一半区分含义。') },
    { key: 'sound', name: t('Same Sound', '同音字'), sub: t('Pronounced identically — only the written shape tells them apart.', '读音相同或相近，只能靠字形区分。') }
  ];
}
function openCharFromLa(g, pairIdx) {
  openCharStudio(g, false, 'laCard-' + pairIdx, LOOKALIKES[pairIdx].a.g + '/' + LOOKALIKES[pairIdx].b.g);
}
function openWordFromLa(wordId, pairIdx) {
  openWord(wordId, false, 'laCard-' + pairIdx, LOOKALIKES[pairIdx].a.g + '/' + LOOKALIKES[pairIdx].b.g);
}
function setLaCat(cat) { laFilter.cat = cat; renderLookalikes(); }
function setLaStatus(st) {
  laFilter.status = (laFilter.status === st && st !== 'all') ? 'all' : st;
  renderLookalikes();
}
function onLaSearch(val) {
  laFilter.query = (val || '').trim().toLowerCase();
  renderLaLists();
}
function setLaQuizMode(mode) {
  laFilter.quizMode = mode;
  laNewQuestion(-1);
  renderLaToolbar();
}
function jumpToLaCard(i) {
  return jumpToSpecialCard('laCard-', i, () => {
    laFilter.cat = 'all';
    laFilter.status = 'all';
    laFilter.query = '';
    const lsi = $('#laSearchInput');
    if (lsi) lsi.value = '';
    renderLookalikes();
  });
}

function laHasLitChar(pair) {
  return getCharLevel(pair.a.g) >= 1 || getCharLevel(pair.b.g) >= 1;
}

function matchesLaPair(pair, i) {
  if (laFilter.cat !== 'all' && pair.cat !== laFilter.cat) return false;
  const passed = isLaMastered(i);
  const lit = laHasLitChar(pair);
  if (laFilter.status === 'passed' && !passed) return false;
  if (laFilter.status === 'unlit' && passed) return false;
  if (laFilter.status === 'maplit' && !lit) return false;
  const q = laFilter.query;
  if (!q) return true;
  const qp = stripTone(q);
  return [pair.a, pair.b].some(s =>
    s.g.includes(q) || s.py.toLowerCase().includes(q) || stripTone(s.py).includes(qp) ||
    (s.en || '').toLowerCase().includes(q) || (s.word || '').includes(q) || (s.wordEn || '').toLowerCase().includes(q)
  );
}

function renderLaDash() {
  const dash = $('#laDash');
  if (!dash) return;
  const total = LOOKALIKES.length;
  let passed = 0, mapLit = 0;
  LOOKALIKES.forEach((p, i) => {
    if (isLaMastered(i)) passed++;
    if (laHasLitChar(p)) mapLit++;
  });
  const unlit = total - passed;
  const pctPassed = (passed / total * 100).toFixed(1);
  dash.innerHTML = `
    <div class="poly-dash">
      <div class="label">
        <span>${t('Look-Alikes Light-Up Progress (28 Pairs)', '形近字点亮进度（28 对）')}</span>
        <span>✓ ${passed} / ${total} ${t('pairs quiz-lit', '对已闯关点亮')} · ${mapLit} ${t('have lit chars on Map', '对含星图已亮字')}</span>
      </div>
      <div class="bright-bar" style="margin:10px 0 8px"><div class="seg2" style="width:${pctPassed}%"></div></div>
      <div class="poly-dash-stats">
        <button class="bstat ${laFilter.status==='passed'?'active':''}" onclick="setLaStatus('passed')">
          <b><i class="dot l2"></i>${passed} / ${total}</b>
          <span>✓ ${t('Lit & Passed Here', '本页已闯关点亮')}</span>
        </button>
        <button class="bstat ${laFilter.status==='maplit'?'active':''}" onclick="setLaStatus('maplit')">
          <b><i class="dot l1"></i>${mapLit} / ${total}</b>
          <span>● ${t('Lit on Char Map', '含星图已学字')}</span>
        </button>
        <button class="bstat ${laFilter.status==='unlit'?'active':''}" onclick="setLaStatus('unlit')">
          <b><i class="dot l0"></i>${unlit}</b>
          <span>○ ${t('Unlit (To Practice)', '待闯关点亮')}</span>
        </button>
      </div>
    </div>`;
}

function renderLaToolbar() {
  const catEl = $('#laCatTabs');
  const stEl = $('#laStatusTabs');
  const mEl = $('#laQuizModes');
  if (catEl) {
    const cats = [
      { id: 'all', label: t(`All (${LOOKALIKES.length})`, `全部 (${LOOKALIKES.length})`) },
      { id: 'shape', label: '✏️ ' + t('One Tiny Stroke', '差一笔') },
      { id: 'part', label: '🧩 ' + t('Shared Component', '同部件') },
      { id: 'sound', label: '🔊 ' + t('Same Sound', '同音字') }
    ];
    catEl.innerHTML = cats.map(c => `<button class="${laFilter.cat===c.id?'active':''}" onclick="setLaCat('${c.id}')">${c.label}</button>`).join('');
  }
  if (stEl) {
    const sts = [
      { id: 'all', label: t('All Status', '全部状态') },
      { id: 'passed', label: t('✓ Quiz-Lit', '✓ 已点亮') },
      { id: 'unlit', label: t('○ Unlit', '○ 待点亮') },
      { id: 'maplit', label: t('● Has Map Lit Char', '● 含星图已学字') }
    ];
    stEl.innerHTML = sts.map(s => `<button class="${laFilter.status===s.id?'active':''}" onclick="setLaStatus('${s.id}')">${s.label}</button>`).join('');
  }
  if (mEl) {
    const qModes = [
      { id: 'all', label: t(`Quiz: All ${LOOKALIKES.length}`, `范围：全部 ${LOOKALIKES.length} 对`) },
      { id: 'lit', label: t('● Pairs I Know on Map', '● 含我已点亮字') },
      { id: 'unverified', label: t('○ Unlit Pairs Only', '○ 优先练未点亮对') }
    ];
    mEl.innerHTML = qModes.map(m => `<button class="${laFilter.quizMode===m.id?'active':''}" onclick="setLaQuizMode('${m.id}')">${m.label}</button>`).join('');
  }
}

function laSideHTML(s, pairIdx) {
  const lvl = getCharLevel(s.g);
  const m = levelMeta(lvl);
  return `<div class="la-side">
    <div style="display:flex;justify-content:center;align-items:center;gap:6px;margin-bottom:4px">
      <button class="cnode ${m.cls}" style="min-width:64px;min-height:64px;padding:6px 10px" onclick="openCharFromLa('${s.g}',${pairIdx})">
        ${lvl > 0 ? `<span class="cbadge">${m.short}</span>` : ''}
        <span class="cg" style="font-size:32px">${s.g}</span>
      </button>
    </div>
    <div class="la-py">${s.py} <button class="poly-mini-btn" style="padding:2px 7px;min-height:24px" onclick="speak('${s.g}')">▶</button></div>
    <div class="la-en">${escapeHTML(s.en)}</div>
    <div style="font-size:12px;color:var(--ink2);margin-top:6px">${t('in', '例词')} <button class="text-btn" style="padding:0;min-height:auto;font-size:13px" onclick="openWordFromLa('${s.wordId}',${pairIdx})">${s.word}</button></div>
  </div>`;
}

function laCardHTML(i) {
  const p = LOOKALIKES[i];
  const passed = isLaMastered(i);
  const catObj = laCats().find(c => c.key === p.cat);
  const statusPill = passed
    ? `<span class="pill green">✓ ${t('Lit & Passed', '已闯关点亮')}</span>`
    : `<span class="pill">○ ${t('Unlit', '待点亮')}</span>`;
  return `<div class="poly-card" id="laCard-${i}" style="margin-top:12px">
    <div class="poly-card-head">
      <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">
        ${catObj ? `<span class="pill">${catObj.name}</span>` : ''}
        ${statusPill}
      </div>
      <div class="poly-card-actions">
        <button class="audio-btn" onclick="laNewQuestion(${i});jumpToQuizCard('laQuizCard')">🎧 ${t('Quiz This Pair', '测这一对')}</button>
      </div>
    </div>
    <div class="la-pair">${laSideHTML(p.a, i)}<div class="la-vs">vs</div>${laSideHTML(p.b, i)}</div>
    <div class="la-diff">🔍 ${p.diff}</div>
  </div>`;
}

function renderLaLists() {
  const items = LOOKALIKES.map((p, i) => ({ p, i })).filter(({ p, i }) => matchesLaPair(p, i));
  const idxEl = $('#laIndex');
  if (idxEl) {
    const chips = items.map(({ p, i }) => {
      const passed = isLaMastered(i);
      const cls = passed ? 'lvl2' : (laHasLitChar(p) ? 'lvl1' : 'lvl0');
      return `<button class="idx-chip ${cls}" onclick="jumpToLaCard(${i})"><span>${p.a.g}/${p.b.g}</span><span class="ic-v">${passed ? '✓' : (laHasLitChar(p) ? '◐' : '')}</span></button>`;
    }).join('');
    idxEl.innerHTML = `
      <div class="la-card" style="margin-top:0">
        <div class="label">
          <span>${t('Quick Pair Index', '快速索引')} (${items.length})</span>
          <span>${t('Green = Quiz-lit · Mint = Lit on Map', '绿底=已盲测点亮 · 浅绿=含星图已学字')}</span>
        </div>
        ${chips ? `<div class="idx-row">${chips}</div>` : `<p class="muted" style="margin:8px 0 0">${t('No pairs match the current filter.', '当前筛选下没有匹配的形近字。')}</p>`}
      </div>`;
  }

  $('#lookalikes').innerHTML = items.length
    ? items.map(({ i }) => laCardHTML(i)).join('')
    : `<div class="empty">${t('No look-alike pairs match your filter — try clearing the search or status filter.', '当前筛选下没有匹配的形近字，试试切换过滤条件。')}</div>`;
}

function laNewQuestion(gi) {
  let g = (typeof gi === 'number' && gi >= 0) ? gi : -1;
  if (g < 0) {
    let pool = LOOKALIKES.map((_, idx) => idx);
    if (laFilter.quizMode === 'lit') {
      const litPool = pool.filter(idx => laHasLitChar(LOOKALIKES[idx]));
      if (litPool.length) pool = litPool;
    } else if (laFilter.quizMode === 'unverified') {
      const unvPool = pool.filter(idx => !isLaMastered(idx));
      if (unvPool.length) pool = unvPool;
    }
    g = pool[Math.floor(Math.random() * pool.length)];
  }
  const side = Math.random() < 0.5 ? 0 : 1;
  laQuiz = { gi: g, side, answered: false, pick: -1, score: laQuiz.score, total: laQuiz.total };
  renderLaQuiz();
}

function renderLaQuiz() {
  const box = $('#laQuizBox');
  if (!box || laQuiz.gi < 0) return;
  const p = LOOKALIKES[laQuiz.gi];
  const tChar = laQuiz.side ? p.b : p.a;
  const passed = isLaMastered(laQuiz.gi);
  $('#laQuizScore').textContent = laQuiz.total
    ? t(`Score: ${laQuiz.score} / ${laQuiz.total}`, `正确 ${laQuiz.score} / ${laQuiz.total}`)
    : t('No-pinyin blind quiz', '无拼音随机盲测');

  const opts = [p.a, p.b].map((s, k) => {
    let cls = '';
    if (laQuiz.answered) {
      if (k === laQuiz.side) cls = ' correct';
      else if (k === laQuiz.pick) cls = ' wrong';
    }
    return `<button class="la-opt${cls}" ${laQuiz.answered ? 'disabled' : ''} onclick="laAnswer(${k})"><span class="la-glyph zh">${s.g}</span>${laQuiz.answered ? `<span class="la-py">${s.py} · ${escapeHTML(s.en)}</span>` : ''}</button>`;
  }).join('');

  const maskedWord = tChar.word && tChar.word.length > 1
    ? escapeHTML(tChar.word).split(escapeHTML(tChar.g)).join(' [ ? ] ')
    : '';
  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
      <p style="margin:0;font-weight:700">${t(`Which character means “${escapeHTML(tChar.en)}”?`, `哪一个汉字的意思是 “${escapeHTML(tChar.en)}”？`)}</p>
      ${passed ? `<span class="pill green" style="font-size:11.5px;padding:3px 9px">✓ ${t('Pair Lit', '此对已点亮')}</span>` : ''}
    </div>
    ${maskedWord ? `<p class="muted" style="margin:0 0 8px;font-size:13.5px">${t('Context word:', '语境词提示：')} <b class="zh">${maskedWord}</b> (${escapeHTML(tChar.wordEn || tChar.en)})</p>` : ''}
    <div class="la-opts">${opts}</div>
    <div class="la-fb ${laQuiz.answered ? 'show ' + (laQuiz.pick === laQuiz.side ? 'good' : 'bad') : ''}">
      ${laQuiz.answered ? (laQuiz.pick === laQuiz.side
        ? t(`✓ Correct! <b>${tChar.g}</b> (${tChar.py}) — pair lit up! ${p.diff}`, `✓ 答对了！<b>${tChar.g}</b> (${tChar.py}) — 本组已点亮！${p.diff}`)
        : t(`✗ Answer is <b>${tChar.g}</b> (${tChar.py}). ${p.diff}`, `✗ 正确答案是 <b>${tChar.g}</b> (${tChar.py})。${p.diff}`)) : ''}
    </div>
    ${laQuiz.answered ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="audio-btn" onclick="openCharFromLa('${tChar.g}',${laQuiz.gi})">📖 ${t('Study ', '学「')}${tChar.g}${t('', '」')}</button></div>` : ''}
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:10px">
      <button class="la-again" style="margin-top:0" onclick="laNewQuestion(-1)">↻ ${t('Next Pair', '随机下一对')}</button>
      <button class="la-again" style="margin-top:0;width:auto;padding:0 14px" onclick="jumpToLaCard(${laQuiz.gi})">${t('Find Card ↓', '定位卡片 ↓')}</button>
    </div>`;
}

function laAnswer(k) {
  if (laQuiz.answered || laQuiz.gi < 0) return;
  laQuiz.answered = true;
  laQuiz.pick = k;
  laQuiz.total++;
  const p = LOOKALIKES[laQuiz.gi];
  const tChar = laQuiz.side ? p.b : p.a;
  if (k === laQuiz.side) {
    laQuiz.score++;
    markLaMastered(laQuiz.gi);
    if (getCharLevel(tChar.g) === 0) setCharLevel(tChar.g, 1);
    recordDailyActivity();
    persistCurrent();
    renderLaDash();
    renderLaLists();
  }
  renderLaQuiz();
}

function renderLookalikes() {
  renderLaDash();
  renderLaToolbar();
  renderLaLists();
  if (laQuiz.gi < 0) laNewQuestion(-1); else renderLaQuiz();
}

const polyState = { status: 'all', query: '', quizMode: 'all' };
const semyState = { status: 'all', query: '', quizMode: 'all' };

let polyQuiz = { gi: -1, ri: -1, word: null, order: [], answered: false, pick: -1, score: 0, total: 0 };
let semyQuiz = { gi: -1, si: -1, word: null, order: [], answered: false, pick: -1, score: 0, total: 0 };

function getPolyCharMeta(g) {
  const lvl = getCharLevel(g);
  const meta = levelMeta(lvl);
  const chObj = CHAR_DB_MAP.get(g);
  const tier = chObj ? TIERS.find(tObj => tObj.id === chObj.tier) : null;
  const verified = isPolyMastered(g);
  return { lvl, meta, chObj, tier, verified };
}

function openCharFromPoly(g, cardChar) {
  const anchorChar = cardChar || g;
  openCharStudio(g, false, 'polyCard-' + anchorChar, anchorChar);
}
function openWordFromPoly(wordId, cardChar) {
  openWord(wordId, false, 'polyCard-' + cardChar, cardChar);
}
function openCharFromSemy(g, cardChar) {
  const anchorChar = cardChar || g;
  openCharStudio(g, false, 'semyCard-' + anchorChar, anchorChar);
}
function openWordFromSemy(wordId, cardChar) {
  openWord(wordId, false, 'semyCard-' + cardChar, cardChar);
}

function setPolyStatus(st) {
  polyState.status = (polyState.status === st && st !== 'all') ? 'all' : st;
  renderPolyphones();
}
function onPolySearch(val) {
  polyState.query = (val || '').trim().toLowerCase();
  renderPolyLists();
}
function setPolyQuizMode(mode) {
  polyState.quizMode = mode;
  polyNewQuestion(-1);
  renderPolyToolbar();
}

function setSemyStatus(st) {
  semyState.status = (semyState.status === st && st !== 'all') ? 'all' : st;
  renderPolysemyView();
}
function onSemySearch(val) {
  semyState.query = (val || '').trim().toLowerCase();
  renderSemyLists();
}
function setSemyQuizMode(mode) {
  semyState.quizMode = mode;
  semyNewQuestion(-1);
  renderSemyToolbar();
}

async function jumpToSpecialCard(prefix, charG, resetFn) {
  let el = document.getElementById(prefix + charG);
  if (!el) {
    resetFn();
    el = document.getElementById(prefix + charG);
  }
  if (!el) return;
  await scrollIntoViewAsync(el, { behavior: 'smooth', block: 'center' });
  el.classList.add('return-highlight');
  setTimeout(() => el.classList.remove('return-highlight'), 1800);
}
function jumpToPolyCard(charG) {
  return jumpToSpecialCard('polyCard-', charG, () => {
    polyState.status = 'all';
    polyState.query = '';
    const psi = $('#polySearchInput');
    if (psi) psi.value = '';
    renderPolyphones();
  });
}
function jumpToSemyCard(charG) {
  return jumpToSpecialCard('semyCard-', charG, () => {
    semyState.status = 'all';
    semyState.query = '';
    const ssi = $('#semySearchInput');
    if (ssi) ssi.value = '';
    renderPolysemyView();
  });
}

function highlightPolyCharInWord(wordZh, targetChar) {
  return escapeHTML(wordZh).split(escapeHTML(targetChar)).join('<mark>' + escapeHTML(targetChar) + '</mark>');
}

function matchesSpecialEntry(entry, isSemy, state) {
  const q = state.query;
  const qPlain = stripTone(q);
  const g = entry.char;
  const lvl = getCharLevel(g);
  const verified = isPolyMastered(g);
  const p = currentProfile();
  const chObj = CHAR_DB_MAP.get(g);
  const frontierMax = (p.frontierIndex || 0) + 180;

  if (state.status === 'lit' && lvl < 1) return false;
  if (state.status === 'unlit' && lvl !== 0) return false;
  if (state.status === 'verified' && !verified) return false;
  if (state.status === 'frontier' && chObj && chObj.index > frontierMax) return false;

  if (!q) return true;
  if (g.includes(q)) return true;
  const matchWords = (ws) => ws.some(w => {
    const wObj = wordById(w.id) || WORD_BY_ZH.get(w.zh);
    return w.zh.includes(q) ||
      (w.en || '').toLowerCase().includes(q) ||
      (wObj && (wObj.py.toLowerCase().includes(q) || stripTone(wObj.py).includes(qPlain)));
  });
  if (isSemy) {
    if ((entry.py || '').toLowerCase().includes(q) || stripTone(entry.py).includes(qPlain)) return true;
    return entry.senses.some(s => (s.sense || '').toLowerCase().includes(q) || matchWords(s.words));
  }
  return entry.readings.some(r =>
    (r.py || '').toLowerCase().includes(q) ||
    stripTone(r.py).includes(qPlain) ||
    (r.sense || '').toLowerCase().includes(q) ||
    matchWords(r.words)
  );
}

function renderPolyWordRow(w, targetChar, sourceKind = 'poly') {
  const wObj = wordById(w.id) || WORD_BY_ZH.get(w.zh);
  const pyText = wObj && wObj.py ? wObj.py : '';
  const openCharFn = sourceKind === 'semy' ? 'openCharFromSemy' : 'openCharFromPoly';
  const openWordFn = sourceKind === 'semy' ? 'openWordFromSemy' : 'openWordFromPoly';
  const partners = Array.from(new Set(w.zh.split('').filter(c => c !== targetChar && CHAR_DB_MAP.has(c))));
  const partnerHTML = partners.map(c => {
    const cLvl = getCharLevel(c);
    const dot = cLvl >= 2 ? '●' : (cLvl === 1 ? '◐' : '○');
    return `<button class="partner-pill ${cLvl >= 1 ? 'lit' : ''}" title="${t(`Study “${c}” and return here`, `学习「${c}」并返回此处`)}" onclick="${openCharFn}('${c}','${targetChar}')"><span class="zh">${c}</span><span style="font-size:10px">${dot}</span></button>`;
  }).join('');

  return `
    <div class="poly-word-row">
      <div class="poly-word-main">
        <div class="poly-word-top">
          <span class="poly-word-zh">${highlightPolyCharInWord(w.zh, targetChar)}</span>
          ${pyText ? `<span class="poly-word-py">${escapeHTML(pyText)}</span>` : ''}
        </div>
        <div class="poly-word-en">${escapeHTML(w.en)}</div>
      </div>
      <div class="poly-word-tools">
        ${partnerHTML}
        <button class="poly-mini-btn" title="${t('Listen to word', '听词汇读音')}" onclick="speak('${w.zh}')">▶</button>
        <button class="poly-mini-btn" onclick="${openWordFn}('${w.id}','${targetChar}')">${t('Word →', '词卡 →')}</button>
      </div>
    </div>`;
}

function renderPolyCardHeader(g, primaryBadge, extraActionHTML, sourceKind = 'poly') {
  const { lvl, meta, tier, verified } = getPolyCharMeta(g);
  const openCharFn = sourceKind === 'semy' ? 'openCharFromSemy' : 'openCharFromPoly';
  const statusBadge = lvl > 0
    ? `<span class="pill ${meta.cls}">${meta.short} ${meta.label}</span>`
    : `<span class="pill">○ ${t('Unlit · Learn to light', '未点亮 · 去学习')}</span>`;
  const verifiedBadge = verified
    ? `<span class="pill green">✓ ${t('Quiz Verified', '测验通过')}</span>`
    : '';
  const tierBadge = tier ? `<span class="pill">${tierShort(tier)}</span>` : '';
  const studyLabel = lvl > 0 ? t('Review Char →', '复习此字 →') : t('Study & Light →', '学习点亮 →');

  return `
    <div class="poly-card-head">
      <div class="poly-char-id">
        <button class="cnode poly-tile ${meta.cls}" title="${t(`Open Studio for “${g}”`, `打开「${g}」单字学习舱`)}" onclick="${openCharFn}('${g}','${g}')">
          ${lvl > 0 ? `<span class="cbadge">${meta.short}</span>` : ''}
          <span class="cg">${g}</span>
        </button>
        <div>
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
            ${primaryBadge}
            ${tierBadge}
          </div>
          <div class="poly-card-badges">
            ${statusBadge}
            ${verifiedBadge}
          </div>
        </div>
      </div>
      <div class="poly-card-actions">
        <button class="audio-btn primary" onclick="${openCharFn}('${g}','${g}')">📖 ${studyLabel}</button>
        ${extraActionHTML || ''}
      </div>
    </div>`;
}

function renderStatusDash(elId, chars, title, currentStatus, setFnName) {
  const dash = $(elId);
  if (!dash) return;
  const total = chars.length;
  const counts = [0, 0, 0, 0];
  let verifiedCount = 0;
  chars.forEach(c => {
    const l = getCharLevel(c);
    counts[l]++;
    if (isPolyMastered(c)) verifiedCount++;
  });
  const lit = counts[1] + counts[2] + counts[3];
  const pct3 = total ? (counts[3] / total * 100).toFixed(1) : 0;
  const pct2 = total ? (counts[2] / total * 100).toFixed(1) : 0;
  const pct1 = total ? (counts[1] / total * 100).toFixed(1) : 0;

  dash.innerHTML = `
    <div class="poly-dash">
      <div class="label">
        <span>${title}</span>
        <span>${lit} / ${total} ${t('chars lit on Map', '字已在星图点亮')} · ${verifiedCount} ${t('quiz-verified', '字测验通过')}</span>
      </div>
      <div class="bright-bar" style="margin:10px 0 8px">
        <div class="seg3" style="width:${pct3}%"></div>
        <div class="seg2" style="width:${pct2}%"></div>
        <div class="seg1" style="width:${pct1}%"></div>
      </div>
      <div class="poly-dash-stats">
        <button class="bstat ${currentStatus==='lit'?'active':''}" onclick="${setFnName}('lit')">
          <b><i class="dot l2"></i>${lit} / ${total}</b>
          <span>${t('Lit on Your Map (Lv.1–3)', '已在星图点亮 (Lv.1–3)')}</span>
        </button>
        <button class="bstat ${currentStatus==='verified'?'active':''}" onclick="${setFnName}('verified')">
          <b><i class="dot l3"></i>${verifiedCount} / ${total}</b>
          <span>✓ ${t('Quiz-Verified Here', '本页语境测验通过')}</span>
        </button>
        <button class="bstat ${currentStatus==='unlit'?'active':''}" onclick="${setFnName}('unlit')">
          <b><i class="dot l0"></i>${counts[0]}</b>
          <span>○ ${t('Unlit (Ready to Learn)', '尚未点亮 · 待学习')}</span>
        </button>
      </div>
    </div>`;
}

function renderStatusFilterTabs(elId, currentStatus, setFnName) {
  const stEl = $(elId);
  if (!stEl) return;
  const statuses = [
    { id: 'all', label: t('All Status', '全部状态') },
    { id: 'lit', label: t('● Lit / Learned', '● 已点亮/已学') },
    { id: 'unlit', label: t('○ Unlit', '○ 未点亮') },
    { id: 'frontier', label: t('🎯 Up to My Level', '🎯 符合当前程度') },
    { id: 'verified', label: t('✓ Quiz Verified', '✓ 测验已通过') }
  ];
  stEl.innerHTML = statuses.map(s =>
    `<button class="${currentStatus === s.id ? 'active' : ''}" onclick="${setFnName}('${s.id}')">${s.label}</button>`
  ).join('');
}

function renderQuizModeButtons(elId, totalCount, currentMode, setModeFnName) {
  const modesEl = $(elId);
  if (!modesEl) return;
  const qModes = [
    { id: 'all', label: t(`Quiz: All ${totalCount}`, `范围：全部 ${totalCount} 字`) },
    { id: 'lit', label: t('● My Lit Chars Only', '● 仅练我已点亮的字') },
    { id: 'unverified', label: t('○ Needs Practice', '○ 优先练未通过的字') }
  ];
  modesEl.innerHTML = qModes.map(m =>
    `<button class="${currentMode === m.id ? 'active' : ''}" onclick="${setModeFnName}('${m.id}')">${m.label}</button>`
  ).join('');
}

// ---------- 9A. Polyphones View (89 multi-reading chars) ----------
function renderPolyDash() {
  renderStatusDash('#polyDash', POLY.map(p => p.char), t('Your Polyphones Progress (89)', '你的多音字掌握进度（89字）'), polyState.status, 'setPolyStatus');
}
function renderPolyToolbar() {
  renderStatusFilterTabs('#polyStatusTabs', polyState.status, 'setPolyStatus');
  renderQuizModeButtons('#polyQuizModes', POLY.length, polyState.quizMode, 'setPolyQuizMode');
}
function renderPolyLists() {
  const polyFiltered = POLY.map((p, i) => ({ p, i })).filter(({ p }) => matchesSpecialEntry(p, false, polyState));
  const idxEl = $('#polyIndex');
  if (idxEl) {
    const chips = polyFiltered.map(({ p }) => {
      const lvl = getCharLevel(p.char);
      const v = isPolyMastered(p.char);
      const chipLvl = v ? Math.max(lvl, 2) : lvl;
      const m = levelMeta(chipLvl);
      return `<button class="idx-chip ${m.cls}" onclick="jumpToPolyCard('${p.char}')"><span>${p.char}</span><span class="ic-v">${p.readings.length}${v ? '✓' : (lvl > 0 ? m.short : '')}</span></button>`;
    }).join('');
    idxEl.innerHTML = `
      <div class="la-card" style="margin-top:0">
        <div class="label">
          <span>${t('Quick Character Index', '快速索引')} (${polyFiltered.length})</span>
          <span>${t('Color = Map brightness · ✓ = Quiz verified', '底色=星图点亮状态 · ✓=已通过读音测验')}</span>
        </div>
        ${chips ? `<div class="idx-row">${chips}</div>` : `<p class="muted" style="margin:8px 0 0">${t('No polyphones match the current filter.', '当前筛选下没有匹配的多音字。')}</p>`}
      </div>`;
  }

  $('#polyListHeading').textContent = t(`All Polyphones (${polyFiltered.length})`, `多音字对比学习（${polyFiltered.length}字）`);
  $('#polyGrid').innerHTML = polyFiltered.length
    ? polyFiltered.map(({ p, i }) => {
        const branchesHTML = p.readings.map(r => {
          const sampleSpeak = (r.words && r.words[0]) ? r.words[0].zh : p.char;
          return `
            <div class="poly-branch">
              <div class="poly-branch-head">
                <div class="poly-py">
                  <span>${r.py}</span>
                  <button class="poly-mini-btn" title="${t('Hear this reading in context', '听这个读音的例词发音')}" onclick="speak('${sampleSpeak}')">▶</button>
                </div>
                <span class="poly-sense-tag">${escapeHTML(r.sense)}</span>
              </div>
              <div class="poly-words">${r.words.map(w => renderPolyWordRow(w, p.char, 'poly')).join('')}</div>
            </div>`;
        }).join('');
        const quizBtn = `<button class="audio-btn" onclick="polyNewQuestion(${i});jumpToQuizCard('polyQuizCard')">🎧 ${t('Quiz', '练一练')}</button>`;
        const headerHTML = renderPolyCardHeader(p.char, `<span class="pill">${p.readings.length} ${t('readings', '个读音')}</span>`, quizBtn, 'poly');
        return `<div class="poly-card" id="polyCard-${p.char}">${headerHTML}${branchesHTML}</div>`;
      }).join('')
    : `<div class="empty" style="grid-column:1/-1">${t('No polyphones match your filter — try clearing the search or status filter.', '当前筛选下没有符合条件的多音字，试试切换过滤条件。')}</div>`;
}

async function jumpToQuizCard(cardId = 'polyQuizCard') {
  const qc = document.getElementById(cardId);
  if (qc) await scrollIntoViewAsync(qc, { behavior: 'smooth', block: 'center' });
}

function renderPolyphones() {
  renderPolyDash();
  renderPolyToolbar();
  renderPolyLists();
  if (!polyQuiz.word) polyNewQuestion(-1); else renderPolyQuiz();
}

function pickQuizIndex(list, mode) {
  let candidates = list.map((_, idx) => idx);
  if (mode === 'lit') {
    const litPool = candidates.filter(idx => getCharLevel(list[idx].char) >= 1);
    if (litPool.length) candidates = litPool;
  } else if (mode === 'unverified') {
    const unvPool = candidates.filter(idx => !isPolyMastered(list[idx].char));
    if (unvPool.length) candidates = unvPool;
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function polyNewQuestion(gi) {
  const g = (typeof gi === 'number' && gi >= 0) ? gi : pickQuizIndex(POLY, polyState.quizMode);
  const p = POLY[g];
  const ri = Math.floor(Math.random() * p.readings.length);
  const word = p.readings[ri].words[Math.floor(Math.random() * p.readings[ri].words.length)];
  const order = shuffleArr(p.readings.map((_, k) => k));
  polyQuiz = { gi: g, ri, word, order, answered: false, pick: -1, score: polyQuiz.score, total: polyQuiz.total };
  renderPolyQuiz();
}

function renderPolyQuiz() {
  const box = $('#polyQuizBox');
  if (!box || !polyQuiz.word) return;
  const p = POLY[polyQuiz.gi];
  const r = p.readings[polyQuiz.ri];
  const lvl = getCharLevel(p.char);
  const meta = levelMeta(lvl);
  const verified = isPolyMastered(p.char);
  const wObj = wordById(polyQuiz.word.id) || WORD_BY_ZH.get(polyQuiz.word.zh);

  $('#polyQuizScore').textContent = polyQuiz.total
    ? t(`Score: ${polyQuiz.score} / ${polyQuiz.total}`, `正确 ${polyQuiz.score} / ${polyQuiz.total}`)
    : t('Pick the reading in context', '选出该字在词中的正确读音');

  const opts = polyQuiz.order.map(k => {
    const rr = p.readings[k];
    let cls = '';
    if (polyQuiz.answered) { if (k === polyQuiz.ri) cls = ' correct'; else if (k === polyQuiz.pick) cls = ' wrong'; }
    return `<button class="la-opt${cls}" ${polyQuiz.answered ? 'disabled' : ''} onclick="polyAnswer(${k})"><b style="font-size:18px;color:var(--bamboo);display:block">${rr.py}</b><span style="font-size:12px;color:var(--ink2)">${escapeHTML(rr.sense)}</span></button>`;
  }).join('');

  const sentHTML = (wObj && wObj.sent && polyQuiz.answered)
    ? `<div class="poly-sent-preview"><div class="zh" style="font-weight:700">${escapeHTML(wObj.sent.zh)}</div><div class="muted" style="font-size:12.5px">${escapeHTML(wObj.sent.py)} — ${escapeHTML(wObj.sent.en)}</div></div>`
    : '';

  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
      <p style="margin:0;font-weight:700">${t(`How is “${p.char}” read in this word?`, `「${p.char}」在下面这个词里读作？`)}</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        <span class="pill ${meta.cls}" style="font-size:11.5px;padding:3px 9px">${meta.short} ${meta.label}</span>
        ${verified ? `<span class="pill green" style="font-size:11.5px;padding:3px 9px">✓ ${t('Verified', '已通过')}</span>` : ''}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <span class="zh poly-word-zh" style="font-size:34px">${highlightPolyCharInWord(polyQuiz.word.zh, p.char)}</span>
      <span class="muted">${escapeHTML(polyQuiz.word.en)}</span>
      <button class="audio-btn" onclick="speak('${polyQuiz.word.zh}')">▶ ${t('Listen', '听读音')}</button>
      <button class="audio-btn" onclick="openCharFromPoly('${p.char}','${p.char}')">📖 ${t('Study ', '学「')}${p.char}${t('', '」')}</button>
    </div>
    <div class="la-opts">${opts}</div>
    <div class="la-fb ${polyQuiz.answered ? 'show ' + (polyQuiz.pick === polyQuiz.ri ? 'good' : 'bad') : ''}">
      ${polyQuiz.answered ? t(`In “${polyQuiz.word.zh}” (${wObj ? wObj.py : r.py}), “${p.char}” is read <b>${r.py}</b> — ${escapeHTML(r.sense)}.`, `在「${polyQuiz.word.zh}」(${wObj ? wObj.py : r.py}) 中「${p.char}」读 <b>${r.py}</b>（${escapeHTML(r.sense)}）。`) : ''}
    </div>
    ${sentHTML}
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:10px">
      <button class="la-again" style="margin-top:0" onclick="polyNewQuestion(-1)">↻ ${t('Next Question', '下一题')}</button>
      <button class="la-again" style="margin-top:0;width:auto;padding:0 14px" onclick="jumpToPolyCard('${p.char}')">${t('Find Card ↓', '定位卡片 ↓')}</button>
    </div>`;
}

function polyAnswer(k) {
  if (polyQuiz.answered) return;
  polyQuiz.answered = true;
  polyQuiz.pick = k;
  polyQuiz.total++;
  const p = POLY[polyQuiz.gi];
  if (k === polyQuiz.ri) {
    polyQuiz.score++;
    markPolyMastered(p.char);
    if (getCharLevel(p.char) === 0) setCharLevel(p.char, 1);
    recordDailyActivity();
    persistCurrent();
    renderPolyDash();
    renderPolyLists();
  }
  renderPolyQuiz();
}

// ---------- 9B. Multiple Meanings View (12 same-sound multi-sense chars) ----------
function renderSemyDash() {
  renderStatusDash('#semyDash', POLYSEMY.map(s => s.char), t('Your Multiple-Meanings Progress (12)', '你的多义字掌握进度（12字）'), semyState.status, 'setSemyStatus');
}
function renderSemyToolbar() {
  renderStatusFilterTabs('#semyStatusTabs', semyState.status, 'setSemyStatus');
  renderQuizModeButtons('#semyQuizModes', POLYSEMY.length, semyState.quizMode, 'setSemyQuizMode');
}
function renderSemyLists() {
  const semyFiltered = POLYSEMY.map((s, i) => ({ s, i })).filter(({ s }) => matchesSpecialEntry(s, true, semyState));
  const idxEl = $('#semyIndex');
  if (idxEl) {
    const chips = semyFiltered.map(({ s }) => {
      const lvl = getCharLevel(s.char);
      const v = isPolyMastered(s.char);
      const chipLvl = v ? Math.max(lvl, 2) : lvl;
      const m = levelMeta(chipLvl);
      return `<button class="idx-chip ${m.cls}" onclick="jumpToSemyCard('${s.char}')"><span>${s.char}</span><span class="ic-v">${s.senses.length}${v ? '✓' : (lvl > 0 ? m.short : '')}</span></button>`;
    }).join('');
    idxEl.innerHTML = `
      <div class="la-card" style="margin-top:0">
        <div class="label">
          <span>${t('Quick Character Index', '快速索引')} (${semyFiltered.length})</span>
          <span>${t('Color = Map brightness · ✓ = Quiz verified', '底色=星图点亮状态 · ✓=已通过词义测验')}</span>
        </div>
        ${chips ? `<div class="idx-row">${chips}</div>` : `<p class="muted" style="margin:8px 0 0">${t('No multi-sense characters match the current filter.', '当前筛选下没有匹配的多义字。')}</p>`}
      </div>`;
  }

  $('#semyListHeading').textContent = t(`All Multi-Sense Characters (${semyFiltered.length})`, `同音多义字总表（${semyFiltered.length}字）`);
  $('#polySemy').innerHTML = semyFiltered.length
    ? semyFiltered.map(({ s, i }) => {
        const branchesHTML = s.senses.map(x => {
          const sampleSpeak = (x.words && x.words[0]) ? x.words[0].zh : s.char;
          return `
            <div class="poly-branch">
              <div class="poly-branch-head">
                <span class="poly-sense-tag" style="font-weight:700;color:var(--ink)">${escapeHTML(x.sense)}</span>
                <div style="display:flex;align-items:center;gap:6px">
                  <span class="muted" style="font-size:12px">${s.py}</span>
                  <button class="poly-mini-btn" title="${t('Hear example word', '听例词发音')}" onclick="speak('${sampleSpeak}')">▶</button>
                </div>
              </div>
              <div class="poly-words">${x.words.map(w => renderPolyWordRow(w, s.char, 'semy')).join('')}</div>
            </div>`;
        }).join('');
        const quizBtn = `<button class="audio-btn" onclick="semyNewQuestion(${i});jumpToQuizCard('semyQuizCard')">🎧 ${t('Quiz', '练一练')}</button>`;
        const headerHTML = renderPolyCardHeader(s.char, `<span class="pill">${s.senses.length} ${t('senses', '种义项')} · ${s.py}</span>`, quizBtn, 'semy');
        return `<div class="poly-card" id="semyCard-${s.char}">${headerHTML}${branchesHTML}</div>`;
      }).join('')
    : `<div class="empty" style="grid-column:1/-1">${t('No multi-sense characters match your filter.', '当前筛选下没有匹配的多义字。')}</div>`;
}

function renderPolysemyView() {
  renderSemyDash();
  renderSemyToolbar();
  renderSemyLists();
  if (!semyQuiz.word) semyNewQuestion(-1); else renderSemyQuiz();
}

function semyNewQuestion(gi) {
  const g = (typeof gi === 'number' && gi >= 0) ? gi : pickQuizIndex(POLYSEMY, semyState.quizMode);
  const s = POLYSEMY[g];
  const si = Math.floor(Math.random() * s.senses.length);
  const word = s.senses[si].words[Math.floor(Math.random() * s.senses[si].words.length)];
  const order = shuffleArr(s.senses.map((_, k) => k));
  semyQuiz = { gi: g, si, word, order, answered: false, pick: -1, score: semyQuiz.score, total: semyQuiz.total };
  renderSemyQuiz();
}

function renderSemyQuiz() {
  const box = $('#semyQuizBox');
  if (!box || !semyQuiz.word) return;
  const s = POLYSEMY[semyQuiz.gi];
  const targetSense = s.senses[semyQuiz.si];
  const lvl = getCharLevel(s.char);
  const meta = levelMeta(lvl);
  const verified = isPolyMastered(s.char);
  const wObj = wordById(semyQuiz.word.id) || WORD_BY_ZH.get(semyQuiz.word.zh);

  $('#semyQuizScore').textContent = semyQuiz.total
    ? t(`Score: ${semyQuiz.score} / ${semyQuiz.total}`, `正确 ${semyQuiz.score} / ${semyQuiz.total}`)
    : t('Pick the meaning in context', '选出该字在词中的具体义项');

  const opts = semyQuiz.order.map(k => {
    const ss = s.senses[k];
    let cls = '';
    if (semyQuiz.answered) { if (k === semyQuiz.si) cls = ' correct'; else if (k === semyQuiz.pick) cls = ' wrong'; }
    return `<button class="la-opt${cls}" style="min-height:64px" ${semyQuiz.answered ? 'disabled' : ''} onclick="semyAnswer(${k})"><b style="font-size:15px;color:var(--bamboo);display:block">${escapeHTML(ss.sense)}</b><span style="font-size:12px;color:var(--ink2)">${semyQuiz.answered ? ss.words.map(w => w.zh).join(' · ') : s.py}</span></button>`;
  }).join('');

  const sentHTML = (wObj && wObj.sent && semyQuiz.answered)
    ? `<div class="poly-sent-preview"><div class="zh" style="font-weight:700">${escapeHTML(wObj.sent.zh)}</div><div class="muted" style="font-size:12.5px">${escapeHTML(wObj.sent.py)} — ${escapeHTML(wObj.sent.en)}</div></div>`
    : '';

  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px">
      <p style="margin:0;font-weight:700">${t(`Which meaning does “${s.char}” (${s.py}) have in this word?`, `「${s.char}」(${s.py}) 在下面这个词里表示哪种意思？`)}</p>
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        <span class="pill ${meta.cls}" style="font-size:11.5px;padding:3px 9px">${meta.short} ${meta.label}</span>
        ${verified ? `<span class="pill green" style="font-size:11.5px;padding:3px 9px">✓ ${t('Verified', '已通过')}</span>` : ''}
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <span class="zh poly-word-zh" style="font-size:34px">${highlightPolyCharInWord(semyQuiz.word.zh, s.char)}</span>
      <span class="muted">${semyQuiz.answered ? escapeHTML(semyQuiz.word.en) : t('Choose the matching sense below', '根据字面语境选择对应义项')}</span>
      <button class="audio-btn" onclick="speak('${semyQuiz.word.zh}')">▶ ${t('Listen', '听读音')}</button>
      <button class="audio-btn" onclick="openCharFromSemy('${s.char}','${s.char}')">📖 ${t('Study ', '学「')}${s.char}${t('', '」')}</button>
    </div>
    <div class="la-opts">${opts}</div>
    <div class="la-fb ${semyQuiz.answered ? 'show ' + (semyQuiz.pick === semyQuiz.si ? 'good' : 'bad') : ''}">
      ${semyQuiz.answered ? t(`In “${semyQuiz.word.zh}” (${escapeHTML(semyQuiz.word.en)}), “${s.char}” means <b>${escapeHTML(targetSense.sense)}</b>.`, `在「${semyQuiz.word.zh}」（${escapeHTML(semyQuiz.word.en)}）中「${s.char}」指 <b>${escapeHTML(targetSense.sense)}</b>。`) : ''}
    </div>
    ${sentHTML}
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;margin-top:10px">
      <button class="la-again" style="margin-top:0" onclick="semyNewQuestion(-1)">↻ ${t('Next Question', '下一题')}</button>
      <button class="la-again" style="margin-top:0;width:auto;padding:0 14px" onclick="jumpToSemyCard('${s.char}')">${t('Find Card ↓', '定位卡片 ↓')}</button>
    </div>`;
}

function semyAnswer(k) {
  if (semyQuiz.answered) return;
  semyQuiz.answered = true;
  semyQuiz.pick = k;
  semyQuiz.total++;
  const s = POLYSEMY[semyQuiz.gi];
  if (k === semyQuiz.si) {
    semyQuiz.score++;
    markPolyMastered(s.char);
    if (getCharLevel(s.char) === 0) setCharLevel(s.char, 1);
    recordDailyActivity();
    persistCurrent();
    renderSemyDash();
    renderSemyLists();
  }
  renderSemyQuiz();
}

// ---------- 10. Saved View ----------
function renderSaved() {
  const p = currentProfile();
  const wn = $('#wordsLearnerName');
  if (wn) wn.textContent = p.name;
  const savedCharsHTML = (p.savedChars || []).map(g => {
    const ch = CHAR_DB_MAP.get(g);
    if (!ch) return '';
    const m = levelMeta(getCharLevel(g));
    return `<button class="cnode ${m.cls}" style="min-height:64px" onclick="openCharStudio('${g}')"><span class="cbadge">${m.short}</span><span class="cg">${g}</span><span class="cpy">${ch.py}</span></button>`;
  }).join('');

  const savedWordsHTML = (p.savedWords || []).map(id => {
    const w = wordById(id);
    if (!w) return '';
    return `<button class="list-row" onclick="openWord('${w.id}')"><span class="lg">${w.zh}</span><span style="flex:1"><b>${w.py}</b> — ${escapeHTML(w.en)}<small>${w.topic}</small></span><span style="color:var(--cinnabar)">♥</span></button>`;
  }).join('');

  const recentHTML = (p.recentChars || []).slice(0, 12).map(g => {
    const ch = CHAR_DB_MAP.get(g);
    if (!ch) return '';
    const m = levelMeta(getCharLevel(g));
    return `<button class="cnode ${m.cls}" onclick="openCharStudio('${g}')"><span class="cbadge">${m.short}</span><span class="cg">${g}</span><span class="cpy">${ch.py}</span></button>`;
  }).join('');

  $('#savedBody').innerHTML = `
    <section style="margin-top:12px">
      <div class="sec-head"><div><h2>${t('Saved Characters', '收藏的汉字')} (${(p.savedChars||[]).length})</h2></div></div>
      ${savedCharsHTML ? `<div class="char-grid">${savedCharsHTML}</div>` : `<div class="empty">${t('No saved characters yet. Tap ♡ in any Character Studio to save one.', '还没有收藏的汉字，在学习舱点击 ♡ 即可收藏。')}</div>`}
    </section>
    <section>
      <div class="sec-head"><div><h2>${t('Saved Words', '收藏的词条')} (${(p.savedWords||[]).length})</h2></div></div>
      ${savedWordsHTML || `<div class="empty">${t('No saved words yet. Tap ♡ on any word card to save it.', '还没有收藏的词条，在词库中点击 ♡ 即可收藏。')}</div>`}
    </section>
    <section>
      <div class="sec-head"><div><h2>${t('Recently Viewed Characters', '最近查看的汉字')}</h2></div></div>
      ${recentHTML ? `<div class="char-grid">${recentHTML}</div>` : `<div class="empty">${t('No recent activity yet.', '还没有查看记录。')}</div>`}
    </section>
  `;
}

// ---------- 11. Learner Profile Switcher ----------
function avatarLetter(name) { return (name || '?').trim().charAt(0).toUpperCase() || '?'; }
function renderLearnerBar() {
  const p = currentProfile();
  if (!p) return;
  const stats = computeStats();
  $('#learnerAvatar').textContent = avatarLetter(p.name);
  $('#learnerName').textContent = p.name;
  $('#learnerSub').textContent = t(`${stats.lit} / ${stats.total} lit`, `点亮 ${stats.lit} / ${stats.total} 字`);
  const wn = $('#wordsLearnerName');
  if (wn) wn.textContent = p.name;
}
function renderProfileList() {
  const box = $('#profileList');
  if (!box) return;
  const sorted = [...profiles].sort((a, b) => (b.lastActive || 0) - (a.lastActive || 0));
  box.innerHTML = sorted.map(p => {
    const isCur = p.id === currentId;
    const litCount = Object.keys(p.charLevels || {}).length;
    return `<div class="profile-row ${isCur ? 'current' : ''}">
      <span class="learner-avatar">${avatarLetter(p.name)}</span>
      <span class="profile-row-main"><b>${escapeHTML(p.name)}${isCur ? t(' · Current', ' · 当前') : ''}</b><small style="display:block;color:var(--ink2)">${t(`${litCount} lit · Frontier #${(p.frontierIndex||0)+1}`, `点亮 ${litCount} 字 · 前沿 #${(p.frontierIndex||0)+1}`)}</small></span>
      <span class="profile-actions">
        ${isCur ? `<button class="primary" disabled style="opacity:.7">${t('Active', '使用中')}</button>` : `<button class="primary" onclick="switchLearner('${p.id}')">${t('Switch', '切换')}</button>`}
        ${profiles.length > 1 ? `<button class="danger" onclick="deleteLearner('${p.id}')">${t('Delete', '删除')}</button>` : ''}
      </span>
    </div>`;
  }).join('');
}
function toggleProfilePanel(force) {
  const panel = $('#profilePanel');
  if (!panel) return;
  const show = typeof force === 'boolean' ? force : panel.hidden;
  panel.hidden = !show;
  $('#learnerCurrentBtn').setAttribute('aria-expanded', show ? 'true' : 'false');
  if (show) renderProfileList();
}
function switchLearner(id) {
  if (id === currentId) { toggleProfilePanel(false); return; }
  persistCurrent();
  currentId = id;
  saveProfiles();
  renderAllViews();
  toggleProfilePanel(false);
  testState.mode = 'hub';
  showView('map');
  toast(t('Switched to ', '已切换到 ') + currentProfile().name);
}
function createLearner() {
  const input = $('#newLearnerInput');
  const msg = $('#profileMsg');
  const name = (input.value || '').trim().slice(0, 24);
  if (!name) { msg.textContent = t('Please enter a name first.', '请先输入名字。'); input.focus(); return; }
  if (profiles.some(p => p.name.toLowerCase() === name.toLowerCase())) { msg.textContent = t('That name already exists.', '该名字已存在。'); return; }
  persistCurrent();
  const p = makeProfile(name, false);
  profiles.push(p);
  currentId = p.id;
  saveProfiles();
  input.value = '';
  msg.textContent = '';
  renderAllViews();
  toggleProfilePanel(false);
  showView('map');
  toast(t('Created profile: ', '已创建新档案：') + name);
}
function deleteLearner(id) {
  if (profiles.length <= 1) return;
  const wasCurrent = id === currentId;
  profiles = profiles.filter(p => p.id !== id);
  if (wasCurrent) currentId = profiles[0].id;
  saveProfiles();
  renderAllViews();
  if (wasCurrent) showView('map');
}

// ---------- Init ----------
applyStaticI18n();
renderAllViews();

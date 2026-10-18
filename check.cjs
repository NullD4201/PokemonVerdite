const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
const themeScript = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const task = (stage, weight) => ({ dataset: { stage, weight: String(weight) } });
const areas = [...html.matchAll(/<li data-status="[^"]+">([\s\S]*?)<\/details>/g)].map(area =>
  [...area[1].matchAll(/data-stage="([^"]+)" data-weight="([^"]+)"/g)].map(match => task(match[1], match[2])));
const tasks = areas.flat();
assert.equal(areas.length, 12);
assert.equal(tasks.length, 70);
assert.equal(tasks.reduce((sum, item) => sum + Number(item.dataset.weight), 0), 1000);
assert(tasks.every(item => ["planned", "implemented", "verified"].includes(item.dataset.stage) && Number(item.dataset.weight) > 0));
for (const asset of ["styles.css", "app.js", "favicon.svg", "assets/verdite-forest.png"]) {
  assert(fs.existsSync(path.join(__dirname, asset)), asset + " 파일이 없습니다.");
}

function render(groups = areas, { saved = null, systemDark = false, blocked = false } = {}) {
  const nodes = Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], {}]));
  const translations = [...html.matchAll(/data-en="([^"]*)">([^<]*)</g)].map(match => ({ dataset: { en: match[1] }, textContent: match[2], original: match[2] }));
  assert.equal(translations.length, [...html.matchAll(/data-en="/g)].length, "번역 요소는 텍스트만 포함해야 합니다.");
  const control = () => ({ attributes: {}, disabled: true,
    getAttribute(name) { return this.attributes[name]; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(event, handler) { this[event] = handler; } });
  const labels = [{ ...control(), dataset: { enLabel: "Area progress" }, attributes: { "aria-label": "영역 진행률" } }];
  const buttons = ["ko", "en"].map(language => ({ ...control(), dataset: { language } }));
  const goals = groups.map(items => {
    const children = { ".area-percent": {}, progress: {}, ".status": { dataset: {} } };
    return { dataset: {}, children, querySelectorAll: () => items, querySelector: selector => children[selector] };
  });
  nodes["theme-toggle"] = control();
  const document = {
    documentElement: { lang: "ko", dataset: {} },
    querySelectorAll: selector => ({
      ".release-goals > li": goals, ".subtasks [data-stage]": groups.flat(),
      "[data-en]": translations, "[data-en-label]": labels, "[data-language]": buttons,
    })[selector],
    getElementById: id => nodes[id],
  };
  const storage = { value: saved };
  const localStorage = {
    getItem() { if (blocked) throw new Error("Storage blocked"); return storage.value; },
    setItem(key, value) { if (blocked) throw new Error("Storage blocked"); assert.equal(key, "verdite-theme"); storage.value = value; },
  };
  const context = vm.createContext({ document, localStorage, matchMedia: () => ({ matches: systemDark }) });
  vm.runInContext(themeScript, context);
  vm.runInContext(script, context);
  return { nodes, document, translations, labels, buttons, goals, storage };
}

const { nodes, document, translations, labels, buttons, goals } = render();
assert.equal(nodes["goal-count"].textContent, 12);
assert.equal(nodes["task-count"].textContent, 70);
assert.equal(nodes["completed-count"].textContent, 6);
assert.equal(nodes["active-count"].textContent, 6);
assert.equal(nodes["planned-count"].textContent, 58);
assert.equal(nodes["overall-progress"].value, 3);
assert.deepEqual(goals.map(goal => goal.children.progress.value), [12.5, 25, 0, 0, 0.3, 0, 0.6, 30, 0, 0, 0, 3.3]);
assert.equal(goals.filter(goal => goal.dataset.status === "active").length, 6);

const percent = items => render([items]).nodes["overall-progress"].value;
assert.equal(percent([]), 0);
assert.equal(percent([task("planned", 10), task("planned", 90)]), 0);
assert.equal(percent([task("implemented", 10), task("planned", 90)]), 5);
assert.equal(percent([task("verified", 10), task("planned", 90)]), 10);
assert.equal(percent([task("verified", 4), task("verified", 6), task("planned", 90)]), 10, "같은 비중을 세분화해도 진행률이 달라지면 안 됩니다.");
assert.equal(percent([task("verified", 999), task("implemented", 1)]), 99.9, "미검증 작업이 남으면 반올림으로 100%가 되면 안 됩니다.");
assert.equal(percent([task("verified", 10), task("verified", 90)]), 100);

assert(buttons.every(button => !button.disabled));
buttons[1].click();
assert.equal(document.documentElement.lang, "en");
assert(translations.every(node => node.textContent === node.dataset.en));
assert.equal(labels[0].getAttribute("aria-label"), "Area progress");
assert.equal(buttons[1].attributes["aria-pressed"], "true");
assert.equal(buttons[0].attributes["aria-pressed"], "false");
assert.equal(nodes["overall-progress"].value, 3);
buttons[0].click();
assert(translations.every(node => node.textContent === node.original));
assert.equal(document.documentElement.lang, "ko");
assert.equal(labels[0].getAttribute("aria-label"), "영역 진행률");
assert.equal(buttons[0].attributes["aria-pressed"], "true");

assert.equal(document.documentElement.dataset.theme, "light");
assert.equal(render(areas, { systemDark: true }).document.documentElement.dataset.theme, "dark");
assert.equal(render(areas, { saved: "light", systemDark: true }).document.documentElement.dataset.theme, "light");
assert.equal(render(areas, { saved: "invalid", systemDark: true }).document.documentElement.dataset.theme, "dark");
const dark = render(areas, { saved: "dark" });
assert.equal(dark.nodes["theme-toggle"].attributes["aria-pressed"], "true");
dark.nodes["theme-toggle"].click();
assert.equal(dark.document.documentElement.dataset.theme, "light");
assert.equal(dark.storage.value, "light");
assert.equal(dark.nodes["theme-toggle"].attributes["aria-pressed"], "false");
dark.nodes["theme-toggle"].click();
assert.equal(render(areas, { saved: dark.storage.value }).document.documentElement.dataset.theme, "dark");
const blocked = render(areas, { blocked: true, systemDark: true });
blocked.nodes["theme-toggle"].click();
assert.equal(blocked.document.documentElement.dataset.theme, "light");
assert.equal(blocked.nodes["overall-progress"].value, 3);
console.log("통과: 70개 작업·1,000점·3% 집계, 부분 진행·가중치·반올림 경계, 한영 전환, 테마 저장·복원·저장 차단.");

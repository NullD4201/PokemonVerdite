const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
const releaseList = html.match(/<ul class="task-list release-goals">([\s\S]*?)<\/ul>/)[1];
const statuses = [...releaseList.matchAll(/<li data-status="([^"]+)"/g)].map(match => match[1]);
assert(statuses.every(status => ["done", "active", "planned"].includes(status)), "개발 상태를 확인하세요.");
for (const asset of ["styles.css", "app.js", "favicon.svg", "assets/verdite-forest.png"]) {
  assert(fs.existsSync(path.join(__dirname, asset)), `${asset} 파일이 없습니다.`);
}

function render(values) {
  const nodes = Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], {}]));
  const translations = [...html.matchAll(/data-en="([^"]*)">([^<]*)</g)].map(match => ({ dataset: { en: match[1] }, textContent: match[2], original: match[2] }));
  assert.equal(translations.length, [...html.matchAll(/data-en="/g)].length, "번역 요소는 자식 요소 없이 텍스트만 포함해야 합니다.");
  const labels = [{ dataset: { enLabel: "Main navigation" }, attributes: { "aria-label": "주 메뉴" },
    getAttribute(name) { return this.attributes[name]; }, setAttribute(name, value) { this.attributes[name] = value; } }];
  const buttons = ["ko", "en"].map(language => ({ dataset: { language }, attributes: {}, disabled: true,
    setAttribute(name, value) { this.attributes[name] = value; }, addEventListener(event, handler) { this[event] = handler; } }));
  const document = {
    documentElement: { lang: "ko" },
    querySelectorAll: selector => ({
      ".release-goals [data-status]": values.map(status => ({ dataset: { status } })),
      ".task-list [data-status]": [...values, "done", "done"].map(status => ({ dataset: { status } })),
      "[data-en]": translations, "[data-en-label]": labels, "[data-language]": buttons,
    })[selector],
    getElementById: id => nodes[id],
  };
  vm.runInNewContext(script, { document });
  return { nodes, document, translations, labels, buttons };
}

const { nodes: summary, document, translations, labels, buttons } = render(statuses);
assert.equal(summary["goal-count"].textContent, statuses.length);
assert.equal(summary["completed-count"].textContent + summary["active-count"].textContent + summary["planned-count"].textContent, statuses.length);
assert.equal(statuses.length, 12, "출시 범위를 바꾸면 README의 기준과 함께 갱신하세요.");
assert.equal(summary["completed-count"].textContent, 0);
assert.equal(summary["active-count"].textContent, 4);
assert.equal(summary["planned-count"].textContent, 8);
assert.equal(summary["overall-progress"].value, 0, "부분 구현·문서·단일 에셋을 출시 목표 완료로 세면 안 됩니다.");
assert.equal(render(["done", "active", "planned"]).nodes["overall-progress"].value, 33);
assert.equal(render([]).nodes["overall-progress"].value, 0);
assert.equal(render(["done", "done"]).nodes["overall-progress"].value, 100);
assert.equal(render(["active", "planned"]).nodes["overall-progress"].value, 0);
assert(buttons.every(button => !button.disabled));
const originalProgress = summary["overall-progress"].value;
buttons[1].click();
assert.equal(document.documentElement.lang, "en");
assert(translations.every(node => node.textContent === node.dataset.en));
assert.equal(labels[0].getAttribute("aria-label"), "Main navigation");
assert.equal(buttons[1].attributes["aria-pressed"], "true");
assert.equal(buttons[0].attributes["aria-pressed"], "false");
assert.equal(summary["overall-progress"].value, originalProgress);
buttons[0].click();
assert.equal(document.documentElement.lang, "ko");
assert(translations.every(node => node.textContent === node.original));
assert.equal(labels[0].getAttribute("aria-label"), "주 메뉴");
assert.equal(buttons[0].attributes["aria-pressed"], "true");
assert.equal(buttons[1].attributes["aria-pressed"], "false");
console.log("통과: 정적 파일, 출시 목표만 집계, 진행률 경계값, 한영 왕복 전환, 접근성 이름·선택 상태, 진행률 유지.");

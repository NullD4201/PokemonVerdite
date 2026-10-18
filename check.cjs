const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");
const statuses = [...html.matchAll(/<li data-status="([^"]+)"/g)].map(match => match[1]);
assert(statuses.every(status => ["done", "active", "planned"].includes(status)), "개발 상태를 확인하세요.");
for (const asset of ["styles.css", "app.js"]) {
  assert(fs.existsSync(path.join(__dirname, asset)), `${asset} 파일이 없습니다.`);
}

function render(values) {
  const nodes = Object.fromEntries([...html.matchAll(/\bid="([^"]+)"/g)].map(match => [match[1], {}]));
  vm.runInNewContext(script, { document: {
    querySelectorAll: () => values.map(status => ({ dataset: { status } })),
    getElementById: id => nodes[id],
  } });
  return nodes;
}

const sample = render(statuses);
assert.equal(sample["task-count"].textContent, statuses.length);
assert.equal(sample["completed-count"].textContent + sample["active-count"].textContent + sample["planned-count"].textContent, statuses.length);
assert.equal(render(["done", "active", "planned"])["overall-progress"].value, 33);
assert.equal(render([])["overall-progress"].value, 0);
assert.equal(render(["done", "done"])["overall-progress"].value, 100);
assert.equal(render(["active", "planned"])["overall-progress"].value, 0);
console.log("통과: 정적 파일, 상태 집계, 진행률 반올림, 빈 목록, 전체 완료.");

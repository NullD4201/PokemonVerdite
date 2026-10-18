const stageCredit = { planned: 0, implemented: 0.5, verified: 1 };
function progress(tasks) {
  const total = tasks.reduce((sum, task) => sum + Number(task.dataset.weight), 0);
  const earned = tasks.reduce((sum, task) => sum + Number(task.dataset.weight) * stageCredit[task.dataset.stage], 0);
  if (!total) return 0;
  return earned === total ? 100 : Math.min(99.9, Math.round(earned / total * 1000) / 10);
}
const goals = [...document.querySelectorAll(".release-goals > li")];
const tasks = [...document.querySelectorAll(".subtasks [data-stage]")];
const percent = progress(tasks);
for (const goal of goals) {
  const areaProgress = progress([...goal.querySelectorAll("[data-stage]")]);
  goal.querySelector(".area-percent").textContent = areaProgress;
  goal.querySelector("progress").value = areaProgress;
  goal.dataset.status = areaProgress === 100 ? "done" : areaProgress > 0 ? "active" : "planned";
  const badge = goal.querySelector(".status");
  const statusText = { done: ["완료", "Done"], active: ["진행 중", "In progress"], planned: ["예정", "Planned"] }[goal.dataset.status];
  badge.textContent = statusText[0];
  badge.dataset.en = statusText[1];
}

document.getElementById("goal-count").textContent = goals.length;
document.getElementById("task-count").textContent = tasks.length;
document.getElementById("completed-count").textContent = tasks.filter(task => task.dataset.stage === "verified").length;
document.getElementById("active-count").textContent = tasks.filter(task => task.dataset.stage === "implemented").length;
document.getElementById("planned-count").textContent = tasks.filter(task => task.dataset.stage === "planned").length;
document.getElementById("progress-value").textContent = percent;
document.getElementById("overall-progress").value = percent;
document.getElementById("overall-progress").textContent = `${percent}%`;

const themeButton = document.getElementById("theme-toggle");
themeButton.disabled = false;
themeButton.setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
themeButton.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  try { localStorage.setItem("verdite-theme", theme); } catch { /* 저장이 차단되어도 현재 화면 전환은 유지합니다. */ }
});

const translations = [...document.querySelectorAll("[data-en]")].map(node => ({ node, ko: node.textContent }));
const labels = [...document.querySelectorAll("[data-en-label]")].map(node => ({ node, ko: node.getAttribute("aria-label") }));
const languageButtons = [...document.querySelectorAll("[data-language]")];

for (const button of languageButtons) {
  button.disabled = false;
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    document.documentElement.lang = language;
    for (const { node, ko } of translations) node.textContent = language === "en" ? node.dataset.en : ko;
    for (const { node, ko } of labels) node.setAttribute("aria-label", language === "en" ? node.dataset.enLabel : ko);
    for (const choice of languageButtons) choice.setAttribute("aria-pressed", String(choice.dataset.language === language));
  });
}

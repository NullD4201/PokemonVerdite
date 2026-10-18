const goals = [...document.querySelectorAll(".release-goals [data-status]")];
const completed = goals.filter(goal => goal.dataset.status === "done").length;
const active = goals.filter(goal => goal.dataset.status === "active").length;
const planned = goals.filter(goal => goal.dataset.status === "planned").length;
const percent = goals.length ? Math.round(completed / goals.length * 100) : 0;

document.getElementById("goal-count").textContent = goals.length;
document.getElementById("completed-count").textContent = completed;
document.getElementById("active-count").textContent = active;
document.getElementById("planned-count").textContent = planned;
document.getElementById("progress-value").textContent = percent;
document.getElementById("overall-progress").value = percent;
document.getElementById("overall-progress").textContent = `${percent}%`;

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

let currentDate = new Date();
let typingTimeout;

function getMonday(d) {
  d = new Date(d);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

/* Анимация печати */
function typeText(text) {
  const el = document.getElementById("typed");
  el.textContent = "";
  clearTimeout(typingTimeout);

  let i = 0;
  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      typingTimeout = setTimeout(type, 35);
    }
  }
  type();
}

function updateText() {
  const monday = getMonday(currentDate);
  const text = `Неделя с ${monday.toLocaleDateString()}`;
  typeText(text);
}

function openSchedule() {
  const monday = getMonday(currentDate);
  const url =
    `https://schedule.mstimetables.ru/publications/cdb2a14c-a891-4f9f-b56c-7e8eb559c766#/groups/112/lessons?date=${formatDate(monday)}`;
  window.location.href = url;
}

function nextWeek() {
  currentDate.setDate(currentDate.getDate() + 7);
  updateText();
}

function prevWeek() {
  currentDate.setDate(currentDate.getDate() - 7);
  updateText();
}

/* Запуск */
updateText();
document.getElementById("nextWeek").addEventListener("click", nextWeek);
document.getElementById("prevWeek").addEventListener("click", prevWeek);
document.getElementById("openSchedule").addEventListener("click", openSchedule);
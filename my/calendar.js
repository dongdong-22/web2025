const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

function renderCalendar(month, year) {
  document.querySelector('.choose-month-btn').style.visibility='visible';
  const container = document.getElementById('calendar-container');
  container.innerHTML = `<h3 style="text-align: center">${year}년 ${month + 1}월</h3><div class='calendar'></div>`;
  const calendar = container.querySelector('.calendar');
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  calendar.innerHTML = weekdays.map(day => `<div class="weekday">${day}</div>`).join('');
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let d = 1; d <= lastDate; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const goals = JSON.parse(localStorage.getItem(`goals-${dateStr}`) || '[]');
    const status = JSON.parse(localStorage.getItem(`goalStatus-${dateStr}`) || '[]');

    const allChecked = goals.length > 0 && goals.length === status.filter(x => x).length;
    const cls = goals.length === 0 ? 'missed' : (allChecked ? 'achieved' : 'missed');

    let symbolHTML = '';
    if (goals.length > 0) {
      const symbols = goals.map((_, i) => status[i] ? '✅' : '❌');
      const rows = [];
      for (let i = 0; i < symbols.length; i += 3) {
        rows.push(symbols.slice(i, i + 3));
      }
      symbolHTML = rows.map(row => `<div class="calendar-symbol-row">${row.map(s => `<span>${s}</span>`).join('')}</div>`).join('');
    }

    calendar.innerHTML += `
      <div class="day ${cls}" onclick="showDetails('${dateStr}')">
        <div>${d}</div>
        ${symbolHTML}
      </div>`;
  }
}

function showDetails(dateStr) {
  const goals = JSON.parse(localStorage.getItem(`goals-${dateStr}`) || '[]');
  const status = JSON.parse(localStorage.getItem(`goalStatus-${dateStr}`) || '[]');
  if (!goals.length) {
    alert(`${dateStr}에는 설정된 목표가 없습니다.`);
    return;
  }
  const result = goals.map((goal, i) => `${status[i] ? '✅' : '❌'} ${goal}`).join('\n');
  alert(`${dateStr} 목표 달성 결과:\n${result}`);
}

function backToYear() {
  document.querySelector('.choose-month-btn').style.visibility = 'hidden';
  const container = document.getElementById('calendar-container');
  container.innerHTML = `<h3 style="text-align: center">${currentYear}년</h3><div class='calendar'></div>`;
  const calendar = container.querySelector('.calendar');
  for (let m = 0; m < 12; m++) {
    calendar.innerHTML += `<div class="day" onclick="renderCalendar(${m}, ${currentYear})">${m + 1}월</div>`;
  }
}

renderCalendar(currentMonth, currentYear);

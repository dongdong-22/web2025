let selectedDate = new Date().toISOString().split('T')[0];
const dateInput = document.getElementById('date');
const form = document.getElementById('check-form');

window.onload = () => {
  dateInput.value = selectedDate;
  loadGoals(selectedDate);
};

dateInput.addEventListener('change', () => {
  selectedDate = dateInput.value;
  loadGoals(selectedDate);
});

function loadGoals(date) {
  form.innerHTML = '';
  const goals = JSON.parse(localStorage.getItem(`goals-${date}`)) || [];
  const statuses = JSON.parse(localStorage.getItem(`goalStatus-${date}`)) || Array(goals.length).fill(false);

  goals.forEach((goal, idx) => {
    const div = document.createElement('div');
    div.className = 'goal-item';
    div.innerHTML = `
      <input type="checkbox" id="goal-${idx}" ${statuses[idx] ? 'checked' : ''}>
      <label for="goal-${idx}">${goal}</label>
    `;
    form.appendChild(div);
  });
}

function saveResults() {
  const checkboxes = form.querySelectorAll('input[type="checkbox"]');
  const result = Array.from(checkboxes).map(cb => cb.checked);
  localStorage.setItem(`goalStatus-${selectedDate}`, JSON.stringify(result));
  alert("달성 여부가 저장되었습니다!");
  location.href = 'index.html';
}

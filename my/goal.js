let goalCount = 3;

    function addGoal() {
      if (goalCount >= 5) return;
      goalCount++;
      const div = document.createElement('div');

      div.className = 'goal-input-row';
      div.innerHTML = `<div class="div-for-centralize"></div>
                       <input type="text" class="goal-input" placeholder="목표 ${goalCount}" required>
                       <button type="button" class="remove-btn" onclick="removeGoal(this)">삭제</button>
                       `;
      document.getElementById('additional-goals').appendChild(div);

    }

    function removeGoal(button) {
      if (goalCount <= 3) return;
      const row = button.parentElement;
      row.remove();
      goalCount--;
    }

    document.getElementById('goal-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const goals = [...document.querySelectorAll('.goal-input')].map(input => input.value);
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`goals-${today}`, JSON.stringify(goals));
      alert('목표가 저장되었습니다!');
      location.href = 'index.html';
    });
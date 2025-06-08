// 명언 불러오기
window.onload = function () {
  fetch("https://api.quotable.io/random")
    .then(res => {
      if (!res.ok) throw new Error('API 요청 실패');
      return res.json();
    })
    .then(data => {
      document.getElementById("quote").innerHTML = data.content + "<br><br> — " + data.author;
    })
    .catch(err => {
      document.getElementById("quote").textContent = "명언을 불러오지 못했습니다. 다시 시도해주세요.";
      console.error(err);
    });
};
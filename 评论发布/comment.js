let comment = {};
function Comment(com, user) {
  this.commentString = com;
  this.user = user;
}
document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('#txt');
  const counter = document.querySelector('span');
  const btn = document.querySelector('#submit');
  const list = document.querySelector('#list');

  input.addEventListener('blur', function () {
    input.style.background = "var(--bg)";
  });
  input.addEventListener('focus', function () {
    input.style.background = "var(--card)";
  });


  // 字数统计
  input.addEventListener('input', function () {
    if (input.value.length > 200) {
      input.value = input.value.slice(0, 200);
    }
    input.value = input.value.replace(/\n/g, '');
    const len = input.value.length;
    counter.textContent = `${len}/200`;
  });

  // 回车发布（Shift+Enter 换行）
  input.addEventListener('keydown', function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      publish();
    }
  });
  // 按钮发布
  btn.addEventListener('click', publish);

  function publish() {
    const input = document.querySelector('textarea');
    const txt = input.value.trim();
    if (!txt) return;
    const comments = getComments();
    comments.unshift({ text: txt, time: Date.now() });
    saveComments(comments);
    input.value = '';
    counter.textContent = '0 / 200';
    render();
  }

  // 渲染列表
  function render() {
    const comments = getComments();
    list.innerHTML = comments.map((c, i) => `
    <li class="item">
      <div class="item-header">
        <div class="avatar">${c.user || 'U'}</div>
        <span class="name">匿名用户</span>
        <span class="time">${formatTime(c.time)}</span>
      </div>
      <div class="content">${escapeHtml(c.text)}</div>
    </li>
  `).join('');
  }

  // 本地存储
  const KEY = 'simple-comments';
  function getComments() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function saveComments(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr));
  }

  // 工具
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }
  function formatTime(t) {
    const d = new Date(t);
    const pad = n => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

});

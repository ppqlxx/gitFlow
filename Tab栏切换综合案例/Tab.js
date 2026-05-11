document.addEventListener('DOMContentLoaded', function () {
  const spanTab = document.querySelectorAll('.header span');
  const header = document.querySelector('.header');
  const ul = document.querySelector('.slider-footer ul');
  const liList = document.querySelectorAll('.slider-footer li');
  spanTab[0].classList.add('active');
  liList[0].classList.add('active');
  // 添加点击事件 通过委托
  header.addEventListener('mouseover', function (e) {
    // 关键：判断经过的是不是 span，防止经过 header 空白处也触发
    if (e.target.tagName !== 'SPAN') return;
    // 排他思想：遍历spanlist为当前被点击span添加active类名 其余移除
    spanTab.forEach(span => {
      span.classList.remove('active');
    });
    e.target.classList.add('active');
  });

  ul.addEventListener('mouseover', function (e) {
    // 确保点击的是 li
    if (e.target.tagName !== 'LI') return;
    liList.forEach(li => {
      li.classList.remove('active');
    });
    e.target.classList.add('active');
  });
});
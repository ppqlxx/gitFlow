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
  const cards = document.querySelectorAll('.card');
  const card = document.querySelector('.card');
  const navi = document.querySelector('.navi');
  const iconfonts = document.querySelectorAll('.iconfont');
  const naviList = document.querySelectorAll('.navi li'); // 获取导航的 li 整体
  // 1. 创建统一的观察器
  // 统一观察所有卡片，用来决定电梯导航高亮
  const navObserver = new IntersectionObserver(entries => {
    /* 先收集所有卡片当前信息 */
    const cardsInfo = Array.from(entries).map(en => ({
      index: Array.from(cards).indexOf(en.target),
      ratio: en.intersectionRatio,
      centerY: en.boundingClientRect.top + en.boundingClientRect.height / 2
    }))
      /* 过滤出确实在屏幕里的（避免上下边缘残留） */
      .filter(c => c.ratio > 0.1);

    if (!cardsInfo.length) return;

    /* 谁中心离视口中央最近，谁就高亮 */
    const viewportCenter = window.innerHeight / 2;
    const closest = cardsInfo.reduce((p, c) =>
      Math.abs(c.centerY - viewportCenter) < Math.abs(p.centerY - viewportCenter) ? c : p
    );

    /* 排他高亮 */
    iconfonts.forEach(i => i.classList.remove('show'));
    if (iconfonts[closest.index]) {
      iconfonts[closest.index].classList.add('show');
    }
  }, {
    threshold: Array.from({ length: 20 }, (_, i) => i / 20)   // 0.05~1 共 20 档，精度足够
  });

  cards.forEach(card => navObserver.observe(card));

  // 4. 电梯导航显示/隐藏
  const naviShowObserver = new IntersectionObserver(([entry]) => {
    const navi = document.querySelector('.navi');
    if (!entry.isIntersecting) {
      navi.classList.add('show');   // 第一张卡片看不见 → 显示电梯
    } else {
      navi.classList.remove('show');// 第一张卡片看得见 → 隐藏电梯
    }
  }, { threshold: 0 });

  naviShowObserver.observe(cards[0]);

  // 导航栏显示与否
  const observerHeader = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) {
      header.classList.add('fixed-header');
    } else {
      header.classList.remove('fixed-header');
    }
  }, { threshold: 0 });

  observerHeader.observe(cards[0]);
});

/*
//电梯导航栏检测是否滚动三百像素位置（移动多少）
// scroll事件的写法，但是每次滚动事件都会出发容易造成网页卡顿

window.addEventListener('scroll', function () {
  const card = document.querySelector('.card');
  const navi = document.querySelector('.navi');

  // 获取 card 底部相对于页面顶部的距离
  // offsetTop 是元素距离顶部的距离，offsetHeight 是元素高度
  const cardBottom = card.offsetTop + card.offsetHeight;

  // 获取页面当前滚动的垂直距离
  const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
  console.log('cardBottom', cardBottom, 'scrollTop', scrollTop);

  // 如果滚动距离超过了 card 的底部，说明 card 已经看不见了（或被遮挡了）
  // 滚动超过300像素或者是看不见底部的写法
  if (scrollTop > 300) {
    navi.classList.add('show');
  } else {
    navi.classList.remove('show');
  }
});

*/

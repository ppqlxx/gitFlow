//实现一：读取给定的图片数组进行显示和更新
// 轮播图数据
const sliderData = [
  { url: '../img/1.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
  { url: '../img/2.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
  { url: '../img/3.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
  { url: '../img/4.jpg', title: '李玉刚：让世界通过B站看到东方大国文化', color: 'rgb(139, 98, 66)' },
  { url: '../img/5.jpg', title: '快来分享你的寒假日常吧', color: 'rgb(67, 90, 92)' },
  { url: '../img/6.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
];


// document.addEventListener('DOMContentLoaded', function () {
//   // 获取dom元素
//   const img = document.querySelector("img");
//   const p = document.querySelector('.slider-footer p');
//   const ul = document.querySelector('ul');
//   // 4. 获取按钮
//   const prevBtn = document.querySelector('.prev');
//   const nextBtn = document.querySelector('.next');

//   let index = 1;
//   img.src = sliderData[index - 1].url;
//   ul.addEventListener("click", function (e) {
//     console.log(index, 1);

//     // 利用事件委托为li绑定事件
//     // 确保为li标签
//     if (e.target.tagName !== "LI") return;
//     // 获得li标签index
//     index = Array.from(ul.children).indexOf(e.target) + 1;
//     ul.querySelectorAll('li.active').forEach(li => li.classList.remove('active'));
//     const li = document.querySelector('ul :nth-child(' + index + ')');
//     li.classList.add('active');

//     // 更新图片
//     img.src = sliderData[index - 1].url;
//     console.log(index, 2);
//   })

//   // 上一张
//   prevBtn.addEventListener("click", function (e) {

//     console.log(index, 1);
//     if (index - 1 === 0) index = sliderData.length;
//     else index = index - 1;
//     ul.querySelectorAll('li.active').forEach(li => li.classList.remove('active'));
//     const li = document.querySelector('ul :nth-child(' + index + ')');
//     li.classList.add('active');

//     // 更新图片
//     img.src = sliderData[index - 1].url; console.log(index, 2);
//   })

//   //下一张
//   nextBtn.addEventListener("click", function (e) {

//     console.log(index, 1);
//     if (index + 1 > sliderData.length) index = 1;
//     else index = index + 1;
//     ul.querySelectorAll('li.active').forEach(li => li.classList.remove('active'));
//     const li = document.querySelector('ul :nth-child(' + index + ')');
//     li.classList.add('active');

//     // 更新图片
//     img.src = sliderData[index - 1].url; console.log(index, 2);
//   })
// })

// 将上述重复的按钮事件注册代码通过委托给show进行注册
// 封装切换逻辑
function switchSlide(slider, idx) {
  const img = slider.querySelector('img');
  const ul = slider.querySelector('ul');
  ul.querySelectorAll('li.active').forEach(li => li.classList.remove('active'));
  ul.children[idx - 1].classList.add('active');
  img.src = sliderData[idx - 1].url;
}


document.addEventListener('DOMContentLoaded', () => {
  // 初始化状态
  document.querySelectorAll(".slider").forEach((slider, cardIdx) => {
    switchSlide(slider, 1);
  });

  // 统一委托事件
  document.querySelectorAll(".show").forEach(wrapper => {
    wrapper.addEventListener("click", function (e) {
      const slider = e.target.closest('.slider');   // 当前卡片根节点
      if (!slider) return;                          // 点空白处直接忽略
      // 获取dom元素
      const ul = slider.querySelector('ul');
      // 获取按钮
      const prevBtn = slider.querySelector('.prev');
      const nextBtn = slider.querySelector('.next');
      // 获得当前为active的li的index
      let index = [...ul.children].findIndex(li => li.classList.contains('active')) + 1;
      console.log(index);

      // 点指示点
      if (e.target.tagName === 'LI') {
        index = [...ul.children].indexOf(e.target) + 1;
        switchSlide(slider, index);
        return;
      }

      // 点上一张
      if (e.target === prevBtn) {
        // 将之前的if判断句缩减为三元计算
        index = index === 1 ? sliderData.length : index - 1;
        switchSlide(slider, index);
        return;
      }

      // 点下一张
      if (e.target === nextBtn) {
        index = index === sliderData.length ? 1 : index + 1;
        switchSlide(slider, index);
      }

    })
  })
  // 为案例二中的slider添加定时器效果
  // 没有发生点击事件或者点击后1s计时自动跳转
  const slider2 = document.querySelectorAll(".slider")[1]

  // 声明timer
  let timer = null;

  function nextTick() {
    // 设置倒计时切换图片的动作
    // 获取dom元素
    const ul2 = slider2.querySelector('ul');
    let index = [...ul2.children].findIndex(li => li.classList.contains('active')) + 1;
    let idx = index + 1 > sliderData.length ? 1 : index + 1;
    switchSlide(slider2, idx);
    setTimer();//采用递归
  }
  function setTimer() {
    //启动倒计时
    clearTimeout();
    timer = setTimeout(nextTick, 1000);
  };

  function stopTimer() {
    // 清除倒计时
    clearTimeout(timer);
  }
  /* 首次启动 */
  setTimer();

  // 监听点击事件
  slider2.addEventListener('click', (e) => {
    if (e.target.closest('button,li')) {
      stopTimer();
      setTimer();
    }
  })
})


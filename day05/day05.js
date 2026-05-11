const names = ["张三", "李四", "王五", "赵六", "田七", "孙八", "周九", "吴十"];
let isRolling = false;
let animationFrameId = null;
let currentPosition = 0;
let speed = 3; // 滚动速度（像素/帧）

// 案例三
let colorString = null;

function getRandomIntInclusive(min, max) {
  // floor()函数返回一个小于等于x的最大整数
  // ceil()返回大于等于给定数字的最小整数
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function getName() {
  const randomId = getRandomIntInclusive(0, names.length - 1);
  alert("请" + names[randomId] + "来回答以下这个问题");
}

// document.addEventListener("DOMContentLoaded", function () {
//   const nameholder = document.getElementById("nameselect");
//   nameholder.innerHTML = `<div class="name-item">${names[0]}</div>`;

// });

// function startRolling() {
//   if (isRolling) return;

//   const nameholder = document.getElementById("nameselect");

//   // 创建足够长的名字列表用于无缝滚动
//   const repeatedNames = [];
//   // 重复足够多次以确保滚动流畅
//   for (let i = 0; i < 3; i++) {
//     repeatedNames.push(...names);
//   }

//   nameholder.innerHTML = repeatedNames.map(name => `<div class="name-item">${name}</div>`).join("");

//   // 开始动画
//   nameholder.classList.add('rolling');
//   isRolling = true;
// }

// // 停止滚动并随机选择一个名字
// function stopRolling() {
//   if (!isRolling) return;

//   const nameholder = document.getElementById("nameselect");
//   nameholder.classList.remove('rolling');

//   isRolling = false;
//   // 随机选择一个名字
//   const randomIndex = Math.floor(Math.random() * names.length);
//   const selectedName = names[randomIndex];

//   // 显示选中的名字（重置位置到中间）
//   nameholder.innerHTML = `<div class="name-item">${selectedName}</div>`;
// }

function startRollingJS() {
  if (isRolling) return;

  const nameholder = document.getElementById("nameselect");
  const container = document.getElementById("name-container");

  // 创建重复的名字列表
  repeatedNames = [];
  // 重复3次以确保有足够的内容滚动
  for (let i = 0; i < 3; i++) {
    repeatedNames.push(...names);
  }

  nameholder.innerHTML = repeatedNames.map(name => `<div class="name-item">${name}</div>`).join("");

  // 重置位置到第一个名字
  currentPosition = 0;
  nameholder.style.transform = `translateY(${currentPosition}px)`;

  isRolling = true;

  // 动画函数
  function animate() {
    if (!isRolling) return;

    currentPosition -= speed;
    // 计算总高度
    const totalHeight = repeatedNames.length * 60; // 60px 每个名字

    // 我们需要确保总是在显示范围内
    if (Math.abs(currentPosition) >= totalHeight) {
      // 重置位置到起始位置
      currentPosition = 0;
      // 重新设置HTML，确保显示正确
      nameholder.innerHTML = repeatedNames.map(name => `<div class="name-item">${name}</div>`).join("");
      nameholder.style.transform = `translateY(${currentPosition}px)`;
    } else {
      nameholder.style.transform = `translateY(${currentPosition}px)`;
    }
    animationFrameId = requestAnimationFrame(animate);
  }
  animate();
}

function stopRollingJS() {
  if (!isRolling) return;

  isRolling = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const nameholder = document.getElementById("nameselect");

  // 根据当前位置计算当前显示的名字索引
  const currentIndex = Math.abs(Math.floor(currentPosition / 60)) % names.length;
  const selectedName = names[currentIndex];

  // 显示选中的名字
  nameholder.innerHTML = `<div class="name-item">${selectedName}</div>`;
  nameholder.style.transform = 'translateY(0)';
}

// 案例二
const num = getRandomIntInclusive(1, 10);
function right() {
  const input = document.querySelector("input");
  console.log(num);

  if (!Number(input.value) || parseInt(input.value) > 10 || parseInt(input.value) < 0) {
    alert("恭请输入正确的内容");
    console.log(1);

  } else {
    if (input.value == num) {

      alert("恭喜答对！");
    } else if (parseInt(input.value) < num) {

      alert("小了");
    } else if (parseInt(input.value) > num) {

      alert("大了");
    }

  }
}

function getRandomColor(flag) {
  const num1 = getRandomIntInclusive(0, 255);
  const num2 = getRandomIntInclusive(0, 255);
  const num3 = getRandomIntInclusive(0, 255);
  const string = "rgb(" + num1 + "," + num2 + "," + num3 + ")";
  if (flag === "sixteen") {
    return string;
  } else if (flag === "rgb") {
    return "#" + num1.toString(16) + num2.toString(16) + num3.toString(16)
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // 只能在初始化时获得一次
  const selectedRadio = document.querySelector('input[name="color"]:checked');
  if (selectedRadio.value) {
    colorString = getRandomColor(selectedRadio.value)
    console.log(colorString);
  }
})


function getcolor() {
  const selectedRadio = document.querySelector('input[name="color"]:checked');
  const colorDiv = document.getElementById("color");
  const colorText = document.getElementById("colortext");
  if (selectedRadio.value) {
    colorString = getRandomColor(selectedRadio.value);
    console.log(colorString);
    colorText.innerText = "颜色为：" + colorString;
    colorDiv.style.background = colorString;
  }
}

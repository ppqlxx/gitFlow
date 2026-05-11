// var money = 0.0;
// var tag = 0;


// function putMoney() {
//   // 获取输入值 + 转换为数字（容错：非数字返回 NaN）
//   var inputElement = document.getElementsByTagName("input")[1];
//   var howmuch = Number(inputElement.value.trim()); // trim() 去除首尾空格
//   console.log(money);

//   // 添加校验：非数字、数字
//   if (howmuch <= 0 || isNaN(howmuch)) {
//     alert("请输入正确的数字");
//     inputElement.value = "";//清空输入
//     return;
//   }
//   money += howmuch;
//   console.log(money, howmuch);

//   money = Math.round(money * 100) / 100;//取两位小数 用乘除取消其可能的影响
//   alert("存入成功");
//   inputElement.value = "";//清空输入
//   console.log("当前余额", money);
// }

// // 取钱函数
// function getMoney() {
//   var inputElement = document.getElementsByTagName("input")[1];
//   var howmuch = Number(inputElement.value.trim());

//   if (isNaN(howmuch) || howmuch < 0) {
//     alert("请输入正确的数字");
//     inputElement.value = "";
//     return;
//   } else if (howmuch > money) {
//     alert("余额不足");
//     inputElement.value = "";
//     return;
//   } else {
//     money -= howmuch;
//     money = Math.round(money * 100) / 100;
//     alert("取出成功");
//     console.log("当前余额为：", money);
//     inputElement.value = "";
//   }
// }

// function look() {
//   var inputElement = document.getElementsByTagName("input")[0];
//   if (tag === 0) {
//     inputElement.value = money;
//     console.log(money);
//     tag = 1;
//   }
//   else {
//     inputElement.value = "";
//     tag = 0;
//   }
// }

// function exit() {
//   money = 0;
//   console.log("退出当前账户");

// }

// document.addEventListener("DOMContentLoaded", function () {
//   // 定义更新时间的函数
//   function updateTime() {

//     const clockdiv = document.getElementsByClassName("clock");
//     var date = new Date();
//     var hours = Number(date.getHours()) < 10 ? '0' + date.getHours() : date.getHours();
//     var min = Number(date.getMinutes()) < 10 ? '0' + date.getMinutes() : date.getMinutes();
//     var sec = Number(date.getSeconds()) < 10 ? '0' + date.getSeconds() : date.getSeconds();

//     clockdiv[0].innerText = hours;
//     clockdiv[1].innerText = min;
//     clockdiv[2].innerText = sec;
//   }

//   // 初始执行一次，避免等待 1 秒才显示
//   updateTime();
//   // 每 1000 毫秒（1 秒）更新一次时间
//   setInterval(updateTime, 1000);
// })


// 也可以设置为多用户存储形式
const accounts = {
  users1: 100.0,
  users2: 200.0
};
//存储时转为json字符串
localStorage.setItem('atmAccounts', JSON.stringify(accounts));

// 读取时转为对象
const cachedAccounts = JSON.parse(localStorage.getItem('atmAccounts')) || "";
console.log(cachedAccounts.users1);

var tag = 1;//为1则不显示

// 采用localStorage实现余额存储
// 初始化余额：优先从localStorage读取，没有则默认0.0
let money = parseFloat(localStorage.getItem('atmMoney')) || 0.0;

function putMoney() {
  // 获取输入值 + 转换为数字（容错：非数字返回 NaN）
  // 从前面获得的dom元素用const接收
  const inputElement = document.getElementsByTagName("input")[0];
  const howmuch = Number(inputElement.value.trim()); // trim() 去除首尾空格
  console.log(money);

  // 添加校验：非数字、数字
  if (howmuch <= 0 || isNaN(howmuch)) {
    alert("请输入正确的数字");
    inputElement.value = "";//清空输入
    return;
  }
  money += howmuch;
  money = Math.round(money * 100) / 100;//取两位小数 用乘除取消其可能的影响
  saveMoneyToStorage(); // 同步缓存
  inputElement.value = "";//清空输入
  console.log("当前余额", money);
  tag = 0;
  updateDisplayMoney();

}

// 取钱函数
function getMoney() {
  var inputElement = document.getElementsByTagName("input")[0];
  var howmuch = Number(inputElement.value.trim());

  if (isNaN(howmuch) || howmuch < 0) {
    alert("请输入正确的数字");
    inputElement.value = "";
    return;
  } else if (howmuch > money) {
    alert("余额不足");
    inputElement.value = "";
    return;
  } else {
    money -= howmuch;
    money = Math.round(money * 100) / 100;
    saveMoneyToStorage(); // 同步缓存
    alert("取出成功");
    console.log("当前余额为：", money);
    inputElement.value = "";
    tag = 0;
    updateDisplayMoney();
  }
}

function look() {
  console.log(tag);

  if (tag === 0) {
    tag = 1;
    updateDisplayMoney();

  }
  else {
    tag = 0;
    updateDisplayMoney();

  }
}

function exit() {
  tag = 1;
  console.log(tag);
  saveMoneyToStorage(); // 同步缓存
  updateDisplayMoney();
  console.log("退出当前账户");

}

function updateDisplayMoney() {
  const moneyDom = document.getElementById("all");
  if (moneyDom && tag === 0) {
    console.log("这里是更新函数", tag);
    moneyDom.innerText = money.toFixed(2);//固定为两位小数
  }
  else {
    moneyDom.innerText = "***";
  }
}

// 缓存余额到localStorage
// localStorage中的存储形式为键值对嘛？
function saveMoneyToStorage() {
  localStorage.setItem('atmMoney', money.toString());
}

document.addEventListener("DOMContentLoaded", function () {
  // updateDisplayMoney();
  // 定义更新时间的函数
  function updateTime() {

    const clockdiv = document.getElementsByClassName("clock");
    var date = new Date();
    var hours = Number(date.getHours()) < 10 ? '0' + date.getHours() : date.getHours();
    var min = Number(date.getMinutes()) < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var sec = Number(date.getSeconds()) < 10 ? '0' + date.getSeconds() : date.getSeconds();

    clockdiv[0].innerText = hours;
    clockdiv[1].innerText = min;
    clockdiv[2].innerText = sec;
  }

  // 初始执行一次，避免等待 1 秒才显示
  updateTime();
  // 每 1000 毫秒（1 秒）更新一次时间
  setInterval(updateTime, 1000);
})



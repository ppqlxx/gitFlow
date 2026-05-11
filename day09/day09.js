const { createElement } = require("react");

document.addEventListener('DOMContentLoaded', function () {
  const timeBox = document.querySelectorAll(".time-box");

  // 时间对象
  const leaveTime = new Date('2027-06-01');
  setInterval(() => {
    const nowTime = new Date();
    let interval = (leaveTime - nowTime) / 1000;
    let day = parseInt((interval / 3600 / 24)) < 10 ? '0' + parseInt((interval / 3600 / 24)) : parseInt((interval / 3600 / 24));
    let hours = parseInt((interval / 3600 % 24)) < 10 ? '0' + parseInt((interval / 3600 % 24)) : parseInt((interval / 3600 % 24));
    let minutes = parseInt((interval / 60 % 60)) < 10 ? '0' + parseInt((interval / 60 % 60)) : parseInt((interval / 60 % 60));
    let seconds = parseInt(interval % 60) < 10 ? '0' + parseInt((interval % 60)) : parseInt((interval % 60));

    timeBox[0].innerText = day;
    timeBox[1].innerText = hours;
    timeBox[2].innerText = minutes;
    timeBox[3].innerText = seconds;
  }, 1000);

  // 案例二：结合parentNode属性实现关闭
  // const xs = document.querySelectorAll('.x');
  // xs.forEach(x => {
  //   x.addEventListener('click', function () {
  //     const box = x.parentNode;
  //     box.style.opacity = 0;
  //   })
  // })

  const xs = document.querySelectorAll('.x');

  xs.forEach(x => {
    x.addEventListener('click', function () {
      // 1. 先问用户
      const sure = confirm('确定要关闭二维码吗？');
      if (!sure) return;          // 点“取消”就啥也不干

      // 2. 拿到最外层卡片（再往上找一级）
      const card = x.closest(".box");
      if (!card) return;

      // 3. 平滑消失
      card.style.transition = 'opacity .3s';
      card.style.opacity = 0;

      // 4. 动画结束后把节点彻底删掉（不占位）
      card.addEventListener('transitionend', () => card.remove(), { once: true });
    });
  })

  const ulexp3 = document.getElementById("exp1");
  // 轮播图数据
  const sliderData = [
    { url: '../img/1.jpg', title: '对人类来说会不会太超前了？', color: 'rgb(100, 67, 68)' },
    { url: '../img/2.jpg', title: '开启剑与雪的黑暗传说！', color: 'rgb(43, 35, 26)' },
    { url: '../img/3.jpg', title: '真正的jo厨出现了！', color: 'rgb(36, 31, 33)' },
    { url: '../img/4.jpg', title: '李玉刚：让世界通过B站看到东方大国文化', color: 'rgb(139, 98, 66)' },
    { url: '../img/5.jpg', title: '快来分享你的寒假日常吧', color: 'rgb(67, 90, 92)' },
    { url: '../img/6.jpg', title: '哔哩哔哩小年YEAH', color: 'rgb(166, 131, 143)' },
  ];
  for (let i = 0; i < sliderData.length; i++) {
    let li = document.createElement('li');
    let img = document.createElement('img');
    let span = document.createElement('span');
    img.src = sliderData[i].url;
    span.textContent = sliderData[i].title;
    ulexp3.appendChild(li);
    li.appendChild(img);
    li.appendChild(span);
  }

  const btn = document.querySelector("button");
  const name = document.querySelector("#name");
  const age = document.querySelector("#age");
  const gender = document.querySelector("#gender");
  const cost = document.querySelector("#cost");
  const city = document.querySelector("#city");
  const tbody = document.querySelector("tbody");

  console.log(tbody);

  btn.addEventListener("click", function (e) {
    if (name.value && age.value && cost.value) {
      const stu = {
        name: name.value,
        age: age.value,
        gender: gender.value,
        cost: cost.value,
        city: city.value
      }
      const tr = createElement("tr");
      tbody.appendChild(tr);
      for (let i = 0; i < 5; i++) {
        const td = createElement("td");
        tr.appendChild(td);
      }
      td[0].textContent = stu.name;
      td[1].textContent = stu.age;
      td[2].textContent = stu.gender;
      td[3].textContent = stu.cost;
      td[4].textContent = stu.city;

    }
    else {
      alert("不能为空");
    }
  });
})
// const names = ["张三", "李四", "王五", "赵六", "田七", "孙八", "周九", "吴十"];
// let timer;
// let randomName;
// // 初始化界面
// document.addEventListener("DOMContentLoaded", function () {
//   // 获得DOM元素
//   const name = document.querySelector(".name");
//   name.innerHTML = getRandomName(names);
// })
// // 获得随机名字
// function getRandomName(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function start() {
//   // 获得DOM元素
//   const name = document.querySelector(".name");
//   const btn = document.querySelectorAll("button")[0];
//   btn.disabled = true;

//   // 防抖 每次点击后都重新开始这个timer计时
//   if (timer) clearInterval(timer);

//   timer = setInterval(function () {
//     // 获得随机名字
//     name.innerHTML = getRandomName(names);
//   }, 1000);

// }


// function end() {
//   const btn = document.querySelectorAll("button");
//   const rightName = document.querySelector(".name").innerHTML;
//   document.querySelector(".name").innerHTML = rightName;

//   clearInterval(timer);
//   timer = null; // 停止后重置为 null，方便下次 start 判断
//   const resultName = document.querySelector(".name").innerHTML;
//   const idx = names.indexOf(resultName);

//   if (idx !== -1) {
//     names.splice(idx, 1);
//     console.log(`抽中并移除: ${resultName}, 剩余: ${names.length}人`);
//   }

//   // 3. 扫尾工作
//   if (names.length <= 1) {
//     btn.forEach(b => b.disabled = true);
//   } else {
//     btn[0].disabled = false;
//   }

// }
/* ===== 数据 ===== */
const names = ["张三", "李四", "王五", "赵六", "田七", "孙八", "周九", "吴十"];
let timer = null;            // 计时器句柄
let timer2 = null;
/* ===== 元素 ===== */

document.addEventListener('DOMContentLoaded', (e) => {
  // 案例一
  const nameBox = document.querySelector('.name');
  nameBox.textContent = getRandomName(names);

  // 案例2
  const img = document.querySelector('img');
  // 初始化状态
  document.querySelectorAll(".slider").forEach((slider, cardIdx) => {
    switchSlide(slider, 1);
  });
  timer2 = getInterval();

  // 事件委托给整个slider
  // const slider1 = document.querySelector('.slider');
  // slider1.addEventListener('click', function (e) {
  // 统一点击委托事件 可适用于多个卡片中的slider
  document.querySelectorAll(".show").forEach(wrapper => {
    wrapper.addEventListener("click", function (e) {
      const slider = e.target.closest('.slider');   // 当前卡片根节点
      if (!slider) return;
      const ul = document.querySelector('ul');
      const prevBtn = this.querySelector('#preBtn');
      const nextBtn = this.querySelector('#nextBtn');

      // 获得当前被active的点
      let index = [...ul.children].findIndex(li => li.className === 'active') + 1;

      // 未发生点击？
      if (!this) return;
      // 如果是点击的slider-li 遍历获得对应被点击的li
      if (e.target.tagName === 'LI') {
        index = Array.from(ul.children).indexOf(e.target) + 1;
        switchSlide(this, index);
        return;
      }

      if (e.target === prevBtn) {
        // 上一张
        index = index === 1 ? ul.children.length : index - 1;
        switchSlide(this, index);
        return;
      }

      if (e.target === nextBtn) {
        // 下一张
        index = index === ul.children.length ? 1 : index + 1;
        switchSlide(this, index);
        return;
      }

    })
  });

  // 为卡片添加悬停事件
  // 统一点击委托事件 可适用于多个卡片中的slider
  const slider1 = document.querySelector('.slider');

  slider1.addEventListener('mouseenter', function (e) {
    console.log(e);
    clearInterval(timer2);
    timer2 = null;
  });
  slider1.addEventListener("mouseleave", function (e) {
    console.log(e);
    if (timer2) { clearInterval(timer2); timer2 = null; }
    timer2 = getInterval();
  })


  // 案例三
  const textarea = document.querySelector('textarea');
  const countSpan = document.querySelector('.input-box span');

  textarea.addEventListener("input", function () {

    if (textarea.value.length > 200) {
      textarea.value = textarea.value.slice(0, 200);
      alert("注意字数");
    }
    // 2. 计数（换行当空格算，可选）
    // 用正则先对字符串预处理
    const len = textarea.value.replace(/\n/g, ' ').length;
    countSpan.innerText = `${len}/200`;
  });
  // 案例四
  const btn2 = document.querySelector('#submit2');
  const textarea2 = document.querySelector('#txt2');
  const countSpan2 = document.querySelector('.chatbox span');
  render();
  textarea2.addEventListener('focus', function () {
    textarea2.style.background = "var(--card)";
  });
  textarea2.addEventListener('blur', function () {
    e.preventDefault();
    textarea2.style.background = "transparent";
  });
  textarea2.addEventListener("input", function () {
    if (textarea2.value.length > 200) {
      textarea2.value = textarea2.value.slice(0, 200);
      alert("注意字数");
    }
    // 2. 计数（换行当空格算，可选）
    // 用正则先对字符串预处理
    const len = textarea2.value.replace(/\n/g, ' ').length;
    countSpan2.innerText = `${len}/200`;
  });

  textarea2.addEventListener('keydown', function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      publish();
    }
  });
  btn2.addEventListener('submit', function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      publish();
    }
  });
  function publish() {
    const textarea2 = document.querySelector('#txt2');
    const txt = textarea2.value.trim();
    if (!txt) return;
    const comments = getComments();

    comments.unshift({ text: txt, time: Date.now() });
    saveComments(comments);
    textarea2.value = '';
    countSpan2.textContent = '0 / 200';
    render();
  };
  function render() {
    const comments = getComments();
    const list = document.querySelector('.chatbox ul');

    list.innerHTML = comments.slice(0, 5).map((c, i) => {
      return ` <li class="item">
    <div class="item-header">
      <div class="avatar">U</div> `+
        `<span class="name">匿名用户</span>
      <span class="time">${format(c.time)}</span>
    </div>
    <div class="content">${escapeHtml(c.text)}</div>
  </li>`;
    }).join('');

  }

  function getComments() {
    try { return JSON.parse(localStorage.getItem('commentsList')) || []; }
    catch { return []; }
  };
  function saveComments(comments) {
    localStorage.setItem('commentsList', JSON.stringify(comments));
  };
  function format(timestamp) {
    const d = new Date(timestamp);
    const pad = n => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  // 工具
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }
});





/* ===== 工具 ===== */
const getRandomName = arr => arr[Math.floor(Math.random() * arr.length)];

/* 抽离：随机写屏 */
function draw() {
  const nameBox = document.querySelector('.name');
  nameBox.textContent = getRandomName(names);
}

/* ===== 开始 ===== */
function start() {
  if (timer) return;                // 防止重复启动
  document.querySelector('.show button').disabled = true; // 禁用“开始”
  document.querySelector('#startBtn').className = 'stop';
  timer = setInterval(draw, 500);    // 50 ms ≈ 20 次/秒，可调
}

/* ===== 结束 ===== */
function end() {
  const nameBox = document.querySelector('.name');
  if (!timer) return;
  clearInterval(timer);
  timer = null;

  draw();
  const winner = nameBox.textContent;
  names.splice(names.indexOf(winner), 1);
  console.log(`抽中并移除：${winner}，剩余：${names.length}人`);

  /* 按钮状态 */
  const [startBtn, endBtn] = document.querySelectorAll('.show button');
  if (names.length <= 1) {
    startBtn.disabled = true;
    endBtn.disabled = true;
    document.querySelector('#startBtn').className = 'stop';
    document.querySelector('#endBtn').className = 'stop';
  } else {
    startBtn.disabled = false;
    document.querySelector('#startBtn').className = 'button';

  }
}

/* ===== 封装切换逻辑 ===== */
function switchSlide(slider, idx) {
  const img = slider.querySelector('img');
  const ul = slider.querySelector('ul');
  // 先去除已经active的
  ul.querySelectorAll('li.active').forEach(li => li.classList.remove('active'));
  ul.children[idx - 1].classList.add('active');
  img.src = "../img/" + (idx) + ".jpg";
}

function getInterval() {
  // 添加定时器定时播放
  return setInterval(function () {
    // 获得当前被active的点
    const ul = document.querySelector('ul');
    const slider = document.querySelector('.slider');
    let index = [...ul.children].findIndex(li => li.className === 'active') + 1;
    switchSlide(slider, index + 1 > ul.children.length ? 1 : index + 1);
  }, 1000);
}
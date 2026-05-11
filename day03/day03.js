// var arr = [5, 1, 2, 7, 3];
// var pElement = document.getElementsByTagName("p");
// var stoptag = 1;
// document.addEventListener("DOMContentLoaded", function () {
//   var show = this.getElementsByClassName("show");



//   // 即使设置0ms，也会让浏览器有机会重新渲染
//   setTimeout(() => {
//     var i, j, context = "";
//     for (i = 1; i <= 9; i++) {
//       for (j = 1; j <= i; j++) {

//         str = `${i} * ${j} = ${i * j}&nbsp;&nbsp;`;
//         context += str;
//       }
//       context += "<br>";
//     }
//     show[0].innerHTML = context;
//   }, 0);

//   for (i = 0; i < arr.length; i++) {
//     pElement[i].innerHTML = arr[i];
//   }

// })

// function bubbleSort(arr) {
//   var i, j, temp;
//   for (i = 0; i < arr.length; i++) {
//     temp = arr[i];
//     for (j = i; j < arr.length; j++) {
//       if (arr[i] > arr[j]) {
//         temp = arr[i];
//         arr[i] = arr[j];
//         arr[j] = temp;
//       }
//     }
//     setTimeout(() => {
//       var k;
//       for (k = 0; k < arr.length; k++) {
//         pElement[k].innerHTML = arr[k];
//       }
//       console.log(arr);

//     }, 3000)
//   }
// }

// function clac() {
//   bubbleSort(arr);
// }

//方法1：将第二个循环放在setTimeout函数中
// function bubbleSort(arr) {
//   var i, j, temp;
//   for (i = 0; i < arr.length; i++) {
//     setTimeout(() => {
//       temp = arr[i];
//       for (j = i; j < arr.length; j++) {
//         if (arr[j + 1] > arr[j]) {
//           temp = arr[j + 1];
//           arr[j + 1] = arr[j];
//           arr[j] = temp;
//         }
//       }
//       for (i = 0; i < arr.length; i++) {
//         pElement[i].innerHTML = arr[i];
//       } i
//       console.log(arr);
//     }, 1000)
//   }
// }

// function clac() {
//   bubbleSort(arr);
// }


//////////
// 方案2
var arr = [5, 1, 2, 7, 3];
var pElement = document.getElementsByTagName("p");
//其实就是将计算的中间结果存储在step中，然后用时间函数分时显示
// var steps = [];// 存储排序步骤
// var currentStepIndex = 0; // 当前步骤索引
// var isParsed = true;
// var timeId = null;//定时器

// 将上述内容存储到动画全局变量中
var animationState = {
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  timeouts: []
};

document.addEventListener("DOMContentLoaded", function () {
  var show = this.getElementsByClassName("show");

  // 渲染显示99乘法表 即使设置0ms，也会让浏览器有机会重新渲染
  setTimeout(() => {
    var i, j, context = "";
    for (i = 1; i <= 9; i++) {
      for (j = 1; j <= i; j++) {

        str = `${i} * ${j} = ${i * j}&nbsp;&nbsp;`;
        context += str;
      }
      context += "<br>";
    }
    show[0].innerHTML = context;
  }, 0);

  // 初始化显示初始数组
  for (i = 0; i < arr.length; i++) {
    pElement[i].innerHTML = arr[i];
  }

})

// 方法2：使用闭包保存状态
function bubbleSort(arr) {

  animationState.steps = [];
  animationState.currentStepIndex = 0;
  animationState.isPlaying = true;
  animationState.timeouts = [];

  // 记录排序步骤 直接完成全部的排序
  var tempArr = [...arr];

  for (var i = 0; i < tempArr.length; i++) {
    for (var j = 0; j < tempArr.length - i - 1; j++) {
      if (tempArr[j] > tempArr[j + 1]) {
        var temp = tempArr[j];
        tempArr[j] = tempArr[j + 1];
        tempArr[j + 1] = temp;
        // 保存当前状态（深拷贝）
        animationState.steps.push([...tempArr]);
      }
    }
  }

  // 开始动画
  startAnimation();
}

function startAnimation() {
  //清除之前的计时器 完成隐形操作：无论之前可能在什么时候暂停过都要将其进行清空
  clearAllTimeouts();

  // 从当前步骤开始播放
  for (var i = animationState.currentStepIndex; i < animationState.steps.length; i++) {
    var timeoutID = setTimeout(createStepHandler(i), 1000 * (i - animationState.currentStepIndex + 1));
    animationState.timeouts.push(timeoutID);
  }
}

// 创建开始动画的动作
function createStepHandler(stepIndex) {
  return function () {
    if (!animationState.isPlaying) return;

    var step = animationState.steps[stepIndex];
    for (var k = 0; k < step.length; k++) {
      if (pElement[k]) {
        pElement[k].innerHTML = step[k];
        // 额外添加一些动画的特效
        pElement[k].style.backgroundColor = "#ffeb3b";

        // 使用闭包保存当前的K值
        (function (currentK) {
          setTimeout(() => {
            pElement[currentK].style.backgroundColor = "";
          }, 500);
        })(k);
      }
    }
    animationState.currentStepIndex = stepIndex + 1;

    //如果是最后一步，则还需要重置状态
    if (stepIndex === animationState.steps.length - 1) {
      animationState.isPlaying = false;
    }
  };
}

function clearAllTimeouts() {
  // 清空计时器
  animationState.timeouts.forEach(timeoutID => {
    // 内置函数
    clearTimeout(timeoutID);
  });
  animationState.timeouts = [];
}

function clac() {
  if (!animationState.isPlaying) {
    resetAnimation(); // 开始前确保重置
    // 每次开始演示就存在了重置的隐形操作
    bubbleSort(arr);
  }
}

function stopclac() {
  if (animationState.isPlaying) {
    // 暂停动画
    animationState.isPlaying = false;
    console.log("动画已暂停，当前步骤为：", animationState.currentStepIndex);

  }
  else {
    //继续播放
    animationState.isPlaying = true;
    startAnimation();
    console.log("动画继续播放，从步骤：", animationState.currentStepIndex, "开始");
  }
}

function resetAnimation() {
  // 重置动画
  clearAllTimeouts();
  animationState.steps = [];
  animationState.currentStepIndex = 0;
  animationState.isPlaying = false;

  //恢复原始数组的显示
  for (var i = 0; i < arr.length; i++) {
    pElement[i].innerHTML = arr[i];
    pElement[i].style.backgroundColor = "";
  }
  console.log("动画已经重置");
}


//方法3：异步函数实现逐步显示 但是这样不便于实现真正的暂停
// async function bubbleSort(arr) {

//   for (var i = 0; i < arr.length; i++) {
//     var tag = 0;
//     for (var j = 0; j < arr.length - i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         tag = 1;
//         var temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;

//         // 更新显示
//         updateDisplay(arr);

//         //等待一段时间
//         await sleep(1000);
//       }
//     } if (tag === 0) {
//       alert("序列为有序");
//       break;
//     }
//   }

// }

// function updateDisplay(arr) {
//   for (var i = 0; i < arr.length; i++) {
//     if (pElement[i]) {
//       pElement[i].innerHTML = arr[i];
//     }
//   }
// }

// function sleep(ms) {
//   return new Promise(reslove => { setTimeout(reslove, ms) });
// }

// function clac() {
//   bubbleSort(arr);
// }




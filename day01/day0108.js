


function tip() {
  var name = prompt("请输入姓名");
  console.log(name);
  //它属于早期的 DOM 相关操作，但不是现代推荐的 “标准 DOM 元素操作”（标准操作是 “找具体元素改内容”）
  //会破坏页面结构
  //document.write(name)
  return name;
}

function swap(obj1, obj2) {
  var temp;

  temp = obj1.value;
  obj1.value = obj2.value;
  obj2.value = temp;

}

function confirm() {
  return shopname, sum, price, address;
}


// 1、这里注意函数调用的顺序以及生命周期
// 这里给DOM元素绑定事件监听器方法
// 绑定的事件类型是页面加载完成
// load页面所有资源加载完成 触发时机较晚，适合需要依赖所有资源的场景；
// beforeunload页面即将被卸载 可通过 event.returnValue 弹出确认提示（浏览器可能限制，用于防止误操作）
// unload页面已经开始卸载通常用于清理资源（如断开网络连接），但执行时间有限，不建议做复杂操作；
// 当文档的 readyState 属性变化 时（loading→interactive→complete） readystatechange当文档的readyState属性变化时

//2、注意数据类型的转换
document.addEventListener('DOMContentLoaded', function () {
  let shopname = prompt("请输入购买商品");
  let address = prompt("请输入收获地址");
  let num, price;
  // 用 + 转换（简洁写法）
  // let price = +prompt("请输入商品价格");

  // 等价于用 Number() 转换（更直观的写法）
  // let price = Number(prompt("请输入商品价格"));
  // 两种写法效果完全一致，都是将字符串转为数字。如果用户输入非数字（如 “abc”），转换后会得到 NaN（Not a Number），方便后续验证有效性（比如 if (isNaN(price)) { ... }）
  do {
    // 输入价格并转换为数字
    let priceStr = prompt("请输入商品价格：") || "";
    price = parseFloat(priceStr);
    // 输入数量并转换为整数
    let numStr = prompt("请输入购买的数量：") || "";
    num = parseInt(numStr, 10);
    // 如果价格或数量无效，提示重新输入
    if (isNaN(price) || isNaN(num) || num < 1 || price < 0) { // 数量至少为1
      alert("请输入正确的数字（价格为正数，数量为正整数）！");
    }
  } while ((isNaN(price) || isNaN(num) || num < 1 || price < 0));
  let sum = price * num;
  document.getElementById("Shopname").innerText = shopname;
  document.getElementById("Price").innerText = price + "元";
  document.getElementById("Num").innerText = num;
  document.getElementById("Address").innerText = address;
  document.getElementById("Sum").innerText = sum + "元";

})
// arr1 = [2, 0, 6, 1, 77, 0, 52, 0, 25, 7];
// arr2 = [];
// var i = 0;
// for (i; i < arr1.length; i++) {
//     if (arr1[i] >= 10) {
//         arr2[arr2.length++] = arr1[i];
//     }
// }
// for (i = 0; i < arr2.length; i++) {
//     console.log(arr2[i]);
// }

//冒泡排序
// var arr = [2, 0, 6, 1, 77, 52, 25, 7];
// var i = 0, j = 0, temp = 0;
// var flag = 0;
// for (i = arr.length - 1; i > 0; i--) {
//     for (j = 0; j <= i; j++) {
//         if (arr[j] > arr[j + 1]) {
//             temp = arr[j + 1];
//             arr[j + 1] = arr[j];
//             arr[j] = temp;
//             flag = 1;
//         }
//         if (flag == 0) break;
//     }
// }
// for (i = 0; i < arr.length; i++)console.log(arr[i]);

// function 函数名() {
//     //函数体
// }

// function add() {
//     var i = 1, res = 0;
//     for (; i <= 100; i++) {
//         res += i;
//     }
//     return res;
// }
// console.log(add());

// 利用函数求任意个数的最大值
// function max() {
//     var max = arguments[0];
//     console.log(max);
//     for (var i = 0; i < arguments.length; i++) {
//         if (max < arguments[i]) { max = arguments[i]; }
//     }
//     return max;
// }
// console.log(max(1, 2, 3, 4));

//函数封装冒泡排序
// function maopao(arr) {
//     var i = 0, j = 0, temp = 0;
//     var flag = 0;
//     for (i = arr.length - 1; i > 0; i--) {
//         for (j = 0; j <= i; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 temp = arr[j + 1];
//                 arr[j + 1] = arr[j];
//                 arr[j] = temp;
//                 flag = 1;
//             }
//             if (flag == 0) break;
//         }
//     }
//     return arr
// }
// var arr = [2, 0, 6, 1, 77, 52, 25, 7];
// console.log(maopao(arr));

//利用函数翻转函数
// function reverse(arr) {
//     var newarr = [];
//     for (var i = 0; i <= arr.length; i++)
//         newarr[i] = arr[arr.length - i];
//     return newarr;
// }
// var arr = [2, 0, 6, 1, 77, 52, 25, 7];
// console.log(reverse(arr));

//利用函数判断闰年
// function judge(year) {
//     if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0))
//         return true;
//     else return false;
// }
// console.log(judge(2100));

// console.log(num);
// var num = 10;//输出结果为undefined
// // 相当于执行以下代码
// var num;
// console.log(num);
// num = 10;

// var num = 10;
// fun();
// function fun() {
//     console.log(num);
//     var num = 20;
// }
// // 相当于执行以下代码
// var num;
// function fun() {
//     console.log(num);
//     var num = 20;
// }
// num = 10;
// fun();

// var num = 10;
// function fn() {
//     console.log(num);
//     var num = 20;
//     console.log(num);
// }
// fn();

// var a = 10;
// f1();
// function f1() {
//     var b = 9;
//     console.log(a);
//     console.log(b);
//     var a = '123';
// }


// function f1() {
//     var a = b = c = 9;
//     // 相当于var a=9;b=9;c=9;b和c直接赋值没有var声明当全局变量看
//     // 集体声明var a=9,b=9,c=9;
//     console.log(a);
//     console.log(b);
//     console.log(c);
// }
// f1();

// console.log(b);
// console.log(c);
// console.log(a);

// 创建对象
// var obj = {
//     uname: 'aaa',
//     age: 18,
//     sex: 'male',
//     sayHi: function () {
//         console.log('hi');
//     }
// }
// 创建对象
// var obj2 = new Object();
// obj2.uname = 'bb';
// obj2.age = 18;
// obj2.sex = 'female';
// obj2.sayHi = function () {
//     console.log('hi');
// }

// 构造函数的语法规范
// function 构造函数名() {
//     this.属性 = 值;
//     this.方法 = function () { };
// }
// new 构造函数名();

// function Star(name, age, sex) {
//     this.name = name;
//     this.age = age;
//     this.sex = sex;
//     this.print = function (song) {
//         console.log(song);
//     };
// }
// var liu = new Star('liu', 18, 'male');
// liu.print('ai~');
// for (变量 in 对象) {

// }
// for (var k in liu) {
//     console.log(k);//k变量输出的是属性名
//     console.log(liu[k]);//输出的是属性值
// }
// var uname = ['a', 'b', 'c', 'd'];
// function getRandomIntInclusive(min, max) {
//     const minCeiled = Math.ceil(min);
//     const maxFloored = Math.floor(max);
//     return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 包含最小值和最大值
// }
// console.log(uname[getRandomIntInclusive(0, uname.length - 1)]);
// console.log(Math.floor(1.1));

//时间戳转换公式
// function conutDown(time) {
//     var nowTime = +new Date();
//     var inputTime = +new Date(time);
//     console.log(nowTime);
//     console.log(inputTime);
//     var timeres = (inputTime - nowTime) / 1000;
//     var d = parseInt(timeres / 60 / 60 / 24);//天数
//     var h = parseInt(timeres / 60 / 60 % 24);//小时
//     var m = parseInt(timeres / 60 % 60);//分钟
//     var s = parseInt(timeres % 60);//秒数
//     console.log(d + '天' + h + '时' + m + '分' + s + '秒');
// }
// conutDown('2024-3-4 20:52:00');

// var uname = ['a', 'b', 'c', 'd'];
// console.log(uname instanceof Array);
// console.log(Array.isArray(uname));

// var uname = ['a', 'b', 'c', 'd'];
// console.log(uname.push('e'));
// console.log(uname);
// console.log(uname.unshift('e'));
// console.log(uname);

// var arr = [1500, 1200, 2000, 2100, 1800];
// var newArr = [];
// for (var i = 0; i < arr.length; i++) {
//     if (arr[i] < 2000) {
//         //newArr[newArr.length] = arr[i];
//         newArr.push(arr[i]);
//     }
// }
// console.log(newArr);


// //sort函数的使用
// var arr1 = [13, 4, 1, 7, 77];
// console.log(arr1.sort());
// //[1, 13, 4, 7, 77]

// var arr2 = [13, 4, 1, 7, 77];
// arr2.sort(function (a, b) {
//     return a - b;//升序顺序排序
// })
// console.log(arr2);
// //[1, 4, 7, 13, 77]

// var arr3 = [13, 4, 1, 7, 77];
// arr3.sort(function (a, b) {
//     return b - a;//降序顺序排序
// })
// console.log(arr3);
// // [77, 13, 7, 4, 1]

//索引
// var arr1 = [13, 4, 1, 7, 77];
// console.log(arr1.indexOf(7));

//去重案例
// function unique(arr) {
//     var newArr = [];

//     for (var i = 0; i < arr.length; i++) {
//         if (newArr.indexOf(arr[i]) == -1) {
//             newArr.push(arr[i]);
//         }
//     }
//     return newArr;
// }
// var arr = ['c', 'a', 'z', 'z', 'x', 'c', 'b'];
// console.log(unique(arr));

//join转换字符串
// var arr1 = ['green', 'red', 'pink'];
// console.log(arr1.join());//green,red,pink
// console.log(arr1.join('-'));//green-red-pink
// console.log(arr1.join(','));//green,red,pink

// var str = 'abcoefoxyozzopp';
// for (var i = 0; str.indexOf('o', i) != -1; i++) {
//     if (str[i] === 'o') {
//         console.log('第' + (i + 1) + 'o\n');
//     }
// }
// var index = str.indexOf('o');
// while (index != -1) {
//     console.log(index + 1);
//     index = str.indexOf('o', index + 1);
// }

//统计出现最多的数据
// var str = 'abcoefoxyozzopp';
// var o = {};
// for (var i = 0; i < str.length; i++) {
//     var chars = str.charAt(i);//chars为字符串中的每一个字符
//     if (o[chars]) {//o[chars]得到的是属性值

//         o[chars]++;
//     } else {
//         o[chars] = 1;
//     }
// }
// var max = 0;
// for (var j in o) {
//     if (max < o[j]) {
//         max = o[j];
//     }
// }
// console.log(max);

//split函数
// var str = 'green, red, pink';
// console.log(str.split(','));


// var f = document.getElementById('fff');
// console.log(f);
// console.dir(f.id);
// var li = document.getElementsByTagName('li');
// var oli = document.getElementsByTagName('ol');
// var ol = document.getElementById('ol');
// console.log(li);
// console.log(oli[0].getElementsByTagName('li'));
// console.log(oli[1].getElementsByTagName('li'));
// console.log(ol.getElementsByTagName('li'));
// console.log(document.getElementsByClassName('ul'));
// console.log(document.querySelector('.ul'));. 自动识别为类选择器
// var btn = document.getElementById('btn');
// btn.onclick = function () {
//     alert('wow');
// }

// var div = document.getElementById('fff')
// var btn = document.querySelector('button');
// div.innerText = '123';
// btn.onclick = function () {
//     var nowtime = new Date();
//     div.innerText = '<strong>今天</strong>' + nowtime.getDate();
//     div.innerHTML = '<strong>今天</strong>' + nowtime.getDate();
// }

// var zh = document.getElementById('zh');
// var pwd = document.getElementById('pwd');
// var btn = document.getElementById('btn');
// var yan = document.getElementById('yan');
// yan.onclick = function () {
//     if (pwd.type == 'password') {
//         pwd.type = 'text';
//     }
//     else {
//         pwd.type = 'password';
//     }
// }
// pwd.onfocus = function () {
//     pwd.value = '';
// }



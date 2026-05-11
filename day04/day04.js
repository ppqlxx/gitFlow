// 秒数转换函数
function convertSeconds() {
  // 获取输入的秒数
  const input = document.getElementById('inputSeconds');
  const result = document.getElementById('result');
  const seconds = parseInt(input.value);

  // 验证输入
  if (isNaN(seconds) || seconds < 0) {
    result.textContent = '请输入有效的非负数字！';
    result.style.color = '#e53e3e'; // 错误文字红色
  } else {
    // 计算时分秒
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainSeconds = seconds % 60;
    // 拼接结果
    result.textContent = `${hours} 小时 ${minutes} 分钟 ${remainSeconds} 秒`;
    result.style.color = '#2d3748'; // 正常文字颜色
  }

  // 显示结果动效
  result.classList.add('show-result');
  // 输入框失焦
  input.blur();
}

// 输入框按回车触发转换
document.getElementById('inputSeconds').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    convertSeconds();
  }
});
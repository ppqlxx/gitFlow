document.addEventListener('DOMContentLoaded', function () {
  const checkall = document.querySelectorAll('tbody input');
  const overall = document.querySelector("#all");
  let num = 0;

  for (const c of checkall) {
    c.addEventListener('change', function () {
      Display(c);
    });
  }

  overall.addEventListener('change', function () {
    if (overall.checked) {
      checkall.forEach(c => {
        c.checked = true;
      });
    }
    else if (!overall.checked) {
      checkall.forEach(c => {
        c.checked = false;
      });
    }
  });

  function Display(c) {
    if (c.checked) {
      num++;
    } else {
      num--;
    }
    // 全选未被选中时各个分点的状态
    if (num === checkall.length) { overall.checked = true; overall.indeterminate = false; }
    else if (num === 0) { overall.checked = false; overall.indeterminate = false; }
    else {
      overall.checked = false;
      overall.indeterminate = true;
    }
    console.log(num);

  };
});
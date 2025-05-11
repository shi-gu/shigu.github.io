// copy-notify.js
document.addEventListener('DOMContentLoaded', function() {
  // 初始化 Clipboard.js（需要给复制按钮添加 data-clipboard-text 属性）
  const clipboard = new ClipboardJS('[data-clipboard-text]');
  
  // 复制成功时触发通知
  clipboard.on('success', function(e) {
    showCopyNotification();
    e.clearSelection();
  });
  
  // 复制失败时触发通知（通常是浏览器兼容性问题）
  clipboard.on('error', function() {
    showCopyFallback();
  });
  
  // 传统复制检测（针对无按钮的普通复制）
  document.addEventListener('copy', function(e) {
    const selection = window.getSelection().toString();
    if (selection.length > 50) { // 只在复制较长内容时触发
      setTimeout(() => {
        showCopyNotification();
      }, 300);
    }
  });
  
  // 显示复制成功通知
  function showCopyNotification() {
    // 检查 Vue 和 Element UI 是否已加载
    if (window.Vue && window.ELEMENT) {
      // 创建一个 Vue 实例来使用 Element UI 的通知组件
      new Vue({
        created() {
          this.$notify({
            title: '哎嘿！复制成功',
            message: '若要转载最好保留原文链接哦，给你一个大大的赞！',
            position: 'top-left',
            offset: 50,
            type: 'success',
            duration: 5000
          });
        }
      });
    }
  }
  
  // 复制失败的备选方案（使用原生 alert）
  function showCopyFallback() {
    alert('复制成功！若要转载最好保留原文链接哦~');
  }
});

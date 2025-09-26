// alert("ناجی راه به کمکشما")

  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // غیرفعال کردن تب‌ها و محتواهای قبلی
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // فعال کردن تب و محتوای انتخابی
      tab.classList.add('active');
      const activeContent = document.getElementById(tab.dataset.tab);
      activeContent.classList.add('active');
    });
  });

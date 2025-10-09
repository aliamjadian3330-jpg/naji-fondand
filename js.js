

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

// ...................................................
  const toggleBtn = document.querySelector('.support-toggle');
const supportPanel = document.querySelector('.support-panel');
const closeBtn = document.querySelector('.close-btn');

toggleBtn.addEventListener('click', () => {
  supportPanel.style.display = supportPanel.style.display === "flex" ? "none" : "flex";
});

closeBtn.addEventListener('click', () => {
  supportPanel.style.display = "none";
});


const cards = document.querySelectorAll('.why-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y-centerY)/centerY)*10;
    const rotateY = ((x-centerX)/centerX)*10;

    card.style.setProperty('--rx', `${-rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--x', `${(x/rect.width)*100}%`);
    card.style.setProperty('--y', `${(y/rect.height)*100}%`);
  });

  card.addEventListener('mouseleave', ()=>{
    card.style.setProperty('--rx','0deg');
    card.style.setProperty('--ry','0deg');
    card.style.setProperty('--x','50%');
    card.style.setProperty('--y','50%');
  });
});




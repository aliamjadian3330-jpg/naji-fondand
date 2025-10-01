// جایگزین کن با URL سرور واقعی خودت
const SERVER_URL = "https://YOUR_SERVER_URL_HERE";
const socket = io("https://naji-backend.onrender.com");

// فرض می‌کنیم راننده وقتی درخواست می‌دهد، این صفحه باز شده است
// و requestId از سرور دریافت شده
let requestId = localStorage.getItem("requestId"); // یا از query string

if (!requestId) {
  alert("شناسه درخواست پیدا نشد!");
} else {
  // وقتی درخواست ایجاد شد
  socket.on('requestCreated', (data) => {
    if(data.requestId === requestId){
      document.getElementById('waiting').style.display = 'block';
    }
  });

  // وقتی یدک‌کش قبول کرد
  socket.on('requestUpdate', (data) => {
    if(data.requestId !== requestId) return;

    if (data.status === 'accepted') {
      document.getElementById('waiting').style.display = 'none';
      document.getElementById('accepted').style.display = 'block';
      // می‌توان اینجا ریدایرکت کرد به صفحه بعد
      // window.location.href = "/next-step.html";
    }

    if (data.status === 'rejected') {
      document.getElementById('waiting').style.display = 'none';
      document.getElementById('rejected').style.display = 'block';
    }
  });

  // وقتی درخواست منقضی شد یا بسته شد
  socket.on('requestClosed', (data) => {
    if(data.requestId !== requestId) return;
    document.getElementById('waiting').style.display = 'none';
    document.getElementById('rejected').style.display = 'block';
  });
}

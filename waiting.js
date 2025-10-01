<script src="/socket.io/socket.io.js"></script>
  const socket = io("https://naji-backend.onrender.com"); // آدرس سرور شما

  // وقتی راننده درخواست می‌فرسته، درخواست ساخته میشه
  socket.emit('requestService', {
    origin: { lat: 35.7, lng: 51.4 },
    dest: { lat: 35.8, lng: 51.5 },
    driverInfo: { fullName: "علی", phone: "0912xxxxxxx", plate: "IR123" }
  });

  // گوش دادن به بروزرسانی درخواست
  socket.on('requestUpdate', (data) => {
    console.log('Request update:', data);
    if(data.status === 'accepted'){
      // وقتی یک یدک‌کش درخواست را پذیرفت، به داشبورد برو
      window.location.href = '/dashboard.html'; // مسیر صفحه داشبورد شما
    }
    else if(data.status === 'rejected'){
      alert('یدک‌کش درخواست را رد کرد. در حال یافتن یدک‌کش دیگر...');
    }
  });

  // حالت انقضا
  socket.on('requestUpdate', (data) => {
    if(data.status === 'expired'){
      alert('درخواست شما منقضی شد!');
      window.location.href = '/dashboard.html';
    }
  });


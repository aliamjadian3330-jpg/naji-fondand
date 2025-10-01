// اتصال به سرور
const socket = io("https://naji-backend.onrender.com");// آدرس سرورت را وارد کن

const requestBtn = document.getElementById("requestBtn");
const waitingScreen = document.getElementById("waitingScreen");

requestBtn.addEventListener("click", () => {
  // نمایش صفحه انتظار
  waitingScreen.style.display = "block";
  requestBtn.disabled = true;

  // ارسال درخواست سرویس به سرور
  socket.emit("requestService", {
    origin: { lat: 35.7, lng: 51.4 }, // مثال، باید از GPS واقعی بگیری
    dest: { lat: 35.8, lng: 51.5 },
    driverInfo: {
      fullName: "علی", phone: "09123456789", plate: "IR123", image: ""
    }
  });
});

// دریافت پاسخ سرور از Socket.IO
socket.on("requestUpdate", (data) => {
  console.log("آپدیت درخواست:", data);

  if (data.status === "accepted") {
    waitingScreen.innerText = `یدک‌کش ${data.towInfo?.fullName || "نامشخص"} قبول کرد!`;
  } else if (data.status === "rejected") {
    waitingScreen.innerText = "یدک‌کش رد کرد، در حال یافتن یدک‌کش دیگر...";
  } else if (data.status === "expired") {
    waitingScreen.innerText = "درخواست منقضی شد!";
  }
});

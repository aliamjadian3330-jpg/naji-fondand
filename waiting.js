const socket = io("https://naji-backend.onrender.com"); // آدرس سرور خود را جایگزین کنید

const requestBtn = document.getElementById("requestBtn");
const waitingScreen = document.getElementById("waitingScreen");
const waitingText = document.getElementById("waitingText");

requestBtn.addEventListener("click", () => {
  waitingScreen.style.display = "block";
  requestBtn.disabled = true;

  socket.emit("requestService", {
    origin: { lat: 35.7, lng: 51.4 },
    dest: { lat: 35.8, lng: 51.5 },
    driverInfo: {
      fullName: "علی",
      phone: "09123456789",
      plate: "IR123",
      image: ""
    }
  });
});

socket.on("requestUpdate", (data) => {
  console.log("آپدیت درخواست:", data);

  if (data.status === "accepted") {
    waitingText.innerText = `یدک‌کش ${data.towInfo?.fullName || "نامشخص"} درخواست را قبول کرد!`;
  } else if (data.status === "rejected") {
    waitingText.innerText = "یدک‌کش رد کرد، در حال یافتن یدک‌کش دیگر...";
  } else if (data.status === "expired") {
    waitingText.innerText = "درخواست منقضی شد!";
  }
});

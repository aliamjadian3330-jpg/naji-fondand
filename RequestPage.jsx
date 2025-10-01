import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://naji-backend.onrender.com");// آدرس سرور Node.js شما

const RequestPage = ({ origin, dest, driverInfo }) => {
  const [requestId, setRequestId] = useState(null);
  const [status, setStatus] = useState("pending");
  const [towInfo, setTowInfo] = useState(null);

  const requestService = () => {
    socket.emit("requestService", { origin, dest, driverInfo });
  };

  useEffect(() => {
    socket.on("requestCreated", (data) => {
      setRequestId(data.requestId);
      setStatus(data.status);
    });

    socket.on("requestUpdate", (data) => {
      if(data.status === "accepted") {
        setStatus("accepted");
        setTowInfo(data.towInfo);
      } else if(data.status === "rejected") {
        setStatus("rejected");
      } else if(data.status === "expired") {
        setStatus("expired");
      }
    });

    socket.on("requestClosed", (data) => {
      setStatus("closed");
    });

    return () => socket.off(); // پاکسازی listener ها هنگام unmount
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>درخواست سرویس</h1>
      {status === "pending" && (
        <>
          <p>در حال انتظار برای قبول یدک‌کش...</p>
          <button onClick={requestService}>ارسال درخواست</button>
        </>
      )}
      {status === "accepted" && (
        <p>درخواست پذیرفته شد! یدک‌کش: {towInfo?.fullName}</p>
      )}
      {status === "rejected" && <p>درخواست رد شد</p>}
      {status === "expired" && <p>درخواست منقضی شد</p>}
      {status === "closed" && <p>درخواست بسته شد</p>}
    </div>
  );
};

export default RequestPage;

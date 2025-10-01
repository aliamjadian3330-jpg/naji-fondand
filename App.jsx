import React from "react";
import RequestPage from "./components/RequestPage";

function App() {
  const driverInfo = { fullName: "Ali", phone: "0912xxx", plate: "IR123" };
  const origin = { lat: 35.7, lng: 51.4 };
  const dest = { lat: 35.8, lng: 51.5 };

  return (
    <div>
      <RequestPage origin={origin} dest={dest} driverInfo={driverInfo} />
    </div>
  );
}

export default App;

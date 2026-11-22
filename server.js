
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://68001323003-png.github.io"
}));

app.use(express.json());

let ledState = "OFF";

// ตรวจสอบ Server
app.get("/", (req, res) => {
  res.send("Smart Home Adel Server is running!");
});

// ตรวจสอบสถานะไฟ
app.get("/api/state", (req, res) => {
  res.json({
    led: ledState
  });
});

// รับคำสั่งจากเว็บไซต์
app.post("/api/light", (req, res) => {
  const state = req.body.state;

  if (state !== "ON" && state !== "OFF") {
    return res.status(400).json({
      error: "Invalid state"
    });
  }

  ledState = state;

  console.log("Light state:", ledState);

  res.json({
    message: "Success",
    led: ledState
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Smart Home Adel Server running on port " + PORT);
});


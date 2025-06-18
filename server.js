const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mailRoutes = require("./routes/mailRoutes");

dotenv.config();

const app = express();

// ✅ Allow only your frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", mailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

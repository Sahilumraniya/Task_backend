const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const taskRouter = require("./router/TaskRouter.js");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//contect DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/task", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

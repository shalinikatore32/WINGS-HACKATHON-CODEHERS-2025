const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./connection/connectDB");
const userRouter = require("./routes/user");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());



app.use('/api', userRouter);

connection()
  .then(() => {
    console.log("Your database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
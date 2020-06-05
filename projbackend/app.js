require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT;
const path = require("path");

// note middleware should always be in top of code.
// middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routers
const authRouters = require("./routes/authRouter");
const userRouters = require("./routes/userRouter");
const categoryRouters = require("./routes/categoryRouter");
const productRouters = require("./routes/productRouter");
const orderRouters = require("./routes/orderRouter");
const stripePaymentRouters = require("./routes/stripePaymentRouter");

app.use("/api", authRouters);
app.use("/api", userRouters);
app.use("/api", categoryRouters);
app.use("/api", productRouters);
app.use("/api", orderRouters);
app.use("/api", stripePaymentRouters);

// db connections
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log("ERROR IN DB CONNECTION");
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("PROJFRONTEND/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "PROJFRONTEND", "build", "index.html")
    );
  });
}
// server start up
app.listen(port, () => {
  console.log("app is running on port : " + port);
});

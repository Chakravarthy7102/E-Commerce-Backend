const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/mongoose");
const UserRoute = require("./routes/usersRoute");
const OrderRoute = require("./routes/orderRoute");
const Cartroute = require("./routes/cartRoute");
const ProductRoute = require("./routes/productRoute");
const AuthRoute = require("./routes/auth");

const PORT = process.env.PORT;

app.use(express.json());

//main route
app.use("/api/user", UserRoute);

//login/register/route
app.use("/api", AuthRoute);

//order route
// app.use("/api/order", OrderRoute);

//products route
// app.use("/api/products", ProductRoute);

//cart Route
// app.use("/api/cart", Cartroute);

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Listeneing at port ${PORT}`);
  });
  await connectDB();
};

start();

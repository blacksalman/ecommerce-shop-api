const mongoose = require('mongoose')
const express = require('express')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

const DATABASE = process.env.DATABASE;

   
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE);
  console.log('db connected')
}


const authCredRoute = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");
const productRouter = require("./routes/product.route");
const stripeRouter = require("./routes/stripe.route");



app.use("/api/auth", authCredRoute);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);


app.listen(PORT, (e) => console.log(`server is up and running to port: ${PORT}`));
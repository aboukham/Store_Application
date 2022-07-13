const express = require("express");
const loginRouter = require("./routers/loginRouter");
const productRouter = require("./routers/productRouter");
const shoppingCartRouters = require("./routers/shoppingCartRouter");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/users", loginRouter);
app.use("/products", productRouter);
app.use("/shoppingCartItems", shoppingCartRouters);

app.listen(3000, () => console.log("listening to 3000..."));

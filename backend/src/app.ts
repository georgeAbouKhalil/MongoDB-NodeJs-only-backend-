import express from "express";
import cors from "cors";
import config from "./01-utils/config";
import con from "./04-dal/dal";
con.connectToMongoDB();
import productsController from "./06-controllers/products-controller";
import cartItemController from "./06-controllers/cartItem-controller";
import ordersController from "./06-controllers/orders-controller";
import errorsHandler from "./02-middleware/errors-handler";
import usersController from "./06-controllers/users-controller";
import cartController from "./06-controllers/cart-controller";
import categoriesController from "./06-controllers/categories-controller";


const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/products", productsController);
server.use("/api/auth", usersController);
server.use("/api/carts", cartController);
server.use("/api/cartItem", cartItemController);
server.use("/api/orders", ordersController);
server.use("/api/categories", categoriesController);


server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening..."));    



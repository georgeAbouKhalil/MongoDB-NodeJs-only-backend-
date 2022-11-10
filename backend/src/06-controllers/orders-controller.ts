import { OrderModel } from '../03-models/order-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/orders-logic";
import cartLogic from '../05-bll/cart-logic';
import cartItemLogic from '../05-bll/cartItem-logic';
import userLogic from '../05-bll/users-logic';
import verifyNotAdmin from '../02-middleware/verify-not-admin';
import verifyAdmin from '../02-middleware/verifyAdmin';

const router = express.Router();

router.get("/showSales", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const orders = await logic.getAllOrders();
        response.json(orders);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/showPopularSale", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get all cart products from close cart
        const cartDetails = await cartItemLogic.getAllCartProduct();

        // const orders = await logic.getAllOrders();
        response.json(cartDetails);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/pay/:user_name", verifyNotAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userName = request.params.user_name;
        request.body.userName = userName;
        request.body.order_date = new Date().toLocaleString();

        //get user id
        const userdetails = await userLogic.getUserIdByUserName(userName);

        // get cart
        const cart = await cartLogic.getOneCartByUserId(userdetails._id);
        request.body.cart_id = cart._id;

        const cartProduct = await cartItemLogic.getAllCartItem(cart._id);
        request.body.final_price = cartProduct.map(product => (product.totalPrice)).reduce((a, b) => a + b, 0);

        // make new order
        const order = new OrderModel(request.body);
        const addedOrder = await logic.addOrder(order);

        // change cart status from open to close
        cart.status = "close";
        await cartLogic.updateCart(cart);
        response.status(201).json(addedOrder);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

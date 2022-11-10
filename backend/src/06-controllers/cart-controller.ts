import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/cart-logic";
import { CartModel } from '../03-models/cart-model';

const router = express.Router();

// Route for getting one by userId :
router.get("/by-user/:userId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        let cart = await logic.getOneCartByUserId(userId);
        if (!cart) {
            request.body.user_id = userId;
            request.body.status = "open";
            const newCart = new CartModel(request.body);
            cart = await logic.addCart(newCart);
        }
        response.json(cart);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;

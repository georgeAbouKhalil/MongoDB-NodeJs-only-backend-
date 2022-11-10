import { CartItemModel } from '../03-models/cartItem-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/cartItem-logic";
import cartLogic from "../05-bll/cart-logic";
import productsLogic from '../05-bll/products-logic';
import verifyNotAdmin from '../02-middleware/verify-not-admin';
import usersLogic from '../05-bll/users-logic';

const router = express.Router();

// add product to cart
router.post("/addToCart/:user_name/:product", verifyNotAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.userName = request.params.user_name;
        request.body.product_id = request.params.product;

        //get user details
        const userDetails = await usersLogic.getUserIdByUserName(request.body.userName);
        console.log(userDetails._id);
        
        // get cart id
        const cart = await cartLogic.getOneCartByUserId(userDetails._id.toString());
        console.log({cart});
        
        request.body.cart_id = cart._id;
        request.body.cart_status = cart.status;

        const product = await productsLogic.getOneProduct(request.body.product_id);
        request.body.price = product.price;
        request.body.totalPrice = request.body.price * request.body.quantity;
        const cartItem = new CartItemModel(request.body);
        //update inStock in database
        const oldProduct = await productsLogic.getOneProduct(cartItem.product_id.toString());
        oldProduct.inStock = oldProduct.inStock - cartItem.quantity;
        await productsLogic.updateProduct(oldProduct);

        const addedCartItem = await logic.addCartItem(cartItem);
        response.status(201).json(addedCartItem);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

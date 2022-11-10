import mongoose from "mongoose";
import ClientError from "../03-Models/client-error";
import { ICartItemModel, CartItemModel } from "../03-models/cartItem-model";

// Get all by cart id
async function getAllCartItem(cart_id: string): Promise<ICartItemModel[]> {
    return await CartItemModel.find({ "cart_id": cart_id }).populate("product").populate("cart").exec();

}

// Get all
async function getAllCartProduct(): Promise<ICartItemModel[]> {

    // get the sum of quantity per product
    const popularProduct = CartItemModel.aggregate([
        {
            $group: {
                _id: {
                    productId: "$product_id",
                    cart_status: "$cart_status",
                }, quantity: { "$sum": "$quantity" }
            }
        },
    ]);

    // make a new array just for cart with close status
    const cartProduct = (await popularProduct).filter((a: any) => {
        return a._id.cart_status === "close";
    });

    // sort from the highest quantity to the lower
    const products = cartProduct.sort(function (a, b) {
        return b.quantity - a.quantity;
    });

    // first 5 popular products
    const popularProducts = [];
    for (let i = 0; i < 5; i++) {
        popularProducts.push(products[i]?._id.productId)
    }

    return popularProducts;
}

// Get one:
async function getOneCartItem(_id: string): Promise<ICartItemModel> {

    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`);

    const product = await CartItemModel.findById(_id).exec();
    if (!product) throw new ClientError(404, `_id ${_id} not found`);

    return product;
}

// Insert:
async function addCartItem(product: ICartItemModel): Promise<ICartItemModel> {
    
    // Validation:
    const errors = product.validateSync();
    if (errors) throw new ClientError(400, errors.message);

    // Add:
    return product.save();
}

async function checkIfProductExistInCart(product) {
    console.log({ product });

    return CartItemModel.findOne({ "cart_id": product.cart_id, "product_id": product.product_id, "quantity": product.quantity })
}

// Update:
async function updateCartItem(product: ICartItemModel): Promise<ICartItemModel> {

    const updatedProduct = await CartItemModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
    if (!updatedProduct) throw new ClientError(404, `_id ${product._id} not found`);

    // Return updated product:
    return updatedProduct;
}

// Delete:
async function deleteCartItem(_id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`);
    const deletedProduct = await CartItemModel.findByIdAndDelete(_id).exec();
    if (!deletedProduct) throw new ClientError(404, `_id ${_id} not found`);
}

async function emptyCart(cartId) {

    if (!mongoose.Types.ObjectId.isValid(cartId)) throw new ClientError(404, `_id ${cartId} not valid`);
    await CartItemModel.deleteMany({ "cart_id": cartId }).exec();
};


export default {
    getAllCartProduct,
    getAllCartItem,
    checkIfProductExistInCart,
    getOneCartItem,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    emptyCart
};

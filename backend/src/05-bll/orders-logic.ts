import mongoose from "mongoose";
import ClientError from "../03-Models/client-error";
import { IOrderModel, OrderModel } from "../03-models/order-model";

// Get all:
async function getAllOrders(): Promise<IOrderModel[]> {
    return OrderModel.find().exec();
}

// Get one:
async function getOneOrderId(username: string): Promise<IOrderModel> {
    const order = await OrderModel.findOne({ "userName": username }).populate("user").exec();  
    return order;
}


// Get one:
async function getOneOrder(_id: string): Promise<IOrderModel> {

    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`); // להיות יותר צדיק מאפיפיור...

    const order = await OrderModel.findById(_id).exec();
    if (!order) throw new ClientError(404, `_id ${_id} not found`);

    return order;
}

// Insert:
async function addOrder(order: IOrderModel): Promise<IOrderModel> {

    // Validation:
    const errors = order.validateSync();
    if (errors) throw new ClientError(400, errors.message);

    // Add:
    return order.save();
}

// Update:
async function updateOrder(order: IOrderModel): Promise<IOrderModel> {

    if (!mongoose.Types.ObjectId.isValid(order._id)) throw new ClientError(404, `_id ${order._id} not valid`);

    // Validation:
    const errors = order.validateSync();
    if (errors) throw new ClientError(400, errors.message);

    // Update:
    const updatedOrder = await OrderModel.findByIdAndUpdate(order._id, order, { returnOriginal: false }).exec();
    if (!updatedOrder) throw new ClientError(404, `_id ${order._id} not found`);

    // Return updated product:
    return updatedOrder;
}

// Delete:
async function deleteOrder(_id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`);
    const deletedOrder = await OrderModel.findByIdAndDelete(_id).exec();
    if (!deletedOrder) throw new ClientError(404, `_id ${_id} not found`);
}



export default {
    getOneOrderId,
    getAllOrders,
    getOneOrder,
    addOrder,
    updateOrder,
    deleteOrder,

};

import { Document, Schema, model } from "mongoose";
import { CartModel } from "./cart-model";
import { UserModel } from "./user-model";

// Define model interface:
export interface IOrderModel extends Document {
    // we don't define the _id because it exists by default.
     cart_id: Schema.Types.ObjectId;
     user_id: Schema.Types.ObjectId;
     userName: string;
     final_price : number;
     order_date: string;
     credit_card: string;
    user: any;
}

// Define model schema:
const OrderSchema = new Schema<IOrderModel>({
    cart_id: {
        type: Schema.Types.ObjectId,
        required: [true, "Missing cart_id"]
    },
    userName :{
        type: String,
        required: [true, "Missing userName"]
    },
    final_price: {
        type: Number,
        required: [true, "Missing final_price"],
        min: [0, "final_price can't be negative"]
    },
    order_date: {
        type: String,
        required: [true, "order Date is required"]
    },
    credit_card: {
        type: String,
        required: [true, "Missing credit_card"],
        min: [0, "credit_card can't be negative"],
        max: [1000, "credit_card can't exceed 1000"]
    },
}, { 
    versionKey: false, // Don't create __v field
    toJSON: { virtuals: true }, // Fill also the virtual fields when we're calling a "populate" function
    id: false, // Don't duplicate _id to id field
});

OrderSchema.virtual("cart", {
    ref: CartModel, // Which model are you describing
    localField: "cart_id", // Our model relation field
    foreignField: "_id", // Other model relation field
    justOne: true // One-to-Many relation --> each product has one category and not many
});
OrderSchema.virtual("user", {
    ref: UserModel, // Which model are you describing
    localField: "userName", // Our model relation field
    foreignField: "userName", // Other model relation field
    justOne: true // One-to-Many relation --> each product has one category and not many
});

// Define model:
export const OrderModel = model<IOrderModel>("OrderModel", OrderSchema, "order"); // model name, schema class, collection name

import { Document, Schema, model } from "mongoose";
import { CategoryModel } from './category-model';

// Define model interface:
export interface IProductModel extends Document {
    // we don't define the _id because it exists by default.
    categoryId: Schema.Types.ObjectId;
    name: string;
    img: string;
    price: number;
    inStock: number;

}

// Define model schema:
const ProductSchema = new Schema<IProductModel>({
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "Missing categoryId"]
    },
    name: {
        type: String,
        required: [true, "Missing name"],
        min: [0, "name can't be negative"],
        max: [1000, "name can't exceed 1000"]
    },
    img: {
        type: String,
        required: [true, "Missing img"],
        min: [0, "img can't be negative"],
        max: [1000, "img can't exceed 1000"]
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    inStock: {
        type: Number,
        required: [true, "Missing inStock"],
        min: [0, "inStock can't be negative"],
        max: [1000, "inStock can't exceed 1000"]
    },

}, { 
    versionKey: false, // Don't create __v field
    toJSON: { virtuals: true }, // Fill also the virtual fields when we're calling a "populate" function
    id: false, // Don't duplicate _id to id field
});

ProductSchema.virtual("category", {
    ref: CategoryModel, // Which model are you describing
    localField: "categoryId", // Our model relation field
    foreignField: "_id", // Other model relation field
    justOne: true // One-to-Many relation --> each product has one category and not many
});

// Define model:
export const ProductModel = model<IProductModel>("ProductModel", ProductSchema, "products"); // model name, schema class, collection name

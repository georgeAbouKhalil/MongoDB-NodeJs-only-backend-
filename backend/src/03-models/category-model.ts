import { Document, Schema, model } from "mongoose";

// Interface: 
export interface ICategoryModel extends Document {
    // we don't define the _id because it exists by default.
    name: string
}

// Schema:
export const CategorySchema = new Schema<ICategoryModel>({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [50, "Name too long"],
        trim: true,
        unique: true
    }
}, { 
    versionKey: false, // Don't create __v field
    toJSON: { virtuals: true }, // Fill also the virtual fields when we're calling a "populate" function
    id: false, // Don't duplicate _id to id field
});

// Model:
export const CategoryModel = model<ICategoryModel>("CategoryModel", CategorySchema, "categories");

import { Document, Schema, model } from "mongoose";

// Define model interface:
export interface IUserModel extends Document {
    // we don't define the _id because it exists by default.+
    firstName: string;
    lastName: string;
    userName: string;
    birthday: string;
    password: string;
    role: string;
    age:number;
}

// Define model schema:
const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true,"firstName is required"],
        minlength: [2, "firstName must be min 2 chars"],
        maxlength: [10, "firstName must be max 10 chars"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true,"lastName is required"],
        minlength: [2, "lastName must be min 2 chars"],
        maxlength: [15, "lastName must be max 15 chars"],
        trim: true
    },
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: true,
        trim: true
    },
    birthday: {
        type: String,
        required: [true, "birthday is required"]
    },
    password: {
        type: String,
        required: [true,"password is required"],
        minlength: [4, "password must be min 2 chars"],
        maxlength: [10, "password must be max 15 chars"],
    },
    role: {
        type: String
    },
    age: {
        type: Number,
        required: [true,"age is required"],
        minlength: [2, "age must be min 2 chars"],
        maxlength: [3, "age must be max 3 chars"],
    }
}, { 
    versionKey: false, // Don't create __v field
    toJSON: { virtuals: true }, // Fill also the virtual fields when we're calling a "populate" function
    id: false, // Don't duplicate _id to id field
});


// Define model:
export const UserModel = model<IUserModel>("UserModel", UserSchema, "users"); // model name, schema class, collection name

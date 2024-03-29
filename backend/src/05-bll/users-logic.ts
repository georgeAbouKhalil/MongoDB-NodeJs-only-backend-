import mongoose from "mongoose";
import jwt from "../01-utils/jwt";
import ClientError from "../03-models/client-error";
import { ICredentialsModel } from "../03-models/credentials-model";
import { IUserModel, UserModel } from "../03-models/user-model";

// Register:
async function register(user: IUserModel): Promise<string> {
    
    // validate:
    const errors = user.validateSync();
    if(errors) throw new ClientError(404, errors.message);
    
    // Validate username does not exist in DB:
    const users = await getAllUsers();
    const exist = users.find(u => u.userName === user.userName);
    if (exist) throw new ClientError(401, "User name already in use.");
    
    const newUser = await user.save();
    
    // Delete password before generating token for security:
    delete user.password;

    // Create new token:
    const token = jwt.getNewToken(newUser);

    return token;
}

// Login:
async function login(credentials: ICredentialsModel): Promise<string> {
    // Validate:
    const errors = credentials.validateSync();
    if(errors) throw new ClientError(404, errors.message);

    const users = await getAllUsers(); 
    // Check if user exist in database:
    const user =  users.find(u => u.userName === credentials.userName && u.password === credentials.password);
    if(!user) throw new ClientError(401, "Incorrect username or password");
    
    // Delete password before generating token for security:
    delete user.password;
    
    const token = jwt.getNewToken(user);

    return token;
}



async function getAllUsers(): Promise<IUserModel[]> {
    return UserModel.find();
}

// Get one user by username:
async function getUserIdByUserName(username: string): Promise<IUserModel> {
    const user = await UserModel.findOne({ "userName": username }).exec();    
    return user;
}

async function updateUser(user: IUserModel): Promise<IUserModel> {
    // Validation:
    const errors = user.validateSync();
    if(errors) throw new ClientError(404, errors.message);
    
    // Update:
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, {returnOriginal: false}).exec();

    // Validate if user exist in DB:
    if(!updatedUser) throw new ClientError(404, "user is not found");

    return updatedUser;
}

async function deleteUser(_id: string): Promise<void> {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);
    const deletedUser = await UserModel.findByIdAndDelete(_id).exec();
    if(!deletedUser) throw new ClientError(404, "user is not found");
}


export default {
    register,
    login,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserIdByUserName
}
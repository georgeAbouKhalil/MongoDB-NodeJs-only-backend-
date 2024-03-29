import express, { NextFunction, Request, Response } from "express";
import { CredentialsModel } from "../03-models/credentials-model";
import { UserModel } from "../03-models/user-model";
import logic from "../05-BLL/users-logic"

const router = express.Router();

// Register---
router.post("/register", async (request : Request, response: Response, next: NextFunction) => {
    try{
        request.body.role = "user"; // Make sure added user has User role
        const user = new UserModel(request.body);
        const token = await logic.register(user);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

// Login----------
router.post("/login", async (request : Request, response: Response, next: NextFunction) => {
    try{
        const credentials = new CredentialsModel(request.body);
        const token = await logic.login(credentials);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});


// Route for updating a user:-------------
router.put("/updateProfile/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const userToUpdate = new UserModel(request.body);
        const updatedUser = await logic.updateUser(userToUpdate);
        response.status(201).json(updatedUser);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for deleting a user:----
router.delete("/deleteUser/:_id" , async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        await logic.deleteUser(_id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;
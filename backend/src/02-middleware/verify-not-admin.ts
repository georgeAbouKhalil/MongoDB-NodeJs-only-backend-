import { Request, Response, NextFunction } from "express";
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";

function verifyNotAdmin(request: Request, response: Response, next: NextFunction): void {
    const user = jwt.getUserFromToken(request);

    if(user.role === "admin") {
        const err = new ClientError(401, "Admin is not allowed");
        next(err);
    }

    next();
}

export default verifyNotAdmin;
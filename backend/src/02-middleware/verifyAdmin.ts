import { NextFunction, Request, Response } from "express";
import jwt from "../01-Utils/jwt";
import ClientError from "../03-Models/client-error";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
    const isValid = await jwt.verifyToken(request);

    if(!isValid) {
        const err = new ClientError(401, "Invalid or expired Token. \n Please re-login to generate new Token.");
        next(err);
        return;
    }

    const user = jwt.getUserFromToken(request);
    
    if(user.role !== "admin") {
        const err = new ClientError(403, "You are not authorized");
        next(err);
        return;
    }

    next();
}

export default verifyAdmin;
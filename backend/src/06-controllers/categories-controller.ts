import express, { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../03-models/category-model";
import logic from "../05-bll/categories-logic";

const router = express.Router();

// Route for getting all :
router.get("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
       const types = await logic.getAllCategories();
       response.json(types);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting one :
router.get("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const _id = request.params._id;
        const type = await logic.getOneCategory(_id);
        response.json(type);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for adding a :
router.post("/",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const TypeToAdd = new CategoryModel(request.body);
        const addedType = await logic.addCategory(TypeToAdd);
        response.status(201).json(addedType);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for updating a :
router.put("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body._id = request.params._id;
        const TypeToUpdate = new CategoryModel(request.body);
        const updatedType = await logic.updateCategory(TypeToUpdate);
        response.status(201).json(updatedType);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for deleting a :
router.delete("/:_id",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const idToDelete = request.params._id;
        await logic.deleteCategory(idToDelete);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
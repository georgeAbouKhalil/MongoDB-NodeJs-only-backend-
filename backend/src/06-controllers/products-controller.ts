import { ProductModel } from './../03-models/product-model';
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-bll/products-logic";
import verifyAdmin from '../02-middleware/verifyAdmin';

const router = express.Router();

// get all products
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const products = await logic.getAllProduct();
        response.json(products);
    }
    catch(err: any) {
        next(err);
    }
});

//get specific product
router.get("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await logic.getOneProduct(_id);
        response.json(product);
    }
    catch(err: any) {
        next(err);
    }
});

// add new product
router.post("/addProduct",verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

//update product
router.put("/updateProduct/:_id",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {

        const _id = request.params._id;    
        request.body._id = _id;
        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch(err: any) {
        next(err);
    }
});

// Route for getting all by category:
router.get("/category/:categoryId", async (request : Request, response : Response, next : NextFunction) => {
    try {
        
        const _id = request.params.categoryId;        
        const products = await logic.getProductsByCategory(_id);
        console.log({products});
        
        response.json(products);
    } catch (err : any) {
        next(err);
    }
});

router.delete("/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch(err: any) {
        next(err);
    }
}); 

export default router;

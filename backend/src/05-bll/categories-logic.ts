import ClientError from '../03-models/client-error';
import mongoose from 'mongoose';
import { CategoryModel, ICategoryModel } from '../03-models/category-model';

async function getAllCategories(): Promise<ICategoryModel[]> {
    return CategoryModel.find().exec();
}

async function getOneCategory(_id: string): Promise<ICategoryModel> {
    // Validate _id:
    if (!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is invalid`);

    const category = await CategoryModel.findById(_id).exec();

    // Validate Category existence:
    if(!category) throw new ClientError(404, "Category not found");

    return category;
}

async function addCategory(category: ICategoryModel): Promise<ICategoryModel> {
    // Validate Category:
    const errors = category.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // Save:
    const addedCategory = category.save();
    return addedCategory;
}

async function updateCategory(category: ICategoryModel): Promise<ICategoryModel> {
    // Validate Category:
    const errors = category.validateSync();
    if(errors) throw new ClientError(400, errors.message);

    // update:
    const updatedCategory = await CategoryModel.findByIdAndUpdate(category._id, category, {returnOriginal: false}).exec();

    // Validate if user exist in DB:
    if(!updatedCategory) throw new ClientError(404, "user is not found");

    return updatedCategory;
}

async function getProductsByCategoryId(_id: string): Promise<[]> {
    return [];
}

async function deleteCategory(_id: string) {
    // Validate _id:
    if(!mongoose.isValidObjectId(_id)) throw new ClientError(404, `_id ${_id} is not valid`);

    // Validate Category empty:
    const prodByCategoryId = await getProductsByCategoryId(_id);
    if(prodByCategoryId.length !== 0) throw new ClientError(400, "There are still some products in that Category, you cannot delete it until its empty");

    // Delete:
    const deletedCategory = await CategoryModel.findByIdAndDelete(_id);

    // Validate Category found:
    if(!deletedCategory) throw new ClientError(404, "Category not found");
}

export default {
    getAllCategories,
    getOneCategory,
    addCategory,
    updateCategory,
    deleteCategory
}
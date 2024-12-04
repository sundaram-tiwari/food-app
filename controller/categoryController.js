const categoryModel = require("../model/categoryModel");

const createCategory = async (req, res) => {
    try {
        const { title, logoUrl } = req.body;
        //validation
        if (!title || !logoUrl) {
            return res.status(400).send({
                success: false,
                message: "Please Provide category title and logoUrl"
            })
        }
        const isMatch = await categoryModel.findOne({ title });
        if (isMatch) {
            return res.status(400).send({
                success: false,
                message: 'Category already exist'
            })
        }
        const newCategory = await categoryModel.create({ title, logoUrl });
        res.status(200).send({
            success: true,
            message: 'Category created successfully',
            newCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create category API'
        })
    }
}

const getAllCategory = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (!categories) {
            return res.status(400).send({
                success: false,
                message: 'No categories found'
            })
        }

        res.status(200).send({
            success: true,
            categoriesCount: categories.length,
            categories
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all category API'
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, logoUrl } = req.body;

        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Please provide category id'
            })
        }

        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(400).send({
                success: false,
                message: 'No categories found'
            })
        }

        if(title) category.title = title;
        if(logoUrl) category.logoUrl = logoUrl;

        await category.save();
        res.status(200).send({
            success:true,
            message:'Category updated successfully',
            category
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update category API'
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Please provide category id'
            })
        }

        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if(!deleteCategory){
            return res.status(400).send({
                success: false,
                message: 'No categories found'
            })
        }

        res.status(200).send({
            success:false,
            message:'Category deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete category API'
        })
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
};
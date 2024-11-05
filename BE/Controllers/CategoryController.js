const Category = require('../Models/Category');

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error('Error creating category:', error); 
        res.status(400).json({ error: error.message });
    }
};

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
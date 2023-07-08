const Category = require('../models/Category');

//Handler to create category
exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;
		if (!name) {
			return res
				.status(400)
				.json({ success: false, message: "All fields are required" });
		}
		const CategorysDetails = await Category.create({
			name: name,
			description: description,
		});
		console.log(CategorysDetails);
		return res.status(200).json({
			success: true,
			message: "Category Created Successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: true,
			message: error.message,
		});
	}
};

//Handler to show all categories
exports.showAllCategories = async(req, res) => {
    try {
        const allCategory = await Category.find({}, {name:true, description:true});

        return res.status(200).json({
            success:true,
            data:allCategory,
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


//Handler to get category page details
exports.categoryPageDetails = async(req, res) => {
    try {
        //get category id
        const {categoryId} = req.body;

        //get course for specific category id
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:"Data not found",
            });
        }

        //get course for different categories
        const differentCategories = await Category.find({_id: {$ne: categoryId},}).populate("courese").exec();

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            },
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
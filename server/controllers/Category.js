const { default: mongoose } = require('mongoose');
const Category = require('../models/Category');
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

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
        const allCategory = await Category.find();

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
        const CategoryId = new mongoose.Types.ObjectId(categoryId);
        console.log("CATEGORY ID", typeof(CategoryId), CategoryId);
        //get course for specific category id
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match : {status: "Published"},
            populate: "ratingAndReviews",
        })
        .exec();

        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:"Category not found",
            });
        }
        //Case where no course in category
        if(selectedCategory.courses.length === 0) {
            console.log("No course found for the selected category")
            return res.status(404).json({
                success:false,
                message:"No course found for the selcected category"
            })
        }

        //get course for different categories
        const categoriesExpectSelected = await Category.find({_id: {$ne: categoryId},})
        let differentCategory = await Category.findOne(categoriesExpectSelected[getRandomInt(categoriesExpectSelected.length)]._id)
        .populate({
            path: "courses",
            match: {status: "Published"},
        })
        .exec();

        //Get top-selling courses across all categories
        const allCategories = await Category.find()
        .populate({
            path:"courses",
            match:{status: "Published"},
        })
        .exec();

        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10)

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
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

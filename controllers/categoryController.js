const category = require("../models/categoryModel");

const categoryController = {
   async index(req, res, next) {
    let categories;
    try{
        
        categories = await category.find();
   }
   catch(error){
    res.status(404).json({ error: "Server error.", serverError: error});
    }
    res.status(200).json(categories);
},
async store(req, res, next){
    let cat;
    try{
        const{title, description} = req.body;
        cat = await category.create({title,description,
            thumbnail: "upload/category/thumbnail" + req.file.filename,});

    }catch (error)
    {
        res.status(404).json({error: "Server error.",serverError: error});
    }
    res.status(201).json(cat);
},

async update(req, res, next){
    let cat;
    try{
        const { id } = req.params;
        const { title, description } = req.body;
        cat = await category.findByIdAndUpdate(
        { _id: id},
        { title, description },
        { new: true }
        );
    }
    catch (error)
    {
        res.status(500).json({error: "Server error.", serverError: error});
    }
    res.status(200).json(cat);
},

async delete(req, res, next){
    let cat;
    try{
        const{ id } = req.body;
        cat=await category.findByIdAndDelete({_id: id});
    }catch(error)
    {
        res.status(500).json({error:"Server error.",serverError:error});
    }
    res.status(200).json(cat);
},
};

module.exports=categoryController;
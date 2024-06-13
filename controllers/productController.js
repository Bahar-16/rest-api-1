const Product = require("../models/productModel");

const productController = {
    async store(req, res, next){
        let product;
        try{
            const{Category, subcategory, name, price} = req.body;
            product = await Product.create({Category, subcategory, name, price});
        }catch(error)
        {
            res.status(404).json({ error: "Server error.", serverError:error});
        }
        res.status(201).json(product);
    },
    async index(req, res, next) {
        let product;
        try{
            
            product = await Product.find();
       }
       catch(error){
        res.status(404).json({error: "Server error.",serverError:error});
        }
        res.status(200).json(product);
    },
    async delete(req, res, next){
        let product;
        try{
            const{id} = req.body;
            product = await Product.findByIdAndDelete({_id: id});
        }catch(error)
        {
            res.status(500).json({error:"Server error.",serverError:error});
        }
        res.status(200).json(product);
},
};
module.exports=productController;
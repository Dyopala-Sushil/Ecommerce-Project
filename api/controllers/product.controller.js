const Product = require("../model/product.model");
class ProductController{

    registerProduct = (req, res, next) => {
        const data = req.body;

        if(req.files){
            let images = [];
            for(let image in req.files){
                // console.log(req.files);
                images.push(req.files[image].filename);
            }
            data.images = images; 
        }


        data.after_discount = data.price;
        
        if(data.discount > 0){
            data.after_discount = data.price - data.price * data.discount / 100;
        }

        const prod = new Product(data);

        prod.save().then((succ) => {
            res.json({
                data: prod,
                status: true,
                msg: "Product added successfully."
            })
        }).catch((err)=> {
            console.log('Error: ', err);
            next({
                msg: "Problem while adding product",
                status: 400
            });
        })

    }

    getAllProducts = (req, res, next) => {
        let filter = {};
        if(req.query.key){  
            filter = {
                title: {$regex: req.query.key, $options:'i'}
            }
        }

        Product.find(filter)
        .populate('category')
        .populate('seller')
        .then((products) => {
            res.status(200).json({
                data: products,
                status: true,
                msg: "List successfull"
            })
        })
        .catch((err) => {
            next({
                err: "Error in listing",
                status: 400
            })
        })
    }

    deleteProductById = (req, res, next) => {
        Product.deleteOne({
            _id: req.params.id
        })
        .then((response) => {
            res.json({
                result: null,
                status: true,
                msg: "Product deleted successfully."
            })
        })
        .catch((error) => {
            let err = {
                status: 400,
                msg: JSON.stringify(error)
            }
            next(err);
        })
    }

    getProductById = (req,res,next) => {
        Product.findById(req.params.id)
        .then((product) => {
            res.json({
                result: product,
                status: true,
                msg: "List success"
            })
        })
        .catch((error) => {
           res.json({
               result: null,
               status: false,
               msg: "Product does not exists."
           })
        })
    }

    updateProductById = (req, res, next) => {
        let data = req.body;
        let images = [];
        if(data.images){
            images = data.images.split(",");
        }


        if(req.files){
            for(let image in req.files){
                images.push(req.files[image].filename);
            }
        }


        data.images = images; 

        data.after_discount = data.price;
        
        if(data.discount > 0){
            data.after_discount = data.price - data.price * data.discount / 100;
        }
        Product.updateOne(
            {_id: req.params.id},
            {
                $set: data
            }
        )
        .then((succ) => {
            res.json({
                data: data,
                status: true,
                msg: "Product Updated successfully."
            })
        }).catch((err)=> {
            console.log('Error: ', err);
            next({
                msg: "Problem while updating product",
                status: 400
            });
        })
    }
}

module.exports =ProductController;
const mongoose = require('mongoose');
const Product = require('../../models/Product');

module.exports = {
    getAllProducts : (req, res, next) => {
        Product
            .find()
            // .select('_id name price')
            .exec()
            .then(products => {
                const response = {
                    count: products.length,
                    products: products.map(product => {
                        return {
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            productImage: product.productImage
                        }
                    })
                };
                res.status(200).json(response);
            })
            .catch(error => {
                next(error);
            })
    },
    
    createOneProduct : (req, res, next) => {
        const product = createProduct(req);
    
        product
            .save()
            .then(product => {
                res.status(200).json({
                    message: 'Product Created Successfully!',
                    product: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        productImage: product.productImage
                    }
                });
            })
            .catch(error => {
                res.send(error);
            });
    },
    
    getOneProduct : (req, res, next) => {
        const id = req.params.productId;
        Product
            .findById(id)
            .select('_id name price productImage')
            .exec()
            .then(product => {
                if (product) {
                    res.status(200).json(product);
                }
                else {
                    res.status(404).json({
                        message: 'Product Not Found!'
                    });
                }
            })
            .catch(error => {
                res.send(error);
            });
    },
    
    updateOneProduct : (req, res, next) => {
        const productId = req.params.productId;
        // const updateOps = {};
        // for (const prop of req.body) {
        // 	updateOps[prop.propName] = prop.propValue;
        // }
    
        Product
            .update({ _id: productId }, { $set: req.body })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Updated Product Successfully!',
                    result: result
                });
            })
            .catch(error => {
                next(error);
            })
    },
    
    deleteOneProduct : (req, res, next) => {
        const productId = req.params.productId;
        Product
            .remove({ _id: productId })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Product Successfully!',
                    result: result
                });
            })
            .catch(error => {
                next(error);
            });
    },
    
    
}

const createProduct = (req) => {
    return new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
}
const productModel = require("../model/product.model");

const viewProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

         console.log("Received ID:", req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found",
            });
        }

        res.status(200).json({
            message: "OK",
            data: product,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = { viewProduct };
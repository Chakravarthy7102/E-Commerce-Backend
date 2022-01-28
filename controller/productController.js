const ProductsSchema = require("../model/ProductModel");

const addProduct = async (req, res) => {
  try {
    const newProduct = await ProductsSchema.create(req.body);

    res.status(200).json({ status: "ok", newProduct: newProduct });
  } catch (error) {
    res.status(505).json({ status: "error", error: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductsSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({ status: "ok", msg: updatedProduct });
  } catch (error) {
    res.status(501).json({
      status: "error",
      error: error.codeName,
      res: "updateUser",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductsSchema.findOneAndDelete(req.params.id);
    res.status(200).json({
      status: "ok",
      msg: "Product deleted Succesfully",
      obj: deleted,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", error: error, res: "DeleteProduct" });
  }
};

const getAllProducts = async (req, res) => {
  //query for getting the latest users
  //url = https://domainname/user/users?new=true
  const query = req.query.category;
  try {
    let products;
    if (query) {
      products = await ProductsSchema.find({
        category: {
          $in: [req.query.category],
        },
      });
    } else {
      products = await ProductsSchema.find();
    }

    res.status(200).json({ status: "ok", obj: products });
  } catch (error) {
    res
      .status(501)
      .json({ status: "error", error: error, res: "getAllProducts" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await ProductsSchema.findById(req.params.id);

    res.status(200).json({ status: "ok", obj: product });
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "getProduct" });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
};

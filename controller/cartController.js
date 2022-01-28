const CartSchema = require("../model/Cart");

const addCart = async (req, res) => {
  try {
    const newCart = await CartSchema.create(req.body);

    res.status(200).json({ status: "ok", newCart: newCart });
  } catch (error) {
    res.status(505).json({ status: "error", error: error });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await CartSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({ status: "ok", msg: updatedCart });
  } catch (error) {
    res.status(501).json({
      status: "error",
      error: error.codeName,
      res: "updateUser",
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    const deleted = await CartSchema.findOneAndDelete(req.params.id);
    res.status(200).json({
      status: "ok",
      msg: "Cart deleted Succesfully",
      obj: deleted,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error, res: "DeleteCart" });
  }
};

const getCart = async (req, res) => {
  try {
    const Cart = await CartSchema.findOne({ userId: req.params.userId });

    res.status(200).json({ status: "ok", obj: Cart });
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "getCart" });
  }
};

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getCart,
};

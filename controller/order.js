const OrderSchema = require("../model/Order");

const addOrder = async (req, res) => {
  try {
    const newOrder = await OrderSchema.create(req.body);

    res.status(200).json({ status: "ok", newOrder: newOrder });
  } catch (error) {
    res.status(505).json({ status: "error", error: error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deleted = await OrderSchema.findOneAndDelete(req.params.id);
    res.status(200).json({
      status: "ok",
      msg: "Order deleted Succesfully",
      obj: deleted,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error, res: "DeleteOrder" });
  }
};

const getOrder = async (req, res) => {
  try {
    const Order = await OrderSchema.find({ userId: req.params.userId });

    res.status(200).json({ status: "ok", obj: Order });
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "getOrder" });
  }
};

const getAllOrder = async (req, res) => {
  //query for getting the latest users
  //url = https://domainname/user/users?new=true

  try {
    const Order = await OrderSchema.find();
    res.status(200).json({ status: "ok", obj: Order });
  } catch (error) {
    res.status(501).json({ status: "error", error: error, res: "getAllOrder" });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  getOrder,
  getAllOrder,
};

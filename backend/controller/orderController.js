const model = require('../model/OrderModel')


const createOrder = async(req ,res)=>{

     try {

     const {
      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus
    } = req.body;

    // Validation
    if (
      !userId ||
      !products ||
      products.length === 0 ||
      !totalAmount ||
      !shippingAddress
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory.",
      });
    }

    // create order


    const order = await model.create({

      userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus,

    })
      return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      data: order,
    });
        
    } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await model.find()
      .populate("userId", "name email")
      .populate("products.productId", "title price image");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ======================================
// Get Order By ID
// ======================================
const getOrderById = async (req, res) => {
  try {
    const order = await model.findById(req.params.id)
      .populate("userId", "name email")
      .populate("products.productId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Order Status
// ======================================
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await model.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Order
// ======================================
const deleteOrder = async (req, res) => {
  try {
    const order = await model.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const customerRouter = require("./customer");
const usersRouter = require("./users")
const userRouter = require("./user")
const productRouter = require("./product")
const expenseRouter = require("./expense");
const orderRouter = require("./order");
const orderProductRouter = require("./orderProduct");
const revenueRouter = require("./revenue");
const vendorRouter = require("./vendor");
const warehouseRouter = require("./warehouse");
const warehouseStockRouter = require("./warehousestock")
const productVendorRouter = require("./productVendor")
const auth = require('../middlewares/auth')

router.use('/users', usersRouter);
router.use(auth);
router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/customers', customerRouter);
router.use('/expenses', expenseRouter);
router.use('/orders', orderRouter);
router.use('/orderproducts', orderProductRouter);
router.use('/revenues', revenueRouter);
router.use('/vendors', vendorRouter);
router.use('/warehouses', warehouseRouter);
router.use('/warehousestocks', warehouseStockRouter);
router.use('/productvendors', productVendorRouter);

module.exports = router;

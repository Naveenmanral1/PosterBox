import { Router } from "express";
import { placeOrder , getUserOrders ,getAllOrders , updateOrderStatus , orderWithRazorpay , verifyRazorpay} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminVerifyJWT } from "../middlewares/admin.auth.middleware.js";
const router = Router()

router.route('/place-order').post(verifyJWT , placeOrder)
router.route('/verify-razorpay').post(verifyJWT , verifyRazorpay)
router.route('/razorpay').post(verifyJWT , orderWithRazorpay)
router.route('/user-order').post(verifyJWT , getUserOrders)
router.route('/all-orders').get(adminVerifyJWT,getAllOrders)
router.route('/status').post(adminVerifyJWT,updateOrderStatus)

export default router
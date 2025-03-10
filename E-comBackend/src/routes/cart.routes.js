import { Router } from "express";
import { 
    addToCart , 
    getUserCart , 
    updateCart 
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/get-cart').post(verifyJWT , getUserCart)
router.route('/addtocart').post(verifyJWT , addToCart)
router.route('/updatecart').post(verifyJWT,updateCart)

export default router
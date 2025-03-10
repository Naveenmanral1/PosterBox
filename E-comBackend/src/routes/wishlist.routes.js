import { Router } from "express";
import { addToWishlist , removeFromWishlist  , getUserWishlist} from "../controllers/wishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route('/addtowishlist').post(verifyJWT , addToWishlist)
router.route('/remove').delete(verifyJWT , removeFromWishlist)
router.route('/mywishlist').get(verifyJWT , getUserWishlist)
export default router
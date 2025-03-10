import {Router} from "express";
import { 
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById
 } from "../controllers/product.controller.js";
import { adminVerifyJWT } from "../middlewares/admin.auth.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router(); 

router.route("/add-product").post(
    adminVerifyJWT,
    upload.fields([
        {name : "image1" , maxCount : 1},
        {name : "image2" , maxCount : 1},
        {name : "image3" , maxCount : 1},
        {name : "image4" , maxCount : 1},
    ])
    ,addProduct)
router.route("/update-product").patch(
    adminVerifyJWT,
    upload.fields([
        {name : "image1" , maxCount : 1},
        {name : "image2" , maxCount : 1},
        {name : "image3" , maxCount : 1},
        {name : "image4" , maxCount : 1},
    ])
    ,updateProduct)
router.route("/delete-product").delete(adminVerifyJWT,deleteProduct)
router.route("/all-product").get(getAllProduct)
router.route("/product-by-id").get(getProductById)

export default router 
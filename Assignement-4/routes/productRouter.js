const express=require('express');
const { home, getAllProducts,showAddProductPage, saveProduct, deleteProduct, showUpdateProduct, updateProduct } = require('../controllers/productController');
const router=express.Router();//make a router using express.Router();

router.get("/productlist",getAllProducts);//homepage 
router.get("/",home);//homepage 
router.get("/addproduct",showAddProductPage);//addproduct
router.post("/addproduct",saveProduct);//saveproduct with POST method
router.get("/deleteproduct/:id",deleteProduct);//delete product by using id
router.get("/updateproduct/:id",showUpdateProduct);//updateRender form product page for particular id
router.post("/updateproduct/:id",updateProduct);//updating product by using id

module.exports=router;//exporting router
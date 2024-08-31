import express from "express";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getLatestProducts, getSingleProduct, newProduct, updateProduct } from "../controllers/product";
import { singleUpload } from "../middlewares/multer";
import { adminOnly } from "../middlewares/auth";
const app = express.Router();

app.post("/new",adminOnly,singleUpload,newProduct);

app.get("/latest",getLatestProducts);

app.get("/all",getAllProducts);

app.get("/categories",getAllCategories);

app.get("/admin-products",adminOnly,getAdminProducts);


app.route("/:id").get(getSingleProduct).put(adminOnly,singleUpload,updateProduct).delete(adminOnly,deleteProduct);





export default app;
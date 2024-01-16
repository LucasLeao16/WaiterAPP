import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { createCategories } from './app/controller/categories/createCategory';
import { deleteCategory } from './app/controller/categories/deleteCategory';
import { listCategories } from './app/controller/categories/listCategories';
import { listProductsByCategory } from './app/controller/categories/listProductsByCategory';
import { updateCategory } from './app/controller/categories/updateCategory';
import { cancelOrder } from './app/controller/orders/cancelOrder';
import { changeOrderStatus } from './app/controller/orders/changeOrderStatus';
import { createOrder } from './app/controller/orders/createOrder';
import { listOrder } from './app/controller/orders/listOrders';
import { createProducts } from './app/controller/products/ createProducts';
import { deleteProduct } from './app/controller/products/deleteProducts';
import { listProducts } from './app/controller/products/listProducts';
import { updateProducts } from './app/controller/products/updateProducts';
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});

export const router = Router();

// List categories
router.get('/categories', listCategories);

//Create category
router.post('/categories', createCategories);

//Update Category
router.put('/categories/:categoryId', updateCategory);

//Delete Category
router.delete('/categories/:categoryId', deleteCategory);

//List products
router.get('/products', listProducts);

//Create product
router.post('/products', upload.single('image'), createProducts);

//Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

//Update products
router.put('/products/:productId', upload.single('image'), updateProducts);

//Delete products
router.delete('/products/:productId', deleteProduct);

// List orders
router.get('/orders', listOrder);

//Create order
router.post('/orders', createOrder);

//Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);

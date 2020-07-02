import { Router} from "https://deno.land/x/oak@v5.2.0/mod.ts";
import {getProducts, addProduct, getProduct, putProduct, deleteProduct} from './controller/products.ts'

const router = new Router()

router  .get('/api/v1/products', getProducts)
        .get('/api/v1/product/:id', getProduct)
        .post('/api/v1/product', addProduct)
        .put('/api/v1/product/:id', putProduct)
        .delete('/api/v1/product/:id', deleteProduct)

export default router
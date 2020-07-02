import { v4 } from 'https://deno.land/std/uuid/mod.ts';
import { Product } from '../types.ts'

let products: Product[] = [
    {
        id: '1',
        name: 'product one',
        description: 'this is product one',
        price: 29.99
    },
    {
        id: '2',
        name: 'product two',
        description: 'this is product two',
        price: 39.99
    },
    {
        id: '3',
        name: 'product three',
        description: 'this is product three',
        price: 59.99
    }
];

// @description get all products
// @route get /api/v1/products

const getProducts = ({response}: {response:any}) => {
    response.body = {
        success: true,
        data: products
    }
}

// @description get product
// @route get /api/v1/product/:id
const getProduct = ({params, response}: { params:{id:string}, response:any }) => {
    const product : Product | undefined = products.find(p => p.id === params.id)

    if(product){
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @description get product
// @route post /api/v1/product
const addProduct = async ({request, response}: {request:any, response:any}) => {
    const body = await request.body()
    if(!request.hasBody){
        response.status = 400
        response.body = {
            success: false,
            message: 'no data'
        }
    }else{
        const product: Product = body.value
        product.id = v4.generate()
        console.log(product.id)
        products.push(product)
        response.status= 201
        response.body = {
            success: true,
            data: product 
        }
    }
}

// @description update product
// @route post /api/v1/product/:id
const putProduct = async ({request,params,response}: {request: any, params:{id: string}, response:any}) => {
    const product : Product | undefined = products.find(p => p.id === params.id)

    if(product){
        const body = await request.body()
        const updatedData : {name?: string; description?:string; price?:number; } = body.value
        products = products.map(p => p.id === params.id ? {...p, ...updatedData} : p)
        response.body = {
            success: true,
            data: product
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

//@description delete product
//@route post /api/v1/product/:id
const deleteProduct = ({params, response}: {params: {id:string}, response:any}) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'Product removed'
    }
}

export { getProducts, getProduct, addProduct, putProduct, deleteProduct }
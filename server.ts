import { Application } from "https://deno.land/x/oak@v5.2.0/mod.ts";
import router from './routes.ts'

let port:number = 5000

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`server running on port ${port}`)
 
await app.listen({port})
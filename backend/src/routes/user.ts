import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "../../../common/src/index";
import { getUserPostsInput } from "../../../common/src/index";
export const userRouter=new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}>()
userRouter.post('/signup',async (c)=>{
    const body=await c.req.json()
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message:"invalid input"})
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const user=await prisma.user.create({
            data:{
            email:body.email,
            password:body.password,
            ...(body.name && { name: body.name })
            }
        })
        const jwt=await sign({id:user.id},c.env.JWT_SECRET)
        return c.json({jwt})
    }
    catch(e){
        console.log(e);
        c.status(411);
        return c.text('invalid');
    }
})
userRouter.post('/signin',async (c)=>{
    const body=await c.req.json()
    const {success}=signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message:"invalid input"})
    }
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const user=await prisma.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(!user){
        c.status(403);
        return c.json({error: 'user not found'})
    }
    const jwt=await sign({id:user.id},c.env.JWT_SECRET)
    return c.json({jwt})
})
userRouter.get('/me',async (c)=>{
    const authHeader=c.req.header('Authorization')
    const token=authHeader?.split(' ')[1]||'';
    const author=await verify(token,c.env.JWT_SECRET);
    const authorId= (author.id as string)||'';
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const user=await prisma.user.findUnique({
        where:{
            id:authorId
        },
        select:{
            id:true,
            name:true,
            email:true,
            password:true,
        }
    })
    return c.json({user,authorId})
})
userRouter.delete('/delete',async(c)=>{
    const authHeader=c.req.header('Authorization')
    const token=authHeader?.split(' ')[1]||'';
    const author=await verify(token,c.env.JWT_SECRET);
    const authorId= (author.id as string)||'';
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        await prisma.user.delete({
            where:{
                id:authorId
            }
        })
        return c.json({msg:"user deleted"})
    }catch(e){
        c.status(400);
        return c.json({msg:"cannot delete"})
    }
})
userRouter.get('/userProfile/:id',async(c)=>{
    const authHeader=c.req.header('Authorization')
    const token=authHeader?.split(' ')[1]||'';
    const user=await verify(token,c.env.JWT_SECRET);
    if(!user){
        c.status(403)
        return c.json({msg:"you are not logged in"})
    }
    const author=c.req.param('id');
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userProfile=await prisma.user.findUnique({
        where:{
            id:author
        },
        select:{
            name:true,
            email:true,
        }
    })
    return c.json({userProfile})
})

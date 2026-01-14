import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput } from "../../../common/src/index";
import { updatePostInput } from "../../../common/src/index";
import { deletePostInput } from "../../../common/src/index";
import { getUserPostsInput } from "../../../common/src/index";
export const blogRouter=new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables:{
    userId: string
  }
}>()
blogRouter.use(async (c,next)=>{
    const authHeader=c.req.header("Authorization");
    const token=authHeader?.split(' ')[1]||'';
    const user=await verify(token,c.env.JWT_SECRET);
    const id= user.id as string||'';
    if(user){
        c.set("userId",id);
        await next()
    }
    else{
        c.status(403)
        return c.json({
            message:"you are not logged in"
        })
    }
})
blogRouter.post('/create',async (c)=>{
    const body=await c.req.json()
    const {success}=createPostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message:"invalid input"})
    }
    const authorId=c.get("userId")||''
	console.log("Author ID:", authorId);
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            author: {
      			connect: { id: authorId },
    		},
        }
    })
    return c.json({id:post.id})
})
blogRouter.put('/update',async(c)=>{
    const body=await c.req.json()
    const {success}=updatePostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message:"invalid input"})
    }
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const post=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.json({id:post.id})
})
//can add pagination
blogRouter.get('/bulk',async(c)=>{
    // const authorId=c.get("userId")||''
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const posts=await prisma.post.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            createdAt:true,
            author:{
                select:{
                    name:true,
                    id:true
                }
            }
        }
    })
    return c.json({posts})
})
blogRouter.get('/:id',async(c)=>{
    const user=c.get("userId")||''
    const id=c.req.param('id')
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const check=await prisma.post.findUnique({
        where:{
            id:id
        },
        select:{
            authorId:true
        }
    })
    if(check===null){
        c.status(404)
        return c.json({msg:"post not found",postId:id})
    }
    const author=check.authorId||""
    const value=(user===author)
    try{
        const post=await prisma.post.findUnique({
            where:{
                id
            },
            select:{
                title:true,
                content:true,
                id:true,
                createdAt:true,
                author:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        return c.json({post,value})
    }
    catch(e){
        c.status(404)
        return c.text('not found')
    }
})
blogRouter.get('/',async(c)=>{
    const authorId=c.get("userId")||''
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const posts=await prisma.post.findMany({
            where:{
                authorId:authorId
            },
            select:{
                title:true,
                content:true,
                id:true,
                createdAt:true,
                author:{
                    select:{
                        name:true,
                        id:true
                    }
                },
            }
        })
        return c.json({posts});
    }
    catch(e){
        c.status(404)
        return c.text('not found')
    }
})
blogRouter.delete('/delete',async(c)=>{
    const body=await c.req.json();
    const {success}= deletePostInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({message:"invalid input"})
    }
    const id=body.id as string||''
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        await prisma.post.delete({
            where:{
                id
            }
        })
        return c.json({message:"deleted post"})
    }catch(e){
        c.status(400)
        return c.json({message:"cannot delete"})
    }
})
blogRouter.delete('deleteAll',async(c)=>{
    const authorId=c.get("userId")||''
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        await prisma.post.deleteMany({
            where:{
                authorId:authorId
            }
        })
        return c.json({message:"deleted all posts for author"})
    }catch(e){
        c.status(400)
        return c.json({message:"cannot delete"})
    }
})
blogRouter.get('/userBlogs/:id',async(c)=>{
    const author=c.req.param('id');
    const prisma = new PrismaClient({
        //@ts-ignore
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const userPosts=await prisma.post.findMany({
            where:{
                authorId:author
            },
            select:{
                title:true,
                content:true,
                id:true,
                createdAt:true,
                author:{
                    select:{
                        name:true,
                        id:true
                    }
                }
            }
        })
        return c.json({userPosts})
    }catch(e){
        c.status(404)
        return c.text('not found')
    }

})
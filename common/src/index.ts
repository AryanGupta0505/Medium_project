import z from 'zod';
export const signupInput=z.object({
    email:z.string().email(),
    password:z.string().min(6),
    name:z.string().optional()
})
export const signinInput=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})
export const createPostInput=z.object({
    title:z.string().min(5),
    content:z.string().min(5)
})
export const updatePostInput=z.object({
    title:z.string().min(5),
    content:z.string().min(5),
    id:z.string()
})
export const deletePostInput=z.object({
    id:z.string()
})
export const getUserPostsInput=z.object({
    id:z.string()
})
export type SignupInput=z.infer<typeof signupInput>;
export type SigninInput=z.infer<typeof signinInput>;
export type CreatePostInput=z.infer<typeof createPostInput>;
export type UpdatePostInput=z.infer<typeof updatePostInput>;
export type DeletePostInput=z.infer<typeof deletePostInput>;
export type GetUserPostsInput=z.infer<typeof getUserPostsInput>;

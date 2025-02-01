import z from 'zod';

export const SignInSchema = z.object({
    email:z.string().min(1,{message:"Email is required"}).email({message:"Please provide a valid email address."}),
    password:z.string().min(6,{message:'Password must be atleast 6 characters long'}).max(100,{message:'Password must be less than 100 characters long'})
})

export const SignUpSchema = z.object({
    username:z.string().min(5,{message:'Username must be atleast 5 characters long'}).max(30,{message:'Username must be less than 30 characters long'}),
    name:z.string().min(1,{message:'Name is required'})
          .max(50,{message:'Name must be less than 50 characters long'})
          .regex(/^[a-zA-Z\s]+$/,{message:'Name can only contain letters and spaces'}),
    email:z.string().min(1,{message:"Email is required"}).email({message:"Please provide a valid email address."}),
    password:z.string().min(6,{message:'Password must be atleast 6 characters long'})
            .max(100,{message:'Password must be less than 100 characters long'})
            .regex(/[A-Z]/,{message:'Password must contain at least one uppercase letter'})
            .regex(/[a-z]/,{message:'Password must contain at least one lowercase letter'})
            .regex(/[0-9]/,{message:'Password must contain at least one number'})
            .regex(/[^a-zA-Z0-9]/,{message:'Password must contain at least one special character'})
})
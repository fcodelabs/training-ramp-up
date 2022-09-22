import { z } from "zod";

//validate user signup data
export const signupInputDataValidator = z.object({
        name:z.string().min(1,{message:"Name must not be empty!"}),
        email:z.string().min(1,{ message: "Please provide email" }).email({ message: "Invalid email address!" }),
        password:z.string().min(6,{ message: "Password must be 6 or more characters long!" }),
});

export type SignUpDataInputType =z.infer<typeof signupInputDataValidator>;


//validate user login data
export const loginInputDataValidator = z.object({
        email:z.string().min(1,{ message: "Please provide email!" }).email({ message: "Invalid email address!" }),
        password:z.string().min(1,{ message: "Please provide password!" }),
});

export type LogInDataInputType =z.infer<typeof loginInputDataValidator>;
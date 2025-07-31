import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodValidation = z.object({
    name: z.string({ error: "নাম অবশ্যই একটি স্ট্রিং হতে হবে" })
        .min(2, { message: "নাম অন্তত ২ অক্ষরের হতে হবে" })
        .max(50, { message: "নাম ৫০ অক্ষরের বেশি হতে পারবে না" }),
    email: z.email({ message: "সঠিক একটি ইমেইল প্রদান করুন" }),
    password: z.string({ error: "Password Must be string" }).min(8, { message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" })
        .regex(/[A-Z]/, { message: "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর থাকতে হবে" })
        .regex(/[0-9]/, { message: "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে" })
        .regex(/[^A-Za-z0-9]/, { message: "পাসওয়ার্ডে অন্তত একটি বিশেষ অক্ষর থাকতে হবে" }),
    phone: z.string({ error: "Phoen must be string" }).regex(/^01[0-9]{9}$/, {
        message: "সঠিক বাংলাদেশি ফোন নম্বর দিন (যেমনঃ 01XXXXXXXXX)",
    }).optional(),
    address: z.string({ error: "Address must be string" }).max(200, { message: "Express cannot exceed 200 charecters" }).optional()
});
export const updateUserZodValidation = z.object({
    name: z.string({ error: "নাম অবশ্যই একটি স্ট্রিং হতে হবে" })
        .min(2, { message: "নাম অন্তত ২ অক্ষরের হতে হবে" })
        .max(50, { message: "নাম ৫০ অক্ষরের বেশি হতে পারবে না" }).optional(),
    password: z.string({ error: "Password Must be string" }).min(8, { message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" })
        .regex(/[A-Z]/, { message: "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর থাকতে হবে" })
        .regex(/[0-9]/, { message: "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে" })
        .regex(/[^A-Za-z0-9]/, { message: "পাসওয়ার্ডে অন্তত একটি বিশেষ অক্ষর থাকতে হবে" }).optional(),
    phone: z.string({ error: "Phoen must be string" }).regex(/^01[0-9]{9}$/, {
        message: "সঠিক বাংলাদেশি ফোন নম্বর দিন (যেমনঃ 01XXXXXXXXX)",
    }).optional(),
    address: z.string({ error: "Address must be string" }).max(200, { message: "Express cannot exceed 200 charecters" }).optional(),
    role: z.enum(Object.keys(Role) as [string]),
    isActive :  z.enum(Object.values(IsActive) as [string]),
    isDeleted : z.boolean({error : "isDelete must be true of false"}).optional(),
    isVerified : z.boolean({error : "isVrified must be true of false"}).optional(),
});
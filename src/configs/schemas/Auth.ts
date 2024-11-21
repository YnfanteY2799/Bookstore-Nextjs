import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("emerror").min(1, "emerror"),
  password: z.string().min(8, "pwerror"),
});

export type TLoginFS = z.infer<typeof LoginFormSchema>;

export const RecoverFormSchema = z.object({
  email: z.string().min(1, "emerror").email("emerror"),
});

export type TRecoverFS = z.infer<typeof RecoverFormSchema>;

export const RegisterModalFormSchema = z.object({
  username: z.string().min(8, { message: "" }),
  email: z.string().email("emerror").min(1, "emerror"),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." }),
});

export type TypeRegisterMFS = z.infer<typeof RegisterModalFormSchema>;

export const RegisterFormSchema = z.object({});

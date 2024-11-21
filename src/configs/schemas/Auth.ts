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

import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email("emerror").min(1, "emerror"),
  password: z.string().min(8, "pwerror"),
});

export type TLoginFS = z.infer<typeof LoginFormSchema>;

export const RecoverFormSchema = z.object({ email: z.string().min(1, "emerror").email("emerror") });

export type TRecoverFS = z.infer<typeof RecoverFormSchema>;

export const RegisterModalFormSchema = z
  .object({
    username: z.string().min(8, { message: "unerror" }),
    email: z.string().email("emerror").min(1, "emerror"),
    password: z
      .string()
      .min(8, { message: "pwminerr" })
      .regex(/[a-zA-Z]/, { message: "pwmoneletternerr" })
      .regex(/[0-9]/, { message: "pwmonenumbernerr" })
      .regex(/[^a-zA-Z0-9]/, { message: "pwmonespecnerr" }),
    confirm_password: z
      .string()
      .min(8, { message: "pwminerr" })
      .regex(/[a-zA-Z]/, { message: "pwmoneletternerr" })
      .regex(/[0-9]/, { message: "pwmonenumbernerr" })
      .regex(/[^a-zA-Z0-9]/, { message: "pwmonespecnerr" }),
  })
  .refine(({ confirm_password, password }) => confirm_password === password, {
    message: "errpwnm",
    path: ["confirm_password"],
  });

export type TypeRegisterMFS = z.infer<typeof RegisterModalFormSchema>;

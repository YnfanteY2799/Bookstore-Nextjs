"use server";
import { createUser, findUserByEmail, verifyPasswordHash } from "@/utils/server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import type { TLoginFS, TRecoverFS, TypeRegisterMFS } from "@/configs";

export async function LoginService({ email, password }: TLoginFS): Promise<any> {
  try {
    const userByEmail = await findUserByEmail({ email });
    if (!userByEmail) throw new Error("usnferr");
    if (!(await verifyPasswordHash(userByEmail.hashed_password, password))) throw new Error("uswcerror");
    
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function RestoreService({ email }: TRecoverFS): Promise<any> {
  try {
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function RegisterService(data: TypeRegisterMFS): Promise<any> {
  try {
    const { id, username } = await createUser(data);

    return { id, username };
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

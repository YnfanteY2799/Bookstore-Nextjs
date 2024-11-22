"use server";
import { createUser } from "@/utils/server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

import type { TLoginFS, TRecoverFS, TypeRegisterMFS } from "@/configs";

export async function LoginService({ email, password }: TLoginFS): Promise<any> {
  try {
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function RestoreService(data: TRecoverFS): Promise<any> {
  try {
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function RegisterService(data: TypeRegisterMFS): Promise<any> {
  try {
    const user = await createUser(data);

    return user;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

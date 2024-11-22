"use server";
import { createUser } from "@/utils/server";

import type { TLoginFS, TRecoverFS, TypeRegisterMFS } from "@/configs";

export async function LoginService(data: TLoginFS): Promise<any> {}

export async function RestoreService(data: TRecoverFS): Promise<any> {}

export async function RegisterService(data: TypeRegisterMFS): Promise<any> {
  try {
    const user = await createUser(data);
    console.log(user);
    return user;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

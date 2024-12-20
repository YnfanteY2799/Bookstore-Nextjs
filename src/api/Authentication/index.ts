"use server";
import { createUser, findUserByEmail, verifyPasswordHash, encryptJWT } from "@/utils/server";
import { cookies } from "next/headers";

import type { TLoginFS, TRecoverFS, TypeRegisterMFS } from "@/configs";

export async function LoginService({ email, password }: TLoginFS): Promise<any> {
  try {
    const { hashed_password, ...userByEmail } = await findUserByEmail({ email });
    if (!userByEmail) throw new Error("usnferr");
    if (!(await verifyPasswordHash(hashed_password, password))) throw new Error("uswcerror");

    const expires = new Date(Date.now() + 60 * 60 * 24 * 30);
    const session = await encryptJWT({ userByEmail, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });

    return userByEmail;
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
    const userByEmail = await createUser(data);
    const expires = new Date(Date.now() + 60 * 60 * 24 * 30);
    const session = await encryptJWT({ userByEmail, expires });

    // Save the session in a cookie
    (await cookies()).set("session", session, { expires, httpOnly: true });
    return userByEmail;
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

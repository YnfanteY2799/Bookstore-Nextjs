import { hashPassword } from "@/utils/server";
import { prisma } from "@/db";

import type { TypeRegisterMFS } from "@/configs";

export async function createUser({ username, email, password }: TypeRegisterMFS): Promise<any> {
  try {
    const newUser = await prisma.user.create({
      data: { email, username, hashed_password: await hashPassword(password) },
    });
    if (!newUser) throw new Error("uscrerr");
    return { username };
  } catch (e) {
    return e;
  }
}

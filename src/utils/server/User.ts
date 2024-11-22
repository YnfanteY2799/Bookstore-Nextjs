import { hashPassword } from "@/utils/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/db";

import type { TypeRegisterMFS } from "@/configs";

export async function createUser({ username, email, password }: TypeRegisterMFS): Promise<{ username: string }> {
  try {
    const newUser = await prisma.user.create({
      data: { email, username, hashed_password: await hashPassword(password) },
      select: { username: true },
    });
    if (!newUser) throw new Error("uscrerr");
    return newUser;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.code === "P2002" ? "uscrerr" : "errdbcon");
    } else {
      throw new Error((e as Error).message);
    }
  }
}

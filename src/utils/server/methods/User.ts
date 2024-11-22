import { hashPassword } from "@/utils/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/db";

import type { TypeRegisterMFS } from "@/configs";

export async function createUser({ username, email, password }: TypeRegisterMFS): Promise<{ id: number; username: string }> {
  try {
    const newUser = await prisma.user.create({
      data: { email, username, hashed_password: await hashPassword(password) },
      select: { id: true, username: true },
    });
    if (!newUser) throw new Error("uscrerr");
    return newUser;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) throw new Error(e.code === "P2002" ? "uscrerr" : "errdbcon");
    else throw new Error((e as Error).message);
  }
}

export async function findUserByUsername({ username }: TypeRegisterMFS): Promise<{ id: number; username: string }> {
  try {
    const user = await prisma.user.findUnique({ where: { username }, select: { id: true, username: true } });
    if (!user) throw new Error("usnferr");
    return user;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) throw new Error(e.code === "P2002" ? "uscrerr" : "errdbcon");
    else throw new Error((e as Error).message);
  }
}

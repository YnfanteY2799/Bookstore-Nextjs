"use server";

import type { TLoginFS, TRecoverFS } from "@/configs";

export async function LoginService(data: TLoginFS): Promise<any> {}

export async function RestoreService(data: TRecoverFS): Promise<any> {}

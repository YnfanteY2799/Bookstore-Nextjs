import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { books } from "@/utils/client/consts.ts";
import { getMessages } from "next-intl/server";
import HomeComponent from "./component.tsx";

import type { ICommonRSCSluggedProps } from "@/types";
import type { ReactNode } from "react";

export default async function HomePage({ searchParams }: ICommonRSCSluggedProps): Promise<ReactNode> {
  const { query } = await searchParams;
  const { Common } = await getMessages();

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages}>
      <HomeComponent Books={books} />
    </NextIntlClientProvider>
  );
}

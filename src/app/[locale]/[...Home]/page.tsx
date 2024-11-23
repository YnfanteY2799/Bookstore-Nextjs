import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import HomeComponent from "./component.tsx";
import { getBooks } from "@/api";

import type { ICommonRSCSluggedProps } from "@/types";
import type { ReactNode } from "react";

export default async function HomePage({ searchParams }: ICommonRSCSluggedProps): Promise<ReactNode> {
  const { Common } = await getMessages();
  const { query } = await searchParams;

  const books = await getBooks(query);

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages}>
      <HomeComponent Books={books} />
    </NextIntlClientProvider>
  );
}

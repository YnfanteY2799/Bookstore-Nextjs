import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import HomeComponent from "./component.tsx";
import { unstable_cache } from "next/cache";
import { getBooks } from "@/api";

import type { ICommonRSCSluggedProps } from "@/types";
import type { ReactNode } from "react";

export default async function HomePage({ searchParams }: ICommonRSCSluggedProps): Promise<ReactNode> {
  const { Common } = await getMessages();
  const { query } = await searchParams;

  const fetch_books = unstable_cache(async () => await getBooks(query), ["books"], { revalidate: 6000, tags: ["books"] });
  const books = await fetch_books();

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages}>
      <HomeComponent Books={books} />
    </NextIntlClientProvider>
  );
}

import { type AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import HomeComponent from "./component.tsx";

import type { ICommonRSCSluggedProps } from "@/types";
import type { ReactNode } from "react";
import { books } from "@/utils/client/consts.ts";

export default function HomePage({ searchParams }: ICommonRSCSluggedProps): ReactNode {
  // Hooks
  const { query } = searchParams;
  const { Common } = useMessages();

  const locale = useLocale();

  console.log({ query });

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages} locale={locale}>
      <HomeComponent Books={books} />
    </NextIntlClientProvider>
  );
}

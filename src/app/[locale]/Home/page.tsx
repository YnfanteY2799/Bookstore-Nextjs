import { type AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import HomeComponent from "./component.tsx";

import type { ReactNode } from "react";

export default function HomePage(): ReactNode {
  // Hooks
  const { Common } = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages} locale={locale}>
      <HomeComponent />
    </NextIntlClientProvider>
  );
}

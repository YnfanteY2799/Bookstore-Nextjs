import { type AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import LangSelectSwitcher from "./parts/Lang/Lang.tsx";

import type { ReactNode } from "react";

export default function LangSwitcher(): ReactNode {
  // Hooks
  const { Common } = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages} locale={locale}>
      <LangSelectSwitcher />
    </NextIntlClientProvider>
  );
}

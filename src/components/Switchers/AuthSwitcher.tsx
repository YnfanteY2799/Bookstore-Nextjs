import { type AbstractIntlMessages, NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import AuthBasedUser from "./parts/Auth/AuthBasedUser.tsx";
import { ReactNode } from "react";

export default function LangSwitcher(): ReactNode {
  // Hooks
  const { Common } = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider messages={Common as AbstractIntlMessages} locale={locale}>
      <AuthBasedUser />
    </NextIntlClientProvider>
  );
}

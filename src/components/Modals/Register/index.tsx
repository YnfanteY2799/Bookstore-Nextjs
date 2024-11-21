import { type AbstractIntlMessages, NextIntlClientProvider, useMessages } from "next-intl";
import RegisterModal from "./Modal.tsx";

import type { ReactNode } from "react";

export default function BaseRegisterModal(): ReactNode {
  // Hooks
  const { Modal, Common } = useMessages();

  return (
    <NextIntlClientProvider messages={{ Modal, Common } as AbstractIntlMessages}>
      <RegisterModal />
    </NextIntlClientProvider>
  );
}

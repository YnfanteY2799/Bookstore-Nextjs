import { type AbstractIntlMessages, NextIntlClientProvider, useMessages } from "next-intl";
import LoginModal from "./Modal.tsx";

import type { ReactNode } from "react";

export default function BaseLoginModal(): ReactNode {
  // Hooks
  const { Modal, Common } = useMessages();

  return (
    <NextIntlClientProvider messages={{ Modal, Common } as AbstractIntlMessages}>
      <LoginModal />
    </NextIntlClientProvider>
  );
}

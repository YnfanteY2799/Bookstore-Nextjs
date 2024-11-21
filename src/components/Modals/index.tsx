import { type AbstractIntlMessages, NextIntlClientProvider, useMessages } from "next-intl";
import RegisterModal from "./Register/Modal.tsx";
import LoginModal from "./Login/Modal.tsx";

import type { ReactNode } from "react";

export default function BaseLoginModal(): ReactNode {
  // Hooks
  const { Modal, Common } = useMessages();

  return (
    <NextIntlClientProvider messages={{ Modal, Common } as AbstractIntlMessages}>
      <LoginModal />
      <RegisterModal />
    </NextIntlClientProvider>
  );
}

import { type AbstractIntlMessages, NextIntlClientProvider, useMessages } from "next-intl";
import LoginModal from "./Modal.tsx";

import type { ReactNode } from "react";

export default function BaseLoginModal(): ReactNode {
  // Hooks
  const { Modal, Navbar, Errors, Status, Form_Labels } = useMessages();

  // Simple Obj restruct
  const messages = { Modal, Navbar, Common: { Errors, Status, Form_Labels } } as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={messages}>
      <LoginModal />
    </NextIntlClientProvider>
  );
}

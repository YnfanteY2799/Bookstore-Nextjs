"use client";
import { SignOut, UserCircleDashed, User as UserIcon, UserPlus, UserSquare } from "@phosphor-icons/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useLoginModal, useRegisterModal } from "@/utils/client";
import { useRouter } from "@/i18n/routing.ts";
import { useTranslations } from "next-intl";

import type { ReactNode } from "react";

export default function AuthBasedUser(): ReactNode {
  // Hooks
  const { onOpen: onRegisOpen } = useRegisterModal((s) => s);
  const { onOpen: onLoginOpen } = useLoginModal((s) => s);
  const t = useTranslations("Actions");
  const { push } = useRouter();
  const isLogged = true;

  function goToMyProfile() {
    // push({ pathname: "/Profile", query });
  }

  return isLogged ? (
    <Dropdown size="sm">
      <DropdownTrigger>
        <Button variant="light" size="sm" className="capitalize" isIconOnly>
          <UserCircleDashed size={18} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" color="primary" variant="bordered">
        <DropdownItem key="myProfile" color="success" endContent={<UserSquare size={18} />}>
          {t("myProfile")}
        </DropdownItem>
        <DropdownItem key="logOut" color="danger" endContent={<SignOut size={18} />}>
          {t("logOut")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Dropdown size="sm">
      <DropdownTrigger>
        <Button variant="light" size="sm" className="capitalize" isIconOnly>
          <UserIcon size={18} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" variant="bordered">
        <DropdownItem key="login" color="primary" endContent={<UserIcon size={18} />} onPress={onLoginOpen}>
          {t("login")}
        </DropdownItem>
        <DropdownItem key="register" color="warning" endContent={<UserPlus size={18} />} onPress={onRegisOpen}>
          {t("register")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

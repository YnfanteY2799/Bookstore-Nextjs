"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User, Button } from "@nextui-org/react";
import { SignOut, User as UserIcon, UserPlus, UserSquare } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { type ReactNode } from "react";

export default function AuthBasedUser(): ReactNode {
  // Hooks
  const t = useTranslations("Actions");
  const isLogged = false;

  return isLogged ? (
    <Dropdown size="sm">
      <DropdownTrigger>
        <User
          name="Jane Doe"
          description="User"
          avatarProps={{ size: "sm", src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
        />
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
        <DropdownItem key="login" color="primary" endContent={<UserIcon size={18} />}>
          {t("login")}
        </DropdownItem>
        <DropdownItem key="register" color="warning" endContent={<UserPlus size={18} />}>
          {t("register")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

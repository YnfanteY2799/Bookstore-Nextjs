"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { User as UserIcon } from "@phosphor-icons/react";
import { type ReactNode } from "react";

export default function AuthBasedUser(): ReactNode {
  const isLogged = false;

  return (
    <>
      {isLogged ? (
        <Dropdown>
          <DropdownTrigger>
            <User
              name="Jane Doe"
              description="User"
              avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d" }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Dropdown>
          <DropdownTrigger>
            <User name="Jane Doe" description="Product Designer" avatarProps={{ icon: <UserIcon /> }} />
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </>
  );
}

"use client";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Plus } from "@phosphor-icons/react";
import { type ReactNode } from "react";

export default function AddBookModal(): ReactNode {
  const { isOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="light" isIconOnly size="sm" onPress={onOpenChange}>
        <Plus size={20} />
      </Button>
      <Modal hideCloseButton backdrop="blur" size="md" placement="auto" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>{(onClose) => <></>}</ModalContent>
      </Modal>
    </>
  );
}

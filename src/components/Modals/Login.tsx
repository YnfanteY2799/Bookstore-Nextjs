"use client";
import { type ReactNode, type KeyboardEvent, useState, useRef, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResizableDiv } from "@/components";
import { toast } from "sonner";
import {
  Input,
  Modal,
  Button,
  Checkbox,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";

export default function LoginModal(): ReactNode {
  const { isOpen, onClose } = useDisclosure();

  return (
    <Modal hideCloseButton backdrop="blur" size="md" placement="auto" isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>{(onClose) => <></>}</ModalContent>
    </Modal>
  );
}

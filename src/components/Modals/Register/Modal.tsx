"use client";
import { Input, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { RegisterModalFormSchema, TypeRegisterMFS } from "@/configs";
import { type ReactNode, type KeyboardEvent, useRef } from "react";
import { useLoginModal, useRegisterModal } from "@/utils/client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ResizableDiv } from "@/components";
import { X } from "@phosphor-icons/react";

export default function RegisterModal(): ReactNode {
  // Hooks
  const { onClose, isOpen } = useRegisterModal((s) => s);
  const t = useTranslations("Modal.Register");
  const { onOpen } = useLoginModal((s) => s);
  const commons = useTranslations("Common");

  // Ref's
  const formRef = useRef<HTMLFormElement>(null);

  // RHF
  const { handleSubmit, reset, formState, register } = useForm<TypeRegisterMFS>({
    defaultValues: { email: "", username: "", password: "" },
    resolver: zodResolver(RegisterModalFormSchema),
  });

  // Destructuring Error
  const { email, password, username } = formState.errors;

  // Functions
  function handleSyntheticSubmit(): void {
    const curr = formRef.current;
    if (curr) curr.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  function enterSubmit({ key }: KeyboardEvent): void {
    if (key === "Enter") handleSyntheticSubmit();
  }

  function goToAlter(): void {
    onClose();
    onOpen();
  }

  // Form handle
  const onSubmit: SubmitHandler<TypeRegisterMFS> = async ({ email, password, username }) => {
    const encodedData = encodeURIComponent(`${email}||${password}`);

    onClose();
  };

  return (
    <Modal hideCloseButton backdrop="blur" size="md" placement="auto" isOpen={isOpen} onOpenChange={onClose} onClose={reset}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between gap-[2px]">
              <div></div>
              {t("initialText")}
              <Button variant="light" onPress={onClose} isIconOnly size="sm" color="danger">
                <X size={20} />
              </Button>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-0" onKeyDown={enterSubmit}>
              <ResizableDiv>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-[8px] transition-height py-[2px]"
                >
                  <Input
                    size="lg"
                    radius="md"
                    type="text"
                    maxLength={254}
                    variant="bordered"
                    isInvalid={!!username}
                    labelPlacement="outside"
                    {...register("username")}
                    label={commons("Form_Labels.username")}
                    errorMessage={username ? commons(`Errors.${username.message}`) : ""}
                  />
                  <Input
                    size="lg"
                    radius="md"
                    type="email"
                    maxLength={254}
                    variant="bordered"
                    isInvalid={!!email}
                    {...register("email")}
                    labelPlacement="outside"
                    label={commons("Form_Labels.email")}
                    errorMessage={email ? commons(`Errors.${email.message}`) : ""}
                  />
                  <Input
                    size="lg"
                    radius="md"
                    type="text"
                    maxLength={254}
                    variant="bordered"
                    labelPlacement="outside"
                    isInvalid={!!password}
                    {...register("password")}
                    label={commons("Form_Labels.password")}
                    errorMessage={password ? commons(`Errors.${password.message}`) : ""}
                  />
                </form>
              </ResizableDiv>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-4">
              <Button size="md" type="submit" color="primary" className="w-full" onPress={handleSyntheticSubmit}>
                {t("register")}
              </Button>

              <div className="flex my-3 items-center text-center">
                <hr className="border-default border-1 w-full rounded-md" />
                <label className="block font-medium text-sm w-full">{t("or")}</label>
                <hr className="border-default border-1 w-full rounded-md" />
              </div>

              <div className="text-center">
                <div className="flex flex-row items-center justify-center gap-2 cursor-pointer text-sm">
                  <p>{t("alreadyAccount")}</p>
                  <p
                    onClick={goToAlter}
                    className="dark:text-neutral-500 dark:hover:text-primary hover:underline text-secondary cursor-pointer hover:text-primary"
                  >
                    {t("login")}
                  </p>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

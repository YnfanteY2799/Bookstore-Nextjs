"use client";
import { Input, Modal, Button, ModalBody, ModalFooter, ModalHeader, ModalContent } from "@nextui-org/react";
import { type TLoginFS, type TRecoverFS, LoginFormSchema, RecoverFormSchema } from "@/configs";
import { type ReactNode, type KeyboardEvent, useState, useRef } from "react";
import { useLoginModal, useRegisterModal } from "@/utils/client";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, X } from "@phosphor-icons/react";
import { LoginService, RestoreService } from "@/api";
import { ResizableDiv } from "@/components";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function LoginModal(): ReactNode {
  // Hooks
  const { onClose, isOpen } = useLoginModal((s) => s);
  const { onOpen } = useRegisterModal((s) => s);
  const commons = useTranslations("Common");
  const t = useTranslations("Modal.Login");

  // State
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Ref's
  const formRef = useRef<HTMLFormElement>(null);

  // RHF
  const { register, reset, formState, handleSubmit, getValues } = useForm<TLoginFS>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginFormSchema),
  });

  const {
    handleSubmit: handleRestore,
    formState: restoreformState,
    register: restoreRegister,
    reset: restoreReset,
    setValue,
  } = useForm<TRecoverFS>({ resolver: zodResolver(RecoverFormSchema), defaultValues: { email: "" } });

  // Destructuring Errors
  const { email, password } = formState.errors;
  const { email: rEmail } = restoreformState.errors;

  // Functions
  function goBack(): void {
    setResetPassword((old) => !old);
  }

  function handleSyntheticSubmit(): void {
    const curr = formRef.current;
    if (curr) curr.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  }

  function enterSubmit({ key }: KeyboardEvent): void {
    if (key === "Enter") handleSyntheticSubmit();
  }

  function goRestore(): void {
    setResetPassword(() => {
      setValue("email", getValues("email"));
      return true;
    });
  }

  function goToAlter(): void {
    onClose();
    onOpen();
  }

  function formsReset(): void {
    reset();
    restoreReset();
  }

  // Form handle
  const onSubmit: SubmitHandler<TLoginFS> = async (data) => {
    setIsLoading(true);
    toast.promise(LoginService(data), {
      loading: commons("Status.loading"),
      error: (response: Error) => {
        console.log("blown up", { response });
        return response.message;
      },
      success: (response) => {
        onClose();
        return commons("Status.welcome", { username: response.username });
      },
    });
    setIsLoading(false);
  };

  const onRSubmit: SubmitHandler<TRecoverFS> = async (data) => {
    setIsLoading(true);
    toast.promise(RestoreService(data), {
      loading: commons("Status.loading"),
      error: (response: Error) => {
        setIsLoading(false);
        console.log({ response });
        return response.message;
      },
      success: () => {
        setIsLoading(false);
        return "Ok";
      },
    });
  };

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      size="md"
      placement="auto"
      isOpen={isOpen}
      onOpenChange={onClose}
      onClose={formsReset}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between gap-2">
              {resetPassword ? (
                <>
                  <Button variant="light" onPress={goBack} isIconOnly size="sm" color="primary">
                    <ArrowLeft size={20} />
                  </Button>
                  {t("recoverText")}
                  <Button variant="light" onPress={onClose} isIconOnly size="sm" color="danger">
                    <X size={20} />
                  </Button>
                </>
              ) : (
                <>
                  <div></div>
                  {t("initialText")}
                  <Button variant="light" onPress={onClose} isIconOnly size="sm" color="danger">
                    <X size={20} />
                  </Button>
                </>
              )}
            </ModalHeader>

            <ModalBody className="flex flex-col gap-[2px]" onKeyDown={enterSubmit}>
              <ResizableDiv>
                {resetPassword ? (
                  <>
                    <form
                      ref={formRef}
                      onSubmit={handleRestore(onRSubmit)}
                      className="flex flex-col gap-[8px] transition-height"
                    >
                      <Input
                        size="lg"
                        radius="md"
                        type="email"
                        maxLength={100}
                        variant="bordered"
                        isInvalid={!!rEmail}
                        isReadOnly={isLoading}
                        {...restoreRegister("email")}
                        labelPlacement="outside"
                        label={commons("Form_Labels.email")}
                        errorMessage={rEmail && commons(`Errors.${rEmail.message}`)}
                      />
                    </form>
                  </>
                ) : (
                  <>
                    <form
                      ref={formRef}
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-[8px] transition-height"
                    >
                      <Input
                        size="lg"
                        radius="md"
                        type="email"
                        maxLength={100}
                        variant="bordered"
                        isInvalid={!!email}
                        autoComplete="email"
                        {...register("email")}
                        isReadOnly={isLoading}
                        labelPlacement="outside"
                        label={commons("Form_Labels.email")}
                        errorMessage={email && commons(`Errors.${email.message}`)}
                      />
                      <Input
                        size="lg"
                        radius="md"
                        type="password"
                        maxLength={100}
                        variant="bordered"
                        isReadOnly={isLoading}
                        isInvalid={!!password}
                        autoComplete="password"
                        labelPlacement="outside"
                        {...register("password")}
                        label={commons("Form_Labels.password")}
                        errorMessage={password && commons(`Errors.${password.message}`)}
                      />

                      <div className="flex justify-between mx-[2px] pt-1">
                        <p onClick={goRestore} className="hover:text-primary hover:underline hover:cursor-pointer">
                          {t("forgot")}
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </ResizableDiv>
            </ModalBody>

            <ModalFooter className="flex flex-col gap-4">
              <Button
                size="md"
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
                isDisabled={isLoading}
                onPress={handleSyntheticSubmit}
              >
                {resetPassword ? t("recover") : t("login")}
              </Button>

              <div className="flex my-3 items-center text-center">
                <hr className="border-default border-1 w-full rounded-md" />
                <label className="block font-medium text-sm w-full">{t("or")}</label>
                <hr className="border-default border-1 w-full rounded-md" />
              </div>

              <div className="text-center">
                <div className="flex flex-row items-center justify-center gap-2 cursor-pointer text-sm">
                  <p>{t("notAccountYet")}</p>
                  <p
                    onClick={goToAlter}
                    className="dark:text-neutral-500 dark:hover:text-primary hover:underline text-secondary cursor-pointer hover:text-primary"
                  >
                    {t("register")}
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

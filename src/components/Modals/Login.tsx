"use client";
import { type TLoginFS, type TRecoverFS, LoginFormSchema, RecoverFormSchema } from "@/configs";
import { type ReactNode, type KeyboardEvent, useState, useRef, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeft, User, X } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginService, RestoreService } from "@/api";
import { ResizableDiv, TextHeading } from "@/components";
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
  // Hooks
  const { isOpen, onClose, onOpenChange } = useDisclosure();

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
    <>
      <Button color="primary" variant="light" isIconOnly size="sm">
        <User size={20} />
      </Button>
      <Modal hideCloseButton backdrop="blur" size="md" placement="auto" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-2">
                {resetPassword ? (
                  <>
                    <Button variant="light" onPress={goBack} isIconOnly size="sm" color="primary">
                      <ArrowLeft size={20} />
                    </Button>
                    Recover your account
                    <Button variant="light" onPress={onClose} isIconOnly size="sm" color="danger">
                      <X size={20} />
                    </Button>
                  </>
                ) : (
                  <>
                    <div></div>
                    Welcome To minimal Bookstore
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
                      <TextHeading isCenter={false} title={t("recover")} />
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
                          labelPlacement="outside"
                          {...restoreRegister("email")}
                          label={commons("Form_Labels.email")}
                          errorMessage={rEmail && commons(`Errors.${rEmail.message}`)}
                        />
                      </form>
                    </>
                  ) : (
                    <>
                      <TextHeading isCenter={false} title={t("welcome")} />
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
                          <Checkbox id="remember" radius="md">
                            {t("remember")}
                          </Checkbox>
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
                <div className="text-center">
                  <div className="flex flex-row items-center justify-center gap-2 cursor-pointer text-sm">
                    <p>{t("notAccountYet")}</p>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

"use client";
import { type ReactNode, type KeyboardEvent, useState, useRef, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, User, X } from "@phosphor-icons/react";
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
    toast.promise(serviceBasedLogin(data), {
      loading: commons("Status.loading"),
      error: (response: Error) => {
        console.log("blown up", { response });
        return response.message;
      },
      success: (response) => {
        setUser && setUser(response);
        onClose();
        return commons("Status.welcome", { username: response.username });
      },
    });
    setIsLoading(false);
  };

  const onRSubmit: SubmitHandler<TRecoverFS> = async (data) => {
    setIsLoading(true);
    toast.promise(serviceBasedRecover(data), {
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
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

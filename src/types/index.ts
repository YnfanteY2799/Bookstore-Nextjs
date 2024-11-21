export * from "./components.ts";

/* Store Hooks Interfaces */
export interface ICommonModalStore {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

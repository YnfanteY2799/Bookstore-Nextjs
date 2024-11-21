import { create } from "zustand";

import type { ICommonModalStore } from "@/types";

const useLoginModal = create<ICommonModalStore>((set) => ({
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
  isOpen: false,
}));

export default useLoginModal;

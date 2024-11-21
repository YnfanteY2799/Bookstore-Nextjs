"use client";
import { useMeasure } from "@/utils/client";
import { motion } from "framer-motion";

import type { IBaseComponent } from "@/types";
import type { ReactNode } from "react";

export default function ResiableDiv({ children, className }: IBaseComponent): ReactNode {
  // Hooks
  const [ref, { height }] = useMeasure<HTMLDivElement>();

  return (
    <motion.div animate={{ height }} className={className}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}

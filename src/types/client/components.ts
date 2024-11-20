import type { ReactNode } from "react";

/* useMeasure Hook Types */
export type UseMeasureRect = Pick<DOMRectReadOnly, "x" | "y" | "top" | "left" | "right" | "bottom" | "height" | "width">;
export type UseMeasureResult<E extends Element = Element> = [UseMeasureRef<E>, UseMeasureRect];
export type UseMeasureRef<E extends Element = Element> = (element: E) => void;
/* useMeasure Hook Types */

export interface RSC {
  children: ReactNode;
}

export interface IBaseComponent {
  className?: string;
  children?: ReactNode;
}

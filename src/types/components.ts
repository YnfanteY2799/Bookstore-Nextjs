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

export interface ITextHeadingProps {
  title?: string;
  subTitle?: string;
  isCenter?: boolean;
}

export interface IGenericIconSvg {
  size?: number;
  className?: string;
}

export interface IBookCardProps {
  id: number;
  year: string;
  title: string;
  author: string;
  image?: string;
  reviews: number;
  rating?: number;
  genre: Array<string>;
}

export interface IHomeComponentProps {
  Books?: Array<IBookCardProps>;
}

export interface ICommonRSCSluggedProps {
  params: { slug: string; query: string };
  searchParams: Promise<{ query: string }>;
}

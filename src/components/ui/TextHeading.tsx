import { cn } from "@/utils";

import type { ReactNode } from "react";
import type { ITextHeadingProps } from "@/types";

export default function TextHeading({ isCenter, title, subTitle }: ITextHeadingProps): ReactNode {
  return (
    <div className={cn(isCenter ? "text-center" : "text-start")}>
      <p className="text-2xl font-bold">{title}</p>
      <p className="font-light text-neutral-500 mt-2">{subTitle}</p>
    </div>
  );
}

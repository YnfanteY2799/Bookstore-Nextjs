"use client";
import { Button, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { Funnel } from "@phosphor-icons/react";

import type { ReactNode } from "react";

export default function Filters({ onFilter }: { onFilter?: Function }): ReactNode {
  return (
    <Popover placement="bottom" showArrow offset={10} backdrop="opaque">
      <PopoverTrigger>
        <Button color="primary" variant="light" isIconOnly size="sm">
          <Funnel size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Filters
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
              <Input />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

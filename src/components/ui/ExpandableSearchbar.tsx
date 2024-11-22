"use client";
import { type ReactNode, type KeyboardEvent, useState, useRef, useEffect } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { usePathname, useRouter } from "@/i18n/routing";
import { Input, Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function FilterSearchbar(): ReactNode {
  // Hooks
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // State
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Ref
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Functions
  const toggleSearchbar = () => setIsExpanded((old) => !old);

  function handleKeyDown({ code }: KeyboardEvent): void {
    if (code === "Enter") handleQuery();
  }

  function handleQuery() {
    const params = new URLSearchParams(searchParams);
    if (searchQuery.length > 0) params.set("query", searchQuery);
    else params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }

  // Use Effect
  useEffect(() => {
    if (isExpanded && searchInputRef.current) searchInputRef.current.focus();
  }, [isExpanded]);

  return (
    <div className="flex items-center space-x-1">
      <div
        ref={searchContainerRef}
        style={{ width: isExpanded ? "auto" : "0px" }}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "opacity-100" : "opacity-0"}`}
      >
        <Input
          size="sm"
          type="text"
          color="default"
          value={searchQuery}
          className="w-full"
          aria-label="Filter"
          ref={searchInputRef}
          placeholder="Filter..."
          onKeyDown={handleKeyDown}
          onValueChange={(e) => setSearchQuery(e)}
          endContent={
            <Button
              size="sm"
              isIconOnly
              variant="light"
              color="success"
              onPress={handleQuery}
              children={<MagnifyingGlass size={18} />}
            />
          }
        />
      </div>
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant="light"
        onPress={toggleSearchbar}
        aria-label={isExpanded ? "Close search" : "Open search"}
      >
        {isExpanded ? <X size={20} /> : <MagnifyingGlass size={20} />}
      </Button>
    </div>
  );
}

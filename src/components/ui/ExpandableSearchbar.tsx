"use client";
import { type ReactNode, useState, useRef, useEffect } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { Input, Button } from "@nextui-org/react";

export default function FilterSearchbar(): ReactNode {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Ref
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Functions
  const toggleSearchbar = () => setIsExpanded((old) => !old);

  function handleKeyDown() {}

  function handleQuery() {
    alert(searchQuery);
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

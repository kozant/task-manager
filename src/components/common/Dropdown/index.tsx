import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Tooltip from "../Tooltip";
import {
  DROPDOWN_STYLES,
  DROPDOWN_CONFIG,
  DROPDOWN_ITEM_STYLES,
} from "./constants";

export type DropdownItem = {
  label: string;
  onSelect: () => void;
  className?: string;
};

type DropdownProps = {
  tooltipText: string;
  handle: React.ReactNode;
  items: DropdownItem[];
  onOpenChange?: (open: boolean) => void;
};

const Dropdown = ({
  tooltipText,
  handle,
  items,
  onOpenChange,
}: DropdownProps) => {
  if (!items.length) return handle;

  return (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
      <Tooltip text={tooltipText}>
        <DropdownMenu.Trigger className={DROPDOWN_STYLES.TRIGGER} asChild>
          {handle}
        </DropdownMenu.Trigger>
      </Tooltip>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={DROPDOWN_STYLES.CONTENT}
          sideOffset={DROPDOWN_CONFIG.SIDE_OFFSET}
          align={DROPDOWN_CONFIG.ALIGN}
          style={{
            boxShadow: DROPDOWN_STYLES.BOX_SHADOW,
          }}
        >
          {items.map((item) => (
            <DropdownMenu.Item
              key={item.label}
              className={`${DROPDOWN_ITEM_STYLES.DEFAULT} ${
                item.className || DROPDOWN_ITEM_STYLES.DEFAULT_TEXT_COLOR
              }`}
              onClick={item.onSelect}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;

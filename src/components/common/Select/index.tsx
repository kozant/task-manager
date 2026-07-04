import type { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { SELECT_STYLES } from "./select.styles";
import { SELECT_CONFIG } from "./select.config";

type SelectItem = {
  label: ReactNode;
  value: string;
};

type SelectMenuProps = {
  items: SelectItem[];
  selectedItem?: string;
  onChange: (value: string) => void;
};

export default function SelectMenu({
  items,
  selectedItem,
  onChange,
}: SelectMenuProps) {
  return (
    <Select.Root value={selectedItem} onValueChange={onChange}>
      <Select.Trigger className={SELECT_STYLES.TRIGGER}>
        <Select.Value />

        <Select.Icon className={SELECT_STYLES.ICON}>
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={SELECT_STYLES.CONTENT}
          position="popper"
          side={SELECT_CONFIG.SIDE}
          sideOffset={SELECT_CONFIG.SIDE_OFFSET}
          align={SELECT_CONFIG.ALIGN}
        >
          <Select.Viewport className={SELECT_STYLES.VIEWPORT}>
            {items.map((item) => (
              <Select.Item
                key={item.value}
                value={item.value}
                className={SELECT_STYLES.ITEM}
              >
                <Select.ItemText>{item.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

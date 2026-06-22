import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

import { SELECT_STYLES } from "./select.styles";
import { SELECT_CONFIG } from "./select.config";

type SelectMenuProps = {
  items: { name: string; level: number }[];
  selectedItem?: number;
  onValueChange: (value: number) => void;
};

export default function SelectMenu({
  items,
  selectedItem,
  onValueChange,
}: SelectMenuProps) {
  return (
    <Select.Root
      value={String(selectedItem)}
      onValueChange={(value) => onValueChange(Number(value))}
    >
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
                key={item.level}
                value={String(item.level)}
                className={SELECT_STYLES.ITEM}
              >
                <Select.ItemText>{item.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

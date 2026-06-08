export const DROPDOWN_STYLES = {
  DEFAULT: "text-gray-800",
  TRIGGER:
    "hover:bg-green-200 data-[state=open]:bg-zinc-600 data-[state=open]:text-white",
  CONTENT: "bg-white border-[0.5px] border-gray-200 rounded-md py-2",
  ITEM: "px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600",
  BOX_SHADOW:
    "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
} as const;

export const DROPDOWN_ITEM_STYLES = {
  DEFAULT_TEXT_COLOR: "text-gray-800",
} as const;

export const DROPDOWN_CONFIG = {
  SIDE_OFFSET: 8,
  ALIGN: "start",
} as const;

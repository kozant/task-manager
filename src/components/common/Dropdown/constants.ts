export const DROPDOWN_STYLES = {
  TRIGGER:
    "hover:bg-black/10 data-[state=open]:bg-zinc-600 data-[state=open]:text-white",
  CONTENT: "bg-white border-[0.5px] border-gray-200 rounded-md py-2",
  BOX_SHADOW:
    "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
} as const;

export const DROPDOWN_ITEM_STYLES = {
  DEFAULT_TEXT_COLOR: "text-gray-800",
  DEFAULT:
    "px-4 py-2 hover:bg-black/10 cursor-pointer data-highlighted:outline-none",
} as const;

export const DROPDOWN_CONFIG = {
  SIDE_OFFSET: 8,
  ALIGN: "start",
} as const;

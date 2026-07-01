export const SELECT_STYLES = {
  TRIGGER: `
    flex h-9 w-full items-center justify-between
    rounded-md
    bg-white
    px-4
    border border-gray-300
    text-gray-900
    placeholder:text-gray-400
    focus:border-blue-500
    leading-none
    cursor-pointer
    focus:outline-none
    focus:ring-1 focus:ring-blue-500
  `,

  ICON: `
    text-gray-500
  `,

  CONTENT: `
    z-50
    min-w-[var(--radix-select-trigger-width)]
    overflow-hidden
    rounded-md
    border border-black/10
    bg-white
    shadow-lg
    animate-in
    fade-in-0
    zoom-in-95
  `,

  VIEWPORT: `
    p-1 flex flex-col gap-1
  `,

  ITEM: `
    flex h-9 items-center rounded px-3
    cursor-pointer
    outline-none
    transition-colors

    hover:bg-black/10
    data-[highlighted]:bg-black/10

    data-[state=checked]:bg-blue-100
    data-[state=checked]:text-blue-700
  `,
} as const;

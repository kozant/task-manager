export const FORM_STYLES = {
  FORM: `grid gap-5`,
  TEXTAREA: `
    resize-none
    h-24 w-full
    py-2
    px-4
    rounded-md
    bg-white
    border border-gray-300
    text-gray-900
    placeholder:text-gray-400
    focus:border-blue-500
    focus:outline-none
    focus:ring-1 focus:ring-blue-500`,
  INPUT: `
    h-9 w-full
    px-4
    rounded-md
    bg-white
    border border-gray-300
    text-gray-900
    placeholder:text-gray-400
    focus:border-blue-500
    focus:outline-none
    focus:ring-1 focus:ring-blue-500
  `,
  LABEL: `block text-gray-500 mb-1`,
  BUTTON_CONTAINER: `flex gap-1`,
  SUBMIT_BUTTON: `px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer`,
  CANCEL_BUTTON: `p-1 rounded-md hover:bg-black/10 cursor-pointer`,
} as const;

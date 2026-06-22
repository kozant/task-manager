export const FORM_STYLES = {
  FORM: `grid grid-rows-2 gap-4`,
  INPUT: `
    h-9 w-full
    px-4
    rounded-md
    bg-white
    shadow-sm
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
  `,
  BUTTON_CONTAINER: `flex gap-1`,
  SUBMIT_BUTTON: `px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer`,
  CANCEL_BUTTON: `p-1 rounded-md hover:bg-black/10 cursor-pointer`,
} as const;

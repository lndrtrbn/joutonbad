const ButtonStyle = {
  disabled: "opacity-30 pointer-events-none",
  solid: {
    base: "font-bold h-10 px-6 text-white bg-black rounded-full",
    hover: "hover:bg-main",
    active: "bg-main",
  },
  light: {
    base: "font-bold h-10 px-6 text-black border-2 border-black rounded-full",
    hover: "hover:border-main hover:text-main",
    active: "border-main text-main",
  },
  icon: {
    base: "font-bold h-10 w-10 text-black bg-black/10 rounded-full",
    hover: "flex items-center justify-center",
    active: "",
  },
  link: {
    base: "font-medium text-black underline underline-offset-4 decoration-black/20",
    hover: "hover:text-main",
    active: "text-main",
  },
  inline: {
    base: "font-medium text-black",
    hover: "hover:text-main",
    active: "text-main",
  },
};

export default ButtonStyle;

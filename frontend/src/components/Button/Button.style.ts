const ButtonStyle = {
  disabled: "opacity-30 pointer-events-none",
  solid: {
    base: "font-bold h-10 px-6 text-white-l bg-black-d rounded",
    hover: "hover:bg-accent",
    active: "bg-accent",
  },
  light: {
    base: "font-bold h-10 px-6 text-black-d border-2 border-black-d rounded",
    hover: "hover:border-accent hover:text-accent",
    active: "border-accent text-accent",
  },
  icon: {
    base: "font-bold h-10 w-10 text-black-l bg-white-l border-2 border-white-d rounded",
    hover: "flex items-center justify-center",
    active: "",
  },
  link: {
    base: "font-medium text-black-l underline underline-offset-2",
    hover: "hover:text-accent",
    active: "text-black-d",
  },
  inline: {
    base: "font-medium text-black-l",
    hover: "hover:text-accent",
    active: "text-black-d",
  },
};

export default ButtonStyle;

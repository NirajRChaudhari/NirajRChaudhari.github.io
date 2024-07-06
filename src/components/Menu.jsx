import React from "react";

const buttonStyles = "z-20 fixed p-3 bg-purple-600 w-11 h-11 rounded-md";
const lineStyles = "bg-white h-0.5 rounded-md w-full transition-all";
const menuContainerStyles =
  "z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col";
const menuButtonStyles =
  "text-2xl font-bold cursor-pointer hover:text-purple-600 transition-colors";

export const Menu = (props) => {
  const { onSectionChange, menuOpened, setMenuOpened } = props;

  return (
    <>
      <button
        onClick={() => setMenuOpened(!menuOpened)}
        className={`${buttonStyles} top-4 right-4 md:top-12 md:right-12`}
      >
        <div
          className={`${lineStyles} ${
            menuOpened ? "rotate-45 translate-y-0.5" : ""
          }`}
        />
        <div className={`${lineStyles} my-1 ${menuOpened ? "hidden" : ""}`} />
        <div className={`${lineStyles} ${menuOpened ? "-rotate-45" : ""}`} />
      </button>
      <div
        className={`${menuContainerStyles} ${
          menuOpened ? "w-full md:w-80" : "w-0"
        }`}
      >
        <div className="flex-1 flex items-start justify-center flex-col gap-6 p-8">
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Experience" onClick={() => onSectionChange(2)} />
          <MenuButton label="Education" onClick={() => onSectionChange(3)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(4)} />
          <MenuButton label="Contact" onClick={() => onSectionChange(5)} />
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button onClick={onClick} className={menuButtonStyles}>
      {label}
    </button>
  );
};

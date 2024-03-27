import { DefaultTheme } from "styled-components/dist/types";
import { Colors, GeneralColor } from "..";

const darkModes: Colors = {
  bgColor: "#2B2C37",
  mainColor: "#2B2C37",
  titleColor: "#FFF",
  modeChangerBg: "#20212C",
  borderColor: "#3E3F4E",
  asideBg: "#2B2C37",
  headerBg: "#2B2C37",
  boardBg: "#20212C",
  switcherModeBg: "#20212C",
};

const lightModes: Colors = {
  bgColor: "#F4F7FD",
  mainColor: "#ffffff",
  titleColor: "#000000",
  modeChangerBg: "#F4F7FD",
  borderColor: "#E4EBFA",
  asideBg: "#FFF",
  headerBg: "#FFF",
  boardBg: "#F4F7FD",
  switcherModeBg: "#F4F7FD",
};

const generalColors: GeneralColor = {
  addButtonBg: " rgba(99, 95, 199, 1)",
  addButtonActiveBg: "rgba(130, 143, 163, 1)",
  addButtonText: "rgba(256,256,256)",
  activeBoardButtonBg: "rgba(99, 95, 199, 1)",
  toggleSwitcherBg: "rgba(99, 95, 199, 1)",
};

const theme: DefaultTheme = {
  allColors: {
    themeColor: {
      lightMode: lightModes,
      darkMode: darkModes,
    },
    general: generalColors,
  },
  size: {
    mobile: {
      boardName: "1.8rem",
    },
    tablet: {
      boardName: "2rem",
    },
    desktop: {
      boardName: "2rem",
    },
  },
};

export default theme;

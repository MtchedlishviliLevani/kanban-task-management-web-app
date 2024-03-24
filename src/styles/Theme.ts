import { DefaultTheme } from "styled-components/dist/types";
import { Colors, GeneralColor } from "..";

const darkModes: Colors = {
  bgColor: "#20212C",
  mainColor: "#2B2C37",
  titleColor: "#FFF",
  modeChangerBg: "#20212C",
  borderColor: "#3E3F4E",
};

const lightModes: Colors = {
  bgColor: "#F4F7FD",
  mainColor: "#ffffff",
  titleColor: "#000000",
  modeChangerBg: "#F4F7FD",
  borderColor: "#E4EBFA",
};

const generalColors: GeneralColor = {
  addButtonBg: " rgba(99, 95, 199, 1)",
  addButtonActiveBg: "rgba(130, 143, 163, 1)",
  addButtonText: "rgba(256,256,256)",
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

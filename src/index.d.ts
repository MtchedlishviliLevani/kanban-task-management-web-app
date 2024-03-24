declare module "*.svg" {
  const content: string;
  export default content;
}
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    allColors: AllColors;
    size: Size;
  }
}

interface Size {
  mobile: SizesProperty;
  tablet: SizesProperty;
  desktop: SizesProperty;
}

interface SizesProperty {
  boardName: string;
}

interface Colors {
  bgColor: string;
  mainColor: string;
  titleColor: string;
  modeChangerBg: string;
  borderColor: string;
}

interface GeneralColor {
  addButtonBg: string;
  addButtonActiveBg: string;
  addButtonText: string;
}

interface AllColors {
  general: GeneralColor;
  themeColor: ThemeColor;
}

interface ThemeColor {
  lightMode: Colors;
  darkMode: Colors;
}

interface MediaQueryBreakPoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

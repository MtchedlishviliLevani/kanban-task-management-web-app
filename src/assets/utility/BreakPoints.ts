import { MediaQueryBreakPoints } from "../..";
import customMediaQuery from "./breakPointFn";
const breakPoints: MediaQueryBreakPoints = {
  sm: customMediaQuery("480"),
  md: customMediaQuery("768"),
  lg: customMediaQuery("920"),
  xl: customMediaQuery("1280"),
  xxl: customMediaQuery("1520"),
};
export default breakPoints;

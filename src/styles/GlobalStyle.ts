import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html{
    font-size: 62.5%;
}
body{
    font-family: "Plus Jakarta Sans", sans-serif;
}
::-webkit-scrollbar {
  background: #fff3;
  -webkit-border-radius: 1ex;
}

/* Vertical scrollbar */
::-webkit-scrollbar:vertical {
  width: 9px;
}

/* Horizontal scrollbar */
::-webkit-scrollbar:horizontal {
  height: 6px;
}

/* Vertical scrollbar thumb */
::-webkit-scrollbar-thumb {
  background: #635FC7;
  -webkit-border-radius: 1ex;
  cursor: pointer;
}

`;

export default GlobalStyle;

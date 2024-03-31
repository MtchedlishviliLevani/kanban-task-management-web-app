
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/Theme'
import Header from './assets/components/Header'
import styled from 'styled-components'// import { MediaQueryBreakPoints } from '.'
import Aside from './assets/components/Aside'
import useData from './store/useBoard'
import Board from './assets/components/Board'
import breakPoints from './assets/utility/BreakPoints'

interface HeaderProps {
  $isDarkMode: boolean
}
function App() {

  const { data, addBoard, shownOverlay, isShownOverlay, isDarkMode, modeSwitcher, isOpenSide, openSide, hideSide, toggleIsOpenSide } = useData();
  function handleAsideShowing() {
    shownOverlay(),
      openSide()
  } console.log(isOpenSide)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />


      {isShownOverlay && <StyledOverlay onClick={handleAsideShowing}></StyledOverlay>}
      <StyledOverlay onClick={handleAsideShowing}></StyledOverlay>
      <StyledHeader $isDarkMode={isDarkMode}><Header /></StyledHeader>

      <MainWrapper>
        <Aside />
        <Board />
      </MainWrapper>



    </ThemeProvider>

  )
}


const StyledOverlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #000;
  opacity: 50%;
  z-index: 9;
  ${breakPoints.md}{display:none}
`
const Layout = styled.div`
  width: 100%;
  height: 100vh;

`
const MainWrapper = styled.div`
  display: flex;
  width: 100%;
`

const StyledHeader = styled.div<HeaderProps>`
/* background-color: #FFF; */
  background-color: ${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.headerBg : theme.allColors.themeColor.lightMode.headerBg};
`




export default App

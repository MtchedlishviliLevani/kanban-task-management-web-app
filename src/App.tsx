
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/Theme'
import Header from './assets/components/Header'
import styled from 'styled-components'// import { MediaQueryBreakPoints } from '.'
import Aside from './assets/components/Aside'
// import useData from './store/useBoard'
import Board from './assets/components/Board'
import breakPoints from './assets/utility/BreakPoints'
import { useAppDispatch, useAppSelector } from "./app/hook"
import { toggleOverlay } from './features/boardSlice'
import { hideAside } from './features/asideSlice'
// import Overlayed from './assets/components/Overlayed'



interface HeaderProps {
  $isDarkMode: boolean
}
function App() {


  // const { shownOverlay, isShownOverlay, isDarkMode, openSide, } = useData();
  // function handleAsideShowing() {
  //   shownOverlay(),
  //     openSide()
  // }
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode);
  const isOverlayed = useAppSelector(state => state.boardReducer.isOverlayed);
  // const isOpen = useAppSelector(state => state.asideReducer.isOpenSide)
  function handleAsideShowing() {
    dispatch(hideAside()),
      dispatch(toggleOverlay())
  }
  console.log(isOverlayed, "isOverlayed")





  return (

    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {/* {isShownOverlay && <StyledOverlay onClick={handleAsideShowing}></StyledOverlay>} */}
      {/* <StyledOverlay onClick={handleAsideShowing}></StyledOverlay> */}
      {/* {!isOverlayed && <Overlayed />} */}
      {isOverlayed && <StyledOverlay onClick={handleAsideShowing}></StyledOverlay>}
      {/* <StyledOverlay onClick={handleAsideShowing}></StyledOverlay> */}
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
// const Layout = styled.div`
//   width: 100%;
//   height: 100vh;

// `
const MainWrapper = styled.div`
  display: flex;
  width: 100%;
`

const StyledHeader = styled.div<HeaderProps>`
/* background-color: #FFF; */
  background-color: ${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.headerBg : theme.allColors.themeColor.lightMode.headerBg};
`




export default App

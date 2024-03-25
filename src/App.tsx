
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/Theme'
import Header from './assets/components/Header'
import styled from 'styled-components'// import { MediaQueryBreakPoints } from '.'
import Aside from './assets/components/Aside'
import useData from './store/useBoard'

interface HeaderProps {
  isDarkMode: boolean
}
function App() {

  const { data, addBoard, isDarkMode, modeSwitcher } = useData();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <button onClick={modeSwitcher}>{isDarkMode ? 2 : 3}</button>
      <Layout>
        <StyledHeader isDarkMode={isDarkMode}><Header /></StyledHeader>

        <Aside />
      </Layout>

    </ThemeProvider>

  )
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;

`

const StyledHeader = styled.div<HeaderProps>`
  background-color: ${({ isDarkMode }) => isDarkMode ? theme.allColors.themeColor.darkMode.bgColor : theme.allColors.themeColor.lightMode.bgColor};
`




export default App

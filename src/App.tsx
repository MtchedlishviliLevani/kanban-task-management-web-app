
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/Theme'
import Header from './assets/components/Header'
import styled from 'styled-components'// import { MediaQueryBreakPoints } from '.'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from './store'
// import { increase } from './assets/features/counter/counterSlice'
// import { changeMode } from './assets/features/theme/themeModeSlice'
// import Container from './assets/components/Container'
// import breakPoints from './assets/utility/BreakPoints'

function App() {
  // const dispatch = useDispatch();
  // const count = useSelector((state: RootState) => state.counter.value);
  // const theme1 = useSelector((state: RootState) => state.changeTheme.isDarkMode);




  return (
    <ThemeProvider theme={theme}>
      {/* <button onClick={() => dispatch(changeMode())}>hello {count}</button> */}
      <GlobalStyle />

      <Layout>
        <Header />
      </Layout>

    </ThemeProvider>

  )
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;

`




export default App

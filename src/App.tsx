
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/Theme'
import Header from './assets/components/Header'
import styled from 'styled-components'
import Aside from './assets/components/Aside'
import Board from './assets/components/Board'
import breakPoints from './assets/utility/BreakPoints'
import { useAppDispatch, useAppSelector } from "./app/hook"
import NewTaskForm from './assets/components/NewTaskForm'
import AddNewBoard from './assets/components/AddNewBoard'
import DeleteBoard from './assets/components/DeleteBoard'
import { useEffect, useState } from 'react'
import DeleteTask from './assets/components/DeleteTask'
import TaskDetailInformation from './assets/components/TaskDetailInformation'
import EditTask from './assets/components/EditTask'
import EditBoard from './assets/components/EditBoard'
import { hideOverlay, openOverlay, toggleAddNewBoard, toggleDeleteBoardModal, toggleEditTask, toggleNewColumn, toggleNewTaskForm, toggleOverlay, toggleTaskDetailInfo } from './features/modalSlice'

interface HeaderProps {
  $isDarkMode: boolean
}
function App() {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode);
  const isOverlayed = useAppSelector(state => state.modalReducer.isOverlayed);
  const isOpenNewTaskForm = useAppSelector((state) => state.modalReducer.isOpenNewTaskForm)
  const isOpenTaskDetailInfo = useAppSelector((state) => state.modalReducer.isOpenTaskDetailInfo)
  const isOpenNewColumn = useAppSelector(state => state.modalReducer.isOpenNewColumn)
  const isOpenAddNewBoard = useAppSelector(state => state.modalReducer.isOpenAddNewBoard)
  const isOpenDeleteBoard = useAppSelector((state) => state.modalReducer.isOpenDeleteBoard)
  const isOpenEditTask = useAppSelector((state) => state.modalReducer.isOpenEditTask)

  function handleOverlay() {
    dispatch(toggleOverlay());

    if (isOpenNewTaskForm) {
      dispatch(toggleNewTaskForm());
    }
    if (isOpenTaskDetailInfo) {
      dispatch(toggleTaskDetailInfo());
    }
    if (isOpenNewColumn) {
      dispatch(toggleNewColumn());
    }
    if (isOpenAddNewBoard) {
      dispatch(toggleAddNewBoard());
    }
    if (isOpenDeleteBoard) {
      dispatch(toggleDeleteBoardModal());
    }
    if (isOpenEditTask) {
      dispatch(toggleEditTask());
    }
  }
  const isOpenAside = useAppSelector((state) => state.asideReducer.isOpenSide)
  const isOpenDeleteTask = useAppSelector(
    (state) => state.modalReducer.isOpenDeleteTask
  );
  const [activeTaskIndex, setTaskActiveIndex] = useState(-1);
  const [activeColumn, setActiveColumn] = useState("");
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    // Function to update the width state
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > 768 && isOpenAside && !isOpenNewTaskForm) {
      dispatch(hideOverlay())
    } else if (isOpenAside) {
      dispatch(openOverlay())
    }
  }, [width, dispatch, isOpenAside, isOpenNewTaskForm]);

  return (

    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <>
        {isOverlayed && <StyledOverlay onClick={handleOverlay}></StyledOverlay>}
        <StyledPage $isDarkMode={isDarkMode}>
          <StyledHeader $isDarkMode={isDarkMode}><Header /></StyledHeader>
          {isOpenAddNewBoard && <AddNewBoard />}
          {isOpenNewTaskForm && <NewTaskForm />}
          {isOpenDeleteBoard && <DeleteBoard />}
          {isOpenNewColumn && <EditBoard />}
          {isOpenEditTask && (
            <EditTask
              activeTaskIndex={activeTaskIndex}
              activeColumnName={activeColumn}
            />
          )}
          {isOpenTaskDetailInfo && (
            <TaskDetailInformation
              activeTaskIndex={activeTaskIndex}
              activeColumnName={activeColumn}
            />
          )}
          {isOpenDeleteTask && (
            <DeleteTask
              activeTaskIndex={activeTaskIndex}
              activeColumnName={activeColumn}
            />
          )}
          <MainWrapper>
            <Aside width={width} />
            <Board setTaskActiveIndex={setTaskActiveIndex} setActiveColumn={setActiveColumn} width={width} />
          </MainWrapper>
        </StyledPage>
      </>

    </ThemeProvider>

  )
}
const StyledPage = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ $isDarkMode, theme }) =>
    $isDarkMode
      ? theme.allColors.themeColor.darkMode.boardBg
      : theme.allColors.themeColor.lightMode.boardBg};
`

const StyledOverlay = styled.div`
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 12;
  position: absolute;
  background-color: #000;
  opacity: 50%;
  cursor: pointer;
  ${breakPoints.md}{
  }
`

const MainWrapper = styled.div`
display:flex;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;`

const StyledHeader = styled.div<HeaderProps>`
  background-color: ${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.headerBg : theme.allColors.themeColor.lightMode.headerBg};
`

export default App

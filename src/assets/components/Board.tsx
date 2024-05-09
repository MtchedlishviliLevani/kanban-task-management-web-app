import styled from 'styled-components'
// import useData from '../../store/useBoard'
import breakPoints from '../utility/BreakPoints'
import showAside from "../images/icon-show-sidebar.svg"
import NewColumn from './NewColumn'
// import data1 from "../../data.json"

import { useAppDispatch, useAppSelector } from "../../app/hook"
import { toggleOverlay } from '../../features/boardSlice'
import { hideAside } from '../../features/asideSlice'
import NewTaskForm from './NewTaskForm'
import AddNewBoard from './AddNewBoard'
import DeleteBoard from './DeleteBoard'
import TaskDetailInformation from './TaskDetailInformation'
import { useState } from 'react'

interface States {
  $isDarkMode: boolean
}

interface Card {
  $isDarkMode: boolean

}
function Board() {

  // function handle() {
  //     toggleIsOpenSide(),
  //         shownOverlay()
  // }
  // const { isDarkMode, isOpenSide, toggleIsOpenSide, shownOverlay, data, activeButtonIndex } = useData()
  // const foundBoard = data.boards[activeButtonIndex];

  // const colors = [" #49C4E5", "#8471F2", "#67E2AE"];

  const colors = [" #49C4E5", "#8471F2", "#67E2AE"];

  const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode);
  const data = useAppSelector(state => state.boardReducer.data)
  const activeIndex = useAppSelector(state => state.boardReducer.activeIndex)
  const foundBoard = data.boards[activeIndex];
  const isOpenSide = useAppSelector(state => state.asideReducer.isOpenSide);
  // const isOpenNewColumn = useAppSelector(state => state.boardReducer.isOpenNewColumn);

  const dispatch = useAppDispatch()
  function handle() {
    dispatch(hideAside()),
      dispatch(toggleOverlay())
  }
  // new code
  const [activeIndex1, setActiveIndex] = useState(-1);
  const [activeColumn, setActiveColumn] = useState('')
  // const filtered = foundBoard.columns.filter((value) => value.name == activeColumn)
  // console.log(filtered, 99)
  console.log(activeIndex1)
  console.log(activeColumn, 777)
  return (
    <>
      <BoardStyled $isDarkMode={isDarkMode}>
        {isOpenSide == false && <ShowAside
          onClick={handle}
        >
          <img src={showAside} alt="" /></ShowAside>}
        <BoardContainer>
          {foundBoard?.columns.map((columnsName, i: number) => <BoardWrapper key={i} $isDarkMode={isDarkMode}>
            <div><span style={{ background: colors[i % colors.length] }}></span> <h3>{columnsName.name}</h3></div>
            <CardWrapper>{columnsName.tasks.length > 0 && columnsName.tasks.map((task, i) => <CardStyled key={i} $isDarkMode={isDarkMode} onClick={() => {
              setActiveIndex(i),
                setActiveColumn(columnsName.name)
            }}><h2>{task.title}</h2><span>0 of {task.subtasks?.length} subtaks</span></CardStyled>)}</CardWrapper>

          </BoardWrapper>)
          }
          {/* edited */}
          {/* <AddNewBoard /> */}
          <NewColumn />
          {/*edited newTaskForm */}
          {/* <NewTaskForm /> */}
          <TaskDetailInformation activeIndex1={activeIndex1} activeColumnName={activeColumn} />

          <DeleteBoard />
        </BoardContainer>

      </BoardStyled >
    </>
  )
}

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:2rem;
    min-width: 30rem;
`

const BoardContainer = styled.div`
height: 85vh;
display: flex;
gap: 3.5rem;
padding:2rem 3rem ;
`
const BoardWrapper = styled.div < { $isDarkMode: boolean }>`
display:flex;
flex-direction: column;
gap: 2rem;

&>div:nth-child(1){
    display: flex;
    gap: 1rem;
    align-items: center;
}
&>div:nth-child(1)>span{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
}
&>div:nth-child(1)>h3{
    color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#000"};
}
`;

const CardStyled = styled.div<Card>`
box-shadow: 0px 4px 6px 0px #364E7E1A;
width: 30rem;
  border-radius: 1.2rem;
  padding: 3rem 2rem;
  background-color: ${({ $isDarkMode, theme }) => $isDarkMode ? theme.allColors.themeColor.darkMode.cardBg : theme.allColors.themeColor.lightMode.cardBg};
display: flex;
flex-direction: column;
gap: 1rem;
cursor: pointer;
transition: opacity .5s;
${breakPoints.md}{
    &:hover{
        opacity: 50%;
    }
}
  &>h2{
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#000"};
  }
  &>span{
    font-size: 1.2rem;
    font-weight: bold;
    color: #828FA3;
  }
`;

const ShowAside = styled.div`
  display: none;
  cursor: pointer;

  ${breakPoints.md} {
    width: 5.6rem;
    height: 4.8rem;
    background-color: #635FC7;
    display: grid;
    place-items: center;
    position: absolute;
    top: 85vh;
    left: 0%;
    border-radius: 0 2.5rem 2.5rem 0;
    transition: opacity 1s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const BoardStyled = styled.div<States>`
  width: 100%;
  min-height: calc(100vh - 8.1rem);
  overflow: auto;
  background-color: ${({ $isDarkMode, theme }) => $isDarkMode ? theme.allColors.themeColor.darkMode.boardBg : theme.allColors.themeColor.lightMode.boardBg};

  ${breakPoints.md} {
    flex-grow: 1;
    width: initial;
  }
`;

export default Board

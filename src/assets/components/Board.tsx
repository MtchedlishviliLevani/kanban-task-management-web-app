import styled from "styled-components";
import breakPoints from "../utility/BreakPoints";
import showAside from "../images/icon-show-sidebar.svg";
import NewColumn from "./NewColumn";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toggleAside } from "../../features/asideSlice";
import Button from "./Button";
import { dragAndDropFn } from "../../features/boardSlice";
import { toggleAddNewBoard, toggleOverlay, toggleTaskDetailInfo } from "../../features/modalSlice";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DropResult } from "react-beautiful-dnd";

interface States {
  $isDarkMode: boolean;
  $isOpenSide: boolean;
  $screenWidth: number
}
interface Card {
  $isDarkMode: boolean;
}

interface Props {
  setTaskActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setActiveColumn: React.Dispatch<React.SetStateAction<string>>;
  width: number;
}

function Board({ setTaskActiveIndex, setActiveColumn, width }: Props) {
  const colors = [" #49C4E5", "#8471F2", "#67E2AE"];
  const isDarkMode = useAppSelector(
    (state) => state.switchModeReducer.isDarkMode
  );
  const data = useAppSelector((state) => state.boardReducer.data);
  const boardsAmount = data.boards.length
  const activeIndex = useAppSelector((state) => state.boardReducer.activeIndex);
  const foundBoard = data.boards[activeIndex];
  const isOpenSide = useAppSelector((state) => state.asideReducer.isOpenSide);
  console.log(data)
  const dispatch = useAppDispatch();
  function showHideAside() {
    dispatch(toggleAside());
  }

  function openNewBoard() {
    dispatch(toggleAddNewBoard())
    dispatch(toggleOverlay())
  }


  // new code
  function handleDetailInfo(i: number, name: string) {
    setTaskActiveIndex(i), setActiveColumn(name), dispatch(toggleTaskDetailInfo());
    dispatch(toggleOverlay());
  }

  function handleOnDragEnd(result: DropResult) {
    const { destination, source } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the source and destination columns
    const sourceColumn = foundBoard.columns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = foundBoard.columns.find(
      (column) => column.id === destination.droppableId
    );

    if (sourceColumn && destinationColumn) {
      // Create new arrays to avoid mutating the state directly
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destinationTasks =
        sourceColumn === destinationColumn
          ? sourceTasks
          : Array.from(destinationColumn.tasks);

      // Remove the task from the source column
      const [movedTask] = sourceTasks.splice(source.index, 1);

      // Add the task to the destination column
      destinationTasks.splice(destination.index, 0, movedTask);

      // Update the columns
      const updatedColumns = foundBoard.columns.map((column) => {
        if (column.id === sourceColumn.id) {
          return { ...column, tasks: sourceTasks };
        }
        if (column.id === destinationColumn.id) {
          return { ...column, tasks: destinationTasks };
        }
        return column;
      });

      // Update the board state
      const updatedBoard = {
        ...foundBoard,
        columns: updatedColumns,
      };

      // Dispatch the updateBoard action to update the Redux store
      dispatch(dragAndDropFn(updatedBoard));
    }
  }
  console.log(boardsAmount)

  return (
    <>

      < BoardStyled $isDarkMode={isDarkMode} $isOpenSide={isOpenSide} $screenWidth={width}>
        {!isOpenSide && (
          <ShowAside onClick={showHideAside}>
            <img src={showAside} alt="" />
          </ShowAside>
        )}{boardsAmount !== 0 ?

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <BoardContainer>

              {foundBoard?.columns.map((column, i) => (
                <BoardWrapper key={column?.id} $isDarkMode={isDarkMode}>
                  <div>
                    <span style={{ background: colors[i % colors.length] }}></span>
                    <h3>{column.name}</h3>
                  </div>

                  <Droppable droppableId={column?.id ?? "default-id"} type="group">
                    {(provided) => (
                      <CardWrapper {...provided.droppableProps} ref={provided.innerRef}>
                        {column.tasks?.map((task, index) => (
                          <Draggable
                            draggableId={task?.id ?? "default-id"} index={index} key={task.id}
                          >
                            {(provided) => (
                              <CardStyled
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                $isDarkMode={isDarkMode}
                                onClick={() => handleDetailInfo(index, column.name)}
                              >
                                <h2>{task.title}</h2>
                                <span>
                                  {task.subtasks?.reduce(
                                    (sum, subtask) => sum + (subtask.isCompleted ? 1 : 0),
                                    0
                                  )}
                                  of {task.subtasks?.length} subtasks
                                </span>
                              </CardStyled>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </CardWrapper>
                    )}
                  </Droppable>

                </BoardWrapper>
              ))}
              <NewColumn />


            </BoardContainer> </DragDropContext>
          : <><StyledEmptyBoard $isDarkMode={isDarkMode}>
            <p>This board is empty. Create a new column to get started.</p>
            <div><Button submitFn={openNewBoard}  >  + Create New Board  </Button></div>
          </StyledEmptyBoard>
          </>
        }
      </BoardStyled >
    </>
  );
}



const BoardContainer = styled.div`
  display: flex;
  gap: 3.5rem;
  padding: 2rem 3rem;
`;
const BoardWrapper = styled.div<{ $isDarkMode: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div:nth-child(1) {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  & > div:nth-child(1) > span {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  & > div:nth-child(1) > h3 {
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#FFF" : "#000")};
  }
`;

const ShowAside = styled.div`
  display: none;
  cursor: pointer;

  ${breakPoints.md} {
    width: 5.6rem;
    height: 4.8rem;
    background-color: #635fc7;
    display: grid;
    place-items: center;
    position: absolute;
    top: 70vh;
    left: 0%;
    border-radius: 0 2.5rem 2.5rem 0;
    transition: opacity 1s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const BoardStyled = styled.div<States>`
  /* width: 100%; */
  min-width: 100%;
  height: calc(100vh - 8.1rem);
  position: absolute;
  left: ${({ $isOpenSide, $screenWidth }) =>
    $isOpenSide ? ($screenWidth < 768 ? "0rem" : "calc(2rem + 21.373rem)") : "0rem"};  /* overflow: auto; */
  background-color: ${({ $isDarkMode, theme }) =>
    $isDarkMode
      ? theme.allColors.themeColor.darkMode.boardBg
      : theme.allColors.themeColor.lightMode.boardBg};

`;

const StyledEmptyBoard = styled.div<{ $isDarkMode: boolean }>`
  transform: translate(-50%,-50%);
  justify-content: center;
 display: flex;
 flex-direction: column;
 gap: 1.5rem;
  position: absolute;
    top: 50%;
    left: 50%;

    &>p{
      font-size: 1.6rem;
      color: ${({ $isDarkMode }) => $isDarkMode ? "#fff" : "#000"};
      text-align: center;
    }

    &>div{
      display: flex;
      justify-content:center;
    }

    & button{
      width: initial;
    }

`


// new code

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 30rem;
`;

const CardStyled = styled.div<Card>`
  box-shadow: 0px 4px 6px 0px #364e7e1a;
  width: 30rem;
  border-radius: 1.2rem;
  padding: 3rem 2rem;
  background-color: ${({ $isDarkMode, theme }) =>
    $isDarkMode
      ? theme.allColors.themeColor.darkMode.cardBg
      : theme.allColors.themeColor.lightMode.cardBg};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.5s;
  ${breakPoints.md} {
    &:hover {
      opacity: 50%;
    }
  }
  & > h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#FFF" : "#000")};
  }
  & > span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #828fa3;
  }
`;

export default Board;



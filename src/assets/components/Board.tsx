import styled from "styled-components";
import breakPoints from "../utility/BreakPoints";
import showAside from "../images/icon-show-sidebar.svg";
import NewColumn from "./NewColumn";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { toggleAside } from "../../features/asideSlice";
import Card from "./Card";
import Button from "./Button";
import { } from "../../features/boardSlice";
import { toggleAddNewBoard, toggleOverlay } from "../../features/modalSlice";

interface States {
  $isDarkMode: boolean;
  $isOpenSide: boolean;
  $screenWidth: number
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

  const dispatch = useAppDispatch();
  function showHideAside() {
    dispatch(toggleAside());
  }

  function openNewBoard() {
    dispatch(toggleAddNewBoard())
    dispatch(toggleOverlay())
  }

  return (
    <>

      < BoardStyled $isDarkMode={isDarkMode} $isOpenSide={isOpenSide} $screenWidth={width}>
        {!isOpenSide && (
          <ShowAside onClick={showHideAside}>
            <img src={showAside} alt="" />
          </ShowAside>
        )}{boardsAmount !== 0 ?
          <BoardContainer>
            {foundBoard?.columns.map((columnsName, i: number) => (
              <BoardWrapper key={i} $isDarkMode={isDarkMode}>
                <div>
                  <span style={{ background: colors[i % colors.length] }}></span>{" "}
                  <h3>{columnsName?.name}</h3>
                </div>
                {data.boards[activeIndex]?.columns.length > 0 && <Card columnsName={columnsName} setTaskActiveIndex={setTaskActiveIndex} setActiveColumn={setActiveColumn} />}

              </BoardWrapper>
            ))}
            <NewColumn />
          </BoardContainer> : <><StyledEmptyBoard $isDarkMode={isDarkMode}>
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
    }

    &>div{
      display: flex;
      justify-content:center;
    }

    & button{
      width: initial;
    }

`

export default Board;

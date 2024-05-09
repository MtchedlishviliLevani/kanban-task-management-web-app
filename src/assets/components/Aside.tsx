import styled from "styled-components";
// import useData from "../../store/useBoard";
import boardIcon from "../images/icon-board.svg";
import theme from "../../styles/Theme";
// import { useState } from "react";
import ModeSwitcher from "./ModeSwitcher";
import breakPoints from "../utility/BreakPoints";
import hiddenIcon from "../images/icon-hide-sidebar.svg"
// import showAsideIcon from "../images/icon-show-sidebar.svg"
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setActiveBoardName, setActiveColumnName, setActiveIndex } from "../../features/boardSlice";
import { hideAside } from "../../features/asideSlice";



interface AsideProps {
    $IsDarkMode: boolean;
    $isOpenSide: boolean;
}
interface ButtonProps {
    $activeButton: boolean;
    $index?: number;
}



function Aside() {

    // const { data, activeButtonIndex, setActiveButtonIndex, isDarkMode, isOpenSide, toggleIsOpenSide, shownOverlay } = useData();
    // const dataBoards = data.boards.map((board) => board.name);
    // function handle() {
    //     toggleIsOpenSide(),
    //         shownOverlay()
    // }
    // function activeBoard(index: number) {
    //     setActiveButtonIndex(index)
    // }

    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode);
    const data = useAppSelector(state => state.boardReducer.data);
    const dispatch = useAppDispatch();
    const activeIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const isOpenSide = useAppSelector(state => state.asideReducer.isOpenSide)
    console.log(isOpenSide,)
    function handle() {
        dispatch(hideAside())
    }
    console.log(data, 999)


    return (
        <>
            <StyledAside $IsDarkMode={isDarkMode}
                $isOpenSide={isOpenSide}
            >
                <SideTopPart>
                    <div>
                        <h2>ALL BOARDS ({data.boards.length})</h2>
                    </div>

                    <ButtonWrapper>
                        {data.boards.map((board, i: number) => (
                            <ButtonContainer key={i}
                                $index={i}
                                $activeButton={activeIndex === i}
                                onClick={() => {
                                    dispatch(setActiveIndex(i)),
                                        // edited
                                        dispatch(setActiveColumnName())
                                    dispatch(setActiveBoardName())
                                }}
                            >
                                <Button
                                >
                                    <img src={boardIcon} alt="" />
                                    <span>{board.name}</span>
                                </Button>
                            </ButtonContainer>

                        ))}
                        <AddNewBoardBtn><img src={boardIcon} alt="" /><span>+ Create New Board</span> </AddNewBoardBtn>

                    </ButtonWrapper></SideTopPart>
                <SideBottomPart><ModeSwitcher />
                    <div
                        onClick={handle}
                    >
                        <img src={hiddenIcon} alt="" />
                        <span>Hide Sidebar</span>
                    </div>
                </SideBottomPart>

            </StyledAside >

        </>
    );
}



export default Aside;



const SideTopPart = styled.div`


`

const SideBottomPart = styled.div`
display: flex;
flex-direction: column;
padding: 0 2rem;
gap: 2rem;



&>div:nth-child(2){
    display:none;
    cursor: pointer;
    ${breakPoints.md}{
       display: flex;
    align-items: center;
    gap: 2rem; 
    }
    
   
}
&>div:nth-child(2)>span{
    font-size: 1.5rem;
    color: #828FA3;

}
`

const AddNewBoardBtn = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 2rem;
    cursor: pointer;
    &>span:hover{
        opacity:.6;
        color:#635fc7
    }

    &>span{
        color: #635fc7;
        font-size: 1.5rem;
        font-weight: bold;

    }
`
const StyledAside = styled.aside<AsideProps>`
  /* width: 70%; */
  width: 30rem;
  /* height: calc(100% - 8vh); */
        background-color: ${(props) => props.$IsDarkMode ? theme.allColors.themeColor.darkMode.asideBg : theme.allColors.themeColor.lightMode.asideBg
    };
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 40%;
  padding: 1.5rem 0;
  border-radius: 1.2rem;
  font-weight: bold;
  display:${({ $isOpenSide }) => $isOpenSide ? "flex" : "none"};
  flex-direction: column;
  gap: 3.5rem;
  z-index: 10;

  ${breakPoints.md}{
    border-right:.1rem solid ${({ $IsDarkMode }) => $IsDarkMode ? theme.allColors.themeColor.darkMode.borderColor : theme.allColors.themeColor.lightMode.borderColor};
    border-radius: initial;
    width: calc(5% + 21.373rem);
    position: initial;
    transform: initial;
    height: calc(100vh - 8rem - .1rem);
    /* display: flex; */
    /* display:${({ $isOpenSide }) => $isOpenSide ? "flex" : "none"} ; */
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 3rem;
  }

  & > div:nth-child(1) {
    /* padding-left: 20px; */
  }
  & h2 {
    font-size: 1.2rem;
    color: rgba(130, 143, 163, 1);
    margin-left: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ButtonContainer = styled.div<ButtonProps>`
     padding: 1rem 0;
    padding-left: 20px;
    display: flex;
    width: 90%;
    border-radius: 0 2.5rem 2.5rem 0;
    cursor: pointer;
    background-color: ${(props) => props.$activeButton ? theme.allColors.general.activeBoardButtonBg : ""};

    & >button {
        color: ${(props) => props.$activeButton ? "#FFF" : "#828FA3"};

    }
`
const Button = styled.button`
padding: 1rem;
  all: unset;
  display: flex;
  gap: 1.5rem;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;
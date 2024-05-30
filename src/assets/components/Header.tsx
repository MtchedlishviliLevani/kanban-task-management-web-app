
import styled from "styled-components";
import MobileLogo from "../images/logo-mobile.svg";
import AddTaskIcon from "../images/icon-add-task-mobile.svg";
import EditIcon from "../images/icon-vertical-ellipsis.svg";
import breakPoints from "../utility/BreakPoints";
import DropDownIcon from "../images/icon-chevron-down.svg";
import DarkLogo from "../images/logo-dark.svg";
import LightLogo from "../images/logo-light.svg"
import { useAppDispatch, useAppSelector } from "../../app/hook";
import Container from "./Container";
import theme from "../../styles/Theme";
import { toggleAside } from "../../features/asideSlice";
import { } from "../../features/boardSlice";
import BoardAction from "./BoardAction";
import { toggleBoardActions, toggleNewTaskForm, toggleOverlay } from "../../features/modalSlice";

interface StyledProps {
    $isDarkMode?: boolean;
}

function Header() {
    const dispatch = useAppDispatch();
    function handleAside() {
        dispatch(toggleAside())
        dispatch(toggleOverlay())
    }
    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode);
    const isShownOverlay = useAppSelector(state => state.modalReducer.isOverlayed);
    const activeIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const data = useAppSelector(state => state.boardReducer.data)
    const boardsAmount = data.boards.length
    const activeColumnName = data.boards[activeIndex]?.name
    const isOpenBoardActions = useAppSelector((state) => state.modalReducer.isOpenBoardAction)
    function openTaskForm() {
        dispatch(toggleNewTaskForm()),
            dispatch(toggleOverlay())
    }
    return (
        <>
            <Container >
                <div>
                    <HEader $isDarkMode={isDarkMode} >
                        <div>
                            <picture>
                                {isDarkMode ?
                                    <source srcSet={LightLogo} media="(min-width:768px)" /> :
                                    <source srcSet={DarkLogo} media="(min-width:768px)" />
                                }
                                <img src={MobileLogo} alt="" />

                            </picture></div>
                        <MainPartWrapper $isDarkMode={isDarkMode}>
                            <div>
                                <span>{boardsAmount > 0 ? activeColumnName : "No Board Found"
                                }</span>
                                <img
                                    onClick={() => handleAside()} src={DropDownIcon} style={{ transform: isShownOverlay ? "rotate(180deg)" : "rotate(0deg)" }}

                                    alt="" />
                            </div>
                            {boardsAmount > 0 &&
                                <div>
                                    <AddBtnContainer onClick={openTaskForm}>
                                        <img src={AddTaskIcon} alt="" /> <span>Add New Task</span>

                                    </AddBtnContainer>
                                    <EditIconContainer onClick={() => dispatch(toggleBoardActions())}><img src={EditIcon} alt="" /></EditIconContainer>
                                    {isOpenBoardActions && <BoardAction />}
                                </div>}</MainPartWrapper>
                    </HEader>
                </div >
            </Container>

            <BorderLine $isDarkMode={isDarkMode}></BorderLine>
        </>
    );
}
const BorderLine = styled.div<StyledProps>`
    width: 100%;
    height: 1px;
    background-color: ${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.borderColor : theme.allColors.themeColor.lightMode.borderColor};
`

const HEader = styled.header<StyledProps>`
    display: flex;
    gap: 2rem;
    align-items: center;
    height: 8rem;
    ${breakPoints.md}{
        gap: 5rem;
    }

    &>div:nth-child(1){
        ${breakPoints.md}{
            display: flex;
        align-items: center;
        height: 100%;
        padding-right: 6rem;
        border-right: 1px solid; 
        border-right-color: ${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.borderColor : theme.allColors.themeColor.lightMode.borderColor};
        }
    }

    &>div:nth-child(2){
        &>div:nth-child(2){
            position: relative;
        }
    }
     & img{
        cursor: pointer;
    }
`

const AddBtnContainer = styled.button`
all:unset;
display: grid;
place-items: center;
background-color: ${({ theme }) => theme.allColors.general.addButtonBg};
padding: 1rem 1.5rem;
border-radius: 2.4rem;
cursor: pointer;
${breakPoints.md}{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap:1rem;

}

&>span{
    display: none;

    ${breakPoints.md}{
        color: ${({ theme }) => theme.allColors.general.addButtonText};
    font-size: 1.5rem;
    display: block;
    }
}

`

const MainPartWrapper = styled.div<StyledProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &>div:nth-child(2){
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    &>div:nth-child(1){
        position: relative;
    }
    &>div:nth-child(1) span{
    color: ${(props) => props.$isDarkMode ? "#FFF" : "#000"};

    }


&>div:nth-child(1)>img{
    position: absolute;
    transform: translateY(-50%);
    top: 60%;
    margin-left: 1rem;
    ${breakPoints.md}{
        display: none;
    }
}
    & span {
        font-size: ${({ theme }) => theme.size.mobile.boardName};
        font-weight: bold;
    }
`
const EditIconContainer = styled.div`
padding: 1rem;
border-radius: 0.8rem;
cursor: pointer;
    &:hover{
        background-color: #E4EBFA;
    }
`
export default Header;




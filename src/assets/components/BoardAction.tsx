import styled from "styled-components"
import { useAppSelector } from "../../app/hook"
import { useDispatch } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { toggleBoardActions, toggleDeleteBoardModal, toggleNewColumn, toggleOverlay } from "../../features/modalSlice"
import breakPoints from "../utility/BreakPoints"
interface StyledProps {
    $isDarkMode: boolean
}
function BoardAction() {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    const dispatch = useDispatch();

    function handleEditBoard() {
        dispatch(toggleNewColumn())
        dispatch(toggleBoardActions())
        dispatch(toggleOverlay())
    }

    function handleDeleteBoard() {
        dispatch(toggleDeleteBoardModal())
        dispatch(toggleBoardActions())
        dispatch(toggleOverlay())
    }
    return (
        <>
            {isVisible && (
                <StyledContainer ref={containerRef} $isDarkMode={isDarkMode}>
                    <button onClick={handleEditBoard}>Edit Board</button>
                    <button onClick={handleDeleteBoard}>Delete Board</button>
                </StyledContainer>
            )}
        </>
    )
}

const StyledContainer = styled.div<StyledProps>`
position: absolute;
z-index: 2;
padding: 1rem;
width: 15rem;
top: 5rem;
right: -1rem;
border-radius: .8rem;
display: flex;
flex-direction: column;
gap: 1rem;

background-color:${({ $isDarkMode }) => $isDarkMode ? "#20212C" : "#FFF"};
${breakPoints.md}{
    left: 2rem;
    top: 5.5rem;
    right: initial;
    padding: 1.5rem;
    width: calc(100% - 0.5rem);

}

&>button {
    all: unset;
    font-size: 1.6rem;
    cursor: pointer;
    font-weight: 500;
    &:hover{
            opacity: .6;
        }
}
    &>button:nth-child(1){
        color: #828fa3;
    }
    
    &>button:nth-child(2){
        color: #ea5555;
    }
`

export default BoardAction

import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { toggleBoardActions, toggleNewColumn, toggleOverlay } from '../../features/modalSlice';

function NewColumn() {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode)

    function handleEditBoard() {
        dispatch(toggleNewColumn())
        dispatch(toggleBoardActions())
        dispatch(toggleOverlay())
    }
    return (
        <>
            <StyledNewColumn $isDarkMode={isDarkMode} onClick={handleEditBoard}>
                <button >+ New Column</button>
            </StyledNewColumn>
        </>
    )
}


const StyledNewColumn = styled.div < { $isDarkMode: boolean }>`
cursor: pointer;
    min-width: 25rem;
    max-width: 30rem;
    height: calc(100vh - 8.1rem - 2rem - 2rem - 2rem - 1.4rem);
    background: ${({ $isDarkMode }) => $isDarkMode
        ? "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)"
        : "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)"};
        border-radius: .6rem;
        margin-top: calc(2rem + 1.4rem);
        display: grid;
        place-items: center;

        &>button{
            all: unset;
            font-size: 1.8rem;
            color: #828fa3;
            cursor: pointer;
            transition: color 1.5s;

            &:hover{
                color: #635FC7;
                font-weight: 600;
;
            }
        }

;
`
export default NewColumn

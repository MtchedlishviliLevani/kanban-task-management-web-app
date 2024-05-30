import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { boardDelete, } from "../../features/boardSlice";
import {
    toggleDeleteBoardModal, toggleOverlay
} from "../../features/modalSlice"
import ModalWindow from "./ModalWindow";
import Button from "./Button";
import Button2 from "./Button2";

function DeleteBoard() {
    const activeBoardIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const boardName = useAppSelector(state => state.boardReducer.data.boards[activeBoardIndex].name)

    const dispatch = useAppDispatch()
    function deleteBoard() {
        dispatch(boardDelete()),
            dispatch(toggleOverlay()),
            dispatch(toggleDeleteBoardModal())
    }

    function cancelBoard() {
        dispatch(toggleDeleteBoardModal())
        dispatch(toggleOverlay())
    }

    return (
        <ModalWindow>
            <StyledContainer>
                <h2>Delete this board?</h2>
                <p>
                    Are you sure you want to delete the {boardName} board? This action
                    will remove all columns and tasks and cannot be reversed
                </p>
                <ButtonsWrapper><Button submitFn={deleteBoard} >Delete</Button><Button2 passFn={cancelBoard}>Cancel</Button2></ButtonsWrapper>

            </StyledContainer></ModalWindow>
    );
}

const StyledContainer = styled.div`
& h2{
    color: #ea5555 !important;
}  

& p {
    margin: 1.5rem 0;
    font-size: 1.3rem;
    line-height: 2.3rem;
    color: #828FA3;
}
`

const ButtonsWrapper = styled.div`
display: flex;
gap: 3rem;

& > button:first-child{
    background-color: #ea5555 !important;
}
    
`

export default DeleteBoard;

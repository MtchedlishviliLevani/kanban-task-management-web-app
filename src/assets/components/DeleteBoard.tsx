import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { boardDelete } from "../../features/boardSlice";

function DeleteBoard() {
    const activeBoardIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const boardName = useAppSelector(state => state.boardReducer.data.boards[activeBoardIndex].name)
    const data = useAppSelector(state => state.boardReducer.data)
    console.log(data)

    const dispatch = useAppDispatch()
    function deleteBoard(e) {
        e.preventDefault()
        dispatch(boardDelete())
    }

    return (
        <StyledContainer>
            <h2>Delete this board?</h2>
            <p>
                Are you sure you want to delete the {boardName} board? This action
                will remove all columns and tasks and cannot be reversed
            </p>
            <div><button onClick={(e) => deleteBoard(e)}>Delete</button><button>Cancel</button></div>
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
display: none;
    background-color: white;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 80%;
`

export default DeleteBoard;

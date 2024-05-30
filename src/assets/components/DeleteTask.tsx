import ModalWindow from './ModalWindow'
import { styled } from 'styled-components'
import Button from './Button'
import { useAppSelector } from '../../app/hook'
import { useDispatch } from 'react-redux';
import { removeTask, } from '../../features/boardSlice';
import { toggleDeleteTask, toggleOverlay } from "../../features/modalSlice"
import Button2 from './Button2';

interface Props {
    activeTaskIndex: number;
    activeColumnName: string;
}
export default function DeleteTask({ activeTaskIndex, activeColumnName }: Props) {
    const activeBoardIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const boardName = useAppSelector(state => state.boardReducer.data.boards[activeBoardIndex].columns)
    const foundColumn = boardName.filter((value) => value.name == activeColumnName)[0]?.tasks[activeTaskIndex]
    const dispatch = useDispatch()
    function deleteTask() {
        dispatch(removeTask({ activeColumnName, activeTaskIndex }))
        dispatch(toggleOverlay())
        dispatch(toggleDeleteTask())
    }

    function cancelBoard() {
        dispatch(toggleDeleteTask())
        dispatch(toggleOverlay())
    }
    return (
        <ModalWindow>
            <StyledContainer>
                <h2>Delete this Task?</h2>
                <p>
                    Are you sure you want to delete the {foundColumn?.title}  Task? This action
                    will remove all columns and tasks and cannot be reversed
                </p>
                <ButtonsWrapper><Button submitFn={deleteTask} >Delete</Button>
                    <Button2 passFn={cancelBoard}>Cancel</Button2>
                </ButtonsWrapper>
            </StyledContainer></ModalWindow>
    )
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

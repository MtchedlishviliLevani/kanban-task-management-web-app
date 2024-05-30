import { styled } from "styled-components"
import { useAppSelector } from "../../app/hook"
import { useDispatch } from "react-redux"
import { toggleDeleteTask, toggleEditTask, toggleTaskAction, toggleTaskDetailInfo } from "../../features/modalSlice"
import Button from "./Button"
import Button2 from "./Button2"

interface Props {
    $isDarkMode: boolean
}
function TaskActions() {
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    const dispatch = useDispatch()

    function handleEditTask() {
        dispatch(toggleEditTask())
        dispatch(toggleTaskDetailInfo())
        dispatch(toggleTaskAction())
    }

    function handleDeleteTask() {
        dispatch(toggleDeleteTask())
        dispatch(toggleTaskDetailInfo())
        dispatch(toggleTaskAction())
    }
    return (

        <StyledContainer $isDarkMode={isDarkMode}>
            <Button submitFn={handleEditTask}>Edit Task</Button>
            <Button2 passFn={handleDeleteTask}>Delete Task</Button2>
        </StyledContainer>

    )
}


const StyledContainer = styled.div<Props>`
position: absolute;
width: 15rem;
top: 6.5rem;
left: 65%;
border-radius: .8rem;
display: flex;
flex-direction: column;
gap: 1rem;
padding: 1.5rem;
background-color:${({ $isDarkMode }) => $isDarkMode ? "#20212C" : "#FFF"};
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

export default TaskActions

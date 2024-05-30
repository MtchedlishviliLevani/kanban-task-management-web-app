import styled from "styled-components"
import ModalWindow from "./ModalWindow"
import { useAppSelector } from "../../app/hook"
import { useState } from "react"
import RemoveIcon from "../images/icon-cross.svg"
import Button2 from "./Button2"
import DropDownImg from "../images/icon-chevron-down.svg"
import Button from "./Button"
import { editTaskValues, moveTask, } from "../../features/boardSlice"
import { toggleEditTask, toggleOverlay } from "../../features/modalSlice"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"


interface StyledProps {
    $isDarkMode: boolean
}

interface InputForm {
    taskTitle: string;
    subTasks: { title: string }[]

}
function EditTask({ activeTaskIndex, activeColumnName }: { activeTaskIndex: number, activeColumnName: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<InputForm>()
    const dispatch = useDispatch()
    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode)


    const activeIndex = useAppSelector((state) => state.boardReducer.activeIndex)
    const data = useAppSelector((state) => state.boardReducer.data.boards[activeIndex].columns)

    const foundColumn = data.filter((value) => value.name == activeColumnName)[0]?.tasks[activeTaskIndex]
    function removeSubtaskInput(i: number) {
        const filteredSubtask = subTasks.filter((_, index) => index !== i)
        setSubTasks(filteredSubtask)
    }
    const addSubTask = () => {
        const clone = [...subTasks];
        setSubTasks([
            ...clone,
            {
                title: "",
                isCompleted: false,

            },
        ]);
    };
    const sourceIndex = data.findIndex((value) => value?.tasks[activeTaskIndex]?.title == foundColumn?.title)

    const [title, setTitle] = useState(foundColumn?.title)
    const [description, setDescription] = useState(foundColumn?.description);
    const [todo, setTodo] = useState(data[0].name);

    const [subTasks, setSubTasks] = useState(foundColumn?.subtasks.map((item) => ({
        title: item.title,
        isCompleted: item.isCompleted
    })));
    function submitFn() {
        dispatch(editTaskValues({ title, description, status: "Doing", subTasks, activeColumnName, activeTaskIndex }))
        dispatch(moveTask({
            sourceIndex,
            activeTaskIndex,
            status: todo,
            activeColumnName
        }))
        dispatch(toggleOverlay())
        dispatch(toggleEditTask())
    }
    return (
        <ModalWindow>
            <StyledEditTaskForm $isDarkMode={isDarkMode}>
                <h2>Edit Task</h2>
                <div>
                    <label htmlFor="">Title</label>
                    <StyledTitleInput $isInputError={!!errors.taskTitle?.message}
                        {...register("taskTitle", {
                            required: "Required",
                            minLength: 1,
                            maxLength: 30
                        })}
                        type="text"
                        placeholder="e.g. Take coffee break"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.taskTitle?.message && <StyledErrorMessage>{errors.taskTitle?.message}</StyledErrorMessage>}

                </div>
                <div>
                    <label htmlFor="">Description</label>

                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                        {description}
                    </textarea>
                </div>
                <SubtasksContainer $isDarkMode={isDarkMode}>
                    <label htmlFor="">Subtasks</label>
                    <div>
                        {subTasks.map((item, index) => (
                            <div key={index}>
                                <input
                                    {...register(`subTasks.${index}.title`, {
                                        required: true,
                                        minLength: {
                                            value: 3,
                                            message: "Minimum Length is 3"
                                        }
                                    })}
                                    type="text"
                                    placeholder="e.g. Make coffee"
                                    value={item.title}
                                    onChange={(e) => {
                                        const newSubTasks = [...subTasks];
                                        newSubTasks[index].title = e.target.value;
                                        setSubTasks(newSubTasks);
                                    }}
                                />
                                {errors.subTasks?.[index]?.title && <StyledErrorMessage>{errors.subTasks[index]?.title?.message}</StyledErrorMessage>}

                                <img
                                    src={RemoveIcon}
                                    onClick={() => removeSubtaskInput(index)}
                                />
                            </div>
                        ))}
                    </div>

                    <ButtonContainer>
                        <Button2 passFn={addSubTask}>Add New Subtask</Button2>
                    </ButtonContainer>
                </SubtasksContainer>
                <div>
                    <label htmlFor="">Status</label>
                    <StyledSelect $isDarkMode={isDarkMode}>
                        <img src={DropDownImg} alt="" />
                        <select name="" id="" onChange={(e) => setTodo(e.target.value)}>
                            {data.map((value, i) => (
                                <option value={value.name} key={i}>
                                    {value.name}
                                </option>
                            ))}
                        </select>
                    </StyledSelect>
                </div>
                <ButtonContainer>
                    <Button submitFn={handleSubmit(submitFn)}>Save Changes</Button>
                </ButtonContainer>
            </StyledEditTaskForm>
        </ModalWindow>
    );
}

const StyledErrorMessage = styled.p`
margin-top: .3rem;
margin-left: .3rem;
color:#EA5555;
    font-weight: 600;
`
const StyledTitleInput = styled.input < { $isInputError: boolean }>`
border: ${({ $isInputError }) => $isInputError && "solid 1px #EA5555 !important"};
`

const StyledEditTaskForm = styled.div<StyledProps>`

& >div:nth-of-type(1)>label{
    margin-top: 2rem;
}

& >div:nth-of-type(2){
    margin-top: 1rem;
}
textarea{
    resize: none;
}
& input, textarea{
    font-family: "Plus Jakarta Sans", sans-serif;
font-size: 1.3rem;
}

& input, textarea {
    width: 100%;
    outline: none
    ;
    background-color:transparent;
    padding:1.1rem 1rem;
    border: 1px solid #828FA340;
    border-radius:0.4rem;
 ;
}
& input[type="text"]:focus {
  border-color: #635fc7; 
  border-width: .1rem;
}
    
`

const SubtasksContainer = styled.div<StyledProps>`
margin: 1rem 0;
/* display: flex; */

& > div > div{
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
}

& > div input{
    width: 90%;
}

& img{
    width: 2rem;
    cursor: pointer;
}
    &>div{
        display: flex;
        flex-direction: column;
        gap:1rem;
    }

`

const ButtonContainer = styled.div`
    margin: 1rem 0;
`

const StyledSelect = styled.div<StyledProps>`
position: relative;
z-index: 19;

 & img {
cursor: pointer;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 95%;
    z-index: 1;
 }
& select{
    position: relative;
    z-index: 2;
    width: 100%;
    background-color: transparent;
    border: 1px solid #828FA340;
    border-radius:0.4rem;
    padding: 1.1rem 1rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none; 
    -moz-appearance: none; 
   color: ${props => props.$isDarkMode ? "#FFF" : "#000112"}; 
   cursor: pointer;
}

& option {
    color: #828FA340;
    padding: 1rem;
}


& select >option{
    background-color: #2B2C37;
    padding:1rem
}

& optgroup{
    padding: 1rem;
}
`

export default EditTask

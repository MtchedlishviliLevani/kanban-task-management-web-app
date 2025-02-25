import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { addTaskValues }
    from "../../features/boardSlice";
import {
    toggleNewTaskForm,
    toggleOverlay
} from "../../features/modalSlice"
import { useState } from "react";
import DropDownImg from "../images/icon-chevron-down.svg";
import RemoveIcon from "../images/icon-cross.svg";
import ModalWindow from "./ModalWindow";
import Button from "./Button";
import Button2 from "./Button2";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    $isDarkMode: boolean;
}
interface InputForm {
    tasksTitle: string;
    subTasks: { title: string }[]
}
function NewTaskForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InputForm>();
    const activeIndex = useAppSelector((state) => state.boardReducer.activeIndex);
    const data = useAppSelector(
        (state) => state.boardReducer.data.boards[activeIndex].columns
    );
    const isDarkMode = useAppSelector(
        (state) => state.switchModeReducer.isDarkMode
    );
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todo, setTodo] = useState(data[0].name);
    const [subTasks, setSubTasks] = useState([
        { title: "", isCompleted: false },
        { title: "", isCompleted: false },
    ]);
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
    const generateId = uuidv4()
    function submitFn() {
        dispatch(addTaskValues({ id: generateId, title, description, status: todo, subTasks }));
        setTitle("");
        setDescription("");
        setSubTasks([
            {
                title: "",
                isCompleted: false,
            },
            {
                title: "",
                isCompleted: false,
            },
        ]);
        dispatch(toggleNewTaskForm());
        dispatch(toggleOverlay());
    }
    function removeSubtaskInput(i: number) {
        const filteredSubtask = subTasks.filter((_, index) => index !== i);
        setSubTasks(filteredSubtask);
    }

    const dispatch = useAppDispatch();
    return (
        <ModalWindow>
            <StyledNewTaskForm $isDarkMode={isDarkMode}>
                <h2>Add New Task</h2>
                <div>
                    <label htmlFor="">Title</label>
                    <StyledTitleInput $isInputError={!!errors.tasksTitle?.message}
                        type="text"
                        {...register("tasksTitle", {
                            required: "Required",
                            minLength: 1,
                            maxLength: 30
                        })}
                        placeholder="e.g. Take coffee break"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.tasksTitle?.message && <StyledErrorMessage>{errors.tasksTitle?.message}</StyledErrorMessage>}
                </div>
                <div>
                    <label htmlFor="">Description</label>

                    <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
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
                    <Button submitFn={handleSubmit(submitFn)}>Create Task</Button>
                </ButtonContainer>
            </StyledNewTaskForm>
        </ModalWindow>
    );
}

export default NewTaskForm;

const StyledErrorMessage = styled.p`
margin-top: .3rem;
margin-left: .3rem;
color:#EA5555;
    font-weight: 600;
`
const StyledTitleInput = styled.input < { $isInputError: boolean }>`
border: ${({ $isInputError }) => $isInputError && "solid 1px #EA5555!important"};
`
const StyledNewTaskForm = styled.div<Props>`
  & > div:nth-of-type(1) > label {
    margin-top: 2rem;
  }

  & > div:nth-of-type(2) {
    margin-top: 1rem;
  }
  textarea {
    resize: none;
  }

  & input,
  textarea {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-size: 1.3rem;
  }

  & input,
  textarea {
    width: 100%;
    outline: none;
    background-color: transparent;
    padding: 1.1rem 1rem;
    border: 1px solid #828fa340;
    border-radius: 0.4rem;
  }
  input[type="text"]:focus {
    border-color: #635fc7;
    border-width: 0.1rem;
  }
`;

const SubtasksContainer = styled.div<Props>`
  margin: 1rem 0;
  /* display: flex; */

  & > div > div {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
  }

  & > div input {
    width: 90%;
  }

  & img {
    width: 2rem;
    cursor: pointer;
  }
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

`;
const ButtonContainer = styled.div`
  margin: 2rem 0 1rem 0;
`;

const StyledSelect = styled.div<Props>`
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
  & select {
    position: relative;
    z-index: 2;
    width: 100%;
    background-color: transparent;
    border: 1px solid #828fa340;
    border-radius: 0.4rem;
    padding: 1.1rem 1rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none; 
    -moz-appearance: none; 
    color: ${(props) => (props.$isDarkMode ? "#FFF" : "#000112")};
    cursor: pointer;
  }

  & option {
    color: #828fa340;
    padding: 1rem;
  }

  & select > option {
    background-color: #2b2c37;
    padding: 1rem;
  }

  & optgroup {
    padding: 1rem;
  }
`;

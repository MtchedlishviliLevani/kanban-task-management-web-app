/// edited button
import styled from "styled-components"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { activeTaskForm, addTaskValues } from "../../features/boardSlice"
import { useState } from "react"
// import theme from "../../styles/Theme"
import DropDownImg from "../images/icon-chevron-down.svg"
import RemoveIcon from "../images/icon-cross.svg"
import ModalWindow from "./ModalWindow"
import Button from "./Button"
import Button2 from "./Button2"

interface Props {
    $isDarkMode: boolean
}

function NewTaskForm() {
    const activeIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const data = useAppSelector(state => state.boardReducer.data.boards[activeIndex].columns)
    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todo, setTodo] = useState(data[0].name);
    const [subTasks, setSubTasks] = useState([
        { title: "", isCompleted: false, },
        { title: "", isCompleted: false, },
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

    function submitFn() {
        dispatch(addTaskValues({ title, description, status: todo, subTasks }))
        setTitle("")
        setDescription("")
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

    }
    function removeSubtaskInput(i: number) {
        const filteredSubtask = subTasks.filter((_, index) => index !== i)
        setSubTasks(filteredSubtask)
    }

    const dispatch = useAppDispatch()
    return (
        <ModalWindow>
            <StyledNewTaskForm $isDarkMode={isDarkMode}>
                <h2 onClick={() => dispatch(activeTaskForm())}>Add New Task</h2>
                <div>
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="e.g. Take coffee break" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="" >Description</label>

                    <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
                    >{description}</textarea>
                </div>
                <SubtasksContainer $isDarkMode={isDarkMode}>
                    <label htmlFor="">Subtasks</label>
                    <div>
                        {subTasks.map((item, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="e.g. Make coffee"
                                    value={item.title}
                                    onChange={(e) => {
                                        const newSubTasks = [...subTasks];
                                        newSubTasks[index].title = e.target.value;
                                        setSubTasks(newSubTasks);
                                    }}
                                />
                                <img src={RemoveIcon} onClick={() => removeSubtaskInput(index)} />
                            </div>
                        ))}

                    </div>

                    {/* <button onClick={() => addSubTask()}> Add New Subtask</button> */}
                    <ButtonContainer><Button2 passFn={addSubTask}>Add New Subtask</Button2></ButtonContainer>

                </SubtasksContainer>
                <div>
                    <label htmlFor="">Status</label>
                    <StyledSelect $isDarkMode={isDarkMode}>
                        <img src={DropDownImg} alt="" />
                        <select name="" id="" onChange={(e) => setTodo(e.target.value)}>
                            {data.map((value, i) => <option value={value.name} key={i}>{value.name}</option>)}
                        </select></StyledSelect>
                </div>
                {/* <button onClick={submitFn}>Create Task</button> */}
                <ButtonContainer><Button submitFn={submitFn}>Create Task</Button></ButtonContainer>
            </StyledNewTaskForm></ModalWindow>
    )
}

export default NewTaskForm


const StyledNewTaskForm = styled.div<Props>`

& h2  {
    color: ${props => props.$isDarkMode ? "#FFF" : "#000"};
}
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


/* & button{
    width: 100%;
    border-radius: 2rem;
    padding: 1rem 1rem;
    border: initial;cursor: pointer;
    font-weight: bold;

} */

/* & >button{
    background-color:#635FC7 ;
    color: #fff;
margin-top: 2rem;
} */

/* & label {
    color: ${props => props.$isDarkMode ? "#FFF" : "#828FA3"};
    margin-bottom: .5rem;
    display: block;
    font-size: 1.2rem;
font-weight: bold;
} */
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
input[type="text"]:focus {
  border-color: #635fc7; 
  border-width: .1rem;
}
`

const SubtasksContainer = styled.div<Props>`
margin: 1rem 0;
/* display: flex; */

& > div > div{
    display: flex;
    justify-content: space-between;
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

    /* &>button{
     
    margin-top: 1rem;
    background-color:${(props) => props.$isDarkMode ? "#FFF" : "#f0effa"};
    color: #635FC7;
    } */
`
const ButtonContainer = styled.div`
    margin: 2rem 0 1rem 0;
`

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
    -webkit-appearance: none; // Webkit browsers (Chrome, Safari)
    -moz-appearance: none; /* Mozilla Firefox */
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
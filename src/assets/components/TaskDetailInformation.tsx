import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook"
import styled from "styled-components";
import EditSVG from "../images/icon-vertical-ellipsis.svg"
import { checkBox, moveTask } from "../../features/boardSlice";
import ModalWindow from "./ModalWindow";
import CheckIcon from "../images/icon-check.svg"
import TaskActions from "./TaskActions";
import { toggleOverlay, toggleTaskAction, toggleTaskDetailInfo } from "../../features/modalSlice";

interface Props {
    $isDarkMode: boolean
}
// toggleOverlay, toggleTaskAction, toggleTaskDetailInfo

export default function TaskDetailInformation({ activeTaskIndex, activeColumnName }: { activeTaskIndex: number, activeColumnName: string }) {
    const dispatch = useAppDispatch()
    const activeIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const data = useAppSelector(state => state.boardReducer.data.boards[activeIndex].columns);
    const foundColumn = data.filter((value) => value?.name == activeColumnName)[0]?.tasks[activeTaskIndex]
    const filteredSubtaskNumber = foundColumn?.subtasks?.filter((value) => value?.isCompleted === true).length
    const subtaskLength = foundColumn?.subtasks.map((value) => value).length
    const [status, setStatus] = useState("")
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    const sourceIndex = data?.findIndex((value) => value?.tasks[activeTaskIndex]?.title == foundColumn?.title)
    const isOpenTaskAction = useAppSelector((state) => state.modalReducer.isOpenTaskAction)

    useEffect(() => {
        if (foundColumn?.status) {
            setStatus(activeColumnName)
        }
    }, [foundColumn?.status, activeColumnName])

    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        const newStatus = e.target.value;
        setStatus(newStatus);
        dispatch(moveTask({ sourceIndex, activeTaskIndex, status: newStatus, activeColumnName, }))
        dispatch(toggleTaskDetailInfo())
        dispatch(toggleOverlay())
    }


    return (
        <>{foundColumn &&
            <StyledContainer>
                <ModalWindow>
                    {isOpenTaskAction && <TaskActions />}
                    <StyledCard $isDarkMode={isDarkMode}>
                        <TitleIconContainer><h2>{foundColumn?.title}</h2><img onClick={() => dispatch(toggleTaskAction())} src={EditSVG} alt="" /></TitleIconContainer>
                        <div><p>{foundColumn?.description}</p></div>
                        <SubtaskContainer $isDarkMode={isDarkMode} ><h3>Subtasks ({filteredSubtaskNumber} of {subtaskLength})</h3>{foundColumn?.subtasks.map((value, index) => <div key={index}><div><CheckBox type="checkbox" checked={value?.isCompleted} onChange={() => dispatch(checkBox({ activeColumnName, activeTaskIndex, checkIndex: index }))} /><span>{value?.title}</span> </div></div>)}</SubtaskContainer>
                        <StatusContainer $isDarkMode={isDarkMode}><h3>Current status</h3> <select value={status} onChange={handleSelect} >{data?.map((status1, index) => <option key={index} >{status1.name}</option>)}</select></StatusContainer>


                    </StyledCard></ModalWindow></StyledContainer>}</>
    )
}

const StyledContainer = styled.div`
top: 0% !important;
    
`

const StyledCard = styled.div<Props>`
    & p {
        font-size: 1.3rem;
        color: #828FA3;
        font-weight: 500;
        margin-top: 1.5rem;
        line-height: 2.2rem;
    }

    & h3{
        color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#828FA3"};
        font-weight:700; 
        font-size: 1.2rem;
    }   
`
const SubtaskContainer = styled.div<Props>`
margin-top: 1.5rem;

& div{
    div:hover{
       background-color: rgba(99,95,199,.25)
    }
    div{
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        background-color: ${({ $isDarkMode }) => $isDarkMode ? "#20212C" : "#F4F7FD"};
        padding: 1rem;
        border-radius: .8rem;

& span{
    font-weight: 700;
    font-size: 1.2rem;
    color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#000"};
}
        & input {
            width: initial;
        }
    }
}

`

const StatusContainer = styled.div<Props>`
margin-top: 2rem;

& h3 {
    margin-bottom: .4rem;
}

& select{
    background-color:inherit ;
    padding: .5rem;
    outline: none;
    cursor: pointer;
    color:${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#000"};
    width:100%;
}
`

const CheckBox = styled.input`
 position: relative;
 appearance: none; 
  -webkit-appearance: none; 
  -moz-appearance: none; 
  width: 1.2rem;
  height: 1.6rem;
  outline: none; 
  padding: .7rem !important;
  border-radius: 0.2rem !important;
  background-color: white;
  cursor: pointer;

  &::before{
    content: "";
    background-image: url(${CheckIcon});
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: .9rem;
    height: .7rem;
    background-repeat: no-repeat;
    background-size: cover;
    visibility: hidden; 
  }
  &:checked{
    background-color: #635fc7;
  }
  &:checked::before {
    visibility: visible;
  }

& + span {
    text-decoration: ${({ checked }) => checked && "line-through"};
    opacity: ${({ checked }) => checked && "50%"};
  }
`
const TitleIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    & img{
        cursor: pointer;
    }
`
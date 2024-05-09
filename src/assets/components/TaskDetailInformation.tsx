import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook"
import styled from "styled-components";
import EditSVG from "../images/icon-vertical-ellipsis.svg"
import { changeColumn, checkBox } from "../../features/boardSlice";
import ModalWindow from "./ModalWindow";

export default function TaskDetailInformation({ activeIndex1, activeColumnName }: { activeIndex1: number, activeColumnName: string }) {
    console.log(activeIndex1)
    const dispatch = useAppDispatch()
    const activeIndex = useAppSelector(state => state.boardReducer.activeIndex)
    const data = useAppSelector(state => state.boardReducer.data.boards[activeIndex].columns);
    const foundColumn = data.filter((value) => value.name == activeColumnName)[0]?.tasks[activeIndex1]
    console.log(data.filter((value) => value.name == activeColumnName))
    const filteredSubtaskNumber = foundColumn?.subtasks.filter((value) => value.isCompleted === true).length
    const subtaskLength = foundColumn?.subtasks.map((value) => value).length
    const [status, setStatus] = useState("")


    const data1 = useAppSelector(state => state.boardReducer.data);
    console.log(data1.boards[activeIndex].columns, 'dt1')

    const columnIndex = data1.boards[activeIndex].columns.findIndex((value) => value.name === status)
    console.log(status)

    console.log(columnIndex)
    const sourceIndex = data.findIndex((value) => value.tasks[activeIndex1]?.title == foundColumn?.title)

    console.log(status)


    useEffect(() => {
        if (foundColumn?.status) {
            setStatus(activeColumnName)
        }
    }, [foundColumn?.status, activeColumnName])
    console.log(status, activeColumnName)

    function handleSelect(e) {
        const newStatus = e.target.value;
        setStatus(newStatus); // Update the status state first
        dispatch(changeColumn({ sourceIndex, activeIndex1, status: newStatus, activeColumnName, }))
        console.log(data)

    }

    return (
        <ModalWindow>
            <StyledCard>
                <TitleIconContainer><h2>{foundColumn?.title}</h2><img src={EditSVG} alt="" /></TitleIconContainer>
                <div><p>{foundColumn?.description}</p></div>

                <div>subtask ({filteredSubtaskNumber} of {subtaskLength}){foundColumn?.subtasks.map((value, index) => <div key={index}><input type="checkbox" checked={value?.isCompleted} onChange={() => dispatch(checkBox({ activeColumnName, activeIndex1, checkIndex: index }))} /> {value?.title}</div>)}</div>
                <div><h3>current states</h3> <select value={status} onChange={handleSelect} >{data.map((status1, index) => <option key={index} >{status1.name}</option>)}</select></div>



            </StyledCard></ModalWindow>
    )
}


const StyledCard = styled.div`
/* padding: 1rem;
/* display: none; */
/* background-color: white;
    width: 34rem;
    height: 40rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);  */
`

const TitleIconContainer = styled.div`
    display: flex;
    justify-content: space-between;

    & img{
        cursor: pointer;
    }
`
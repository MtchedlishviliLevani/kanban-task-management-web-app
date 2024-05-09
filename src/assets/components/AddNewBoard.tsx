import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { addNewBoard } from "../../features/boardSlice";
import theme from "../../styles/Theme";
import ModalWindow from "./ModalWindow";
import Button from "./Button";
import Button2 from "./Button2";

interface Props { $isDarkMode: boolean }

function AddNewBoard() {
    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode)
    const [boardName, setNewBoard] = useState("");
    const [columnsValue, setColumnValue] = useState([
        { name: "Todo", tasks: [{}] },
        { name: "Doing", tasks: [{}] },
    ]);

    function updateColumnName(i: number, e: React.ChangeEvent<HTMLInputElement>) {
        const newColumnsValue = [...columnsValue];
        newColumnsValue[i].name = e.target.value;
        setColumnValue(newColumnsValue);
    }

    function addNewColumnNames(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        const clone = [...columnsValue];
        setColumnValue([
            ...clone,
            {
                name: "",
                tasks: [{}],
            },
        ]);
    }

    function updatedBoard(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        dispatch(addNewBoard({ name: boardName, columns: columnsValue }))
    }
    console.log(columnsValue);

    const dispatch = useAppDispatch();
    return (
        <ModalWindow>
            <StyledNewBoard $isDarkMode={isDarkMode}>
                <h2>Add New Board</h2>
                <form action="">
                    <label htmlFor="">Name</label>

                    <input
                        type="text"
                        placeholder="e.g. Web Design"
                        value={boardName}
                        onChange={(e) => setNewBoard(e.target.value)}
                    />
                    <ColumnWrapper>
                        <label htmlFor="">Columns</label>
                        <ColumnInputWrapper>
                            {columnsValue.map((item, index) => (
                                <input
                                    type="text"
                                    key={index}
                                    value={item.name}
                                    onChange={(e) => updateColumnName(index, e)}
                                />
                            ))}</ColumnInputWrapper>
                        {/* <button onClick={(e) => addNewColumnNames(e)}>Add Column</button> */}
                        <ButtonContainer><Button2 passFn={addNewColumnNames}>Add Column</Button2></ButtonContainer>
                    </ColumnWrapper>
                </form>
                {/* <button onClick={(e) => updatedBoard(e)}>Create New Board</button> */}
                <Button submitFn={updatedBoard}> Create New Board</Button>
            </StyledNewBoard></ModalWindow>
    );
}


const ColumnWrapper = styled.div`
    margin: 2rem 0 0 0;
`
const StyledNewBoard = styled.div<Props>`
/* background-color: ${props => props.$isDarkMode ? theme.allColors.themeColor.darkMode.cardBg : theme.allColors.themeColor.lightMode.cardBg};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34rem;
  height: 50rem;
  border-radius: 0.6rem;
  padding: 2.4rem; */

 & h2  {
    color: ${props => props.$isDarkMode ? "#FFF" : "#000"};
}

/* & label {
    color: ${props => props.$isDarkMode ? "#FFF" : "#828FA3"};
    margin-bottom: .5rem;
    display: block;
    font-size: 1.2rem;
font-weight: bold;
} */

& form {
    margin-top: 1rem;
}
/* & input {
    width: 100%;
    outline: none
    ;
    background-color:transparent;
    padding:1.1rem 1rem;
    border: 1px solid #828FA340;
    border-radius:0.4rem;
 ;
} */
input[type="text"]:focus {
  border-color: #635fc7; 
  border-width: .1rem;
}

& button {
    width: 100%;
    border-radius: 2rem;
    padding: 1rem 1rem;
    border: initial;cursor: pointer;
    font-weight: bold;
}

/* & > div:nth-child(1) div button{
   
    background-color:#635FC7 ;
    color: #fff;
margin-top: 2rem;
} */

/* &>button{
     
     margin-top: 1rem;
     background-color:${(props) => props.$isDarkMode ? "#FFF" : "#f0effa"};
     color: #635FC7;
     } */
`;
const ButtonContainer = styled.div`
    margin: 1rem 0;
`
const ColumnInputWrapper = styled.div`
display: flex;
flex-direction:column;
gap: 1rem;
`

export default AddNewBoard;

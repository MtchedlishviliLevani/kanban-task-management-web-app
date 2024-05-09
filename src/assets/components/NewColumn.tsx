import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { addNewColumnName, editBoardName, editColumnName, openNewColumn, removeColumnName, saveBoardName, saveColumnName } from '../../features/boardSlice';
import RemoveIcon from "../images/icon-cross.svg"

function NewColumn() {

    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode)
    const boardName = useAppSelector(state => state.boardReducer.boardName)
    const boardColumnsName = useAppSelector(state => state.boardReducer.boardColumnsName)
    const isOpenNewColumn = useAppSelector(state => state.boardReducer.isOpenNewColumn)
    return (
        <>
            {isOpenNewColumn &&
                <NewColumnModal $isDarkMode={isDarkMode}>
                    <h2>Edit Board</h2>
                    <div>
                        <label htmlFor="">Board Name</label>
                        <input type="text"
                            onChange={(e) => dispatch(editBoardName(e.target.value))} value={boardName}
                        />
                        <img src="" alt="" />
                    </div>
                    <StyledEditingColumns $isDarkMode={isDarkMode}>
                        <label htmlFor="">Board Columns</label><div>

                            {/* {boardColumnsName?.map((column: { name: string }, index: number) => <div key={index}>
                            <input type="text"
                                //  onChange={(e) => inputValuesChanges(e.target.value, index)}
                                value={column.name} />
                            <img
                                src={RemoveIcon}
                                alt="" /></div>)} */}
                            {boardColumnsName.map((column, index) => <div key={index}><input type="text" value={column.name} onChange={(e) => dispatch(editColumnName({ columnIndex: index, newColumnName: e.target.value }))} />
                                <img
                                    onClick={() => dispatch(removeColumnName({ activeIndex: index }))}
                                    src={RemoveIcon} alt="" /></div>)}
                        </div> </StyledEditingColumns>
                    <StyledAddNewColumnBtn onClick={() => dispatch(addNewColumnName())} $isDarkMode={isDarkMode} >+ Add New Column</StyledAddNewColumnBtn>
                    <StyledSaveChangesBtn
                        // onClick={handleSave}
                        onClick={() => {
                            dispatch(saveBoardName()),
                                dispatch(saveColumnName())
                        }}

                    >Save Changes</StyledSaveChangesBtn>
                </NewColumnModal>}
            <StyledNewColumn $isDarkMode={isDarkMode}>
                <button onClick={() => dispatch(openNewColumn())}>+ New Column</button>
            </StyledNewColumn>
        </>
    )
}


const StyledBtns = styled.button`
    width: 100%;
    border-radius: 2rem;
    padding: 1rem 1rem;
    border: initial;cursor: pointer;
`

const StyledSaveChangesBtn = styled(StyledBtns)`
    margin-top: 2rem;
    background-color:#635FC7 ;
    color: #fff;
`

const StyledAddNewColumnBtn = styled(StyledBtns) <{ $isDarkMode: boolean }>`
    margin-top: 20px;
    background-color:${(props) => props.$isDarkMode ? "#FFF" : "#f0effa"};
    color: #635FC7;
    font-weight: bold;


`
const StyledEditingColumns = styled.div<{ $isDarkMode: boolean }>`
& label {
    margin-bottom: .5rem;
    display: block;
}
& input {
    width: 90%;
}
input[type="text"]:focus {
  border-color: #635fc7; 
  border-width: .1rem;
}

&>div{
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &>div{
        display: flex;
        gap: 1rem;
        align-items: center;

        &>img{
            cursor: pointer;
        }
    }
}



`
const NewColumnModal = styled.div<{ $isDarkMode: boolean }>`
padding: 3rem 2rem;
width: 30rem;
display: none
;
position: absolute;
top: 50%;
left: 40%;
transform: translateY(-50%);
z-index: 11;
background-color: ${({ $isDarkMode }) => $isDarkMode ? "#2B2C37" : "#FFF"};
&>h2{
    color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#000"};
    font-size: 1.8rem;
    font-weight: bold;
}
& label{
font-size: 1.2rem;
font-weight: bold;
color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#828FA3"};
}

&>div:nth-of-type(1) input{
    display: block;
    cursor: pointer;
    margin-top: .5rem;
    width: 100%;
}



& input ::placeholder{
    font-family: "Plus Jakarta Sans", sans-serif;
 color  :#000112 ;
}

& input{
    outline: none;
    border: 1px solid #828FA340;
    padding: .6rem 1.4rem;
     background-color: transparent;
     border-radius: .4rem;
} 
&>div:nth-child(2){
    margin-top: 1.3rem;
}

`

const StyledNewColumn = styled.div < { $isDarkMode: boolean }>`
    min-width: 25rem;
    max-width: 30rem;
    background: ${({ $isDarkMode }) => $isDarkMode
        ? "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%)"
        : "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)"};
        border-radius: .6rem;
        margin-top: calc(2rem + 1.4rem);
        display: grid;
        place-items: center;

        &>button{
            all: unset;
            font-size: 1.8rem;
            color: #828fa3;
            cursor: pointer;
            transition: color .5s;

            &:hover{
                color: #635FC7;
;
            }
        }

;
// `

export default NewColumn

import styled from 'styled-components'
import useData from '../../store/useBoard'
import RemoveIcon from "../images/icon-cross.svg"

function NewColumn() {
    const { isDarkMode, data, activeButton } = useData();
    const foundBoard = data.boards.find(board => board.name === activeButton);

    return (<>
        <NewColumnModal $isDarkMode={isDarkMode}>
            <h2>Edit Board</h2>
            <div>
                <label htmlFor="">Board Name</label>
                <input type="text" onChange={() => { }} value={foundBoard?.name} />
                <img src="" alt="" />
            </div>
            <StyledEditingColumns $isDarkMode={isDarkMode}>
                <label htmlFor="">Board Columns</label><div>
                    {foundBoard?.columns.map((column, index) => <div key={index}><input type="text" /><img src={RemoveIcon} alt="" /></div>)}
                </div> </StyledEditingColumns>


        </NewColumnModal>
        <StyledNewColumn $isDarkMode={isDarkMode}>
            <button>+ New Column</button>
        </StyledNewColumn>
    </>
    )
}

const StyledEditingColumns = styled.div<{ $isDarkMode: boolean }>`
& label {
    margin-bottom: .5rem;
    display: block;
}
& input {
    color: ${({ $isDarkMode }) => $isDarkMode ? "#FFF" : "#000"};
}
input[type="text"]:focus {
  border-color: #635fc7; 
  border-width: .2rem;
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
height: 30rem;
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
    width: 30rem;
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
`

export default NewColumn

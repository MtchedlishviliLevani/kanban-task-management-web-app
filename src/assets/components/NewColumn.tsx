import styled from 'styled-components'
import useData from '../../store/useBoard'

function NewColumn() {
    const { isDarkMode } = useData()
    return (
        <StyledNewColumn $isDarkMode={isDarkMode}>
            <button>+ New Column</button>
        </StyledNewColumn>

    )
}

const StyledNewColumn = styled.div < { $isDarkMode: boolean }>`
    width: 30rem;
    /* height: 100vh; */
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

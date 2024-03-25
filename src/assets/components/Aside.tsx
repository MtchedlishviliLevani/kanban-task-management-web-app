import styled from 'styled-components'
// import data from "../../data.json"
import useData from '../../store/useBoard'
import boardIcon from "../images/icon-board.svg"
import theme from '../../styles/Theme';
import { useState } from 'react';

interface AsideProps {
    isDarkMode: boolean;
}
interface ButtonProps {

}
function Aside() {
    const [ActiveButtonIndex, setActiveButtonIndex] = useState(0);
    const { data, isDarkMode } = useData();

    return (
        <StyledAside isDarkMode={isDarkMode}>
            <div><h2>ALL BOARDS()</h2></div>

            <ButtonContainer>
                {data.boards.map((x, i) => <div key={i}><Button onClick={() => setActiveButtonIndex(i)}><img src={boardIcon} alt="" />{x.name}</Button></div>)}
            </ButtonContainer>
        </StyledAside >


    )
}

const StyledAside = styled.aside<AsideProps>`
width: 70%;
height: calc(100% - 8vh);
background-color: ${({ isDarkMode }) => isDarkMode ? theme.allColors.themeColor.darkMode.bgColor : theme.allColors.themeColor.lightMode.bgColor};
position: absolute;
transform: translate(-50%,-50%);
left: 50%;
top: 60%;
padding: 1.5rem 0;
border-radius: 1.2rem;
font-weight: bold;

&>div:nth-child(1){
    padding-left: 20px;
}
& h2{
    font-size: 1.2rem;
    color:  rgba(130, 143, 163, 1);

}
`

const ButtonContainer = styled.div`
 display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2rem;
        
    &>div{
       padding: 1rem 0;
        /* background-color: blue; */
        padding-left: 20px;
        display: flex;
    width: 90%;
    border-radius:0 12px 12px 0;
    
    }
   
`
const Button = styled.button`
     all:unset;
        display: flex;
        gap: 1.5rem;
        font-size: 1.5rem;
        color:#fff;
`

export default Aside

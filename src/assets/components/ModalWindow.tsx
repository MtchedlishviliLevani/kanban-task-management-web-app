import styled from 'styled-components'
import { useAppSelector } from '../../app/hook'
import theme from '../../styles/Theme'

interface Props {
    $isDarkMode: boolean
}
function ModalWindow(props) {
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    return (
        <StyledWindow $isDarkMode={isDarkMode}>
            {props.children}
        </StyledWindow>
    )
}

const StyledWindow = styled.div<Props>`
    border-radius: .8rem;
    padding: 3rem 2rem;
width: 48rem;
position: absolute;
top: 50%;
left: 40%;
transform: translateY(-50%);
z-index: 11;
background-color: ${props => props.$isDarkMode ? theme.allColors.themeColor.darkMode.cardBg : theme.allColors.themeColor.lightMode.cardBg};

& label {
    color: ${props => props.$isDarkMode ? "#FFF" : "#828FA3"};
    margin-bottom: .5rem;
    display: block;
    font-size: 1.2rem;
font-weight: bold;
}

& input {
    color: ${props => props.$isDarkMode ? "#FFF" : "#000"};
   
    width: 100%;
    outline: none
    ;
    background-color:transparent;
    padding:1.1rem 1rem;
    border: 1px solid #828FA340;
    border-radius:0.4rem;
 
}
`

export default ModalWindow





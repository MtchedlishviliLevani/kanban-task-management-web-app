import styled from 'styled-components'
import { useAppSelector } from '../../app/hook'
import theme from '../../styles/Theme'
import { ReactNode } from 'react'

interface StyledProps {
    $isDarkMode: boolean;
}
function ModalWindow({ children }: { children: ReactNode }) {
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)

    return (
        <StyledWindow $isDarkMode={isDarkMode} >
            {children}
        </StyledWindow>

    )
}

const StyledWindow = styled.div<StyledProps>`
z-index: 100;
overflow: auto;
border-radius: .8rem;
transform: translate(-50%,-50%);
    border-radius: .8rem;
    padding: 3rem 2rem;
max-width: 48rem;
width: 90%;
position: absolute;
top:  50%;
left:50%;
background-color: ${props => props.$isDarkMode ? theme.allColors.themeColor.darkMode.cardBg : theme.allColors.themeColor.lightMode.cardBg};
 & h2{
    color: ${props => props.$isDarkMode ? "#FFF" : "#000"};
    font-size: 1.8rem;
    line-height: 2.4rem;
 }
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
    outline: none;
    padding:1.1rem 1rem;
    border: 1px solid #828FA340;
    border-radius:0.4rem;
background-color: transparent;
 
}
`

export default ModalWindow





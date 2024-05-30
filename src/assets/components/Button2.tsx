import styled from 'styled-components'
import { useAppSelector } from '../../app/hook'
import { ReactNode } from 'react'

interface Props {
    $isDarkMode: boolean
}
interface ButtonProps {
    children: ReactNode;
    passFn: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function Button2({ children, passFn }: ButtonProps) {
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    return (
        <StyledButton $isDarkMode={isDarkMode} onClick={passFn}>
            {children}
        </StyledButton>
    )
}

const StyledButton = styled.button<Props>`
    width: 100%;
    border-radius: 2rem;
    padding: 1rem 1rem;
    border: initial;
    cursor: pointer;
    font-weight: bold;
    background-color:${(props) => props.$isDarkMode ? "#FFF" : "#f0effa"};
    color: #635FC7;
`

export default Button2

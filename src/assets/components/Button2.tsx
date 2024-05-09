// import React from 'react'
import styled from 'styled-components'
import { useAppSelector } from '../../app/hook'

interface Props {
    $isDarkMode: boolean
}
function Button2(props) {
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    return (
        <StyledButton $isDarkMode={isDarkMode} onClick={props.passFn}>
            {props.children}
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

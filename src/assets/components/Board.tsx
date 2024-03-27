import React from 'react'
import styled from 'styled-components'
import useData from '../../store/useBoard'
import theme from '../../styles/Theme'

interface States {
    $isDarkMode: boolean
}
function Board() {
    const { isDarkMode } = useData()
    return (
        <BoardStyled $isDarkMode={isDarkMode}>

        </BoardStyled>
    )
}

const BoardStyled = styled.div<States>`
flex-grow: 1;
    /* background-color: ${({ theme }) => theme.allColors.themeColor.lightMode.bgColor}; */
    background-color: #F4F7FD;
    background-color:${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.boardBg : theme.allColors.themeColor.lightMode.boardBg} ;
`

export default Board

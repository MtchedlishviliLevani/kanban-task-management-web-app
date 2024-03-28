import React from 'react'
import styled from 'styled-components'
import useData from '../../store/useBoard'
import theme from '../../styles/Theme'
import breakPoints from '../utility/BreakPoints'
import showAside from "../images/icon-show-sidebar.svg"

interface States {
    $isDarkMode: boolean
}
function Board() {
    const { isDarkMode, isOpenSide, toggleIsOpenSide } = useData()
    return (
        <BoardStyled $isDarkMode={isDarkMode}>
            {isOpenSide && <ShowAside onClick={toggleIsOpenSide}>
                <img src={showAside} alt="" /></ShowAside>}

        </BoardStyled>
    )
}
const ShowAside = styled.div`
display: none;
cursor: pointer;
${breakPoints.md}{
    width: 5.6rem;
    height: 4.8rem;
    background-color: #635FC7;
    display: grid;
    place-items: center;
    position: absolute;
    top: 85vh;
    left: 0%;
    border-radius: 0 2.5rem 2.5rem 0;
    transition: opacity 1s;

    &:hover{
        opacity: 0.5;
    }
}
`
const BoardStyled = styled.div<States>`
width: 100%; 
min-height: calc(100vh - 8.1rem );
background-color:${({ $isDarkMode }) => $isDarkMode ? theme.allColors.themeColor.darkMode.boardBg : theme.allColors.themeColor.lightMode.boardBg} ;

${breakPoints.md}{
    flex-grow: 1;
    width: initial;
}

    /* background-color: ${({ theme }) => theme.allColors.themeColor.lightMode.bgColor}; */
`

export default Board

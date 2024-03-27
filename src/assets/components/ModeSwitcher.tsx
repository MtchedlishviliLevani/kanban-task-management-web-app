// import React from 'react'
import styled from 'styled-components'
import lightIcon from "../images/icon-light-theme.svg"
import darkIcon from "../images/icon-dark-theme.svg"
import useData from '../../store/useBoard'

interface SwtichModeProps {
    $isDarkMode: boolean;
}
function ModeSwitcher() {
    const { isDarkMode, modeSwitcher } = useData()
    return (
        <SwitchModeContainer $isDarkMode={isDarkMode}>
            <img src={lightIcon} alt="" />
            <ToggleSwitcher $isDarkMode={isDarkMode} onClick={modeSwitcher}>
                <span></span>
            </ToggleSwitcher>
            <img src={darkIcon} alt="" />
        </SwitchModeContainer>
    )
}

const ToggleSwitcher = styled.button<SwtichModeProps>`
all: unset;
    width: 4rem;
    height: 2rem;
    border-radius: 1.2rem;
    background-color: ${({ theme }) => theme.allColors.general.toggleSwitcherBg};
    position: relative;
    cursor: pointer;

    &>span{
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        background-color: #FFF;
        position: absolute;
        transform: translate(-50%,-50%);
        left:${(props) => props.$isDarkMode ? "72%" : "26%"};
transition: left .7s;
        top: 50%;
    }
`
const SwitchModeContainer = styled.div<SwtichModeProps>`
    width: 90%;
    margin: 0 auto;
    border-radius: 1.2rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem 0;
    background-color:${(props) => props.$isDarkMode ? props.theme.allColors.themeColor.darkMode.switcherModeBg : props.theme.allColors.themeColor.lightMode.switcherModeBg};
`

export default ModeSwitcher

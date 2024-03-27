import styled from "styled-components";
import useData from "../../store/useBoard";
import boardIcon from "../images/icon-board.svg";
import theme from "../../styles/Theme";
import { useState } from "react";
import ModeSwitcher from "./ModeSwitcher";
import breakPoints from "../utility/BreakPoints";

interface AsideProps {
    $IsDarkMode: boolean;
}
interface ButtonProps {
    $activeButtonIndex: number;
    $index: number;
}


function Aside() {
    const [ActiveButtonIndex, setActiveButtonIndex] = useState(0);
    const { data, isDarkMode } = useData();
    console.log(isDarkMode + "bla")

    return (
        <StyledAside $IsDarkMode={isDarkMode}>
            <div>
                <h2>ALL BOARDS ({data.boards.length})</h2>
            </div>

            <ButtonWrapper>
                {data.boards.map((x, i: number) => (
                    <ButtonContainer key={i}
                        $index={i}
                        $activeButtonIndex={ActiveButtonIndex}
                        onClick={() => setActiveButtonIndex(i)}
                    >
                        <Button


                        >
                            <img src={boardIcon} alt="" />
                            {x.name}
                        </Button>
                    </ButtonContainer>
                ))}
                <AddNewBoardBtn><img src={boardIcon} alt="" /><span>+ Create New Board</span> </AddNewBoardBtn>
                <ModeSwitcher />
            </ButtonWrapper>
        </StyledAside>
    );
}



export default Aside;

const AddNewBoardBtn = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 2rem;
    cursor: pointer;
    &>span:hover{
        opacity:.6;
        color:#635fc7
    }

    &>span{
        color: #635fc7;
        font-size: 1.5rem;
        font-weight: bold;

    }
`
const StyledAside = styled.aside<AsideProps>`
  width: 70%;
  /* height: calc(100% - 8vh); */
        background-color: ${(props) => props.$IsDarkMode ? theme.allColors.themeColor.darkMode.asideBg : theme.allColors.themeColor.lightMode.asideBg
    };
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 60%;
  padding: 1.5rem 0;
  border-radius: 1.2rem;
  font-weight: bold;

  ${breakPoints.md}{
    border-right:.1rem solid ${({ $IsDarkMode }) => $IsDarkMode ? theme.allColors.themeColor.darkMode.borderColor : theme.allColors.themeColor.lightMode.borderColor};
    border-radius: initial;
    width: calc(5% + 21.373rem);
    position: initial;
    transform: initial;
    height: calc(100vh - 8rem - .1rem);
  }

  & > div:nth-child(1) {
    padding-left: 20px;
  }
  & h2 {
    font-size: 1.2rem;
    color: rgba(130, 143, 163, 1);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ButtonContainer = styled.div<ButtonProps>`
     padding: 1rem 0;
    padding-left: 20px;
    display: flex;
    width: 90%;
    border-radius: 0 12px 12px 0;
    cursor: pointer;
    background-color: ${(props) => props.$activeButtonIndex === props.$index ? theme.allColors.general.activeBoardButtonBg : ""};

    & >button {
        color: ${(props) => props.$activeButtonIndex === props.$index ? "#FFF" : "#828FA3"};

    }
`
const Button = styled.button`
padding: 1rem;
  all: unset;
  display: flex;
  gap: 1.5rem;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;
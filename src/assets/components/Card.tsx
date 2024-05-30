import React from 'react'
import { styled } from 'styled-components';
import { useAppSelector } from '../../app/hook';
import { useDispatch } from 'react-redux';
import { toggleOverlay, toggleTaskDetailInfo } from '../../features/modalSlice';
import breakPoints from '../utility/BreakPoints';


interface Card {
    $isDarkMode: boolean;
}

interface Props {
    columnsName: {
        name: string;
        tasks: {
            title: string;
            description: string;
            status: string;
            subtasks: {
                title: string;
                isCompleted: boolean;
            }[];
        }[];
    },
    setTaskActiveIndex: React.Dispatch<React.SetStateAction<number>>,
    setActiveColumn: React.Dispatch<React.SetStateAction<string>>

}
function Card({ columnsName, setTaskActiveIndex, setActiveColumn }: Props) {
    const dispatch = useDispatch()

    function handleDetailInfo(i: number, name: string) {
        setTaskActiveIndex(i), setActiveColumn(name), dispatch(toggleTaskDetailInfo());
        dispatch(toggleOverlay());
    }
    const isDarkMode = useAppSelector((state) => state.switchModeReducer.isDarkMode)
    return (
        <CardWrapper>
            {
                columnsName?.tasks && columnsName?.tasks.length > 0 && (
                    Object.keys(columnsName.tasks[0]).length === 0
                        ? columnsName.tasks.slice(1).map((task, i) => (
                            <CardStyled
                                key={i}
                                $isDarkMode={isDarkMode}
                                onClick={() => handleDetailInfo(i, columnsName?.name)}
                            >
                                <h2>{task?.title}</h2>
                                <span>
                                    {task?.subtasks?.reduce(
                                        (sum, subtask) => sum + (subtask?.isCompleted ? 1 : 0),
                                        0
                                    )}{" "}
                                    of {task?.subtasks?.length} subtasks
                                </span>
                            </CardStyled>
                        ))
                        : columnsName.tasks.map((task, i) => (
                            <CardStyled
                                key={i}
                                $isDarkMode={isDarkMode}
                                onClick={() => handleDetailInfo(i, columnsName?.name)}
                            >
                                <h2>{task?.title}</h2>
                                <span>
                                    {task?.subtasks?.reduce(
                                        (sum, subtask) => sum + (subtask?.isCompleted ? 1 : 0),
                                        0
                                    )}
                                    of {task?.subtasks?.length} subtasks
                                </span>
                            </CardStyled>
                        ))
                )
            }

        </CardWrapper>
    )
}
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 30rem;
`;

const CardStyled = styled.div<Card>`
  box-shadow: 0px 4px 6px 0px #364e7e1a;
  width: 30rem;
  border-radius: 1.2rem;
  padding: 3rem 2rem;
  background-color: ${({ $isDarkMode, theme }) =>
        $isDarkMode
            ? theme.allColors.themeColor.darkMode.cardBg
            : theme.allColors.themeColor.lightMode.cardBg};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  transition: opacity 0.5s;
  ${breakPoints.md} {
    &:hover {
      opacity: 50%;
    }
  }
  & > h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ $isDarkMode }) => ($isDarkMode ? "#FFF" : "#000")};
  }
  & > span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #828fa3;
  }
`;
export default Card

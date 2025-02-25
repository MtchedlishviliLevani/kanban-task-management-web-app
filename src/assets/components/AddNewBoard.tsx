import { useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { addNewBoard } from "../../features/boardSlice";
import ModalWindow from "./ModalWindow";
import Button from "./Button";
import Button2 from "./Button2";
import RemoveIcon from "../images/icon-cross.svg";
import { useForm } from "react-hook-form";
import { toggleAddNewBoard, toggleOverlay } from "../../features/modalSlice";
import { v4 as uuidv4 } from 'uuid';

interface States { $isDarkMode: boolean; }

interface IFormInput {
    boardName: string;
    columnValues: { name: string; tasks: { title: string; description: string; status: string; subtasks: { title: string; isCompleted: boolean }[] }[] }[];
}

function AddNewBoard() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const isDarkMode = useAppSelector(state => state.switchModeReducer.isDarkMode);
    const [boardName, setNewBoard] = useState("");
    const [columnsValue, setColumnValue] = useState([
        { name: "Todo", tasks: [] },
        { name: "Doing", tasks: [] },
    ]);

    const dispatch = useAppDispatch();

    function updateColumnName(i: number, e: React.ChangeEvent<HTMLInputElement>) {
        const newColumnsValue = [...columnsValue];
        newColumnsValue[i].name = e.target.value;
        setColumnValue(newColumnsValue);
    }

    function addNewColumnNames(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setColumnValue([
            ...columnsValue,
            { name: "", tasks: [] },
        ]);
    }

    const generateId = uuidv4()
    function updatedBoard() {
        dispatch(addNewBoard({ name: boardName, columns: columnsValue, id: generateId }));
        dispatch(toggleAddNewBoard());
        dispatch(toggleOverlay());
    }

    function removeBoardInput(i: number) {
        const filtered = columnsValue.filter((_, index) => index !== i);
        setColumnValue(filtered);
    }

    return (
        <ModalWindow>
            <StyledNewBoard $isDarkMode={isDarkMode}>
                <h2>Add New Board</h2>
                <form >
                    <label htmlFor="">Name</label>
                    <StyledBoardNameInput
                        $isBoardNameError={!!errors.boardName?.message}
                        {...register("boardName", {
                            required: "Required",
                            minLength: {
                                message: "Required",
                                value: 3
                            },
                        })}
                        type="text"
                        placeholder="e.g. Web Design"
                        value={boardName}
                        onChange={(e) => setNewBoard(e.target.value)}
                    />
                    <StyledErrorMessage>{errors.boardName?.message}</StyledErrorMessage>
                    <ColumnWrapper>
                        <label htmlFor="">Columns</label>
                        <ColumnInputWrapper>
                            {columnsValue.map((item, index) => (
                                <div key={index}>
                                    <input
                                        {...register(`columnValues.${index}.name`, {
                                            required: true,
                                            minLength: {
                                                message: "Minimum Length is 3",
                                                value: 3
                                            }
                                        })}
                                        type="text"
                                        value={item?.name}
                                        onChange={(e) => updateColumnName(index, e)}
                                    />
                                    {errors.columnValues?.[index]?.name && (
                                        <StyledErrorMessage>{errors.columnValues[index]?.name?.message}</StyledErrorMessage>
                                    )}
                                    <img src={RemoveIcon} onClick={() => removeBoardInput(index)} />
                                </div>
                            ))}
                        </ColumnInputWrapper>
                        <ButtonContainer>
                            <Button2 passFn={addNewColumnNames}>Add Column</Button2>
                        </ButtonContainer>
                    </ColumnWrapper>
                    <Button submitFn={handleSubmit(updatedBoard)}>Create New Board</Button>
                </form>
            </StyledNewBoard>
        </ModalWindow>
    );
}

const StyledErrorMessage = styled.p`
    margin-top: .3rem;
    color: #EA5555;
    font-weight: 600;
    font-size: 0.9rem;
`;

const StyledBoardNameInput = styled.input<{ $isBoardNameError: boolean }>`
    border: ${({ $isBoardNameError }) => $isBoardNameError && "0.1rem solid #EA5555"} !important;
`;

const ColumnWrapper = styled.div`
    margin: 2rem 0 0 0;
`;

const StyledNewBoard = styled.div<States>`
    & h2 {
        color: ${props => props.$isDarkMode ? "#FFF" : "#000"};
    }
    & form {
        margin-top: 1rem;
    }

    input[type="text"]:focus {
        border-color: #635fc7;
        border-width: .1rem;
    }

    & button {
        width: 100%;
        border-radius: 2rem;
        padding: 1rem 1rem;
        border: initial;
        cursor: pointer;
        font-weight: bold;
    }
`;

const ButtonContainer = styled.div`
    margin: 1rem 0;
`;

const ColumnInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;

    & > div {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        align-items: center;

        & > input {
            width: 90%;
        }

        & > img {
            cursor: pointer;
            width: 2rem;
        }
    }
`;

export default AddNewBoard;

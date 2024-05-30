import { useEffect, useState } from "react";
import ModalWindow from "./ModalWindow";
import { useAppSelector } from "../../app/hook";
import Button2 from "./Button2";
import Button from "./Button";
import {
    editBoardName,
    saveColumnName,
} from "../../features/boardSlice";
import {
    toggleNewColumn,
    toggleOverlay,
} from "../../features/modalSlice"
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import RemoveIcon from "../images/icon-cross.svg";
import { useForm } from "react-hook-form";

interface IFormInput {
    boardName: string;
    boardColumnsName: { name: string }[];
}

function EditBoard() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

    const dispatch = useDispatch();
    const isDarkMode = useAppSelector(
        (state) => state.switchModeReducer.isDarkMode
    );
    const data = useAppSelector((state) => state.boardReducer.data);
    const activeIndex = useAppSelector((state) => state.boardReducer.activeIndex);
    const [boardName, setBoardName] = useState(data.boards[activeIndex].name);
    const [boardColumnsName, setBoardColumnsName] = useState(data.boards[activeIndex].columns)

    useEffect(() => {
        setBoardColumnsName(data.boards[activeIndex].columns);
    }, [data, activeIndex]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newBoardColumnsName = [...boardColumnsName];
        newBoardColumnsName[index] = { ...newBoardColumnsName[index], name: e.target.value };
        setBoardColumnsName(newBoardColumnsName);
    };
    useEffect(() => {
        setBoardName(data.boards[activeIndex].name);
    }, [activeIndex, data.boards]);

    function addNewColumn() {
        return setBoardColumnsName([
            ...boardColumnsName,
            { name: "", tasks: [] }
        ]);

    }

    function saveChanges() {

        dispatch(editBoardName({ boardName })),
            dispatch(saveColumnName({ newColumns: boardColumnsName }));
        dispatch(toggleNewColumn())
        dispatch(toggleOverlay())
    }

    function handleBoardNameInput(e: React.ChangeEvent<HTMLInputElement>) {
        setBoardName(e.target.value)
    }

    function removeColumnName(index: number) {
        const filteredBoardColumnsName = [...boardColumnsName].filter((_, i) => i !== index);
        setBoardColumnsName(filteredBoardColumnsName)
    }

    return (
        <>
            <ModalWindow>
                <NewColumnModal $isDarkMode={isDarkMode} $isBoardError={!!errors.boardName?.message}>
                    <h2>Edit Board</h2>
                    <div>
                        <label htmlFor="boardName">Board Name</label>

                        <input
                            id="boardName"
                            {...register("boardName", {
                                required: "Required",
                                minLength: {
                                    value: 3,
                                    message: "Required"
                                },
                                maxLength: 30,
                            })}
                            type="text"
                            onChange={handleBoardNameInput}
                            value={boardName}
                        />
                        {errors.boardName?.message && <StyledErrorMessage>{errors.boardName?.message}</StyledErrorMessage>}

                        <img src="" alt="" />
                    </div>
                    <StyledEditingColumns $isDarkMode={isDarkMode}>
                        <label htmlFor="">Board Columns</label>
                        <div>
                            {boardColumnsName?.map((column, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        id="ColumnName"

                                        {...register(`boardColumnsName.${index}.name`, {
                                            required: "Required",
                                            minLength: {
                                                value: 2,
                                                message: "Minimum length is 2"
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: "Maximum length is 30"
                                            },
                                        })}

                                        value={column?.name}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                    {errors.boardColumnsName?.[index]?.name && (
                                        <StyledErrorMessage>{errors.boardColumnsName[index]?.name?.message}</StyledErrorMessage>
                                    )}
                                    <img
                                        onClick={() =>
                                            removeColumnName(index)
                                        }
                                        src={RemoveIcon}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>{" "}
                    </StyledEditingColumns>
                    <StyledButtonWrapper>
                        <Button2 passFn={addNewColumn}>+ Add New Column</Button2>
                        <Button submitFn={handleSubmit(saveChanges)}>Save Changes</Button>
                    </StyledButtonWrapper>
                </NewColumnModal>
            </ModalWindow >
        </>
    );
}
const StyledErrorMessage = styled.p`
margin-top: .3rem;
margin-left: .3rem;
color:#EA5555;
    font-weight: 600;
`
const NewColumnModal = styled.div<{ $isDarkMode: boolean, $isBoardError: boolean }>`
  & > div:nth-of-type(1) input {
    display: block;
    cursor: pointer;
    margin-top: 0.5rem;
    border: ${({ $isBoardError }) => $isBoardError && "1px solid #EA5555"};
  }

  & > div:nth-child(2) {
    margin-top: 1.3rem;
  }
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  margin-top: 1.7rem;
`;

const StyledEditingColumns = styled.div<{ $isDarkMode: boolean }>`
  input[type="text"]:focus {
    border-color: #635fc7;
    border-width: 0.1rem;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    & > div {
      display: flex;
      gap: 1rem;
      align-items: center;

      & > img {
        cursor: pointer;
      }
    }
  }
`;

export default EditBoard;

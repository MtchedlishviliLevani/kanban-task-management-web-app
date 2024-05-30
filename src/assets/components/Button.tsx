import { ReactNode } from 'react';
import styled from 'styled-components'

interface ButtonProps {
    children: ReactNode;
    submitFn: () => void;
}
export default function Button({ children, submitFn }: ButtonProps) {
    return (
        <ButtonStyled onClick={submitFn}>{children}</ButtonStyled>
    )
}


const ButtonStyled = styled.button`
     width: 100%;
    border-radius: 2rem;
    padding: 1rem 1rem;
    border: initial;
    cursor: pointer;
    font-weight: bold;
    background-color:#635FC7 ;
    color: #fff;
`
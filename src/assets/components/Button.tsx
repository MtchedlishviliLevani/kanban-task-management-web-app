import styled from 'styled-components'

export default function Button(prop) {
    return (
        <ButtonStyled onClick={prop.submitFn}>{prop.children}</ButtonStyled>
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
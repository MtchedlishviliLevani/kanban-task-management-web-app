import styled from 'styled-components'
import breakPoints from '../utility/BreakPoints'

function Container({ children }: { children: React.ReactNode }) {
    return (
        <COntainer>{children}</COntainer>
    )
}

const COntainer = styled.div`
    /* max-width: calc(768px - 76px); */
    width: 90%;
    margin: 0 auto;
/* 
    ${breakPoints.md}{
        max-width: calc(920px - 92px);

    }
    ${breakPoints.lg}{
        max-width: calc(1100px - 110px);
    }
    ${breakPoints.xl}{
    max-width: calc(1300px - 130px);
    }
    ${breakPoints.xxl}{
        max-width: calc(1500px - 100px);
    } */
`

export default Container

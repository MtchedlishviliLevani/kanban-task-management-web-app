import styled from 'styled-components'
function Container({ children }: { children: React.ReactNode }) {
    return (
        <COntainer>{children}</COntainer>
    )
}

const COntainer = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
`

export default Container

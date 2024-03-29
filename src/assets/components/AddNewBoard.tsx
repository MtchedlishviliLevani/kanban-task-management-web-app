import styled from "styled-components"

function AddNewBoard() {
    return (
        <StyledNewBoard>
            <h2>Add New Board</h2>
            <form action="">
                <label htmlFor="">Board Name</label>
                <input type="text" placeholder="e.g. Web Design" />
            </form>

        </StyledNewBoard>
    )
}

const StyledNewBoard = styled.div`
    width: 34rem;
    height: 20rem;
    border-radius: .6rem;
    padding: 2.4rem;
`

export default AddNewBoard

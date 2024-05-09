import styled from 'styled-components'
import breakPoints from '../utility/BreakPoints'
import { hideAside } from '../../features/asideSlice';
import { toggleOverlay } from '../../features/boardSlice';
import { useAppDispatch } from '../../app/hook';
function Overlayed() {
    // const isOverlayed = useAppSelector(state => state.boardReducer.isOverlayed);
    const dispatch = useAppDispatch()
    function handleAsideShowing() {
        dispatch(hideAside()),
            dispatch(toggleOverlay())
    }
    return (
        <StyledOverlay onClick={handleAsideShowing}>
        </StyledOverlay>
    )
}

const StyledOverlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #000;
  opacity: 50%;
  z-index: 9;
  ${breakPoints.md}{display:none}
`
// const Layout = styled.div`
//   width: 100%;
//   height: 100vh;

// `

export default Overlayed

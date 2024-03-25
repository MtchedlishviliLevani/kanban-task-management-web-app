
import styled from "styled-components";
import MobileLogo from "../images/logo-mobile.svg";
import AddTaskIcon from "../images/icon-add-task-mobile.svg";
import EditIcon from "../images/icon-vertical-ellipsis.svg";
import breakPoints from "../utility/BreakPoints";
import DropDownIcon from "../images/icon-chevron-down.svg";
import DarkLogo from "../images/logo-dark.svg";
import Container from "./Container";
// import useData from "../../store/useBoard";

function Header() {
    // const { isDarkMode, modeSwitcher } = useData();
    return (
        <>
            <Container >
                <div>
                    <HEader>
                        <div>
                            <picture>
                                {/* აქ სტეტით განვსაზღვრავთ, რომელი ლოგოა საჭირო */}
                                {/* <source srcSet={LigthLogo} media="(min-width:768px)" /> */}
                                <source srcSet={DarkLogo} media="(min-width:768px)" />
                                <img src={MobileLogo} alt="" />
                            </picture></div>
                        <MainPartWrapper>
                            <div>
                                <span>Platform Launch</span>
                                <img src={DropDownIcon} alt="" />
                            </div>
                            <div>
                                <AddBtnContainer>
                                    <img src={AddTaskIcon} alt="" /> <span>Add New Task</span>

                                </AddBtnContainer>
                                <img src={EditIcon} alt="" />
                            </div></MainPartWrapper>
                    </HEader>
                </div >
            </Container>
            <BorderLine></BorderLine>
        </>
    );
}
const BorderLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.allColors.themeColor.lightMode.borderColor};
`

const HEader = styled.header`
    display: flex;
    gap: 2rem;
    /* padding: 2rem 0; */
    align-items: center;
    height: 8rem;
    /* width: 100%; */
    ${breakPoints.md}{
        gap: 5rem;
    }

    &>div:nth-child(1){
        ${breakPoints.md}{
            display: flex;
        align-items: center;
        height: 100%;
        padding-right: 6rem;
        border-right: 1px solid ${({ theme }) => theme.allColors.themeColor.lightMode.borderColor}; 
        }
       
    }
`

const AddBtnContainer = styled.button`
all:unset;
display: grid;
place-items: center;
background-color: ${({ theme }) => theme.allColors.general.addButtonBg};
padding: 1rem 1.5rem;
border-radius: 2.4rem;
cursor: pointer;
${breakPoints.md}{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap:1rem;
    
}

&>span{
    display: none;

    ${breakPoints.md}{
        color: ${({ theme }) => theme.allColors.general.addButtonText};
    font-size: 1.5rem;
    display: block;
    }
}

`

const MainPartWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &>div:nth-child(2){
        display: flex;
        gap: 20px;
        align-items: center;
    }

    &>div:nth-child(1){
        position: relative;
    }

&>div:nth-child(1)>img{
    position: absolute;
    transform: translateY(-50%);
    top: 60%;
    margin-left: 1rem;

    ${breakPoints.md}{
        display: none;
    }
}
    & span {
        font-size: ${({ theme }) => theme.size.mobile.boardName};
        font-weight: bold;
    }
`

export default Header;

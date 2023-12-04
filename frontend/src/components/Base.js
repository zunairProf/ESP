import {Navbar5} from "./navbar";
import styled from "styled-components";
import {Footer} from "./Footer";

// const BaseContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   //height: 100vh; /* Adjust the height as needed */
// `;

const Base = ({title = "Welcome to our website", children}) => {
    return (
        <div className="p-0">
            <Navbar5/>

            {/*<BaseContainer>*/}
            {children}
            {/*</BaseContainer>*/}

            {/*<CustomFooter/>*/}
            <Footer/>
        </div>
    );
};

export default Base;

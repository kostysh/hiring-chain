import React from 'react';
import styled from 'styled-components';

export const Page = styled.div`
position: relative;
display: flex;
flex-direction: column;
margin: 0 auto 0 auto;
max-width: 1024px;
height: 100vh;

@media (max-width: 540px) {
    font-size: 18px;
}
`;

export const Section = styled.div`
padding: 20px 9999rem;
margin: 0 -9999rem;
flex-grow: 0;

h1 {
    font-size: 48px;
    color: white;
}

h2 {
    font-size: 24px;
    color: white;
}

h1, h2 {
    max-width: 80%;
}

@media (max-width: 1024px) {
    padding: 20px 10px;
    margin: 0;
}

@media (max-width: 540px) {    
    h1, h2 {
        margin: 0;
        max-width: 100%;
    }

    h1 {
        font-size: 26px;
    }

    h2 {
        font-size: 20px;
    }
}
`;

export const Header = styled(Section)`
display: flex;
flex-direction: row;
flex-grow: 0;
align-items: center;
background-color: #004DBC;
`;

export const Footer = styled(Section)`
display: flex;
flex-direction: row;
flex-grow: 0;
align-items: center;
background-color: #004DBC;
margin-top: 100px;
`;

export const H1Section = styled(Section)`
background-color: #7AADF6;

@media (max-width: 540px) {
h1 {
    margin-bottom: 20px;
}
}
`;

export const H2Section = styled(Section)`
background-color: #DBEAFF;
h2 {
    margin-top: 5px;
    margin-bottom: 0;
    color: #7AADF6;
}
`;

export const H3Section = styled(Section)`
background-color: whitesmoke;
p {
    margin-top: 5px;
    margin-bottom: 0;
    color: #7AADF6;
}
`;

export const H4Section = styled(Section)`
background-color: #fafafa;

`;

const ErrorSectionOuter = styled(H2Section)`
.message {
    background-color: #ff7979;
    color: white;
    border-radius: 5px;
    padding: 16px;
}
`;

export const ErrorSection = ({ children }) => (
    <ErrorSectionOuter>
        <div className="message">
            {children}
        </div>
    </ErrorSectionOuter>
);

export const SpaceSection = styled.div`
flex-grow: 1;
`;
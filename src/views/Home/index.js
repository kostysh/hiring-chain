import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section } from '../../componets/Layout';
import RouteButton from '../../componets/RouteButton';
import Spacer from '../../componets/Spacer';

const Buttons = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding-bottom: 25px;

@media (max-width: 540px) {
    padding-bottom: 10px;
}
`;

export default class Home extends Component {

    render() {

        return (
            <Fragment>
                <H1Section>
                    <h1>
                        Great place to hire or to be get hired in a decentralized way.  
                        Look for a blockchain and cryptocurrency jobs here.
                    </h1>
                    <Buttons>
                        <RouteButton 
                            background="#004DBC"
                            color="white"
                            size="large"
                            to="/job"
                        >Post Job</RouteButton>
                        <Spacer width="20px" />
                        <RouteButton 
                            background="#FBFFE1"
                            color="#3F3F3F"
                            size="large"
                            to="/cv"
                        >Post CV</RouteButton>
                    </Buttons>                        
                </H1Section>
                <H2Section>
                    sss
                </H2Section>
                <H3Section>
                    ccc
                </H3Section>
            </Fragment>
        );
    }
}

export const route = [
    {
        path: '/',
        exact: true,
        label: 'Home',
        component: Home
    }
];
import React, { Component, Fragment } from 'react';
// import styled from 'styled-components';

import { H1Section, H2Section, H3Section } from '../../componets/Layout';

export default class Cv extends Component {

    render() {

        return (
            <Fragment>
                <H1Section>

                </H1Section>
                <H2Section>
                    
                </H2Section>
                <H3Section>
                    
                </H3Section>
            </Fragment>
        );
    }
}

export const route = [
    {
        path: '/cv',
        exact: true,
        label: 'Post a CV',
        component: Cv
    }
];

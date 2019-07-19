import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';

import routes from '../../router';

import { Page, Header, Footer, SpaceSection } from '../../componets/Layout';
import Login from '../../componets/Login';

const Logo = styled(Link)`
font-family: 'Rubik', sans-serif;
font-style: normal;
font-weight: bold;
font-size: 28px;
text-align: left;
text-decoration: none;
color: white;

@media (max-width: 540px) {
    font-size: 20px;
}
`;

const Toolbar = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-end;
flex-grow: 1;
`;

export const MakeRouteWithSubRoutes = route => {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => (
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
};

export default class App extends Component {

    render() {

        return (
            <Page>
                <Header>
                    <Logo to="/">HiringChain</Logo>
                    <Toolbar>
                        <Login />
                    </Toolbar>
                </Header>
                <Switch>
                    {routes.map((route, index) => (
                        <MakeRouteWithSubRoutes key={index} {...route} />                          
                    ))}                        
                </Switch>
                <SpaceSection />
                <Footer></Footer>
            </Page>
        );
    };
}

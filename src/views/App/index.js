import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';

import routes from '../../router';
import packageJson from '../../../package.json';

import { Page, Header, Footer, SpaceSection } from '../../componets/Layout';
import Login from '../../componets/Login';
import Menu from '../../componets/Menu';
import CheckVersion from '../../componets/CheckVersion';

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

const VersionLink = styled.a`
color: white;
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
                        <Menu />
                        <Login />
                    </Toolbar>
                </Header>
                <CheckVersion />
                <Switch>
                    {routes.map((route, index) => (
                        <MakeRouteWithSubRoutes key={index} {...route} />                          
                    ))}                        
                </Switch>
                <SpaceSection />
                <Footer>
                    <VersionLink
                        href="https://github.com/kostysh/hiring-chain"
                    >{`${packageJson.name} version v${packageJson.version}`}</VersionLink>
                </Footer>
            </Page>
        );
    };
}

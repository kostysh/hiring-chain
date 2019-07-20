import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ArLogo from '../../assets/logo-arweave.png';
import ArLogoSm from '../../assets/ar.png';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

import Loader from '../Loader';
import Spacer from '../Spacer';
import AddressLink from '../AddressLink';

const Outer = styled.div`

`;

const LoginTooltip = styled.div`
position: absolute;
display: none;
height: 70px;
left: 0;
right: 0;
bottom: -70px;
padding: 5px;
background-color: #fff7d7;
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
cursor: initial;

p {
    font-size: 16px;
    color: #4f4f4f;
    margin: 0 0 3px 0;

    a {
        color: #7aadf6;
    }

    &:last-child {
        margin-bottom: 0;
    }
}

@media (max-width: 540px) {
    height: 85px;
    bottom: -85px;

    p {
        font-size: 12px;
    }
}
`;

const LoginButton = styled.div`
position: relative;
display: flex;
flex-direction: row;
align-items: center;
cursor: pointer;

&:hover {
    
    .tooltip {
        display: block;
    }
}
`;

const LogoutButton = styled.div`
position: relative;
display: flex;
flex-direction: row;
align-items: center;
cursor: pointer;
`;

const Label = styled.div`
font-family: 'Roboto', sans-serif;
font-style: normal;
font-weight: bold;
font-size: 18px;
margin-right: 5px;
color: white;

@media (max-width: 540px) {
    font-size: 14px;
}
`;

const ArIcon = styled.div`
width: 118px;
height: 32px;
background-image: url(${ArLogo});
background-size: contain;
background-repeat: no-repeat;
background-position: center;

@media (max-width: 540px) {
    width: 25px;
    height: 25px;
    background-image: url(${ArLogoSm});
}
`;

const FileDrop = styled.input`
opacity: 0;
position: absolute;
background: none;
width: 100%;
height: 100%;
`;

class Login extends Component {

    processFile = files => {
        const { arLogin } = this.props;

        if (files.length > 0) {

            const fr = new FileReader();
    
            fr.onload = async (ev) => {
                try {
                    const wallet = JSON.parse(ev.target.result);
                    sessionStorage.setItem('wallet', JSON.stringify(wallet));           
                    arLogin(wallet);
                } catch (err) {
                    console.log('Error logging in: ', err);
                }
            };
        
            fr.readAsText(files[0]);
        }        
    };

    logOut = () => {
        const { arLogOut, goHome } = this.props;
        sessionStorage.removeItem('wallet');
        arLogOut();
        goHome();
    };

    componentDidMount = () => {
        const { arLogin, arError } = this.props;

        try {
            const wallet = sessionStorage.getItem('wallet');

            if (wallet) {
                arLogin(JSON.parse(wallet));
            }
            
        } catch(error) {
            arError(error);
        }
    };

    render() {
        const { arweaveLoading, address } = this.props;

        return (
            <Outer>
                {arweaveLoading &&
                    <Loader width="32px" height="32px" />
                }
                {(!address && !arweaveLoading) &&
                    <LoginButton>
                        <FileDrop
                            type="file" 
                            onChange={({target: { files }}) => this.processFile(files)}
                        />
                        <Label>Login with</Label>
                        <ArIcon />
                        <LoginTooltip className="tooltip">
                            <p>Load a wallet keyfile here</p>
                            <p>Don't have a wallet? Get one <a href="https://tokens.arweave.org/" rel="noopener noreferrer" target="_blank">here</a>!</p>
                        </LoginTooltip>
                    </LoginButton>
                }
                {(address && !arweaveLoading) &&
                    <LogoutButton>
                        <AddressLink />
                        <Spacer width="10px" />
                        <Label onClick={() => this.logOut()}>Logout</Label>
                    </LogoutButton>
                }                
                
            </Outer>
        );
    }
}

function mapStateToProps(state) {

    return {
        arweaveLoading: selectors.arweaveLoading(state),
        address: selectors.address(state)
    };
}

const mapDispatchToProps = dispatch => {

    return {
        arLogin: wallet => dispatch(actions.arLogin(wallet)),
        arLogOut: () => dispatch(actions.arLogOut()),
        arError: error => dispatch(actions.arError(error)),
        goHome: () => dispatch(push('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

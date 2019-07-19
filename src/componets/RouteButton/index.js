import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as selectors from '../../store/selectors';

const Button = styled(Link)`
position: relative;
cursor: pointer;
background-color: ${({ background = '#FBFFE1' }) => background};
color: ${({ color = '#3F3F3F' }) => color};
border: none;
outline: 0;
border-radius: 5px;
font-size: ${({ size }) => {
    switch (size) {
        case 'mid': return '16px';
        case 'large': return '21px';
        default: return '12px';
    }
}};
padding: ${({ size }) => {
    switch (size) {
        case 'mid': return '8px 10px';
        case 'large': return '10px 12px';
        default: return '4px 6px';
    }
}};
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
text-decoration: none;

&:hover {
    .tooltip {
        display: block;
    }
}

@media (max-width: 540px) {
    font-size: ${({ size }) => {
        switch (size) {
            case 'mid': return '14px';
            case 'large': return '18px';
            default: return '12px';
        }
    }};
    padding: ${({ size }) => {
        switch (size) {
            case 'mid': return '6px 8px';
            case 'large': return '8px 10px';
            default: return '3px 5px';
        }
    }};
}
`;

const ButtonTooltip = styled.div`
position: absolute;
display: none;
height: 45px;
left: 0;
right: 0;
bottom: -56px;
padding: 5px 10px;
background-color: whitesmoke;
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
text-align: left;
font-size: 12px;
color: #4f4f4f;
cursor: initial;

@media (max-width: 540px) {
    height: 65px;
    bottom: -66px;
}
`;

class RouteButton extends Component {

    handleClick = e => {
        const { address } = this.props;

        if (!address) {
            e.preventDefault();
            return false;
        }
    };

    render() {
        const { address, children, background, size, color, to } = this.props;

        return (
            <Fragment>
                <Button 
                    disabled={!address} 
                    background={background}
                    color={color}
                    size={size}
                    to={to}
                    onClick={e => this.handleClick(e)}
                >
                    {children}
                    {!address &&
                        <ButtonTooltip className="tooltip">
                            You should be logged in to do an action
                        </ButtonTooltip>
                    }                    
                </Button>                
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    return {
        address: selectors.address(state)
    };
}

export default connect(mapStateToProps)(RouteButton);
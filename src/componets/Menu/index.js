import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as selectors from '../../store/selectors';
// import * as actions from '../../store/actions';

const MenuOuter = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;

li {
    display: inline-block;
    margin-right: 20px;

    &:last-child {
        margin-right: 40px;
    }
}

@media (max-width: 540px) {
    margin-right: 20px;
    
    li {
        display: block;
        margin: 0;

        &:last-child {
        margin-right: 0;
    }
    }
}
`;

const MenuLink = styled(Link)`
color: white;
text-decoration: none;

&:hover {
    text-decoration: underline;
}

@media (max-width: 540px) {
    font-size: 14px;
}
`;

class Menu extends Component {

    render() {
        const { address } = this.props;

        if (!address) {
            return null;
        }

        return (
            <MenuOuter>
                <li>
                    <MenuLink 
                        to="/jobs"
                    >
                        My Jobs
                    </MenuLink>
                </li>
                <li>
                    <MenuLink 
                        to="/cvs"
                    >
                        My CVs
                    </MenuLink>
                </li>
            </MenuOuter>
        );
    }
}

function mapStateToProps(state) {

    return {
        address: selectors.address(state)
    };
}

export default connect(mapStateToProps)(Menu);

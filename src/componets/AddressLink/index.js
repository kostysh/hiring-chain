import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '../../config.json';
import * as selectors from '../../store/selectors';

import ArLogo from '../../assets/ar.png';

const Outer = styled.span`
display: flex;
flex-direction: row;
align-items: center;

a {
    color: #7AADF6;
}

.ar {
    color: whitesmoke;    
}

@media (max-width: 540px) {
    flex-direction: column;

    a, .ar {
        font-size: 12px;
    }
}
`;

const ArIcon = styled.div`
width: 24px;
height: 24px;
background-image: url(${ArLogo});
background-size: contain;
background-repeat: no-repeat;
background-position: center;
margin-right: 5px;

@media (max-width: 540px) {
    display: none;
}
`;

class AddressLink extends Component {
    render() {
        const { address, ballance } = this.props;

        if (!address || !ballance) {
            return null;
        }

        const url = `https://${config.arscan}/address/${address}`;

        return (
            <Outer>
                <ArIcon />
                <a 
                    href={url} 
                    rel="noopener noreferrer" 
                    target="_blank" 
                    title="Arweave Block Explorer"
                >{address.slice(0, 6)}...${address.slice(-4)}</a>
                {ballance !== undefined &&
                    <span className="ar">
                        &nbsp;({Number(ballance).toFixed(2)} AR)
                    </span>
                }
            </Outer> 
        );
    }
}

function mapStateToProps(state) {

    return {
        address: selectors.address(state),
        ballance: selectors.ballance(state)
    };
}

export default connect(mapStateToProps)(AddressLink);

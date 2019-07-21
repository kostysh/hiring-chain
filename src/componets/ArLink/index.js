import React from 'react';
import styled from 'styled-components';

import config from '../../config.json';

const ArLink = styled.a`
font-size: inherit;
font-weight: inherit;
color: #004DBC;
${({ nowrap }) => (nowrap ? 'white-space: nowrap;': '')}
`;

export default ({ tx, type = 'address', nowrap = false }) => {
    const url = `https://${config.arscan}/${type}/${tx}`;

    return (
        <ArLink            
            href={url} 
            rel="noopener noreferrer" 
            target="_blank" 
            title="Arweave Block Explorer"   
            nowrap={nowrap} 
        >{tx}</ArLink>
    );
};

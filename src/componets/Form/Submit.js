import React from 'react';
import styled from 'styled-components';

export default styled.button`
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
`;
import React, { Fragment } from 'react';
import styled from 'styled-components';

const InputOuter = styled.div`
width: 100%;

@media (max-width: 540px) {
    /* max-width: 80%; */
}
`;

const Input = styled.input`
font-size: 18px;
font-weight: normal;
color: #2a2a2a;
width: 100%;
padding: 14px 1.5em;
border: 1px solid rgba(0,0,0,0.2);
border-radius: 5px;
outline: none;

&:focus {
    border: 1px solid rgba(0,77,188,1);
}

&::placeholder {
    color: rgba(0,0,0,0.3);
}

&[type='checkbox'] {
    transform: scale(2);
    width: 24px;
}

@media (max-width: 540px) {
    padding: 10px 1em;
}
`;

const TextBox = styled.textarea`
font-size: 18px;
font-weight: normal;
color: #2a2a2a;
width: 100%;
padding: 14px 1.5em;
border: 1px solid rgba(0,0,0,0.2);
border-radius: 5px;
outline: none;

&:focus {
    border: 1px solid rgba(0,77,188,1);
}

&::placeholder {
    color: rgba(0,0,0,0.3);
}

@media (max-width: 540px) {
    padding: 10px 1em;
}
`;

const Label = styled.div`
color: #5c5c5c;
font-weight: bold;
margin: 0 0 5px 3px;

.required {
    color: darkred;
    margin-left: 3px;
}
`;

const Info = styled.div`
font-size: 11px;
font-weight: normal;
color: rgba(0,0,0,0.3);
margin: 2px 0 0 2px;
`;

export default ({ type, label, required, info, ...props }) => {
    return (
        <Fragment>
            {label &&
                <Label>{label}{required ? (<span className="required">*</span>):''}</Label>
            }
            <InputOuter>
                {type !== 'textarea' &&
                    <Input type={type} {...props} />
                }
                {type === 'textarea' &&
                    <TextBox type={type} {...props} />
                }                
            </InputOuter>
            {info &&
                <Info>{info}</Info>
            }
        </Fragment>
    );
};

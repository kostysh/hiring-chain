import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import ipfsClient from 'ipfs-http-client';

import config from '../../config.json';
import Loader from '../Loader';

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

const FakeInput = styled.div`
position: relative;
display: flex;
align-items: center;
justify-content: flex-start;
font-size: 18px;
font-weight: normal;
color: #2a2a2a;
width: 100%;
height: 51px;
padding: 14px 1.5em;
border: 1px solid rgba(0,0,0,0.2);
border-radius: 5px;
outline: none;
background-color: white;
overflow: hidden;
text-overflow: ellipsis;

&:focus {
    border: 1px solid rgba(0,77,188,1);
}

span {
    color: rgba(0,0,0,0.3);

    &.hash {
        color: #2a2a2a;
        overflow: hidden;
        text-overflow: ellipsis;
    }
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

const FileDrop = styled.input`
opacity: 0;
position: absolute;
background: none;
width: 100%;
height: 100%;
top: 0;
left: 0;
right: 0;
bottom: 0;
`;

const processFile = (files, toggleLoading = () => {}, onLoaded = () => {}, onError = () => {}) => {
    
    toggleLoading();
    const file = [...files][0];
    const fileDetails = {
        path: file.name,
        content: file
    };
    
    const options = {
        progress: prog => console.log(`ipfs received: ${prog}`)
    };
    
    const ipfs = ipfsClient(config.ipfs.config);
    
    ipfs.add(fileDetails, options)
        .then((response) => {
            console.log(response);
            onLoaded(response[0].hash);
        }).catch((err) => {
            onError(err)
        });
};

export default ({ type, label, required, info, ...props }) => {
    const [ipfsHash, setIpfsHash] = useState(null);
    const [ipfsLoading, setIpfsLoading] = useState(false);

    return (
        <Fragment>
            {label &&
                <Label>{label}{required ? (<span className="required">*</span>):''}</Label>
            }
            <InputOuter>
                {(type !== 'textarea' && type !== 'ipfs') &&
                    <Input type={type} {...props} />
                }
                {(type === 'textarea' && type !== 'ipfs') &&
                    <TextBox type={type} {...props} />
                }
                {type === 'ipfs' &&
                    <FakeInput>
                        {(!ipfsHash && !ipfsLoading) &&
                            <span>{props.placeholder}</span>
                        }
                        {(!ipfsHash && ipfsLoading) &&
                            <Loader width="32px" height="32px" />
                        }
                        {ipfsHash &&
                            <span className="hash">{ipfsHash}</span>
                        }                        
                        <FileDrop 
                            type="file" 
                            onChange={({target: { files }}) => processFile(
                                files,
                                () => setIpfsLoading(true),
                                hash => {
                                    setIpfsHash(hash);
                                    props.onChange(hash);
                                    setIpfsLoading(false);
                                }, 
                                error => { console.log('IPFS ERROR:', error) }
                            )}
                        />
                    </FakeInput>                    
                }
            </InputOuter>
            {info &&
                <Info>{info}</Info>
            }
        </Fragment>
    );
};

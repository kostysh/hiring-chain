import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Field from './Field';

const Tag = styled.div`
display: inline-block;
padding: 8px;
margin: 5px 5px 0 0;
background-color: #DBEAFF;
border-radius: 5px;
font-family: "Roboto", sans-serif;
`;

const TagInner = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const Label = styled.span`
font-size: 14px;
color: #004DBC;
`;

const Remove = styled.span`
display: block;
padding: 2px;
width: 16px;
height: 16px;
background-color: white;
border-radius: 50%;
font-size: 14px;
color: #004DBC;
text-align: center;
line-height: 12px;
margin-left: 5px;
cursor: pointer;
`;

const Pills = ({ type, tags, removeTag = () => {} }) => {

    return (
        <Fragment>
            {tags &&
                tags.map((tag, i) => (
                    <Tag key={i}>
                        <TagInner>
                            {type === 'links' &&
                                <a
                                    href={tag}
                                    rel="noopener noreferrer" 
                                    target="_blank"
                                >
                                    <Label>{tag}</Label>
                                </a>
                            }
                            {type !== 'links' &&
                                <Label>{tag}</Label>   
                            }                            
                            <Remove onClick={() => removeTag(i)}>x</Remove>
                        </TagInner>
                    </Tag>
                ))
            }
        </Fragment>
    );
};

export default class Tags extends Component {

    state = {
        inputValue: '',
        tags: []
    };

    addTag = tag => {
        const { tagsChange = () => {} } = this.props;
        tag = String(tag).replace(/(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/gim, '').trim();

        if (tag === '') {
            return;
        }

        this.setState({
            tags: [...this.state.tags, tag],
            inputValue: ''
        }, () => tagsChange(this.state.tags));
    };

    removeTag = tagId => {
        const { tagsChange = () => {} } = this.props;

        this.setState({
            tags: this.state.tags.filter((_, i) => i !== tagId)
        }, () => tagsChange(this.state.tags))
    };

    updateInputValue = inputValue => {

        if (inputValue.endsWith(',')) {
            return this.addTag(inputValue.substr(0, inputValue.length-1));
        }

        this.setState({
            inputValue
        });
    };

    handleKeyDown = e => {

        if (e.key === 'Enter') {
            return this.addTag(e.target.value);
        }
    };

    handleOnBlur = e => {
        const { inputValue } = this.state;

        if (inputValue !== '') {
            this.addTag(inputValue);
        }
    };

    render() {
        const { inputValue, tags } = this.state;
        const { type } = this.props;

        return (
            <Fragment>
                <Field 
                    value={inputValue}
                    onChange={({ target: { value }}) => this.updateInputValue(value)}
                    onKeyDown={e => this.handleKeyDown(e)}
                    onBlur={e => this.handleOnBlur(e)}
                    {...this.props}
                />
                <Pills 
                    type={type}
                    tags={tags} 
                    removeTag={tagId => this.removeTag(tagId)}
                />
            </Fragment>
        );
    }
}

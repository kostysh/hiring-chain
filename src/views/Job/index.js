import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section, H4Section } from '../../componets/Layout';
import Field from '../../componets/Form/Field';
import Tags from '../../componets/Form/Tags';
import Submit from '../../componets/Form/Submit';

const FormOuter = styled.div`
max-width: 400px;

@media (max-width: 540px) {
    max-width: 100%;
}
`;

const Separator = styled.div`
width: 100%;
height: 16px;
`;

export default class Job extends Component {

    state = {
        values: {
            title: '',
            categories: [],
            location: '',
            remote: false,
            description: '',
            salary: '',
            skills: []
        }
    };

    updateValue = (name, value) => this.setState({
        values: {
            ...this.state.values,
            [name]: value
        }
    });

    render() {
        const { title, location, remote, description, salary } = this.state.values;

        return (
            <Fragment>
                <H1Section>
                    <h2>
                        Job data saved on the Arweave blockchain is guaranteed immutability of information and high level of trust from the side of applicants
                    </h2>
                </H1Section>
                <H2Section>
                    <FormOuter>
                        <Field
                            value={title} 
                            onChange={({ target: { value } }) => this.updateValue('title', value)}
                            label="Job title"
                            placeholder="e.g. Solidity developer, Blockchain engineer"
                            required                            
                        />
                    </FormOuter>
                </H2Section>
                <H3Section>
                    <FormOuter>
                        <Tags 
                            tagsChange={value => this.updateValue('categories', value)}
                            label="Job categories"
                            placeholder="e.g. Design, Sales, Engineering"
                            info="add tags by pressing coma or Enter button"
                            required                            
                        />
                        <Separator />
                        <Field
                            value={location} 
                            onChange={({ target: { value } }) => this.updateValue('location', value)}
                            label="Location"
                            placeholder="e.g. San Francisco, London"
                            required                            
                        />
                        <Separator />
                        <Field
                            type="checkbox"
                            value={remote} 
                            onChange={({ target: { value } }) => this.updateValue('remote', value)}
                            label="Remote possible"             
                        />
                        <Separator />
                        <Field
                            type="textarea"
                            value={description} 
                            rows="5"
                            onChange={({ target: { value } }) => this.updateValue('description', value)}
                            label="Job description" 
                            required
                        />
                        <Separator />
                        <Field
                            value={salary} 
                            onChange={({ target: { value } }) => this.updateValue('salary', value)}
                            label="Salary range"
                            placeholder="e.g. $80K – $120K"     
                        />
                        <Separator />
                        <Tags 
                            tagsChange={value => this.updateValue('skills', value)}
                            label="Skills"
                            placeholder="e.g. web3, truffle, solidity"
                            info="add tags by pressing coma or Enter button"
                        />
                    </FormOuter>
                </H3Section>
                <H4Section>
                    <Submit
                        background="#004DBC"
                        color="white"
                        size="large"
                    >
                        Submit
                    </Submit>
                </H4Section>
            </Fragment>
        );
    }
}

export const route = [
    {
        path: '/job',
        exact: true,
        label: 'Post a Job',
        component: Job
    }
];

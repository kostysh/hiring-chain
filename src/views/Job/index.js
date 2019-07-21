import React, { Component, Fragment } from 'react';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section, H4Section } from '../../componets/Layout';
import Field from '../../componets/Form/Field';
import Tags from '../../componets/Form/Tags';
import Submit from '../../componets/Form/Submit';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

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

const Outer = styled.div`
display: flex;
flex-direction: column;
align-items: stretch;
justify-content: flex-start;
`;

const Message = styled.div`
padding: 10px 15px;
margin: 0 0 15px 0;
border-radius: 5px;
background-color: rgba(255,0,0,0.3);
font-size: 16px;
font-weight: normal;
color: #004DBC;
`;

const ErrorsBlock = ({ errors }) => {

    if (!errors) {
        return null;
    } else if (!Array.isArray(errors)) {
        errors = [errors];
    }

    return (
        <Outer>
            {errors && errors.map((msg, i) => (
                <Message key={i}>{msg}</Message>
            ))}
        </Outer>
    );
};

class Job extends Component {

    static model = {
        title: {
            type: 'string',
            required: true,
            message: 'Job title is required and should not be empty'
        },
        categories: {
            type: 'array',
            required: true,
            message: 'Job category is required, please add some tags'
        },
        location: {
            type: 'string',
            required: true,
            message: 'Job company location is required and should not be empty'
        },
        remote: {
            type: 'boolean',
            required: false,
            message: 'Remote value shoild be boolean'
        },
        description: {
            type: 'string',
            required: true,
            message: 'Job description is required and should be empty'
        },
        salary: {
            type: 'string',
            required: false,
            message: 'Salary field should contain string value'
        },
        skills: {
            type: 'array',
            required: false,
            message: 'Skills field have to be a list of tags'
        }
    };

    state = {
        values: {
            title: '',
            categories: [],
            location: '',
            remote: false,
            description: '',
            salary: '',
            skills: []
        },
        error: null
    };

    updateValue = (name, value, cleanup = false) => this.setState({
        values: {
            ...this.state.values,
            [name]: cleanup ? String(value).replace(/(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/gim, '') : value
        }
    });

    resetError = callback => this.setState({
        error: null
    }, callback);

    validateField = async (name) => {
        const model = Job.model[name];
        const value = this.state.values[name];

        if (!model) {
            throw new Error(`Unknown field: "${name}"`);
        }

        let validated = false;

        switch (model.type) {
            case 'string':
                validated = typeof value === 'string' && (!model.required || (model.required && value !== ''));
                break;
            case 'array':
                validated = Array.isArray(value) && (!model.required || (model.required && value.length > 0));
                break;
            case 'boolean':
                validated = typeof value === 'boolean';
                break;
            default:                 
        }

        if (!validated) {
            throw new Error(model.message);
        }

        return validated;
    };

    vaidateForm = () => Promise.all(Object.keys(Job.model).map(field => this.validateField(field)));

    submitForm = () => this.resetError(() => {
        const { address, jobsPost, goJobsPage } = this.props;

        if (!address) {
            return this.setState({ error: `You should be logged in to do an action!` });
        }

        this.vaidateForm()
            .then(() => jobsPost(this.state.values))
            .then(() => goJobsPage())
            .catch(error => this.setState({ error: error.message }));
    });

    render() {
        const { title, location, remote, description, salary } = this.state.values;
        const { error } = this.state;

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
                            onChange={({ target: { value } }) => this.updateValue('title', value, true)}
                            label="Job title"
                            placeholder="e.g. Solidity developer, Blockchain engineer"
                            required={Job.model.title.required}                            
                        />
                    </FormOuter>
                </H2Section>
                <H3Section>
                    <FormOuter>
                        <Tags 
                            tagsChange={value => this.updateValue('categories', value)}
                            label="Job categories"
                            placeholder="e.g. Design, Sales, Engineering"
                            info="add tags by pressing comma or Enter button"
                            required={Job.model.categories.required}                            
                        />
                        <Separator />
                        <Field
                            value={location} 
                            onChange={({ target: { value } }) => this.updateValue('location', value, true)}
                            label="Location"
                            placeholder="e.g. San Francisco, London"
                            required={Job.model.location.required}                             
                        />
                        <Separator />
                        <Field
                            type="checkbox"
                            value={remote} 
                            onChange={({ target: { value } }) => this.updateValue('remote', Boolean(value))}
                            label="Remote possible"
                            required={Job.model.remote.required}
                        />
                        <Separator />
                        <Field
                            type="textarea"
                            value={description} 
                            rows="5"
                            onChange={({ target: { value } }) => this.updateValue('description', value, true)}
                            label="Job description" 
                            required={Job.model.description.required}
                        />
                        <Separator />
                        <Field
                            value={salary} 
                            onChange={({ target: { value } }) => this.updateValue('salary', value, true)}
                            label="Salary range"
                            placeholder="e.g. $80K – $120K"     
                            required={Job.model.salary.required}
                        />
                        <Separator />
                        <Tags 
                            tagsChange={value => this.updateValue('skills', value)}
                            label="Skills"
                            placeholder="e.g. web3, truffle, solidity"
                            info="add tags by pressing comma or Enter button"
                            required={Job.model.skills.required}
                        />
                    </FormOuter>
                </H3Section>
                <H4Section>
                    <Submit
                        background="#004DBC"
                        color="white"
                        size="large"
                        onClick={() => this.submitForm()}
                    >
                        Submit
                    </Submit>
                </H4Section>
                <H4Section>
                    <ErrorsBlock errors={error} />
                </H4Section>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    return {
        address: selectors.address(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        jobsPost: job => dispatch(actions.jobsPost(job)),
        goJobsPage: () => dispatch(push('/jobs'))
    };
};

const connectedJob = connect(mapStateToProps, mapDispatchToProps)(Job);

export default connectedJob;

export const route = [
    {
        path: '/job',
        exact: true,
        label: 'Post a Job',
        component: connectedJob
    }
];

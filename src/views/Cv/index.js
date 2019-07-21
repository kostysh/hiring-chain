import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section, H4Section } from '../../componets/Layout';
import Field from '../../componets/Form/Field';
import Tags from '../../componets/Form/Tags';
import Submit from '../../componets/Form/Submit';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

const Separator = styled.div`
width: 100%;
height: 16px;
`;

const FormOuter = styled.div`
max-width: 400px;

@media (max-width: 540px) {
    max-width: 100%;
}
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

class Cv extends Component {

    static model = {
        title: {
            type: 'string',
            required: true,
            message: 'CV title is required and should not be empty'
        },
        description: {
            type: 'string',
            required: true,
            message: 'Your wanted position description is required and should be empty'
        },
        profiles: {
            type: 'array',
            required: true,
            message: 'Profiles field have to be a list of your online professional accounts. Please add at least one'
        },
        skills: {
            type: 'array',
            required: false,
            message: 'Skills field have to be a list of tags'
        },
        ipfs: {
            type: 'ipfs',
            required: true,
            message: 'Detailed CV field have to contain a valid IPFS address of your deployed pdf file and should be empty'
        }
    };

    state = {
        values: {
            title: '',
            description: '',
            profiles: [],
            skills: [],
            ipfs: ''
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
        const model = Cv.model[name];
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
            case 'ipfs':
                validated = !!value.match(/^Qm[1-9A-HJ-NP-Za-km-z]{44}(\/.*)?/);
                break;
            default:                 
        }

        if (!validated) {
            throw new Error(model.message);
        }

        return validated;
    };

    vaidateForm = () => Promise.all(Object.keys(Cv.model).map(field => this.validateField(field)));

    submitForm = () => this.resetError(() => {
        const { address, cvsPost, goCvsPage } = this.props;

        if (!address) {
            return this.setState({ error: `You should be logged in to do an action!` });
        }

        this.vaidateForm()
            .then(() => cvsPost(this.state.values))
            .then(() => goCvsPage())
            .catch(error => this.setState({ error: error.message }));
    });

    render() {
        const { error } = this.state;
        const { title, description } = this.state.values;

        return (
            <Fragment>
                <H1Section>
                    <h2>
                        Your CV saved on the Arweave blockchain will be permanently available online and guaranteed from changes.&nbsp; 
                        Base metadata will be part of the transaction and pdf file with detailed information will be saved using IPFS
                    </h2>
                </H1Section>
                <H2Section>
                    <FormOuter>
                        <Field
                            value={title} 
                            onChange={({ target: { value } }) => this.updateValue('title', value, true)}
                            label="CV title"
                            placeholder="e.g. Solidity developer, Blockchain engineer"
                            required={Cv.model.title.required}                            
                        />
                    </FormOuter>
                </H2Section>
                <H3Section>
                    <FormOuter>
                        <Field
                            type="textarea"
                            value={description} 
                            rows="5"
                            onChange={({ target: { value } }) => this.updateValue('description', value, true)}
                            label="Description" 
                            placeholder="e.g. What are you looking for"
                            required={Cv.model.description.required}
                        />
                        <Separator />
                        <Tags 
                            tagsChange={value => this.updateValue('profiles', value)}
                            label="Professional profiles"
                            placeholder="e.g. LinkedIn, GitHub, Bitbuket"
                            info="add links by pressing comma or Enter button"
                            type="links"
                            required={Cv.model.profiles.required}                            
                        />
                        <Separator />
                        <Tags 
                            tagsChange={value => this.updateValue('skills', value)}
                            label="Skills"
                            placeholder="e.g. web3, truffle, solidity"
                            info="add tags by pressing comma or Enter button"
                            required={Cv.model.skills.required}
                        />
                        <Separator />
                        <Field
                            type="ipfs"
                            onChange={(value) => this.updateValue('ipfs', value, true)}
                            label="Detailed CV (PDF file)"
                            placeholder="click here to load file"
                            info="choose a file from the local disk and wait until upload finished"
                            required={Cv.model.ipfs.required}                            
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
        cvsPost: cv => dispatch(actions.cvsPost(cv)),
        goCvsPage: () => dispatch(push('/cvs'))
    };
};

const connectedCv = connect(mapStateToProps, mapDispatchToProps)(Cv);

export default connectedCv;

export const route = [
    {
        path: '/cv',
        exact: true,
        label: 'Post a CV',
        component: connectedCv
    }
];

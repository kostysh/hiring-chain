import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section } from '../../componets/Layout';
import ArLink from '../../componets/ArLink';
import Loader from '../../componets/Loader';
import Spacer from '../../componets/Spacer';
import { getJobById } from '../../services/jobs';
import * as selectors from '../../store/selectors';

const Loading = styled(Loader)`
margin: 40px auto;
`;

const Label = styled.div`
font-size: 13px;
color: #5c5c5c;
font-weight: bold;
margin: 0 0 5px 3px;
`;

const Tag = styled.div`
display: inline-block;
padding: 6px;
margin: 4px 4px 0 0;
background-color: #DBEAFF;
border-radius: 5px;
font-family: "Roboto", sans-serif;
`;

const TagInner = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

const TagLabel = styled.span`
font-size: 14px;
color: #004DBC;
`;

const Pills = ({ tags }) => {

    return (
        <Fragment>
            {tags &&
                tags.map((tag, i) => (
                    <Tag key={i}>
                        <TagInner>
                            <TagLabel>{tag}</TagLabel>
                        </TagInner>
                    </Tag>
                ))
            }
        </Fragment>
    );
};

const Space = styled(Spacer)`
width: 100%;
height: 20px;
`;

const Button = styled.button`
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

@media (max-width: 540px) {
    font-size: ${({ size }) => {
        switch (size) {
            case 'mid': return '14px';
            case 'large': return '18px';
            default: return '12px';
        }
    }};
    padding: ${({ size }) => {
        switch (size) {
            case 'mid': return '6px 8px';
            case 'large': return '8px 10px';
            default: return '3px 5px';
        }
    }};
}
`;

const ButtonTooltip = styled.div`
position: absolute;
display: none;
height: 80px;
left: 0;
right: 0;
bottom: -81px;
padding: 5px 10px;
background-color: whitesmoke;
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
text-align: left;
font-size: 12px;
color: #4f4f4f;
cursor: initial;

@media (max-width: 540px) {
    height: 65px;
    bottom: -66px;
}
`;

const TitleContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
align-content: stretch;

div {
    flex-grow: 1;

    &:last-child {
        flex-grow: 0;
    }
}
`;

class Apply extends Component {
    render() {
        const { address, job } = this.props;

        return (
            <Fragment>
                <Button
                    disabled={!!address}
                    background="#004DBC"
                    color="white"
                    size="large"
                >
                    Apply
                    {!address &&
                        <ButtonTooltip className="tooltip">
                            You should be logged in to do an action
                        </ButtonTooltip>
                    }
                </Button>
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
        
    };
};

const ApplyButton = connect(mapStateToProps, mapDispatchToProps)(Apply);

export default class JobDetails extends Component {

    state = {
        loading: false,
        record: null,
        error: null
    };

    componentDidMount = async () => {
        const { match: { params: { jobId }} } = this.props;
        
        try {
            const record = await getJobById(jobId);
            // console.log('Record:', record)
            this.setState({
                loading: false,
                record
            });
        } catch(error) {
            this.setState({
                loading: false,
                error
            });
        }
    }

    render() {
        const { loading, record } = this.state;
        const { match: { params: { jobId }} } = this.props;

        return (
            <Fragment>
                <H1Section>
                    <h2>
                        This Job is saved on the Arweave blockchain with transaction <ArLink tx={jobId} type="transaction" nowrap />
                    </h2>
                </H1Section>
                <H2Section>
                    {loading &&
                        <Loading width="64px" height="64px" />
                    }
                    {(!loading && record) &&
                        <Fragment>
                            <TitleContainer>
                                <div>
                                    <Label>Title</Label>
                                    <h2>{record.title}</h2>
                                </div>
                                <div>
                                    <ApplyButton job={record} />
                                </div>
                            </TitleContainer>                                      
                        </Fragment>
                    }
                </H2Section>
                <H3Section>
                    {(!loading && record) &&
                        <Fragment>
                            <Label>Categories</Label>
                            <Pills tags={record.categories} />
                            <Space />

                            <Label>Location</Label>
                            <p>{record.location}{record.remote ? (<span>, remote possible</span>) : ''}</p>
                            <Space />

                            <Label>Description</Label>
                            <p>{record.description}</p>
                            <Space />

                            {record.salary !== '' &&
                                <Fragment>
                                    <Label>Salary range</Label>
                                    <p>{record.salary}</p>
                                    <Space />
                                </Fragment>
                            }                            

                            {(record.skills && record.skills.length > 0) &&
                                <Fragment>
                                    <Label>Skills</Label>
                                    <Pills tags={record.skills} />
                                    <Space />
                                </Fragment>
                            }                            
                        </Fragment>
                    }
                </H3Section>
            </Fragment>
        );
    }
}

export const route = [
    {
        path: '/job/:jobId',
        component: JobDetails,
        noMenu: true
    }
];

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { H1Section, H2Section, H3Section } from '../../componets/Layout';
import ArLink from '../../componets/ArLink';
import Loader from '../../componets/Loader';
import Spacer from '../../componets/Spacer';
import { getJobById } from '../../services/jobs';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

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

const ApplyInner = styled.div`
background-color: whitesmoke;
box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
width: 300px;
float: right;
padding: 10px;
text-align: left;
font-size: 12px;
color: #4f4f4f;

h3 {
    margin-top: 0;
}
`;

const ApplyTooltip = styled.div`
position: absolute;
height: auto;
left: 0;
right: 0;

@media (max-width: 540px) {
    
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

const CvList = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

const CvLabel = styled.span`
display: flex;
flex-direction: row;
align-items: center;
font-size: 14px;
color: #004DBC;
text-decoration: underline;
cursor: pointer;

&:hover {
    color: #7AADF6;
}
`;

const CvLoading = styled(Loader)`
width: 14px;
height: 14px;
`;

class Apply extends Component {
    state = {
        opened: false
    };

    render() {
        const { address, cvs, cvsApplyProcess, applied, cvsApplyAction, job } = this.props;
        const { opened } = this.state;

        return (
            <Fragment>
                <Button
                    disabled={!!!address || !cvs || cvs.length === 0}
                    background="#004DBC"
                    color="white"
                    size="large"
                    onClick={() => this.setState({ opened: !opened })}
                >
                    Apply
                    {!address &&
                        <ButtonTooltip className="tooltip">
                            You should be logged in to do an action
                        </ButtonTooltip>
                    }
                    {(address && (!cvs || cvs.length === 0)) &&
                        <ButtonTooltip className="tooltip">
                            You should post your CV first <Link to="/cv">here</Link>
                        </ButtonTooltip>
                    }                    
                </Button>
                {opened &&
                    <ApplyTooltip>
                        <ApplyInner>
                            <h3>Choose you CV to apply</h3>
                            <CvList>
                                {cvs.map((cv, i) => (
                                    <li key={i}>
                                        <CvLabel
                                            onClick={() => cvsApplyAction(cv.id, job.id)}
                                        >
                                            {cv.cv.title}
                                            {cvsApplyProcess.includes(cv.id) &&
                                                <CvLoading />
                                            }
                                            {(applied && applied[cv.id]) &&
                                                <span> - done</span>
                                            }
                                        </CvLabel>
                                    </li>
                                ))}
                            </CvList>
                        </ApplyInner>                        
                    </ApplyTooltip>
                }
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    return {
        address: selectors.address(state),
        cvs: selectors.cvs(state),
        cvsApplyProcess: selectors.cvsApply(state),
        applied: selectors.applied(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        cvsApplyAction: (cv, job) => dispatch(actions.cvsApply(cv, job))
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

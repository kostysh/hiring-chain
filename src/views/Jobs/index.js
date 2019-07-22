import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import styled from 'styled-components';

import config from '../../config.json';
import { H1Section, H2Section, H3Section, ErrorSection } from '../../componets/Layout';
import Loader from '../../componets/Loader';
import RouteButton from '../../componets/RouteButton';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

const JobsTable = styled.table`
width: 100%;
border-collapse: collapse;

thead {
    background-color: #c1daff;

    th {
        padding: 10px 5px;
        color: #004dbc8a; 
        text-align: left;
    }    
}

tbody {

    td {
        padding: 10px 5px;
    }
}
`;

const CloseJob = styled.div`
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

const JobLink = styled.span`
color: #004DBC;
cursor: pointer;
`;

const TopContainer = styled.div`
display: flex;
align-items: center;
flex-direction: row;

.left {
    flex-grow: 1;
}

.right {
    flex-grow: 0;
}
`;

const CvLink = styled.span`
color: #004DBC;
cursor: pointer;
`;

const AppliedList = styled.ul`
list-style-type: none;
margin: 0;
padding: 0;
`;

class Jobs extends Component {

    closeJob = id => this.props.jobsClose(id);

    render() {
        const { jobs, closing, routePush, error } = this.props;

        return (
            <Fragment>
                <H1Section>
                    <TopContainer>
                        <div className="left">
                            <h2>
                                Here is your posted jobs list. Pending postings are will be marked by a special indicator
                            </h2>
                        </div>
                        <div className="right">
                            <RouteButton 
                                background="#FBFFE1"
                                color="#3F3F3F"
                                size="large"
                                to="/job"
                            >Post&nbsp;Job</RouteButton>
                        </div>
                    </TopContainer>                                        
                </H1Section>
                {error &&
                    <ErrorSection>
                        <strong>{error}</strong><br/>
                        <span>You can try to reload the application and try again. If an error occurred during transaction submission it does not mean that it failed. It can be API failure. Please wait some time and reload the app. </span>

                    </ErrorSection>
                }
                <H2Section>
                    <JobsTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Applications</th>
                                <th>Mined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, i) => (
                                <tr key={i}>
                                    <td>
                                        <JobLink
                                            onClick={() => routePush(`/job/${job.id}`)}
                                        >{job.job.title}</JobLink>
                                    </td>
                                    <td>
                                        {job.job.location}
                                        {job.job.remote &&
                                            <span>, Remote</span>
                                        }
                                    </td>
                                    <td>
                                        {(job.applied && job.applied.length > 0) &&
                                            <AppliedList>
                                                {job.applied.map((a, i) => (
                                                    <li key={i}>
                                                        <CvLink
                                                            onClick={() => routePush(`/cv/${a}`)}
                                                        >&#10004;</CvLink>
                                                    </li>
                                                ))}
                                            </AppliedList>
                                        }
                                    </td>
                                    <td>
                                        {job.mined ? 
                                            (<a
                                                href={`https://${config.arscan}/transaction/${job.transaction.id}`}
                                                rel="noopener noreferrer" 
                                                target="_blank" 
                                                title="Arweave Block Explorer"
                                            >yes</a>) : 
                                            (<Loader width="16px" height="16px" />)}
                                    </td>
                                    <td>
                                        {(job.mined && !closing.includes(job.id)) &&
                                            <CloseJob 
                                                title="Close"
                                                onClick={() => this.closeJob(job.id)}
                                            >x</CloseJob>
                                        }
                                        {(job.mined && closing.includes(job.id)) &&
                                            <Loader width="16px" height="16px" />
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </JobsTable>
                </H2Section>
                <H3Section>
                    
                </H3Section>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    return {
        jobs: selectors.jobs(state),
        closing: selectors.jobsClosing(state),
        error: selectors.jobsError(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        jobsClose: id => dispatch(actions.jobsClose(id)),
        routePush: newRoute => dispatch(push(newRoute))
    };
};

const connectedJobs = connect(mapStateToProps, mapDispatchToProps)(Jobs);

export default connectedJobs;

export const route = [
    {
        path: '/jobs',
        exact: true,
        label: 'My Jobs',
        component: connectedJobs
    }
];

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section } from '../../componets/Layout';
import Loader from '../../componets/Loader';
import * as selectors from '../../store/selectors';
import * as actions from '../../store/actions';

const JobsTable = styled.table`
width: 100%;
border-collapse: collapse;

thead {
    background-color: rgba(0,0,0,0.1);

    th {
        padding: 10px 5px;
        color: white; 
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

class Jobs extends Component {

    closeJob = id => this.props.jobsClose(id);

    render() {
        const { jobs, closing } = this.props;

        return (
            <Fragment>
                <H1Section>
                    <h2>
                        Here is your posted jobs list. Pending postings are will be marked by a special indicator
                    </h2>
                </H1Section>
                <H2Section>
                    <JobsTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Mined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job, i) => (
                                <tr key={i}>
                                    <td>
                                        {job.job.title}
                                    </td>
                                    <td>
                                        {job.job.location}
                                    </td>
                                    <td>
                                        {job.mined ? 'yes' : (<Loader width="16px" height="16px" />)}
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
        closing: selectors.jobsClosing(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        jobsClose: id => dispatch(actions.jobsClose(id))
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

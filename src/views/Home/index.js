import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { H1Section, H2Section, H3Section } from '../../componets/Layout';
import RouteButton from '../../componets/RouteButton';
import Spacer from '../../componets/Spacer';
import SearchForm from '../../componets/SearchForm';
import * as selectors from '../../store/selectors';


const Buttons = styled.div`
display: flex;
flex-direction: row;
align-items: center;
align-content: stretch;
padding-bottom: 25px;

@media (max-width: 540px) {
    padding-bottom: 10px;
}
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

const Label = styled.span`
font-size: 12px;
color: #004DBC;
`;

const Pills = ({ tags }) => {

    return (
        <Fragment>
            {tags &&
                tags.map((tag, i) => (
                    <Tag key={i}>
                        <TagInner>
                            <Label>{tag}</Label>
                        </TagInner>
                    </Tag>
                ))
            }
        </Fragment>
    );
};

const Title = styled.div`
font-size: 16px;
color: #004DBC;
`;

const Apply = styled.button`
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
box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
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

const JobsTable = styled.table`
width: 100%;
border-collapse: collapse;

thead {
    
    th {
        border-bottom: 1px solid rgba(0,0,0,0.1);
        padding: 10px 5px;
        color: #7AADF6; 
        text-align: left;       
    }
    
    .w50 {
        width: 50%;
    }

    .w20 {
        width: 20%;
    }
}

tbody {

    td {
        padding: 10px 5px;

        &:last-child {
            text-align: right;
        }
    }
}
`;

const SearchResults = ( { jobs }) => {

    return (
        <Fragment>
            <JobsTable>
            <thead>
                <tr>
                    <th className="w50">Title</th>
                    <th className="w20">Location</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {jobs.map((job, i) => (
                    <tr key={i}>
                        <td>
                            <Title>{job.job.title}</Title>
                            <Pills tags={[...job.job.categories, ...job.job.skills]} />
                        </td>
                        <td>
                            <Title>
                                {job.job.location}
                                {job.job.remote &&
                                    <span>, Remote</span>
                                }
                            </Title>
                        </td>
                        <td>
                            <Apply
                                background="#004DBC"
                                color="white"
                                size="small"
                            >Apply</Apply>
                        </td>
                    </tr>
                ))}
            </tbody>
            </JobsTable>
        </Fragment>
    );
};

class Home extends Component {

    render() {
        const { jobsCache } = this.props;

        return (
            <Fragment>
                <H1Section>
                    <h1>
                        Great place to hire or to be get hired in a decentralized way.  
                        Look for a blockchain and cryptocurrency jobs here.
                    </h1>
                    <Buttons>
                        <RouteButton 
                            background="#004DBC"
                            color="white"
                            size="large"
                            to="/job"
                        >Post Job</RouteButton>
                        <Spacer width="20px" />
                        <RouteButton 
                            background="#FBFFE1"
                            color="#3F3F3F"
                            size="large"
                            to="/cv"
                        >Post CV</RouteButton>
                    </Buttons>                        
                </H1Section>
                <H2Section>
                    <SearchForm />
                </H2Section>
                <H3Section>
                    <SearchResults 
                        jobs={jobsCache}
                    />
                </H3Section>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    return {
        jobsCache: selectors.jobsCache(state)
    };
};

const mapDispatchToProps = dispatch => {

    return {
        
    };
};

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default connectedHome;

export const route = [
    {
        path: '/',
        exact: true,
        label: 'Home',
        component: connectedHome
    }
];
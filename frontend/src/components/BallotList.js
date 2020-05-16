import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ballotsFetchData } from '../actions/ballots';
import AdvancedGridList from "./AdvancedGridList";

const BallotList = (props) => {
    useEffect(() => {
        props.fetchData('api/aanestys');
    }, []);

//    <AdvancedGridList />

    return (
        <div>
            {!props.isLoading ? (
                <>
                    {props.ballots.map((ballot) => (
                        <li key={ballot.id}>
                            {ballot.aanestysOtsikko} {" "} {ballot.aanestysValtiopaivaasia}
                        </li>
                    ))}
                </>)
                : (
                <></>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        ballots: state.ballots,
        hasErrored: state.ballotsHasErrored,
        isLoading: state.ballotsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(ballotsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BallotList);

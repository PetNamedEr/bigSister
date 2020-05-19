import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { ballotsFetchData } from '../actions/ballots';
import AdvancedGridList from "./AdvancedGridList";
import CustomPieChart from "./CustomPieChart";

const BallotList = (props) => {
    const [ballotSortedByMonthIsReady, setBallotSortedByMonthIsReady] = useState(false);
    
    const getBallotVaskiLink = (aanestysValtiopaivaasia) => {
    // HE 36/2019
    const splittedBySpace = aanestysValtiopaivaasia.split(" ");
    //const number = splittedBySpace[1].split("/")[1];
    //const title = splittedBySpace[1].split("/")[0];
    const splittedBySlash = splittedBySpace[1].split("/");

    return 'https://www.eduskunta.fi/FI/vaski/KasittelytiedotValtiopaivaasia/Sivut/'
        + splittedBySpace[0]
        + "_"
        + splittedBySlash[0]
        + "+"
        + splittedBySlash[1]
        + ".aspx";
}

    useEffect(() => {
        props.fetchData('api/aanestys');
    }, []);
            //

            if (props.ballots.length === 0) {
        return <div>loading...</div>;
    }
    console.log("ret uprops.isLoadingrn");
    console.log(props.isLoading);

    return (
        <div>
            <AdvancedGridList ballots={props.ballots} />
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

/*

            {!props.isLoading ? (
                <>
                    {props.ballots.map((ballot) => (
                        <li key={ballot.id}>
                            {ballot.id}
                            {" "}
                            <a href={getBallotVaskiLink(ballot.aanestysValtiopaivaasia)}>vaski</a>
                            {" "}
                            {ballot.kohtaOtsikko}
                            {" "}
                            {ballot.aanestysOtsikko}
                        </li>
                    ))}
                </>)
                : (
                <></>
            )}
*/
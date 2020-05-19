import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { ballotCandidateVotesFetchData } from '../actions/ballotCandidateVotes';
import AdvancedGridList from "./AdvancedGridList";
import CustomPieChart from "./CustomPieChart";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

const BallotDetailVotesDistribution = (props) => {
  const classes = useStyles();

  const getPartyList = () => {
    return ['KOK', 'VAS', 'PS', 'VIHR', 'SDP', 'KESK', 'KD', 'RKP', 'LIIK'];
  }

  useEffect(() => {
    props.fetchData('api/aanestys/aanestysEdustaja/43759');
}, []);

console.log("distribut481516ttttt2342iofwen:");
console.log(props.ballotCandidateVotes);

  return (
        <div>
            <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        ballotCandidateVotes: state.ballotCandidateVotes,
        hasErrored: state.ballotCandidateVotesHasErrored,
        isLoading: state.ballotCandidateVotesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(ballotCandidateVotesFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BallotDetailVotesDistribution);

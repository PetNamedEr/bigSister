import { combineReducers } from 'redux';
import { ballots, ballotsHasErrored, ballotsIsLoading } from './ballots';
import { ballotCandidateVotes, ballotCandidateVotesHasErrored, ballotCandidateVotesIsLoading} from './ballotCandidateVotes';
export default combineReducers({
    ballots,
    ballotsHasErrored,
    ballotsIsLoading,
    ballotCandidateVotes,
    ballotCandidateVotesHasErrored,
    ballotCandidateVotesIsLoading,
});
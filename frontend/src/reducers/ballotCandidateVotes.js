export function ballotCandidateVotesHasErrored(state = false, action) {
    switch (action.type) {
        case 'BALLOT_CANDIDATE_VOTES_HAS_ERRORED':
            return action.hasErrored;        default:
            return state;
    }
}export function ballotCandidateVotesIsLoading(state = false, action) {
    switch (action.type) {
        case 'BALLOT_CANDIDATE_VOTES_IS_LOADING':
            return action.isLoading;        default:
            return state;
    }
}export function ballotCandidateVotes(state = [], action) {
    switch (action.type) {
        case 'BALLOT_CANDIDATE_VOTES_FETCH_DATA_SUCCESS':
            return action.ballotCandidateVotes;        default:
            return state;
    }
}
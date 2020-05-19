export function ballotCandidateVotesHasErrored(bool) {
    return {
        type: 'BALLOT_CANDIDATE_VOTES_HAS_ERRORED',
        hasErrored: bool
    };
}export function ballotCandidateVotesIsLoading(bool) {
    return {
        type: 'BALLOT_CANDIDATE_VOTES_IS_LOADING',
        isLoading: bool
    };
}export function ballotCandidateVotesFetchDataSuccess(ballotCandidateVotes) {
    return {
        type: 'BALLOT_CANDIDATE_VOTES_FETCH_DATA_SUCCESS',
        ballotCandidateVotes
    };
}

export function ballotCandidateVotesFetchData(url) {
    return (dispatch) => {
        dispatch(ballotCandidateVotesIsLoading(true));     
        console.log("ballotCandidateVotesCandidateVotesFetchData o/");  
            fetch(url)
            .then((response) => {
                console.log(response.body);  

                if (!response.ok) {
                    throw Error(response.statusText);
                }                dispatch(ballotCandidateVotesIsLoading(false));                return response;
            })
            .then((response) => response.json())
            .then((ballotCandidateVotes) => dispatch(ballotCandidateVotesFetchDataSuccess(ballotCandidateVotes)))
            .catch(() => dispatch(ballotCandidateVotesHasErrored(true)));
    };
}
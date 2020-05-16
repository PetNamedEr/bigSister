export function ballotsHasErrored(bool) {
    return {
        type: 'BALLOTS_HAS_ERRORED',
        hasErrored: bool
    };
}export function ballotsIsLoading(bool) {
    return {
        type: 'BALLOTS_IS_LOADING',
        isLoading: bool
    };
}export function ballotsFetchDataSuccess(ballots) {
    return {
        type: 'BALLOTS_FETCH_DATA_SUCCESS',
        ballots
    };
}

export function ballotsFetchData(url) {
    return (dispatch) => {
        dispatch(ballotsIsLoading(true));     
        console.log("ballotsFetchData o/");  
            fetch(url)
            .then((response) => {
                console.log(response.body);  

                if (!response.ok) {
                    throw Error(response.statusText);
                }                dispatch(ballotsIsLoading(false));                return response;
            })
            .then((response) => response.json())
            .then((ballots) => dispatch(ballotsFetchDataSuccess(ballots)))
            .catch(() => dispatch(ballotsHasErrored(true)));
    };
}
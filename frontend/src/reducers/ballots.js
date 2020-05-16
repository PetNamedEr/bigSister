export function ballotsHasErrored(state = false, action) {
    switch (action.type) {
        case 'BALLOTS_HAS_ERRORED':
            return action.hasErrored;        default:
            return state;
    }
}export function ballotsIsLoading(state = false, action) {
    switch (action.type) {
        case 'BALLOTS_IS_LOADING':
            return action.isLoading;        default:
            return state;
    }
}export function ballots(state = [], action) {
    switch (action.type) {
        case 'BALLOTS_FETCH_DATA_SUCCESS':
            return action.ballots;        default:
            return state;
    }
}
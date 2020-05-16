import { combineReducers } from 'redux';
import { ballots, ballotsHasErrored, ballotsIsLoading } from './ballots';

export default combineReducers({
    ballots,
    ballotsHasErrored,
    ballotsIsLoading
});
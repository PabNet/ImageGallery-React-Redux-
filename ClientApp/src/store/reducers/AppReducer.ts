import { Reducer } from 'redux';
import { AppState, AppAction } from '../types';
import { getAcceptedCookie } from '../../helpers/cookieUtils';

const initialState: { accepted: boolean } = {
    accepted: getAcceptedCookie(),
};

const appReducer: Reducer<AppState, AppAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACCEPTED':
            return { ...state, accepted: action.payload };
        default:
            return state;
    }
};

export default appReducer;

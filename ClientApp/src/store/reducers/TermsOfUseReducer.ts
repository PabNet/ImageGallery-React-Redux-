import { setAcceptedCookie } from '../../helpers/cookieUtils';
import { Reducer } from 'redux';
import { TermsOfUseAction, TermsOfUseState } from '../types';

const initialState: TermsOfUseState = {
    showModal: false,
};

const termsOfUseReducer: Reducer<TermsOfUseState, TermsOfUseAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return {
                ...state,
                showModal: true,
            };
        case 'HIDE_MODAL':
            return {
                ...state,
                showModal: false,
            };
        case 'ACCEPT_TERMS':
            setAcceptedCookie(true);
            return {
                ...state,
                showModal: false,
            };
        default:
            return state;
    }
};

export default termsOfUseReducer;

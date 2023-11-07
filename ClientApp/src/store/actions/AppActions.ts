import { AppAction } from '../types';

export const setAccepted = (accepted: boolean): AppAction => {
    return { type: 'SET_ACCEPTED', payload: accepted };
};

import Cookies from 'js-cookie';

export const getAcceptedCookie = (): boolean => {
    return Cookies.get('accepted') === 'true';
}

export const setAcceptedCookie = (value: boolean) => {
    Cookies.set('accepted', value ? 'true' : 'false', { expires: 1 });
}
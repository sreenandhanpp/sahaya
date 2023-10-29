import Cookie from 'js-cookie';

const RemoveCookie = (cookieName,token) => {
    Cookie.remove(cookieName);
};

export default RemoveCookie;
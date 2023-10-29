import Cookie from 'js-cookie';

const GetCookie = (cookieName,token) => {
    Cookie.get(cookieName);
};

export default GetCookie;
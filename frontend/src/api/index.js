import axios from 'axios';

const api = (method, url, data) => {
    return axios({ method: method, url: `http://13.126.151.69:8000${url}`, data, })
        .then((res) => { return res; })
        .catch((err) => { throw err; });
}

export const login = (data) => {
    return api('post', '/login', data)
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}

export const populate = () => {
    return api('post', '/populate-data')
        .then((res) => { return res.data })
        .catch((err) => { throw err; });
}
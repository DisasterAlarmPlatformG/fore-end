import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

export const Login = params=> {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: params
    });
};

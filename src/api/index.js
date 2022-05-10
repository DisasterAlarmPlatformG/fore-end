import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
//登录
export const Login = params => {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: params
    });
};
//新增灾情数据
export const UpForm = query=> {
    return request({
        url: '/api/disaster/add',
        method: 'get',
        params: query
    });
};
//查询所有灾情信息
export const ShowForm = query=> {
    return request({
        url: '/api/disaster/allinfo',
        method: 'get',
        params: query
    });
};
//模糊搜索
export const SearchForm = query=> {
    return request({
        url: '/api/disaster/search',
        method: 'get',
        params: query
    });
};
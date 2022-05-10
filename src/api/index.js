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
//按类别进行搜索
export const SearchFormByCategory = query=> {
    return request({
        url: '/api/disaster/condition_select',
        method: 'get',
        params: query
    });
};

//新增用户
export const NewAdmin = params=> {
    return request({
        url: '/api/admin/new',
        method: 'post',
        data: params
    });
};


//修改用户介绍
export const ChangeDesc = query=> {
    return request({
        url: '/api/admin/change_description',
        method: 'get',
        params: query
    });
};


//当前灾害总数
export const CountDis = () => {
    return request({
        url: '/api/vis/all_disaster_count',
        method: 'get',
    });
};

//不同省的灾害总数
export const CountDisProvince = () => {
    return request({
        url: '/api/vis/province_count',
        method: 'get',
    });
};
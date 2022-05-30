import { h } from 'vue';
import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};
//China地图数据
export const fetchChina = query => {
    return request({
        url: './eChina.json',
        method: 'get',
        params: query
    });
};
//经纬度转化
export const geocode = query => {
    return request({
        url: 'https://restapi.amap.com/v3/geocode/geo',
        method: 'get',
        params: query
    });
};

//登录
export const Login = (params) => {
    return request({
        url: '/api/user/login',
        method: 'post',
        data: params
    });
};


//灾情管理------------------------------------------------------------

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


//单文件上传
export const UploadFile = params => {
    return request({
        url: '/api/uploadFile',
        method: 'post',
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
    });
};

//多文件上传
export const UploadMultipleFile = params => {
    return request({
        url: '/api/uploadMultipleFiles',
        method: 'post',
        data: params,
        headers: { "Content-Type": "multipart/form-data" },
    });
};

//文件下载
export const DownLoadFile = (name) => {
    return request({
        url: '/api/downloadFile/'+name,
        method: 'get',
    });
};

//通过灾情码查询文件
export const SelectFile = query => {
    return request({
        url: '/api/selectFile',
        method: 'get',
        params: query,
    });
};



//可视化--------------------------------------------------------------------------

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
//获取不同年份的灾害的总数
export const AllDisasterCount = () => {
    return request({
        url: '/api/vis/year_disaster_count',
        method: 'get',
    });
};

//获取不同类别的灾害总数
export const categoryDisasterCount = () => {
    return request({
        url: '/api/vis/category_disaster_count',
        method: 'get',
    });
};



//后台管理--------------------------------------------------------------------------

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

//查询所有用户
export const AllUser = query=> {
    return request({
        url: '/api/admin/alluser',
        method: 'get',
        params: query
    });
};

//删除用户
export const DeleteUser = query=> {
    return request({
        url: '/api/admin/deleteuser',
        method: 'get',
        params: query
    });
};


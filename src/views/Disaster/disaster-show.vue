<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 首页
                </el-breadcrumb-item>
                <el-breadcrumb-item>灾情显示</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!--在此写数据，非必要不动其他文件-->
            <div align="center">
                <el-input v-model="query.name" placeholder="请输入..." class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <br /><br />
            </div>
            <div>
                <el-table :data="tableData" border class="table" ref="multipleTable"
                    header-cell-class-name="table-header">

                    <el-table-column prop="date" label="请求日期" width="180" align="center"></el-table-column>

                    <el-table-column prop="class" align="center" label="灾情类型" width="80"></el-table-column>

                    <el-table-column prop="code" label="编码" align="center" width="300"></el-table-column>

                    <el-table-column prop="url" label="url" align="center" width="335"></el-table-column>

                    <el-table-column prop="address" align="center" label="上报单位" width="185"></el-table-column>

                    <el-table-column prop="state" label="处理状态" align="center" width="106">
                        <template #default="scope">
                            <el-tag :type="
                                scope.row.state === '成功'
                                    ? 'success'
                                    : scope.row.state === '失败'
                                        ? 'danger'
                                        : ''
                            ">{{ scope.row.state }}</el-tag>
                        </template>
                    </el-table-column>


                </el-table>
                <!-- <div class="pagination">
                    <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                        :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange">
                    </el-pagination>
                </div> -->
            </div>

        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
// import { ElMessage, ElMessageBox } from "element-plus";
// import { fetchData } from "../../api/index";

export default {
    name: "donate",
    setup() {
        const tableData = ref([
            {
                date: '2021.5.1',
                class: '飓风',
                code: '10010010',
                url: 'https://www.jianshu.com/p/6a4c931c9677',
                address: '北京市',
                state: '1'
            }, {
                date: '2021.5.1',
                class: '地震',
                code: '10010010',
                url: 'https://www.jianshu.com/p/6a4c931c9677',
                address: '北京市',
                state: '1'
            }, {
                date: '2021.5.1',
                class: '海啸',
                code: '10010010',
                url: 'https://www.jianshu.com/p/6a4c931c9677',
                address: '北京市',
                state: '1'
            },
        ])

        const query = reactive({
            address: "",
            name: "",
            pageIndex: 1,
            pageSize: 10,
        });
        // const tableData = ref([]);
        // const pageTotal = ref(0);
        // 获取表格数据
        // const getData = () => {
        //     fetchData(query).then((res) => {
        //         tableData.value = res.list;
        //         pageTotal.value = res.pageTotal || 50;
        //     });
        // };

        // getData();

        // 查询操作
        const handleSearch = () => {
            console.log("search");
            // query.pageIndex = 1;
            // getData();
        };
        // 分页导航
        // const handlePageChange = (val) => {
        //     query.pageIndex = val;
        //     getData();
        // };


        return {
            query,
            tableData,
            // pageTotal,
            // editVisible,
            // form,
            handleSearch,
            // handlePageChange,
            // handleDelete,
            // handleEdit,
            // saveEdit,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.table {
    width: 100%;
    font-size: 14px;
}

.red {
    color: #ff0000;
}

.mr10 {
    margin-right: 10px;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
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

                    <el-table-column prop="disasterId" label="编号" width="186" align="center"></el-table-column>

                    <el-table-column prop="locationVillage" align="center" label="参考位置" width="150"></el-table-column>

                    <el-table-column prop="createTime" label="时间" align="center" width="120"></el-table-column>

                    <el-table-column prop="sourceSub" label="数据源" align="center" width="150"></el-table-column>

                    <el-table-column prop="carrier" align="center" label="数据载体" width="120"></el-table-column>

                    <el-table-column prop="disasterSub" label="分类" align="center" width="120"></el-table-column>

                    <el-table-column prop="disasterTarget" label="标签" align="center" width="140"></el-table-column>

                    <el-table-column prop="description" label="描述" align="center" width="200"></el-table-column>


                </el-table>
                <div class="pagination">
                    <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                        :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
// import { ElMessage, ElMessageBox } from "element-plus";
import { ShowForm } from "../../api/index";

export default {
    name: "donate",
    setup() {

        // const tableData = ref([
        //     {
        //         date: '2021.5.1',
        //         class: '飓风',
        //         code: '10010010',
        //         address: '北京市',

        //     }, {
        //         date: '2021.5.1',
        //         class: '地震',
        //         code: '10010010',
        //         address: '北京市',
        //     }, {
        //         date: '2021.5.1',
        //         class: '海啸',
        //         code: '10010010',
        //         address: '北京市',
        //     },
        // ])

        const query = reactive({
            username: localStorage.getItem("ms_username"),
            page: 1,
            num: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        const getData = () => {
            ShowForm(query).then((res) => {
                tableData.value = res.data;
                // pageTotal.value = res.pageTotal || 50;
                console.log(res.data);
                console.log(tableData);
            });
        };
        getData();

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
            pageTotal,
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
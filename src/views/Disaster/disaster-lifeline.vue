<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 首页
                </el-breadcrumb-item>
                <el-breadcrumb-item>分类查询 / 生命线数据</el-breadcrumb-item>
                <!-- 由于非动态sidebar使用的使静态数据，此处只能使用静态数据来模拟路由路径 -->
            </el-breadcrumb>
        </div>
        <div class="container">

            <div align="center">
                <!-- <el-input v-model="searchQuery.item" placeholder="请输入编号..." class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->

                <br />
            </div>
            <div>
                <el-table :data="tableData" border @cell-click="cellClick" class="table" ref="multipleTable"
                    header-cell-class-name="table-header">

                    <el-table-column prop="disasterId" label="编号" width="186" align="center"></el-table-column>

                    <el-table-column prop="locationCity,lacationProvince,locationCounty,locationTown" align="center"
                        label="参考位置" width="270">

                        <template #default="scope">
                            {{ scope.row.locationProvince }}
                            -{{ scope.row.locationCity }}
                            -{{ scope.row.locationCounty }}
                            -{{ scope.row.locationTown }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="createTime" label="时间" align="center" width="200">
                        <template #default="scope">
                            {{ dateTransform('YYYY-mm-dd HH:MM', scope.row.createTime) }}
                        </template>

                    </el-table-column>

                    <el-table-column prop="sourceSub" label="数据源" align="center" width="150"></el-table-column>

                    <el-table-column prop="carrier" align="center" label="数据载体" width="120"></el-table-column>

                    <el-table-column prop="disasterMain" label="分类" align="center" width="80"></el-table-column>

                    <el-table-column prop="disasterTarget" label="标签" align="center" width="100"></el-table-column>

                    <el-table-column prop="description" label="描述" align="center" width="80"></el-table-column>


                </el-table>
                <div class="pagination">
                    <el-pagination background layout="total, prev, pager, next" :current-page="query.page"
                        :page-size="query.num" :total="pageTotal.total" @current-change="handlePageChange">
                    </el-pagination>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
// import { ElMessage, ElMessageBox } from "element-plus";
import { SearchFormByCategory } from "../../api/index";
import { useRouter } from "vue-router";
export default {
    name: "donate",
    setup() {

        const query = reactive({
            username: localStorage.getItem("ms_username"),
            category: 3,
            //3代表查询生命线数据
            page: 1,
            num: 6,
        });

        // const searchQuery = reactive({
        //     username: localStorage.getItem("ms_username"),
        //     item: "",
        //     page: 1,
        //     num: 6,
        // })
        const tableData = ref([]);
        const pageTotal = reactive({
            total: 200
        });;

        // 获取表格数据
        const getData = () => {
            SearchFormByCategory(query).then((res) => {
                tableData.value = res.data;
                // pageTotal.value = res.pageTotal || 50;

                // console.log(tableData);
                // query.num=res.pageSize;
                query.page = res.currentPage;
                pageTotal.total = res.sumRow;
                // console.log(res);
            });
        };
        getData();

        // 查询操作
        // const handleSearch = () => {
        //     // console.log(searchQuery.item);
        //     // query.pageIndex = 1;
        //     // const tableData = ref([]);
        //     SearchForm(searchQuery).then((res) => {
        //         tableData.value = res.data;
        //         // console.log(res.data);
        //     })

        // };
        // 分页导航
        const handlePageChange = (val) => {
            query.page = val;
            // console.log();
            getData();
        };

        //时间解析函数
        const dateTransform = (fmt, date) => {
            let ret = "";
            date = new Date(date);
            const opt = {
                'Y+': date.getFullYear().toString(), // 年
                'm+': (date.getMonth() + 1).toString(), // 月
                'd+': date.getDate().toString(), // 日
                'H+': date.getHours().toString(), // 时
                'M+': date.getMinutes().toString(), // 分
                'S+': date.getSeconds().toString() // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            }
            for (let k in opt) {
                ret = new RegExp('(' + k + ')').exec(fmt)
                if (ret) {
                    fmt = fmt.replace(
                        ret[1],
                        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
                    )
                }
            }
            return fmt
        };
        const router = useRouter();
        const cellClick = (row) => {
            // console.log(row);
            router.push({
                name: "dashboarddetail",
                query: {
                    //改变传递的参数
                    id: row.disasterId,
                    address_for_search: row.locationProvince + row.locationCity + row.locationCounty + row.locationTown,
                    date_for_view: dateTransform('YYYY-mm-dd HH:MM', row.createTime),
                    category: row.disasterMain,
                    description: row.description,

                }
            })
        }

        return {
            query,
            tableData,
            pageTotal,
            // editVisible,
            // form,
            // searchQuery,
            // handleSearch,
            handlePageChange,
            dateTransform,
            cellClick,
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
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/disastershow'
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            /* 灾情信息管理项目目录 */
            {
                path: "/disastershow",
                name: "dashboardshow",
                meta: {
                    title: '灾情显示'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-show.vue")
            },
            {
                path: "/disasterup",
                name: "dashboardup",
                meta: {
                    title: '灾情上传'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-up.vue")
            },
            {
                path: "/disastervisual",
                name: "dashboardvisual",
                meta: {
                    title: '灾情可视化'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-visual.vue")
            },
            {
                path: "/disastermap",
                name: "dashboardmap",
                meta: {
                    title: '灾情地图'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-map.vue")
            },
            {
                path: "/disasterclass",
                name: "dashboardclass",
                meta: {
                    title: '灾情分类'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-class.vue"),

                // children: [
                //     {
                //         path: '/casualty',
                //         name: 'disaster-casualty',
                //         meta: {
                //             title: '伤亡数据'
                //         },
                //         component: () => import(/* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-casualty.vue")
                //     },
                // ]
                //
                // 非动态sidebar使用预先定义好的静态数据进行路由的展示，
                // 故不能在router中定义逻辑层面的children关系，
                // 应将二级路由声明成一级路由的同一级,
                // children关系应当在sidebar中利用sub体现。
            },

            //----------------------------------------------------------------二级路由
            {
                path: '/casualty',
                name: 'disaster-casualty',
                meta: {
                    title: '伤亡数据'
                },
                component: () => import(/* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-casualty.vue")
            },
            {
                path: '/building',
                name: 'disaster-building',
                meta: {
                    title: '房屋数据'
                },
                component: () => import(/* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-building.vue")
            },
            {
                path: '/secondary',
                name: 'disaster-secondary',
                meta: {
                    title: '次生灾害数据'
                },
                component: () => import(/* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-secondary.vue")
            },
            {
                path: '/lifeline',
                name: 'disaster-lifeline',
                meta: {
                    title: '生命线数据'
                },
                component: () => import(/* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-lifeline.vue")
            },
            {
                path: '/earthquake',
                name: 'disaster-earthquake',
                meta: {
                    title: '震情'
                },
                component: () => import(/* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-earthquake.vue")
            },

            //-----------------------------------------------------------

            {
                path: "/disasterdetail",
                name: "dashboarddetail",
                meta: {
                    title: '灾情详情'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-detail.vue")
            },
            {
                path: "/disastertest",
                name: "dashboardtest",
                meta: {
                    title: '测试页面'
                },
                component: () => import( /* webpackChunkName: "disaster-show" */ "../views/Disaster/disaster-test.vue")
            },

            /* 以下为模板默认目录*/

            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '仪表盘'
                },
                component: () => import( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            },
            {
                path: "/table",
                name: "basetable",
                meta: {
                    title: '灾情上传'
                },
                component: () => import( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            }, {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表'
                },
                component: () => import( /* webpackChunkName: "charts" */ "../views/BaseCharts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '表单'
                },
                component: () => import( /* webpackChunkName: "form" */ "../views/BaseForm.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/donate",
                name: "donate",
                meta: {
                    title: '鼓励作者'
                },
                component: () => import( /* webpackChunkName: "donate" */ "../views/Donate.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permission: true
                },
                component: () => import( /* webpackChunkName: "permission" */ "../views/Permission.vue")
            }, {
                path: "/i18n",
                name: "i18n",
                meta: {
                    title: '国际化语言'
                },
                component: () => import( /* webpackChunkName: "i18n" */ "../views/I18n.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            }, {
                path: "/icon",
                name: "icon",
                meta: {
                    title: '自定义图标'
                },
                component: () => import( /* webpackChunkName: "icon" */ "../views/Icon.vue")
            }, {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import(/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/editor',
                name: 'editor',
                meta: {
                    title: '富文本编辑器'
                },
                component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | Disaster Alarm Platform `;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;
import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://20.39.193.212:8089/',    // 目标接口前缀
                //ws: true,       //  代理webscoked
                changeOrigin: true,   // 开启跨域
                rewrite: (path) => path.replace(/\/api/, '')  // 路径重写
            }
        }
    }

}

// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'https://www.bilibili.com/', //接口域名
//                 changeOrigin: true,             //是否跨域
//                 ws: true,                       //是否代理 websockets
//                 secure: true,                   //是否https接口
//                 pathRewrite: {                  //路径重置
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// };

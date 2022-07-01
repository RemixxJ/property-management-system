// axios.config.js
//封装公共请求方法
import axios from 'axios';
import qs from 'qs';
// import cookie from './cookie';
// import utils from './utils';

axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.common['Authorization'] = `${cookie.switchInfo(['YISATOKEN'])['YISATOKEN']}`;
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
// };


function ajax(config = {}) {

    return new Promise((resolve, reject) => {
        // if (!utils.isObject(config)) {
        //   return reject(new Error('ajax请求配置错误'));
        // }


        let method = config.type.toLowerCase();
        let url = config.url;
        let data = method === 'get' ? { params: config.data } : qs.stringify(config.data);

        axios.defaults.headers = config.headers ? config.headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

        axios[method](url, config.headers ? config.data : data).then(res => resolve(res.data)).catch(err => {
            let response = err.response
            console.log(response)
            console.log(url);
            if (response) {
                switch (response.status) {
                    case 401:
                        window.location.href = window.global.loginUrl
                        break
                    case 500:
                        alert('服务器响应失败')
                        break
                    case 504:
                        alert('请求超时')
                        break
                }
            }
            return reject(err)
        })
    });
}

export default ajax;
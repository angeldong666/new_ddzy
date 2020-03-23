import axios from 'axios'
// import qs from 'qs'

axios.defaults.timeout = 20000
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.headers.post['Content-Type'] = 'x-www-form-urlencoded'
// cookie跨域
// axios.defaults.withCredentials = true
// 本地配置测试用，如接口需要cookie跨域验证，即上面的参数打开时，本地接口代理会有问题
//const LOCAL_HOST = '/api'
// api服务器地址，特殊地址需要在api中添加对应域名

const LOCAL_HOST = 'http://192.168.1.63:8082';

// const LOCAL_HOST = 'http://manortest.pceggs.com';

// const LOCAL_HOST = 'http://192.168.1.29:8009';
//
// const API_HOST = 'http://manorapp.pceggs.com';

const API_HOST = 'http://192.168.1.63:8082';

// axios.defaults.baseURL = DEFAULT_API_HOST
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? LOCAL_HOST : API_HOST

// POST传参序列化
axios.interceptors.request.use((config) => {
    let datas = {
        unix: document.getElementById("unix").value,
        keycode: document.getElementById('keycode').value,
        ptype: document.getElementById('ptype').value,
        deviceid: document.getElementById('deviceid').value,
        userid: document.getElementById('userid').value,
        token: document.getElementById('token').value,
    };
    if (config.method === 'post') {
        config.data = Object.assign(config.data, datas)
    } else if (config.method === 'get') {
        config.params = Object.assign(config.params, datas)
    }
    // if (config.method === 'post') {
    //     config.data = qs.stringify(config.data)
    // }
    // console.log(config)
    return config
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error)
})

// code状态码200判断
axios.interceptors.response.use((res) => {
    // console.log(res.data)
    if (res.status !== 200) {
        return Promise.reject(res)
    }
    return res
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error)
})

export default axios
import axios from 'axios';

axios.defaults.withCredentials = true;
const baseReqPath = 'https://52.15.212.236:5000';

const checkPassedEndpoint = (endpoint) => {
    if (endpoint === undefined){
        throw new Error('No endpoint provided in get(endpoint: string) call'); 
    }
}

const get = async (endpoint, body) => {
    checkPassedEndpoint(endpoint);
    const reqPath = baseReqPath + endpoint;
    try {
        const res = await axios({
            method: 'get',
            url: reqPath,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'withCredentials': true,
                'Access-Control-Allow-Credentials': true
            }
        });
        return res;
    }catch(err){
        console.log(err);
        return {
            status: err.response.status,
            errRes: err.response.data
        }
    }
}

const post = async (endpoint, body) => {
    checkPassedEndpoint(endpoint);
    const reqPath = baseReqPath + endpoint;
    try {
        const res = await axios({
            method: 'post',
            url: reqPath,
            data: body,
            headers: {
                'Content-Type': 'application/json',
                'withCredentials': true,
                'Access-Control-Allow-Credentials': true
            } 
        });
        return res;
    } catch(err) {
        console.log(err);
        return {
            status: err.response.status,
            errRes: err.response.data
        }
    }
}

export {
    get, 
    post
}

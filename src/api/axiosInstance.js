import axios from 'axios';

const api=axios.create({
    baseURL: "http://16.176.139.239:8080",
    headers: {
        'Content-Type': "application/json"
    },
    timeout: 10000,
});
export default api;
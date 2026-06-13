import api from './axiosInstance';

export const sendNotification = async (payload)=>{
    const response=await api.post("/test/notify",payload);
    return response.data;
    //expected response :{eventId:"string"}
}

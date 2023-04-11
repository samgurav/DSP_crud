import axios from 'axios';
const MAIN_URL= "http://localhost:3001";


export function addDetails(data){
    console.log(data)
    return axios.post(`${MAIN_URL}/adddetails`,data);
}

export function getDetails(data){
    return axios.get(`${MAIN_URL}/getdata`,data);
}
export function UpdateDetails(data){
    return axios.put(`${MAIN_URL}/updateDetails`,data);
}

export function DeleteDetails(data){
    console.log(data);
    return axios.post(`${MAIN_URL}/deletedetails`,data);
}

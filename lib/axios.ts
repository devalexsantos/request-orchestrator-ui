import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.7:4000/graphql',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmhvbiBEb2UiLCJlbWFpbCI6Impob25kb2VAZW1haWwuY29tIiwiaWF0IjoxNzM0NTQ2ODI1LCJleHAiOjE3MzQ1NTA0MjV9.jvMocs7bZxOZ08py8W6WWutZmwNih8xc4fq_ZWMd0n8`
  }
})

export default axiosInstance;

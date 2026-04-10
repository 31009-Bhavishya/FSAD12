import axios from 'axios';


const API_BASE = 'http://localhost:8080/students';


export const getAllStudents = () => axios.get(API_BASE);

export const addStudent = (student) => axios.post(API_BASE, student);


export const updateStudent = (id, student) => axios.put(`${API_BASE}/${id}`, student);


export const deleteStudent = (id) => axios.delete(`${API_BASE}/${id}`);

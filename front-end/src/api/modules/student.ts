import { Student } from '../../utils/interfaces';
import { axiosClient, resolver } from '../client';

export default{
    getStudents(){
        return resolver(axiosClient.get('/'));
    },

    postStudent(student: Student){
        return resolver(axiosClient.post('/', student));
    },

    putStudent (id: number, student: Student){
        return resolver(axiosClient.put(`/${id}`, student));
    },

    deleteStudent(id: number){
        return resolver(axiosClient.delete(`/${id}`));
    }

}
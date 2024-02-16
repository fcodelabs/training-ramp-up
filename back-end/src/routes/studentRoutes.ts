import { StudentController } from '../controllers/studentController';

export const studentRoutes = [
  {
    method: 'get',
    route: '/students',
    controller: StudentController,
    action: 'all'
  },
  {
    method: 'get',
    route: '/students/:id',
    controller: StudentController,
    action: 'one'
  },
  {
    method: 'post',
    route: '/students',
    controller: StudentController,
    action: 'save'
  },
  {
    method: 'delete',
    route: '/students/:id',
    controller: StudentController,
    action: 'remove'
  },
  {
    method: 'put',
    route: '/students',
    controller: StudentController,
    action: 'update'
  }
];

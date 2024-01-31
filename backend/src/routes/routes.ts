import { StudentController } from "../controller/studentController";
import { UserController } from "../controller/userController";
import { authenticateToken, authorizeRole } from "../middleware/auth";
export enum Role {
  ADMIN = "admin",
  OBSERVER = "observer",
  NONE = "",
}

export const Routes = [
  {
    method: "get",
    route: "/students",
    controller: StudentController,
    action: "all",
    middleware: [],
  },
  {
    method: "get",
    route: "/students/:id",
    controller: StudentController,
    action: "one",
    middleware: [],
  },
  {
    method: "post",
    route: "/students/:userId",
    controller: StudentController,
    action: "add",
    middleware: [],
  },
  {
    method: "put",
    route: "/students/:id/:userId",
    controller: StudentController,
    action: "update",
    middleware: [],
  },
  {
    method: "delete",
    route: "/students/:id/:userId",
    controller: StudentController,
    action: "remove",
    middleware: [],
  },
  //////////////////////////////////////////////
  {
    method: "post",
    route: "/users/signup",
    controller: UserController,
    action: "create",
    middleware: [],
  },
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
    middleware: [],
  },
  {
    method: "post",
    route: "/users/email",
    controller: UserController,
    action: "email",
    middleware: [authenticateToken, authorizeRole([Role.ADMIN])],
  },
  {
    method: "post",
    route: "/users/verify",
    controller: UserController,
    action: "verify",
    middleware: [authenticateToken],
  },
];

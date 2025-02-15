import { lazy } from "react";

const Home = lazy(() => import("./__root/Home"));
const Login = lazy(() => import("./__auth/Login"));
const NotFound = lazy(() => import("./__auth/NotFound"));

const Welcome = lazy(() => import("./__root/Welcome"));

const UsersList = lazy(() => import("./__root/users/UsersList"));
const NotesList = lazy(() => import("./__root/notes/NotesList"));

export { Home, Login, NotFound, Welcome, UsersList, NotesList };

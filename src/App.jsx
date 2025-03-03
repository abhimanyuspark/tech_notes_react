import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import {
  Home,
  Login,
  NoteForm,
  NotesList,
  NotFound,
  UnAuthorized,
  UserForm,
  UsersList,
  Welcome,
} from "./pages";
import { Loader, Persist } from "./components";
import Layout from "./layouts/Layout";
import DashLayout from "./layouts/DashLayout";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<Persist />}>
              {/* Dash start */}
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path="new" element={<UserForm />} />
                  <Route path="edit/:id" element={<UserForm />} />
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path="new" element={<NoteForm />} />
                  <Route path="edit/:id" element={<NoteForm />} />
                </Route>
              </Route>
              {/* Dash end */}
            </Route>
          </Route>
        </Routes>
      </Suspense>

      <Tooltip id="my-tooltip" className="z-50" />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        // transition={Bounce}
      />
    </>
  );
}

export default App;

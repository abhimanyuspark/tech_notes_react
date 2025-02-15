import React, { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Home, Login, NotesList, NotFound, UsersList, Welcome } from "./pages";
import { Loader } from "./components";
import Layout from "./layouts/Layout";
import DashLayout from "./layouts/DashLayout";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
            </Route>

            <Route path="notes">
              <Route index element={<NotesList />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

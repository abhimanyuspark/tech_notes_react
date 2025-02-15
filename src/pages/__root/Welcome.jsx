import React from "react";
import { Link } from "react-router";

const Welcome = () => {
  return (
    <main>
      <h1>Welcome</h1>
      <div className="flex gap-2 flex-col">
        <Link to="/dash/notes">View TechNotes</Link>
        <Link to="/dash/users">View User Settings</Link>
      </div>
    </main>
  );
};

export default Welcome;

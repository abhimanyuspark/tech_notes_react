import React from "react";
import { Link } from "react-router";
import { FaLongArrowAltRight } from "../../assets/icons";

const Welcome = () => {
  return (
    <main className="flex gap-2 flex-col">
      <h1>Welcome</h1>
      <div className="flex gap-2 flex-col items-start">
        <Link
          to="/dash/notes"
          className="flex items-center gap-4 hover:text-red-500 hover:underline hover:underline-offset-2 w-auto"
        >
          <FaLongArrowAltRight className="text-xl" /> Tech Notes
        </Link>
        <Link
          to="/dash/users"
          className="flex items-center gap-4 hover:text-red-500 hover:underline hover:underline-offset-2 w-auto"
        >
          <FaLongArrowAltRight className="text-xl" /> User Settings
        </Link>
      </div>
    </main>
  );
};

export default Welcome;

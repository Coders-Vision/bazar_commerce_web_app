"use client";

import { GoogleSigin } from "./components/auth-sigin-buttons";

function Sigin() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center  lg:w-1/3 mt-10 p-10 shadow-nd">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSigin/>
      </div>
    </div>
  );
}

export default Sigin;

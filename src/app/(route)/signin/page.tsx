"use client";

import { GoogleSigin } from "./components/auth-sigin-buttons";
import CredentialForm from "./components/credential-form";

function Sigin() {
  return (
    <div className="w-full flex flex-col items-center justify-center  py-2">
      <div className="flex flex-col items-center  lg:w-1/3 mt-10 p-10 shadow-nd">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
        <GoogleSigin />
        <span className="text-2xl font-semibold  text-center mt-8">Or</span>
        <CredentialForm  />
      </div>
    </div>
  );
}

export default Sigin;

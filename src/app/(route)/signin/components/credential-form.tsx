"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Spinner } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface CredentialFormProps {
  csrfToken?: string;
}

function CredentialForm({ csrfToken }: CredentialFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setIsLoading(true);

    try {
      const signInReponse = await signIn("credentials", {
        email: data.get("email"),
        password: data.get("password"),
        redirect: false,
      });
      console.log('Sign in response',signInReponse)
      if (signInReponse && !signInReponse.error) {
        router.push("/");
      } else {
        setError("Email or Password is not Valid");
      }
    } catch (error) {
      setError("Oops! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <input
        className="w-full px-4 py-4 mb-4 border border-gray-500 rounded-md"
        type="email"
        name="email"
        placeholder="Email"
      />
      <input
        className="w-full px-4 py-4 mb-4 border border-gray-500 rounded-md"
        type="password"
        name="password"
        placeholder="Password"
      />
      {/* <Button className=" "></Button> */}
      <Button
        disabled={isLoading}
        type="submit"
        className={cn("w-full h-12 px-2 mt-4 text-lg ")}
      >
        {isLoading ? (
          <>
            <Spinner aria-label="signing" />
            <span className="pl-3">Signing in...</span>
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}

export default CredentialForm;

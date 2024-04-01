"use client";

import Container from "@/layout/Container";
import React from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <div className="pb-10 space-y-10">
        Error {error.digest}
        {/* <button onClick={() => reset()}>Try again</button> */}
      </div>
    </Container>
  );
}

export default Error;

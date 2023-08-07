"use client";

import { currrencyFormatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value: number;
}
function Currency({ value }: CurrencyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return <div className="font-semibold">{currrencyFormatter(value)}</div>;
}

export default Currency;

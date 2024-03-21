"use client";

import React from "react";
import useSWR from "swr";
import Filter from "./filter";
import { getSizes, getSizesSWR } from "@/actions/sizes";
import { getColors, getColorsSWR } from "@/actions/color";
import { Color, Size } from "@/types/types";

function Filters() {
  const sizes = useSWR<Size[]>("/catalogue/client/sizes", getSizesSWR);
  const colors = useSWR<Color[]>('/catalogue/client/colors',getColorsSWR);
  return (
    <>
      {sizes.isLoading ? (
        <div>Loading</div>
      ) : (
        <Filter valueKey="sizeId" name="Sizes" data={sizes.data || []} />
      )}
      {colors.isLoading ? (
        <div>Loading</div>
      ) : (
        <Filter valueKey="colorId" name="Colors" data={colors.data || []} />
      )}
    </>
  );
}

export default Filters;

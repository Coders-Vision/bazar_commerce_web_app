"use client";

import React from "react";
import useSWR from "swr";
import Filter from "./filter";
import { getSizes, getSizesSWR } from "@/services/SizesService";
import { getColors, getColorsSWR } from "@/services/ColorService";
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

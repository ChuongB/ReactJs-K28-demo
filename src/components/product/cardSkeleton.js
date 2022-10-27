import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function CardSkeleton() {
  return (
    <Box sx={{ width: "250px" }}>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={250} height={350} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
        </Box>
      </Stack>
    </Box>
  );
}

import { Container } from "@mui/material";
import React, { ReactElement } from "react";

const MainLayout = ({ children }: { children: any }) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Container>
  );
};

export default MainLayout;

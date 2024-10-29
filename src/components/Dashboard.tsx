import { SidebarMenu } from "./SidebarMenu";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";

export const Dashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarMenu />
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};

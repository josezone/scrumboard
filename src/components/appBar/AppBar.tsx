import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

import { AppBarWrapper } from "./AppBar.style";



function AppBarHeader(props: any) {
  return (
    <AppBarWrapper>
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar>
            {props.children}
          </Toolbar>
        </Container>
      </AppBar>
    </AppBarWrapper>
  );
}
export default AppBarHeader;

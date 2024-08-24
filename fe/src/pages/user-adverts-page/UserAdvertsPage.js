import React from "react";
import { Grid, Typography } from "@mui/material";
import UserAdverts from "../../components/user-adverts/UserAdverts";

const UserAdvertsPage = () => {
  return (
    <Grid
    container
    spacing={2}
    marginTop={0}
    padding={"50px 10rem"}
  >
     <Grid item xs={12} display={"flex"} justifyContent={"center"} marginBottom={"12px"}>
        <Typography variant="h2" gutterBottom sx={{fontSize:"24px",fontWeight:900}}>
          İlanlarım
        </Typography>
      </Grid>
  <UserAdverts />
  </Grid>
  );

};

export default UserAdvertsPage;

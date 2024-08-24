import React from "react";
import UserFavoriteAdverts from "../../components/user-favorite-adverts/UserFavoriteAdverts";

import { Grid, Typography } from "@mui/material";

const UserFavoriteAdvertsPage = () => {
  return (
    <Grid
      container
      spacing={2}
      marginTop={0}
      padding={"50px 10rem"}
    >
      <Grid item xs={12} display={"flex"} justifyContent={"center"} marginBottom={"12px"}>
        <Typography variant="h2" gutterBottom sx={{fontSize:"24px",fontWeight:900}}>
          Favori İlanlar
        </Typography>
      </Grid>
      <UserFavoriteAdverts />
    </Grid>
  );
};

export default UserFavoriteAdvertsPage;

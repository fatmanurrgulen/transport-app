import React from "react";
import { useAuth } from "../../context/auth-context/AuthContext";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";

import { Grid } from "@mui/material";
import Adverts from "../adverts/Adverts";

const UserAdverts = () => {
  const { currentUser } = useAuth();
  const { adverts } = useAdverts();

  // Kullanıcının sahibi olduğu ilanları filtrele
  const userAdverts = adverts.filter(
    (advert) => advert.username === currentUser.username
  );

  return userAdverts.map((advert) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      key={advert.id}
      container
      justifyContent="center"
      alignItems="center"
      paddingBottom={"16px"}
    >
      <Adverts key={advert.id} advert={advert} />
    </Grid>
  ));
};

export default UserAdverts;

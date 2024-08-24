import React from "react";
import { useAuth } from "../../context/auth-context/AuthContext";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";

import { Grid } from "@mui/material";
import Adverts from "../adverts/Adverts";

const UserFavoriteAdverts = () => {
  const { favoriteAds } = useAuth();
  const {allAdverts} = useAdverts();

  if(favoriteAds && favoriteAds.length > 0){
    // Kullanıcının favori ilanlarını filtrele
  const userFavoriteAdverts = allAdverts.filter(
    (advert) => favoriteAds.includes(advert.id)
  );

  return userFavoriteAdverts.map((advert) => (
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
  } else {
    return null;
  }
  
};

export default UserFavoriteAdverts;

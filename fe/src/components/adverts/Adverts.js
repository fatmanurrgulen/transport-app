import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context/AuthContext";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DeleteAlert from "../delete-alert/DeleteAlert";

const Adverts = ({ advert }) => {
  const {
    currentUser,
    favoriteAds,
    getFavoriteAds,
    updateFavoriteAds,
    setCurrentConversationReceiver,
  } = useAuth();

  const handleMessageSend = async () => {
    setCurrentConversationReceiver(advert.username);
  };

  const handleFavoriteIconClick = () => {
    if (favoriteAds && favoriteAds.includes(advert.id)) {
      // Eğer ilan favorilerde ise, kaldır
      const updatedFavoriteAds = favoriteAds.filter((id) => id !== advert.id);
      updateFavoriteAds(currentUser.username, updatedFavoriteAds);
    } else {
      // Eğer ilan favorilerde değilse, ekle
      const updatedFavoriteAds = [...favoriteAds, advert.id];
      updateFavoriteAds(currentUser.username, updatedFavoriteAds);
    }
    getFavoriteAds(currentUser.username);
  };

  return (
    <Card sx={{ width: 320, marginTop: 0, height: 400, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Typography
          level="title-lg"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            marginRight: "8px",
          }}
        >
          {advert.adTitle}
        </Typography>
          {currentUser && currentUser.username === advert.username ? (
              <DeleteAlert advert={advert}/>
          ) : null}
        {currentUser && (
          <IconButton
            aria-label={`bookmark ${advert.adTitle}`}
            onClick={handleFavoriteIconClick}
            variant="plain"
            // Favoriye eklenmişse renk değiştir
            size="sm"
            sx={{ position: "absolute",  right: "0.5rem" }}
          >
            {favoriteAds && favoriteAds.includes(advert.id) ? (
              <StarIcon sx={{ color: "orange" }} />
            ) : (
              <StarOutlineIcon />
            )}
          </IconButton>
        )}
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={advert.adPhoto} loading="lazy" alt={advert.adTitle} />
      </AspectRatio>
      <CardContent orientation="vertical">
        {advert.isProduct ? (
          <div>
            <Typography level="body-md" fontWeight={900}>
              Eşya İlanı
            </Typography>
            <Typography level="body-md" fontWeight={900}>
              {advert.budget} TL
            </Typography>
            <Typography level="body-md">
              Alınacak Şehir:{advert.productSpecialStartCity}
            </Typography>
            <Typography level="body-md">
              Bırakılacak Şehir:{advert.productSpecialStartCity}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography level="body-md" fontWeight={900}>
              Araç İlanı
            </Typography>
            <Typography level="body-md" fontWeight={900}>
              {advert.budget} TL
            </Typography>
            <Typography
              level="body-md"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
              }}
            >
              Hizmet Verilen Şehirler: {advert.vehicleSpecialServiceCities}
            </Typography>
          </div>
        )}

        {currentUser && currentUser.username !== advert.username ? (
          <Link to={`/mesajlarim`}>
            <Button
              onClick={handleMessageSend}
              variant="solid"
              size="lg"
              color="primary"
              sx={{
                ml: "auto",
                alignSelf: "center",
                fontWeight: 600,
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
              }}
            >
              Mesaj
            </Button>
          </Link>
        ) : null}

        <Link to={`/ilan/${advert.id}`}>
          <Button
            variant="solid"
            size="lg"
            color="primary"
            sx={{
              ml: "auto",
              alignSelf: "center",
              fontWeight: 600,
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
            }}
          >
            İlan Detayı
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Adverts;

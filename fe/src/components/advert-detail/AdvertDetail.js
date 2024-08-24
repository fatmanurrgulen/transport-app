import React from "react";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";
import { useParams } from "react-router-dom";

import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import { Grid, Paper } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";

const AdvertDetail = () => {
  const { adverts } = useAdverts();
  const { advertId } = useParams();
  const advert = adverts.find((ad) => ad.id === parseInt(advertId));

   // Tarih nesnesini oluştur
   const createdAtDate = new Date(advert.createdAt);
   // Tarihi TR formatına dönüştür
   const formattedCreatedAt = createdAtDate.toLocaleDateString("tr-TR");

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            color:"#1976d2",
            fontSize: "24px",
            fontWeight: 900,
            display: "flex",
            justifyContent: "center",
          }}
        >
          İlan Detayı
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} >
          <AspectRatio ratio="16/9">
            <img
              src={advert.adPhoto}
              alt={advert.adTitle}
              style={{ width: "100%", height:"100%", objectFit: "cover" }}
            />
          </AspectRatio>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "0.5rem" }}>
          <Table aria-label="basic table">
            <tbody>
              <tr>
                <td>İlan Tarihi</td>
                <td>{formattedCreatedAt}</td>
              </tr>
              <tr>
                {advert.isProduct ? <td>Ürün Adı</td> : <td>Firma Adı</td>}
                <td>{advert.adTitle}</td>
              </tr>
              <tr>
                {advert.isProduct ? <td>Bütçe</td> : <td>Fiyat</td>}
                <td>{advert.budget} TL</td>
              </tr>
              {advert.isProduct ? (
                <tr>
                  <td>Ürün Türü</td>
                  <td>{advert.productSpecialType}</td>
                </tr>
              ) : (
                <tr>
                  <td>Araç Türü</td>
                  <td>{advert.vehicleSpecialType}</td>
                </tr>
              )}
              {!advert.isProduct ? (
                <tr>
                  <td>Plaka</td>
                  <td>{advert.vehicleSpecialLicensePlate}</td>
                </tr>
              ) : null}
              {advert.isProduct ? (
                <tr>
                  <td>Eşyanın Alınacağı Tarih</td>
                  <td>{advert.productSpecialDate}</td>
                </tr>
              ) : null}
              {advert.isProduct ? (
                <tr>
                  <td>Alınacak Şehir</td>
                  <td>{advert.productSpecialStartCity}</td>
                </tr>
              ) : (
                <tr>
                  <td>Hizmet Verilen İller</td>
                  <td>{advert.vehicleSpecialServiceCities}</td>
                </tr>
              )}
              {advert.isProduct ? (
                <tr>
                  <td>Bırakılacak Şehir</td>
                  <td>{advert.productSpecialEndCity}</td>
                </tr>
              ) : null}
              {advert.isProduct ? (
                <tr>
                  <td>Asansör Gerekli mi ?</td>
                  {advert.productSpecialIsElevatorNeeded === true ? (
                    <td>Evet</td>
                  ) : (
                    <td>Hayır</td>
                  )}
                </tr>
              ) : null}
              {advert.isProduct ? (
                <tr>
                  <td>Alınacak Kat</td>
                  <td>{advert.productSpecialStartFloor}</td>
                </tr>
              ) : null}
              {advert.isProduct ? (
                <tr>
                  <td>Bırakılacak Kat</td>
                  <td>{advert.productSpecialEndFloor}</td>
                </tr>
              ) : null}
              <tr>
                <td>Açıklama</td>
                <td>{advert.adDescription}</td>
              </tr>
            </tbody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdvertDetail;

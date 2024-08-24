import React, { useState } from "react";
import axios from "axios";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";
import { useAuth } from "../../context/auth-context/AuthContext";

import {
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const AddVehicleAdvertForm = () => {
  const { fetchData } = useAdverts();
  const { currentUser } = useAuth();
  const [newListing, setNewListing] = useState({
    id: "",
    name: "",
    post: "",
    pname: "",
    pbg: "primary.main",
    budget: "",
    selectedCities: [],
    description: "",
    image: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const citiesInTurkey = [
    "Tüm iller",
    "Marmara bölgesi",
    "Ege bölgesi",
    "Akdeniz bölgesi",
    "İç Anadolu bölgesi",
    "Karadeniz bölgesi",
    "Doğu bölgesi",
    "Güneydoğu Anadolu bölgesi",
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Aksaray",
    "Amasya",
    "Ankara",
    "Antalya",
    "Ardahan",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bartın",
    "Batman",
    "Bayburt",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Düzce",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Iğdır",
    "Isparta",
    "İstanbul",
    "İzmir",
    "Kahramanmaraş",
    "Karabük",
    "Karaman",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırıkkale",
    "Kırklareli",
    "Kırşehir",
    "Kilis",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Mardin",
    "Mersin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Osmaniye",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Şanlıurfa",
    "Şırnak",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Uşak",
    "Van",
    "Yalova",
    "Yozgat",
    "Zonguldak",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewListing((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setNewListing((prev) => ({
        ...prev,
        image: base64String, // Base64 formatına dönüştürülmüş resim
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAddListing = async () => {
    if (
      newListing.image === "" ||
      newListing.name === "" ||
      newListing.post === "" ||
      newListing.pname === "" ||
      newListing.budget === "" ||
      newListing.selectedCities.length === 0 ||
      newListing.description === ""
    ) {
      setSnackbarOpen(true);
      setSnackbarMessage("Lütfen tüm alanları doldurun");
      return;
    }

    const adData = {
      username: currentUser.username,
      adPhoto: newListing.image, 
      adTitle: newListing.name, 
      adDescription: newListing.description, 
      budget: newListing.budget, 
      isProduct: false, // Araç ilanı olduğunu belirtiyoruz
      vehicleSpecialLicensePlate: newListing.post, 
      vehicleSpecialType: newListing.pname,
      vehicleSpecialServiceCities: newListing.selectedCities.toString(),
    };

    axios
      .post("http://localhost:3000/ads/add", adData)
      .then(() => {
        setSnackbarMessage("Ürün başarıyla eklendi");
        setSnackbarOpen(true);
        setNewListing({
          id: "",
          name: "",
          post: "",
          pname: "",
          pbg: "primary.main",
          budget: "",
          selectedCities: [],
          description: "",
          image: "",
        });
        setEditing(false);
        fetchData();
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setSnackbarMessage(
          "Ürün eklenirken bir hata oluştu: " + error.response.data.message
        );
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Card variant="outlined" sx={{ padding:"50px 10rem", mb: 4 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "900", color: "#1976d2" }}
            >
              Araç İlanı Ekle
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <Box component="form" noValidate autoComplete="off">
            <Button variant="contained" component="label">
              Resim Ekle
              <input type="file" multiple onChange={handleImageChange} hidden />
            </Button>
            {newListing.image ? (
              <Box display="flex" justifyContent="center">
                <img
                  src={newListing.image} // Base64 formatındaki görsel
                  alt="Görsel"
                  style={{
                    width: "300px",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Box>
            ) : (
              <Box display="flex" justifyContent="center">
                <br />
              </Box>
            )}
            <br/>
            <TextField
              label="Firma Adı"
              name="name"
              value={newListing.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Plaka"
              name="post"
              value={newListing.post}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Araç Türü</InputLabel>
              <Select
                variant="outlined"
                label="Araç Türü"
                value={newListing.pname}
                onChange={handleChange}
                name="pname"
              >
                <MenuItem value="Tır">Tır</MenuItem>
                <MenuItem value="Kamyon">Kamyon</MenuItem>
                <MenuItem value="Kamyonet">Kamyonet</MenuItem>
                <MenuItem value="Panelvan">Panelvan</MenuItem>
                <MenuItem value="Minibüs">Minibüs</MenuItem>
                <MenuItem value="Otomobil">Otomobil</MenuItem>
                <MenuItem value="Karavan">Karavan</MenuItem>
                <MenuItem value="Motosiklet">Motosiklet</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="city-label">
                Hangi İllere Hizmet Verilecek?
              </InputLabel>
              <Select
                labelId="city-label"
                label="Hangi İllere Hizmet Verilecek?"
                multiple
                value={newListing.selectedCities}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    selectedCities: e.target.value,
                  })
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {citiesInTurkey.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Açıklama"
              name="description"
              multiline
              rows={4}
              value={newListing.description}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Bütçe"
              name="budget"
              value={newListing.budget}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddListing}
            >
              {editing ? "İlanı Güncelle" : "İlan Ekle"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default AddVehicleAdvertForm;

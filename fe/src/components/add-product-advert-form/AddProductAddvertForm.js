import React, { useState } from "react";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Snackbar,
} from "@mui/material";
import {useAuth} from "../../context/auth-context/AuthContext";

const AddProductAddvertForm = () => {
  const { fetchData } = useAdverts();
  const {currentUser} = useAuth();
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    pname: "",
    budget: "",
    fromCity: "",
    toCity: "",
    description: "",
    elevatorRequired: "no",
    fromFloor: "",
    toFloor: "",
    deliveryDate: "",
    image: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const citiesInTurkey = [
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
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setNewProduct((prev) => ({
        ...prev,
        image: base64String, // Base64 formatına dönüştürülmüş resim
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    console.log(newProduct);
    if (
      newProduct.image === "" ||
      newProduct.name === "" ||
      newProduct.pname === "" ||
      newProduct.budget === "" ||
      newProduct.fromCity === "" ||
      newProduct.toCity === "" ||
      newProduct.description === "" ||
      newProduct.deliveryDate === ""
    ) {
      setSnackbarOpen(true);
      setSnackbarMessage("Lütfen tüm alanları doldurun");
      return;
    }

    const adData = {
      username: currentUser.username,
      adPhoto: newProduct.image, 
      adTitle: newProduct.name, 
      adDescription: newProduct.description, 
      budget: newProduct.budget, 
      isProduct: true,
      productSpecialType: newProduct.pname, 
      productSpecialDate: newProduct.deliveryDate, 
      productSpecialStartCity: newProduct.fromCity, 
      productSpecialEndCity: newProduct.toCity, 
      productSpecialIsElevatorNeeded:
        newProduct.elevatorRequired === "yes", 
      productSpecialStartFloor: parseInt(newProduct.fromFloor), 
      productSpecialEndFloor: parseInt(newProduct.toFloor), 
    };

    axios
      .post("http://localhost:3000/ads/add", adData)
      .then(() => {
        setSnackbarMessage("Ürün başarıyla eklendi");
        setSnackbarOpen(true);
        setNewProduct({
          id: "",
          name: "",
          pname: "",
          budget: "",
          fromCity: "",
          toCity: "",
          description: "",
          elevatorRequired: "no",
          fromFloor: "",
          toFloor: "",
          deliveryDate: "",
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
    <div>
      <Card variant="outlined" sx={{ padding:"50px 10rem" }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "900", color:"#1976d2" }}>
              Eşya İlanı Ekle
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form noValidate autoComplete="off">
            <Box>
              <Button variant="contained" component="label">
                Resim Ekle
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  hidden
                />
              </Button>
            </Box>
            {newProduct.image ? (
              <Box display="flex" justifyContent="center">
                <img
                  src={newProduct.image} // Base64 formatındaki görsel
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
            <br />
            <TextField
              id="product-name"
              label="Ürün Adı"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="product-type-label">Ürün Türü</InputLabel>
                  <Select
                    labelId="product-type-label"
                    id="product-type"
                    label="Ürün Türü"
                    name="pname"
                    value={newProduct.pname}
                    onChange={handleChange}
                  >
                    <MenuItem value="Dosya">Dosya</MenuItem>
                    <MenuItem value="Küçük paket">Küçük paket</MenuItem>
                    <MenuItem value="Büyük paket">Büyük paket</MenuItem>
                    <MenuItem value="Beyaz eşya">Beyaz eşya</MenuItem>
                    <MenuItem value="Tek parça mobilya">
                      Tek parça mobilya
                    </MenuItem>
                    <MenuItem value="Mobilyalar">Mobilyalar</MenuItem>
                    <MenuItem value="Tüm ev taşımacılığı">
                      Tüm ev taşımacılığı
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="delivery-date"
                  label="Hangi tarihte düşünüyorsunuz?"
                  name="deliveryDate"
                  type="date"
                  value={newProduct.deliveryDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="from-city-label">
                    Hangi İlden alınacak?
                  </InputLabel>
                  <Select
                    labelId="from-city-label"
                    id="from-city"
                    label="Hangi İlden alınacak?"
                    name="fromCity"
                    value={newProduct.fromCity}
                    onChange={handleChange}
                  >
                    {citiesInTurkey.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="to-city-label">
                    Hangi İle bırakılacak?
                  </InputLabel>
                  <Select
                    labelId="to-city-label"
                    id="to-city"
                    label="Hangi İle bırakılacak?"
                    name="toCity"
                    value={newProduct.toCity}
                    onChange={handleChange}
                  >
                    {citiesInTurkey.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Asansör Gerekli mi?
              </Typography>
              <RadioGroup
                aria-label="elevatorRequired"
                name="elevatorRequired"
                value={newProduct.elevatorRequired}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Evet"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="Hayır"
                />
              </RadioGroup>
            </FormControl>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField
                  id="from-floor"
                  label="Alınacak kat"
                  name="fromFloor"
                  value={newProduct.fromFloor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="to-floor"
                  label="Bırakılacak kat"
                  name="toFloor"
                  value={newProduct.toFloor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              id="product-budget"
              label="Bütçe"
              name="budget"
              value={newProduct.budget}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="product-description"
              label="Açıklama"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              sx={{ mb: 2 }}
            >
              {editing ? "Güncelle" : "Ekle"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
};

export default AddProductAddvertForm;

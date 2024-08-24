import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useAdverts } from "../../context/adverts-context/AdvertsContext";

export default function RowRadioButtonsGroup() {
  const { productAdverts, vehicleAdverts, allAdverts, setAdverts } = useAdverts();
  const [selectedValue, setSelectedValue] = useState("tum-ilanlar");

  const handleAllAdvertsClick = () => {
    setSelectedValue("tum-ilanlar");
    setAdverts(allAdverts);
  };

  const handleProductAdvertsClick = () => {
    setSelectedValue("esya-ilanlari");
    setAdverts(productAdverts);
  };

  const handleVehicleAdvertsClick = () => {
    setSelectedValue("arac-ilanlari");
    setAdverts(vehicleAdverts);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={selectedValue}
      >
        <FormControlLabel
          onClick={handleAllAdvertsClick}
          value="tum-ilanlar"
          control={<Radio />}
          label="Tüm İlanlar"
          checked={selectedValue === "tum-ilanlar"}
        />
        <FormControlLabel
          onClick={handleProductAdvertsClick}
          value="esya-ilanlari"
          control={<Radio />}
          label="Eşya İlanları"
          checked={selectedValue === "esya-ilanlari"}
        />
        <FormControlLabel
          onClick={handleVehicleAdvertsClick}
          value="arac-ilanlari"
          control={<Radio />}
          label="Araç İlanları"
          checked={selectedValue === "arac-ilanlari"}
        />
      </RadioGroup>
    </FormControl>
  );
}

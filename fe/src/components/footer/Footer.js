import React from "react";
import { Box, Link } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import GooglePlayImage from "../../assets/images/Google_Play.png";
import AppStoreImage from "../../assets/images/appstore.png";

const Footer = () => {
  return (
    <footer className="footer">
      <Box className="box-container">
        <div className="box">
          <h3>Linkler</h3>
          <Link href="/">
            <FontAwesomeIcon icon={faArrowRight} /> Anasayfa{" "}
          </Link>
          <Link href="/hakkimda">
            <FontAwesomeIcon icon={faArrowRight} /> Hakkımızda{" "}
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faArrowRight} /> Gizlilik Politikası{" "}
          </Link>
        </div>

        <div className="box">
          <h3>Mobil uygulamalar</h3>
          <Link href="#">
            <img
              src={GooglePlayImage}
              height="40px"
              width="130px"
              alt="Google Play"
            />
          </Link>
          <Link href="#">
            <img
              src={AppStoreImage}
              height="40px"
              width="130px"
              alt="App Store"
            />
          </Link>
        </div>

        <div className="box">
          <h3>İletişim Bilgileri</h3>
          <Link href="#">
            <FontAwesomeIcon icon={faPhone} /> 0 (500) 000 00 00{" "}
          </Link>
          <Link href="#">
            <FontAwesomeIcon icon={faEnvelope} /> qulen@gmail.com{" "}
          </Link>
        </div>
      </Box>

      <div className="share">
        <Link href="https://www.facebook.com/" target="_blank">
          <FontAwesomeIcon icon={faFacebookF} />{" "}
        </Link>
        <Link href="https://twitter.com/" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />{" "}
        </Link>
        <Link href="https://www.instagram.com/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} />{" "}
        </Link>
        <Link href="https://www.linkedin.com/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} />{" "}
        </Link>
      </div>

      <div className="credit">
        <span>Fatmanur qulen</span> tarafından oluşturuldu. | Tüm Hakları
        Saklıdır!
      </div>
    </footer>
  );
};

export default Footer;

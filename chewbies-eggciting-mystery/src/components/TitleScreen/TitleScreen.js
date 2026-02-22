import "./TitleScreen.css";
import mysteryLogo from "../../assets/mystery game logo.png";
import mysteryLogoChewbie from "../../assets/mystery game logo chewbie.png";
import titleButton from "../../assets/buttons/hop-in-button.png";
import titleMobileButton from "../../assets/buttons/hop-in-mobile-button.png";
import titleChar from "../../assets/base/title page chewbie.png";

const TitleScreen = ({ onNext }) => {
  return (
    <div className="title-container">
      {/* <img
          className="mystery-char"
          src={titleChar}
          alt="Easter Game Chewbie Mascot"
        /> */}
      <div className="content-container">
        {/* <img
          className="mystery-logo"
          src={mysteryLogo}
          alt="Easter Game Logo"
        /> */}
        {/* <img
          className="mystery-logo-chewbie"
          src={mysteryLogoChewbie}
          alt="Easter Game Logo"
        /> */}
        <img
          className="title-button"
          onClick={onNext}
          src={titleButton}
          alt="Hop in!"
        />
        <img
          className="title-button-mobile"
          onClick={onNext}
          src={titleMobileButton}
          alt="Hop in!"
        />
      </div>
    </div>
  );
};

export default TitleScreen;

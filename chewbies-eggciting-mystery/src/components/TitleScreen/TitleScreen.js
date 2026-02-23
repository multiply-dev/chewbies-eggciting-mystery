import "./TitleScreen.css";
import easterLogo from "../../assets/base/title_logo.png";
import titleButton from "../../assets/buttons/hop-in-button.png";
import titleMobileButton from "../../assets/buttons/hop-in-mobile-button.png";

const TitleScreen = ({ onNext }) => {
  return (
    <div className="title-container">
      <div className="content-container">
        <img
          className="easter-logo"
          src={easterLogo}
          alt="Easter Game Logo"
        />
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

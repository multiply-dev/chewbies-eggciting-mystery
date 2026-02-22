import "./TitleScreen.css";
import mysteryLogo from "../../assets/mystery game logo.png";
import mysteryLogoChewbie from "../../assets/mystery game logo chewbie.png";
import titleButton from "../../assets/buttons/title_button.png";
import titleChar from "../../assets/base/title page chewbie.png";

const TitleScreen = ({ onNext }) => {
  return (
    <div className="title-container">
      <img
          className="mystery-char"
          src={titleChar}
          alt="Mystery Game Chewbie Mascot"
        />
      <div className="content-container">
        <img
          className="mystery-logo"
          src={mysteryLogo}
          alt="Mystery Game Logo"
        />
        <img
          className="mystery-logo-chewbie"
          src={mysteryLogoChewbie}
          alt="Mystery Game Logo"
        />
        <img
          className="title-button"
          onClick={onNext}
          src={titleButton}
          alt="Let's Play"
        />
      </div>
    </div>
  );
};

export default TitleScreen;

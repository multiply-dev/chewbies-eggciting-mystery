import "./EndScreen.css";
import endChewbie from "../../assets/base/end_chewbie.png";
import endText from "../../assets/base/end_text.png";
import endChewbieMobile from "../../assets/base/end_chewbie_mobile.png";
import learnButton from "../../assets/buttons/learn-button.png";

const EndScreen = ({ onReplay }) => {
  return (
    <div className="end-screen">
      <div className="text-container">
        <img src={endChewbie} alt="Chewbie Mascot Logo" className="end-logo" />
        <img src={endText} alt="Flavor Reveal on April 5" className="end-text" />
        <img src={endChewbieMobile} alt="Flavor Reveal on April 5" className="end-logo-mobile" />
        <a href="https://hi-chew.com/pages/hopintogiving" target="_blank" rel="noopener noreferrer">
          <img
            className="learn-button"
            src={learnButton}
            alt="Learn More"
          />
        </a>
      </div>
    </div>
  );
};

export default EndScreen;

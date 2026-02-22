import "./RulesScreen.css";
import beginButton from "../../assets/buttons/begin-button.png";

const RulesScreen = ({ onNext }) => {
  return (
    <div className="rules-screen">
      <img 
        onClick={onNext} 
        className="rules-button"
        src={beginButton} 
        alt="Happy Mixing" 
      />
        {/* <p className="disclaimer-text-small"><em>*NO PURCHASE NECESSARY. Void where prohibited. Open to legal residents of the 50 U.S. & D.C., [18+] years or older. Sweepstakes begins (09/08/2025) and ends (10/30/2025). Subject to Official Rules at HI-CHEW.com/pages/hopintogiving.</em></p> */}
    </div>
  );
};

export default RulesScreen;

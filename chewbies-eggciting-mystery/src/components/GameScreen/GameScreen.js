import "./GameScreen.css";
import gameBase from "../../assets/base/game_background_desktop.jpg";
import gameBaseMobile from "../../assets/base/game_background_mobile.jpg";
import eggSubmitButton from "../../assets/buttons/egg-submit-button.png";
import submitButton from "../../assets/buttons/submit-button.png";

const eggs = [
    "BLUE RASPBERRY", "BLUEBERRY", "COTTON CANDY", "DRAGON FRUIT", "FRUIT PUNCH",
    "GRAPE", "GREEN APPLE", "KeyLimePie", "LEMON", "LYCHEE", "MANGO", "ORANGE CREAMSICLE",
    "PEACH", "STRAWBERRY", "WATERMELON"
];

const GameScreen = ({ selectedEggs, onSelectEgg, onMix }) => {

  return (
    <div className="game-screen">
      {/* Background */}
      <img src={gameBase} alt="Game Background" className="game-bg" />
      <img src={gameBaseMobile} alt="Game Background" className="game-bg-mobile" />
      
      {selectedEggs.length > 0 && (
        <div className="chewbie-wrapper">

        {selectedEggs.length === 2 && (
          <>
            {/* Desktop Button */}
            <img
              className="submit-button submit-desktop"
              onClick={() => { if (selectedEggs.length >= 2) onMix(); }}
              src={eggSubmitButton}
              alt="Mix the Mystery"
            />

            {/* Mobile Button */}
            <img
              className="submit-button submit-mobile"
              onClick={() => { if (selectedEggs.length >= 2) onMix(); }}
              src={submitButton}
              alt="Mix the Mystery"
            />
          </>
        )}
        </div>
      )}

      <div className="egg-grid">
        {eggs.map((flavor) => {
          const isSelected = selectedEggs.some(p => p.flavor === flavor);
          const eggSrc = require(`../../assets/eggs/eggs_${flavor}.png`);

          return (
            <img
              key={flavor}
              src={eggSrc}
              alt={flavor}
              className={`egg-icon ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectEgg({ flavor, color: flavor })}
            />
          );
        })}
      </div>

    </div>
  );
};

export default GameScreen;

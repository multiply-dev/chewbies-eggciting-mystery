import "./GameScreen.css";
import gameBase from "../../assets/base/game_background_desktop.jpg";
import gameBaseMobile from "../../assets/base/game_background_mobile.jpg";
import eggSubmitButton from "../../assets/buttons/egg-submit-button.png";
import submitButton from "../../assets/buttons/submit-button.png";
import grass from "../../assets/base/grass.png";
import gameChewbie from "../../assets/base/game_chewbie.png";

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
      <img src={gameChewbie} alt="Game Chewbie" className="game-chewbie" />
      
      {selectedEggs.length >= 0 && (
        <div >

        {selectedEggs.length >= 0 && (
          <>
            {/* Desktop Button */}
            <div className={`submit-wrap ${selectedEggs.length === 2 ? "ready-to-mix" : ""}`}>
              <img
                className={`submit-button submit-desktop ${selectedEggs.length === 2 ? "ready-to-mix" : ""}`}
                onClick={() => { if (selectedEggs.length >= 2) onMix(); }}
                src={eggSubmitButton}
                alt="Mix the Mystery"
              />
            </div>

            {/* Mobile Button */}
            <div className={`submit-wrap ${selectedEggs.length === 2 ? "ready-to-mix" : ""}`}><img
              className={`submit-button submit-mobile ${selectedEggs.length === 2 ? "ready-to-mix" : ""}`}
              onClick={() => { if (selectedEggs.length >= 2) onMix(); }}
              src={submitButton}
              alt="Mix the Mystery"
            />
            </div>
          </>
        )}
        </div>
      )}

     <div className="egg-grid">
        {eggs.map((flavor) => {
          const isSelected = selectedEggs.some(p => p.flavor === flavor);
          const eggSrc = require(`../../assets/eggs/eggs_${flavor}.png`);

          return (
            <div
              key={flavor}
              className={`egg-cell ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectEgg({ flavor, color: flavor })}
            >
              <img
                src={eggSrc}
                alt={flavor}
                className="egg-icon"
              />

              {/* Grass overlay */}
              <img
                src={grass}
                alt=""
                className="egg-grass"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default GameScreen;

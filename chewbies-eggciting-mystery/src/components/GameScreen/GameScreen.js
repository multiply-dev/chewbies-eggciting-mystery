import { useState } from "react";
import "./GameScreen.css";
import gameBase from "../../assets/base/desktop background.png";
import gameBaseMobile from "../../assets/base/mobile background.png";
import shelves from "../../assets/base/potion shelves-desktop.png";
import shelf from "../../assets/base/mobile potion shelves.png";
import chewbieHollow from "../../assets/base/chewbie hollow.png";
import mixButton from "../../assets/buttons/mix_mystery_button.png";
import leftArrow from "../../assets/buttons/left.png";
import rightArrow from "../../assets/buttons/right.png";
import flavorImages from "../../utils/flavorImages.js";
import bubbleImages from "../../utils/bubbleImages.js";
import cauldronImages from "../../utils/cauldronImages.js";

const potions = [
    "Apple", "Banana", "Blue Raspberry", "Blueberry", "Candy Apple",
    "Cherry", "Grape", "Grapefruit", "Key Lime", "Kiwi", "Lemon",
    "Mai Thai", "Mango", "Orange", "Peach", "Pineapple", "Rainbow Sherbert",
    "Strawberry", "Watermelon", "Yuzu Lime"
];

const GameScreen = ({ selectedPotions, onSelectPotion, onMix }) => {
  const [startIndex, setStartIndex] = useState(0);

  const visiblePotions = potions.slice(startIndex, startIndex + 3);

  const canGoLeft = startIndex > 0;
  const canGoRight = startIndex + 3 < potions.length;

  const [direction, setDirection] = useState("right");

  const handleLeft = () => {
    if (canGoLeft) {
      setDirection("left");
      setStartIndex(prev => prev - 1);
    }
  };

  const handleRight = () => {
    if (canGoRight) {
      setDirection("right");
      setStartIndex(prev => prev + 1);
    }
  };


  return (
    <div className="game-screen">
      {/* Background */}
      <img src={gameBase} alt="Game Background" className="game-bg" />
      <img src={gameBaseMobile} alt="Game Background" className="game-bg-mobile" />
      <img src={shelves} alt="Shelves" className="shelves-img" />
      <img src={shelf} alt="Shelves" className="shelves-img-mobile" />
      
      
      {selectedPotions.length === 0 && (
        <div className="chewbie-wrapper">
          <img src={chewbieHollow} alt="Chewbie Default" className="chewbie-cauldron" />
        </div>
      )}
      
      
      {selectedPotions.length > 0 && (
        <div className="chewbie-wrapper">

          {/* Base image */}
          <img src={chewbieHollow} alt="Chewbie Cauldron" className="chewbie-cauldron" />

          {/* Bubbles */}
          {selectedPotions.length === 2 && (
            <img
              src={bubbleImages[selectedPotions[1].flavor]}
              alt={selectedPotions[1].flavor}
              className="bubbles-img"
            />
          )}

          {/* Flavor text 1 */}
          {selectedPotions.length > 0 && (
            <img
              src={flavorImages[selectedPotions[0].flavor]}
              alt={selectedPotions[0].flavor}
              className="flavor-img-1"
            />
          )}

          {/* Flavor text 2 */}
          {selectedPotions.length === 2 && (
            <img
              src={flavorImages[selectedPotions[1].flavor]}
              alt={selectedPotions[1].flavor}
              className="flavor-img-2"
            />
          )}

          {/* Flavor in cauldron */}
          {selectedPotions.length === 1  && (
            <img
              src={cauldronImages[selectedPotions[0].flavor]}
              alt={selectedPotions[0].flavor}
              className="cauldron-img"
            />
          )}

            {/* Mix Button */}
          {selectedPotions.length === 2  && (
            <img
              className="mix-button"
              onClick={() => { if (selectedPotions.length >= 2) onMix(); }}
              src={mixButton}
              alt="Mix the Mystery"
            />
          )}
        </div>
      )}


      {/* DESKTOP LAYOUT: 5 shelves of 4 potions */}
      {
        <div className="shelves">
          {Array.from({ length: 5 }).map((_, shelfIndex) => (
            <div className="shelf" key={shelfIndex}>
              {potions.slice(shelfIndex * 4, shelfIndex * 4 + 4).map(flavor => {
                const isSelected = selectedPotions.some(p => p.flavor === flavor);
                const potionSrc = isSelected
                  ? require(`../../assets/Potions/Selected/potion_Glow ${flavor}.png`)
                  : require(`../../assets/Potions/Standard/potion_${flavor}.png`);

                return (
                  <img
                    key={flavor}
                    src={potionSrc}
                    alt={flavor}
                    className={`potion-icon ${isSelected ? "selected" : ""}`}
                    onClick={() => onSelectPotion({ flavor, color: flavor })}
                  />
                );
              })}
            </div>
          ))}
        </div>
      }

      {/* MOBILE LAYOUT: horizontal carousel */}
      {
        <div className="shelves-mobile">
          <img
            src={leftArrow}
            alt="Left"
            className={`arrow left ${!canGoLeft ? "disabled" : ""}`}
            onClick={canGoLeft ? handleLeft : null}
          />

          <div className="carousel-row">
            {visiblePotions.map(flavor => {
              const isSelected = selectedPotions.some(p => p.flavor === flavor);
              const potionSrc = isSelected
                ? require(`../../assets/Potions/Selected/potion_Glow ${flavor}.png`)
                : require(`../../assets/Potions/Standard/potion_${flavor}.png`);

              return (
                <img
                  key={`${flavor}-${startIndex}`}
                  src={potionSrc}
                  alt={flavor}
                  className={`potion-icon ${direction === "left" ? "slide-left" : ""} ${isSelected ? "selected" : ""}`}
                  onClick={() => onSelectPotion({ flavor, color: flavor })}
                />
              );
            })}
          </div>

          <img
            src={rightArrow}
            alt="Right"
            className={`arrow right ${!canGoRight ? "disabled" : ""}`}
            onClick={canGoRight ? handleRight : null}
          />
        </div>
      }

    </div>
  );
};

export default GameScreen;

import { useState } from "react";
import TitleScreen from "./components/TitleScreen/TitleScreen";
import RulesScreen from "./components/RulesScreen/RulesScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import FormScreen from "./components/FormScreen/FormScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import potionSound from "./assets/sound effects/potion.mp3";
import mixingSound from "./assets/sound effects/mixing.wav";
import submissionSound from "./assets/sound effects/submission.wav";

function App() {
  const [currentScreen, setCurrentScreen] = useState("title");
  const [selectedPotions, setSelectedPotions] = useState([]);

  // Switch screen
  const goToScreen = (screen) => {
    setCurrentScreen(screen);
  };


  const handlePotionSelect = (potion) => {
    const audio = new Audio(potionSound);
    audio.play();

    let newSelections = [...selectedPotions];

    // check if potion is already selected
    const alreadySelected = newSelections.find(p => p.flavor === potion.flavor);

    if (alreadySelected) {
      // deselect by filtering it out
      newSelections = newSelections.filter(p => p.flavor !== potion.flavor);
    } else {
      if (newSelections.length < 2) {
        newSelections.push(potion);
      } else {
        newSelections = [potion]; // restart selection if already have 2
      }
    }

    setSelectedPotions(newSelections);
  };


  // Handle form submission
  const handleFormSubmit = () => {
    const audio = new Audio(submissionSound);
    audio.play();
    goToScreen("end");
  };

  return (
    <div className="App">
      {currentScreen === "title" && (
        <TitleScreen onNext={() => {
          const audio = new Audio(mixingSound);
          audio.play();
          goToScreen("rules")}
        } />
      )}

      {currentScreen === "rules" && (
        <RulesScreen onNext={() => {
          const audio = new Audio(mixingSound);
          audio.play();
          goToScreen("game")}
        } />
      )}

      {currentScreen === "game" && (
        <GameScreen
          selectedPotions={selectedPotions}
          onSelectPotion={handlePotionSelect}
          onMix={() => {
            const audio = new Audio(mixingSound);
            audio.play();
            goToScreen("form")}
          }
        />
      )}

      {currentScreen === "form" && (
        <FormScreen onSubmit={handleFormSubmit} selectedPotions={selectedPotions} onBack={() => {
          goToScreen("game")}
        } />
      )}

      {currentScreen === "end" && (
        <EndScreen />
      )}
    </div>
  );
}

export default App;

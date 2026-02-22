import { useState, useRef, useEffect } from "react";
import TitleScreen from "./components/TitleScreen/TitleScreen";
import RulesScreen from "./components/RulesScreen/RulesScreen";
import GameScreen from "./components/GameScreen/GameScreen";
import FormScreen from "./components/FormScreen/FormScreen";
import EndScreen from "./components/EndScreen/EndScreen";
import eggSelection1Sound from "./assets/sound effects/eggSelection1.mp3";
import eggSelection2Sound from "./assets/sound effects/eggSelection2.mp3";
import buttonSound from "./assets/sound effects/button.mp3";
import gameSound from "./assets/sound effects/backingtrack1.mp3";

function App() {
  const [currentScreen, setCurrentScreen] = useState("title");
  const [selectedEggs, setSelectedEggs] = useState([]);
  const bgAudioRef = useRef(null);
  const sfxTimeoutRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(gameSound);
    audio.loop = true;
    audio.volume = 0.4; // base volume
    bgAudioRef.current = audio;

    // Do not autoplay yet — browsers block it.
    return () => audio.pause();
  }, []);

  const startBackgroundMusic = () => {
    if (bgAudioRef.current && bgAudioRef.current.paused) {
      bgAudioRef.current.play().catch(() => {});
    }
  };

  const playSFX = (soundFile) => {
    if (!bgAudioRef.current) return;

    // Duck the background music
    bgAudioRef.current.volume = 0.15;

    const sfx = new Audio(soundFile);
    sfx.play();

    // Restore volume after SFX finishes
    clearTimeout(sfxTimeoutRef.current);
    sfxTimeoutRef.current = setTimeout(() => {
      if (bgAudioRef.current) {
        bgAudioRef.current.volume = 0.4;
      }
    }, 500); // adjust to match your SFX length
  };

  // Switch screen
  const goToScreen = (screen) => {
    setCurrentScreen(screen);
  };


  const handleEggSelect = (egg) => {

    let newSelections = [...selectedEggs];

    // check if egg is already selected
    const alreadySelected = newSelections.find(p => p.flavor === egg.flavor);
    const wasDeselect = !!alreadySelected;
    
    if (alreadySelected) {
      // deselect by filtering it out
      newSelections = newSelections.filter(p => p.flavor !== egg.flavor);
    } else {
      if (newSelections.length < 2) {
        newSelections.push(egg);
      } else {
        newSelections = [egg]; // restart selection if already have 2
      }
    }

    if (!wasDeselect) {
      if (newSelections.length === 1) {
        playSFX(eggSelection1Sound);
      } else if (newSelections.length === 2) {
        playSFX(eggSelection2Sound);
        
      }
    }

    setSelectedEggs(newSelections);
  };


  // Handle form submission
  const handleFormSubmit = () => {
    playSFX(buttonSound);
    goToScreen("end");
  };

  return (
    <div className="App">
      {currentScreen === "title" && (
        <TitleScreen onNext={() => {
          startBackgroundMusic();
          playSFX(buttonSound);
          goToScreen("rules");
        }} />
      )}

      {currentScreen === "rules" && (
        <RulesScreen onNext={() => {
          playSFX(buttonSound);
          goToScreen("game")}
        } />
      )}

      {currentScreen === "game" && (
        <GameScreen
          selectedEggs={selectedEggs}
          onSelectEgg={handleEggSelect}
          onMix={() => {
            playSFX(buttonSound);
            goToScreen("form")}
          }
        />
      )}

      {currentScreen === "form" && (
        <FormScreen onSubmit={handleFormSubmit} selectedEggs={selectedEggs} onBack={() => {
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

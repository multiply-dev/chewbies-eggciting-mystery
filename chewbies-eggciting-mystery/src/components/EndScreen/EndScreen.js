import "./EndScreen.css";
import goodluck from "../../assets/base/good luck.png";

const EndScreen = ({ onReplay }) => {
  return (
    <div className="end-screen">
      <div className="smoke" />
      <div className="chewbie" />
      <div className="text-container">
        <h1 className="submit-text">Your guess has been submitted!</h1>
        <img src={goodluck} alt="Good Luck" className="good-luck" />
      </div>
    </div>
  );
};

export default EndScreen;

import "./FormScreen.css";
import submitButton from "../../assets/buttons/submit-button.png";
import enterText from "../../assets/base/Form_Text.png";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import grass from "../../assets/base/grass.png";
import gameChewbie from "../../assets/base/game_chewbie.png";

const eggs = [
  "BLUE RASPBERRY", "BLUEBERRY", "COTTON CANDY", "DRAGON FRUIT", "FRUIT PUNCH",
  "GRAPE", "GREEN APPLE", "KeyLimePie", "LEMON", "LYCHEE", "MANGO", "ORANGE CREAMSICLE",
  "PEACH", "STRAWBERRY", "WATERMELON"
];

const PROXY_URL = "https://chewbies-eggciting-mystery.vercel.app/api/subscribe";

const FormScreen = ({ onSubmit, selectedEggs, onBack }) => {
  const captchaKey = process.env.REACT_APP_CAPTCHA_KEY;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!captchaToken) {
      alert("Please complete reCAPTCHA");
      setIsSubmitting(false);
      return;
    }

    const mysGuess = selectedEggs[0].flavor + ", " + selectedEggs[1].flavor;

    try {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, lname, email, flavor, mysGuess, captchaToken }),
      });

      const data = await res.json();

      if (res.ok) {
        onSubmit();
      } else {
        setError(data.error || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-screen">
      <img src={gameChewbie} alt="Game Chewbie" className="form-chewbie" />
      <div className="egg-grid-form">
        {eggs.map((flavor) => {
          const eggSrc = require(`../../assets/eggs/eggs_${flavor}.png`);
          return (
            <div key={flavor} className="egg-cell-form">
              <img src={eggSrc} alt={flavor} className="egg-icon-form" />
              <img src={grass} alt="" className="egg-grass-form" aria-hidden="true" />
            </div>
          );
        })}
      </div>

      <div className="form-content-container">
        <div className="header-text">
          <img src={enterText} alt="Enter for a chance to win!" className="last-step" />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form
          id="mc-embedded-subscribe-form"
          className="form-container"
          name="mc-embedded-subscribe-form"
          onSubmit={handleSubmit}
        >
          <div className="questions-container">
            <div className="sign-up-text">Sign up for our newsletter<sup>*</sup></div>
            <input
              id="mce-FNAME"
              name="FNAME"
              type="text"
              value={fname}
              onChange={(e) => setFName(e.target.value)}
              placeholder="First Name"
              required
            />
            <input
              id="mce-LNAME"
              name="LNAME"
              type="text"
              value={lname}
              onChange={(e) => setLName(e.target.value)}
              placeholder="Last Name"
              required
            />
            <input
              id="mce-EMAIL"
              name="EMAIL"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <input
              id="mce-FLAVOR"
              name="FLAVOR"
              type="text"
              value={flavor}
              onChange={(e) => setFlavor(e.target.value)}
              placeholder="Favorite Flavor"
              required
            />
          </div>

          <ReCAPTCHA
            sitekey={captchaKey}
            onChange={(token) => setCaptchaToken(token)}
          />

          <button className="form-submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : <img src={submitButton} alt="Submit" />}
          </button>
        </form>

        <p className="disclaimer-text">
          <em>*NO PURCHASE NECESSARY. Void where prohibited. Open to legal residents of the 50 U.S. & D.C., [18+] years or older. Sweepstakes begins (02/24/2026) and ends (04/04/2026). Subject to Official Rules at HI-CHEW.com/pages/hopintogiving.</em>
        </p>
      </div>
    </div>
  );
};

export default FormScreen;
import "./FormScreen.css";
import submitButton from "../../assets/buttons/submit.png";
import laststep from "../../assets/base/Last Step.png";
import chewbieHollow from "../../assets/base/chewbie hollow.png";
import flavorImages from "../../utils/flavorImages.js";
import bubbleImages from "../../utils/bubbleImages.js";
import cauldronImages from "../../utils/cauldronImages.js";
import backButton from "../../assets/buttons/back.png";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import jsonp from 'jsonp';

const FormScreen = ({ onSubmit, selectedPotions, onBack }) => {
  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const captchaKey = process.env.REACT_APP_CAPTCHA_KEY;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [honeypot, setHoneypot] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = e => {
    setIsSubmitting(true);
    setError(null);
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete reCAPTCHA");
      setIsSubmitting(false);
      return;
    }
    if (honeypot !== "") {
      // Bot detected
      setIsSubmitting(false);
      return;
    }

    const url = MailchimpURL;
    const formName = encodeURIComponent("ChewbiesEggcitingMystery");
    const guess = selectedPotions[0].flavor + ", " + selectedPotions[1].flavor
    jsonp(`${url}&FNAME=${fname}&LNAME=${lname}&EMAIL=${email}&FORM=${formName}&FLAVOR=${flavor}&MYS_GUESS=${guess}&ACCEPTS_MARKETING=true`, { param: 'c' }, (err, data) => {
      if (err) {
        // Handle error
        setIsSubmitting(false);
        setError('An error occurred. Please try again.');
      } else {
        setIsSubmitting(false);
        onSubmit();
      }  
    });
  };

  return (
    <div className="form-screen">
      
      {selectedPotions.length > 0 && (
        <div className="form-chewbie-wrapper">

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

        </div>
      )}

      <img
        className="back-button"
        onClick={() => { if (selectedPotions.length >= 2) onBack(); }}
        src={backButton}
        alt="Go Back"
      />

      <div className="form-content-container">
        <div className="header-text">
        <img src={laststep} alt="Last Step" className="last-step" />
        <h1 className='question-text'>FILL OUT YOUR INFO FOR A CHANCE TO WIN</h1>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form 
            id="mc-embedded-subscribe-form" 
            className="form-container"
            name="mc-embedded-subscribe-form"
            onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
            />
          </div>

          <ReCAPTCHA
              sitekey={captchaKey}
              onChange={(token) => setCaptchaToken(token)}
          />

          <button className="submit-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : <img src={submitButton} alt="Submit" />}
          </button>
        </form>

        <p className="disclaimer-text"><em>*NO PURCHASE NECESSARY. Void where prohibited. Open to legal residents of the 50 U.S. & D.C., [18+] years or older. Sweepstakes begins (09/08/2025) and ends (10/30/2025). Subject to Official Rules at HI-CHEW.com/pages/hopintogiving.</em></p>
      </div>
    </div>
  );
};

export default FormScreen;
import "./FormScreen.css";
import submitButton from "../../assets/buttons/submit-button.png";
import enterText from "../../assets/base/Form_Text.png";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import jsonp from 'jsonp';

const FormScreen = ({ onSubmit, selectedEggs, onBack }) => {
  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const captchaKey = process.env.REACT_APP_CAPTCHA_KEY;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
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

    const url = MailchimpURL;
    const formName = encodeURIComponent("ChewbiesEggcitingMystery");
    const guess = selectedEggs[0].flavor + ", " + selectedEggs[1].flavor
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

      <div className="form-content-container">
        <div className="header-text">
        <img src={enterText} alt="Enter for a chance to win!" className="last-step" />
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
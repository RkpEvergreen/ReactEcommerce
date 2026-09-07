import {useState} from "react";

function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

return (
    <div className="top-banner">
      <div className="top-banner-content">
        <span> Sign up and get 20% off your first order.{" "}
            <a href="/register">Sign Up Now</a>
        </span>
        <button
                    type="button"
                    className="top-banner-close"
                    onClick={() => setIsVisible(false)}
                    aria-label="Close promotion"
                >
                    ×
                </button>
      </div>
    </div>
  );
}

export default TopBanner;
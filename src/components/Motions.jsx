import React from "react";

const Motions = ({ motion }) => {
  function onFavoriteClick() {
    // Placeholder for favorite click logic
    alert("Favorite clicked!");
  }

  return (
    <div className="motion">
      <div className="motion-content">
        <img src={motion.url} alt={motion.title} />
        <div>
          <button className="favorite-btn" onClick={onFavoriteClick}>
            ♥
          </button>
        </div>
      </div>
      <div className="motion-details">
        <h3>{motion.title}</h3>
        <p>{motion.description}</p>
      </div>
    </div>
  );
};

export default Motions;

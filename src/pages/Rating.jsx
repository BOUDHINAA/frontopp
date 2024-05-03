import React, { useState } from 'react';

const RatingComponent = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (event) => {
    switch (event.key) {
      case '1':
        setRating('poor');
        break;
      case '2':
        setRating('fair');
        break;
      case '3':
        setRating('good');
        break;
      case '4':
        setRating('very good');
        break;
      case '5':
        setRating('excellent');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <p>Please rate the quality:</p>
      <p>
        1 - Poor<br />
        2 - Fair<br />
        3 - Good<br />
        4 - Very Good<br />
        5 - Excellent
      </p>
      <p>Selected rating: {rating}</p>
      <p>Press a number key (1-5) to rate:</p>
      <input type="text" onKeyDown={handleRating} />
    </div>
  );
};

export default RatingComponent;

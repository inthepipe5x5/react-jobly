/*
Helper functions for frontend
*/

const capitalizeWord = (word) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  const final = firstLetterCap + remainingLetters;
  return final;
};

export { capitalizeWord };

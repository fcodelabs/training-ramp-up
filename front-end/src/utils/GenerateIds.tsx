const usedIDs: number[] = [];

export const generateID = () => {
  let randomID;
  do {
    randomID = Math.floor(Math.random() * 40);
  } while (usedIDs.includes(randomID));

  usedIDs.push(randomID);
  return randomID;
};

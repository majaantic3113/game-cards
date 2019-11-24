import { CARD_VALUES } from '../config';

// helpers
export const chunkArray = (myArray, chunkSize) => {
  const tempArray = [];

  for (let index = 0; index < myArray.length; index += chunkSize) {
    tempArray.push(myArray.slice(index, index + chunkSize));
  }

  return tempArray;
};

export const findGreatestCard = cards => {
  let max = cards[0];

  const checkPlayers = (element, max) => {
    const elemUser = element.user;
    const maxUser = max.user;

    return +elemUser.substr(-1) > +maxUser.substr(-1) ? element : max;
  };

  cards.forEach(element => {
    const currCardValue = CARD_VALUES[element.card.value];

    if (currCardValue > CARD_VALUES[max.card.value]) {
      max = element;
    }
    if (currCardValue === CARD_VALUES[max.card.value]) {
      max = checkPlayers(element, max);
    }
  });

  return max;
};

export const getWinner = players => {
  let winner = null;
  let max = 0;

  for (const player in players) {
    if (!winner || players[player].score > max) {
      winner = player;
      max = players[player].score;
    }
  }
  return winner;
};

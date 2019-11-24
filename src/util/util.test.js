import { chunkArray, findGreatestCard, getWinner } from './util';

describe('util test', () => {
  it('should split array in correct number of chunks', () => {
    const testArray = [1, 2, 3, 4];

    expect(chunkArray(testArray, 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('should find winner card in round', () => {
    const cardsOnTable = [
      { user: 'player1', card: { value: 'ACE' } },
      { user: 'player2', card: { value: 'QUEEN' } },
      { user: 'player3', card: { value: 'JACK' } },
    ];

    expect(findGreatestCard(cardsOnTable)).toEqual({
      user: 'player2',
      card: { value: 'QUEEN' },
    });
  });

  it('should find winner card in round when two players have the same card', () => {
    const cardsOnTable = [
      { user: 'player1', card: { value: 'JACK' } },
      { user: 'player2', card: { value: 'ACE' } },
      { user: 'player3', card: { value: 'JACK' } },
    ];

    expect(findGreatestCard(cardsOnTable)).toEqual({
      user: 'player3',
      card: { value: 'JACK' },
    });
  });

  it('should find user with max score', () => {
    const players = {
      player1: { cards: [], score: 100 },
      player2: { cards: [], score: 50 },
    };

    expect(getWinner(players)).toEqual('player1');
  });
});

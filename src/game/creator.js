import {
  addPCWin, addUserWin, gameInProgress, getGameMode, getGameWinners, setBoard,
} from './action';
import getRandomInt from './utils';

export function startGameCycle() {
  return (dispatch, getState) => {
    const { initArray, listIndex, modeInform } = getState().game;
    const random = getRandomInt(listIndex.length - 1);
    const timeOutId = setTimeout(() => {
      dispatch(PCWin());
    }, modeInform.delay);

    initArray[listIndex[random]].active = true;

    dispatch(setBoard({
      initArray: [...initArray],
      listIndex: [...listIndex],
      randomIndex: random,
      timeOutId,
    }));
  };
}

function PCWin() {
  return (dispatch, getState) => {
    const { randomIndex, initArray, listIndex } = getState().game;

    initArray[listIndex[randomIndex]].active = false;
    initArray[listIndex[randomIndex]].PCWin = true;
    listIndex.splice(randomIndex, 1);
    dispatch(setBoard({
      initArray: [...initArray],
      listIndex: [...listIndex],
      timeOutId: null,
    }));
    dispatch(startGameCycle());
    dispatch(addPCWin());
    dispatch(checkWinner());
  };
}

export function userWin(index) {
  return (dispatch, getState) => {
    const {
      randomIndex, initArray, listIndex, timeOutId,
    } = getState().game;

    if (index === listIndex[randomIndex]) {
      initArray[listIndex[randomIndex]].active = false;
      initArray[listIndex[randomIndex]].userWin = true;
      clearTimeout(timeOutId);
      listIndex.splice(randomIndex, 1);
      dispatch(setBoard({
        initArray: [...initArray],
        listIndex: [...listIndex],
        timeOutId: null,
      }));
      dispatch(startGameCycle());
      dispatch(addUserWin());
      dispatch(checkWinner());
    }
  };
}

export function startGame() {
  return (dispatch, getState) => {
    const { modeInform, timeOutId } = getState().game;
    const cellsCount = modeInform.field * modeInform.field;
    const listIndex = [];
    const initArray = Array(cellsCount)
      .fill({})
      .map((item, index) => {
        listIndex.push(index);

        return { active: false, PCWin: false, userWin: false };
      });

    clearTimeout(timeOutId);
    dispatch(setBoard({ initArray, listIndex }));
    dispatch(startGameCycle());
  };
}

export const getGameModeThunk = () => (dispatch) => {
  fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
    .then(res => res.json())
    .then((response) => {
      dispatch(getGameMode(response));
    })
    .catch(error => error);
};

export const getGameWinnersThunk = () => (dispatch) => {
  fetch('https://starnavi-frontend-test-task.herokuapp.com/winners')
    .then(res => res.json())
    .then((response) => {
      dispatch(getGameWinners(response));
    })
    .catch(error => error);
};

export const sendGameWinnersThunk = winner => (dispatch) => {
  fetch('https://starnavi-frontend-test-task.herokuapp.com/winners', {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((response) => {
      dispatch(getGameWinners(response));
    })
    .catch(error => error);
};

function checkWinner() {
  return (dispatch, getState) => {
    const {
      timeOutId, initArray, counter, activeUser,
    } = getState().game;

    if (counter.user > (initArray.length / 2) || counter.PC > (initArray.length / 2)) {
      const winner = counter.user > (initArray.length / 2) ? activeUser : 'PC';
      const d = new Date();
      const date = `${d.getHours()}:${d.getMinutes()}; ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

      dispatch(sendGameWinnersThunk({
        winner,
        date,
      }));
      clearTimeout(timeOutId);
      dispatch(gameInProgress(false));
      dispatch(setBoard({
        initArray: [],
        listIndex: [],
        randomIndex: null,
        timeOutId: null,
      }));
    }
  };
}

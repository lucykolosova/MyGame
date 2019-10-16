export const gameType = {
  getMode: 'GET_MODE',
  getWinners: 'GET_WINNERS',
  addPlayer: 'ADD_PLAYER',
  setMode: 'SET_MODE',
  setBoard: 'SET_BOARD',
  userWin: 'USER_WIN',
  PCWin: 'PC_WIN',
  inProgress: 'GAME_IN_PROGRESS',
};

export function getGameMode(payload) {
  return {
    type: gameType.getMode,
    payload,
  };
}

export function getGameWinners(payload) {
  return {
    type: gameType.getWinners,
    payload,
  };
}

export function addNewPlayer(payload) {
  return {
    type: gameType.addPlayer,
    payload,
  };
}

export function setActiveMode(payload) {
  return {
    type: gameType.setMode,
    payload,
  };
}

export function setBoard(payload) {
  return {
    type: gameType.setBoard,
    payload,
  };
}

export function addUserWin() {
  return {
    type: gameType.userWin,
  };
}

export function addPCWin() {
  return {
    type: gameType.PCWin,
  };
}

export function gameInProgress(payload) {
  return {
    type: gameType.inProgress,
    payload,
  };
}

import { gameType } from './action';

const stateInit = {
  initArray: [],
  listIndex: [],
  modes: null,
  activeMode: '',
  winners: [],
  activeUser: '',
  modeInform: null,
  randomIndex: null,
  counter: {
    user: 0,
    PC: 0,
  },
  timeOutId: null,
  inProgress: false,
};

export default function gameReducer(state = stateInit, action) {
  switch (action.type) {
    case gameType.getMode:
      return {
        ...state,
        modes: action.payload,
      };

    case gameType.getWinners:
      return {
        ...state,
        winners: [...action.payload],
      };

    case gameType.addPlayer:
      return {
        ...state,
        activeUser: action.payload.user,
      };

    case gameType.setMode:
      return {
        ...state,
        activeMode: action.payload,
        modeInform: state.modes[`${action.payload}Mode`],
      };

    case gameType.setBoard:
      // payload: {initArray, listIndex, randomIndex?}
      return {
        ...state,
        ...action.payload,
      };

    case gameType.userWin: {
      return {
        ...state,
        counter: {
          user: state.counter.user + 1,
          PC: state.counter.PC,
        },
      };
    }

    case gameType.PCWin: {
      return {
        ...state,
        counter: {
          user: state.counter.user,
          PC: state.counter.PC + 1,
        },
      };
    }

    case gameType.inProgress: {
      return {
        ...state,
        inProgress: action.payload,
        counter: {
          user: 0,
          PC: 0,
        },
      };
    }

    default:
      return state;
  }
}

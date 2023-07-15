import { ActionTypes } from "../action/actiontype";
const initialstate = {
  questionList: [],
  currentCount: 0,
  score: 0,
};

export const quizReducer = (
  state = initialstate,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.INCREASECOUNT:
      return { ...state, currentCount: state.currentCount + 1 };
    case ActionTypes.SETQUESTION:
      return { ...state, questionList: payload };
      case ActionTypes.TOTALSCORE:
      return { ...state, score: payload };
      case ActionTypes.RESETCOUNT:
      return { ...state, currentCount: 0 };
    default:
      return state;
  }
};
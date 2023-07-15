import {ActionTypes} from './actiontype';
export const increaseCount = () => {
  return {
    type: ActionTypes.INCREASECOUNT,
    payload: 0,
  };
};

export const totalScore = () => {
  return {
    type: ActionTypes.TOTALSCORE,
    payload: 0,
  };
};

 export const setQuestion = (questionList) => ({
  type: ActionTypes.SETQUESTION,
  payload: questionList,
}); 

export const resetCount = () => {
  return {
    type: ActionTypes.RESETCOUNT,
    payload: 0,
  };
};




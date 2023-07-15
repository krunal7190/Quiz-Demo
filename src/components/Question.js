import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { increaseCount } from '../redux/action/action';
import { resetCount } from '../redux/action/action';
import { useNavigate } from 'react-router-dom';
function Question(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.quiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
     if (selectedAnswer === data.questionList[currentQuestion].correctAnswer) {
      // Increase score or perform any other logic for correct answer
      setScore((prevScore) => prevScore + 1);
      dispatch(increaseCount())

    } else {
      // Perform logic for wrong answer
    } 
 
    if (currentQuestion === data.questionList.length - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    }
 
  };

  const renderChoices = (choices, correctAnswer, selectedAnswer) => {
    const isCurrentQuestionSelected = selectedAnswer !== '';
    return choices.map((choice, index) => {
      const isCurrent = choice === data.questionList[currentQuestion];
      const isCorrect = choice === correctAnswer;
      const isSelected = selectedAnswer === choice;
      let choiceClass =  '';

      if (isSelected) {
        choiceClass += 'selected ';
        if (isCorrect) {
          choiceClass += 'correct';
        } else {
          choiceClass += 'wrong';
        }
      } else if (isCorrect) {
        choiceClass = 'correct';
      }

      
      if (isCurrentQuestionSelected && isSelected) {
        choiceClass += ' selected';
      } else if (isCurrentQuestionSelected) {
        choiceClass += ' not-clickable';
      }
      return (
        <li
          key={index}
          className={choiceClass} 
          onClick={() => {handleAnswerSelection(choice);}} 
        >
          {choice}
        </li>
      );
    });
  };
  
 
  const finishQuiz = () => {
    
    navigate('/');
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setShowResults(false);
    setScore(0);
    dispatch(resetCount());
    setSelectedQuestions([]);
  };

  return (
    <div className='quiz-form'>
      <div className='result-header'>
         
        {showResults ? (
        <div className='score-count'>Your Score: {score}/{data.questionList.length}</div>) : (<div className='correct-answer-count'>Correct Answer : {data.currentCount}</div>)}
      </div>
      <p></p>
      <div>
        {showResults ? (
          <div className='quiz-result-wrapper'>
            <h2>Quiz Quetions Results</h2> 
            {data.questionList.map((question, index) => (
              <div key={index} className="question-wrapper">
                <div className='question-text-wrapper'>
                <div className="question-number"><span>{index + 1}</span></div>
                <div className="question-text">{question.question}</div>
                </div>
                
                <ul className="question-choices">
                  {renderChoices(
                    question.choices,
                    question.correctAnswer,
                    selectedAnswer
                  )}
                </ul> 
              </div>
            ))}
            <button onClick={finishQuiz}>Finish Quiz</button>
          </div>
        ) : (
          <div className='question-appearing'>
            <h2>Quiz Page</h2> 
            <div  className="question-wrapper">
                
                <div><span>Question {currentQuestion + 1}</span></div>
                <div className="question-text ">{data.questionList[currentQuestion].question}</div>
                
            <ul  className="question-choices">{renderChoices(data.questionList[currentQuestion].choices, selectedAnswer)}</ul>
            </div>
            <button onClick={handleNextQuestion} disabled={!selectedAnswer}>
              Next Question
            </button>
          </div>
        )}
      </div>


    </div>
  );
}

export default Question;

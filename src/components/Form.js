import React, { useState } from 'react';
import axios from 'axios';
import he from 'he';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { setQuestions } from '../actions/quizActions';
import { setQuestion } from '../redux/action/action';

function Form() {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector((state) => state.quiz);



    /* const handleSubmit = (e) => {
        e.preventDefault();
        // Fetch quiz data from the API and decode it
        // Assuming you have a function `fetchQuizData` to handle API fetch

        const quizData = fetchQuizData(category, difficulty); // Implement the API fetch
        console.log('data ' + quizData);
        dispatch(setQuestion(quizData));
        //console.log('test' , data.questionList);
        //navigate('/question');

        
    }; */

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const quizData = await fetchQuizData(category, difficulty);
          console.log('data', quizData);
          dispatch(setQuestion(quizData));
          console.log('data q', data.questionList);

          navigate('/question');
        } catch (error) {
          console.error(error);
          // Handle error state or display error message to the user
        }
      };

    const fetchQuizData = async (category, difficulty) => {
        try {
            const apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&encode=base64`;
            const response = await axios.get(apiUrl);

            const data = response.data;
            if (data.response_code !== 0) {
                throw new Error('Failed to fetch quiz data');
            }

            const decodedData = decodeQuizData(data.results);

            return decodedData;
        } catch (error) {
            console.error(error);
            // Handle error state or display error message to the user
            return [];
        }
    };

    const decodeQuizData = (results) => {
        return results.map((result) => {
            const decodedQuestion = decodeBase64(result.question);
            const decodedCorrectAnswer = decodeBase64(result.correct_answer);
            const decodedIncorrectAnswers = result.incorrect_answers.map((answer) => decodeBase64(answer));

            return {
                question: decodedQuestion,
                choices: shuffleArray([decodedCorrectAnswer, ...decodedIncorrectAnswers]),
                correctAnswer: decodedCorrectAnswer,
            };
        });
    };

    const decodeBase64 = (data) => {
        const decodedString = atob(data);
        const decodedHTML = he.decode(decodedString);
        return decodedHTML;
      };

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    };


    return (
        <div className='quiz-form'>
            <h1>Quiz Form</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='fomr-label'>
                        Category:
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            {/* Add more category options as needed */}
                        </select>
                    </label>
                </div>
                <div className='form-group'>
                    <label className='fomr-label'>
                        Difficulty:
                        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="">Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>
                <br/>
                <button type="submit">Start Quiz</button>
            </form>
        </div>
    );
}

export default Form;

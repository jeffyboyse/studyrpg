import React, { useState } from 'react';
import Confetti from 'react-confetti';

export default function QuizModal({ subject, questions, bonusXP, onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.a) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    const totalBonus = Math.round((score / questions.length) * bonusXP);
    // Här kan vi senare skicka bonus till backend, men för MVP visar vi bara
    alert(`Du fick ${totalBonus} bonus XP! (${score}/${questions.length} rätt)`);
    setTimeout(onClose, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Quiz: {subject}</h2>
        
        {questions.map((q, index) => (
          <div key={index} className="mb-8">
            <p className="font-medium mb-3">{q.q}</p>
            <div className="grid grid-cols-2 gap-3">
              {q.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswer(index, option)}
                  className={`p-4 rounded-2xl text-left transition-all ${
                    answers[index] === option 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length !== questions.length}
          className="w-full py-5 bg-green-600 text-white font-bold text-xl rounded-3xl hover:bg-green-700 disabled:opacity-50"
        >
          Skicka svar och få bonus XP
        </button>
      </div>
    </div>
  );
}
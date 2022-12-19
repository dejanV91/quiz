import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const { waiting, loading, questions, index, correct, nextQuestion } =
    useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <div className="loading"></div>;
  }
  const { question, correct_answer, incorrect_answers } = questions[index];
  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct}/{index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;

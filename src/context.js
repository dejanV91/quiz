import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const url = "";
const tempUrl =
  "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(tempUrl).catch((error) => console.log(error));
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setLoading(false);
        setWaiting(false);
        setQuestions(data);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      console.log(error);
    }
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;

      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const handleCheck = (value) => {
    if (value) {
      setCorrect((oldValue) => oldValue + 1);
    }
    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCorrect(0);
    setWaiting(true);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        handleCheck,
        closeModal,
        openModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

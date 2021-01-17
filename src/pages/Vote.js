import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { API } from 'aws-amplify';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { getQuestion } from '../graphql/queries';
import { vote } from '../graphql/mutations';

const initialQuestion = {
  id: "",
  title: "",
  description: "",
  options: []
};

const Vote = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(initialQuestion);
  const [votedIndex, setVotedIndex] = useState(null);
  const [existsQuestion, setExistsQuestion] = useState(true);

  useEffect(() => {
    const init = async () => {
      const result = await API.graphql({ query: getQuestion, variables: { id: id } });
      if (result.data.getQuestion) setQuestion(result.data.getQuestion);
      else setExistsQuestion(false);

      const currentVotedIndex = Cookies.get(id);
      if (typeof currentVotedIndex !== "undefined") setVotedIndex(currentVotedIndex);
    };
    init();
  }, [id]);

  const sendVote = async (index) => {
    if (votedIndex !== null) return;
    let votedQuestion = question;
    votedQuestion.options[index].votes += 1;
    setQuestion(votedQuestion);
    setVotedIndex(index);

    Cookies.set(id, index, { expires: 365, secure: true });
    try {
      const result = await API.graphql({ query: vote, variables: { id: question.id, index: index } });
      if (result.data.vote) setQuestion(result.data.vote);
    } catch (e) {
      console.log(e);
    }
  };

  if (!existsQuestion) return (
    <div className="Vote">
      <p>Questionnaire does not exist</p>
      <Link to="/">Back to home</Link>
    </div>
  );

  return (
    <div className="Vote">
      <h1>vote</h1>
      <p>{question.title}</p>
      <p>{question.description}</p>
      {votedIndex === null ?
        question.options.map((option) => (
          <div key={option.index}>
            <span>{option.title}</span>
            <button onClick={() => sendVote(option.index)}>Vote</button>
          </div>
        )) :
        question.options.map((option) => (
          <div key={option.index}>
            <span>{option.title}</span>
            <span>{option.votes}</span>
          </div>
        ))
      }
    </div>
  );
};;

export default Vote;

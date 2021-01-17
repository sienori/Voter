import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { API } from 'aws-amplify';
import { postQuestion } from '../graphql/mutations';


const initialFormState = { title: '', description: '' };
const Post = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [options, setOptions] = useState([""]);
  const [isPosting, setIsPosting] = useState(false);
  const history = useHistory();

  const addOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
  };

  const createQuestion = async () => {
    if (isPosting) return;
    setIsPosting(true);

    const input = {
      title: formData.title,
      description: formData.description,
      options: options
    };

    try {
      const result = await API.graphql({ query: postQuestion, variables: input });
      const id = result.data.postQuestion.id;
      setIsPosting(false);
      history.push(`/vote/${id}`);
    } catch (e) {
      console.log(e.errors);
      setIsPosting(false);
    }
  };

  return (
    <div className="Post">
      <h1>Post</h1>
      <h2>Title</h2>
      <input
        onChange={e => setFormData({ ...formData, 'title': e.target.value })}
        placeholder="Question title"
        value={formData.title}
      />
      <h2>Description</h2>
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
        placeholder="Question description"
        value={formData.description}
      />
      <h2>Options</h2>
      {options.map((option, index) => (
        <input
          onChange={e => {
            let newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
          placeholder="option"
          value={option}
          key={index}
        />
      ))}

      <button onClick={addOption}>Add option</button>

      <br />
      <button onClick={createQuestion}>Create questionnaire</button>
    </div>
  );
};;

export default Post;

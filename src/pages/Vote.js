import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { getQuestion } from '../graphql/queries';
import { vote } from '../graphql/mutations';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import HowToVote from '@material-ui/icons/HowToVote';
import Button from '@material-ui/core/Button';
import VoteResult from './VoteResult';


const MainCard = styled(Card)({
  padding: 10,
  minHeight: "200px"
});

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
  const [selectedValue, setSelectedValue] = useState("0");
  const [existsQuestion, setExistsQuestion] = useState(true);
  document.title = `Voter | ${question.title}`;

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
    <Card>
      <CardContent>
        <Typography variant="h6">質問が見つかりませんでした。</Typography>
        <Typography variant="body2">URLが間違っている可能性があります。</Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button component={Link} to="/" variant="contained" color="primary">ホームに戻る</Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <MainCard>
      <CardContent>
        <Box mb={2}>
          <Typography variant="h4">{question.title}</Typography>
          <Typography variant="subtitle1">{question.description}</Typography>
        </Box>
        {votedIndex === null ?
          <Box>
            <FormControl >
              <RadioGroup
                value={selectedValue}
                onChange={e => { setSelectedValue(e.target.value); }}>
                {question.options.map(option => (
                  <FormControlLabel
                    value={option.index.toString()}
                    control={<Radio color="primary" />}
                    label={option.title}
                    key={option.index} />
                ))}
              </RadioGroup>
            </FormControl>
            {question.options.length > 0 &&
              (<Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => sendVote(selectedValue)}
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<HowToVote />}
                >投票する</Button>
              </Box>)}
          </Box>
          : <VoteResult question={question} votedIndex={parseInt(votedIndex)} />
        }
      </CardContent>
    </MainCard>
  );
};;

export default Vote;

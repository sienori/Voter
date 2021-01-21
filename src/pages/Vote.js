import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { API, Analytics } from 'aws-amplify';
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
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import Tooltip from '@material-ui/core/Tooltip';
import VoteResult from './VoteResult';
import ShareButtons from '../components/ShareButtons';
import slugid from 'slugid';


const MainCard = styled(Card)({
  padding: 10,
  minHeight: "200px"
});

const initialQuestion = {
  id: "",
  title: "",
  description: "",
  options: { items: [] }
};

const Vote = () => {
  const { encodedId } = useParams();
  const [id] = useState(slugid.decode(encodedId));
  const [question, setQuestion] = useState(initialQuestion);
  const [votedIndex, setVotedIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState("0");
  const [existsQuestion, setExistsQuestion] = useState(true);
  const location = useLocation();
  const { isCreated } = location.state || false;
  document.title = `Voter | ${question.title}`;

  useEffect(() => {
    const init = async () => {
      const result = await API.graphql({ query: getQuestion, variables: { id: id } })
        .catch(e => console.log(e));
      if (result?.data?.getQuestion) setQuestion(result.data.getQuestion);
      else setExistsQuestion(false);

      const currentVotedIndex = Cookies.get(id);
      if (typeof currentVotedIndex !== "undefined") setVotedIndex(currentVotedIndex);
    };
    init();
  }, [id]);

  const sendVote = async (index) => {
    index = parseInt(index);
    if (votedIndex !== null) return;
    let votedQuestion = question;
    const optionIndex = votedQuestion.options.items.findIndex(option => option.index === index);
    votedQuestion.options.items[optionIndex].votes += 1;
    setQuestion(votedQuestion);
    setVotedIndexToCookie(index);

    try {
      const result = await API.graphql({
        query: vote,
        variables: {
          optionId: question.options.items[optionIndex].id
        }
      });
      Analytics.record({ name: "vote" });
      if (result.data.vote) setQuestion(result.data.vote);
    } catch (e) {
      console.log(e);
    }
  };

  const setVotedIndexToCookie = (index) => {
    setVotedIndex(index);
    Cookies.set(id, index, { expires: 365, secure: true });
  };

  const handleReload = async () => {
    const result = await API.graphql({ query: getQuestion, variables: { id: id } })
      .catch(e => console.log(e));
    if (result?.data?.getQuestion) setQuestion(result.data.getQuestion);
  };

  if (!existsQuestion) return (
    <Card>
      <CardContent>
        <Typography variant="h6">投票が見つかりませんでした。</Typography>
        <Typography variant="body2">URLが間違っている可能性があります。</Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button component={Link} to="/" variant="contained" color="primary">ホームに戻る</Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {isCreated &&
        <Box m={2}>
          <Typography variant="h5">投票が作成されました！</Typography>
          <Typography variant="body2">URLを友達にシェアしましょう。</Typography>
        </Box>
      }
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
                  {question.options.items
                    .sort((a, b) => a.index - b.index)
                    .map(option => (
                      <FormControlLabel
                        value={option.index.toString()}
                        control={<Radio color="primary" />}
                        label={option.title}
                        key={option.index} />
                    ))}
                </RadioGroup>
              </FormControl>
              {question.options.items.length > 0 && (
                <Box display="flex" justifyContent="flex-end">
                  <Box textAlign="center">
                    {isCreated &&
                      <Box mr={1} clone>
                        <Button
                          onClick={() => setVotedIndexToCookie(-1)}
                          size="large">投票結果を見る</Button>
                      </Box>
                    }
                    <Button
                      onClick={() => sendVote(selectedValue)}
                      variant="contained"
                      color="primary"
                      size="large"
                      startIcon={<HowToVote />}
                    >投票する</Button>
                  </Box>
                </Box>)}
            </Box>
            : <Box>
              <VoteResult question={question} votedIndex={parseInt(votedIndex)} />
              <Box display="flex" justifyContent="flex-end">
                <Tooltip title="更新" arrow>
                  <IconButton onClick={handleReload} size="small">
                    <ReplayIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          }
        </CardContent>
      </MainCard>
      <Box m={2} display="flex" justifyContent="flex-end">
        <ShareButtons
          url={window.location.href}
          description={`Voterで投票${isCreated ? "を作成" : ""}しました！ - ${question.title}`} />
      </Box>
    </Box>
  );
};;

export default Vote;

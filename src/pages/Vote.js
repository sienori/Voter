import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
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
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
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
  const location = useLocation();
  const { isCreated } = location.state || false;
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
    setVotedIndexToCookie(index);

    try {
      const result = await API.graphql({ query: vote, variables: { id: question.id, index: index } });
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
    const result = await API.graphql({ query: getQuestion, variables: { id: id } });
    if (result.data.getQuestion) setQuestion(result.data.getQuestion);
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
    <Box>
      {isCreated && (
        <Box mb={2}>
          <MainCard>
            <CardContent>
              <Typography variant="h6">アンケートが作成されました！</Typography>
              <Typography variant="body2">URLをお友達にシェアしましょう。</Typography>
              <Box m={3} textAlign="center">
                <QRCode value={window.location.href} />
              </Box>
              <Box display="flex" alignItems="center">
                <TextField defaultValue={window.location.href} fullWidth margin="dense" variant="outlined" />
                <CopyToClipboard text={window.location.href}>
                  <Button style={{ flexShrink: 0 }}>URLをコピー</Button>
                </CopyToClipboard>
              </Box>
            </CardContent>
          </MainCard>
        </Box>
      )}
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
              {question.options.length > 0 && (
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
    </Box>
  );
};;

export default Vote;

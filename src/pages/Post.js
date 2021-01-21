import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { API, Analytics } from 'aws-amplify';
import { postQuestion } from '../graphql/mutations';
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import slugid from 'slugid';

const MainCard = styled(Card)({
  padding: 10
});

const initialFormState = { title: '', description: '' };
const optionPlaceholders = ["犬", "猫"];

const Post = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [options, setOptions] = useState(["", ""]);
  const [isPosting, setIsPosting] = useState(false);
  const [shouldShowError, setShouldShowError] = useState(false);
  const history = useHistory();
  document.title = "Voter | 投票を作成";

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
      const id = result.data.postQuestion;
      setIsPosting(false);
      Analytics.record({ name: "post_question" });
      history.push({ pathname: `/vote/${slugid.encode(id)}`, state: { isCreated: true } });
    } catch (e) {
      console.log(e.errors);
      setIsPosting(false);
      setShouldShowError(true);
    }
  };

  return (
    <MainCard>
      <CardContent>
        <Box mb={4}>
          <Typography variant="h4">投票を作成</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">タイトル</Typography>
          <TextField
            onChange={e => setFormData({ ...formData, 'title': e.target.value })}
            value={formData.title}
            error={shouldShowError && !formData.title}
            helperText={shouldShowError && !formData.title && "タイトルが必要です"}
            fullWidth
            placeholder="好きな動物は？"
          />
        </Box>

        <Box mb={2}>
          <Typography variant="subtitle2">説明文</Typography>
          <TextField
            onChange={e => setFormData({ ...formData, 'description': e.target.value })}
            value={formData.description}
            fullWidth
          />
        </Box>

        <Typography variant="subtitle2">選択肢</Typography>
        <List>
          {options.map((option, index) => (
            <ListItem key={index}>
              <ListItemIcon>{index + 1}</ListItemIcon>
              <TextField
                onChange={e => {
                  let newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
                error={shouldShowError && !options[index] && options.filter(o => o).length < 2}
                helperText={shouldShowError && !options[index] && options.filter(o => o).length < 2 && "選択肢が必要です"}
                value={option}
                placeholder={optionPlaceholders[index] || `選択肢 ${index + 1}`}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemIcon>{options.length + 1}</ListItemIcon>
            <Button
              onClick={addOption}
            >
              選択肢を追加
                </Button>
          </ListItem>
        </List>

        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={createQuestion}
            disabled={isPosting}
            variant="contained"
            color="primary"
            size="large"
          >
            投票を作成
              </Button>
        </Box>
      </CardContent>
    </MainCard>
  );
};;

export default Post;

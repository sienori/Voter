import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Home = () => {
  document.title = "Voter";

  return (
    <Box>
      <Typography variant="h4">
        Voterへようこそ！
      </Typography>
      <Box mt={1}>
        <Typography variant="subtitle1">
          Voterはログイン不要ですぐに使えるアンケート作成ツールです。
      </Typography>
      </Box>

      <Box mt={2}>

        <Button
          component={Link}
          to={"/post"}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          mt="50px"
        >
          アンケートを作成
        </Button>

      </Box>
    </Box>
  );
};;

export default Home;

import React, { useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { amber } from "@material-ui/core/colors";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const ListItemNoPadding = styled(ListItem)({
  paddingRight: 0,
  paddingLeft: 0
});

const Chart = styled(Box)({
  backgroundColor: amber["500"],
  height: "82%",
  position: "absolute",
  borderRadius: "4px",
  transition: "width 1000ms"
});

const ChartContent = styled(Box)({
  zIndex: 1,
  paddingLeft: "12px",
  paddingRight: "12px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

const Votes = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
  "& svg": {
    marginRight: "2px"
  }
});

const VoteResult = (props) => {
  const { question, votedIndex } = props;
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const total = question.options
      .reduce((acc, cur) => ({ votes: acc.votes + cur.votes }));
    setTotalVotes(total.votes);
  }, [question]);

  return (
    <List>
      {question.options.map((option) => (
        <ListItemNoPadding key={option.index}>
          <Chart width={`${totalVotes > 0 ? option.votes / totalVotes * 100 : 0}%`} />
          <ChartContent>
            <Typography variant="subtitle1">{option.title}</Typography>
            <Votes>
              {votedIndex === option.index && <CheckCircleOutlineIcon fontSize="small" />}
              <Typography variant="subtitle1">{`${option.votes}票`}</Typography>
            </Votes>
          </ChartContent>
        </ListItemNoPadding >
      ))}
    </List >
  );
};;

export default VoteResult;

import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

const defaultTileData = [
  {
    title: 'Tammiuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Helmikuu',
    howManyBallotsWereHeld: 0,
  },
  {
    title: 'Maaliskuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Huhtikuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Toukokuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Kesäkuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Heinäkuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Elokuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Syyskuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Lokakuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Marraskuu',
    howManyBallotsWereHeld: 0
  },
  {
    title: 'Joulukuu',
    howManyBallotsWereHeld: 0
  },
];

const AdvancedGridList = (props) => {
  const classes = useStyles();

  const [sortingIsDone, setSortingIsDone] = useState(false);
  const [tileData, setTileData] = useState(defaultTileData);
  const [sortedBallots, setSortedBallots] = useState([]);
    

  const getMonthFromAanestysAlkuaika = (aanestysAlkuaika) => aanestysAlkuaika.split('-')[1];

    const getBallotsSortedByMonthArray = (ballots) => {
      console.log("getBallotsSortedByMonthArray o/");
      console.log(ballots);
        if (ballots) {
            const newSortedBallots = [
                [],[],[],[],
                [],[],[],[],
                [],[],[],[],
            ];

            const newTileData = defaultTileData;
    
            ballots.map((ballot) => {
                console.log(getMonthFromAanestysAlkuaika(ballot.aanestysAlkuaika));
                switch (getMonthFromAanestysAlkuaika(ballot.aanestysAlkuaika)) {
                    case '01':
                        newSortedBallots[0].push(ballot);
                        newTileData[0].howManyBallotsWereHeld += 1;
                    case '02':
                        newSortedBallots[1].push(ballot);
                        newTileData[1].howManyBallotsWereHeld += 1;
                    case '03':
                        newSortedBallots[2].push(ballot);
                        newTileData[2].howManyBallotsWereHeld += 1;
                    case '04':
                        newSortedBallots[3].push(ballot);
                        newTileData[3].howManyBallotsWereHeld += 1;
                    case '05':
                        newSortedBallots[4].push(ballot);
                        newTileData[4].howManyBallotsWereHeld += 1;
                    case '06':
                        newSortedBallots[5].push(ballot);
                        newTileData[5].howManyBallotsWereHeld += 1;
                    case '07':
                        newSortedBallots[6].push(ballot);
                        newTileData[6].howManyBallotsWereHeld += 1;
                    case '08':
                        newSortedBallots[7].push(ballot);
                        newTileData[7].howManyBallotsWereHeld += 1;
                    case '09':
                        newSortedBallots[8].push(ballot);
                        newTileData[8].howManyBallotsWereHeld += 1;
                    case '10':
                        newSortedBallots[9].push(ballot);
                        newTileData[9].howManyBallotsWereHeld += 1;
                    case '11':
                        newSortedBallots[10].push(ballot);
                        newTileData[10].howManyBallotsWereHeld += 1;
                    case '12':
                        newSortedBallots[11].push(ballot);
                        newTileData[11].howManyBallotsWereHeld += 1;
                }
            });
            //setBallotSortedByMonthIsReady(true);
    
            setSortedBallots(newSortedBallots);
            setTileData(newTileData);
            console.log(newTileData);
            setSortingIsDone(true);
        }
    };
  //const tileData = props.tileData;
/*
{tileData.map((tile) => (
          <GridListTile key={tile.id} cols={1} rows={1} style={{ border: 'solid black 2px' }}>
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionPosition="left"
              className={classes.titleBar}
            />
            <h2>{tile.howManyBallotsWereHeld === 0 ? 'loading' : tile.howManyBallotsWereHeld}</h2>
          </GridListTile>
        ))}
*/
  useEffect(() => {
    console.log("ue props:");
    console.log(props);
    getBallotsSortedByMonthArray(props.ballots);
  }, []);

  if (!sortingIsDone) {
    return <div>sorting...</div>;
  }
  return (
    <div className={classes.root}>
      <GridList cellHeight={'200'} spacing={1} className={classes.gridList}>
      {tileData.map((tile) => (
          <GridListTile key={tile.id} cols={1} rows={1} style={{ border: 'solid black 2px' }}>
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionPosition="left"
              className={classes.titleBar}
            />
            <h2>{tile.howManyBallotsWereHeld === 0 ? 'loading' : tile.howManyBallotsWereHeld}</h2>
          </GridListTile>
        ))}
        </GridList>
    </div>
  );
}

export default AdvancedGridList;
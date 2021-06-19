import { Box, Card, createStyles, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Theme, Typography } from "@material-ui/core"
import React from "react"
import { updateRelationAction } from "./TradeReducer";
import { Relation, TradeState } from "./Types";

interface Props {
    tradeState: TradeState;
    dispatch: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      width: 180
    },
    root: {
        maxWidth: 350,
        background: '#274472',
        //position: '-webkit-sticky',
        position: 'sticky',
        top: 20,
        bottom: 20, 
        paddingTop: '40px',
        paddingBottom: '40px',
        zIndex: 5,
    },
    table: {
        maxWidth: 300,
        background: '#274472',
        borderTopWidth: 0
    },
    thead: {
      borderBottomColor: '#000'
    }
  }),
);

export const Relations = ({tradeState, dispatch}: Props) => {
    const classes = useStyles();

    const updateRelationValue = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, relation: Relation, isPersonal: boolean) => {
        const updatedRelations = [...tradeState.Relations];  
        let updatedValue: number = parseInt(event.currentTarget.value);     
       
        if(isPersonal){
            relation.Personal = updatedValue;
        } else {
            relation.Political = updatedValue;
        }


        for(let u in updatedRelations){
            if(relation.Race === updatedRelations[u].Race){
                updatedRelations[u] = relation;
            }
        }
        dispatch(updateRelationAction(updatedRelations));       
    }

    // const handleChange = () => {
    //   dispatch({Type: ActionType.UpdateIncrementRelations, Payload: { isIncremented: !tradeState.IncrementRelations }});
    // }

    return (
        <Card className={classes.root}>
        <Box m={1} p={1}>
        <Typography variant="h5">
            Port Relations
        </Typography>
        {/* <FormControlLabel
          control={
            <Switch
              checked={tradeState.IncrementRelations}
              onChange={handleChange}
              name="checkedB"
              color="primary"
            />}
          label="Increment"
        /> */}
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  className={classes.thead}></TableCell>
              <TableCell align="left"  className={classes.thead}>Personal</TableCell>
              <TableCell align="left"  className={classes.thead}>Political</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tradeState.Relations.map((row) => (
              <TableRow key={row.Race} >
                <TableCell component="th" scope="row" className={classes.thead}>
                  {row.Race}
                </TableCell>
                <TableCell align="right"  className={classes.thead}>
                  <TextField  inputProps={{min: 0, style: { textAlign: 'center' }}} value={row.Personal} onChange={(e) => updateRelationValue(e, row, true)} />
                  </TableCell>
                <TableCell align="right"  className={classes.thead}>
                  <TextField  inputProps={{min: 0, style: { textAlign: 'center' }}} value={row.Political} onChange={(e) => updateRelationValue(e, row, false)} />
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
      </Card>
    )
}
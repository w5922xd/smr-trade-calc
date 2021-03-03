import { Card, CardContent, CardHeader, createStyles, Grid, makeStyles, TextField, Theme, Typography } from "@material-ui/core"
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
        background: '#274472'
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

    const buildList = tradeState.Relations.map(r => {
        return (            
            <Grid container>
                <Grid item>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Typography variant="subtitle2">
                                {r.Race}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField label="Personal Relations" value={r.Personal} onChange={(e) => updateRelationValue(e, r, true)} />
                        </Grid>
                        <Grid item>
                            <TextField label="Political Relations" value={r.Political} onChange={(e) => updateRelationValue(e, r, false)} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    });;

    return (
        <Card className={classes.root}  color="#61dafb">
            <CardHeader>Relations</CardHeader>
        <CardContent>
            <Grid container spacing={0}>             
                <Grid item>
                  {buildList}  
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    )
}
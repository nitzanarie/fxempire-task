import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CandleStickChart from './CandleStickChart'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

const tabsLabels = ["one minute", "five minutes", "one hour", "one week"];
const timeStamps = ["MIN_1", "MIN_5", "HOUR_1", "WEEK_1"];

class SimpleTabs extends React.Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    createTabs(){
        return tabsLabels.map(item => <Tab key={item} label={item} />)
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} centered={true}>
                        {this.createTabs()}
                    </Tabs>
                </AppBar>
                <CandleStickChart timeStamp={timeStamps[value]}/>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleTabs);
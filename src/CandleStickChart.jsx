import React, {Fragment} from 'react';
import Chart from 'react-google-charts';
import moment from 'moment';


const timeStampsFormats = {
    "MIN_1": "dd HH:mm",
    "MIN_5": "dd HH:mm",
    "HOUR_1": "MM/DD hhA",
    "WEEK_1": "MMM Do YY",
};
export default class CandleStickChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['', '', '', '', ''],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.timeStamp !== this.props.timeStamp) {
            this.fetchData();
        }
    }

    async fetchData() {
        const response = await fetch(`https://www.fxempire.com/api/v1/en/markets/eur-usd/chart?time=${this.props.timeStamp}`);
        const json = await response.json();
        const data = json.map(item =>
            [this.parseDate(item.date), item.low, item.open, item.close, item.high]
        ).reverse();
        this.setState({data});
    }

    parseDate(date) {
        return moment(date).format(timeStampsFormats[this.props.timeStamp]);
    }

    render() {
        return (
            <Fragment>
                <div style={{
                    textAlign: 'center',
                    paddingTop: '3%',
                    fontWeight: 'bold'
                }}>EUR/USD</div>
                <Chart
                    width={'100%'}
                    height={350}
                    chartType="CandlestickChart"
                    loader={<div>Loading Chart</div>}
                    data={[['', '', '', '', ''], ...this.state.data]}
                    options={{
                        legend: 'none',
                        hAxis: {viewWindow: {max: 30}},
                        chartArea: {
                            top: '5%'
                        }
                    }}
                    rootProps={{'data-testid': '1'}}
                />
            </Fragment>
        );
    }
}

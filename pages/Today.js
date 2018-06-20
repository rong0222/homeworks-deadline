import moment from 'moment'
const today = moment().add(3, 'days').calendar();
const date = moment().add(3, 'days').format('YYYY-MM-DD')

export default () =>
    <div>
        <h1>10 days later: {today}</h1>
        <h3>10 days later: {date}</h3>
    </div>
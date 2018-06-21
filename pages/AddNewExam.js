import { Component } from 'react'

class HomePage extends Component {
    constructor(props) {
        super(props)
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    static defaultProps = {
        messages: []
    }

    // init state with the prefetched messages
    state = {
        field: '',
        fieldDate: '',
        messages: this.props.messages
    }

    // connect to WS server and listen event
    componentDidMount() {
    }

    // close socket connection
    componentWillUnmount() {
    }

    // add messages from server to the state
    handleMessage = (message) => {
        this.setState(state => ({ messages: state.messages.concat(message) }))
    }

    handleChange = event => {
        this.setState({ field: event.target.value })
    }

    handleDateChange = event => {
        this.setState({ fieldDate: event.target.value })
    }

    // send messages to server and add them to the state
    handleSubmit = event => {
        event.preventDefault()

        // create message object
        const message = {
            id: (new Date()).getTime(),
            value: this.state.field,
            date: this.state.fieldDate
        }

        // add it to state and clean current input value
        this.setState(state => ({
            messages: state.messages.concat(message)
        }))
    }

    render() {
        return (
            <main>
                <div>
                    <ul>
                        {this.state.messages.map(message =>
                            <li key={message.id}>{message.value} on {message.date}</li>
                        )}
                    </ul>
                    <h1>新增考試或作業名稱與日期</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            onChange={this.handleChange}
                            type='text'
                            placeholder='例如: 期末考'
                            value={this.state.field}
                        />
                        <p />
                        <input
                            onChange={this.handleDateChange}
                            type='text'
                            placeholder='例如: 2018-6-28'
                            value={this.state.fieldDate}
                        />
                        <p />
                        <button>新增</button>
                    </form>
                </div>
            </main>
        )
    }
}

export default HomePage
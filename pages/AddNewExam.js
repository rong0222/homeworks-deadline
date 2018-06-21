import { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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

    render() {

        const GET_CHANGE = gql`
        mutation NewExam($title: String!, $dueDate: DateTime!) {
            createExam(data: { title: $title, dueDate: $dueDate }) {
              id
              title
              createdAt
              dueDate
            }
          }
        `;

        return (
            <Mutation mutation={GET_CHANGE}>
                {createExam => (
                    <main>
                        <div>
                            <h1>新增考試或作業名稱與日期</h1>
                            <form
                                onSubmit={e => {
                                    const message = {
                                        id: (new Date()).getTime(),
                                        value: this.state.field,
                                        date: this.state.fieldDate
                                    }
                                    e.preventDefault();
                                    createExam({
                                        variables: {
                                            title: this.state.field,
                                            dueDate: this.state.fieldDate
                                        }
                                    }
                                    );
                                    this.setState(state => ({
                                        messages: state.messages.concat(message)
                                    }))
                                }
                                } >
                                名稱:<input
                                    onChange={this.handleChange}
                                    type='text'
                                    placeholder='例如: 期末考'
                                    value={this.state.field}
                                />
                                <p />
                                日期:<input
                                    onChange={this.handleDateChange}
                                    type='text'
                                    placeholder='例如: 2018-6-28'
                                    value={this.state.fieldDate}
                                />
                                <p />
                                <button>新增</button>

                                <h2>這次新增內容如下:</h2>
                                <ul>
                                    {this.state.messages.map(message =>
                                        <li key={message.id}>{message.value} on {message.date}</li>
                                    )}
                                </ul>
                            </form>
                        </div>
                    </main>
                )}
            </Mutation>
        )
    }
}

export default HomePage
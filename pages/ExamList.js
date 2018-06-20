import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CLIENT_RENEG_LIMIT } from 'tls';
import moment from 'moment';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and exams when it is ready
class examList extends React.Component {
render() {
  const { data: { loading, exams }, today, dueDate} = this.props;
  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (exams) {
    return (
      <ul>
        {exams.concat().sort((a, b) => ((moment(a.dueDate) < moment(b.dueDate))? -1: 1))
        .map(exam =>
          <li key={exam.id}>
            {'"' + exam.title + '"'} dued by {exam.dueDate} {' '}
          </li>
        )}
      </ul>
    );
  }
  }
}
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (examList here)
export default graphql(gql`
query duedExam($dueDate: DateTime!, $today: DateTime!) {
  exams(
    where: {
      AND: [
        { dueDate_lte: $dueDate }
        { dueDate_gt: $today }
      ]
    }
  ) {
    title
    dueDate
  }
}
`, {
    options:  (props) => ({ variables: { today:  props.today, dueDate: props.dueDate }})
  })(examList);

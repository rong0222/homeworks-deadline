import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CLIENT_RENEG_LIMIT } from 'tls';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and exams when it is ready
function examList({ data: { loading, exams } }) {
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {exams.concat().map(exam =>
          <li key={exam.id}>
            {'"' + exam.title + '"'} dued by {exam.dueDate} {' '}
          </li>
        )}
      </ul>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (examList here)
export default graphql(gql`
  {
    exams
    {
      id
      title
      dueDate
    }
  }
`)(examList);

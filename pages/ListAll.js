import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CLIENT_RENEG_LIMIT } from 'tls';
import moment from 'moment';
import { Mutation } from 'react-apollo';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and exams when it is ready
class examList extends React.Component {

  render() {
    const DO_DELETE = gql`
    mutation ($id: ID!){
      deleteExam (
        where: {
        id: $id
        }
      ) {
        id
      }
    }
    `;

    const { data: { loading, exams }, today, dueDate } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    } else {
      if (exams) {
        return (
          <Mutation mutation={DO_DELETE}>
          {createExam => (
          <div>
            <h2>刪除錯誤 Exams, 要 reload 才會看到刪除結果</h2>

            <ul>
              {exams.concat().sort((a, b) => ((moment(a.dueDate) < moment(b.dueDate)) ? -1 : 1))
                .map(exam =>
                  <li key={exam.id}>
                    {'"' + exam.title + '"'} dued by {exam.dueDate}
                    <button onClick={e => {
                      e.preventDefault();
                      createExam({
                        variables: {
                          id: exam.id
                        }
                      }
                      );
                    }}
                    >[刪除]</button>
                  </li>
                )}
            </ul>
          </div>
          )}
          </Mutation>
        );
      }
    }
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (examList here)
export default graphql(gql`
query dueExam {
  exams
   {
    id
    title
    dueDate
  }
}
`, )(examList);

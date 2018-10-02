import React from "react";
import { connect } from "react-redux";
import { usersFetched } from "./action";

// const ENDPOINT = "http://localhost:3000/users_fake_data.json";
const ENDPOINT = {
  "page": 2,
  "per_page": 3,
  "total": 12,
  "total_pages": 4,
  "data": [
      {
          "id": 4,
          "first_name": "Eve",
          "last_name": "Holt",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
      },
      {
          "id": 5,
          "first_name": "Charles",
          "last_name": "Morris",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
      },
      {
          "id": 6,
          "first_name": "Tracey",
          "last_name": "Ramos",
          "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
      }
  ]
};

class Users extends React.Component {
  componentWillMount() {
    const { users, fetchUsers } = this.props;

    if (users === null) {
      fetchUsers();
    }
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        {users &&
          users.length > 0 &&
          users.map(({ id, first_name: firstName, last_name: lastName }) => (
            <p key={id}>{`${firstName} ${lastName}`}</p>
          ))}
      </div>
    );
  }
}

const ConnectedApp = connect(
  state => ({
    users: state.users
  }),
  dispatch => ({
    fetchUsers: () =>
      dispatch(usersFetched(ENDPOINT))
  })
)(Users);

export default ConnectedApp;

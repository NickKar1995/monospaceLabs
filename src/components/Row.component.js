import Button from "react-bootstrap/Button";

const RowComponent = ({ users, updatePublished, checkUser }) => {
  const updateStatusHandler = (user) => {
    updatePublished(user);
  };

  if (!users && users.length === 0) {
    return <p>No user..</p>;
  }
  return (
    <>
      {users.map((user) => (
        <tr key={user.id}>
          <td>
            <input onClick={() => checkUser(user)} type="checkbox" />
          </td>
          <td>{`${user.username}`}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{`${user.phone}`}</td>
          <td>
            {/* <Button onClick={() => updateStatusHandler(user)} variant="primary">
              {user.phone ? "Deactivate" : "Activate"}
            </Button> */}

            {user.phone ? (
              <Button
                onClick={() => updateStatusHandler(user)}
                variant="danger"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                onClick={() => updateStatusHandler(user)}
                variant="success"
              >
                Activate
              </Button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default RowComponent;

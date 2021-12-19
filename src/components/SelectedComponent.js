import { useEffect, useState } from "react";

const SelectedComponent = ({ users }) => {
  const [selectedUserCount, setSelectedUserCount] = useState(0);

  useEffect(() => {
    if (users && users.length > 0) {
      const selectedUsers = users.filter((user) => {
        return user.selected === true;
      });
      setSelectedUserCount(selectedUsers.length);
    }
  }, [users]);

  return (
    <>
      <span>Selected:{selectedUserCount}</span>
    </>
  );
};

export default SelectedComponent;

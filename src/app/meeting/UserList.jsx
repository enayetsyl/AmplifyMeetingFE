import React from 'react';

function UserList({ users, onUserSelect }) {
  return (
    <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h3>Online Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.userId} onClick={() => onUserSelect(user)} style={{ cursor: 'pointer', padding: '5px 0' }}>
            {user.userName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

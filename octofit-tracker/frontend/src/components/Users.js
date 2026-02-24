import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
        console.log('Fetching from Users API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Users Data:', usersData);
        
        setUsers(usersData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card page-card">
        <div className="card-header">
          <i className="bi bi-people me-2"></i>User Directory
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="text-muted mb-0">
              Total Users: <span className="badge bg-primary">{users.length}</span>
            </p>
            <button className="btn btn-success btn-sm">
              <i className="bi bi-person-plus me-2"></i>Add User
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td><span className="badge bg-secondary">{user.id}</span></td>
                      <td className="fw-bold">
                        <i className="bi bi-person-circle me-2 text-primary"></i>
                        {user.username}
                      </td>
                      <td className="text-muted">{user.email}</td>
                      <td>
                        {user.team ? (
                          <span className="badge bg-success">{user.team}</span>
                        ) : (
                          <span className="badge bg-secondary">No Team</span>
                        )}
                      </td>
                      <td>{new Date(user.date_joined).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;

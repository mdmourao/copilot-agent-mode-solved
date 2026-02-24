import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching from Activities API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Activities Data:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading activities...</p>
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
          <i className="bi bi-activity me-2"></i>Activity Log
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="text-muted mb-0">
              Total Activities: <span className="badge bg-primary">{activities.length}</span>
            </p>
            <button className="btn btn-success btn-sm">
              <i className="bi bi-plus-circle me-2"></i>Add Activity
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <tr key={activity.id}>
                      <td><span className="badge bg-secondary">{activity.id}</span></td>
                      <td className="fw-bold">{activity.user}</td>
                      <td>
                        <span className="badge bg-info text-dark">{activity.activity_type}</span>
                      </td>
                      <td>{activity.duration} min</td>
                      <td><span className="text-danger fw-bold">{activity.calories}</span> cal</td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No activities found
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

export default Activities;

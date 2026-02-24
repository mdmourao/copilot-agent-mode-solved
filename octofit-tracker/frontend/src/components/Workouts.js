import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching from Workouts API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Workouts Data:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading workouts...</p>
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

  const getDifficultyBadge = (level) => {
    const badges = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'danger'
    };
    return badges[level] || 'secondary';
  };

  return (
    <div className="container">
      <div className="card page-card">
        <div className="card-header">
          <i className="bi bi-heart-pulse me-2"></i>Workout Library
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="text-muted mb-0">
              Available Workouts: <span className="badge bg-primary">{workouts.length}</span>
            </p>
            <button className="btn btn-success btn-sm">
              <i className="bi bi-plus-circle me-2"></i>Add Workout
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories/Hour</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length > 0 ? (
                  workouts.map((workout) => (
                    <tr key={workout.id}>
                      <td><span className="badge bg-secondary">{workout.id}</span></td>
                      <td className="fw-bold">
                        <i className="bi bi-fire me-2 text-danger"></i>
                        {workout.name}
                      </td>
                      <td>
                        <span className="badge bg-info text-dark">{workout.category}</span>
                      </td>
                      <td>
                        <span className={`badge bg-${getDifficultyBadge(workout.difficulty_level)}`}>
                          {workout.difficulty_level}
                        </span>
                      </td>
                      <td>{workout.duration} min</td>
                      <td className="text-danger fw-bold">{workout.calories_per_hour} cal/hr</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No workouts found
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

export default Workouts;

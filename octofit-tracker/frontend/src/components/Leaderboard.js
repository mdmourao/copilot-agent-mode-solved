import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching from Leaderboard API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard API Response:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed Leaderboard Data:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading leaderboard...</p>
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

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge badge-rank rank-1">🥇 {rank}</span>;
    if (rank === 2) return <span className="badge badge-rank rank-2">🥈 {rank}</span>;
    if (rank === 3) return <span className="badge badge-rank rank-3">🥉 {rank}</span>;
    return <span className="badge bg-secondary badge-rank">{rank}</span>;
  };

  return (
    <div className="container">
      <div className="card page-card">
        <div className="card-header">
          <i className="bi bi-trophy-fill me-2"></i>Fitness Leaderboard
        </div>
        <div className="card-body">
          <div className="alert alert-info mb-4" role="alert">
            <i className="bi bi-info-circle me-2"></i>
            <strong>Compete and climb!</strong> Track your progress and see how you rank against other users.
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th scope="col" width="15%">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Total Calories</th>
                  <th scope="col">Total Activities</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => {
                    const rank = index + 1;
                    const isTopThree = rank <= 3;
                    return (
                      <tr key={entry.id || index} className={isTopThree ? 'table-warning' : ''}>
                        <td>{getRankBadge(rank)}</td>
                        <td className="fw-bold">
                          <i className="bi bi-person-circle me-2 text-primary"></i>
                          {entry.user || entry.username}
                        </td>
                        <td>
                          <span className="text-danger fw-bold">
                            <i className="bi bi-fire me-1"></i>
                            {entry.total_calories}
                          </span>
                          <span className="text-muted"> calories</span>
                        </td>
                        <td>
                          <span className="badge bg-primary rounded-pill">
                            {entry.total_activities} activities
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                      No leaderboard data found
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

export default Leaderboard;

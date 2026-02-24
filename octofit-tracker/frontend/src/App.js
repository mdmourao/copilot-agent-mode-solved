import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div>
      <div className="hero-section">
        <div className="container">
          <h1 className="display-3">Welcome to OctoFit Tracker</h1>
          <p className="lead mb-4">Track your fitness activities, compete with teams, and achieve your goals!</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Link to="/activities" className="btn btn-light btn-lg px-4 me-md-2">
              <i className="bi bi-activity me-2"></i>View Activities
            </Link>
            <Link to="/leaderboard" className="btn btn-outline-light btn-lg px-4">
              <i className="bi bi-trophy me-2"></i>Leaderboard
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100 page-card">
              <div className="card-body text-center">
                <div className="display-4 mb-3">👥</div>
                <h5 className="card-title fw-bold">Track Users</h5>
                <p className="card-text">Manage user profiles and monitor fitness journeys</p>
                <Link to="/users" className="btn btn-primary">View Users</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 page-card">
              <div className="card-body text-center">
                <div className="display-4 mb-3">🏋️</div>
                <h5 className="card-title fw-bold">Workout Library</h5>
                <p className="card-text">Explore personalized workout recommendations</p>
                <Link to="/workouts" className="btn btn-primary">View Workouts</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card h-100 page-card">
              <div className="card-body text-center">
                <div className="display-4 mb-3">🏆</div>
                <h5 className="card-title fw-bold">Team Competition</h5>
                <p className="card-text">Create teams and compete for the top spot</p>
                <Link to="/teams" className="btn btn-primary">View Teams</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card page-card">
          <div className="card-body">
            <h3 className="card-title fw-bold mb-3">Getting Started</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✅ Log your daily fitness activities</li>
              <li className="list-group-item">✅ Join or create teams to compete with friends</li>
              <li className="list-group-item">✅ Track calories burned and activity duration</li>
              <li className="list-group-item">✅ Climb the leaderboard by staying active</li>
              <li className="list-group-item">✅ Get personalized workout suggestions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

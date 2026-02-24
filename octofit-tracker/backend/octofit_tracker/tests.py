from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserAPITestCase(APITestCase):
    """Test cases for User API endpoints."""
    
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'team_id': 'team123'
        }
    
    def test_create_user(self):
        """Test creating a new user."""
        url = reverse('user-list')
        response = self.client.post(url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().name, 'John Doe')
    
    def test_get_users(self):
        """Test retrieving list of users."""
        User.objects.create(**self.user_data)
        url = reverse('user-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TeamAPITestCase(APITestCase):
    """Test cases for Team API endpoints."""
    
    def setUp(self):
        self.client = APIClient()
        self.team_data = {
            'name': 'Team Alpha',
            'description': 'The best team ever'
        }
    
    def test_create_team(self):
        """Test creating a new team."""
        url = reverse('team-list')
        response = self.client.post(url, self.team_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 1)
        self.assertEqual(Team.objects.get().name, 'Team Alpha')
    
    def test_get_teams(self):
        """Test retrieving list of teams."""
        Team.objects.create(**self.team_data)
        url = reverse('team-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ActivityAPITestCase(APITestCase):
    """Test cases for Activity API endpoints."""
    
    def setUp(self):
        self.client = APIClient()
        self.activity_data = {
            'user_id': 'user123',
            'activity_type': 'Running',
            'duration': 30,
            'distance': 5.0,
            'calories': 300,
            'date': datetime.now()
        }
    
    def test_create_activity(self):
        """Test creating a new activity."""
        url = reverse('activity-list')
        response = self.client.post(url, self.activity_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 1)
    
    def test_get_activities(self):
        """Test retrieving list of activities."""
        Activity.objects.create(**self.activity_data)
        url = reverse('activity-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class LeaderboardAPITestCase(APITestCase):
    """Test cases for Leaderboard API endpoints."""
    
    def setUp(self):
        self.client = APIClient()
        self.leaderboard_data = {
            'user_id': 'user123',
            'user_name': 'John Doe',
            'team_id': 'team123',
            'team_name': 'Team Alpha',
            'total_points': 1000,
            'total_activities': 50,
            'rank': 1
        }
    
    def test_create_leaderboard_entry(self):
        """Test creating a new leaderboard entry."""
        url = reverse('leaderboard-list')
        response = self.client.post(url, self.leaderboard_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Leaderboard.objects.count(), 1)
    
    def test_get_leaderboard(self):
        """Test retrieving leaderboard."""
        Leaderboard.objects.create(**self.leaderboard_data)
        url = reverse('leaderboard-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class WorkoutAPITestCase(APITestCase):
    """Test cases for Workout API endpoints."""
    
    def setUp(self):
        self.client = APIClient()
        self.workout_data = {
            'name': 'Morning Run',
            'category': 'Cardio',
            'difficulty': 'Medium',
            'duration': 30,
            'calories_burn': 300,
            'description': 'A nice morning run to start the day'
        }
    
    def test_create_workout(self):
        """Test creating a new workout."""
        url = reverse('workout-list')
        response = self.client.post(url, self.workout_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workout.objects.count(), 1)
    
    def test_get_workouts(self):
        """Test retrieving list of workouts."""
        Workout.objects.create(**self.workout_data)
        url = reverse('workout-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class APIRootTestCase(APITestCase):
    """Test cases for API root endpoint."""
    
    def test_api_root(self):
        """Test that API root returns all endpoint links."""
        url = reverse('api-root')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

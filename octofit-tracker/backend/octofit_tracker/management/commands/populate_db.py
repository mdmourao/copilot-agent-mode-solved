from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
from pymongo import MongoClient
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))
        
        # Delete existing data using Django ORM
        self.stdout.write('Deleting existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        # Create unique index on email field
        self.stdout.write('Creating unique index on email field...')
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']
        db.users.create_index([('email', 1)], unique=True)
        
        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Avengers and Marvel superheroes unite for fitness!'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League and DC heroes staying in shape!'
        )
        
        # Create Users - Marvel Heroes
        self.stdout.write('Creating Marvel heroes...')
        marvel_users = [
            User.objects.create(name='Iron Man', email='tony.stark@marvel.com', team_id=str(team_marvel._id)),
            User.objects.create(name='Captain America', email='steve.rogers@marvel.com', team_id=str(team_marvel._id)),
            User.objects.create(name='Thor', email='thor.odinson@marvel.com', team_id=str(team_marvel._id)),
            User.objects.create(name='Black Widow', email='natasha.romanoff@marvel.com', team_id=str(team_marvel._id)),
            User.objects.create(name='Hulk', email='bruce.banner@marvel.com', team_id=str(team_marvel._id)),
            User.objects.create(name='Spider-Man', email='peter.parker@marvel.com', team_id=str(team_marvel._id)),
        ]
        
        # Create Users - DC Heroes
        self.stdout.write('Creating DC heroes...')
        dc_users = [
            User.objects.create(name='Batman', email='bruce.wayne@dc.com', team_id=str(team_dc._id)),
            User.objects.create(name='Superman', email='clark.kent@dc.com', team_id=str(team_dc._id)),
            User.objects.create(name='Wonder Woman', email='diana.prince@dc.com', team_id=str(team_dc._id)),
            User.objects.create(name='The Flash', email='barry.allen@dc.com', team_id=str(team_dc._id)),
            User.objects.create(name='Aquaman', email='arthur.curry@dc.com', team_id=str(team_dc._id)),
            User.objects.create(name='Green Lantern', email='hal.jordan@dc.com', team_id=str(team_dc._id)),
        ]
        
        all_users = marvel_users + dc_users
        
        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing']
        for user in all_users:
            for i in range(random.randint(5, 15)):
                activity_type = random.choice(activity_types)
                duration = random.randint(30, 120)
                distance = round(random.uniform(2, 15), 2) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                calories = duration * random.randint(5, 12)
                date = datetime.now() - timedelta(days=random.randint(0, 30))
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=activity_type,
                    duration=duration,
                    distance=distance,
                    calories=calories,
                    date=date
                )
        
        # Create Leaderboard entries
        self.stdout.write('Creating leaderboard entries...')
        for user in all_users:
            user_activities = Activity.objects.filter(user_id=str(user._id))
            total_points = sum(act.calories for act in user_activities)
            total_activities = user_activities.count()
            
            # Determine team based on user membership
            if user in marvel_users:
                team = team_marvel
            else:
                team = team_dc
            
            Leaderboard.objects.create(
                user_id=str(user._id),
                user_name=user.name,
                team_id=str(team._id),
                team_name=team.name,
                total_points=total_points,
                total_activities=total_activities,
                rank=0  # Will be calculated later
            )
        
        # Update ranks based on total points
        leaderboard_entries = Leaderboard.objects.all().order_by('-total_points')
        for idx, entry in enumerate(leaderboard_entries, start=1):
            entry.rank = idx
            entry.save()
        
        # Create Workouts
        self.stdout.write('Creating personalized workouts...')
        workouts_data = [
            {
                'name': 'Super Soldier Training',
                'category': 'Strength',
                'difficulty': 'Advanced',
                'duration': 60,
                'calories_burn': 500,
                'description': 'Intense strength training inspired by Captain America\'s regime.'
            },
            {
                'name': 'Asgardian Warrior Workout',
                'category': 'Full Body',
                'difficulty': 'Expert',
                'duration': 90,
                'calories_burn': 750,
                'description': 'Train like Thor with this full-body warrior workout.'
            },
            {
                'name': 'Web-Slinger Cardio',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'duration': 45,
                'calories_burn': 400,
                'description': 'Fast-paced cardio workout to build Spider-Man-like agility.'
            },
            {
                'name': 'Dark Knight Combat',
                'category': 'Martial Arts',
                'difficulty': 'Advanced',
                'duration': 75,
                'calories_burn': 600,
                'description': 'Master Batman\'s combat techniques with this martial arts routine.'
            },
            {
                'name': 'Kryptonian Power',
                'category': 'Strength',
                'difficulty': 'Expert',
                'duration': 60,
                'calories_burn': 550,
                'description': 'Build super strength with Superman-inspired exercises.'
            },
            {
                'name': 'Amazon Warrior Training',
                'category': 'Combat',
                'difficulty': 'Advanced',
                'duration': 70,
                'calories_burn': 580,
                'description': 'Wonder Woman\'s training regimen for ultimate warrior fitness.'
            },
            {
                'name': 'Speed Force Sprint',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'duration': 30,
                'calories_burn': 350,
                'description': 'High-intensity sprint workout inspired by The Flash.'
            },
            {
                'name': 'Atlantean Swimming',
                'category': 'Swimming',
                'difficulty': 'Intermediate',
                'duration': 50,
                'calories_burn': 450,
                'description': 'Aquatic workout routine from Aquaman\'s underwater kingdom.'
            },
            {
                'name': 'Arc Reactor Core',
                'category': 'Core',
                'difficulty': 'Beginner',
                'duration': 30,
                'calories_burn': 250,
                'description': 'Core strengthening workout inspired by Iron Man\'s suit technology.'
            },
            {
                'name': 'Hulk Smash Power',
                'category': 'Strength',
                'difficulty': 'Expert',
                'duration': 80,
                'calories_burn': 700,
                'description': 'Explosive power training for Hulk-level strength.'
            },
        ]
        
        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)
        
        # Statistics
        self.stdout.write(self.style.SUCCESS('\n=== Database Population Complete ==='))
        self.stdout.write(f'Teams created: {Team.objects.count()}')
        self.stdout.write(f'Users created: {User.objects.count()}')
        self.stdout.write(f'Activities created: {Activity.objects.count()}')
        self.stdout.write(f'Leaderboard entries: {Leaderboard.objects.count()}')
        self.stdout.write(f'Workouts created: {Workout.objects.count()}')
        self.stdout.write(self.style.SUCCESS('Database successfully populated with superhero data!'))

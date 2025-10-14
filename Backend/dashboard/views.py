from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from todos.models import Task
from flashcards.models import Card
from todos.serializers import TaskSerializer
from django.contrib.auth import get_user_model
from .models import EnglishLessonProgress

User = get_user_model()


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # ----------------- User tasks -----------------
        tasks_qs = Task.objects.filter(user=user)
        tasks_completed_qs = tasks_qs.filter(completed=True)
        tasks = TaskSerializer(tasks_qs, many=True).data
        tasks_completed = TaskSerializer(tasks_completed_qs, many=True).data
        total_tasks = tasks_qs.count()
        completed_tasks = tasks_completed_qs.count()
        tasks_progress = int((completed_tasks / total_tasks) * 100) if total_tasks > 0 else 0

        # ----------------- Flashcards -----------------
        cards_mastered = Card.objects.filter(deck__user=user, status="mastered").count()
        cards_learning = Card.objects.filter(deck__user=user, status="learning").count()
        total_cards = cards_mastered + cards_learning
        flashcards_progress = int((cards_mastered / total_cards) * 100) if total_cards > 0 else 0

        # ----------------- English progress -----------------
        english_qs = EnglishLessonProgress.objects.filter(user=user)
        total_steps = sum([p.total_steps for p in english_qs])
        completed_steps = sum([p.completed_steps for p in english_qs])
        english_progress = int((completed_steps / total_steps) * 100) if total_steps > 0 else 0

        # ----------------- Leaderboard -----------------
        leaderboard_users = User.objects.all()
        leaderboard = []

        for u in leaderboard_users:
            user_tasks_completed = Task.objects.filter(user=u, completed=True).count()
            user_cards_mastered = Card.objects.filter(deck__user=u, status="mastered").count()
            user_english_qs = EnglishLessonProgress.objects.filter(user=u)
            user_total_steps = sum([p.total_steps for p in user_english_qs])
            user_completed_steps = sum([p.completed_steps for p in user_english_qs])
            user_english_score = user_completed_steps  # each completed step = 1 point
            score = user_tasks_completed + user_cards_mastered + user_english_score

            profile_image_url = None
            if hasattr(u, "profile_image") and u.profile_image:
                try:
                    profile_image_url = request.build_absolute_uri(u.profile_image.url)
                except ValueError:
                    profile_image_url = None

            leaderboard.append({
                "username": u.username,
                "tasks_completed": user_tasks_completed,
                "cards_mastered": user_cards_mastered,
                "english_completed_steps": user_completed_steps,
                "score": score,
                "profile_image_url": profile_image_url
            })

        # Sort leaderboard descending by score and take top 10
        leaderboard_sorted = sorted(leaderboard, key=lambda x: x["score"], reverse=True)[:10]

        # ----------------- User profile image -----------------
        profile_image_url = None
        if hasattr(user, "profile_image") and user.profile_image:
            try:
                profile_image_url = request.build_absolute_uri(user.profile_image.url)
            except ValueError:
                profile_image_url = None

        # ----------------- Response -----------------
        data = {
            "username": user.username,
            "email": user.email,
            "bio": getattr(user, "bio", ""),
            "profile_image_url": profile_image_url,
            "tasks": tasks,
            "tasks_completed": tasks_completed,
            "tasks_progress": tasks_progress,
            "cards_mastered": cards_mastered,
            "cards_learning": cards_learning,
            "flashcards_progress": flashcards_progress,
            "english_progress": english_progress,
            "leaderboard": leaderboard_sorted,
        }

        return Response(data)


class UpdateEnglishProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        lesson_id = request.data.get("lesson_id")
        step = request.data.get("step")
        quiz_score = request.data.get("quiz_score")

        # ----------------- Validate lesson_id -----------------
        if lesson_id in [None, ""]:
            return Response({"error": "lesson_id is required"}, status=400)

        # ----------------- Get or create progress -----------------
        progress, created = EnglishLessonProgress.objects.get_or_create(
            user=user,
            lesson_id=lesson_id,
            defaults={"total_steps": 10}  # can adjust dynamically
        )

        # ----------------- Update completed steps -----------------
        if step is not None:
            # Ensure it's an integer
            try:
                step = int(step)
                progress.completed_steps = max(progress.completed_steps, step + 1)
            except ValueError:
                return Response({"error": "step must be a number"}, status=400)

        # ----------------- Update quiz score -----------------
        if quiz_score is not None:
            try:
                quiz_score = int(quiz_score)
                progress.quiz_score = quiz_score
            except ValueError:
                return Response({"error": "quiz_score must be a number"}, status=400)

        progress.save()
        return Response({"message": "Progress updated"})

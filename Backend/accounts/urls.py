from django.urls import path
from .views import RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from .views import my_profile, leaderboard, update_profile, change_password


urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("profile/", my_profile, name="my_profile"),
    path("profile/update/", update_profile, name="update_profile"),
    path("password/change/", change_password, name="change_password"),  # 👈 add this
    path("leaderboard/", leaderboard, name="leaderboard"),  # 👈 new

]      



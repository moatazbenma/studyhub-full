from django.shortcuts import render
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

# Create your views here.

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_profile(request):
    """Return logged-in user's profile"""
    serializer = UserSerializer(request.user, context={"request": request})
    return Response(serializer.data)

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """Update username, email, bio and profile image"""
    user = request.user
    print(f"=== Profile Update Request ===")
    print(f"User: {user.username}")
    print(f"POST data: {request.data}")
    print(f"FILES: {request.FILES.keys()}")
    
    # Update text fields
    if "username" in request.data and request.data["username"]:
        user.username = request.data["username"]
    if "email" in request.data and request.data["email"]:
        user.email = request.data["email"]
    if "bio" in request.data:
        user.bio = request.data["bio"]

    # Handle image upload
    if "profile_image" in request.FILES:
        image_file = request.FILES["profile_image"]
        print(f"Uploading profile_image: {image_file.name} ({image_file.size} bytes)")
        user.profile_image = image_file
    elif "image" in request.FILES:
        image_file = request.FILES["image"]
        print(f"Uploading image: {image_file.name} ({image_file.size} bytes)")
        user.profile_image = image_file

    user.save()
    print(f"Profile image saved to: {user.profile_image}")
    
    serializer = UserSerializer(user, context={"request": request})
    print(f"Response data: {serializer.data}")
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Allow user to change password"""
    user = request.user
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    if not old_password or not new_password:
        return Response({"error": "Both fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(old_password):
        return Response({"error": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)


@api_view(["GET"])
def leaderboard(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True, context={"request": request})
    return Response({"leaderboard": serializer.data})

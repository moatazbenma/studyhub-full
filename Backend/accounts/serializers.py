from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    profile_image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "bio", "profile_image", "profile_image_url"]
        extra_kwargs = {
            'profile_image': {'required': False, 'allow_null': True}
        }

    def get_profile_image_url(self, obj):
        """Generate full URL for profile image"""
        if obj.profile_image:
            try:
                image_url = obj.profile_image.url
                # Always return the relative URL, let the frontend build the full URL if needed
                return image_url
            except Exception as e:
                print(f"Error getting profile image URL: {e}")
                return None
        return None

    def to_representation(self, instance):
        """Ensure profile_image_url is always included"""
        data = super().to_representation(instance)
        # Always include the URL even if image field is empty
        if 'profile_image_url' not in data:
            data['profile_image_url'] = self.get_profile_image_url(instance)
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )
        return user

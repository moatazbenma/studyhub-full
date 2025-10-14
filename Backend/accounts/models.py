from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    bio = models.TextField(blank=True, null=True)
    profile_image= models.ImageField(upload_to="profile_images/", blank=True, null=True)


    def __str__(self):
        return self.username
# Create your models here.




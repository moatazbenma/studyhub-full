# bookings/urls.py
from django.urls import path
from .views import book_class, user_bookings, delete_booking



urlpatterns = [
    path("book/", book_class, name="book-class"),
    path("my-bookings/", user_bookings, name="user-bookings"),
    path("my-bookings/<int:id>/delete/", delete_booking, name="delete-booking"),

]

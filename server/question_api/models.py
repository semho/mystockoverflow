from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class TestModel(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    occupation = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name


class Question(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.title


class Answer(models.Model):
    question = models.ForeignKey(
        Question, related_name="answer", on_delete=models.CASCADE
    )
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.posted_by.username}-answer"

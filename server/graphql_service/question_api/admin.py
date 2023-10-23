from django.contrib import admin
from .models import TestModel, Question, Answer

# Register your models here.
admin.site.register(TestModel)
admin.site.register(Question)
admin.site.register(Answer)

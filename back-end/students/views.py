from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from students.serializers import StudentSerializer
from students.models import Student


class StudentViewSet(ModelViewSet):
    serializer_class = StudentSerializer 
    queryset = Student.objects.all()

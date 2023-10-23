from django.db import models

class Student(models.Model):
    name= models.CharField("Name",max_length=107)
    gender=models.CharField("Gender",max_length=31)
    address=models.CharField("Address",max_length=1023)
    mobile_num=models.CharField("Mobile Number",max_length=15)
    date_of_birth = models.DateField("Date of Birth")
    age= models.IntegerField("Age")
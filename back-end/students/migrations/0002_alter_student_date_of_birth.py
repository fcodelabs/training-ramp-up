# Generated by Django 4.2.6 on 2023-10-24 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='date_of_birth',
            field=models.CharField(verbose_name='Date of Birth'),
        ),
    ]

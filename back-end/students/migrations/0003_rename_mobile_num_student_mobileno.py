# Generated by Django 4.2.6 on 2023-10-24 18:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_alter_student_date_of_birth'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='mobile_num',
            new_name='mobileNo',
        ),
    ]

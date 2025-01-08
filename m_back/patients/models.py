from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="Unknown")
    phone = models.CharField(max_length=15, default="0000000000")

    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    # Specify related_name for conflicting fields
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='patient_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='patient_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

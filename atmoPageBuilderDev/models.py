from django.db import models
from django.utils import timezone
import os

# Create your models here.

def get_image_path(instance, filename):
    return os.path.join('photos', str(instance.id), filename)

class Programm(models.Model):
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    main_image = models.ImageField(upload_to=get_image_path, blank=True)
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title





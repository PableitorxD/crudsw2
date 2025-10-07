from django.db import models

# Create your models here.
class Persona(models.Model):
    idpersona = models.AutoField(primary_key=True)
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    edad = models.IntegerField()
    correo = models.EmailField()
    telefono = models.CharField(max_length=20)
    direccion = models.TextField()

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"
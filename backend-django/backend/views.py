from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenido al backend de mi CRUD con GraphQL.")

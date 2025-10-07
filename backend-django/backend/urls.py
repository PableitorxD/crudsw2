from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from .views import home
from .schema import schema

urlpatterns = [
    path('', home),  # ✅ ahora responde en http://127.0.0.1:8000/
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
]

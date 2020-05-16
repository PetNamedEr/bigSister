
from django.urls import path
from . import views

urlpatterns = [
    path('api/aanestys/', views.AanestysListCreate.as_view() ),
    path('api/istunto/', views.IstuntoListCreate.as_view() ),
    path('testiii', views.index, name='index'),
]

from django.urls import path
from django.urls import re_path
from . import views

urlpatterns = [
    path('api/aanestys/', views.AanestysListCreate.as_view() ),
    re_path(r'^api/aanestys/(?P<id>\d+)$', views.AanestysDetail.as_view() ),
    path('api/istunto/', views.IstuntoListCreate.as_view() ),
    path('testiii', views.index, name='index'),
]
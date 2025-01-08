from django.urls import path
from .views import PatientListView, RegisterView, LoginView, PatientDashboardView

urlpatterns = [
    path('api/patient/', PatientListView.as_view(), name='patient-list'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/dashboard/', PatientDashboardView.as_view(), name='dashboard'),
]
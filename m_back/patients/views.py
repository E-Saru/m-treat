from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from .models import Patient
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

# Patient endpoint for testing
class PatientListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({'message': 'Patient endpoint working!'}, status=200)

# Registration endpoint
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone')
        password = data.get('password')

        if not all([name, email, phone, password]):
            return Response({'error': 'All fields are required'}, status=400)

        if User.objects.filter(username=email).exists():
            return Response({'error': 'User already exists'}, status=400)

        user = User.objects.create_user(username=email, email=email, password=password)
        Patient.objects.create(user=user, name=name, phone=phone)

        return Response({'message': 'Registration successful'}, status=201)

# Login endpoint with JWT
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username_or_email = data.get('username')
        password = data.get('password')

        # user = authenticate(username=username, password=password)
        user = User.objects.filter(email=username_or_email).first() or \
           authenticate(username=username_or_email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=200)
        return Response({'error': 'Invalid credentials'}, status=401)

class PatientDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        patient = Patient.objects.get(user=request.user)
        data = {
            'name': patient.name,
            'email': patient.user.email,
            'phone': patient.phone,
        }
        return Response(data, status=200)

    def put(self, request):
        patient = Patient.objects.get(user=request.user)
        data = request.data

        patient.name = data.get('name', patient.name)
        patient.phone = data.get('phone', patient.phone)
        patient.save()

        return Response({
            'name': patient.name,
            'email': patient.user.email,
            'phone': patient.phone,
        }, status=200)
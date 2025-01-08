from django.contrib import admin
from django.apps import apps

# Register all models dynamically
app = apps.get_app_config('patients')
for model_name, model in app.models.items():
    admin.site.register(model)

from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Company)
admin.site.register(Match)
admin.site.register(Vote)
admin.site.register(Tournament)
# Register your models here.

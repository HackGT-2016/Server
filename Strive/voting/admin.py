from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Company)
admin.site.register(Match)
admin.site.register(Vote)
admin.site.register(Tournament)
admin.site.register(Tag)
# Register your models here.

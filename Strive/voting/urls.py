from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^details/(?P<match_id>[0-9]+)/$', views.detail, name='details'),
    url(r'^company/(?P<company_id>[0-9]+)/$', views.company, name='company'),
]

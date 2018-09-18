from django.conf.urls import url
from . import views
from django.conf import settings
from django.contrib.staticfiles.urls import static


urlpatterns = [
    url(r'^$', views.programm_list, name='programm_list'),
    url(r'^programm/(?P<pk>\d+)/$', views.programm_detail, name='programm_detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


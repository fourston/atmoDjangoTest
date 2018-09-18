from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from .models import Programm

# Create your views here.
def programm_list(request):
    programms = Programm.objects.all()
    return render(request, 'programms/programm_list.html', {'programms': programms})

def programm_detail(request, pk):
    programm = get_object_or_404(Programm, pk=pk)
    return render(request, 'programms/programm_detail.html', {'programm': programm})
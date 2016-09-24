from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def index(request):
    return HttpResponse('We got something, Cap!')

def detail(request, match_id):
    response = "You're looking at match %s"
    return HttpResponse(response % match_id)

def company(request, company_id):
    response = ("Youre looking at company %s")
    return HttpResponse(response % company_id)

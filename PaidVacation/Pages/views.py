from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth
from django.http import HttpResponse, Http404, HttpResponseRedirect, HttpResponseNotFound
from django import forms
from .forms import UserRegistrationForm
from .forms import ReferCompanyForm, newCompanyForm, newVoucherForm, ContactUsForm, newWinnerForm
from .models import Companies, UserProfile, Vouchers, Winners
from django_user_agents.utils import get_user_agent
from django.views.generic.edit import CreateView
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import random



# Create your views here.

def error_404_view(request, exception):
    return render(request,'404.html')

def home(request):
    user_agent = get_user_agent(request)
    return render(request, "home.html", {"is_mobile": user_agent.is_mobile})

def howitworks(request):
    user_agent = get_user_agent(request)
    return render(request, "howitworks.html", {"is_mobile": user_agent.is_mobile})

def plansdetails_view(request):
    user_agent = get_user_agent(request)
    return render(request, "plansdetails.html", {"is_mobile": user_agent.is_mobile})


def about(request):
    user_agent = get_user_agent(request)
    return render(request, "about.html", {"is_mobile": user_agent.is_mobile})


def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')

def contactus_view(request):
    user_agent = get_user_agent(request)
    form = ContactUsForm(request.POST or None )
    sendresult = False

    if form.is_valid():
       form.save()
       sendresult = True
       form = ContactUsForm()

    return render(request, "contactus.html", {"is_mobile": user_agent.is_mobile, "form" : form, "sendresult": sendresult})


def faq_view(request):
    user_agent = get_user_agent(request)
    return render(request, "faq.html", {"is_mobile": user_agent.is_mobile})

def termsconditions_view(request):
    user_agent = get_user_agent(request)
    return render(request, "termsconditions.html", {"is_mobile": user_agent.is_mobile})

def privacypolicy_view(request):
    user_agent = get_user_agent(request)
    return render(request, "privacypolicy.html", {"is_mobile": user_agent.is_mobile})

def cookiespolicy_view(request):
    user_agent = get_user_agent(request)
    return render(request, "cookiespolicy.html", {"is_mobile": user_agent.is_mobile})


def choosemybonus_view(request):
    user_agent = get_user_agent(request)
    return render(request, "Accounts/ChooseMyBonus.html", {"is_mobile": user_agent.is_mobile})

def myhistory_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)

    user_company = UserProfile.objects.filter(user = request.user).values_list('company', flat=True)
    print (user_company)
    
    if user_company.count() > 0:
        user_company = (user_company[0])
    else:
        user_company = ''

    employee_vouchers = Vouchers.objects.filter(idemployee = request.user.id, idcodecompany = user_company)
    return render(request, "Accounts/MyHistory.html", {"is_mobile": user_agent.is_mobile, 'employee_vouchers' : employee_vouchers})


def personalprofile_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    form = UserRegistrationForm(request.POST or None )

    birthday = UserProfile.objects.filter(user = request.user).values_list('birthday', flat=True)[0]
    birthdaymonth = UserProfile.objects.filter(user = request.user).values_list('birthdaymonth', flat=True)[0]
    birthdayyear = UserProfile.objects.filter(user = request.user).values_list('birthdayyear', flat=True)[0]
    first_name = request.user.first_name
    last_name = request.user.last_name
    email = request.user.email

    form = UserRegistrationForm(initial={'firstname': first_name, 'lastname': last_name, 'birthday': birthday, 'birthdaymonth': birthdaymonth, 'birthdayyear': birthdayyear, 'email': email})

    return render(request, "Accounts/personalprofile.html", {"is_mobile": user_agent.is_mobile, 'form' : form, 'first_name': first_name, 'last_name': last_name, 'birthday': birthday, 'birthdaymonth': birthdaymonth, 'birthdayyear': birthdayyear})


def adminconfiguration_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    form = newCompanyForm(request.POST or None )
    allcompanies = Companies.objects.all()

    return render(request, "Accounts/adminconfiguration.html", {"is_mobile": user_agent.is_mobile, 'form' : form, 'allcompanies' : allcompanies})


def generatewinners_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    formWinner = newWinnerForm(request.POST or None )
    allwinners = Winners.objects.all()

    if request.method == 'POST':
        if formWinner.is_valid():
            formWinner.save()


    return render(request, "Accounts/generatewinners.html", {"is_mobile": user_agent.is_mobile, "allwinners" : allwinners, "formWinner": formWinner})


def random_func(allusers):
    return (random.choice(allusers))


def generateauomaticwinners_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)

    allcompanies = Companies.objects.filter(active = True)

    #Loop in each active company
    for company in allcompanies:
        winners_list = list()
        num_winners = Companies.objects.filter(idcode = company).values_list('numberwinnermonth', flat=True)[0]
        #Loop in number of winner of each company
        for x in range(int(num_winners)):
            allusers = UserProfile.objects.filter(company = company).exclude(user__in = winners_list).values_list('user', flat=True)
            winners_list.append(random_func(allusers))

        #Insert winners in the model
        for winner in winners_list:
            user = User.objects.get(username = winner)
            newwiner = Winners( idemployee=user, idcodecompany=company,  source='automatic')
            newwiner.save()


    return HttpResponseRedirect('/MyAccount/GenerateWinners/')



def vouchersconfiguration_view(request):
    user_agent = get_user_agent(request)
    formVoucher = newVoucherForm(request.POST or None )


    return render(request, "Accounts/vouchersconfiguration.html", {"is_mobile": user_agent.is_mobile, 'formVoucher': formVoucher})



def refercompany_view(request):
    companyname = request.POST.get('companyname', '')
    form = ReferCompanyForm(initial={'company': companyname})

    return render(request, "refercompany.html", {'form' : form})


def refernewcompany_view(request):
    form = ReferCompanyForm(request.POST or None )
    if form.is_valid():
       form.save()

    return render(request, "refercompany.html", {'form' : form})




def register(request):
    user_agent = get_user_agent(request)
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            userObj = form.cleaned_data
            username = userObj['username']
            first_name = userObj['firstname']
            last_name = userObj['lastname']
            email =  userObj['email']
            password =  userObj['password']
            code =  userObj['code']
            birthdaymonth =  userObj['birthdaymonth']
            birthday =  userObj['birthday']
            birthdayyear =  userObj['birthdayyear']
            if (Companies.objects.filter(idcode = code).filter(active = True).exists() ):
                if not (User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists()):
                    new_user = User.objects.create_user(username, email, password)
                    new_user.first_name = first_name
                    new_user.last_name = last_name
                    user = authenticate(username = username, password = password)
                    
                    profileUser = UserProfile(user=user, company=code, birthdaymonth=birthdaymonth, birthday=birthday, birthdayyear=birthdayyear)
                    profileUser.save()
                    new_user.save()
                    login(request, user)
                    return HttpResponseRedirect('/')
                else:
                    raise forms.ValidationError('Looks like a username with that email or password already exists')
            else:
                raise forms.ValidationError("This company don't exists or it is not active.")
    else:
        form = UserRegistrationForm()
    return render(request, 'Accounts/register.html', {"is_mobile": user_agent.is_mobile, 'form' : form})


def MyAccount_view(request):
    user_agent = get_user_agent(request)
    username = request.POST.get('username', '')
    passw = request.POST.get('password', '')
    user = authenticate(username = username, password = passw)

    if request.user.is_authenticated:


        return choosemybonus_view(request)
    elif user is not None:
        login(request, user)
        return choosemybonus_view(request)
    else:
        return HttpResponseRedirect('/')


 
def createcompany_view(request):
    user_agent = get_user_agent(request)
    form = newCompanyForm(request.POST or None)
    formVoucher = newVoucherForm(request.POST or None )
    text_error = ''
    saveresult = False
    allcompanies = Companies.objects.all()

    if request.method == 'POST':
        if form.is_valid():
            form.save()
            saveresult = True
        else:
            text_error = form.errors.as_data()
    return render(request, "Accounts/adminconfiguration.html", {"is_mobile": user_agent.is_mobile, 'form' : form, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, 'allcompanies' : allcompanies})


def uploadvoucher_view(request):
    user_agent = get_user_agent(request)
    text_error = ''
    saveresult = False
    print ('entra')
    formVoucher = newVoucherForm(request.POST, request.FILES)
    if request.method == 'POST' and request.FILES['voucherlocation']:
        
        myfile = request.FILES['voucherlocation']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)

        if formVoucher.is_valid():
            idcodewinner =  formVoucher.instance.idcodewinner
            print("------")
            print(idcodewinner)
            p = Winners.objects.get(pk=str(idcodewinner))
            p.state = 'Completed'
            p.save()
            formVoucher.save()
            saveresult = True
        else:
            text_error = form.errors.as_data()
        return render(request, 'Accounts/vouchersconfiguration.html', {"is_mobile": user_agent.is_mobile, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, })
    return render(request, 'Accounts/vouchersconfiguration.html', {"is_mobile": user_agent.is_mobile, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, })


def downloadvoucher_view(request):
    media_url = settings.MEDIA_URL
    path_to_file = media_url + 'documents/Captura_de_ecrã_2018-06-08_às_23.39.27.png'
    f = open(path_to_file, 'r')
    myfile = File(f)
    response = HttpResponse(myfile, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=filename'
    return response


    #if request.method == 'POST':
    #    form = UserLoginForm(request.POST)
    #    if form.is_valid():
    #        userObj = form.cleaned_data
    #        username = userObj['username']
    #        email =  userObj['email']
    #        user = authenticate(username = username, password = password)
    #        login(request, user)
    #        return HttpResponseRedirect('/')
    #    else:
    #        raise forms.ValidationError('Looks like a username with that email or password already exists')
    #else:
    #    form = UserLoginForm()
    #return render(request, '', {'form' : form})

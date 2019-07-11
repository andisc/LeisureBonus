from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib import auth
from django.http import HttpResponse, Http404, HttpResponseRedirect, HttpResponseNotFound
from django import forms
from .forms import UserRegistrationForm
from .forms import ReferCompanyForm, newCompanyForm, newVoucherForm, ContactUsForm, newWinnerForm, newDeletedAccountsForm, newFeedbackEmployeesForm
from .models import Companies, UserProfile, Vouchers, Winners, CountryAirlineCompany, AirlineCompanies
from django_user_agents.utils import get_user_agent
from django.views.generic.edit import CreateView
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.views.generic.base import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import random


def to_python(value):
    if value == 'true':
        return True
    else:
        return False

# Create your views here.

def error_404_view(request, exception):
    return render(request,'404.html')

def home(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "home.html", {"is_mobile": is_mobile})

def howitworks(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "howitworks.html", {"is_mobile": is_mobile})

def plansdetails_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "plansdetails.html", {"is_mobile": is_mobile})


def about(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "about.html", {"is_mobile": is_mobile})


def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')

def contactus_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    form = ContactUsForm(request.POST or None )
    sendresult = False

    if form.is_valid():
       form.save()
       sendresult = True
       form = ContactUsForm()

    return render(request, "contactus.html", {"is_mobile": is_mobile, "form" : form, "sendresult": sendresult})


def faq_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "faq.html", {"is_mobile": is_mobile})

def termsconditions_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "termsconditions.html", {"is_mobile": is_mobile})

def privacypolicy_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "privacypolicy.html", {"is_mobile": is_mobile})

def cookiespolicy_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "cookiespolicy.html", {"is_mobile": is_mobile})


def choosemybonus_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_favoritecountry = UserProfile.objects.filter(user = request.user).values_list('favoritecountry', flat=True)[0]
    user_favoriteairline = UserProfile.objects.filter(user = request.user).values_list('favoriteairline', flat=True)[0]


    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    return render(request, "Accounts/choosemybonus.html", {"is_mobile": is_mobile, "user_favoritecountry":user_favoritecountry, "user_favoriteairline":user_favoriteairline })

def myhistory_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    sendfeedback = False

    form = newFeedbackEmployeesForm(request.POST or None) 

    user_company = UserProfile.objects.filter(user = request.user).values_list('company', flat=True)

    
    if user_company.count() > 0:
        user_company = (user_company[0])
    else:
        user_company = ''

    idwinner = Winners.objects.filter(idemployee = request.user, idcodecompany = user_company).values_list('idwinner', flat=True)

    employee_vouchers = Vouchers.objects.filter(idcodewinner__in = idwinner)

    # save feedback
    if request.method == 'POST':
        if form.is_valid():
            post = form.save(commit=False)
            post.idemployee = request.user
            post.save()
            sendfeedback = True

    return render(request, "Accounts/myhistory.html", {"is_mobile": is_mobile, 'employee_vouchers' : employee_vouchers, 'form' : form, 'sendfeedback' : sendfeedback})


def personalprofile_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    form = UserRegistrationForm(request.POST or None )

    birthday = UserProfile.objects.filter(user = request.user).values_list('birthday', flat=True)[0]
    birthdaymonth = UserProfile.objects.filter(user = request.user).values_list('birthdaymonth', flat=True)[0]
    birthdayyear = UserProfile.objects.filter(user = request.user).values_list('birthdayyear', flat=True)[0]
    first_name = request.user.first_name
    last_name = request.user.last_name
    email = request.user.email
    sexgender = UserProfile.objects.filter(user = request.user).values_list('sexgender', flat=True)[0]
    phone = UserProfile.objects.filter(user = request.user).values_list('phone', flat=True)[0]
    work = UserProfile.objects.filter(user = request.user).values_list('work', flat=True)[0]

    form = UserRegistrationForm(initial={'firstname': first_name, 'lastname': last_name, 'birthday': birthday, 'birthdaymonth': birthdaymonth, 'birthdayyear': birthdayyear, 'email': email, 'phone':phone, 'work':work, 'sexgender':sexgender})

    return render(request, "Accounts/personalprofile.html", {"is_mobile": is_mobile, 'form' : form, 'first_name': first_name, 'last_name': last_name, 'birthday': birthday, 'birthdaymonth': birthdaymonth, 'birthdayyear': birthdayyear})


def adminconfiguration_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    form = newCompanyForm(request.POST or None )
    allcompanies = Companies.objects.all()

    return render(request, "Accounts/adminconfiguration.html", {"is_mobile": is_mobile, 'form' : form, 'allcompanies' : allcompanies})


def settingsconfiguration_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet

    emailnotification = UserProfile.objects.filter(user = request.user).values_list('emailnotification', flat=True)[0]
    phonenotification = UserProfile.objects.filter(user = request.user).values_list('phonenotification', flat=True)[0]

    form = UserRegistrationForm(initial={'emailnotification': emailnotification, 'phonenotification': phonenotification} )
    formDeleteAccount = newDeletedAccountsForm(request.POST or None )

    return render(request, "Accounts/settingsconfiguration.html", {"is_mobile": is_mobile, "form" : form, "formDeleteAccount" : formDeleteAccount})


def settingsconfigurationsave_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')
    
    emailnotification = request.GET.get('var_emailnotification', None)
    phonenotification = request.GET.get('var_phonenotification', None)

    user = UserProfile.objects.get(user = request.user)
    user.emailnotification = to_python(emailnotification)
    user.phonenotification = to_python(phonenotification)
    user.save()

    data = {
        "result" : 'Result'
    }

    return JsonResponse(data, safe=False)
    #return HttpResponseRedirect('/MyAccount/SettingsConfiguration/')


def settingsdeleteaccount_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    formDeleteAccount = newDeletedAccountsForm(request.POST or None )

    if request.method == 'POST':
        if formDeleteAccount.is_valid():
            formDeleteAccount.save()
            user = User.objects.get(username=request.user)
            if user is not None:
                user.delete()

    return logout_view(request) #chama a view de logout


def generatewinners_view(request):
    if request.user.is_authenticated == False:
        return HttpResponseRedirect('/')

    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    formWinner = newWinnerForm(request.POST or None )
    allwinners = Winners.objects.all()

    if request.method == 'POST':
        if formWinner.is_valid():
            formWinner.save()


    return render(request, "Accounts/generatewinners.html", {"is_mobile": is_mobile, "allwinners" : allwinners, "formWinner": formWinner})


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


    return HttpResponseRedirect('/MyAccount/generatewinners/')



def vouchersconfiguration_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet

    n_winners = Winners.objects.exclude(state = "Completed").values_list('idwinner', flat=True)

    formVoucher = newVoucherForm(initial={'idcodewinner' : 0})


    return render(request, "Accounts/vouchersconfiguration.html", {"is_mobile": is_mobile, 'formVoucher': formVoucher})



def refercompany_view(request):
    companyname = request.POST.get('companyname', '')
    form = ReferCompanyForm(initial={'company': companyname})
    sentReference = False

    return render(request, "refercompany.html", {'form' : form, 'sentReference' : sentReference})


def refernewcompany_view(request):
    form = ReferCompanyForm(request.POST or None )
    sentReference = False

    if form.is_valid():
       form.save()
       sentReference = True

    return render(request, "refercompany.html", {'form' : form, 'sentReference' : sentReference})




def register(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    error_message = ''

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
                    new_user = User.objects.create_user(username.lower(), email, password)
                    
                    new_user.first_name = first_name
                    new_user.last_name = last_name
                    user = authenticate(username = username, password = password)
                    
                    profileUser = UserProfile(user=user, company=code, birthdaymonth=birthdaymonth, birthday=birthday, birthdayyear=birthdayyear)
                    profileUser.save()
                    new_user.save()
                    login(request, user)

                    return HttpResponseRedirect('/')
                else:
                    error_message = 'Looks like a username with that email or password already exists'
                    #raise forms.ValidationError('Looks like a username with that email or password already exists')
            else:
                error_message = "This company don't exists or it is not active."
                #raise forms.ValidationError("This company don't exists or it is not active.")
        print(form.errors)
    else:

        form = UserRegistrationForm()
    return render(request, 'Accounts/register.html', {"is_mobile": is_mobile, 'form' : form, 'error_message' : error_message})


def MyAccount_view(request):
    user_agent = get_user_agent(request)
    username = request.POST.get('username', '')
    passw = request.POST.get('password', '')
    user = authenticate(username = username.lower(), password = passw)

    if request.user.is_authenticated:


        return choosemybonus_view(request)
    elif user is not None:
        login(request, user)
        return choosemybonus_view(request)
    else:
        return HttpResponseRedirect('/')


 
def createcompany_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
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
    return render(request, "Accounts/adminconfiguration.html", {"is_mobile": is_mobile, 'form' : form, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, 'allcompanies' : allcompanies})


def uploadvoucher_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    text_error = ''
    saveresult = False

    
    formVoucher = newVoucherForm(request.POST, request.FILES)

    user = UserProfile.objects.get(user = request.user)
    formVoucher.airlinecompany = user.favoriteairline 

    if request.method == 'POST' and request.FILES['voucherlocation']:
        
        myfile = request.FILES['voucherlocation']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)

        if formVoucher.is_valid():
            idcodewinner =  formVoucher.instance.idcodewinner
            
            p = Winners.objects.get(pk=str(idcodewinner))
            p.state = 'Completed'
            p.save()
            formVoucher.save()
            saveresult = True
        else:
            text_error = form.errors.as_data()
        return render(request, 'Accounts/vouchersconfiguration.html', {"is_mobile": is_mobile, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, })
    return render(request, 'Accounts/vouchersconfiguration.html', {"is_mobile": is_mobile, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, })


def downloadvoucher_view(request):
    media_url = settings.MEDIA_URL
    path_to_file = media_url + 'documents/Captura_de_ecrã_2018-06-08_às_23.39.27.png'
    f = open(path_to_file, 'r')
    myfile = File(f)
    response = HttpResponse(myfile, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=filename'
    return response


class HomePageView(TemplateView):
    template_name = 'Accounts/choosemybonus.html'

    def get_context_data(self, **kwargs):
        return {'message': 'Hello World!'}


@csrf_exempt
def choosecountry_view(request):
   
    country = request.GET.get('country', None)

    result = []
    if country == "":
        allcountrydata = AirlineCompanies.objects.select_related()
        for countryairline in allcountrydata:
            result.append({'airline' : countryairline.airlinecompany, 'ranking' : countryairline.ranking})

    else:
        allcountrydata = CountryAirlineCompany.objects.select_related().filter(countrycode=country)
        for countryairline in allcountrydata:
            result.append({'airline' : countryairline.airlinecompany.airlinecompany, 'ranking' : countryairline.airlinecompany.ranking})


    data = {
        #"countryairline" : list(CountryAirlineCompany.objects.filter(countrycode=country).values_list('airlinecompany', flat=True)),
        "countryairline" : result
    }
    #print(data)

    return JsonResponse(data, safe=False)


def savechoice_view(request):
    airline = request.GET.get('airline', None)
    country = request.GET.get('country', None)

    #update airline and favorite country
    user = UserProfile.objects.get(user = request.user)
    user.favoriteairline = str(airline)  # save user airline choice
    user.favoritecountry = str(country)
    user.save()

    return JsonResponse("", safe=False)


def changepassword_view(request):

    oldpassword_value = request.GET.get('oldpassword_value', None)
    newpassword_value = request.GET.get('newpassword_value', None)
    resultchangepassword = False
    

    user = User.objects.get(username = request.user)

    if check_password(oldpassword_value, user.password):
        user.set_password(newpassword_value)
        user.save()
        resultchangepassword = True

    data = {
        "resultchangepassword" : resultchangepassword
    }

    return JsonResponse(data, safe=False)



def changeprofile_view(request):
    firstname_value = request.GET.get('firstname_value', None)
    lastname_value = request.GET.get('lastname_value', None)
    birthday_value = request.GET.get('birthday_value', None)
    birthdaymonth_value = request.GET.get('birthdaymonth_value', None)
    birthdayyear_value = request.GET.get('birthdayyear_value', None)
    sexgender_value = request.GET.get('sexgender_value', None)
    work_value = request.GET.get('work_value', None)
    email_value = request.GET.get('email_value', None)
    phone_value = request.GET.get('phone_value', None)

    #update user profile
    user = User.objects.get(username = request.user)
    user.first_name = firstname_value
    user.last_name = lastname_value
    user.email = str(email_value)
    user.save()

    user_profile = UserProfile.objects.get(user = request.user)
    user_profile.birthday = str(birthday_value)
    user_profile.birthdaymonth = str(birthdaymonth_value)
    user_profile.birthdayyear = str(birthdayyear_value)
    user_profile.sexgender = str(sexgender_value)
    user_profile.work = str(work_value)
    print("____" + phone_value)
    if phone_value == "":
        user_profile.phone = None
    else:
        user_profile.phone = int(phone_value)
    user_profile.save()


    return JsonResponse("", safe=False)

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

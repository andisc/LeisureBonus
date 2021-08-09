from django.shortcuts import render, redirect
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
from django.contrib.auth.decorators import login_required
from django.contrib import messages
#from sendfile import sendfile
import random
from django.template.loader import render_to_string
import urllib
import json
import os
import pathlib
import mimetypes
from django.core import serializers


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

#def contactus_view(request):
#    user_agent = get_user_agent(request)
#    is_mobile = user_agent.is_mobile or user_agent.is_tablet
#    form = ContactUsForm(request.POST or None )
#    sendresult = False
#
#    if form.is_valid():
#       form.save()
#       sendresult = True
#       form = ContactUsForm()
#
#    return render(request, "contactus.html", {"is_mobile": is_mobile, "form" : form, "sendresult": sendresult})


def contactus_view(request):
    user_agent = get_user_agent(request)
    is_mobile = user_agent.is_mobile or user_agent.is_tablet
    #comments_list = Comment.objects.order_by('-created_at')

    #if request.method == 'POST':
        #form = CommentForm(request.POST)
    form = ContactUsForm(request.POST or None )
    sendresult = False
    if form.is_valid():
        #''' Begin reCAPTCHA validation '''
        recaptcha_response = request.POST.get('g-recaptcha-response')
        url = 'https://www.google.com/recaptcha/api/siteverify'
        values = {
            'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
            'response': recaptcha_response
        }
        data = urllib.parse.urlencode(values).encode()
        req =  urllib.request.Request(url, data=data)
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode())
        #''' End reCAPTCHA validation '''
        if result['success']:
            form.save()
            sendresult = True
            form = ContactUsForm()
            messages.success(request, 'New comment added with success!')
        else:
            messages.error(request, 'Invalid reCAPTCHA. Please try again.')

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

    allwinners = Winners.objects.select_related('idcodecompany')

    if request.method == 'POST':
        if formWinner.is_valid():
            formWinner.save()

    return render(request, "Accounts/generatewinners.html", {"is_mobile": is_mobile, "allwinners" : allwinners, "formWinner": formWinner})
    #return render(request, "Accounts/generatewinners.html", {"is_mobile": is_mobile, "allwinners" : allwinners, "formWinner": formWinner})

def load_users_of_the_company(request):
    company_id = request.GET.get('company')
    users = UserProfile.objects.filter(company=company_id).order_by('createddate')
    return JsonResponse(list(users.values('user_id')), safe = False) 


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
                error_message = "This company don't exists or it is not active. Please contact your company to provide you the right code."
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
        print("no login")
        return HttpResponseRedirect('/')



def ResetPassword_view(request):
    resetemail_value = request.GET.get('resetemail_value', None)
    resultresetpassword = False
    
    if(User.objects.filter(email = resetemail_value).exists()):
        resultresetpassword = True
        # atualizar para mudar de email

   
    data = {
        "resultresetpassword" : resultresetpassword
    }

    return JsonResponse(data, safe=False)

 
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
            text_error = formVoucher.errors.as_data()
        return render(request, 'Accounts/vouchersconfiguration.html', {"is_mobile": is_mobile, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, })
    return render(request, 'Accounts/vouchersconfiguration.html', {"is_mobile": is_mobile, 'formVoucher': formVoucher, 'saveresult' : saveresult, 'text_error' : text_error, })



@login_required(login_url='/accounts/login/')
def downloadvoucher_view(request, idvoucher):

    voucher_idcodewinner = Vouchers.objects.filter(idvoucher = idvoucher).values_list('idcodewinner', flat=True)
    winner_idemployee = Winners.objects.filter(idwinner = voucher_idcodewinner[0]).values_list('idemployee', flat=True)
    
    #validate if user exists
    if winner_idemployee.count() > 0:
        #validade if user is the user logged on
        if winner_idemployee[0] == str(request.user):

            voucher_voucherlocation = Vouchers.objects.filter(idvoucher = idvoucher).values_list('voucherlocation', flat=True)
            print(settings.MEDIA_ROOT)
            print(str(voucher_voucherlocation[0]))
            file_path = os.path.join(settings.MEDIA_ROOT, voucher_voucherlocation[0])
            if os.path.exists(file_path):
                with open(file_path, 'rb') as fh:
                    response = HttpResponse(fh.read(), content_type="application/pdf")
                    response['Content-Disposition'] = 'inline; filename=' + os.path.basename(file_path)
                    return response
        else:
            return JsonResponse("This user cannot access the voucher.", safe=False)
            raise Http404


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

    if phone_value == "":
        user_profile.phone = None
    else:
        user_profile.phone = int(phone_value)
    user_profile.save()


    return JsonResponse("", safe=False)



def refreshVoucher_view(request):
    voucher_idvoucher = Vouchers.objects.all().values('idvoucher')

    all_id_vouchers = list(voucher_idvoucher)
    return JsonResponse(all_id_vouchers, safe=False)


def getVoucher_view(request):
    allVouchers = Vouchers.objects.select_related('idcodewinner')

    #voucher_idvoucher = Vouchers.objects.all().values('idvoucher')

    #allwinners = Winners.objects.select_related('idcodecompany')

    #all_id_vouchers = list(allVouchers)
    context = {
        "allVouchers" : allVouchers
    }
    
    ajax_testvalue = serializers.serialize("json", allVouchers)
 
    return HttpResponse(ajax_testvalue)


def getSelectedVoucher_view(request):
    #voucher_idvoucher = Vouchers.objects.all().values('idvoucher')
    id_selectedvoucher = request.GET.get('id_selectedvoucher', None)
    voucher = Vouchers.objects.filter(idvoucher = id_selectedvoucher).values()
    
    data = {
        "idcodewinner" : list(voucher.values_list('idcodewinner', flat=True)),
        "voucherlocation" : list(voucher.values_list('voucherlocation', flat=True)),
        "mntvoucher" : list(voucher.values_list('mntvoucher', flat=True)), 
        "currency" : list(voucher.values_list('currency', flat=True)),  
        "airlinecompany" : list(voucher.values_list('airlinecompany', flat=True)), 
        "title" : list(voucher.values_list('title', flat=True)), 
        "description" : list(voucher.values_list('description', flat=True)), 
        "state" : list(voucher.values_list('state', flat=True)),
        "active" : list(voucher.values_list('active', flat=True))
    }

    return JsonResponse(data, safe=False)

@csrf_exempt
def updateVoucher_view(request):
    
    #deny anonymouse user to enter the  detail page
    if not request.user.is_authenticated:
            return redirect("login")
    else:
        if request.method =="POST":

            
            idvoucher_value = request.POST.get('idvoucher', None)
            #idwinner_value = request.POST.get('idwinner', None)
            mntvoucher_value = request.POST.get('mntvoucher', None)
            flagupdatefilelocation_value = request.POST.get('flagupdatefilelocation', None)
            currency_value = request.POST.get('currency', None)
            state_value = request.POST.get('state', None)
            favoriteairline_value = request.POST.get('favoriteairline', None)
            vouchertitle_value = request.POST.get('vouchertitle', None)
            voucherdescription_value = request.POST.get('voucherdescription', None)
            checkboxactive_value = request.POST.get('checkboxactive', None)
    

            v = Vouchers.objects.get(idvoucher=idvoucher_value)
            v.mntvoucher = mntvoucher_value  # change field
            v.currency = currency_value
            v.airlinecompany = favoriteairline_value
            v.title = vouchertitle_value
            v.description = voucherdescription_value
            v.state = state_value
            
    
            # if there are a file to upload
            if(flagupdatefilelocation_value == 'true'):
                file_obj = request.FILES.get('file')                # Get the file data from
                v.voucherlocation = file_obj

            # if checkbox active is true
            checkboxactive = False
            if(checkboxactive_value == 'true'):
                checkboxactive = True
                

            v.active = checkboxactive
            v.save() # this will update only

    return JsonResponse('data', safe=False)


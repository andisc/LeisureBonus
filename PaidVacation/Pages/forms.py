from django import forms
from .models import ReferencedCompanies, Companies ,Vouchers, MessagesContacts, Winners
import datetime, calendar


def days_choices():
    return [(r,r) for r in range(1, 32)]

def year_choices():
    return [(r,r) for r in range(1899, datetime.date.today().year+1)]

def month_choices():
    return [(str(i), calendar.month_name[i]) for i in range(1,13)]

NUMBEREMPLOYEES_CHOICES = [    # Note square brackets.
    (u'', u'Number of employees'),
    (1, u'< 50'),
    (2, u'1-50'),
    (3, u'51-100'),
    (4, u'101-250'),
    (5, u'251-500'),
    (6, u'501-1000'),
    (7, u'1001-2000'),
    (8, u'> 2000'),      
]

MYROLE_CHOICES = [    # Note square brackets.
    (u'', u'My Role'),
    (1, u'Trainee / Intern'),
    (2, u'Analyst'),
    (3, u'CEO'),
    (4, u'CFO'),
    (5, u'Manager'),
    (6, u'Director'),
    (7, u'Supervisor'),
    (8, u'Consultant'),      
]

DEPARTMENT_CHOICES = [    # Note square brackets.
    (u'', u'Department'),
    (1, u'Marketing'),
    (2, u'Finance'),
    (3, u'Human Resources'),
    (4, u'Sales'),
    (5, u'Technologies & Inovation'),    
]

COUNTRY_CHOICES = [
    (u'', u'France'),
    (1, u'German'),
    (2, u'Spain'),
    (3, u'United Kingdom'),
    (4, u'Portugal'),
       
]

VOUCHER_STATE_CHOICES = [
    (u'New', u'New'),
    (u'In Progress', u'In Progress'),
    (u'Completed', u'Completed'),
       
]

AIRLINE_COMPANY_CHOICES = [
    (u'images/TAPLogo.png', u'Tap'),
    (u'images/EasyjetLogo.png', u'Easyjet'),
    (u'images/RyanairLogo.png', u'Rynair'),
    (u'images/EmiratesLogo.png', u'Emirates'),
    (u'images/BritishAirwaysLogo.png', u'BritishAirways'),
    (u'images/LufthansaLogo.png', u'Lufthansa'),
       
]

CURRENCY_CHOICES = [
    (u'€', u'Euro'),
    (u'$', u'Dollar'),
    (u'R$', u'Real Brasil'),
    (u'£', u'British Pound'),
]

SEXGENDER_CHOICES = [
    (u'M', u'Male'),
    (u'F', u'Female'),
]

GENERATEVOUCHERSOURCE_CHOICES = [
    (u'manual', u'Manual'),
    (u'automatic', u'Automatic'),
]

class UserRegistrationForm(forms.Form):
    username = forms.CharField(
        required = True,
        label = '',
        max_length = 32,
        widget=forms.TextInput(attrs={'placeholder': "Username", 'class': 'form-control'}),
    )
    firstname = forms.CharField(
        required = False,
        label = '',
        max_length = 32,
        widget=forms.TextInput(attrs={'placeholder': "First name", 'class': 'form-control'}),
    )
    lastname = forms.CharField(
        required = False,
        label = '',
        max_length = 32,
        widget=forms.TextInput(attrs={'placeholder': "Last name", 'class': 'form-control'}),
    )
    email = forms.EmailField(
        required = True,
        label = '',
        max_length = 32,
        widget=forms.TextInput(attrs={'placeholder': "Corporate E-mail", 'class': 'form-control'}),
    )
    password = forms.CharField(
        required = True,
        label = '',
        max_length = 32,
        widget=forms.PasswordInput(attrs={'placeholder': "Password", 'class': 'form-control'}),
    )
    code = forms.CharField(
        required = True,
        label = '',
        max_length = 32,
        widget=forms.TextInput(attrs={'placeholder': "Enter your CODE here", 'class': 'form-control'}),
    )
    birthday = forms.CharField(
        required = True,
        widget=forms.Select(choices=days_choices(), attrs={'placeholder': "Enter your CODE here", 'class': 'form-control'}),
    )
    birthdaymonth = forms.CharField(
        required = True,
        widget=forms.Select(choices=month_choices(), attrs={'placeholder': "Enter your CODE here", 'class': 'form-control'}),
    )
    birthdayyear = forms.CharField(
        required = True,
        widget=forms.Select(choices=year_choices(), attrs={'placeholder': "Enter your CODE here", 'class': 'form-control'}),
    )
    agree = forms.BooleanField(
        required = True,
        label = "I agree to LeisureBonus's Terms of Service, Privacy Policy and Content Policies.",
        widget=forms.CheckboxInput(attrs={'placeholder': "Agree", 'class': 'form-check-label'}),
    )
    sexgender = forms.CharField(
        required = False,
        label = '',
        max_length = 1,
        widget=forms.Select(choices = SEXGENDER_CHOICES, attrs={'placeholder': "Sex gender", 'class': 'form-control'}),
    )
    phone = forms.DecimalField(
        required = False,
        label = '',
        widget=forms.NumberInput(attrs={'placeholder': "Phone", 'class': 'form-control'}),
    )


class ContactUsForm(forms.ModelForm):
    class Meta:
        model = MessagesContacts
        fields = ['firstname','lastname','email', 'message']
        widgets = {
            'firstname' : forms.TextInput(attrs={ 'placeholder': "First your name", 'class': 'form-control', 'size': '20px'}),
            'lastname' : forms.TextInput(attrs={'placeholder': "Last your name", 'class': 'form-control'}),
            'email' : forms.TextInput(attrs={'placeholder': "Enter your E-mail", 'class': 'form-control'}),
            'message' : forms.Textarea(attrs={'placeholder': "Enter your message", "rows": 5, 'class': 'form-control'}),
        }

class ReferCompanyForm(forms.ModelForm):
    class Meta:
        model = ReferencedCompanies
        fields = ['firstname','lastname','corporateemail','company','numberemployees','myrole','department','phonenumber',]
        widgets = {
            'firstname' : forms.TextInput(attrs={ 'placeholder': "First name", 'class': 'form-control', 'size': '20px'}),
            'lastname' : forms.TextInput(attrs={'placeholder': "Last name", 'class': 'form-control'}),
            'corporateemail' : forms.TextInput(attrs={'placeholder': "Corporate E-mail", 'class': 'form-control'}),
            'company' : forms.TextInput(attrs={'placeholder': "Company", 'class': 'form-control'}),
            'numberemployees' : forms.Select(choices=NUMBEREMPLOYEES_CHOICES, attrs={'class': "form-control"}),
            'myrole' : forms.Select(choices = MYROLE_CHOICES, attrs={'class': "form-control"}),
            'department' : forms.Select(choices = DEPARTMENT_CHOICES, attrs={'class': "form-control"}),
            'phonenumber' : forms.TextInput(attrs={'placeholder': "Phone number", 'class': 'form-control'}),
        }


class newCompanyForm(forms.ModelForm):
    class Meta:
        model = Companies
        fields = ['idcode', 'name', 'city', 'country', 'defaultemail', 'numberemployees', 'nifnumber', 'phonenumber', 'numberwinnermonth', 'active']
        widgets = {
            'idcode' : forms.TextInput(attrs={'ID': 'idcode', 'placeholder': "ID CODE", 'class': 'form-control', 'size': '20px'}),
            'name' : forms.TextInput(attrs={'placeholder': "Company Name", 'class': 'form-control'}),
            'city' : forms.TextInput(attrs={'placeholder': "City", 'class': 'form-control'}),
            'country' : forms.Select(choices=COUNTRY_CHOICES, attrs={'class': "form-control"}),
            'defaultemail' : forms.TextInput(attrs={'placeholder': "Default E-mail", 'class': 'form-control'}),
            'nifnumber' : forms.TextInput(attrs={'placeholder': "NIF Number", 'class': 'form-control'}),
            'numberemployees' : forms.NumberInput(attrs={'placeholder': "Number of employees", 'class': 'form-control'}),
            'phonenumber' : forms.TextInput(attrs={'placeholder': "Default Phone number", 'class': 'form-control'}),
            'numberwinnermonth' : forms.NumberInput(attrs={'placeholder': "Number of winner per month", 'class': 'form-control'}),
            'active' : forms.CheckboxInput(attrs={'placeholder': "Active", 'class': 'form-check-label'}),
        }

class newWinnerForm(forms.ModelForm):
    class Meta:
        model = Winners
        fields = ['idemployee', 'idcodecompany', 'source']
        widgets = {
            #'idemployee' : forms.TextInput(attrs={'placeholder': "Id employee", 'class': 'form-control', 'size': '20px'}),
            #'idcodecompany' : forms.TextInput(attrs={'placeholder': "Company Name", 'class': 'form-control'}),
            'source' : forms.Select(choices=GENERATEVOUCHERSOURCE_CHOICES, attrs={'class': "form-control"}),
        }


class newVoucherForm(forms.ModelForm):
    class Meta:
        model = Vouchers
        fields = ['idcodewinner', 'idcodecompany', 'idemployee', 'voucherlocation', 'mntvoucher', 'currency', 'title', 'description', 'state', 'airlinecompany', 'active']
        widgets = {
            #'idcodecompany' : forms.ModelChoiceField(queryset=Companies.objects.all(), attrs={'name': "a"}),
            #'idemployee' : forms.TextInput(attrs={'placeholder': "ID Employee", 'class': 'textBoxStyleBorder'}),
            'voucherlocation' : forms.FileInput(attrs={'name': "voucherfile"}),
            'mntvoucher' : forms.TextInput(attrs={'placeholder': "Voucher amount", 'class': 'form-control'}),
            'currency' : forms.Select(choices=CURRENCY_CHOICES, attrs={'class': "form-control"}),
            'title' : forms.TextInput(attrs={'placeholder': "Voucher Title", 'class': 'form-control'}),
            'description' : forms.TextInput(attrs={'placeholder': "Description", 'class': 'form-control'}),
            'state' : forms.Select(choices=VOUCHER_STATE_CHOICES, attrs={'class': "form-control"}),
            'airlinecompany' : forms.Select(choices=AIRLINE_COMPANY_CHOICES, attrs={'class': "form-control"}),
            'active' : forms.CheckboxInput(attrs={'placeholder': "Active2", 'class': 'form-check-label'}),
        }

    #def __init__(self, user, *args, **kwargs):
    #    super(newVoucherForm, self).__init__(*args, **kwargs)
    #    self.fields['idcodecompany'].queryset = Companies.objects.values_list('idcode')

from django.db import models
from django.contrib.auth.models import User
from django.forms import forms

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, to_field='username', on_delete=models.CASCADE)
    company = models.CharField(max_length=20)
    birthdaymonth = models.DecimalField(decimal_places=0, max_digits=2)
    birthday = models.DecimalField(decimal_places=0, max_digits=2)
    birthdayyear = models.DecimalField(decimal_places=0, max_digits=4)
    sexgender = models.CharField(max_length=1, blank=True, null=True)
    work = models.CharField(max_length=50, blank=True, null=True)
    phone = models.DecimalField(decimal_places=0, max_digits=10, blank=True, null=True)
    favoriteairline = models.CharField(max_length=25, blank=True, null=True)
    favoritecountry = models.CharField(max_length=25, blank=True, null=True)
    emailnotification = models.BooleanField(default=True)
    phonenotification = models.BooleanField(default=False)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "UserProfile"

    def __str__(self):
        return f'{self.user}'


class MessagesContacts(models.Model):
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    email = models.EmailField(max_length=100)
    message = models.CharField(max_length=255)
    read = models.BooleanField(default=False)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "MessagesContacts"


class ReferencedCompanies(models.Model):
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    corporateemail = models.EmailField(max_length=60)
    company = models.CharField(max_length=40)
    numberemployees = models.CharField(max_length=100)
    myrole = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    phonenumber = models.DecimalField(decimal_places=0, max_digits=9)
    read = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "ReferencedCompanies"

    def __str__(self):
        return f'{self.company}'


class Companies(models.Model):
    idcode = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    defaultemail = models.EmailField(max_length=60)
    nifnumber = models.DecimalField(decimal_places=0, max_digits=9)
    numberemployees = models.DecimalField(decimal_places=0, max_digits=9)
    phonenumber = models.DecimalField(decimal_places=0, max_digits=9)
    numberwinnermonth = models.DecimalField(decimal_places=0, max_digits=3)
    #automaticvouchercost
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Companies"

    def __str__(self):
        return f'{self.idcode}'



class Winners(models.Model):
    idwinner = models.AutoField(primary_key=True)
    idemployee = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    idcodecompany = models.ForeignKey(Companies, to_field='idcode', on_delete=models.CASCADE)
    source = models.CharField(max_length=20)
    state = models.CharField(max_length=20, blank=True)
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Winners"

    def __str__(self):
        return f'{self.idwinner}'


class Vouchers(models.Model):
    idvoucher = models.AutoField(primary_key=True)
    idcodewinner = models.OneToOneField(Winners, to_field='idwinner', on_delete=models.CASCADE)
    voucherlocation = models.FileField(upload_to='protected/')
    mntvoucher = models.DecimalField(decimal_places=2, max_digits=9)
    currency = models.CharField(max_length=1)
    airlinecompany = models.CharField(max_length=100)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=255, blank=True)
    state = models.CharField(max_length=20, blank=True)
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "Vouchers"

class DeletedAccounts(models.Model):
    iddeletedaccount = models.AutoField(primary_key=True)
    motive = models.CharField(max_length=100)
    othermotivedesc = models.CharField(max_length=255, blank=True)
    read = models.BooleanField(default=False)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "DeletedAccounts"


class AirlineCompanies(models.Model):
    airlinecompany = models.CharField(max_length=30, unique=True)
    ranking = models.DecimalField(decimal_places=2, max_digits=4)
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "AirlineCompanies"

    def __str__(self):
        return f'{self.airlinecompany}' + ' - ' + f'{self.ranking}'



class CountryAirlineCompany(models.Model):
    countrycode = models.CharField(max_length=2)
    countrydescription = models.CharField(max_length=20)
    airlinecompany = models.ForeignKey(AirlineCompanies, to_field='airlinecompany', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "CountryAirlineCompany"

    def __str__(self):
        return f'{self.countrycode}' + ' ' + f'{self.airlinecompany}'


class FeedbackEmployees(models.Model):
    idemployee = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    traveldestination = models.CharField(max_length=20)
    feedbackmessage = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    createddate = models.DateTimeField(auto_now_add=True)
    modifiedddate = models.DateTimeField(auto_now=True)
    class Meta:
        verbose_name_plural = "FeedbackEmployees"



    
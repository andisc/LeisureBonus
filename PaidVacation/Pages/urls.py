from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler404
from . import views
from Pages.views import HomePageView


urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('howitworks/', views.howitworks, name='howitworks'),
    path('PlansDetails/', views.plansdetails_view, name='plansdetails_view'),
    path('ReferCompany/', views.refercompany_view, name='refercompany'),
    path('ReferNewCompany/', views.refernewcompany_view, name='refernewcompany'),
    path('Register/', views.register, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('MyAccount/', views.MyAccount_view, name='MyAccount'),
    path('contactus/', views.contactus_view, name='contactus'),
    path('FAQ/', views.faq_view, name='faq'),
    path('terms-conditions/', views.termsconditions_view, name='termsconditions'),
    path('privacy-policy/', views.privacypolicy_view, name='privacypolicy'),
    path('cookies-policy/', views.cookiespolicy_view, name='cookiespolicy'),
    path('CreateCompany/', views.createcompany_view, name='createcompany'),
    path('UploadVoucher/', views.uploadvoucher_view, name='uploadvoucher_view'),
    path('DownloadVoucher/', views.downloadvoucher_view, name='downloadvoucher_view'),
    path('MyAccount/MyHistory/', views.myhistory_view, name='myhistory_view'),
    path('MyAccount/ChooseMyBonus/', views.choosemybonus_view, name='choosemybonus_view'),
    path('MyAccount/PersonalProfile/', views.personalprofile_view, name='personalprofile_view'),
    path('MyAccount/AdminConfiguration/', views.adminconfiguration_view, name='adminconfiguration_view'),
    path('MyAccount/GenerateWinners/', views.generatewinners_view, name='generatewinners_view'),
    path('MyAccount/GenerateAutomaticWinners/', views.generateauomaticwinners_view, name='generateauomaticwinners_view'),
    path('MyAccount/VouchersConfiguration/', views.vouchersconfiguration_view, name='vouchersconfiguration_view'),
    path('MyAccount/SettingsConfiguration/', views.settingsconfiguration_view, name='settingsconfiguration_view'),
    path('MyAccount/SettingsConfiguration/DeleteAccount/', views.settingsdeleteaccount_view, name='settingsdeleteaccount_view'),
    path('ajax/SavePersonalInformation/', views.settingsconfigurationsave_view, name='settingsconfigurationsave_view'),
    path('ajax/choosecountry/', views.choosecountry_view, name='choosecountry'),
    path('ajax/savechoice/', views.savechoice_view, name='savechoice'),
    path('ajax/changeprofile/', views.changeprofile_view, name='changeprofile'),
    path('ajax/changepassword/', views.changepassword_view, name='changepassword'),
]


#handler404 = 'Pages.views.error_404_view'
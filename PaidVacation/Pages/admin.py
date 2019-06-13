from django.contrib import admin
from .models import UserProfile, ReferencedCompanies, Companies, Winners, Vouchers, MessagesContacts, DeletedAccounts, CountryAirlineCompany, AirlineCompanies, FeedbackEmployees
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(ReferencedCompanies)
admin.site.register(Companies)
admin.site.register(Winners)
admin.site.register(Vouchers)
admin.site.register(MessagesContacts)
admin.site.register(DeletedAccounts)
admin.site.register(CountryAirlineCompany)
admin.site.register(AirlineCompanies)
admin.site.register(FeedbackEmployees)
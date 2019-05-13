from django.contrib import admin
from .models import UserProfile, ReferencedCompanies, Companies, Winners, Vouchers, MessagesContacts
# Register your models here.

admin.site.register(UserProfile)
admin.site.register(ReferencedCompanies)
admin.site.register(Companies)
admin.site.register(Winners)
admin.site.register(Vouchers)
admin.site.register(MessagesContacts)
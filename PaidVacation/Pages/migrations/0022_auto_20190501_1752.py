# Generated by Django 2.0.4 on 2019-05-01 17:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Pages', '0021_auto_20190501_1751'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vouchers',
            old_name='idwinner',
            new_name='idcodewinner',
        ),
    ]

# Generated by Django 2.0.4 on 2019-05-08 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pages', '0027_userprofile_sexgender'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='phone',
            field=models.DecimalField(blank=True, decimal_places=0, max_digits=10, null=True),
        ),
    ]
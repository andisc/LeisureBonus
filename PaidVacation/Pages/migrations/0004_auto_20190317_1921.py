# Generated by Django 2.0.4 on 2019-03-17 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pages', '0003_auto_20190317_1858'),
    ]

    operations = [
        migrations.AddField(
            model_name='referencedcompanies',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='referencedcompanies',
            name='phonenumber',
            field=models.DecimalField(decimal_places=0, max_digits=9),
        ),
    ]

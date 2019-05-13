# Generated by Django 2.0.4 on 2019-04-07 21:12

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Pages', '0006_companies'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='companies',
            options={'verbose_name_plural': 'Companies'},
        ),
        migrations.AlterModelOptions(
            name='referencedcompanies',
            options={'verbose_name_plural': 'ReferencedCompanies'},
        ),
        migrations.AddField(
            model_name='companies',
            name='createddate',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='companies',
            name='modifiedddate',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='referencedcompanies',
            name='createddate',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='referencedcompanies',
            name='modifiedddate',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
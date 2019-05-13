# Generated by Django 2.0.4 on 2019-04-25 11:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Pages', '0012_auto_20190425_1116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companies',
            name='idcode',
            field=models.CharField(max_length=20, unique=True),
        ),
        migrations.AlterField(
            model_name='vouchers',
            name='idcodecompany',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Pages.Companies', to_field='idcode'),
        ),
    ]
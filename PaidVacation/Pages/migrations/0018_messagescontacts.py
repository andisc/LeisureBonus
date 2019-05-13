# Generated by Django 2.0.4 on 2019-05-01 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pages', '0017_auto_20190426_2233'),
    ]

    operations = [
        migrations.CreateModel(
            name='MessagesContacts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=20)),
                ('lastname', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=100)),
                ('message', models.CharField(max_length=255)),
                ('read', models.BooleanField(default=False)),
                ('createddate', models.DateTimeField(auto_now_add=True)),
                ('modifiedddate', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name_plural': 'MessagesContacts',
            },
        ),
    ]

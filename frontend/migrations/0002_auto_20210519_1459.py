# Generated by Django 3.2 on 2021-05-19 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Places',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.TextField()),
                ('lattitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('seller', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('email', models.CharField(max_length=27)),
                ('password', models.CharField(max_length=20)),
                ('selldetails', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]
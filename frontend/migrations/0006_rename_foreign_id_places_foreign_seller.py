# Generated by Django 3.2 on 2021-05-24 14:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0005_rename_place_places'),
    ]

    operations = [
        migrations.RenameField(
            model_name='places',
            old_name='foreign_id',
            new_name='foreign_seller',
        ),
    ]

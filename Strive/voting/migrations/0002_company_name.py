# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='name',
            field=models.CharField(default='', max_length=300),
            preserve_default=False,
        ),
    ]

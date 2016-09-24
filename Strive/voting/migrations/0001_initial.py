# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=300)),
                ('prizes', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('id_matchup', models.IntegerField(default=0)),
                ('a_won_true', models.BooleanField()),
                ('company_match_a', models.ForeignKey(related_name='company_match_a', to='voting.Company', null=True)),
                ('company_match_b', models.ForeignKey(related_name='company_match_b', to='voting.Company', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('time_created', models.DateTimeField(verbose_name=b'date started')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('amount', models.IntegerField(default=0)),
                ('company_match', models.ForeignKey(to='voting.Match')),
                ('username', models.ForeignKey(to='voting.User')),
            ],
        ),
        migrations.AddField(
            model_name='match',
            name='tournament',
            field=models.ForeignKey(to='voting.Tournament'),
        ),
    ]

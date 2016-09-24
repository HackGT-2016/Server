from django.db import models

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=200)
    email = models.CharField(max_length = 200)
    password = models.CharField(max_length = 200)

    def __str__(self):
        return self.username;

class Company(models.Model):
    name = models.CharField(max_length = 300)
    description = models.CharField(max_length = 300)
    prizes = models.CharField(max_length = 300)

    def __str__(self):
        return self.name;

class Tournament(models.Model):
    time_created = models.DateTimeField('date started')

    def __str__(self):
        return self.username;

class Match(models.Model):
    id_matchup = models.IntegerField(default = 0)
    company_match_a = models.ForeignKey(Company, null = True, related_name = 'company_match_a' )
    company_match_b = models.ForeignKey(Company, null = True, related_name = 'company_match_b' )
    tournament = models.ForeignKey(Tournament)
    a_won_true = models.BooleanField()

    def __str__(self):
        return str(self.id_matchup) + " " + this.company_match_a + " : " + this.company_match_b;

class Vote(models.Model):
    amount = models.IntegerField(default = 0)
    username = models.ForeignKey(User)
    company_match = models.ForeignKey(Match)

    def __str__(self):
        return this.company_match + " : " + this.username;


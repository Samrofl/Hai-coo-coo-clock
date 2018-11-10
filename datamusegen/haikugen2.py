from datamuse import datamuse
from random import randint

api = datamuse.Datamuse()

sylablesremaining = 5
line1 = ""

while sylablesremaining > 0:
    word = api.words(rel_trg='rain',md='s', max=40)
    i = 100
    while i > sylablesremaining:
        find = randint(1,40) - 1
        i = word[find]["numSyllables"]
    sylablesremaining = sylablesremaining - word[find]["numSyllables"]

    line1 = line1 + word[find]["word"] + " "

sylablesremaining = 7
line2 = ""

while sylablesremaining > 0:
    word = api.words(rel_trg='wind',md='s', max=40)
    i = 100
    while i > sylablesremaining:
        find = randint(1,40) - 1
        i = word[find]["numSyllables"]
    sylablesremaining = sylablesremaining - word[find]["numSyllables"]

    line2 = line2 + word[find]["word"] + " "

sylablesremaining = 5
line3 = ""

while sylablesremaining > 0:
    word = api.words(rel_trg='tea',md='s', max=40)
    i = 100
    while i > sylablesremaining:
        find = randint(1,40) - 1
        i = word[find]["numSyllables"]
    sylablesremaining = sylablesremaining - word[find]["numSyllables"]

    line3 = line3 + word[find]["word"] + " "

print(line1)
print(line2)
print(line3)

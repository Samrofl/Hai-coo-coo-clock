
from datamuse import datamuse
from random import randint

api = datamuse.Datamuse()
word = api.words(rel_trg='rain',md='s', max=40)
print(word[4]["numSyllables"])

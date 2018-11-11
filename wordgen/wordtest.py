from datamuse import datamuse
import time
from random import randint
api = datamuse.Datamuse()

weathers=['thunderstorm', 'lightning', 'rain', 'snow','fog','clear','clouds']

print('synonyms')
print('========')
for weather in weathers:
    general_words=api.words(rel_syn=weather, topics='weather', max=10)
    print(weather)
    print('-------')
    # for result in general_words:
        # print(result.get("word"))
    # print('\n')
print('\n')

print('generalisations')
print('==============')
for weather in weathers:
    general_words=api.words(rel_gen=weather, md='s', topics='weather', max=10)
    print(weather)
    print('-------')
    for result in general_words:
        syls = api.words()
        print(result.get("word") + ' ' + str(result.get("numSyllables")))
    print('\n')
print('\n')

print('triggers')
print('========')
for weather in weathers:
    general_words=api.words(rel_trg=weather, topics='weather', max=10)
    print(weather)
    print('-------')
    # for result in general_words[2:]:
        # print(result.get("word"))
    # print('\n')
print('\n')

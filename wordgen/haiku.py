from datamuse import datamuse
from random import randint
from random import choice
import lyricsgenius as genius
import sys
api = datamuse.Datamuse()
genius_api=genius.Genius('')

SAMPLE_SIZE=15

weather=str(sys.argv[1])

places=['pond','lake','grassland','water','mud','dirt']
nature=['bird','cat','dog','frog','toad','snake','rodent','fish','cow','insect']
prepositions=['in','on','above','to','on']
determiners=['the','a','and','an','this','one']

def generate_line_one(weather):
    syllables_remaining=5
    line1=""

    mls=api.words(ml=weather, md='s', max=SAMPLE_SIZE)
    word_found=False 

    while word_found == False:
        rand_range=min(len(mls),SAMPLE_SIZE)
        i = randint(0,rand_range-1)
        if(mls[i]["numSyllables"] <= syllables_remaining):
            line1 = line1+mls[i]["word"]
            syllables_remaining-=mls[i]["numSyllables"]
            word_found=True

    while syllables_remaining>0:
        position_seed=choice(['before', 'after']) 

        if(position_seed=='before'):
            adjs=api.words(rel_jjb=weather, md='s', max=SAMPLE_SIZE)

            word_found=False

            while word_found == False:
                rand_range=min(len(adjs),SAMPLE_SIZE)
                i = randint(0,rand_range-1)
                if(adjs[i]["numSyllables"] <= syllables_remaining):
                    line1 = adjs[i]["word"] + ' ' + line1
                    syllables_remaining-=adjs[i]["numSyllables"]
                    word_found=True

        else:
            spcs=api.words(rel_spc=weather, md='s', max=SAMPLE_SIZE)
            word_found=False

            while word_found == False:
                rand_range=min(len(spcs),SAMPLE_SIZE)
                i = randint(0,rand_range-1)
                if(spcs[i]["numSyllables"] <= syllables_remaining):
                    line1 = line1 + ' ' + spcs[i]["word"]
                    syllables_remaining-=spcs[i]["numSyllables"]
                    word_found=True
    return line1

def generate_line_two():
    place=choice(places)
    creature=choice(nature)
    print ('\n')
    print(place)
    print(creature)
    print ('\n')

    place_hypo=api.words(rel_gen=place, md='s', max=10)
    creature_hypo=api.words(rel_gen=creature, md='s', max=10)

    print('places')
    print('======')
    for result in place_hypo:
        print(result.get("word"))
    print('\n')

    print('creatures')
    print('=========')
    for result in creature_hypo:
        print(result.get("word"))
    print('\n')

print(generate_line_one(weather))
generate_line_two()

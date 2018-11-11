from nltk.corpus import wordnet as wn

rainsets=wn.synsets('snow')

for synset in rainsets:
    print(synset)
    for lemma in synset.lemmas():
        print(lemma.name())
    print('---')
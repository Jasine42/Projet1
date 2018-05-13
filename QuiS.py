from random import randint


liste_noms=['mounier','domps']
liste_caracteristiques=[['lunettes','physique','prof','homme'],['chauve','CPE','homme']]
nb=randint(0,len(liste_noms)-1)
perso_choisi=liste_noms[nb]
question=input('saisissez une question')
n=0
while n<10 :
    question=input('saisissez une question')
    print(question)
    if question in liste_caracteristiques [nb]:
      print("oui")
    else :
      print("non")
      n=+1
    break
      


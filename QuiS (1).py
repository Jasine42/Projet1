from random import randint

liste_noms=['mounier','domps','thomas','brunon']
liste_caracteristiques=[['Mounier,lunettes','physique','prof','homme'],['Domps','chauve','CPE','homme'],['Thomas','femme','histoire','géographie','prof'],['Brunon','femme','math','prof']]
nb=randint(0,len(liste_noms)-1)
perso_choisi=liste_noms[nb]
#question=input('saisissez une question')
n=0
print(liste_noms)
while n<2 :
    question=input('saisissez une question')
    #print(question)
     #print(liste_noms)
    if question=='je tente ma chance':
     ss=input('il est encore temps de faire marche arrier êtes vous vraiment sur ?')
     if ss=='oui':
       input('alors quelle est votre reponse')
     else:
        print('vous avez fait le bon choix, continuons...')
    if question in liste_caracteristiques [nb]:
       print("oui,bravo !")
    else :
      print("non, réessayer")
      
    
      


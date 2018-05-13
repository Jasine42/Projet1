from random import randint
from tkinter import *
def jouer():
 print('---JEUX---')
 print('[1] PROFESSEUR')
 print('[2] STAR')
 jeux_choisis=input()
if jeux_choisis=='1':
  print('vous avez choisis le Qui est-ce professeur') 
  liste_noms=['Mounier','Domps','Thomas','Brunon','Verneyre']
  p1='est-ce qu il a des lunettes?'
  p2='est-ce que c est un homme?'
  p3='est-ce que c est une femme?'
  p4='est-ce que c est un prof?'
  p5='est-ce que c est un CPE?'
  p6='est-ce que c est un prof d histoire?'
  p7='est-ce que c est un prof de math?'
  p8='est-ce que c est un prof de physique?'
  p9='est-ce qu il est chauve?'

 
  liste_caracteristiques=[['Mounier:',p1,p8,p4,p2],['Domps:',p9,p5,p2],['Thomas:',p3,p6,p4,p2],['Brunon:',p3,p7,p4,p1],['Verneyre:',p1,p4,p6,p2,]]
  nb=randint(0,len(liste_noms)-1)
  perso_choisi=liste_noms[nb]
  #question=input('saisissez une question')
  n=0
  print(liste_noms)

  while n<5 :
    question=input('saisissez une question')
    #print(question)
    if question in liste_caracteristiques [nb]:
       print("oui,bravo !")
    else :
      print("non, réessayer")
    n+=1
    if question=='je tente ma chance':
     ss=input('il est encore temps de faire marche arrier êtes vous vraiment sur ?')
     if ss=='oui':
        reponse=input('alors quelle est votre reponse')
        if reponse!=liste_noms[nb]:
            print('vous avez perdu')
            print('c etait',perso_choisi)
            n+=5
        else:
            print('vous avez gagné')
            n+=5
     else:
        print('vous avez fait le bon choix, continuons...')
  if n==5:
    print('vous avez depassé le nombre d essaies possibles vous devez tenter votre chance !')
    reponse=input('saisissez une reponse')
    if reponse!=liste_noms[nb]:
            print('vous avez perdu')
            print('c etait',perso_choisi)
    else:
            print('vous avez gagné')
    n+=5
else:
      jeux_choisis=='2'
      print("oui")
        
      


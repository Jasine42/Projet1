from random import randint
from tkinter import *


def jouer():
 
 print('--------------------------JEUX------------------------')
 print('Vous allez jouer au Qui-est ce contre l ordinateur, indiquez avec quelle categorie de personne vous voulez jouer')
 print('')
 print('une fois que vous pensez avoir trouver le personnage il vous suffit d ecrire: je tente ma chance')
 print('[1] PROFESSEUR')
 print('[2] STAR')
 jeux_choisis=input()
 p1='est-ce qu il a des lunettes?'
 p2='est-ce que c est un homme?'
 p3='est-ce que c est une femme?'
 p4='est-ce que c est un prof?'
 p5='est-ce que c est un CPE?'
 p6='est-ce que c est un prof d histoire?'
 p7='est-ce que c est un prof de math?'
 p8='est-ce que c est un prof de physique?'
 p9='est-ce qu il est chauve?'

 if jeux_choisis=='1':

     question()

def question():

    
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
    print('-----------------------QUESTION---------------------------')
    print(p1)
    print(p2)
    print(p3)
    print(p4)
    print(p5)
    print(p6)
    print(p7)
    print(p8)
    print(p9)
    carac()

def carac():
       p1='est-ce qu il a des lunettes?'
       p2='est-ce que c est un homme?'
       p3='est-ce que c est une femme?'
       p4='est-ce que c est un prof?'
       p5='est-ce que c est un CPE?'
       p6='est-ce que c est un prof d histoire?'
       p7='est-ce que c est un prof de math?'
       p8='est-ce que c est un prof de physique?'
       p9='est-ce qu il est chauve?'
       print('')
       print ('-----------------------CARACTERISTIQUES---------------------------')
       print('')
       print('Mounier: lunettes, homme, prof, prof de physique')
       print('Domps: homme, CPE, chauve')
       print('Thomas: femme, prof, prof d histoire')
       print('Brunon: lunettes, femme, prof, prof de math')
       print('Verneyre: lunettes, homme, prof, prof d histoire')
       print('vous avez choisis le Qui est-ce professeur') 
       print('-----------------------NIVEAU DE DIFFICULTE---------------------------')
       print('[1] NORMAL')
       print('[2] EXTREME')
       niveau_dif=input()
       if niveau_dif=='1':
         print('')
         print('Bonne partie, vous avez 5 essais')
         print('')
                 
         liste_noms=['Mounier','Domps','Thomas','Brunon','Verneyre']
         liste_caracteristiques=[['Mounier:',p1,p8,p4,p2],['Domps:',p9,p5,p2],['Thomas:',p3,p6,p4],['Brunon:',p3,p7,p4,p1],['Verneyre:',p1,p4,p6,p2,]]
         nb=randint(0,len(liste_noms)-1)
         perso_choisi=liste_noms[nb]
         #question=input('saisissez une question')
         n=1
   
         while n<6 :
           question=input('saisissez une question')
           #print(question)
           if question in liste_caracteristiques [nb] or question=='je tente ma chance':
             print("oui,bravo !")
             print(n)
           else :
             print('non, réessayer')
             print(n)
           n+=1
           if question=='je tente ma chance':
            ss=input('Voulez vous vraiment tenter votre chance?')
            print('Si votre reponse est mauvaise vous perdez')
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
         if n==6:
           print('vous avez depassé le nombre d essaies possibles vous devez tenter votre chance !')
           reponse=input('saisissez une reponse')
           if reponse!=liste_noms[nb]:
                   print('vous avez perdu')
                   print('c etait',perso_choisi)
           else:
                   print('vous avez gagné le niveau normal')
           n+=5
       else: 
         print('')
         print('Bonne partie, vous avez 4 essais')
         print('')
                 
         liste_noms=['Mounier','Domps','Thomas','Brunon','Verneyre']
         liste_caracteristiques=[['Mounier:',p1,p8,p4,p2],['Domps:',p9,p5,p2],['Thomas:',p3,p6,p4],['Brunon:',p3,p7,p4,p1],['Verneyre:',p1,p4,p6,p2,]]
         nb=randint(0,len(liste_noms)-1)
         perso_choisi=liste_noms[nb]
         #question=input('saisissez une question')
         n=1
   
         while n<5 :
           question=input('saisissez une question')
           #print(question)
           if question in liste_caracteristiques [nb]:
             print("oui,bravo !")
             print(n)
           else :
             print("non, réessayer")
             print(n)
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
                   print('vous avez gagné le niveau extreme!')
           n+=3


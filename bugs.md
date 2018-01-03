# Bugs

## Fixed

1. Knoppen werken niet accuraat ✔
2. Euro wordt toegevoegd aan Trips bij herladen ✔
3. Reset knop werkt niet (Works as intended) ✔
4. Bij het maken van een trip in munteenheid "aud" staat deze toch in "EUR" na het opslaan. ✔

## TODO

1. Na wat trips aanmaken en dubbel klikken op een trip krijg ik deze error: screenshot: error1 -->  https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY 
2. Dubbelklikken op "Add" knop opent meerdere components
3. Elke participant moet uniek zijn. Er mogen niet meerdere participants toegevoegd worden met dezelfde voor -en achternaam.

## Not reconstructible on actual device
1. Binaire code in tekstveld bij Ctrl+A: screenshot: error2 --> https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY  

## Not important 
1. Stacktrace bij volgend scenario: 
   1. create a trip 
   2. go into trip - participants - add user - add new user
   3. wanneer een nieuwe user is aangemaakt en toegevoegd krijg ik volgende stacktrace: error 3 --> https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY  
Dit geeft een warning over forceUpdate op te roepen. Mag genegeerd worden in principe

https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY 

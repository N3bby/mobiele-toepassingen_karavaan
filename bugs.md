# Bugs

## Fixed

1. Knoppen werken niet accuraat ✔
2. Euro wordt toegevoegd aan Trips bij herladen ✔
3. Reset knop werkt niet (Works as intended) ✔
4. Bij het maken van een trip in munteenheid "aud" staat deze toch in "EUR" na het opslaan. ✔
5. create new user: firstname en lastname limiteren op aantal karakters (1-30). Momenteel kunnen er oneindig veel getypt worden. ✔

## TODO

1. Dubbelklikken op "Add" knop opent meerdere components
2. Elke participant moet uniek zijn. Er mogen niet meerdere participants toegevoegd worden met dezelfde voor -en achternaam.
3. ExpenseList doesn't update amount of expense. React-native doesn't allow updating background components, so this is a hard problem to fix.

## Not reconstructible on actual device
1. Binaire code in tekstveld bij Ctrl+A: screenshot: error2 --> https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY  

## Not important 
1. Stacktrace bij volgend scenario: 
   1. create a trip 
   2. go into trip - participants - add user - add new user
   3. wanneer een nieuwe user is aangemaakt en toegevoegd krijg ik volgende stacktrace: error 3 --> https://timvgb.stackstorage.com/s/6N81PE2GA6ugzwY  
Dit geeft een warning over forceUpdate op te roepen. Mag genegeerd worden in principe

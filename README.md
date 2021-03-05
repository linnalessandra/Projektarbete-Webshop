# Projektarbete-Webshop

### Grupp: 
Grupp 4

### Gruppmedlemmar: 
Linn Alessandra Jonson
Elin Nilsson
Ossian Gren
Sara Oscarsson

### Länk till projektet på GitHub
https://github.com/linnalessandra/Projektarbete-Webshop.git

### Inloggningsuppgifter
admin@admin.com
admin

### Kravspecifikation på projektet:

### Alla sidor skall vara responsiva. (G)
Ja vi har anpassat alla sidor så att dom är responsiva med media quieries .

### Arbetet ska implementeras med objektorienterade principer. (G)
Ja vi har samlat alla våra funtioner (metoder) i klasser.

### Skapa ett konceptuellt ER diagram, detta ska lämnas in vid idégodkännandet. (G)
Detta har vi skapat i draw io.

### Beskriv er företagsidé i en kort textuell presentation, detta ska lämnas in vid idégodkännandet. (G)
Vi har beskrivit och presenterat vår företagsidé och lämnat in vid idégodkännandet.

### All data som programmet utnyttjar ska vara sparat i MYSQL databas (produkter, beställningar, konton mm). (G)
Ja all information sparar vi i MYSQL i phpMyAdmin.

### Det ska finnas ett normaliserat diagram över databasen i gitrepot. (G)
Detta har vi skapat i draw io. 

### Det ska finnas ett normaliserat diagram över databasen i gitrepot. (G)
Detta gar vi skapat i draw io.

### Man ska kunna logga in som administratör i systemet. (G).
Det kan man, vi har en kolumn i databasen som heter isAdmin som per default blir till user när man skapar ett konto på sidan. En admin kan godkänna andra användare till att bli admin och då ändras detta i databasen.

### Man ska kunna registrera sig som administratör på sidan, nya användare ska sparas i databasen. (VG)
Nya användare sparas i databasen och för att bli admin på sidan måste en annan admin godkänna detta. Första adminkontot fick vi skapa manuellt i databasen.

### En administratör behöver godkännas av en tidigare administratör innan man kan logga in första gången. (VG)
En admin kan godkänna andra användare till att bli admin via en knapp på admin-sidan och då ändras detta i databasen.

### Inga lösenord får sparas i klastext i databsen. (G)
Detta har vi löst genom att hasha lösenordet innan vi skickar in det i databasen.

### En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen. (G)
Lagersaldot uppdateras när man skapar en order, denna funktionen har vi lagt i order class.

### Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan. (G)
Detta har vi löst genom att på admin sidan skapat ett inputfält där man kan söka fram produkter via produkt id och sedan ändra bla units in stock. Här kan admin även välja att radera produkten. 

### Administratörer ska kunna se en lista på alla gjorda beställningar. (G)
Ja, på admin sidan renderas alla ordrar ut i en tabell.

### Administratörer ska kunna markera beställningar som skickade. (VG)
Detta har vi inte tagit med. 

### Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera. (G)
Ja produkterna i databasen tillhör en kategori var men kan tillhöra flera.

### Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori. (G)
Detta har vi löst så att när man går in på startsidan renderas alla produkter från alla kategorier ut, sen har vi knappar där man kan välja om man bara vill se produkter från en specifik kategori.

### Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i session på servern. (G)
Här har vi valt att spara produkterna i local storage, det känndes lättare så. 
Nu i efterhand förstår vi att det hade varit bättre att spara dem i session.

### Man ska från hemsidan kunna skriva upp sig för att få butikens nyhetsbrev genom att ange sitt namn och epostadress. (G)
På startsidan har vi lagt en knapp till nyhetsbrevet. Med hjälp av en prompt 
frågar vi om mail och namn och detta sparas sen i databasen.


### När man gör en beställning ska man också få chansen att skriva upp sig för nyhetsbrevet. (VG).
Efter en beställning skickas man vidare till en sida där man också har 
chansen att skriva upp sig på nyhetsbrevet.

### När besökare gör en beställning ska hen få ett lösenord till sidan där man kan logga in som kund. Det är ok att spara all kundinformation i användartabellen, ni behöver alltså inte ha en separat costumer tabell om inloggning finns. (VG)
Nej detta har vi inte med.

### När man är inloggad som kund ska man kunna se sina gjorda beställningar och om det är skickade eller inte (VG)
Nej detta har vi inte med.

### Som inloggad kund ska man kunna markera sin beställning som mottagen (VG)
Detta har vi inte med.

### Administratörer ska kunna se en lista över personer som vill ha nyhetsbrevet och deras epost adresser (G)
Ja, på admin sidan renderas alla som vill ha nyhetsbrev ut i en tabell.

### Besökare ska kunna välja ett av flera fraktalternativ (G)
Ja, alla fraktalternativ hämtas från databasen och vi har valt att ha 3 stycken som kunden kan välja bland.

### Tillgängliga fraktalternativ ska vara hämtade från databasen (G)
Ja, de hämtas från databasen så fort man går in på kundvagn-sidan och det ligger något i kundvagnen.

### Administratörer ska kunna redigera vilka kategorier en produkt tillhör (VG)
Nej, det har vi inte med.

### Administratörer ska kunna skicka nyhetsbrev från sitt gränssnitt, nyhetsbrevet ska sparas i databasen samt innehålla en titel och en brödtext (VG)
Nej, det har vi inte med.

### Administratörer ska kunna lägga till och ta bort produkter (VG)
Ja detta kan en admin göra. Att lägga till och ta bort produkter sker på samma sida men på två olika ställen.


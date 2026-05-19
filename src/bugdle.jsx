import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Volume2, VolumeX, Sparkles, GitBranch, Award, RotateCcw, Lightbulb, ChevronUp, ChevronDown, ChevronRight, X, Flag, Dumbbell, HelpCircle, Search, ArrowLeft, TreePine, Plus, Minus } from 'lucide-react';

// ===== EMBEDDED DATA =====
// 295 insect species (one per genus) with NCBI-style lineages, traits, fun facts.
const SPECIES_DATA_STRING = `[{"id":"Pseudomyrmex","common":"Acacia ant","genus":"Pseudomyrmex","species":"ferruginea","scientificName":"Pseudomyrmex ferruginea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Pseudomyrmecinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lives exclusively inside hollow swollen thorns of bull-horn acacias","habSame":true,"diet":["OMN"],"size":[5,8],"fact":"Lives only inside the hollow thorns of one specific Central American tree, which has evolved to grow those very thorns and to produce sugary leaf-nectar just to feed and house this ant — a textbook mutualism so tight that neither partner survives without the other."},{"id":"Curculio","common":"Acorn weevil","genus":"Curculio","species":"glandium","scientificName":"Curculio glandium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Tribe","Curculionini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva develops inside acorn","habSame":true,"diet":["HER"],"size":[6,11],"fact":"Their incredibly long snouts (rostrums) are used to drill into acorns and deposit eggs deep inside."},{"id":"Sphodromantis","common":"African mantis","genus":"Sphodromantis","species":"viridis","scientificName":"Sphodromantis viridis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Mantinae"],["Tribe","Paramantini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[55,90],"fact":"A common pet species — fast, bold, and willing to take large prey."},{"id":"Agrias","common":"Agrias butterfly","genus":"Agrias","species":"claudina","scientificName":"Agrias claudina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Charaxinae"],["Tribe","Anaeini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[80,95],"fact":"Among the most coveted butterflies in collections — a wing combining electric red, indigo and black panels that change pattern even between siblings of the same brood."},{"id":"Sialis","common":"Alderfly","genus":"Sialis","species":"lutaria","scientificName":"Sialis lutaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Megaloptera"],["Family","Sialidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,20],"fact":"Larvae are top-tier underwater predators in still ponds."},{"id":"Nicrophorus","common":"American burying beetle","genus":"Nicrophorus","species":"americanus","scientificName":"Nicrophorus americanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Staphylinoidea"],["Family","Silphidae"]],"dist":["NEA"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"Adults fly to find carcasses; larvae raised underground","habSame":false,"diet":["CAR"],"size":[25,35],"fact":"Pairs of parents cooperate to bury a small mammal carcass and feed regurgitated meat to their young."},{"id":"Periplaneta","common":"American cockroach","genus":"Periplaneta","species":"americana","scientificName":"Periplaneta americana","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Family","Blattidae"],["Tribe","Blattini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Glides rather than flies","habSame":true,"diet":["OMN"],"size":[35,40],"fact":"Can survive over a week without its head, eventually dying of thirst rather than injury."},{"id":"Macroxiphus","common":"Ant-mimic katydid","genus":"Macroxiphus","species":"sumatranus","scientificName":"Macroxiphus sumatranus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Nymphs mimic stinging ants","habSame":true,"diet":["HER"],"size":[40,60],"fact":"Hatchlings are dead ringers for fierce tropical ants — same shape, same jerky walk, same warning colours — until they finally moult into harmless leaf-green adults."},{"id":"Acanthaspis","common":"Ant-pack assassin bug","genus":"Acanthaspis","species":"petax","scientificName":"Acanthaspis petax","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Subfamily","Reduviinae"],["Tribe","Acanthaspidini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Termite mounds and dry grassland in East Africa","habSame":true,"diet":["CAR"],"size":[10,16],"fact":"Its nymphs stack the empty bodies of their victims into a wobbling mound on their back — up to 20 carcasses glued together — apparently to confuse jumping spiders, which mistake the pile for a swarm and pass them by."},{"id":"Myrmeleon","common":"Antlion","genus":"Myrmeleon","species":"formicarius","scientificName":"Myrmeleon formicarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Myrmeleontiformia"],["Family","Myrmeleontidae"],["Tribe","Myrmeleontini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Larvae dig sand-pit traps","habSame":false,"diet":["CAR"],"size":[25,40],"fact":"Larvae dig perfect funnel-shaped pits in sand and ambush insects that tumble in."},{"id":"Parnassius","common":"Apollo","genus":"Parnassius","species":"apollo","scientificName":"Parnassius apollo","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Parnassiinae"],["Tribe","Parnassiini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,80],"fact":"Lives only in high alpine zones and is one of the few butterflies that can fly in snowy weather."},{"id":"Rhagoletis","common":"Apple maggot","genus":"Rhagoletis","species":"pomonella","scientificName":"Rhagoletis pomonella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Tephritoidea"],["Family","Tephritidae"],["Tribe","Carpomyini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[4,7],"fact":"Different populations attack different fruits and may be on the way to becoming separate species."},{"id":"Linepithema","common":"Argentine ant","genus":"Linepithema","species":"humile","scientificName":"Linepithema humile","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dolichoderinae"],["Tribe","Leptomyrmecini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[2,3],"fact":"Forms 'supercolonies' that span continents — workers from different colonies don't fight each other."},{"id":"Eciton","common":"Army ant","genus":"Eciton","species":"burchellii","scientificName":"Eciton burchellii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dorylinae"],["Tribe","Ecitonini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[4,14],"fact":"Doesn't build a permanent nest — instead the colony forms a living 'bivouac' shelter from their own bodies."},{"id":"Diaphorina","common":"Asian citrus psyllid","genus":"Diaphorina","species":"citri","scientificName":"Diaphorina citri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Psylloidea"],["Family","Liviidae"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[3,4],"fact":"Transmits a bacterium responsible for citrus greening disease, devastating orange production."},{"id":"Anoplophora","common":"Asian longhorn beetle","genus":"Anoplophora","species":"glabripennis","scientificName":"Anoplophora glabripennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Lamiinae"],["Tribe","Lamiini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae tunnel inside live trees","habSame":false,"diet":["HER"],"size":[20,40],"fact":"One female can lay 90 eggs and the larvae bore for years inside tree trunks before emerging."},{"id":"Chalcosoma","common":"Atlas beetle","genus":"Chalcosoma","species":"atlas","scientificName":"Chalcosoma atlas","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Dynastinae"],["Tribe","Dynastini"]],"dist":["IND"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva in soil; adult on tree branches","habSame":false,"diet":["HER"],"size":[60,130],"fact":"Males engage in slow, sumo-like wrestling matches on tree branches, trying to pry rivals off with their massive horns."},{"id":"Attacus","common":"Atlas moth","genus":"Attacus","species":"atlas","scientificName":"Attacus atlas","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Attacini"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[240,280],"fact":"Adults have no working mouthparts and live just a week on stored fat."},{"id":"Notonecta","common":"Backswimmer","genus":"Notonecta","species":"glauca","scientificName":"Notonecta glauca","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Notonectidae"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[12,17],"fact":"Swims upside-down using oar-like hind legs, looking up to spot prey above."},{"id":"Calopteryx","common":"Banded demoiselle","genus":"Calopteryx","species":"splendens","scientificName":"Calopteryx splendens","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Calopterygoidea"],["Family","Calopterygidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,50],"fact":"Males perform a fluttering 'butterfly dance' to attract females over streams."},{"id":"Cimex","common":"Bed bug","genus":"Cimex","species":"lectularius","scientificName":"Cimex lectularius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Cimicoidea"],["Family","Cimicidae"],["Tribe","Cimicini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[4,7],"fact":"Reproduction is via 'traumatic insemination' — males stab females directly through the abdomen."},{"id":"Bombylius","common":"Bee fly","genus":"Bombylius","species":"major","scientificName":"Bombylius major","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Asilomorpha"],["Family","Bombyliidae"],["Tribe","Bombyliini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Larvae parasitise solitary bee larvae underground","habSame":false,"diet":["HER"],"size":[8,15],"fact":"Hovers and 'flicks' eggs into the burrows of solitary bees, where their larvae become parasites."},{"id":"Stylops","common":"Bee twisted-winged parasite","genus":"Stylops","species":"melittae","scientificName":"Stylops melittae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Strepsiptera"],["Family","Stylopidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[2,4],"fact":"So strange that biologists once thought they were lost relatives of beetles or flies."},{"id":"Philanthus","common":"Beewolf","genus":"Philanthus","species":"triangulum","scientificName":"Philanthus triangulum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Crabronidae"],["Tribe","Philanthini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,17],"fact":"Stings honey bees mid-flight, paralyses them, and stocks them as food for her young."},{"id":"Ornithoptera","common":"Birdwing","genus":"Ornithoptera","species":"alexandrae","scientificName":"Ornithoptera alexandrae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Troidini"]],"dist":["OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[150,280],"fact":"The world's largest butterfly, with a wingspan of nearly 30 cm — only females are this size."},{"id":"Culicoides","common":"Biting midge","genus":"Culicoides","species":"imicola","scientificName":"Culicoides imicola","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Ceratopogonidae"],["Tribe","Culicoidini"]],"dist":["AFR","PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[1,3],"fact":"Despite being only 1–3 mm, their bites cause intense itching and transmit several livestock viruses."},{"id":"Peruphasma","common":"Black beauty stick insect","genus":"Peruphasma","species":"schultei","scientificName":"Peruphasma schultei","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Pseudophasmatidae"],["Subfamily","Pseudophasmatinae"],["Tribe","Anisomorphini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Whole population known from a single mountain in northern Peru","habSame":true,"diet":["HER"],"size":[55,65],"fact":"Velvet-black with crimson wings and yellow eyes — when threatened it sprays a milky defensive fluid that can sting human eyes for hours."},{"id":"Simulium","common":"Black fly","genus":"Simulium","species":"damnosum","scientificName":"Simulium damnosum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Simuliidae"],["Tribe","Simuliini"]],"dist":["AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[2,6],"fact":"Bites from this fly are responsible for transmitting the parasite that causes river blindness."},{"id":"Lasius","common":"Black garden ant","genus":"Lasius","species":"niger","scientificName":"Lasius niger","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Lasiini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["OMN"],"size":[3,5],"fact":"A single queen can live 25 to 30 years, among the longest of any insect."},{"id":"Hermetia","common":"Black soldier fly","genus":"Hermetia","species":"illucens","scientificName":"Hermetia illucens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Stratiomyomorpha"],["Family","Stratiomyidae"],["Tribe","Hermetiini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[15,20],"fact":"Larvae are being farmed worldwide to recycle food waste into high-protein animal feed."},{"id":"Ascalapha","common":"Black witch moth","genus":"Ascalapha","species":"odorata","scientificName":"Ascalapha odorata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[130,170],"fact":"One of the largest moths in the Americas, with a wingspan up to 16 cm. Folklore in Mexico calls it 'mariposa de la muerte' — a harbinger of death — while in the Bahamas its visit means money is coming."},{"id":"Inocellia","common":"Black-necked snakefly","genus":"Inocellia","species":"crassicornis","scientificName":"Inocellia crassicornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Raphidioptera"],["Family","Inocelliidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Adults and larvae are predators of aphids and other tiny insects on tree bark."},{"id":"Eupholus","common":"Blue jewel weevil","genus":"Eupholus","species":"schoenherrii","scientificName":"Eupholus schoenherrii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Subfamily","Entiminae"],["Tribe","Eupholini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lowland rainforest of New Guinea, on wild yam vines","habSame":true,"diet":["HER"],"size":[25,31],"fact":"A walking lapis-lazuli statue from New Guinea — its turquoise scales are a warning that it sequesters yam toxins, so birds quickly learn that anything that bright is anything but tasty."},{"id":"Morpho","common":"Blue morpho","genus":"Morpho","species":"menelaut","scientificName":"Morpho menelaut","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Morphini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[120,200],"fact":"The vivid blue is not a pigment but the result of microscopic scales bending light."},{"id":"Baetis","common":"Blue-winged olive","genus":"Baetis","species":"rhodani","scientificName":"Baetis rhodani","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Pisciforma"],["Family","Baetidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[4,10],"fact":"Spends 1 to 2 years as an aquatic nymph, but its adult life lasts only a few hours."},{"id":"Anthonomus","common":"Boll weevil","genus":"Anthonomus","species":"grandis","scientificName":"Anthonomus grandis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Tribe","Anthonomini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[5,7],"fact":"It cost the U.S. South billions and reshaped agriculture and even music — there's a famous blues song about it."},{"id":"Brachinus","common":"Bombardier beetle","genus":"Brachinus","species":"crepitans","scientificName":"Brachinus crepitans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Brachininae"],["Tribe","Brachinini"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[5,15],"fact":"They mix chemicals in their abdomen and fire boiling 100°C spray with an audible pop."},{"id":"Liposcelis","common":"Booklouse","genus":"Liposcelis","species":"bostrychophila","scientificName":"Liposcelis bostrychophila","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Psocodea"],["Suborder","Troctomorpha"],["Family","Liposcelididae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[1,2],"fact":"Less than 1 mm long and lives among books, eating mould and starch from bindings."},{"id":"Cyclommatus","common":"Bornean stag beetle","genus":"Cyclommatus","species":"metallifer","scientificName":"Cyclommatus metallifer","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Lucanidae"],["Subfamily","Lucaninae"]],"dist":["IND"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,85],"fact":"Has the largest mandibles relative to body size of any animal — males can grow jaws longer than the rest of their body to fight for territory on Sulawesi tree trunks."},{"id":"Phloea","common":"Brazilian bark bug","genus":"Phloea","species":"subquadrata","scientificName":"Phloea subquadrata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Phloeidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"On the trunks of jaboticaba and other Myrtaceae","habSame":true,"diet":["HER"],"size":[22,28],"fact":"Mothers carry their newly-hatched young around on their flattened backs for weeks — a level of parental care rare among true bugs — while they themselves look like nothing more than a chip of mossy lichen-covered wood."},{"id":"Gonepteryx","common":"Brimstone","genus":"Gonepteryx","species":"rhamni","scientificName":"Gonepteryx rhamni","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Pieridae"],["Subfamily","Coliadinae"],["Tribe","Gonepterygini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,55],"fact":"Can live nearly a year as an adult, the longest of any European butterfly."},{"id":"Hemerobius","common":"Brown lacewing","genus":"Hemerobius","species":"humulinus","scientificName":"Hemerobius humulinus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Hemerobiidae"],["Tribe","Hemerobiini"]],"dist":["PAL","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[6,10],"fact":"Lays its eggs without stalks, unlike its green relatives."},{"id":"Halyomorpha","common":"Brown marmorated stink bug","genus":"Halyomorpha","species":"halys","scientificName":"Halyomorpha halys","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Pentatomidae"],["Tribe","Cappaeini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[12,17],"fact":"Emits a foul cilantro-like odour when squashed — hence the name 'stink bug'."},{"id":"Bombus","common":"Buff-tailed bumblebee","genus":"Bombus","species":"terrestris","scientificName":"Bombus terrestris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Bombini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Nests usually underground","habSame":false,"diet":["HER"],"size":[15,25],"fact":"Can generate body heat by 'shivering' their flight muscles to forage in cold weather."},{"id":"Stictocephala","common":"Buffalo treehopper","genus":"Stictocephala","species":"bisonia","scientificName":"Stictocephala bisonia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Membracoidea"],["Family","Membracidae"],["Tribe","Ceresini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[6,9],"fact":"Its body has a horn shaped to mimic a thorn, hiding it from predators."},{"id":"Paraponera","common":"Bullet ant","genus":"Paraponera","species":"clavata","scientificName":"Paraponera clavata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Paraponerinae"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["OMN"],"size":[20,30],"fact":"Its sting is ranked as the most painful in the insect world and lasts up to 24 hours."},{"id":"Pieris","common":"Cabbage white","genus":"Pieris","species":"rapae","scientificName":"Pieris rapae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Pieridae"],["Subfamily","Pierinae"],["Tribe","Pierini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,60],"fact":"Caterpillars accumulate mustard-oil toxins from their food plants and use them to repel predators."},{"id":"Ceuthophilus","common":"Camel cricket","genus":"Ceuthophilus","species":"maculatus","scientificName":"Ceuthophilus maculatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Rhaphidophoroidea"],["Family","Rhaphidophoridae"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["TER","SUB"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[13,33],"fact":"Has no wings but enormously powerful jumping legs — found in caves and cellars worldwide."},{"id":"Dissosteira","common":"Carolina locust","genus":"Dissosteira","species":"carolina","scientificName":"Dissosteira carolina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Oedipodinae"],["Tribe","Oedipodini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,50],"fact":"Flashes black-banded wings in flight to confuse predators, then disappears against the ground."},{"id":"Stagmomantis","common":"Carolina mantis","genus":"Stagmomantis","species":"carolina","scientificName":"Stagmomantis carolina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Stagmomantinae"],["Tribe","Stagmomantini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[50,60],"fact":"Hears with a single 'cyclopean' ear in the middle of its chest."},{"id":"Camponotus","common":"Carpenter ant","genus":"Camponotus","species":"pennsylvanicus","scientificName":"Camponotus pennsylvanicus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Camponotini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[6,18],"fact":"Some species have 'exploding' workers that rupture their own bodies to release sticky toxic glue."},{"id":"Xylocopa","common":"Carpenter bee","genus":"Xylocopa","species":"violacea","scientificName":"Xylocopa violacea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Xylocopinae"],["Tribe","Xylocopini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop in wood tunnels","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Chews perfectly round tunnels in solid wood and can buzz at a tone that shakes pollen out of flowers."},{"id":"Ctenocephalides","common":"Cat flea","genus":"Ctenocephalides","species":"felis","scientificName":"Ctenocephalides felis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Siphonaptera"],["Family","Pulicidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless; jumps","habSame":true,"diet":["CAR"],"size":[1,3],"fact":"Can jump 200 times its own body length — equivalent to a human leaping over the Eiffel Tower."},{"id":"Termes","common":"Cathedral termite","genus":"Termes","species":"fatalis","scientificName":"Termes fatalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Termitidae"],["Subfamily","Termitinae"]],"dist":["AFR"],"hab":["SUB"],"habAdult":["SUB"],"habLarva":["SUB"],"habNote":"Builds spires up to 8 m tall","habSame":true,"diet":["HER"],"size":[3,6],"fact":"Builds the tallest non-human animal structures on Earth — papery spires whose ventilation passages inspired the climate control of the Eastgate Centre in Zimbabwe."},{"id":"Hyalophora","common":"Cecropia moth","genus":"Hyalophora","species":"cecropia","scientificName":"Hyalophora cecropia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Attacini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[130,150],"fact":"North America's largest moth, with wings up to 15 cm across."},{"id":"Phobaeticus","common":"Chan's megastick","genus":"Phobaeticus","species":"chani","scientificName":"Phobaeticus chani","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"],["Subfamily","Clitumninae"],["Tribe","Pharnaciini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[350,570],"fact":"Among the longest insects ever measured — a single Bornean female reached 56.7 cm with legs outstretched, longer than a forearm."},{"id":"Menacanthus","common":"Chicken body louse","genus":"Menacanthus","species":"stramineus","scientificName":"Menacanthus stramineus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Phthiraptera"],["Suborder","Amblycera"],["Family","Menoponidae"]],"dist":["PAL","NEA","NEO","AFR","IND","OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless, on host","habSame":true,"diet":["OMN"],"size":[2,3],"fact":"Major nuisance in poultry — chews on feathers and skin rather than sucking blood."},{"id":"Tenodera","common":"Chinese mantis","genus":"Tenodera","species":"sinensis","scientificName":"Tenodera sinensis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Mantinae"],["Tribe","Paramantini"]],"dist":["PAL","IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[70,110],"fact":"Eats not only insects but occasionally small lizards, frogs and even hummingbirds."},{"id":"Sphecius","common":"Cicada killer","genus":"Sphecius","species":"speciosus","scientificName":"Sphecius speciosus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Crabronidae"],["Tribe","Gorytini"]],"dist":["NEA"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,50],"fact":"Females can carry prey heavier than themselves over considerable distances."},{"id":"Lasioderma","common":"Cigarette beetle","genus":"Lasioderma","species":"serricorne","scientificName":"Lasioderma serricorne","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Bostrichoidea"],["Family","Ptinidae"],["Tribe","Lasiodermini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[2,4],"fact":"A perfectly tiny cousin of the death-watch beetle, infamous for ruining stored tobacco."},{"id":"Agriotes","common":"Click beetle","genus":"Agriotes","species":"lineatus","scientificName":"Agriotes lineatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Elateridae"],["Tribe","Agriotini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae (wireworms) live in soil","habSame":false,"diet":["HER"],"size":[8,11],"fact":"Larvae live 3 to 5 years underground and are a major pest of root crops."},{"id":"Tineola","common":"Clothes moth","genus":"Tineola","species":"bisselliella","scientificName":"Tineola bisselliella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Tineoidea"],["Family","Tineidae"],["Tribe","Tineini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,14],"fact":"Their larvae are among the very few animals that can digest keratin (wool, fur, feathers)."},{"id":"Colias","common":"Clouded yellow","genus":"Colias","species":"croceus","scientificName":"Colias croceus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Pieridae"],["Subfamily","Coliadinae"],["Tribe","Coliadini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Some populations migrate hundreds of kilometres each year."},{"id":"Melolontha","common":"Cockchafer","genus":"Melolontha","species":"melolontha","scientificName":"Melolontha melolontha","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Melolonthinae"],["Tribe","Melolonthini"]],"dist":["PAL"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"Adults fly to feed on leaves; larvae feed underground for 3+ years","habSame":false,"diet":["HER"],"size":[25,30],"fact":"Historical European outbreaks were so bad that medieval courts put the beetles 'on trial' and formally excommunicated them."},{"id":"Leptinotarsa","common":"Colorado potato beetle","genus":"Leptinotarsa","species":"decemlineata","scientificName":"Leptinotarsa decemlineata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Chrysomelidae"],["Subfamily","Chrysomelinae"],["Tribe","Doryphorini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["TER","AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[9,11],"fact":"Each new generation can evolve resistance to insecticides in only a few years."},{"id":"Argema","common":"Comet moth","genus":"Argema","species":"mittrei","scientificName":"Argema mittrei","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Saturniini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Adults have no mouthparts; live 4-5 days","habSame":false,"diet":["HER"],"size":[180,220],"fact":"From Madagascar comes the longest tail of any moth — yellow streamers up to 15 cm that disrupt the echolocation calls of hunting bats."},{"id":"Polygonia","common":"Comma butterfly","genus":"Polygonia","species":"c-album","scientificName":"Polygonia c-album","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,55],"fact":"Its ragged wing edges look like a torn dried leaf when at rest."},{"id":"Psocus","common":"Common barklouse","genus":"Psocus","species":"leidyi","scientificName":"Psocus leidyi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Psocodea"],["Suborder","Psocomorpha"],["Family","Psocidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[3,5],"fact":"Forms 'herds' on tree bark and grazes on microscopic fungi."},{"id":"Polyommatus","common":"Common blue","genus":"Polyommatus","species":"icarus","scientificName":"Polyommatus icarus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Lycaenidae"],["Subfamily","Polyommatinae"],["Tribe","Polyommatini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,35],"fact":"Its caterpillars produce honey-like secretions that attract ants, which protect them in return."},{"id":"Enallagma","common":"Common blue damselfly","genus":"Enallagma","species":"cyathigerum","scientificName":"Enallagma cyathigerum","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Coenagrionidae"]],"dist":["PAL","NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[25,35],"fact":"Adults can live for several weeks but most of their life is spent as aquatic nymphs."},{"id":"Calliphora","common":"Common bluebottle","genus":"Calliphora","species":"vomitoria","scientificName":"Calliphora vomitoria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Calliphoridae"],["Tribe","Calliphorini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,14],"fact":"Adults can detect a dead body from over a kilometre away."},{"id":"Machilis","common":"Common bristletail","genus":"Machilis","species":"hrabei","scientificName":"Machilis hrabei","lineage":[["Order","Archaeognatha"],["Family","Machilidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless; jumps","habSame":true,"diet":["HER"],"size":[10,15],"fact":"Can spring up to 30 cm into the air by flexing its abdomen."},{"id":"Junonia","common":"Common buckeye","genus":"Junonia","species":"coenia","scientificName":"Junonia coenia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Junoniini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,65],"fact":"Its huge wing eyespots flicker like predator eyes when it opens its wings — a defence so effective some predators have evolved counter-strategies to avoid being fooled."},{"id":"Hexagenia","common":"Common burrower mayfly","genus":"Hexagenia","species":"limbata","scientificName":"Hexagenia limbata","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Furcatergalia"],["Family","Ephemeridae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Mass emergences along the Mississippi River show up on weather radar."},{"id":"Sympetrum","common":"Common darter","genus":"Sympetrum","species":"striolatum","scientificName":"Sympetrum striolatum","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"],["Tribe","Sympetrini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,40],"fact":"One of the few dragonflies still flying late into autumn."},{"id":"Photinus","common":"Common firefly","genus":"Photinus","species":"pyralis","scientificName":"Photinus pyralis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Lampyridae"],["Tribe","Photinini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["AER","TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[10,15],"fact":"Their flashes form Morse-like code — males and females recognise each other by precise timing."},{"id":"Aphrophora","common":"Common froghopper","genus":"Aphrophora","species":"alni","scientificName":"Aphrophora alni","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cercopoidea"],["Family","Aphrophoridae"],["Tribe","Aphrophorini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Strong jumpers, but rarely fly","habSame":true,"diet":["HER"],"size":[8,10],"fact":"Adults can jump over 70 cm — proportionally one of the best jumpers known."},{"id":"Anax","common":"Common green darner","genus":"Anax","species":"junius","scientificName":"Anax junius","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"],["Tribe","Anactini"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[65,80],"fact":"One of the fastest flying insects, hitting bursts up to 40 km/h."},{"id":"Culex","common":"Common house mosquito","genus":"Culex","species":"pipiens","scientificName":"Culex pipiens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Culicidae"],["Subfamily","Culicinae"],["Tribe","Culicini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[4,10],"fact":"Larvae breathe through a snorkel-like tube at the water's surface."},{"id":"Tenthredo","common":"Common sawfly","genus":"Tenthredo","species":"mesomela","scientificName":"Tenthredo mesomela","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Symphyta"],["Superfamily","Tenthredinoidea"],["Family","Tenthredinidae"],["Tribe","Tenthredinini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Sawflies aren't wasps — their larvae look like caterpillars and they have no narrow 'wasp waist'."},{"id":"Panorpa","common":"Common scorpionfly","genus":"Panorpa","species":"communis","scientificName":"Panorpa communis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Mecoptera"],["Family","Panorpidae"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Males offer females a 'gift' of regurgitated food or a dead insect during courtship."},{"id":"Lepisma","common":"Common silverfish","genus":"Lepisma","species":"saccharinum","scientificName":"Lepisma saccharinum","lineage":[["Order","Zygentoma"],["Family","Lepismatidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[10,20],"fact":"One of the oldest insect groups on Earth — virtually unchanged for 400 million years."},{"id":"Orthetrum","common":"Common skimmer","genus":"Orthetrum","species":"cancellatum","scientificName":"Orthetrum cancellatum","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,50],"fact":"Males defend perch sites and dip the abdomen into water to cool down on hot days."},{"id":"Raphidia","common":"Common snakefly","genus":"Raphidia","species":"ophiopsis","scientificName":"Raphidia ophiopsis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Raphidioptera"],["Family","Raphidiidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[8,15],"fact":"Long elongated 'neck' is actually a stretched-out prothorax, not a real neck."},{"id":"Perla","common":"Common stonefly","genus":"Perla","species":"bipunctata","scientificName":"Perla bipunctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Plecoptera"],["Suborder","Arctoperlaria"],["Family","Perlidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[18,28],"fact":"Nymphs are top predators in clean fast-flowing streams and indicate good water quality."},{"id":"Vespula","common":"Common wasp","genus":"Vespula","species":"vulgaris","scientificName":"Vespula vulgaris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Vespinae"],["Tribe","Vespini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[12,18],"fact":"Workers can recognise each other by individual facial markings."},{"id":"Plathemis","common":"Common whitetail","genus":"Plathemis","species":"lydia","scientificName":"Plathemis lydia","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,48],"fact":"Males have a powdery white abdomen that flashes during courtship."},{"id":"Cotesia","common":"Cotesia wasp","genus":"Cotesia","species":"glomerata","scientificName":"Cotesia glomerata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Parasitica"],["Superfamily","Ichneumonoidea"],["Family","Braconidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop inside caterpillar hosts","habSame":false,"diet":["CAR"],"size":[2,4],"fact":"Caterpillar hosts continue moving and 'defend' the wasp larvae after they emerge — zombie bodyguards."},{"id":"Helicoverpa","common":"Cotton bollworm","genus":"Helicoverpa","species":"armigera","scientificName":"Helicoverpa armigera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Noctuidae"],["Tribe","Heliothini"]],"dist":["PAL","AFR","IND","OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"One of the costliest crop pests in the world, attacking cotton, corn, tomato and more."},{"id":"Icerya","common":"Cottony cushion scale","genus":"Icerya","species":"purchasi","scientificName":"Icerya purchasi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Coccoidea"],["Family","Monophlebidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["HER"],"size":[4,7],"fact":"Famously controlled in California by importing the right ladybug — the first big classical biocontrol success."},{"id":"Pthirus","common":"Crab louse","genus":"Pthirus","species":"pubis","scientificName":"Pthirus pubis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Phthiraptera"],["Suborder","Anoplura"],["Family","Pthiridae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless, on host","habSame":true,"diet":["CAR"],"size":[1,2],"fact":"Despite the alarming name, infestations are harmless and easily treated."},{"id":"Hamadryas","common":"Cracker butterfly","genus":"Hamadryas","species":"feronia","scientificName":"Hamadryas feronia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Biblidinae"],["Tribe","Ageroniini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Adults often hang head-down on tree trunks","habSame":false,"diet":["HER"],"size":[70,85],"fact":"Males emit a loud, audible CRACK in flight by snapping a modified wing vein — the only butterfly that makes a sound the human ear can clearly detect."},{"id":"Tipula","common":"Crane fly","genus":"Tipula","species":"paludosa","scientificName":"Tipula paludosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Tipulomorpha"],["Family","Tipulidae"],["Tribe","Tipulini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"'Leatherjacket' larvae feed on roots underground","habSame":false,"diet":["HER"],"size":[20,35],"fact":"Adults are harmless and don't really bite — they're often confused with giant mosquitoes."},{"id":"Chrysis","common":"Cuckoo wasp","genus":"Chrysis","species":"ignita","scientificName":"Chrysis ignita","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Chrysidoidea"],["Family","Chrysididae"],["Tribe","Chrysidini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[6,11],"fact":"Brilliantly metallic; it can roll into a ball when threatened, like an insect armadillo."},{"id":"Zootermopsis","common":"Dampwood termite","genus":"Zootermopsis","species":"angusticollis","scientificName":"Zootermopsis angusticollis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Archotermopsidae"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["SUB","TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,15],"fact":"Lives only in damp, decaying logs and rarely encounters humans."},{"id":"Eleodes","common":"Darkling beetle","genus":"Eleodes","species":"obscura","scientificName":"Eleodes obscura","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Tenebrionidae"],["Tribe","Amphidorini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["OMN"],"size":[10,40],"fact":"When threatened they do a 'headstand' and release a foul-smelling chemical from their rear."},{"id":"Xanthopan","common":"Darwin's hawkmoth","genus":"Xanthopan","species":"morganii","scientificName":"Xanthopan morganii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Sphingini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[130,160],"fact":"Darwin predicted in 1862 that a moth must exist with a 30-cm tongue to drink from a Madagascan orchid he'd seen — this hawkmoth was discovered 41 years later, exactly as he described."},{"id":"Deroplatys","common":"Dead leaf mantis","genus":"Deroplatys","species":"desiccata","scientificName":"Deroplatys desiccata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Deroplatyidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[70,90],"fact":"Its dried-leaf disguise is so complete it has 'veins' painted on its body."},{"id":"Blaberus","common":"Death's head cockroach","genus":"Blaberus","species":"craniifer","scientificName":"Blaberus craniifer","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Superfamily","Blaberoidea"],["Family","Blaberidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[40,70],"fact":"Used in space biology research and can survive much higher radiation doses than humans."},{"id":"Acherontia","common":"Death's-head hawkmoth","genus":"Acherontia","species":"atropos","scientificName":"Acherontia atropos","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Acherontiini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[90,130],"fact":"Squeaks loudly when handled by forcing air through a special chamber in its head."},{"id":"Xestobium","common":"Death-watch beetle","genus":"Xestobium","species":"rufovillosum","scientificName":"Xestobium rufovillosum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Bostrichoidea"],["Family","Ptinidae"],["Tribe","Xestobiini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[5,7],"fact":"Males knock their heads against wood to attract females — a sound long thought to predict death in folklore."},{"id":"Chrysops","common":"Deer fly","genus":"Chrysops","species":"caecutiens","scientificName":"Chrysops caecutiens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Tabanomorpha"],["Family","Tabanidae"],["Tribe","Chrysopsini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[8,12],"fact":"Has striking iridescent eyes with bright zig-zag patterns."},{"id":"Schistocerca","common":"Desert locust","genus":"Schistocerca","species":"gregaria","scientificName":"Schistocerca gregaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Cyrtacanthacridinae"],["Tribe","Cyrtacanthacridini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,80],"fact":"Swarms can contain billions and devour their own body weight in plants every single day."},{"id":"Ocypus","common":"Devil's coach horse","genus":"Ocypus","species":"olens","scientificName":"Ocypus olens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Staphylinoidea"],["Family","Staphylinidae"],["Tribe","Staphylinini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[20,32],"fact":"When threatened, it raises its abdomen like a scorpion and emits a foul scent."},{"id":"Idolomantis","common":"Devil's flower mantis","genus":"Idolomantis","species":"diabolica","scientificName":"Idolomantis diabolica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Empusidae"],["Subfamily","Empusinae"],["Tribe","Idolomantini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Acacia scrub of East Africa","habSame":true,"diet":["CAR"],"size":[100,130],"fact":"When confronted, this enormous East African ambusher fans out its forewings to reveal eyespots in red, white, blue and black — the most elaborate threat display of any mantis on Earth."},{"id":"Melanoplus","common":"Differential grasshopper","genus":"Melanoplus","species":"differentialis","scientificName":"Melanoplus differentialis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Melanoplinae"],["Tribe","Melanoplini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,45],"fact":"The closely related Rocky Mountain locust formed swarms of trillions in the 1800s, then went extinct mysteriously."},{"id":"Tibicen","common":"Dog-day cicada","genus":"Tibicen","species":"canicularis","scientificName":"Tibicen canicularis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cicadoidea"],["Family","Cicadidae"],["Tribe","Cryptotympanini"]],"dist":["NEA"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Males create one of the loudest insect sounds on Earth, reaching over 100 decibels."},{"id":"Toxodera","common":"Dragon flower mantis","genus":"Toxodera","species":"integrifolia","scientificName":"Toxodera integrifolia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Toxoderidae"],["Subfamily","Toxoderinae"],["Tribe","Toxoderini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lowland rainforest of Burma, Thailand, Peninsular Malaysia and Java","habSame":true,"diet":["CAR"],"size":[70,90],"fact":"Looks more like a tangled stick than the typical ambush predator it is — a slender Southeast Asian rainforest species with foliaceous leg expansions and a high-arching pronotum, internet-famous for its absurd silhouette."},{"id":"Stenophylla","common":"Dragon mantis","genus":"Stenophylla","species":"lobivertex","scientificName":"Stenophylla lobivertex","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Superfamily","Acanthopoidea"],["Family","Acanthopidae"],["Subfamily","Stenophyllinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[40,60],"fact":"A leaf-perfect Amazonian canopy predator that arches its abdomen into an S-shape when threatened — a posture so reptilian it has earned an uncanny nickname in the hobby trade."},{"id":"Dorylus","common":"Driver ant","genus":"Dorylus","species":"nigricans","scientificName":"Dorylus nigricans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dorylinae"]],"dist":["AFR"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["SUB"],"habNote":"Colonies of 20+ million; queens are the largest ants on Earth","habSame":false,"diet":["CAR"],"size":[3,13],"fact":"A single queen lays up to 4 million eggs per month — and a colony on the march can strip a chicken to its bones in minutes."},{"id":"Eristalis","common":"Drone fly","genus":"Eristalis","species":"tenax","scientificName":"Eristalis tenax","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Syrphoidea"],["Family","Syrphidae"],["Tribe","Eristalini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"Rat-tailed maggots live in stagnant water","habSame":false,"diet":["HER"],"size":[10,16],"fact":"Its larvae, the 'rat-tailed maggots', live in foul water using a long telescoping breathing tube."},{"id":"Cryptotermes","common":"Drywood termite","genus":"Cryptotermes","species":"brevis","scientificName":"Cryptotermes brevis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Kalotermitidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lives entirely inside dry wood","habSame":true,"diet":["HER"],"size":[4,8],"fact":"Doesn't need contact with soil — can live entirely inside dry timber."},{"id":"Onthophagus","common":"Dung beetle","genus":"Onthophagus","species":"taurus","scientificName":"Onthophagus taurus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Onthophagini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Adults bury dung; larvae develop in underground chambers","habSame":false,"diet":["OMN"],"size":[5,12],"fact":"One species can pull 1,141 times its own body weight, the strongest animal on Earth relative to size."},{"id":"Corydalus","common":"Eastern dobsonfly","genus":"Corydalus","species":"cornutus","scientificName":"Corydalus cornutus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Megaloptera"],["Family","Corydalidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[80,140],"fact":"Males have massive curved mandibles, too large to bite, used only to fight other males."},{"id":"Romalea","common":"Eastern lubber grasshopper","genus":"Romalea","species":"microptera","scientificName":"Romalea microptera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Romaleidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[50,80],"fact":"Slow, flightless and dramatically coloured to advertise its toxic chemicals."},{"id":"Reticulitermes","common":"Eastern subterranean termite","genus":"Reticulitermes","species":"flavipes","scientificName":"Reticulitermes flavipes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Rhinotermitidae"]],"dist":["NEA"],"hab":["SUB"],"habAdult":["SUB"],"habLarva":["SUB"],"habNote":"Only reproductive alates briefly fly","habSame":true,"diet":["HER"],"size":[4,8],"fact":"Communicates through head-banging vibrations in tunnel walls."},{"id":"Papilio","common":"Eastern tiger swallowtail","genus":"Papilio","species":"glaucus","scientificName":"Papilio glaucus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Papilionini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[80,140],"fact":"Caterpillars have a forked organ (osmeterium) that pops out smelling foul to deter predators."},{"id":"Anacridium","common":"Egyptian grasshopper","genus":"Anacridium","species":"aegyptium","scientificName":"Anacridium aegyptium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Cyrtacanthacridinae"],["Tribe","Cyrtacanthacridini"]],"dist":["AFR","PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,75],"fact":"Sometimes appears in southern Europe in surprising numbers after warm autumns."},{"id":"Heliocopris","common":"Elephant dung beetle","genus":"Heliocopris","species":"dominus","scientificName":"Heliocopris dominus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Coprini"]],"dist":["AFR"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva develops inside a buried dung ball","habSame":false,"diet":["OMN"],"size":[40,70],"fact":"One of the largest scarab beetles on Earth, specialising in pachyderm droppings — a single dung pile can be processed by hundreds of these armoured bulldozers in a single afternoon."},{"id":"Deilephila","common":"Elephant hawkmoth","genus":"Deilephila","species":"elpenor","scientificName":"Deilephila elpenor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Macroglossinae"],["Tribe","Macroglossini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,60],"fact":"Caterpillars resemble tiny pink elephants with retractable 'trunks'."},{"id":"Agrilus","common":"Emerald ash borer","genus":"Agrilus","species":"planipennis","scientificName":"Agrilus planipennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Buprestoidea"],["Family","Buprestidae"],["Tribe","Agrilini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae mine under bark","habSame":false,"diet":["HER"],"size":[8,14],"fact":"Has killed hundreds of millions of ash trees in North America since being introduced from Asia in the 1990s."},{"id":"Lestes","common":"Emerald damselfly","genus":"Lestes","species":"sponsa","scientificName":"Lestes sponsa","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Lestoidea"],["Family","Lestidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[35,40],"fact":"Holds its wings half-open at rest, unlike most damselflies that fold them shut."},{"id":"Hemianax","common":"Emperor dragonfly","genus":"Hemianax","species":"imperator","scientificName":"Hemianax imperator","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"],["Tribe","Anactini"]],"dist":["PAL","AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[60,80],"fact":"Migrates seasonally across the Mediterranean in some populations."},{"id":"Saturnia","common":"Emperor moth","genus":"Saturnia","species":"pavonia","scientificName":"Saturnia pavonia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Saturniini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,84],"fact":"Caterpillars whistle with their breathing pores when disturbed."},{"id":"Amphimallon","common":"European chafer","genus":"Amphimallon","species":"majale","scientificName":"Amphimallon majale","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Melolonthinae"],["Tribe","Rhizotrogini"]],"dist":["PAL"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"Dusk fliers; larvae are root-feeding grubs","habSame":false,"diet":["HER"],"size":[14,18],"fact":"Their buzzy flight at dusk gave them the old English nickname 'summer chafer'."},{"id":"Ostrinia","common":"European corn borer","genus":"Ostrinia","species":"nubilalis","scientificName":"Ostrinia nubilalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Pyraloidea"],["Family","Crambidae"],["Tribe","Pyraustini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,30],"fact":"Caterpillars bore into corn stalks and ears, hidden from most pesticides."},{"id":"Forficula","common":"European earwig","genus":"Forficula","species":"auricularia","scientificName":"Forficula auricularia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Dermaptera"],["Suborder","Neodermaptera"],["Family","Forficulidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Rarely flies","habSame":true,"diet":["OMN"],"size":[11,18],"fact":"Mothers guard their eggs and lick them clean to prevent mould — rare parental care in insects."},{"id":"Vespa","common":"European hornet","genus":"Vespa","species":"crabro","scientificName":"Vespa crabro","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Vespinae"],["Tribe","Vespini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[25,40],"fact":"Their venom contains a unique compound that triggers a cocktail of pain responses."},{"id":"Mantis","common":"European mantis","genus":"Mantis","species":"religiosa","scientificName":"Mantis religiosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Mantinae"],["Tribe","Mantini"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Males fly weakly to find females; females rarely","habSame":true,"diet":["CAR"],"size":[60,80],"fact":"Females sometimes eat the male during or after mating — but it's less common than legends say."},{"id":"Lucanus","common":"European stag beetle","genus":"Lucanus","species":"cervus","scientificName":"Lucanus cervus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Lucanidae"],["Tribe","Lucanini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae in rotting wood for years; adults fly little","habSame":false,"diet":["HER"],"size":[35,75],"fact":"Males joust with their oversized 'antlers' (modified mandibles) but those antlers are too weak to actually bite."},{"id":"Alaus","common":"Eyed elater","genus":"Alaus","species":"oculatus","scientificName":"Alaus oculatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Elateridae"],["Tribe","Hemirhipini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[25,45],"fact":"Two large false eyespots on its thorax can startle would-be predators."},{"id":"Spodoptera","common":"Fall armyworm","genus":"Spodoptera","species":"frugiperda","scientificName":"Spodoptera frugiperda","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Noctuidae"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"A single moth can lay up to 1,000 eggs and the larvae chew through nearly any crop."},{"id":"Gryllus","common":"Field cricket","genus":"Gryllus","species":"campestris","scientificName":"Gryllus campestris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Gryllidae"],["Subfamily","Gryllinae"],["Tribe","Gryllini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[17,25],"fact":"Males have a different chirp for territory, courtship, and aggression — a tiny vocabulary of songs."},{"id":"Thermobia","common":"Firebrat","genus":"Thermobia","species":"domestica","scientificName":"Thermobia domestica","lineage":[["Order","Zygentoma"],["Family","Lepismatidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[11,15],"fact":"Loves warm spots and is often found near bakery ovens and steam pipes."},{"id":"Pyrrhocoris","common":"Firebug","genus":"Pyrrhocoris","species":"apterus","scientificName":"Pyrrhocoris apterus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pyrrhocoroidea"],["Family","Pyrrhocoridae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Most adults are short-winged and flightless","habSame":true,"diet":["HER"],"size":[9,12],"fact":"Often forms large aggregations on sunny tree trunks, especially in spring."},{"id":"Chauliodes","common":"Fishfly","genus":"Chauliodes","species":"rastricornis","scientificName":"Chauliodes rastricornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Megaloptera"],["Family","Corydalidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,60],"fact":"Has comb-like 'feathered' antennae to detect mates by scent."},{"id":"Altica","common":"Flea beetle","genus":"Altica","species":"lythri","scientificName":"Altica lythri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Chrysomelidae"],["Subfamily","Galerucinae"],["Tribe","Alticini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[3,5],"fact":"They jump using a spring-loaded mechanism in their hind legs, similar to fleas."},{"id":"Sarcophaga","common":"Flesh fly","genus":"Sarcophaga","species":"carnaria","scientificName":"Sarcophaga carnaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Sarcophagidae"],["Tribe","Sarcophagini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,14],"fact":"Females don't lay eggs — they give birth to live larvae directly onto carrion."},{"id":"Anaea","common":"Florida leafwing","genus":"Anaea","species":"troglodyta","scientificName":"Anaea troglodyta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Charaxinae"],["Tribe","Anaeini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,70],"fact":"So cryptic with closed wings that it perfectly mimics a dead leaf — complete with veins, mould spots and a tear in the edge for good measure. The Caribbean population is the nominate of the species."},{"id":"Phromnia","common":"Flower-spike bug","genus":"Phromnia","species":"rosea","scientificName":"Phromnia rosea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Flatidae"],["Subfamily","Flatinae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Madagascan dry tropical forest; gregarious on lianas","habSame":true,"diet":["HER"],"size":[10,14],"fact":"Lines up in dozens along a twig with each individual angled just right — adults rose-pink, nymphs powdery-white — together creating the perfect illusion of a tropical inflorescence in full bloom."},{"id":"Charaxes","common":"Forest emperor","genus":"Charaxes","species":"candiope","scientificName":"Charaxes candiope","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Charaxinae"],["Tribe","Charaxini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[70,90],"fact":"Powerful African butterflies that prefer fermenting fruit and animal dung over flowers — a quick way to catch one is a banana left rotting in the sun."},{"id":"Mecistogaster","common":"Forest giant damselfly","genus":"Mecistogaster","species":"linearis","scientificName":"Mecistogaster linearis","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Pseudostigmatidae"]],"dist":["NEO"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"Larvae develop in tree-hole water","habSame":false,"diet":["CAR"],"size":[120,150],"fact":"Hovers slowly through rainforest understory like a tiny helicopter, plucking spiders straight out of their webs without ever getting caught itself."},{"id":"Coptotermes","common":"Formosan termite","genus":"Coptotermes","species":"formosanus","scientificName":"Coptotermes formosanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Rhinotermitidae"]],"dist":["IND"],"hab":["SUB"],"habAdult":["SUB"],"habLarva":["SUB"],"habNote":"","habSame":true,"diet":["HER"],"size":[4,7],"fact":"A single mature colony can contain millions and consume kilograms of wood a year."},{"id":"Libellula","common":"Four-spotted chaser","genus":"Libellula","species":"quadrimaculata","scientificName":"Libellula quadrimaculata","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,48],"fact":"Catches prey mid-air with a 95% success rate, among the best of any predator."},{"id":"Drosophila","common":"Fruit fly","genus":"Drosophila","species":"melanogaster","scientificName":"Drosophila melanogaster","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Ephydroidea"],["Family","Drosophilidae"],["Tribe","Drosophilini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[2,4],"fact":"More Nobel Prizes have been awarded for research on this fly than any other animal."},{"id":"Bradysia","common":"Fungus gnat","genus":"Bradysia","species":"impatiens","scientificName":"Bradysia impatiens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Bibionomorpha"],["Family","Sciaridae"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[2,4],"fact":"Larvae attack plant roots and are a major greenhouse pest, despite being only a few millimetres long."},{"id":"Arctia","common":"Garden tiger moth","genus":"Arctia","species":"caja","scientificName":"Arctia caja","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"],["Subfamily","Arctiinae"],["Tribe","Arctiini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,70],"fact":"Adults can produce ultrasonic clicks that jam bat sonar."},{"id":"Blattella","common":"German cockroach","genus":"Blattella","species":"germanica","scientificName":"Blattella germanica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Family","Ectobiidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Rarely flies","habSame":true,"diet":["OMN"],"size":[13,16],"fact":"Females carry their egg case until the eggs are nearly ready to hatch — a parental rarity for roaches."},{"id":"Phyllocrania","common":"Ghost mantis","genus":"Phyllocrania","species":"paradoxa","scientificName":"Phyllocrania paradoxa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Empusidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[45,55],"fact":"Sways in the wind to mimic a dead leaf even when standing still."},{"id":"Macropanesthia","common":"Giant burrowing cockroach","genus":"Macropanesthia","species":"rhinoceros","scientificName":"Macropanesthia rhinoceros","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Superfamily","Blaberoidea"],["Family","Blaberidae"],["Subfamily","Geoscapheinae"]],"dist":["OCE"],"hab":["SUB"],"habAdult":["SUB"],"habLarva":["SUB"],"habNote":"Digs metre-deep burrows in dry eucalyptus woodland of Queensland","habSame":true,"diet":["DET"],"size":[60,85],"fact":"The heaviest cockroach on Earth, weighing more than a small mouse — it lives for over a decade in deep burrows, never flies, doesn't bite, and is sold as a popular if unusual pet in Australia."},{"id":"Tetracanthagyna","common":"Giant hawker dragonfly","genus":"Tetracanthagyna","species":"plagiata","scientificName":"Tetracanthagyna plagiata","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"]],"dist":["IND"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[105,125],"fact":"The world's heaviest dragonfly — a Bornean monster whose larva can take three years in a forest pond to grow, then takes vertebrate-sized prey as an adult."},{"id":"Megarhyssa","common":"Giant ichneumon wasp","genus":"Megarhyssa","species":"macrurus","scientificName":"Megarhyssa macrurus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Parasitica"],["Superfamily","Ichneumonoidea"],["Family","Ichneumonidae"],["Tribe","Rhyssini"]],"dist":["NEA"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Larvae parasitise wood-boring hosts inside trees","habSame":false,"diet":["CAR"],"size":[30,50],"fact":"Females drill ovipositors several centimetres into wood to parasitise hidden horntail larvae."},{"id":"Polystoechotes","common":"Giant lacewing","genus":"Polystoechotes","species":"punctata","scientificName":"Polystoechotes punctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Ithonidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,40],"fact":"A rare relict species, mostly known from mountain forests in western North America."},{"id":"Pseudophyllus","common":"Giant leaf katydid","genus":"Pseudophyllus","species":"titan","scientificName":"Pseudophyllus titan","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Pseudophyllinae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[120,160],"fact":"A katydid the size of a small bird, painted in shades of fading green — when it freezes on a branch the eye refuses to register it as anything but a torn rainforest leaf."},{"id":"Extatosoma","common":"Giant prickly stick insect","genus":"Extatosoma","species":"tiaratum","scientificName":"Extatosoma tiaratum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females flightless","habSame":true,"diet":["HER"],"size":[110,200],"fact":"Nymphs mimic local ants until they're large enough to look like sticks."},{"id":"Cocytius","common":"Giant sphinx","genus":"Cocytius","species":"antaeus","scientificName":"Cocytius antaeus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Sphingini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[140,180],"fact":"Its 25-cm tongue is the only one long enough to reach inside the white blossoms of the rare ghost orchid in the Everglades — without this moth, the orchid cannot set seed."},{"id":"Eurycantha","common":"Giant spiny stick insect","genus":"Eurycantha","species":"calcarata","scientificName":"Eurycantha calcarata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Lonchodidae"],["Subfamily","Lonchodinae"],["Tribe","Eurycanthini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[120,150],"fact":"Males wield a single huge curved spine on each hind leg, capable of stabbing through a rat's skull — a defence used against tree-climbing predators."},{"id":"Dorcus","common":"Giant stag beetle","genus":"Dorcus","species":"titanus","scientificName":"Dorcus titanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Lucanidae"],["Tribe","Dorcini"]],"dist":["PAL","IND"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae in decaying logs","habSame":false,"diet":["HER"],"size":[30,90],"fact":"Captive specimens can live up to 7 years — extreme longevity for a beetle."},{"id":"Heraclides","common":"Giant swallowtail","genus":"Heraclides","species":"cresphontes","scientificName":"Heraclides cresphontes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Papilionini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[100,165],"fact":"Largest butterfly in North America — its caterpillars cunningly mimic fresh bird droppings on citrus leaves, complete with a glossy black-and-white splatter pattern."},{"id":"Lethocerus","common":"Giant water bug","genus":"Lethocerus","species":"americanus","scientificName":"Lethocerus americanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Belostomatidae"],["Tribe","Lethocerini"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AQU","AER"],"habLarva":["AQU"],"habNote":"Flies between water bodies","habSame":false,"diet":["CAR"],"size":[50,80],"fact":"Can deliver one of the most painful bites in the insect world and inject digestive juices."},{"id":"Trachelophorus","common":"Giraffe weevil","genus":"Trachelophorus","species":"giraffa","scientificName":"Trachelophorus giraffa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Attelabidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[20,25],"fact":"Females roll a leaf into a tube and lay a single egg inside, like origami nurseries."},{"id":"Mantophasma","common":"Gladiator","genus":"Mantophasma","species":"zephyra","scientificName":"Mantophasma zephyra","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Notoptera"],["Suborder","Mantophasmatodea"],["Family","Mantophasmatidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[10,25],"fact":"Discovered only in 2002, making it the most recently described insect order."},{"id":"Greta","common":"Glasswing butterfly","genus":"Greta","species":"oto","scientificName":"Greta oto","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Danainae"],["Tribe","Ithomiini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,60],"fact":"Its wings are transparent because their scales lack pigment — predators struggle to track them."},{"id":"Homalodisca","common":"Glassy-winged sharpshooter","genus":"Homalodisca","species":"vitripennis","scientificName":"Homalodisca vitripennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Membracoidea"],["Family","Cicadellidae"],["Tribe","Proconiini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[12,14],"fact":"Catapults droplets of waste off its abdomen at over 100 g acceleration."},{"id":"Cephalotes","common":"Gliding turtle ant","genus":"Cephalotes","species":"atratus","scientificName":"Cephalotes atratus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Cephalotini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lives in tree cavities; blocks nest holes with its head","habSame":true,"diet":["HER"],"size":[4,9],"fact":"When knocked off a branch, this wingless ant steers in midair and glides backwards onto the trunk — the first animal known to actively control a fall."},{"id":"Lampyris","common":"Glow-worm","genus":"Lampyris","species":"noctiluca","scientificName":"Lampyris noctiluca","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Lampyridae"],["Tribe","Lampyrini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females wingless; only males fly","habSame":true,"diet":["CAR"],"size":[15,25],"fact":"Adult females are wingless and glow brightly to attract flying males."},{"id":"Phengodes","common":"Glowworm beetle","genus":"Phengodes","species":"plumosa","scientificName":"Phengodes plumosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Phengodidae"]],"dist":["NEA","NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larviform females glow green; males look totally different","habSame":true,"diet":["CAR"],"size":[10,35],"fact":"Females stay larva-like for life and glow like tiny green railway lines along their flanks — males fly above with enormous comb antennae and never glow at all."},{"id":"Cossus","common":"Goat moth","genus":"Cossus","species":"cossus","scientificName":"Cossus cossus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Cossoidea"],["Family","Cossidae"],["Tribe","Cossini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Caterpillars bore inside tree trunks for years","habSame":false,"diet":["HER"],"size":[65,90],"fact":"Caterpillars smell strongly of goats — hence the name — and can live up to 5 years in trees."},{"id":"Cordulegaster","common":"Golden-ringed dragonfly","genus":"Cordulegaster","species":"boltonii","scientificName":"Cordulegaster boltonii","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Cordulegastroidea"],["Family","Cordulegastridae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[70,85],"fact":"Eggs are inserted into wet streamside soil with a chisel-like ovipositor."},{"id":"Goliathus","common":"Goliath beetle","genus":"Goliathus","species":"goliatus","scientificName":"Goliathus goliatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Cetoniinae"],["Tribe","Goliathini"]],"dist":["AFR"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva in soil and rotting wood; adult on trees","habSame":false,"diet":["HER"],"size":[60,110],"fact":"Larvae need extra protein and will eat soft-bodied insects in the soil, unlike most other beetle grubs."},{"id":"Mecynorrhina","common":"Goliath flower beetle","genus":"Mecynorrhina","species":"torquata","scientificName":"Mecynorrhina torquata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Cetoniinae"],["Tribe","Goliathini"]],"dist":["AFR"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,85],"fact":"African giants the size of a child's fist — males carry a Y-shaped horn used in wrestling matches over tree sap, while their flight sounds like a small drone passing by."},{"id":"Eurycnema","common":"Goliath stick insect","genus":"Eurycnema","species":"goliath","scientificName":"Eurycnema goliath","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Males can fly; females flightless","habSame":true,"diet":["HER"],"size":[180,250],"fact":"One of the largest insects in Australia, with females reaching 25 cm."},{"id":"Gomphus","common":"Gomphid dragonfly","genus":"Gomphus","species":"vulgatissimus","scientificName":"Gomphus vulgatissimus","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Gomphoidea"],["Family","Gomphidae"],["Tribe","Gomphini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[45,55],"fact":"Has eyes set apart like a hammerhead shark — most dragonflies have eyes that touch."},{"id":"Dytiscus","common":"Great diving beetle","genus":"Dytiscus","species":"marginalis","scientificName":"Dytiscus marginalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Dytiscidae"],["Tribe","Dytiscini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"Fully aquatic; flies between water bodies","habSame":true,"diet":["CAR"],"size":[27,35],"fact":"Adults carry a bubble of air under their wings like a scuba tank."},{"id":"Tettigonia","common":"Great green bush-cricket","genus":"Tettigonia","species":"viridissima","scientificName":"Tettigonia viridissima","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Tettigoniinae"],["Tribe","Tettigoniini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[28,42],"fact":"Males chirp by rubbing wing-ribs together at over 50 strokes per second."},{"id":"Phryganea","common":"Great red sedge","genus":"Phryganea","species":"grandis","scientificName":"Phryganea grandis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Phryganeidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[20,30],"fact":"Larvae build portable houses from plant material and carry them along on the streambed."},{"id":"Hydrophilus","common":"Great silver water beetle","genus":"Hydrophilus","species":"piceus","scientificName":"Hydrophilus piceus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Hydrophiloidea"],["Family","Hydrophilidae"],["Tribe","Hydrophilini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["OMN"],"size":[37,50],"fact":"Among the largest aquatic insects in Europe, with adults reaching 5 cm."},{"id":"Ephemera","common":"Green drake mayfly","genus":"Ephemera","species":"danica","scientificName":"Ephemera danica","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Furcatergalia"],["Family","Ephemeridae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[15,25],"fact":"Adults live only 1 to 2 days — sometimes just hours — long enough to mate and lay eggs."},{"id":"Chrysoperla","common":"Green lacewing","genus":"Chrysoperla","species":"carnea","scientificName":"Chrysoperla carnea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Chrysopidae"],["Tribe","Chrysopini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Larvae camouflage themselves by sticking the dried husks of their prey onto their backs."},{"id":"Myzus","common":"Green peach aphid","genus":"Myzus","species":"persicae","scientificName":"Myzus persicae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Aphidoidea"],["Family","Aphididae"],["Tribe","Macrosiphini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Most generations wingless; only migratory generation flies","habSame":true,"diet":["HER"],"size":[2,3],"fact":"Mostly all-female; mothers give birth to live, already-pregnant daughters."},{"id":"Cicindela","common":"Green tiger beetle","genus":"Cicindela","species":"campestris","scientificName":"Cicindela campestris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Cicindelinae"],["Tribe","Cicindelini"]],"dist":["PAL"],"hab":["SUB","TER","AER"],"habAdult":["TER","AER"],"habLarva":["SUB"],"habNote":"Adults active fliers; larvae ambush from burrows","habSame":false,"diet":["CAR"],"size":[10,20],"fact":"They run so fast they go temporarily blind and have to stop to refocus on prey."},{"id":"Lucilia","common":"Greenbottle fly","genus":"Lucilia","species":"sericata","scientificName":"Lucilia sericata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Calliphoridae"],["Tribe","Luciliini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[8,10],"fact":"Used in 'maggot therapy' to clean wounds — the larvae eat dead tissue but spare living flesh."},{"id":"Heliothrips","common":"Greenhouse thrips","genus":"Heliothrips","species":"haemorrhoidalis","scientificName":"Heliothrips haemorrhoidalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Thysanoptera"],["Suborder","Terebrantia"],["Family","Thripidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Glasshouse staple — its fringed wings let it 'row' through the air."},{"id":"Trialeurodes","common":"Greenhouse whitefly","genus":"Trialeurodes","species":"vaporariorum","scientificName":"Trialeurodes vaporariorum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Aleyrodoidea"],["Family","Aleyrodidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Adults look like tiny moths but are actually true bugs that suck plant sap."},{"id":"Lymantria","common":"Gypsy moth","genus":"Lymantria","species":"dispar","scientificName":"Lymantria dispar","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"],["Subfamily","Lymantriinae"],["Tribe","Lymantriini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Asian females fly; European 'gypsy' females are flightless","habSame":false,"diet":["HER"],"size":[35,55],"fact":"Females release a pheromone so strong it can attract males from kilometres downwind."},{"id":"Bittacus","common":"Hangingfly","genus":"Bittacus","species":"italicus","scientificName":"Bittacus italicus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Mecoptera"],["Family","Bittacidae"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["CAR"],"size":[15,25],"fact":"Catches small flies in mid-air using its hind legs like sticky claws."},{"id":"Acrocinus","common":"Harlequin beetle","genus":"Acrocinus","species":"longimanus","scientificName":"Acrocinus longimanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Lamiinae"],["Tribe","Acrocinini"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae bore in fig trees","habSame":false,"diet":["HER"],"size":[70,80],"fact":"Its 'harlequin' pattern is matched by absurdly long forelegs — sometimes longer than its body."},{"id":"Harmonia","common":"Harlequin ladybird","genus":"Harmonia","species":"axyridis","scientificName":"Harmonia axyridis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Coccinelloidea"],["Family","Coccinellidae"],["Tribe","Coccinellini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[5,8],"fact":"Introduced for pest control, it now outcompetes native ladybugs across multiple continents."},{"id":"Aeshna","common":"Hawker dragonfly","genus":"Aeshna","species":"cyanea","scientificName":"Aeshna cyanea","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"],["Tribe","Aeshnini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[60,75],"fact":"Hovers, hovers backwards and even hovers upside-down with stunning agility."},{"id":"Pediculus","common":"Head louse","genus":"Pediculus","species":"humanus","scientificName":"Pediculus humanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Phthiraptera"],["Suborder","Anoplura"],["Family","Pediculidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless, on host","habSame":true,"diet":["CAR"],"size":[2,4],"fact":"Lives only on humans and our closest primate relatives."},{"id":"Heliconius","common":"Heliconian","genus":"Heliconius","species":"melpomene","scientificName":"Heliconius melpomene","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Heliconiinae"],["Tribe","Heliconiini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[70,90],"fact":"Both sexes can learn from each other and even copy egg-laying choices, a rare 'cultural' trait."},{"id":"Megaloprepus","common":"Helicopter damselfly","genus":"Megaloprepus","species":"caerulatus","scientificName":"Megaloprepus caerulatus","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Pseudostigmatidae"]],"dist":["NEO"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[70,100],"fact":"The world's largest damselfly, with a wingspan of nearly 19 cm."},{"id":"Dynastes","common":"Hercules beetle","genus":"Dynastes","species":"hercules","scientificName":"Dynastes hercules","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Dynastinae"],["Tribe","Dynastini"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva in rotting wood; adult on tree trunks","habSame":false,"diet":["HER"],"size":[50,170],"fact":"Males can lift 850 times their body weight, the equivalent of a human carrying a small whale."},{"id":"Coscinocera","common":"Hercules moth","genus":"Coscinocera","species":"hercules","scientificName":"Coscinocera hercules","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Attacini"]],"dist":["OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Adults cannot eat; live ~10 days","habSame":false,"diet":["HER"],"size":[200,270],"fact":"Australia's largest moth — a female's wings cover more area than a human hand, all to launch eggs in a brief life that never includes a meal."},{"id":"Mayetiola","common":"Hessian fly","genus":"Mayetiola","species":"destructor","scientificName":"Mayetiola destructor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Bibionomorpha"],["Family","Cecidomyiidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[2,3],"fact":"Hidden inside wheat stems, it has shaped wheat-breeding programs for over a century."},{"id":"Myrmecocystus","common":"Honeypot ant","genus":"Myrmecocystus","species":"mexicanus","scientificName":"Myrmecocystus mexicanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Lasiini"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["OMN"],"size":[5,10],"fact":"Specialist 'honeypot' workers gorge on nectar until they're living storage jars for the colony."},{"id":"Urocerus","common":"Horntail","genus":"Urocerus","species":"gigas","scientificName":"Urocerus gigas","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Symphyta"],["Superfamily","Siricoidea"],["Family","Siricidae"],["Tribe","Siricini"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Larvae bore in wood","habSame":false,"diet":["HER"],"size":[25,40],"fact":"Females drill into tree trunks to lay eggs along with fungal spores their larvae will eat."},{"id":"Manduca","common":"Hornworm","genus":"Manduca","species":"sexta","scientificName":"Manduca sexta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Sphingini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[100,120],"fact":"Has become a key research model in neuroscience for studying flight and learning."},{"id":"Tabanus","common":"Horse fly","genus":"Tabanus","species":"bovinus","scientificName":"Tabanus bovinus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Tabanomorpha"],["Family","Tabanidae"],["Tribe","Tabanini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"Larvae aquatic or in damp soil","habSame":false,"diet":["CAR"],"size":[15,25],"fact":"Females can drink more than their body weight in blood in one meal."},{"id":"Acheta","common":"House cricket","genus":"Acheta","species":"domesticus","scientificName":"Acheta domesticus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Gryllidae"],["Subfamily","Gryllinae"],["Tribe","Gryllini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[16,21],"fact":"Used worldwide as a sustainable protein source — flour, snacks, even pasta."},{"id":"Musca","common":"Housefly","genus":"Musca","species":"domestica","scientificName":"Musca domestica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Muscoidea"],["Family","Muscidae"],["Tribe","Muscini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[6,7],"fact":"Tastes with its feet — touching food triggers the proboscis to unfurl."},{"id":"Microstigmus","common":"Hovering social wasp","genus":"Microstigmus","species":"comes","scientificName":"Microstigmus comes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Pemphredonidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Nests hang from a single silk thread","habSame":false,"diet":["CAR"],"size":[3,4],"fact":"One of the only crabronid wasps with true cooperative behaviour — a few females share a tiny silken nest dangling from a leaf, taking turns to guard and forage."},{"id":"Dermatobia","common":"Human botfly","genus":"Dermatobia","species":"hominis","scientificName":"Dermatobia hominis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Oestridae"],["Tribe","Cuterebrini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop inside mammalian skin","habSame":false,"diet":["CAR"],"size":[12,18],"fact":"Larvae develop inside the skin of mammals (sometimes humans) for several weeks."},{"id":"Pulex","common":"Human flea","genus":"Pulex","species":"irritans","scientificName":"Pulex irritans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Siphonaptera"],["Family","Pulicidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[2,3],"fact":"Was the primary vector of the bubonic plague in the Black Death."},{"id":"Macroglossum","common":"Hummingbird hawkmoth","genus":"Macroglossum","species":"stellatarum","scientificName":"Macroglossum stellatarum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Macroglossinae"],["Tribe","Macroglossini"]],"dist":["PAL","AFR","IND"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,45],"fact":"Hovers like a hummingbird and is often mistaken for one."},{"id":"Carausius","common":"Indian stick insect","genus":"Carausius","species":"morosus","scientificName":"Carausius morosus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Lonchodidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[70,80],"fact":"Reproduces almost entirely without males — a colony of one female can re-found itself."},{"id":"Popillia","common":"Japanese beetle","genus":"Popillia","species":"japonica","scientificName":"Popillia japonica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Rutelinae"],["Tribe","Anomalini"]],"dist":["PAL"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"Active flier as adult; larva is a soil grub","habSame":false,"diet":["HER"],"size":[10,15],"fact":"First detected outside Asia in a New Jersey nursery in 1916; it now defoliates over 300 plant species in North America."},{"id":"Trypoxylus","common":"Japanese rhinoceros beetle","genus":"Trypoxylus","species":"dichotomus","scientificName":"Trypoxylus dichotomus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Dynastinae"],["Tribe","Dynastini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva in compost/rotting wood; adult on trees","habSame":false,"diet":["HER"],"size":[40,80],"fact":"In Japan they are sold in vending machines and kept as pets by schoolchildren."},{"id":"Stenopelmatus","common":"Jerusalem cricket","genus":"Stenopelmatus","species":"fuscus","scientificName":"Stenopelmatus fuscus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Stenopelmatoidea"],["Family","Stenopelmatidae"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["TER","SUB"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[30,75],"fact":"Its alarming face has earned local names like 'child of the earth' and 'old bald-headed man'."},{"id":"Chrysochroa","common":"Jewel beetle","genus":"Chrysochroa","species":"fulgidissima","scientificName":"Chrysochroa fulgidissima","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Buprestoidea"],["Family","Buprestidae"],["Tribe","Chrysochroini"]],"dist":["IND","PAL"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,42],"fact":"Its iridescent wing-cases were used as ornaments in jewellery for centuries in South Asia."},{"id":"Heteropteryx","common":"Jungle nymph","genus":"Heteropteryx","species":"dilatata","scientificName":"Heteropteryx dilatata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Heteropterygidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females flightless","habSame":true,"diet":["HER"],"size":[100,160],"fact":"Females can be much larger than males and produce some of the largest eggs of any insect."},{"id":"Microcentrum","common":"Katydid","genus":"Microcentrum","species":"rhombifolium","scientificName":"Microcentrum rhombifolium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Phaneropterinae"],["Tribe","Microcentrini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,65],"fact":"Its leaf-like wings have realistic 'veins' and even mimic the chewed edges of leaves."},{"id":"Triatoma","common":"Kissing bug","genus":"Triatoma","species":"infestans","scientificName":"Triatoma infestans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Tribe","Triatomini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Rarely flies; mainly crawls","habSame":true,"diet":["CAR"],"size":[18,30],"fact":"Bites sleeping mammals around the face — earning the name 'kissing bug'."},{"id":"Eurytides","common":"Kite swallowtail","genus":"Eurytides","species":"marcellus","scientificName":"Eurytides marcellus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Leptocircini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,80],"fact":"The zebra-striped glider of southeastern swamps — flies in long drifting arcs only over patches of its sole foodplant, pawpaw trees."},{"id":"Malacosoma","common":"Lackey moth","genus":"Malacosoma","species":"neustria","scientificName":"Malacosoma neustria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Lasiocampoidea"],["Family","Lasiocampidae"],["Tribe","Malacosomatini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[24,32],"fact":"Larvae build silken communal tents in trees and emerge to feed in groups."},{"id":"Lycorma","common":"Lanternfly","genus":"Lycorma","species":"delicatula","scientificName":"Lycorma delicatula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Fulgoridae"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Its dramatic red and black inner wings flash open when it takes off, startling predators."},{"id":"Dermestes","common":"Larder beetle","genus":"Dermestes","species":"lardarius","scientificName":"Dermestes lardarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Bostrichoidea"],["Family","Dermestidae"],["Tribe","Dermestini"]],"dist":["PAL","NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[7,9],"fact":"Museums use these beetles to clean flesh off skeletons for taxidermy and study."},{"id":"Pyrrhosoma","common":"Large red damselfly","genus":"Pyrrhosoma","species":"nymphula","scientificName":"Pyrrhosoma nymphula","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Coenagrionidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[33,36],"fact":"One of the first damselflies to appear in spring across Europe."},{"id":"Atta","common":"Leafcutter ant","genus":"Atta","species":"cephalotes","scientificName":"Atta cephalotes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Attini"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,15],"fact":"Builds underground 'farms' where they cultivate fungus on chewed-up leaves."},{"id":"Megachile","common":"Leafcutter bee","genus":"Megachile","species":"rotundata","scientificName":"Megachile rotundata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Megachilidae"],["Tribe","Megachilini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[7,15],"fact":"Cuts perfectly circular leaf disks to build segmented nest cells."},{"id":"Leptocerus","common":"Long-horned caddisfly","genus":"Leptocerus","species":"tineiformis","scientificName":"Leptocerus tineiformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Leptoceridae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[8,12],"fact":"Adults have extremely long, swept-back antennae that look like fishing rods."},{"id":"Pyrops","common":"Long-nosed lanternfly","genus":"Pyrops","species":"candelaria","scientificName":"Pyrops candelaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Fulgoridae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[70,90],"fact":"Carries a long red snorkel-like rostrum tipped in white — local folklore claims the contact of a bite makes a woman barren, but the snout is harmless and the bug doesn't even bite."},{"id":"Dryococelus","common":"Lord Howe Island stick insect","genus":"Dryococelus","species":"australis","scientificName":"Dryococelus australis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[120,150],"fact":"Thought extinct for 80 years before being rediscovered on a single sea stack in 2001."},{"id":"Actias","common":"Luna moth","genus":"Actias","species":"luna","scientificName":"Actias luna","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Saturniini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[80,115],"fact":"Males detect a single female pheromone molecule from up to 7 km away."},{"id":"Chrysocoris","common":"Lychee jewel bug","genus":"Chrysocoris","species":"stollii","scientificName":"Chrysocoris stollii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Scutelleridae"],["Subfamily","Scutellerinae"],["Tribe","Chrysocorini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[13,18],"fact":"A walking iridescent gemstone — its metallic blue-green back is so polished it has been ground up and used as natural glitter in Asian craft traditions."},{"id":"Gromphadorhina","common":"Madagascar hissing cockroach","genus":"Gromphadorhina","species":"portentosa","scientificName":"Gromphadorhina portentosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Superfamily","Blaberoidea"],["Family","Blaberidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[50,75],"fact":"Hisses by forcing air through breathing pores — the only insect known to use this method for sound."},{"id":"Anopheles","common":"Malaria mosquito","genus":"Anopheles","species":"gambiae","scientificName":"Anopheles gambiae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Culicidae"],["Subfamily","Anophelinae"],["Tribe","Anophelini"]],"dist":["AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[5,8],"fact":"Rests at a steep upward angle, unlike most other mosquitoes, which lie parallel to the surface."},{"id":"Megascolia","common":"Mammoth wasp","genus":"Megascolia","species":"maculata","scientificName":"Megascolia maculata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Scolioidea"],["Family","Scoliidae"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Parasitises beetle grubs underground","habSame":false,"diet":["CAR"],"size":[30,55],"fact":"One of the largest wasps in Europe, with females reaching 5–6 cm."},{"id":"Catacanthus","common":"Man-faced bug","genus":"Catacanthus","species":"incarnatus","scientificName":"Catacanthus incarnatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Pentatomidae"],["Subfamily","Pentatominae"],["Tribe","Catacanthini"]],"dist":["IND","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Tropical forests and cashew groves of South Asia and Madagascar","habSame":true,"diet":["HER"],"size":[20,28],"fact":"Its bold black-and-cream pattern has been variously compared to a moustachioed dictator, to Elvis Presley, or to a tiny screaming face on its back — a coincidence that has made it one of the most photographed pentatomids in tropical Asia."},{"id":"Mantispa","common":"Mantispid","genus":"Mantispa","species":"styriaca","scientificName":"Mantispa styriaca","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Mantispidae"],["Tribe","Mantispini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Its forelegs are eerily similar to a mantis's even though the two are only distantly related."},{"id":"Marpesia","common":"Many-banded daggerwing","genus":"Marpesia","species":"chiron","scientificName":"Marpesia chiron","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Cyrestinae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,75],"fact":"Sports two long forked 'tail-streamers' on each hindwing that may confuse bird strikes — and gathers in shimmering mud-puddling clubs of dozens of males drinking salt from damp riverbanks."},{"id":"Rhithrogena","common":"March brown","genus":"Rhithrogena","species":"germanica","scientificName":"Rhithrogena germanica","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Setisura"],["Family","Heptageniidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,15],"fact":"Nymphs cling to fast-flowing rocks with claws and flattened bodies."},{"id":"Episyrphus","common":"Marmalade hoverfly","genus":"Episyrphus","species":"balteatus","scientificName":"Episyrphus balteatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Syrphoidea"],["Family","Syrphidae"],["Tribe","Syrphini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[9,12],"fact":"A perfect bee mimic that cannot sting — flowers fooled and so are predators."},{"id":"Osmia","common":"Mason bee","genus":"Osmia","species":"bicornis","scientificName":"Osmia bicornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Megachilidae"],["Tribe","Osmiini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[8,15],"fact":"Nests in hollow reeds and has been domesticated as an efficient orchard pollinator."},{"id":"Philaenus","common":"Meadow spittlebug","genus":"Philaenus","species":"spumarius","scientificName":"Philaenus spumarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cercopoidea"],["Family","Aphrophoridae"],["Tribe","Aphrophorini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Adults rarely fly; nymphs hide in foam on plants","habSame":true,"diet":["HER"],"size":[5,7],"fact":"Nymphs surround themselves with frothy spit — the 'cuckoo spit' you see on grass stems."},{"id":"Tenebrio","common":"Mealworm beetle","genus":"Tenebrio","species":"molitor","scientificName":"Tenebrio molitor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Tenebrionidae"],["Tribe","Tenebrionini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[12,18],"fact":"Their larvae (mealworms) can digest polystyrene and are now researched as plastic-recycling helpers."},{"id":"Iridomyrmex","common":"Meat ant","genus":"Iridomyrmex","species":"purpureus","scientificName":"Iridomyrmex purpureus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dolichoderinae"],["Tribe","Leptomyrmecini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Builds gravel-topped mounds with many entrances","habSame":true,"diet":["OMN"],"size":[6,12],"fact":"Australia's most ecologically dominant ant — colonies build sprawling, gravel-paved super-networks that exclude almost every other ground species, and one such network can stretch a kilometre wide."},{"id":"Ceratitis","common":"Mediterranean fruit fly","genus":"Ceratitis","species":"capitata","scientificName":"Ceratitis capitata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Tephritoidea"],["Family","Tephritidae"],["Tribe","Ceratitidini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[4,5],"fact":"Males perform an elaborate wing-flicking dance to court females."},{"id":"Brachygastra","common":"Mexican honey wasp","genus":"Brachygastra","species":"mellifica","scientificName":"Brachygastra mellifica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Polistinae"],["Tribe","Epiponini"]],"dist":["NEO","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[7,10],"fact":"One of the very few wasps in the world to store honey in its nest — its colonies are raided by villagers who consider the sweet syrup mildly hallucinogenic when the bees visit certain flowers."},{"id":"Locusta","common":"Migratory locust","genus":"Locusta","species":"migratoria","scientificName":"Locusta migratoria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Oedipodinae"],["Tribe","Oedipodini"]],"dist":["AFR","PAL","IND"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,70],"fact":"When crowded, solitary green individuals switch to gregarious yellow-and-black 'plague phase' adults."},{"id":"Oncopeltus","common":"Milkweed bug","genus":"Oncopeltus","species":"fasciatus","scientificName":"Oncopeltus fasciatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Lygaeoidea"],["Family","Lygaeidae"],["Tribe","Lygaeini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,17],"fact":"A long-standing model organism used to study insect development and pigmentation."},{"id":"Andrena","common":"Mining bee","genus":"Andrena","species":"fulva","scientificName":"Andrena fulva","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Andrenidae"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[8,17],"fact":"Solitary, but hundreds may dig nests next to each other forming 'apartment block' colonies."},{"id":"Gryllotalpa","common":"Mole cricket","genus":"Gryllotalpa","species":"gryllotalpa","scientificName":"Gryllotalpa gryllotalpa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Gryllotalpidae"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["SUB","TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["OMN"],"size":[30,50],"fact":"Digs tunnels shaped like megaphones that amplify its calls audibly above ground."},{"id":"Danaus","common":"Monarch","genus":"Danaus","species":"plexippus","scientificName":"Danaus plexippus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Danainae"],["Tribe","Danaini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[90,100],"fact":"Migrates up to 4,800 km from Canada to Mexico, the longest insect migration known."},{"id":"Manticora","common":"Monster tiger beetle","genus":"Manticora","species":"tuberculata","scientificName":"Manticora tuberculata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Cicindelinae"],["Tribe","Manticorini"]],"dist":["AFR"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Adult is flightless; larva ambushes from a burrow","habSame":false,"diet":["CAR"],"size":[50,70],"fact":"A flightless desert hunter armoured like a tank — its mandibles can crush small lizards, and dung beetles unlucky enough to wander past disappear in two bites."},{"id":"Anabrus","common":"Mormon cricket","genus":"Anabrus","species":"simplex","scientificName":"Anabrus simplex","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Tettigoniinae"],["Tribe","Decticini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["OMN"],"size":[30,50],"fact":"Massive flightless crickets march in waves of millions and even cannibalise each other."},{"id":"Taraxippus","common":"Moss stick insect","genus":"Taraxippus","species":"samarae","scientificName":"Taraxippus samarae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"],["Subfamily","Cladomorphinae"],["Tribe","Hesperophasmatini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wet montane rainforest of Costa Rica and Panama","habSame":true,"diet":["HER"],"size":[55,75],"fact":"A phasmid that mimics living mossy bark so perfectly it disappears against tree trunks — only discovered in 2018, formally described in 2020, and named after the discoverer's young daughter Samara."},{"id":"Clogmia","common":"Moth fly","genus":"Clogmia","species":"albipunctata","scientificName":"Clogmia albipunctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Psychodomorpha"],["Family","Psychodidae"]],"dist":["NEO"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[4,5],"fact":"Often found in bathroom drains, where their larvae feed on slimy organic matter."},{"id":"Glyphotaelius","common":"Mottled sedge","genus":"Glyphotaelius","species":"pellucidus","scientificName":"Glyphotaelius pellucidus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Limnephilidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[15,25],"fact":"Larvae piece together cases of leaf disks like green tiled mosaics."},{"id":"Macrotermes","common":"Mound-building termite","genus":"Macrotermes","species":"bellicosus","scientificName":"Macrotermes bellicosus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Termitidae"],["Tribe","Macrotermitini"]],"dist":["AFR"],"hab":["SUB"],"habAdult":["SUB"],"habLarva":["SUB"],"habNote":"","habSame":true,"diet":["HER"],"size":[5,15],"fact":"Builds mounds up to 9 metres tall, complete with ventilation chimneys."},{"id":"Dendroctonus","common":"Mountain pine beetle","genus":"Dendroctonus","species":"ponderosae","scientificName":"Dendroctonus ponderosae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Subfamily","Scolytinae"],["Tribe","Hylurgini"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae burrow under bark","habSame":false,"diet":["HER"],"size":[4,7],"fact":"A warming climate has let them survive winters that used to kill them, devastating millions of hectares of pine forest."},{"id":"Nymphalis","common":"Mourning cloak","genus":"Nymphalis","species":"antiopa","scientificName":"Nymphalis antiopa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["PAL","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,75],"fact":"It hibernates as an adult and may live up to 11 months, exceptional for a butterfly."},{"id":"Sceliphron","common":"Mud dauber","genus":"Sceliphron","species":"caementarium","scientificName":"Sceliphron caementarium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Sphecidae"],["Tribe","Sceliphrini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[20,30],"fact":"Constructs nests of mud cells that look like miniature pipe organs."},{"id":"Hydropsyche","common":"Net-spinning caddisfly","genus":"Hydropsyche","species":"pellucidula","scientificName":"Hydropsyche pellucidula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Annulipalpia"],["Family","Hydropsychidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Larvae spin underwater silk nets to catch food drifting in the current."},{"id":"Megalopta","common":"Nocturnal sweat bee","genus":"Megalopta","species":"genalis","scientificName":"Megalopta genalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Halictidae"],["Subfamily","Halictinae"],["Tribe","Augochlorini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Forages only at dusk and dawn","habSame":false,"diet":["HER"],"size":[10,13],"fact":"Forages in starlight when most bees can see nothing — its enormous compound eyes have evolved to gather photons hundreds of times better than a honeybee's."},{"id":"Chironomus","common":"Non-biting midge","genus":"Chironomus","species":"riparius","scientificName":"Chironomus riparius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Chironomidae"],["Tribe","Chironomini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,12],"fact":"Adult swarms over lakes can be so dense they show up on weather radar."},{"id":"Limnephilus","common":"Northern caddisfly","genus":"Limnephilus","species":"rhombicus","scientificName":"Limnephilus rhombicus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Limnephilidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,20],"fact":"Larval cases include sand grains, pebbles, sticks — whatever fits on the local stream bed."},{"id":"Diapheromera","common":"Northern walkingstick","genus":"Diapheromera","species":"femorata","scientificName":"Diapheromera femorata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Diapheromeridae"],["Tribe","Diapheromerini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[70,95],"fact":"Sways gently while walking to mimic a twig in the wind."},{"id":"Cynips","common":"Oak gall wasp","genus":"Cynips","species":"quercusfolii","scientificName":"Cynips quercusfolii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Parasitica"],["Superfamily","Cynipoidea"],["Family","Cynipidae"],["Tribe","Cynipini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop inside oak galls","habSame":false,"diet":["HER"],"size":[3,5],"fact":"The chemicals it injects into oak leaves cause the tree to grow ornate 'gall' homes for its larvae."},{"id":"Meloe","common":"Oil beetle","genus":"Meloe","species":"proscarabaeus","scientificName":"Meloe proscarabaeus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Meloidae"],["Tribe","Meloini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae hitch rides on bees back to nests","habSame":true,"diet":["HER"],"size":[10,30],"fact":"Larvae cling to flowers and hitchhike on visiting bees back to the nest, where they eat the brood."},{"id":"Centris","common":"Oil-collecting bee","genus":"Centris","species":"pallida","scientificName":"Centris pallida","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Centridini"]],"dist":["NEA"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Sonoran Desert specialist; larvae develop in burrows","habSame":false,"diet":["HER"],"size":[12,16],"fact":"Males patrol the Sonoran Desert at dawn, digging frantically into sand to find virgin females still buried — a behaviour known as 'pre-emergence mating'."},{"id":"Iphiclides","common":"Old World swallowtail","genus":"Iphiclides","species":"podalirius","scientificName":"Iphiclides podalirius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Leptocircini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,80],"fact":"It is sometimes called the 'scarce swallowtail' even though it's quite common across southern Europe."},{"id":"Thrips","common":"Onion thrips","genus":"Thrips","species":"tabaci","scientificName":"Thrips tabaci","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Thysanoptera"],["Suborder","Terebrantia"],["Family","Thripidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Despite being only 1 mm long, it's responsible for major losses in onion fields worldwide."},{"id":"Euglossa","common":"Orchid bee","genus":"Euglossa","species":"dilemma","scientificName":"Euglossa dilemma","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Euglossini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,15],"fact":"Males collect orchid scents into hollow legs to create their own personal perfume."},{"id":"Hymenopus","common":"Orchid mantis","genus":"Hymenopus","species":"coronatus","scientificName":"Hymenopus coronatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Hymenopodidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[40,70],"fact":"Looks so much like a flower that pollinators sometimes land on it expecting nectar."},{"id":"Blatta","common":"Oriental cockroach","genus":"Blatta","species":"orientalis","scientificName":"Blatta orientalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Family","Blattidae"],["Tribe","Blattini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["OMN"],"size":[20,30],"fact":"Can squeeze through cracks the thickness of a quarter coin."},{"id":"Xenopsylla","common":"Oriental rat flea","genus":"Xenopsylla","species":"cheopis","scientificName":"Xenopsylla cheopis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Siphonaptera"],["Family","Pulicidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[2,3],"fact":"Spread plague from rats to humans across continents, repeatedly through history."},{"id":"Caligo","common":"Owl butterfly","genus":"Caligo","species":"memnon","scientificName":"Caligo memnon","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Brassolini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[120,160],"fact":"Its huge owl-eye underwing spots can startle birds long enough for the butterfly to escape."},{"id":"Ascalaphus","common":"Owlfly","genus":"Ascalaphus","species":"libelluloides","scientificName":"Ascalaphus libelluloides","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Myrmeleontiformia"],["Family","Ascalaphidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,55],"fact":"Owlflies look like a dragonfly–butterfly hybrid: hovering predators with long clubbed antennae and patterned wings — clues to their lacewing ancestry."},{"id":"Poekilocerus","common":"Painted grasshopper","genus":"Poekilocerus","species":"pictus","scientificName":"Poekilocerus pictus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Pyrgomorphoidea"],["Family","Pyrgomorphidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[50,75],"fact":"Sequesters cardiac glycosides from milkweed and squirts them out as a defensive spray."},{"id":"Cynthia","common":"Painted lady","genus":"Cynthia","species":"cardui","scientificName":"Cynthia cardui","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["NEA","NEO","PAL","AFR","IND","OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,70],"fact":"One generation can migrate from Africa across the Sahara, the Alps, and into Scandinavia."},{"id":"Idea","common":"Paper kite butterfly","genus":"Idea","species":"leuconoe","scientificName":"Idea leuconoe","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Danainae"],["Tribe","Danaini"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[120,160],"fact":"Drifts through Southeast Asian forests on enormous black-veined parchment wings — so leisurely you can almost walk alongside it."},{"id":"Polistes","common":"Paper wasp","genus":"Polistes","species":"dominula","scientificName":"Polistes dominula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Polistinae"],["Tribe","Polistini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[12,18],"fact":"Builds open paper combs without an outer envelope, like an upside-down honeycomb umbrella."},{"id":"Acyrthosiphon","common":"Pea aphid","genus":"Acyrthosiphon","species":"pisum","scientificName":"Acyrthosiphon pisum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Aphidoidea"],["Family","Aphididae"],["Tribe","Macrosiphini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[2,4],"fact":"Hosts symbiotic bacteria inside special cells, without which it cannot survive."},{"id":"Aglais","common":"Peacock butterfly","genus":"Aglais","species":"io","scientificName":"Aglais io","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,65],"fact":"When threatened it flashes its peacock-eye spots and makes a hissing noise with its wings."},{"id":"Fulgora","common":"Peanut-head lanternfly","genus":"Fulgora","species":"laternaria","scientificName":"Fulgora laternaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Fulgoridae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Despite the name, does NOT light up","habSame":true,"diet":["HER"],"size":[80,95],"fact":"Has a fake hollow 'peanut head' shaped like a small caiman's snout — when threatened it flashes huge eyespots on its hindwings and emits a sudden skunk-like stench."},{"id":"Pelecinus","common":"Pelecinid wasp","genus":"Pelecinus","species":"polyturator","scientificName":"Pelecinus polyturator","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Superfamily","Proctotrupoidea"],["Family","Pelecinidae"]],"dist":["NEA","NEO"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Larva parasitises scarab beetle grubs underground","habSame":false,"diet":["CAR"],"size":[50,70],"fact":"The female's abdomen is a black, slender ribbon five times longer than her body — a curving probe she sinks into the soil to find scarab grubs growing below."},{"id":"Biston","common":"Peppered moth","genus":"Biston","species":"betularia","scientificName":"Biston betularia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Geometroidea"],["Family","Geometridae"],["Tribe","Bistonini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Famously evolved from light to dark within decades during the Industrial Revolution due to soot-blackened trees."},{"id":"Magicicada","common":"Periodical cicada","genus":"Magicicada","species":"septendecim","scientificName":"Magicicada septendecim","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cicadoidea"],["Family","Cicadidae"]],"dist":["NEA"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"17-year nymphal development underground","habSame":false,"diet":["HER"],"size":[25,30],"fact":"Some populations emerge en masse exactly every 17 years, then vanish completely."},{"id":"Cithaerias","common":"Pink-tipped satyr","genus":"Cithaerias","species":"pireta","scientificName":"Cithaerias pireta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Haeterini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,70],"fact":"Its almost completely transparent wings tip into a sudden flush of magenta — a glass-and-rose ghost that drifts through dim understorey clearings."},{"id":"Battus","common":"Pipevine swallowtail","genus":"Battus","species":"philenor","scientificName":"Battus philenor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Troidini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae sequester aristolochic acids from pipevines","habSame":false,"diet":["HER"],"size":[70,130],"fact":"Its iridescent blue females are the model that several unrelated butterflies have evolved to copy — and only one toxic vine in the Americas can produce the chemicals her caterpillars sequester for defence."},{"id":"Eumenes","common":"Potter wasp","genus":"Eumenes","species":"fraternus","scientificName":"Eumenes fraternus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Eumeninae"],["Tribe","Eumenini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Sculpts perfect tiny clay pots and provisions each with a paralysed caterpillar."},{"id":"Saga","common":"Predatory bush cricket","genus":"Saga","species":"pedo","scientificName":"Saga pedo","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Saginae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Reproduces only by parthenogenesis (all-female)","habSame":true,"diet":["CAR"],"size":[60,80],"fact":"One of Europe's largest insects — an all-female lineage that ambushes other grasshoppers with mantis-like forelegs, leaving no males in any population."},{"id":"Lycaena","common":"Purple copper","genus":"Lycaena","species":"hermes","scientificName":"Lycaena hermes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Lycaenidae"],["Subfamily","Lycaeninae"],["Tribe","Lycaenini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,32],"fact":"Almost vanished from southern California chaparral — a few thumb-sized populations cling to one patch of redberry shrubs each, and a single fire could end them."},{"id":"Favonius","common":"Purple hairstreak","genus":"Favonius","species":"quercus","scientificName":"Favonius quercus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Lycaenidae"],["Subfamily","Theclinae"],["Tribe","Theclini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"Males perch high in oak canopies and defend tiny aerial territories from sunrise until dusk."},{"id":"Cerura","common":"Puss moth","genus":"Cerura","species":"vinula","scientificName":"Cerura vinula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Notodontidae"],["Tribe","Dicranurini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,75],"fact":"Caterpillars have a 'forked tail' from which they shoot formic acid at attackers."},{"id":"Tetrix","common":"Pygmy grasshopper","genus":"Tetrix","species":"subulata","scientificName":"Tetrix subulata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Tetrigoidea"],["Family","Tetrigidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Some species swim","habSame":true,"diet":["HER"],"size":[8,12],"fact":"Tiny grasshoppers that can swim and dive underwater to escape predators."},{"id":"Dactylotum","common":"Rainbow grasshopper","genus":"Dactylotum","species":"bicolor","scientificName":"Dactylotum bicolor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Melanoplinae"],["Tribe","Dactylotini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[20,35],"fact":"Its rainbow warning colours advertise the toxins it gets from milkweed."},{"id":"Phanaeus","common":"Rainbow scarab","genus":"Phanaeus","species":"vindex","scientificName":"Phanaeus vindex","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Phanaeini"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["OMN"],"size":[11,22],"fact":"An iridescent green-and-copper jewel that lives in cattle dung — males swing a single horn like a tiny pickaxe to dig nuptial chambers for their mates."},{"id":"Vanessa","common":"Red admiral","genus":"Vanessa","species":"atalanta","scientificName":"Vanessa atalanta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["NEA","NEO","PAL","AFR","IND","OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,65],"fact":"Its caterpillars build a 'tent' of silk-tied nettle leaves to live in."},{"id":"Myrmecia","common":"Red bull ant","genus":"Myrmecia","species":"gulosa","scientificName":"Myrmecia gulosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmeciinae"],["Tribe","Myrmeciini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[14,23],"fact":"Schopenhauer used the bulldog ant as his proof of the 'will to live' — cut in two, the head and abdomen will continue battling each other to the death. Its sting is one of the most painful in the insect world."},{"id":"Solenopsis","common":"Red imported fire ant","genus":"Solenopsis","species":"invicta","scientificName":"Solenopsis invicta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Solenopsidini"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Only reproductive alates fly; workers are ground-bound","habSame":false,"diet":["OMN"],"size":[3,6],"fact":"When their nest floods, colonies link bodies together to form a living raft that can float for weeks."},{"id":"Citheronia","common":"Regal moth","genus":"Citheronia","species":"regalis","scientificName":"Citheronia regalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Ceratocampinae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillar is the famous 'hickory horned devil'","habSame":false,"diet":["HER"],"size":[95,155],"fact":"Its caterpillar — the hickory horned devil — is one of the most fearsome-looking grubs in North America, but for all its scarlet spikes it cannot sting and is utterly harmless."},{"id":"Euborellia","common":"Ring-legged earwig","genus":"Euborellia","species":"annulipes","scientificName":"Euborellia annulipes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Dermaptera"],["Suborder","Neodermaptera"],["Family","Anisolabididae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[12,16],"fact":"Wingless and especially common in greenhouses."},{"id":"Asilus","common":"Robber fly","genus":"Asilus","species":"crabroniformis","scientificName":"Asilus crabroniformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Asilomorpha"],["Family","Asilidae"],["Tribe","Asilini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[18,28],"fact":"Catches prey mid-air, injects digestive enzymes, then sucks out the liquefied insides."},{"id":"Grylloblatta","common":"Rock crawler","genus":"Grylloblatta","species":"campodeiformis","scientificName":"Grylloblatta campodeiformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Notoptera"],["Suborder","Grylloblattodea"],["Family","Grylloblattidae"]],"dist":["NEA"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["TER","SUB"],"habNote":"Wingless; on glaciers","habSame":true,"diet":["OMN"],"size":[20,30],"fact":"Lives only on glaciers and snowfields — body temperatures above 10°C can kill it."},{"id":"Cetonia","common":"Rose chafer","genus":"Cetonia","species":"aurata","scientificName":"Cetonia aurata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Cetoniinae"],["Tribe","Cetoniini"]],"dist":["PAL"],"hab":["SUB","TER","AER"],"habAdult":["AER","TER"],"habLarva":["SUB"],"habNote":"Adults fly readily between flowers; larvae in compost","habSame":false,"diet":["HER"],"size":[14,23],"fact":"Adults can fly with their wing-cases (elytra) closed, an unusual feat for beetles."},{"id":"Macrodontia","common":"Sabertooth longhorn","genus":"Macrodontia","species":"cervicornis","scientificName":"Macrodontia cervicornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Prioninae"],["Tribe","Macrodontiini"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva tunnels in dead wood for ~10 years","habSame":false,"diet":["HER"],"size":[120,175],"fact":"Its larva is the largest of any insect by weight — a finger-thick grub that grinds for a decade inside rotting Amazon hardwoods before the adult emerges."},{"id":"Scarabaeus","common":"Sacred scarab","genus":"Scarabaeus","species":"sacer","scientificName":"Scarabaeus sacer","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Scarabaeini"]],"dist":["AFR","PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larva develops underground in dung balls","habSame":false,"diet":["OMN"],"size":[25,40],"fact":"Egyptian priests considered them sacred because they rolled dung balls the way the sun god rolled the sun across the sky."},{"id":"Haploembia","common":"Saharan web-spinner","genus":"Haploembia","species":"solieri","scientificName":"Haploembia solieri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Embioptera"],["Family","Oligotomidae"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["TER","SUB"],"habNote":"Wingless","habSame":true,"diet":["HER"],"size":[8,12],"fact":"Lives in colonies under stones in dry Mediterranean habitats."},{"id":"Membracis","common":"Sail treehopper","genus":"Membracis","species":"foliata","scientificName":"Membracis foliata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Membracoidea"],["Family","Membracidae"],["Subfamily","Membracinae"],["Tribe","Membracini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[8,14],"fact":"Wears a tall fin-shaped projection on its back that exactly matches a thorn on its host plant — a single bend of the stem and the bug appears, vanishes, appears again with each glance."},{"id":"Pteronarcys","common":"Salmonfly","genus":"Pteronarcys","species":"californica","scientificName":"Pteronarcys californica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Plecoptera"],["Suborder","Arctoperlaria"],["Family","Pteronarcyidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,60],"fact":"Adults are huge, with wingspans approaching 7 cm — the largest stoneflies."},{"id":"Phlebotomus","common":"Sand fly","genus":"Phlebotomus","species":"papatasi","scientificName":"Phlebotomus papatasi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Psychodomorpha"],["Family","Psychodidae"],["Tribe","Phlebotomini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[2,3],"fact":"Tiny enough to pass through standard mosquito netting."},{"id":"Eurybrachys","common":"Sandalwood planthopper","genus":"Eurybrachys","species":"tomentosa","scientificName":"Eurybrachys tomentosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Eurybrachidae"],["Subfamily","Eurybrachinae"],["Tribe","Eurybrachini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Sandalwood and Calotropis plantations in central and southern India","habSame":true,"diet":["HER"],"size":[12,18],"fact":"Wears fake antennae on its rear end — long bristles plus false eye-spots that point backwards — so when a predator strikes the 'head' the bug jumps the other way and escapes intact."},{"id":"Petrobius","common":"Sea bristletail","genus":"Petrobius","species":"maritimus","scientificName":"Petrobius maritimus","lineage":[["Order","Archaeognatha"],["Family","Machilidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[10,15],"fact":"Lives on rocky sea-cliffs, surviving salt spray and crashing waves."},{"id":"Coccinella","common":"Seven-spot ladybird","genus":"Coccinella","species":"septempunctata","scientificName":"Coccinella septempunctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Coccinelloidea"],["Family","Coccinellidae"],["Tribe","Coccinellini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[5,8],"fact":"Adults can eat over 5,000 aphids in their lifetime."},{"id":"Oestrus","common":"Sheep botfly","genus":"Oestrus","species":"ovis","scientificName":"Oestrus ovis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Oestridae"],["Tribe","Oestrini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop in sheep nasal passages","habSame":false,"diet":["HER"],"size":[10,12],"fact":"Females shoot live larvae directly into the noses of sheep."},{"id":"Melophagus","common":"Sheep ked","genus":"Melophagus","species":"ovinus","scientificName":"Melophagus ovinus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Hippoboscoidea"],["Family","Hippoboscidae"],["Tribe","Melophagini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless adult; lives on sheep","habSame":true,"diet":["CAR"],"size":[4,6],"fact":"Spends its entire life on sheep and has lost the use of its wings."},{"id":"Choeradodis","common":"Shield mantis","genus":"Choeradodis","species":"rhombicollis","scientificName":"Choeradodis rhombicollis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Choeradodinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[70,90],"fact":"Its enormous thoracic disc is held up like a leaf in the wind, hiding a hungry predator inside what looks like a translucent palm frond."},{"id":"Bombyx","common":"Silkworm","genus":"Bombyx","species":"mori","scientificName":"Bombyx mori","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Bombycidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Domesticated adults cannot fly","habSame":true,"diet":["HER"],"size":[40,50],"fact":"Fully domesticated for over 5,000 years — wild forms no longer exist and adults cannot fly."},{"id":"Chrysina","common":"Silver scarab","genus":"Chrysina","species":"resplendens","scientificName":"Chrysina resplendens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Rutelinae"],["Tribe","Rutelini"]],"dist":["NEO"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Highland cloud forest of Costa Rica and Panama","habSame":false,"diet":["HER"],"size":[25,35],"fact":"Its mirror-bright elytra reflect almost all visible light through a precisely-tuned stack of cuticle layers — the only known animal that reliably produces both left- and right-handed circularly polarised light, a feat materials scientists are still trying to copy."},{"id":"Epargyreus","common":"Silver-spotted skipper","genus":"Epargyreus","species":"clarus","scientificName":"Epargyreus clarus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Hesperiidae"],["Subfamily","Eudaminae"],["Tribe","Eudamini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Caterpillars cut tiny windows in leaves and fold them into shelters, like leaf origami."},{"id":"Zygaena","common":"Six-spot burnet","genus":"Zygaena","species":"filipendulae","scientificName":"Zygaena filipendulae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Zygaenoidea"],["Family","Zygaenidae"],["Tribe","Zygaenini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"Brightly coloured to advertise that they contain cyanide-releasing compounds."},{"id":"Boreus","common":"Snow scorpionfly","genus":"Boreus","species":"hyemalis","scientificName":"Boreus hyemalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Mecoptera"],["Family","Boreidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Snow scorpionflies have reduced wings; hop on snow","habSame":true,"diet":["HER"],"size":[3,5],"fact":"Active in winter — sometimes seen hopping on snow at temperatures below 0°C."},{"id":"Nezara","common":"Southern green stink bug","genus":"Nezara","species":"viridula","scientificName":"Nezara viridula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Pentatomidae"],["Tribe","Nezarini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[12,16],"fact":"Adults change colour with temperature — bright green in summer, brown in cooler months."},{"id":"Lytta","common":"Spanish fly","genus":"Lytta","species":"vesicatoria","scientificName":"Lytta vesicatoria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Meloidae"],["Tribe","Lyttini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[15,22],"fact":"Produces cantharidin, the toxic compound once mythologized as an aphrodisiac."},{"id":"Pararge","common":"Speckled wood","genus":"Pararge","species":"aegeria","scientificName":"Pararge aegeria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Parargini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,50],"fact":"Males defend small sun-spots in woodland and chase rivals in tight spirals."},{"id":"Polyrhachis","common":"Spiny ant","genus":"Polyrhachis","species":"dives","scientificName":"Polyrhachis dives","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Camponotini"]],"dist":["IND","OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[7,10],"fact":"Workers stitch together silk nests using their larvae as living glue guns — a behaviour shared with weaver ants but used to build hanging silken bags."},{"id":"Pseudocreobotra","common":"Spiny flower mantis","genus":"Pseudocreobotra","species":"wahlbergii","scientificName":"Pseudocreobotra wahlbergii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Dictyoptera"],["Order","Mantodea"],["Family","Hymenopodidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[35,45],"fact":"Wears a perfect 9-shaped eyespot on each forewing — flash them and a bird sees an owl glare instead of a snack."},{"id":"Nemoptera","common":"Spoonwing","genus":"Nemoptera","species":"bipennis","scientificName":"Nemoptera bipennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Myrmeleontiformia"],["Family","Nemopteridae"]],"dist":["PAL"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,50],"fact":"Its absurdly long thread-like hindwings trail behind in flight like ribbons."},{"id":"Stomoxys","common":"Stable fly","genus":"Stomoxys","species":"calcitrans","scientificName":"Stomoxys calcitrans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Muscoidea"],["Family","Muscidae"],["Tribe","Stomoxyini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[6,8],"fact":"Unlike a typical fly, both sexes bite and feed on blood."},{"id":"Cerodirphia","common":"Stinging silk moth","genus":"Cerodirphia","species":"speciosa","scientificName":"Cerodirphia speciosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Hemileucinae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillar spines deliver venom","habSame":false,"diet":["HER"],"size":[80,100],"fact":"The plain-looking adult hides one of the most dangerous larvae in the world — touching a clustered nest of these caterpillars in a Brazilian backyard has caused fatal haemorrhages."},{"id":"Trigona","common":"Stingless bee","genus":"Trigona","species":"spinipes","scientificName":"Trigona spinipes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Meliponini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,7],"fact":"Has no functional sting but defends by biting and tangling itself in attackers' hair — and was domesticated for honey by the Maya long before European beekeeping arrived."},{"id":"Labidura","common":"Striped earwig","genus":"Labidura","species":"riparia","scientificName":"Labidura riparia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Dermaptera"],["Suborder","Neodermaptera"],["Family","Labiduridae"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[18,30],"fact":"One of the largest earwigs and a voracious predator of garden pests."},{"id":"Heptagenia","common":"Sulphur mayfly","genus":"Heptagenia","species":"sulphurea","scientificName":"Heptagenia sulphurea","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Setisura"],["Family","Heptageniidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[9,13],"fact":"Its drift downstream at dusk is a key food source for trout and salmon."},{"id":"Halictus","common":"Sweat bee","genus":"Halictus","species":"rubicundus","scientificName":"Halictus rubicundus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Halictidae"],["Tribe","Halictini"]],"dist":["PAL","NEA"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,10],"fact":"Some species are eusocial in summer but solitary in winter — a flexible social system."},{"id":"Prionus","common":"Tanner beetle","genus":"Prionus","species":"coriarius","scientificName":"Prionus coriarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Prioninae"],["Tribe","Prionini"]],"dist":["PAL"],"hab":["SUB","TER"],"habAdult":["TER"],"habLarva":["SUB"],"habNote":"Larvae mine in dead wood underground for 3-5 years","habSame":false,"diet":["HER"],"size":[25,45],"fact":"Larvae take 3 to 5 years to mature, slowly chewing through dead wood underground."},{"id":"Pepsis","common":"Tarantula hawk","genus":"Pepsis","species":"grossa","scientificName":"Pepsis grossa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Pompiloidea"],["Family","Pompilidae"],["Tribe","Pepsini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,55],"fact":"Its sting is rated as the second most painful in the insect world, but the pain lasts just minutes."},{"id":"Lygus","common":"Tarnished plant bug","genus":"Lygus","species":"lineolaris","scientificName":"Lygus lineolaris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Miroidea"],["Family","Miridae"],["Tribe","Mirini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,7],"fact":"Uses its mouthparts to inject saliva that liquefies plant tissue before drinking."},{"id":"Pseudosphinx","common":"Tetrio sphinx","genus":"Pseudosphinx","species":"tetrio","scientificName":"Pseudosphinx tetrio","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Macroglossinae"],["Tribe","Dilophonotini"]],"dist":["NEO","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillar uses frangipani latex","habSame":false,"diet":["HER"],"size":[110,140],"fact":"Caterpillars are huge yellow-black-red banded warning posters — toxic and toxic-looking — that strip frangipani trees bare in single nights across the tropical Americas."},{"id":"Ammophila","common":"Thread-waisted wasp","genus":"Ammophila","species":"procera","scientificName":"Ammophila procera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Sphecidae"]],"dist":["NEA"],"hab":["SUB","AER"],"habAdult":["AER"],"habLarva":["SUB"],"habNote":"Larva develops on paralysed caterpillar","habSame":false,"diet":["CAR"],"size":[20,28],"fact":"After burying a paralysed caterpillar and laying an egg on it, this wasp picks up a pebble in her jaws and tamps the burrow shut — one of the few documented insect uses of a tool."},{"id":"Titanus","common":"Titan beetle","genus":"Titanus","species":"giganteus","scientificName":"Titanus giganteus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Prioninae"],["Tribe","Macrodontiini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[120,170],"fact":"The largest known beetle on Earth, reaching 17 cm; adults don't feed and live just weeks to find a mate."},{"id":"Belostoma","common":"Toe-biter","genus":"Belostoma","species":"lutarium","scientificName":"Belostoma lutarium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Belostomatidae"]],"dist":["NEA","NEO"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"Male carries eggs glued to his back until they hatch","habSame":true,"diet":["CAR"],"size":[22,38],"fact":"The male carries his mate's eggs cemented to his back, rocking them to oxygenate the water for weeks — eat or be eaten paternal care."},{"id":"Odontomachus","common":"Trap-jaw ant","genus":"Odontomachus","species":"bauri","scientificName":"Odontomachus bauri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Ponerinae"],["Tribe","Ponerini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[9,13],"fact":"Its jaws snap shut at over 60 m/s, the fastest known animal movement."},{"id":"Daceton","common":"Trapjaw arboreal ant","genus":"Daceton","species":"armigerum","scientificName":"Daceton armigerum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Attini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Nests high in rainforest canopy","habSame":true,"diet":["CAR"],"size":[9,13],"fact":"Hunts in the Amazon canopy with eyes that wrap around its head and jaws that snap shut at over 200 km/h, faster than any vertebrate could blink."},{"id":"Oecanthus","common":"Tree cricket","genus":"Oecanthus","species":"fultoni","scientificName":"Oecanthus fultoni","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Oecanthidae"],["Tribe","Oecanthini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[13,18],"fact":"Chirps faster as the temperature rises — count the chirps to estimate the air temperature."},{"id":"Trichadenotecnum","common":"Tree-trunk barklouse","genus":"Trichadenotecnum","species":"alexanderae","scientificName":"Trichadenotecnum alexanderae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Psocodea"],["Suborder","Psocomorpha"],["Family","Psocidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[3,5],"fact":"Notable for being the most diverse genus of bark lice with hundreds of described species."},{"id":"Glossina","common":"Tsetse fly","genus":"Glossina","species":"morsitans","scientificName":"Glossina morsitans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Hippoboscoidea"],["Family","Glossinidae"]],"dist":["AFR"],"hab":["AER"],"habAdult":["AER"],"habLarva":["AER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[7,14],"fact":"Females give birth to a single fully developed larva after carrying it inside for over a week."},{"id":"Platymeris","common":"Two-spot assassin bug","genus":"Platymeris","species":"biguttatus","scientificName":"Platymeris biguttatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Subfamily","Reduviinae"],["Tribe","Psyttalini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Hollow tree stumps and decaying logs in tropical Africa","habSame":true,"diet":["CAR"],"size":[30,40],"fact":"When threatened it can spit a jet of caustic venom up to 30 centimetres — a defence accurate enough to cause temporary blindness in a vertebrate face."},{"id":"Anisomorpha","common":"Two-striped walkingstick","genus":"Anisomorpha","species":"buprestoides","scientificName":"Anisomorpha buprestoides","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Pseudophasmatidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[40,80],"fact":"Sprays a defensive chemical that can cause temporary blindness if it hits the eyes."},{"id":"Dasymutilla","common":"Velvet ant","genus":"Dasymutilla","species":"occidentalis","scientificName":"Dasymutilla occidentalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Pompiloidea"],["Family","Mutillidae"],["Tribe","Dasymutillini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless females; males winged","habSame":true,"diet":["CAR"],"size":[10,25],"fact":"Wingless female wasps that look like fuzzy ants; some species are nicknamed 'cow killers' for their painful sting."},{"id":"Carabus","common":"Violet ground beetle","genus":"Carabus","species":"violaceus","scientificName":"Carabus violaceus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Carabinae"],["Tribe","Carabini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless; elytra fused","habSame":true,"diet":["CAR"],"size":[15,40],"fact":"Most are flightless predators — their elytra are fused shut."},{"id":"Phyllium","common":"Walking leaf","genus":"Phyllium","species":"philippinicum","scientificName":"Phyllium philippinicum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phylliidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females flightless; males can glide","habSame":true,"diet":["HER"],"size":[60,100],"fact":"Mimics a leaf so completely that even leaf-edge bite marks are part of its body."},{"id":"Pantala","common":"Wandering glider","genus":"Pantala","species":"flavescens","scientificName":"Pantala flavescens","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["NEA","NEO","PAL","AFR","IND","OCE"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[45,50],"fact":"Migrates further than any other insect — single individuals fly across the Indian Ocean."},{"id":"Synoeca","common":"Warrior wasp","genus":"Synoeca","species":"septentrionalis","scientificName":"Synoeca septentrionalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Polistinae"],["Tribe","Epiponini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[22,28],"fact":"Before attacking, the colony drums on its papery nest in synchronised waves — a sound like distant rain that warns intruders to leave or face one of the most painful stings on Earth."},{"id":"Decticus","common":"Wart-biter","genus":"Decticus","species":"verrucivorus","scientificName":"Decticus verrucivorus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Tettigoniinae"],["Tribe","Decticini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[24,40],"fact":"Has powerful jaws that, in legend, were thought to bite warts off skin."},{"id":"Climaciella","common":"Wasp mantisfly","genus":"Climaciella","species":"brunnea","scientificName":"Climaciella brunnea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Mantispidae"],["Subfamily","Mantispinae"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larva hitches a ride on a spider, then eats her egg sac from inside","habSame":false,"diet":["CAR"],"size":[18,24],"fact":"Looks and flies like a stinging paper-nest hymenopteran but is in fact a lacewing — its tiny larva hops onto a wandering wolf spider, rides her around, and devours her egg sac when she lays one."},{"id":"Xenos","common":"Wasp twisted-winged parasite","genus":"Xenos","species":"vesparum","scientificName":"Xenos vesparum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Strepsiptera"],["Family","Xenidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Males fly briefly; females embedded in wasps","habSame":false,"diet":["CAR"],"size":[2,4],"fact":"Females spend their entire lives inside a wasp host — only their faces stick out to mate."},{"id":"Corixa","common":"Water boatman","genus":"Corixa","species":"punctata","scientificName":"Corixa punctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Corixidae"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["OMN"],"size":[12,15],"fact":"Males 'sing' by rubbing body parts together — the loudest known animal relative to its size."},{"id":"Nepa","common":"Water scorpion","genus":"Nepa","species":"cinerea","scientificName":"Nepa cinerea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Nepidae"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[20,25],"fact":"Breathes through a long snorkel-like tail held above the water's surface."},{"id":"Gerris","common":"Water strider","genus":"Gerris","species":"lacustris","scientificName":"Gerris lacustris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Gerromorpha"],["Family","Gerridae"],["Tribe","Gerrini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[8,17],"fact":"Their feet are covered in microscopic water-repellent hairs that let them stand on water."},{"id":"Conwentzia","common":"Wax fly","genus":"Conwentzia","species":"psociformis","scientificName":"Conwentzia psociformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Coniopterygidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[3,5],"fact":"Coated in a powdery white wax that gives the family the name 'wax flies'."},{"id":"Galleria","common":"Wax moth","genus":"Galleria","species":"mellonella","scientificName":"Galleria mellonella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Pyraloidea"],["Family","Pyralidae"],["Tribe","Galleriini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Their gut bacteria can break down polyethylene plastic, a potential recycling tool."},{"id":"Oecophylla","common":"Weaver ant","genus":"Oecophylla","species":"smaragdina","scientificName":"Oecophylla smaragdina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Oecophyllini"]],"dist":["IND","OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[5,10],"fact":"Workers stitch leaves together using silk produced by their own larvae, which they squeeze like glue guns."},{"id":"Embia","common":"Web-spinner","genus":"Embia","species":"ramburi","scientificName":"Embia ramburi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Embioptera"],["Family","Embiidae"]],"dist":["PAL","AFR"],"hab":["SUB","TER"],"habAdult":["TER","SUB"],"habLarva":["TER","SUB"],"habNote":"Mostly wingless; males may fly","habSame":true,"diet":["HER"],"size":[8,15],"fact":"Spins silk from glands in its forelegs and lives in elaborate silken tunnels."},{"id":"Frankliniella","common":"Western flower thrips","genus":"Frankliniella","species":"occidentalis","scientificName":"Frankliniella occidentalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Thysanoptera"],["Suborder","Terebrantia"],["Family","Thripidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Transmits plant viruses that can wipe out entire pepper, tomato or flower crops."},{"id":"Apis","common":"Western honey bee","genus":"Apis","species":"mellifera","scientificName":"Apis mellifera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Apini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,20],"fact":"Dancers communicate exact direction and distance to nectar sources with figure-eight 'waggle dances'."},{"id":"Deinacrida","common":"Weta","genus":"Deinacrida","species":"heteracantha","scientificName":"Deinacrida heteracantha","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Stenopelmatoidea"],["Family","Anostostomatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[60,100],"fact":"One of the heaviest insects on Earth, with females reaching the weight of a small mouse."},{"id":"Arilus","common":"Wheel bug","genus":"Arilus","species":"cristatus","scientificName":"Arilus cristatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Tribe","Harpactorini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[25,38],"fact":"Has a serrated 'cog wheel' crest on its back that looks like a small dinosaur."},{"id":"Gyrinus","common":"Whirligig beetle","genus":"Gyrinus","species":"natator","scientificName":"Gyrinus natator","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Gyrinidae"],["Tribe","Gyrinini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[5,7],"fact":"Their compound eyes are split in two so they see above and below water simultaneously."},{"id":"Operophtera","common":"Winter moth","genus":"Operophtera","species":"brumata","scientificName":"Operophtera brumata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Geometroidea"],["Family","Geometridae"],["Tribe","Operophterini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Females wingless, only males fly","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Females are nearly wingless and crawl up tree trunks to lay eggs."},{"id":"Formica","common":"Wood ant","genus":"Formica","species":"rufa","scientificName":"Formica rufa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Formicini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[4,10],"fact":"Sprays formic acid in defence, the chemical that gives the family Formicidae its name."},{"id":"Pyrrharctia","common":"Woolly bear","genus":"Pyrrharctia","species":"isabella","scientificName":"Pyrrharctia isabella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"],["Subfamily","Arctiinae"],["Tribe","Arctiini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,55],"fact":"Its caterpillar — the woolly bear — survives freezing solid by producing its own antifreeze."},{"id":"Aedes","common":"Yellow fever mosquito","genus":"Aedes","species":"aegypti","scientificName":"Aedes aegypti","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Culicidae"],["Subfamily","Culicinae"],["Tribe","Aedini"]],"dist":["AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[4,7],"fact":"Only females bite — they need a blood meal to produce eggs."},{"id":"Isoperla","common":"Yellow sally","genus":"Isoperla","species":"grammatica","scientificName":"Isoperla grammatica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Plecoptera"],["Suborder","Arctoperlaria"],["Family","Perlodidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Adults are sometimes nicknamed 'yellow sallies' by trout fishermen."}]`;
const SPECIES = JSON.parse(SPECIES_DATA_STRING);

// ===== DERIVED ACHIEVEMENT HELPERS =====
// Compute once at module load, since SPECIES is the same for everyone.

// Average body size per species, used to rank the smallest and biggest.
function _avgSize(s) { return (s.size[0] + s.size[1]) / 2; }

// Top 5 smallest and top 5 biggest species by average size, identified by their
// scientific name (stable across the game). Used by the David & Goliath achievement.
const TOP5_SMALLEST = new Set(
  [...SPECIES].sort((a, b) => _avgSize(a) - _avgSize(b)).slice(0, 5).map((s) => s.scientificName)
);
const TOP5_BIGGEST = new Set(
  [...SPECIES].sort((a, b) => _avgSize(b) - _avgSize(a)).slice(0, 5).map((s) => s.scientificName)
);

// All orders that appear in the dataset — used by the Bug Master achievement
// (win at least one species in every order).
const ALL_ORDERS = (() => {
  const set = new Set();
  for (const s of SPECIES) {
    const o = s.lineage.find((p) => p[0] === 'Order');
    if (o) set.add(o[1]);
  }
  return [...set].sort();
})();

// ===== CONSTANTS =====
const MAX_ATTEMPTS = 20;

const REGIONS = {
  AFR: { name: 'Afrotropical', short: 'Afrotropical' },
  NEO: { name: 'Neotropical', short: 'Neotropical' },
  NEA: { name: 'Nearctic', short: 'Nearctic' },
  PAL: { name: 'Palearctic', short: 'Palearctic' },
  IND: { name: 'Indo-Malayan', short: 'Indo-Malayan' },
  OCE: { name: 'Oceanian', short: 'Oceanian' },
};

const HABITATS = {
  SUB: { name: 'Subterranean' },
  TER: { name: 'Terrestrial' },
  AQU: { name: 'Aquatic' },
  AER: { name: 'Aerial' },
};

const DIETS = {
  HER: { name: 'Herbivore' },
  OMN: { name: 'Omnivore' },
  CAR: { name: 'Carnivore' },
};

// Full ordered list of taxonomic ranks we ever display
const RANK_ORDER = ['Class', 'Subclass', 'Infraclass', 'Superorder', 'Order', 'Suborder', 'Infraorder', 'Superfamily', 'Family', 'Subfamily', 'Tribe', 'Genus', 'Species'];
const RANK_LABEL = {
  Class: 'Class', Subclass: 'Subclass', Infraclass: 'Infraclass', Superorder: 'Superorder',
  Order: 'Order', Suborder: 'Suborder', Infraorder: 'Infraorder',
  Superfamily: 'Superfamily', Family: 'Family', Subfamily: 'Subfamily', Tribe: 'Tribe',
  Genus: 'Genus', Species: 'Species'
};

// Biogeographic realm adjacency (yellow = adjacent realms but no overlap)
const REALM_ADJACENT = new Set([
  'PAL|NEA','NEA|PAL',
  'PAL|IND','IND|PAL',
  'PAL|AFR','AFR|PAL',
  'NEA|NEO','NEO|NEA',
  'NEO|AFR','AFR|NEO',
  'IND|OCE','OCE|IND',
  'AFR|IND','IND|AFR',
]);
function realmsAdjacent(a, b) { return REALM_ADJACENT.has(a + '|' + b); }

// ===== ACHIEVEMENTS =====
// Each `icon` may be either a string (emoji) or a JSX element. Both are rendered the
// same way at ~22px in the panel. Custom SVG icons share the sepia/ochre palette
// (#5c4528, #ad7d36, #a35435) used elsewhere in the UI so they read as part of the
// same illustration family rather than emoji clip-art.

// --- Custom pictogram components ---

// A small scarab next to a big scarab — for David & Goliath.
const IconDavidGoliath = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    {/* small scarab on the left */}
    <ellipse cx="6" cy="14.5" rx="2.4" ry="3" fill="#5c4528"/>
    <circle cx="6" cy="12.3" r="1.1" fill="#5c4528"/>
    <line x1="4.2" y1="13.5" x2="3.2" y2="12.6" stroke="#5c4528" strokeWidth="0.5"/>
    <line x1="7.8" y1="13.5" x2="8.8" y2="12.6" stroke="#5c4528" strokeWidth="0.5"/>
    <line x1="4" y1="15" x2="3" y2="15.5" stroke="#5c4528" strokeWidth="0.5"/>
    <line x1="8" y1="15" x2="9" y2="15.5" stroke="#5c4528" strokeWidth="0.5"/>
    {/* big scarab on the right */}
    <ellipse cx="16.5" cy="13" rx="5" ry="6" fill="#5c4528"/>
    <ellipse cx="16.5" cy="13" rx="5" ry="6" fill="none" stroke="#3d2d18" strokeWidth="0.5"/>
    <line x1="16.5" y1="7.5" x2="16.5" y2="19" stroke="#3d2d18" strokeWidth="0.5"/>
    <circle cx="16.5" cy="9" r="2.2" fill="#5c4528"/>
    {/* horn */}
    <path d="M 16.5 7.5 Q 16.5 5.5 15.2 5 M 16.5 7.5 Q 16.5 5.5 17.8 5" stroke="#3d2d18" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    <line x1="11.5" y1="11" x2="9.5" y2="9.5" stroke="#3d2d18" strokeWidth="0.7" strokeLinecap="round"/>
    <line x1="11.5" y1="13" x2="9.5" y2="13" stroke="#3d2d18" strokeWidth="0.7" strokeLinecap="round"/>
    <line x1="11.5" y1="15" x2="9.5" y2="16.5" stroke="#3d2d18" strokeWidth="0.7" strokeLinecap="round"/>
    <line x1="21.5" y1="11" x2="23.5" y2="9.5" stroke="#3d2d18" strokeWidth="0.7" strokeLinecap="round"/>
    <line x1="21.5" y1="13" x2="23.5" y2="13" stroke="#3d2d18" strokeWidth="0.7" strokeLinecap="round"/>
    <line x1="21.5" y1="15" x2="23.5" y2="16.5" stroke="#3d2d18" strokeWidth="0.7" strokeLinecap="round"/>
  </svg>
);

// A golden butterfly — for Bug Master.
const IconBugMaster = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    {/* upper wings */}
    <path d="M 12 12 Q 7 4 3 6 Q 2 9 5 11.5 Q 8 13 12 12 Z" fill="#d49a3e" stroke="#a35435" strokeWidth="0.5"/>
    <path d="M 12 12 Q 17 4 21 6 Q 22 9 19 11.5 Q 16 13 12 12 Z" fill="#d49a3e" stroke="#a35435" strokeWidth="0.5"/>
    {/* lower wings */}
    <path d="M 12 12 Q 8 17 5 17 Q 4 14 7 13 Q 10 12 12 12 Z" fill="#e0bd3a" stroke="#a35435" strokeWidth="0.5"/>
    <path d="M 12 12 Q 16 17 19 17 Q 20 14 17 13 Q 14 12 12 12 Z" fill="#e0bd3a" stroke="#a35435" strokeWidth="0.5"/>
    {/* wing spots */}
    <circle cx="6" cy="8.5" r="0.9" fill="#a35435"/>
    <circle cx="18" cy="8.5" r="0.9" fill="#a35435"/>
    {/* body */}
    <ellipse cx="12" cy="12" rx="0.8" ry="4" fill="#3d2d18"/>
    {/* antennae */}
    <path d="M 12 8 Q 11 6 10.5 5.5" stroke="#3d2d18" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    <path d="M 12 8 Q 13 6 13.5 5.5" stroke="#3d2d18" strokeWidth="0.6" fill="none" strokeLinecap="round"/>
    <circle cx="10.5" cy="5.5" r="0.4" fill="#3d2d18"/>
    <circle cx="13.5" cy="5.5" r="0.4" fill="#3d2d18"/>
  </svg>
);

// A bombardier beetle spraying acid — for Sharpshooter.
const IconSharpshooter = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    {/* body */}
    <ellipse cx="9" cy="13" rx="5" ry="3.2" fill="#5c4528"/>
    <line x1="9" y1="10" x2="9" y2="16" stroke="#3d2d18" strokeWidth="0.4"/>
    {/* head */}
    <ellipse cx="4.5" cy="13" rx="1.7" ry="1.8" fill="#a35435"/>
    {/* antennae */}
    <path d="M 4 12 Q 3 10 2 9.5" stroke="#3d2d18" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
    <path d="M 4 14 Q 3 16 2 16.5" stroke="#3d2d18" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
    {/* legs */}
    <line x1="8" y1="15.5" x2="7" y2="17.5" stroke="#3d2d18" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="10" y1="15.5" x2="10" y2="17.5" stroke="#3d2d18" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="8" y1="10.5" x2="7" y2="8.5" stroke="#3d2d18" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="10" y1="10.5" x2="10" y2="8.5" stroke="#3d2d18" strokeWidth="0.6" strokeLinecap="round"/>
    {/* acid spray from the rear */}
    <path d="M 14 13 Q 17 11 19 11" stroke="#d49a3e" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M 14 13 Q 17 13 20 13" stroke="#a35435" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M 14 13 Q 17 15 19 15" stroke="#d49a3e" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    {/* droplets */}
    <circle cx="21" cy="11.5" r="0.6" fill="#d49a3e"/>
    <circle cx="22" cy="13" r="0.6" fill="#a35435"/>
    <circle cx="21" cy="14.5" r="0.6" fill="#d49a3e"/>
  </svg>
);

// A dung beetle pushing a dung ball — for Endurance.
const IconEndurance = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    {/* dung ball */}
    <circle cx="6" cy="13.5" r="4.5" fill="#5c4528"/>
    <circle cx="5" cy="12.5" r="0.7" fill="#3d2d18" opacity="0.5"/>
    <circle cx="7" cy="14.5" r="0.6" fill="#3d2d18" opacity="0.5"/>
    <circle cx="4.5" cy="14.5" r="0.5" fill="#3d2d18" opacity="0.5"/>
    {/* beetle body, pushing from the right */}
    <ellipse cx="16" cy="15" rx="4" ry="2.8" fill="#3d2d18"/>
    <line x1="16" y1="12.5" x2="16" y2="17.5" stroke="#1a0f04" strokeWidth="0.4"/>
    {/* head */}
    <ellipse cx="12" cy="15" rx="1.5" ry="1.4" fill="#3d2d18"/>
    {/* horn */}
    <path d="M 11.5 14 Q 10 12.5 9 13" stroke="#1a0f04" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
    {/* legs pushing */}
    <line x1="13" y1="16.5" x2="11" y2="18" stroke="#1a0f04" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="13" y1="14" x2="11" y2="13" stroke="#1a0f04" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="18" y1="17.5" x2="19" y2="19" stroke="#1a0f04" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="18" y1="12.5" x2="19" y2="11" stroke="#1a0f04" strokeWidth="0.6" strokeLinecap="round"/>
    {/* ground line */}
    <line x1="1" y1="20" x2="23" y2="20" stroke="#a35435" strokeWidth="0.3" opacity="0.5"/>
  </svg>
);

// A diving beetle in water — for Aquanaut.
const IconAquanaut = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    {/* water surface */}
    <path d="M 0 6 Q 4 4 8 6 T 16 6 T 24 6" stroke="#5c8a9c" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    {/* water tint */}
    <rect x="0" y="6" width="24" height="18" fill="#5c8a9c" opacity="0.18"/>
    {/* beetle: streamlined dytiscid */}
    <ellipse cx="12" cy="14" rx="6" ry="3.8" fill="#3d2d18"/>
    <ellipse cx="12" cy="14" rx="6" ry="3.8" fill="none" stroke="#1a0f04" strokeWidth="0.4"/>
    {/* central line */}
    <line x1="12" y1="10.5" x2="12" y2="17.5" stroke="#1a0f04" strokeWidth="0.4"/>
    {/* yellow lateral stripes (typical of Dytiscus) */}
    <path d="M 7 11.5 Q 12 11 17 11.5" stroke="#d49a3e" strokeWidth="0.6" fill="none"/>
    <path d="M 7 16.5 Q 12 17 17 16.5" stroke="#d49a3e" strokeWidth="0.6" fill="none"/>
    {/* fringed swimming legs */}
    <line x1="14" y1="11" x2="17" y2="9" stroke="#1a0f04" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="14.5" y1="14" x2="18" y2="14" stroke="#1a0f04" strokeWidth="0.7" strokeLinecap="round"/>
    <line x1="14" y1="17" x2="17" y2="19" stroke="#1a0f04" strokeWidth="0.6" strokeLinecap="round"/>
    {/* head */}
    <ellipse cx="7" cy="14" rx="1.4" ry="1.3" fill="#3d2d18"/>
    {/* bubble */}
    <circle cx="5" cy="10.5" r="0.7" fill="none" stroke="#5c8a9c" strokeWidth="0.5"/>
    <circle cx="19" cy="9" r="0.5" fill="none" stroke="#5c8a9c" strokeWidth="0.5"/>
  </svg>
);

// A praying mantis — for Apex Predator.
const IconApexPredator = (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    {/* abdomen */}
    <ellipse cx="14" cy="16" rx="2" ry="5" fill="#7a9a3a" transform="rotate(20 14 16)"/>
    {/* thorax / pronotum (the long shield) */}
    <rect x="11" y="9" width="2" height="6" fill="#97b755" stroke="#5c7a2a" strokeWidth="0.3" rx="0.5"/>
    {/* triangular head */}
    <path d="M 10 8.5 L 14 8.5 L 12 6 Z" fill="#97b755" stroke="#5c7a2a" strokeWidth="0.3"/>
    {/* compound eyes */}
    <circle cx="10.5" cy="7.7" r="0.7" fill="#3d2d18"/>
    <circle cx="13.5" cy="7.7" r="0.7" fill="#3d2d18"/>
    {/* raptorial forelegs in classic prayer pose */}
    <path d="M 11 10 L 7 8 L 5 5" stroke="#7a9a3a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M 13 10 L 17 8 L 19 5" stroke="#7a9a3a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* spines on raptorial legs */}
    <line x1="6" y1="6.5" x2="5.5" y2="7.5" stroke="#3d2d18" strokeWidth="0.4"/>
    <line x1="7" y1="6" x2="6.5" y2="5" stroke="#3d2d18" strokeWidth="0.4"/>
    <line x1="18" y1="6.5" x2="18.5" y2="7.5" stroke="#3d2d18" strokeWidth="0.4"/>
    <line x1="17" y1="6" x2="17.5" y2="5" stroke="#3d2d18" strokeWidth="0.4"/>
    {/* walking legs */}
    <line x1="12" y1="14" x2="9" y2="17" stroke="#5c7a2a" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="12" y1="14" x2="15" y2="17" stroke="#5c7a2a" strokeWidth="0.6" strokeLinecap="round"/>
    <line x1="14" y1="18" x2="10" y2="20" stroke="#5c7a2a" strokeWidth="0.5" strokeLinecap="round"/>
    <line x1="15" y1="19" x2="17" y2="21" stroke="#5c7a2a" strokeWidth="0.5" strokeLinecap="round"/>
  </svg>
);

const ACHIEVEMENTS = [
  { id: 'first_find', name: 'First Find', desc: 'Win any game', icon: '🐞' },
  { id: 'sharpshooter', name: 'Sharpshooter', desc: 'Win in 3 guesses or fewer', icon: IconSharpshooter },
  { id: 'endurance', name: 'Endurance', desc: 'Win on the 20th attempt', icon: IconEndurance },
  { id: 'pollinator', name: 'Pollinator', desc: 'Win 5 different bee/wasp/butterfly species', icon: '🐝' },
  { id: 'stargazer', name: 'Stargazer', desc: 'Discover a rare-order species', icon: '✨' },
  { id: 'globetrotter', name: 'Globetrotter', desc: 'Win across all 6 biogeographic regions', icon: '🌍' },
  { id: 'aquanaut', name: 'Aquanaut', desc: 'Win on an aquatic species', icon: IconAquanaut },
  { id: 'apex_predator', name: 'Apex Predator', desc: 'Win on a carnivore ≥ 50mm', icon: IconApexPredator },
  { id: 'david_goliath', name: 'David & Goliath', desc: 'Win on a top-5 smallest AND a top-5 biggest species', icon: IconDavidGoliath },
  { id: 'streak_master', name: 'Streak Master', desc: '10 wins in a row', icon: '🔥' },
  { id: 'encyclopedist', name: 'Encyclopedist', desc: 'Reach 50 total wins', icon: '📚' },
  { id: 'bug_master', name: 'Bug Master', desc: 'Win at least one species in every insect order', icon: IconBugMaster },
];

const RARE_ORDERS = new Set(['Strepsiptera', 'Notoptera', 'Embioptera', 'Raphidioptera', 'Megaloptera', 'Mecoptera', 'Archaeognatha', 'Zygentoma', 'Psocodea', 'Thysanoptera', 'Plecoptera', 'Trichoptera', 'Phthiraptera', 'Siphonaptera']);
// Pollinator counts ALL bees, wasps, and true butterflies. We accept any
// Hymenoptera (bees + wasps), or Lepidoptera that sits within the Papilionoidea
// superfamily (= true butterflies, excluding moths). Skippers (Hesperiidae) are
// part of Papilionoidea in modern taxonomy.
const POLLINATOR_ORDER = 'Hymenoptera';
const POLLINATOR_SUPERFAMILY = 'Papilionoidea';

// Helpers derived once from the dataset for David & Goliath and Bug Master.
// (Computed below at module init, right after SPECIES is parsed.)

// ===== UTILITIES =====

// Build full lineage path for comparison (includes "Insecta" root)
function getFullPath(record) {
  return [
    ['Class', 'Insecta'],
    ...record.lineage,
    ['Genus', record.genus],
    ['Species', record.scientificName],
  ];
}

// Lowest common ancestor between guess and target lineages
function lowestCommon(guess, target) {
  const gp = getFullPath(guess);
  const tp = getFullPath(target);
  let last = gp[0]; // Insecta
  const minLen = Math.min(gp.length, tp.length);
  for (let i = 0; i < minLen; i++) {
    if (gp[i][1] === tp[i][1]) {
      last = gp[i];
    } else {
      break;
    }
  }
  return last; // [rank, name]
}

// Index of the LCA rank in the target's full path
function lcaIndex(guess, target) {
  const gp = getFullPath(guess);
  const tp = getFullPath(target);
  let lastIdx = 0;
  const minLen = Math.min(gp.length, tp.length);
  for (let i = 0; i < minLen; i++) {
    if (gp[i][1] === tp[i][1]) lastIdx = i;
    else break;
  }
  return lastIdx;
}

// Categorical hint comparison.
// Returns 'exact' | 'partial' | 'close' | 'none'.
// - exact (dark green): same set
// - partial (light green): at least one element matches but sets differ
// - close (yellow): zero overlap BUT at least one pair of elements is adjacent
//                  — only used when an adjacency function is supplied (i.e. distribution).
// - none (red): no overlap and no adjacency
function compareSet(guessArr, targetArr, adjacencyFn) {
  const gs = new Set(guessArr);
  const ts = new Set(targetArr);
  const intersect = [...gs].filter((x) => ts.has(x));
  if (intersect.length === 0) {
    if (adjacencyFn) {
      for (const g of gs) {
        for (const t of ts) {
          if (adjacencyFn(g, t)) return 'close';
        }
      }
    }
    return 'none';
  }
  if (gs.size === ts.size && intersect.length === gs.size) return 'exact';
  return 'partial';
}

// Size comparison — returns { state: 'red'|'yellow'|'green', dir: 'up'|'down'|null }
function compareSize(guessRange, targetRange) {
  const gMid = (guessRange[0] + guessRange[1]) / 2;
  const tMid = (targetRange[0] + targetRange[1]) / 2;
  const overlap = !(guessRange[1] < targetRange[0] || guessRange[0] > targetRange[1]);
  if (overlap) return { state: 'green', dir: null };
  const ratio = gMid > tMid ? gMid / tMid : tMid / gMid;
  const state = ratio < 2 ? 'yellow' : 'red';
  const dir = gMid < tMid ? 'up' : 'down';
  return { state, dir };
}

// Color tokens used directly via CSS vars
const HINT_BG = {
  exact: 'var(--green-dark)',
  partial: 'var(--green-light)',
  close: 'var(--yellow)',
  none: 'var(--red)',
  yellow: 'var(--yellow)',
  red: 'var(--red)',
  green: 'var(--green-dark)',
};
const HINT_FG = {
  exact: '#fff',
  partial: '#1d2c10',
  close: '#3a2c00',
  none: '#fff',
  yellow: '#3a2c00',
  red: '#fff',
  green: '#fff',
};

// Format helpers for showing trait sets as text
function formatRegions(arr) {
  if (arr.length === 6) return 'Cosmopolitan';
  return arr.map((r) => REGIONS[r].short).join(', ');
}
function formatHabitats(arr) {
  return arr.map((h) => HABITATS[h].name).join(', ');
}
// Returns a string showing adult+larva habitats. If they differ, prefixes 'A:' and 'L:'.
// Used in the hint card.
function formatHabitatsFull(record) {
  const adult = record.habAdult || record.hab;
  const larva = record.habLarva || record.hab;
  const adultStr = adult.map((h) => HABITATS[h].name).join(', ');
  const larvaStr = larva.map((h) => HABITATS[h].name).join(', ');
  if (adultStr === larvaStr) return adultStr;
  return `A: ${adultStr} · L: ${larvaStr}`;
}
function formatDiets(arr) {
  return arr.map((d) => DIETS[d].name).join(', ');
}

// Storage helpers — try window.storage first (Claude Artifacts API), fallback to localStorage.
// Both are wrapped in try/catch since some environments block both.
async function loadStore(key, fallback) {
  // Try window.storage
  try {
    if (typeof window !== 'undefined' && window.storage) {
      const r = await window.storage.get(key);
      if (r && r.value != null) return JSON.parse(r.value);
    }
  } catch (e) { /* fall through */ }
  // Fallback to localStorage
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const v = window.localStorage.getItem(key);
      if (v != null) return JSON.parse(v);
    }
  } catch (e) { /* fall through */ }
  return fallback;
}
async function saveStore(key, value) {
  const serialized = JSON.stringify(value);
  let saved = false;
  try {
    if (typeof window !== 'undefined' && window.storage) {
      await window.storage.set(key, serialized);
      saved = true;
    }
  } catch (e) { /* fall through */ }
  // Always also write to localStorage as backup
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, serialized);
      saved = true;
    }
  } catch (e) { /* ignore */ }
  return saved;
}

// ===== DAILY CHALLENGE =====
// The puzzle of the day is the same for everyone using the game on a given UTC date.
// We derive a deterministic species index from the date string YYYY-MM-DD via a small
// hash, then map it onto the SPECIES list using a stable pseudo-random shuffle so the
// sequence isn't alphabetical.

function utcDateKey(d) {
  // Returns 'YYYY-MM-DD' in UTC for the given Date object (or "now" if undefined).
  const dt = d || new Date();
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dt.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Days since 1970-01-01 UTC — a small integer that increments by 1 each UTC midnight.
function daysSinceEpoch(d) {
  const dt = d || new Date();
  return Math.floor(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate()) / 86400000);
}

// Mulberry32: tiny seedable PRNG. Returns a function that yields floats in [0,1).
function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Stable shuffle of indices 0..N-1 using a fixed master seed. This is computed once and
// returns the same permutation forever — so day 0 always picks species[order[0]],
// day 1 → species[order[1]], etc. After N days the cycle wraps around.
let _cachedSpeciesOrder = null;
function getSpeciesOrder(n) {
  if (_cachedSpeciesOrder && _cachedSpeciesOrder.length === n) return _cachedSpeciesOrder;
  const order = Array.from({ length: n }, (_, i) => i);
  const rng = mulberry32(0xBEE1E22); // arbitrary fixed seed
  // Fisher-Yates
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  _cachedSpeciesOrder = order;
  return order;
}

// The target for a given UTC date.
function getDailyTargetIndex(date) {
  const days = daysSinceEpoch(date);
  const order = getSpeciesOrder(SPECIES.length);
  return order[((days % order.length) + order.length) % order.length];
}

// ===== STYLES =====
const STYLES = `
:root {
  --cream: #f4ebd5;
  --cream-deep: #ece1c4;
  --cream-warm: #e6dab5;
  --paper: #faf5e6;
  --sepia: #8b6f47;
  --sepia-dark: #5c4528;
  --ink: #221608;
  --parchment: #ede1c4;
  --forest: #2e5236;
  --forest-deep: #1d3a23;
  --moss: #5a7548;
  --ochre: #ad7d36;
  --ochre-bright: #d49a3e;
  --copper: #a35435;
  --oxblood: #813527;
  --green-dark: #2f6b3b;
  --green-light: #97b755;
  --yellow: #e0bd3a;
  --red: #b8463a;
  --shadow: rgba(60, 35, 12, 0.18);
  --line: rgba(92, 69, 40, 0.22);
  --line-strong: rgba(92, 69, 40, 0.4);
}

@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800;9..144,900&family=Manrope:wght@300;400;500;600;700&display=swap');

* { box-sizing: border-box; }

.bd-root {
  font-family: 'Manrope', system-ui, sans-serif;
  color: var(--ink);
  min-height: 100vh;
  position: relative;
  background:
    /* very faint dot grid (graph paper) */
    radial-gradient(circle at 1px 1px, rgba(92, 69, 40, 0.10) 1px, transparent 0px) 0 0 / 22px 22px,
    /* very subtle warmth */
    radial-gradient(ellipse at top, rgba(173, 125, 54, 0.06), transparent 60%),
    radial-gradient(ellipse at bottom, rgba(46, 82, 54, 0.05), transparent 60%),
    var(--cream);
  overflow-x: hidden;
}

/* Paper grain */
.bd-root::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.27 0 0 0 0 0.20 0 0 0 0 0.10 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: multiply;
  z-index: 0;
}

/* Decorative static insect silhouettes in corners */
.bd-deco {
  position: fixed;
  pointer-events: none;
  z-index: 0;
  opacity: 0.085;
}
.bd-deco.tl { top: 40px; left: -10px; width: 180px; }
.bd-deco.tr { top: 60px; right: -20px; width: 200px; transform: scaleX(-1); }
.bd-deco.bl { bottom: 40px; left: 20px; width: 160px; }
.bd-deco.br { bottom: 80px; right: 0; width: 220px; transform: scaleX(-1) rotate(8deg); }

.bd-shell {
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 28px 28px 80px;
}

/* === Header banner === */
.bd-header {
  position: relative;
  margin-bottom: 32px;
  padding: 18px 26px 22px;
  background:
    linear-gradient(180deg, rgba(255, 250, 235, 0.4), rgba(255, 250, 235, 0)) ,
    repeating-linear-gradient(180deg,
      transparent 0px, transparent 13px,
      rgba(92, 69, 40, 0.07) 13px, rgba(92, 69, 40, 0.07) 14px);
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* Header has a small "Plate I" type label like a museum specimen card */
.bd-header::before {
  content: 'Plate I';
  position: absolute;
  top: -10px;
  left: 24px;
  background: var(--cream);
  padding: 0 10px;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--sepia);
}
.bd-header::after {
  content: 'a daily entomological riddle';
  position: absolute;
  bottom: -10px;
  right: 28px;
  background: var(--cream);
  padding: 0 10px;
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--sepia);
}

.bd-logo-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
}
.bd-day-tag {
  font-family: 'Fraunces', serif;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sepia);
  padding: 4px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 500;
  white-space: nowrap;
}

.bd-logo-svg {
  height: 56px;
  width: auto;
}

.bd-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

/* === Buttons === */
.bd-btn {
  background: var(--paper);
  border: 1px solid var(--line-strong);
  color: var(--ink);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.18s ease;
  font-family: inherit;
  letter-spacing: 0.01em;
  position: relative;
  box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(60, 35, 12, 0.08);
}
.bd-btn:hover {
  background: var(--cream-deep);
  transform: translateY(-1px);
  box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset, 0 3px 8px rgba(60, 35, 12, 0.12);
}
.bd-btn:active { transform: translateY(0); }
.bd-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
.bd-btn.primary {
  background: var(--ink);
  color: var(--cream);
  border-color: var(--ink);
}
.bd-btn.primary:hover { background: var(--sepia-dark); border-color: var(--sepia-dark); }
.bd-btn.accent {
  background: var(--ochre);
  color: var(--paper);
  border-color: var(--ochre);
}
.bd-btn.accent:hover { background: var(--ochre-bright); border-color: var(--ochre-bright); }
.bd-btn.ghost {
  background: transparent;
  border-color: var(--line);
}

.bd-icon-btn {
  width: 38px; height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--paper);
  border: 1px solid var(--line-strong);
  cursor: pointer;
  color: var(--sepia-dark);
  transition: all 0.18s ease;
  box-shadow: 0 1px 0 rgba(255,255,255,0.5) inset;
}
.bd-icon-btn:hover { background: var(--cream-deep); }

.bd-stats {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: 'Fraunces', serif;
  font-size: 14px;
  color: var(--sepia-dark);
  padding: 4px 14px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 999px;
}
.bd-stats span { display: inline-flex; align-items: center; gap: 4px; }
.bd-stats strong { font-weight: 700; color: var(--ink); }
.bd-stats .sep { color: var(--line-strong); }

/* === Main layout === */
.bd-main {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.bd-main > * { min-width: 0; }  /* prevent grid items from blowing out when child has explicit width */

/* === Section panels === */
.bd-section {
  background: var(--paper);
  border: 1px solid var(--line-strong);
  border-radius: 14px;
  padding: 20px;
  box-shadow:
    0 1px 0 rgba(255,255,255,0.6) inset,
    0 6px 22px var(--shadow);
  position: relative;
}

.bd-section h3 {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 14px;
  margin: 0 0 14px;
  color: var(--sepia-dark);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
}
.bd-section h3 svg { color: var(--copper); }
.bd-section h3 .bd-count {
  margin-left: auto;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  color: var(--sepia);
  letter-spacing: 0.04em;
  text-transform: none;
}

/* === Input row === */
.bd-input-row {
  position: relative;
  margin-bottom: 12px;
}
.bd-input {
  width: 100%;
  background: var(--cream-deep);
  border: 1.5px solid var(--line-strong);
  border-radius: 10px;
  padding: 13px 16px;
  font-size: 15px;
  font-family: inherit;
  color: var(--ink);
  transition: all 0.18s ease;
}
.bd-input:focus {
  outline: none;
  border-color: var(--ochre);
  background: #fff;
  box-shadow: 0 0 0 4px rgba(173, 125, 54, 0.16);
}
.bd-input::placeholder { color: var(--sepia); opacity: 0.7; }
.bd-input:disabled { opacity: 0.5; }

.bd-suggestions {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  box-shadow: 0 10px 30px var(--shadow);
  max-height: 280px;
  overflow-y: auto;
  z-index: 20;
}
.bd-suggestion {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.bd-suggestion:last-child { border-bottom: none; }
.bd-suggestion:hover, .bd-suggestion.active {
  background: var(--cream-deep);
}
.bd-suggestion-sci {
  font-style: italic;
  font-family: 'Fraunces', serif;
  color: var(--sepia);
  margin-left: 6px;
  font-size: 13px;
}

/* === Submit row === */
.bd-submit-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
.bd-submit-row > .bd-btn:first-child { flex: 1; min-width: 140px; }

/* === Hint cards === */
.bd-hints {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-top: 10px;
}
.bd-hint {
  padding: 8px 8px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  min-height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.15);
  transition: transform 0.2s ease;
}
.bd-hint .bd-hint-label {
  font-family: 'Fraunces', serif;
  font-weight: 500;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.85;
  margin-bottom: 4px;
}
.bd-hint .bd-hint-value {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 2px;
  text-align: center;
  word-break: break-word;
  font-family: 'Manrope', sans-serif;
}

/* === Guess card === */
.bd-guess-list { display: flex; flex-direction: column; gap: 8px; }
.bd-guess {
  background: var(--cream-deep);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
  transition: all 0.25s ease;
  cursor: pointer;
  animation: bd-slide-in 0.4s cubic-bezier(0.34, 1.36, 0.64, 1);
}
.bd-guess:hover { background: var(--cream-warm); }
.bd-guess.active { background: var(--cream-warm); border-color: var(--ochre); box-shadow: 0 0 0 2px rgba(173, 125, 54, 0.2); }

.bd-guess-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}
.bd-guess-name {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--ink);
}
.bd-guess-sci {
  font-style: italic;
  font-family: 'Fraunces', serif;
  color: var(--sepia);
  font-size: 13px;
  font-weight: 400;
}
.bd-guess-rank {
  font-size: 10px;
  color: var(--moss);
  font-weight: 600;
  letter-spacing: 0.06em;
  background: rgba(46, 107, 59, 0.12);
  padding: 3px 9px;
  border-radius: 999px;
  text-transform: uppercase;
}
.bd-guess-rank.win {
  background: var(--green-dark);
  color: #fff;
}

@keyframes bd-slide-in {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* === Legend === */
.bd-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 12px 14px;
  margin-top: 14px;
  background: var(--cream-deep);
  border-radius: 10px;
  border: 1px solid var(--line);
  font-size: 11px;
  font-family: 'Fraunces', serif;
  color: var(--sepia-dark);
}
.bd-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.bd-legend-swatch {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 1px solid rgba(0,0,0,0.15);
}

/* === Tree visualization === */
.bd-tree-wrap {
  position: relative;
  min-height: 320px;
  padding: 8px;
  /* Fixed width so the panel never blows up; horizontal scroll if the tree is wider. */
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  /* Subtle fade edges to hint at scrollable content */
  mask-image: linear-gradient(to right, transparent 0%, black 18px, black calc(100% - 18px), transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 18px, black calc(100% - 18px), transparent 100%);
  scrollbar-width: thin;
  scrollbar-color: var(--sepia) transparent;
}
.bd-tree-wrap::-webkit-scrollbar { height: 8px; }
.bd-tree-wrap::-webkit-scrollbar-track { background: transparent; }
.bd-tree-wrap::-webkit-scrollbar-thumb {
  background: var(--sepia);
  border-radius: 4px;
  opacity: 0.6;
}
.bd-tree-wrap::-webkit-scrollbar-thumb:hover { background: var(--sepia-dark); }

.bd-tree-svg {
  height: auto;
  display: block;
  font-family: 'Fraunces', serif;
}

.bd-tree-node-circle {
  fill: var(--cream);
  stroke: var(--sepia);
  stroke-width: 1.5;
  transition: all 0.8s cubic-bezier(0.34, 1.16, 0.64, 1);
}
.bd-tree-node-circle.matched {
  fill: var(--ochre-bright);
  stroke: var(--ochre);
  filter: drop-shadow(0 0 8px rgba(212, 154, 62, 0.5));
}
.bd-tree-node-circle.frontier {
  fill: var(--ochre-bright);
  stroke: var(--ink);
  stroke-width: 2.4;
  filter: drop-shadow(0 0 12px rgba(212, 154, 62, 0.85));
}
@keyframes bd-frontier-pulse {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(212, 154, 62, 0.6)); }
  50% { filter: drop-shadow(0 0 16px rgba(212, 154, 62, 1)); }
}
.bd-tree-node-circle.frontier { animation: bd-frontier-pulse 2.2s ease-in-out infinite; }
.bd-tree-node-circle.target {
  fill: var(--green-dark);
  stroke: var(--green-deep);
}
.bd-tree-node-circle.guess {
  fill: var(--copper);
  stroke: var(--copper);
}
.bd-tree-node-circle.guess.highlight {
  fill: var(--ochre-bright);
  stroke: var(--ink);
  stroke-width: 2.5;
  filter: drop-shadow(0 0 8px rgba(212, 154, 62, 0.6));
}
.bd-tree-node-circle.mystery {
  fill: var(--sepia-dark);
  stroke: var(--ink);
  stroke-width: 2;
  filter: drop-shadow(0 0 10px rgba(34, 22, 8, 0.4));
}
@keyframes bd-mystery-pulse {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 22, 8, 0.5)); }
  50% { filter: drop-shadow(0 0 14px rgba(173, 125, 54, 0.7)); }
}
.bd-tree-node-circle.mystery { animation: bd-mystery-pulse 2.8s ease-in-out infinite; }
.bd-tree-node-circle.root {
  fill: var(--ink);
  stroke: var(--ink);
}
.bd-tree-edge {
  stroke: var(--sepia);
  stroke-width: 1.2;
  fill: none;
  opacity: 0.45;
  transition: all 0.8s ease;
}
.bd-tree-edge.matched {
  stroke: var(--ochre);
  stroke-width: 2.4;
  opacity: 1;
}
.bd-tree-label {
  font-size: 12px;
  fill: var(--ink);
  font-weight: 500;
  pointer-events: none;
}
.bd-tree-rank {
  font-size: 9px;
  fill: var(--sepia);
  font-style: italic;
  pointer-events: none;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.bd-tree-guess-leaf {
  font-size: 10px;
  fill: var(--copper);
  font-style: italic;
  font-weight: 600;
  pointer-events: none;
}

/* tree animations */
.bd-tree-node-group {
  animation: bd-fade-in 0.8s ease forwards;
  transform-origin: center;
}
@keyframes bd-fade-in {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}

/* === End screen === */
.bd-end-overlay {
  position: fixed;
  inset: 0;
  background: rgba(34, 22, 8, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  animation: bd-fade-overlay 0.4s ease;
}
@keyframes bd-fade-overlay { from { opacity: 0; } to { opacity: 1; } }

.bd-end-card {
  background: var(--paper);
  border-radius: 18px;
  padding: 36px 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
  position: relative;
  border: 1.5px solid var(--ochre);
  animation: bd-pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  max-height: 90vh;
  overflow-y: auto;
}
@keyframes bd-pop-in { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.bd-end-title {
  font-family: 'Fraunces', serif;
  font-size: 30px;
  font-weight: 700;
  margin: 0 0 4px;
  color: var(--ink);
  letter-spacing: -0.01em;
}
.bd-end-sub {
  font-family: 'Fraunces', serif;
  color: var(--sepia-dark);
  font-size: 17px;
  margin-bottom: 18px;
}
.bd-end-sub .bd-sci { font-style: italic; }
.bd-end-img-figure {
  width: 100%;
  margin: 0 0 16px 0;
  padding: 0;
}
.bd-end-img-figure .bd-end-img-wrap {
  margin-bottom: 0;  /* moved to figure */
}
.bd-end-img-wrap {
  width: 100%;
  background: var(--cream-deep);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  /* No fixed height; grows to fit the image at full width without cropping */
  min-height: 80px;
  max-height: 480px;
}
.bd-end-img-wrap img {
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: contain;
  display: block;
}
.bd-img-attribution {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 11.5px;
  color: var(--sepia);
  text-align: center;
  margin-top: 6px;
  line-height: 1.4;
}
.bd-img-attribution a {
  color: var(--copper);
  text-decoration: none;
  border-bottom: 1px dotted var(--copper);
  font-style: normal;
}
.bd-img-attribution a:hover {
  color: var(--sepia-dark);
}
.bd-end-placeholder {
  font-family: 'Fraunces', serif;
  font-style: italic;
  color: var(--sepia);
  font-size: 13px;
  padding: 20px;
  text-align: center;
}
.bd-end-fact {
  font-family: 'Fraunces', serif;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--ink);
  background: var(--cream-deep);
  padding: 14px 16px;
  border-radius: 10px;
  border-left: 3px solid var(--ochre);
  margin-bottom: 16px;
}
.bd-end-taxo {
  background: var(--cream-deep);
  border-radius: 10px;
  padding: 12px 14px 14px;
  margin-bottom: 16px;
  border: 1px solid var(--line);
}
.bd-end-taxo-title {
  font-family: 'Fraunces', serif;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--sepia);
  margin-bottom: 8px;
  font-weight: 600;
}
.bd-end-taxo-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 3px 0;
  border-bottom: 1px dotted rgba(92, 69, 40, 0.2);
  font-family: 'Fraunces', serif;
  font-size: 13px;
}
.bd-end-taxo-row:last-child { border-bottom: none; }
.bd-end-taxo-rank {
  color: var(--sepia);
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-weight: 500;
}
.bd-end-taxo-name {
  color: var(--ink);
  font-weight: 500;
}
.bd-end-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 18px;
  font-family: 'Fraunces', serif;
}
.bd-end-stat { text-align: center; }
.bd-end-stat-num {
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
}
.bd-end-stat-label {
  font-size: 10px;
  color: var(--sepia);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* === Achievements panel === */
.bd-ach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
  margin-top: 8px;
}
.bd-ach {
  background: var(--cream-deep);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  opacity: 0.42;
  transition: all 0.3s ease;
  cursor: help;
}
.bd-ach.unlocked {
  opacity: 1;
  background: linear-gradient(135deg, #fff5dd, #f0d99e);
  border-color: var(--ochre);
  box-shadow: 0 4px 14px rgba(212, 154, 62, 0.28);
}
.bd-ach-icon {
  font-size: 26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  margin-bottom: 4px;
  filter: grayscale(1);
  opacity: 0.55;
  transition: filter 0.3s, opacity 0.3s;
}
.bd-ach-icon svg {
  width: 24px;
  height: 24px;
  display: block;
}
/* Larger version for custom SVG pictograms (Sharpshooter, Endurance, Apex
   Predator, David & Goliath, Bug Master) so they read at the same visual weight
   as the bigger Unicode glyph emojis. */
.bd-ach-icon-lg {
  height: 36px;
}
.bd-ach-icon-lg svg {
  width: 34px;
  height: 34px;
}
.bd-ach.unlocked .bd-ach-icon { filter: grayscale(0); opacity: 1; }
.bd-ach-name {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 11px;
  color: var(--sepia-dark);
  line-height: 1.2;
}

/* === Modal === */
.bd-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(34, 22, 8, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 110;
  padding: 20px;
  animation: bd-fade-overlay 0.3s;
}
.bd-modal {
  background: var(--paper);
  border-radius: 16px;
  padding: 28px;
  max-width: 620px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  border: 1px solid var(--line-strong);
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}
.bd-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--sepia);
  width: 32px; height: 32px;
  display: flex; align-items:center; justify-content:center;
  border-radius: 8px;
  transition: background 0.2s;
}
.bd-modal-close:hover { background: var(--cream-deep); }
.bd-modal h2 {
  font-family: 'Fraunces', serif;
  margin: 0 0 16px;
  color: var(--ink);
  font-size: 24px;
}

/* === Toast === */
.bd-toast {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: var(--cream);
  padding: 12px 22px;
  border-radius: 999px;
  z-index: 300;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  animation: bd-toast-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: 'Fraunces', serif;
  font-weight: 500;
}
@keyframes bd-toast-in {
  from { transform: translateX(-50%) translateY(-30px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}

/* === Help === */
.bd-help {
  font-size: 13.5px;
  color: var(--sepia-dark);
  line-height: 1.7;
}
.bd-help h3 { font-family: 'Fraunces', serif; margin: 16px 0 6px; color:var(--ink); font-size: 15px; }
.bd-help-hint {
  display: inline-block;
  width: 14px; height: 14px;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 6px;
}

.bd-empty-state {
  text-align: center;
  padding: 32px 20px;
  font-family: 'Fraunces', serif;
  color: var(--sepia);
  font-style: italic;
  font-size: 14px;
}
.bd-empty-state svg { margin-bottom: 10px; opacity: 0.6; }

/* Italic helper for genus/species */
.bd-sci { font-style: italic; }

/* === Confetti === */
.bd-confetti-wing {
  position: fixed;
  top: -30px;
  pointer-events: none;
  z-index: 200;
}

/* === Explorer view === */
.bd-exp-header { /* same header styling, just used inside Explorer */ }
.bd-exp-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
.bd-exp-tree-wrap {
  display: flex;
  flex-direction: column;
  min-height: 480px;
}
.bd-section-title {
  font-family: 'Fraunces', serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sepia-dark);
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.bd-exp-search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--cream-deep);
  border: 1px solid var(--line);
  border-radius: 10px;
  margin-bottom: 14px;
}
.bd-exp-search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'Fraunces', serif;
  font-size: 14px;
  color: var(--ink);
  outline: none;
  padding: 4px 0;
}
.bd-exp-search-input::placeholder {
  color: var(--sepia);
  font-style: italic;
}
.bd-exp-search-clear {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--sepia);
  padding: 2px;
  display: flex;
  align-items: center;
}
.bd-exp-search-clear:hover { color: var(--ink); }
.bd-exp-suggestions {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(34, 22, 8, 0.16);
  z-index: 50;
  max-height: 340px;
  overflow-y: auto;
}
.bd-exp-suggestion {
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: 100%;
  padding: 8px 14px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: 'Fraunces', serif;
  font-size: 13px;
  color: var(--ink);
  border-bottom: 1px solid rgba(92, 69, 40, 0.1);
}
.bd-exp-suggestion:last-child { border-bottom: none; }
.bd-exp-suggestion:hover { background: var(--cream-deep); }
.bd-exp-sugg-rank, .bd-exp-sugg-count {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sepia);
  font-weight: 500;
  flex-shrink: 0;
}
.bd-exp-sugg-rank { min-width: 64px; }
.bd-exp-sugg-name { flex: 1; font-weight: 500; }
.bd-exp-sugg-common { font-weight: 600; flex: 1; }
.bd-exp-sugg-sci { font-style: italic; color: var(--sepia-dark); font-size: 11.5px; }

.bd-exp-tree-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 640px;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: var(--sepia) transparent;
}
.bd-exp-tree-scroll::-webkit-scrollbar { width: 8px; }
.bd-exp-tree-scroll::-webkit-scrollbar-thumb { background: var(--sepia); border-radius: 4px; }

.bd-exp-node-row { font-family: 'Fraunces', serif; }
.bd-exp-node-row.highlighted > .bd-exp-node-inner {
  background: var(--ochre-bright);
  border-radius: 6px;
}
.bd-exp-node-inner {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 3px 4px;
  font-size: 13.5px;
  line-height: 1.4;
  transition: background 0.4s ease;
}
.bd-exp-toggle {
  background: var(--cream-deep);
  border: 1px solid var(--sepia);
  color: var(--sepia-dark);
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  flex-shrink: 0;
}
.bd-exp-toggle:hover { background: var(--cream); color: var(--ink); }
.bd-exp-toggle.expanded { background: var(--ochre); color: #fff; border-color: var(--ochre); }
.bd-exp-toggle-spacer { display: inline-block; width: 18px; flex-shrink: 0; }
.bd-exp-clade {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  color: var(--ink);
}
.bd-exp-clade-rank {
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sepia);
  font-weight: 500;
  min-width: 80px;
}
.bd-exp-clade-name { font-weight: 500; }
.bd-exp-clade-count {
  font-size: 10.5px;
  color: var(--sepia);
  font-style: italic;
}
.bd-exp-species {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  text-align: left;
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  font-family: 'Fraunces', serif;
  font-size: 13.5px;
  color: var(--ink);
}
.bd-exp-species:hover {
  background: var(--cream-deep);
  color: var(--copper);
}
.bd-exp-species-common { font-weight: 600; }
.bd-exp-species-sci { font-style: italic; color: var(--sepia-dark); font-size: 12px; }
.bd-exp-children { /* indentation handled by padding-left on each row */ }
.bd-exp-hint {
  margin-top: 12px;
  padding: 8px 12px;
  font-family: 'Fraunces', serif;
  font-size: 12px;
  color: var(--sepia-dark);
  font-style: italic;
  background: var(--cream-deep);
  border-left: 3px solid var(--ochre);
  border-radius: 6px;
}
.bd-exp-detail {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 24px;
  position: relative;
  max-height: 800px;
  overflow-y: auto;
}
.bd-exp-detail-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  background: var(--cream-deep);
  border: 1px dashed var(--line);
  border-radius: 14px;
  font-family: 'Fraunces', serif;
  color: var(--sepia);
  text-align: center;
  font-size: 14px;
}


@media (max-width: 700px) {
  .bd-shell { padding: 16px 14px 60px; }
  .bd-header { padding: 14px 16px; flex-direction: column; gap: 12px; }
  .bd-header::before, .bd-header::after { display: none; }
  .bd-section { padding: 14px; }
  .bd-hints { gap: 4px; }
  .bd-hint { padding: 6px 4px; min-height: 56px; }
  .bd-hint .bd-hint-value { font-size: 11px; }
  .bd-deco { display: none; }
}
@media (min-width: 900px) {
  .bd-main { grid-template-columns: 1.2fr 0.95fr; }
  .bd-exp-layout { grid-template-columns: 1.1fr 0.9fr; align-items: start; }
}
`;

// ===== BUGDLE LOGO =====
// Hand-drawn SVG logo where some letters are normal and others have insect silhouettes integrated.
// The 'B' has a beetle nested in the lower loop, the 'g' has a dragonfly wing curving into its descender,
// the 'd' has a butterfly half-wing in its bowl, the rest are normal but elegant.
function BugdleLogo() {
  // All-caps "BUGDLE" — letters drawn as solid serif-ish glyphs.
  // B has a beetle nested in its lower bowl. G has a dragonfly perched along its inner arm.
  // All letters share the same baseline (~y=80) and cap height (~y=14).
  // Letter widths: B≈52, U≈48, G≈54, D≈52, L≈42, E≈48 — generous spacing for readability.
  return (
    <svg className="bd-logo-svg" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bd-logo-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#221608" />
          <stop offset="100%" stopColor="#5c4528" />
        </linearGradient>
      </defs>

      {/* ===== B (with stag beetle in lower bowl) ===== */}
      <g transform="translate(8, 0)">
        {/* solid B glyph: vertical bar + two stacked bowls */}
        <path
          d="M 0 14 L 0 80 L 18 80 L 18 14 Z"
          fill="url(#bd-logo-ink)"
        />
        {/* Upper bowl outer + inner cutout (use evenodd) */}
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 4 14 L 32 14 Q 50 14 50 30 Q 50 46 32 46 L 4 46 Z
             M 14 22 L 30 22 Q 40 22 40 30 Q 40 38 30 38 L 14 38 Z"
        />
        {/* Lower bowl outer + inner cutout */}
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 4 46 L 36 46 Q 54 46 54 63 Q 54 80 36 80 L 4 80 Z
             M 14 54 L 34 54 Q 44 54 44 63 Q 44 72 34 72 L 14 72 Z"
        />
        {/* Stag beetle inside lower bowl cutout */}
        <g transform="translate(20, 56)">
          {/* mandibles */}
          <path d="M 6 1 Q 2 -3 0 0 Q 2 2 6 4 Z" fill="#221608" />
          <path d="M 12 1 Q 16 -3 18 0 Q 16 2 12 4 Z" fill="#221608" />
          {/* head */}
          <ellipse cx="9" cy="3.5" rx="3" ry="2" fill="#221608" />
          {/* thorax */}
          <ellipse cx="9" cy="7" rx="3.6" ry="2" fill="#221608" />
          {/* elytra (the main body) */}
          <ellipse cx="9" cy="11.5" rx="5" ry="4.2" fill="#a35435" />
          {/* center line on elytra */}
          <line x1="9" y1="8" x2="9" y2="15" stroke="#221608" strokeWidth="0.7" />
          {/* small dots */}
          <circle cx="7" cy="10" r="0.5" fill="#221608" />
          <circle cx="11" cy="10" r="0.5" fill="#221608" />
          <circle cx="7" cy="13" r="0.5" fill="#221608" />
          <circle cx="11" cy="13" r="0.5" fill="#221608" />
          {/* six legs */}
          <line x1="6" y1="7" x2="2" y2="6" stroke="#221608" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="5" y1="10" x2="1" y2="11" stroke="#221608" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="6" y1="13" x2="2" y2="15" stroke="#221608" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="12" y1="7" x2="16" y2="6" stroke="#221608" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="13" y1="10" x2="17" y2="11" stroke="#221608" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="12" y1="13" x2="16" y2="15" stroke="#221608" strokeWidth="0.7" strokeLinecap="round" />
        </g>
      </g>

      {/* ===== U ===== */}
      <g transform="translate(68, 0)">
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 0 14 L 10 14 L 10 60 Q 10 72 22 72 Q 34 72 34 60 L 34 14 L 44 14 L 44 60 Q 44 80 22 80 Q 0 80 0 60 Z"
        />
      </g>

      {/* ===== G (with dragonfly along its arm) ===== */}
      <g transform="translate(122, 0)">
        {/* G is essentially a C with a horizontal bar+stub on the right */}
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 27 14 Q 0 14 0 47 Q 0 80 27 80 Q 50 80 50 60 L 50 44 L 26 44 L 26 52 L 40 52 L 40 60 Q 40 72 27 72 Q 10 72 10 47 Q 10 22 27 22 Q 38 22 42 30 L 50 26 Q 44 14 27 14 Z"
        />
        {/* Dragonfly perched on the inner crossbar of the G */}
        <g transform="translate(34, 48)">
          {/* 4 wings (slightly transparent) */}
          <ellipse cx="-7" cy="-3" rx="9" ry="2.5" fill="#7d9b87" opacity="0.7" />
          <ellipse cx="7" cy="-3" rx="9" ry="2.5" fill="#7d9b87" opacity="0.7" />
          <ellipse cx="-6" cy="2" rx="7" ry="2" fill="#7d9b87" opacity="0.55" />
          <ellipse cx="6" cy="2" rx="7" ry="2" fill="#7d9b87" opacity="0.55" />
          {/* slender body */}
          <ellipse cx="0" cy="0" rx="1.5" ry="6" fill="#221608" />
          {/* head */}
          <circle cx="0" cy="-6" r="1.8" fill="#221608" />
          {/* eyes */}
          <circle cx="-1" cy="-6.5" r="0.6" fill="#a35435" />
          <circle cx="1" cy="-6.5" r="0.6" fill="#a35435" />
        </g>
      </g>

      {/* ===== D ===== */}
      <g transform="translate(184, 0)">
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 0 14 L 24 14 Q 52 14 52 47 Q 52 80 24 80 L 0 80 Z
             M 10 22 L 24 22 Q 42 22 42 47 Q 42 72 24 72 L 10 72 Z"
        />
      </g>

      {/* ===== L ===== */}
      <g transform="translate(246, 0)">
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 0 14 L 10 14 L 10 72 L 40 72 L 40 80 L 0 80 Z"
        />
      </g>

      {/* ===== E ===== */}
      <g transform="translate(296, 0)">
        <path
          fillRule="evenodd"
          fill="url(#bd-logo-ink)"
          d="M 0 14 L 46 14 L 46 22 L 10 22 L 10 43 L 40 43 L 40 51 L 10 51 L 10 72 L 46 72 L 46 80 L 0 80 Z"
        />
      </g>

      {/* Subtle dotted underline (entomologist's notebook feel) */}
      <g fill="#8b6f47" opacity="0.6">
        <circle cx="6" cy="90" r="0.9" />
        <circle cx="16" cy="90" r="0.9" />
        <circle cx="26" cy="90" r="0.9" />
        <circle cx="36" cy="90" r="0.9" />
      </g>
    </svg>
  );
}

// ===== DECORATIVE INSECT SILHOUETTES (corner ornaments) =====
function DecoInsect({ kind, className }) {
  if (kind === 'beetle') {
    return (
      <svg className={className} viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
        <g fill="#221608">
          {/* stag beetle silhouette */}
          <ellipse cx="100" cy="80" rx="48" ry="32" />
          <ellipse cx="100" cy="42" rx="20" ry="14" />
          <ellipse cx="100" cy="22" rx="10" ry="8" />
          {/* mandibles */}
          <path d="M 92 16 Q 70 -2 60 12 Q 70 18 88 22 Z" />
          <path d="M 108 16 Q 130 -2 140 12 Q 130 18 112 22 Z" />
          {/* legs */}
          <path d="M 60 70 L 30 60 L 32 64 L 60 74 Z" />
          <path d="M 60 80 L 26 84 L 28 88 L 60 84 Z" />
          <path d="M 60 90 L 30 108 L 32 112 L 62 94 Z" />
          <path d="M 140 70 L 170 60 L 168 64 L 140 74 Z" />
          <path d="M 140 80 L 174 84 L 172 88 L 140 84 Z" />
          <path d="M 140 90 L 170 108 L 168 112 L 138 94 Z" />
          {/* center line on elytra */}
          <rect x="98" y="50" width="4" height="60" />
        </g>
      </svg>
    );
  }
  if (kind === 'butterfly') {
    return (
      <svg className={className} viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
        <g fill="#221608">
          {/* body */}
          <ellipse cx="110" cy="90" rx="5" ry="50" />
          <circle cx="110" cy="36" r="6" />
          {/* antennae */}
          <path d="M 108 32 Q 100 14 88 12" stroke="#221608" strokeWidth="2" fill="none" />
          <path d="M 112 32 Q 120 14 132 12" stroke="#221608" strokeWidth="2" fill="none" />
          {/* upper wings */}
          <path d="M 105 60 Q 50 30 20 70 Q 10 100 60 90 Q 90 80 105 75 Z" />
          <path d="M 115 60 Q 170 30 200 70 Q 210 100 160 90 Q 130 80 115 75 Z" />
          {/* lower wings */}
          <path d="M 105 95 Q 60 110 45 150 Q 80 160 105 130 Z" />
          <path d="M 115 95 Q 160 110 175 150 Q 140 160 115 130 Z" />
        </g>
      </svg>
    );
  }
  if (kind === 'dragonfly') {
    return (
      <svg className={className} viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
        <g fill="#221608">
          {/* body */}
          <ellipse cx="120" cy="80" rx="80" ry="3" />
          <circle cx="40" cy="80" r="6" />
          {/* wings (4) */}
          <ellipse cx="100" cy="60" rx="50" ry="14" />
          <ellipse cx="140" cy="60" rx="50" ry="14" />
          <ellipse cx="100" cy="100" rx="45" ry="11" />
          <ellipse cx="140" cy="100" rx="45" ry="11" />
        </g>
      </svg>
    );
  }
  // ant
  return (
    <svg className={className} viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
      <g fill="#221608">
        <ellipse cx="40" cy="50" rx="22" ry="18" />
        <ellipse cx="85" cy="50" rx="14" ry="12" />
        <ellipse cx="135" cy="50" rx="30" ry="22" />
        {/* antennae */}
        <path d="M 24 40 Q 0 20 -10 10" stroke="#221608" strokeWidth="2" fill="none" />
        <path d="M 28 36 Q 8 14 4 4" stroke="#221608" strokeWidth="2" fill="none" />
        {/* legs */}
        <path d="M 70 45 Q 60 15 50 10" stroke="#221608" strokeWidth="2.5" fill="none" />
        <path d="M 80 50 Q 70 10 60 -2" stroke="#221608" strokeWidth="2.5" fill="none" />
        <path d="M 90 55 Q 100 20 90 -2" stroke="#221608" strokeWidth="2.5" fill="none" />
        <path d="M 70 55 Q 60 80 50 90" stroke="#221608" strokeWidth="2.5" fill="none" />
        <path d="M 80 56 Q 70 95 60 105" stroke="#221608" strokeWidth="2.5" fill="none" />
        <path d="M 90 56 Q 100 92 110 105" stroke="#221608" strokeWidth="2.5" fill="none" />
      </g>
    </svg>
  );
}

function BackgroundDecorations() {
  return (
    <>
      <DecoInsect kind="beetle" className="bd-deco tl" />
      <DecoInsect kind="butterfly" className="bd-deco tr" />
      <DecoInsect kind="ant" className="bd-deco bl" />
      <DecoInsect kind="dragonfly" className="bd-deco br" />
    </>
  );
}

// ===== HINT CARD =====
function HintCard({ label, value, state, arrow }) {
  return (
    <div
      className="bd-hint"
      style={{
        background: HINT_BG[state] || HINT_BG.none,
        color: HINT_FG[state] || HINT_FG.none,
      }}
    >
      <div className="bd-hint-label">{label}</div>
      <div className="bd-hint-value">
        <span>{value}</span>
        {arrow === 'up' && <ChevronUp size={14} />}
        {arrow === 'down' && <ChevronDown size={14} />}
      </div>
    </div>
  );
}

// Compute hint display: 4 cards for one guess
function HintGrid({ guess, target }) {
  // Distribution: use adjacency
  const distCmp = compareSet(guess.dist, target.dist, realmsAdjacent);
  // Habitat / Diet: no adjacency
  const habCmp = compareSet(guess.hab, target.hab);
  const dietCmp = compareSet(guess.diet, target.diet);
  const sizeCmp = compareSize(guess.size, target.size);

  return (
    <div className="bd-hints">
      <HintCard label="Distribution" value={formatRegions(guess.dist)} state={distCmp} />
      <HintCard label="Habitat" value={formatHabitatsFull(guess)} state={habCmp} />
      <HintCard label="Diet" value={formatDiets(guess.diet)} state={dietCmp} />
      <HintCard label="Size" value={`${guess.size[0]}–${guess.size[1]} mm`} state={sizeCmp.state} arrow={sizeCmp.dir} />
    </div>
  );
}

// ===== LEGEND =====
function HintLegend() {
  return (
    <div className="bd-legend">
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--green-dark)' }}></span>
        <span>Exact match</span>
      </div>
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--green-light)' }}></span>
        <span>Partially correct</span>
      </div>
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--yellow)' }}></span>
        <span>Close</span>
      </div>
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--red)' }}></span>
        <span>No match</span>
      </div>
      <div className="bd-legend-item">
        <ChevronUp size={14} /><span>Larger</span>
        <ChevronDown size={14} style={{ marginLeft: 8 }} /><span>Smaller</span>
      </div>
    </div>
  );
}

// ===== AUTOCOMPLETE =====
function Autocomplete({ value, onChange, onSelect, disabled, alreadyGuessed }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);

  const matches = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    const guessedSet = new Set(alreadyGuessed);
    return SPECIES
      .filter((s) => !guessedSet.has(s.id))
      .filter((s) => s.common.toLowerCase().includes(q) || s.scientificName.toLowerCase().includes(q))
      .slice(0, 8);
  }, [value, alreadyGuessed]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setHighlight(0); }, [matches.length]);

  const choose = (s) => {
    onChange(s.common);
    onSelect(s);
    setOpen(false);
  };

  const onKey = (e) => {
    if (!open || matches.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight((h) => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); choose(matches[highlight]); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="bd-input-row" ref={wrapRef}>
      <input
        className="bd-input"
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        disabled={disabled}
        placeholder="Type a common or scientific name…"
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <div className="bd-suggestions">
          {matches.map((s, i) => (
            <div
              key={s.id}
              className={'bd-suggestion ' + (i === highlight ? 'active' : '')}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => { e.preventDefault(); choose(s); }}
            >
              {s.common}
              <span className="bd-suggestion-sci">({s.scientificName})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== TAXONOMIC TREE (v4 — Metazooa-style) =====
// New rules:
// - Every guess is a leaf in the tree (labelled with its common + scientific name).
// - The mystery species is also a leaf, labelled "?" until found.
// - Internal nodes are displayed as plain dots, EXCEPT at branching points (LCAs
//   between ≥2 leaves) where the rank+name is printed.
// - The "?" leaf attaches at the deepest node that is either (a) the LCA between
//   the target and at least one guess, OR (b) an explicitly revealed rank.
// - The mystery leaf does NOT contribute to deeper LCAs (we don't know its real
//   position yet), so two guesses that share a clade not shared with the target
//   still create a labelled branching point.
//
// On game over (won or revealed), the "?" becomes the full target species leaf
// and contributes to LCA computations like any other guess.

function buildTree(guesses, target, gameOver, revealedRankIdx, mysteryRevealed) {
  // Root = Insecta
  const root = {
    rank: 'Class',
    name: 'Insecta',
    children: new Map(),
    leaves: new Set(),     // ids of leaves below this node
  };
  if (!target) return root;
  const tp = getFullPath(target);

  // Was the target also among the player's guesses? (i.e. the player won by guessing it)
  const winningGuess = guesses.find((g) => g.id === target.id) || null;

  // Helper: insert path into the trie up to a given depth (inclusive of that index in `path`),
  // tagging each visited internal node with the `leafId` so we can compute LCAs later.
  function insertPath(path, upToIdx, leafId) {
    let cur = root;
    cur.leaves.add(leafId);
    for (let i = 1; i <= upToIdx && i < path.length; i++) {
      const [rank, name] = path[i];
      if (!cur.children.has(name)) {
        cur.children.set(name, {
          rank, name, children: new Map(), leaves: new Set(),
        });
      }
      cur = cur.children.get(name);
      cur.leaves.add(leafId);
    }
    return cur;
  }

  // 1. Insert each guess's full lineage path; attach a guess-leaf marker at the end.
  //    EXCEPTION: if a guess IS the target AND mystery is revealed, we will later replace
  //    this leaf with a "revealed mystery" marker instead of a normal guess leaf, so
  //    there's only ONE leaf for that species.
  guesses.forEach((g, idx) => {
    const gp = getFullPath(g);
    const parent = insertPath(gp, gp.length - 1, 'g_' + g.id);
    const leafKey = '__guess_' + g.id;
    const isWinning = mysteryRevealed && winningGuess && g.id === winningGuess.id;
    parent.children.set(leafKey, {
      rank: 'GuessLeaf',
      // If this guess is the revealed mystery, label & style it as the revealed answer.
      name: isWinning ? target.common : g.common,
      sci: isWinning ? target.scientificName : g.scientificName,
      guessId: g.id,
      isGuess: true,
      isMystery: isWinning,    // merged: revealed mystery + winning guess in one leaf
      isRevealed: isWinning,
      isLatest: idx === guesses.length - 1,
      children: new Map(),
      leaves: new Set(['g_' + g.id, ...(isWinning ? ['target'] : [])]),
    });
  });

  // 2. Decide where to attach the mystery leaf.
  // (Skipped if the winning guess already carries the mystery role.)
  if (!(mysteryRevealed && winningGuess)) {
    let mysteryAttachIdx = 0;
    if (revealedRankIdx > 0) mysteryAttachIdx = Math.max(mysteryAttachIdx, revealedRankIdx);

    if (guesses.length > 0) {
      let deepestLca = 0;
      for (const g of guesses) {
        const gp = getFullPath(g);
        const minLen = Math.min(gp.length, tp.length);
        for (let i = 0; i < minLen; i++) {
          if (gp[i][1] === tp[i][1]) {
            if (i > deepestLca) deepestLca = i;
          } else break;
        }
      }
      mysteryAttachIdx = Math.max(mysteryAttachIdx, deepestLca);
    }

    if (gameOver && mysteryRevealed) {
      // On reveal-without-winning, attach to the species' parent node and let
      // the species name itself appear at that node. We do this by inserting the
      // target path up to (Species - 1), then add the mystery leaf BELOW carrying the
      // Species name + scientific name. This avoids the "clade containing only itself"
      // problem because the leaf IS the species, no separate Species internal node above.
      mysteryAttachIdx = tp.length - 2;  // attach at Genus level
      // But genus already appears in the path. Wait — Genus is the parent of Species.
      // tp goes: Class, Subclass, ..., Genus, Species. tp.length-1 = Species, tp.length-2 = Genus.
      // We insert up to Genus (so the Genus node is created), then attach the mystery leaf
      // under Genus. The mystery leaf's name is the species' common name and scientific name.
    }

    // 3. Insert the target's path up to mysteryAttachIdx.
    const mysteryParent = insertPath(tp, mysteryAttachIdx, 'target');
    const mysteryLeaf = {
      rank: 'MysteryLeaf',
      name: mysteryRevealed ? target.common : '?',
      sci: mysteryRevealed ? target.scientificName : '',
      isMystery: true,
      isRevealed: mysteryRevealed,
      children: new Map(),
      leaves: new Set(['target']),
    };
    mysteryParent.children.set('__mystery', mysteryLeaf);
  }

  // 4. Mark nodes that are LCAs (branching points) AND mark nodes that are
  //    explicitly revealed via hint (so they show their name even on a single branch).
  //
  //    Definitions:
  //    - "branching" : children.size >= 2 in the COMPRESSED tree (we'll compute that below)
  //    - "revealedExplicit" : node is on the target's path up to revealedRankIdx
  //
  //    We need the compressed tree, so first compute it then walk it for markings.

  // 5. Compress pass-through internals: a node with exactly one significant descendant
  //    gets skipped. We keep:
  //    - root
  //    - leaves (guess + mystery)
  //    - branching points (≥2 children in the compressed tree)
  //    - revealed-via-hint nodes (even if they have a single child)
  //
  //    To handle this clean, we do a bottom-up rebuild.

  // Mark which target-path nodes are "revealed-by-hint" (they get their name written even
  // if not a branching point). On game over (won or revealed), no special marking needed
  // because the entire target chain becomes labelled by branching with the mystery leaf.
  const revealedSet = new Set();  // names of nodes on target path that are revealed by hint
  if (revealedRankIdx > 0) {
    for (let i = 1; i <= revealedRankIdx && i < tp.length; i++) {
      revealedSet.add(tp[i][1]);
    }
  }

  // Bottom-up compression that returns a fresh, compressed tree.
  function compress(node) {
    // Recurse first
    const newChildren = new Map();
    for (const [k, c] of node.children.entries()) {
      const cc = compress(c);
      // A child is "kept as labelled" if it's a leaf, a branching point, the root, or revealed.
      const isLeafLike = cc.isGuess || cc.isMystery;
      const isBranching = cc.children.size >= 2;
      const isRevealed = revealedSet.has(cc.name);
      if (isLeafLike || isBranching || isRevealed) {
        newChildren.set(k, cc);
      } else {
        // Pass-through node: hoist its children up to this level.
        for (const [ck, cv] of cc.children.entries()) {
          newChildren.set(ck, cv);
        }
      }
    }
    return { ...node, children: newChildren };
  }

  const compressed = compress(root);

  // 6. Mark every internal surviving node that is an ancestor of the mystery leaf in
  //    the compressed tree (its "isOnTargetPath" flag is used for visual highlighting).
  //    We do a recursive walk: a node is "on target path" if any of its descendants is
  //    the mystery leaf (or it is the mystery leaf itself).
  function markTargetAncestors(node) {
    let hasMystery = !!node.isMystery;
    for (const c of node.children.values()) {
      if (markTargetAncestors(c)) hasMystery = true;
    }
    if (hasMystery && !node.isGuess && !node.isMystery) {
      node.isOnTargetPath = true;
    }
    return hasMystery;
  }
  markTargetAncestors(compressed);

  // 7. Compute frontier node: the deepest internal node that's on the target path AND has
  //    at least one guess in its subtree. This is what visually pulses.
  let frontier = null;
  let frontierDepth = -1;
  function findFrontier(node, depth) {
    if (node.isOnTargetPath && !node.isGuess && !node.isMystery) {
      const hasGuessInSubtree = (function check(n) {
        if (n.isGuess) return true;
        for (const c of n.children.values()) if (check(c)) return true;
        return false;
      })(node);
      if (hasGuessInSubtree && depth > frontierDepth) {
        frontierDepth = depth;
        frontier = node;
      }
    }
    for (const c of node.children.values()) {
      findFrontier(c, depth + 1);
    }
  }
  findFrontier(compressed, 0);
  if (frontier) frontier.isFrontier = true;

  return compressed;
}

// Compute tree layout (simple top-down, balanced)
function layoutTree(root) {
  let nextX = 0;
  function place(n, depth) {
    n.depth = depth;
    if (n.children.size === 0) {
      n.x = nextX++;
      return n.x;
    }
    let sum = 0; let count = 0;
    for (const c of n.children.values()) {
      sum += place(c, depth + 1);
      count++;
    }
    n.x = sum / count;
    return n.x;
  }
  place(root, 0);
  const nodes = [];
  const edges = [];
  function walk(n, parent) {
    nodes.push(n);
    if (parent) edges.push({ from: parent, to: n });
    for (const c of n.children.values()) walk(c, n);
  }
  walk(root, null);
  return { nodes, edges, leafCount: nextX };
}

function TaxoTree({ guesses, target, gameOver, won, revealedRankIdx, onGuessClick, activeGuessId, mysteryRevealed }) {
  const tree = useMemo(
    () => buildTree(guesses, target, gameOver, revealedRankIdx, mysteryRevealed),
    [guesses, target, gameOver, revealedRankIdx, mysteryRevealed]
  );
  const layout = useMemo(() => layoutTree(tree), [tree]);

  const leafW = 130;
  const rowH = 70;
  const padX = 24; const padY = 30;
  const innerW = Math.max(320, layout.leafCount * leafW);
  const maxDepth = Math.max(...layout.nodes.map((n) => n.depth), 1);
  const innerH = (maxDepth + 1) * rowH + 20;
  const W = innerW + padX * 2;
  const H = innerH + padY * 2;

  function nodeX(n) { return padX + (n.x + 0.5) * (innerW / Math.max(1, layout.leafCount)); }
  function nodeY(n) { return padY + n.depth * rowH + 14; }

  // Locate the mystery node so we can scroll-center it.
  const mysteryNode = useMemo(() => {
    for (const n of layout.nodes) if (n.isMystery) return n;
    return null;
  }, [layout.nodes]);

  const wrapRef = useRef(null);
  const hasScrolledRef = useRef(false);
  useEffect(() => {
    if (!wrapRef.current || !mysteryNode) return;
    const id = requestAnimationFrame(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const targetX = nodeX(mysteryNode);
      const desired = targetX - wrap.clientWidth / 2;
      const left = Math.max(0, Math.min(desired, W - wrap.clientWidth));
      wrap.scrollTo({
        left,
        behavior: hasScrolledRef.current ? 'smooth' : 'auto',
      });
      hasScrolledRef.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, [mysteryNode, layout, W]);

  return (
    <div className="bd-tree-wrap" ref={wrapRef}>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="bd-tree-svg" style={{ display: 'block', margin: '0 auto' }}>
        {/* Edges */}
        {layout.edges.map((e, i) => {
          const matched = e.to.isOnTargetPath || e.to.isMystery;
          const x1 = nodeX(e.from), y1 = nodeY(e.from);
          const x2 = nodeX(e.to), y2 = nodeY(e.to);
          const path = `M ${x1} ${y1 + 6} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2 - 12}`;
          return (
            <path key={'edge-' + i} d={path} className={'bd-tree-edge ' + (matched ? 'matched' : '')} />
          );
        })}
        {/* Nodes */}
        {layout.nodes.map((n, i) => {
          const x = nodeX(n), y = nodeY(n);
          const isRoot = n.depth === 0;
          const isGuess = n.isGuess;
          const isMystery = n.isMystery;
          let cls = 'bd-tree-node-circle';
          if (isRoot) cls += ' root';
          else if (isMystery && n.isRevealed) cls += ' target';
          else if (isMystery) cls += ' mystery';
          else if (isGuess) {
            cls += ' guess';
            if (n.isLatest || activeGuessId === n.guessId) cls += ' highlight';
          }
          else if (n.isFrontier) cls += ' frontier';
          else if (n.isOnTargetPath) cls += ' matched';

          const isClickable = isGuess;
          const radius = isRoot ? 10 : (isMystery ? 11 : (isGuess ? 7 : 6));
          const showLabel = !isGuess && !isMystery;  // internals always labelled now
          return (
            <g
              key={'node-' + i}
              className="bd-tree-node-group"
              onClick={() => isGuess && onGuessClick(n.guessId)}
              style={{ cursor: isClickable ? 'pointer' : 'default' }}
            >
              <circle cx={x} cy={y} r={radius} className={cls} />
              {/* Mystery leaf — "?" or revealed answer text. Takes precedence over guess rendering
                  when a winning guess is also the revealed mystery (single combined node). */}
              {isMystery && !n.isRevealed && (
                <text x={x} y={y + 4} textAnchor="middle" style={{ fontFamily: 'Fraunces, serif', fontSize: 14, fontWeight: 700, fill: 'var(--paper)', pointerEvents: 'none' }}>
                  ?
                </text>
              )}
              {isMystery && n.isRevealed && (
                <>
                  <text x={x} y={y + 22} textAnchor="middle" className="bd-tree-guess-leaf" style={{ fontStyle: 'normal', fontWeight: 700, fill: 'var(--green-dark)' }}>
                    {n.name.length > 22 ? n.name.slice(0, 20) + '…' : n.name}
                  </text>
                  <text x={x} y={y + 35} textAnchor="middle" className="bd-tree-guess-leaf" style={{ fill: 'var(--green-dark)', fontStyle: 'italic' }}>
                    {n.sci.length > 28 ? n.sci.slice(0, 26) + '…' : n.sci}
                  </text>
                </>
              )}
              {/* Internal node label (rank above, name below) */}
              {showLabel && (
                <text x={x} y={y - 14} textAnchor="middle" className="bd-tree-rank">
                  {n.depth === 0 ? 'Class' : (RANK_LABEL[n.rank] || n.rank)}
                </text>
              )}
              {showLabel && (
                <text
                  x={x} y={y + 22} textAnchor="middle" className="bd-tree-label"
                  style={{ fontStyle: (n.rank === 'Genus' || n.rank === 'Species') ? 'italic' : 'normal' }}
                >
                  {n.name.length > 18 ? n.name.slice(0, 16) + '…' : n.name}
                </text>
              )}
              {/* Guess leaf (only when NOT also the revealed mystery) */}
              {isGuess && !isMystery && (
                <>
                  <text x={x} y={y + 22} textAnchor="middle" className="bd-tree-guess-leaf" style={{ fontStyle: 'normal', fontWeight: 700, fill: 'var(--ink)' }}>
                    {n.name.length > 22 ? n.name.slice(0, 20) + '…' : n.name}
                  </text>
                  <text x={x} y={y + 35} textAnchor="middle" className="bd-tree-guess-leaf">
                    {n.sci.length > 28 ? n.sci.slice(0, 26) + '…' : n.sci}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ===== CONFETTI (butterfly wings) =====
function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) { setPieces([]); return; }
    const colors = ['#a35435', '#d49a3e', '#2e6b3b', '#97b755', '#ad7d36', '#b8463a', '#e0bd3a'];
    const arr = Array.from({ length: 60 }, (_, i) => ({
      id: i + '-' + Math.random(),
      x: Math.random() * window.innerWidth,
      rotate: Math.random() * 360,
      delay: Math.random() * 0.6,
      duration: 2.4 + Math.random() * 1.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 14 + Math.random() * 14,
      drift: (Math.random() - 0.5) * 200,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <>
      <style>{`
        @keyframes bd-fall-wing {
          0% { transform: translate(0, -40px) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--bd-drift, 0px), ${typeof window !== 'undefined' ? window.innerHeight + 40 : 800}px) rotate(720deg); opacity: 0; }
        }
        @keyframes bd-wing-flap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.55); }
        }
      `}</style>
      {pieces.map((p) => (
        <div key={p.id} className="bd-confetti-wing" style={{
          left: p.x,
          width: p.size, height: p.size * 0.8,
          '--bd-drift': p.drift + 'px',
          animation: `bd-fall-wing ${p.duration}s ${p.delay}s linear forwards`,
        }}>
          <svg viewBox="0 0 20 16" width="100%" height="100%" style={{ transform: `rotate(${p.rotate}deg)` }}>
            <g style={{ transformOrigin: 'center', animation: 'bd-wing-flap 0.18s infinite' }}>
              <path d="M 10 8 Q 2 1 1 7 Q 1 13 8 11 Z" fill={p.color} opacity="0.92" />
              <path d="M 10 8 Q 18 1 19 7 Q 19 13 12 11 Z" fill={p.color} opacity="0.92" />
            </g>
          </svg>
        </div>
      ))}
    </>
  );
}

// ===== ACHIEVEMENTS PANEL =====
function AchievementsPanel({ unlocked }) {
  return (
    <div className="bd-ach-grid">
      {ACHIEVEMENTS.map((a) => {
        const got = unlocked.includes(a.id);
        // Custom SVG icons (anything that isn't a string emoji) get bumped up a bit
        // so they read at parity with the larger-feeling Unicode glyphs.
        const isCustomSvg = typeof a.icon !== 'string';
        return (
          <div key={a.id} className={'bd-ach ' + (got ? 'unlocked' : '')} title={`${a.name} — ${a.desc}`}>
            <span className={'bd-ach-icon' + (isCustomSvg ? ' bd-ach-icon-lg' : '')}>{a.icon}</span>
            <div className="bd-ach-name">{a.name}</div>
          </div>
        );
      })}
    </div>
  );
}

// ===== SPECIES IMAGE HOOK =====
// Fetches an image for a species, preferring iNaturalist (research-grade photos with
// known photographer attribution) and falling back to Wikipedia. Always tries to use
// the largest available size for crisp display.
// Returns { imgUrl, imgLoading, attribution: { source, photographer, photoUrl } }.
function useSpeciesImage(species, active) {
  const [imgUrl, setImgUrl] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const [attribution, setAttribution] = useState(null);

  useEffect(() => {
    if (!active || !species) {
      setImgLoading(false);
      setImgUrl(null);
      setAttribution(null);
      return;
    }
    let cancelled = false;

    // --- iNaturalist: best photo with photographer credit ---
    // Strategy: look up the taxon by scientific name, then fetch the taxon detail to
    // get its `taxon_photos` array which carries higher-resolution variants and full
    // attribution including the photographer's iNaturalist username.
    async function tryINaturalist(query) {
      try {
        const lookupUrl = `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(query)}&per_page=1`;
        const r = await fetch(lookupUrl);
        if (!r.ok) return null;
        const data = await r.json();
        const taxon = data.results && data.results[0];
        if (!taxon) return null;
        // Fetch the taxon detail to get rich photo objects with attribution
        const detailUrl = `https://api.inaturalist.org/v1/taxa/${taxon.id}`;
        const dr = await fetch(detailUrl);
        if (!dr.ok) return null;
        const dd = await dr.json();
        const taxonDetail = dd.results && dd.results[0];
        if (!taxonDetail) return null;
        // Prefer taxon_photos[0].photo (these are curated; first is usually the cover)
        const photos = taxonDetail.taxon_photos || [];
        let photo = photos.length > 0 ? photos[0].photo : null;
        // Fall back to the default photo on the lookup result
        if (!photo && taxonDetail.default_photo) photo = taxonDetail.default_photo;
        if (!photo) return null;
        // iNaturalist serves several size variants in URLs by replacing the segment.
        // medium_url → swap "/medium." → "/large." (≈1024px) for high quality.
        const med = photo.medium_url || photo.url || '';
        const large = med ? med.replace('/medium.', '/large.') : '';
        const url = large || photo.original_url || photo.large_url || photo.medium_url;
        if (!url) return null;
        // Parse attribution. iNaturalist attribution strings come in a few shapes:
        //   "(c) Display Name, all rights reserved"
        //   "(c) Display Name, some rights reserved (CC BY-NC), uploaded by their_login"
        //
        // We always show the photographer's real name (Display Name). We never use the
        // login as a credit because it can look like garbled text ("johnnys87") and
        // because the parsing has proven unreliable. The whole credit links to the photo
        // page itself, so the visitor can always click through to verify and find the
        // photographer's profile from there.
        const attribText = photo.attribution || '';
        const displayName = photo.attribution_name
          || (attribText.match(/^\(c\)\s+([^,]+?)(?:,|$)/) || [])[1]
          || null;
        // Page URL for the photo on iNaturalist
        const photoUrl = photo.id ? `https://www.inaturalist.org/photos/${photo.id}` : `https://www.inaturalist.org/taxa/${taxonDetail.id}`;
        return {
          url,
          attribution: {
            source: 'iNaturalist',
            displayName: displayName ? displayName.trim() : null,  // real name only
            photoUrl,                // URL to the photo page itself
            licenseText: attribText,
          },
        };
      } catch (e) { /* CORS / network */ }
      return null;
    }

    // --- Wikipedia: fall-back image, attributed to Wikipedia contributors collectively ---
    async function tryWikipedia(title) {
      try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const r = await fetch(url);
        if (r.ok) {
          const data = await r.json();
          if (data && data.thumbnail && data.thumbnail.source) {
            const imgUrl = data.originalimage?.source || data.thumbnail.source;
            return {
              url: imgUrl,
              attribution: {
                source: 'Wikipedia',
                photographer: 'Wikipedia contributors',
                photoUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`,
                licenseText: '',
              },
            };
          }
        }
      } catch (e) { /* CORS / network */ }
      return null;
    }

    async function load() {
      setImgLoading(true);
      setImgUrl(null);
      setAttribution(null);

      // 1. iNaturalist first (better photos, real photographer credit)
      const inatQueries = [species.scientificName, species.genus];
      for (const q of inatQueries) {
        const result = await tryINaturalist(q);
        if (cancelled) return;
        if (result) {
          setImgUrl(result.url);
          setAttribution(result.attribution);
          setImgLoading(false);
          return;
        }
      }
      // 2. Wikipedia fall-back
      const wikiTitles = [
        species.scientificName.replace(/ /g, '_'),
        species.genus,
        species.common.replace(/ /g, '_'),
      ];
      for (const t of wikiTitles) {
        const result = await tryWikipedia(t);
        if (cancelled) return;
        if (result) {
          setImgUrl(result.url);
          setAttribution(result.attribution);
          setImgLoading(false);
          return;
        }
      }
      if (!cancelled) setImgLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [species, active]);

  return { imgUrl, imgLoading, setImgUrl, attribution };
}

// ===== SPECIES IMAGE COMPONENT (reusable for EndScreen + Explorer) =====
function SpeciesImageBlock({ species }) {
  const { imgUrl, imgLoading, setImgUrl, attribution } = useSpeciesImage(species, true);
  return (
    <figure className="bd-end-img-figure">
      <div className="bd-end-img-wrap">
        {imgLoading ? (
          <div className="bd-end-placeholder">Loading image…</div>
        ) : imgUrl ? (
          <img src={imgUrl} alt={species.common} onError={() => setImgUrl(null)} />
        ) : (
          <div className="bd-end-placeholder">
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
            <div>Image could not be loaded.</div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
              Some sandboxed environments block external images.
            </div>
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(species.scientificName.replace(/ /g, '_'))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 10, color: 'var(--copper)', textDecoration: 'underline', fontSize: 13 }}
            >
              Open <span className="bd-sci">{species.scientificName}</span> on Wikipedia ↗
            </a>
          </div>
        )}
      </div>
      {!imgLoading && imgUrl && attribution && (
        <figcaption className="bd-img-attribution">
          {attribution.source === 'iNaturalist' ? (
            <>
              Photo from <a href={attribution.photoUrl} target="_blank" rel="noopener noreferrer">iNaturalist</a>
              {attribution.displayName && (
                <>
                  {' '}<a href={attribution.photoUrl} target="_blank" rel="noopener noreferrer">{attribution.displayName}</a>
                </>
              )}
            </>
          ) : (
            <>
              Photo from <a href={attribution.photoUrl} target="_blank" rel="noopener noreferrer">{attribution.source}</a>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}

// ===== END SCREEN =====
function EndScreen({ won, target, guesses, onClose, onNewGame, totalStats, revealed, onReveal, isTraining }) {
  // Build complete taxonomy rows
  const taxoRows = [
    ['Class', 'Insecta'],
    ...target.lineage,
    ['Genus', target.genus],
    ['Species', target.scientificName],
  ];

  return (
    <div className="bd-end-overlay" onClick={onClose}>
      <div className="bd-end-card" onClick={(e) => e.stopPropagation()}>
        <button className="bd-modal-close" onClick={onClose}><X size={18} /></button>
        <div className="bd-end-title" style={{ color: won ? 'var(--green-dark)' : 'var(--copper)' }}>
          {won ? '🎉 Solved!' : 'Game over'}
        </div>

        {/* Defeat + not revealed yet → show only attempt count and Reveal button */}
        {!revealed && !won && (
          <>
            <div style={{ fontFamily: 'Fraunces, serif', color: 'var(--sepia-dark)', fontSize: 15, marginBottom: 20, lineHeight: 1.5 }}>
              You used all {MAX_ATTEMPTS} attempts without finding the mystery species.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="bd-btn accent"
                style={{ padding: '12px 18px', fontSize: 15, justifyContent: 'center' }}
                onClick={onReveal}
              >
                <Sparkles size={16} /> Reveal the answer
              </button>
              <button
                className="bd-btn"
                style={{ padding: '12px 18px', fontSize: 15, justifyContent: 'center' }}
                onClick={onNewGame}
              >
                <RotateCcw size={16} />
                {isTraining ? " New practice round (don't reveal)" : " Practice mode (don't reveal)"}
              </button>
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 12, color: 'var(--sepia)', textAlign: 'center', marginTop: 14 }}>
              Stats: {guesses.length} guesses · Total wins: {totalStats.wins} · Streak reset.
            </div>
          </>
        )}

        {/* Win OR defeat-then-revealed → show full answer */}
        {revealed && (
          <>
            <div className="bd-end-sub">
              {target.common}{' '}
              <span className="bd-sci" style={{ fontSize: 16 }}>({target.scientificName})</span>
            </div>
            <SpeciesImageBlock species={target} />
            <div className="bd-end-fact">
              <Lightbulb size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              {target.fact}
            </div>

            {/* Full taxonomy */}
            <div className="bd-end-taxo">
              <div className="bd-end-taxo-title">Full taxonomy</div>
              {taxoRows.map(([rank, name]) => (
                <div key={rank} className="bd-end-taxo-row">
                  <span className="bd-end-taxo-rank">{RANK_LABEL[rank] || rank}</span>
                  <span
                    className="bd-end-taxo-name"
                    style={{ fontStyle: (rank === 'Genus' || rank === 'Species') ? 'italic' : 'normal' }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>

            <div className="bd-end-stats">
              <div className="bd-end-stat">
                <div className="bd-end-stat-num">{guesses.length}</div>
                <div className="bd-end-stat-label">Guesses</div>
              </div>
              <div className="bd-end-stat">
                <div className="bd-end-stat-num">{totalStats.wins}</div>
                <div className="bd-end-stat-label">Total wins</div>
              </div>
              <div className="bd-end-stat">
                <div className="bd-end-stat-num">{totalStats.streak}</div>
                <div className="bd-end-stat-label">Streak</div>
              </div>
            </div>
            <button className="bd-btn primary" style={{ width: '100%', padding: '12px 18px', fontSize: 15, justifyContent: 'center' }} onClick={onNewGame}>
              <RotateCcw size={16} />
              {isTraining ? ' New practice round' : ' Practice mode (come back tomorrow for the next daily!)'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ===== TOAST =====
function Toast({ message, icon, onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  // `icon` may be an emoji string or a JSX element (SVG). For strings we bump the
  // font-size so they read at the same visual weight as the SVG icons.
  const isEmoji = typeof icon === 'string';
  return (
    <div className="bd-toast">
      <span style={isEmoji ? { fontSize: 24 } : { display: 'inline-flex', alignItems: 'center' }}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}

// ===== SOUND =====
function useSounds(soundOn) {
  const ctxRef = useRef(null);
  const ensure = () => {
    if (!ctxRef.current && typeof window !== 'undefined') {
      try { ctxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    return ctxRef.current;
  };
  const click = useCallback(() => {
    if (!soundOn) return;
    const ctx = ensure(); if (!ctx) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = 720;
    o.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.08);
    g.gain.setValueAtTime(0.18, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.1);
  }, [soundOn]);
  const success = useCallback(() => {
    if (!soundOn) return;
    const ctx = ensure(); if (!ctx) return;
    [523, 659, 784].forEach((f, i) => {
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, ctx.currentTime + i * 0.1);
      g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.1 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime + i * 0.1); o.stop(ctx.currentTime + i * 0.1 + 0.35);
    });
  }, [soundOn]);
  const flutter = useCallback(() => {
    if (!soundOn) return;
    const ctx = ensure(); if (!ctx) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sawtooth'; o.frequency.value = 220;
    o.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.18);
    g.gain.setValueAtTime(0.07, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.2);
  }, [soundOn]);
  return { click, success, flutter };
}

// ===== EXPLORER: phylogenetic tree explorer =====
//
// The explorer is a tutorial-style view: every species in the dataset is reachable
// by walking down from Insecta through the taxonomic ranks. Each clade can be
// expanded with a "+" button. Leaves (species) are clickable and open a detail
// pane with the photo, scientific name, taxonomy and fun fact.
//
// A search bar with autocomplete lets the user jump to any clade or species name.
// Searching a clade auto-expands the tree from Insecta down to that clade's IMMEDIATE
// children (not all descendants), so the user can see what's directly inside.

function buildExplorerTree(species) {
  // Root: Insecta
  const root = { name: 'Insecta', rank: 'Class', children: new Map(), species: null, fullPath: ['Insecta'] };
  for (const s of species) {
    const path = getFullPath(s); // [['Class','Insecta'], ..., ['Species', 'Apis mellifera']]
    let cur = root;
    for (let i = 1; i < path.length; i++) {
      const [rank, name] = path[i];
      if (!cur.children.has(name)) {
        cur.children.set(name, {
          name, rank,
          children: new Map(),
          species: null,
          fullPath: [...cur.fullPath, name],
        });
      }
      cur = cur.children.get(name);
    }
    // cur is now the species leaf node
    cur.species = s;
  }
  // Sort children alphabetically (case-insensitive) at every level for stable display
  function sortAll(node) {
    node.children = new Map(
      [...node.children.entries()].sort(([a], [b]) => a.toLowerCase().localeCompare(b.toLowerCase()))
    );
    for (const c of node.children.values()) sortAll(c);
  }
  sortAll(root);
  return root;
}

// Walk the tree and collect every node into a flat list for search autocomplete.
function flattenNodes(root) {
  const out = [];
  function walk(node) {
    out.push(node);
    for (const c of node.children.values()) walk(c);
  }
  walk(root);
  return out;
}

// Find the path of nodes from root to a node whose `name` matches the given string (case-insensitive).
// Returns array of nodes from root inclusive, or null if not found.
function findNodePath(root, name) {
  const target = name.toLowerCase();
  let result = null;
  function walk(node, path) {
    if (result) return;
    const newPath = [...path, node];
    if (node.name.toLowerCase() === target) {
      result = newPath;
      return;
    }
    for (const c of node.children.values()) walk(c, newPath);
  }
  walk(root, []);
  return result;
}

// Format a species's lineage as breadcrumb-style rows for the detail view.
function buildSpeciesTaxoRows(sp) {
  return [
    ['Class', 'Insecta'],
    ...sp.lineage,
    ['Genus', sp.genus],
    ['Species', sp.scientificName],
  ];
}

// ----- Tree node component (recursive) -----
function ExplorerNode({ node, depth, expanded, onToggle, onSelectSpecies, highlightId }) {
  const hasChildren = node.children.size > 0;
  const isExpanded = expanded.has(node.fullPath.join('/'));
  const isSpecies = !!node.species;
  const isHighlighted = highlightId && (node.fullPath.join('/') === highlightId);

  // For species nodes, display the common name (and the scientific name as suffix in italic).
  // For internal clade nodes, display the rank + clade name.
  return (
    <div className={'bd-exp-node-row' + (isHighlighted ? ' highlighted' : '')}>
      <div className="bd-exp-node-inner" style={{ paddingLeft: depth * 16 }}>
        {hasChildren ? (
          <button
            className={'bd-exp-toggle' + (isExpanded ? ' expanded' : '')}
            onClick={() => onToggle(node.fullPath.join('/'))}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minus size={12} /> : <Plus size={12} />}
          </button>
        ) : (
          <span className="bd-exp-toggle-spacer" />
        )}
        {isSpecies ? (
          <button
            className="bd-exp-species"
            onClick={() => onSelectSpecies(node.species)}
            title={`Show details for ${node.species.common}`}
          >
            <span className="bd-exp-species-common">{node.species.common}</span>
            <span className="bd-exp-species-sci">{node.species.scientificName}</span>
          </button>
        ) : (
          <span className="bd-exp-clade">
            <span className="bd-exp-clade-rank">{RANK_LABEL[node.rank] || node.rank}</span>
            <span
              className="bd-exp-clade-name"
              style={{ fontStyle: (node.rank === 'Genus') ? 'italic' : 'normal' }}
            >
              {node.name}
            </span>
            {hasChildren && (
              <span className="bd-exp-clade-count">{countLeaves(node)} sp.</span>
            )}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="bd-exp-children">
          {[...node.children.values()].map((c) => (
            <ExplorerNode
              key={c.fullPath.join('/')}
              node={c}
              depth={depth + 1}
              expanded={expanded}
              onToggle={onToggle}
              onSelectSpecies={onSelectSpecies}
              highlightId={highlightId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Count the species leaves under a node (cached on first call).
function countLeaves(node) {
  if (node._leafCount != null) return node._leafCount;
  if (node.species) { node._leafCount = 1; return 1; }
  let n = 0;
  for (const c of node.children.values()) n += countLeaves(c);
  node._leafCount = n;
  return n;
}

// ----- Detail pane for one species (right side or bottom on mobile) -----
function ExplorerDetail({ species, onClose }) {
  if (!species) return null;
  const taxoRows = buildSpeciesTaxoRows(species);
  return (
    <div className="bd-exp-detail">
      <button className="bd-modal-close" onClick={onClose} title="Close detail"><X size={18} /></button>
      <div className="bd-end-title" style={{ marginBottom: 6, fontSize: 22 }}>{species.common}</div>
      <div className="bd-end-sub" style={{ marginBottom: 12 }}>
        <span className="bd-sci">{species.scientificName}</span>
      </div>
      <SpeciesImageBlock species={species} />
      {species.fact && (
        <div className="bd-end-fact">
          <Lightbulb size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
          {species.fact}
        </div>
      )}
      <div className="bd-end-taxo">
        <div className="bd-end-taxo-title">Full taxonomy</div>
        {taxoRows.map(([rank, name]) => (
          <div key={rank} className="bd-end-taxo-row">
            <span className="bd-end-taxo-rank">{RANK_LABEL[rank] || rank}</span>
            <span
              className="bd-end-taxo-name"
              style={{ fontStyle: (rank === 'Genus' || rank === 'Species') ? 'italic' : 'normal' }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----- Main Explorer view (replaces game screen) -----
function Explorer({ onBack }) {
  const tree = useMemo(() => buildExplorerTree(SPECIES), []);
  const allNodes = useMemo(() => flattenNodes(tree), [tree]);
  const [expanded, setExpanded] = useState(() => new Set(['Insecta']));
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const toggle = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Autocomplete suggestions — filter all nodes by name substring (case-insensitive).
  // Show up to 12 results, prefer prefix matches first, then substring matches.
  const suggestions = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return [];
    const prefix = [];
    const inner = [];
    for (const n of allNodes) {
      // Match common name for species leaves, or clade name for internals
      const display = n.species ? n.species.common : n.name;
      const sci = n.species ? n.species.scientificName : '';
      const lc = display.toLowerCase();
      const sciLc = sci.toLowerCase();
      if (lc.startsWith(q) || sciLc.startsWith(q)) prefix.push(n);
      else if (lc.includes(q) || sciLc.includes(q)) inner.push(n);
      if (prefix.length >= 20) break;
    }
    return [...prefix, ...inner].slice(0, 12);
  }, [searchValue, allNodes]);

  // When user picks a suggestion: expand ancestors, plus the node ITSELF (so its
  // immediate children are visible). Then highlight + scroll into view.
  const pickSuggestion = useCallback((node) => {
    setSearchValue('');
    setSearchOpen(false);
    // RESET the expanded set: only keep the ancestors of the chosen node, and the node
    // itself if it's an internal clade (so its direct children become visible).
    // Any previous manual or searched expansions are discarded — each new search starts
    // from a clean tree with only the searched branch open.
    setExpanded(() => {
      const next = new Set();
      // Ancestors: every prefix of fullPath becomes its own node id (e.g. 'Insecta',
      // 'Insecta/Pterygota', 'Insecta/Pterygota/Neoptera', ...).
      for (const ancestorId of node.fullPath.map((_, i, arr) => arr.slice(0, i + 1).join('/'))) {
        next.add(ancestorId);
      }
      // Also expand the node itself so its direct children show, UNLESS it's a species leaf
      if (!node.species && node.children.size > 0) {
        next.add(node.fullPath.join('/'));
      }
      return next;
    });
    // If it's a species, open the detail pane
    if (node.species) {
      setSelectedSpecies(node.species);
    } else {
      setHighlightId(node.fullPath.join('/'));
      // Clear highlight after 2 seconds
      setTimeout(() => setHighlightId(null), 2200);
    }
  }, []);

  return (
    <div className="bd-shell">
      <header className="bd-header bd-exp-header">
        <div className="bd-logo-wrap">
          <BugdleLogo />
          <div className="bd-day-tag">
            <TreePine size={11} /> Explore
          </div>
        </div>
        <div className="bd-actions">
          <button className="bd-btn" onClick={onBack}>
            <ArrowLeft size={14} /> Back to game
          </button>
        </div>
      </header>

      <div className="bd-exp-layout">
        {/* Left: tree */}
        <div className="bd-section bd-exp-tree-wrap">
          <h3 className="bd-section-title"><TreePine size={14} /> Tree of life</h3>
          <div className="bd-exp-search">
            <Search size={14} style={{ color: 'var(--sepia)' }} />
            <input
              type="text"
              placeholder="Search any clade or species…"
              value={searchValue}
              onChange={(e) => { setSearchValue(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
              className="bd-exp-search-input"
            />
            {searchValue && (
              <button className="bd-exp-search-clear" onClick={() => { setSearchValue(''); setSearchOpen(false); }}>
                <X size={12} />
              </button>
            )}
            {searchOpen && suggestions.length > 0 && (
              <div className="bd-exp-suggestions">
                {suggestions.map((n) => (
                  <button
                    key={n.fullPath.join('/')}
                    className="bd-exp-suggestion"
                    onMouseDown={(e) => { e.preventDefault(); pickSuggestion(n); }}
                  >
                    {n.species ? (
                      <>
                        <span className="bd-exp-sugg-common">{n.species.common}</span>
                        <span className="bd-exp-sugg-sci">{n.species.scientificName}</span>
                      </>
                    ) : (
                      <>
                        <span className="bd-exp-sugg-rank">{RANK_LABEL[n.rank] || n.rank}</span>
                        <span
                          className="bd-exp-sugg-name"
                          style={{ fontStyle: (n.rank === 'Genus') ? 'italic' : 'normal' }}
                        >
                          {n.name}
                        </span>
                        <span className="bd-exp-sugg-count">{countLeaves(n)} sp.</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bd-exp-tree-scroll">
            <ExplorerNode
              node={tree}
              depth={0}
              expanded={expanded}
              onToggle={toggle}
              onSelectSpecies={(s) => setSelectedSpecies(s)}
              highlightId={highlightId}
            />
          </div>

          <div className="bd-exp-hint">
            <Lightbulb size={12} style={{ verticalAlign: -2, marginRight: 4 }} />
            Tap a <strong>+</strong> to expand a clade. Click any species (italic name) to see its photo and full taxonomy.
          </div>
        </div>

        {/* Right: detail */}
        {selectedSpecies && (
          <ExplorerDetail
            species={selectedSpecies}
            onClose={() => setSelectedSpecies(null)}
          />
        )}
        {!selectedSpecies && (
          <div className="bd-exp-detail-placeholder">
            <TreePine size={36} strokeWidth={1.2} />
            <div style={{ marginTop: 12 }}>Select a species in the tree to see its details.</div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7, fontStyle: 'italic' }}>
              365 insect species across {tree.children.size} subclasses are waiting.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ===== MAIN GAME =====
function Bugdle() {
  const [target, setTarget] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [activeGuessId, setActiveGuessId] = useState(null);
  // When the game ends in a loss, the answer stays hidden until the user clicks "Reveal answer".
  // On a win, the answer reveals automatically.
  const [mysteryRevealed, setMysteryRevealed] = useState(false);

  const [soundOn, setSoundOn] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAch, setShowAch] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const [trainingMode, setTrainingMode] = useState(false);
  const [funFactUnlocked, setFunFactUnlocked] = useState(false);
  const [revealedRankIdx, setRevealedRankIdx] = useState(-1);
  const [extraCost, setExtraCost] = useState(0);
  const [toast, setToast] = useState(null);

  // Persisted stats
  const [stats, setStats] = useState({
    wins: 0,
    losses: 0,
    streak: 0,
    bestStreak: 0,
    achievements: [],
    achievementProgress: {
      pollinatorGenera: [],
      globetrotterRegions: [],
      bugMasterOrders: [],
      davidGoliathSides: [],
    },
  });
  const [statsLoaded, setStatsLoaded] = useState(false);

  const sounds = useSounds(soundOn);

  // Load stats once
  useEffect(() => {
    (async () => {
      const loaded = await loadStore('bugdle_stats', null);
      if (loaded) setStats((prev) => ({
        ...prev, ...loaded,
        achievementProgress: { ...prev.achievementProgress, ...(loaded.achievementProgress || {}) }
      }));
      const so = await loadStore('bugdle_sound', false);
      setSoundOn(so);
      setStatsLoaded(true);
    })();
  }, []);

  // Save stats
  useEffect(() => { if (statsLoaded) saveStore('bugdle_stats', stats); }, [stats, statsLoaded]);
  useEffect(() => { if (statsLoaded) saveStore('bugdle_sound', soundOn); }, [soundOn, statsLoaded]);

  // Today's UTC date key — recomputed each render so we naturally pick up day rollover
  // if the user keeps the tab open across midnight UTC.
  const todayKey = utcDateKey();

  // Start a new game.
  //   training=true  → random species, no persistence, doesn't count toward stats.
  //   training=false → today's daily species. Refuses if the daily was already completed.
  const newGame = useCallback((training) => {
    if (training) {
      const t = SPECIES[Math.floor(Math.random() * SPECIES.length)];
      setTarget(t);
      setGuesses([]);
      setInputValue('');
      setSelectedSpecies(null);
      setGameOver(false);
      setWon(false);
      setShowEnd(false);
      setActiveGuessId(null);
      setMysteryRevealed(false);
      setFunFactUnlocked(false);
      setRevealedRankIdx(-1);
      setExtraCost(0);
      setTrainingMode(true);
      return;
    }
    // Daily challenge mode
    const idx = getDailyTargetIndex(new Date());
    const t = SPECIES[idx];
    setTarget(t);
    setGuesses([]);
    setInputValue('');
    setSelectedSpecies(null);
    setGameOver(false);
    setWon(false);
    setShowEnd(false);
    setActiveGuessId(null);
    setMysteryRevealed(false);
    setFunFactUnlocked(false);
    setRevealedRankIdx(-1);
    setExtraCost(0);
    setTrainingMode(false);
  }, []);

  // Load saved daily game on mount.
  // If there's a saved game whose date matches today → restore it.
  // Otherwise start a fresh daily.
  useEffect(() => {
    if (!statsLoaded || target) return;
    (async () => {
      const saved = await loadStore('bugdle_daily', null);
      if (saved && saved.date === todayKey && saved.targetId != null) {
        const t = SPECIES.find((s) => s.id === saved.targetId);
        if (t) {
          setTarget(t);
          setGuesses((saved.guessIds || []).map((id) => SPECIES.find((s) => s.id === id)).filter(Boolean));
          setGameOver(!!saved.gameOver);
          setWon(!!saved.won);
          setMysteryRevealed(!!saved.mysteryRevealed);
          setRevealedRankIdx(saved.revealedRankIdx ?? -1);
          setExtraCost(saved.extraCost || 0);
          setFunFactUnlocked(!!saved.funFactUnlocked);
          setTrainingMode(false);
          // If the saved game was already finished, show the end screen on resume.
          if (saved.gameOver) {
            setTimeout(() => setShowEnd(true), 300);
          }
          return;
        }
      }
      // Fresh daily
      newGame(false);
    })();
  }, [statsLoaded, target, newGame, todayKey]);

  // Persist daily game state whenever it changes (but NOT when in training mode).
  useEffect(() => {
    if (!statsLoaded || !target || trainingMode) return;
    saveStore('bugdle_daily', {
      date: todayKey,
      targetId: target.id,
      guessIds: guesses.map((g) => g.id),
      gameOver,
      won,
      mysteryRevealed,
      revealedRankIdx,
      extraCost,
      funFactUnlocked,
    });
  }, [statsLoaded, target, guesses, gameOver, won, mysteryRevealed, revealedRankIdx, extraCost, funFactUnlocked, trainingMode, todayKey]);

  // Whether today's daily challenge is already completed (won or lost).
  // When true, the "New" button switches behaviour: it can only launch practice mode.
  const dailyDoneToday = !trainingMode && gameOver;

  // Smart "new game" entry point used by the header New button and the EndScreen.
  // Rule: the daily puzzle is once per day. The "New" button never resets an
  // in-progress daily. Behaviour:
  // - If user is in training mode → start another training round.
  // - If today's daily is done → start training (with a toast).
  // - If today's daily is in progress → start training (preserves the daily for resume).
  const startNewGame = useCallback(() => {
    if (trainingMode) {
      newGame(true);
      return;
    }
    if (dailyDoneToday) {
      newGame(true);
      setToast({ message: "Today's puzzle is done — practice mode started", icon: '🏋️' });
      return;
    }
    // Daily in progress → switch to practice, daily is preserved in storage and can be
    // resumed later via the "Today's puzzle" button in the practice banner.
    newGame(true);
    setToast({ message: 'Daily paused — practice mode started', icon: '🏋️' });
  }, [trainingMode, dailyDoneToday, newGame]);

  // Submit guess
  const submitGuess = () => {
    if (!selectedSpecies || gameOver) return;
    if (guesses.some((g) => g.id === selectedSpecies.id)) {
      setToast({ message: 'Already guessed', icon: '⚠️' });
      setInputValue('');
      setSelectedSpecies(null);
      return;
    }
    const newGuesses = [...guesses, selectedSpecies];
    setGuesses(newGuesses);
    setInputValue('');
    setSelectedSpecies(null);
    sounds.click();

    if (selectedSpecies.id === target.id) {
      setGameOver(true);
      setWon(true);
      setMysteryRevealed(true);  // win reveals immediately
      setTimeout(() => setShowEnd(true), 1500);
      sounds.success();
      if (!trainingMode) updateStatsOnWin(newGuesses.length, target);
    } else if (newGuesses.length + extraCost >= MAX_ATTEMPTS) {
      setGameOver(true);
      setWon(false);
      // mysteryRevealed stays false — user reveals manually
      setTimeout(() => setShowEnd(true), 900);
      if (!trainingMode) updateStatsOnLoss();
    }
    setActiveGuessId(selectedSpecies.id);
  };

  const updateStatsOnWin = (numGuesses, won_target) => {
    setStats((prev) => {
      const newStreak = prev.streak + 1;
      const newWins = prev.wins + 1;
      const ach = new Set(prev.achievements);
      // Use Sets internally to keep updater idempotent under React StrictMode (which
      // invokes the updater twice in dev).
      const prog = { ...prev.achievementProgress };
      const pollSet = new Set(prog.pollinatorGenera || []);
      const globeSet = new Set(prog.globetrotterRegions || []);
      const masterSet = new Set(prog.bugMasterOrders || []);
      const dgSet = new Set(prog.davidGoliathSides || []);  // contains 'small' / 'big'

      ach.add('first_find');
      if (numGuesses <= 3) ach.add('sharpshooter');
      if (numGuesses === MAX_ATTEMPTS) ach.add('endurance');

      const order = won_target.lineage.find((p) => p[0] === 'Order');
      const superfam = won_target.lineage.find((p) => p[0] === 'Superfamily');

      // Pollinator: bees + wasps (whole order Hymenoptera) OR true butterflies
      // (Lepidoptera + Papilionoidea superfamily). Moths and other Lepidoptera
      // superfamilies don't count.
      const isPollinator =
        (order && order[1] === POLLINATOR_ORDER) ||
        (order && order[1] === 'Lepidoptera' && superfam && superfam[1] === POLLINATOR_SUPERFAMILY);
      if (isPollinator) {
        pollSet.add(won_target.genus);
        if (pollSet.size >= 5) ach.add('pollinator');
      }

      if (order && RARE_ORDERS.has(order[1])) ach.add('stargazer');
      for (const r of won_target.dist) globeSet.add(r);
      if (globeSet.size === 6) ach.add('globetrotter');
      if (won_target.hab.includes('AQU')) ach.add('aquanaut');
      if (won_target.diet.includes('CAR') && won_target.size[1] >= 50) ach.add('apex_predator');

      // David & Goliath: one of the top 5 smallest AND one of the top 5 biggest
      // (across separate wins; tracked via the dgSet inside achievementProgress).
      if (TOP5_SMALLEST.has(won_target.scientificName)) dgSet.add('small');
      if (TOP5_BIGGEST.has(won_target.scientificName)) dgSet.add('big');
      if (dgSet.has('small') && dgSet.has('big')) ach.add('david_goliath');

      // Bug Master: at least one win in every order present in the dataset.
      if (order) masterSet.add(order[1]);
      if (masterSet.size >= ALL_ORDERS.length) ach.add('bug_master');

      if (newStreak >= 10) ach.add('streak_master');
      if (newWins >= 50) ach.add('encyclopedist');

      const newlyUnlocked = [...ach].filter((id) => !prev.achievements.includes(id));
      if (newlyUnlocked.length > 0) {
        const first = ACHIEVEMENTS.find((a) => a.id === newlyUnlocked[0]);
        setTimeout(() => setToast({ message: `Achievement unlocked: ${first.name}`, icon: first.icon }), 1800);
      }

      return {
        ...prev,
        wins: newWins,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        achievements: [...ach],
        achievementProgress: {
          ...prog,
          pollinatorGenera: [...pollSet],
          globetrotterRegions: [...globeSet],
          bugMasterOrders: [...masterSet],
          davidGoliathSides: [...dgSet],
        },
      };
    });
  };
  const updateStatsOnLoss = () => {
    setStats((prev) => ({ ...prev, losses: prev.losses + 1, streak: 0 }));
  };

  const tradeForFunFact = () => {
    if (funFactUnlocked || gameOver || guesses.length === 0) return;
    const remaining = MAX_ATTEMPTS - guesses.length - extraCost;
    if (remaining <= 5) {
      setToast({ message: 'Not enough guesses left', icon: '⚠️' });
      return;
    }
    setFunFactUnlocked(true);
    setExtraCost((c) => c + 5);
    sounds.flutter();
    setToast({ message: 'Fun fact unlocked (−5 attempts)', icon: '✨' });
  };

  const tp = target ? getFullPath(target) : [];
  let deepestIdx = 0;
  for (const g of guesses) {
    const gp = getFullPath(g);
    const minLen = Math.min(gp.length, tp.length);
    for (let i = 0; i < minLen; i++) {
      if (gp[i][1] === tp[i][1]) {
        if (i > deepestIdx) deepestIdx = i;
      } else break;
    }
  }
  const effectiveIdx = Math.max(deepestIdx, revealedRankIdx);

  const tradeForReveal = () => {
    if (gameOver || !target) return;
    const nextIdx = effectiveIdx + 1;
    // Never reveal Genus (tp.length-2) or Species (tp.length-1) via hint —
    // since each genus has exactly one species in the game, revealing the genus would
    // give the answer away. The deepest revealable rank is the one just before Genus.
    if (nextIdx >= tp.length - 2) {
      setToast({ message: 'Cannot reveal further — too close to the answer!', icon: '⚠️' });
      return;
    }
    const remaining = MAX_ATTEMPTS - guesses.length - extraCost;
    if (remaining <= 3) {
      setToast({ message: 'Not enough guesses left', icon: '⚠️' });
      return;
    }
    setRevealedRankIdx(nextIdx);
    setExtraCost((c) => c + 3);
    sounds.flutter();
    const [rank, name] = tp[nextIdx];
    setToast({ message: `Hint: ${RANK_LABEL[rank] || rank} = ${name}`, icon: '🔍' });
  };

  const checkLossAfterTrade = useCallback(() => {
    if (!target || gameOver) return;
    if (extraCost > 0 && (guesses.length + extraCost) >= MAX_ATTEMPTS) {
      setGameOver(true);
      setWon(false);
      setTimeout(() => setShowEnd(true), 700);
      if (!trainingMode) updateStatsOnLoss();
    }
  }, [extraCost, guesses.length, target, gameOver, trainingMode]);
  useEffect(() => { checkLossAfterTrade(); }, [extraCost, checkLossAfterTrade]);

  const remaining = target ? MAX_ATTEMPTS - guesses.length - extraCost : MAX_ATTEMPTS;

  const tradeFactDisabled = funFactUnlocked || guesses.length === 0 || remaining <= 5 || gameOver;
  const tradeRevealDisabled = !target || gameOver || remaining <= 3 || effectiveIdx + 1 >= tp.length - 2;

  if (!statsLoaded || !target) {
    return (
      <div className="bd-root">
        <div className="bd-shell">
          <div style={{ padding: 40, textAlign: 'center', fontFamily: 'Fraunces, serif', color: 'var(--sepia)' }}>
            Loading…
          </div>
        </div>
      </div>
    );
  }

  // Show the tree explorer as a full-screen replacement of the game view.
  if (showExplorer) {
    return (
      <div className="bd-root">
        <style>{STYLES}</style>
        <BackgroundDecorations />
        <Toast message={toast?.message} icon={toast?.icon} onDone={() => setToast(null)} />
        <Explorer onBack={() => setShowExplorer(false)} />
      </div>
    );
  }

  return (
    <div className="bd-root">
      <style>{STYLES}</style>
      <BackgroundDecorations />
      <Confetti active={won} />
      <Toast message={toast?.message} icon={toast?.icon} onDone={() => setToast(null)} />

      <div className="bd-shell">
        <header className="bd-header">
          <div className="bd-logo-wrap">
            <BugdleLogo />
            <div className="bd-day-tag">
              {trainingMode ? <><Dumbbell size={11} /> Practice</> : `Daily · ${todayKey}`}
            </div>
          </div>
          <div className="bd-actions">
            <div className="bd-stats">
              <span>🏆 <strong>{stats.wins}</strong></span>
              <span className="sep">·</span>
              <span>🔥 <strong>{stats.streak}</strong></span>
              <span className="sep">·</span>
              <span title="Attempts left">📜 <strong>{remaining}</strong></span>
            </div>
            <button
              className={'bd-icon-btn'}
              onClick={startNewGame}
              title={trainingMode ? 'New practice round' : (dailyDoneToday ? "Today's daily is done — switch to practice" : 'Practice round (preserves your daily progress)')}
            >
              <Dumbbell size={16} />
            </button>
            <button className="bd-icon-btn" onClick={() => setSoundOn(!soundOn)} title={soundOn ? 'Mute' : 'Unmute'}>
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button className="bd-icon-btn" onClick={() => setShowExplorer(true)} title="Explore the tree of life — browse and learn"><TreePine size={16} /></button>
            <button className="bd-icon-btn" onClick={() => setShowAch(true)} title="Achievements"><Award size={16} /></button>
            <button className="bd-icon-btn" onClick={() => setShowHelp(true)} title="How to play"><HelpCircle size={16} /></button>
          </div>
        </header>

        {trainingMode && (
          <div style={{
            marginBottom: 18,
            padding: '10px 14px',
            background: 'var(--cream-deep)',
            border: '1px dashed var(--ochre)',
            borderRadius: 10,
            fontFamily: 'Fraunces, serif',
            fontSize: 13,
            color: 'var(--sepia-dark)',
            fontStyle: 'italic',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <Dumbbell size={14} style={{ color: 'var(--ochre)' }} />
            <span style={{ flex: 1 }}>Practice mode is on — this round will not be recorded in your statistics.</span>
            <button
              className="bd-btn"
              style={{ fontStyle: 'normal' }}
              onClick={async () => {
                // Switch back to today's daily.
                // - If a saved daily for today exists (in-progress OR finished) → resume it.
                // - Otherwise → start a fresh daily.
                const saved = await loadStore('bugdle_daily', null);
                if (saved && saved.date === todayKey && saved.targetId != null) {
                  const t = SPECIES.find((s) => s.id === saved.targetId);
                  if (t) {
                    setTarget(t);
                    setGuesses((saved.guessIds || []).map((id) => SPECIES.find((s) => s.id === id)).filter(Boolean));
                    setGameOver(!!saved.gameOver);
                    setWon(!!saved.won);
                    setMysteryRevealed(!!saved.mysteryRevealed);
                    setRevealedRankIdx(saved.revealedRankIdx ?? -1);
                    setExtraCost(saved.extraCost || 0);
                    setFunFactUnlocked(!!saved.funFactUnlocked);
                    setTrainingMode(false);
                    setInputValue('');
                    setSelectedSpecies(null);
                    setActiveGuessId(null);
                    if (saved.gameOver) {
                      setToast({ message: "Today's daily is already done — come back tomorrow", icon: '🌙' });
                      setTimeout(() => setShowEnd(true), 300);
                    } else {
                      setShowEnd(false);
                    }
                    return;
                  }
                }
                newGame(false);
              }}
              title="Return to today's daily puzzle"
            >
              Today's puzzle
            </button>
          </div>
        )}

        <div className="bd-main">
          {/* LEFT COLUMN */}
          <div>
            {/* GUESS INPUT - now ABOVE the tree */}
            <div className="bd-section" style={{ marginBottom: 18 }}>
              <h3>Your Guess <span className="bd-count">{guesses.length}/{MAX_ATTEMPTS} used</span></h3>
              <Autocomplete
                value={inputValue}
                onChange={(v) => { setInputValue(v); if (selectedSpecies && v !== selectedSpecies.common) setSelectedSpecies(null); }}
                onSelect={setSelectedSpecies}
                disabled={gameOver}
                alreadyGuessed={guesses.map((g) => g.id)}
              />
              <div className="bd-submit-row">
                <button className="bd-btn primary" onClick={submitGuess} disabled={!selectedSpecies || gameOver}>
                  Submit
                </button>
                <button
                  className="bd-btn"
                  onClick={tradeForReveal}
                  disabled={tradeRevealDisabled}
                  title="Spend 3 attempts to reveal the next taxonomic rank toward the answer"
                >
                  <Flag size={14} /> Hint (−3 attempts)
                </button>
                <button
                  className="bd-btn"
                  onClick={tradeForFunFact}
                  disabled={tradeFactDisabled}
                  title="Spend 5 attempts for a surprising fact about the mystery species"
                >
                  <Sparkles size={14} /> Fact (−5 attempts)
                </button>
              </div>
              {revealedRankIdx >= 0 && !gameOver && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--cream-deep)', borderRadius: 8, borderLeft: '3px solid var(--ochre)', fontFamily: 'Fraunces, serif', fontSize: 13, color: 'var(--ink)' }}>
                  <strong>Revealed hint:</strong>{' '}
                  {(() => {
                    const [rank, name] = tp[revealedRankIdx];
                    return <>{RANK_LABEL[rank] || rank} = <span style={{ fontStyle: 'italic' }}>{name}</span></>;
                  })()}
                </div>
              )}
              {funFactUnlocked && !gameOver && (
                <div style={{ marginTop: 8, padding: '10px 14px', background: 'var(--cream-deep)', borderRadius: 8, borderLeft: '3px solid var(--ochre)', fontFamily: 'Fraunces, serif', fontSize: 13, color: 'var(--ink)', fontStyle: 'italic' }}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 6, color: 'var(--ochre)', verticalAlign: -1 }} />
                  {target.fact}
                </div>
              )}
            </div>

            {/* TREE */}
            <div className="bd-section">
              <h3><GitBranch size={14} /> Tree</h3>
              <TaxoTree
                guesses={guesses}
                target={target}
                gameOver={gameOver}
                won={won}
                revealedRankIdx={revealedRankIdx}
                mysteryRevealed={mysteryRevealed}
                onGuessClick={(id) => { setActiveGuessId(id); sounds.click(); }}
                activeGuessId={activeGuessId}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: GUESSES */}
          <div className="bd-section">
            <h3>Your Guesses <span className="bd-count">{guesses.length}/{MAX_ATTEMPTS}</span></h3>
            {guesses.length === 0 ? (
              <div className="bd-empty-state">
                <Sparkles size={28} strokeWidth={1.3} />
                <div>No guesses yet.</div>
                <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>Start with a species you know well.</div>
              </div>
            ) : (
              <>
                <div className="bd-guess-list">
                  {[...guesses].reverse().map((g, i) => {
                    const lca = lowestCommon(g, target);
                    const idxFromStart = guesses.length - 1 - i + 1;
                    const isMatch = g.id === target.id;
                    const isLcaScientific = lca[0] === 'Genus' || lca[0] === 'Species';
                    return (
                      <div
                        key={g.id}
                        className={'bd-guess ' + (activeGuessId === g.id ? 'active' : '')}
                        onClick={() => setActiveGuessId(g.id)}
                      >
                        <div className="bd-guess-head">
                          <div>
                            <span className="bd-guess-name">{idxFromStart}. {g.common}</span>{' '}
                            <span className="bd-guess-sci">({g.scientificName})</span>
                          </div>
                          <span className={'bd-guess-rank ' + (isMatch ? 'win' : '')}>
                            {isMatch ? '★ Found!' : (
                              lca[0] === 'Class'
                                ? 'Insecta'
                                : <>
                                    {RANK_LABEL[lca[0]] || lca[0]}:{' '}
                                    <span style={{ fontStyle: isLcaScientific ? 'italic' : 'normal' }}>{lca[1]}</span>
                                  </>
                            )}
                          </span>
                        </div>
                        <HintGrid guess={g} target={target} />
                      </div>
                    );
                  })}
                </div>
                <HintLegend />
              </>
            )}
          </div>
        </div>
      </div>

      {showEnd && (
        <EndScreen
          won={won}
          target={target}
          guesses={guesses}
          revealed={mysteryRevealed}
          onReveal={() => setMysteryRevealed(true)}
          onClose={() => setShowEnd(false)}
          onNewGame={() => {
            // After a finished daily, "new game" can only mean training.
            // After a training round, another training round.
            newGame(true);
          }}
          totalStats={stats}
          isTraining={trainingMode}
        />
      )}

      {showHelp && (
        <div className="bd-modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="bd-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bd-modal-close" onClick={() => setShowHelp(false)}><X size={18} /></button>
            <h2>How to play</h2>
            <div className="bd-help">
              <p>
                Bugdle challenges you to find the <strong>mystery insect of the day</strong> among 365 candidates.
                You have <strong>20 attempts</strong>. After each guess the tree grows toward the answer
                and four colour-coded hints appear.
              </p>
              <h3>Daily challenge</h3>
              <p>
                Everyone in the world plays the same species each day. Once you've solved (or failed)
                today's puzzle, come back tomorrow for the next one — or switch to <strong>Practice mode</strong>
                (dumbbell icon) for unlimited rounds that don't affect your statistics.
              </p>
              <h3>The colour code</h3>
              <p>
                <span className="bd-help-hint" style={{ background: 'var(--green-dark)' }}></span><strong>Dark green</strong> — exactly the same value as the target.<br />
                <span className="bd-help-hint" style={{ background: 'var(--green-light)' }}></span><strong>Light green</strong> — partially correct (some elements match, but not all).<br />
                <span className="bd-help-hint" style={{ background: 'var(--yellow)' }}></span><strong>Yellow</strong> — close: an adjacent biogeographic realm for distribution, or size off by less than 2×.<br />
                <span className="bd-help-hint" style={{ background: 'var(--red)' }}></span><strong>Red</strong> — no match at all.
              </p>
              <p>
                For <strong>size</strong>, an arrow ↑ means the target is larger than your guess, ↓ smaller.
              </p>
              <h3>The taxonomic tree</h3>
              <p>
                Every species you guess appears as a leaf. The mystery species is marked with <strong>"?"</strong>
                and slides down to the deepest shared clade as you narrow in on it. Only the
                <em> branching points</em> (last common ancestor between two leaves) and any rank explicitly
                revealed via Hint are labelled.
              </p>
              <h3>Trades</h3>
              <p>
                <strong>Hint (−3 attempts)</strong>: reveal the next taxonomic rank toward the answer.<br />
                <strong>Fact (−5 attempts)</strong>: unlock a surprising fact about the mystery species.
              </p>
              <h3>Practice mode</h3>
              <p>
                Click the dumbbell icon to pull a random species at any time — practice rounds don't affect your statistics
                or your daily challenge. Use them as warm-up before tomorrow's puzzle.
              </p>
              <h3>Explore the tree</h3>
              <p>
                Tap the tree icon in the header to open the <strong>tree of life explorer</strong>: a study and review mode where
                you can browse every species in the game by unfolding clades from <em>Insecta</em> downward.
                Use the search bar to jump to any clade or species — searching auto-expands the path to it and
                reveals its direct subclades. Click any species to see its photo, fact and full taxonomy.
              </p>
            </div>
          </div>
        </div>
      )}

      {showAch && (
        <div className="bd-modal-overlay" onClick={() => setShowAch(false)}>
          <div className="bd-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bd-modal-close" onClick={() => setShowAch(false)}><X size={18} /></button>
            <h2>Achievements</h2>
            <div style={{ fontSize: 13, color: 'var(--sepia-dark)', fontFamily: 'Fraunces, serif', marginBottom: 14 }}>
              {stats.achievements.length} / {ACHIEVEMENTS.length} unlocked
              {stats.achievementProgress.pollinatorGenera?.length > 0 && stats.achievementProgress.pollinatorGenera.length < 5 && (
                <div style={{ fontStyle: 'italic', marginTop: 4, fontSize: 12 }}>
                  Pollinator: {stats.achievementProgress.pollinatorGenera.length}/5
                </div>
              )}
              {stats.achievementProgress.globetrotterRegions?.length > 0 && stats.achievementProgress.globetrotterRegions.length < 6 && (
                <div style={{ fontStyle: 'italic', marginTop: 4, fontSize: 12 }}>
                  Globetrotter: {stats.achievementProgress.globetrotterRegions.length}/6 regions
                </div>
              )}
              {stats.achievementProgress.bugMasterOrders?.length > 0 && stats.achievementProgress.bugMasterOrders.length < ALL_ORDERS.length && (
                <div style={{ fontStyle: 'italic', marginTop: 4, fontSize: 12 }}>
                  Bug Master: {stats.achievementProgress.bugMasterOrders.length}/{ALL_ORDERS.length} orders
                </div>
              )}
            </div>
            <AchievementsPanel unlocked={stats.achievements} />
            <div style={{ fontSize: 11, fontFamily: 'Fraunces, serif', fontStyle: 'italic', marginTop: 16, color: 'var(--sepia)' }}>
              Hover a badge for its description.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bugdle;

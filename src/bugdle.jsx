import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext } from 'react';
import { Volume2, VolumeX, Sparkles, GitBranch, Award, RotateCcw, Lightbulb, ChevronUp, ChevronDown, ChevronRight, X, Flag, Dumbbell, HelpCircle, Search, ArrowLeft, TreePine, Plus, Minus, Globe, Cloud, User, BarChart3 } from 'lucide-react';

// ===== EMBEDDED DATA =====
// 295 insect species (one per genus) with NCBI-style lineages, traits, fun facts.
const SPECIES_DATA_STRING = `[{"id":"Pseudomyrmex","common":"Acacia ant","genus":"Pseudomyrmex","species":"ferruginea","scientificName":"Pseudomyrmex ferruginea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Pseudomyrmecinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lives exclusively inside hollow swollen thorns of bull-horn acacias","habSame":true,"diet":["OMN"],"size":[5,8],"fact":"Lives only inside the hollow thorns of one specific Central American tree, which has evolved to grow those very thorns and to produce sugary leaf-nectar just to feed and house this ant — a textbook mutualism so tight that neither partner survives without the other.","commonFr":"Fourmi de l'acacia","factFr":"Vit uniquement dans les épines creuses d'un arbre centraméricain bien précis, qui a évolué pour produire ces épines et un nectar foliaire sucré juste pour la nourrir et l'abriter — un mutualisme si serré que ni l'un ni l'autre ne survit sans son partenaire."},{"id":"Curculio","common":"Acorn weevil","genus":"Curculio","species":"glandium","scientificName":"Curculio glandium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Tribe","Curculionini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva develops inside acorn","habSame":true,"diet":["HER"],"size":[6,11],"fact":"Their incredibly long snouts (rostrums) are used to drill into acorns and deposit eggs deep inside.","commonFr":"Balanin des glands","factFr":"Sa femelle perce les jeunes fruits du chêne avec son rostre interminable — parfois plus long que son corps — pour y déposer un seul œuf, et l'asticot grandit confortablement dans le fruit en développement."},{"id":"Sphodromantis","common":"African mantis","genus":"Sphodromantis","species":"viridis","scientificName":"Sphodromantis viridis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Mantinae"],["Tribe","Paramantini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[55,90],"fact":"A common pet species — fast, bold, and willing to take large prey.","commonFr":"Mante africaine","factFr":"Robuste prédatrice d'embuscade d'Afrique de l'Ouest, prisée comme animal de compagnie pour sa robustesse et sa propension à dévorer presque tout ce qui passe à sa portée, y compris des sauterelles plus grosses qu'elle."},{"id":"Agrias","common":"Agrias butterfly","genus":"Agrias","species":"claudina","scientificName":"Agrias claudina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Charaxinae"],["Tribe","Anaeini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[80,95],"fact":"Among the most coveted butterflies in collections — a wing combining electric red, indigo and black panels that change pattern even between siblings of the same brood.","commonFr":"Agrias","factFr":"Lépidoptère amazonien dont les ailes inférieures portent un patchwork iridescent de cramoisi et de bleu cobalt — les collectionneurs payaient autrefois des sommes folles pour un seul spécimen."},{"id":"Sialis","common":"Alderfly","genus":"Sialis","species":"lutaria","scientificName":"Sialis lutaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Megaloptera"],["Family","Sialidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,20],"fact":"Larvae are top-tier underwater predators in still ponds.","commonFr":"Sialis","factFr":"Adulte fragile qui ne vit que quelques jours pour pondre, mais dont les larves prédatrices passent une à deux années sous la vase des rivières lentes à chasser de petits invertébrés aquatiques."},{"id":"Nicrophorus","common":"American burying beetle","genus":"Nicrophorus","species":"americanus","scientificName":"Nicrophorus americanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Staphylinoidea"],["Family","Silphidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Adults fly to find carcasses; larvae raised underground","habSame":false,"diet":["CAR"],"size":[25,35],"fact":"Pairs of parents cooperate to bury a small mammal carcass and feed regurgitated meat to their young.","commonFr":"Nécrophore d'Amérique","factFr":"Détecte une charogne de petit oiseau ou rongeur à des kilomètres grâce à ses antennes en éventail, puis avec son partenaire l'enterre en quelques heures et y élève ses larves nourries à la régurgitation."},{"id":"Periplaneta","common":"American cockroach","genus":"Periplaneta","species":"americana","scientificName":"Periplaneta americana","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Family","Blattidae"],["Tribe","Blattini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Glides rather than flies","habSame":true,"diet":["OMN"],"size":[35,40],"fact":"Can survive over a week without its head, eventually dying of thirst rather than injury.","commonFr":"Cafard américain","factFr":"Peut survivre plus d'une semaine sans tête — son système nerveux décentralisé continue à fonctionner jusqu'à mourir de soif faute de bouche pour boire."},{"id":"Macroxiphus","common":"Ant-mimic katydid","genus":"Macroxiphus","species":"sumatranus","scientificName":"Macroxiphus sumatranus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Nymphs mimic stinging ants","habSame":true,"diet":["HER"],"size":[40,60],"fact":"Hatchlings are dead ringers for fierce tropical ants — same shape, same jerky walk, same warning colours — until they finally moult into harmless leaf-green adults.","commonFr":"Sauterelle mime de fourmi","factFr":"Sa larve imite à la perfection une fourmi tisserande agressive, démarche saccadée comprise — c'est seulement à la dernière mue qu'elle révèle son vrai corps de longhorn-katydid."},{"id":"Acanthaspis","common":"Ant-pack assassin bug","genus":"Acanthaspis","species":"petax","scientificName":"Acanthaspis petax","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Subfamily","Reduviinae"],["Tribe","Acanthaspidini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Termite mounds and dry grassland in East Africa","habSame":true,"diet":["CAR"],"size":[10,16],"fact":"Its nymphs stack the empty bodies of their victims into a wobbling mound on their back — up to 20 carcasses glued together — apparently to confuse jumping spiders, which mistake the pile for a swarm and pass them by.","commonFr":"Réduve empilleur de fourmis","factFr":"Ses nymphes empilent sur leur dos les corps vidés de leurs victimes — jusqu'à 20 cadavres collés en pile branlante — apparemment pour brouiller la vue des araignées sauteuses, qui prennent le tas pour un essaim et passent leur chemin."},{"id":"Myrmeleon","common":"Antlion","genus":"Myrmeleon","species":"formicarius","scientificName":"Myrmeleon formicarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Myrmeleontiformia"],["Family","Myrmeleontidae"],["Tribe","Myrmeleontini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae dig sand-pit traps","habSame":false,"diet":["CAR"],"size":[25,40],"fact":"Larvae dig perfect funnel-shaped pits in sand and ambush insects that tumble in.","commonFr":"Fourmilion commun","factFr":"Sa larve creuse un entonnoir parfait dans le sable et attend cachée au fond ; toute fourmi qui glisse sur les parois est happée par des mandibules en faucille, suce, et son corps vidé est jeté hors du piège."},{"id":"Parnassius","common":"Apollo","genus":"Parnassius","species":"apollo","scientificName":"Parnassius apollo","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Parnassiinae"],["Tribe","Parnassiini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,80],"fact":"Lives only in high alpine zones and is one of the few butterflies that can fly in snowy weather.","commonFr":"Apollon","factFr":"Papillon des hauts alpages dont les ailes blanches portent des ocelles rouges spectaculaires — espèce protégée en Europe car le réchauffement climatique pousse ses populations toujours plus haut, jusqu'à les coincer au sommet."},{"id":"Rhagoletis","common":"Apple maggot","genus":"Rhagoletis","species":"pomonella","scientificName":"Rhagoletis pomonella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Tephritoidea"],["Family","Tephritidae"],["Tribe","Carpomyini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[4,7],"fact":"Different populations attack different fruits and may be on the way to becoming separate species.","commonFr":"Mouche de la pomme","factFr":"Cas d'école de spéciation en cours : la population originelle pondait dans les fruits sauvages, mais une lignée a basculé vers les pommiers introduits il y a 150 ans et ne se reproduit plus avec l'ancienne."},{"id":"Linepithema","common":"Argentine ant","genus":"Linepithema","species":"humile","scientificName":"Linepithema humile","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dolichoderinae"],["Tribe","Leptomyrmecini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[2,3],"fact":"Forms 'supercolonies' that span continents — workers from different colonies don't fight each other.","commonFr":"Fourmi d'Argentine","factFr":"Une seule super-colonie s'étend sur des milliers de kilomètres le long de la côte méditerranéenne ; toutes les ouvrières se reconnaissent comme parentes et ne se battent pas, ce qui leur a permis d'éradiquer la plupart des fourmis indigènes sur leur passage."},{"id":"Eciton","common":"Army ant","genus":"Eciton","species":"burchellii","scientificName":"Eciton burchellii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dorylinae"],["Tribe","Ecitonini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[4,14],"fact":"Doesn't build a permanent nest — instead the colony forms a living 'bivouac' shelter from their own bodies.","commonFr":"Fourmi légionnaire","factFr":"Sans nid permanent, elle construit un bivouac vivant fait de ses propres ouvrières enchaînées par les pattes, abritant reine et larves pendant que des colonnes de raid de 200 000 ouvrières ratissent la forêt."},{"id":"Diaphorina","common":"Asian citrus psyllid","genus":"Diaphorina","species":"citri","scientificName":"Diaphorina citri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Psylloidea"],["Family","Liviidae"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[3,4],"fact":"Transmits a bacterium responsible for citrus greening disease, devastating orange production.","commonFr":"Psylle asiatique des agrumes","factFr":"Transmet une maladie bactérienne dévastatrice aux vergers d'orangers et de citronniers, fait dépérir les arbres jusqu'à la mort — l'une des pires menaces pour l'industrie mondiale du jus."},{"id":"Anoplophora","common":"Asian longhorn beetle","genus":"Anoplophora","species":"glabripennis","scientificName":"Anoplophora glabripennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Lamiinae"],["Tribe","Lamiini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae tunnel inside live trees","habSame":false,"diet":["HER"],"size":[20,40],"fact":"One female can lay 90 eggs and the larvae bore for years inside tree trunks before emerging.","commonFr":"Capricorne asiatique","factFr":"Originaire d'Asie, ses larves dévorent l'intérieur des érables, peupliers et saules d'Amérique et d'Europe — l'éradication coûte des millions et nécessite parfois d'abattre tous les arbres d'un quartier entier."},{"id":"Chalcosoma","common":"Atlas beetle","genus":"Chalcosoma","species":"atlas","scientificName":"Chalcosoma atlas","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Dynastinae"],["Tribe","Dynastini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva in soil; adult on tree branches","habSame":false,"diet":["HER"],"size":[60,130],"fact":"Males engage in slow, sumo-like wrestling matches on tree branches, trying to pry rivals off with their massive horns.","commonFr":"Scarabée Atlas","factFr":"Les mâles portent trois cornes en fourche et s'affrontent sur les branches comme des dinosaures miniatures pour décrocher leurs adversaires — celui qui tombe perd la femelle."},{"id":"Attacus","common":"Atlas moth","genus":"Attacus","species":"atlas","scientificName":"Attacus atlas","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Attacini"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[240,280],"fact":"Adults have no working mouthparts and live just a week on stored fat.","commonFr":"Bombyx atlas","factFr":"L'un des plus grands papillons du monde par la surface alaire, avec des extrémités d'ailes qui imitent à s'y méprendre des têtes de cobra — adulte, il ne mange jamais et ne vit que deux semaines."},{"id":"Notonecta","common":"Backswimmer","genus":"Notonecta","species":"glauca","scientificName":"Notonecta glauca","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Notonectidae"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[12,17],"fact":"Swims upside-down using oar-like hind legs, looking up to spot prey above.","commonFr":"Notonecte glauque","factFr":"Nage sur le dos sous la surface d'un étang, ses longues pattes arrière en rames, scrutant la surface à l'envers pour repérer toute proie tombée à l'eau."},{"id":"Calopteryx","common":"Banded demoiselle","genus":"Calopteryx","species":"splendens","scientificName":"Calopteryx splendens","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Calopterygoidea"],["Family","Calopterygidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,50],"fact":"Males perform a fluttering 'butterfly dance' to attract females over streams.","commonFr":"Caloptéryx éclatant","factFr":"Le mâle paraît avoir des ailes en velours bleu nuit et patrouille un petit territoire le long des cours d'eau lents, qu'il défend contre tous les autres mâles par des combats aériens en spirale."},{"id":"Cimex","common":"Bed bug","genus":"Cimex","species":"lectularius","scientificName":"Cimex lectularius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Cimicoidea"],["Family","Cimicidae"],["Tribe","Cimicini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[4,7],"fact":"Reproduction is via 'traumatic insemination' — males stab females directly through the abdomen.","commonFr":"Punaise de lit","factFr":"La reproduction se fait par « insémination traumatique » : le mâle perce l'abdomen de la femelle avec un organe acéré au lieu d'utiliser l'appareil génital normal — un mode de reproduction sans équivalent chez les insectes domestiques courants."},{"id":"Bombylius","common":"Bee fly","genus":"Bombylius","species":"major","scientificName":"Bombylius major","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Asilomorpha"],["Family","Bombyliidae"],["Tribe","Bombyliini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae parasitise solitary bee larvae underground","habSame":false,"diet":["HER"],"size":[8,15],"fact":"Hovers and 'flicks' eggs into the burrows of solitary bees, where their larvae become parasites.","commonFr":"Bombyle bichon","factFr":"Vole en stationnaire au-dessus des terriers d'abeilles solitaires et y projette ses œufs en plein vol — ses larves s'y développent comme parasitoïdes. L'adulte, couvert de poils et imitant une abeille, est totalement inoffensif lui-même."},{"id":"Stylops","common":"Bee twisted-winged parasite","genus":"Stylops","species":"melittae","scientificName":"Stylops melittae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Strepsiptera"],["Family","Stylopidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[2,4],"fact":"So strange that biologists once thought they were lost relatives of beetles or flies.","commonFr":"Stylops des abeilles","factFr":"La femelle passe toute sa vie coincée dans l'abdomen d'une abeille hôte ; seule sa face dépasse pour s'accoupler, le reste du corps restant un sac parasite ancré dans son hôte."},{"id":"Philanthus","common":"Beewolf","genus":"Philanthus","species":"triangulum","scientificName":"Philanthus triangulum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Crabronidae"],["Tribe","Philanthini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,17],"fact":"Stings honey bees mid-flight, paralyses them, and stocks them as food for her young.","commonFr":"Philanthe apivore","factFr":"Surnommé localement « le loup des abeilles » : creuse un terrier dans le sable et l'approvisionne d'abeilles domestiques paralysées, capturées en plein vol près des ruches."},{"id":"Ornithoptera","common":"Birdwing","genus":"Ornithoptera","species":"alexandrae","scientificName":"Ornithoptera alexandrae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Troidini"]],"dist":["OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[150,280],"fact":"The world's largest butterfly, with a wingspan of nearly 30 cm — only females are this size.","commonFr":"Ornithoptère de la reine Alexandra","factFr":"Le plus grand papillon du monde, dont les femelles dépassent 25 cm d'envergure ; ne vole haut dans la canopée que de quelques vallées de Papouasie-Nouvelle-Guinée, et reste l'un des insectes les plus protégés de la planète."},{"id":"Culicoides","common":"Biting midge","genus":"Culicoides","species":"imicola","scientificName":"Culicoides imicola","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Ceratopogonidae"],["Tribe","Culicoidini"]],"dist":["AFR","PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[1,3],"fact":"Despite being only 1–3 mm, their bites cause intense itching and transmit several livestock viruses.","commonFr":"Moucheron piqueur","factFr":"Minuscule, à peine 1 mm, mais sa morsure douloureuse transmet la fièvre catarrhale aux ovins et bovins ; chaque année il fait perdre des millions à l'élevage méditerranéen."},{"id":"Peruphasma","common":"Black beauty stick insect","genus":"Peruphasma","species":"schultei","scientificName":"Peruphasma schultei","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Pseudophasmatidae"],["Subfamily","Pseudophasmatinae"],["Tribe","Anisomorphini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Whole population known from a single mountain in northern Peru","habSame":true,"diet":["HER"],"size":[55,65],"fact":"Velvet-black with crimson wings and yellow eyes — when threatened it sprays a milky defensive fluid that can sting human eyes for hours.","commonFr":"Phasme noir velouté","factFr":"Phasme péruvien noir charbon découvert dans une seule vallée, qui projette un jet caustique blanc laiteux depuis des glandes thoraciques pour faire reculer les oiseaux."},{"id":"Simulium","common":"Black fly","genus":"Simulium","species":"damnosum","scientificName":"Simulium damnosum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Simuliidae"],["Tribe","Simuliini"]],"dist":["AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[2,6],"fact":"Bites from this fly are responsible for transmitting the parasite that causes river blindness.","commonFr":"Simulie","factFr":"Sa larve filtre l'eau accrochée aux pierres des torrents africains ; l'adulte est vecteur principal de l'onchocercose qui rend aveugles des millions de villageois en Afrique de l'Ouest."},{"id":"Lasius","common":"Black garden ant","genus":"Lasius","species":"niger","scientificName":"Lasius niger","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Lasiini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[3,5],"fact":"A single queen can live 25 to 30 years, among the longest of any insect.","commonFr":"Fourmi noire des jardins","factFr":"Sa reine peut vivre près de 30 ans, plus longtemps que la plupart des chiens, et fonder une dynastie qui rassemble des milliers d'ouvrières sans jamais quitter le nid initial."},{"id":"Hermetia","common":"Black soldier fly","genus":"Hermetia","species":"illucens","scientificName":"Hermetia illucens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Stratiomyomorpha"],["Family","Stratiomyidae"],["Tribe","Hermetiini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[15,20],"fact":"Larvae are being farmed worldwide to recycle food waste into high-protein animal feed.","commonFr":"Mouche soldat noire","factFr":"L'adulte n'a même pas de bouche fonctionnelle et meurt en quelques jours ; sa larve, en revanche, dévore presque n'importe quel déchet organique et fait l'objet d'une industrie mondiale pour produire farine animale et alimentation aquacole."},{"id":"Ascalapha","common":"Black witch moth","genus":"Ascalapha","species":"odorata","scientificName":"Ascalapha odorata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[130,170],"fact":"One of the largest moths in the Americas, with a wingspan up to 16 cm. Folklore in Mexico calls it 'mariposa de la muerte' — a harbinger of death — while in the Bahamas its visit means money is coming.","commonFr":"Papillon sorcière noir","factFr":"Énorme nocturne tropical dont l'envergure dépasse 15 cm ; sa visite est considérée comme un présage de mort en Amérique latine, croyance enracinée par sa silhouette grise spectrale et son habitude d'entrer dans les maisons."},{"id":"Inocellia","common":"Black-necked snakefly","genus":"Inocellia","species":"crassicornis","scientificName":"Inocellia crassicornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Raphidioptera"],["Family","Inocelliidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Adults and larvae are predators of aphids and other tiny insects on tree bark.","commonFr":"Raphidie à cou noir","factFr":"Aspect de petit dragon avec un long cou et une tête mobile ; vit dans les forêts de conifères où elle chasse pucerons et acariens. Survivant d'un ordre quasi-éteint dont la diversité fut décimée au Crétacé."},{"id":"Eupholus","common":"Blue jewel weevil","genus":"Eupholus","species":"schoenherrii","scientificName":"Eupholus schoenherrii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Subfamily","Entiminae"],["Tribe","Eupholini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lowland rainforest of New Guinea, on wild yam vines","habSame":true,"diet":["HER"],"size":[25,31],"fact":"A living gem from New Guinea — its turquoise scales are not pigments but a microstructure that diffracts daylight, and the same nanoscale lattice has inspired research on iridescent coatings; predators learn quickly that anything this conspicuously bright is best left alone.","commonFr":"Charançon bleu joyau","factFr":"Une véritable pierre précieuse vivante de Nouvelle-Guinée — ses écailles turquoise ne sont pas pigmentées mais composées d'une microstructure qui diffracte la lumière du jour, et le même réseau nanoscopique inspire la recherche sur les revêtements iridescents ; les prédateurs apprennent vite à éviter ce qui brille à ce point."},{"id":"Morpho","common":"Blue morpho","genus":"Morpho","species":"menelaus","scientificName":"Morpho menelaus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Morphini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[120,200],"fact":"The vivid blue is not a pigment but the result of microscopic scales bending light.","commonFr":"Morpho bleu","factFr":"Ses ailes ne sont pas vraiment bleues : la couleur naît d'une nanostructure de lamelles qui diffracte la lumière. Une seule rencontre dans la forêt amazonienne suffit à comprendre pourquoi on parle d'éclats électriques."},{"id":"Baetis","common":"Blue-winged olive","genus":"Baetis","species":"rhodani","scientificName":"Baetis rhodani","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Pisciforma"],["Family","Baetidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[4,10],"fact":"Spends 1 to 2 years as an aquatic nymph, but its adult life lasts only a few hours.","commonFr":"Olive aux ailes bleutées","factFr":"L'adulte vit moins d'une journée — il n'a même pas de bouche, juste assez d'énergie pour s'accoupler en danse au-dessus de la rivière et y déposer ses œufs avant de tomber, épuisé."},{"id":"Anthonomus","common":"Boll weevil","genus":"Anthonomus","species":"grandis","scientificName":"Anthonomus grandis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Tribe","Anthonomini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[5,7],"fact":"It cost the U.S. South billions and reshaped agriculture and even music — there's a famous blues song about it.","commonFr":"Charançon du cotonnier","factFr":"A ravagé la culture du coton dans le sud des États-Unis au XXe siècle, ruinant des plantations entières ; un monument lui a même été érigé en Alabama, le seul au monde dédié à un insecte nuisible."},{"id":"Brachinus","common":"Bombardier beetle","genus":"Brachinus","species":"crepitans","scientificName":"Brachinus crepitans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Brachininae"],["Tribe","Brachinini"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[5,15],"fact":"They mix chemicals in their abdomen and fire boiling 100°C spray with an audible pop.","commonFr":"Bombardier crépitant","factFr":"Quand on le menace, il mélange deux produits chimiques dans une chambre interne et expulse un jet brûlant à 100°C dans une explosion audible — vraie petite arme chimique embarquée."},{"id":"Liposcelis","common":"Booklouse","genus":"Liposcelis","species":"bostrychophila","scientificName":"Liposcelis bostrychophila","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Psocodea"],["Suborder","Troctomorpha"],["Family","Liposcelididae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[1,2],"fact":"Less than 1 mm long and lives among books, eating mould and starch from bindings.","commonFr":"Pou des livres","factFr":"Minuscule, presque transparent, vit caché dans les vieux papiers et les céréales stockées ; se reproduit par parthénogénèse — une seule femelle suffit à coloniser une bibliothèque entière en quelques mois."},{"id":"Cyclommatus","common":"Bornean stag beetle","genus":"Cyclommatus","species":"metallifer","scientificName":"Cyclommatus metallifer","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Lucanidae"],["Subfamily","Lucaninae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,85],"fact":"Has the largest mandibles relative to body size of any animal — males can grow jaws longer than the rest of their body to fight for territory on Sulawesi tree trunks.","commonFr":"Lucane de Bornéo","factFr":"Mâle aux mandibules démesurément longues et brillantes, parfois plus grandes que son corps ; sa coloration métallique cuivrée et son arsenal mandibulaire en font la star des élevages d'insectes en Asie."},{"id":"Phloea","common":"Brazilian bark bug","genus":"Phloea","species":"subquadrata","scientificName":"Phloea subquadrata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Phloeidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"On the trunks of jaboticaba and other Myrtaceae","habSame":true,"diet":["HER"],"size":[22,28],"fact":"Mothers carry their newly-hatched young around on their flattened backs for weeks — a level of parental care rare among true bugs — while they themselves look like nothing more than a chip of mossy lichen-covered wood.","commonFr":"Punaise écorce du Brésil","factFr":"Les mères transportent leurs jeunes éclos sur leur dos aplati pendant des semaines — un niveau de soin parental rare chez les vrais hémiptères — tout en ressemblant à s'y méprendre à un copeau de bois moussu couvert de lichen."},{"id":"Gonepteryx","common":"Brimstone","genus":"Gonepteryx","species":"rhamni","scientificName":"Gonepteryx rhamni","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Pieridae"],["Subfamily","Coliadinae"],["Tribe","Gonepterygini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,55],"fact":"Can live nearly a year as an adult, the longest of any European butterfly.","commonFr":"Citron","factFr":"Premier papillon visible au sortir de l'hiver dans les jardins européens : il hiverne en adulte caché dans le lierre, et son jaune soufre annonce souvent le printemps avant même que la neige n'ait fondu."},{"id":"Hemerobius","common":"Brown lacewing","genus":"Hemerobius","species":"humulinus","scientificName":"Hemerobius humulinus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Hemerobiidae"],["Tribe","Hemerobiini"]],"dist":["PAL","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[6,10],"fact":"Its larvae can devour hundreds of aphids before pupating, making them valuable biocontrol agents in greenhouses; unlike its green relatives, adults are nocturnal and prefer woodland edges.","commonFr":"Hémérobe brun","factFr":"Petit prédateur nocturne aux ailes brunes en filet ; sa larve dévore jusqu'à 300 pucerons en deux semaines, ce qui en fait l'un des auxiliaires les plus précieux des jardiniers."},{"id":"Halyomorpha","common":"Brown marmorated stink bug","genus":"Halyomorpha","species":"halys","scientificName":"Halyomorpha halys","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Pentatomidae"],["Tribe","Cappaeini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[12,17],"fact":"Emits a foul cilantro-like odour when squashed — hence the name 'stink bug'.","commonFr":"Punaise diabolique","factFr":"Émet une odeur fétide de coriandre quand on l'écrase — une défense chimique qui lui vaut peu d'amis chez les jardiniers ; envahisseur agricole en pleine expansion en Europe."},{"id":"Bombus","common":"Buff-tailed bumblebee","genus":"Bombus","species":"terrestris","scientificName":"Bombus terrestris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Bombini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Nests usually underground","habSame":false,"diet":["HER"],"size":[15,25],"fact":"Can generate body heat by 'shivering' their flight muscles to forage in cold weather.","commonFr":"Bourdon terrestre","factFr":"Pollinisateur clé des tomates sous serre : sa façon de vibrer pour faire tomber le pollen est si efficace que des élevages industriels en exportent des colonies entières dans le monde entier."},{"id":"Stictocephala","common":"Buffalo treehopper","genus":"Stictocephala","species":"bisonia","scientificName":"Stictocephala bisonia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Membracoidea"],["Family","Membracidae"],["Tribe","Ceresini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[6,9],"fact":"Its body has a horn shaped to mimic a thorn, hiding it from predators.","commonFr":"Cicadelle bison","factFr":"Sa silhouette trapue et le casque osseux pointu sur son thorax la font ressembler à un bovidé miniature ; introduite par mégarde en Europe au XIXe siècle, elle endommage aujourd'hui les jeunes pousses de vigne."},{"id":"Paraponera","common":"Bullet ant","genus":"Paraponera","species":"clavata","scientificName":"Paraponera clavata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Paraponerinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[20,30],"fact":"Its sting is ranked as the most painful in the insect world and lasts up to 24 hours.","commonFr":"Fourmi balle de fusil","factFr":"Sa piqûre est classée au sommet de l'échelle de douleur de Schmidt — comparée à se prendre un projectile dans le pied ; certaines tribus amazoniennes l'utilisent dans des rites d'initiation où les jeunes hommes enfilent des gants pleins de ces fourmis vivantes."},{"id":"Pieris","common":"Cabbage white","genus":"Pieris","species":"rapae","scientificName":"Pieris rapae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Pieridae"],["Subfamily","Pierinae"],["Tribe","Pierini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,60],"fact":"Caterpillars accumulate mustard-oil toxins from their food plants and use them to repel predators.","commonFr":"Piéride de la rave","factFr":"Sa chenille verte dévore les choux et les navets de tous les jardins potagers du monde — introduite involontairement sur tous les continents, c'est aujourd'hui le ravageur le plus uniformément distribué de l'agriculture mondiale."},{"id":"Ceuthophilus","common":"Camel cricket","genus":"Ceuthophilus","species":"maculatus","scientificName":"Ceuthophilus maculatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Rhaphidophoroidea"],["Family","Rhaphidophoridae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[13,33],"fact":"Has no wings but enormously powerful jumping legs — found in caves and cellars worldwide.","commonFr":"Grillon des cavernes","factFr":"Sans ailes, aux longues pattes arrière, vit caché dans les caves et les terriers ; saute des hauteurs spectaculaires quand on l'éclaire à la torche, son seul moyen de défense."},{"id":"Dissosteira","common":"Carolina locust","genus":"Dissosteira","species":"carolina","scientificName":"Dissosteira carolina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Oedipodinae"],["Tribe","Oedipodini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,50],"fact":"Flashes black-banded wings in flight to confuse predators, then disappears against the ground.","commonFr":"Criquet de Caroline","factFr":"Cherche à effrayer ses prédateurs en déployant brutalement ses ailes inférieures noires bordées de jaune en plein vol — un éclair de couleur censé faire hésiter l'oiseau juste assez longtemps pour s'échapper."},{"id":"Stagmomantis","common":"Carolina mantis","genus":"Stagmomantis","species":"carolina","scientificName":"Stagmomantis carolina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Stagmomantinae"],["Tribe","Stagmomantini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[50,60],"fact":"Hears with a single 'cyclopean' ear in the middle of its chest.","commonFr":"Mante de Caroline","factFr":"Entend avec une seule oreille située en plein milieu de la poitrine — une oreille unique et centrale, contrairement à presque tous les autres insectes qui en ont deux ; sa femelle dévore parfois son partenaire pendant l'accouplement."},{"id":"Camponotus","common":"Carpenter ant","genus":"Camponotus","species":"pennsylvanicus","scientificName":"Camponotus pennsylvanicus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Camponotini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[6,18],"fact":"Its workers hollow out long galleries inside dead wood and structural timber — not to eat it, but to nest — and after several years of silent expansion they can seriously compromise the beams of a house.","commonFr":"Fourmi charpentière","factFr":"Creuse de longs tunnels dans le bois mort des bâtiments — pas pour manger, mais pour nidifier — et finit par compromettre la charpente d'une maison après plusieurs années de présence discrète."},{"id":"Xylocopa","common":"Carpenter bee","genus":"Xylocopa","species":"violacea","scientificName":"Xylocopa violacea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Xylocopinae"],["Tribe","Xylocopini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop in wood tunnels","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Chews perfectly round tunnels in solid wood and can buzz at a tone that shakes pollen out of flowers.","commonFr":"Xylocope violet","factFr":"Énorme abeille solitaire noir brillant aux reflets violets ; sa femelle creuse une galerie dans le bois mort à coups de mandibules et pond une rangée d'œufs séparés par des cloisons de sciure."},{"id":"Ctenocephalides","common":"Cat flea","genus":"Ctenocephalides","species":"felis","scientificName":"Ctenocephalides felis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Siphonaptera"],["Family","Pulicidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless; jumps","habSame":true,"diet":["CAR"],"size":[1,3],"fact":"Can jump 200 times its own body length — equivalent to a human leaping over the Eiffel Tower.","commonFr":"Puce du chat","factFr":"Capable de sauter 150 fois sa propre longueur grâce à un petit bloc d'élastine ressort dans ses pattes ; elle parasite chats, chiens et humains et peut bondir sur un nouvel hôte à toute vitesse."},{"id":"Nasutitermes","common":"Cathedral termite","genus":"Nasutitermes","species":"triodiae","scientificName":"Nasutitermes triodiae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Termitidae"],["Subfamily","Nasutitermitinae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Builds cathedral-shaped mounds up to 8 m tall","habSame":true,"diet":["HER"],"size":[3,6],"fact":"Builds the tallest non-human structures relative to body size on Earth — cathedral-shaped clay spires reaching 8 metres tall in the savannas of northern Australia, oriented along the north–south axis to passively regulate internal temperature; the same principle has been borrowed by architects to cool office buildings without air conditioning.","commonFr":"Termite cathédrale","factFr":"Construit les plus hautes structures non-humaines par rapport à la taille du corps sur Terre — des flèches d'argile en forme de cathédrale atteignant 8 mètres dans les savanes du nord de l'Australie, orientées sur l'axe nord-sud pour réguler passivement la température intérieure ; le même principe a été emprunté par les architectes pour climatiser des immeubles de bureaux sans air conditionné."},{"id":"Hyalophora","common":"Cecropia moth","genus":"Hyalophora","species":"cecropia","scientificName":"Hyalophora cecropia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Attacini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[130,150],"fact":"North America's largest moth, with wings up to 15 cm across.","commonFr":"Saturnie de Cécropia","factFr":"Le plus grand papillon nord-américain par l'envergure ; adulte, il n'a pas de bouche et ne vit qu'une à deux semaines, juste assez pour s'accoupler et que la femelle ponde ses œufs sur érable ou bouleau."},{"id":"Phobaeticus","common":"Chan's megastick","genus":"Phobaeticus","species":"chani","scientificName":"Phobaeticus chani","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"],["Subfamily","Clitumninae"],["Tribe","Pharnaciini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[350,570],"fact":"Among the longest insects ever measured — a single Bornean female reached 56.7 cm with legs outstretched, longer than a forearm.","commonFr":"Phasme géant de Chan","factFr":"Le plus long insecte du monde : pattes étendues, il atteint 56 cm — plus long qu'un avant-bras humain. Connu de seulement quelques spécimens venus de la forêt de Bornéo."},{"id":"Menacanthus","common":"Chicken body louse","genus":"Menacanthus","species":"stramineus","scientificName":"Menacanthus stramineus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Phthiraptera"],["Suborder","Amblycera"],["Family","Menoponidae"]],"dist":["PAL","NEA","NEO","AFR","IND","OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless, on host","habSame":true,"diet":["OMN"],"size":[2,3],"fact":"Major nuisance in poultry — chews on feathers and skin rather than sucking blood.","commonFr":"Pou jaune des poulets","factFr":"Vit sur la peau et les plumes des volailles, dont il mange les débris ; fléau des élevages industriels où il provoque démangeaisons et chute de ponte."},{"id":"Tenodera","common":"Chinese mantis","genus":"Tenodera","species":"sinensis","scientificName":"Tenodera sinensis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Mantinae"],["Tribe","Paramantini"]],"dist":["PAL","IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[70,110],"fact":"Eats not only insects but occasionally small lizards, frogs and even hummingbirds.","commonFr":"Mante chinoise","factFr":"Introduite en Amérique du Nord à la fin du XIXe siècle comme prédateur biologique, elle s'est si bien acclimatée qu'elle est désormais la plus commune dans certains jardins — au détriment des espèces indigènes."},{"id":"Sphecius","common":"Cicada killer","genus":"Sphecius","species":"speciosus","scientificName":"Sphecius speciosus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Crabronidae"],["Tribe","Gorytini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,50],"fact":"Females can carry prey heavier than themselves over considerable distances.","commonFr":"Guêpe tueuse de cigales","factFr":"La femelle traque une cigale en plein vol, la paralyse, la traîne en arrière par-dessus le sol jusqu'à son terrier souterrain, et y pond un œuf dessus — la cigale, immobile, sera dévorée vivante par la larve."},{"id":"Lasioderma","common":"Cigarette beetle","genus":"Lasioderma","species":"serricorne","scientificName":"Lasioderma serricorne","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Bostrichoidea"],["Family","Ptinidae"],["Tribe","Lasiodermini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[2,4],"fact":"A perfectly tiny cousin of the death-watch beetle, infamous for ruining stored tobacco.","commonFr":"Vrillette du tabac","factFr":"Coléoptère minuscule qui infeste tabacs, épices et grains stockés ; quand il manque de nutriments, il s'associe à une levure symbiotique qui digère pour lui les feuilles séchées les plus dures."},{"id":"Agriotes","common":"Click beetle","genus":"Agriotes","species":"lineatus","scientificName":"Agriotes lineatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Elateridae"],["Tribe","Agriotini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae (wireworms) live in soil","habSame":false,"diet":["HER"],"size":[8,11],"fact":"Larvae live 3 to 5 years underground and are a major pest of root crops.","commonFr":"Taupin rayé","factFr":"Sa larve vit 3 à 5 ans dans le sol à dévorer les racines des céréales — l'un des ravageurs agricoles les plus coûteux d'Europe ; l'adulte, quant à lui, se propulse en l'air avec un « clic » audible quand on le pose sur le dos."},{"id":"Tineola","common":"Clothes moth","genus":"Tineola","species":"bisselliella","scientificName":"Tineola bisselliella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Tineoidea"],["Family","Tineidae"],["Tribe","Tineini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,14],"fact":"Their larvae are among the very few animals that can digest keratin (wool, fur, feathers).","commonFr":"Mite des vêtements","factFr":"Sa chenille dévore la kératine de la laine et de la soie, creusant les pulls oubliés au fond des armoires ; l'adulte préfère l'obscurité et fuit la lumière, ce qui rend l'infestation difficile à détecter avant qu'elle ne soit étendue."},{"id":"Colias","common":"Clouded yellow","genus":"Colias","species":"croceus","scientificName":"Colias croceus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Pieridae"],["Subfamily","Coliadinae"],["Tribe","Coliadini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Some populations migrate hundreds of kilometres each year.","commonFr":"Souci","factFr":"Papillon migrateur orange vif qui débarque chaque été par dizaines de milliers depuis l'Afrique du Nord pour remonter jusqu'au Royaume-Uni — un voyage de plusieurs générations, dont chaque individu meurt avant d'arriver."},{"id":"Melolontha","common":"Cockchafer","genus":"Melolontha","species":"melolontha","scientificName":"Melolontha melolontha","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Melolonthinae"],["Tribe","Melolonthini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Adults fly to feed on leaves; larvae feed underground for 3+ years","habSame":false,"diet":["HER"],"size":[25,30],"fact":"Historical European outbreaks were so bad that medieval courts put the beetles 'on trial' and formally excommunicated them.","commonFr":"Hanneton commun","factFr":"Sa larve vit trois à quatre ans dans le sol à dévorer les racines des céréales et des prairies, causant des dégâts considérables ; les vols d'adultes au crépuscule étaient autrefois si denses qu'ils noircissaient le ciel."},{"id":"Leptinotarsa","common":"Colorado potato beetle","genus":"Leptinotarsa","species":"decemlineata","scientificName":"Leptinotarsa decemlineata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Chrysomelidae"],["Subfamily","Chrysomelinae"],["Tribe","Doryphorini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["TER","AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[9,11],"fact":"Each new generation can evolve resistance to insecticides in only a few years.","commonFr":"Doryphore","factFr":"Coléoptère rayé jaune et noir originaire du Mexique ; arrivé en Europe avec les expéditions de pommes de terre au XIXe siècle, il dévaste depuis les cultures de patates et a développé une résistance à presque tous les insecticides."},{"id":"Argema","common":"Comet moth","genus":"Argema","species":"mittrei","scientificName":"Argema mittrei","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Saturniini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Adults have no mouthparts; live 4-5 days","habSame":false,"diet":["HER"],"size":[180,220],"fact":"From Madagascar comes the longest tail of any moth — yellow streamers up to 15 cm that disrupt the echolocation calls of hunting bats.","commonFr":"Comète de Madagascar","factFr":"Saturniidé endémique malgache aux longues queues d'ailes jaune citron qui peuvent atteindre 15 cm ; ces appendices brouilleraient le sonar des chauves-souris pour leur faire viser à côté du vrai corps."},{"id":"Polygonia","common":"Comma butterfly","genus":"Polygonia","species":"c-album","scientificName":"Polygonia c-album","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,55],"fact":"Its ragged wing edges look like a torn dried leaf when at rest.","commonFr":"Robert-le-Diable","factFr":"Ses ailes ont des bords découpés et irréguliers qui le font ressembler à une feuille morte une fois posé ; un petit signe blanc en forme de C sur le revers de l'aile postérieure lui a valu son nom scientifique."},{"id":"Psocus","common":"Common barklouse","genus":"Psocus","species":"leidyi","scientificName":"Psocus leidyi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Psocodea"],["Suborder","Psocomorpha"],["Family","Psocidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[3,5],"fact":"Forms 'herds' on tree bark and grazes on microscopic fungi.","commonFr":"Psoque commun","factFr":"Minuscule insecte ailé qui broute le lichen et les algues sur l'écorce des arbres ; on le voit souvent en petits troupeaux, mais son rôle dans la nature reste largement méconnu du grand public."},{"id":"Polyommatus","common":"Common blue","genus":"Polyommatus","species":"icarus","scientificName":"Polyommatus icarus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Lycaenidae"],["Subfamily","Polyommatinae"],["Tribe","Polyommatini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,35],"fact":"Its caterpillars produce honey-like secretions that attract ants, which protect them in return.","commonFr":"Azuré commun","factFr":"Le mâle a des ailes bleu ciel iridescent ; la femelle est brune avec une bordure orange. Sa chenille vit en symbiose avec les fourmis, qui la protègent en échange d'une sécrétion sucrée qu'elle produit pour elles."},{"id":"Enallagma","common":"Common blue damselfly","genus":"Enallagma","species":"cyathigerum","scientificName":"Enallagma cyathigerum","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Coenagrionidae"]],"dist":["PAL","NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[25,35],"fact":"Adults can live for several weeks but most of their life is spent as aquatic nymphs.","commonFr":"Agrion porte-coupe","factFr":"Mâle bleu cobalt à anneaux noirs très commun au bord des étangs en été ; pendant l'accouplement le couple forme un « cœur » caractéristique en suspendant ses corps en boucle au-dessus de l'eau."},{"id":"Calliphora","common":"Common bluebottle","genus":"Calliphora","species":"vomitoria","scientificName":"Calliphora vomitoria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Calliphoridae"],["Tribe","Calliphorini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,14],"fact":"Adults can detect a dead body from over a kilometre away.","commonFr":"Mouche bleue de la viande","factFr":"Détecte une charogne à des kilomètres et y pond des centaines d'œufs en quelques minutes ; en médecine légale, l'avancement de ses larves dans un cadavre permet de calculer assez précisément l'heure de la mort."},{"id":"Machilis","common":"Common bristletail","genus":"Machilis","species":"hrabei","scientificName":"Machilis hrabei","lineage":[["Order","Archaeognatha"],["Family","Machilidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless; jumps","habSame":true,"diet":["HER"],"size":[10,15],"fact":"Can spring up to 30 cm into the air by flexing its abdomen.","commonFr":"Machile commun","factFr":"Petit insecte primitif sans ailes au corps argenté couvert d'écailles ; saute en se cambrant brusquement quand on le dérange et reste l'un des rares représentants d'une lignée vieille de 400 millions d'années."},{"id":"Junonia","common":"Common buckeye","genus":"Junonia","species":"coenia","scientificName":"Junonia coenia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Junoniini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,65],"fact":"Its huge wing eyespots flicker like predator eyes when it opens its wings — a defence so effective some predators have evolved counter-strategies to avoid being fooled.","commonFr":"Buckeye commun","factFr":"Ses ailes portent six grands ocelles à pupille violette, censés simuler des yeux de prédateurs et faire fuir les oiseaux ; migrateur partiel, il remonte chaque été des États du sud vers le Canada."},{"id":"Hexagenia","common":"Common burrower mayfly","genus":"Hexagenia","species":"limbata","scientificName":"Hexagenia limbata","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Furcatergalia"],["Family","Ephemeridae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Mass emergences along the Mississippi River show up on weather radar.","commonFr":"Éphémère géante","factFr":"Émerge en juin des Grands Lacs en essaims si massifs que le radar météo les détecte, et qu'on doit déneiger les routes au chasse-neige le lendemain matin — l'adulte ne vit qu'une nuit."},{"id":"Sympetrum","common":"Common darter","genus":"Sympetrum","species":"striolatum","scientificName":"Sympetrum striolatum","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"],["Tribe","Sympetrini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,40],"fact":"One of the few dragonflies still flying late into autumn.","commonFr":"Sympétrum strié","factFr":"Libellule rouge brique très commune en fin d'été ; elle se pose souvent au sol pour profiter du soleil, ce qui en fait la plus facile à photographier de toute la famille."},{"id":"Photinus","common":"Common firefly","genus":"Photinus","species":"pyralis","scientificName":"Photinus pyralis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Lampyridae"],["Tribe","Photinini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["AER","TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[10,15],"fact":"Their flashes form Morse-like code — males and females recognise each other by precise timing.","commonFr":"Luciole commune","factFr":"Émet un clignotement jaune-vert codé en patterns spécifiques pour signaler à un partenaire de la bonne espèce ; certaines femelles d'autres genres imitent ces signaux pour attirer puis dévorer les mâles trompés."},{"id":"Aphrophora","common":"Common froghopper","genus":"Aphrophora","species":"alni","scientificName":"Aphrophora alni","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cercopoidea"],["Family","Aphrophoridae"],["Tribe","Aphrophorini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Strong jumpers, but rarely fly","habSame":true,"diet":["HER"],"size":[8,10],"fact":"Adults can jump over 70 cm — proportionally one of the best jumpers known.","commonFr":"Cercope de l'aulne","factFr":"Sa larve sécrète une mousse blanche caractéristique sur les tiges des arbres et des herbes — la « bave de coucou » des jardins — qui la protège des prédateurs et la maintient humide pendant tout son développement."},{"id":"Culex","common":"Common house mosquito","genus":"Culex","species":"pipiens","scientificName":"Culex pipiens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Culicidae"],["Subfamily","Culicinae"],["Tribe","Culicini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[4,10],"fact":"Larvae breathe through a snorkel-like tube at the water's surface.","commonFr":"Moustique commun","factFr":"Seule la femelle pique — elle a besoin du sang pour développer ses œufs ; vecteur du virus du Nil occidental, sa salive contient des anesthésiants pour que la victime ne sente rien pendant qu'elle se nourrit."},{"id":"Tenthredo","common":"Common sawfly","genus":"Tenthredo","species":"mesomela","scientificName":"Tenthredo mesomela","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Symphyta"],["Superfamily","Tenthredinoidea"],["Family","Tenthredinidae"],["Tribe","Tenthredinini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Sawflies aren't wasps — their larvae look like caterpillars and they have no narrow 'wasp waist'.","commonFr":"Tenthrède commune","factFr":"Hyménoptère sans dard mais souvent confondu avec une guêpe : sa larve, qui ressemble à une chenille de papillon, dévore les feuilles d'ombellifères et adopte une posture redressée en S quand on la dérange."},{"id":"Panorpa","common":"Common scorpionfly","genus":"Panorpa","species":"communis","scientificName":"Panorpa communis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Mecoptera"],["Family","Panorpidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Males offer females a 'gift' of regurgitated food or a dead insect during courtship.","commonFr":"Panorpe commune","factFr":"Le mâle porte au bout de son abdomen un appendice recourbé qui rappelle la queue d'un scorpion, mais c'est purement décoratif ; il offre une goutte de salive cristallisée à la femelle en cadeau de cour avant la copulation."},{"id":"Lepisma","common":"Common silverfish","genus":"Lepisma","species":"saccharinum","scientificName":"Lepisma saccharinum","lineage":[["Order","Zygentoma"],["Family","Lepismatidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[10,20],"fact":"One of the oldest insect groups on Earth — virtually unchanged for 400 million years.","commonFr":"Lépisme argenté","factFr":"Petit fugitif argenté des salles de bain qui se nourrit d'amidon et de sucres ; primitif au point de ne pas avoir d'ailes du tout, son corps en larme survit aux écrasements grâce à ses écailles glissantes."},{"id":"Orthetrum","common":"Common skimmer","genus":"Orthetrum","species":"cancellatum","scientificName":"Orthetrum cancellatum","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,50],"fact":"Males defend perch sites and dip the abdomen into water to cool down on hot days.","commonFr":"Orthétrum réticulé","factFr":"Libellule très commune des plans d'eau européens ; le mâle adulte développe une pruinosité bleu poudreux qui le distingue de la femelle, brun jaunâtre — un dimorphisme spectaculaire pour la même espèce."},{"id":"Raphidia","common":"Common snakefly","genus":"Raphidia","species":"ophiopsis","scientificName":"Raphidia ophiopsis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Raphidioptera"],["Family","Raphidiidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[8,15],"fact":"Long elongated 'neck' is actually a stretched-out prothorax, not a real neck.","commonFr":"Raphidie ophidienne","factFr":"Reliquat d'un ordre quasi-éteint, son long cou mobile lui donne l'allure d'un mini-serpent qui scrute l'écorce pour y chasser des œufs et larves d'insectes nuisibles aux conifères."},{"id":"Perla","common":"Common stonefly","genus":"Perla","species":"bipunctata","scientificName":"Perla bipunctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Plecoptera"],["Suborder","Arctoperlaria"],["Family","Perlidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[18,28],"fact":"Nymphs are top predators in clean fast-flowing streams and indicate good water quality.","commonFr":"Perle à deux points","factFr":"Sa nymphe vit dans les torrents de montagne, sous les pierres ; particulièrement sensible à la pollution, sa présence est un excellent indicateur de la pureté d'une rivière."},{"id":"Vespula","common":"Common wasp","genus":"Vespula","species":"vulgaris","scientificName":"Vespula vulgaris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Vespinae"],["Tribe","Vespini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[12,18],"fact":"Workers can recognise each other by individual facial markings.","commonFr":"Guêpe commune","factFr":"Constitue chaque année des colonies de plusieurs milliers d'ouvrières en papier mâché ; au cœur de l'été, le besoin en protéines pour les larves explique pourquoi elles deviennent agressives autour des barbecues."},{"id":"Plathemis","common":"Common whitetail","genus":"Plathemis","species":"lydia","scientificName":"Plathemis lydia","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,48],"fact":"Males have a powdery white abdomen that flashes during courtship.","commonFr":"Libellule à queue blanche","factFr":"Le mâle exhibe son abdomen blanc poudreux face à ses rivaux en se posant sur leur territoire et en élevant cette zone éclatante comme un drapeau — une défense visuelle qui marche aussi sur les femelles intéressées."},{"id":"Cotesia","common":"Cotesia wasp","genus":"Cotesia","species":"glomerata","scientificName":"Cotesia glomerata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Parasitica"],["Superfamily","Ichneumonoidea"],["Family","Braconidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop inside caterpillar hosts","habSame":false,"diet":["CAR"],"size":[2,4],"fact":"Caterpillar hosts continue moving and 'defend' the wasp larvae after they emerge — zombie bodyguards.","commonFr":"Cotésia parasitoïde","factFr":"Petite guêpe qui injecte ses œufs dans une chenille vivante ; les larves dévorent ses entrailles puis sortent en perçant sa peau pour tisser un cocon — la chenille survit assez longtemps pour défendre les cocons à coups de mandibules."},{"id":"Helicoverpa","common":"Cotton bollworm","genus":"Helicoverpa","species":"armigera","scientificName":"Helicoverpa armigera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Noctuidae"],["Tribe","Heliothini"]],"dist":["PAL","AFR","IND","OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"One of the costliest crop pests in the world, attacking cotton, corn, tomato and more.","commonFr":"Noctuelle de la tomate","factFr":"L'un des ravageurs agricoles les plus coûteux au monde, s'attaquant à plus de 100 plantes différentes — maïs, sorgho, soja, coton et bien d'autres."},{"id":"Icerya","common":"Cottony cushion scale","genus":"Icerya","species":"purchasi","scientificName":"Icerya purchasi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Coccoidea"],["Family","Monophlebidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["HER"],"size":[4,7],"fact":"Famously controlled in California by importing the right ladybug — the first big classical biocontrol success.","commonFr":"Cochenille australienne","factFr":"Ses femelles produisent des sacs de cire blanche cannelée qui contiennent des centaines d'œufs ; elle a failli détruire l'industrie des agrumes en Californie au XIXe siècle, sauvée in extremis par l'introduction de coccinelles australiennes prédatrices."},{"id":"Pthirus","common":"Crab louse","genus":"Pthirus","species":"pubis","scientificName":"Pthirus pubis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Phthiraptera"],["Suborder","Anoplura"],["Family","Pthiridae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless, on host","habSame":true,"diet":["CAR"],"size":[1,2],"fact":"Despite the alarming name, infestations are harmless and easily treated.","commonFr":"Morpion","factFr":"Petit pou plat à griffes spécialement adaptées aux poils épais des régions intimes ; sa population mondiale chute rapidement depuis vingt ans, vraisemblablement à cause de l'épilation devenue habituelle."},{"id":"Hamadryas","common":"Cracker butterfly","genus":"Hamadryas","species":"feronia","scientificName":"Hamadryas feronia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Biblidinae"],["Tribe","Ageroniini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Adults often hang head-down on tree trunks","habSame":false,"diet":["HER"],"size":[70,85],"fact":"Males emit a loud, audible CRACK in flight by snapping a modified wing vein — the only butterfly that makes a sound the human ear can clearly detect.","commonFr":"Papillon craqueur","factFr":"Pendant la parade nuptiale, le mâle émet un crépitement audible avec ses ailes en plein vol — un claquement sec produit par des structures spéciales situées à la base de l'aile, unique en son genre chez les papillons."},{"id":"Tipula","common":"Crane fly","genus":"Tipula","species":"paludosa","scientificName":"Tipula paludosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Tipulomorpha"],["Family","Tipulidae"],["Tribe","Tipulini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"'Leatherjacket' larvae feed on roots underground","habSame":false,"diet":["HER"],"size":[20,35],"fact":"Adults are harmless and don't really bite — they're often confused with giant mosquitoes.","commonFr":"Tipule des marais","factFr":"Surnommée « cousin » à cause de sa ressemblance avec un moustique géant, elle est en réalité totalement inoffensive ; sa larve toutefois, le « ver gris », attaque les racines des prairies et peut décimer un pâturage."},{"id":"Chrysis","common":"Cuckoo wasp","genus":"Chrysis","species":"ignita","scientificName":"Chrysis ignita","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Chrysidoidea"],["Family","Chrysididae"],["Tribe","Chrysidini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[6,11],"fact":"Brilliantly metallic; it can roll into a ball when threatened, like an insect armadillo.","commonFr":"Guêpe coucou","factFr":"Habillée d'une cuirasse métallique vert-bleu et rouge éclatant, elle parasite les nids d'autres guêpes solitaires : se faufile, pond un œuf, et sa larve dévore l'hôte. Quand on la menace, elle se replie en boule blindée."},{"id":"Zootermopsis","common":"Dampwood termite","genus":"Zootermopsis","species":"angusticollis","scientificName":"Zootermopsis angusticollis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Archotermopsidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,15],"fact":"Lives only in damp, decaying logs and rarely encounters humans.","commonFr":"Termite du bois humide","factFr":"Vit dans les troncs pourrissants de la côte ouest nord-américaine ; ses soldats à grosse tête bloquent les galeries en obstruant les passages avec leur propre crâne quand un envahisseur s'introduit."},{"id":"Eleodes","common":"Darkling beetle","genus":"Eleodes","species":"obscura","scientificName":"Eleodes obscura","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Tenebrionidae"],["Tribe","Amphidorini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["OMN"],"size":[10,40],"fact":"When threatened they do a 'headstand' and release a foul-smelling chemical from their rear.","commonFr":"Ténébrion du désert","factFr":"Quand on le dérange, il lève l'abdomen à la verticale et expulse une sécrétion chimique nauséabonde de ses glandes anales — d'où son surnom de « scarabée fait-le-poirier » dans le sud-ouest américain."},{"id":"Xanthopan","common":"Darwin's hawkmoth","genus":"Xanthopan","species":"morganii","scientificName":"Xanthopan morganii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Sphingini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[130,160],"fact":"Darwin predicted in 1862 that a moth must exist with a 30-cm tongue to drink from a Madagascan orchid he'd seen — this hawkmoth was discovered 41 years later, exactly as he described.","commonFr":"Sphinx de Morgan","factFr":"Sphinx malgache prédit par Darwin avant même sa découverte : il avait noté qu'une orchidée locale avait un éperon de 30 cm, et que sa pollinisatrice devait nécessairement avoir une trompe aussi longue — 40 ans plus tard, on l'a trouvée."},{"id":"Deroplatys","common":"Dead leaf mantis","genus":"Deroplatys","species":"desiccata","scientificName":"Deroplatys desiccata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Deroplatyidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[70,90],"fact":"Its dried-leaf disguise is so complete it has 'veins' painted on its body.","commonFr":"Mante feuille morte","factFr":"Imite parfaitement une feuille sèche tombée au sol, jusqu'aux nervures et aux taches de moisi ; reste totalement immobile et bascule légèrement comme si le vent la déplaçait, leurrant lézards et oiseaux qui passent à côté sans la voir."},{"id":"Blaberus","common":"Death's head cockroach","genus":"Blaberus","species":"craniifer","scientificName":"Blaberus craniifer","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Superfamily","Blaberoidea"],["Family","Blaberidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[40,70],"fact":"Used in space biology research and can survive much higher radiation doses than humans.","commonFr":"Blatte tête de mort","factFr":"Grosse blatte tropicale au pronotum orné d'un dessin noir évoquant un crâne ; populaire en élevage, elle vit dans les grottes et les troncs creux des forêts d'Amérique centrale."},{"id":"Acherontia","common":"Death's-head hawkmoth","genus":"Acherontia","species":"atropos","scientificName":"Acherontia atropos","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Acherontiini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[90,130],"fact":"Squeaks loudly when handled by forcing air through a special chamber in its head.","commonFr":"Sphinx tête de mort","factFr":"Grand sphinx au thorax orné d'un dessin évoquant un crâne humain ; pille les ruches d'abeilles en suçant le miel à travers les rayons, et émet un cri perçant quand on le manipule — fait quasi-unique chez les papillons."},{"id":"Xestobium","common":"Death-watch beetle","genus":"Xestobium","species":"rufovillosum","scientificName":"Xestobium rufovillosum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Bostrichoidea"],["Family","Ptinidae"],["Tribe","Xestobiini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[5,7],"fact":"Males knock their heads against wood to attract females — a sound long thought to predict death in folklore.","commonFr":"Vrillette des maisons","factFr":"Sa larve fore le bois des vieilles charpentes pendant des années ; pour signaler sa présence aux partenaires, l'adulte cogne sa tête contre les parois — un tic-tac sec qu'on a longtemps tenu pour un présage de mort dans les manoirs anglais."},{"id":"Chrysops","common":"Deer fly","genus":"Chrysops","species":"caecutiens","scientificName":"Chrysops caecutiens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Tabanomorpha"],["Family","Tabanidae"],["Tribe","Chrysopsini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[8,12],"fact":"Has striking iridescent eyes with bright zig-zag patterns.","commonFr":"Taon des chevreuils","factFr":"Sa morsure est particulièrement douloureuse : il découpe la peau avec des mandibules en lames de couteau puis lape le sang qui coule, contrairement aux moustiques qui piquent finement."},{"id":"Schistocerca","common":"Desert locust","genus":"Schistocerca","species":"gregaria","scientificName":"Schistocerca gregaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Cyrtacanthacridinae"],["Tribe","Cyrtacanthacridini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,80],"fact":"Swarms can contain billions and devour their own body weight in plants every single day.","commonFr":"Criquet pèlerin","factFr":"Solitaire et inoffensif la plupart du temps, il bascule en quelques heures vers une forme grégaire orange-noire quand la densité augmente — des essaims de plusieurs milliards d'individus ravagent alors l'Afrique et l'Asie du sud-ouest."},{"id":"Ocypus","common":"Devil's coach horse","genus":"Ocypus","species":"olens","scientificName":"Ocypus olens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Staphylinoidea"],["Family","Staphylinidae"],["Tribe","Staphylinini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[20,32],"fact":"When threatened, it raises its abdomen like a scorpion and emits a foul scent.","commonFr":"Staphylin odorant","factFr":"Grand staphylin noir au corps allongé ; quand on le menace, il dresse son abdomen comme un scorpion et ouvre ses mandibules, mais sa vraie défense est une sécrétion fétide expulsée par ses glandes anales."},{"id":"Idolomantis","common":"Devil's flower mantis","genus":"Idolomantis","species":"diabolica","scientificName":"Idolomantis diabolica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Empusidae"],["Subfamily","Empusinae"],["Tribe","Idolomantini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Acacia scrub of East Africa","habSame":true,"diet":["CAR"],"size":[100,130],"fact":"When confronted, this enormous East African ambusher fans out its forewings to reveal eyespots in red, white, blue and black — the most elaborate threat display of any mantis on Earth.","commonFr":"Mante diabolique","factFr":"Confrontée à un prédateur, cette énorme guetteuse est-africaine déploie ses élytres pour révéler des ocelles rouges, blanches, bleues et noires — la parade d'intimidation la plus élaborée de toutes les mantes au monde."},{"id":"Melanoplus","common":"Differential grasshopper","genus":"Melanoplus","species":"differentialis","scientificName":"Melanoplus differentialis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Melanoplinae"],["Tribe","Melanoplini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,45],"fact":"One of North America's most damaging crop pests — swarms emerge in dry years and can strip a cornfield in days; its bright yellow chevrons on the hind femora are the field mark that distinguishes it from dozens of similar grasshoppers.","commonFr":"Sauterelle dimorphe","factFr":"L'un des principaux ravageurs des céréales du Midwest américain ; émergent en énormes essaims les années sèches et peuvent dévorer un champ de maïs en quelques jours."},{"id":"Neotibicen","common":"Dog-day cicada","genus":"Neotibicen","species":"canicularis","scientificName":"Neotibicen canicularis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cicadoidea"],["Family","Cicadidae"],["Tribe","Cryptotympanini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Males create one of the loudest insect sounds on Earth, reaching over 100 decibels.","commonFr":"Cigale des jours chauds","factFr":"Émerge en plein été nord-américain quand la chaleur atteint son maximum ; chante par 90°F+ pour attirer une partenaire ; ses larves vivent 2 à 5 ans sous terre à téter les racines."},{"id":"Toxodera","common":"Dragon flower mantis","genus":"Toxodera","species":"integrifolia","scientificName":"Toxodera integrifolia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Toxoderidae"],["Subfamily","Toxoderinae"],["Tribe","Toxoderini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lowland rainforest of Burma, Thailand, Peninsular Malaysia and Java","habSame":true,"diet":["CAR"],"size":[70,90],"fact":"Looks more like a tangled stick than the typical ambush predator it is — a slender Southeast Asian rainforest species with foliaceous leg expansions and a high-arching pronotum, internet-famous for its absurd silhouette.","commonFr":"Mante dragon","factFr":"Ressemble plus à un bâton emmêlé qu'au prédateur d'embuscade typique qu'elle est — espèce élancée des forêts pluviales d'Asie du Sud-Est aux extensions foliacées sur les pattes et au pronotum très arqué, célèbre sur internet pour sa silhouette absurde."},{"id":"Stenophylla","common":"Dragon mantis","genus":"Stenophylla","species":"lobivertex","scientificName":"Stenophylla lobivertex","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Superfamily","Acanthopoidea"],["Family","Acanthopidae"],["Subfamily","Stenophyllinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[40,60],"fact":"A leaf-perfect Amazonian canopy predator that arches its abdomen into an S-shape when threatened — a posture so reptilian it has earned an uncanny nickname in the hobby trade.","commonFr":"Mante des feuilles d'Amazonie","factFr":"Prédatrice amazonienne parfaitement adaptée au feuillage de canopée, qui cambre son abdomen en S quand on la menace — une posture si reptilienne qu'elle a hérité d'un surnom évoquant un dragon dans le monde du terrariophilie."},{"id":"Dorylus","common":"Driver ant","genus":"Dorylus","species":"nigricans","scientificName":"Dorylus nigricans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dorylinae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Colonies of 20+ million; queens are the largest ants on Earth","habSame":false,"diet":["CAR"],"size":[3,13],"fact":"A single queen lays up to 4 million eggs per month — and a colony on the march can strip a chicken to its bones in minutes.","commonFr":"Magnan","factFr":"Fourmis africaines aveugles qui se déplacent en colonnes de plusieurs millions, dévorant tout sur leur passage — petits vertébrés compris ; les villageois quittent parfois leur maison le temps que la colonie passe, et reviennent pour la trouver totalement désinfestée des cafards."},{"id":"Eristalis","common":"Drone fly","genus":"Eristalis","species":"tenax","scientificName":"Eristalis tenax","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Syrphoidea"],["Family","Syrphidae"],["Tribe","Eristalini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"Rat-tailed maggots live in stagnant water","habSame":false,"diet":["HER"],"size":[10,16],"fact":"Its larvae, the 'rat-tailed maggots', live in foul water using a long telescoping breathing tube.","commonFr":"Mouche abeille","factFr":"Imite à s'y méprendre une abeille domestique pour échapper aux prédateurs, mais est totalement inoffensive ; sa larve, le « ver à queue de rat », vit dans les eaux croupies et respire à travers un long siphon télescopique."},{"id":"Cryptotermes","common":"Drywood termite","genus":"Cryptotermes","species":"brevis","scientificName":"Cryptotermes brevis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Kalotermitidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lives entirely inside dry wood","habSame":true,"diet":["HER"],"size":[4,8],"fact":"Doesn't need contact with soil — can live entirely inside dry timber.","commonFr":"Termite du bois sec","factFr":"Vit en petite colonie entièrement à l'intérieur d'une seule pièce de matériau ligneux desséché, sans contact avec le sol ; envahit meubles et charpentes des maisons tropicales, qu'on doit parfois fumiger en totalité."},{"id":"Onthophagus","common":"Dung beetle","genus":"Onthophagus","species":"taurus","scientificName":"Onthophagus taurus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Onthophagini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Adults bury dung; larvae develop in underground chambers","habSame":false,"diet":["OMN"],"size":[5,12],"fact":"One species can pull 1,141 times its own body weight, the strongest animal on Earth relative to size.","commonFr":"Bousier taureau","factFr":"Le mâle porte deux cornes recourbées comme celles d'un grand bovidé ; capable de soulever 1141 fois son propre poids — l'animal le plus fort par rapport à sa masse jamais mesuré sur Terre."},{"id":"Corydalus","common":"Eastern dobsonfly","genus":"Corydalus","species":"cornutus","scientificName":"Corydalus cornutus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Megaloptera"],["Family","Corydalidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[80,140],"fact":"Males have massive curved mandibles, too large to bite, used only to fight other males.","commonFr":"Corydale cornue","factFr":"Le mâle adulte porte d'énormes mandibules en faucille presque aussi longues que son corps, totalement inutiles pour mordre — il s'en sert dans les combats pour décrocher ses rivaux des feuilles lors de la parade."},{"id":"Romalea","common":"Eastern lubber grasshopper","genus":"Romalea","species":"microptera","scientificName":"Romalea microptera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Romaleidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[50,80],"fact":"Slow, flightless and dramatically coloured to advertise its toxic chemicals.","commonFr":"Sauterelle lubber","factFr":"Grosse, jaune et noire, totalement aposématique ; quand on la menace elle siffle, mousse une écume nauséabonde et expulse un liquide toxique tiré des plantes qu'elle a mangées."},{"id":"Reticulitermes","common":"Eastern subterranean termite","genus":"Reticulitermes","species":"flavipes","scientificName":"Reticulitermes flavipes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Rhinotermitidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Only reproductive alates briefly fly","habSame":true,"diet":["HER"],"size":[4,8],"fact":"Communicates through head-banging vibrations in tunnel walls.","commonFr":"Termite souterrain de l'Est","factFr":"Principale espèce destructrice de bâtiments aux États-Unis : ses colonies de plusieurs millions creusent depuis le sol jusqu'aux charpentes ; les dégâts annuels rivalisent avec ceux des ouragans."},{"id":"Papilio","common":"Eastern tiger swallowtail","genus":"Papilio","species":"glaucus","scientificName":"Papilio glaucus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Papilionini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[80,140],"fact":"Caterpillars have a forked organ (osmeterium) that pops out smelling foul to deter predators.","commonFr":"Tigre de l'Est","factFr":"Papillon jaune rayé de noir parmi les plus connus d'Amérique du Nord ; les femelles ont une forme mélanique entièrement sombre qui imite un papillon toxique, et c'est l'un des rares cas où on trouve les deux morphes dans la même population."},{"id":"Anacridium","common":"Egyptian grasshopper","genus":"Anacridium","species":"aegyptium","scientificName":"Anacridium aegyptium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Cyrtacanthacridinae"],["Tribe","Cyrtacanthacridini"]],"dist":["AFR","PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,75],"fact":"Sometimes appears in southern Europe in surprising numbers after warm autumns.","commonFr":"Criquet égyptien","factFr":"Grand criquet solitaire — donc inoffensif pour les cultures — qu'on confond souvent avec son cousin migrateur dévastateur ; ses yeux à rayures verticales noires donnent l'illusion d'un regard hypnotique."},{"id":"Heliocopris","common":"Elephant dung beetle","genus":"Heliocopris","species":"dominus","scientificName":"Heliocopris dominus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Coprini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva develops inside a buried dung ball","habSame":false,"diet":["OMN"],"size":[40,70],"fact":"One of the largest scarab beetles on Earth, specialising in pachyderm droppings — a single dung pile can be processed by hundreds of these armoured bulldozers in a single afternoon.","commonFr":"Bousier des éléphants","factFr":"L'un des plus grands scarabées coprophages de la Terre, spécialisé dans les déjections pachydermes — un seul tas frais peut être traité par des centaines de ces bulldozers cuirassés en un après-midi."},{"id":"Deilephila","common":"Elephant hawkmoth","genus":"Deilephila","species":"elpenor","scientificName":"Deilephila elpenor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Macroglossinae"],["Tribe","Macroglossini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,60],"fact":"Caterpillars resemble tiny pink elephants with retractable 'trunks'.","commonFr":"Sphinx de la vigne","factFr":"Sphinx rose et olive éclatant, fréquent dans les jardins européens à la tombée de la nuit ; sa chenille, quand elle est dérangée, gonfle l'avant de son corps pour faire apparaître quatre faux yeux et imiter une tête de serpent."},{"id":"Agrilus","common":"Emerald ash borer","genus":"Agrilus","species":"planipennis","scientificName":"Agrilus planipennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Buprestoidea"],["Family","Buprestidae"],["Tribe","Agrilini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae mine under bark","habSame":false,"diet":["HER"],"size":[8,14],"fact":"Has killed hundreds of millions of ash trees in North America since being introduced from Asia in the 1990s.","commonFr":"Agrile du frêne","factFr":"Bupreste vert métallique originaire d'Asie qui a anéanti des centaines de millions de frênes en Amérique du Nord et en Europe ; sa larve creuse des galeries en S sous l'écorce qui finissent par tuer l'arbre."},{"id":"Lestes","common":"Emerald damselfly","genus":"Lestes","species":"sponsa","scientificName":"Lestes sponsa","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Lestoidea"],["Family","Lestidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[35,40],"fact":"Holds its wings half-open at rest, unlike most damselflies that fold them shut.","commonFr":"Leste fiancé","factFr":"Petit zygoptère vert émeraude métallique qui, contrairement à ses cousines, garde ses ailes entrouvertes au repos ; pond ses œufs dans les tiges submergées des joncs au bord des étangs."},{"id":"Anax","common":"Emperor dragonfly","genus":"Anax","species":"imperator","scientificName":"Anax imperator","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"],["Tribe","Anactini"]],"dist":["PAL","AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[60,80],"fact":"One of Europe's largest dragonflies; the male has a bright blue thorax and patrols tirelessly in hover-flight — it is almost impossible to see one perched during the warm hours of the day.","commonFr":"Anax empereur","factFr":"L'une des plus grandes libellules d'Europe ; le mâle a un thorax bleu vif et patrouille sans repos en vol stationnaire — il est presque impossible de le voir posé pendant les heures chaudes de la journée."},{"id":"Saturnia","common":"Emperor moth","genus":"Saturnia","species":"pavonia","scientificName":"Saturnia pavonia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Saturniini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,84],"fact":"Caterpillars whistle with their breathing pores when disturbed.","commonFr":"Petit paon de nuit","factFr":"Sa femelle libère des phéromones que le mâle détecte à plusieurs kilomètres grâce à ses antennes pectinées spectaculaires — comparable à un GPS chimique d'une précision extraordinaire."},{"id":"Amphimallon","common":"European chafer","genus":"Amphimallon","species":"majale","scientificName":"Amphimallon majale","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Melolonthinae"],["Tribe","Rhizotrogini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Dusk fliers; larvae are root-feeding grubs","habSame":false,"diet":["HER"],"size":[14,18],"fact":"Their buzzy flight at dusk gave them the old English nickname 'summer chafer'.","commonFr":"Hanneton de la Saint-Jean","factFr":"Son vol bourdonnant au crépuscule lui a valu un vieux surnom anglais évoquant sa période de pullulation estivale et ses envols en masse autour des arbres en fin de journée."},{"id":"Ostrinia","common":"European corn borer","genus":"Ostrinia","species":"nubilalis","scientificName":"Ostrinia nubilalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Pyraloidea"],["Family","Crambidae"],["Tribe","Pyraustini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,30],"fact":"Caterpillars bore into corn stalks and ears, hidden from most pesticides.","commonFr":"Pyrale du maïs","factFr":"Ses chenilles forent les tiges et les épis des grandes graminées cultivées, à l'abri de la plupart des insecticides — des milliards de dollars de pertes par an sur les cultures mondiales."},{"id":"Forficula","common":"European earwig","genus":"Forficula","species":"auricularia","scientificName":"Forficula auricularia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Dermaptera"],["Suborder","Neodermaptera"],["Family","Forficulidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Rarely flies","habSame":true,"diet":["OMN"],"size":[11,18],"fact":"Mothers guard their eggs and lick them clean to prevent mould — rare parental care in insects.","commonFr":"Perce-oreille commun","factFr":"Mythologie médiévale tenace : il ne pénètre PAS dans les oreilles. Sa femelle est une mère exceptionnelle — l'une des rares parmi les insectes à couver activement ses œufs et soigner ses petits jusqu'à leur autonomie."},{"id":"Vespa","common":"European hornet","genus":"Vespa","species":"crabro","scientificName":"Vespa crabro","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Vespinae"],["Tribe","Vespini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[25,40],"fact":"Their venom contains a unique compound that triggers a cocktail of pain responses.","commonFr":"Frelon européen","factFr":"Le plus gros guêpe sociale d'Europe — jusqu'à 3,5 cm pour la reine — mais bien moins agressif et toxique qu'on ne le croit ; piqure douloureuse mais en général sans gravité, sauf allergie."},{"id":"Mantis","common":"European mantis","genus":"Mantis","species":"religiosa","scientificName":"Mantis religiosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Mantinae"],["Tribe","Mantini"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Males fly weakly to find females; females rarely","habSame":true,"diet":["CAR"],"size":[60,80],"fact":"Females sometimes eat the male during or after mating — but it's less common than legends say.","commonFr":"Mante religieuse","factFr":"Sa posture de prière n'est qu'une stratégie d'embuscade : pattes ravisseuses prêtes à se déployer à 50 millisecondes ; la femelle dévore le mâle pendant l'accouplement chez 5 à 30 % des couplages."},{"id":"Lucanus","common":"European stag beetle","genus":"Lucanus","species":"cervus","scientificName":"Lucanus cervus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Lucanidae"],["Tribe","Lucanini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae in rotting wood for years; adults fly little","habSame":false,"diet":["HER"],"size":[35,75],"fact":"Males joust with their oversized 'antlers' (modified mandibles) but those antlers are too weak to actually bite.","commonFr":"Lucane cerf-volant","factFr":"Le plus gros coléoptère d'Europe ; les mâles s'affrontent à coups de mandibules ramifiées, qu'ils utilisent pour soulever leurs rivaux et les jeter à bas d'une branche — le perdant retombe brutalement sur le sol."},{"id":"Alaus","common":"Eyed elater","genus":"Alaus","species":"oculatus","scientificName":"Alaus oculatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Elateridae"],["Tribe","Hemirhipini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[25,45],"fact":"Two large false eyespots on its thorax can startle would-be predators.","commonFr":"Taupin à grands yeux","factFr":"Deux énormes ocelles noirs cerclés de blanc sur le thorax simulent un regard de prédateur ; en cas de menace, il claque son thorax pour se propulser en l'air avec un « clic » audible et révéler les fausses pupilles en plein vol."},{"id":"Spodoptera","common":"Fall armyworm","genus":"Spodoptera","species":"frugiperda","scientificName":"Spodoptera frugiperda","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Noctuidae"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"A single moth can lay up to 1,000 eggs and the larvae chew through nearly any crop.","commonFr":"Légionnaire d'automne","factFr":"Chenille polyphage qui se déplace en hordes voraces ; depuis 2016 elle a colonisé l'Afrique puis l'Asie, ravageant des millions d'hectares de maïs et de riz hors de son aire d'origine américaine."},{"id":"Gryllus","common":"Field cricket","genus":"Gryllus","species":"campestris","scientificName":"Gryllus campestris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Gryllidae"],["Subfamily","Gryllinae"],["Tribe","Gryllini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[17,25],"fact":"Males have a different chirp for territory, courtship, and aggression — a tiny vocabulary of songs.","commonFr":"Grillon champêtre","factFr":"Le mâle creuse un terrier en forme de Y et stridule à l'entrée pour amplifier son chant ; chaque mâle défend un territoire et combat les concurrents à coups de mandibules — un véritable rituel de tournoi."},{"id":"Thermobia","common":"Firebrat","genus":"Thermobia","species":"domestica","scientificName":"Thermobia domestica","lineage":[["Order","Zygentoma"],["Family","Lepismatidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[11,15],"fact":"Loves warm spots and is often found near bakery ovens and steam pipes.","commonFr":"Lépisme des fourneaux","factFr":"Préfère la chaleur des fours et des conduits ; capable de jeûner des mois entiers et de digérer la cellulose grâce à des bactéries symbiotiques, il infeste les boulangeries et les imprimeries."},{"id":"Pyrrhocoris","common":"Firebug","genus":"Pyrrhocoris","species":"apterus","scientificName":"Pyrrhocoris apterus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pyrrhocoroidea"],["Family","Pyrrhocoridae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Most adults are short-winged and flightless","habSame":true,"diet":["HER"],"size":[9,12],"fact":"Often forms large aggregations on sunny tree trunks, especially in spring.","commonFr":"Gendarme","factFr":"Rouge vif et noir, on le voit en grappes sur les troncs de tilleul au printemps ; cet insecte ne pique pas et ne mord pas, et tire ses couleurs des graines toxiques qu'il consomme."},{"id":"Chauliodes","common":"Fishfly","genus":"Chauliodes","species":"rastricornis","scientificName":"Chauliodes rastricornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Megaloptera"],["Family","Corydalidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,60],"fact":"Has comb-like 'feathered' antennae to detect mates by scent.","commonFr":"Chauliode peigne","factFr":"Mégaloptère nocturne aux ailes brunes tachetées et aux antennes pectinées spectaculaires chez le mâle ; sa larve aquatique vit dans les ruisseaux et est un excellent indicateur de la qualité de l'eau."},{"id":"Altica","common":"Flea beetle","genus":"Altica","species":"lythri","scientificName":"Altica lythri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Chrysomelidae"],["Subfamily","Galerucinae"],["Tribe","Alticini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[3,5],"fact":"They jump using a spring-loaded mechanism in their hind legs, similar to fleas.","commonFr":"Altise de la salicaire","factFr":"Petit coléoptère vert métallique qui saute brusquement sur plusieurs centimètres quand on l'approche — ses pattes arrière surdéveloppées contiennent un mécanisme à ressort comparable à celui des puces."},{"id":"Sarcophaga","common":"Flesh fly","genus":"Sarcophaga","species":"carnaria","scientificName":"Sarcophaga carnaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Sarcophagidae"],["Tribe","Sarcophagini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,14],"fact":"Females don't lay eggs — they give birth to live larvae directly onto carrion.","commonFr":"Mouche grise de la viande","factFr":"Au lieu de pondre des œufs comme la plupart des diptères, la femelle produit directement de petites larves qu'elle dépose sur une charogne ou une plaie — un raccourci évolutif qui lui donne une longueur d'avance sur les autres mouches dans la course à la carcasse."},{"id":"Anaea","common":"Florida leafwing","genus":"Anaea","species":"troglodyta","scientificName":"Anaea troglodyta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Charaxinae"],["Tribe","Anaeini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,70],"fact":"So cryptic with closed wings that it perfectly mimics a dead leaf — complete with veins, mould spots and a tear in the edge for good measure. The Caribbean population is the nominate of the species.","commonFr":"Papillon feuille de Floride","factFr":"Si camouflé ailes fermées qu'il imite parfaitement une feuille morte — complète avec nervures, taches de moisi et une déchirure sur le bord, pour faire bonne mesure. La population caraïbe est la sous-espèce nominale."},{"id":"Phromnia","common":"Flower-spike bug","genus":"Phromnia","species":"rosea","scientificName":"Phromnia rosea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Flatidae"],["Subfamily","Flatinae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Madagascan dry tropical forest; gregarious on lianas","habSame":true,"diet":["HER"],"size":[10,14],"fact":"Lines up in dozens along a twig with each individual angled just right — adults rose-pink, nymphs powdery-white — together creating the perfect illusion of a tropical inflorescence in full bloom.","commonFr":"Fulgore rose-fleur","factFr":"Aligne des dizaines d'individus le long d'une brindille avec chaque insecte positionné juste comme il faut — adultes rose, nymphes blanc poudré — l'ensemble créant l'illusion parfaite d'une inflorescence tropicale en pleine floraison."},{"id":"Charaxes","common":"Forest emperor","genus":"Charaxes","species":"candiope","scientificName":"Charaxes candiope","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Charaxinae"],["Tribe","Charaxini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[70,90],"fact":"Powerful African butterflies that prefer fermenting fruit and animal dung over flowers — a quick way to catch one is a banana left rotting in the sun.","commonFr":"Charaxes de la forêt","factFr":"Lépidoptère africain robuste et rapide, attiré par les fruits fermentés et les bouses d'éléphant ; il défend son territoire avec une telle agressivité qu'il chasse les autres papillons mais aussi les guêpes."},{"id":"Mecistogaster","common":"Forest giant damselfly","genus":"Mecistogaster","species":"linearis","scientificName":"Mecistogaster linearis","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Pseudostigmatidae"]],"dist":["NEO"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"Larvae develop in tree-hole water","habSame":false,"diet":["CAR"],"size":[120,150],"fact":"Hovers slowly through rainforest understory like a tiny helicopter, plucking spiders straight out of their webs without ever getting caught itself.","commonFr":"Demoiselle géante des forêts","factFr":"L'un des zygoptères les plus longs au monde, avec un abdomen filiforme de 10 cm ; chasse les araignées dans leurs toiles, qu'elle arrache sans s'y prendre, puis dépose ses œufs dans l'eau des broméliacées."},{"id":"Coptotermes","common":"Formosan termite","genus":"Coptotermes","species":"formosanus","scientificName":"Coptotermes formosanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Rhinotermitidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[4,7],"fact":"A single mature colony can contain millions and consume kilograms of wood a year.","commonFr":"Termite de Formose","factFr":"Originaire d'Asie du Sud-Est, fondateur de colonies massives de plusieurs millions d'individus ; introduit accidentellement en Amérique du Nord, il y détruit aujourd'hui des quartiers historiques entiers de la Nouvelle-Orléans."},{"id":"Libellula","common":"Four-spotted chaser","genus":"Libellula","species":"quadrimaculata","scientificName":"Libellula quadrimaculata","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,48],"fact":"Catches prey mid-air with a 95% success rate, among the best of any predator.","commonFr":"Libellule à quatre taches","factFr":"Migratrice partielle, elle forme parfois d'immenses essaims qui traversent l'Europe en plein été ; on a vu des nuages de plusieurs millions d'individus en mer du Nord, déboussolés par les vents."},{"id":"Drosophila","common":"Fruit fly","genus":"Drosophila","species":"melanogaster","scientificName":"Drosophila melanogaster","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Ephydroidea"],["Family","Drosophilidae"],["Tribe","Drosophilini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[2,4],"fact":"More Nobel Prizes have been awarded for research on this fly than any other animal.","commonFr":"Drosophile du vinaigre","factFr":"Organisme modèle de la génétique mondiale depuis 1910 ; son cycle court (2 semaines), ses chromosomes géants dans les glandes salivaires et son patrimoine génétique de seulement 4 chromosomes en ont fait la star des labos."},{"id":"Bradysia","common":"Fungus gnat","genus":"Bradysia","species":"impatiens","scientificName":"Bradysia impatiens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Bibionomorpha"],["Family","Sciaridae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[2,4],"fact":"Larvae attack plant roots and are a major greenhouse pest, despite being only a few millimetres long.","commonFr":"Moucheron des terreaux","factFr":"Sa larve s'attaque aux jeunes racines des plantes d'intérieur en pot, surtout dans les substrats gardés trop humides ; la guérison passe par un séchage de la motte qui détruit les œufs déposés en surface."},{"id":"Arctia","common":"Garden tiger moth","genus":"Arctia","species":"caja","scientificName":"Arctia caja","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"],["Subfamily","Arctiinae"],["Tribe","Arctiini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,70],"fact":"Adults can produce ultrasonic clicks that jam bat sonar.","commonFr":"Écaille martre","factFr":"Ses ailes avant brun et crème servent de camouflage, mais quand on le menace il les écarte pour révéler des ailes arrière rouge vif avec des taches noires — un avertissement vrai car ses tissus contiennent des toxines."},{"id":"Blattella","common":"German cockroach","genus":"Blattella","species":"germanica","scientificName":"Blattella germanica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Family","Ectobiidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Rarely flies","habSame":true,"diet":["OMN"],"size":[13,16],"fact":"Females carry their egg case until the eggs are nearly ready to hatch — a parental rarity for roaches.","commonFr":"Blatte germanique","factFr":"La blatte la plus envahissante au monde dans les cuisines et restaurants ; sa femelle transporte son ootèque attachée à l'arrière du corps presque jusqu'à l'éclosion, ce qui protège mieux ses œufs et explique son succès reproductif."},{"id":"Phyllocrania","common":"Ghost mantis","genus":"Phyllocrania","species":"paradoxa","scientificName":"Phyllocrania paradoxa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Empusidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[45,55],"fact":"Sways in the wind to mimic a dead leaf even when standing still.","commonFr":"Mante fantôme","factFr":"Petite mante africaine au corps découpé qui imite une feuille morte froissée — de couleur variable du vert au brun selon l'environnement ; vit cachée dans les arbustes et reste presque parfaitement immobile pendant des heures."},{"id":"Macropanesthia","common":"Giant burrowing cockroach","genus":"Macropanesthia","species":"rhinoceros","scientificName":"Macropanesthia rhinoceros","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Superfamily","Blaberoidea"],["Family","Blaberidae"],["Subfamily","Geoscapheinae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Digs metre-deep burrows in dry eucalyptus woodland of Queensland","habSame":true,"diet":["OMN"],"size":[60,85],"fact":"The heaviest cockroach on Earth, weighing more than a small mouse — it lives for over a decade in deep burrows, never flies, doesn't bite, and is sold as a popular if unusual pet in Australia.","commonFr":"Blatte fouisseuse géante","factFr":"La plus lourde de toutes les blattes, plus pesante qu'une petite souris — vit plus de 10 ans dans des galeries profondes, ne vole jamais, ne mord pas, et se vend comme animal de compagnie en Australie."},{"id":"Tetracanthagyna","common":"Giant hawker dragonfly","genus":"Tetracanthagyna","species":"plagiata","scientificName":"Tetracanthagyna plagiata","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"]],"dist":["IND"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[105,125],"fact":"The world's heaviest dragonfly — a Bornean monster whose larva can take three years in a forest pond to grow, then takes vertebrate-sized prey as an adult.","commonFr":"Aeschne géante","factFr":"La plus grande libellule du monde par l'envergure (165 mm) ; elle vole en pleine nuit dans les forêts pluviales de Bornéo et chasse même de petits oiseaux pris dans des toiles d'araignée."},{"id":"Megarhyssa","common":"Giant ichneumon wasp","genus":"Megarhyssa","species":"macrurus","scientificName":"Megarhyssa macrurus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Parasitica"],["Superfamily","Ichneumonoidea"],["Family","Ichneumonidae"],["Tribe","Rhyssini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae parasitise wood-boring hosts inside trees","habSame":false,"diet":["CAR"],"size":[30,50],"fact":"Females drill ovipositors several centimetres into wood to parasitise hidden horntail larvae.","commonFr":"Ichneumon géant","factFr":"La femelle a un ovipositeur trois fois plus long que son corps qu'elle enfonce à travers l'écorce d'un arbre jusqu'à atteindre une larve de coléoptère xylophage — sa propre larve naîtra à l'intérieur et la dévorera de l'intérieur."},{"id":"Polystoechotes","common":"Giant lacewing","genus":"Polystoechotes","species":"punctata","scientificName":"Polystoechotes punctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Ithonidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,40],"fact":"A rare relict species, mostly known from mountain forests in western North America.","commonFr":"Chrysope géante","factFr":"Espèce nord-américaine rare et primitive aux ailes diaphanes ponctuées ; les biologistes la considèrent comme un fossile vivant, témoignant d'une lignée presque entièrement disparue depuis le Crétacé."},{"id":"Pseudophyllus","common":"Giant leaf katydid","genus":"Pseudophyllus","species":"titan","scientificName":"Pseudophyllus titan","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Pseudophyllinae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[120,160],"fact":"A katydid the size of a small bird, painted in shades of fading green — when it freezes on a branch the eye refuses to register it as anything but a torn rainforest leaf.","commonFr":"Sauterelle feuille géante","factFr":"Énorme tettigonidé asiatique dont les élytres copient parfaitement une feuille fraîche, nervures comprises ; vit dans la canopée des forêts pluviales et stridule fort à la nuit tombée."},{"id":"Extatosoma","common":"Giant prickly stick insect","genus":"Extatosoma","species":"tiaratum","scientificName":"Extatosoma tiaratum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females flightless","habSame":true,"diet":["HER"],"size":[110,200],"fact":"Nymphs mimic local ants until they're large enough to look like sticks.","commonFr":"Phasme à tiare","factFr":"Phasme australien massif aux excroissances feuillues qui imitent à la fois un lichen et une feuille morte ; sa femelle catapulte ses œufs au sol, qui sont alors transportés par des fourmis comme des graines à élaïosome."},{"id":"Cocytius","common":"Giant sphinx","genus":"Cocytius","species":"antaeus","scientificName":"Cocytius antaeus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Sphingini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[140,180],"fact":"Its 25-cm tongue is the only one long enough to reach inside the white blossoms of the rare ghost orchid in the Everglades — without this moth, the orchid cannot set seed.","commonFr":"Sphinx géant","factFr":"L'un des plus grands sphinx du Nouveau Monde, avec une trompe de 18 cm capable d'atteindre le nectar au fond des fleurs de chèvrefeuille tropical ; vol stationnaire si rapide qu'on dirait un colibri."},{"id":"Eurycantha","common":"Giant spiny stick insect","genus":"Eurycantha","species":"calcarata","scientificName":"Eurycantha calcarata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Lonchodidae"],["Subfamily","Lonchodinae"],["Tribe","Eurycanthini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[120,150],"fact":"Males wield a single huge curved spine on each hind leg, capable of stabbing through a rat's skull — a defence used against tree-climbing predators.","commonFr":"Phasme épineux géant","factFr":"Phasme massif et terrestre, plus tank que brindille ; le mâle porte un long éperon sur ses pattes arrière dont il se sert pour serrer comme une pince contre tout prédateur qui le saisit — une morsure de doigt humain saigne."},{"id":"Dorcus","common":"Giant stag beetle","genus":"Dorcus","species":"titanus","scientificName":"Dorcus titanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Lucanidae"],["Tribe","Dorcini"]],"dist":["PAL","IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae in decaying logs","habSame":false,"diet":["HER"],"size":[30,90],"fact":"Captive specimens can live up to 7 years — extreme longevity for a beetle.","commonFr":"Lucane titan","factFr":"L'un des plus grands lucanes au monde, vénéré dans la culture japonaise du « mushi-tori » (collection d'insectes) ; les meilleurs spécimens se vendent en élevage à plusieurs centaines d'euros pièce."},{"id":"Graphium","common":"Tailed jay","genus":"Graphium","species":"agamemnon","scientificName":"Graphium agamemnon","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Leptocircini"]],"dist":["IND"],"hab":["AER","TER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[75,90],"fact":"An apple-green tessellated pattern on a black background turns this swallowtail into a moving stained-glass window as it darts through the rainforest canopy; it almost never stops, drinking nectar in mid-flight with rapid wing-beats so vigorous that the wings often appear simply as a green blur to anyone trying to follow it with binoculars.","commonFr":"Papillon Agamemnon","factFr":"Un motif vert pomme tesselé sur fond noir transforme ce papillon à queue en vitrail mouvant lorsqu'il file dans la canopée tropicale ; il ne se pose presque jamais et butine en plein vol avec des battements d'ailes si rapides que celles-ci n'apparaissent souvent que comme un flou vert pour qui tente de le suivre aux jumelles."},{"id":"Lethocerus","common":"Giant water bug","genus":"Lethocerus","species":"americanus","scientificName":"Lethocerus americanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Belostomatidae"],["Tribe","Lethocerini"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AQU","AER"],"habLarva":["AQU"],"habNote":"Flies between water bodies","habSame":false,"diet":["CAR"],"size":[50,80],"fact":"Can deliver one of the most painful bites in the insect world and inject digestive juices.","commonFr":"Punaise d'eau géante","factFr":"Prédateur aquatique massif capable de chasser des grenouilles et de petits poissons ; injecte une salive digestive dans ses proies, dissout leur intérieur, et boit ensuite la soupe. Son surnom « toe-biter » vient d'expériences douloureuses pour les baigneurs."},{"id":"Trachelophorus","common":"Giraffe weevil","genus":"Trachelophorus","species":"giraffa","scientificName":"Trachelophorus giraffa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Attelabidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[20,25],"fact":"Females roll a leaf into a tube and lay a single egg inside, like origami nurseries.","commonFr":"Charançon girafe","factFr":"Curculionoïdé endémique de Madagascar dont le mâle a un cou hypertrophié, trois fois la longueur de son corps ; il s'en sert pour rouler une feuille en cigare comme nid d'élevage pour ses œufs."},{"id":"Mantophasma","common":"Gladiator","genus":"Mantophasma","species":"zephyra","scientificName":"Mantophasma zephyra","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Notoptera"],["Suborder","Mantophasmatodea"],["Family","Mantophasmatidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[10,25],"fact":"Discovered only in 2002, making it the most recently described insect order.","commonFr":"Gladiateur","factFr":"Représente un ordre d'insectes découvert seulement en 2002, l'une des plus grandes surprises entomologiques modernes ; ces petits prédateurs sans ailes vivent dans le désert namibien, fossiles vivants oubliés depuis 45 millions d'années."},{"id":"Greta","common":"Glasswing butterfly","genus":"Greta","species":"oto","scientificName":"Greta oto","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Danainae"],["Tribe","Ithomiini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,60],"fact":"Its wings are transparent because their scales lack pigment — predators struggle to track them.","commonFr":"Papillon aux ailes de verre","factFr":"Ses élytres transparents ne réfléchissent presque aucune lumière grâce à une nanostructure anti-reflet inspirant aujourd'hui les écrans de téléphones ; ce papillon centraméricain disparaît littéralement face à un prédateur."},{"id":"Homalodisca","common":"Glassy-winged sharpshooter","genus":"Homalodisca","species":"vitripennis","scientificName":"Homalodisca vitripennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Membracoidea"],["Family","Cicadellidae"],["Tribe","Proconiini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[12,14],"fact":"Catapults droplets of waste off its abdomen at over 100 g acceleration.","commonFr":"Cicadelle vitreuse","factFr":"Vecteur principal de la maladie de Pierce, qui décime les vignobles californiens ; capable de projeter ses excréments aqueux comme un jet d'eau, d'où son surnom anglais."},{"id":"Cephalotes","common":"Gliding turtle ant","genus":"Cephalotes","species":"atratus","scientificName":"Cephalotes atratus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Cephalotini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Lives in tree cavities; blocks nest holes with its head","habSame":true,"diet":["HER"],"size":[4,9],"fact":"When knocked off a branch, this wingless ant steers in midair and glides backwards onto the trunk — the first animal known to actively control a fall.","commonFr":"Fourmi planeur","factFr":"Si une ouvrière tombe d'un arbre, elle ne tombe pas en chute libre : elle utilise son corps aplati comme une planche et glisse en plein air pour rejoindre le tronc sur lequel elle se trouvait — première fourmi vraiment plane découverte."},{"id":"Lampyris","common":"Glow-worm","genus":"Lampyris","species":"noctiluca","scientificName":"Lampyris noctiluca","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Lampyridae"],["Tribe","Lampyrini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females wingless; only males fly","habSame":true,"diet":["CAR"],"size":[15,25],"fact":"Adult females are wingless and glow brightly to attract flying males.","commonFr":"Ver luisant","factFr":"La femelle, aptère et ressemblant à une larve, émet une lumière verte continue par son abdomen pour attirer le mâle volant ; phénomène devenu rare dans les campagnes éclairées artificiellement."},{"id":"Phengodes","common":"Glowworm beetle","genus":"Phengodes","species":"plumosa","scientificName":"Phengodes plumosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Elateroidea"],["Family","Phengodidae"]],"dist":["NEA","NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larviform females glow green; males look totally different","habSame":true,"diet":["CAR"],"size":[10,35],"fact":"Females stay larva-like for life and glow like tiny green railway lines along their flanks — males fly above with enormous comb antennae and never glow at all.","commonFr":"Coléoptère luminescent","factFr":"Mâle aux antennes en plume spectaculaire qui détectent les phéromones des femelles à plusieurs centaines de mètres ; la femelle est luminescente et larviforme toute sa vie, ne se métamorphosant jamais en adulte ailé."},{"id":"Cossus","common":"Goat moth","genus":"Cossus","species":"cossus","scientificName":"Cossus cossus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Cossoidea"],["Family","Cossidae"],["Tribe","Cossini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillars bore inside tree trunks for years","habSame":false,"diet":["HER"],"size":[65,90],"fact":"Caterpillars smell strongly of goats — hence the name — and can live up to 5 years in trees.","commonFr":"Cossus gâte-bois","factFr":"Sa chenille géante rougeâtre forge des galeries dans le bois vivant des saules et des chênes pendant 3 à 5 ans, et dégage une odeur forte de bouc — d'où le nom anglais qui fait référence à cette signature olfactive."},{"id":"Cordulegaster","common":"Golden-ringed dragonfly","genus":"Cordulegaster","species":"boltonii","scientificName":"Cordulegaster boltonii","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Cordulegastroidea"],["Family","Cordulegastridae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[70,85],"fact":"Eggs are inserted into wet streamside soil with a chisel-like ovipositor.","commonFr":"Cordulégastre annelé","factFr":"Grande libellule annelée des torrents européens ; sa nymphe vit jusqu'à 5 ans enfouie dans le sable du lit de la rivière, ne sortant la tête que pour saisir les proies qui passent."},{"id":"Goliathus","common":"Goliath beetle","genus":"Goliathus","species":"goliatus","scientificName":"Goliathus goliatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Cetoniinae"],["Tribe","Goliathini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva in soil and rotting wood; adult on trees","habSame":false,"diet":["HER"],"size":[60,110],"fact":"One of the heaviest insects on Earth, adults reach 100 g; they feed on tree sap and fruit in the wild, and their grub-stage lasts 9–18 months inside decaying wood.","commonFr":"Goliath","factFr":"L'un des plus lourds insectes du monde, jusqu'à 100 grammes adulte ; ses larves dévorent le bois pourri pendant 9 à 18 mois avant de pupaiser dans des coques de la taille d'une orange."},{"id":"Mecynorrhina","common":"Goliath flower beetle","genus":"Mecynorrhina","species":"torquata","scientificName":"Mecynorrhina torquata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Cetoniinae"],["Tribe","Goliathini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,85],"fact":"African giants the size of a child's fist — males carry a Y-shaped horn used in wrestling matches over tree sap, while their flight sounds like a small drone passing by.","commonFr":"Cetonia royale africaine","factFr":"Géants africains de la taille d'un poing d'enfant — les mâles portent une corne en Y avec laquelle ils luttent pour la sève d'arbre, et leur vol résonne comme un petit drone qui passe."},{"id":"Eurycnema","common":"Goliath stick insect","genus":"Eurycnema","species":"goliath","scientificName":"Eurycnema goliath","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Males can fly; females flightless","habSame":true,"diet":["HER"],"size":[180,250],"fact":"One of the largest insects in Australia, with females reaching 25 cm.","commonFr":"Phasme Goliath","factFr":"Phasme australien massif aux nervures alaires roses ; quand on le menace, il déploie brusquement ses ailes pour révéler ces couleurs vives — un effet de surprise visuel destiné aux oiseaux."},{"id":"Gomphus","common":"Gomphid dragonfly","genus":"Gomphus","species":"vulgatissimus","scientificName":"Gomphus vulgatissimus","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Gomphoidea"],["Family","Gomphidae"],["Tribe","Gomphini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[45,55],"fact":"Has eyes set apart like a hammerhead shark — most dragonflies have eyes that touch.","commonFr":"Gomphus vulgaire","factFr":"Anisoptère trapu aux yeux écartés (caractéristique unique chez les libellules européennes) ; chasse à l'affût posé sur une pierre, contrairement à ses cousines qui patrouillent en vol."},{"id":"Dytiscus","common":"Great diving beetle","genus":"Dytiscus","species":"marginalis","scientificName":"Dytiscus marginalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Dytiscidae"],["Tribe","Dytiscini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"Fully aquatic; flies between water bodies","habSame":true,"diet":["CAR"],"size":[27,35],"fact":"Adults carry a bubble of air under their wings like a scuba tank.","commonFr":"Dytique bordé","factFr":"Coléoptère aquatique aux pattes en rame, ses larves « tigres d'eau » sont des prédateurs redoutables qui injectent des sucs digestifs dans leurs proies puis aspirent l'intérieur dissout."},{"id":"Tettigonia","common":"Great green bush-cricket","genus":"Tettigonia","species":"viridissima","scientificName":"Tettigonia viridissima","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Tettigoniinae"],["Tribe","Tettigoniini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[28,42],"fact":"Males chirp by rubbing wing-ribs together at over 50 strokes per second.","commonFr":"Grande sauterelle verte","factFr":"Sa stridulation persistante en plein été est l'un des sons emblématiques des prairies européennes ; carnivore et cannibale, elle dévore d'autres insectes — y compris ses congénères — quand l'occasion se présente."},{"id":"Phryganea","common":"Great red sedge","genus":"Phryganea","species":"grandis","scientificName":"Phryganea grandis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Phryganeidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[20,30],"fact":"Larvae build portable houses from plant material and carry them along on the streambed.","commonFr":"Grande phrygane","factFr":"Sa larve aquatique construit un fourreau cylindrique en assemblant brindilles, sable et feuilles — qu'elle traîne partout comme une maison portable, ne sortant que la tête et les pattes pour avancer."},{"id":"Hydrophilus","common":"Great silver water beetle","genus":"Hydrophilus","species":"piceus","scientificName":"Hydrophilus piceus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Hydrophiloidea"],["Family","Hydrophilidae"],["Tribe","Hydrophilini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["OMN"],"size":[37,50],"fact":"Among the largest aquatic insects in Europe, with adults reaching 5 cm.","commonFr":"Hydrophile noir","factFr":"Un des plus grands coléoptères aquatiques d'Europe ; respire en transportant une bulle d'air argentée sur sa face ventrale, recouverte de poils hydrophobes denses qui forment une véritable réserve d'oxygène."},{"id":"Ephemera","common":"Green drake mayfly","genus":"Ephemera","species":"danica","scientificName":"Ephemera danica","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Furcatergalia"],["Family","Ephemeridae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[15,25],"fact":"Adults live only 1 to 2 days — sometimes just hours — long enough to mate and lay eggs.","commonFr":"Manne","factFr":"Sortie en mai des rivières par millions d'individus, l'adulte vit moins de 48 heures et n'a même pas de bouche fonctionnelle ; les truites en font leurs orgies, et les pêcheurs à la mouche tentent d'imiter sa silhouette depuis le XVIIe siècle."},{"id":"Chrysoperla","common":"Green lacewing","genus":"Chrysoperla","species":"carnea","scientificName":"Chrysoperla carnea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Chrysopidae"],["Tribe","Chrysopini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Larvae camouflage themselves by sticking the dried husks of their prey onto their backs.","commonFr":"Chrysope verte","factFr":"Aux yeux dorés et aux ailes diaphanes en filet, c'est l'une des stars du contrôle biologique : sa larve dévore jusqu'à 600 pucerons avant de pupaiser, et on les vend par cartons aux serristes."},{"id":"Myzus","common":"Green peach aphid","genus":"Myzus","species":"persicae","scientificName":"Myzus persicae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Aphidoidea"],["Family","Aphididae"],["Tribe","Macrosiphini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Most generations wingless; only migratory generation flies","habSame":true,"diet":["HER"],"size":[2,3],"fact":"Mostly all-female; mothers give birth to live, already-pregnant daughters.","commonFr":"Puceron vert du pêcher","factFr":"Vecteur de plus de 100 virus phytopathogènes différents ; ses femelles se reproduisent sans mâle pendant l'été et donnent naissance à des clones déjà enceintes — un type de gigogne biologique unique au règne animal."},{"id":"Cicindela","common":"Green tiger beetle","genus":"Cicindela","species":"campestris","scientificName":"Cicindela campestris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Cicindelinae"],["Tribe","Cicindelini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["TER","AER"],"habLarva":["TER"],"habNote":"Adults active fliers; larvae ambush from burrows","habSame":false,"diet":["CAR"],"size":[10,20],"fact":"They run so fast they go temporarily blind and have to stop to refocus on prey.","commonFr":"Cicindèle champêtre","factFr":"Court si vite sur les chemins ensoleillés que son cerveau ne traite plus assez vite les images : elle s'arrête, regarde, repart — un véritable bug de vitesse trop élevée pour sa propre vision."},{"id":"Lucilia","common":"Greenbottle fly","genus":"Lucilia","species":"sericata","scientificName":"Lucilia sericata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Calliphoridae"],["Tribe","Luciliini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[8,10],"fact":"Used in 'maggot therapy' to clean wounds — the larvae eat dead tissue but spare living flesh.","commonFr":"Mouche verte","factFr":"Sa larve est utilisée en médecine pour nettoyer les plaies nécrosées : elle ne dévore que les tissus morts, laissant la chair saine intacte ; bénéficie d'une AMM dans plusieurs pays européens."},{"id":"Heliothrips","common":"Greenhouse thrips","genus":"Heliothrips","species":"haemorrhoidalis","scientificName":"Heliothrips haemorrhoidalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Thysanoptera"],["Suborder","Terebrantia"],["Family","Thripidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Glasshouse staple — its fringed wings let it 'row' through the air.","commonFr":"Thrips des serres","factFr":"Minuscule insecte de moins de 2 mm qui pique les feuilles des plantes ornementales sous abri et y laisse des taches argentées ; sa reproduction en parthénogenèse explique l'explosion soudaine des populations."},{"id":"Trialeurodes","common":"Greenhouse whitefly","genus":"Trialeurodes","species":"vaporariorum","scientificName":"Trialeurodes vaporariorum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Aleyrodoidea"],["Family","Aleyrodidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Adults look like tiny moths but are actually true bugs that suck plant sap.","commonFr":"Aleurode des serres","factFr":"Quand on secoue une plante infestée, on voit un nuage blanc s'envoler : ce sont les adultes qui décollent ; ses larves quasi-immobiles aspirent la sève des feuilles et excrètent un miellat dont profite la fumagine noire."},{"id":"Lymantria","common":"Gypsy moth","genus":"Lymantria","species":"dispar","scientificName":"Lymantria dispar","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"],["Subfamily","Lymantriinae"],["Tribe","Lymantriini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Asian females fly; European 'gypsy' females are flightless","habSame":false,"diet":["HER"],"size":[35,55],"fact":"Females release a pheromone so strong it can attract males from kilometres downwind.","commonFr":"Bombyx disparate","factFr":"Originaire d'Eurasie, ses chenilles défolient les forêts entières — elles peuvent transformer une feuillaie en squelette en quelques semaines. Introduite par mégarde en Amérique du Nord, elle y reste un fléau forestier majeur."},{"id":"Bittacus","common":"Hangingfly","genus":"Bittacus","species":"italicus","scientificName":"Bittacus italicus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Mecoptera"],["Family","Bittacidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[15,25],"fact":"Catches small flies in mid-air using its hind legs like sticky claws.","commonFr":"Bittaque","factFr":"Insecte aux longues pattes pendantes qui se suspend à un brin d'herbe avec une seule patte avant et attrape ses proies au passage avec les autres ; le mâle offre à sa partenaire un cadeau de proie pendant la copulation, et la durée du repas détermine la quantité de sperme transférée."},{"id":"Acrocinus","common":"Harlequin beetle","genus":"Acrocinus","species":"longimanus","scientificName":"Acrocinus longimanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Lamiinae"],["Tribe","Acrocinini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae bore in fig trees","habSame":false,"diet":["HER"],"size":[70,80],"fact":"Its 'harlequin' pattern is matched by absurdly long forelegs — sometimes longer than its body.","commonFr":"Capricorne arlequin","factFr":"Sa palette colorée est complétée par des pattes avant absurdement longues — parfois plus longues que son corps — que les mâles utilisent pour s'agripper et se battre sur les troncs d'arbre pour la femelle."},{"id":"Harmonia","common":"Harlequin ladybird","genus":"Harmonia","species":"axyridis","scientificName":"Harmonia axyridis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Coccinelloidea"],["Family","Coccinellidae"],["Tribe","Coccinellini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[5,8],"fact":"Introduced for pest control, it now outcompetes native ladybugs across multiple continents.","commonFr":"Coccinelle asiatique","factFr":"Introduite en Europe pour lutter contre les pucerons, elle s'est imposée aux dépens des coccinelles indigènes ; quand on l'écrase, elle libère un liquide jaunâtre qui tache et sent fort — d'où sa réputation de visiteur d'automne pas toujours bienvenu."},{"id":"Aeshna","common":"Hawker dragonfly","genus":"Aeshna","species":"cyanea","scientificName":"Aeshna cyanea","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Aeshnoidea"],["Family","Aeshnidae"],["Tribe","Aeshnini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[60,75],"fact":"Hovers, hovers backwards and even hovers upside-down with stunning agility.","commonFr":"Aeshne bleue","factFr":"Grande libellule au thorax bleu et vert qui chasse au crépuscule dans les jardins ; capable de tourner à 90° en un battement d'aile grâce à ses quatre ailes contrôlables indépendamment — une prouesse aérodynamique inégalée."},{"id":"Pediculus","common":"Head louse","genus":"Pediculus","species":"humanus","scientificName":"Pediculus humanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Phthiraptera"],["Suborder","Anoplura"],["Family","Pediculidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless, on host","habSame":true,"diet":["CAR"],"size":[2,4],"fact":"Lives only on humans and our closest primate relatives.","commonFr":"Pou de tête","factFr":"Parasite obligatoire des humains depuis 6 millions d'années — son ADN coévolutif avec le nôtre a même servi à reconstituer l'histoire de la migration humaine et l'apparition des vêtements."},{"id":"Heliconius","common":"Heliconian","genus":"Heliconius","species":"melpomene","scientificName":"Heliconius melpomene","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Heliconiinae"],["Tribe","Heliconiini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[70,90],"fact":"Both sexes can learn from each other and even copy egg-laying choices, a rare 'cultural' trait.","commonFr":"Heliconius","factFr":"Toxique car sa chenille mange des passiflores empoisonnées ; les couleurs vives de ses ailes ont coévolué avec d'autres papillons toxiques pour former des « signaux d'avertissement standardisés » que les oiseaux apprennent une fois pour toutes."},{"id":"Megaloprepus","common":"Helicopter damselfly","genus":"Megaloprepus","species":"caerulatus","scientificName":"Megaloprepus caerulatus","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Pseudostigmatidae"]],"dist":["NEO"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[70,100],"fact":"The world's largest damselfly, with a wingspan of nearly 19 cm.","commonFr":"Demoiselle hélicoptère","factFr":"Le plus grand zygoptère du monde, 19 cm d'envergure ; vole lentement entre les arbres de la forêt tropicale avec un battement d'ailes si lent qu'il évoque les pales d'un petit aéronef."},{"id":"Dynastes","common":"Hercules beetle","genus":"Dynastes","species":"hercules","scientificName":"Dynastes hercules","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Dynastinae"],["Tribe","Dynastini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva in rotting wood; adult on tree trunks","habSame":false,"diet":["HER"],"size":[50,170],"fact":"Males can lift 850 times their body weight, the equivalent of a human carrying a small whale.","commonFr":"Scarabée Hercule","factFr":"Le mâle porte deux cornes en pince — l'une sur le pronotum, l'autre sur la tête — pour soulever et jeter ses rivaux des branches ; capable de transporter 850 fois son poids, l'animal terrestre le plus fort par sa propre masse."},{"id":"Coscinocera","common":"Hercules moth","genus":"Coscinocera","species":"hercules","scientificName":"Coscinocera hercules","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Attacini"]],"dist":["OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Adults cannot eat; live ~10 days","habSame":false,"diet":["HER"],"size":[200,270],"fact":"Australia's largest moth — a female's wings cover more area than a human hand, all to launch eggs in a brief life that never includes a meal.","commonFr":"Bombyx Hercule","factFr":"Le plus grand papillon d'Australie — ses ailes femelles couvrent plus de surface qu'une main humaine — tout cela pour lancer ses œufs dans une vie brève qui ne comprend jamais de repas."},{"id":"Mayetiola","common":"Hessian fly","genus":"Mayetiola","species":"destructor","scientificName":"Mayetiola destructor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Bibionomorpha"],["Family","Cecidomyiidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[2,3],"fact":"Hidden inside wheat stems, it has shaped wheat-breeding programs for over a century.","commonFr":"Cécidomyie destructrice","factFr":"Minuscule moucheron dont la larve provoque le rabougrissement des tiges de blé jusqu'à les faire tomber ; introduite accidentellement avec la paille des chevaux de cavalerie hessoise pendant la guerre d'indépendance américaine."},{"id":"Myrmecocystus","common":"Honeypot ant","genus":"Myrmecocystus","species":"mexicanus","scientificName":"Myrmecocystus mexicanus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Lasiini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[5,10],"fact":"Specialist 'honeypot' workers gorge on nectar until they're living storage jars for the colony.","commonFr":"Fourmi à miel","factFr":"Des ouvrières « jarres vivantes » se gavent de nectar jusqu'à ce que leur abdomen translucide gonfle, ressemblant à des billes ambrées suspendues au plafond du nid ; elles servent de garde-manger collectif pour les périodes de sécheresse."},{"id":"Urocerus","common":"Horntail","genus":"Urocerus","species":"gigas","scientificName":"Urocerus gigas","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Symphyta"],["Superfamily","Siricoidea"],["Family","Siricidae"],["Tribe","Siricini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae bore in wood","habSame":false,"diet":["HER"],"size":[25,40],"fact":"Females drill into tree trunks to lay eggs along with fungal spores their larvae will eat.","commonFr":"Sirex géant","factFr":"Hyménoptère imposant aux rayures jaunes et noires qui imite une grosse guêpe ; sa femelle perce le bois des conifères avec son ovipositeur en lance pour y pondre, mais elle est totalement inoffensive pour l'humain."},{"id":"Manduca","common":"Hornworm","genus":"Manduca","species":"sexta","scientificName":"Manduca sexta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Sphinginae"],["Tribe","Sphingini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[100,120],"fact":"Has become a key research model in neuroscience for studying flight and learning.","commonFr":"Sphinx de la tomate","factFr":"Sa chenille verte porte une corne caudale spectaculaire mais inoffensive ; modèle scientifique pour étudier le système nerveux des insectes, son cerveau est presque entièrement cartographié neurone par neurone."},{"id":"Tabanus","common":"Horse fly","genus":"Tabanus","species":"bovinus","scientificName":"Tabanus bovinus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Tabanomorpha"],["Family","Tabanidae"],["Tribe","Tabanini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"Larvae aquatic or in damp soil","habSame":false,"diet":["CAR"],"size":[15,25],"fact":"Females can drink more than their body weight in blood in one meal.","commonFr":"Taon des bœufs","factFr":"La femelle a besoin du sang pour pondre, et sa morsure utilise des mandibules en ciseaux qui découpent la peau — elle lape ensuite le sang qui coule, bien plus douloureusement qu'un diptère piqueur léger."},{"id":"Acheta","common":"House cricket","genus":"Acheta","species":"domesticus","scientificName":"Acheta domesticus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Gryllidae"],["Subfamily","Gryllinae"],["Tribe","Gryllini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[16,21],"fact":"Used worldwide as a sustainable protein source — flour, snacks, even pasta.","commonFr":"Grillon domestique","factFr":"Originaire d'Afrique, il s'élève en masse pour nourrir reptiles et oiseaux exotiques ; depuis quelques années, l'industrie alimentaire humaine commence à l'utiliser sous forme de farine riche en protéines."},{"id":"Musca","common":"Housefly","genus":"Musca","species":"domestica","scientificName":"Musca domestica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Muscoidea"],["Family","Muscidae"],["Tribe","Muscini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[6,7],"fact":"Tastes with its feet — touching food triggers the proboscis to unfurl.","commonFr":"Mouche domestique","factFr":"Son cerveau est plus petit qu'une tête d'épingle, mais elle peut traiter 200 images par seconde — sept fois plus que nous — ce qui explique pourquoi elle voit votre tapette arriver en slow-motion et s'envole juste à temps."},{"id":"Microstigmus","common":"Hovering social wasp","genus":"Microstigmus","species":"comes","scientificName":"Microstigmus comes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Pemphredonidae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Nests hang from a single silk thread","habSame":false,"diet":["CAR"],"size":[3,4],"fact":"One of the only crabronid wasps with true cooperative behaviour — a few females share a tiny silken nest dangling from a leaf, taking turns to guard and forage.","commonFr":"Petite guêpe sociale","factFr":"L'une des seules crabronidés au comportement vraiment coopératif — quelques femelles partagent un minuscule nid soyeux pendu à une feuille, en alternant la garde et la recherche de proies."},{"id":"Dermatobia","common":"Human botfly","genus":"Dermatobia","species":"hominis","scientificName":"Dermatobia hominis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Oestridae"],["Tribe","Cuterebrini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop inside mammalian skin","habSame":false,"diet":["CAR"],"size":[12,18],"fact":"Larvae develop inside the skin of mammals (sometimes humans) for several weeks.","commonFr":"Mouche dermatobie","factFr":"Capture en plein vol un moustique, colle des œufs sur lui, et le relâche ; quand le moustique pique un humain, les œufs se déposent sur la peau, éclosent et les larves s'enfoncent sous la peau pour y vivre 6 semaines."},{"id":"Pulex","common":"Human flea","genus":"Pulex","species":"irritans","scientificName":"Pulex irritans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Siphonaptera"],["Family","Pulicidae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[2,3],"fact":"Was the primary vector of the bubonic plague in the Black Death.","commonFr":"Puce de l'homme","factFr":"Parasite humain pendant des millénaires, désormais rare en Occident grâce à l'hygiène moderne ; elle a transmis la peste noire au Moyen-Âge via les rats — responsable indirecte de 75 millions de morts."},{"id":"Macroglossum","common":"Hummingbird hawkmoth","genus":"Macroglossum","species":"stellatarum","scientificName":"Macroglossum stellatarum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Macroglossinae"],["Tribe","Macroglossini"]],"dist":["PAL","AFR","IND"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,45],"fact":"Hovers like a hummingbird and is often mistaken for one.","commonFr":"Moro-sphinx","factFr":"Plane devant les fleurs en plein jour en battant ses ailes si vite qu'on les entend bourdonner — et ressemble tellement à un petit oiseau-mouche que les gens essaient souvent de lui donner de l'eau sucrée."},{"id":"Carausius","common":"Indian stick insect","genus":"Carausius","species":"morosus","scientificName":"Carausius morosus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Lonchodidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[70,80],"fact":"Reproduces almost entirely without males — a colony of one female can re-found itself.","commonFr":"Phasme bâton indien","factFr":"Phasme parthénogénétique élevé dans les classes du monde entier depuis des décennies ; les populations captives sont presque exclusivement femelles, les mâles étant si rares qu'ils n'apparaissent qu'une fois tous les milliers d'œufs."},{"id":"Popillia","common":"Japanese beetle","genus":"Popillia","species":"japonica","scientificName":"Popillia japonica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Rutelinae"],["Tribe","Anomalini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Active flier as adult; larva is a soil grub","habSame":false,"diet":["HER"],"size":[10,15],"fact":"First detected outside Asia in a New Jersey nursery in 1916; it now defoliates over 300 plant species in North America.","commonFr":"Scarabée japonais","factFr":"Petit coléoptère métallique vert et cuivré, devenu envahissant en Amérique du Nord et en Italie ; ses adultes squelettent les feuilles de plus de 300 espèces végétales, des roses aux vignes."},{"id":"Trypoxylus","common":"Japanese rhinoceros beetle","genus":"Trypoxylus","species":"dichotomus","scientificName":"Trypoxylus dichotomus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Dynastinae"],["Tribe","Dynastini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva in compost/rotting wood; adult on trees","habSame":false,"diet":["HER"],"size":[40,80],"fact":"In Japan they are sold in vending machines and kept as pets by schoolchildren.","commonFr":"Scarabée rhinocéros japonais","factFr":"Mâle à corne longue et fourchue, élevé comme animal de compagnie au Japon depuis l'époque Edo ; figure une figure récurrente dans les mangas pour enfants, où il symbolise force et persévérance."},{"id":"Stenopelmatus","common":"Jerusalem cricket","genus":"Stenopelmatus","species":"fuscus","scientificName":"Stenopelmatus fuscus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Stenopelmatoidea"],["Family","Stenopelmatidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[30,75],"fact":"Its alarming face has earned local names like 'child of the earth' and 'old bald-headed man'.","commonFr":"Grillon de Jérusalem","factFr":"Aux États-Unis on l'appelle « bébé enfant face » à cause de sa tête énorme et lisse qui rappelle un visage humain ; vit caché dans le sol et sort la nuit, mais sa morsure peut être douloureuse."},{"id":"Chrysochroa","common":"Jewel beetle","genus":"Chrysochroa","species":"fulgidissima","scientificName":"Chrysochroa fulgidissima","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Buprestoidea"],["Family","Buprestidae"],["Tribe","Chrysochroini"]],"dist":["IND","PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,42],"fact":"Its iridescent wing-cases were used as ornaments in jewellery for centuries in South Asia.","commonFr":"Bupreste joyau","factFr":"Les samouraïs japonais incrustaient ses élytres vert métallique dans la décoration de leurs armes et sanctuaires ; la couleur, structurelle et non pigmentaire, ne s'altère pas même après des siècles."},{"id":"Heteropteryx","common":"Jungle nymph","genus":"Heteropteryx","species":"dilatata","scientificName":"Heteropteryx dilatata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Heteropterygidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females flightless","habSame":true,"diet":["HER"],"size":[100,160],"fact":"Females can be much larger than males and produce some of the largest eggs of any insect.","commonFr":"Nymphe de la jungle","factFr":"Phasme massif de Malaisie, la femelle est verte et la plus lourde phasmide connue — 65 grammes ; les œufs ressemblent à de minuscules glands et mettent jusqu'à 18 mois à éclore."},{"id":"Microcentrum","common":"Katydid","genus":"Microcentrum","species":"rhombifolium","scientificName":"Microcentrum rhombifolium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Phaneropterinae"],["Tribe","Microcentrini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,65],"fact":"Its leaf-like wings have realistic 'veins' and even mimic the chewed edges of leaves.","commonFr":"Sauterelle feuille","factFr":"Imite une feuille fraîche jusqu'aux nervures et au bord dentelé ; stridule par frottement des élytres modifiés à la base — un mécanisme unique appelé « organe de fenestration » qui produit des hautes fréquences inaudibles pour l'homme."},{"id":"Triatoma","common":"Kissing bug","genus":"Triatoma","species":"infestans","scientificName":"Triatoma infestans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Tribe","Triatomini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Rarely flies; mainly crawls","habSame":true,"diet":["CAR"],"size":[18,30],"fact":"Bites sleeping mammals around the face — earning the name 'kissing bug'.","commonFr":"Vinchuca","factFr":"Pique les mammifères endormis autour de la bouche et du visage la nuit — une habitude qui lui a valu un surnom faussement affectueux. Vecteur principal de la maladie de Chagas en Amérique du Sud."},{"id":"Eurytides","common":"Kite swallowtail","genus":"Eurytides","species":"marcellus","scientificName":"Eurytides marcellus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Leptocircini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,80],"fact":"The zebra-striped glider of southeastern swamps — flies in long drifting arcs only over patches of its sole foodplant, pawpaw trees.","commonFr":"Papillon zèbre planeur","factFr":"Papillon rayé blanc et noir des marais du sud-est nord-américain — vole en longues arcs planeurs seulement au-dessus des taches de son unique plante hôte, l'asiminier."},{"id":"Malacosoma","common":"Lackey moth","genus":"Malacosoma","species":"neustria","scientificName":"Malacosoma neustria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Lasiocampoidea"],["Family","Lasiocampidae"],["Tribe","Malacosomatini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[24,32],"fact":"Larvae build silken communal tents in trees and emerge to feed in groups.","commonFr":"Bombyx livrée","factFr":"Sa chenille construit un nid soyeux collectif sur les branches d'arbres fruitiers où des centaines de larves vivent ensemble ; le tissu reste sur les arbres tout l'été après leur dispersion, sorte de témoin de leur passage."},{"id":"Lycorma","common":"Lanternfly","genus":"Lycorma","species":"delicatula","scientificName":"Lycorma delicatula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Fulgoridae"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Its dramatic red and black inner wings flash open when it takes off, startling predators.","commonFr":"Lanterne tachetée","factFr":"Cet hémiptère asiatique aux ailes inférieures rouge vif envahit l'Amérique du Nord depuis 2014 et menace les vignobles ; mais c'est en réalité un mauvais voleur, et il préfère « hopper » plutôt que voler."},{"id":"Dermestes","common":"Larder beetle","genus":"Dermestes","species":"lardarius","scientificName":"Dermestes lardarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Bostrichoidea"],["Family","Dermestidae"],["Tribe","Dermestini"]],"dist":["PAL","NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[7,9],"fact":"Museums use these beetles to clean flesh off skeletons for taxidermy and study.","commonFr":"Dermeste du lard","factFr":"Spécialiste de la matière séchée — peaux, plumes, viande boucanée ; les musées d'histoire naturelle l'élèvent en colonies pour nettoyer les squelettes d'animaux jusqu'à l'os sans abîmer les structures fines."},{"id":"Pyrrhosoma","common":"Large red damselfly","genus":"Pyrrhosoma","species":"nymphula","scientificName":"Pyrrhosoma nymphula","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Zygoptera"],["Superfamily","Coenagrionoidea"],["Family","Coenagrionidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[33,36],"fact":"One of the first damselflies to appear in spring across Europe.","commonFr":"Petite nymphe au corps de feu","factFr":"Premier zygoptère à apparaître au printemps en Europe ; le mâle entièrement rouge cherche sa partenaire dès le mois d'avril, posé sur les feuilles flottantes des nénuphars."},{"id":"Atta","common":"Leafcutter ant","genus":"Atta","species":"cephalotes","scientificName":"Atta cephalotes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Attini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,15],"fact":"Builds underground 'farms' where they cultivate fungus on chewed-up leaves.","commonFr":"Fourmi champignonniste","factFr":"Découpe des fragments végétaux 50 fois sa taille, les transporte sur des autoroutes terrestres jusqu'au nid, où ils servent à cultiver un champignon — la nourriture exclusive de la colonie depuis 50 millions d'années."},{"id":"Megachile","common":"Leafcutter bee","genus":"Megachile","species":"rotundata","scientificName":"Megachile rotundata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Megachilidae"],["Tribe","Megachilini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[7,15],"fact":"Cuts perfectly circular leaf disks to build segmented nest cells.","commonFr":"Mégachile","factFr":"Tapisse son nid de petits cercles de feuilles découpés à coups de mandibules ; pollinisatrice clé de la luzerne, elle est élevée à des millions par les agriculteurs nord-américains pour féconder leurs cultures."},{"id":"Leptocerus","common":"Long-horned caddisfly","genus":"Leptocerus","species":"tineiformis","scientificName":"Leptocerus tineiformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Leptoceridae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[8,12],"fact":"Adults have extremely long, swept-back antennae that look like fishing rods.","commonFr":"Phrygane à longues antennes","factFr":"Trichoptère aux antennes étonnamment longues, parfois plus que le corps ; sa larve aquatique tisse un fourreau soyeux qu'elle pare de grains de sable et de fragments végétaux — chaque larve a son style unique."},{"id":"Pyrops","common":"Long-nosed lanternfly","genus":"Pyrops","species":"candelaria","scientificName":"Pyrops candelaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Fulgoridae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[70,90],"fact":"Carries a long red snorkel-like rostrum tipped in white — local folklore claims the contact of a bite makes a woman barren, but the snout is harmless and the bug doesn't even bite.","commonFr":"Fulgore porte-lanterne","factFr":"Hémiptère asiatique à long rostre tubulaire dont les premiers naturalistes pensaient qu'il émettait de la lumière — d'où le nom de « porte-lanterne » ; il ne brille en réalité jamais, mais son apparence reste l'une des plus extravagantes du monde des insectes."},{"id":"Dryococelus","common":"Lord Howe Island stick insect","genus":"Dryococelus","species":"australis","scientificName":"Dryococelus australis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[120,150],"fact":"Thought extinct for 80 years before being rediscovered on a single sea stack in 2001.","commonFr":"Phasme de l'île Lord Howe","factFr":"Cru éteint pendant 80 ans après l'introduction de rats sur sa minuscule île natale, redécouvert en 2001 sur un rocher isolé où vivait une population de 24 individus ; sauvé par un programme d'élevage en captivité."},{"id":"Actias","common":"Luna moth","genus":"Actias","species":"luna","scientificName":"Actias luna","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Saturniinae"],["Tribe","Saturniini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[80,115],"fact":"Males detect a single female pheromone molecule from up to 7 km away.","commonFr":"Lune","factFr":"Saturniidé d'Amérique du Nord aux longues queues d'aile vert pâle et aux taches oculaires translucides ; vole uniquement la nuit, et son adulte sans bouche ne vit qu'une semaine."},{"id":"Chrysocoris","common":"Lychee jewel bug","genus":"Chrysocoris","species":"stollii","scientificName":"Chrysocoris stollii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Scutelleridae"],["Subfamily","Scutellerinae"],["Tribe","Chrysocorini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[13,18],"fact":"A walking iridescent gemstone — its metallic blue-green back is so polished it has been ground up and used as natural glitter in Asian craft traditions.","commonFr":"Punaise joyau du litchi","factFr":"Véritable bijou ambulant iridescent — son dos métallique bleu-vert est si poli qu'on l'a broyé pour fabriquer du glitter naturel dans certaines traditions artisanales asiatiques."},{"id":"Gromphadorhina","common":"Madagascar hissing cockroach","genus":"Gromphadorhina","species":"portentosa","scientificName":"Gromphadorhina portentosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Superfamily","Blaberoidea"],["Family","Blaberidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[50,75],"fact":"Hisses by forcing air through breathing pores — the only insect known to use this method for sound.","commonFr":"Blatte siffleuse de Madagascar","factFr":"Émet un sifflement audible en expulsant l'air par ses spiracles — chose unique chez les insectes, qui d'ordinaire stridulent par frottement ; vit en groupes complexes avec hiérarchie sociale, et populaire en terrariophilie."},{"id":"Anopheles","common":"Malaria mosquito","genus":"Anopheles","species":"gambiae","scientificName":"Anopheles gambiae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Culicidae"],["Subfamily","Anophelinae"],["Tribe","Anophelini"]],"dist":["AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[5,8],"fact":"Rests at a steep upward angle, unlike most other mosquitoes, which lie parallel to the surface.","commonFr":"Anophèle gambien","factFr":"Le moustique le plus meurtrier au monde : vecteur principal du paludisme en Afrique sub-saharienne, responsable de plus de 400 000 morts par an ; sa salive contient des anesthésiants si efficaces qu'on ne sent pas la piqûre."},{"id":"Megascolia","common":"Mammoth wasp","genus":"Megascolia","species":"maculata","scientificName":"Megascolia maculata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Scolioidea"],["Family","Scoliidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Parasitises beetle grubs underground","habSame":false,"diet":["CAR"],"size":[30,55],"fact":"One of the largest wasps in Europe, with females reaching 5–6 cm.","commonFr":"Scolie des jardins","factFr":"La plus grande guêpe d'Europe — la femelle peut atteindre 6 cm — et pourtant non agressive ; sa larve parasite la grosse larve de scarabée rhinocéros, qu'elle paralyse puis dévore sur place."},{"id":"Catacanthus","common":"Man-faced bug","genus":"Catacanthus","species":"incarnatus","scientificName":"Catacanthus incarnatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Pentatomidae"],["Subfamily","Pentatominae"],["Tribe","Catacanthini"]],"dist":["IND","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Tropical forests and cashew groves of South Asia and Madagascar","habSame":true,"diet":["HER"],"size":[20,28],"fact":"Its bold black-and-cream pattern has been variously compared to a moustachioed dictator, to Elvis Presley, or to a tiny screaming face on its back — a coincidence that has made it one of the most photographed pentatomids in tropical Asia.","commonFr":"Punaise à face humaine","factFr":"Son motif noir et crème a été comparé à un dictateur moustachu, à Elvis Presley ou à un visage hurlant sur son dos — une coïncidence qui en fait l'un des pentatomides les plus photographiés d'Asie tropicale."},{"id":"Mantispa","common":"Mantispid","genus":"Mantispa","species":"styriaca","scientificName":"Mantispa styriaca","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Mantispidae"],["Tribe","Mantispini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Its forelegs are eerily similar to a mantis's even though the two are only distantly related.","commonFr":"Mantispe","factFr":"Ressemble à un croisement entre une mante et une libellule, mais c'est en fait un névroptère ; sa minuscule larve grimpe sur une araignée errante, s'y accroche, et dévore les œufs quand la femelle pond son cocon."},{"id":"Marpesia","common":"Many-banded daggerwing","genus":"Marpesia","species":"chiron","scientificName":"Marpesia chiron","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Cyrestinae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,75],"fact":"Sports two long forked 'tail-streamers' on each hindwing that may confuse bird strikes — and gathers in shimmering mud-puddling clubs of dozens of males drinking salt from damp riverbanks.","commonFr":"Daggerwing rayé","factFr":"Papillon néotropical aux ailes étroites et terminées en pointes effilées ; vole en formations de plusieurs dizaines d'individus le long des fleuves amazoniens, certains spécimens migrant sur plus de 1000 km."},{"id":"Rhithrogena","common":"March brown","genus":"Rhithrogena","species":"germanica","scientificName":"Rhithrogena germanica","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Setisura"],["Family","Heptageniidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,15],"fact":"Nymphs cling to fast-flowing rocks with claws and flattened bodies.","commonFr":"Manne brune de mars","factFr":"Première éphémère à émerger des rivières britanniques chaque année, dès le mois de mars ; emblématique pour les pêcheurs à la mouche qui lui consacrent imitations et stratégies — un signal du retour de la saison."},{"id":"Episyrphus","common":"Marmalade hoverfly","genus":"Episyrphus","species":"balteatus","scientificName":"Episyrphus balteatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Syrphoidea"],["Family","Syrphidae"],["Tribe","Syrphini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[9,12],"fact":"A perfect bee mimic that cannot sting — flowers fooled and so are predators.","commonFr":"Syrphe ceinturé","factFr":"Plane devant les fleurs en vol stationnaire, ses bandes orange et noir lui donnant l'air d'une guêpe — un déguisement parfait, mais totalement inoffensif : il n'a même pas de dard."},{"id":"Osmia","common":"Mason bee","genus":"Osmia","species":"bicornis","scientificName":"Osmia bicornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Megachilidae"],["Tribe","Osmiini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[8,15],"fact":"Nests in hollow reeds and has been domesticated as an efficient orchard pollinator.","commonFr":"Osmie rousse","factFr":"Abeille solitaire à toison rousse qui nidifie dans les trous de mur ou les tiges creuses ; pollinisatrice supérieure aux abeilles domestiques pour les fruits à noyau, elle est désormais élevée et vendue dans des hôtels à insectes prêts à poser."},{"id":"Philaenus","common":"Meadow spittlebug","genus":"Philaenus","species":"spumarius","scientificName":"Philaenus spumarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cercopoidea"],["Family","Aphrophoridae"],["Tribe","Aphrophorini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Adults rarely fly; nymphs hide in foam on plants","habSame":true,"diet":["HER"],"size":[5,7],"fact":"Nymphs surround themselves with frothy spit — the 'cuckoo spit' you see on grass stems.","commonFr":"Cercope des prés","factFr":"Sa nymphe se cache dans une masse de mousse blanche sur les tiges des herbes — « bave de coucou » des prairies — qui la protège et la maintient humide ; l'adulte saute jusqu'à 70 fois sa taille, l'un des sauts les plus puissants du règne animal."},{"id":"Tenebrio","common":"Mealworm beetle","genus":"Tenebrio","species":"molitor","scientificName":"Tenebrio molitor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Tenebrionidae"],["Tribe","Tenebrionini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[12,18],"fact":"Their larvae (mealworms) can digest polystyrene and are now researched as plastic-recycling helpers.","commonFr":"Ténébrion meunier","factFr":"Sa larve, le « ver de farine », est consommée séchée et grillée dans le monde entier ; depuis 2021, c'est le premier insecte autorisé à la consommation humaine par l'Union européenne sous forme de farine."},{"id":"Iridomyrmex","common":"Meat ant","genus":"Iridomyrmex","species":"purpureus","scientificName":"Iridomyrmex purpureus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Dolichoderinae"],["Tribe","Leptomyrmecini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Builds gravel-topped mounds with many entrances","habSame":true,"diet":["OMN"],"size":[6,12],"fact":"Australia's most ecologically dominant ant — colonies build sprawling, gravel-paved super-networks that exclude almost every other ground species, and one such network can stretch a kilometre wide.","commonFr":"Fourmi à viande","factFr":"Fourmi la plus écologiquement dominante d'Australie — ses colonies construisent des super-réseaux pavés de gravier qui excluent presque tous les autres animaux du sol, et un seul de ces réseaux peut faire un kilomètre de large."},{"id":"Ceratitis","common":"Mediterranean fruit fly","genus":"Ceratitis","species":"capitata","scientificName":"Ceratitis capitata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Tephritoidea"],["Family","Tephritidae"],["Tribe","Ceratitidini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[4,5],"fact":"Males perform an elaborate wing-flicking dance to court females.","commonFr":"Mouche méditerranéenne des fruits","factFr":"L'un des principaux ravageurs des fruits dans le monde ; sa femelle pond sous la peau des oranges, pêches, pommes — la chair tournée brun est un cauchemar pour les exportateurs et coûte des milliards à l'industrie."},{"id":"Brachygastra","common":"Mexican honey wasp","genus":"Brachygastra","species":"mellifica","scientificName":"Brachygastra mellifica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Polistinae"],["Tribe","Epiponini"]],"dist":["NEO","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[7,10],"fact":"One of the very few wasps in the world to store honey in its nest — its colonies are raided by villagers who consider the sweet syrup mildly hallucinogenic when the bees visit certain flowers.","commonFr":"Guêpe à miel du Mexique","factFr":"L'une des très rares guêpes au monde à stocker des réserves de nectar sucré dans son nid — ses colonies sont pillées par les villageois qui considèrent le sirop comme légèrement hallucinogène quand les abeilles visitent certaines fleurs."},{"id":"Locusta","common":"Migratory locust","genus":"Locusta","species":"migratoria","scientificName":"Locusta migratoria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Oedipodinae"],["Tribe","Oedipodini"]],"dist":["AFR","PAL","IND"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,70],"fact":"When crowded, solitary green individuals switch to gregarious yellow-and-black 'plague phase' adults.","commonFr":"Criquet migrateur","factFr":"Solitaire en faible densité, il bascule vers une forme grégaire en quelques jours quand les conditions deviennent favorables ; les essaims couvrant des centaines de kilomètres carrés étaient les huit plaies bibliques d'Egypte, et le restent en Afrique aujourd'hui."},{"id":"Oncopeltus","common":"Milkweed bug","genus":"Oncopeltus","species":"fasciatus","scientificName":"Oncopeltus fasciatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Lygaeoidea"],["Family","Lygaeidae"],["Tribe","Lygaeini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,17],"fact":"A long-standing model organism used to study insect development and pigmentation.","commonFr":"Punaise rouge de l'asclépiade","factFr":"Stocke les toxines cardiaques de sa plante hôte dans son corps et exhibe des couleurs rouge et noir aposématiques pour avertir les oiseaux ; modèle classique pour étudier la coévolution plante-insecte en école secondaire."},{"id":"Andrena","common":"Mining bee","genus":"Andrena","species":"fulva","scientificName":"Andrena fulva","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Andrenidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[8,17],"fact":"Solitary, but hundreds may dig nests next to each other forming 'apartment block' colonies.","commonFr":"Andrène fauve","factFr":"Petite abeille solitaire au manteau de poils orange feu ; chaque femelle creuse son propre terrier vertical dans les pelouses au printemps, parfois en colonies de centaines mais sans réelle coopération entre elles."},{"id":"Gryllotalpa","common":"Mole cricket","genus":"Gryllotalpa","species":"gryllotalpa","scientificName":"Gryllotalpa gryllotalpa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Gryllotalpidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[30,50],"fact":"Digs tunnels shaped like megaphones that amplify its calls audibly above ground.","commonFr":"Courtilière","factFr":"Hybride entre un grillon et une taupe — ses pattes avant en pelle creusent dans le sol des galeries qui amplifient son chant aigu ; vit cachée et n'est aperçue que par accident, ce qui en fait l'un des insectes les plus mythiques de la campagne européenne."},{"id":"Danaus","common":"Monarch","genus":"Danaus","species":"plexippus","scientificName":"Danaus plexippus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Danainae"],["Tribe","Danaini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[90,100],"fact":"Migrates up to 4,800 km from Canada to Mexico, the longest insect migration known.","commonFr":"Monarque","factFr":"Sa migration annuelle de plusieurs milliers de kilomètres entre le Canada et le Mexique se fait en plusieurs générations — aucun individu ne vit assez longtemps pour faire le voyage entier, et pourtant il revient toujours aux mêmes arbres."},{"id":"Manticora","common":"Monster tiger beetle","genus":"Manticora","species":"tuberculata","scientificName":"Manticora tuberculata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Cicindelinae"],["Tribe","Manticorini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Adult is flightless; larva ambushes from a burrow","habSame":false,"diet":["CAR"],"size":[50,70],"fact":"A flightless desert hunter armoured like a tank — its mandibles can crush small lizards, and dung beetles unlucky enough to wander past disappear in two bites.","commonFr":"Cicindèle monstre","factFr":"Grand carabe africain noir et brillant aux mandibules démesurées ; couru après par les collectionneurs car le mâle adulte porte parfois une cinquième dent qui dépasse encore plus, faisant de lui une trouvaille particulièrement spectaculaire."},{"id":"Anabrus","common":"Mormon cricket","genus":"Anabrus","species":"simplex","scientificName":"Anabrus simplex","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Tettigoniinae"],["Tribe","Decticini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["OMN"],"size":[30,50],"fact":"Massive flightless crickets march in waves of millions and even cannibalise each other.","commonFr":"Grillon mormon","factFr":"Pas un vrai grillon mais une sauterelle aptère ; se déplace en bandes massives à pied à travers les pâturages de l'Ouest américain. Son nom vient de l'invasion biblique des cultures des premiers Mormons en 1848, sauvée in extremis par des goélands."},{"id":"Taraxippus","common":"Moss stick insect","genus":"Taraxippus","species":"samarae","scientificName":"Taraxippus samarae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phasmatidae"],["Subfamily","Cladomorphinae"],["Tribe","Hesperophasmatini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wet montane rainforest of Costa Rica and Panama","habSame":true,"diet":["HER"],"size":[55,75],"fact":"A phasmid that mimics living mossy bark so perfectly it disappears against tree trunks — only discovered in 2018, formally described in 2020, and named after the discoverer's young daughter Samara.","commonFr":"Phasme mousse","factFr":"Phasme qui imite la mousse vivante d'écorce à la perfection — disparaît contre un tronc d'arbre ; découvert seulement en 2018, formellement décrit en 2020, et nommé d'après la jeune fille du découvreur, Samara."},{"id":"Clogmia","common":"Moth fly","genus":"Clogmia","species":"albipunctata","scientificName":"Clogmia albipunctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Psychodomorpha"],["Family","Psychodidae"]],"dist":["NEO"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[4,5],"fact":"Often found in bathroom drains, where their larvae feed on slimy organic matter.","commonFr":"Mouche papillon","factFr":"Toute petite mouche velue à corps en feuille qu'on voit poser sur les murs des salles de bain ; sa larve se développe dans le biofilm visqueux des canalisations, et c'est en réalité l'une des espèces les plus utiles pour nettoyer les eaux usées."},{"id":"Glyphotaelius","common":"Mottled sedge","genus":"Glyphotaelius","species":"pellucidus","scientificName":"Glyphotaelius pellucidus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Limnephilidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[15,25],"fact":"Larvae piece together cases of leaf disks like green tiled mosaics.","commonFr":"Phrygane des feuilles","factFr":"Sa larve aquatique construit un fourreau cylindrique avec des morceaux de feuilles mortes découpés en rondelles, assemblés en spirale parfaite — chaque larve est une artiste qui réalise son habitat sur mesure."},{"id":"Macrotermes","common":"Mound-building termite","genus":"Macrotermes","species":"bellicosus","scientificName":"Macrotermes bellicosus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Infraorder","Isoptera"],["Family","Termitidae"],["Tribe","Macrotermitini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[5,15],"fact":"Builds mounds up to 9 metres tall, complete with ventilation chimneys.","commonFr":"Termite bâtisseur africain","factFr":"Construit des termitières atteignant 9 mètres de haut, fonctionnant comme des cathédrales climatisées — l'architecture interne maintient une température constante de 30°C avec moins de 1°C d'écart sur 24 heures."},{"id":"Dendroctonus","common":"Mountain pine beetle","genus":"Dendroctonus","species":"ponderosae","scientificName":"Dendroctonus ponderosae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Curculionoidea"],["Family","Curculionidae"],["Subfamily","Scolytinae"],["Tribe","Hylurgini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae burrow under bark","habSame":false,"diet":["HER"],"size":[4,7],"fact":"A warming climate has let them survive winters that used to kill them, devastating millions of hectares of pine forest.","commonFr":"Scolyte du pin","factFr":"Un climat plus chaud lui permet de survivre à des hivers qui le tuaient autrefois, ce qui dévaste des millions d'hectares de forêts coniférennes dans l'ouest de l'Amérique du Nord."},{"id":"Nymphalis","common":"Mourning cloak","genus":"Nymphalis","species":"antiopa","scientificName":"Nymphalis antiopa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["PAL","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,75],"fact":"It hibernates as an adult and may live up to 11 months, exceptional for a butterfly.","commonFr":"Morio","factFr":"Vit jusqu'à 11 mois — record chez les papillons européens — en passant l'hiver caché dans une fissure d'arbre, et ressort dès les premières chaudes journées de mars avant même que les premières fleurs ne soient ouvertes."},{"id":"Sceliphron","common":"Mud dauber","genus":"Sceliphron","species":"caementarium","scientificName":"Sceliphron caementarium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Sphecidae"],["Tribe","Sceliphrini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[20,30],"fact":"Constructs nests of mud cells that look like miniature pipe organs.","commonFr":"Pélopée maçonnière","factFr":"Construit des nids cylindriques qui ressemblent à de minuscules orgues à tuyaux, chaque alvéole bourrée d'une araignée paralysée pour nourrir la larve."},{"id":"Hydropsyche","common":"Net-spinning caddisfly","genus":"Hydropsyche","species":"pellucidula","scientificName":"Hydropsyche pellucidula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Annulipalpia"],["Family","Hydropsychidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Larvae spin underwater silk nets to catch food drifting in the current.","commonFr":"Phrygane à filet","factFr":"Sa larve aquatique tisse un filet de soie entre deux pierres dans le courant, qui filtre le plancton emporté par l'eau ; elle reste cachée juste derrière, ne sortant que pour récupérer les proies piégées."},{"id":"Megalopta","common":"Nocturnal sweat bee","genus":"Megalopta","species":"genalis","scientificName":"Megalopta genalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Halictidae"],["Subfamily","Halictinae"],["Tribe","Augochlorini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Forages only at dusk and dawn","habSame":false,"diet":["HER"],"size":[10,13],"fact":"Forages in starlight when most bees can see nothing — its enormous compound eyes have evolved to gather photons hundreds of times better than a honeybee's.","commonFr":"Abeille nocturne","factFr":"L'une des très rares abeilles à butiner la nuit ; ses yeux énormes lui permettent de voir dans une obscurité 1000 fois plus profonde que ce que les autres abeilles peuvent gérer, exploitant ainsi une niche écologique laissée vacante."},{"id":"Chironomus","common":"Non-biting midge","genus":"Chironomus","species":"riparius","scientificName":"Chironomus riparius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Chironomidae"],["Tribe","Chironomini"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,12],"fact":"Adult swarms over lakes can be so dense they show up on weather radar.","commonFr":"Chironome rouge","factFr":"Sa larve est rouge sang grâce à de l'hémoglobine adaptée pour survivre dans les eaux pauvres en oxygène ; vit par millions au fond des étangs eutrophes et constitue la base alimentaire de tout l'écosystème aquatique."},{"id":"Limnephilus","common":"Northern caddisfly","genus":"Limnephilus","species":"rhombicus","scientificName":"Limnephilus rhombicus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Trichoptera"],["Suborder","Integripalpia"],["Family","Limnephilidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,20],"fact":"Larval cases include sand grains, pebbles, sticks — whatever fits on the local stream bed.","commonFr":"Phrygane nordique","factFr":"Sa larve construit un fourreau hexagonal avec de minuscules fragments calibrés — observée en laboratoire, elle accepte aussi des paillettes d'or, transformant son abri en bijou (le bijoutier français Hubert Duprat l'a démontré)."},{"id":"Diapheromera","common":"Northern walkingstick","genus":"Diapheromera","species":"femorata","scientificName":"Diapheromera femorata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Diapheromeridae"],["Tribe","Diapheromerini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[70,95],"fact":"Sways gently while walking to mimic a twig in the wind.","commonFr":"Phasme du Nord","factFr":"Le seul phasme natif du nord-est américain se balance doucement en marchant pour imiter une brindille dans le vent — une illusion si convaincante que même les oiseaux habitués à chasser des insectes passent à côté."},{"id":"Cynips","common":"Oak gall wasp","genus":"Cynips","species":"quercusfolii","scientificName":"Cynips quercusfolii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Parasitica"],["Superfamily","Cynipoidea"],["Family","Cynipidae"],["Tribe","Cynipini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop inside oak galls","habSame":false,"diet":["HER"],"size":[3,5],"fact":"The chemicals it injects into oak leaves cause the tree to grow ornate 'gall' homes for its larvae.","commonFr":"Cynips des feuilles de chêne","factFr":"Les substances chimiques qu'elle injecte dans les feuilles des arbres font pousser à l'arbre lui-même des « pommes » sphériques ornées qui hébergent ses larves."},{"id":"Meloe","common":"Oil beetle","genus":"Meloe","species":"proscarabaeus","scientificName":"Meloe proscarabaeus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Meloidae"],["Tribe","Meloini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae hitch rides on bees back to nests","habSame":true,"diet":["HER"],"size":[10,30],"fact":"Larvae cling to flowers and hitchhike on visiting bees back to the nest, where they eat the brood.","commonFr":"Méloé proscarabée","factFr":"Coléoptère bleu-noir qui pond ses œufs au sol ; sa larve grimpe sur une fleur et attend qu'une abeille solitaire vienne butiner pour s'accrocher à elle, puis se laisser transporter dans son nid où elle dévorera les œufs et le pollen."},{"id":"Centris","common":"Oil-collecting bee","genus":"Centris","species":"pallida","scientificName":"Centris pallida","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Centridini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Sonoran Desert specialist; larvae develop in burrows","habSame":false,"diet":["HER"],"size":[12,16],"fact":"Males patrol the Sonoran Desert at dawn, digging frantically into sand to find virgin females still buried — a behaviour known as 'pre-emergence mating'.","commonFr":"Abeille à huile du désert","factFr":"Collecte de l'huile florale au lieu de pollen sur des plantes très spécifiques du désert ; cette huile sert à imperméabiliser les chambres souterraines où elle élève ses larves."},{"id":"Iphiclides","common":"Old World swallowtail","genus":"Iphiclides","species":"podalirius","scientificName":"Iphiclides podalirius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Leptocircini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,80],"fact":"It is sometimes called the 'scarce swallowtail' even though it's quite common across southern Europe.","commonFr":"Flambé","factFr":"Papillon clair rayé noir aux ailes prolongées en pointes effilées ; vole en grand vol planeur le long des haies et survole les fleurs sans s'y arrêter, ce qui le rend difficile à observer de près."},{"id":"Thrips","common":"Onion thrips","genus":"Thrips","species":"tabaci","scientificName":"Thrips tabaci","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Thysanoptera"],["Suborder","Terebrantia"],["Family","Thripidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Despite being only 1 mm long, it's responsible for major losses in onion fields worldwide.","commonFr":"Thrips de l'oignon","factFr":"Malgré sa taille d'à peine 1 mm, il est responsable de pertes importantes dans les cultures de bulbes du monde entier."},{"id":"Euglossa","common":"Orchid bee","genus":"Euglossa","species":"dilemma","scientificName":"Euglossa dilemma","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Euglossini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,15],"fact":"Males collect orchid scents into hollow legs to create their own personal perfume.","commonFr":"Abeille à orchidées","factFr":"Les mâles collectent des parfums floraux dans des pattes creuses pour créer leur propre parfum personnel — le bouquet attire les femelles et est unique à chaque individu."},{"id":"Hymenopus","common":"Orchid mantis","genus":"Hymenopus","species":"coronatus","scientificName":"Hymenopus coronatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Hymenopodidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[40,70],"fact":"Looks so much like a flower that pollinators sometimes land on it expecting nectar.","commonFr":"Mante orchidée","factFr":"Imite à la perfection les pétales d'une fleur d'orchidée — au point que les abeilles pollinisatrices se posent dessus en pensant butiner et se font cueillir en plein vol par ses pattes ravisseuses."},{"id":"Blatta","common":"Oriental cockroach","genus":"Blatta","species":"orientalis","scientificName":"Blatta orientalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Blattodea"],["Suborder","Blattaria"],["Family","Blattidae"],["Tribe","Blattini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["OMN"],"size":[20,30],"fact":"Can squeeze through cracks the thickness of a quarter coin.","commonFr":"Cafard oriental","factFr":"Préfère les caves froides et humides, contrairement aux autres cafards qui aiment la chaleur ; sa carapace noire luisante lui a valu le surnom de « waterbug » dans les villes industrielles du nord."},{"id":"Xenopsylla","common":"Oriental rat flea","genus":"Xenopsylla","species":"cheopis","scientificName":"Xenopsylla cheopis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Siphonaptera"],["Family","Pulicidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["CAR"],"size":[2,3],"fact":"Spread plague from rats to humans across continents, repeatedly through history.","commonFr":"Puce du rat","factFr":"Vecteur principal de la peste bubonique : elle vit sur les rats, et quand l'hôte meurt elle saute sur un humain et lui transmet la bactérie en régurgitant son sang infecté avant de piquer."},{"id":"Caligo","common":"Owl butterfly","genus":"Caligo","species":"memnon","scientificName":"Caligo memnon","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Brassolini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[120,160],"fact":"Its huge owl-eye underwing spots can startle birds long enough for the butterfly to escape.","commonFr":"Papillon-hibou","factFr":"Ses énormes taches d'ailes inférieures — sur des ailes gigantesques — surprennent les oiseaux assez longtemps pour que le papillon s'échappe dans la pénombre forestière."},{"id":"Ascalaphus","common":"Owlfly","genus":"Ascalaphus","species":"libelluloides","scientificName":"Ascalaphus libelluloides","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Myrmeleontiformia"],["Family","Ascalaphidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[40,55],"fact":"Owlflies look like a dragonfly–butterfly hybrid: hovering predators with long clubbed antennae and patterned wings — clues to their lacewing ancestry.","commonFr":"Ascalaphe","factFr":"Croisement visuel entre libellule et papillon avec d'énormes antennes en boule à leur extrémité ; chasse en plein vol au-dessus des prairies sèches, et c'est en réalité un névroptère apparenté aux fourmilions."},{"id":"Poekilocerus","common":"Painted grasshopper","genus":"Poekilocerus","species":"pictus","scientificName":"Poekilocerus pictus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Pyrgomorphoidea"],["Family","Pyrgomorphidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[50,75],"fact":"Sequesters cardiac glycosides from milkweed and squirts them out as a defensive spray.","commonFr":"Sauterelle peinte","factFr":"Énorme sauterelle indienne aux couleurs vives jaune et noir qui se nourrit exclusivement d'asclépiades toxiques ; séquestre les poisons cardiaques et les expulse en jet visqueux sur tout prédateur qui la touche."},{"id":"Hypolimnas","common":"Great eggfly","genus":"Hypolimnas","species":"bolina","scientificName":"Hypolimnas bolina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Junoniini"]],"dist":["IND","OCE","AFR"],"hab":["AER","TER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[70,85],"fact":"The males of this large velvety-black butterfly defend sunlit perches against rivals, but the species is best known for a stunning evolutionary race: a Wolbachia bacterium kills nearly all male embryos in some Pacific populations — until the host evolved a suppressor gene that restored males to 50% of the population on Samoa in just ten generations, the fastest natural-selection event ever documented in animals.","commonFr":"Diadème","factFr":"Le mâle de ce grand papillon noir velouté défend ardemment ses perchoirs ensoleillés contre ses rivaux, mais l'espèce est surtout célèbre pour une course évolutive stupéfiante : une bactérie Wolbachia tue presque tous les embryons mâles dans certaines populations du Pacifique — jusqu'à ce que l'hôte développe un gène suppresseur restaurant 50 % de mâles à Samoa en seulement dix générations, l'événement de sélection naturelle le plus rapide jamais documenté chez les animaux."},{"id":"Idea","common":"Paper kite butterfly","genus":"Idea","species":"leuconoe","scientificName":"Idea leuconoe","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Danainae"],["Tribe","Danaini"]],"dist":["IND"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[120,160],"fact":"Drifts through Southeast Asian forests on enormous black-veined parchment wings — so leisurely you can almost walk alongside it.","commonFr":"Papillon papier de riz","factFr":"Grand papillon asiatique aux ailes translucides blanc et noir parcourues de veines décoratives ; surnommé d'après sa ressemblance avec un fragile papier d'orient."},{"id":"Polistes","common":"Paper wasp","genus":"Polistes","species":"dominula","scientificName":"Polistes dominula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Polistinae"],["Tribe","Polistini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[12,18],"fact":"Builds open paper combs without an outer envelope, like an upside-down honeycomb umbrella.","commonFr":"Poliste gauloise","factFr":"Construit des rayons hexagonaux ouverts sans enveloppe extérieure, comme une nid d'apis à l'envers sous l'avant-toit."},{"id":"Acyrthosiphon","common":"Pea aphid","genus":"Acyrthosiphon","species":"pisum","scientificName":"Acyrthosiphon pisum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Sternorrhyncha"],["Superfamily","Aphidoidea"],["Family","Aphididae"],["Tribe","Macrosiphini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[2,4],"fact":"Hosts symbiotic bacteria inside special cells, without which it cannot survive.","commonFr":"Puceron du pois","factFr":"Capable de prendre deux couleurs différentes — vert ou rose — selon l'environnement, déterminé par un seul gène ; ce gène a été acquis par transfert horizontal depuis un champignon, fait extrêmement rare chez les animaux."},{"id":"Aglais","common":"Peacock butterfly","genus":"Aglais","species":"io","scientificName":"Aglais io","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[55,65],"fact":"When threatened it flashes its peacock-eye spots and makes a hissing noise with its wings.","commonFr":"Paon-du-jour","factFr":"Quand on le menace il déploie ses ailes pour montrer ses ocelles bleus iridescents et émet un bruit de sifflement en frottant ses ailes — une attaque visuelle et sonore dont les prédateurs se souviennent."},{"id":"Fulgora","common":"Peanut-head lanternfly","genus":"Fulgora","species":"laternaria","scientificName":"Fulgora laternaria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Fulgoridae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Despite the name, does NOT light up","habSame":true,"diet":["HER"],"size":[80,95],"fact":"Has a fake hollow 'peanut head' shaped like a small caiman's snout — when threatened it flashes huge eyespots on its hindwings and emits a sudden skunk-like stench.","commonFr":"Porte-lanterne à tête de cacahuète","factFr":"Sa tête démesurée évoque vaguement un crâne d'alligator ; les premiers naturalistes pensaient que cette protubérance émettait de la lumière (d'où le nom de « lanterne »), mais c'est un mythe — elle ne brille jamais."},{"id":"Pelecinus","common":"Pelecinid wasp","genus":"Pelecinus","species":"polyturator","scientificName":"Pelecinus polyturator","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Superfamily","Proctotrupoidea"],["Family","Pelecinidae"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larva parasitises scarab beetle grubs underground","habSame":false,"diet":["CAR"],"size":[50,70],"fact":"The female's abdomen is a black, slender ribbon five times longer than her body — a curving probe she sinks into the soil to find scarab grubs growing below.","commonFr":"Guêpe pélécinide","factFr":"Sa femelle a un abdomen filiforme cinq fois plus long que sa tête et son thorax réunis ; elle s'en sert pour fouiller le sol et déposer ses œufs sur des larves de hannetons enfouies à plusieurs centimètres de profondeur."},{"id":"Biston","common":"Peppered moth","genus":"Biston","species":"betularia","scientificName":"Biston betularia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Geometroidea"],["Family","Geometridae"],["Tribe","Bistonini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Famously evolved from light to dark within decades during the Industrial Revolution due to soot-blackened trees.","commonFr":"Phalène du bouleau","factFr":"Exemple emblématique d'évolution observée en direct : la forme claire dominait les bois clairs avant l'industrialisation, puis la forme noire a explosé pendant la pollution de l'air victorienne, avant de redécliner avec le nettoyage moderne."},{"id":"Magicicada","common":"Periodical cicada","genus":"Magicicada","species":"septendecim","scientificName":"Magicicada septendecim","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Cicadoidea"],["Family","Cicadidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"17-year nymphal development underground","habSame":false,"diet":["HER"],"size":[25,30],"fact":"Some populations emerge en masse exactly every 17 years, then vanish completely.","commonFr":"Cigale périodique 17 ans","factFr":"Sa nymphe vit 17 ans sous terre à sucer la sève des racines, avant que toute la cohorte n'émerge en même temps en masse de plusieurs milliards — une stratégie de saturation des prédateurs qu'on n'observe nulle part ailleurs."},{"id":"Cithaerias","common":"Pink-tipped satyr","genus":"Cithaerias","species":"pireta","scientificName":"Cithaerias pireta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Haeterini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[60,70],"fact":"Its almost completely transparent wings tip into a sudden flush of magenta — a glass-and-rose ghost that drifts through dim understorey clearings.","commonFr":"Satyre rose translucide","factFr":"Petit papillon des sous-bois amazoniens aux ailes presque entièrement transparentes, ne portant qu'une tache rose au coin de l'aile inférieure ; vole à basse hauteur entre les feuilles tombées."},{"id":"Battus","common":"Pipevine swallowtail","genus":"Battus","species":"philenor","scientificName":"Battus philenor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Papilionidae"],["Subfamily","Papilioninae"],["Tribe","Troidini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae sequester aristolochic acids from pipevines","habSame":false,"diet":["HER"],"size":[70,130],"fact":"Its iridescent blue females are the model that several unrelated butterflies have evolved to copy — and only one toxic vine in the Americas can produce the chemicals her caterpillars sequester for defence.","commonFr":"Papillon de la pipe à tabac","factFr":"Les femelles aux ailes bleues iridescentes sont le modèle que plusieurs autres papillons non apparentés ont évolué pour copier — et seule une plante toxique d'Amérique peut produire les composés que ses chenilles séquestrent pour leur défense."},{"id":"Eumenes","common":"Potter wasp","genus":"Eumenes","species":"fraternus","scientificName":"Eumenes fraternus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Eumeninae"],["Tribe","Eumenini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[10,15],"fact":"Sculpts perfect tiny clay pots and provisions each with a paralysed caterpillar.","commonFr":"Guêpe potière","factFr":"Construit de minuscules poteries en argile sur les branches — vraies amphores miniatures de quelques mm — bourre chacune d'une chenille paralysée, pond un œuf et scelle l'orifice."},{"id":"Saga","common":"Predatory bush cricket","genus":"Saga","species":"pedo","scientificName":"Saga pedo","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Saginae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Reproduces only by parthenogenesis (all-female)","habSame":true,"diet":["CAR"],"size":[60,80],"fact":"One of Europe's largest insects — an all-female lineage that ambushes other grasshoppers with mantis-like forelegs, leaving no males in any population.","commonFr":"Magicienne dentelée","factFr":"Très grande tettigonidé européenne, totalement carnivore, qui ne se reproduit que par parthénogenèse — il n'existe pratiquement que des femelles ; menacée par la disparition des friches méditerranéennes."},{"id":"Lycaena","common":"Purple copper","genus":"Lycaena","species":"hermes","scientificName":"Lycaena hermes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Lycaenidae"],["Subfamily","Lycaeninae"],["Tribe","Lycaenini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[25,32],"fact":"Almost vanished from southern California chaparral — a few thumb-sized populations cling to one patch of redberry shrubs each, and a single fire could end them.","commonFr":"Cuivré de Hermes","factFr":"Endémique du sud de la Californie et du nord du Mexique, sa chenille ne mange qu'une seule plante : Rhamnus crocea ; menacé par le développement urbain du comté de San Diego."},{"id":"Favonius","common":"Purple hairstreak","genus":"Favonius","species":"quercus","scientificName":"Favonius quercus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Lycaenidae"],["Subfamily","Theclinae"],["Tribe","Theclini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"Males perch high in oak canopies and defend tiny aerial territories from sunrise until dusk.","commonFr":"Thécla du chêne","factFr":"Petit papillon bleu violacé qui ne fréquente que les cimes des chênes matures, ce qui le rend très difficile à observer ; les mâles s'affrontent en spirales aériennes vertigineuses autour des branches du sommet."},{"id":"Cerura","common":"Puss moth","genus":"Cerura","species":"vinula","scientificName":"Cerura vinula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Notodontidae"],["Tribe","Dicranurini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,75],"fact":"Caterpillars have a 'forked tail' from which they shoot formic acid at attackers.","commonFr":"Queue-fourchue","factFr":"Sa chenille spectaculaire porte deux longs filaments rouges qu'elle peut faire jaillir en cas de menace ; en plus de cette parade visuelle, elle peut projeter un jet d'acide formique depuis une glande sur sa face — une mante miniature en couleurs."},{"id":"Tetrix","common":"Pygmy grasshopper","genus":"Tetrix","species":"subulata","scientificName":"Tetrix subulata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Tetrigoidea"],["Family","Tetrigidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Some species swim","habSame":true,"diet":["HER"],"size":[8,12],"fact":"Tiny grasshoppers that can swim and dive underwater to escape predators.","commonFr":"Tetrix riveraine","factFr":"Minuscule sauterelle de bord d'eau capable de plonger et de nager pour fuir un prédateur ; certaines populations possèdent des nageoires aux tarses qui leur permettent de glisser sur la surface comme un patineur."},{"id":"Dactylotum","common":"Rainbow grasshopper","genus":"Dactylotum","species":"bicolor","scientificName":"Dactylotum bicolor","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Caelifera"],["Superfamily","Acridoidea"],["Family","Acrididae"],["Subfamily","Melanoplinae"],["Tribe","Dactylotini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[20,35],"fact":"Its rainbow warning colours advertise the toxins it gets from milkweed.","commonFr":"Sauterelle arc-en-ciel","factFr":"Ses couleurs vives d'avertissement signalent les toxines tirées des asclépiades — sauterelle désertique qui marche au lieu de sauter et présume qu'aucun prédateur n'ose la toucher."},{"id":"Phanaeus","common":"Rainbow scarab","genus":"Phanaeus","species":"vindex","scientificName":"Phanaeus vindex","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Phanaeini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[11,22],"fact":"An iridescent green-and-copper jewel that lives in cattle dung — males swing a single horn like a tiny pickaxe to dig nuptial chambers for their mates.","commonFr":"Bousier arc-en-ciel","factFr":"L'un des plus beaux scarabées d'Amérique du Nord, le mâle vert et rouge cuivré avec une longue corne sur la tête ; roule des boules de bouse parfaites et les enterre, où ses larves grandiront."},{"id":"Vanessa","common":"Red admiral","genus":"Vanessa","species":"atalanta","scientificName":"Vanessa atalanta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Nymphalinae"],["Tribe","Nymphalini"]],"dist":["NEA","NEO","PAL","AFR","IND","OCE"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[50,65],"fact":"Its caterpillars build a 'tent' of silk-tied nettle leaves to live in.","commonFr":"Vulcain","factFr":"Sa chenille construit une tente en cousant des feuilles d'ortie avec de la soie — puis l'adulte, partiellement migrateur, remonte chaque printemps depuis le pourtour méditerranéen jusqu'en Scandinavie avant que les générations suivantes redescendent à l'automne."},{"id":"Myrmecia","common":"Red bull ant","genus":"Myrmecia","species":"gulosa","scientificName":"Myrmecia gulosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmeciinae"],["Tribe","Myrmeciini"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[14,23],"fact":"Schopenhauer used the bulldog ant as his proof of the 'will to live' — cut in two, the head and abdomen will continue battling each other to the death. Its sting is one of the most painful in the insect world.","commonFr":"Fourmi bouledogue","factFr":"Fourmi australienne géante aux mandibules dentelées et au dard douloureux ; chasse à vue, fait des bonds en avant pour saisir ses proies, et sa piqûre fait partie des plus douloureuses du règne animal."},{"id":"Solenopsis","common":"Red imported fire ant","genus":"Solenopsis","species":"invicta","scientificName":"Solenopsis invicta","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Solenopsidini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Only reproductive alates fly; workers are ground-bound","habSame":false,"diet":["OMN"],"size":[3,6],"fact":"When their nest floods, colonies link bodies together to form a living raft that can float for weeks.","commonFr":"Fourmi de feu rouge","factFr":"Sa piqûre, douloureuse comme une vraie brûlure, lui a valu son nom ; quand son nid est inondé, la colonie forme un radeau vivant à partir des corps des ouvrières — l'air piégé entre leurs poils maintient l'ensemble à flot pendant des semaines."},{"id":"Citheronia","common":"Regal moth","genus":"Citheronia","species":"regalis","scientificName":"Citheronia regalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Ceratocampinae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillar is the famous 'hickory horned devil'","habSame":false,"diet":["HER"],"size":[95,155],"fact":"Its caterpillar — the hickory horned devil — is one of the most fearsome-looking grubs in North America, but for all its scarlet spikes it cannot sting and is utterly harmless.","commonFr":"Saturnia royale","factFr":"Sa chenille — le « ver à cornes royal » — atteint 14 cm et porte des excroissances en forme d'épines rouges et noires intimidantes mais inoffensives ; l'une des plus grosses chenilles de l'Amérique du Nord."},{"id":"Euborellia","common":"Ring-legged earwig","genus":"Euborellia","species":"annulipes","scientificName":"Euborellia annulipes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Dermaptera"],["Suborder","Neodermaptera"],["Family","Anisolabididae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[12,16],"fact":"Wingless and especially common in greenhouses.","commonFr":"Forficule annelée","factFr":"Petite perce-oreille aptère aux pattes annelées de noir ; comme sa cousine européenne, c'est une excellente mère qui défend ses œufs jusqu'à l'éclosion et continue à protéger les nymphes pendant plusieurs semaines."},{"id":"Asilus","common":"Robber fly","genus":"Asilus","species":"crabroniformis","scientificName":"Asilus crabroniformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Asilomorpha"],["Family","Asilidae"],["Tribe","Asilini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[18,28],"fact":"Catches prey mid-air, injects digestive enzymes, then sucks out the liquefied insides.","commonFr":"Asile frelon","factFr":"Grosse mouche prédatrice qui ressemble à un frelon mais attaque les frelons eux-mêmes ; capture ses proies en plein vol, leur injecte une salive paralysante, et les vide en suçant à travers sa pièce buccale rigide."},{"id":"Grylloblatta","common":"Rock crawler","genus":"Grylloblatta","species":"campodeiformis","scientificName":"Grylloblatta campodeiformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Notoptera"],["Suborder","Grylloblattodea"],["Family","Grylloblattidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless; on glaciers","habSame":true,"diet":["OMN"],"size":[20,30],"fact":"Lives only on glaciers and snowfields — body temperatures above 10°C can kill it.","commonFr":"Grylloblatte","factFr":"Vit uniquement sur les neiges éternelles et glaciers au-dessus de 1500 m d'altitude ; meurt si la température dépasse 10°C, ce qui en fait l'une des espèces les plus menacées par le réchauffement climatique."},{"id":"Cetonia","common":"Rose chafer","genus":"Cetonia","species":"aurata","scientificName":"Cetonia aurata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Cetoniinae"],["Tribe","Cetoniini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Adults fly readily between flowers; larvae in compost","habSame":false,"diet":["HER"],"size":[14,23],"fact":"Adults can fly with their wing-cases (elytra) closed, an unusual feat for beetles.","commonFr":"Cétoine dorée","factFr":"Coléoptère vert métallique très commun sur les fleurs d'été ; contrairement à la plupart des scarabées qui ouvrent leurs élytres pour voler, elle les garde fermés et passe les ailes par des échancrures latérales — un mode de vol unique parmi les coléoptères."},{"id":"Macrodontia","common":"Sabertooth longhorn","genus":"Macrodontia","species":"cervicornis","scientificName":"Macrodontia cervicornis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Prioninae"],["Tribe","Macrodontiini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva tunnels in dead wood for ~10 years","habSame":false,"diet":["HER"],"size":[120,175],"fact":"Its larva is the largest of any insect by weight — a finger-thick grub that grinds for a decade inside rotting Amazon hardwoods before the adult emerges.","commonFr":"Capricorne à dents de sabre","factFr":"L'un des plus longs coléoptères du monde, jusqu'à 17 cm avec les mandibules ; ses mandibules en forme d'andouillers d'élan peuvent infliger une morsure qui fend un crayon en deux."},{"id":"Scarabaeus","common":"Sacred scarab","genus":"Scarabaeus","species":"sacer","scientificName":"Scarabaeus sacer","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Scarabaeinae"],["Tribe","Scarabaeini"]],"dist":["AFR","PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larva develops underground in dung balls","habSame":false,"diet":["OMN"],"size":[25,40],"fact":"Egyptian priests considered them sacred because they rolled dung balls the way the sun god rolled the sun across the sky.","commonFr":"Scarabée sacré","factFr":"Les prêtres égyptiens le considéraient comme saint parce qu'il roulait des boules de bouse à la manière du dieu solaire faisant rouler le soleil dans le ciel."},{"id":"Haploembia","common":"Saharan web-spinner","genus":"Haploembia","species":"solieri","scientificName":"Haploembia solieri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Embioptera"],["Family","Oligotomidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["HER"],"size":[8,12],"fact":"Lives in colonies under stones in dry Mediterranean habitats.","commonFr":"Embie tisseuse","factFr":"Vit dans des galeries de soie qu'elle tisse avec ses pattes avant ; on trouve ces écheveaux soyeux sous les pierres dans les régions méditerranéennes, et les femelles montent la garde devant l'entrée pour repousser les fourmis."},{"id":"Membracis","common":"Sail treehopper","genus":"Membracis","species":"foliata","scientificName":"Membracis foliata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Cicadomorpha"],["Superfamily","Membracoidea"],["Family","Membracidae"],["Subfamily","Membracinae"],["Tribe","Membracini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[8,14],"fact":"Wears a tall fin-shaped projection on its back that exactly matches a thorn on its host plant — a single bend of the stem and the bug appears, vanishes, appears again with each glance.","commonFr":"Membracide à voile","factFr":"Porte sur son dos une haute crête en forme de voile qui correspond exactement à une épine de sa plante hôte — un simple mouvement de la tige, et l'insecte apparaît, disparaît, réapparaît à chaque regard."},{"id":"Pteronarcys","common":"Salmonfly","genus":"Pteronarcys","species":"californica","scientificName":"Pteronarcys californica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Plecoptera"],["Suborder","Arctoperlaria"],["Family","Pteronarcyidae"]],"dist":["NEA"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,60],"fact":"Adults are huge, with wingspans approaching 7 cm — the largest stoneflies.","commonFr":"Perle saumon","factFr":"Énorme perle des rivières de l'ouest américain dont l'émergence en juin déclenche des frénésie de pêche à la truite ; sa nymphe vit plusieurs années sous les pierres et constitue la base alimentaire des saumons juvéniles."},{"id":"Phlebotomus","common":"Sand fly","genus":"Phlebotomus","species":"papatasi","scientificName":"Phlebotomus papatasi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Psychodomorpha"],["Family","Psychodidae"],["Tribe","Phlebotomini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[2,3],"fact":"Tiny enough to pass through standard mosquito netting.","commonFr":"Phlébotome","factFr":"Minuscule moucheron piqueur méditerranéen vecteur de la leishmaniose ; vol silencieux et piqûre vespérale qui ne réveille pas le dormeur, expliquant l'efficacité de sa transmission dans les zones rurales du Maghreb au Moyen-Orient."},{"id":"Eurybrachys","common":"Sandalwood planthopper","genus":"Eurybrachys","species":"tomentosa","scientificName":"Eurybrachys tomentosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Auchenorrhyncha"],["Infraorder","Fulgoromorpha"],["Superfamily","Fulgoroidea"],["Family","Eurybrachidae"],["Subfamily","Eurybrachinae"],["Tribe","Eurybrachini"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Sandalwood and Calotropis plantations in central and southern India","habSame":true,"diet":["HER"],"size":[12,18],"fact":"Wears fake antennae on its rear end — long bristles plus false eye-spots that point backwards — so when a predator strikes the 'head' the bug jumps the other way and escapes intact.","commonFr":"Fulgore du santal","factFr":"Porte de fausses antennes sur l'arrière du corps — longs filaments et faux yeux orientés vers l'arrière — de sorte que lorsqu'un prédateur attaque la « tête », l'insecte saute dans l'autre direction et s'échappe intact."},{"id":"Petrobius","common":"Sea bristletail","genus":"Petrobius","species":"maritimus","scientificName":"Petrobius maritimus","lineage":[["Order","Archaeognatha"],["Family","Machilidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless","habSame":true,"diet":["OMN"],"size":[10,15],"fact":"Lives on rocky sea-cliffs, surviving salt spray and crashing waves.","commonFr":"Machile maritime","factFr":"Vit sur les falaises rocheuses côtières et survit aux embruns salés comme aux déferlantes — son corps primitif n'a guère changé en 400 millions d'années."},{"id":"Coccinella","common":"Seven-spot ladybird","genus":"Coccinella","species":"septempunctata","scientificName":"Coccinella septempunctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Coccinelloidea"],["Family","Coccinellidae"],["Tribe","Coccinellini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[5,8],"fact":"Adults can eat over 5,000 aphids in their lifetime.","commonFr":"Coccinelle à sept points","factFr":"La « bête à bon Dieu » des jardins européens ; quand on la menace elle expulse un liquide jaune amer de ses articulations — défense réflexe qui dégoûte la plupart des prédateurs au premier essai."},{"id":"Oestrus","common":"Sheep botfly","genus":"Oestrus","species":"ovis","scientificName":"Oestrus ovis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Oestroidea"],["Family","Oestridae"],["Tribe","Oestrini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larvae develop in sheep nasal passages","habSame":false,"diet":["HER"],"size":[10,12],"fact":"Females shoot live larvae directly into the noses of sheep.","commonFr":"Œstre du mouton","factFr":"La femelle projette des larves vivantes directement dans les narines de moutons en train de paître — les asticots remontent ensuite dans les sinus pour s'y développer."},{"id":"Melophagus","common":"Sheep ked","genus":"Melophagus","species":"ovinus","scientificName":"Melophagus ovinus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Hippoboscoidea"],["Family","Hippoboscidae"],["Tribe","Melophagini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless adult; lives on sheep","habSame":true,"diet":["CAR"],"size":[4,6],"fact":"Spends its entire life on sheep and has lost the use of its wings.","commonFr":"Mélophage du mouton","factFr":"Passe sa vie entière sur un seul mammifère laineux et a perdu l'usage de ses ailes — c'est une mouche qui ne vole plus."},{"id":"Choeradodis","common":"Shield mantis","genus":"Choeradodis","species":"rhombicollis","scientificName":"Choeradodis rhombicollis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Mantidae"],["Subfamily","Choeradodinae"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[70,90],"fact":"Its enormous thoracic disc is held up like a leaf in the wind, hiding a hungry predator inside what looks like a translucent palm frond.","commonFr":"Mante bouclier","factFr":"Son énorme disque thoracique se déploie comme une feuille au vent, cachant un prédateur affamé à l'intérieur de ce qui ressemble à une fronde de palmier translucide."},{"id":"Bombyx","common":"Silkworm","genus":"Bombyx","species":"mori","scientificName":"Bombyx mori","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Bombycidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Domesticated adults cannot fly","habSame":true,"diet":["HER"],"size":[40,50],"fact":"Fully domesticated for over 5,000 years — wild forms no longer exist and adults cannot fly.","commonFr":"Ver à soie","factFr":"Domestiqué depuis 5000 ans en Chine, il ne peut plus vivre à l'état sauvage ; son cocon est constitué d'un fil unique de 800 à 1500 m qu'il faut dévider en chauffant la chrysalide vivante — sacrifice à l'origine de tout le commerce de la soie."},{"id":"Chrysina","common":"Silver scarab","genus":"Chrysina","species":"resplendens","scientificName":"Chrysina resplendens","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Scarabaeoidea"],["Family","Scarabaeidae"],["Subfamily","Rutelinae"],["Tribe","Rutelini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Highland cloud forest of Costa Rica and Panama","habSame":false,"diet":["HER"],"size":[25,35],"fact":"Its mirror-bright elytra reflect almost all visible light through a precisely-tuned stack of cuticle layers — the only known animal that reliably produces both left- and right-handed circularly polarised light, a feat materials scientists are still trying to copy.","commonFr":"Scarabée d'argent","factFr":"Ses élytres miroir réfléchissent presque toute la lumière visible grâce à un empilement de couches cuticulaires précisément accordées — le seul animal connu qui produise de manière fiable la lumière polarisée circulairement à droite ET à gauche, exploit que les chercheurs en matériaux essaient toujours de copier."},{"id":"Epargyreus","common":"Silver-spotted skipper","genus":"Epargyreus","species":"clarus","scientificName":"Epargyreus clarus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Hesperiidae"],["Subfamily","Eudaminae"],["Tribe","Eudamini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,55],"fact":"Caterpillars cut tiny windows in leaves and fold them into shelters, like leaf origami.","commonFr":"Hespérie à tache argentée","factFr":"Sa chenille fabrique de petits abris en pliant une feuille en deux et en la cousant avec de la soie ; quand elle défèque, elle catapulte les granules à 40 cm de distance — assez loin pour que les guêpes parasitoïdes ne puissent pas retrouver le nid grâce à l'odeur des excréments."},{"id":"Zygaena","common":"Six-spot burnet","genus":"Zygaena","species":"filipendulae","scientificName":"Zygaena filipendulae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Zygaenoidea"],["Family","Zygaenidae"],["Tribe","Zygaenini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[30,40],"fact":"Brightly coloured to advertise that they contain cyanide-releasing compounds.","commonFr":"Zygène de la filipendule","factFr":"Petit papillon de jour aux ailes bleu-vert métallique et taches rouges ; sa chenille séquestre du cyanure des plantes qu'elle consomme, et tout l'adulte est toxique — l'apprenant, les oiseaux le repèrent et le laissent tranquille."},{"id":"Boreus","common":"Snow scorpionfly","genus":"Boreus","species":"hyemalis","scientificName":"Boreus hyemalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Mecoptera"],["Family","Boreidae"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Snow scorpionflies have reduced wings; hop on snow","habSame":true,"diet":["HER"],"size":[3,5],"fact":"Active in winter — sometimes seen hopping on snow at temperatures below 0°C.","commonFr":"Mouche des neiges","factFr":"Active en hiver — on la voit parfois bondir sur la neige fraîche par températures en dessous de 0°C, exploit quasi impossible pour un insecte."},{"id":"Nezara","common":"Southern green stink bug","genus":"Nezara","species":"viridula","scientificName":"Nezara viridula","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Pentatomomorpha"],["Superfamily","Pentatomoidea"],["Family","Pentatomidae"],["Tribe","Nezarini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[12,16],"fact":"Adults change colour with temperature — bright green in summer, brown in cooler months.","commonFr":"Punaise verte des bois","factFr":"Originaire d'Afrique, elle s'est répandue dans le monde entier et ravage tomates, soja et haricots ; quand on la dérange, ses glandes thoraciques libèrent un cocktail volatile aux notes de coriandre et d'aldéhydes."},{"id":"Lytta","common":"Spanish fly","genus":"Lytta","species":"vesicatoria","scientificName":"Lytta vesicatoria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Tenebrionoidea"],["Family","Meloidae"],["Tribe","Lyttini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[15,22],"fact":"Produces cantharidin, the toxic compound once mythologized as an aphrodisiac.","commonFr":"Cantharide","factFr":"Contient de la cantharidine, irritant puissant utilisé depuis l'Antiquité comme aphrodisiaque (et poison) ; la peau blistre au contact, et son ingestion à dose excessive est mortelle — la « mouche d'Espagne » de la mythologie de pharmacopée."},{"id":"Pararge","common":"Speckled wood","genus":"Pararge","species":"aegeria","scientificName":"Pararge aegeria","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Papilionoidea"],["Family","Nymphalidae"],["Subfamily","Satyrinae"],["Tribe","Parargini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[40,50],"fact":"Males defend small sun-spots in woodland and chase rivals in tight spirals.","commonFr":"Tircis","factFr":"Papillon des sous-bois dont le mâle défend une tache de soleil filtrée par les arbres ; quand un rival s'approche, ils tournoient ensemble en spirales verticales jusqu'à ce que l'envahisseur abandonne."},{"id":"Polyrhachis","common":"Spiny ant","genus":"Polyrhachis","species":"dives","scientificName":"Polyrhachis dives","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Camponotini"]],"dist":["IND","OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[7,10],"fact":"Workers stitch together silk nests using their larvae as living glue guns — a behaviour shared with weaver ants but used to build hanging silken bags.","commonFr":"Fourmi épineuse","factFr":"Construit des nids tissés en assemblant des feuilles avec la soie sécrétée par ses propres larves — qu'elle tient comme des navettes ; les ouvrières portent une rangée d'épines sur le thorax qui dissuadent les prédateurs."},{"id":"Pseudocreobotra","common":"Spiny flower mantis","genus":"Pseudocreobotra","species":"wahlbergii","scientificName":"Pseudocreobotra wahlbergii","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Mantodea"],["Family","Hymenopodidae"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[35,45],"fact":"Wears a perfect 9-shaped eyespot on each forewing — flash them and a bird sees an owl glare instead of a snack.","commonFr":"Mante fleur épineuse","factFr":"Petite mante africaine au motif spiralé sur les ailes ressemblant à un œil — ce « regard » fait fuir oiseaux et lézards qui hésitent à attaquer ce qu'ils croient être un visage de prédateur."},{"id":"Nemoptera","common":"Spoonwing","genus":"Nemoptera","species":"bipennis","scientificName":"Nemoptera bipennis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Myrmeleontiformia"],["Family","Nemopteridae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,50],"fact":"Its absurdly long thread-like hindwings trail behind in flight like ribbons.","commonFr":"Nemoptère","factFr":"Élégant névroptère méditerranéen aux ailes postérieures en rubans extrêmement allongés qui flottent en vol lent — ressemble à un papillon d'apparat, mais c'est en réalité un cousin du fourmilion."},{"id":"Stomoxys","common":"Stable fly","genus":"Stomoxys","species":"calcitrans","scientificName":"Stomoxys calcitrans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Muscoidea"],["Family","Muscidae"],["Tribe","Stomoxyini"]],"dist":["AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[6,8],"fact":"Unlike a typical fly, both sexes bite and feed on blood.","commonFr":"Stomoxe piqueur","factFr":"Ressemble à la mouche domestique mais possède une trompe rigide en forme de poignard ; pique les bovins et les humains, plus douloureuse qu'un moustique, et tourne autour des chevilles à la plage en été."},{"id":"Cerodirphia","common":"Stinging silk moth","genus":"Cerodirphia","species":"speciosa","scientificName":"Cerodirphia speciosa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Saturniidae"],["Subfamily","Hemileucinae"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillar spines deliver venom","habSame":false,"diet":["HER"],"size":[80,100],"fact":"The plain-looking adult hides one of the most dangerous larvae in the world — touching a clustered nest of these caterpillars in a Brazilian backyard has caused fatal haemorrhages.","commonFr":"Saturnia urticant","factFr":"Sa chenille néotropicale est couverte de spicules creuses chargées de venin ; le contact provoque une douleur intense et peut déclencher chez l'humain un syndrome hémorragique mortel, ce qui en fait l'un des insectes les plus dangereux au monde."},{"id":"Trigona","common":"Stingless bee","genus":"Trigona","species":"spinipes","scientificName":"Trigona spinipes","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Meliponini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,7],"fact":"Has no functional sting but defends by biting and tangling itself in attackers' hair — and was domesticated for honey by the Maya long before European beekeeping arrived.","commonFr":"Abeille sans dard","factFr":"Construit son nid dans des arbres creux et y stocke un miel acide unique, prisé par les peuples amérindiens ; sans dard, elle se défend en mordant et en projetant de la résine collante sur les intrus."},{"id":"Labidura","common":"Striped earwig","genus":"Labidura","species":"riparia","scientificName":"Labidura riparia","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Dermaptera"],["Suborder","Neodermaptera"],["Family","Labiduridae"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[18,30],"fact":"One of the largest earwigs and a voracious predator of garden pests.","commonFr":"Forficule rivulaire","factFr":"Grande perce-oreille sablonneuse qui chasse sur les rives nocturnes ; ses cerques en pince sont fonctionnels — elle saisit ses proies avec, et peut pincer la peau humaine de façon désagréable mais inoffensive."},{"id":"Heptagenia","common":"Sulphur mayfly","genus":"Heptagenia","species":"sulphurea","scientificName":"Heptagenia sulphurea","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Ephemeroptera"],["Suborder","Setisura"],["Family","Heptageniidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["HER"],"size":[9,13],"fact":"Its drift downstream at dusk is a key food source for trout and salmon.","commonFr":"Manne soufrée","factFr":"Éphémère jaune vif qui émerge des rivières à fond pierreux en juin ; sa nymphe est aplatie et adaptée au courant rapide, s'accrochant aux pierres avec des griffes spéciales."},{"id":"Halictus","common":"Sweat bee","genus":"Halictus","species":"rubicundus","scientificName":"Halictus rubicundus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Halictidae"],["Tribe","Halictini"]],"dist":["PAL","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,10],"fact":"Some species are eusocial in summer but solitary in winter — a flexible social system.","commonFr":"Abeille de la sueur","factFr":"Petite abeille solitaire attirée par la sueur humaine qu'elle lèche pour ses sels minéraux ; sa population peut être sociale ou solitaire selon le climat — un cas rare de plasticité comportementale qui éclaire l'évolution du comportement social."},{"id":"Prionus","common":"Tanner beetle","genus":"Prionus","species":"coriarius","scientificName":"Prionus coriarius","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Prioninae"],["Tribe","Prionini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Larvae mine in dead wood underground for 3-5 years","habSame":false,"diet":["HER"],"size":[25,45],"fact":"Larvae take 3 to 5 years to mature, slowly chewing through dead wood underground.","commonFr":"Prione tanneur","factFr":"Massif coléoptère longicorne européen au corps brun acajou ; vole lourdement à la tombée de la nuit en faisant un bruit de moteur, et passe sa vie larvaire de 3 ans à creuser le bois mort des souches de chênes et de pins."},{"id":"Pepsis","common":"Tarantula hawk","genus":"Pepsis","species":"grossa","scientificName":"Pepsis grossa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Pompiloidea"],["Family","Pompilidae"],["Tribe","Pepsini"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[30,55],"fact":"Its sting is rated as the second most painful in the insect world, but the pain lasts just minutes.","commonFr":"Guêpe pepsis","factFr":"Sa piqûre est classée deuxième sur l'échelle de douleur de Schmidt, juste sous celle de la fourmi balle ; elle paralyse les tarentules, plus grosses qu'elle, et les enterre vivantes avec un œuf — la larve dévore l'araignée de l'intérieur sur plusieurs semaines."},{"id":"Lygus","common":"Tarnished plant bug","genus":"Lygus","species":"lineolaris","scientificName":"Lygus lineolaris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Miroidea"],["Family","Miridae"],["Tribe","Mirini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[5,7],"fact":"Uses its mouthparts to inject saliva that liquefies plant tissue before drinking.","commonFr":"Lygée à pattes terne","factFr":"Utilise ses pièces buccales pour injecter une salive qui liquéfie les tissus de l'hôte avant de boire — petit, mais ravageur agricole majeur des fruits et légumes."},{"id":"Pseudosphinx","common":"Tetrio sphinx","genus":"Pseudosphinx","species":"tetrio","scientificName":"Pseudosphinx tetrio","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Bombycoidea"],["Family","Sphingidae"],["Subfamily","Macroglossinae"],["Tribe","Dilophonotini"]],"dist":["NEO","NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Caterpillar uses frangipani latex","habSame":false,"diet":["HER"],"size":[110,140],"fact":"Caterpillars are huge yellow-black-red banded warning posters — toxic and toxic-looking — that strip frangipani trees bare in single nights across the tropical Americas.","commonFr":"Sphinx du frangipanier","factFr":"Sa grande chenille rouge feu rayée de noir avec une corne caudale jaune se nourrit exclusivement de frangipanier toxique — elle séquestre les composés et signale ainsi qu'elle est immangeable."},{"id":"Ammophila","common":"Thread-waisted wasp","genus":"Ammophila","species":"procera","scientificName":"Ammophila procera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Sphecidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larva develops on paralysed caterpillar","habSame":false,"diet":["CAR"],"size":[20,28],"fact":"After burying a paralysed caterpillar and laying an egg on it, this wasp picks up a pebble in her jaws and tamps the burrow shut — one of the few documented insect uses of a tool.","commonFr":"Ammophile à long col","factFr":"Élégante guêpe solitaire au pédicelle d'abdomen filiforme ; elle paralyse une chenille bien plus grosse qu'elle, la traîne jusqu'à un terrier déjà creusé, et bouche l'entrée avec un caillou tenu dans ses mandibules — l'un des très rares insectes connus pour utiliser un outil."},{"id":"Titanus","common":"Titan beetle","genus":"Titanus","species":"giganteus","scientificName":"Titanus giganteus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Polyphaga"],["Superfamily","Chrysomeloidea"],["Family","Cerambycidae"],["Subfamily","Prioninae"],["Tribe","Macrodontiini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["HER"],"size":[120,170],"fact":"The largest known beetle on Earth, reaching 17 cm; adults don't feed and live just weeks to find a mate.","commonFr":"Capricorne titan","factFr":"L'un des plus grands coléoptères vivants — 16,7 cm pour le record ; on n'a jamais vu sa larve, mais à en juger par les galeries trouvées, elle doit mesurer plus de 30 cm et passer plusieurs décennies à se développer dans les arbres morts amazoniens."},{"id":"Belostoma","common":"Toe-biter","genus":"Belostoma","species":"lutarium","scientificName":"Belostoma lutarium","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Belostomatidae"]],"dist":["NEA","NEO"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"Male carries eggs glued to his back until they hatch","habSame":true,"diet":["CAR"],"size":[22,38],"fact":"The male carries his mate's eggs cemented to his back, rocking them to oxygenate the water for weeks — eat or be eaten paternal care.","commonFr":"Punaise d'eau mord-orteils","factFr":"Le mâle porte sur son dos les œufs pondus par la femelle pendant trois semaines, les aérant et les humidifiant régulièrement — l'un des rares exemples chez les insectes de soin paternel exclusif. Vit dans les eaux stagnantes d'Amérique du Nord."},{"id":"Odontomachus","common":"Trap-jaw ant","genus":"Odontomachus","species":"bauri","scientificName":"Odontomachus bauri","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Ponerinae"],["Tribe","Ponerini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[9,13],"fact":"Its jaws snap shut at over 60 m/s, the fastest known animal movement.","commonFr":"Fourmi à mâchoires-pièges","factFr":"Ses mandibules se ferment à 200 km/h, le mouvement le plus rapide jamais mesuré chez un animal ; quand elle frappe le sol avec, le choc la propulse en l'air comme un sauteur à la perche, jusqu'à 40 cm de haut."},{"id":"Daceton","common":"Trapjaw arboreal ant","genus":"Daceton","species":"armigerum","scientificName":"Daceton armigerum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Myrmicinae"],["Tribe","Attini"]],"dist":["NEO"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Nests high in rainforest canopy","habSame":true,"diet":["CAR"],"size":[9,13],"fact":"Hunts in the Amazon canopy with eyes that wrap around its head and jaws that snap shut at over 200 km/h, faster than any vertebrate could blink.","commonFr":"Fourmi arboricole à mâchoires","factFr":"Fourmis géantes blindées d'épines des canopées sud-américaines ; les ouvrières ont des mandibules en pince qui claquent comme des ciseaux, et chassent en équipe coordonnée des proies bien plus grosses qu'elles individuellement."},{"id":"Oecanthus","common":"Tree cricket","genus":"Oecanthus","species":"fultoni","scientificName":"Oecanthus fultoni","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Grylloidea"],["Family","Oecanthidae"],["Tribe","Oecanthini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[13,18],"fact":"Chirps faster as the temperature rises — count the chirps to estimate the air temperature.","commonFr":"Grillon des arbres","factFr":"Si l'on compte le nombre de stridulations en 13 secondes et qu'on ajoute 40, on obtient approximativement la température en degrés Fahrenheit — une horloge à insectes étonnamment précise utilisée par les premiers entomologistes."},{"id":"Trichadenotecnum","common":"Tree-trunk barklouse","genus":"Trichadenotecnum","species":"alexanderae","scientificName":"Trichadenotecnum alexanderae","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Psocodea"],["Suborder","Psocomorpha"],["Family","Psocidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[3,5],"fact":"Often seen moving in dense herds across tree bark, grazing on microscopic algae and fungi; despite their tiny size and overlooked lifestyle, bark lice are among the most species-rich insect groups.","commonFr":"Psoque des troncs","factFr":"Petit insecte des écorces qui broute le lichen et les algues microscopiques ; on les voit parfois en troupes denses qui se déplacent en formation, comme des moutons miniatures sur le tronc d'un arbre."},{"id":"Glossina","common":"Tsetse fly","genus":"Glossina","species":"morsitans","scientificName":"Glossina morsitans","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Brachycera"],["Infraorder","Muscomorpha"],["Superfamily","Hippoboscoidea"],["Family","Glossinidae"]],"dist":["AFR"],"hab":["AER"],"habAdult":["AER"],"habLarva":["AER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[7,14],"fact":"Females give birth to a single fully developed larva after carrying it inside for over a week.","commonFr":"Mouche tsé-tsé","factFr":"Vecteur de la trypanosomiase africaine (maladie du sommeil) chez l'humain et le bétail ; ses femelles, fait rarissime chez les insectes, donnent naissance à une seule larve fully formed nourrie par une glande comparable à un placenta."},{"id":"Platymeris","common":"Two-spot assassin bug","genus":"Platymeris","species":"biguttatus","scientificName":"Platymeris biguttatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Subfamily","Reduviinae"],["Tribe","Psyttalini"]],"dist":["AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Hollow tree stumps and decaying logs in tropical Africa","habSame":true,"diet":["CAR"],"size":[30,40],"fact":"When threatened it can spit a jet of caustic venom up to 30 centimetres — a defence accurate enough to cause temporary blindness in a vertebrate face.","commonFr":"Réduve à deux points","factFr":"Quand on la menace, elle peut cracher un jet de venin caustique jusqu'à 30 centimètres — une défense suffisamment précise pour provoquer une cécité temporaire chez un visage de vertébré."},{"id":"Anisomorpha","common":"Two-striped walkingstick","genus":"Anisomorpha","species":"buprestoides","scientificName":"Anisomorpha buprestoides","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Pseudophasmatidae"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[40,80],"fact":"Sprays a defensive chemical that can cause temporary blindness if it hits the eyes.","commonFr":"Phasme rayé","factFr":"Phasme américain qui projette des deux côtés du thorax un brouillard chimique extrêmement irritant — il peut viser un visage à 30 cm de distance et provoquer une douleur oculaire intense, suffisante pour repousser un coyote ou un raton-laveur."},{"id":"Dasymutilla","common":"Velvet ant","genus":"Dasymutilla","species":"occidentalis","scientificName":"Dasymutilla occidentalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Pompiloidea"],["Family","Mutillidae"],["Tribe","Dasymutillini"]],"dist":["NEA"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Wingless females; males winged","habSame":true,"diet":["CAR"],"size":[10,25],"fact":"Wingless female wasps that look like fuzzy ants; some species are nicknamed 'cow killers' for their painful sting.","commonFr":"Fourmi de velours","factFr":"C'est en réalité une guêpe sans aile à l'allure de fourmi velue rouge et noir ; piqure parmi les plus douloureuses du règne animal — d'où son surnom de « killer ant cow » en anglais, censé pouvoir tuer une vache d'une piqûre (légende)."},{"id":"Carabus","common":"Violet ground beetle","genus":"Carabus","species":"violaceus","scientificName":"Carabus violaceus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Carabidae"],["Subfamily","Carabinae"],["Tribe","Carabini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless; elytra fused","habSame":true,"diet":["CAR"],"size":[15,40],"fact":"Most are flightless predators — their elytra are fused shut.","commonFr":"Carabe violet","factFr":"Grand carabe européen aux reflets violet métallique sur les bords des élytres ; prédateur nocturne très utile au jardin, il dévore limaces, escargots et chenilles à un rythme impressionnant."},{"id":"Phyllium","common":"Walking leaf","genus":"Phyllium","species":"philippinicum","scientificName":"Phyllium philippinicum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Phasmida"],["Suborder","Euphasmatodea"],["Family","Phylliidae"]],"dist":["IND"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Females flightless; males can glide","habSame":true,"diet":["HER"],"size":[60,100],"fact":"Mimics a leaf so completely that even leaf-edge bite marks are part of its body.","commonFr":"Phyllie des Philippines","factFr":"Imite si parfaitement une feuille — y compris les nervures, les trous de chenille et les taches brunes — que même en mouvement il se balance comme une feuille au vent, leurrant les prédateurs jusqu'au dernier instant."},{"id":"Pantala","common":"Wandering glider","genus":"Pantala","species":"flavescens","scientificName":"Pantala flavescens","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["NEA","NEO","PAL","AFR","IND","OCE"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[45,50],"fact":"Migrates further than any other insect — single individuals fly across the Indian Ocean.","commonFr":"Pantale planeur","factFr":"Libellule la plus répartie du monde — la seule connue à traverser les océans en migration ; elle parcourt jusqu'à 18 000 km entre l'Inde et l'Afrique en plusieurs générations, profitant des vents de mousson."},{"id":"Synoeca","common":"Warrior wasp","genus":"Synoeca","species":"septentrionalis","scientificName":"Synoeca septentrionalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Vespoidea"],["Family","Vespidae"],["Subfamily","Polistinae"],["Tribe","Epiponini"]],"dist":["NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[22,28],"fact":"Before attacking, the colony drums on its papery nest in synchronised waves — a sound like distant rain that warns intruders to leave or face one of the most painful stings on Earth.","commonFr":"Guêpe guerrière","factFr":"Construit ses nids comme des amphithéâtres collés aux troncs ; en cas de menace, toute la colonie tape sur les parois du nid en synchronie pour produire un grondement audible à plusieurs mètres — un avertissement avant l'attaque massive."},{"id":"Decticus","common":"Wart-biter","genus":"Decticus","species":"verrucivorus","scientificName":"Decticus verrucivorus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Tettigonioidea"],["Family","Tettigoniidae"],["Subfamily","Tettigoniinae"],["Tribe","Decticini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["OMN"],"size":[24,40],"fact":"Has powerful jaws that, in legend, were thought to bite warts off skin.","commonFr":"Dectique verrucivore","factFr":"Le folklore prétendait que sa morsure pouvait éliminer les verrues — d'où son nom scientifique ; cette grande sauterelle européenne mange en réalité d'autres insectes et n'a aucune propriété médicinale."},{"id":"Climaciella","common":"Wasp mantisfly","genus":"Climaciella","species":"brunnea","scientificName":"Climaciella brunnea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Mantispidae"],["Subfamily","Mantispinae"]],"dist":["NEA","NEO"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Larva hitches a ride on a spider, then eats her egg sac from inside","habSame":false,"diet":["CAR"],"size":[18,24],"fact":"Looks and flies like a stinging paper-nest hymenopteran but is in fact a lacewing — its tiny larva hops onto a wandering wolf spider, rides her around, and devours her egg sac when she lays one.","commonFr":"Mantispe-guêpe","factFr":"Ressemble et vole comme un hyménoptère à nid de papier piqueur, mais c'est en fait un névroptère — sa minuscule larve saute sur une araignée errante, s'y accroche, et dévore son cocon d'œufs quand la femelle pond."},{"id":"Xenos","common":"Wasp twisted-winged parasite","genus":"Xenos","species":"vesparum","scientificName":"Xenos vesparum","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Strepsiptera"],["Family","Xenidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"Males fly briefly; females embedded in wasps","habSame":false,"diet":["CAR"],"size":[2,4],"fact":"Females spend their entire lives inside a wasp host — only their faces stick out to mate.","commonFr":"Stylops des guêpes","factFr":"Les femelles passent toute leur vie coincées dans le corps d'une guêpe hôte — seule leur face dépasse pour s'accoupler, le reste du corps restant un sac parasite à l'intérieur de l'abdomen de l'hôte."},{"id":"Corixa","common":"Water boatman","genus":"Corixa","species":"punctata","scientificName":"Corixa punctata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Corixidae"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["OMN"],"size":[12,15],"fact":"Males 'sing' by rubbing body parts together — the loudest known animal relative to its size.","commonFr":"Corise","factFr":"Nageuse aquatique qui chante en frottant ses pattes contre son abdomen — l'un des animaux les plus bruyants au monde par rapport à sa taille, son chant rivalisant avec celui d'un train passant à proximité quand on le calibre par poids corporel."},{"id":"Nepa","common":"Water scorpion","genus":"Nepa","species":"cinerea","scientificName":"Nepa cinerea","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Nepomorpha"],["Family","Nepidae"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[20,25],"fact":"Breathes through a long snorkel-like tail held above the water's surface.","commonFr":"Nèpe","factFr":"Respire à travers un long siphon en forme de queue qu'elle tient juste au-dessus de la surface de l'étang pendant qu'elle tend l'embuscade aux proies sous l'eau."},{"id":"Gerris","common":"Water strider","genus":"Gerris","species":"lacustris","scientificName":"Gerris lacustris","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Gerromorpha"],["Family","Gerridae"],["Tribe","Gerrini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[8,17],"fact":"Their feet are covered in microscopic water-repellent hairs that let them stand on water.","commonFr":"Gerris","factFr":"Ses pieds sont couverts de poils microscopiques hydrofuges qui lui permettent de patiner à la surface de l'étang sans rompre la tension superficielle."},{"id":"Conwentzia","common":"Wax fly","genus":"Conwentzia","species":"psociformis","scientificName":"Conwentzia psociformis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Neuroptera"],["Suborder","Hemerobiiformia"],["Family","Coniopterygidae"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[3,5],"fact":"Coated in a powdery white wax that gives the family the name 'wax flies'.","commonFr":"Mouche cireuse","factFr":"Revêtue d'un duvet blanc poudreux qui donne à toute cette petite famille de chrysopes un aspect givré."},{"id":"Galleria","common":"Wax moth","genus":"Galleria","species":"mellonella","scientificName":"Galleria mellonella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Pyraloidea"],["Family","Pyralidae"],["Tribe","Galleriini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Their gut bacteria can break down polyethylene plastic, a potential recycling tool.","commonFr":"Fausse-teigne de la cire","factFr":"Sa chenille vit dans les ruches d'apidae dont elle dévore les rayons de cire ; on a découvert récemment qu'elle digère aussi le polyéthylène — ouvrant des recherches sur la biodégradation des plastiques."},{"id":"Oecophylla","common":"Weaver ant","genus":"Oecophylla","species":"smaragdina","scientificName":"Oecophylla smaragdina","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Oecophyllini"]],"dist":["IND","OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["CAR"],"size":[5,10],"fact":"Workers stitch leaves together using silk produced by their own larvae, which they squeeze like glue guns.","commonFr":"Fourmi tisseuse","factFr":"Construit des nids en pliant des feuilles vivantes maintenues ensemble par la soie sécrétée par ses propres larves — qu'elle tient comme des tubes de colle ; les ouvrières se passent les larves de patte en patte comme des outils."},{"id":"Embia","common":"Web-spinner","genus":"Embia","species":"ramburi","scientificName":"Embia ramburi","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Embioptera"],["Family","Embiidae"]],"dist":["PAL","AFR"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Mostly wingless; males may fly","habSame":true,"diet":["HER"],"size":[8,15],"fact":"Spins silk from glands in its forelegs and lives in elaborate silken tunnels.","commonFr":"Embioptère","factFr":"Petit insecte cylindrique qui tisse des galeries de soie sous les pierres ou les écorces ; les femelles sont aptères, les mâles ailés, et toutes deux respectent une hiérarchie sociale au sein du tunnel familial."},{"id":"Frankliniella","common":"Western flower thrips","genus":"Frankliniella","species":"occidentalis","scientificName":"Frankliniella occidentalis","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Thysanoptera"],["Suborder","Terebrantia"],["Family","Thripidae"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[1,2],"fact":"Transmits plant viruses that can wipe out entire pepper, tomato or flower crops.","commonFr":"Thrips occidental des fleurs","factFr":"Minuscule ravageur agricole de moins de 2 mm qui vit caché dans les corolles et transmet le virus de la maladie bronzée de la tomate à plus de 400 plantes hôtes différentes."},{"id":"Apis","common":"Western honey bee","genus":"Apis","species":"mellifera","scientificName":"Apis mellifera","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Apoidea"],["Family","Apidae"],["Subfamily","Apinae"],["Tribe","Apini"]],"dist":["PAL","AFR"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[10,20],"fact":"Dancers communicate exact direction and distance to nectar sources with figure-eight 'waggle dances'.","commonFr":"Abeille domestique","factFr":"Communique par danse en huit la direction et la distance des fleurs jusqu'à la colonie — une découverte qui a valu le prix Nobel à Karl von Frisch en 1973 et reste l'un des langages animaux les plus sophistiqués documentés."},{"id":"Deinacrida","common":"Weta","genus":"Deinacrida","species":"heteracantha","scientificName":"Deinacrida heteracantha","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Orthoptera"],["Suborder","Ensifera"],["Superfamily","Stenopelmatoidea"],["Family","Anostostomatidae"]],"dist":["OCE"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"Flightless","habSame":true,"diet":["HER"],"size":[60,100],"fact":"One of the heaviest insects on Earth, with females reaching the weight of a small mouse.","commonFr":"Weta géant","factFr":"L'un des insectes les plus lourds au monde (70 grammes), endémique d'une petite île néo-zélandaise ; ressemble à un grand criquet aux pattes hérissées d'épines, et joue le rôle écologique des petits rongeurs absents de Nouvelle-Zélande avant l'arrivée des humains."},{"id":"Arilus","common":"Wheel bug","genus":"Arilus","species":"cristatus","scientificName":"Arilus cristatus","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Paraneoptera"],["Order","Hemiptera"],["Suborder","Heteroptera"],["Infraorder","Cimicomorpha"],["Superfamily","Reduvioidea"],["Family","Reduviidae"],["Tribe","Harpactorini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER","TER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["CAR"],"size":[25,38],"fact":"Has a serrated 'cog wheel' crest on its back that looks like a small dinosaur.","commonFr":"Réduve à roue","factFr":"A une crête dentée en forme de roue dentée sur le dos qui ressemble à la colonne d'un mini-dinosaure — une caractéristique unique parmi les réduves nord-américains."},{"id":"Gyrinus","common":"Whirligig beetle","genus":"Gyrinus","species":"natator","scientificName":"Gyrinus natator","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Coleoptera"],["Suborder","Adephaga"],["Family","Gyrinidae"],["Tribe","Gyrinini"]],"dist":["PAL"],"hab":["AQU"],"habAdult":["AQU"],"habLarva":["AQU"],"habNote":"","habSame":true,"diet":["CAR"],"size":[5,7],"fact":"Their compound eyes are split in two so they see above and below water simultaneously.","commonFr":"Gyrin","factFr":"Tourne en cercles rapides à la surface des étangs ; ses yeux sont divisés en deux moitiés indépendantes — une voyant au-dessus de l'eau, l'autre en dessous — ce qui lui permet de chasser simultanément à l'air et sous l'eau."},{"id":"Operophtera","common":"Winter moth","genus":"Operophtera","species":"brumata","scientificName":"Operophtera brumata","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Geometroidea"],["Family","Geometridae"],["Tribe","Operophterini"]],"dist":["PAL"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"Females wingless, only males fly","habSame":false,"diet":["HER"],"size":[20,30],"fact":"Females are nearly wingless and crawl up tree trunks to lay eggs.","commonFr":"Phalène brumeuse","factFr":"L'un des rares papillons à voler en plein hiver, sortant de sa chrysalide en novembre quand les jardiniers ne s'y attendent pas ; sa femelle est aptère et ressemble à une araignée, attendant le mâle volant pour s'accoupler."},{"id":"Formica","common":"Wood ant","genus":"Formica","species":"rufa","scientificName":"Formica rufa","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Hymenoptera"],["Suborder","Apocrita"],["Infraorder","Aculeata"],["Superfamily","Formicoidea"],["Family","Formicidae"],["Subfamily","Formicinae"],["Tribe","Formicini"]],"dist":["PAL"],"hab":["TER"],"habAdult":["TER"],"habLarva":["TER"],"habNote":"","habSame":true,"diet":["OMN"],"size":[4,10],"fact":"Sprays formic acid in defence, the chemical that gives the family Formicidae its name.","commonFr":"Fourmi rousse des bois","factFr":"Projette de l'acide formique en défense — l'acide qui a donné son nom à la famille des Formicidae ; ses dômes d'aiguilles de pin maintiennent en outre une température interne stable de 25°C même en hiver, grâce à la fermentation contrôlée des matériaux."},{"id":"Pyrrharctia","common":"Woolly bear","genus":"Pyrrharctia","species":"isabella","scientificName":"Pyrrharctia isabella","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Lepidoptera"],["Superfamily","Noctuoidea"],["Family","Erebidae"],["Subfamily","Arctiinae"],["Tribe","Arctiini"]],"dist":["NEA"],"hab":["TER","AER"],"habAdult":["AER"],"habLarva":["TER"],"habNote":"","habSame":false,"diet":["HER"],"size":[45,55],"fact":"Its caterpillar — the woolly bear — survives freezing solid by producing its own antifreeze.","commonFr":"Écaille Isabelle","factFr":"Sa chenille hérissée noir et orange survit congelée jusqu'à -90°C en produisant son propre antigel — le folklore prétend que la largeur de la bande orange prédit la rigueur de l'hiver à venir."},{"id":"Aedes","common":"Yellow fever mosquito","genus":"Aedes","species":"aegypti","scientificName":"Aedes aegypti","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Holometabola"],["Order","Diptera"],["Suborder","Nematocera"],["Infraorder","Culicomorpha"],["Family","Culicidae"],["Subfamily","Culicinae"],["Tribe","Aedini"]],"dist":["AFR"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[4,7],"fact":"Only females bite — they need a blood meal to produce eggs.","commonFr":"Moustique de la fièvre jaune","factFr":"Vecteur principal de la dengue, du Zika, du chikungunya et de la fièvre jaune ; il pique exclusivement le jour, près des habitations humaines, et pond dans la moindre flaque d'eau stagnante — un seau abandonné suffit."},{"id":"Isoperla","common":"Yellow sally","genus":"Isoperla","species":"grammatica","scientificName":"Isoperla grammatica","lineage":[["Subclass","Pterygota"],["Infraclass","Neoptera"],["Superorder","Polyneoptera"],["Order","Plecoptera"],["Suborder","Arctoperlaria"],["Family","Perlodidae"]],"dist":["PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["OMN"],"size":[10,15],"fact":"Adults are sometimes nicknamed 'yellow sallies' by trout fishermen.","commonFr":"Perle jaune","factFr":"Petite perle européenne aux ailes jaune marbré qui émerge des rivières propres au printemps ; sa nymphe est carnivore et chasse activement les autres insectes aquatiques."},{"id":"Trithemis","common":"Orange-winged dropwing","genus":"Trithemis","species":"kirbyi","scientificName":"Trithemis kirbyi","lineage":[["Subclass","Pterygota"],["Infraclass","Palaeoptera"],["Order","Odonata"],["Suborder","Anisoptera"],["Superfamily","Libelluloidea"],["Family","Libellulidae"]],"dist":["AFR","PAL"],"hab":["AQU","AER"],"habAdult":["AER"],"habLarva":["AQU"],"habNote":"","habSame":false,"diet":["CAR"],"size":[33,38],"fact":"The male is one of the most photographed dragonflies in southern Africa — his thorax and abdomen turn pumpkin-orange in maturity and the basal half of each wing is washed in amber, so that he seems to fly through a small flame as he hovers above sun-warmed boulders.","commonFr":"Trithémis pourpré orangé","factFr":"Le mâle est l'une des libellules les plus photographiées d'Afrique australe — son thorax et son abdomen virent au orange citrouille à maturité et la moitié basale des ailes est lavée d'ambre, donnant l'impression qu'il vole à travers une petite flamme quand il survole les rochers chauffés par le soleil."}]`;
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
// Localised rank label: usable by any component via `rankLabelFor(rank, lang)`.
// Falls back to the English RANK_LABEL when a translation is missing.
function rankLabelFor(rank, lang) {
  const fr = {
    Class: 'Classe', Subclass: 'Sous-classe', Infraclass: 'Infra-classe', Superorder: 'Super-ordre',
    Order: 'Ordre', Suborder: 'Sous-ordre', Infraorder: 'Infra-ordre',
    Superfamily: 'Super-famille', Family: 'Famille', Subfamily: 'Sous-famille', Tribe: 'Tribu',
    Genus: 'Genre', Species: 'Espèce'
  };
  if (lang === 'fr' && fr[rank]) return fr[rank];
  return RANK_LABEL[rank] || rank;
}

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

// ===== I18N — UI STRING TABLE =====
// All user-facing text passes through `t(key)`. To add a string: pick a unique key,
// add an entry to STRINGS.en and STRINGS.fr below. Templates use `{var}` placeholders
// replaced by t(key, { var: value }).
//
// Species names and fun facts are stored separately on each species record under
// `commonFr` and `factFr`, and resolved through useSpeciesCommon()/useSpeciesFact()
// helpers further down. The dataset itself stays English-by-default; FR fields are
// optional and fall back to the English ones when missing.

const STRINGS = {
  en: {
    // Header / actions
    practice_on: 'Practice mode',
    daily_challenge: 'Daily challenge',
    sound_on: 'Sound on',
    sound_off: 'Sound off',
    explore_tree: 'Explore the tree of life — browse and learn',
    achievements: 'Achievements',
    how_to_play: 'How to play',
    sync_button: 'Sync',
    sync_title: 'Sync across devices',
    sync_intro: 'Enter a nickname to sync your stats and badges across devices. No password, no account — anyone using the same nickname shares the same stats.',
    sync_first_time: 'First time using this nickname? Your current stats on this device become its starting point.',
    sync_existing: 'This nickname already exists. Its cloud stats will be loaded onto this device, replacing local progress.',
    sync_placeholder: 'Your nickname',
    sync_connect: 'Connect',
    sync_disconnect: 'Disconnect',
    sync_connected_as: 'Synced as {name}',
    sync_syncing: 'Syncing…',
    sync_synced: 'Synced ✓',
    sync_error: 'Sync unavailable right now.',
    sync_disabled: 'Cross-device sync is not configured for this site.',
    sync_now: 'Sync now',
    sync_clear_confirm: 'Disconnect this nickname? Your stats stay on this device but will no longer sync.',
    mystats_button: 'My stats',
    mystats_title: 'My statistics',
    mystats_wins: 'Wins',
    mystats_winrate: 'Win rate',
    mystats_streak: 'Current streak',
    mystats_beststreak: 'Best streak',
    mystats_avg: 'Avg. attempts',
    mystats_distribution: 'Attempt distribution',
    mystats_local: 'Stats on this device',
    mystats_synced_as: 'Synced as {name}',
    mystats_empty: 'No games played yet — solve today\'s puzzle to start your stats!',
    whatsnew_title: "What's new",
    whatsnew_sync_h: 'Play across devices',
    whatsnew_sync_p: 'You can now pick a nickname (no password) to sync your stats and badges between your phone, tablet and computer. Look for the cloud icon in the header.',
    whatsnew_stats_h: 'Personal statistics',
    whatsnew_stats_p: 'A new stats panel shows your wins, streaks, win rate, badges and more. Tap the chart icon in the header.',
    whatsnew_cta: 'Got it',
    practice_toggle: 'Practice mode (random species, does not affect stats)',
    new_game: 'New game',
    give_up: 'Give up',
    show_answer: 'Show answer',
    close: 'Close',
    back_to_game: 'Back to game',
    lang_label: 'Language',
    // Game core
    guesses: 'Guesses',
    your_guess: 'Your Guess',
    your_guesses: 'Your Guesses',
    no_guesses_yet: 'No guesses yet.',
    practice_banner: 'Practice mode is on — this round will not be recorded in your statistics.',
    hint_3: 'Hint (−3 attempts)',
    fact_5: 'Fact (−5 attempts)',
    revealed_hint: 'Revealed hint:',
    attempts_remaining: '{n} attempts remaining',
    type_to_search: 'Type a species name (common or scientific)…',
    // Lineage / colour code
    color_code: 'The colour code',
    exact_match: 'Exact match',
    partial_match: 'Partially correct',
    no_match: 'No match',
    close_match: 'Close',
    // Hint values
    smaller: 'Smaller',
    larger: 'Larger',
    trades: 'Trades',
    // End screen
    you_won: 'You found it!',
    you_lost: 'Game over',
    in_n_guesses: 'in {n} guesses',
    new_streak: 'Streak: {n}',
    best_streak: 'Best streak: {n}',
    total_wins: 'Total wins',
    streak: 'Streak',
    fun_fact: 'Fun fact',
    full_taxonomy: 'Full taxonomy',
    // Explorer
    tree_of_life: 'Tree of life',
    search_clade: 'Search any clade or species…',
    select_species_hint: 'Select a species in the tree to see its details.',
    species_waiting: '{n} insect species across {k} subclasses are waiting.',
    species_count_suffix: 'sp.',
    explore_tip: 'Tap a + to expand a clade. Click any species (italic name) to see its photo and full taxonomy.',
    // Achievements panel
    ach_unlocked: '{a} / {b} unlocked',
    ach_pollinator: 'Pollinator',
    ach_globetrotter: 'Globetrotter',
    ach_bugmaster: 'Bug Master',
    ach_progress_regions: '{n}/6 regions',
    ach_progress_orders: '{n}/{total} orders',
    ach_progress_basic: '{n}/{total}',
    ach_hover_hint: 'Hover a badge for its description.',
    // How to play
    htp_title: 'How to play',
    htp_daily_h: 'Daily challenge',
    htp_daily_p: "Bugdle challenges you to find the mystery insect of the day among 365 candidates. Everyone plays the same insect on the same day. Tomorrow brings a new one.",
    htp_color_h: 'The colour code',
    htp_color_p: 'Each guess is compared rank-by-rank to the target across the taxonomic tree. The deeper your guess sits in the shared branch, the closer you are to the answer.',
    htp_color_dark_green: 'Dark green: identical clade at this rank.',
    htp_color_light_green: 'Light green: clade is the closest sister within the shared parent.',
    htp_color_yellow: 'Yellow: clade differs but shares the parent rank.',
    htp_color_red: 'Red: nothing in common at this rank.',
    htp_traits_h: 'Trait hints',
    htp_traits_p: 'Below each guess you see whether the species matches the target on size, distribution, habitat and diet. Match exactly, or partially, or not at all.',
    htp_practice_h: 'Practice mode',
    htp_practice_p: "Click the dumbbell icon to pull a random species at any time — practice rounds don't affect your statistics or your daily challenge. Use them as warm-up before tomorrow's puzzle.",
    htp_explore_h: 'Explore the tree',
    htp_explore_p: "Tap the tree icon in the header to open the tree of life explorer: a study and review mode where you can browse every species in the game by unfolding clades from Insecta downward. Use the search bar to jump to any clade or species — searching auto-expands the path to it and reveals its direct subclades. Click any species to see its photo, fact and full taxonomy.",
    htp_stats_h: 'Your statistics',
    htp_stats_p: 'Tap the chart icon in the header to open your personal stats: wins, losses, win rate, current and best streak, games played, badges earned, orders mastered, and biogeographic regions covered. These reflect this device by default, or your synced nickname if you connect one.',
    htp_sync_h: 'Play across devices',
    htp_sync_p: 'Tap the cloud icon to enter a nickname (no password, no account). Your stats and badges then follow you to any device where you enter the same nickname. The first time you use a nickname, this device\'s current stats become its starting point; afterwards everything syncs automatically after each win and on every page load.',
    htp_start_h: 'A good start',
    htp_start_p: 'Start with a species you know well. The fewer guesses you need, the more achievements you unlock.',
    htp_lang_note: '',
    htp_credits_h: 'Inspired by',
    htp_credits_p: 'Bugdle was inspired by',
    // Clade information panel
    clade_info_title: 'Clade Information',
    clade_info_toggle_show: 'Show clade information',
    clade_info_toggle_hide: 'Hide clade information',
    clade_info_empty: 'Make a guess to see information about the closest shared clade.',
    clade_info_loading: 'Loading clade information…',
    clade_info_no_data: 'No information available for this clade.',
    clade_info_source: 'Extracted from Wikipedia',
    // Misc
    loading_image: 'Loading image…',
    image_unavailable: 'Image could not be loaded.',
    image_blocked_hint: 'Some sandboxed environments block external images.',
    open_on_wikipedia: 'Open {name} on Wikipedia ↗',
    photo_from: 'Photo from {source}',
    achievement_unlocked: 'Achievement unlocked: {name}',
    // Region names
    region_AFR: 'Afrotropical',
    region_NEO: 'Neotropical',
    region_NEA: 'Nearctic',
    region_PAL: 'Palearctic',
    region_IND: 'Indo-Malayan',
    region_OCE: 'Oceanian',
    // Habitat names
    hab_TER: 'Terrestrial',
    hab_AQU: 'Aquatic',
    hab_AER: 'Aerial',
    hab_SUB: 'Subterranean',
    // Diet names
    diet_HER: 'Herbivore',
    diet_CAR: 'Carnivore',
    diet_OMN: 'Omnivore',
    diet_DET: 'Detritivore',
    diet_HEM: 'Hematophage',
    diet_FUN: 'Fungivore',
    diet_PAR: 'Parasitoid',
    diet_NEC: 'Necrophage',
    // Rank labels (used in trees and lineage display)
    rank_Class: 'Class',
    rank_Subclass: 'Subclass',
    rank_Infraclass: 'Infraclass',
    rank_Superorder: 'Superorder',
    rank_Order: 'Order',
    rank_Suborder: 'Suborder',
    rank_Infraorder: 'Infraorder',
    rank_Superfamily: 'Superfamily',
    rank_Family: 'Family',
    rank_Subfamily: 'Subfamily',
    rank_Tribe: 'Tribe',
    rank_Genus: 'Genus',
    rank_Species: 'Species',
  },
  fr: {
    practice_on: 'Mode entraînement',
    daily_challenge: 'Défi du jour',
    sound_on: 'Son activé',
    sound_off: 'Son désactivé',
    explore_tree: "Explorer l'arbre du vivant — parcourir et apprendre",
    achievements: 'Succès',
    how_to_play: 'Comment jouer',
    sync_button: 'Sync',
    sync_title: 'Synchroniser entre appareils',
    sync_intro: "Entrez un pseudo pour synchroniser vos statistiques et badges entre vos appareils. Pas de mot de passe, pas de compte — toute personne utilisant le même pseudo partage les mêmes statistiques.",
    sync_first_time: "Première utilisation de ce pseudo ? Vos statistiques actuelles sur cet appareil deviennent son point de départ.",
    sync_existing: "Ce pseudo existe déjà. Ses statistiques du cloud seront chargées sur cet appareil, remplaçant la progression locale.",
    sync_placeholder: 'Votre pseudo',
    sync_connect: 'Connecter',
    sync_disconnect: 'Déconnecter',
    sync_connected_as: 'Synchronisé : {name}',
    sync_syncing: 'Synchronisation…',
    sync_synced: 'Synchronisé ✓',
    sync_error: 'Synchronisation indisponible pour le moment.',
    sync_disabled: "La synchronisation multi-appareils n'est pas configurée pour ce site.",
    sync_now: 'Synchroniser maintenant',
    sync_clear_confirm: 'Déconnecter ce pseudo ? Vos statistiques restent sur cet appareil mais ne seront plus synchronisées.',
    mystats_button: 'Mes stats',
    mystats_title: 'Mes statistiques',
    mystats_wins: 'Parties gagnées',
    mystats_winrate: 'Pourcentage gagné',
    mystats_streak: 'Série actuelle',
    mystats_beststreak: 'Meilleure série',
    mystats_avg: 'Essais (moyenne)',
    mystats_distribution: 'Répartition des essais',
    mystats_local: 'Statistiques sur cet appareil',
    mystats_synced_as: 'Synchronisé : {name}',
    mystats_empty: "Aucune partie jouée — résolvez le défi du jour pour démarrer vos statistiques !",
    whatsnew_title: 'Nouveautés',
    whatsnew_sync_h: 'Jouer sur plusieurs appareils',
    whatsnew_sync_p: "Vous pouvez désormais choisir un pseudo (sans mot de passe) pour synchroniser vos statistiques et badges entre votre téléphone, tablette et ordinateur. Cherchez l'icône nuage dans l'en-tête.",
    whatsnew_stats_h: 'Statistiques personnelles',
    whatsnew_stats_p: "Un nouveau panneau de stats affiche vos victoires, séries, taux de victoire, badges et plus encore. Touchez l'icône graphique dans l'en-tête.",
    whatsnew_cta: "J'ai compris",
    practice_toggle: 'Mode entraînement (espèce aléatoire, ne compte pas dans les statistiques)',
    new_game: 'Nouvelle partie',
    give_up: 'Abandonner',
    show_answer: 'Voir la réponse',
    close: 'Fermer',
    back_to_game: 'Retour au jeu',
    lang_label: 'Langue',
    guesses: 'Propositions',
    your_guess: 'Votre proposition',
    your_guesses: 'Vos propositions',
    no_guesses_yet: 'Aucune proposition pour le moment.',
    practice_banner: "Mode entraînement actif — cette partie ne sera pas enregistrée dans vos statistiques.",
    hint_3: 'Indice (−3 essais)',
    fact_5: 'Anecdote (−5 essais)',
    revealed_hint: 'Indice révélé :',
    attempts_remaining: '{n} essais restants',
    type_to_search: "Tapez un nom d'espèce (commun ou scientifique)…",
    color_code: 'Le code couleur',
    exact_match: 'Correspondance exacte',
    partial_match: 'Partiellement correct',
    no_match: 'Aucune correspondance',
    close_match: 'Proche',
    smaller: 'Plus petit',
    larger: 'Plus grand',
    trades: 'Échanges',
    you_won: 'Trouvé !',
    you_lost: 'Partie perdue',
    in_n_guesses: 'en {n} propositions',
    new_streak: 'Série : {n}',
    best_streak: 'Meilleure série : {n}',
    total_wins: 'Victoires totales',
    streak: 'Série',
    fun_fact: 'Anecdote',
    full_taxonomy: 'Taxonomie complète',
    tree_of_life: 'Arbre du vivant',
    search_clade: 'Rechercher un clade ou une espèce…',
    select_species_hint: "Sélectionnez une espèce dans l'arbre pour voir ses détails.",
    species_waiting: "{n} espèces d'insectes réparties sur {k} sous-classes vous attendent.",
    species_count_suffix: 'esp.',
    explore_tip: "Touchez + pour déplier un clade. Cliquez sur une espèce (nom en italique) pour voir sa photo et sa taxonomie complète.",
    ach_unlocked: '{a} / {b} débloqués',
    ach_pollinator: 'Pollinisateur',
    ach_globetrotter: 'Globe-trotteur',
    ach_bugmaster: 'Maître des insectes',
    ach_progress_regions: '{n}/6 régions',
    ach_progress_orders: '{n}/{total} ordres',
    ach_progress_basic: '{n}/{total}',
    ach_hover_hint: 'Survolez un badge pour voir sa description.',
    htp_title: 'Comment jouer',
    htp_daily_h: 'Défi du jour',
    htp_daily_p: "Bugdle vous met au défi de trouver l'insecte mystère du jour parmi 365 candidats. Tout le monde joue le même insecte le même jour. Demain, un nouveau insecte sera proposé.",
    htp_color_h: 'Le code couleur',
    htp_color_p: "Chaque proposition est comparée rang par rang à l'espèce cible dans l'arbre taxonomique. Plus votre proposition partage de rangs avec la cible, plus vous vous rapprochez de la réponse.",
    htp_color_dark_green: 'Vert foncé : clade identique à ce rang.',
    htp_color_light_green: 'Vert clair : clade sœur le plus proche au sein du parent commun.',
    htp_color_yellow: 'Jaune : clade différent mais même rang parent.',
    htp_color_red: 'Rouge : aucune correspondance à ce rang.',
    htp_traits_h: 'Indices sur les traits',
    htp_traits_p: "Sous chaque proposition, on indique si l'espèce correspond à la cible pour la taille, la répartition, l'habitat et le régime alimentaire. Correspondance exacte, partielle, ou nulle.",
    htp_practice_h: 'Mode entraînement',
    htp_practice_p: "Cliquez sur l'icône haltère pour tirer une espèce aléatoire à tout moment — les parties d'entraînement n'affectent ni vos statistiques ni votre défi du jour. Idéal pour s'échauffer avant le puzzle de demain.",
    htp_explore_h: "Explorer l'arbre",
    htp_explore_p: "Touchez l'icône arbre dans l'en-tête pour ouvrir l'explorateur de l'arbre du vivant : un mode étude et révision où vous pouvez parcourir toutes les espèces du jeu en dépliant les clades depuis Insecta. Utilisez la barre de recherche pour atteindre n'importe quel clade ou espèce — la recherche déplie automatiquement le chemin et révèle les sous-clades directs. Cliquez sur une espèce pour voir sa photo, son anecdote et sa taxonomie complète.",
    htp_stats_h: 'Vos statistiques',
    htp_stats_p: "Touchez l'icône graphique dans l'en-tête pour ouvrir vos statistiques personnelles : victoires, défaites, taux de victoire, série actuelle et meilleure série, parties jouées, badges obtenus, ordres maîtrisés et régions biogéographiques couvertes. Elles reflètent cet appareil par défaut, ou votre pseudo synchronisé si vous en connectez un.",
    htp_sync_h: 'Jouer sur plusieurs appareils',
    htp_sync_p: "Touchez l'icône nuage pour entrer un pseudo (sans mot de passe, sans compte). Vos statistiques et badges vous suivent alors sur tout appareil où vous entrez le même pseudo. La première fois que vous utilisez un pseudo, les statistiques actuelles de cet appareil en deviennent le point de départ ; ensuite tout se synchronise automatiquement après chaque victoire et à chaque chargement de la page.",
    htp_start_h: 'Un bon départ',
    htp_start_p: "Commencez par une espèce que vous connaissez bien. Moins vous avez besoin de propositions, plus vous débloquez de succès.",
    htp_lang_note: "Version française : la traduction est automatique. Certains noms et anecdotes peuvent contenir des approximations.",
    htp_credits_h: 'Inspiré par',
    htp_credits_p: 'Bugdle a été inspiré par',
    clade_info_title: 'Information sur le clade',
    clade_info_toggle_show: "Afficher l'information sur le clade",
    clade_info_toggle_hide: "Masquer l'information sur le clade",
    clade_info_empty: "Faites une proposition pour voir les informations sur le clade commun le plus proche.",
    clade_info_loading: "Chargement des informations…",
    clade_info_no_data: "Pas d'information disponible pour ce clade.",
    clade_info_source: 'Extrait de Wikipédia',
    loading_image: 'Chargement de la photo…',
    image_unavailable: 'Image indisponible.',
    image_blocked_hint: 'Certains environnements protégés bloquent les images externes.',
    open_on_wikipedia: 'Ouvrir {name} sur Wikipédia ↗',
    photo_from: 'Photo depuis {source}',
    achievement_unlocked: 'Succès débloqué : {name}',
    region_AFR: 'Afrotropicale',
    region_NEO: 'Néotropicale',
    region_NEA: 'Néarctique',
    region_PAL: 'Paléarctique',
    region_IND: 'Indo-Malaise',
    region_OCE: 'Océanienne',
    hab_TER: 'Terrestre',
    hab_AQU: 'Aquatique',
    hab_AER: 'Aérien',
    hab_SUB: 'Souterrain',
    diet_HER: 'Herbivore',
    diet_CAR: 'Carnivore',
    diet_OMN: 'Omnivore',
    diet_DET: 'Détritivore',
    diet_HEM: 'Hématophage',
    diet_FUN: 'Fongivore',
    diet_PAR: 'Parasitoïde',
    diet_NEC: 'Nécrophage',
    rank_Class: 'Classe',
    rank_Subclass: 'Sous-classe',
    rank_Infraclass: 'Infra-classe',
    rank_Superorder: 'Super-ordre',
    rank_Order: 'Ordre',
    rank_Suborder: 'Sous-ordre',
    rank_Infraorder: 'Infra-ordre',
    rank_Superfamily: 'Super-famille',
    rank_Family: 'Famille',
    rank_Subfamily: 'Sous-famille',
    rank_Tribe: 'Tribu',
    rank_Genus: 'Genre',
    rank_Species: 'Espèce',
  },
};

// Translations for achievement names + descriptions. Keyed by achievement id so that
// the same id renders the right localised text from the panel and the toast.
const ACH_I18N = {
  en: {
    first_find:     { name: 'First Find',     desc: 'Win any game' },
    sharpshooter:   { name: 'Sharpshooter',   desc: 'Win in 3 guesses or fewer' },
    endurance:      { name: 'Endurance',      desc: 'Win on the 20th attempt' },
    pollinator:     { name: 'Pollinator',     desc: 'Win 5 different bee/wasp/butterfly species' },
    stargazer:      { name: 'Stargazer',      desc: 'Discover a rare-order species' },
    globetrotter:   { name: 'Globetrotter',   desc: 'Win across all 6 biogeographic regions' },
    aquanaut:       { name: 'Aquanaut',       desc: 'Win on an aquatic species' },
    apex_predator:  { name: 'Apex Predator',  desc: 'Win on a carnivore ≥ 50mm' },
    david_goliath:  { name: 'David & Goliath', desc: 'Win on a top-5 smallest AND a top-5 biggest species' },
    streak_master:  { name: 'Streak Master',  desc: '10 wins in a row' },
    encyclopedist:  { name: 'Encyclopedist',  desc: 'Reach 50 total wins' },
    bug_master:     { name: 'Bug Master',     desc: 'Win at least one species in every insect order' },
  },
  fr: {
    first_find:     { name: 'Première trouvaille', desc: 'Remporter une partie' },
    sharpshooter:   { name: 'Tireur d\'élite',     desc: 'Gagner en 3 essais ou moins' },
    endurance:      { name: 'Endurance',           desc: 'Gagner au 20ème essai' },
    pollinator:     { name: 'Pollinisateur',       desc: '5 espèces différentes d\'abeilles, guêpes ou papillons' },
    stargazer:      { name: 'Découvreur',          desc: 'Découvrir une espèce d\'un ordre rare' },
    globetrotter:   { name: 'Globe-trotteur',      desc: 'Gagner sur les 6 régions biogéographiques' },
    aquanaut:       { name: 'Aquanaute',           desc: 'Gagner sur une espèce aquatique' },
    apex_predator:  { name: 'Superprédateur',      desc: 'Gagner sur un carnivore ≥ 50 mm' },
    david_goliath:  { name: 'David et Goliath',    desc: 'Gagner sur une des 5 plus petites ET une des 5 plus grandes espèces' },
    streak_master:  { name: 'Série',               desc: '10 victoires d\'affilée' },
    encyclopedist:  { name: 'Encyclopédiste',      desc: 'Atteindre 50 victoires totales' },
    bug_master:     { name: 'Maître des insectes', desc: 'Au moins une victoire dans chaque ordre d\'insectes' },
  },
};

// LangContext exposes { lang, setLang, t } to all components.
const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (k) => k });

function useLang() { return useContext(LangContext); }

// Format a translation key with optional placeholders. `t('attempts_remaining', { n: 3 })`
// replaces {n} in the template.
function formatTemplate(template, vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));
}

function makeT(lang) {
  return (key, vars) => {
    const table = STRINGS[lang] || STRINGS.en;
    const raw = table[key] != null ? table[key] : (STRINGS.en[key] != null ? STRINGS.en[key] : key);
    return formatTemplate(raw, vars);
  };
}

// Provider wraps the whole game and persists the language preference in localStorage.
function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('bugdle:lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  });
  const setLang = useCallback((next) => {
    setLangState(next);
    try { localStorage.setItem('bugdle:lang', next); } catch (e) {}
  }, []);
  const t = useMemo(() => makeT(lang), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// Resolvers for species-specific localised content. The dataset stores `common`/`fact`
// in English and may optionally have `commonFr`/`factFr` for French. We fall back to
// the English text whenever the French version is missing.
function speciesCommon(s, lang) {
  if (!s) return '';
  return (lang === 'fr' && s.commonFr) ? s.commonFr : s.common;
}
function speciesFact(s, lang) {
  if (!s) return '';
  return (lang === 'fr' && s.factFr) ? s.factFr : s.fact;
}

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
const REGIONS_I18N = {
  en: { AFR: 'Afrotropical', NEO: 'Neotropical', NEA: 'Nearctic', PAL: 'Palearctic', IND: 'Indo-Malayan', OCE: 'Oceanian' },
  fr: { AFR: 'Afrotropicale', NEO: 'Néotropicale', NEA: 'Néarctique', PAL: 'Paléarctique', IND: 'Indo-Malaise', OCE: 'Océanienne' },
};
const HABITATS_I18N = {
  en: { SUB: 'Subterranean', TER: 'Terrestrial', AQU: 'Aquatic', AER: 'Aerial' },
  fr: { SUB: 'Souterrain', TER: 'Terrestre', AQU: 'Aquatique', AER: 'Aérien' },
};
const DIETS_I18N = {
  en: { HER: 'Herbivore', OMN: 'Omnivore', CAR: 'Carnivore' },
  fr: { HER: 'Herbivore', OMN: 'Omnivore', CAR: 'Carnivore' },
};

function formatRegions(arr, lang = 'en') {
  if (arr.length === 6) return lang === 'fr' ? 'Cosmopolite' : 'Cosmopolitan';
  const table = REGIONS_I18N[lang] || REGIONS_I18N.en;
  return arr.map((r) => table[r] || r).join(', ');
}
function formatHabitats(arr, lang = 'en') {
  const table = HABITATS_I18N[lang] || HABITATS_I18N.en;
  return arr.map((h) => table[h] || h).join(', ');
}
function formatHabitatsFull(record, lang = 'en') {
  const adult = record.habAdult || record.hab;
  const larva = record.habLarva || record.hab;
  const table = HABITATS_I18N[lang] || HABITATS_I18N.en;
  const adultStr = adult.map((h) => table[h] || h).join(', ');
  const larvaStr = larva.map((h) => table[h] || h).join(', ');
  if (adultStr === larvaStr) return adultStr;
  const a = lang === 'fr' ? 'Ad' : 'A';
  const l = lang === 'fr' ? 'Larve' : 'L';
  return `${a}: ${adultStr} · ${l}: ${larvaStr}`;
}
function formatDiets(arr, lang = 'en') {
  const table = DIETS_I18N[lang] || DIETS_I18N.en;
  return arr.map((d) => table[d] || d).join(', ');
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

// ===== CLOUD SYNC (optional, via a Cloudflare Worker proxy) =====
// Lets a player type a nickname (no password, no account) and sync their stats &
// badges across devices, plus power the community counter — WITHOUT ever exposing
// any database credentials in the client.
//
// The browser talks ONLY to your Cloudflare Worker, which holds the Upstash token
// server-side and exposes just four safe operations:
//   GET  ?op=get-stats&nick=NAME            → returns that nickname's stats JSON
//   POST ?op=set-stats&nick=NAME  (body=JSON) → overwrites that nickname's stats
//   GET  ?op=community&date=YYYY-MM-DD       → returns { wins, total }
//   POST ?op=community-win&date=YYYY-MM-DD&guesses=N → increments the day's counters
//
// To enable: deploy the Worker (see WORKER_DEPLOY.md) and paste its URL below.
// Leave it empty ('') to disable all cloud features gracefully.
const CLOUD_WORKER_URL = 'wild-dream-59f2.petiteddiemathers.workers.dev';   // e.g. 'https://bugdle-sync.YOUR-SUBDOMAIN.workers.dev'

function syncEnabled() {
  return !!CLOUD_WORKER_URL;
}

function normalizeNick(nick) {
  return (nick || '').trim().toLowerCase().replace(/\s+/g, '_').slice(0, 40);
}

// Low-level call to the Worker. Returns the parsed JSON body, or null on failure.
async function cloudCall(op, params, body) {
  if (!syncEnabled()) return null;
  try {
    const qs = new URLSearchParams({ op, ...(params || {}) }).toString();
    const url = `${CLOUD_WORKER_URL}?${qs}`;
    const opts = { method: body !== undefined ? 'POST' : 'GET' };
    if (body !== undefined) {
      opts.body = body;
      opts.headers = { 'Content-Type': 'application/json' };
    }
    const r = await fetch(url, opts);
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

// Fetch the cloud stats object for a nickname, or null if none exists yet.
async function pullCloudStats(nick) {
  const res = await cloudCall('get-stats', { nick: normalizeNick(nick) });
  if (!res || res.stats == null) return null;
  // Worker returns { stats: <object|null> }
  return typeof res.stats === 'string' ? safeParse(res.stats) : res.stats;
}

function safeParse(s) { try { return JSON.parse(s); } catch (e) { return null; } }

// Push a stats object to the cloud under the nickname (overwrites).
async function pushCloudStats(nick, stats) {
  if (!syncEnabled()) return false;
  const res = await cloudCall('set-stats', { nick: normalizeNick(nick) }, JSON.stringify(stats));
  return !!(res && res.ok);
}

// ===== COMMUNITY COUNTER (same Worker) =====
// Tracks, per daily puzzle, how many players solved it and the average guess count.

async function fetchCommunityStats(dateKey) {
  if (!syncEnabled()) return null;
  const res = await cloudCall('community', { date: dateKey });
  if (!res) return null;
  const w = parseInt(res.wins, 10) || 0;
  const t = parseInt(res.total, 10) || 0;
  return { wins: w, avgGuesses: w > 0 ? Math.round((t / w) * 10) / 10 : null };
}

// Submit a solved puzzle. Guards against double-counting via a localStorage flag
// so refreshing or replaying the same day doesn't inflate the counter.
async function submitCommunityWin(dateKey, guessCount) {
  if (!syncEnabled()) return;
  const storageKey = `bugdle:submitted:${dateKey}`;
  try { if (localStorage.getItem(storageKey)) return; } catch (e) {}
  await cloudCall('community-win', { date: dateKey, guesses: String(guessCount) }, '');
  try { localStorage.setItem(storageKey, '1'); } catch (e) {}
}

// Hook: fetch + periodically refresh the community stats for a given date.
function useCommunityStats(dateKey) {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (!syncEnabled() || !dateKey) return;
    let cancelled = false;
    const load = () => fetchCommunityStats(dateKey).then((s) => { if (!cancelled) setStats(s); });
    load();
    const id = setInterval(load, 5 * 60 * 1000); // refresh every 5 min
    return () => { cancelled = true; clearInterval(id); };
  }, [dateKey]);
  return stats;
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
.bd-icon-btn.bd-sync-active { background: var(--green-light); border-color: var(--green-dark); color: var(--ink); }
.bd-icon-btn.bd-sync-active:hover { background: var(--green-dark); color: #fff; }
.bd-sync-modal { max-width: 460px; }
.bd-sync-connected {
  display: flex; align-items: center; gap: 8px;
  font-family: 'Fraunces', serif; font-size: 15px; color: var(--ink);
  padding: 12px 14px; background: var(--cream-deep); border-radius: 10px;
  margin-bottom: 14px; flex-wrap: wrap;
}
.bd-sync-badge {
  font-size: 11px; font-style: italic; color: var(--sepia);
  padding: 2px 8px; border-radius: 10px; background: var(--paper);
  border: 1px solid var(--line);
}
.bd-sync-badge.ok { color: var(--green-dark); border-color: var(--green-dark); }
.bd-sync-badge.err { color: var(--red); border-color: var(--red); }
.bd-sync-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.bd-sync-input-row { display: flex; gap: 8px; align-items: stretch; }
.bd-sync-input {
  flex: 1; padding: 10px 12px; font-size: 14px;
  font-family: 'Fraunces', serif; color: var(--ink);
  background: var(--paper); border: 1px solid var(--line-strong);
  border-radius: 8px; outline: none;
}
.bd-sync-input:focus { border-color: var(--ochre); }
.bd-stats-modal { max-width: 480px; }
.bd-stats-scope {
  font-family: 'Fraunces', serif; font-size: 12.5px; font-style: italic;
  color: var(--sepia); margin-bottom: 16px;
}
.bd-stats-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
}
.bd-stats-cell {
  background: var(--cream-deep); border: 1px solid var(--line);
  border-radius: 10px; padding: 14px 8px; text-align: center;
}
.bd-stats-cell-icon { font-size: 18px; margin-bottom: 4px; }
.bd-stats-cell-value {
  font-family: 'Fraunces', serif; font-weight: 700; font-size: 22px;
  color: var(--ink); line-height: 1.1;
}
.bd-stats-cell-label {
  font-family: 'Fraunces', serif; font-size: 11px; color: var(--sepia);
  margin-top: 4px; line-height: 1.2;
}
@media (max-width: 480px) {
  .bd-stats-grid { grid-template-columns: repeat(2, 1fr); }
}
/* 5 headline stats: lay out as a flexible row that wraps nicely. */
.bd-stats-grid-5 { grid-template-columns: repeat(5, 1fr); }
@media (max-width: 560px) {
  .bd-stats-grid-5 { grid-template-columns: repeat(3, 1fr); }
}
/* Attempt-distribution bar chart */
.bd-dist { margin-top: 20px; }
.bd-dist-title {
  font-family: 'Fraunces', serif; font-weight: 600; font-size: 13px;
  color: var(--sepia-dark); margin-bottom: 12px;
  text-transform: uppercase; letter-spacing: 0.05em;
}
.bd-dist-chart {
  display: flex; align-items: flex-end; gap: 6px;
  height: 130px; padding-top: 14px;
}
.bd-dist-col {
  flex: 1; display: flex; flex-direction: column; align-items: center;
  height: 100%; justify-content: flex-end; gap: 6px;
}
.bd-dist-bar-wrap {
  width: 100%; height: 100%;
  display: flex; align-items: flex-end; justify-content: center;
}
.bd-dist-bar {
  width: 80%; min-height: 2px;
  background: linear-gradient(to top, var(--ochre), var(--copper));
  border-radius: 4px 4px 0 0;
  position: relative;
  display: flex; align-items: flex-start; justify-content: center;
  transition: height 0.3s ease;
}
.bd-dist-count {
  position: absolute; top: -16px;
  font-family: 'Fraunces', serif; font-size: 11px; font-weight: 700;
  color: var(--sepia-dark);
}
.bd-dist-label {
  font-family: 'Fraunces', serif; font-size: 10px; color: var(--sepia);
  white-space: nowrap;
}
.bd-whatsnew-modal { max-width: 440px; }
.bd-whatsnew-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: 'Fraunces', serif; font-weight: 700; font-size: 12px;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--copper); background: var(--cream-deep);
  padding: 4px 10px; border-radius: 20px; margin-bottom: 16px;
}
.bd-whatsnew-item {
  display: flex; gap: 14px; align-items: flex-start;
  padding: 12px 0; border-bottom: 1px dashed var(--line);
}
.bd-whatsnew-item:last-of-type { border-bottom: none; }
.bd-whatsnew-icon {
  flex-shrink: 0; width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: var(--cream-deep); border: 1px solid var(--line);
  border-radius: 12px; color: var(--copper);
}
.bd-whatsnew-item h3 {
  font-family: 'Fraunces', serif; font-weight: 600; font-size: 15px;
  color: var(--ink); margin: 2px 0 4px;
}
.bd-whatsnew-item p {
  font-family: 'Fraunces', serif; font-size: 13.5px; line-height: 1.45;
  color: var(--sepia-dark); margin: 0;
}
.bd-whatsnew-cta {
  width: 100%; justify-content: center; margin-top: 18px;
  padding: 11px 18px; font-size: 15px;
}
/* Language toggle: shows "EN" or "FR" in monospace-like style */
.bd-lang-btn .bd-lang-code {
  font-family: 'Fraunces', serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--sepia-dark);
}

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
.bd-community-stat { display: inline-flex; align-items: center; gap: 4px; cursor: default; }
.bd-community-avg { font-size: 11px; color: var(--sepia); font-weight: 500; letter-spacing: 0.02em; }

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
/* Clade rows in the Explorer are buttons so the user can click them to open the
   Wikipedia detail pane. We strip the default <button> chrome and keep the row
   looking exactly like the previous non-interactive span, with just a subtle
   hover hint that makes the affordance discoverable. */
.bd-exp-clade-btn {
  background: transparent;
  border: none;
  padding: 2px 6px;
  margin-left: -6px;
  cursor: pointer;
  font: inherit;
  text-align: left;
  border-radius: 6px;
  transition: background 0.15s;
}
.bd-exp-clade-btn:hover { background: var(--cream-deep); }
.bd-exp-clade-btn:hover .bd-exp-clade-name { color: var(--copper); }
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


/* === Clade Info Panel === */
.bd-clade-info {
  margin-bottom: 18px;
  padding: 0;
}
.bd-clade-info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px;
  cursor: pointer;
  user-select: none;
  gap: 8px;
}
.bd-clade-info-header:hover { background: var(--cream-deep); border-radius: 14px 14px 0 0; }
.bd-clade-info-header h3 {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Fraunces', serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--sepia-dark);
  margin: 0;
}
.bd-clade-info-current {
  font-style: italic;
  font-weight: 500;
  color: var(--ink);
}
.bd-clade-info-toggle {
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 4px 6px;
  cursor: pointer;
  color: var(--sepia-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.bd-clade-info-toggle:hover { background: var(--cream-deep); }
.bd-clade-info-body {
  padding: 0 18px 18px;
  border-top: 1px dashed var(--line);
}
.bd-clade-info-empty {
  font-family: 'Fraunces', serif;
  font-style: italic;
  color: var(--sepia);
  font-size: 13.5px;
  padding: 14px 0 4px;
}
.bd-clade-info-content {
  padding-top: 14px;
}
.bd-clade-info-name {
  font-family: 'Fraunces', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}
.bd-clade-info-img-wrap {
  width: 100%;
  background: var(--cream-deep);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  border: 1px solid var(--line);
  max-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bd-clade-info-img-wrap img {
  width: 100%;
  height: auto;
  max-height: 320px;
  object-fit: contain;
  display: block;
}
.bd-clade-info-extract {
  font-family: 'Fraunces', serif;
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink);
  margin: 0 0 10px;
}
.bd-clade-info-source {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 11.5px;
  color: var(--sepia);
}
.bd-clade-info-source a {
  color: var(--copper);
  text-decoration: none;
  border-bottom: 1px dotted var(--copper);
}
.bd-clade-info-source a:hover { color: var(--sepia-dark); }


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
  // Insect background ornaments disabled — leaving the warm paper texture only.
  // Restore the four DecoInsect lines below to bring them back.
  return null;
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
  const { lang, t } = useLang();
  // Distribution: use adjacency
  const distCmp = compareSet(guess.dist, target.dist, realmsAdjacent);
  // Habitat / Diet: no adjacency
  const habCmp = compareSet(guess.hab, target.hab);
  const dietCmp = compareSet(guess.diet, target.diet);
  const sizeCmp = compareSize(guess.size, target.size);

  return (
    <div className="bd-hints">
      <HintCard label={lang === 'fr' ? 'Répartition' : 'Distribution'} value={formatRegions(guess.dist, lang)} state={distCmp} />
      <HintCard label={lang === 'fr' ? 'Habitat' : 'Habitat'} value={formatHabitatsFull(guess, lang)} state={habCmp} />
      <HintCard label={lang === 'fr' ? 'Régime' : 'Diet'} value={formatDiets(guess.diet, lang)} state={dietCmp} />
      <HintCard label={lang === 'fr' ? 'Taille' : 'Size'} value={`${guess.size[0]}–${guess.size[1]} mm`} state={sizeCmp.state} arrow={sizeCmp.dir} />
    </div>
  );
}

// ===== LEGEND =====
function HintLegend() {
  const { t } = useLang();
  return (
    <div className="bd-legend">
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--green-dark)' }}></span>
        <span>{t('exact_match')}</span>
      </div>
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--green-light)' }}></span>
        <span>{t('partial_match')}</span>
      </div>
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--yellow)' }}></span>
        <span>{t('close_match')}</span>
      </div>
      <div className="bd-legend-item">
        <span className="bd-legend-swatch" style={{ background: 'var(--red)' }}></span>
        <span>{t('no_match')}</span>
      </div>
      <div className="bd-legend-item">
        <ChevronUp size={14} /><span>{t('larger')}</span>
        <ChevronDown size={14} style={{ marginLeft: 8 }} /><span>{t('smaller')}</span>
      </div>
    </div>
  );
}

// ===== AUTOCOMPLETE =====
function Autocomplete({ value, onChange, onSelect, disabled, alreadyGuessed }) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);

  const matches = useMemo(() => {
    if (!value || value.length < 1) return [];
    const q = value.toLowerCase();
    const guessedSet = new Set(alreadyGuessed);
    return SPECIES
      .filter((s) => !guessedSet.has(s.id))
      .filter((s) => {
        // Match against English common, French common (when available), and scientific name.
        if (s.common.toLowerCase().includes(q)) return true;
        if (s.commonFr && s.commonFr.toLowerCase().includes(q)) return true;
        if (s.scientificName.toLowerCase().includes(q)) return true;
        return false;
      })
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
    onChange(speciesCommon(s, lang));
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
        placeholder={t('type_to_search')}
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
              {speciesCommon(s, lang)}
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

function buildTree(guesses, target, gameOver, revealedRankIdx, mysteryRevealed, lang) {
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
      name: isWinning ? speciesCommon(target, lang) : speciesCommon(g, lang),
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
      name: mysteryRevealed ? speciesCommon(target, lang) : '?',
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

function TaxoTree({ guesses, target, gameOver, won, revealedRankIdx, onGuessClick, activeGuessId, mysteryRevealed, onCladeClick }) {
  const { lang, t } = useLang();
  const tree = useMemo(
    () => buildTree(guesses, target, gameOver, revealedRankIdx, mysteryRevealed, lang),
    [guesses, target, gameOver, revealedRankIdx, mysteryRevealed, lang]
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

          // Internal clade nodes are clickable when an onCladeClick handler is
          // provided. We expose the clade name, NOT the rank (the Wikipedia hook
          // will look up the article by name).
          const isInternalClade = !isRoot && !isGuess && !isMystery && n.name && n.rank !== 'GuessLeaf';
          const isClickable = isGuess || (isInternalClade && !!onCladeClick);
          const radius = isRoot ? 10 : (isMystery ? 11 : (isGuess ? 7 : 6));
          const showLabel = !isGuess && !isMystery;  // internals always labelled now
          return (
            <g
              key={'node-' + i}
              className="bd-tree-node-group"
              onClick={() => {
                if (isGuess) onGuessClick(n.guessId);
                else if (isInternalClade && onCladeClick) onCladeClick(n.name);
              }}
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
                  {n.depth === 0 ? rankLabelFor('Class', lang) : rankLabelFor(n.rank, lang)}
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
  const { lang } = useLang();
  const localized = ACH_I18N[lang] || ACH_I18N.en;
  return (
    <div className="bd-ach-grid">
      {ACHIEVEMENTS.map((a) => {
        const got = unlocked.includes(a.id);
        const isCustomSvg = typeof a.icon !== 'string';
        const loc = localized[a.id] || ACH_I18N.en[a.id] || { name: a.id, desc: '' };
        return (
          <div key={a.id} className={'bd-ach ' + (got ? 'unlocked' : '')} title={`${loc.name} — ${loc.desc}`}>
            <span className={'bd-ach-icon' + (isCustomSvg ? ' bd-ach-icon-lg' : '')}>{a.icon}</span>
            <div className="bd-ach-name">{loc.name}</div>
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
  const { lang, t } = useLang();
  const { imgUrl, imgLoading, setImgUrl, attribution } = useSpeciesImage(species, true);
  return (
    <figure className="bd-end-img-figure">
      <div className="bd-end-img-wrap">
        {imgLoading ? (
          <div className="bd-end-placeholder">{t('loading_image')}</div>
        ) : imgUrl ? (
          <img src={imgUrl} alt={speciesCommon(species, lang)} onError={() => setImgUrl(null)} />
        ) : (
          <div className="bd-end-placeholder">
            <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
            <div>{t('image_unavailable')}</div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
              {t('image_blocked_hint')}
            </div>
            <a
              href={`https://${lang === 'fr' ? 'fr' : 'en'}.wikipedia.org/wiki/${encodeURIComponent(species.scientificName.replace(/ /g, '_'))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 10, color: 'var(--copper)', textDecoration: 'underline', fontSize: 13 }}
            >
              {lang === 'fr'
                ? <>Ouvrir <span className="bd-sci">{species.scientificName}</span> sur Wikipédia ↗</>
                : <>Open <span className="bd-sci">{species.scientificName}</span> on Wikipedia ↗</>}
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

// ===== CLADE INFO (Wikipedia) =====
// Fetches the Wikipedia summary (image + first paragraph) for a clade name.
// Uses the chosen language (en/fr) and falls back to English if the FR page is
// missing. The fetched data is cached in memory across the session to avoid
// hitting the network for the same clade twice.
const _wikiCache = new Map(); // key = `${lang}:${clade}`, value = { title, extract, imgUrl, pageUrl } | { notFound: true }

async function fetchWikipediaSummary(clade, lang) {
  if (!clade) return null;
  const cacheKey = `${lang}:${clade}`;
  if (_wikiCache.has(cacheKey)) return _wikiCache.get(cacheKey);

  // Keywords that indicate the Wikipedia article actually concerns insects,
  // arthropods, or taxonomy. At least ONE must appear in the extract (case-
  // insensitive). This guards against disambiguation redirects that land on
  // unrelated pages (e.g. "Titanus" → Roman mythology, a singer, etc.).
  const ENTOMO_KEYWORDS = [
    // taxonomy
    'insect','beetle','moth','butterfly','fly','ant','bee','wasp','bug','cricket',
    'grasshopper','mantis','termite','dragonfly','damselfly','flea','louse','tick',
    'spider','mite','arachnid','arthropod','larva','larvae','pupa','chrysalis',
    'nymph','imago','exoskeleton','metamorphosis','instar',
    // systematic terms
    'family','genus','species','order','subfamily','tribe','clade','taxon',
    'entomol','lepidoptera','coleoptera','diptera','hymenoptera','hemiptera',
    'orthoptera','odonata','blattodea','mantodea','phasmida','neuroptera',
    'trichoptera','ephemeroptera','plecoptera','dermaptera','strepsiptera',
    // french equivalents
    'insecte','coléoptère','papillon','mouche','fourmi','abeille','guêpe',
    'punaise','grillon','sauterelle','mante','termite','libellule','puce',
    'pou','arthropode','larve','nymphe','chrysalide','métamorphose',
    'espèce','genre','famille','ordre','clade','entomol',
  ];

  const isEntomological = (extract) => {
    if (!extract) return false;
    const lower = extract.toLowerCase();
    return ENTOMO_KEYWORDS.some((kw) => lower.includes(kw));
  };

  // Per-language blocklist of clades whose Wikipedia article is wrong/mismatched
  // in that language (the title resolves to an unrelated or incorrect page). For
  // these we force "no information available" rather than show misleading content.
  // The clade is passed to tryFetch as `title`, so we match on title directly.
  const WIKI_BLOCKLIST = {
    fr: new Set(['Gomphus', 'Fulgora', 'Titanus', 'Blatta', 'Taraxippus', 'Oestrus',
                 'Galleria', 'Cynthia', 'Tibicen', 'Manticora', 'Mantis', 'Saga']),
    en: new Set(['Harmonia', 'Photinus', 'Oestrus', 'Saturnia', 'Cynthia', 'Tibicen',
                 'Ephemera', 'Mantis']),
  };

  const tryFetch = async (title, langCode) => {
    try {
      // Skip blocklisted clades for this language entirely.
      if (WIKI_BLOCKLIST[langCode] && WIKI_BLOCKLIST[langCode].has(title)) return null;
      const url = `https://${langCode}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const r = await fetch(url);
      if (!r.ok) return null;
      const data = await r.json();
      if (data.type === 'disambiguation') return null;
      if (!data.extract || data.extract.length < 20) return null;
      // Reject articles that don't mention entomological context at all.
      if (!isEntomological(data.extract)) return null;
      return {
        title: data.title || title,
        extract: data.extract,
        imgUrl: (data.originalimage && data.originalimage.source)
                || (data.thumbnail && data.thumbnail.source)
                || null,
        pageUrl: (data.content_urls && data.content_urls.desktop && data.content_urls.desktop.page)
                 || `https://${langCode}.wikipedia.org/wiki/${encodeURIComponent(title)}`,
      };
    } catch (e) { return null; }
  };

  // Try the requested language first, then fall back to English for FR users when
  // the French Wikipedia article doesn't exist (very common for tribes / subfamilies).
  let result = await tryFetch(clade, lang);
  if (!result && lang !== 'en') result = await tryFetch(clade, 'en');
  const final = result || { notFound: true };
  _wikiCache.set(cacheKey, final);
  return final;
}

function useWikipediaSummary(clade, lang) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!clade) { setData(null); setLoading(false); return; }
    let cancelled = false;
    setLoading(true);
    setData(null);
    fetchWikipediaSummary(clade, lang).then((d) => {
      if (cancelled) return;
      setData(d);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [clade, lang]);
  return { data, loading };
}

// ===== CLADE INFO PANEL =====
// Collapsible panel above "Your guesses". Shows the Wikipedia summary for the
// currently selected clade. The clade defaults to the deepest shared clade between
// the player's guesses and the target (the "LCA"). Clicking a clade in the game
// tree updates the selection. A new guess resets the selection to the latest LCA.
function CladeInfoPanel({ clade, expanded, onToggle }) {
  const { lang, t } = useLang();
  const { data, loading } = useWikipediaSummary(expanded ? clade : null, lang);

  return (
    <div className="bd-section bd-clade-info">
      <div className="bd-clade-info-header" onClick={onToggle} role="button" tabIndex={0}>
        <h3 style={{ margin: 0 }}>
          <Sparkles size={14} /> {t('clade_info_title')}
          {clade && <span className="bd-clade-info-current"> · {clade}</span>}
        </h3>
        <button
          className="bd-clade-info-toggle"
          aria-label={expanded ? t('clade_info_toggle_hide') : t('clade_info_toggle_show')}
          title={expanded ? t('clade_info_toggle_hide') : t('clade_info_toggle_show')}
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
      {expanded && (
        <div className="bd-clade-info-body">
          {!clade ? (
            <div className="bd-clade-info-empty">{t('clade_info_empty')}</div>
          ) : loading ? (
            <div className="bd-clade-info-empty">{t('clade_info_loading')}</div>
          ) : !data || data.notFound ? (
            <div className="bd-clade-info-content">
              <div className="bd-clade-info-name">{clade}</div>
              <div className="bd-clade-info-empty">{t('clade_info_no_data')}</div>
            </div>
          ) : (
            <div className="bd-clade-info-content">
              <div className="bd-clade-info-name">{data.title}</div>
              {data.imgUrl && (
                <div className="bd-clade-info-img-wrap">
                  <img src={data.imgUrl} alt={data.title} loading="lazy" />
                </div>
              )}
              <p className="bd-clade-info-extract">{data.extract}</p>
              <div className="bd-clade-info-source">
                {t('clade_info_source')} —{' '}
                <a href={data.pageUrl} target="_blank" rel="noopener noreferrer">{data.pageUrl.replace(/^https?:\/\//, '')}</a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== END SCREEN =====
function EndScreen({ won, target, guesses, onClose, onNewGame, totalStats, revealed, onReveal, isTraining }) {
  const { lang, t } = useLang();
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
          {won ? '🎉 ' + t('you_won') : t('you_lost')}
        </div>

        {/* Defeat + not revealed yet → show only attempt count and Reveal button */}
        {!revealed && !won && (
          <>
            <div style={{ fontFamily: 'Fraunces, serif', color: 'var(--sepia-dark)', fontSize: 15, marginBottom: 20, lineHeight: 1.5 }}>
              {lang === 'fr'
                ? `Vous avez utilisé toutes vos ${MAX_ATTEMPTS} tentatives sans trouver l'espèce mystère.`
                : `You used all ${MAX_ATTEMPTS} attempts without finding the mystery species.`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="bd-btn accent"
                style={{ padding: '12px 18px', fontSize: 15, justifyContent: 'center' }}
                onClick={onReveal}
              >
                <Sparkles size={16} /> {lang === 'fr' ? 'Révéler la réponse' : 'Reveal the answer'}
              </button>
              <button
                className="bd-btn"
                style={{ padding: '12px 18px', fontSize: 15, justifyContent: 'center' }}
                onClick={onNewGame}
              >
                <RotateCcw size={16} />
                {lang === 'fr'
                  ? (isTraining ? " Nouvelle partie d'entraînement (sans révéler)" : " Passer en mode entraînement (sans révéler)")
                  : (isTraining ? " New practice round (don't reveal)" : " Practice mode (don't reveal)")}
              </button>
            </div>
            <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 12, color: 'var(--sepia)', textAlign: 'center', marginTop: 14 }}>
              {lang === 'fr'
                ? `Stats : ${guesses.length} propositions · Victoires totales : ${totalStats.wins} · Série réinitialisée.`
                : `Stats: ${guesses.length} guesses · Total wins: ${totalStats.wins} · Streak reset.`}
            </div>
          </>
        )}

        {/* Win OR defeat-then-revealed → show full answer */}
        {revealed && (
          <>
            <div className="bd-end-sub">
              {speciesCommon(target, lang)}{' '}
              <span className="bd-sci" style={{ fontSize: 16 }}>({target.scientificName})</span>
            </div>
            <SpeciesImageBlock species={target} />
            <div className="bd-end-fact">
              <Lightbulb size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
              {speciesFact(target, lang)}
            </div>

            {/* Full taxonomy */}
            <div className="bd-end-taxo">
              <div className="bd-end-taxo-title">{t('full_taxonomy')}</div>
              {taxoRows.map(([rank, name]) => (
                <div key={rank} className="bd-end-taxo-row">
                  <span className="bd-end-taxo-rank">{rankLabelFor(rank, lang)}</span>
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
                <div className="bd-end-stat-label">{t('guesses')}</div>
              </div>
              <div className="bd-end-stat">
                <div className="bd-end-stat-num">{totalStats.wins}</div>
                <div className="bd-end-stat-label">{t('total_wins')}</div>
              </div>
              <div className="bd-end-stat">
                <div className="bd-end-stat-num">{totalStats.streak}</div>
                <div className="bd-end-stat-label">{t('streak')}</div>
              </div>
            </div>
            <button className="bd-btn primary" style={{ width: '100%', padding: '12px 18px', fontSize: 15, justifyContent: 'center' }} onClick={onNewGame}>
              <RotateCcw size={16} />
              {lang === 'fr'
                ? (isTraining ? " Nouvelle partie d'entraînement" : " Mode entraînement (revenez demain pour le prochain défi !)")
                : (isTraining ? ' New practice round' : ' Practice mode (come back tomorrow for the next daily!)')}
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
function ExplorerNode({ node, depth, expanded, onToggle, onSelectSpecies, onSelectClade, highlightId }) {
  const { lang, t } = useLang();
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
            title={(lang === 'fr' ? 'Voir les détails de ' : 'Show details for ') + speciesCommon(node.species, lang)}
          >
            <span className="bd-exp-species-common">{speciesCommon(node.species, lang)}</span>
            <span className="bd-exp-species-sci">{node.species.scientificName}</span>
          </button>
        ) : (
          <button
            type="button"
            className="bd-exp-clade bd-exp-clade-btn"
            onClick={() => onSelectClade && onSelectClade(node)}
            title={lang === 'fr' ? `Voir les détails de ${node.name}` : `Show details for ${node.name}`}
          >
            <span className="bd-exp-clade-rank">{rankLabelFor(node.rank, lang)}</span>
            <span
              className="bd-exp-clade-name"
              style={{ fontStyle: (node.rank === 'Genus') ? 'italic' : 'normal' }}
            >
              {node.name}
            </span>
            {hasChildren && (
              <span className="bd-exp-clade-count">{countLeaves(node)} {t('species_count_suffix')}</span>
            )}
          </button>
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
              onSelectClade={onSelectClade}
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
  const { lang, t } = useLang();
  if (!species) return null;
  const taxoRows = buildSpeciesTaxoRows(species);
  return (
    <div className="bd-exp-detail">
      <button className="bd-modal-close" onClick={onClose} title={t('close')}><X size={18} /></button>
      <div className="bd-end-title" style={{ marginBottom: 6, fontSize: 22 }}>{speciesCommon(species, lang)}</div>
      <div className="bd-end-sub" style={{ marginBottom: 12 }}>
        <span className="bd-sci">{species.scientificName}</span>
      </div>
      <SpeciesImageBlock species={species} />
      {species.fact && (
        <div className="bd-end-fact">
          <Lightbulb size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: -2 }} />
          {speciesFact(species, lang)}
        </div>
      )}
      <div className="bd-end-taxo">
        <div className="bd-end-taxo-title">{t('full_taxonomy')}</div>
        {taxoRows.map(([rank, name]) => (
          <div key={rank} className="bd-end-taxo-row">
            <span className="bd-end-taxo-rank">{rankLabelFor(rank, lang)}</span>
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

// ----- Detail pane for one clade (uses the same Wikipedia source as the in-game
// CladeInfoPanel, rendered in the Explorer's right side. Shares the look of
// ExplorerDetail for visual consistency.) -----
function CladeDetail({ node, onClose }) {
  const { lang, t } = useLang();
  const { data, loading } = useWikipediaSummary(node ? node.name : null, lang);
  if (!node) return null;
  return (
    <div className="bd-exp-detail">
      <button className="bd-modal-close" onClick={onClose} title={t('close')}><X size={18} /></button>
      <div className="bd-end-sub" style={{ marginBottom: 6 }}>
        <span style={{
          fontFamily: 'Fraunces, serif',
          fontWeight: 600,
          fontSize: 13,
          color: 'var(--sepia)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>{rankLabelFor(node.rank, lang)}</span>
      </div>
      <div className="bd-end-title" style={{ marginBottom: 14, fontSize: 22 }}>{node.name}</div>
      {loading ? (
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: 'var(--sepia)', padding: 18 }}>
          {t('clade_info_loading')}
        </div>
      ) : !data || data.notFound ? (
        <div style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: 'var(--sepia)', padding: 4 }}>
          {t('clade_info_no_data')}
        </div>
      ) : (
        <>
          {data.imgUrl && (
            <div className="bd-clade-info-img-wrap" style={{ marginBottom: 14 }}>
              <img src={data.imgUrl} alt={data.title} loading="lazy" />
            </div>
          )}
          <p className="bd-clade-info-extract">{data.extract}</p>
          <div className="bd-clade-info-source">
            {t('clade_info_source')} —{' '}
            <a href={data.pageUrl} target="_blank" rel="noopener noreferrer">{data.pageUrl.replace(/^https?:\/\//, '')}</a>
          </div>
        </>
      )}
    </div>
  );
}

// ----- Main Explorer view (replaces game screen) -----
function Explorer({ onBack }) {
  const { lang, t } = useLang();
  const tree = useMemo(() => buildExplorerTree(SPECIES), []);
  const allNodes = useMemo(() => flattenNodes(tree), [tree]);
  const [expanded, setExpanded] = useState(() => new Set(['Insecta']));
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [selectedClade, setSelectedClade] = useState(null);
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
      // Build the full list of strings to match against. For species leaves we
      // include the English common name, the French common name (when set) AND
      // the scientific name — so "fourmi" (FR) and "ant" (EN) both find the same
      // leaves. For internal clade nodes we only match the clade name itself
      // (always stored in English / scientific spelling).
      const candidates = [];
      if (n.species) {
        if (n.species.common) candidates.push(n.species.common.toLowerCase());
        if (n.species.commonFr) candidates.push(n.species.commonFr.toLowerCase());
        if (n.species.scientificName) candidates.push(n.species.scientificName.toLowerCase());
      } else {
        candidates.push(n.name.toLowerCase());
      }
      // Prefix matches win priority, substring matches come after.
      let bucket = null;
      for (const c of candidates) {
        if (c.startsWith(q)) { bucket = 'prefix'; break; }
        if (c.includes(q))   { bucket = 'inner'; }
      }
      if (bucket === 'prefix') prefix.push(n);
      else if (bucket === 'inner') inner.push(n);
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
    // If it's a species, open the species detail pane; otherwise open the clade
    // detail pane (Wikipedia summary) so search-then-detail works for both kinds.
    if (node.species) {
      setSelectedSpecies(node.species);
      setSelectedClade(null);
    } else {
      setSelectedClade(node);
      setSelectedSpecies(null);
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
            <TreePine size={11} /> {lang === 'fr' ? 'Explorer' : 'Explore'}
          </div>
        </div>
        <div className="bd-actions">
          <button className="bd-btn" onClick={onBack}>
            <ArrowLeft size={14} /> {t('back_to_game')}
          </button>
        </div>
      </header>

      <div className="bd-exp-layout">
        {/* Left: tree */}
        <div className="bd-section bd-exp-tree-wrap">
          <h3 className="bd-section-title"><TreePine size={14} /> {t('tree_of_life')}</h3>
          <div className="bd-exp-search">
            <Search size={14} style={{ color: 'var(--sepia)' }} />
            <input
              type="text"
              placeholder={t('search_clade')}
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
                        <span className="bd-exp-sugg-common">{speciesCommon(n.species, lang)}</span>
                        <span className="bd-exp-sugg-sci">{n.species.scientificName}</span>
                      </>
                    ) : (
                      <>
                        <span className="bd-exp-sugg-rank">{rankLabelFor(n.rank, lang)}</span>
                        <span
                          className="bd-exp-sugg-name"
                          style={{ fontStyle: (n.rank === 'Genus') ? 'italic' : 'normal' }}
                        >
                          {n.name}
                        </span>
                        <span className="bd-exp-sugg-count">{countLeaves(n)} {t('species_count_suffix')}</span>
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
              onSelectSpecies={(s) => { setSelectedSpecies(s); setSelectedClade(null); }}
              onSelectClade={(n) => { setSelectedClade(n); setSelectedSpecies(null); }}
              highlightId={highlightId}
            />
          </div>

          <div className="bd-exp-hint">
            <Lightbulb size={12} style={{ verticalAlign: -2, marginRight: 4 }} />
            {lang === 'fr' ? (
              <>Touchez un <strong>+</strong> pour déplier un clade. Cliquez sur le nom d'un clade pour voir sa fiche Wikipédia, ou sur une espèce (en italique) pour voir sa photo et sa taxonomie complète.</>
            ) : (
              <>Tap a <strong>+</strong> to expand a clade. Click any clade name to see its Wikipedia summary, or any species (italic) to see its photo and full taxonomy.</>
            )}
          </div>
        </div>

        {/* Right: detail (species OR clade) */}
        {selectedSpecies && (
          <ExplorerDetail
            species={selectedSpecies}
            onClose={() => setSelectedSpecies(null)}
          />
        )}
        {selectedClade && !selectedSpecies && (
          <CladeDetail
            node={selectedClade}
            onClose={() => setSelectedClade(null)}
          />
        )}
        {!selectedSpecies && !selectedClade && (
          <div className="bd-exp-detail-placeholder">
            <TreePine size={36} strokeWidth={1.2} />
            <div style={{ marginTop: 12 }}>{t('select_species_hint')}</div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.7, fontStyle: 'italic' }}>
              {t('species_waiting', { n: 365, k: tree.children.size })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


// ===== WHAT'S NEW MODAL (temporary announcement) =====
// Shown to each user for a limited window after they first load the updated site,
// then dismissed permanently (per user). Two ways to bound the window:
//   - WHATS_NEW_DAYS: how many days after a user's FIRST sighting to keep offering
//     it (per-device, robust to whenever you actually deploy).
//   - WHATS_NEW_HARD_EXPIRY: an absolute backstop date after which it never shows
//     for anyone (so you can leave the code in and forget it).
// Bump WHATS_NEW_ID to broadcast a brand-new announcement later.
const WHATS_NEW_ID = 'sync_and_stats_2026_06';   // change this for a new announcement
const WHATS_NEW_DAYS = 5;                          // show for 5 days after first sight
const WHATS_NEW_HARD_EXPIRY = '2026-12-31';        // absolute backstop (YYYY-MM-DD UTC)

function WhatsNewModal({ onClose }) {
  const { t } = useLang();
  return (
    <div className="bd-modal-overlay" onClick={onClose}>
      <div className="bd-modal bd-whatsnew-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bd-modal-close" onClick={onClose}><X size={18} /></button>
        <div className="bd-whatsnew-badge"><Sparkles size={13} /> {t('whatsnew_title')}</div>
        <div className="bd-whatsnew-item">
          <div className="bd-whatsnew-icon"><Cloud size={22} /></div>
          <div>
            <h3>{t('whatsnew_sync_h')}</h3>
            <p>{t('whatsnew_sync_p')}</p>
          </div>
        </div>
        <div className="bd-whatsnew-item">
          <div className="bd-whatsnew-icon"><BarChart3 size={22} /></div>
          <div>
            <h3>{t('whatsnew_stats_h')}</h3>
            <p>{t('whatsnew_stats_p')}</p>
          </div>
        </div>
        <button className="bd-btn accent bd-whatsnew-cta" onClick={onClose}>{t('whatsnew_cta')}</button>
      </div>
    </div>
  );
}

// ===== PERSONAL STATS MODAL =====
function PersonalStatsModal({ stats, nickname, onClose }) {
  const { t, lang } = useLang();
  const wins = stats.wins || 0;
  const played = wins + (stats.losses || 0);
  const winRate = played > 0 ? Math.round((wins / played) * 100) : 0;
  // Average uses winsCounted (only wins recorded since guess-tracking was added),
  // NOT total wins — otherwise pre-update wins inflate the denominator and skew the
  // average downward.
  const counted = stats.winsCounted || 0;
  const avgGuesses = counted > 0 ? Math.round(((stats.totalGuesses || 0) / counted) * 10) / 10 : null;

  // Five headline stats requested: wins, win %, current streak, best streak, avg attempts.
  const cells = [
    { label: t('mystats_wins'), value: wins, icon: '🏆' },
    { label: t('mystats_winrate'), value: played > 0 ? `${winRate}%` : '—', icon: '％' },
    { label: t('mystats_streak'), value: stats.streak || 0, icon: '🔥' },
    { label: t('mystats_beststreak'), value: stats.bestStreak || 0, icon: '⭐' },
    { label: t('mystats_avg'), value: avgGuesses != null ? avgGuesses : '—', icon: '🎯' },
  ];

  // Build the distribution in blocks of 2 attempts: 1-2, 3-4, ... up to MAX_ATTEMPTS.
  // Each histogram key is the effective attempt count at which a win happened.
  const hist = stats.guessHistogram || {};
  const buckets = [];
  for (let lo = 1; lo <= MAX_ATTEMPTS; lo += 2) {
    const hi = lo + 1;
    let count = 0;
    for (let n = lo; n <= hi; n++) count += hist[String(n)] || 0;
    buckets.push({ label: `${lo}\u2013${hi}`, count });
  }
  const maxCount = Math.max(1, ...buckets.map((b) => b.count));

  return (
    <div className="bd-modal-overlay" onClick={onClose}>
      <div className="bd-modal bd-stats-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bd-modal-close" onClick={onClose}><X size={18} /></button>
        <h2><BarChart3 size={18} style={{ verticalAlign: -3, marginRight: 6 }} />{t('mystats_title')}</h2>
        <div className="bd-stats-scope">
          {nickname
            ? <><Cloud size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{t('mystats_synced_as', { name: nickname })}</>
            : <><User size={13} style={{ verticalAlign: -2, marginRight: 4 }} />{t('mystats_local')}</>}
        </div>
        {played === 0 ? (
          <p style={{ fontFamily: 'Fraunces, serif', fontStyle: 'italic', color: 'var(--sepia)', fontSize: 14, marginTop: 8 }}>
            {t('mystats_empty')}
          </p>
        ) : (
          <>
            <div className="bd-stats-grid bd-stats-grid-5">
              {cells.map((c, i) => (
                <div key={i} className="bd-stats-cell">
                  <div className="bd-stats-cell-icon">{c.icon}</div>
                  <div className="bd-stats-cell-value">{c.value}</div>
                  <div className="bd-stats-cell-label">{c.label}</div>
                </div>
              ))}
            </div>

            {counted > 0 && (
              <div className="bd-dist">
                <div className="bd-dist-title">{t('mystats_distribution')}</div>
                <div className="bd-dist-chart">
                  {buckets.map((b, i) => (
                    <div key={i} className="bd-dist-col">
                      <div className="bd-dist-bar-wrap">
                        <div
                          className="bd-dist-bar"
                          style={{ height: `${b.count === 0 ? 2 : Math.round((b.count / maxCount) * 100)}%` }}
                          title={`${b.label}: ${b.count}`}
                        >
                          {b.count > 0 && <span className="bd-dist-count">{b.count}</span>}
                        </div>
                      </div>
                      <div className="bd-dist-label">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ===== SYNC MODAL =====
function SyncModal({ nickname, syncStatus, onConnect, onDisconnect, onSyncNow, onClose }) {
  const { t } = useLang();
  const [draft, setDraft] = useState(nickname || '');
  const busy = syncStatus === 'syncing';

  return (
    <div className="bd-modal-overlay" onClick={onClose}>
      <div className="bd-modal bd-sync-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bd-modal-close" onClick={onClose}><X size={18} /></button>
        <h2><Cloud size={18} style={{ verticalAlign: -3, marginRight: 6 }} />{t('sync_title')}</h2>

        {!syncEnabled() ? (
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 14, color: 'var(--sepia-dark)' }}>
            {t('sync_disabled')}
          </p>
        ) : nickname ? (
          // Connected state
          <div>
            <div className="bd-sync-connected">
              <User size={16} />
              <span>{t('sync_connected_as', { name: nickname })}</span>
              {syncStatus === 'synced' && <span className="bd-sync-badge ok">{t('sync_synced')}</span>}
              {syncStatus === 'syncing' && <span className="bd-sync-badge">{t('sync_syncing')}</span>}
              {syncStatus === 'error' && <span className="bd-sync-badge err">{t('sync_error')}</span>}
            </div>
            <div className="bd-sync-actions">
              <button className="bd-btn" onClick={onSyncNow} disabled={busy}>
                <RotateCcw size={14} /> {t('sync_now')}
              </button>
              <button
                className="bd-btn"
                onClick={() => { if (confirm(t('sync_clear_confirm'))) onDisconnect(); }}
              >
                {t('sync_disconnect')}
              </button>
            </div>
          </div>
        ) : (
          // Not connected — enter a nickname
          <div>
            <p style={{ fontFamily: 'Fraunces, serif', fontSize: 13.5, lineHeight: 1.5, color: 'var(--sepia-dark)', marginBottom: 8 }}>
              {t('sync_intro')}
            </p>
            <p style={{ fontFamily: 'Fraunces, serif', fontSize: 12.5, fontStyle: 'italic', color: 'var(--sepia)', marginBottom: 14 }}>
              {t('sync_first_time')}
            </p>
            <div className="bd-sync-input-row">
              <input
                className="bd-sync-input"
                type="text"
                value={draft}
                maxLength={40}
                placeholder={t('sync_placeholder')}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && draft.trim()) onConnect(draft); }}
                autoFocus
              />
              <button
                className="bd-btn accent"
                onClick={() => onConnect(draft)}
                disabled={!draft.trim() || busy}
              >
                {busy ? t('sync_syncing') : t('sync_connect')}
              </button>
            </div>
            {syncStatus === 'error' && (
              <div className="bd-sync-badge err" style={{ marginTop: 10 }}>{t('sync_error')}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// ===== MAIN GAME =====
function Bugdle() {
  const { lang, setLang, t } = useLang();
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
  // Clade info panel: persists open/closed across sessions; user-selected clade is
  // session-only (reset on each new guess, see effect further down).
  const [cladeInfoOpen, setCladeInfoOpen] = useState(() => {
    try {
      return localStorage.getItem('bugdle:cladeInfoOpen') === '1';
    } catch (e) { return false; }
  });
  const [selectedClade, setSelectedClade] = useState(null);
  const toggleCladeInfo = useCallback(() => {
    setCladeInfoOpen((v) => {
      const next = !v;
      try { localStorage.setItem('bugdle:cladeInfoOpen', next ? '1' : '0'); } catch (e) {}
      return next;
    });
  }, []);
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
    totalGuesses: 0,          // cumulative guesses (incl. hint/fact costs) across wins
    winsCounted: 0,            // number of wins that contributed to totalGuesses (for average)
    guessHistogram: {},        // map of guessCount → number of wins at that count
    achievements: [],
    achievementProgress: {
      pollinatorGenera: [],
      globetrotterRegions: [],
      bugMasterOrders: [],
      davidGoliathSides: [],
    },
  });
  const [statsLoaded, setStatsLoaded] = useState(false);
  // Cloud sync: nickname (persisted) + transient sync status for the UI.
  const [nickname, setNickname] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle | syncing | synced | error
  const [showSync, setShowSync] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showWhatsNew, setShowWhatsNew] = useState(false);

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

      // Cloud sync: if a nickname was saved, adopt the cloud stats for this device
      // (cloud is the source of truth on load, per the sync design).
      const savedNick = await loadStore('bugdle_nickname', null);
      if (savedNick) {
        setNickname(savedNick);
        if (syncEnabled()) {
          setSyncStatus('syncing');
          const cloud = await pullCloudStats(savedNick);
          if (cloud) {
            setStats((prev) => ({
              ...prev, ...cloud,
              achievementProgress: { ...prev.achievementProgress, ...(cloud.achievementProgress || {}) }
            }));
            setSyncStatus('synced');
          } else {
            // No cloud record yet (e.g. created offline) — push what we have.
            setSyncStatus('idle');
          }
        }
      }
      setStatsLoaded(true);
    })();
  }, []);

  // Show the "what's new" announcement for a limited window. The window starts the
  // first time THIS device sees the new version (stored as a date), runs for
  // WHATS_NEW_DAYS, and is also capped by an absolute backstop date. Once the user
  // dismisses it, it never shows again on this device.
  useEffect(() => {
    try {
      const today = utcDateKey(); // 'YYYY-MM-DD'
      if (today > WHATS_NEW_HARD_EXPIRY) return; // absolute backstop reached
      const dismissed = localStorage.getItem(`bugdle:whatsnew:${WHATS_NEW_ID}:done`);
      if (dismissed) return;
      // Record first-sight date if not already set
      const firstKey = `bugdle:whatsnew:${WHATS_NEW_ID}:first`;
      let firstSeen = localStorage.getItem(firstKey);
      if (!firstSeen) {
        firstSeen = today;
        localStorage.setItem(firstKey, firstSeen);
      }
      // Compute window end = firstSeen + WHATS_NEW_DAYS
      const end = new Date(firstSeen + 'T00:00:00Z');
      end.setUTCDate(end.getUTCDate() + WHATS_NEW_DAYS);
      const endKey = utcDateKey(end);
      if (today <= endKey) setShowWhatsNew(true);
    } catch (e) { /* localStorage unavailable — just skip */ }
  }, []);

  const dismissWhatsNew = useCallback(() => {
    setShowWhatsNew(false);
    try { localStorage.setItem(`bugdle:whatsnew:${WHATS_NEW_ID}:done`, '1'); } catch (e) {}
  }, []);

  // Save stats
  useEffect(() => { if (statsLoaded) saveStore('bugdle_stats', stats); }, [stats, statsLoaded]);
  useEffect(() => { if (statsLoaded) saveStore('bugdle_sound', soundOn); }, [soundOn, statsLoaded]);

  // Push stats to the cloud whenever they change and a nickname is connected.
  // This covers wins, losses, and achievement unlocks automatically. We skip the
  // very first run (statsLoaded guard) so loading cloud stats doesn't immediately
  // echo them back.
  const didInitialSyncPush = useRef(false);
  useEffect(() => {
    if (!statsLoaded || !nickname || !syncEnabled()) return;
    // Skip the first effect run right after connecting/loading to avoid a redundant
    // round-trip; subsequent stat changes push normally.
    if (!didInitialSyncPush.current) { didInitialSyncPush.current = true; return; }
    let cancelled = false;
    setSyncStatus('syncing');
    pushCloudStats(nickname, stats).then((ok) => {
      if (cancelled) return;
      setSyncStatus(ok ? 'synced' : 'error');
    });
    return () => { cancelled = true; };
  }, [stats, nickname, statsLoaded]);

  // Today's UTC date key — recomputed each render so we naturally pick up day rollover
  // if the user keeps the tab open across midnight UTC.
  const todayKey = utcDateKey();
  const communityStats = useCommunityStats(todayKey);

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
      setToast({ message: lang === 'fr' ? "Défi du jour terminé — entraînement démarré" : "Today's puzzle is done — practice mode started", icon: '🏋️' });
      return;
    }
    // Daily in progress → switch to practice, daily is preserved in storage and can be
    // resumed later via the "Today's puzzle" button in the practice banner.
    newGame(true);
    setToast({ message: lang === 'fr' ? 'Défi en pause — entraînement démarré' : 'Daily paused — practice mode started', icon: '🏋️' });
  }, [trainingMode, dailyDoneToday, newGame]);

  // Submit guess
  const submitGuess = () => {
    if (!selectedSpecies || gameOver) return;
    if (guesses.some((g) => g.id === selectedSpecies.id)) {
      setToast({ message: lang === 'fr' ? 'Déjà proposé' : 'Already guessed', icon: '⚠️' });
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
      if (!trainingMode) {
        updateStatsOnWin(newGuesses.length, target, newGuesses.length + extraCost);
        // Community counter (fire-and-forget; silent if Upstash not configured)
        submitCommunityWin(todayKey, newGuesses.length + extraCost);
      }
    } else if (newGuesses.length + extraCost >= MAX_ATTEMPTS) {
      setGameOver(true);
      setWon(false);
      // mysteryRevealed stays false — user reveals manually
      setTimeout(() => setShowEnd(true), 900);
      if (!trainingMode) updateStatsOnLoss();
    }
    setActiveGuessId(selectedSpecies.id);
  };

  // ----- Cloud sync handlers -----
  // Connect a nickname. If the nickname has no cloud record yet, this device's
  // current stats become its starting point (push). If it already exists, adopt
  // the cloud stats (pull, overwriting local).
  const connectNickname = useCallback(async (rawNick) => {
    const nick = (rawNick || '').trim();
    if (!nick) return;
    if (!syncEnabled()) { setSyncStatus('error'); return; }
    setSyncStatus('syncing');
    const cloud = await pullCloudStats(nick);
    if (cloud) {
      // Existing nickname → adopt cloud stats.
      setStats((prev) => ({
        ...prev, ...cloud,
        achievementProgress: { ...prev.achievementProgress, ...(cloud.achievementProgress || {}) },
      }));
    } else {
      // New nickname → seed the cloud with this device's current stats.
      await pushCloudStats(nick, stats);
    }
    didInitialSyncPush.current = true; // avoid an immediate echo push
    setNickname(nick);
    saveStore('bugdle_nickname', nick);
    setSyncStatus('synced');
    setShowSync(false);
  }, [stats]);

  const disconnectNickname = useCallback(() => {
    setNickname(null);
    saveStore('bugdle_nickname', null);
    try { localStorage.removeItem('bugdle_nickname'); } catch (e) {}
    didInitialSyncPush.current = false;
    setSyncStatus('idle');
  }, []);

  // Manual "sync now": pull from cloud, merge-by-adopting (cloud wins), then the
  // change-effect will push back any local-only deltas on the next tick.
  const syncNow = useCallback(async () => {
    if (!nickname || !syncEnabled()) return;
    setSyncStatus('syncing');
    const cloud = await pullCloudStats(nickname);
    if (cloud) {
      setStats((prev) => ({
        ...prev, ...cloud,
        achievementProgress: { ...prev.achievementProgress, ...(cloud.achievementProgress || {}) },
      }));
    }
    setSyncStatus('synced');
  }, [nickname]);

  const updateStatsOnWin = (numGuesses, won_target, totalCost) => {
    // totalCost = guesses actually made + hint/fact costs (extraCost). This is the
    // "effective attempt number" the player reached. Endurance and the guess
    // distribution use this so that winning on the 20th *effective* attempt (e.g.
    // 15 guesses + 5 spent on hints) still counts.
    const effectiveAttempts = (typeof totalCost === 'number') ? totalCost : numGuesses;
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
      // Endurance: win at the 20th effective attempt — counting hints/facts toward
      // the total, and also covering the edge case of going right up to the cap.
      if (effectiveAttempts >= MAX_ATTEMPTS) ach.add('endurance');

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
        const firstId = newlyUnlocked[0];
        const first = ACHIEVEMENTS.find((a) => a.id === firstId);
        const locName = (ACH_I18N[lang] && ACH_I18N[lang][firstId] && ACH_I18N[lang][firstId].name)
                        || (ACH_I18N.en[firstId] && ACH_I18N.en[firstId].name)
                        || first.id;
        setTimeout(() => setToast({ message: t('achievement_unlocked', { name: locName }), icon: first.icon }), 1800);
      }

      // Record the effective attempt count for averages and the distribution chart.
      const newHist = { ...(prev.guessHistogram || {}) };
      const bucket = String(effectiveAttempts);
      newHist[bucket] = (newHist[bucket] || 0) + 1;

      return {
        ...prev,
        wins: newWins,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        totalGuesses: (prev.totalGuesses || 0) + effectiveAttempts,
        winsCounted: (prev.winsCounted || 0) + 1,
        guessHistogram: newHist,
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
      setToast({ message: lang === 'fr' ? "Pas assez d'essais restants" : 'Not enough guesses left', icon: '⚠️' });
      return;
    }
    setFunFactUnlocked(true);
    setExtraCost((c) => c + 5);
    sounds.flutter();
    setToast({ message: lang === 'fr' ? 'Anecdote débloquée (−5 essais)' : 'Fun fact unlocked (−5 attempts)', icon: '✨' });
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
  // Clade info: the deepest shared clade name, BUT never the species itself —
  // if the player has identified the answer (or a hint pushed effectiveIdx to
  // Species level), clamp down to Genus so the panel shows the genus Wikipedia
  // page instead of the species page. We do NOT use Species for the panel
  // because that would leak the answer mid-game, and even post-game it's nicer
  // to anchor on the genus (which often has the better Wikipedia article).
  //
  // tp[tp.length-1] = Species, tp[tp.length-2] = Genus. So we cap deepestIdx at
  // tp.length-2.
  const cladeIdxForPanel = Math.min(deepestIdx, tp.length - 2);
  const lcaCladeName = (guesses.length > 0 && cladeIdxForPanel > 0 && tp[cladeIdxForPanel]) ? tp[cladeIdxForPanel][1] : null;

  // Reset clade selection to the latest LCA whenever a new guess is added.
  // Tracking guesses.length is sufficient — the LCA is always recomputed above
  // from the current guesses, so we just sync `selectedClade` to it on changes.
  const lastGuessCountRef = useRef(0);
  useEffect(() => {
    if (guesses.length !== lastGuessCountRef.current) {
      lastGuessCountRef.current = guesses.length;
      setSelectedClade(lcaCladeName);
    }
  }, [guesses.length, lcaCladeName]);

  const tradeForReveal = () => {
    if (gameOver || !target) return;
    const nextIdx = effectiveIdx + 1;
    // Never reveal Genus (tp.length-2) or Species (tp.length-1) via hint —
    // since each genus has exactly one species in the game, revealing the genus would
    // give the answer away. The deepest revealable rank is the one just before Genus.
    if (nextIdx >= tp.length - 2) {
      setToast({ message: lang === 'fr' ? 'Impossible de révéler plus — trop près de la réponse !' : 'Cannot reveal further — too close to the answer!', icon: '⚠️' });
      return;
    }
    const remaining = MAX_ATTEMPTS - guesses.length - extraCost;
    if (remaining <= 3) {
      setToast({ message: lang === 'fr' ? "Pas assez d'essais restants" : 'Not enough guesses left', icon: '⚠️' });
      return;
    }
    setRevealedRankIdx(nextIdx);
    setExtraCost((c) => c + 3);
    sounds.flutter();
    const [rank, name] = tp[nextIdx];
    setToast({ message: `${lang === 'fr' ? 'Indice' : 'Hint'}: ${rankLabelFor(rank, lang)} = ${name}`, icon: '🔍' });
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
              {trainingMode ? <><Dumbbell size={11} /> {t('practice_on')}</> : `${t('daily_challenge')} · ${todayKey}`}
            </div>
          </div>
          <div className="bd-actions">
            <div className="bd-stats">
              <span>🏆 <strong>{stats.wins}</strong></span>
              <span className="sep">·</span>
              <span>🔥 <strong>{stats.streak}</strong></span>
              <span className="sep">·</span>
              <span title={lang === 'fr' ? 'Essais restants' : 'Attempts left'}>📜 <strong>{remaining}</strong></span>
              {communityStats && communityStats.wins > 0 && (
                <>
                  <span className="sep">·</span>
                  <span
                    className="bd-community-stat"
                    title={lang === 'fr'
                      ? `${communityStats.wins} joueur${communityStats.wins > 1 ? 's ont' : ' a'} trouvé aujourd'hui${communityStats.avgGuesses ? ` · moyenne : ${communityStats.avgGuesses} essais` : ''}`
                      : `${communityStats.wins} player${communityStats.wins > 1 ? 's' : ''} solved today${communityStats.avgGuesses ? ` · avg: ${communityStats.avgGuesses} guesses` : ''}`}
                  >
                    👥 <strong>{communityStats.wins}</strong>
                    {communityStats.avgGuesses && <span className="bd-community-avg"> ∅{communityStats.avgGuesses}</span>}
                  </span>
                </>
              )}
            </div>
            <button
              className={'bd-icon-btn'}
              onClick={startNewGame}
              title={trainingMode
                ? (lang === 'fr' ? "Nouvelle partie d'entraînement" : 'New practice round')
                : (dailyDoneToday
                    ? (lang === 'fr' ? "Le défi du jour est terminé — passer en entraînement" : "Today's daily is done — switch to practice")
                    : (lang === 'fr' ? "Entraînement (ne touche pas au défi du jour)" : 'Practice round (preserves your daily progress)'))}
            >
              <Dumbbell size={16} />
            </button>
            <button className="bd-icon-btn" onClick={() => setSoundOn(!soundOn)} title={soundOn ? t('sound_off') : t('sound_on')}>
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              className="bd-icon-btn bd-lang-btn"
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              title={t('lang_label')}
              aria-label={t('lang_label')}
            >
              <span className="bd-lang-code">{lang === 'en' ? 'EN' : 'FR'}</span>
            </button>
            <button className="bd-icon-btn" onClick={() => setShowExplorer(true)} title={t('explore_tree')}><TreePine size={16} /></button>
            {syncEnabled() && (
              <button
                className={'bd-icon-btn' + (nickname ? ' bd-sync-active' : '')}
                onClick={() => setShowSync(true)}
                title={nickname ? t('sync_connected_as', { name: nickname }) : t('sync_title')}
              >
                <Cloud size={16} />
              </button>
            )}
            <button className="bd-icon-btn" onClick={() => setShowStats(true)} title={t('mystats_title')}><BarChart3 size={16} /></button>
            <button className="bd-icon-btn" onClick={() => setShowAch(true)} title={t('achievements')}><Award size={16} /></button>
            <button className="bd-icon-btn" onClick={() => setShowHelp(true)} title={t('how_to_play')}><HelpCircle size={16} /></button>
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
            <span style={{ flex: 1 }}>{t('practice_banner')}</span>
            <button
              className="bd-btn"
              style={{ fontStyle: 'normal' }}
              onClick={async () => {
                // Switch back to today's daily.
                // - If a saved daily for today exists (in-progress OR finished) → resume it.
                // - Otherwise → start a fresh daily.
                const saved = await loadStore('bugdle_daily', null);
                if (saved && saved.date === todayKey && saved.targetId != null) {
                  const tgt = SPECIES.find((s) => s.id === saved.targetId);
                  if (tgt) {
                    setTarget(tgt);
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
                      setToast({
                        message: lang === 'fr'
                          ? "Le défi du jour est déjà terminé — revenez demain"
                          : "Today's daily is already done — come back tomorrow",
                        icon: '🌙',
                      });
                      setTimeout(() => setShowEnd(true), 300);
                    } else {
                      setShowEnd(false);
                    }
                    return;
                  }
                }
                newGame(false);
              }}
              title={lang === 'fr' ? "Revenir au défi du jour" : "Return to today's daily puzzle"}
            >
              {lang === 'fr' ? "Défi du jour" : "Today's puzzle"}
            </button>
          </div>
        )}

        <div className="bd-main">
          {/* LEFT COLUMN */}
          <div>
            {/* GUESS INPUT - now ABOVE the tree */}
            <div className="bd-section" style={{ marginBottom: 18 }}>
              <h3>{t('your_guess')} <span className="bd-count">{guesses.length + extraCost}/{MAX_ATTEMPTS} {lang === 'fr' ? 'utilisés' : 'used'}</span></h3>
              <Autocomplete
                value={inputValue}
                onChange={(v) => { setInputValue(v); if (selectedSpecies && v !== speciesCommon(selectedSpecies, lang)) setSelectedSpecies(null); }}
                onSelect={setSelectedSpecies}
                disabled={gameOver}
                alreadyGuessed={guesses.map((g) => g.id)}
              />
              <div className="bd-submit-row">
                <button className="bd-btn primary" onClick={submitGuess} disabled={!selectedSpecies || gameOver}>
                  {lang === 'fr' ? 'Valider' : 'Submit'}
                </button>
                <button
                  className="bd-btn"
                  onClick={tradeForReveal}
                  disabled={tradeRevealDisabled}
                  title={lang === 'fr' ? "Coûte 3 essais : révèle le prochain rang taxonomique vers la réponse" : "Spend 3 attempts to reveal the next taxonomic rank toward the answer"}
                >
                  <Flag size={14} /> {t('hint_3')}
                </button>
                <button
                  className="bd-btn"
                  onClick={tradeForFunFact}
                  disabled={tradeFactDisabled}
                  title={lang === 'fr' ? "Coûte 5 essais : débloque une anecdote sur l'espèce mystère" : "Spend 5 attempts for a surprising fact about the mystery species"}
                >
                  <Sparkles size={14} /> {t('fact_5')}
                </button>
              </div>
              {revealedRankIdx >= 0 && !gameOver && (
                <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--cream-deep)', borderRadius: 8, borderLeft: '3px solid var(--ochre)', fontFamily: 'Fraunces, serif', fontSize: 13, color: 'var(--ink)' }}>
                  <strong>{t('revealed_hint')}</strong>{' '}
                  {(() => {
                    const [rank, name] = tp[revealedRankIdx];
                    return <>{rankLabelFor(rank, lang)} = <span style={{ fontStyle: 'italic' }}>{name}</span></>;
                  })()}
                </div>
              )}
              {funFactUnlocked && !gameOver && (
                <div style={{ marginTop: 8, padding: '10px 14px', background: 'var(--cream-deep)', borderRadius: 8, borderLeft: '3px solid var(--ochre)', fontFamily: 'Fraunces, serif', fontSize: 13, color: 'var(--ink)', fontStyle: 'italic' }}>
                  <Sparkles size={12} style={{ display: 'inline', marginRight: 6, color: 'var(--ochre)', verticalAlign: -1 }} />
                  {speciesFact(target, lang)}
                </div>
              )}
            </div>

            {/* TREE */}
            <div className="bd-section">
              <h3><GitBranch size={14} /> {lang === 'fr' ? 'Arbre' : 'Tree'}</h3>
              <TaxoTree
                guesses={guesses}
                target={target}
                gameOver={gameOver}
                won={won}
                revealedRankIdx={revealedRankIdx}
                mysteryRevealed={mysteryRevealed}
                onGuessClick={(id) => {
                  setActiveGuessId(id);
                  sounds.click();
                  // Clicking a leaf species in the tree should switch the Clade Info
                  // panel to its Genus (never the Species itself — by design). We look
                  // up the matching species by id; the mystery leaf (id === target.id
                  // post-reveal) also lands on its genus, which is the desired
                  // behaviour when the player has just won.
                  const sp = SPECIES.find((s) => s.id === id);
                  if (sp) {
                    if (!cladeInfoOpen) toggleCladeInfo();
                    setSelectedClade(sp.genus);
                  }
                }}
                activeGuessId={activeGuessId}
                onCladeClick={(cladeName) => {
                  // When the user clicks an internal clade node in the tree, open
                  // the info panel (if collapsed) and switch the displayed clade.
                  if (!cladeInfoOpen) toggleCladeInfo();
                  setSelectedClade(cladeName);
                }}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: CLADE INFO + GUESSES */}
          <div>
            <CladeInfoPanel
              clade={selectedClade}
              expanded={cladeInfoOpen}
              onToggle={toggleCladeInfo}
            />
            <div className="bd-section">
              <h3>{t('your_guesses')} <span className="bd-count">{guesses.length + extraCost}/{MAX_ATTEMPTS}</span></h3>
            {guesses.length === 0 ? (
              <div className="bd-empty-state">
                <Sparkles size={28} strokeWidth={1.3} />
                <div>{t('no_guesses_yet')}</div>
                <div style={{ marginTop: 4, fontSize: 12, opacity: 0.75 }}>{t('htp_start_p')}</div>
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
                            <span className="bd-guess-name">{idxFromStart}. {speciesCommon(g, lang)}</span>{' '}
                            <span className="bd-guess-sci">({g.scientificName})</span>
                          </div>
                          <span className={'bd-guess-rank ' + (isMatch ? 'win' : '')}>
                            {isMatch ? (lang === 'fr' ? '★ Trouvé !' : '★ Found!') : (
                              lca[0] === 'Class'
                                ? 'Insecta'
                                : <>
                                    {rankLabelFor(lca[0], lang)}:{' '}
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
            <h2>{t('htp_title')}</h2>
            <div className="bd-help">
              <p>{t('htp_daily_p')}</p>
              <h3>{t('htp_daily_h')}</h3>
              <p>
                {lang === 'fr' ? (
                  <>Tout le monde joue la même espèce chaque jour. Une fois le défi du jour terminé (réussi ou raté), revenez demain pour le suivant — ou passez en <strong>mode entraînement</strong> (icône haltère) pour des parties illimitées qui n'affectent pas vos statistiques.</>
                ) : (
                  <>Everyone in the world plays the same species each day. Once you've solved (or failed) today's puzzle, come back tomorrow for the next one — or switch to <strong>Practice mode</strong> (dumbbell icon) for unlimited rounds that don't affect your statistics.</>
                )}
              </p>
              <h3>{t('htp_color_h')}</h3>
              <p>
                <span className="bd-help-hint" style={{ background: 'var(--green-dark)' }}></span><strong>{lang === 'fr' ? 'Vert foncé' : 'Dark green'}</strong> — {lang === 'fr' ? "valeur identique à celle de la cible." : "exactly the same value as the target."}<br />
                <span className="bd-help-hint" style={{ background: 'var(--green-light)' }}></span><strong>{lang === 'fr' ? 'Vert clair' : 'Light green'}</strong> — {lang === 'fr' ? "partiellement correct (certains éléments correspondent, pas tous)." : "partially correct (some elements match, but not all)."}<br />
                <span className="bd-help-hint" style={{ background: 'var(--yellow)' }}></span><strong>{lang === 'fr' ? 'Jaune' : 'Yellow'}</strong> — {lang === 'fr' ? "proche : région biogéographique voisine, ou taille différant de moins du double." : "close: an adjacent biogeographic realm for distribution, or size off by less than 2×."}<br />
                <span className="bd-help-hint" style={{ background: 'var(--red)' }}></span><strong>{lang === 'fr' ? 'Rouge' : 'Red'}</strong> — {lang === 'fr' ? "aucune correspondance." : "no match at all."}
              </p>
              <p>{lang === 'fr'
                ? <>Pour la <strong>taille</strong>, une flèche ↑ indique que la cible est plus grande que votre proposition, ↓ qu'elle est plus petite.</>
                : <>For <strong>size</strong>, an arrow ↑ means the target is larger than your guess, ↓ smaller.</>}
              </p>
              <h3>{lang === 'fr' ? "L'arbre taxonomique" : 'The taxonomic tree'}</h3>
              <p>{lang === 'fr'
                ? <>Chaque espèce que vous proposez apparaît comme une feuille. L'espèce mystère est marquée d'un <strong>"?"</strong> et descend vers le clade commun le plus profond à mesure que vous vous rapprochez. Seuls les <em>points de branchement</em> (dernier ancêtre commun entre deux feuilles) et les rangs révélés explicitement par l'indice sont étiquetés.</>
                : <>Every species you guess appears as a leaf. The mystery species is marked with <strong>"?"</strong> and slides down to the deepest shared clade as you narrow in on it. Only the <em>branching points</em> (last common ancestor between two leaves) and any rank explicitly revealed via Hint are labelled.</>}
              </p>
              <h3>{t('trades')}</h3>
              <p>
                <strong>{t('hint_3')}</strong>: {lang === 'fr' ? "révèle le prochain rang taxonomique vers la réponse." : "reveal the next taxonomic rank toward the answer."}<br />
                <strong>{t('fact_5')}</strong>: {lang === 'fr' ? "débloque une anecdote surprenante sur l'espèce mystère." : "unlock a surprising fact about the mystery species."}
              </p>
              <h3>{t('htp_practice_h')}</h3>
              <p>{t('htp_practice_p')}</p>
              <h3>{t('htp_explore_h')}</h3>
              <p>{t('htp_explore_p')}</p>
              <h3>{t('htp_stats_h')}</h3>
              <p>{t('htp_stats_p')}</p>
              <h3>{t('htp_sync_h')}</h3>
              <p>{t('htp_sync_p')}</p>
              <h3>{t('htp_credits_h')}</h3>
              <p>
                {t('htp_credits_p')}{' '}
                <a href="https://metazooa.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--copper)', textDecoration: 'underline' }}>Metazooa</a>
                {' '}{lang === 'fr' ? 'et' : 'and'}{' '}
                <a href="https://birdl.online/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--copper)', textDecoration: 'underline' }}>Birdle</a>.
              </p>
              {lang === 'fr' && (
                <p style={{
                  marginTop: 18,
                  padding: '10px 14px',
                  background: 'var(--cream-deep)',
                  borderLeft: '3px solid var(--ochre)',
                  borderRadius: 6,
                  fontStyle: 'italic',
                  fontSize: 13,
                  color: 'var(--sepia-dark)',
                }}>
                  {t('htp_lang_note')}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {showWhatsNew && (
        <WhatsNewModal onClose={dismissWhatsNew} />
      )}

      {showStats && (
        <PersonalStatsModal
          stats={stats}
          nickname={nickname}
          onClose={() => setShowStats(false)}
        />
      )}

      {showSync && (
        <SyncModal
          nickname={nickname}
          syncStatus={syncStatus}
          onConnect={connectNickname}
          onDisconnect={disconnectNickname}
          onSyncNow={syncNow}
          onClose={() => setShowSync(false)}
        />
      )}

      {showAch && (
        <div className="bd-modal-overlay" onClick={() => setShowAch(false)}>
          <div className="bd-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bd-modal-close" onClick={() => setShowAch(false)}><X size={18} /></button>
            <h2>{t('achievements')}</h2>
            <div style={{ fontSize: 13, color: 'var(--sepia-dark)', fontFamily: 'Fraunces, serif', marginBottom: 14 }}>
              {t('ach_unlocked', { a: stats.achievements.length, b: ACHIEVEMENTS.length })}
              {stats.achievementProgress.pollinatorGenera?.length > 0 && stats.achievementProgress.pollinatorGenera.length < 5 && (
                <div style={{ fontStyle: 'italic', marginTop: 4, fontSize: 12 }}>
                  {t('ach_pollinator')}: {t('ach_progress_basic', { n: stats.achievementProgress.pollinatorGenera.length, total: 5 })}
                </div>
              )}
              {stats.achievementProgress.globetrotterRegions?.length > 0 && stats.achievementProgress.globetrotterRegions.length < 6 && (
                <div style={{ fontStyle: 'italic', marginTop: 4, fontSize: 12 }}>
                  {t('ach_globetrotter')}: {t('ach_progress_regions', { n: stats.achievementProgress.globetrotterRegions.length })}
                </div>
              )}
              {stats.achievementProgress.bugMasterOrders?.length > 0 && stats.achievementProgress.bugMasterOrders.length < ALL_ORDERS.length && (
                <div style={{ fontStyle: 'italic', marginTop: 4, fontSize: 12 }}>
                  {t('ach_bugmaster')}: {t('ach_progress_orders', { n: stats.achievementProgress.bugMasterOrders.length, total: ALL_ORDERS.length })}
                </div>
              )}
            </div>
            <AchievementsPanel unlocked={stats.achievements} />
            <div style={{ fontSize: 11, fontFamily: 'Fraunces, serif', fontStyle: 'italic', marginTop: 16, color: 'var(--sepia)' }}>
              {t('ach_hover_hint')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrap the game in the language provider so the EN/FR toggle works everywhere.
// Also wrap in a simple error boundary so any runtime error becomes visible on
// screen instead of producing a silent blank page.
class BugdleErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) {
    // Log to the console so the user can copy a stack trace from devtools.
    // eslint-disable-next-line no-console
    console.error('[Bugdle] runtime error:', err, info);
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{
          padding: 24,
          fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
          background: '#fdf6e8',
          color: '#3d2d18',
          whiteSpace: 'pre-wrap',
          fontSize: 13,
          lineHeight: 1.5,
        }}>
          <strong style={{ fontSize: 16 }}>Bugdle crashed at runtime.</strong>{"\n\n"}
          <strong>Error:</strong> {String(this.state.err && this.state.err.message)}{"\n\n"}
          <strong>Stack:</strong>{"\n"}{String(this.state.err && this.state.err.stack)}
        </div>
      );
    }
    return this.props.children;
  }
}

// SVG ladybug used both as the browser tab icon (favicon) and elsewhere. Kept as
// a string so we can encode it directly into a data:image/svg+xml URL.
const LADYBUG_FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <radialGradient id="bodyGrad" cx="40%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#e85a3d"/>
      <stop offset="100%" stop-color="#a82c1a"/>
    </radialGradient>
  </defs>
  <!-- legs -->
  <line x1="14" y1="32" x2="6" y2="22" stroke="#1a0f04" stroke-width="3" stroke-linecap="round"/>
  <line x1="12" y1="40" x2="3" y2="40" stroke="#1a0f04" stroke-width="3" stroke-linecap="round"/>
  <line x1="14" y1="48" x2="6" y2="56" stroke="#1a0f04" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="32" x2="58" y2="22" stroke="#1a0f04" stroke-width="3" stroke-linecap="round"/>
  <line x1="52" y1="40" x2="61" y2="40" stroke="#1a0f04" stroke-width="3" stroke-linecap="round"/>
  <line x1="50" y1="48" x2="58" y2="56" stroke="#1a0f04" stroke-width="3" stroke-linecap="round"/>
  <!-- head -->
  <ellipse cx="32" cy="18" rx="11" ry="9" fill="#1a0f04"/>
  <!-- antennae -->
  <path d="M 27 12 Q 24 7 22 6" stroke="#1a0f04" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M 37 12 Q 40 7 42 6" stroke="#1a0f04" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="22" cy="6" r="1.5" fill="#1a0f04"/>
  <circle cx="42" cy="6" r="1.5" fill="#1a0f04"/>
  <!-- body / elytra -->
  <ellipse cx="32" cy="38" rx="22" ry="20" fill="url(#bodyGrad)" stroke="#1a0f04" stroke-width="2"/>
  <!-- center line -->
  <line x1="32" y1="20" x2="32" y2="58" stroke="#1a0f04" stroke-width="2.5"/>
  <!-- spots -->
  <circle cx="20" cy="32" r="3.5" fill="#1a0f04"/>
  <circle cx="44" cy="32" r="3.5" fill="#1a0f04"/>
  <circle cx="20" cy="46" r="3.5" fill="#1a0f04"/>
  <circle cx="44" cy="46" r="3.5" fill="#1a0f04"/>
  <circle cx="32" cy="42" r="3" fill="#1a0f04"/>
  <!-- highlight -->
  <ellipse cx="24" cy="28" rx="4" ry="2.5" fill="#ffffff" opacity="0.32" transform="rotate(-25 24 28)"/>
</svg>`;

// Sets the browser tab favicon and (optionally) title to the ladybug + "Bugdle".
// We render the SVG inline as a data: URL so no asset hosting is required.
function useBugdleTabIcon() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    // Remove any pre-existing favicon links so multiple icons don't fight for the tab
    const existing = document.querySelectorAll("link[rel~='icon'], link[rel='shortcut icon']");
    existing.forEach((el) => el.parentNode && el.parentNode.removeChild(el));
    // Inject our SVG ladybug as the new icon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(LADYBUG_FAVICON_SVG);
    document.head.appendChild(link);
    // Also set a tab title if the host page hasn't customised one. We never overwrite
    // a non-default browser title to stay polite to whichever shell embeds the game.
    if (!document.title || /^Vite \+ React$|^React App$|^Document$/.test(document.title)) {
      document.title = 'Bugdle';
    }
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);
}

function BugdleApp() {
  useBugdleTabIcon();
  return (
    <BugdleErrorBoundary>
      <LangProvider>
        <Bugdle />
      </LangProvider>
    </BugdleErrorBoundary>
  );
}

export default BugdleApp;

export type LoreSection = {
  title: string;
  content: string;
};

export type LoreData = {
  intro: string;
  sections: LoreSection[];
};

export const LORE_DATA: Record<string, LoreData> = {
  'wuthering-waves': {
    intro:
      'A Wuthering Waves egy posztapokaliptikus világban játszódik, ahol az emberiség egy katasztrofális esemény — a Lament — után próbálja újjáépíteni a civilizációt. A játékos a Rover-t irányítja, aki amnéziával ébred fel ebben a megváltozott, veszélyekkel teli világban. A történet a Solaris-3 bolygón bontakozik ki, ahol több nemzet és régió vár felfedezésre.',
    sections: [
      {
        title: 'A Világ — Solaris-3',
        content:
          'A Solaris-3 egy olyan bolygó, amelyet a Lament nevű kataklizmikus esemény gyökeresen átalakított. Korábban fejlett civilizációk virágoztak rajta, ám a katasztrófa mindent megváltoztatott. A világ területei „Tacet Field"-ekre — veszélyes zónákra — oszlanak, ahol akusztikus anomáliák lényeket hoznak létre a semmiből. Az eltorzult táj rejtélyekkel és veszélyekkel teli, ugyanakkor a korábbi civilizációk romjai értékes tudást rejtenek. A bolygón több különálló nemzet és régió létezik, mindegyik sajátos kultúrával, történelemmel és kihívásokkal.',
      },
      {
        title: 'A Lament és a Waveworn Phenomenon',
        content:
          'A Lament az a katasztrofális esemény, amely alapjaiban változtatta meg a Solaris-3-at. Az esemény során az akusztikus frekvenciák kontrollálhatatlanná váltak, ami tömeges pusztuláshoz és a valóság torzulásához vezetett. A Lament létrehozta a Tacet Discord-ot — hangfrekvenciákból anyaggá és élőlényekké kristályosodó jelenséget. Sokan elvesztették az emlékezetüket, városok tűntek el, és az egész ökoszisztéma átalakult. A Waveworn Phenomenon egy összefoglaló kifejezés a Lament által okozott rendellenes jelenségekre: az idő torzulásaira, a tér anomáliáira és a frekvencia-zavarásokra, amelyek a mai napig fenyegetik a bolygó lakóit.',
      },
      {
        title: 'A Resonatorok',
        content:
          'A Resonatorok különleges képességekkel rendelkező egyének, akik képesek manipulálni a Tacet Discord frekvenciáit. Minden Resonatornak egyedi frekvenciája van, amely meghatározza az eleméhez (Aero, Electro, Fusion, Glacio, Havoc, Spectro) és harci stílusához való kötődését. A Resonatorok a társadalom védelmezői — ők harcolnak a Tacet Discord szörnyei ellen és védik a civilizációt. Különleges képességük, hogy „Echokat" — legyőzött lények rezgésmintáit — képesek magukba szívni és harcban felhasználni. A Resonatorok ritkák, és a különböző nemzetek eltérő módon kezelik őket: egyesek hősként tisztelik, mások félelemmel és gyanakvással tekintenek rájuk.',
      },
      {
        title: 'Az Echok és a Tacet Discord',
        content:
          'Az Echok a Tacet Discord lényeinek rezgésmintáiból keletkezett entitások. Amikor egy Resonator legyőz egy Tacet Discord szörnyet, annak frekvenciamintája rögzíthető és felhasználható. Az Echo-rendszer a játék egyik központi mechanikája, amely lehetővé teszi a karakterek testreszabását és erősítését. A Tacet Discord maga pedig a Lament utáni világ állandó fenyegetése: hangfrekvenciákból született szörnyek, amelyek a Tacet Field-ekben keletkeznek és támadják az emberi településeket. A különböző régiókban eltérő típusú Tacet Discord lényekkel találkozhatunk.',
      },
      {
        title: 'A Rover',
        content:
          'A Rover a játékos karaktere, aki amnéziával ébred a Tacet Field közepén, Jinzhou közelében. Rendkívül ritka képességgel rendelkezik: bármilyen Echo-t képes befogadni és használni, ami más Resonatorok számára lehetetlen. A Rover háromféle elem-variánsban játszható: Spectro, Havoc és Aero. A történet során fokozatosan visszanyeri emlékeit, miközben felfedi a Lament okát, a Sentinelek titkait és saját múltjának rejtélyeit. A Rover eredete és valódi ereje a teljes történetív egyik központi kérdése.',
      },
      {
        title: 'A Sentinelek és a Threnodianok',
        content:
          'A Sentinelek rendkívül hatalmas, isteni erejű lények, akik a Lament előtt is léteztek a Solaris-3-on. Közülük többen is megjelennek a történetben — egyesek szövetségesek, mások ellenségek. A Sentinelek közül kiemelkedik Jinhsi, aki egyben Jinzhou város vezetője is, és maga is Sentinel. A Threnodianok a Lament által „újjászült" lények — korábban emberek vagy más élőlények voltak, akiket a Lament frekvenciái átalakítottak. Közöttük vannak olyanok, akik megőrizték tudatukat, és olyanok is, akik teljesen elvesztették önmagukat.',
      },
      {
        title: 'Huanglong — Jinzhou',
        content:
          'Huanglong az egyik legerősebb és legszervezettebb nemzet a Solaris-3-on. Kínai kultúrából ihletődött civilizáció fejlett technológiával és erős katonai erővel. Az ország irányítása az Öt Magisztrátus kezében van, akik a különböző szektorokat felügyelik. A játék első fejezeteinek helyszíne Jinzhou városa, egy forgalmas kereskedelmi és kulturális központ. Itt találkozunk először a főbb szereplőkkel: Jinhsivel (a város védelmezője és Sentinel), Jiyannal (a Midnight Rangers parancsnoka), Yinlinnel és másokkal. A „Battle Beneath the Crescent" az egyik meghatározó esemény, ahol a város egy hatalmas Tacet Discord támadás ellen védekezik.',
      },
      {
        title: 'Mt. Firmament',
        content:
          'A Huanglong régió kiterjesztése, egy hatalmas hegység, amely fontos szerepet játszik a történetben. Itt található a Pangu Terminal, egy ősi technológiai létesítmény, amely a Lament előtti korból származik. A hegység rejtélyei szorosan kapcsolódnak a Sentinelek és a Rover múltjához. A Mt. Firmament feltárása során a játékos mélyebb betekintést nyer a Solaris-3 történelmébe és a Lament valódi természetébe.',
      },
      {
        title: 'The Black Shores — A Fekete Partok',
        content:
          'A Black Shores egy titokzatos szigetcsoport, amelyet a Viharos Tenger ölel körül. A Tacetitekből formálódott terület állandóan Remnant Energiát sugároz, és rejtélyes köd borítja. Itt található a Tethys System — a Lament megfigyelésére szolgáló központ, amely csillagmátrixokkal monitorozza a bolygó frekvencia-állapotát. A Black Shores-on rejtőzik a Blake Bloom jelenség és a Communication Interference zónák, amelyek megnehezítik a kommunikációt. Ez a régió a Rover múltjának és a Sentinelek eredettörténetének fontos helyszíne.',
      },
      {
        title: 'Rinascita — Az Olasz Világ',
        content:
          'Rinascita egy olasz reneszánsz ihletésű nemzet, a játék második nagy régiója (2.0 verzió). A kultúra, a művészet és a tudomány összefonódik ebben az országban. A Resonatorok itt is különleges szerepet töltenek be a társadalomban, de az itteni politika és hatalmi viszonyok eltérnek Huanglongtól. Rinascita saját történelmi eseményekkel és fesztiválokkal rendelkezik: a Carnevale (karnevál), a Great Agon (nagy verseny) és a Night of Remembrance (emlékezés éjszakája) mind meghatározó kulturális események. A „Dark Tide" nevű jelenség és a Ragunna Terminal fontos elemei a régió történetének. Itt találkozunk többek között Carlottával, Rocciával és Cantarellával.',
      },
      {
        title: 'Lahai-Roi — Az Új Határ',
        content:
          'A Lahai-Roi a játék legújabb régiója (3.0 verzió, „We Who See the Stars"). Egy eddig feltáratlan terület, amely egészen más jellegű kihívásokat tartogat. Az Exostrider-ek és az Exoswarm-ok új típusú fenyegetésként jelennek meg — ezek nem a hagyományos Tacet Discord lények, hanem teljesen más eredetű entitások. A régió felfedezése során a Rover a csillagok titkait és az univerzum mélyebb összefüggéseit kezdi megérteni. A 3.0-ban bevezetett karakterek közül Mornye kötődik leginkább ehhez a régióhoz.',
      },
      {
        title: 'Az Arbiters és az Etheric Sea',
        content:
          'Az Arbiters titokzatos, rendkívül erős entitások, akik a Lament mögött álló erőkhöz kapcsolódnak. Az Etheric Sea egy metafizikai „tenger" — egy frekvenciatér, amely az anyagi valóság mögött húzódik. A Somnoire nevű jelenség lehetővé teszi, hogy bizonyos személyek álmukban kapcsolatba lépjenek ezzel a dimenzióval. Az Arbiters, az Etheric Sea és a Remnant-ek közötti kapcsolat a játék overarching misztériumának része, amelyet a történet fokozatosan tár fel.',
      },
      {
        title: 'A Reverberation és a Retroact Rain',
        content:
          'A Reverberation egy jelenség, amelyben a múlt eseményei „visszacsengnek" a jelenben — régi frekvenciaminták újra aktiválódnak és materializálódnak. Ez lehet veszélyes (szörnyek feltámadása) vagy hasznos (elveszett tudás visszanyerése). A Retroact Rain egy különleges időjárási anomália Huanglongban, amely során a Lament-kori frekvenciák esőként hullanak alá, átmenetileg átalakítva a környezetet. Mindkét jelenség arra utal, hogy a Lament hatásai még korántsem múltak el, és a Solaris-3 világa folyamatosan változik.',
      },
    ],
  },
};

import { NewsItem } from './types/news.type';

// TODO: Hírek korábban BE-ből jöttek (twitter/{slug}/tweets endpoint), fordítással együtt
export const NEWS_DATA: Record<string, NewsItem[]> = {
  'wuthering-waves': [
    {
      id: 'ww-2-0-update',
      title: 'Wuthering Waves 2.0 frissítés',
      fullText: 'Wuthering Waves 2.0 frissítés megjelent! Új karakterek és területek érkeztek a játékba.',
      content:
        'A Wuthering Waves 2.0 frissítés végre megérkezett, és rengeteg újdonsággal bővült a játék! Az új területek között megtalálható a régóta várt Rinascita régió, amely egy teljesen új történetszálat és felfedezni való vidéket kínál.\n\nÚj karakterek is csatlakoztak a játékhoz, akik egyedi képességeikkel színesítik a csapatösszeállítási lehetőségeket. A frissítéssel együtt számos életminőség-javítás is érkezett, beleértve a gyorsabb betöltési időket és az optimalizált felhasználói felületet.\n\nA közösség rendkívül pozitívan fogadta a változásokat, és a játékosok száma jelentősen megugrott az update megjelenése óta.',
      image: '/assets/images/wuthering-waves/card_phoebe.png',
      createdAt: '2025-01-15T10:00:00Z',
    },
    {
      id: 'ww-carlotta-banner',
      title: 'Új banner: Carlotta',
      fullText: 'Új banner érkezett: Carlotta és társai elérhetők!',
      content:
        'A legújabb banner Carlottát hozza el a játékosoknak, aki egy rendkívül erős Glacio típusú karakter. Carlotta egyedi harci stílusa és lenyűgöző képességei miatt az egyik legjobban várt karakter volt.\n\nA banner mellett új fegyverek is elérhetővé váltak, amelyek tökéletesen kiegészítik Carlotta képességeit. A játékosok speciális eseményeken is részt vehetnek, ahol extra jutalmakat szerezhetnek.\n\nNe felejtsétek el kihasználni a banner időszakot, mert limitált ideig érhető el!',
      image: '/assets/images/wuthering-waves/card_carlotta.webp',
      createdAt: '2025-01-10T14:30:00Z',
    },
    {
      id: 'ww-community-event',
      title: 'Közösségi esemény a Discord-on',
      fullText: 'Közösségi esemény: Nyerj exkluzív jutalmakat a hivatalos Discord szerveren!',
      content:
        'A Wuthering Waves magyar közösség újabb izgalmas eseményt szervez a hivatalos Discord szerveren! A résztvevők exkluzív jutalmakat nyerhetnek, beleértve in-game valutát és ritka cosmetikai tárgyakat.\n\nAz esemény két hétig tart, és különböző kihívásokat kell teljesíteni a részvételhez. A kihívások között szerepelnek kreatív pályázatok, kvízek és közösségi feladatok.\n\nCsatlakozz a Discord szerverre és ne maradj le a jutalmakról!',
      image: null,
      createdAt: '2025-01-05T09:00:00Z',
    },
  ],
  // TODO: Többi játék hírei
};

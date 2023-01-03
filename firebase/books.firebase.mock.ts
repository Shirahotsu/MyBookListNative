import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore, updateDoc } from "firebase/firestore/lite";
// @ts-ignore
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_MESSAAGING_SENDER_ID } from "react-native-dotenv";
import { firebaseConfig } from "./firebaseConfig";
import { Book } from "../models/Book.model";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const books: Book[] = [
  {
    averageScore: 9.33,
    bookCover: 'book-covers/muminki_zebrane_tom_2.png',
    categories: ['Bajka', 'Przygoda', 'Fantastyka'],
    comments: [],
    description: `Życie Muminków i ich przyjaciół z Doliny skupia się wokół domu Mamy i Tatusia Muminka, gdzie każdy może liczyć na pomoc i przyjaźń. Panna Migotka, Paszczak, mała Mi, Włóczykij, Ryjek czy straszna Buka tworzą galerię postaci, które na zawsze pozostaną w pamięci czytelników.

Z okazji stulecia Wydawnictwa „Nasza Księgarnia” zebraliśmy wszystkie dziewięć książek z niezapomnianego cyklu autorstwa Tove Jansson w dwóch eleganckich tomach. Tekst, jak zawsze, wzbogacają ilustracje autorki.

Ta wysmakowana edycja może być doskonałym prezentem dla każdego.

Drugi tom zawiera części: „Zima Muminków”, „Opowiadania z Doliny Muminków”, „Tatuś Muminka i morze” i „Dolina Muminków w listopadzie”.`,
    id: '',
    pages: 464,
    released: {
      seconds: 1614380400
    },
    scoreAmount: 2800,
    searchTitle: 'muminki zebrane. tom 2',
    title: 'Muminki zebrane. Tom 2',
    totalScore: 300,
    userRate: [],
    usersFinished: 400,
  },
  {
    averageScore: 8,
    bookCover: 'book-covers/szkola_szpiegow_na_nartach.jpg',
    categories: ['Tajemnica'],
    comments: [],
    description: `Najsłynniejszy nastoletni tajny agent CIA z licencją na rozśmieszanie powraca z kolejną niebezpieczną misją.

Z jakiego powodu tajemniczy chiński multimiliarder przyjeżdża do Kolorado? I co oznacza kryptonim "Złota pięść”? Aby się tego dowiedzieć, Benjamin Ripley rusza na stok i zaprzyjaźnia się z córką Leo Shanga. Okazuje się, że z jazdą na nartach jest podobnie jak z tajnymi akcjami
– grunt, by nie tracić głowy oraz nie złamać tego i owego…

Czy i tym razem zjawiskowa szpieżka Erica pomoże Benowi wykaraskać się z tarapatów?`,
    id: '',
    pages: 344,
    released: {
      seconds: 1671750000
    },
    scoreAmount: 14,
    searchTitle: 'szkoła szpiegów na nartach',
    title: 'Szkoła szpiegów na nartach',
    totalScore: 112,
    userRate: [],
    usersFinished: 20,
  },
  {
    averageScore: 8.75,
    bookCover: 'book-covers/magiczne_drzewo_geniusz.jpg',
    categories: ['Fantastyka', 'Przygoda'],
    comments: [],
    description: `Blubek to najgorszy uczeń w szkole. Magiczny przedmiot zmienia go w geniusza. Chłopiec tworzy niesamowite wynalazki. Porywa go tajna organizacja i każe wymyślić niebezpieczną broń. Kuki, Gabi i Budyń wyruszają ratować przyjaciela. Walczą z porywaczami, olbrzymimi owadami i pułapkami lodowej twierdzy. Zdobywają cudowne eliksiry. Dają one niezwykłą moc, lecz są także niebezpieczne.`,
    id: '',
    pages: 384,
    released: {
      seconds: 1669417200
    },
    scoreAmount: 12,
    searchTitle: 'magiczne drzewo. geniusz',
    title: 'Magiczne Drzewo. Geniusz',
    totalScore: 105,
    userRate: [],
    usersFinished: 234,
  },
  {
    averageScore: 9.38,
    bookCover: 'book-covers/sprawa_zaginionego_mar.jpg',
    categories: ['Tajemnica', 'Przygoda', 'Historia', 'Komedia'],
    comments: [],
    description: `Dziewiętnastowieczna Anglia. W dniu swoich urodzin Enola Holmes odkrywa, że jej matka nagle znika, pozostawiając córce zestaw dziwacznych fantów i serię zagadek. Beztroskie dzieciństwo dorastającej dziewczyny nagle się kończy, a obowiązek opieki nad nią spada na dwóch starszych braci – Sherlocka i Mycrofta, którzy za wszelką cenę chcą niesforną siostrę wpakować w gorset i wysłać na pensję z internatem. I tu się zaczyna…`,
    id: '',
    pages: 240,
    released: {
      seconds: 1602799200
    },
    scoreAmount: 80,
    searchTitle: 'sprawa zaginionego markiza. enola holmes. tom 1',
    title: 'Sprawa zaginionego markiza. Enola Holmes. Tom 1',
    totalScore: 750,
    userRate: [],
    usersFinished: 600,
  },
  {
    averageScore: 8.20,
    bookCover: 'book-covers/krotka_pilka.jpg',
    categories: ['Przygoda', 'Komedia'],
    comments: [],
    description: `Wrobiony przez mamę, byłą koszykarkę, Greg dołącza do drużyny kompletnych przegrywów. A ci goście są tak beznadziejni, że mają tylko jednego sponsora: bar sałatkowy zamknięty przez sanepid. Po zawaleniu całego sezonu i doprowadzeniu do rozpaczy trenera załapują się na Turniej Drugiej Szansy, czyli konkurs dla najgorszych koszykarzy. Biorą w nim udział między innymi: Ponure Pomrowy, Lepsze Numery, a także Gangreny – banda najtwardszych i najbardziej zajadłych dziewczyn, jakie widział świat. Tak że wiecie… to nie będzie KRÓTKA PIŁKA.`,
    id: '',
    pages: 224,
    released: {
      seconds: 1650664800
    },
    scoreAmount: 187,
    searchTitle: 'dziennik cwaniaczka. krótka piłka',
    title: 'Dziennik cwaniaczka. Krótka piłka',
    totalScore: 1534,
    userRate: [],
    usersFinished: 411,
  },
  {
    averageScore: 7.5,
    bookCover: 'book-covers/magiczne_drzewo_swiat_ogromnych.jpg',
    categories: ['Przygoda', 'Fantastyka'],
    comments: [],
    description: `Bohaterowie zostają przeniesieni do Świata Ogromnych. Muszą żyć wśród olbrzymów i chodzić do szkoły z gigantycznymi dziećmi. Są jedynymi małymi istotami w świecie, gdzie wszystko jest ogromne, a każdy pragnie być największy. Walczą z wielkimi stworami, potężnym Gigunem i z pokusą, aby zmienić się w Ogromnych. By powrócić na Ziemię, muszą odnaleźć tajemnicze puzzle, które otwierają drogę do świata ludzi.`,
    id: '',
    pages: 488,
    released: {
      seconds: 1610751600
    },
    scoreAmount: 70,
    searchTitle: 'magiczne drzewo. świat ogromnych',
    title: 'Magiczne Drzewo. Świat Ogromnych',
    totalScore: 525,
    userRate: [],
    usersFinished: 98,
  },
  {
    averageScore: 7.5,
    bookCover: 'book-covers/magiczne_drzewo_czerwone_krzeslo.jpg',
    categories: ['Przygoda', 'Fantastyka'],
    comments: [],
    description: `Burza powaliła olbrzymi stary dąb. Było to Magiczne Drzewo. Ludzie zrobili z niego setki przedmiotów, a każdy zachował cząstkę magicznej siły. Wśród nich było czerwone krzesło. Niesamowite przygody, niebezpieczeństwa, humor i magia... Autobus, który zwariował, most ze światła i wielka fala tsunami. Latający dom, olbrzymi lew i sto wyczarowanych psów! Fantastyczna opowieść o trójce dzieci, które znalazły krzesło spełniające życzenia. Te dobre i te złe...`,
    id: '',
    pages: 304,
    released: {
      seconds: 1628892000
    },
    scoreAmount: 86,
    searchTitle: 'magiczne drzewo. czerwone krzesło',
    title: 'Magiczne Drzewo. Czerwone krzesło',
    totalScore: 645,
    userRate: [],
    usersFinished: 187,
  },
  {
    averageScore: 8.78,
    bookCover: 'book-covers/sprawa_leworecznej_lady.jpg',
    categories: ['Tajemnica', 'Przygoda', 'Historia', 'Komedia'],
    comments: [],
    description: `"Enola Holmes. Sprawa leworęcznej lady" to przede wszystkim historia o początkach buntu kobiet, które dość miały przymusowego wydawania za mąż, lekceważenia oraz nauki tylko rzeczy przystających panienkom. Kobiety pragnęły być wolne, a Enola swoją postawą i siłą charakteru udowadniała każdemu mężczyźnie, że dorównuje im pod każdym aspektem, a nawet ich przewyższa!” – pisała influencerka książkowa, Bajkochłonka (Jowita Pasikowska-Klica).`,
    id: '',
    pages: 264,
    released: {
      seconds: 1643929200
    },
    scoreAmount: 74,
    searchTitle: 'sprawa leworęcznej lady. enola holmes. tom 2',
    title: 'Sprawa leworęcznej Lady. Enola Holmes. Tom 2',
    totalScore: 650,
    userRate: [],
    usersFinished: 91,
  },
  {
    averageScore: 10,
    bookCover: 'book-covers/totalna_demolka.jpg',
    categories: ['Przygoda', 'Komedia'],
    comments: [],
    description: `Remont domu?! To chyba najgorszy pomysł, na jaki kiedykolwiek wpadła mama. Poznajcie głównych bohaterów tej pięknej katastrofy: koty grzęznące w świeżutkim betonie, trującą pleśń, osy kloaczne, myszy w ścianach, latającą wannę i dyszących żądzą zemsty sąsiadów. Czy Heffleyowie przetrwają totalną demolkę, czy będą musieli zacząć od zera w innym mieście, najlepiej pod zmienionym nazwiskiem?`,
    id: '',
    pages: 224,
    released: {
      seconds: 1587765600
    },
    scoreAmount: 12,
    searchTitle: 'dziennik cwaniaczka. totalna demolka. tom 14',
    title: 'Dziennik cwaniaczka. Totalna demolka. Tom 14',
    totalScore: 120,
    userRate: [],
    usersFinished: 15,
  },
  {
    averageScore: 7.25,
    bookCover: 'book-covers/seria_zdarzen.jpg',
    categories: ['Przygoda', 'Tajemnica'],
    comments: [],
    description: `Wioletka, Klaus i Słoneczko Baudelaire to wyjątkowo inteligentne i pełne uroku osobistego rodzeństwo. Cóż z tego, skoro od pierwszych stron tej książki, gdy dzieci otrzymują tragiczną wiadomość, nieszczęście depcze im po piętach. Są jak magnesy przyciągające pecha.
W tej jednej książce życie utrudniają im straszny pożar, drapiące ubrania, zimna owsianka na śniadanie, chciwy i odrażający łotr oraz spisek mający na celu zagarnięcie ich majątku. `,
    id: '',
    pages: 176,
    released: {
      seconds: 1668207600
    },
    scoreAmount: 80,
    searchTitle: 'przykry początek. seria niefortunnych zdarzeń. tom 1',
    title: 'Przykry początek. Seria niefortunnych zdarzeń. Tom 1',
    totalScore: 580,
    userRate: [],
    usersFinished: 98,
  },
  {
    averageScore: 7,
    bookCover: 'book-covers/szkola_szpiegow_w_obozie.jpg',
    categories: ['Tajemnica'],
    comments: [],
    description: 'Nikt nie obiecywał, że życie tajnego agenta będzie usłane różami… Po spektakularnej wtopie na corocznym OZBiS-ie (Ocenie Zdolności Bojowej i Sprawności) trzynastoletni Ben zostaje z hukiem wyrzucony z Akademii Szpiegostwa CIA. Słynny Tajniak szybko otrzymuje kuszącą ofertę, by dołączyć do konkurencyjnej szkoły prowadzonej przez organizację Pająk. O dziwo, przyjmuje propozycję. I ma niecny plan! Czy uda mu się wykiwać superzłoczyńczynię Ashley, dziwacznego Padalca, Murraya, a przede wszystkim tajemniczego Joshuę?',
    id: '',
    pages: 328,
    released: {
      seconds: 1645830000
    },
    scoreAmount: 40,
    searchTitle: 'szkoła szpiegów. w obozie wroga',
    title: 'Szkoła szpiegów. W obozie wroga',
    totalScore: 280,
    userRate: [],
    usersFinished: 65,
  },
  {
    averageScore: 8.25,
    bookCover: 'book-covers/muminki_zebrane_tom_1.jpg',
    categories: ['Bajka', 'Fantastyka'],
    comments: [],
    description: `Życie Muminków i ich przyjaciół z Doliny skupia się wokół domu Mamy i Tatusia Muminka, gdzie każdy może liczyć na pomoc i przyjaźń. Panna Migotka, Paszczak, mała Mi, Włóczykij, Ryjek czy straszna Buka tworzą galerię postaci, które na zawsze pozostaną w pamięci czytelników.`,
    id: '',
    pages: 464,
    released: {
      seconds: 1614380400
    },
    scoreAmount: 344,
    searchTitle: 'muminki zebrane. tom I',
    title: 'Muminki zebrane. Tom I',
    totalScore: 2838,
    userRate: [],
    usersFinished: 487,
  },
  {
    averageScore: 6.5,
    bookCover: 'book-covers/nieznane_przygody_mikolaja.jpg',
    categories: ['Komedia'],
    comments: [],
    description: `Odnalezione przypadkiem w szufladzie Goscinnego, zilustrowane kolorowymi rysunkami przez Sempégo – nieznane historie o Mikołajku nabierają prawdziwych rumieńców. Pomysłom na psoty nigdy nie ma końca. Tym bardziej że niesfornemu łobuziakowi towarzyszą niezawodni kumple: Alcest, Gotfryd, Kleofas i Euzebiusz. Uśmiech murowany, no bo co w końcu, kurczę blade!`,
    id: '',
    pages: 192,
    released: {
      seconds: 1619215200
    },
    scoreAmount: 14,
    searchTitle: 'nieznane przygody mikołajka',
    title: 'Nieznane przygody Mikołajka',
    totalScore: 91,
    userRate: [],
    usersFinished: 39,
  },
  {
    averageScore: 7,
    bookCover: 'book-covers/nowe_przygody_mikolajka.jpg',
    categories: ['Komedia'],
    comments: [],
    description: `Kolejna porcja przygód najzabawniejszego chłopca z Francji, Mikołajka, i jego bandy. Chłopaki przekupują Ananiasza – klasowego pupilka, buntują się przeciwko Rosołowi, a Kleofas awansuje z ostatniego miejsca w klasie na przedostatnie. Urwisy wybierają się na wycieczkę do fabryki czekolady, psocą na basenie, w salonie fryzjerskim i nie tylko. Z nimi nigdy nie ma nudy!`,
    id: '',
    pages: 376,
    released: {
      seconds: 1619215200
    },
    scoreAmount: 30,
    searchTitle: 'nowe przygody mikołajka. kolejna porcja',
    title: 'Nowe przygody Mikołajka. Kolejna porcja',
    totalScore: 210,
    userRate: [],
    usersFinished: 48,
  },
  {
    averageScore: 8.5,
    bookCover: 'book-covers/zupelne_zlo.jpg',
    categories: ['Komedia','Przygoda'],
    comments: [],
    description: `Wakacje w starym wozie kempingowym wujka Gary’ego? Brzmi jak przygoda! Rodzina Grega zamierza spędzić to lato w prawdziwej, najprawdziwszej głuszy. Tylko że w głuszy na ogół grasują jej niezbyt gościnni mieszkańcy – namolne niedźwiedzie, żarłoczne kleszcze i najgorsze z nich wszystkich – SKUNKSY. Czy urlop na łonie natury, który był szczytem marzeń Heffleyów, okaże się zupełnym dnem?`,
    id: '',
    pages: 224,
    released: {
      seconds: 1619215200
    },
    scoreAmount: 682,
    searchTitle: 'dziennik cwaniaczka. zupełne dno',
    title: 'Dziennik cwaniaczka. Zupełne dno',
    totalScore: 5797,
    userRate: [],
    usersFinished: 738,
  }
]

const createMockBooks = async () => {
  await Promise.all(books.map(async (book) => {
    await addBook(book)
  }));
}


const addBook = async (newBook: Book) => {
  const colRef = collection(db, `book`);
  try {
    const response = await addDoc(colRef, newBook);
    const id = response.id;
    const docRef = doc(db, `book/${id}`);
    await updateDoc(docRef, { id: id });
    return true;
  } catch (e) {
    return false;
  }
};

export {
  createMockBooks
}

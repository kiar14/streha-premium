// All copy for the demo lives here. Only facts from docs/research.md and PRODUCT.md.

export const company = {
  name: "Streha Premium d.o.o.",
  legalName: "Streha Premium, krovstvo, d.o.o.",
  director: "Stefan Gabor",
  phone: "041 815 559",
  phoneHref: "tel:+38641815559",
  whatsappHref: "https://wa.me/38641815559",
  email: "strehapremium@gmail.com",
  street: "Štihova ulica 13",
  city: "1000 Ljubljana",
  facebook: "https://www.facebook.com/profile.php?id=61580442830536",
  googleProfile: "https://share.google/nz61WBqQf8OdMlfRm",
  taxId: "33575843",
  registrationNo: "8071934000",
  // Opening hours as published on the Google Business Profile.
  hours: [
    { days: "Pon–pet", time: "7.00–18.00" },
    { days: "Sobota", time: "zaprto" },
    { days: "Nedelja", time: "7.00–18.00" },
  ],
} as const

export const nav = [
  { label: "Storitve", href: "/#storitve" },
  { label: "Garancija", href: "/#garancija" },
  { label: "Kako delamo", href: "/#kako-delamo" },
  { label: "Projekti", href: "/#projekti" },
  { label: "O nas", href: "/#o-nas" },
  { label: "Pogosta vprašanja", href: "/pogosta-vprasanja" },
] as const

export const trust = [
  "10 let pisne garancije na vodotesnost",
  "Več kot 20 let izkušenj",
  "Brezplačen ogled in ponudba",
  "150 zaključenih projektov",
  "Slovenija in Avstrija",
] as const

export type ServiceId = "nove-strehe" | "obnova" | "kleparstvo" | "ravne-strehe" | "zlebovi"

export const services: {
  id: ServiceId
  title: string
  text: string
  spec: string
  image: string
  imageAlt: string
}[] = [
  {
    id: "nove-strehe",
    title: "Nove strehe in prekrivanje",
    text: "Opečne, cementne in pločevinaste kritine za novogradnje in zamenjave celotnih streh.",
    spec: "Tondach · Creaton · Bramac · Eternit · Esal · Trimo",
    image: "/storitve/nove-strehe.webp",
    imageAlt: "Nova opečna kritina na beli družinski hiši s strešnim oknom",
  },
  {
    id: "obnova",
    title: "Obnova in popravila",
    text: "Celovita obnova, sanacije, zamenjava poškodovanih strešnikov in hitri posegi po neurju.",
    spec: "Pregled · sanacija · zamenjava",
    image: "/storitve/obnova-popravila.webp",
    imageAlt: "Obnova strehe: stara kritina, nova folija z letvami in nova antracitna kritina",
  },
  {
    id: "kleparstvo",
    title: "Kleparska dela",
    text: "Obrobe vseh vrst, kritine iz ravne pločevine in snegobrani, izdelani po meri.",
    spec: "Obrobe · ravna pločevina · snegobrani",
    image: "/storitve/kleparska-dela.webp",
    imageAlt: "Kleparska obroba dimnika na antracitni pločevinasti kritini",
  },
  {
    id: "ravne-strehe",
    title: "Ravne strehe in hidroizolacije",
    text: "Bitumenski varilni trakovi, mehke PVC in EPDM folije za popolno tesnjenje ravnih streh.",
    spec: "Bitumen · PVC · EPDM · Sika",
    image: "/storitve/ravne-strehe.webp",
    imageAlt: "Ravna streha s svetlo sivo PVC hidroizolacijo in antracitno obrobo atike",
  },
  {
    id: "zlebovi",
    title: "Žlebovi in odvodnjavanje",
    text: "Demontaža, montaža in prilagoditev žlebov in odtočnih cevi, da voda odteka stran od hiše.",
    spec: "Aluminij · baker · PVC",
    image: "/storitve/zlebovi.webp",
    imageAlt: "Antracitni žleb z odtočno cevjo in snegobrani na vogalu hiše",
  },
]

export const process = [
  { n: "01", title: "Posvet", text: "Prisluhnemo vašim željam in si ogledamo streho. Ogled je brezplačen." },
  { n: "02", title: "Ponudba", text: "Pregledna pisna ponudba: obseg del, material in časovni okvir. Točno veste, kaj dobite." },
  { n: "03", title: "Izvedba", text: "Z deli začnemo takoj po ogledu in potrjeni ponudbi. Natančno in v dogovorjenem roku." },
  { n: "04", title: "Končni pregled", text: "Streho pregledamo skupaj z vami in po potrebi opravimo zadnje prilagoditve." },
] as const

export const projects = [
  { src: "/photos/projekt-temna-kritina.webp", w: 1590, h: 1080, title: "Nova antracitna kritina s strešnimi okni" },
  { src: "/photos/projekt-popravilo.webp", w: 782, h: 1182, title: "Popravilo strehe stanovanjske hiše" },
  { src: "/photos/projekt-hisa-odri.webp", w: 1800, h: 1350, title: "Nova streha na dvonadstropni hiši" },
  { src: "/photos/projekt-rdeca-kritina.webp", w: 600, h: 400, title: "Opečna kritina in strešna okna" },
] as const

export const brands = [
  "Tondach",
  "Creaton",
  "Bramac",
  "Eternit",
  "Esal",
  "Gerard",
  "Metro Bond",
  "Trimo",
  "Isopan",
  "Italpaneli",
] as const

export type FaqItem = { q: string; a: string }

export const faqGroups: { id: string; title: string; items: FaqItem[] }[] = [
  {
    id: "ogled-in-ponudba",
    title: "Ogled in ponudba",
    items: [
      {
        q: "Koliko stane ogled strehe?",
        a: "Ogled in ponudba sta brezplačna. Pošljite povpraševanje ali pokličite 041 815 559 in dogovorimo se za termin.",
      },
      {
        q: "Kako hitro pridete na ogled?",
        a: "Termin ogleda se dogovorimo ob prvem klicu. Pri nujnih primerih, na primer po neurju, pridemo čim prej.",
      },
      {
        q: "Kaj potrebujete od mene za ponudbo?",
        a: "Dovolj je, da nam poveste, kje je streha in kaj potrebujete. Mere, naklon in stanje strehe preverimo sami na ogledu, nato pripravimo pregledno pisno ponudbo z obsegom del, materialom in časovnim okvirom.",
      },
    ],
  },
  {
    id: "garancija",
    title: "Garancija",
    items: [
      {
        q: "Kaj pokriva garancija?",
        a: "Za vse naše storitve jamčimo in izstavimo pisno garancijo za vodotesnost, ki jo podpiše direktor podjetja Stefan Gabor.",
      },
      { q: "Kako dolgo velja garancija?", a: "Garancija za vodotesnost velja 10 let." },
      {
        q: "Kaj naredim, če streha v času garancije pušča?",
        a: "Pokličite nas na 041 815 559. Streho pregledamo in v okviru garancije poskrbimo, da je spet vodotesna.",
      },
    ],
  },
  {
    id: "izvedba-in-roki",
    title: "Izvedba in roki",
    items: [
      {
        q: "Kako hitro lahko začnete z deli?",
        a: "Z deli lahko začnemo takoj po ogledu, ko potrdite ponudbo. Točen termin je odvisen od obsega del in vremena.",
      },
      {
        q: "Koliko časa traja menjava strehe?",
        a: "Odvisno od velikosti in zahtevnosti strehe. Okviren čas izvedbe vedno zapišemo v ponudbo.",
      },
      {
        q: "Ali za menjavo strehe potrebujem gradbeno dovoljenje?",
        a: "To je odvisno od vrste posega in objekta. Ob ogledu vam povemo, kaj velja za vašo streho.",
      },
    ],
  },
  {
    id: "kritine-in-materiali",
    title: "Kritine in materiali",
    items: [
      {
        q: "Katere kritine vgrajujete?",
        a: "Opečne (Tondach, Creaton), cementne (Bramac, Eternit, Esal) in pločevinaste (Gerard, Metro Bond, Trimo, Isopan, Italpaneli).",
      },
      {
        q: "Katera kritina je prava za mojo streho?",
        a: "To je odvisno od naklona, konstrukcije in vaših želja. Ob ogledu preverimo streho in svetujemo, katera kritina je primerna.",
      },
      {
        q: "Ali delate tudi ravne strehe?",
        a: "Da. Ravne strehe izvajamo z bitumenskimi varilnimi trakovi, mehkimi PVC folijami ali EPDM folijami.",
      },
    ],
  },
  {
    id: "obmocje-in-placilo",
    title: "Območje in plačilo",
    items: [
      { q: "Kje izvajate dela?", a: "Po vsej Sloveniji in v Avstriji. Sedež podjetja je v Ljubljani, na Štihovi ulici 13." },
      {
        q: "Kakšne so možnosti plačila?",
        a: "Ponujamo več možnosti plačila. Podrobnosti dogovorimo ob ponudbi.",
      },
    ],
  },
]

/** Positive reviews from the Google Business Profile, quoted as published (Sep 2026). */
export const reviews = [
  {
    quote:
      "Zelo sem zadovoljen s storitvijo podjetja Streha Premium d.o.o. Ekipa je bila profesionalna, prijazna in zelo odzivna skozi celoten projekt. Delo je bilo opravljeno kakovostno, pravočasno in z veliko pozornostjo do podrobnosti.",
    name: "Jessica Chen",
    note: "Mnenje na Googlu",
  },
  {
    quote:
      "Zelo zadovoljen z opravljenim delom. Ekipa je bila točna, prijazna in profesionalna. Delo je bilo opravljeno kakovostno, hitro in natančno. Priporočam vsakomur, ki išče zanesljive mojstre za streho. Hvala!",
    name: "Marko Gabor",
    note: "Mnenje na Googlu",
  },
  {
    quote: "Najboljši izvajalec krovskih del v Sloveniji.",
    name: "Gideon King",
    note: "Mnenje na Googlu · prevedeno iz angleščine",
  },
] as const

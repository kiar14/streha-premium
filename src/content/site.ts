// All copy for the demo lives here. Only facts from docs/research.md and PRODUCT.md.
// Items marked `confirm: true` are shown with a "potrdi" marker until the client confirms them.

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
  hours: [
    { days: "Pon–pet", time: "8.00–19.00" },
    { days: "Sobota", time: "9.00–18.00" },
  ],
} as const

export const nav = [
  { label: "Storitve", href: "#storitve" },
  { label: "Kako delamo", href: "#kako-delamo" },
  { label: "Garancija", href: "#garancija" },
  { label: "Projekti", href: "#projekti" },
  { label: "O nas", href: "#o-nas" },
] as const

export const trust = [
  "10 let pisne garancije na vodotesnost",
  "Več kot 20 let izkušenj",
  "Brezplačen ogled in ponudba",
  "150 zaključenih projektov",
  "Slovenija in Avstrija",
] as const

export const roofBeats = [
  { n: "01", title: "Ostrešje", text: "Trdna osnova. Konstrukcijo preverimo, preden položimo prvo plast." },
  { n: "02", title: "Paroprepustna folija", text: "Druga linija obrambe. Vlaga iz hiše ven, voda od zunaj ne noter." },
  { n: "03", title: "Letve in kritina", text: "Opečna, cementna ali pločevinasta. Svetujemo, katera je prava za vaš naklon." },
  { n: "04", title: "Kleparski zaključki", text: "Obrobe, žlebovi in snegobrani, izdelani po meri vaše strehe." },
  { n: "05", title: "10 let vodotesno", text: "Pisna garancija na vodotesnost za vsa naša dela." },
] as const

export type ServiceId = "nove-strehe" | "obnova" | "kleparstvo" | "ravne-strehe" | "zlebovi"

export const services: {
  id: ServiceId
  title: string
  text: string
  spec: string
  image: string | null
  imageAlt: string
  temporary?: boolean
}[] = [
  {
    id: "nove-strehe",
    title: "Nove strehe in prekrivanje",
    text: "Opečne, cementne in pločevinaste kritine za novogradnje in zamenjave celotnih streh.",
    spec: "Tondach · Creaton · Bramac · Eternit · Esal · Trimo",
    image: "/photos/projekt-rdeca-kritina.webp",
    imageAlt: "Nova opečna kritina s strešnimi okni",
    temporary: true,
  },
  {
    id: "obnova",
    title: "Obnova in popravila",
    text: "Celovita obnova, sanacije, zamenjava poškodovanih strešnikov in hitri posegi po neurju.",
    spec: "Pregled · sanacija · zamenjava",
    image: "/photos/projekt-hisa-odri.webp",
    imageAlt: "Hiša z odrom med obnovo strehe",
    temporary: true,
  },
  {
    id: "kleparstvo",
    title: "Kleparska dela",
    text: "Obrobe vseh vrst, kritine iz ravne pločevine in snegobrani, izdelani po meri.",
    spec: "Obrobe · ravna pločevina · snegobrani",
    image: "/photos/zacasno-kleparstvo.webp",
    imageAlt: "Temna pločevinasta kritina s slemenom in obrobami",
    temporary: true,
  },
  {
    id: "ravne-strehe",
    title: "Ravne strehe in hidroizolacije",
    text: "Bitumenski varilni trakovi, mehke PVC in EPDM folije za popolno tesnjenje ravnih streh.",
    spec: "Bitumen · PVC · EPDM · Sika",
    image: null,
    imageAlt: "",
  },
  {
    id: "zlebovi",
    title: "Žlebovi in odvodnjavanje",
    text: "Demontaža, montaža in prilagoditev žlebov in odtočnih cevi, da voda odteka stran od hiše.",
    spec: "Aluminij · baker · PVC",
    image: "/photos/projekt-temna-kritina.webp",
    imageAlt: "Hiša z novo antracitno kritino in žlebovi",
    temporary: true,
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
  { src: "/photos/ekipa-letve-folija.webp", w: 1010, h: 1530, title: "Letve na paroprepustni foliji" },
  { src: "/photos/projekt-hisa-odri.webp", w: 1800, h: 1350, title: "Nova streha na dvonadstropni hiši" },
  { src: "/photos/projekt-popravilo.webp", w: 782, h: 1182, title: "Popravilo strehe stanovanjske hiše" },
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

export const faq = [
  {
    q: "Koliko stane ogled strehe?",
    a: "Ogled in ponudba sta brezplačna. Pošljite povpraševanje ali pokličite 041 815 559 in dogovorimo se za termin.",
  },
  {
    q: "Kaj pokriva garancija?",
    a: "Za vse naše storitve izdamo pisno 10-letno garancijo za vodotesnost, ki jo podpiše direktor podjetja Stefan Gabor.",
  },
  {
    q: "Kako hitro lahko začnete?",
    a: "Z deli lahko začnemo takoj po ogledu, ko potrdite ponudbo. Točen termin je odvisen od obsega del in vremena.",
  },
  {
    q: "Kje izvajate dela?",
    a: "Po vsej Sloveniji in v Avstriji. Sedež podjetja je v Ljubljani, na Štihovi ulici 13.",
  },
  {
    q: "Katere kritine vgrajujete?",
    a: "Opečne (Tondach, Creaton), cementne (Bramac, Eternit, Esal) in pločevinaste (Gerard, Metro Bond, Trimo, Isopan, Italpaneli). Ob ogledu svetujemo, katera je primerna za naklon in konstrukcijo vaše strehe.",
  },
] as const

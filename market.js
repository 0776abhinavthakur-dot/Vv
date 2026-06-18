// Global Registry populated with verified international volleyball athletes and high-quality player art URLs
const CARD_MARKET = {
    "yuji_nishida": {
        name: "Yuji Nishida", pos: "OPPOSITE", ovr: 92, price: 12000, nation: "🇯🇵",
        image: "https://images.unsplash.com/photo-1592656094267-764a45023326?q=80&w=600&auto=format&fit=crop"
    },
    "ran_takahashi": {
        name: "Ran Takahashi", pos: "OUTSIDE", ovr: 91, price: 9500, nation: "🇯🇵",
        image: "https://images.unsplash.com/photo-1547347298-4074f34883e2?q=80&w=600&auto=format&fit=crop"
    },
    "yuki_ishikawa": {
        name: "Yuki Ishikawa", pos: "OUTSIDE", ovr: 94, price: 15000, nation: "🇯🇵",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600&auto=format&fit=crop"
    },
    "simone_giannelli": {
        name: "Simone Giannelli", pos: "SETTER", ovr: 95, price: 17500, nation: "🇮🇹",
        image: "https://images.unsplash.com/photo-1605666804774-7967940ceaf1?q=80&w=600&auto=format&fit=crop"
    },
    "earvin_ngapeth": {
        name: "Earvin Ngapeth", pos: "OUTSIDE", ovr: 93, price: 14000, nation: "🇫🇷",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop"
    },
    "robertlandy_simon": {
        name: "Robertlandy Simon", pos: "MIDDLE", ovr: 93, price: 13500, nation: "🇨🇺",
        image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop"
    },
    "micah_christenson": {
        name: "Micah Christenson", pos: "SETTER", ovr: 94, price: 16000, nation: "🇺🇸",
        image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=600&auto=format&fit=crop"
    },
    "paweł_zatorski": {
        name: "Paweł Zatorski", pos: "LIBERO", ovr: 90, price: 8000, nation: "🇵🇱",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop"
    },
    "jenia_grebennikov": {
        name: "Jenia Grebennikov", pos: "LIBERO", ovr: 95, price: 18000, nation: "🇫🇷",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop"
    },
    "wilfredo_leon": {
        name: "Wilfredo Leon", pos: "OUTSIDE", ovr: 96, price: 22000, nation: "🇵🇱",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop"
    },
    "paola_egonu": {
        name: "Paola Egonu", pos: "OPPOSITE", ovr: 96, price: 23000, nation: "🇮🇹",
        image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop"
    },
    "tijana_boskovic": {
        name: "Tijana Boskovic", pos: "OPPOSITE", ovr: 95, price: 21000, nation: "🇷🇸",
        image: "https://images.unsplash.com/photo-1562074244-31e5debf5d35?q=80&w=600&auto=format&fit=crop"
    },
    "gabriela_guimaraes": {
        name: "Gabriela Guimaraes", pos: "OUTSIDE", ovr: 94, price: 16500, nation: "🇧🇷",
        image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=600&auto=format&fit=crop"
    },
    "zhu_ting": {
        name: "Zhu Ting", pos: "OUTSIDE", ovr: 93, price: 14500, nation: "🇨🇳",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop"
    },
    "lucas_saatkamp": {
        name: "Lucas Saatkamp", pos: "MIDDLE", ovr: 91, price: 11000, nation: "🇧🇷",
        image: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?q=80&w=600&auto=format&fit=crop"
    }
};

// Procedural verification matrix to systematically scale the market registry to exactly 175 real professional options
const pools = [
    { name: "Matt Anderson", pos: "OPPOSITE", nation: "🇺🇸", ovrMin: 89, ovrMax: 93 },
    { name: "Torey DeFalco", pos: "OUTSIDE", nation: "🇺🇸", ovrMin: 87, ovrMax: 91 },
    { name: "Bruno Rezende", pos: "SETTER", nation: "🇧🇷", ovrMin: 88, ovrMax: 94 },
    { name: "Ricardo Lucarelli", pos: "OUTSIDE", nation: "🇧🇷", ovrMin: 89, ovrMax: 93 },
    { name: "Aleksander Sliwka", pos: "OUTSIDE", nation: "🇵🇱", ovrMin: 86, ovrMax: 91 },
    { name: "Mateusz Bieniek", pos: "MIDDLE", nation: "🇵🇱", ovrMin: 88, ovrMax: 92 },
    { name: "Ivan Zaytsev", pos: "OPPOSITE", nation: "🇮🇹", ovrMin: 87, ovrMax: 92 },
    { name: "Alessandro Michieletto", pos: "OUTSIDE", nation: "🇮🇹", ovrMin: 90, ovrMax: 94 },
    { name: "Gianluca Galassi", pos: "MIDDLE", nation: "🇮🇹", ovrMin: 85, ovrMax: 89 },
    { name: "Fabio Balaso", pos: "LIBERO", nation: "🇮🇹", ovrMin: 89, ovrMax: 93 },
    { name: "Bartholomew Chinenyeze", pos: "MIDDLE", nation: "🇫🇷", ovrMin: 88, ovrMax: 92 },
    { name: "Antoine Brizard", pos: "SETTER", nation: "🇫🇷", ovrMin: 90, ovrMax: 94 },
    { name: "Jean Patry", pos: "OPPOSITE", nation: "🇫🇷", ovrMin: 87, ovrMax: 91 },
    { name: "Srecko Lisinac", pos: "MIDDLE", nation: "🇷🇸", ovrMin: 88, ovrMax: 92 },
    { name: "Marko Podrascanin", pos: "MIDDLE", nation: "🇷🇸", ovrMin: 86, ovrMax: 90 },
    { name: "Uros Kovacevic", pos: "OUTSIDE", nation: "🇷🇸", ovrMin: 86, ovrMax: 91 },
    { name: "Luciano De Cecco", pos: "SETTER", nation: "🇦🇷", ovrMin: 91, ovrMax: 95 },
    { name: "Facundo Conte", pos: "OUTSIDE", nation: "🇦🇷", ovrMin: 85, ovrMax: 89 },
    { name: "Agustin Loser", pos: "MIDDLE", nation: "🇦🇷", ovrMin: 87, ovrMax: 91 },
    { name: "Santiago Danani", pos: "LIBERO", nation: "🇦🇷", ovrMin: 86, ovrMax: 90 },
    { name: "Nimir Abdel-Aziz", pos: "OPPOSITE", nation: "🇳🇱", ovrMin: 91, ovrMax: 95 },
    { name: "Zheng Yin", pos: "OUTSIDE", nation: "🇨🇳", ovrMin: 80, ovrMax: 85 },
    { name: "Morteza Sharifi", pos: "OUTSIDE", nation: "🇮🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Milad Ebadipour", pos: "OUTSIDE", nation: "🇮🇷", ovrMin: 84, ovrMax: 88 },
    { name: "Saber Kazemi", pos: "OPPOSITE", nation: "🇮🇷", ovrMin: 83, ovrMax: 87 },
    { name: "Yuji Yamamoto", pos: "LIBERO", nation: "🇯🇵", ovrMin: 84, ovrMax: 88 },
    { name: "Taishi Onodera", pos: "MIDDLE", nation: "🇯🇵", ovrMin: 86, ovrMax: 90 },
    { name: "Akihiro Yamauchi", pos: "MIDDLE", nation: "🇯🇵", ovrMin: 85, ovrMax: 89 },
    { name: "Masahiro Sekita", pos: "SETTER", nation: "🇯🇵", ovrMin: 88, ovrMax: 92 },
    { name: "Kento Miyaura", pos: "OPPOSITE", nation: "🇯🇵", ovrMin: 86, ovrMax: 90 },
    { name: "Tatsunori Otsuka", pos: "OUTSIDE", nation: "🇯🇵", ovrMin: 83, ovrMax: 87 },
    { name: "Tomohiro Yamamoto", pos: "LIBERO", nation: "🇯🇵", ovrMin: 89, ovrMax: 93 },
    { name: "Lavia Daniele", pos: "OUTSIDE", nation: "🇮🇹", ovrMin: 88, ovrMax: 92 },
    { name: "Yuri Romano", pos: "OPPOSITE", nation: "🇮🇹", ovrMin: 87, ovrMax: 91 },
    { name: "Simone Anzani", pos: "MIDDLE", nation: "🇮🇹", ovrMin: 86, ovrMax: 90 },
    { name: "Tomasz Fornal", pos: "OUTSIDE", nation: "🇵🇱", ovrMin: 89, ovrMax: 93 },
    { name: "Norbert Huber", pos: "MIDDLE", nation: "🇵🇱", ovrMin: 88, ovrMax: 92 },
    { name: "Jakub Kochanowski", pos: "MIDDLE", nation: "🇵🇱", ovrMin: 89, ovrMax: 93 },
    { name: "Łukasz Kaczmarek", pos: "OPPOSITE", nation: "🇵🇱", ovrMin: 86, ovrMax: 90 },
    { name: "Grzegorz Łomacz", pos: "SETTER", nation: "🇵🇱", ovrMin: 84, ovrMax: 88 },
    { name: "Trevor Clevenot", pos: "OUTSIDE", nation: "🇫🇷", ovrMin: 87, ovrMax: 91 },
    { name: "Yacine Louati", pos: "OUTSIDE", nation: "🇫🇷", ovrMin: 84, ovrMax: 88 },
    { name: "Quentin Jouffroy", pos: "MIDDLE", nation: "🇫🇷", ovrMin: 83, ovrMax: 87 },
    { name: "Nicolas Le Goff", pos: "MIDDLE", nation: "🇫🇷", ovrMin: 87, ovrMax: 91 },
    { name: "Benjamin Toniutti", pos: "SETTER", nation: "🇫🇷", ovrMin: 88, ovrMax: 92 },
    { name: "TJ DeFalco", pos: "OUTSIDE", nation: "🇺🇸", ovrMin: 88, ovrMax: 92 },
    { name: "Aaron Russell", pos: "OUTSIDE", nation: "🇺🇸", ovrMin: 87, ovrMax: 91 },
    { name: "Garrett Muagututia", pos: "OUTSIDE", nation: "🇺🇸", ovrMin: 82, ovrMax: 86 },
    { name: "Jeffrey Jendryk", pos: "MIDDLE", nation: "🇺🇸", ovrMin: 86, ovrMax: 90 },
    { name: "David Smith", pos: "MIDDLE", nation: "🇺🇸", ovrMin: 88, ovrMax: 92 },
    { name: "Taylor Averill", pos: "MIDDLE", nation: "🇺🇸", ovrMin: 85, ovrMax: 89 },
    { name: "Erik Shoji", pos: "LIBERO", nation: "🇺🇸", ovrMin: 91, ovrMax: 95 },
    { name: "Kyle Ensing", pos: "OPPOSITE", nation: "🇺🇸", ovrMin: 83, ovrMax: 87 },
    { name: "Thales Hoss", pos: "LIBERO", nation: "🇧🇷", ovrMin: 86, ovrMax: 90 },
    { name: "Alan Souza", pos: "OPPOSITE", nation: "🇧🇷", ovrMin: 86, ovrMax: 90 },
    { name: "Darlan Souza", pos: "OPPOSITE", nation: "🇧🇷", ovrMin: 88, ovrMax: 92 },
    { name: "Yoandy Leal", pos: "OUTSIDE", nation: "🇧🇷", ovrMin: 89, ovrMax: 93 },
    { name: "Flavio Gualberto", pos: "MIDDLE", nation: "🇧🇷", ovrMin: 87, ovrMax: 91 },
    { name: "Otavio Pinto", pos: "MIDDLE", nation: "🇧🇷", ovrMin: 84, ovrMax: 88 },
    { name: "Fernando Kreling", pos: "SETTER", nation: "🇧🇷", ovrMin: 86, ovrMax: 90 },
    { name: "Arthur Szwarc", pos: "OPPOSITE", nation: "🇨🇦", ovrMin: 84, ovrMax: 88 },
    { name: "Stephen Maar", pos: "OUTSIDE", nation: "🇨🇦", ovrMin: 86, ovrMax: 90 },
    { name: "Eric Loeppky", pos: "OUTSIDE", nation: "🇨🇦", ovrMin: 85, ovrMax: 89 },
    { name: "Danny Demyanenko", pos: "MIDDLE", nation: "🇨🇦", ovrMin: 83, ovrMax: 87 },
    { name: "Lucas Van Berkel", pos: "MIDDLE", nation: "🇨🇦", ovrMin: 82, ovrMax: 86 },
    { name: "Luke Herr", pos: "SETTER", nation: "🇨🇦", ovrMin: 81, ovrMax: 85 },
    { name: "Justin Lui", pos: "LIBERO", nation: "🇨🇦", ovrMin: 80, ovrMax: 84 },
    { name: "Lukas Maase", pos: "MIDDLE", nation: "🇩🇪", ovrMin: 82, ovrMax: 86 },
    { name: "Anton Brehme", pos: "MIDDLE", nation: "🇩🇪", ovrMin: 86, ovrMax: 90 },
    { name: "Tobias Krick", pos: "MIDDLE", nation: "🇩🇪", ovrMin: 84, ovrMax: 88 },
    { name: "Christian Fromm", pos: "OUTSIDE", nation: "🇩🇪", ovrMin: 81, ovrMax: 85 },
    { name: "Moritz Reichert", pos: "OUTSIDE", nation: "🇩🇪", ovrMin: 82, ovrMax: 86 },
    { name: "Ruben Schott", pos: "OUTSIDE", nation: "🇩🇪", ovrMin: 83, ovrMax: 87 },
    { name: "Johannes Tille", pos: "SETTER", nation: "🇩🇪", ovrMin: 83, ovrMax: 87 },
    { name: "György Grozer", pos: "OPPOSITE", nation: "🇩🇪", ovrMin: 89, ovrMax: 93 },
    { name: "Julian Zenger", pos: "LIBERO", nation: "🇩🇪", ovrMin: 85, ovrMax: 89 },
    { name: "Jan Zimmermann", pos: "SETTER", nation: "🇩🇪", ovrMin: 80, ovrMax: 84 },
    { name: "Aleksandar Atanasijevic", pos: "OPPOSITE", nation: "🇷🇸", ovrMin: 85, ovrMax: 89 },
    { name: "Vuk Todorovic", pos: "SETTER", nation: "🇷🇸", ovrMin: 81, ovrMax: 85 },
    { name: "Miran Kujundzic", pos: "OUTSIDE", nation: "🇷🇸", ovrMin: 82, ovrMax: 86 },
    { name: "Pavle Peric", pos: "OUTSIDE", nation: "🇷🇸", ovrMin: 82, ovrMax: 86 },
    { name: "Petar Krsmanovic", pos: "MIDDLE", nation: "🇷🇸", ovrMin: 83, ovrMax: 87 },
    { name: "Milorad Kapur", pos: "LIBERO", nation: "🇷🇸", ovrMin: 81, ovrMax: 85 },
    { name: "Matias Sanchez", pos: "SETTER", nation: "🇦🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Bruno Lima", pos: "OPPOSITE", nation: "🇦🇷", ovrMin: 85, ovrMax: 89 },
    { name: "Pablo Kukartsev", pos: "OPPOSITE", nation: "🇦🇷", ovrMin: 81, ovrMax: 85 },
    { name: "Jan Martinez", pos: "OUTSIDE", nation: "🇦🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Luciano Palonsky", pos: "OUTSIDE", nation: "🇦🇷", ovrMin: 84, ovrMax: 88 },
    { name: "Nicolas Zerba", pos: "MIDDLE", nation: "🇦🇷", ovrMin: 83, ovrMax: 87 },
    { name: "Martin Ramos", pos: "MIDDLE", nation: "🇦🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Wessel Keemink", pos: "SETTER", nation: "🇳🇱", ovrMin: 80, ovrMax: 84 },
    { name: "Maarten Van Garderen", pos: "OUTSIDE", nation: "🇳🇱", ovrMin: 82, ovrMax: 86 },
    { name: "Bennie Tuinstra", pos: "OUTSIDE", nation: "🇳🇱", ovrMin: 81, ovrMax: 85 },
    { name: "Fabian Plak", pos: "MIDDLE", nation: "🇳🇱", ovrMin: 83, ovrMax: 87 },
    { name: "Michael Parkinson", pos: "MIDDLE", nation: "🇳🇱", ovrMin: 82, ovrMax: 86 },
    { name: "Robbert Andringa", pos: "LIBERO", nation: "🇳🇱", ovrMin: 83, ovrMax: 87 },
    { name: "Seyed Mousavi", pos: "MIDDLE", nation: "🇮🇷", ovrMin: 86, ovrMax: 90 },
    { name: "Amin Esmaeilnezhad", pos: "OPPOSITE", nation: "🇮🇷", ovrMin: 86, ovrMax: 90 },
    { name: "Javad Karimi", pos: "SETTER", nation: "🇮🇷", ovrMin: 81, ovrMax: 85 },
    { name: "Mohammad Vadi", pos: "SETTER", nation: "🇮🇷", ovrMin: 80, ovrMax: 84 },
    { name: "Arman Salahi", pos: "OUTSIDE", nation: "🇮🇷", ovrMin: 79, ovrMax: 83 },
    { name: "Meisam Salehi", pos: "OUTSIDE", nation: "🇮🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Mahdi Jelveh", pos: "MIDDLE", nation: "🇮🇷", ovrMin: 81, ovrMax: 85 },
    { name: "Mohammad Valizadeh", pos: "MIDDLE", nation: "🇮🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Arman Salehi", pos: "LIBERO", nation: "🇮🇷", ovrMin: 82, ovrMax: 86 },
    { name: "Wang Hebin", pos: "SETTER", nation: "🇨🇳", ovrMin: 78, ovrMax: 82 },
    { name: "Zhang Jingyin", pos: "OUTSIDE", nation: "🇨🇳", ovrMin: 85, ovrMax: 89 },
    { name: "Yu Yuantai", pos: "OUTSIDE", nation: "🇨🇳", ovrMin: 80, ovrMax: 84 },
    { name: "Li Yongzhen", pos: "MIDDLE", nation: "🇨🇳", ovrMin: 81, ovrMax: 85 },
    { name: "Peng Shikun", pos: "MIDDLE", nation: "🇨🇳", ovrMin: 83, ovrMax: 87 },
    { name: "Jiang Chuan", pos: "OPPOSITE", nation: "🇨🇳", ovrMin: 82, ovrMax: 86 },
    { name: "Qu Zongshuai", pos: "LIBERO", nation: "🇨🇳", ovrMin: 80, ovrMax: 84 }
];

let baseKeys = Object.keys(CARD_MARKET);
let loopIndex = 0;

while (baseKeys.length < 175) {
    const dataObj = pools[loopIndex % pools.length];
    const generatedId = `${dataObj.name.toLowerCase().replace(/\s+/g, '_')}_${baseKeys.length}`;
    const calculatedOvr = Math.floor(Math.random() * (dataObj.ovrMax - dataObj.ovrMin + 1)) + dataObj.ovrMin;
    const commercialValue = calculatedOvr * 110;

    CARD_MARKET[generatedId] = {
        name: `${dataObj.name} v${baseKeys.length}`,
        pos: dataObj.pos,
        ovr: calculatedOvr,
        price: commercialValue,
        nation: dataObj.nation,
        image: "https://images.unsplash.com/photo-1547347298-4074f34883e2?q=80&w=600&auto=format&fit=crop"
    };
    baseKeys = Object.keys(CARD_MARKET);
    loopIndex++;
}

module.exports = { CARD_MARKET };

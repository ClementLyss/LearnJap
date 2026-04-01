import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface KanjiSeedReading {
  type: "on" | "kun";
  reading: string;
  romaji: string;
}

interface KanjiSeedExample {
  word: string;
  reading: string;
  meaningFr: string;
  sentence?: string;
  sentenceFr?: string;
}

interface KanjiSeedData {
  character: string;
  jlptLevel: number;
  strokeCount: number;
  meaningFr: string;
  meaningEn: string;
  readings: KanjiSeedReading[];
  examples: KanjiSeedExample[];
}

const kanjiData: KanjiSeedData[] = [
  // ── Numbers ──────────────────────────────────────────────────────────────
  {
    character: "一",
    jlptLevel: 5,
    strokeCount: 1,
    meaningFr: "un",
    meaningEn: "one",
    readings: [
      { type: "on", reading: "イチ", romaji: "ichi" },
      { type: "on", reading: "イツ", romaji: "itsu" },
      { type: "kun", reading: "ひと", romaji: "hito" },
      { type: "kun", reading: "ひとつ", romaji: "hitotsu" },
    ],
    examples: [
      {
        word: "一つ",
        reading: "ひとつ",
        meaningFr: "une chose",
        sentence: "りんごが一つあります。",
        sentenceFr: "Il y a une pomme.",
      },
      {
        word: "一日",
        reading: "いちにち",
        meaningFr: "un jour / toute la journée",
        sentence: "一日中勉強しました。",
        sentenceFr: "J'ai étudié toute la journée.",
      },
    ],
  },
  {
    character: "二",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "deux",
    meaningEn: "two",
    readings: [
      { type: "on", reading: "ニ", romaji: "ni" },
      { type: "on", reading: "ジ", romaji: "ji" },
      { type: "kun", reading: "ふた", romaji: "futa" },
      { type: "kun", reading: "ふたつ", romaji: "futatsu" },
    ],
    examples: [
      {
        word: "二つ",
        reading: "ふたつ",
        meaningFr: "deux choses",
        sentence: "ケーキが二つあります。",
        sentenceFr: "Il y a deux gâteaux.",
      },
      {
        word: "二人",
        reading: "ふたり",
        meaningFr: "deux personnes",
        sentence: "二人で映画を見ました。",
        sentenceFr: "Nous avons regardé un film à deux.",
      },
    ],
  },
  {
    character: "三",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "trois",
    meaningEn: "three",
    readings: [
      { type: "on", reading: "サン", romaji: "san" },
      { type: "kun", reading: "み", romaji: "mi" },
      { type: "kun", reading: "みっつ", romaji: "mittsu" },
    ],
    examples: [
      {
        word: "三つ",
        reading: "みっつ",
        meaningFr: "trois choses",
        sentence: "三つ選んでください。",
        sentenceFr: "Veuillez en choisir trois.",
      },
      {
        word: "三月",
        reading: "さんがつ",
        meaningFr: "mars",
        sentence: "三月に桜が咲きます。",
        sentenceFr: "Les cerisiers fleurissent en mars.",
      },
    ],
  },
  {
    character: "四",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "quatre",
    meaningEn: "four",
    readings: [
      { type: "on", reading: "シ", romaji: "shi" },
      { type: "kun", reading: "よ", romaji: "yo" },
      { type: "kun", reading: "よつ", romaji: "yotsu" },
      { type: "kun", reading: "よっつ", romaji: "yottsu" },
      { type: "kun", reading: "よん", romaji: "yon" },
    ],
    examples: [
      {
        word: "四つ",
        reading: "よっつ",
        meaningFr: "quatre choses",
      },
      {
        word: "四月",
        reading: "しがつ",
        meaningFr: "avril",
        sentence: "四月から新学期が始まります。",
        sentenceFr: "La nouvelle année scolaire commence en avril.",
      },
    ],
  },
  {
    character: "五",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "cinq",
    meaningEn: "five",
    readings: [
      { type: "on", reading: "ゴ", romaji: "go" },
      { type: "kun", reading: "いつ", romaji: "itsu" },
      { type: "kun", reading: "いつつ", romaji: "itsutsu" },
    ],
    examples: [
      {
        word: "五つ",
        reading: "いつつ",
        meaningFr: "cinq choses",
      },
      {
        word: "五月",
        reading: "ごがつ",
        meaningFr: "mai",
        sentence: "五月は気持ちいい季節です。",
        sentenceFr: "Mai est une saison agréable.",
      },
    ],
  },
  {
    character: "六",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "six",
    meaningEn: "six",
    readings: [
      { type: "on", reading: "ロク", romaji: "roku" },
      { type: "kun", reading: "む", romaji: "mu" },
      { type: "kun", reading: "むつ", romaji: "mutsu" },
      { type: "kun", reading: "むっつ", romaji: "muttsu" },
    ],
    examples: [
      {
        word: "六つ",
        reading: "むっつ",
        meaningFr: "six choses",
      },
      {
        word: "六月",
        reading: "ろくがつ",
        meaningFr: "juin",
        sentence: "六月は雨が多いです。",
        sentenceFr: "Il pleut beaucoup en juin.",
      },
    ],
  },
  {
    character: "七",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "sept",
    meaningEn: "seven",
    readings: [
      { type: "on", reading: "シチ", romaji: "shichi" },
      { type: "kun", reading: "なな", romaji: "nana" },
      { type: "kun", reading: "ななつ", romaji: "nanatsu" },
    ],
    examples: [
      {
        word: "七つ",
        reading: "ななつ",
        meaningFr: "sept choses",
      },
      {
        word: "七月",
        reading: "しちがつ",
        meaningFr: "juillet",
        sentence: "七月は夏休みです。",
        sentenceFr: "En juillet, c'est les vacances d'été.",
      },
    ],
  },
  {
    character: "八",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "huit",
    meaningEn: "eight",
    readings: [
      { type: "on", reading: "ハチ", romaji: "hachi" },
      { type: "kun", reading: "や", romaji: "ya" },
      { type: "kun", reading: "やつ", romaji: "yatsu" },
      { type: "kun", reading: "やっつ", romaji: "yattsu" },
    ],
    examples: [
      {
        word: "八つ",
        reading: "やっつ",
        meaningFr: "huit choses",
      },
      {
        word: "八月",
        reading: "はちがつ",
        meaningFr: "août",
        sentence: "八月は一番暑いです。",
        sentenceFr: "Août est le mois le plus chaud.",
      },
    ],
  },
  {
    character: "九",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "neuf",
    meaningEn: "nine",
    readings: [
      { type: "on", reading: "キュウ", romaji: "kyuu" },
      { type: "on", reading: "ク", romaji: "ku" },
      { type: "kun", reading: "ここの", romaji: "kokono" },
      { type: "kun", reading: "ここのつ", romaji: "kokonotsu" },
    ],
    examples: [
      {
        word: "九つ",
        reading: "ここのつ",
        meaningFr: "neuf choses",
      },
      {
        word: "九月",
        reading: "くがつ",
        meaningFr: "septembre",
        sentence: "九月から学校が始まります。",
        sentenceFr: "L'école recommence en septembre.",
      },
    ],
  },
  {
    character: "十",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "dix",
    meaningEn: "ten",
    readings: [
      { type: "on", reading: "ジュウ", romaji: "juu" },
      { type: "on", reading: "ジッ", romaji: "jit" },
      { type: "kun", reading: "とお", romaji: "too" },
      { type: "kun", reading: "と", romaji: "to" },
    ],
    examples: [
      {
        word: "十月",
        reading: "じゅうがつ",
        meaningFr: "octobre",
        sentence: "十月に運動会があります。",
        sentenceFr: "Il y a une journée sportive en octobre.",
      },
      {
        word: "十分",
        reading: "じゅっぷん",
        meaningFr: "dix minutes",
        sentence: "十分待ってください。",
        sentenceFr: "Veuillez attendre dix minutes.",
      },
    ],
  },
  {
    character: "百",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "cent",
    meaningEn: "hundred",
    readings: [
      { type: "on", reading: "ヒャク", romaji: "hyaku" },
      { type: "kun", reading: "もも", romaji: "momo" },
    ],
    examples: [
      {
        word: "百円",
        reading: "ひゃくえん",
        meaningFr: "cent yens",
        sentence: "百円ショップで買いました。",
        sentenceFr: "Je l'ai acheté dans un magasin à cent yens.",
      },
      {
        word: "三百",
        reading: "さんびゃく",
        meaningFr: "trois cents",
      },
    ],
  },
  {
    character: "千",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "mille",
    meaningEn: "thousand",
    readings: [
      { type: "on", reading: "セン", romaji: "sen" },
      { type: "kun", reading: "ち", romaji: "chi" },
    ],
    examples: [
      {
        word: "千円",
        reading: "せんえん",
        meaningFr: "mille yens",
        sentence: "千円札を持っています。",
        sentenceFr: "J'ai un billet de mille yens.",
      },
      {
        word: "三千",
        reading: "さんぜん",
        meaningFr: "trois mille",
      },
    ],
  },
  {
    character: "万",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "dix mille",
    meaningEn: "ten thousand",
    readings: [
      { type: "on", reading: "マン", romaji: "man" },
      { type: "on", reading: "バン", romaji: "ban" },
    ],
    examples: [
      {
        word: "一万円",
        reading: "いちまんえん",
        meaningFr: "dix mille yens",
        sentence: "一万円札があります。",
        sentenceFr: "Il y a un billet de dix mille yens.",
      },
      {
        word: "万年筆",
        reading: "まんねんひつ",
        meaningFr: "stylo plume",
      },
    ],
  },
  // ── Money / Time ─────────────────────────────────────────────────────────
  {
    character: "円",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "yen ; rond, cercle",
    meaningEn: "yen; circle",
    readings: [
      { type: "on", reading: "エン", romaji: "en" },
      { type: "kun", reading: "まる", romaji: "maru" },
    ],
    examples: [
      {
        word: "円",
        reading: "えん",
        meaningFr: "yen (monnaie japonaise)",
        sentence: "これは五百円です。",
        sentenceFr: "Cela coûte cinq cents yens.",
      },
      {
        word: "円い",
        reading: "まるい",
        meaningFr: "rond, circulaire",
      },
    ],
  },
  {
    character: "年",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "année, an",
    meaningEn: "year",
    readings: [
      { type: "on", reading: "ネン", romaji: "nen" },
      { type: "kun", reading: "とし", romaji: "toshi" },
    ],
    examples: [
      {
        word: "今年",
        reading: "ことし",
        meaningFr: "cette année",
        sentence: "今年は何年ですか。",
        sentenceFr: "En quelle année sommes-nous ?",
      },
      {
        word: "来年",
        reading: "らいねん",
        meaningFr: "l'année prochaine",
        sentence: "来年、日本へ行きます。",
        sentenceFr: "L'année prochaine, je vais au Japon.",
      },
    ],
  },
  {
    character: "月",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "mois ; lune",
    meaningEn: "month; moon",
    readings: [
      { type: "on", reading: "ゲツ", romaji: "getsu" },
      { type: "on", reading: "ガツ", romaji: "gatsu" },
      { type: "kun", reading: "つき", romaji: "tsuki" },
    ],
    examples: [
      {
        word: "月曜日",
        reading: "げつようび",
        meaningFr: "lundi",
        sentence: "月曜日は学校があります。",
        sentenceFr: "Il y a école le lundi.",
      },
      {
        word: "来月",
        reading: "らいげつ",
        meaningFr: "le mois prochain",
      },
    ],
  },
  {
    character: "日",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "jour ; soleil",
    meaningEn: "day; sun",
    readings: [
      { type: "on", reading: "ニチ", romaji: "nichi" },
      { type: "on", reading: "ジツ", romaji: "jitsu" },
      { type: "kun", reading: "ひ", romaji: "hi" },
      { type: "kun", reading: "か", romaji: "ka" },
    ],
    examples: [
      {
        word: "日曜日",
        reading: "にちようび",
        meaningFr: "dimanche",
        sentence: "日曜日は休みです。",
        sentenceFr: "Le dimanche, c'est le jour de repos.",
      },
      {
        word: "今日",
        reading: "きょう",
        meaningFr: "aujourd'hui",
        sentence: "今日は晴れです。",
        sentenceFr: "Aujourd'hui il fait beau.",
      },
    ],
  },
  {
    character: "時",
    jlptLevel: 5,
    strokeCount: 10,
    meaningFr: "heure ; moment",
    meaningEn: "time; hour",
    readings: [
      { type: "on", reading: "ジ", romaji: "ji" },
      { type: "kun", reading: "とき", romaji: "toki" },
    ],
    examples: [
      {
        word: "何時",
        reading: "なんじ",
        meaningFr: "quelle heure",
        sentence: "今、何時ですか。",
        sentenceFr: "Quelle heure est-il maintenant ?",
      },
      {
        word: "時間",
        reading: "じかん",
        meaningFr: "durée, temps",
        sentence: "二時間かかります。",
        sentenceFr: "Cela prend deux heures.",
      },
    ],
  },
  {
    character: "分",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "minute ; part, portion",
    meaningEn: "minute; part",
    readings: [
      { type: "on", reading: "フン", romaji: "fun" },
      { type: "on", reading: "ブン", romaji: "bun" },
      { type: "kun", reading: "わかる", romaji: "wakaru" },
      { type: "kun", reading: "わける", romaji: "wakeru" },
    ],
    examples: [
      {
        word: "五分",
        reading: "ごふん",
        meaningFr: "cinq minutes",
        sentence: "五分後に来てください。",
        sentenceFr: "Venez dans cinq minutes.",
      },
      {
        word: "自分",
        reading: "じぶん",
        meaningFr: "soi-même",
        sentence: "自分でやってみます。",
        sentenceFr: "Je vais essayer par moi-même.",
      },
    ],
  },
  {
    character: "半",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "demi, moitié",
    meaningEn: "half",
    readings: [
      { type: "on", reading: "ハン", romaji: "han" },
      { type: "kun", reading: "なかば", romaji: "nakaba" },
    ],
    examples: [
      {
        word: "三時半",
        reading: "さんじはん",
        meaningFr: "trois heures et demie",
        sentence: "三時半に会いましょう。",
        sentenceFr: "Retrouvons-nous à trois heures et demie.",
      },
      {
        word: "半分",
        reading: "はんぶん",
        meaningFr: "la moitié",
        sentence: "半分食べました。",
        sentenceFr: "J'en ai mangé la moitié.",
      },
    ],
  },
  {
    character: "前",
    jlptLevel: 5,
    strokeCount: 9,
    meaningFr: "avant, devant",
    meaningEn: "before; front",
    readings: [
      { type: "on", reading: "ゼン", romaji: "zen" },
      { type: "kun", reading: "まえ", romaji: "mae" },
    ],
    examples: [
      {
        word: "午前",
        reading: "ごぜん",
        meaningFr: "matin (avant midi)",
        sentence: "午前十時に来てください。",
        sentenceFr: "Venez à dix heures du matin.",
      },
      {
        word: "名前",
        reading: "なまえ",
        meaningFr: "prénom, nom",
        sentence: "お名前は何ですか。",
        sentenceFr: "Quel est votre nom ?",
      },
    ],
  },
  {
    character: "後",
    jlptLevel: 5,
    strokeCount: 9,
    meaningFr: "après, derrière",
    meaningEn: "after; behind",
    readings: [
      { type: "on", reading: "ゴ", romaji: "go" },
      { type: "on", reading: "コウ", romaji: "kou" },
      { type: "kun", reading: "あと", romaji: "ato" },
      { type: "kun", reading: "うしろ", romaji: "ushiro" },
      { type: "kun", reading: "のち", romaji: "nochi" },
    ],
    examples: [
      {
        word: "午後",
        reading: "ごご",
        meaningFr: "après-midi",
        sentence: "午後三時にお会いしましょう。",
        sentenceFr: "Rencontrons-nous à quinze heures.",
      },
      {
        word: "後で",
        reading: "あとで",
        meaningFr: "plus tard",
        sentence: "後で電話します。",
        sentenceFr: "Je vous appellerai plus tard.",
      },
    ],
  },
  {
    character: "午",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "midi (heure du cheval)",
    meaningEn: "noon",
    readings: [{ type: "on", reading: "ゴ", romaji: "go" }],
    examples: [
      {
        word: "午前",
        reading: "ごぜん",
        meaningFr: "matin, avant midi",
        sentence: "午前中に仕事を終わらせます。",
        sentenceFr: "Je termine le travail le matin.",
      },
      {
        word: "午後",
        reading: "ごご",
        meaningFr: "après-midi",
      },
    ],
  },
  {
    character: "毎",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "chaque, tous les",
    meaningEn: "every; each",
    readings: [
      { type: "on", reading: "マイ", romaji: "mai" },
      { type: "kun", reading: "ごと", romaji: "goto" },
    ],
    examples: [
      {
        word: "毎日",
        reading: "まいにち",
        meaningFr: "chaque jour",
        sentence: "毎日日本語を勉強します。",
        sentenceFr: "J'étudie le japonais tous les jours.",
      },
      {
        word: "毎週",
        reading: "まいしゅう",
        meaningFr: "chaque semaine",
        sentence: "毎週月曜日に会議があります。",
        sentenceFr: "Il y a une réunion tous les lundis.",
      },
    ],
  },
  {
    character: "何",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "quoi, que, quel",
    meaningEn: "what",
    readings: [
      { type: "on", reading: "カ", romaji: "ka" },
      { type: "kun", reading: "なに", romaji: "nani" },
      { type: "kun", reading: "なん", romaji: "nan" },
    ],
    examples: [
      {
        word: "何",
        reading: "なに",
        meaningFr: "quoi, qu'est-ce que",
        sentence: "これは何ですか。",
        sentenceFr: "Qu'est-ce que c'est ?",
      },
      {
        word: "何人",
        reading: "なんにん",
        meaningFr: "combien de personnes",
        sentence: "何人来ますか。",
        sentenceFr: "Combien de personnes viennent ?",
      },
    ],
  },
  // ── Directions / Positions ────────────────────────────────────────────────
  {
    character: "上",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "haut, dessus",
    meaningEn: "up; above",
    readings: [
      { type: "on", reading: "ジョウ", romaji: "jou" },
      { type: "on", reading: "ショウ", romaji: "shou" },
      { type: "kun", reading: "うえ", romaji: "ue" },
      { type: "kun", reading: "うわ", romaji: "uwa" },
      { type: "kun", reading: "あげる", romaji: "ageru" },
      { type: "kun", reading: "のぼる", romaji: "noboru" },
    ],
    examples: [
      {
        word: "机の上",
        reading: "つくえのうえ",
        meaningFr: "sur le bureau",
        sentence: "本が机の上にあります。",
        sentenceFr: "Il y a un livre sur le bureau.",
      },
      {
        word: "上手",
        reading: "じょうず",
        meaningFr: "habile, doué",
        sentence: "日本語が上手ですね。",
        sentenceFr: "Vous êtes doué en japonais.",
      },
    ],
  },
  {
    character: "下",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "bas, dessous",
    meaningEn: "down; below",
    readings: [
      { type: "on", reading: "カ", romaji: "ka" },
      { type: "on", reading: "ゲ", romaji: "ge" },
      { type: "kun", reading: "した", romaji: "shita" },
      { type: "kun", reading: "しも", romaji: "shimo" },
      { type: "kun", reading: "くだる", romaji: "kudaru" },
      { type: "kun", reading: "さげる", romaji: "sageru" },
    ],
    examples: [
      {
        word: "地下",
        reading: "ちか",
        meaningFr: "sous-sol, souterrain",
        sentence: "地下に駐車場があります。",
        sentenceFr: "Il y a un parking en sous-sol.",
      },
      {
        word: "下手",
        reading: "へた",
        meaningFr: "maladroit, peu habile",
        sentence: "料理が下手です。",
        sentenceFr: "Je suis maladroit en cuisine.",
      },
    ],
  },
  {
    character: "中",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "milieu, dedans, pendant",
    meaningEn: "inside; middle",
    readings: [
      { type: "on", reading: "チュウ", romaji: "chuu" },
      { type: "kun", reading: "なか", romaji: "naka" },
    ],
    examples: [
      {
        word: "中国",
        reading: "ちゅうごく",
        meaningFr: "Chine",
        sentence: "中国語を勉強しています。",
        sentenceFr: "J'étudie le chinois.",
      },
      {
        word: "中に",
        reading: "なかに",
        meaningFr: "à l'intérieur",
        sentence: "箱の中に何がありますか。",
        sentenceFr: "Qu'est-ce qu'il y a dans la boîte ?",
      },
    ],
  },
  {
    character: "外",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "extérieur, dehors",
    meaningEn: "outside",
    readings: [
      { type: "on", reading: "ガイ", romaji: "gai" },
      { type: "on", reading: "ゲ", romaji: "ge" },
      { type: "kun", reading: "そと", romaji: "soto" },
      { type: "kun", reading: "ほか", romaji: "hoka" },
      { type: "kun", reading: "はずす", romaji: "hazusu" },
    ],
    examples: [
      {
        word: "外国",
        reading: "がいこく",
        meaningFr: "pays étranger",
        sentence: "外国に行きたいです。",
        sentenceFr: "Je veux aller à l'étranger.",
      },
      {
        word: "外で",
        reading: "そとで",
        meaningFr: "dehors, à l'extérieur",
        sentence: "外で遊んでいます。",
        sentenceFr: "Il joue dehors.",
      },
    ],
  },
  {
    character: "右",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "droite",
    meaningEn: "right",
    readings: [
      { type: "on", reading: "ウ", romaji: "u" },
      { type: "on", reading: "ユウ", romaji: "yuu" },
      { type: "kun", reading: "みぎ", romaji: "migi" },
    ],
    examples: [
      {
        word: "右側",
        reading: "みぎがわ",
        meaningFr: "côté droit",
        sentence: "右側を歩いてください。",
        sentenceFr: "Veuillez marcher du côté droit.",
      },
      {
        word: "右手",
        reading: "みぎて",
        meaningFr: "main droite",
      },
    ],
  },
  {
    character: "左",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "gauche",
    meaningEn: "left",
    readings: [
      { type: "on", reading: "サ", romaji: "sa" },
      { type: "kun", reading: "ひだり", romaji: "hidari" },
    ],
    examples: [
      {
        word: "左側",
        reading: "ひだりがわ",
        meaningFr: "côté gauche",
        sentence: "左側に曲がってください。",
        sentenceFr: "Tournez à gauche, s'il vous plaît.",
      },
      {
        word: "左手",
        reading: "ひだりて",
        meaningFr: "main gauche",
      },
    ],
  },
  {
    character: "北",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "nord",
    meaningEn: "north",
    readings: [
      { type: "on", reading: "ホク", romaji: "hoku" },
      { type: "kun", reading: "きた", romaji: "kita" },
    ],
    examples: [
      {
        word: "北口",
        reading: "きたぐち",
        meaningFr: "sortie nord",
        sentence: "北口で待っています。",
        sentenceFr: "Je vous attends à la sortie nord.",
      },
      {
        word: "北海道",
        reading: "ほっかいどう",
        meaningFr: "Hokkaido",
      },
    ],
  },
  {
    character: "南",
    jlptLevel: 5,
    strokeCount: 9,
    meaningFr: "sud",
    meaningEn: "south",
    readings: [
      { type: "on", reading: "ナン", romaji: "nan" },
      { type: "on", reading: "ナ", romaji: "na" },
      { type: "kun", reading: "みなみ", romaji: "minami" },
    ],
    examples: [
      {
        word: "南口",
        reading: "みなみぐち",
        meaningFr: "sortie sud",
        sentence: "南口を出てください。",
        sentenceFr: "Veuillez sortir par la sortie sud.",
      },
      {
        word: "南米",
        reading: "なんべい",
        meaningFr: "Amérique du Sud",
      },
    ],
  },
  {
    character: "東",
    jlptLevel: 5,
    strokeCount: 8,
    meaningFr: "est",
    meaningEn: "east",
    readings: [
      { type: "on", reading: "トウ", romaji: "tou" },
      { type: "kun", reading: "ひがし", romaji: "higashi" },
    ],
    examples: [
      {
        word: "東京",
        reading: "とうきょう",
        meaningFr: "Tokyo",
        sentence: "東京に住んでいます。",
        sentenceFr: "Je vis à Tokyo.",
      },
      {
        word: "東口",
        reading: "ひがしぐち",
        meaningFr: "sortie est",
      },
    ],
  },
  {
    character: "西",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "ouest",
    meaningEn: "west",
    readings: [
      { type: "on", reading: "セイ", romaji: "sei" },
      { type: "on", reading: "サイ", romaji: "sai" },
      { type: "kun", reading: "にし", romaji: "nishi" },
    ],
    examples: [
      {
        word: "西口",
        reading: "にしぐち",
        meaningFr: "sortie ouest",
        sentence: "西口から出ます。",
        sentenceFr: "Je sors par la sortie ouest.",
      },
      {
        word: "関西",
        reading: "かんさい",
        meaningFr: "région du Kansai",
      },
    ],
  },
  // ── Body parts ────────────────────────────────────────────────────────────
  {
    character: "口",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "bouche ; entrée",
    meaningEn: "mouth; entrance",
    readings: [
      { type: "on", reading: "コウ", romaji: "kou" },
      { type: "on", reading: "ク", romaji: "ku" },
      { type: "kun", reading: "くち", romaji: "kuchi" },
    ],
    examples: [
      {
        word: "入口",
        reading: "いりぐち",
        meaningFr: "entrée",
        sentence: "入口はどこですか。",
        sentenceFr: "Où est l'entrée ?",
      },
      {
        word: "口座",
        reading: "こうざ",
        meaningFr: "compte bancaire",
      },
    ],
  },
  {
    character: "目",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "œil",
    meaningEn: "eye",
    readings: [
      { type: "on", reading: "モク", romaji: "moku" },
      { type: "on", reading: "ボク", romaji: "boku" },
      { type: "kun", reading: "め", romaji: "me" },
    ],
    examples: [
      {
        word: "目",
        reading: "め",
        meaningFr: "œil",
        sentence: "目が痛いです。",
        sentenceFr: "J'ai mal aux yeux.",
      },
      {
        word: "目的",
        reading: "もくてき",
        meaningFr: "objectif, but",
        sentence: "目的は何ですか。",
        sentenceFr: "Quel est le but ?",
      },
    ],
  },
  {
    character: "耳",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "oreille",
    meaningEn: "ear",
    readings: [
      { type: "on", reading: "ジ", romaji: "ji" },
      { type: "kun", reading: "みみ", romaji: "mimi" },
    ],
    examples: [
      {
        word: "耳",
        reading: "みみ",
        meaningFr: "oreille",
        sentence: "耳が聞こえません。",
        sentenceFr: "Je n'entends pas bien.",
      },
      {
        word: "耳鼻科",
        reading: "じびか",
        meaningFr: "ORL (oto-rhino-laryngologie)",
      },
    ],
  },
  {
    character: "手",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "main",
    meaningEn: "hand",
    readings: [
      { type: "on", reading: "シュ", romaji: "shu" },
      { type: "kun", reading: "て", romaji: "te" },
    ],
    examples: [
      {
        word: "手",
        reading: "て",
        meaningFr: "main",
        sentence: "手を洗ってください。",
        sentenceFr: "Lavez-vous les mains, s'il vous plaît.",
      },
      {
        word: "上手",
        reading: "じょうず",
        meaningFr: "habile",
        sentence: "料理が上手ですね。",
        sentenceFr: "Vous êtes doué en cuisine.",
      },
    ],
  },
  {
    character: "足",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "pied, jambe ; suffisant",
    meaningEn: "foot; leg; enough",
    readings: [
      { type: "on", reading: "ソク", romaji: "soku" },
      { type: "kun", reading: "あし", romaji: "ashi" },
      { type: "kun", reading: "たりる", romaji: "tariru" },
      { type: "kun", reading: "たす", romaji: "tasu" },
    ],
    examples: [
      {
        word: "足",
        reading: "あし",
        meaningFr: "pied, jambe",
        sentence: "足が痛いです。",
        sentenceFr: "J'ai mal aux jambes.",
      },
      {
        word: "不足",
        reading: "ふそく",
        meaningFr: "manque, insuffisance",
      },
    ],
  },
  // ── People ────────────────────────────────────────────────────────────────
  {
    character: "人",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "personne, gens",
    meaningEn: "person; people",
    readings: [
      { type: "on", reading: "ジン", romaji: "jin" },
      { type: "on", reading: "ニン", romaji: "nin" },
      { type: "kun", reading: "ひと", romaji: "hito" },
    ],
    examples: [
      {
        word: "日本人",
        reading: "にほんじん",
        meaningFr: "Japonais",
        sentence: "彼女は日本人です。",
        sentenceFr: "Elle est japonaise.",
      },
      {
        word: "一人",
        reading: "ひとり",
        meaningFr: "une personne, seul",
        sentence: "一人で旅行します。",
        sentenceFr: "Je voyage seul.",
      },
    ],
  },
  {
    character: "子",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "enfant",
    meaningEn: "child",
    readings: [
      { type: "on", reading: "シ", romaji: "shi" },
      { type: "on", reading: "ス", romaji: "su" },
      { type: "kun", reading: "こ", romaji: "ko" },
    ],
    examples: [
      {
        word: "子供",
        reading: "こども",
        meaningFr: "enfant",
        sentence: "子供が公園で遊んでいます。",
        sentenceFr: "Les enfants jouent dans le parc.",
      },
      {
        word: "女子",
        reading: "じょし",
        meaningFr: "fille, femme",
      },
    ],
  },
  {
    character: "女",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "femme, féminin",
    meaningEn: "woman; female",
    readings: [
      { type: "on", reading: "ジョ", romaji: "jo" },
      { type: "on", reading: "ニョ", romaji: "nyo" },
      { type: "kun", reading: "おんな", romaji: "onna" },
      { type: "kun", reading: "め", romaji: "me" },
    ],
    examples: [
      {
        word: "女の人",
        reading: "おんなのひと",
        meaningFr: "femme",
        sentence: "あの女の人は先生です。",
        sentenceFr: "Cette femme là-bas est professeure.",
      },
      {
        word: "女性",
        reading: "じょせい",
        meaningFr: "femme, sexe féminin",
      },
    ],
  },
  {
    character: "男",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "homme, masculin",
    meaningEn: "man; male",
    readings: [
      { type: "on", reading: "ダン", romaji: "dan" },
      { type: "on", reading: "ナン", romaji: "nan" },
      { type: "kun", reading: "おとこ", romaji: "otoko" },
    ],
    examples: [
      {
        word: "男の人",
        reading: "おとこのひと",
        meaningFr: "homme",
        sentence: "あの男の人は誰ですか。",
        sentenceFr: "Qui est cet homme là-bas ?",
      },
      {
        word: "男性",
        reading: "だんせい",
        meaningFr: "homme, sexe masculin",
      },
    ],
  },
  {
    character: "父",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "père",
    meaningEn: "father",
    readings: [
      { type: "on", reading: "フ", romaji: "fu" },
      { type: "kun", reading: "ちち", romaji: "chichi" },
    ],
    examples: [
      {
        word: "父",
        reading: "ちち",
        meaningFr: "mon père",
        sentence: "父は医者です。",
        sentenceFr: "Mon père est médecin.",
      },
      {
        word: "お父さん",
        reading: "おとうさん",
        meaningFr: "père (forme polie)",
        sentence: "お父さんはどこにいますか。",
        sentenceFr: "Où est votre père ?",
      },
    ],
  },
  {
    character: "母",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "mère",
    meaningEn: "mother",
    readings: [
      { type: "on", reading: "ボ", romaji: "bo" },
      { type: "kun", reading: "はは", romaji: "haha" },
    ],
    examples: [
      {
        word: "母",
        reading: "はは",
        meaningFr: "ma mère",
        sentence: "母は料理が上手です。",
        sentenceFr: "Ma mère est bonne cuisinière.",
      },
      {
        word: "お母さん",
        reading: "おかあさん",
        meaningFr: "mère (forme polie)",
      },
    ],
  },
  {
    character: "友",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "ami",
    meaningEn: "friend",
    readings: [
      { type: "on", reading: "ユウ", romaji: "yuu" },
      { type: "kun", reading: "とも", romaji: "tomo" },
    ],
    examples: [
      {
        word: "友達",
        reading: "ともだち",
        meaningFr: "ami(e)",
        sentence: "友達と映画を見に行きます。",
        sentenceFr: "Je vais voir un film avec mon ami.",
      },
      {
        word: "友人",
        reading: "ゆうじん",
        meaningFr: "ami (formel)",
      },
    ],
  },
  {
    character: "先",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "avant, précédent ; pointe",
    meaningEn: "previous; ahead; tip",
    readings: [
      { type: "on", reading: "セン", romaji: "sen" },
      { type: "kun", reading: "さき", romaji: "saki" },
      { type: "kun", reading: "まず", romaji: "mazu" },
    ],
    examples: [
      {
        word: "先生",
        reading: "せんせい",
        meaningFr: "professeur",
        sentence: "先生に質問しました。",
        sentenceFr: "J'ai posé une question au professeur.",
      },
      {
        word: "先週",
        reading: "せんしゅう",
        meaningFr: "la semaine dernière",
        sentence: "先週、映画を見ました。",
        sentenceFr: "La semaine dernière, j'ai regardé un film.",
      },
    ],
  },
  {
    character: "生",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "vie, naissance ; frais, cru",
    meaningEn: "life; birth; raw",
    readings: [
      { type: "on", reading: "セイ", romaji: "sei" },
      { type: "on", reading: "ショウ", romaji: "shou" },
      { type: "kun", reading: "いきる", romaji: "ikiru" },
      { type: "kun", reading: "うまれる", romaji: "umareru" },
      { type: "kun", reading: "なま", romaji: "nama" },
    ],
    examples: [
      {
        word: "学生",
        reading: "がくせい",
        meaningFr: "étudiant(e)",
        sentence: "私は学生です。",
        sentenceFr: "Je suis étudiant.",
      },
      {
        word: "先生",
        reading: "せんせい",
        meaningFr: "professeur",
      },
    ],
  },
  // ── School / Learning ─────────────────────────────────────────────────────
  {
    character: "学",
    jlptLevel: 5,
    strokeCount: 8,
    meaningFr: "étudier, apprendre ; science",
    meaningEn: "study; learning",
    readings: [
      { type: "on", reading: "ガク", romaji: "gaku" },
      { type: "kun", reading: "まなぶ", romaji: "manabu" },
    ],
    examples: [
      {
        word: "大学",
        reading: "だいがく",
        meaningFr: "université",
        sentence: "大学で日本語を勉強しています。",
        sentenceFr: "J'étudie le japonais à l'université.",
      },
      {
        word: "学校",
        reading: "がっこう",
        meaningFr: "école",
        sentence: "毎日学校へ行きます。",
        sentenceFr: "Je vais à l'école tous les jours.",
      },
    ],
  },
  {
    character: "校",
    jlptLevel: 5,
    strokeCount: 10,
    meaningFr: "école",
    meaningEn: "school",
    readings: [{ type: "on", reading: "コウ", romaji: "kou" }],
    examples: [
      {
        word: "学校",
        reading: "がっこう",
        meaningFr: "école",
        sentence: "学校は九時に始まります。",
        sentenceFr: "L'école commence à neuf heures.",
      },
      {
        word: "高校",
        reading: "こうこう",
        meaningFr: "lycée",
        sentence: "高校生です。",
        sentenceFr: "Je suis lycéen.",
      },
    ],
  },
  // ── Adjectives ────────────────────────────────────────────────────────────
  {
    character: "大",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "grand",
    meaningEn: "big; large",
    readings: [
      { type: "on", reading: "ダイ", romaji: "dai" },
      { type: "on", reading: "タイ", romaji: "tai" },
      { type: "kun", reading: "おお", romaji: "oo" },
      { type: "kun", reading: "おおきい", romaji: "ookii" },
    ],
    examples: [
      {
        word: "大きい",
        reading: "おおきい",
        meaningFr: "grand, gros",
        sentence: "この犬は大きいです。",
        sentenceFr: "Ce chien est grand.",
      },
      {
        word: "大学",
        reading: "だいがく",
        meaningFr: "université",
      },
    ],
  },
  {
    character: "小",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "petit",
    meaningEn: "small; little",
    readings: [
      { type: "on", reading: "ショウ", romaji: "shou" },
      { type: "kun", reading: "ちいさい", romaji: "chiisai" },
      { type: "kun", reading: "こ", romaji: "ko" },
      { type: "kun", reading: "お", romaji: "o" },
    ],
    examples: [
      {
        word: "小さい",
        reading: "ちいさい",
        meaningFr: "petit",
        sentence: "この部屋は小さいです。",
        sentenceFr: "Cette chambre est petite.",
      },
      {
        word: "小学校",
        reading: "しょうがっこう",
        meaningFr: "école primaire",
      },
    ],
  },
  {
    character: "高",
    jlptLevel: 5,
    strokeCount: 10,
    meaningFr: "haut, cher, élevé",
    meaningEn: "high; expensive; tall",
    readings: [
      { type: "on", reading: "コウ", romaji: "kou" },
      { type: "kun", reading: "たかい", romaji: "takai" },
      { type: "kun", reading: "たか", romaji: "taka" },
    ],
    examples: [
      {
        word: "高い",
        reading: "たかい",
        meaningFr: "cher, élevé, haut",
        sentence: "このバッグは高いです。",
        sentenceFr: "Ce sac est cher.",
      },
      {
        word: "高校",
        reading: "こうこう",
        meaningFr: "lycée",
      },
    ],
  },
  {
    character: "長",
    jlptLevel: 5,
    strokeCount: 8,
    meaningFr: "long ; chef",
    meaningEn: "long; chief",
    readings: [
      { type: "on", reading: "チョウ", romaji: "chou" },
      { type: "kun", reading: "ながい", romaji: "nagai" },
      { type: "kun", reading: "おさ", romaji: "osa" },
    ],
    examples: [
      {
        word: "長い",
        reading: "ながい",
        meaningFr: "long",
        sentence: "この道は長いです。",
        sentenceFr: "Ce chemin est long.",
      },
      {
        word: "店長",
        reading: "てんちょう",
        meaningFr: "gérant de magasin",
      },
    ],
  },
  {
    character: "安",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "bon marché, tranquille",
    meaningEn: "cheap; peaceful",
    readings: [
      { type: "on", reading: "アン", romaji: "an" },
      { type: "kun", reading: "やすい", romaji: "yasui" },
      { type: "kun", reading: "やすらか", romaji: "yasuraka" },
    ],
    examples: [
      {
        word: "安い",
        reading: "やすい",
        meaningFr: "bon marché, pas cher",
        sentence: "このスーパーは安いです。",
        sentenceFr: "Ce supermarché est bon marché.",
      },
      {
        word: "安全",
        reading: "あんぜん",
        meaningFr: "sécurité, sûreté",
      },
    ],
  },
  {
    character: "新",
    jlptLevel: 5,
    strokeCount: 13,
    meaningFr: "nouveau",
    meaningEn: "new",
    readings: [
      { type: "on", reading: "シン", romaji: "shin" },
      { type: "kun", reading: "あたらしい", romaji: "atarashii" },
      { type: "kun", reading: "あらた", romaji: "arata" },
      { type: "kun", reading: "にい", romaji: "nii" },
    ],
    examples: [
      {
        word: "新しい",
        reading: "あたらしい",
        meaningFr: "nouveau, neuf",
        sentence: "新しい車を買いました。",
        sentenceFr: "J'ai acheté une nouvelle voiture.",
      },
      {
        word: "新幹線",
        reading: "しんかんせん",
        meaningFr: "train à grande vitesse (Shinkansen)",
      },
    ],
  },
  {
    character: "古",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "ancien, vieux",
    meaningEn: "old; ancient",
    readings: [
      { type: "on", reading: "コ", romaji: "ko" },
      { type: "kun", reading: "ふるい", romaji: "furui" },
      { type: "kun", reading: "ふる", romaji: "furu" },
    ],
    examples: [
      {
        word: "古い",
        reading: "ふるい",
        meaningFr: "vieux, ancien",
        sentence: "この建物は古いです。",
        sentenceFr: "Ce bâtiment est vieux.",
      },
      {
        word: "古本",
        reading: "ふるほん",
        meaningFr: "livre d'occasion",
      },
    ],
  },
  {
    character: "多",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "beaucoup, nombreux",
    meaningEn: "many; much",
    readings: [
      { type: "on", reading: "タ", romaji: "ta" },
      { type: "kun", reading: "おおい", romaji: "ooi" },
      { type: "kun", reading: "おおく", romaji: "ooku" },
    ],
    examples: [
      {
        word: "多い",
        reading: "おおい",
        meaningFr: "nombreux, beaucoup",
        sentence: "今日は人が多いです。",
        sentenceFr: "Il y a beaucoup de monde aujourd'hui.",
      },
      {
        word: "多分",
        reading: "たぶん",
        meaningFr: "probablement",
      },
    ],
  },
  {
    character: "少",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "peu, peu nombreux",
    meaningEn: "few; little",
    readings: [
      { type: "on", reading: "ショウ", romaji: "shou" },
      { type: "kun", reading: "すくない", romaji: "sukunai" },
      { type: "kun", reading: "すこし", romaji: "sukoshi" },
    ],
    examples: [
      {
        word: "少ない",
        reading: "すくない",
        meaningFr: "peu nombreux",
        sentence: "お金が少ないです。",
        sentenceFr: "J'ai peu d'argent.",
      },
      {
        word: "少し",
        reading: "すこし",
        meaningFr: "un peu",
        sentence: "日本語が少し話せます。",
        sentenceFr: "Je parle un peu japonais.",
      },
    ],
  },
  {
    character: "白",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "blanc",
    meaningEn: "white",
    readings: [
      { type: "on", reading: "ハク", romaji: "haku" },
      { type: "on", reading: "ビャク", romaji: "byaku" },
      { type: "kun", reading: "しろ", romaji: "shiro" },
      { type: "kun", reading: "しろい", romaji: "shiroi" },
    ],
    examples: [
      {
        word: "白い",
        reading: "しろい",
        meaningFr: "blanc",
        sentence: "白い猫がいます。",
        sentenceFr: "Il y a un chat blanc.",
      },
      {
        word: "白黒",
        reading: "しろくろ",
        meaningFr: "noir et blanc",
      },
    ],
  },
  // ── Common nouns ─────────────────────────────────────────────────────────
  {
    character: "本",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "livre ; origine, vrai ; compteur de longs objets",
    meaningEn: "book; origin; counter for long things",
    readings: [
      { type: "on", reading: "ホン", romaji: "hon" },
      { type: "on", reading: "ボン", romaji: "bon" },
      { type: "kun", reading: "もと", romaji: "moto" },
    ],
    examples: [
      {
        word: "本",
        reading: "ほん",
        meaningFr: "livre",
        sentence: "本を読むのが好きです。",
        sentenceFr: "J'aime lire des livres.",
      },
      {
        word: "日本",
        reading: "にほん",
        meaningFr: "Japon",
        sentence: "日本に行きたいです。",
        sentenceFr: "Je veux aller au Japon.",
      },
    ],
  },
  // ── Nature ────────────────────────────────────────────────────────────────
  {
    character: "山",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "montagne",
    meaningEn: "mountain",
    readings: [
      { type: "on", reading: "サン", romaji: "san" },
      { type: "kun", reading: "やま", romaji: "yama" },
    ],
    examples: [
      {
        word: "山",
        reading: "やま",
        meaningFr: "montagne",
        sentence: "富士山は高い山です。",
        sentenceFr: "Le Mont Fuji est une haute montagne.",
      },
      {
        word: "火山",
        reading: "かざん",
        meaningFr: "volcan",
      },
    ],
  },
  {
    character: "川",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "rivière, fleuve",
    meaningEn: "river",
    readings: [
      { type: "on", reading: "セン", romaji: "sen" },
      { type: "kun", reading: "かわ", romaji: "kawa" },
    ],
    examples: [
      {
        word: "川",
        reading: "かわ",
        meaningFr: "rivière",
        sentence: "川で魚を釣ります。",
        sentenceFr: "Je pêche dans la rivière.",
      },
      {
        word: "河川",
        reading: "かせん",
        meaningFr: "cours d'eau, rivières",
      },
    ],
  },
  {
    character: "田",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "rizière, champ",
    meaningEn: "rice field",
    readings: [
      { type: "on", reading: "デン", romaji: "den" },
      { type: "kun", reading: "た", romaji: "ta" },
    ],
    examples: [
      {
        word: "田んぼ",
        reading: "たんぼ",
        meaningFr: "rizière",
        sentence: "田んぼで米を作ります。",
        sentenceFr: "On cultive le riz dans les rizières.",
      },
      {
        word: "田舎",
        reading: "いなか",
        meaningFr: "campagne, province",
      },
    ],
  },
  {
    character: "天",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "ciel, paradis",
    meaningEn: "heaven; sky",
    readings: [
      { type: "on", reading: "テン", romaji: "ten" },
      { type: "kun", reading: "あめ", romaji: "ame" },
      { type: "kun", reading: "あま", romaji: "ama" },
    ],
    examples: [
      {
        word: "天気",
        reading: "てんき",
        meaningFr: "temps (météo)",
        sentence: "今日の天気はどうですか。",
        sentenceFr: "Quel temps fait-il aujourd'hui ?",
      },
      {
        word: "天国",
        reading: "てんごく",
        meaningFr: "paradis",
      },
    ],
  },
  {
    character: "気",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "esprit, énergie, air, atmosphère",
    meaningEn: "spirit; energy; atmosphere",
    readings: [
      { type: "on", reading: "キ", romaji: "ki" },
      { type: "on", reading: "ケ", romaji: "ke" },
    ],
    examples: [
      {
        word: "天気",
        reading: "てんき",
        meaningFr: "météo, temps",
        sentence: "明日の天気はどうですか。",
        sentenceFr: "Quel temps fera-t-il demain ?",
      },
      {
        word: "元気",
        reading: "げんき",
        meaningFr: "en bonne santé, plein d'énergie",
        sentence: "お元気ですか。",
        sentenceFr: "Comment allez-vous ?",
      },
    ],
  },
  {
    character: "雨",
    jlptLevel: 5,
    strokeCount: 8,
    meaningFr: "pluie",
    meaningEn: "rain",
    readings: [
      { type: "on", reading: "ウ", romaji: "u" },
      { type: "kun", reading: "あめ", romaji: "ame" },
      { type: "kun", reading: "あま", romaji: "ama" },
    ],
    examples: [
      {
        word: "雨",
        reading: "あめ",
        meaningFr: "pluie",
        sentence: "今日は雨が降っています。",
        sentenceFr: "Il pleut aujourd'hui.",
      },
      {
        word: "雨傘",
        reading: "あまがさ",
        meaningFr: "parapluie",
      },
    ],
  },
  {
    character: "花",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "fleur",
    meaningEn: "flower",
    readings: [
      { type: "on", reading: "カ", romaji: "ka" },
      { type: "kun", reading: "はな", romaji: "hana" },
    ],
    examples: [
      {
        word: "花",
        reading: "はな",
        meaningFr: "fleur",
        sentence: "花を買ってきました。",
        sentenceFr: "J'ai acheté des fleurs.",
      },
      {
        word: "花見",
        reading: "はなみ",
        meaningFr: "contemplation des cerisiers",
        sentence: "花見に行きましょう。",
        sentenceFr: "Allons admirer les cerisiers en fleurs.",
      },
    ],
  },
  {
    character: "水",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "eau",
    meaningEn: "water",
    readings: [
      { type: "on", reading: "スイ", romaji: "sui" },
      { type: "kun", reading: "みず", romaji: "mizu" },
    ],
    examples: [
      {
        word: "水",
        reading: "みず",
        meaningFr: "eau",
        sentence: "水を一杯ください。",
        sentenceFr: "Un verre d'eau, s'il vous plaît.",
      },
      {
        word: "水曜日",
        reading: "すいようび",
        meaningFr: "mercredi",
      },
    ],
  },
  {
    character: "火",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "feu",
    meaningEn: "fire",
    readings: [
      { type: "on", reading: "カ", romaji: "ka" },
      { type: "kun", reading: "ひ", romaji: "hi" },
      { type: "kun", reading: "ほ", romaji: "ho" },
    ],
    examples: [
      {
        word: "火曜日",
        reading: "かようび",
        meaningFr: "mardi",
        sentence: "火曜日に会議があります。",
        sentenceFr: "Il y a une réunion mardi.",
      },
      {
        word: "火事",
        reading: "かじ",
        meaningFr: "incendie",
      },
    ],
  },
  {
    character: "金",
    jlptLevel: 5,
    strokeCount: 8,
    meaningFr: "or ; argent (monnaie) ; métal",
    meaningEn: "gold; metal; money",
    readings: [
      { type: "on", reading: "キン", romaji: "kin" },
      { type: "on", reading: "コン", romaji: "kon" },
      { type: "kun", reading: "かね", romaji: "kane" },
      { type: "kun", reading: "かな", romaji: "kana" },
    ],
    examples: [
      {
        word: "お金",
        reading: "おかね",
        meaningFr: "argent (monnaie)",
        sentence: "お金が足りません。",
        sentenceFr: "Je n'ai pas assez d'argent.",
      },
      {
        word: "金曜日",
        reading: "きんようび",
        meaningFr: "vendredi",
      },
    ],
  },
  {
    character: "土",
    jlptLevel: 5,
    strokeCount: 3,
    meaningFr: "terre, sol",
    meaningEn: "earth; soil",
    readings: [
      { type: "on", reading: "ド", romaji: "do" },
      { type: "on", reading: "ト", romaji: "to" },
      { type: "kun", reading: "つち", romaji: "tsuchi" },
    ],
    examples: [
      {
        word: "土曜日",
        reading: "どようび",
        meaningFr: "samedi",
        sentence: "土曜日は休みです。",
        sentenceFr: "Le samedi, c'est le repos.",
      },
      {
        word: "土地",
        reading: "とち",
        meaningFr: "terrain, terre",
      },
    ],
  },
  {
    character: "木",
    jlptLevel: 5,
    strokeCount: 4,
    meaningFr: "arbre, bois",
    meaningEn: "tree; wood",
    readings: [
      { type: "on", reading: "モク", romaji: "moku" },
      { type: "on", reading: "ボク", romaji: "boku" },
      { type: "kun", reading: "き", romaji: "ki" },
      { type: "kun", reading: "こ", romaji: "ko" },
    ],
    examples: [
      {
        word: "木曜日",
        reading: "もくようび",
        meaningFr: "jeudi",
        sentence: "木曜日に授業があります。",
        sentenceFr: "J'ai cours le jeudi.",
      },
      {
        word: "木",
        reading: "き",
        meaningFr: "arbre",
        sentence: "公園に大きな木があります。",
        sentenceFr: "Il y a un grand arbre dans le parc.",
      },
    ],
  },
  // ── Verbs ────────────────────────────────────────────────────────────────
  {
    character: "休",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "se reposer, être absent",
    meaningEn: "rest; vacation; absent",
    readings: [
      { type: "on", reading: "キュウ", romaji: "kyuu" },
      { type: "kun", reading: "やすむ", romaji: "yasumu" },
      { type: "kun", reading: "やすみ", romaji: "yasumi" },
    ],
    examples: [
      {
        word: "休み",
        reading: "やすみ",
        meaningFr: "repos, vacances",
        sentence: "明日は休みです。",
        sentenceFr: "Demain c'est le jour de repos.",
      },
      {
        word: "夏休み",
        reading: "なつやすみ",
        meaningFr: "vacances d'été",
        sentence: "夏休みに海へ行きます。",
        sentenceFr: "Pendant les vacances d'été, je vais à la mer.",
      },
    ],
  },
  {
    character: "食",
    jlptLevel: 5,
    strokeCount: 9,
    meaningFr: "manger, nourriture",
    meaningEn: "eat; food",
    readings: [
      { type: "on", reading: "ショク", romaji: "shoku" },
      { type: "on", reading: "ジキ", romaji: "jiki" },
      { type: "kun", reading: "たべる", romaji: "taberu" },
      { type: "kun", reading: "くう", romaji: "kuu" },
    ],
    examples: [
      {
        word: "食べる",
        reading: "たべる",
        meaningFr: "manger",
        sentence: "朝ご飯を食べます。",
        sentenceFr: "Je mange le petit-déjeuner.",
      },
      {
        word: "食事",
        reading: "しょくじ",
        meaningFr: "repas",
        sentence: "一緒に食事しませんか。",
        sentenceFr: "Voulez-vous manger ensemble ?",
      },
    ],
  },
  {
    character: "飲",
    jlptLevel: 5,
    strokeCount: 12,
    meaningFr: "boire",
    meaningEn: "drink",
    readings: [
      { type: "on", reading: "イン", romaji: "in" },
      { type: "kun", reading: "のむ", romaji: "nomu" },
    ],
    examples: [
      {
        word: "飲む",
        reading: "のむ",
        meaningFr: "boire",
        sentence: "水を飲んでください。",
        sentenceFr: "Veuillez boire de l'eau.",
      },
      {
        word: "飲み物",
        reading: "のみもの",
        meaningFr: "boisson",
        sentence: "飲み物は何がいいですか。",
        sentenceFr: "Que souhaitez-vous boire ?",
      },
    ],
  },
  {
    character: "読",
    jlptLevel: 5,
    strokeCount: 14,
    meaningFr: "lire",
    meaningEn: "read",
    readings: [
      { type: "on", reading: "ドク", romaji: "doku" },
      { type: "on", reading: "トク", romaji: "toku" },
      { type: "on", reading: "トウ", romaji: "tou" },
      { type: "kun", reading: "よむ", romaji: "yomu" },
    ],
    examples: [
      {
        word: "読む",
        reading: "よむ",
        meaningFr: "lire",
        sentence: "毎日新聞を読みます。",
        sentenceFr: "Je lis le journal tous les jours.",
      },
      {
        word: "読書",
        reading: "どくしょ",
        meaningFr: "lecture",
        sentence: "読書が趣味です。",
        sentenceFr: "La lecture est mon hobby.",
      },
    ],
  },
  {
    character: "書",
    jlptLevel: 5,
    strokeCount: 10,
    meaningFr: "écrire",
    meaningEn: "write",
    readings: [
      { type: "on", reading: "ショ", romaji: "sho" },
      { type: "kun", reading: "かく", romaji: "kaku" },
    ],
    examples: [
      {
        word: "書く",
        reading: "かく",
        meaningFr: "écrire",
        sentence: "手紙を書きました。",
        sentenceFr: "J'ai écrit une lettre.",
      },
      {
        word: "図書館",
        reading: "としょかん",
        meaningFr: "bibliothèque",
        sentence: "図書館で勉強します。",
        sentenceFr: "J'étudie à la bibliothèque.",
      },
    ],
  },
  {
    character: "見",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "voir, regarder",
    meaningEn: "see; look",
    readings: [
      { type: "on", reading: "ケン", romaji: "ken" },
      { type: "kun", reading: "みる", romaji: "miru" },
      { type: "kun", reading: "みえる", romaji: "mieru" },
      { type: "kun", reading: "みせる", romaji: "miseru" },
    ],
    examples: [
      {
        word: "見る",
        reading: "みる",
        meaningFr: "regarder, voir",
        sentence: "テレビを見ます。",
        sentenceFr: "Je regarde la télévision.",
      },
      {
        word: "見学",
        reading: "けんがく",
        meaningFr: "visite d'étude, excursion",
        sentence: "工場を見学しました。",
        sentenceFr: "Nous avons visité l'usine.",
      },
    ],
  },
  {
    character: "聞",
    jlptLevel: 5,
    strokeCount: 14,
    meaningFr: "entendre, écouter, demander",
    meaningEn: "hear; listen; ask",
    readings: [
      { type: "on", reading: "ブン", romaji: "bun" },
      { type: "on", reading: "モン", romaji: "mon" },
      { type: "kun", reading: "きく", romaji: "kiku" },
      { type: "kun", reading: "きこえる", romaji: "kikoeru" },
    ],
    examples: [
      {
        word: "聞く",
        reading: "きく",
        meaningFr: "écouter, demander",
        sentence: "音楽を聞きます。",
        sentenceFr: "J'écoute de la musique.",
      },
      {
        word: "新聞",
        reading: "しんぶん",
        meaningFr: "journal (presse)",
        sentence: "毎朝新聞を読みます。",
        sentenceFr: "Je lis le journal chaque matin.",
      },
    ],
  },
  {
    character: "話",
    jlptLevel: 5,
    strokeCount: 13,
    meaningFr: "parler, conversation",
    meaningEn: "speak; talk; story",
    readings: [
      { type: "on", reading: "ワ", romaji: "wa" },
      { type: "kun", reading: "はなす", romaji: "hanasu" },
      { type: "kun", reading: "はなし", romaji: "hanashi" },
    ],
    examples: [
      {
        word: "話す",
        reading: "はなす",
        meaningFr: "parler",
        sentence: "日本語で話してください。",
        sentenceFr: "Parlez en japonais, s'il vous plaît.",
      },
      {
        word: "電話",
        reading: "でんわ",
        meaningFr: "téléphone",
        sentence: "電話をかけます。",
        sentenceFr: "Je passe un coup de téléphone.",
      },
    ],
  },
  {
    character: "言",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "dire, parole",
    meaningEn: "say; word",
    readings: [
      { type: "on", reading: "ゲン", romaji: "gen" },
      { type: "on", reading: "ゴン", romaji: "gon" },
      { type: "kun", reading: "いう", romaji: "iu" },
      { type: "kun", reading: "こと", romaji: "koto" },
    ],
    examples: [
      {
        word: "言う",
        reading: "いう",
        meaningFr: "dire",
        sentence: "何と言いましたか。",
        sentenceFr: "Qu'est-ce que vous avez dit ?",
      },
      {
        word: "言葉",
        reading: "ことば",
        meaningFr: "mot, langue, parole",
        sentence: "難しい言葉ですね。",
        sentenceFr: "C'est un mot difficile.",
      },
    ],
  },
  {
    character: "出",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "sortir, paraître",
    meaningEn: "exit; come out",
    readings: [
      { type: "on", reading: "シュツ", romaji: "shutsu" },
      { type: "on", reading: "スイ", romaji: "sui" },
      { type: "kun", reading: "でる", romaji: "deru" },
      { type: "kun", reading: "だす", romaji: "dasu" },
    ],
    examples: [
      {
        word: "出る",
        reading: "でる",
        meaningFr: "sortir, partir",
        sentence: "九時に家を出ます。",
        sentenceFr: "Je quitte la maison à neuf heures.",
      },
      {
        word: "出口",
        reading: "でぐち",
        meaningFr: "sortie",
        sentence: "出口はどこですか。",
        sentenceFr: "Où est la sortie ?",
      },
    ],
  },
  {
    character: "入",
    jlptLevel: 5,
    strokeCount: 2,
    meaningFr: "entrer",
    meaningEn: "enter",
    readings: [
      { type: "on", reading: "ニュウ", romaji: "nyuu" },
      { type: "kun", reading: "いる", romaji: "iru" },
      { type: "kun", reading: "いれる", romaji: "ireru" },
      { type: "kun", reading: "はいる", romaji: "hairu" },
    ],
    examples: [
      {
        word: "入る",
        reading: "はいる",
        meaningFr: "entrer",
        sentence: "部屋に入ってください。",
        sentenceFr: "Entrez dans la pièce, s'il vous plaît.",
      },
      {
        word: "入口",
        reading: "いりぐち",
        meaningFr: "entrée",
        sentence: "入口はここです。",
        sentenceFr: "L'entrée est ici.",
      },
    ],
  },
  {
    character: "行",
    jlptLevel: 5,
    strokeCount: 6,
    meaningFr: "aller",
    meaningEn: "go",
    readings: [
      { type: "on", reading: "コウ", romaji: "kou" },
      { type: "on", reading: "ギョウ", romaji: "gyou" },
      { type: "on", reading: "アン", romaji: "an" },
      { type: "kun", reading: "いく", romaji: "iku" },
      { type: "kun", reading: "おこなう", romaji: "okonau" },
    ],
    examples: [
      {
        word: "行く",
        reading: "いく",
        meaningFr: "aller",
        sentence: "学校へ行きます。",
        sentenceFr: "Je vais à l'école.",
      },
      {
        word: "銀行",
        reading: "ぎんこう",
        meaningFr: "banque",
        sentence: "銀行でお金を下ろします。",
        sentenceFr: "Je retire de l'argent à la banque.",
      },
    ],
  },
  {
    character: "来",
    jlptLevel: 5,
    strokeCount: 7,
    meaningFr: "venir",
    meaningEn: "come",
    readings: [
      { type: "on", reading: "ライ", romaji: "rai" },
      { type: "kun", reading: "くる", romaji: "kuru" },
      { type: "kun", reading: "きたる", romaji: "kitaru" },
    ],
    examples: [
      {
        word: "来る",
        reading: "くる",
        meaningFr: "venir",
        sentence: "明日来てください。",
        sentenceFr: "Venez demain, s'il vous plaît.",
      },
      {
        word: "来週",
        reading: "らいしゅう",
        meaningFr: "la semaine prochaine",
        sentence: "来週また会いましょう。",
        sentenceFr: "Revoyons-nous la semaine prochaine.",
      },
    ],
  },
  {
    character: "立",
    jlptLevel: 5,
    strokeCount: 5,
    meaningFr: "se lever, se tenir debout",
    meaningEn: "stand up",
    readings: [
      { type: "on", reading: "リツ", romaji: "ritsu" },
      { type: "on", reading: "リュウ", romaji: "ryuu" },
      { type: "kun", reading: "たつ", romaji: "tatsu" },
      { type: "kun", reading: "たてる", romaji: "tateru" },
    ],
    examples: [
      {
        word: "立つ",
        reading: "たつ",
        meaningFr: "se lever, se mettre debout",
        sentence: "起立！立ってください。",
        sentenceFr: "Debout ! Levez-vous, s'il vous plaît.",
      },
      {
        word: "国立",
        reading: "こくりつ",
        meaningFr: "national",
        sentence: "国立博物館に行きました。",
        sentenceFr: "Je suis allé au musée national.",
      },
    ],
  },
];

async function main() {
  console.log("Seeding JLPT N5 kanji...");

  for (const kanji of kanjiData) {
    await prisma.kanji.upsert({
      where: { character: kanji.character },
      update: {
        jlptLevel: kanji.jlptLevel,
        strokeCount: kanji.strokeCount,
        meaningFr: kanji.meaningFr,
        meaningEn: kanji.meaningEn,
      },
      create: {
        character: kanji.character,
        jlptLevel: kanji.jlptLevel,
        strokeCount: kanji.strokeCount,
        meaningFr: kanji.meaningFr,
        meaningEn: kanji.meaningEn,
        readings: {
          create: kanji.readings.map((r) => ({
            type: r.type,
            reading: r.reading,
            romaji: r.romaji,
          })),
        },
        examples: {
          create: kanji.examples.map((e) => ({
            word: e.word,
            reading: e.reading,
            meaningFr: e.meaningFr,
            sentence: e.sentence ?? null,
            sentenceFr: e.sentenceFr ?? null,
          })),
        },
      },
    });

    console.log(`  ✓ ${kanji.character} — ${kanji.meaningFr}`);
  }

  console.log(`\nDone! Seeded ${kanjiData.length} kanji.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Radical definitions ──────────────────────────────────────────────────────

interface RadicalData {
  character: string;
  meaningFr: string;
  meaningEn: string;
  strokeCount: number;
}

const radicals: RadicalData[] = [
  // Simple strokes / numbers
  { character: "一", meaningFr: "un", meaningEn: "one", strokeCount: 1 },
  { character: "二", meaningFr: "deux", meaningEn: "two", strokeCount: 2 },
  { character: "三", meaningFr: "trois", meaningEn: "three", strokeCount: 3 },
  { character: "十", meaningFr: "dix", meaningEn: "ten", strokeCount: 2 },
  { character: "八", meaningFr: "huit / diviser", meaningEn: "eight / divide", strokeCount: 2 },
  { character: "儿", meaningFr: "jambes", meaningEn: "legs / son", strokeCount: 2 },
  { character: "人", meaningFr: "personne", meaningEn: "person", strokeCount: 2 },
  { character: "亻", meaningFr: "personne (radical)", meaningEn: "person radical", strokeCount: 2 },
  { character: "入", meaningFr: "entrer", meaningEn: "enter", strokeCount: 2 },
  { character: "力", meaningFr: "force / pouvoir", meaningEn: "power / force", strokeCount: 2 },
  { character: "刀", meaningFr: "couteau / sabre", meaningEn: "knife / sword", strokeCount: 2 },
  { character: "又", meaningFr: "encore / main droite", meaningEn: "again / right hand", strokeCount: 2 },
  { character: "口", meaningFr: "bouche", meaningEn: "mouth", strokeCount: 3 },
  { character: "囗", meaningFr: "enclos", meaningEn: "enclosure", strokeCount: 3 },
  { character: "土", meaningFr: "terre", meaningEn: "earth / soil", strokeCount: 3 },
  { character: "士", meaningFr: "samouraï / homme", meaningEn: "samurai / scholar", strokeCount: 3 },
  { character: "夂", meaningFr: "aller lentement", meaningEn: "go slowly", strokeCount: 3 },
  { character: "大", meaningFr: "grand", meaningEn: "big / large", strokeCount: 3 },
  { character: "女", meaningFr: "femme", meaningEn: "woman", strokeCount: 3 },
  { character: "子", meaningFr: "enfant", meaningEn: "child", strokeCount: 3 },
  { character: "小", meaningFr: "petit", meaningEn: "small", strokeCount: 3 },
  { character: "山", meaningFr: "montagne", meaningEn: "mountain", strokeCount: 3 },
  { character: "川", meaningFr: "rivière", meaningEn: "river", strokeCount: 3 },
  { character: "工", meaningFr: "travail / artisan", meaningEn: "work / craft", strokeCount: 3 },
  { character: "己", meaningFr: "soi-même", meaningEn: "self / snake", strokeCount: 3 },
  { character: "巾", meaningFr: "tissu / serviette", meaningEn: "cloth / turban", strokeCount: 3 },
  { character: "干", meaningFr: "sec / bouclier", meaningEn: "dry / shield", strokeCount: 3 },
  { character: "弓", meaningFr: "arc", meaningEn: "bow", strokeCount: 3 },
  { character: "彡", meaningFr: "barbe / poils", meaningEn: "hair / bristle", strokeCount: 3 },
  { character: "心", meaningFr: "cœur / esprit", meaningEn: "heart / mind", strokeCount: 4 },
  { character: "忄", meaningFr: "cœur (radical)", meaningEn: "heart radical", strokeCount: 3 },
  { character: "手", meaningFr: "main", meaningEn: "hand", strokeCount: 4 },
  { character: "扌", meaningFr: "main (radical)", meaningEn: "hand radical", strokeCount: 3 },
  { character: "日", meaningFr: "soleil / jour", meaningEn: "sun / day", strokeCount: 4 },
  { character: "月", meaningFr: "lune / mois / chair", meaningEn: "moon / month / flesh", strokeCount: 4 },
  { character: "木", meaningFr: "arbre", meaningEn: "tree / wood", strokeCount: 4 },
  { character: "水", meaningFr: "eau", meaningEn: "water", strokeCount: 4 },
  { character: "氵", meaningFr: "eau (radical)", meaningEn: "water radical", strokeCount: 3 },
  { character: "火", meaningFr: "feu", meaningEn: "fire", strokeCount: 4 },
  { character: "父", meaningFr: "père", meaningEn: "father", strokeCount: 4 },
  { character: "牛", meaningFr: "vache / bœuf", meaningEn: "cow / ox", strokeCount: 4 },
  { character: "片", meaningFr: "morceau / côté", meaningEn: "piece / one-sided", strokeCount: 4 },
  { character: "田", meaningFr: "champ de riz", meaningEn: "rice field", strokeCount: 5 },
  { character: "白", meaningFr: "blanc", meaningEn: "white", strokeCount: 5 },
  { character: "目", meaningFr: "œil", meaningEn: "eye", strokeCount: 5 },
  { character: "矢", meaningFr: "flèche", meaningEn: "arrow", strokeCount: 5 },
  { character: "石", meaningFr: "pierre / roche", meaningEn: "stone / rock", strokeCount: 5 },
  { character: "示", meaningFr: "montrer / esprit", meaningEn: "show / spirit", strokeCount: 5 },
  { character: "禾", meaningFr: "céréale / riz", meaningEn: "grain / cereal", strokeCount: 5 },
  { character: "立", meaningFr: "se tenir debout", meaningEn: "stand", strokeCount: 5 },
  { character: "糸", meaningFr: "fil / soie", meaningEn: "thread / silk", strokeCount: 6 },
  { character: "耳", meaningFr: "oreille", meaningEn: "ear", strokeCount: 6 },
  { character: "肉", meaningFr: "viande / chair", meaningEn: "meat / flesh", strokeCount: 6 },
  { character: "行", meaningFr: "aller / rangée", meaningEn: "go / row", strokeCount: 6 },
  { character: "衣", meaningFr: "vêtement", meaningEn: "clothing", strokeCount: 6 },
  { character: "言", meaningFr: "parole / dire", meaningEn: "say / speech", strokeCount: 7 },
  { character: "足", meaningFr: "pied / jambe / suffisant", meaningEn: "foot / leg / sufficient", strokeCount: 7 },
  { character: "貝", meaningFr: "coquillage / argent", meaningEn: "shell / money", strokeCount: 7 },
  { character: "赤", meaningFr: "rouge", meaningEn: "red", strokeCount: 7 },
  { character: "走", meaningFr: "courir", meaningEn: "run", strokeCount: 7 },
  { character: "身", meaningFr: "corps", meaningEn: "body", strokeCount: 7 },
  { character: "車", meaningFr: "voiture / véhicule", meaningEn: "car / vehicle", strokeCount: 7 },
  { character: "金", meaningFr: "or / métal / argent", meaningEn: "gold / metal / money", strokeCount: 8 },
  { character: "長", meaningFr: "long / chef", meaningEn: "long / chief", strokeCount: 8 },
  { character: "門", meaningFr: "porte / portail", meaningEn: "gate / door", strokeCount: 8 },
  { character: "雨", meaningFr: "pluie", meaningEn: "rain", strokeCount: 8 },
  { character: "食", meaningFr: "manger / nourriture", meaningEn: "eat / food", strokeCount: 9 },
  { character: "飠", meaningFr: "manger (radical)", meaningEn: "eat radical", strokeCount: 8 },
  { character: "馬", meaningFr: "cheval", meaningEn: "horse", strokeCount: 10 },
  { character: "高", meaningFr: "haut / cher", meaningEn: "high / expensive", strokeCount: 10 },
  { character: "魚", meaningFr: "poisson", meaningEn: "fish", strokeCount: 11 },
  // Additional radicals needed for decomposition
  { character: "冖", meaningFr: "couvercle / couronne", meaningEn: "cover / crown", strokeCount: 2 },
  { character: "宀", meaningFr: "toit / maison", meaningEn: "roof / house", strokeCount: 3 },
  { character: "寸", meaningFr: "pouce / mesure", meaningEn: "inch / measure", strokeCount: 3 },
  { character: "廾", meaningFr: "deux mains", meaningEn: "two hands", strokeCount: 3 },
  { character: "彐", meaningFr: "groin / tête de porc", meaningEn: "snout", strokeCount: 3 },
  { character: "攴", meaningFr: "frapper légèrement", meaningEn: "tap / strike", strokeCount: 4 },
  { character: "斤", meaningFr: "hache", meaningEn: "axe", strokeCount: 4 },
  { character: "方", meaningFr: "direction / carré", meaningEn: "direction / square", strokeCount: 4 },
  { character: "无", meaningFr: "néant", meaningEn: "nothing / nothingness", strokeCount: 4 },
  { character: "木", meaningFr: "arbre", meaningEn: "tree / wood", strokeCount: 4 }, // already defined, skip duplicate
  { character: "欠", meaningFr: "manque / bâillement", meaningEn: "lack / yawn", strokeCount: 4 },
  { character: "止", meaningFr: "s'arrêter", meaningEn: "stop", strokeCount: 4 },
  { character: "毋", meaningFr: "ne pas / mère", meaningEn: "do not / mother", strokeCount: 4 },
  { character: "气", meaningFr: "vapeur / air", meaningEn: "steam / air", strokeCount: 4 },
  { character: "米", meaningFr: "riz", meaningEn: "rice", strokeCount: 6 },
  { character: "纟", meaningFr: "fil (radical simplifié)", meaningEn: "thread radical", strokeCount: 3 },
  { character: "艹", meaningFr: "herbe / plante", meaningEn: "grass / plant", strokeCount: 3 },
  { character: "见", meaningFr: "voir (simplifié)", meaningEn: "see (simplified)", strokeCount: 4 },
  { character: "讠", meaningFr: "parole (radical)", meaningEn: "speech radical", strokeCount: 2 },
  { character: "隹", meaningFr: "oiseau à queue courte", meaningEn: "short-tailed bird", strokeCount: 8 },
  { character: "舌", meaningFr: "langue", meaningEn: "tongue", strokeCount: 6 },
  { character: "尸", meaningFr: "corps / cadavre", meaningEn: "corpse / body", strokeCount: 3 },
  { character: "彳", meaningFr: "pas / étape", meaningEn: "step / go", strokeCount: 3 },
  { character: "亍", meaningFr: "pas droit", meaningEn: "right step", strokeCount: 2 },
  { character: "音", meaningFr: "son / musique", meaningEn: "sound / music", strokeCount: 9 },
  { character: "良", meaningFr: "bon / excellent", meaningEn: "good / excellent", strokeCount: 7 },
  { character: "売", meaningFr: "vendre", meaningEn: "sell", strokeCount: 7 },
  { character: "首", meaningFr: "tête / cou", meaningEn: "head / neck", strokeCount: 9 },
  { character: "面", meaningFr: "visage / surface", meaningEn: "face / surface", strokeCount: 9 },
  { character: "气", meaningFr: "vapeur / air", meaningEn: "steam / air", strokeCount: 4 },
  { character: "乙", meaningFr: "deuxième / crochet", meaningEn: "second / hook", strokeCount: 1 },
  { character: "丨", meaningFr: "trait vertical", meaningEn: "vertical stroke", strokeCount: 1 },
  { character: "ノ", meaningFr: "trait oblique", meaningEn: "diagonal stroke", strokeCount: 1 },
  { character: "丶", meaningFr: "point", meaningEn: "dot", strokeCount: 1 },
  { character: "厂", meaningFr: "falaise / usine", meaningEn: "cliff / factory", strokeCount: 2 },
  { character: "刂", meaningFr: "couteau (radical)", meaningEn: "knife radical", strokeCount: 2 },
  { character: "亠", meaningFr: "couvercle / chapeau", meaningEn: "lid / cap", strokeCount: 2 },
  { character: "冂", meaningFr: "cadre ouvert en bas", meaningEn: "open frame", strokeCount: 2 },
  { character: "讠", meaningFr: "parole (radical)", meaningEn: "speech radical", strokeCount: 2 },
  { character: "氏", meaningFr: "clan / famille", meaningEn: "clan / family", strokeCount: 4 },
  { character: "殳", meaningFr: "arme / frapper", meaningEn: "weapon / strike", strokeCount: 4 },
  { character: "戈", meaningFr: "hallebarde", meaningEn: "halberd / spear", strokeCount: 4 },
  { character: "比", meaningFr: "comparer", meaningEn: "compare", strokeCount: 4 },
  { character: "毛", meaningFr: "poil / cheveu", meaningEn: "hair / fur", strokeCount: 4 },
  { character: "爪", meaningFr: "griffe / saisir", meaningEn: "claw / grasp", strokeCount: 4 },
  { character: "王", meaningFr: "roi", meaningEn: "king", strokeCount: 4 },
  { character: "玉", meaningFr: "jade / bijou", meaningEn: "jade / jewel", strokeCount: 5 },
  { character: "疒", meaningFr: "maladie", meaningEn: "sickness", strokeCount: 5 },
  { character: "皮", meaningFr: "peau", meaningEn: "skin / hide", strokeCount: 5 },
  { character: "矛", meaningFr: "lance", meaningEn: "spear", strokeCount: 5 },
  { character: "礻", meaningFr: "esprit (radical)", meaningEn: "spirit radical", strokeCount: 4 },
  { character: "竹", meaningFr: "bambou", meaningEn: "bamboo", strokeCount: 6 },
  { character: "肀", meaningFr: "pinceau", meaningEn: "brush", strokeCount: 4 },
  { character: "臼", meaningFr: "mortier", meaningEn: "mortar", strokeCount: 6 },
  { character: "自", meaningFr: "soi-même / nez", meaningEn: "self / nose", strokeCount: 6 },
  { character: "至", meaningFr: "arriver / jusqu'à", meaningEn: "arrive / until", strokeCount: 6 },
  { character: "色", meaningFr: "couleur", meaningEn: "color", strokeCount: 6 },
  { character: "虫", meaningFr: "insecte", meaningEn: "insect", strokeCount: 6 },
  { character: "血", meaningFr: "sang", meaningEn: "blood", strokeCount: 6 },
  { character: "見", meaningFr: "voir", meaningEn: "see", strokeCount: 7 },
  { character: "角", meaningFr: "angle / corne", meaningEn: "angle / horn", strokeCount: 7 },
  { character: "谷", meaningFr: "vallée", meaningEn: "valley", strokeCount: 7 },
  { character: "豆", meaningFr: "haricot", meaningEn: "bean", strokeCount: 7 },
  { character: "酉", meaningFr: "alcool / oiseau", meaningEn: "alcohol / bird", strokeCount: 7 },
  { character: "里", meaningFr: "village / li (mesure)", meaningEn: "village / mile", strokeCount: 7 },
  { character: "非", meaningFr: "non / faux", meaningEn: "not / wrong", strokeCount: 8 },
  { character: "風", meaningFr: "vent", meaningEn: "wind", strokeCount: 9 },
  { character: "飛", meaningFr: "voler", meaningEn: "fly", strokeCount: 9 },
  { character: "首", meaningFr: "tête / cou", meaningEn: "head / neck", strokeCount: 9 },
  { character: "香", meaningFr: "parfum", meaningEn: "fragrance", strokeCount: 9 },
  { character: "骨", meaningFr: "os", meaningEn: "bone", strokeCount: 10 },
  { character: "鬼", meaningFr: "fantôme / démon", meaningEn: "ghost / demon", strokeCount: 10 },
  // Key radicals for N5 decompositions
  { character: "牛", meaningFr: "bœuf / vache", meaningEn: "cow / ox", strokeCount: 4 },
  { character: "半", meaningFr: "moitié", meaningEn: "half", strokeCount: 5 },
  { character: "北", meaningFr: "nord", meaningEn: "north", strokeCount: 5 },
  { character: "古", meaningFr: "ancien", meaningEn: "old / ancient", strokeCount: 5 },
  { character: "外", meaningFr: "extérieur", meaningEn: "outside", strokeCount: 5 },
  { character: "右", meaningFr: "droite", meaningEn: "right", strokeCount: 5 },
  { character: "左", meaningFr: "gauche", meaningEn: "left", strokeCount: 5 },
  { character: "四", meaningFr: "quatre", meaningEn: "four", strokeCount: 5 },
  { character: "生", meaningFr: "vie / naissance", meaningEn: "life / birth", strokeCount: 5 },
  { character: "先", meaningFr: "d'abord / précédent", meaningEn: "before / ahead", strokeCount: 6 },
  { character: "年", meaningFr: "année", meaningEn: "year", strokeCount: 6 },
  { character: "多", meaningFr: "beaucoup", meaningEn: "many / much", strokeCount: 6 },
  { character: "安", meaningFr: "sécurité / bon marché", meaningEn: "safe / cheap", strokeCount: 6 },
  { character: "西", meaningFr: "ouest", meaningEn: "west", strokeCount: 6 },
  { character: "百", meaningFr: "cent", meaningEn: "hundred", strokeCount: 6 },
  { character: "休", meaningFr: "repos", meaningEn: "rest", strokeCount: 6 },
  { character: "米", meaningFr: "riz", meaningEn: "rice", strokeCount: 6 },
  { character: "行", meaningFr: "aller", meaningEn: "go", strokeCount: 6 },
  { character: "後", meaningFr: "après / derrière", meaningEn: "after / behind", strokeCount: 9 },
  { character: "前", meaningFr: "avant / devant", meaningEn: "before / front", strokeCount: 9 },
  { character: "南", meaningFr: "sud", meaningEn: "south", strokeCount: 9 },
  { character: "東", meaningFr: "est", meaningEn: "east", strokeCount: 8 },
  { character: "書", meaningFr: "écrire", meaningEn: "write", strokeCount: 10 },
  { character: "新", meaningFr: "nouveau", meaningEn: "new", strokeCount: 13 },
  { character: "読", meaningFr: "lire", meaningEn: "read", strokeCount: 14 },
  { character: "聞", meaningFr: "entendre", meaningEn: "hear / listen", strokeCount: 14 },
  { character: "話", meaningFr: "parler", meaningEn: "speak / talk", strokeCount: 13 },
  { character: "飲", meaningFr: "boire", meaningEn: "drink", strokeCount: 12 },
  { character: "来", meaningFr: "venir", meaningEn: "come", strokeCount: 7 },
  { character: "時", meaningFr: "heure / moment", meaningEn: "time / hour", strokeCount: 10 },
  { character: "校", meaningFr: "école", meaningEn: "school", strokeCount: 10 },
  { character: "気", meaningFr: "air / énergie / esprit", meaningEn: "air / energy / spirit", strokeCount: 6 },
  { character: "花", meaningFr: "fleur", meaningEn: "flower", strokeCount: 7 },
  { character: "見", meaningFr: "voir", meaningEn: "see", strokeCount: 7 },
  { character: "何", meaningFr: "quoi / combien", meaningEn: "what / how many", strokeCount: 7 },
  { character: "千", meaningFr: "mille", meaningEn: "thousand", strokeCount: 3 },
  { character: "万", meaningFr: "dix mille", meaningEn: "ten thousand", strokeCount: 3 },
  { character: "円", meaningFr: "yen / cercle", meaningEn: "yen / circle", strokeCount: 4 },
  { character: "分", meaningFr: "minute / part / comprendre", meaningEn: "minute / portion / understand", strokeCount: 4 },
  { character: "午", meaningFr: "midi / cheval", meaningEn: "noon / horse", strokeCount: 4 },
  { character: "少", meaningFr: "peu / jeune", meaningEn: "few / young", strokeCount: 4 },
  { character: "天", meaningFr: "ciel / paradis", meaningEn: "sky / heaven", strokeCount: 4 },
  { character: "毎", meaningFr: "chaque", meaningEn: "every / each", strokeCount: 6 },
  { character: "上", meaningFr: "haut / dessus", meaningEn: "above / up", strokeCount: 3 },
  { character: "下", meaningFr: "bas / dessous", meaningEn: "below / down", strokeCount: 3 },
  { character: "中", meaningFr: "milieu / intérieur", meaningEn: "middle / inside", strokeCount: 4 },
  { character: "六", meaningFr: "six", meaningEn: "six", strokeCount: 4 },
  { character: "七", meaningFr: "sept", meaningEn: "seven", strokeCount: 2 },
  { character: "九", meaningFr: "neuf", meaningEn: "nine", strokeCount: 2 },
  { character: "五", meaningFr: "cinq", meaningEn: "five", strokeCount: 4 },
  { character: "男", meaningFr: "homme", meaningEn: "man", strokeCount: 7 },
  { character: "母", meaningFr: "mère", meaningEn: "mother", strokeCount: 5 },
  { character: "友", meaningFr: "ami", meaningEn: "friend", strokeCount: 4 },
  { character: "学", meaningFr: "étudier / apprendre", meaningEn: "study / learn", strokeCount: 8 },
  { character: "出", meaningFr: "sortir", meaningEn: "exit / go out", strokeCount: 5 },
];

// De-duplicate by character (some entries may appear twice due to copy-paste above)
const seen = new Set<string>();
const uniqueRadicals = radicals.filter((r) => {
  if (seen.has(r.character)) return false;
  seen.add(r.character);
  return true;
});

// ─── Kanji → radical mapping ──────────────────────────────────────────────────
// Format: kanjiCharacter → [radical characters that compose it]
// Kanji that are themselves radicals are mapped to themselves (and any sub-radicals).

const kanjiRadicalMap: Record<string, string[]> = {
  // ── Numbers ──────────────────────────────────────────────────────────────────
  "一": ["一"],
  "二": ["二"],
  "三": ["三"],
  "四": ["四", "囗", "儿"],
  "五": ["五"],
  "六": ["六", "亠", "八"],
  "七": ["七"],
  "八": ["八"],
  "九": ["九"],
  "十": ["十"],
  "百": ["百", "一", "白"],
  "千": ["千", "十", "ノ"],
  "万": ["万"],

  // ── Money / units ────────────────────────────────────────────────────────────
  "円": ["円", "冂"],
  "年": ["年"],

  // ── Time ─────────────────────────────────────────────────────────────────────
  "月": ["月"],
  "日": ["日"],
  "時": ["時", "日", "土", "寸"],
  "分": ["分", "八", "刀"],
  "半": ["半", "八", "十"],
  "前": ["前", "月", "刂"],
  "後": ["後", "彳", "幺", "攴"],
  "午": ["午"],
  "毎": ["毎", "母"],

  // ── Questions ────────────────────────────────────────────────────────────────
  "何": ["何", "亻", "可", "口"],

  // ── Directions / positions ───────────────────────────────────────────────────
  "上": ["上"],
  "下": ["下"],
  "中": ["中", "口"],
  "外": ["外", "夕", "卜"],
  "右": ["右", "口", "又"],
  "左": ["左", "工", "又"],
  "北": ["北"],
  "南": ["南", "十"],
  "東": ["東", "木", "日"],
  "西": ["西"],

  // ── Body parts ───────────────────────────────────────────────────────────────
  "口": ["口"],
  "目": ["目"],
  "耳": ["耳"],
  "手": ["手"],
  "足": ["足", "口", "止"],

  // ── People / family ──────────────────────────────────────────────────────────
  "人": ["人"],
  "子": ["子"],
  "女": ["女"],
  "男": ["男", "田", "力"],
  "父": ["父"],
  "母": ["母"],
  "友": ["友", "又"],
  "先": ["先", "儿"],
  "生": ["生"],

  // ── Study / school ───────────────────────────────────────────────────────────
  "学": ["学", "子", "冖"],
  "校": ["校", "木", "交"],

  // ── Size / quality ───────────────────────────────────────────────────────────
  "大": ["大"],
  "小": ["小"],
  "高": ["高", "亠", "口"],
  "長": ["長"],
  "安": ["安", "宀", "女"],
  "新": ["新", "木", "斤", "立"],
  "古": ["古", "十", "口"],
  "多": ["多", "夕"],
  "少": ["少", "小"],

  // ── Colors ───────────────────────────────────────────────────────────────────
  "白": ["白", "日"],

  // ── Objects / things ─────────────────────────────────────────────────────────
  "本": ["本", "木"],

  // ── Nature ───────────────────────────────────────────────────────────────────
  "山": ["山"],
  "川": ["川"],
  "田": ["田"],
  "天": ["天", "大", "一"],
  "気": ["気", "气", "米"],
  "雨": ["雨"],
  "花": ["花", "艹", "化"],
  "水": ["水"],
  "火": ["火"],
  "金": ["金"],
  "土": ["土"],
  "木": ["木"],

  // ── Actions ──────────────────────────────────────────────────────────────────
  "休": ["休", "亻", "木"],
  "食": ["食", "亼", "良"],
  "飲": ["飲", "食", "欠"],
  "読": ["読", "言", "売"],
  "書": ["書", "肀", "日"],
  "見": ["見", "目", "儿"],
  "聞": ["聞", "門", "耳"],
  "話": ["話", "言", "舌"],
  "言": ["言"],
  "出": ["出", "山"],
  "入": ["入"],
  "行": ["行", "彳"],
  "来": ["来", "木"],
  "立": ["立"],
};

// ─── Main seeding function ────────────────────────────────────────────────────

async function main() {
  console.log("Seeding radicals…");

  // 1. Upsert all radicals
  for (const r of uniqueRadicals) {
    await prisma.radical.upsert({
      where: { character: r.character },
      update: {
        meaningFr: r.meaningFr,
        meaningEn: r.meaningEn,
        strokeCount: r.strokeCount,
      },
      create: {
        character: r.character,
        meaningFr: r.meaningFr,
        meaningEn: r.meaningEn,
        strokeCount: r.strokeCount,
      },
    });
  }

  console.log(`  ✓ Upserted ${uniqueRadicals.length} radicals`);

  // 2. Build a lookup map for radicals by character
  const radicalRecords = await prisma.radical.findMany();
  const radicalByChar = new Map(radicalRecords.map((r) => [r.character, r]));

  // 3. For each kanji, resolve associations
  let associationsCreated = 0;
  let associationsSkipped = 0;
  let kanjiNotFound = 0;

  for (const [kanjiChar, radicalChars] of Object.entries(kanjiRadicalMap)) {
    const kanji = await prisma.kanji.findUnique({ where: { character: kanjiChar } });

    if (!kanji) {
      console.warn(`  ⚠  Kanji not found in DB: ${kanjiChar} — skipping`);
      kanjiNotFound++;
      continue;
    }

    for (const radicalChar of radicalChars) {
      const radical = radicalByChar.get(radicalChar);
      if (!radical) {
        // Radical may not be in our list; skip silently
        associationsSkipped++;
        continue;
      }

      try {
        await prisma.kanjiRadical.upsert({
          where: {
            kanjiId_radicalId: {
              kanjiId: kanji.id,
              radicalId: radical.id,
            },
          },
          update: {},
          create: {
            kanjiId: kanji.id,
            radicalId: radical.id,
          },
        });
        associationsCreated++;
      } catch {
        associationsSkipped++;
      }
    }
  }

  console.log(`  ✓ KanjiRadical associations upserted: ${associationsCreated}`);
  if (associationsSkipped > 0)
    console.log(`  ⚠  Skipped (radical not in seed list): ${associationsSkipped}`);
  if (kanjiNotFound > 0)
    console.log(`  ⚠  Kanji not found in DB: ${kanjiNotFound}`);

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

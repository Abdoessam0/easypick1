import burger from "@/assets/meal-burger.jpg";
import wrap from "@/assets/meal-wrap.jpg";
import chickenBowl from "@/assets/meal-chicken-bowl.jpg";
import pesto from "@/assets/meal-pesto-pasta.jpg";
import shrimp from "@/assets/meal-shrimp.jpg";
import salmon from "@/assets/meal-salmon.jpg";
import tofu from "@/assets/meal-tofu.jpg";
import lentil from "@/assets/meal-lentil.jpg";
import grilled from "@/assets/meal-grilled-chicken.jpg";
import alfredo from "@/assets/meal-alfredo.jpg";
import fries from "@/assets/meal-fries.jpg";
import soup from "@/assets/meal-soup.jpg";

export type Mood = "hungry" | "light" | "fast";

export type Meal = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  calories: number;
  protein: number; // grams
  sugar: number; // grams
  prepTime: number; // minutes
  satiety: "Low" | "Medium" | "High";
  price: "$" | "$$" | "$$$";
  tags: string[];
  moods: Mood[];
};

export const MEALS: Meal[] = [
  {
    id: "burger",
    name: "Classic Burger",
    category: "Mains",
    description: "Juicy beef patty with cheese, lettuce, tomato & special sauce.",
    image: burger,
    calories: 780,
    protein: 28,
    sugar: 8,
    prepTime: 12,
    satiety: "High",
    price: "$$",
    tags: ["Filling", "Best Value"],
    moods: ["hungry"],
  },
  {
    id: "grilled-chicken",
    name: "Grilled Chicken",
    category: "Mains",
    description: "Grilled chicken with herbs, served with rice & veggies.",
    image: grilled,
    calories: 650,
    protein: 42,
    sugar: 4,
    prepTime: 15,
    satiety: "High",
    price: "$$",
    tags: ["High Protein", "Balanced Meal"],
    moods: ["hungry"],
  },
  {
    id: "alfredo",
    name: "Creamy Alfredo",
    category: "Pasta",
    description: "Creamy pasta with grilled chicken and parmesan.",
    image: alfredo,
    calories: 720,
    protein: 26,
    sugar: 6,
    prepTime: 14,
    satiety: "High",
    price: "$$",
    tags: ["Filling", "Balanced Meal"],
    moods: ["hungry"],
  },
  {
    id: "fries",
    name: "Loaded Fries",
    category: "Sides",
    description: "Crispy fries loaded with cheese sauce and beef bits.",
    image: fries,
    calories: 690,
    protein: 18,
    sugar: 3,
    prepTime: 10,
    satiety: "High",
    price: "$",
    tags: ["Filling", "Best Value"],
    moods: ["hungry"],
  },
  {
    id: "chicken-bowl",
    name: "Grilled Chicken Bowl",
    category: "Bowls",
    description: "Chicken, quinoa, roasted veggies, olive oil.",
    image: chickenBowl,
    calories: 450,
    protein: 32,
    sugar: 8,
    prepTime: 15,
    satiety: "Medium",
    price: "$$",
    tags: ["High Protein", "Low Sugar"],
    moods: ["light"],
  },
  {
    id: "tofu",
    name: "Tofu Buddha Bowl",
    category: "Bowls",
    description: "Tofu, chickpeas, sweet potato, quinoa, tahini.",
    image: tofu,
    calories: 380,
    protein: 20,
    sugar: 7,
    prepTime: 16,
    satiety: "Medium",
    price: "$$",
    tags: ["Balanced Meal", "Low Calorie"],
    moods: ["light"],
  },
  {
    id: "salmon",
    name: "Salmon & Veggie Plate",
    category: "Mains",
    description: "Salmon, brown rice, steamed veggies.",
    image: salmon,
    calories: 450,
    protein: 30,
    sugar: 5,
    prepTime: 18,
    satiety: "Medium",
    price: "$$$",
    tags: ["High Protein", "Fresh"],
    moods: ["light"],
  },
  {
    id: "lentil",
    name: "Lentil Soup & Bread",
    category: "Soups",
    description: "Hearty lentil soup with a side of whole grain bread.",
    image: lentil,
    calories: 320,
    protein: 14,
    sugar: 6,
    prepTime: 12,
    satiety: "Medium",
    price: "$",
    tags: ["Low Calorie", "Best Value"],
    moods: ["light"],
  },
  {
    id: "wrap",
    name: "Chicken Wrap",
    category: "Wraps",
    description: "Grilled chicken with fresh veggies and garlic sauce.",
    image: wrap,
    calories: 620,
    protein: 26,
    sugar: 5,
    prepTime: 10,
    satiety: "Medium",
    price: "$$",
    tags: ["Fast Prep", "Balanced Meal"],
    moods: ["fast", "hungry"],
  },
  {
    id: "shrimp",
    name: "Shrimp Stir Fry",
    category: "Mains",
    description: "Shrimp, mixed veggies, brown rice, sesame.",
    image: shrimp,
    calories: 440,
    protein: 26,
    sugar: 10,
    prepTime: 16,
    satiety: "Medium",
    price: "$$",
    tags: ["High Protein", "Fresh"],
    moods: ["fast", "light"],
  },
  {
    id: "pesto",
    name: "Pesto Chicken Pasta",
    category: "Pasta",
    description: "Chicken, whole wheat pasta, pesto, cherry tomatoes.",
    image: pesto,
    calories: 470,
    protein: 28,
    sugar: 12,
    prepTime: 17,
    satiety: "Medium",
    price: "$$",
    tags: ["Balanced Meal", "Fresh"],
    moods: ["fast"],
  },
  {
    id: "soup",
    name: "Soup Combo",
    category: "Soups",
    description: "Tomato soup with grilled cheese sandwich.",
    image: soup,
    calories: 410,
    protein: 16,
    sugar: 9,
    prepTime: 8,
    satiety: "Medium",
    price: "$",
    tags: ["Fast Prep", "Best Value"],
    moods: ["fast"],
  },
];

export const getMealsByMood = (mood: Mood): Meal[] => MEALS.filter((m) => m.moods.includes(mood));

export const getMealById = (id: string): Meal | undefined => MEALS.find((m) => m.id === id);

/* Smart Pick scoring */
export type LevelTriple = 0 | 1 | 2; // 0 low, 1 normal, 2 high

export type Prefs = {
  protein: LevelTriple;
  calories: LevelTriple; // 0 light - 2 filling
  sugar: LevelTriple; // 0 less sweet - 2 sweet ok
  energy: LevelTriple; // 0 light - 2 boost
};

const scoreTarget = (val: number, low: number, high: number, pref: LevelTriple) => {
  // returns 0..1 based on how close val is to preferred zone
  const t = (val - low) / (high - low);
  const clamped = Math.max(0, Math.min(1, t));
  const target = pref === 0 ? 0 : pref === 1 ? 0.5 : 1;
  return 1 - Math.abs(clamped - target);
};

export const scoreMeal = (meal: Meal, prefs: Prefs): number => {
  const sProtein = scoreTarget(meal.protein, 10, 45, prefs.protein);
  const sCal = scoreTarget(meal.calories, 300, 800, prefs.calories);
  const sSugar = scoreTarget(meal.sugar, 2, 14, prefs.sugar);
  const energyEst = meal.calories * 0.6 + meal.protein * 4; // arbitrary energy proxy
  const sEnergy = scoreTarget(energyEst, 280, 800, prefs.energy);
  return (sProtein * 1.2 + sCal + sSugar + sEnergy) / 4.2;
};

export const getSmartMatches = (prefs: Prefs): { meal: Meal; match: number }[] => {
  return MEALS.map((m) => ({ meal: m, match: scoreMeal(m, prefs) }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 6);
};

/* Comparison logic — returns "a" | "b" | "tie" per metric and overall */
export type CompareCtx = { kind: "mood"; mood: Mood } | { kind: "smart"; prefs: Prefs };

export const pickWinner = (a: Meal, b: Meal, ctx: CompareCtx) => {
  if (ctx.kind === "smart") {
    const sa = scoreMeal(a, ctx.prefs);
    const sb = scoreMeal(b, ctx.prefs);
    return { winner: sa === sb ? "tie" : sa > sb ? "a" : "b", score: { a: sa, b: sb } };
  }
  const mood = ctx.mood;
  let sa = 0;
  let sb = 0;
  if (mood === "hungry") {
    sa = (a.satiety === "High" ? 2 : a.satiety === "Medium" ? 1 : 0) + a.calories / 1000;
    sb = (b.satiety === "High" ? 2 : b.satiety === "Medium" ? 1 : 0) + b.calories / 1000;
  } else if (mood === "light") {
    sa = (a.calories < 500 ? 2 : 0) + (a.sugar < 8 ? 1 : 0) + a.protein / 60;
    sb = (b.calories < 500 ? 2 : 0) + (b.sugar < 8 ? 1 : 0) + b.protein / 60;
  } else {
    sa = 1 - a.prepTime / 30;
    sb = 1 - b.prepTime / 30;
  }
  return { winner: sa === sb ? "tie" : sa > sb ? "a" : "b", score: { a: sa, b: sb } };
};

/* Per-metric "better" depending on context */
export const metricBetter = (a: number, b: number, preferHigher: boolean): "a" | "b" | "tie" => {
  if (a === b) return "tie";
  return preferHigher ? (a > b ? "a" : "b") : a < b ? "a" : "b";
};

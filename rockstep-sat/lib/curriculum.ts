import type { Level, Subject } from "./types";

export interface Domain {
  id: string;
  subject: Subject;
  name: string;
}

export interface Skill {
  id: string;
  subject: Subject;
  domain: string;
  name: string;
  /** Approximate share of the section's questions. Used to prioritize when time is short. */
  weight: number;
  /** What the skill asks, used when prompting the AI. */
  about: string;
  tip: string;
}

export const DOMAINS: Domain[] = [
  { id: "ii", subject: "rw", name: "Information & Ideas" },
  { id: "cs", subject: "rw", name: "Craft & Structure" },
  { id: "ei", subject: "rw", name: "Expression of Ideas" },
  { id: "sec", subject: "rw", name: "Standard English Conventions" },
  { id: "alg", subject: "math", name: "Algebra" },
  { id: "adv", subject: "math", name: "Advanced Math" },
  { id: "psda", subject: "math", name: "Problem-Solving & Data Analysis" },
  { id: "geo", subject: "math", name: "Geometry & Trigonometry" },
];

export const SKILLS: Skill[] = [
  // Reading & Writing: Information & Ideas
  {
    id: "cid", subject: "rw", domain: "ii", name: "Central ideas and details", weight: 0.07,
    about: "Identify the main idea of a short passage or a key supporting detail.",
    tip: "Before looking at the choices, say the main idea to yourself in under ten words. Wrong answers are often true details that are too narrow, or claims that go further than the text.",
  },
  {
    id: "coe_t", subject: "rw", domain: "ii", name: "Textual evidence", weight: 0.07,
    about: "Choose the finding or quotation that best supports or illustrates a stated claim.",
    tip: "Find the exact claim first. The right evidence matches every part of it, not just the topic.",
  },
  {
    id: "coe_q", subject: "rw", domain: "ii", name: "Quantitative evidence", weight: 0.06,
    about: "Use data from a table or graph to complete or support a claim in a passage.",
    tip: "Read the sentence you're completing before the table. Several choices will be true about the data, but only one fits the claim.",
  },
  {
    id: "inf", subject: "rw", domain: "ii", name: "Inferences", weight: 0.06,
    about: "Choose the conclusion that most logically completes a passage.",
    tip: "The right answer follows directly from what the text says. If a choice needs an extra assumption, cross it out.",
  },
  // Craft & Structure
  {
    id: "wic", subject: "rw", domain: "cs", name: "Words in context", weight: 0.12,
    about: "Choose the most logical and precise word or phrase for a blank, or the meaning of a word as used.",
    tip: "Cover the choices and predict your own word for the blank from the clues around it. Then pick the choice closest to your prediction.",
  },
  {
    id: "tsp", subject: "rw", domain: "cs", name: "Text structure and purpose", weight: 0.09,
    about: "Describe the main purpose of a text or the function of one sentence within it.",
    tip: "Ask what the author is doing, not what the text is about: explaining, contrasting, challenging, illustrating?",
  },
  {
    id: "ctc", subject: "rw", domain: "cs", name: "Cross-text connections", weight: 0.07,
    about: "Compare two short texts and predict how one author would respond to the other.",
    tip: "Summarize each text's position in one line, then find exactly where they agree or disagree.",
  },
  // Expression of Ideas
  {
    id: "rs", subject: "rw", domain: "ei", name: "Rhetorical synthesis", weight: 0.12,
    about: "Given a student's notes and a stated goal, choose the sentence that best accomplishes the goal.",
    tip: "Read the goal in the question first. You don't need the notes to answer most of these; you need the choice that does exactly what the goal says.",
  },
  {
    id: "tr", subject: "rw", domain: "ei", name: "Transitions", weight: 0.08,
    about: "Choose the transition word or phrase that best shows the logical relationship between sentences.",
    tip: "Decide the relationship first: same direction (also, similarly), opposite (however), cause-effect (therefore), or example (for instance).",
  },
  // Standard English Conventions
  {
    id: "bnd", subject: "rw", domain: "sec", name: "Boundaries", weight: 0.14,
    about: "Use punctuation correctly between and within sentences: periods, semicolons, colons, commas, dashes.",
    tip: "A semicolon and a period both need a complete sentence on each side. A colon needs a complete sentence before it.",
  },
  {
    id: "fss", subject: "rw", domain: "sec", name: "Form, structure, and sense", weight: 0.12,
    about: "Subject-verb agreement, pronoun agreement, verb tense, plurals and possessives, and modifiers.",
    tip: "Find the real subject by crossing out phrases between it and the verb. 'The list of items is long', not 'are'.",
  },
  // Math: Algebra
  {
    id: "lin1", subject: "math", domain: "alg", name: "Linear equations in one variable", weight: 0.08,
    about: "Solve and interpret linear equations in one variable, including ones with no or infinitely many solutions.",
    tip: "Do the same thing to both sides, one step at a time. For 'infinitely many solutions', both sides must end up identical.",
  },
  {
    id: "linf", subject: "math", domain: "alg", name: "Linear functions", weight: 0.08,
    about: "Evaluate, build, and interpret linear functions, including slope and intercept in context.",
    tip: "In context, slope is the rate (per hour, per item) and the y-intercept is the starting amount.",
  },
  {
    id: "lin2", subject: "math", domain: "alg", name: "Linear equations in two variables", weight: 0.06,
    about: "Write, graph, and interpret lines in the xy-plane, including parallel and perpendicular lines.",
    tip: "Parallel lines share a slope. Perpendicular slopes are negative reciprocals: 2/3 becomes -3/2.",
  },
  {
    id: "sys", subject: "math", domain: "alg", name: "Systems of linear equations", weight: 0.07,
    about: "Solve systems of two linear equations and reason about how many solutions they have.",
    tip: "If adding or subtracting the equations cancels a variable, do that. It's usually faster than substitution.",
  },
  {
    id: "ineq", subject: "math", domain: "alg", name: "Linear inequalities", weight: 0.06,
    about: "Write, solve, and interpret linear inequalities and systems of inequalities.",
    tip: "Multiplying or dividing by a negative number flips the inequality sign.",
  },
  // Advanced Math
  {
    id: "equiv", subject: "math", domain: "adv", name: "Equivalent expressions", weight: 0.11,
    about: "Rewrite, expand, factor, and simplify polynomial and rational expressions.",
    tip: "Stuck? Plug in a simple number like x = 2 into the original and each choice. The equivalent one gives the same value.",
  },
  {
    id: "nleq", subject: "math", domain: "adv", name: "Nonlinear equations and systems", weight: 0.11,
    about: "Solve quadratic, radical, and other nonlinear equations and systems.",
    tip: "Set quadratics equal to zero before factoring. For sums of solutions, -b/a saves time.",
  },
  {
    id: "nlf", subject: "math", domain: "adv", name: "Nonlinear functions", weight: 0.13,
    about: "Interpret and use quadratic and exponential functions, including vertex form and growth or decay rates.",
    tip: "In a(1 + r)^t, r is the percent change per period. 0.85 means a 15% decrease each period.",
  },
  // Problem-Solving & Data Analysis
  {
    id: "ratio", subject: "math", domain: "psda", name: "Ratios, rates, and units", weight: 0.03,
    about: "Solve problems with ratios, rates, proportions, and unit conversions.",
    tip: "Write units next to every number and cancel them like fractions. The units tell you whether to multiply or divide.",
  },
  {
    id: "pct", subject: "math", domain: "psda", name: "Percentages", weight: 0.03,
    about: "Percent of a quantity, percent change, and repeated percent changes.",
    tip: "A 20% increase means multiply by 1.2. A 20% decrease means multiply by 0.8. Chain the multipliers.",
  },
  {
    id: "data1", subject: "math", domain: "psda", name: "One-variable data", weight: 0.025,
    about: "Mean, median, range, spread, and how outliers affect them.",
    tip: "Outliers pull the mean much more than the median.",
  },
  {
    id: "data2", subject: "math", domain: "psda", name: "Two-variable data", weight: 0.025,
    about: "Scatterplots, lines of best fit, two-way tables, and linear versus exponential models.",
    tip: "Linear models add the same amount each step. Exponential models multiply by the same factor each step.",
  },
  {
    id: "prob", subject: "math", domain: "psda", name: "Probability", weight: 0.02,
    about: "Probability and conditional probability, often from two-way tables.",
    tip: "In 'given that' questions, the denominator is only the group named after 'given'.",
  },
  {
    id: "infer", subject: "math", domain: "psda", name: "Sample statistics and margin of error", weight: 0.015,
    about: "Estimate population values from random samples and interpret margins of error.",
    tip: "Results only generalize to the population the sample was randomly drawn from. Bigger samples mean smaller margins of error.",
  },
  {
    id: "claims", subject: "math", domain: "psda", name: "Evaluating statistical claims", weight: 0.015,
    about: "Judge what conclusions a study supports, including causation versus association.",
    tip: "Cause and effect needs random assignment. Without it, the study only shows an association.",
  },
  // Geometry & Trigonometry
  {
    id: "area", subject: "math", domain: "geo", name: "Area and volume", weight: 0.045,
    about: "Area, surface area, and volume of common shapes and solids, including scaling.",
    tip: "Formulas are on the reference sheet in the test. If lengths scale by k, areas scale by k² and volumes by k³.",
  },
  {
    id: "lat", subject: "math", domain: "geo", name: "Lines, angles, and triangles", weight: 0.04,
    about: "Angle relationships, parallel lines, triangle angle sums, and similar triangles.",
    tip: "Angles in a triangle add to 180°. With parallel lines, angles are either equal or add to 180°.",
  },
  {
    id: "trig", subject: "math", domain: "geo", name: "Right triangles and trigonometry", weight: 0.04,
    about: "Pythagorean theorem, special right triangles, and sine, cosine, and tangent.",
    tip: "SOH CAH TOA. And sin(x°) = cos(90° − x°) for complementary angles.",
  },
  {
    id: "circ", subject: "math", domain: "geo", name: "Circles", weight: 0.025,
    about: "Area, circumference, arcs, sectors, and equations of circles in the xy-plane.",
    tip: "For a circle equation, complete the square to get (x − h)² + (y − k)² = r².",
  },
];

export const LEVELS: Level[] = [1, 2, 3, 4];

export const LEVEL_NAME: Record<Level, string> = {
  1: "Foundation",
  2: "Core",
  3: "Advanced",
  4: "Expert",
};

export const LEVEL_ABOUT: Record<Level, string> = {
  1: "easy questions for students scoring below about 480 on a 200-800 section: one step, familiar setups",
  2: "medium questions for students scoring about 480-580: two steps, typical test wording",
  3: "hard questions for students scoring about 580-680: several steps, plausible wrong answers built on common mistakes",
  4: "the hardest questions on the Digital SAT, for students aiming at 680-800: multi-step reasoning, unfamiliar or abstract setups, constants to solve for, and wrong answers that are very close to right",
};

export function skillById(id: string): Skill {
  const s = SKILLS.find((k) => k.id === id);
  if (!s) throw new Error(`Unknown skill ${id}`);
  return s;
}

export function domainById(id: string): Domain {
  const d = DOMAINS.find((k) => k.id === id);
  if (!d) throw new Error(`Unknown domain ${id}`);
  return d;
}

export function domainsFor(subject: Subject): Domain[] {
  return DOMAINS.filter((d) => d.subject === subject);
}

export function skillsFor(domain: string): Skill[] {
  return SKILLS.filter((s) => s.domain === domain);
}

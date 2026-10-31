import type { BankItem } from "./index";

// Math is written between $...$ and rendered with KaTeX. A literal dollar sign is written \\$.

export const MATH_ITEMS: BankItem[] = [
  // ───────── Linear equations in one variable ─────────
  {
    skill: "lin1", level: 1,
    stem: "If $3x + 7 = 22$, what is the value of $x$?",
    choices: ["$3$", "$5$", "$\\frac{29}{3}$", "$15$"],
    answer: 1,
    explanation: "Subtract 7 from both sides: $3x = 15$. Divide by 3: $x = 5$.",
  },
  {
    skill: "lin1", level: 1,
    stem: "What value of $x$ satisfies $2(x - 4) = 10$?",
    accepted: ["9"],
    explanation: "Divide both sides by 2: $x - 4 = 5$. Add 4: $x = 9$.",
  },
  {
    skill: "lin1", level: 2,
    stem: "What value of $x$ satisfies $\\frac{x}{3} + 2 = \\frac{x}{2} - 1$?",
    choices: ["$6$", "$12$", "$18$", "$36$"],
    answer: 2,
    explanation: "Multiply every term by 6: $2x + 12 = 3x - 6$. Subtract $2x$ and add 6: $x = 18$.",
  },
  {
    skill: "lin1", level: 2,
    stem: "A plumber charges a \\$45 service fee plus \\$30 per hour of work. A customer's total bill was \\$165. For how many hours did the plumber work?",
    choices: ["$3$", "$4$", "$5$", "$5.5$"],
    answer: 1,
    explanation: "Set up $45 + 30h = 165$. Subtract 45: $30h = 120$, so $h = 4$.",
  },
  {
    skill: "lin1", level: 3,
    stem: "In the equation $3(2x - k) = 6x + 9$, $k$ is a constant. If the equation has infinitely many solutions, what is the value of $k$?",
    choices: ["$-9$", "$-3$", "$3$", "$9$"],
    answer: 1,
    explanation: "Expand: $6x - 3k = 6x + 9$. For infinitely many solutions, both sides must match, so $-3k = 9$ and $k = -3$.",
  },

  // ───────── Linear functions ─────────
  {
    skill: "linf", level: 1,
    stem: "The function $f$ is defined by $f(x) = 5x - 3$. What is the value of $f(4)$?",
    choices: ["$12$", "$17$", "$20$", "$23$"],
    answer: 1,
    explanation: "Substitute 4: $f(4) = 5(4) - 3 = 20 - 3 = 17$.",
  },
  {
    skill: "linf", level: 1,
    stem: "A line passes through the points $(0, 2)$ and $(3, 8)$. What is the slope of the line?",
    choices: ["$\\frac{1}{2}$", "$2$", "$3$", "$6$"],
    answer: 1,
    explanation: "Slope is change in $y$ over change in $x$: $\\frac{8 - 2}{3 - 0} = \\frac{6}{3} = 2$.",
  },
  {
    skill: "linf", level: 2,
    stem: "A gym's total cost, in dollars, for $m$ months of membership is given by $C(m) = 25m + 40$. What does the number 40 represent?",
    choices: [
      "The monthly membership fee",
      "A one-time fee paid at the start",
      "The total cost after one month",
      "The number of months of membership",
    ],
    answer: 1,
    explanation: "40 is the cost when $m = 0$, before any months pass. It's a one-time starting fee. 25 is the monthly fee.",
  },
  {
    skill: "linf", level: 2,
    stem: "For the linear function $f$, $f(2) = 7$ and $f(6) = 19$. What is the value of $f(10)$?",
    accepted: ["31"],
    explanation: "Slope: $\\frac{19 - 7}{6 - 2} = 3$. From $x = 6$ to $x = 10$, $f$ increases by $4 \\cdot 3 = 12$, so $f(10) = 19 + 12 = 31$.",
  },
  {
    skill: "linf", level: 3,
    stem: "The function $g$ is defined by $g(x) = ax + b$, where $a$ and $b$ are constants. If $g(0) = -4$ and the graph of $y = g(x)$ passes through $(5, 6)$, what is the value of $a + b$?",
    choices: ["$-6$", "$-2$", "$2$", "$6$"],
    answer: 1,
    explanation: "$g(0) = b = -4$. Then $5a - 4 = 6$, so $a = 2$. So $a + b = 2 + (-4) = -2$.",
  },

  // ───────── Linear equations in two variables ─────────
  {
    skill: "lin2", level: 1,
    stem: "What is the $y$-intercept of the graph of $2x + 3y = 12$ in the $xy$-plane?",
    choices: ["$(0, 4)$", "$(0, 6)$", "$(4, 0)$", "$(6, 0)$"],
    answer: 0,
    explanation: "The $y$-intercept is where $x = 0$: $3y = 12$, so $y = 4$. The point is $(0, 4)$.",
  },
  {
    skill: "lin2", level: 1,
    stem: "A store sells pens for \\$2 each and notebooks for \\$5 each. Ana spent exactly \\$40 on $p$ pens and $n$ notebooks. Which equation represents this situation?",
    choices: ["$5p + 2n = 40$", "$2p + 5n = 40$", "$7(p + n) = 40$", "$2p = 5n + 40$"],
    answer: 1,
    explanation: "Pens cost \\$2 each, so they cost $2p$ in total. Notebooks cost $5n$. Together: $2p + 5n = 40$.",
  },
  {
    skill: "lin2", level: 2,
    stem: "A line in the $xy$-plane passes through $(1, 3)$ and $(4, 12)$. Which equation represents the line?",
    choices: ["$y = 3x$", "$y = 3x + 3$", "$y = 4x - 1$", "$y = x + 2$"],
    answer: 0,
    explanation: "Slope: $\\frac{12 - 3}{4 - 1} = 3$. Using $(1, 3)$: $3 = 3(1) + b$, so $b = 0$. The line is $y = 3x$.",
  },
  {
    skill: "lin2", level: 2,
    stem: "Which of the following could be the slope of a line perpendicular to $y = \\frac{2}{3}x + 1$?",
    choices: ["$\\frac{2}{3}$", "$-\\frac{2}{3}$", "$\\frac{3}{2}$", "$-\\frac{3}{2}$"],
    answer: 3,
    explanation: "Perpendicular slopes are negative reciprocals. The reciprocal of $\\frac{2}{3}$ is $\\frac{3}{2}$; make it negative: $-\\frac{3}{2}$.",
  },
  {
    skill: "lin2", level: 3,
    stem: "Line $\\ell$ has equation $4x - 6y = 18$. Line $k$ is parallel to $\\ell$ and passes through $(3, 5)$. What is the $y$-coordinate of the $y$-intercept of line $k$?",
    accepted: ["3"],
    explanation: "Rewrite $\\ell$: $y = \\frac{2}{3}x - 3$, so the slope is $\\frac{2}{3}$. Line $k$: $5 = \\frac{2}{3}(3) + b$, so $b = 3$.",
  },

  // ───────── Systems ─────────
  {
    skill: "sys", level: 1,
    stem: "If $x + y = 10$ and $x - y = 4$, what is the value of $x$?",
    choices: ["$3$", "$6$", "$7$", "$14$"],
    answer: 2,
    explanation: "Add the equations: $2x = 14$, so $x = 7$.",
  },
  {
    skill: "sys", level: 1,
    stem: "If $y = 2x$ and $x + y = 12$, what is the value of $y$?",
    choices: ["$4$", "$6$", "$8$", "$12$"],
    answer: 2,
    explanation: "Substitute: $x + 2x = 12$, so $x = 4$ and $y = 2(4) = 8$.",
  },
  {
    skill: "sys", level: 2,
    stem: "A theater sold 30 tickets for \\$195. Adult tickets cost \\$8 and child tickets cost \\$5. How many adult tickets were sold?",
    choices: ["$10$", "$12$", "$15$", "$18$"],
    answer: 2,
    explanation: "$a + c = 30$ and $8a + 5c = 195$. Substitute $c = 30 - a$: $8a + 150 - 5a = 195$, so $3a = 45$ and $a = 15$.",
  },
  {
    skill: "sys", level: 2,
    stem: "If $3x + 2y = 16$ and $5x - 2y = 0$, what is the value of $x + y$?",
    accepted: ["7"],
    explanation: "Add the equations: $8x = 16$, so $x = 2$. Then $3(2) + 2y = 16$ gives $y = 5$. So $x + y = 7$.",
  },
  {
    skill: "sys", level: 3,
    stem: "In the system $ax + 3y = 5$ and $4x + 6y = 18$, $a$ is a constant. For what value of $a$ does the system have no solution?",
    choices: ["$2$", "$3$", "$4$", "$6$"],
    answer: 0,
    explanation: "No solution means parallel lines. Divide the second equation by 2: $2x + 3y = 9$. With $a = 2$, the first is $2x + 3y = 5$: same left side, different right side, so no solution.",
  },

  // ───────── Inequalities ─────────
  {
    skill: "ineq", level: 1,
    stem: "Which value of $x$ satisfies $3x - 5 > 10$?",
    choices: ["$3$", "$4$", "$5$", "$6$"],
    answer: 3,
    explanation: "Add 5: $3x > 15$, so $x > 5$. Only 6 is greater than 5.",
  },
  {
    skill: "ineq", level: 1,
    stem: "A phone plan costs \\$20 per month plus \\$0.10 per text. Jo wants to spend at most \\$35 this month. Which inequality represents the number of texts, $t$, Jo can send?",
    choices: ["$20 + 0.10t \\le 35$", "$20 + 0.10t \\ge 35$", "$20t + 0.10 \\le 35$", "$0.10 + 20t \\ge 35$"],
    answer: 0,
    explanation: "Total cost is $20 + 0.10t$, and 'at most' means less than or equal to: $20 + 0.10t \\le 35$.",
  },
  {
    skill: "ineq", level: 2,
    stem: "Which of the following is the solution to $-2x + 7 \\ge 1$?",
    choices: ["$x \\le 3$", "$x \\ge 3$", "$x \\le -3$", "$x \\ge -4$"],
    answer: 0,
    explanation: "Subtract 7: $-2x \\ge -6$. Dividing by $-2$ flips the sign: $x \\le 3$.",
  },
  {
    skill: "ineq", level: 2,
    stem: "Notebooks cost \\$4 each, and an online order also has a \\$6 shipping fee. With at most \\$50 to spend, what is the greatest number of notebooks Lee can order?",
    accepted: ["11"],
    explanation: "$4n + 6 \\le 50$, so $4n \\le 44$ and $n \\le 11$.",
  },
  {
    skill: "ineq", level: 3,
    stem: "Which point $(x, y)$ is a solution to the system $y > 2x - 1$ and $y < -x + 5$?",
    choices: ["$(3, 1)$", "$(0, -2)$", "$(2, 4)$", "$(1, 2)$"],
    answer: 3,
    explanation: "Test $(1, 2)$: $2 > 2(1) - 1 = 1$ ✓ and $2 < -1 + 5 = 4$ ✓. Each other point fails one inequality.",
  },

  // ───────── Equivalent expressions ─────────
  {
    skill: "equiv", level: 1,
    stem: "Which expression is equivalent to $3(x + 4) - 2x$?",
    choices: ["$x + 4$", "$x + 12$", "$5x + 12$", "$x + 16$"],
    answer: 1,
    explanation: "Distribute: $3x + 12 - 2x = x + 12$.",
  },
  {
    skill: "equiv", level: 1,
    stem: "Which expression is equivalent to $(x + 3)(x + 2)$?",
    choices: ["$x^2 + 5x + 6$", "$x^2 + 6x + 5$", "$x^2 + 5$", "$x^2 + 6x + 6$"],
    answer: 0,
    explanation: "FOIL: $x^2 + 2x + 3x + 6 = x^2 + 5x + 6$.",
  },
  {
    skill: "equiv", level: 2,
    stem: "Which expression is equivalent to $x^2 - 9$?",
    choices: ["$(x - 3)^2$", "$(x - 9)(x + 1)$", "$(x - 3)(x + 3)$", "$(x + 3)^2$"],
    answer: 2,
    explanation: "Difference of squares: $a^2 - b^2 = (a - b)(a + b)$, so $x^2 - 9 = (x - 3)(x + 3)$.",
  },
  {
    skill: "equiv", level: 2,
    stem: "For $x \\neq 0$, which expression is equivalent to $\\frac{6x^3 + 9x^2}{3x}$?",
    choices: ["$2x^2 + 3x$", "$2x^3 + 3x^2$", "$3x^2 + 3x$", "$2x^2 + 9x^2$"],
    answer: 0,
    explanation: "Divide each term by $3x$: $\\frac{6x^3}{3x} = 2x^2$ and $\\frac{9x^2}{3x} = 3x$.",
  },
  {
    skill: "equiv", level: 3,
    stem: "If $(2x + a)(x - 3) = 2x^2 + bx - 12$ for all values of $x$, where $a$ and $b$ are constants, what is the value of $b$?",
    accepted: ["-2"],
    explanation: "Constant terms: $a \\cdot (-3) = -12$, so $a = 4$. The $x$ terms: $-6x + ax = (-6 + 4)x = -2x$, so $b = -2$.",
  },

  // ───────── Nonlinear equations ─────────
  {
    skill: "nleq", level: 1,
    stem: "If $x^2 = 49$ and $x > 0$, what is the value of $x$?",
    choices: ["$7$", "$14$", "$24.5$", "$49$"],
    answer: 0,
    explanation: "The positive square root of 49 is 7.",
  },
  {
    skill: "nleq", level: 1,
    stem: "What are the solutions to $(x - 2)(x + 5) = 0$?",
    choices: ["$x = 2$ and $x = 5$", "$x = -2$ and $x = 5$", "$x = 2$ and $x = -5$", "$x = -2$ and $x = -5$"],
    answer: 2,
    explanation: "A product is zero when a factor is zero: $x - 2 = 0$ gives $x = 2$, and $x + 5 = 0$ gives $x = -5$.",
  },
  {
    skill: "nleq", level: 2,
    stem: "What is the sum of the solutions to $x^2 - 6x + 8 = 0$?",
    choices: ["$2$", "$4$", "$6$", "$8$"],
    answer: 2,
    explanation: "Factor: $(x - 2)(x - 4) = 0$, so the solutions are 2 and 4, and their sum is 6. (Shortcut: sum $= -\\frac{b}{a} = 6$.)",
  },
  {
    skill: "nleq", level: 2,
    stem: "If $\\sqrt{x + 4} = 5$, what is the value of $x$?",
    accepted: ["21"],
    explanation: "Square both sides: $x + 4 = 25$, so $x = 21$.",
  },
  {
    skill: "nleq", level: 3,
    stem: "How many solutions does the system $y = x^2 - 4x + 7$ and $y = 3$ have?",
    choices: ["Zero", "Exactly one", "Exactly two", "Infinitely many"],
    answer: 1,
    explanation: "Set equal: $x^2 - 4x + 7 = 3$, so $x^2 - 4x + 4 = 0$, which is $(x - 2)^2 = 0$. Only $x = 2$ works: exactly one solution.",
  },

  // ───────── Nonlinear functions ─────────
  {
    skill: "nlf", level: 1,
    stem: "If $f(x) = x^2 + 1$, what is the value of $f(3)$?",
    choices: ["$7$", "$9$", "$10$", "$16$"],
    answer: 2,
    explanation: "$f(3) = 3^2 + 1 = 9 + 1 = 10$.",
  },
  {
    skill: "nlf", level: 1,
    stem: "A population of 50 bacteria doubles every hour. How many bacteria will there be after 3 hours?",
    choices: ["$150$", "$200$", "$300$", "$400$"],
    answer: 3,
    explanation: "Double three times: $50 \\to 100 \\to 200 \\to 400$. Or $50 \\cdot 2^3 = 400$.",
  },
  {
    skill: "nlf", level: 2,
    stem: "The function $f$ is defined by $f(x) = 2(x - 3)^2 + 5$. What is the vertex of the graph of $y = f(x)$?",
    choices: ["$(3, 5)$", "$(-3, 5)$", "$(3, -5)$", "$(2, 5)$"],
    answer: 0,
    explanation: "Vertex form $a(x - h)^2 + k$ has vertex $(h, k)$. Here $h = 3$ and $k = 5$.",
  },
  {
    skill: "nlf", level: 2,
    stem: "The value, in dollars, of a car $t$ years after purchase is modeled by $V(t) = 24{,}000(0.85)^t$. Which statement best describes the meaning of 0.85?",
    choices: [
      "The car loses \\$0.85 in value each year.",
      "The car's value decreases by 85% each year.",
      "The car's value decreases by 15% each year.",
      "The car was bought for 85% of its original price.",
    ],
    answer: 2,
    explanation: "Multiplying by 0.85 keeps 85% of the value each year, which is a 15% decrease per year.",
  },
  {
    skill: "nlf", level: 3,
    stem: "The function $f(x) = x^2 - 10x + c$, where $c$ is a constant, has a minimum value of 4. What is the value of $c$?",
    accepted: ["29"],
    explanation: "The minimum occurs at $x = -\\frac{b}{2a} = 5$. So $f(5) = 25 - 50 + c = 4$, which gives $c = 29$.",
  },

  // ───────── Ratios, rates, units ─────────
  {
    skill: "ratio", level: 1,
    stem: "A recipe uses 3 cups of flour for every 2 cups of sugar. How many cups of sugar are needed with 9 cups of flour?",
    choices: ["$4$", "$5$", "$6$", "$9$"],
    answer: 2,
    explanation: "9 cups of flour is 3 times the recipe, so use $2 \\cdot 3 = 6$ cups of sugar.",
  },
  {
    skill: "ratio", level: 1,
    stem: "A car travels 150 miles in 3 hours at a constant speed. What is its speed, in miles per hour?",
    choices: ["$30$", "$45$", "$50$", "$450$"],
    answer: 2,
    explanation: "Speed = distance ÷ time = $150 \\div 3 = 50$ miles per hour.",
  },
  {
    skill: "ratio", level: 2,
    stem: "A machine fills 12 bottles per minute. How many bottles does it fill in 2.5 hours?",
    choices: ["$30$", "$180$", "$1{,}500$", "$1{,}800$"],
    answer: 3,
    explanation: "2.5 hours is $2.5 \\cdot 60 = 150$ minutes. $150 \\cdot 12 = 1{,}800$ bottles.",
  },
  {
    skill: "ratio", level: 2,
    stem: "On a map, 1 inch represents 40 miles. Two towns are 3.25 inches apart on the map. How many miles apart are the towns?",
    accepted: ["130"],
    explanation: "$3.25 \\cdot 40 = 130$ miles.",
  },
  {
    skill: "ratio", level: 3,
    stem: "An object has a mass of 540 grams and a volume of 200 cubic centimeters. What is its density in kilograms per cubic meter? (1 kg = 1,000 g and 1 m³ = 1,000,000 cm³)",
    choices: ["$2.7$", "$27$", "$270$", "$2{,}700$"],
    answer: 3,
    explanation: "Density = $\\frac{540}{200} = 2.7$ g/cm³. Convert: $2.7 \\cdot \\frac{1{,}000{,}000}{1{,}000} = 2{,}700$ kg/m³.",
  },

  // ───────── Percentages ─────────
  {
    skill: "pct", level: 1,
    stem: "What is 20% of 85?",
    choices: ["$4.25$", "$17$", "$20$", "$65$"],
    answer: 1,
    explanation: "$0.20 \\cdot 85 = 17$.",
  },
  {
    skill: "pct", level: 1,
    stem: "A jacket costs \\$40. Its price increases by 15%. What is the new price?",
    choices: ["\\$41.50", "\\$46", "\\$55", "\\$60"],
    answer: 1,
    explanation: "$40 \\cdot 1.15 = 46$, so the new price is \\$46.",
  },
  {
    skill: "pct", level: 2,
    stem: "After a 25% discount, a shirt costs \\$36. What was the original price?",
    choices: ["\\$27", "\\$45", "\\$48", "\\$61"],
    answer: 2,
    explanation: "After a 25% discount you pay 75%: $0.75p = 36$, so $p = 48$.",
  },
  {
    skill: "pct", level: 2,
    stem: "A town's population grew from 2,000 to 2,300. By what percent did the population increase?",
    accepted: ["15", "15%"],
    explanation: "Increase is 300. $\\frac{300}{2{,}000} = 0.15$, or 15%.",
  },
  {
    skill: "pct", level: 3,
    stem: "A positive number $p$ is increased by 20%, and the result is then decreased by 20%. The final value is what percent of $p$?",
    choices: ["$80\\%$", "$96\\%$", "$100\\%$", "$104\\%$"],
    answer: 1,
    explanation: "$p \\cdot 1.2 \\cdot 0.8 = 0.96p$, which is 96% of $p$.",
  },

  // ───────── One-variable data ─────────
  {
    skill: "data1", level: 1,
    stem: "What is the mean of the data set 4, 7, 9, 12, 8?",
    choices: ["$7$", "$8$", "$9$", "$10$"],
    answer: 1,
    explanation: "Sum: $4 + 7 + 9 + 12 + 8 = 40$. Divide by 5: mean $= 8$.",
  },
  {
    skill: "data1", level: 1,
    stem: "What is the median of the data set 3, 9, 4, 12, 7, 10?",
    choices: ["$7$", "$7.5$", "$8$", "$9$"],
    answer: 2,
    explanation: "Sorted: 3, 4, 7, 9, 10, 12. With six values, average the middle two: $\\frac{7 + 9}{2} = 8$.",
  },
  {
    skill: "data1", level: 2,
    stem: "A data set consists of 12, 14, 15, 15, 16, and 18. If the value 60 is added to the data set, which statement is true?",
    choices: [
      "The median increases more than the mean.",
      "The mean increases more than the median.",
      "The mean and median increase by the same amount.",
      "Neither the mean nor the median changes.",
    ],
    answer: 1,
    explanation: "The median moves from 15 to 15 (the new middle value is still 15). The mean jumps from 15 to $\\frac{150}{7} \\approx 21.4$. Outliers pull the mean much more.",
  },
  {
    skill: "data1", level: 2,
    stem: "The mean of five numbers is 20. Four of the numbers have a sum of 82. What is the fifth number?",
    accepted: ["18"],
    explanation: "Total of all five is $5 \\cdot 20 = 100$. The fifth number is $100 - 82 = 18$.",
  },
  {
    skill: "data1", level: 3,
    stem: "Class A has 20 students with a mean test score of 80. Class B has 30 students with a mean test score of 70. What is the mean score of all 50 students combined?",
    choices: ["$72$", "$74$", "$75$", "$76$"],
    answer: 1,
    explanation: "Total points: $20 \\cdot 80 + 30 \\cdot 70 = 1{,}600 + 2{,}100 = 3{,}700$. Divide by 50: $74$.",
  },

  // ───────── Two-variable data ─────────
  {
    skill: "data2", level: 1,
    stem: "The line of best fit for a set of plants is $y = 2.5x + 10$, where $y$ is the predicted height in centimeters after $x$ weeks. What is the predicted height after 6 weeks?",
    choices: ["$16$", "$22.5$", "$25$", "$35$"],
    answer: 2,
    explanation: "$y = 2.5(6) + 10 = 15 + 10 = 25$ cm.",
  },
  {
    skill: "data2", level: 1,
    stem: "In the line of best fit $y = 2.5x + 10$, where $y$ is a plant's predicted height in centimeters after $x$ weeks, what does 2.5 represent?",
    choices: [
      "The plant's height when it was first measured",
      "The predicted increase in height, in centimeters, each week",
      "The number of weeks the plant was measured",
      "The plant's predicted height after 2.5 weeks",
    ],
    answer: 1,
    explanation: "2.5 is the slope: the change in predicted height for each 1-week increase.",
  },
  {
    skill: "data2", level: 2,
    table: {
      title: "Pet preference survey",
      headers: ["", "Cats", "Dogs", "Total"],
      rows: [["Grade 9", "30", "70", "100"], ["Grade 10", "45", "55", "100"], ["Total", "75", "125", "200"]],
    },
    stem: "Based on the table, what fraction of the students who prefer cats are in grade 10?",
    choices: ["$\\frac{9}{40}$", "$\\frac{9}{20}$", "$\\frac{3}{5}$", "$\\frac{3}{8}$"],
    answer: 2,
    explanation: "75 students prefer cats, and 45 of them are in grade 10: $\\frac{45}{75} = \\frac{3}{5}$.",
  },
  {
    skill: "data2", level: 2,
    table: {
      headers: ["$x$", "0", "1", "2", "3"],
      rows: [["$y$", "5", "10", "20", "40"]],
    },
    stem: "Which equation best models the relationship in the table?",
    choices: ["$y = 5x + 5$", "$y = 5(2)^x$", "$y = 10x$", "$y = 2(5)^x$"],
    answer: 1,
    explanation: "Each step multiplies $y$ by 2, starting from 5 at $x = 0$. That's exponential: $y = 5(2)^x$.",
  },
  {
    skill: "data2", level: 3,
    stem: "The line of best fit for a data set is $y = -1.2x + 84$. One data point is $(10, 75)$. How much greater is the actual $y$-value of this point than the value predicted by the line?",
    accepted: ["3"],
    explanation: "Predicted: $-1.2(10) + 84 = 72$. Actual minus predicted: $75 - 72 = 3$.",
  },

  // ───────── Probability ─────────
  {
    skill: "prob", level: 1,
    stem: "A bag contains 4 red marbles and 6 blue marbles. If one marble is chosen at random, what is the probability it is red?",
    choices: ["$\\frac{2}{5}$", "$\\frac{2}{3}$", "$\\frac{3}{5}$", "$\\frac{1}{4}$"],
    answer: 0,
    explanation: "4 red out of 10 total: $\\frac{4}{10} = \\frac{2}{5}$.",
  },
  {
    skill: "prob", level: 1,
    stem: "A fair six-sided die is rolled once. What is the probability of rolling a number greater than 4?",
    choices: ["$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"],
    answer: 1,
    explanation: "Only 5 and 6 are greater than 4: $\\frac{2}{6} = \\frac{1}{3}$.",
  },
  {
    skill: "prob", level: 2,
    table: {
      headers: ["", "Drives to school", "Does not drive", "Total"],
      rows: [["Juniors", "30", "90", "120"], ["Seniors", "50", "30", "80"], ["Total", "80", "120", "200"]],
    },
    stem: "A student who drives to school is chosen at random. What is the probability the student is a senior?",
    choices: ["$\\frac{1}{4}$", "$\\frac{2}{5}$", "$\\frac{5}{8}$", "$\\frac{5}{12}$"],
    answer: 2,
    explanation: "Only consider the 80 drivers. 50 of them are seniors: $\\frac{50}{80} = \\frac{5}{8}$.",
  },
  {
    skill: "prob", level: 2,
    stem: "A fair coin is flipped twice. What is the probability that both flips land heads? (Enter a fraction or decimal.)",
    accepted: ["1/4", "0.25", ".25"],
    explanation: "Each flip is $\\frac{1}{2}$, and the flips are independent: $\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$.",
  },
  {
    skill: "prob", level: 3,
    stem: "A box has 12 light bulbs, 3 of which are defective. Two bulbs are chosen at random without replacement. What is the probability that both are defective?",
    choices: ["$\\frac{1}{22}$", "$\\frac{1}{16}$", "$\\frac{1}{12}$", "$\\frac{1}{8}$"],
    answer: 0,
    explanation: "$\\frac{3}{12} \\cdot \\frac{2}{11} = \\frac{6}{132} = \\frac{1}{22}$.",
  },

  // ───────── Sample statistics ─────────
  {
    skill: "infer", level: 1,
    stem: "A school has 1,600 students. In a random sample of 200 students, 50 said they bike to school. Based on the sample, about how many students in the school bike to school?",
    choices: ["$50$", "$200$", "$400$", "$800$"],
    answer: 2,
    explanation: "$\\frac{50}{200} = 25\\%$ of the sample. $0.25 \\cdot 1{,}600 = 400$.",
  },
  {
    skill: "infer", level: 1,
    stem: "A principal wants to know what all students at her school think about a new schedule. Which method is most likely to give a representative sample?",
    choices: [
      "Survey the first 50 students who arrive in the morning",
      "Survey students on the soccer team",
      "Randomly select 100 students from a list of all students",
      "Ask students to volunteer through an online form",
    ],
    answer: 2,
    explanation: "Random selection from the whole population gives every student an equal chance, which avoids bias.",
  },
  {
    skill: "infer", level: 2,
    stem: "A random survey estimates that 62% of a city's residents support a new park, with a margin of error of 4%. Which is the most plausible range for the true percent of supporters?",
    choices: ["58% to 66%", "60% to 64%", "62% to 66%", "54% to 70%"],
    answer: 0,
    explanation: "Plausible range: estimate ± margin of error: $62 - 4 = 58$ to $62 + 4 = 66$.",
  },
  {
    skill: "infer", level: 2,
    stem: "A researcher repeats a random survey of the same population, but with a much larger sample. Compared to the original survey, the margin of error will most likely be",
    choices: ["larger", "smaller", "the same", "zero"],
    answer: 1,
    explanation: "Larger random samples give more precise estimates, so the margin of error shrinks.",
  },
  {
    skill: "infer", level: 3,
    stem: "A researcher surveyed 300 randomly selected members of a city's public library. The members read a mean of 18 books per year. Which conclusion is most appropriate?",
    choices: [
      "City residents read a mean of about 18 books per year.",
      "Library members in this city read a mean of about 18 books per year.",
      "All library members read exactly 18 books per year.",
      "People in every city read about 18 books per year.",
    ],
    answer: 1,
    explanation: "The sample was drawn only from library members, so results generalize to library members in that city, not all residents.",
  },

  // ───────── Evaluating claims ─────────
  {
    skill: "claims", level: 1,
    stem: "A study observed that students who eat breakfast tend to have higher grades than students who skip it. The students were not assigned to eat or skip breakfast. Which conclusion is supported?",
    choices: [
      "Eating breakfast causes higher grades.",
      "Skipping breakfast causes lower grades.",
      "There is an association between eating breakfast and higher grades.",
      "Breakfast has no relationship to grades.",
    ],
    answer: 2,
    explanation: "Without random assignment, the study shows an association but can't prove cause and effect.",
  },
  {
    skill: "claims", level: 1,
    stem: "Researchers randomly assigned 100 tomato plants to receive either a new fertilizer or none. The fertilized plants grew significantly taller. Which conclusion is most appropriate?",
    choices: [
      "The fertilizer caused increased growth for plants like those in the study.",
      "The fertilizer will make every plant species grow taller.",
      "Taller plants need more fertilizer.",
      "No conclusion can be drawn because only 100 plants were used.",
    ],
    answer: 0,
    explanation: "Random assignment allows a cause-and-effect conclusion, but only for plants similar to those studied.",
  },
  {
    skill: "claims", level: 2,
    stem: "A gaming magazine posted an online poll on its website asking readers how many hours they play video games each week. The magazine claimed the results describe all teenagers. Why is this claim flawed?",
    choices: [
      "The poll asked about hours instead of minutes.",
      "Readers of a gaming magazine are not a random sample of all teenagers.",
      "Online polls always have a margin of error of zero.",
      "The poll should have asked about only one game.",
    ],
    answer: 1,
    explanation: "Self-selected readers of a gaming site likely play more than typical teens. The sample isn't random or representative.",
  },
  {
    skill: "claims", level: 2,
    stem: "In a study, 100 adult volunteers were randomly assigned to sleep either 6 or 8 hours a night for two weeks. The 8-hour group scored higher on a memory test. Which conclusion is most appropriate?",
    choices: [
      "More sleep causes better memory for all people.",
      "More sleep likely caused better memory scores for adults like the volunteers.",
      "There is no relationship between sleep and memory.",
      "The study shows only an association, not causation.",
    ],
    answer: 1,
    explanation: "Random assignment supports causation, but volunteers weren't randomly sampled from all people, so conclusions apply to similar adults.",
  },
  {
    skill: "claims", level: 3,
    stem: "Researchers randomly selected 500 adults from a city and found that those who exercised more reported lower stress levels. No one was assigned to exercise. Which conclusion is most appropriate?",
    choices: [
      "Exercise reduces stress for adults in the city.",
      "Adults in the city who exercise more tend to report lower stress.",
      "Exercise reduces stress for people everywhere.",
      "Lower stress causes people to exercise more.",
    ],
    answer: 1,
    explanation: "Random sampling lets you generalize to the city's adults, but without random assignment you can only claim an association.",
  },

  // ───────── Area and volume ─────────
  {
    skill: "area", level: 1,
    stem: "What is the area of a rectangle with length 8 and width 5?",
    choices: ["$13$", "$26$", "$40$", "$80$"],
    answer: 2,
    explanation: "Area $= \\ell w = 8 \\cdot 5 = 40$.",
  },
  {
    skill: "area", level: 1,
    stem: "A triangle has a base of 10 and a height of 6. What is its area?",
    choices: ["$16$", "$30$", "$60$", "$120$"],
    answer: 1,
    explanation: "Area $= \\frac{1}{2}bh = \\frac{1}{2}(10)(6) = 30$.",
  },
  {
    skill: "area", level: 2,
    stem: "A right rectangular prism has dimensions 4 by 5 by 6. What is its total surface area?",
    choices: ["$74$", "$120$", "$148$", "$240$"],
    answer: 2,
    explanation: "Surface area $= 2(4 \\cdot 5 + 4 \\cdot 6 + 5 \\cdot 6) = 2(20 + 24 + 30) = 148$.",
  },
  {
    skill: "area", level: 2,
    stem: "A cylinder has a radius of 3 and a height of 10. What is its volume?",
    choices: ["$30\\pi$", "$60\\pi$", "$90\\pi$", "$900\\pi$"],
    answer: 2,
    explanation: "Volume $= \\pi r^2 h = \\pi(3^2)(10) = 90\\pi$.",
  },
  {
    skill: "area", level: 3,
    stem: "A cube has a volume of 64 cubic centimeters. If each edge length is doubled, what is the volume of the new cube, in cubic centimeters?",
    accepted: ["512"],
    explanation: "Edge is $\\sqrt[3]{64} = 4$. Doubled: 8. New volume $= 8^3 = 512$. (Doubling lengths multiplies volume by $2^3 = 8$.)",
  },

  // ───────── Lines, angles, triangles ─────────
  {
    skill: "lat", level: 1,
    stem: "Two angles are supplementary. One measures $65°$. What is the measure of the other?",
    choices: ["$25°$", "$65°$", "$115°$", "$295°$"],
    answer: 2,
    explanation: "Supplementary angles add to $180°$: $180 - 65 = 115°$.",
  },
  {
    skill: "lat", level: 1,
    stem: "A triangle has angles measuring $50°$, $60°$, and $x°$. What is the value of $x$?",
    choices: ["$50$", "$60$", "$70$", "$110$"],
    answer: 2,
    explanation: "Triangle angles add to $180°$: $180 - 50 - 60 = 70$.",
  },
  {
    skill: "lat", level: 2,
    stem: "Two parallel lines are cut by a transversal. Two corresponding angles measure $(3x + 10)°$ and $(5x - 30)°$. What is the value of $x$?",
    choices: ["$10$", "$20$", "$35$", "$70$"],
    answer: 1,
    explanation: "Corresponding angles are equal: $3x + 10 = 5x - 30$, so $40 = 2x$ and $x = 20$.",
  },
  {
    skill: "lat", level: 2,
    stem: "Triangle $ABC$ is similar to triangle $DEF$, with $A$ corresponding to $D$, $B$ to $E$, and $C$ to $F$. If $AB = 6$, $DE = 9$, and $BC = 8$, what is $EF$?",
    accepted: ["12"],
    explanation: "Scale factor $= \\frac{9}{6} = 1.5$. So $EF = 1.5 \\cdot 8 = 12$.",
  },
  {
    skill: "lat", level: 3,
    stem: "An isosceles triangle has a vertex angle of $40°$. What is the measure of an exterior angle at one of its base vertices?",
    choices: ["$40°$", "$70°$", "$110°$", "$140°$"],
    answer: 2,
    explanation: "Base angles are $\\frac{180 - 40}{2} = 70°$ each. An exterior angle forms a straight line with the interior angle: $180 - 70 = 110°$.",
  },

  // ───────── Right triangles and trig ─────────
  {
    skill: "trig", level: 1,
    stem: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?",
    choices: ["$10$", "$12$", "$14$", "$100$"],
    answer: 0,
    explanation: "$c = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.",
  },
  {
    skill: "trig", level: 1,
    stem: "In right triangle $ABC$, the side opposite angle $A$ has length 5, the side adjacent to angle $A$ has length 12, and the hypotenuse has length 13. What is $\\sin A$?",
    choices: ["$\\frac{5}{12}$", "$\\frac{5}{13}$", "$\\frac{12}{13}$", "$\\frac{13}{5}$"],
    answer: 1,
    explanation: "Sine is opposite over hypotenuse: $\\frac{5}{13}$.",
  },
  {
    skill: "trig", level: 2,
    stem: "If $\\sin(x°) = \\cos(62°)$, and $0 < x < 90$, what is the value of $x$?",
    accepted: ["28"],
    explanation: "$\\sin(x°) = \\cos(90° - x°)$. So $90 - x = 62$ and $x = 28$.",
  },
  {
    skill: "trig", level: 2,
    stem: "In a $30°$-$60°$-$90°$ triangle, the shorter leg has length 4. What is the length of the longer leg?",
    choices: ["$4\\sqrt{2}$", "$4\\sqrt{3}$", "$8$", "$8\\sqrt{3}$"],
    answer: 1,
    explanation: "In a 30-60-90 triangle, sides are in ratio $1 : \\sqrt{3} : 2$. The longer leg is $4\\sqrt{3}$.",
  },
  {
    skill: "trig", level: 3,
    stem: "A 20-foot ladder leans against a vertical wall, making a $60°$ angle with the level ground. How high up the wall does the top of the ladder reach, in feet?",
    choices: ["$10$", "$10\\sqrt{2}$", "$10\\sqrt{3}$", "$20\\sqrt{3}$"],
    answer: 2,
    explanation: "Height is opposite the $60°$ angle: $20 \\sin 60° = 20 \\cdot \\frac{\\sqrt{3}}{2} = 10\\sqrt{3}$.",
  },

  // ───────── Circles ─────────
  {
    skill: "circ", level: 1,
    stem: "What is the area of a circle with radius 5?",
    choices: ["$10\\pi$", "$25\\pi$", "$50\\pi$", "$100\\pi$"],
    answer: 1,
    explanation: "Area $= \\pi r^2 = 25\\pi$.",
  },
  {
    skill: "circ", level: 1,
    stem: "What is the circumference of a circle with diameter 8?",
    choices: ["$4\\pi$", "$8\\pi$", "$16\\pi$", "$64\\pi$"],
    answer: 1,
    explanation: "Circumference $= \\pi d = 8\\pi$.",
  },
  {
    skill: "circ", level: 2,
    stem: "In the $xy$-plane, a circle has equation $(x - 2)^2 + (y + 3)^2 = 16$. What are its center and radius?",
    choices: [
      "Center $(2, -3)$, radius 4",
      "Center $(-2, 3)$, radius 4",
      "Center $(2, -3)$, radius 16",
      "Center $(-2, 3)$, radius 16",
    ],
    answer: 0,
    explanation: "Form $(x - h)^2 + (y - k)^2 = r^2$: $h = 2$, $k = -3$, and $r = \\sqrt{16} = 4$.",
  },
  {
    skill: "circ", level: 2,
    stem: "A circle has radius 9. What is the length of an arc with a central angle of $120°$?",
    choices: ["$3\\pi$", "$6\\pi$", "$9\\pi$", "$27\\pi$"],
    answer: 1,
    explanation: "Arc $= \\frac{120}{360} \\cdot 2\\pi(9) = \\frac{1}{3} \\cdot 18\\pi = 6\\pi$.",
  },
  {
    skill: "circ", level: 3,
    stem: "The equation $x^2 + y^2 - 6x + 4y - 3 = 0$ defines a circle in the $xy$-plane. What is the radius of the circle?",
    accepted: ["4"],
    explanation: "Complete the square: $(x - 3)^2 - 9 + (y + 2)^2 - 4 - 3 = 0$, so $(x - 3)^2 + (y + 2)^2 = 16$. Radius $= 4$.",
  },
];

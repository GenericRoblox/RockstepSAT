import type { BankItem } from "./index";

// Advanced (level 3) and Expert (level 4) math. Math between $...$; a literal dollar sign is \\$.

export const MATH_HARD_ITEMS: BankItem[] = [
  // ───────── Linear equations in one variable ─────────
  {
    skill: "lin1", level: 3,
    stem: "Car rental company A charges \\$35 plus \\$0.20 per mile. Company B charges \\$20 plus \\$0.32 per mile. For how many miles driven is the total cost the same at both companies?",
    accepted: ["125"],
    explanation: "Set the costs equal: $35 + 0.20m = 20 + 0.32m$. Then $15 = 0.12m$, so $m = 125$.",
  },
  {
    skill: "lin1", level: 4,
    stem: "In the equation $a(x + 3) = 2x + 9 - 4x$, $a$ is a constant. For what value of $a$ does the equation have no solution?",
    choices: ["$-3$", "$-2$", "$2$", "$3$"],
    answer: 1,
    explanation: "Simplify: $ax + 3a = -2x + 9$. No solution means equal $x$-coefficients but different constants. So $a = -2$, and then $3a = -6 \\neq 9$. (With $a = 3$, the equation has exactly one solution, $x = 0$.)",
  },
  {
    skill: "lin1", level: 4,
    stem: "If $\\frac{2}{3}(9x - 6) - 4 = 9x - 6$, what is the value of $3x - 2$?",
    accepted: ["-4"],
    explanation: "Let $u = 3x - 2$, so $9x - 6 = 3u$. Then $\\frac{2}{3}(3u) - 4 = 3u$, which gives $2u - 4 = 3u$, so $u = -4$. Spotting the repeated expression saves solving for $x$ first.",
  },

  // ───────── Linear functions ─────────
  {
    skill: "linf", level: 3,
    stem: "For the linear function $f$, $f(3) = 11$ and $f(7) = 23$. If $f(k) = 50$, what is the value of $k$?",
    accepted: ["16"],
    explanation: "Slope: $\\frac{23 - 11}{7 - 3} = 3$. Then $f(x) = 3x + 2$. Solve $3k + 2 = 50$: $k = 16$.",
  },
  {
    skill: "linf", level: 4,
    stem: "The graph of the linear function $f$ passes through $(1, -2)$ and $(5, 10)$. The graph of $y = g(x)$ is the graph of $y = f(x)$ shifted up 4 units. What is the $x$-intercept of the graph of $y = g(x)$?",
    choices: ["$\\left(-\\frac{1}{3}, 0\\right)$", "$\\left(\\frac{1}{3}, 0\\right)$", "$\\left(\\frac{5}{3}, 0\\right)$", "$(3, 0)$"],
    answer: 1,
    explanation: "Slope of $f$: $\\frac{12}{4} = 3$, so $f(x) = 3x - 5$. Then $g(x) = 3x - 1$. Setting $g(x) = 0$ gives $x = \\frac{1}{3}$. Choice C is the $x$-intercept of $f$, before the shift.",
  },
  {
    skill: "linf", level: 4,
    stem: "A tank is drained at a constant rate. It held 600 liters when draining began, and 456 liters 12 minutes later. How many minutes after draining began will the tank be empty?",
    accepted: ["50"],
    explanation: "Rate: $\\frac{600 - 456}{12} = 12$ liters per minute. So $V(t) = 600 - 12t$, and $V(t) = 0$ when $t = 50$.",
  },

  // ───────── Linear equations in two variables ─────────
  {
    skill: "lin2", level: 3,
    stem: "Line $k$ passes through $(-2, 5)$ and is perpendicular to the line $3x - 4y = 8$. What is the $y$-intercept of line $k$?",
    choices: ["$\\left(0, -\\frac{7}{3}\\right)$", "$\\left(0, \\frac{7}{3}\\right)$", "$\\left(0, \\frac{13}{2}\\right)$", "$\\left(0, \\frac{23}{3}\\right)$"],
    answer: 1,
    explanation: "The given line is $y = \\frac{3}{4}x - 2$, so line $k$ has slope $-\\frac{4}{3}$. Then $5 = -\\frac{4}{3}(-2) + b = \\frac{8}{3} + b$, so $b = \\frac{7}{3}$.",
  },
  {
    skill: "lin2", level: 4,
    stem: "In the $xy$-plane, the line $6x + ky = 15$, where $k$ is a constant, is parallel to the line through $(1, 4)$ and $(5, -2)$. What is the value of $k$?",
    accepted: ["4"],
    explanation: "Slope through the points: $\\frac{-2 - 4}{5 - 1} = -\\frac{3}{2}$. The line $6x + ky = 15$ has slope $-\\frac{6}{k}$. Set $-\\frac{6}{k} = -\\frac{3}{2}$, so $k = 4$.",
  },
  {
    skill: "lin2", level: 4,
    stem: "A line in the $xy$-plane passes through $(2, 7)$. Its $x$-intercept is 4 times its $y$-intercept, and the $y$-intercept is not zero. What is the $y$-coordinate of the line's $y$-intercept?",
    accepted: ["7.5", "15/2"],
    explanation: "Call the $y$-intercept $b$. The $x$-intercept is $4b$, so the slope is $\\frac{0 - b}{4b - 0} = -\\frac{1}{4}$. Then $7 = -\\frac{1}{4}(2) + b$, so $b = 7.5$.",
  },

  // ───────── Systems ─────────
  {
    skill: "sys", level: 3,
    stem: "If $2x + 3y = 7$ and $4x - y = 7$, what is the value of $6x + 2y$?",
    choices: ["$7$", "$10$", "$14$", "$21$"],
    answer: 2,
    explanation: "Add the two equations: $(2x + 4x) + (3y - y) = 7 + 7$, so $6x + 2y = 14$. No need to find $x$ and $y$ separately (they are 2 and 1).",
  },
  {
    skill: "sys", level: 4,
    stem: "In the system $x + by = 7$ and $2x + 8y = c$, $b$ and $c$ are constants. If the system has infinitely many solutions, what is the value of $b + c$?",
    accepted: ["18"],
    explanation: "Infinitely many solutions means the second equation is a multiple of the first. Doubling the first gives $2x + 2by = 14$, so $2b = 8$ and $c = 14$. Then $b = 4$ and $b + c = 18$.",
  },
  {
    skill: "sys", level: 4,
    stem: "A chemist mixes a 10% saline solution with a 40% saline solution to make 60 liters of a 30% saline solution. How many liters of the 40% solution does the chemist use?",
    accepted: ["40"],
    explanation: "Let $x$ and $y$ be liters of 10% and 40%. Then $x + y = 60$ and $0.10x + 0.40y = 0.30(60) = 18$. Substitute $x = 60 - y$: $6 + 0.30y = 18$, so $y = 40$.",
  },

  // ───────── Inequalities ─────────
  {
    skill: "ineq", level: 3,
    stem: "A delivery truck can carry at most 2,000 pounds, including the driver. The driver weighs 180 pounds, and each box weighs 35 pounds. What is the greatest number of boxes the truck can carry?",
    accepted: ["52"],
    explanation: "$180 + 35b \\le 2{,}000$, so $35b \\le 1{,}820$ and $b \\le 52$.",
  },
  {
    skill: "ineq", level: 4,
    stem: "The point $(a, 4)$ is a solution to the system of inequalities $y > 3x - 8$ and $y < -x + 10$. Which of the following could be the value of $a$?",
    choices: ["$3$", "$4$", "$5$", "$6$"],
    answer: 0,
    explanation: "Substitute $y = 4$. First: $4 > 3a - 8$, so $a < 4$. Second: $4 < -a + 10$, so $a < 6$. Both require $a < 4$, and only 3 works.",
  },
  {
    skill: "ineq", level: 4,
    stem: "A club rents a bus for a flat fee of \\$450, and each member also pays \\$12 for a ticket. The bus fee is split evenly among the members who go. If each member wants to pay at most \\$30 in total, what is the least number of members who must go?",
    accepted: ["25"],
    explanation: "Each member pays $\\frac{450}{n} + 12 \\le 30$. So $\\frac{450}{n} \\le 18$, which means $n \\ge 25$.",
  },

  // ───────── Equivalent expressions ─────────
  {
    skill: "equiv", level: 3,
    stem: "For $x \\neq 2$ and $x \\neq -3$, which expression is equivalent to $\\frac{x^2 - 4}{x^2 + x - 6}$?",
    choices: ["$\\frac{x + 2}{x + 3}$", "$\\frac{x - 2}{x - 3}$", "$\\frac{x + 2}{x - 3}$", "$\\frac{2}{3}$"],
    answer: 0,
    explanation: "Factor: $\\frac{(x - 2)(x + 2)}{(x + 3)(x - 2)}$. Cancel $x - 2$ to get $\\frac{x + 2}{x + 3}$.",
  },
  {
    skill: "equiv", level: 4,
    stem: "For $x > 0$, which expression is equivalent to $\\frac{1}{x + 2} - \\frac{1}{x + 3}$?",
    choices: ["$\\frac{-1}{x^2 + 5x + 6}$", "$\\frac{1}{x^2 + 5x + 6}$", "$\\frac{2x + 5}{x^2 + 5x + 6}$", "$\\frac{1}{2x + 5}$"],
    answer: 1,
    explanation: "Common denominator: $\\frac{(x + 3) - (x + 2)}{(x + 2)(x + 3)} = \\frac{1}{x^2 + 5x + 6}$. Choice C comes from adding instead of subtracting.",
  },
  {
    skill: "equiv", level: 4,
    stem: "For $x > 0$, which expression is equivalent to $\\frac{\\sqrt[3]{x^5} \\cdot \\sqrt{x}}{x}$?",
    choices: ["$x^{\\frac{5}{6}}$", "$x^{\\frac{7}{6}}$", "$x^{\\frac{13}{6}}$", "$x^{\\frac{5}{2}}$"],
    answer: 1,
    explanation: "Rewrite with exponents: $x^{\\frac{5}{3}} \\cdot x^{\\frac{1}{2}} \\cdot x^{-1} = x^{\\frac{10}{6} + \\frac{3}{6} - \\frac{6}{6}} = x^{\\frac{7}{6}}$.",
  },

  // ───────── Nonlinear equations ─────────
  {
    skill: "nleq", level: 3,
    stem: "What is the positive solution to $2x^2 - 3x - 20 = 0$?",
    choices: ["$\\frac{5}{2}$", "$4$", "$5$", "$10$"],
    answer: 1,
    explanation: "Factor: $(2x + 5)(x - 4) = 0$, so $x = -\\frac{5}{2}$ or $x = 4$. The positive solution is 4.",
  },
  {
    skill: "nleq", level: 4,
    stem: "The solutions to $x^2 + 11x + 12 = 0$ are $\\frac{-11 \\pm \\sqrt{k}}{2}$, where $k$ is a constant. What is the value of $k$?",
    accepted: ["73"],
    explanation: "By the quadratic formula, $x = \\frac{-11 \\pm \\sqrt{11^2 - 4(1)(12)}}{2(1)} = \\frac{-11 \\pm \\sqrt{73}}{2}$. So $k = 121 - 48 = 73$.",
  },
  {
    skill: "nleq", level: 4,
    stem: "In the $xy$-plane, the graphs of $y = x^2 + 2x + c$ and $y = 6x - 3$, where $c$ is a constant, intersect at exactly one point. What is the value of $c$?",
    accepted: ["1"],
    explanation: "Set equal: $x^2 - 4x + (c + 3) = 0$. Exactly one intersection means the discriminant is zero: $16 - 4(c + 3) = 0$, so $c = 1$.",
  },

  // ───────── Nonlinear functions ─────────
  {
    skill: "nlf", level: 3,
    stem: "The function $f$ is defined by $f(x) = -2(x - 4)(x + 6)$. What is the maximum value of $f(x)$?",
    choices: ["$25$", "$48$", "$50$", "$100$"],
    answer: 2,
    explanation: "The zeros are 4 and $-6$, so the vertex is halfway between, at $x = -1$. Then $f(-1) = -2(-5)(5) = 50$.",
  },
  {
    skill: "nlf", level: 4,
    stem: "A population is modeled by $P(t) = 800(1.5)^{\\frac{t}{4}}$, where $t$ is the number of years since 2020. By what percent does the population increase every 8 years?",
    choices: ["$50\\%$", "$100\\%$", "$125\\%$", "$225\\%$"],
    answer: 2,
    explanation: "Every 8 years the exponent increases by 2, so the population is multiplied by $1.5^2 = 2.25$. That's an increase of $125\\%$. Choice D is the multiplier written as a percent, not the increase.",
  },
  {
    skill: "nlf", level: 4,
    stem: "The graph of $f(x) = ax^2 + bx + c$ has its vertex at $(3, -8)$ and passes through $(5, 0)$. What is the value of $f(0)$?",
    accepted: ["10"],
    explanation: "Vertex form: $f(x) = a(x - 3)^2 - 8$. Using $(5, 0)$: $4a - 8 = 0$, so $a = 2$. Then $f(0) = 2(9) - 8 = 10$.",
  },

  // ───────── Ratios, rates, units ─────────
  {
    skill: "ratio", level: 3,
    stem: "A car uses 3.5 gallons of gas per 100 miles. Gas costs \\$4.20 per gallon. What is the cost of gas to drive 250 miles?",
    choices: ["\\$14.70", "\\$29.40", "\\$36.75", "\\$42.00"],
    answer: 2,
    explanation: "Gallons: $3.5 \\cdot \\frac{250}{100} = 8.75$. Cost: $8.75 \\cdot 4.20 = 36.75$.",
  },
  {
    skill: "ratio", level: 4,
    stem: "Water flows into a pool at 2.4 liters per second. The pool holds 51,840 liters. How many hours does it take to fill the empty pool?",
    accepted: ["6"],
    explanation: "Seconds: $\\frac{51{,}840}{2.4} = 21{,}600$. Hours: $\\frac{21{,}600}{3{,}600} = 6$.",
  },
  {
    skill: "ratio", level: 4,
    stem: "On a map, 2 centimeters represent 15 kilometers. A park on the map has an area of 12 square centimeters. What is the park's actual area, in square kilometers?",
    choices: ["$90$", "$337.5$", "$675$", "$1{,}350$"],
    answer: 2,
    explanation: "1 cm represents 7.5 km, so 1 cm² represents $7.5^2 = 56.25$ km². Then $12 \\cdot 56.25 = 675$. Choice A forgets to square the scale.",
  },

  // ───────── Percentages ─────────
  {
    skill: "pct", level: 3,
    stem: "A store sold 1,250 bikes in 2020 and 1,500 bikes in 2021. If sales increase by the same percent from 2021 to 2022, how many bikes will the store sell in 2022?",
    accepted: ["1800", "1,800"],
    explanation: "The increase was $\\frac{250}{1{,}250} = 20\\%$. Then $1{,}500 \\cdot 1.2 = 1{,}800$.",
  },
  {
    skill: "pct", level: 4,
    stem: "A stock's price fell 20% on Monday, then rose $p\\%$ on Tuesday. At the end of Tuesday, the price was 8% higher than at the start of Monday. What is the value of $p$?",
    accepted: ["35"],
    explanation: "$0.8\\left(1 + \\frac{p}{100}\\right) = 1.08$, so $1 + \\frac{p}{100} = 1.35$ and $p = 35$.",
  },
  {
    skill: "pct", level: 4,
    stem: "The number $x$ is 25% less than $y$, and $y$ is 60% greater than $z$. If $x = 360$, what is the value of $z$?",
    accepted: ["300"],
    explanation: "$x = 0.75y$, so $y = 480$. And $y = 1.6z$, so $z = \\frac{480}{1.6} = 300$.",
  },

  // ───────── One-variable data ─────────
  {
    skill: "data1", level: 3,
    stem: "The mean of 8 numbers is 15. When one number is removed, the mean of the remaining 7 numbers is 14. What number was removed?",
    choices: ["$1$", "$14$", "$15$", "$22$"],
    answer: 3,
    explanation: "Total before: $8 \\cdot 15 = 120$. Total after: $7 \\cdot 14 = 98$. Removed: $120 - 98 = 22$.",
  },
  {
    skill: "data1", level: 4,
    stem: "A data set has mean 50 and standard deviation $s$. A new data set is made by adding 5 to every value and then multiplying every result by 2. What are the mean and standard deviation of the new data set?",
    choices: [
      "Mean 105, standard deviation $2s$",
      "Mean 110, standard deviation $2s$",
      "Mean 110, standard deviation $2s + 10$",
      "Mean 105, standard deviation $s$",
    ],
    answer: 1,
    explanation: "The mean follows every operation: $(50 + 5) \\cdot 2 = 110$. Adding a constant doesn't change spread, but multiplying by 2 doubles it: $2s$.",
  },
  {
    skill: "data1", level: 4,
    stem: "A list of 5 positive integers has a median of 12 and a mean of 11. Its only mode is 15. What is the least possible value of the smallest number in the list?",
    accepted: ["2"],
    explanation: "Sum $= 55$. The mode 15 must appear at least twice, and it's above the median, so the list is $a, b, 12, 15, 15$. Then $a + b = 13$. To keep 15 the only mode, $b \\neq 12$ and $a \\neq b$, so $b \\le 11$ and $a \\ge 2$.",
  },

  // ───────── Two-variable data ─────────
  {
    skill: "data2", level: 3,
    stem: "The value, in dollars, of a car $x$ years after purchase is modeled by $y = -1{,}800x + 24{,}000$. According to the model, how many years after purchase will the car's value be \\$15,000?",
    choices: ["$3$", "$5$", "$9$", "$13$"],
    answer: 1,
    explanation: "$-1{,}800x + 24{,}000 = 15{,}000$, so $1{,}800x = 9{,}000$ and $x = 5$.",
  },
  {
    skill: "data2", level: 4,
    stem: "An exponential model $y = a(b)^x$ fits a data set exactly. The model gives $y = 1{,}200$ when $x = 0$ and $y = 1{,}452$ when $x = 2$. What is the value of $b$?",
    choices: ["$1.05$", "$1.1$", "$1.11$", "$1.21$"],
    answer: 1,
    explanation: "$a = 1{,}200$. Then $1{,}200b^2 = 1{,}452$, so $b^2 = 1.21$ and $b = 1.1$. Choice D is $b^2$, the growth over two steps.",
  },
  {
    skill: "data2", level: 4,
    stem: "A line of best fit passes through $(2, 14)$ and $(10, 6)$. One data point is $(6, 13)$. What is the residual for this point (actual minus predicted)?",
    accepted: ["3"],
    explanation: "Slope: $\\frac{6 - 14}{10 - 2} = -1$, so $y = -x + 16$. Predicted at $x = 6$: 10. Residual: $13 - 10 = 3$.",
  },

  // ───────── Probability ─────────
  {
    skill: "prob", level: 3,
    table: {
      headers: ["", "Morning", "Evening", "Total"],
      rows: [["Coffee", "90", "60", "150"], ["Tea", "40", "110", "150"], ["Total", "130", "170", "300"]],
    },
    stem: "The table shows survey results about drink preference and preferred time of day. If a person who prefers tea is chosen at random, what is the probability they prefer evening?",
    choices: ["$\\frac{11}{30}$", "$\\frac{11}{17}$", "$\\frac{11}{15}$", "$\\frac{1}{2}$"],
    answer: 2,
    explanation: "Only the 150 tea drinkers count. 110 of them prefer evening: $\\frac{110}{150} = \\frac{11}{15}$. Choice B uses all evening people as the denominator.",
  },
  {
    skill: "prob", level: 4,
    stem: "Two fair six-sided dice are rolled. Given that at least one die shows a 3, what is the probability that the sum is 8?",
    choices: ["$\\frac{1}{18}$", "$\\frac{5}{36}$", "$\\frac{1}{6}$", "$\\frac{2}{11}$"],
    answer: 3,
    explanation: "Outcomes with at least one 3: $6 + 6 - 1 = 11$. Of those, $(3, 5)$ and $(5, 3)$ sum to 8. Probability: $\\frac{2}{11}$.",
  },
  {
    skill: "prob", level: 4,
    stem: "A jar holds only red and blue marbles, and the probability of drawing red is $\\frac{3}{8}$. After 10 red marbles are added, the probability of drawing red is $\\frac{1}{2}$. How many marbles were in the jar originally?",
    accepted: ["40"],
    explanation: "Let $n$ be the original total, so there were $\\frac{3n}{8}$ red. Then $\\frac{\\frac{3n}{8} + 10}{n + 10} = \\frac{1}{2}$, which gives $\\frac{3n}{4} + 20 = n + 10$, so $n = 40$.",
  },

  // ───────── Sample statistics ─────────
  {
    skill: "infer", level: 3,
    stem: "In a random sample of 400 voters in a city, 58% support a proposal, with a margin of error of 5%. Which statement is best supported?",
    choices: [
      "Exactly 58% of the city's voters support the proposal.",
      "It is plausible that between 53% and 63% of the city's voters support the proposal.",
      "Fewer than half of the city's voters likely support the proposal.",
      "Between 53% and 63% of all voters in the country support the proposal.",
    ],
    answer: 1,
    explanation: "The plausible range is $58 \\pm 5$, and it applies to the city's voters, the population sampled.",
  },
  {
    skill: "infer", level: 4,
    stem: "A random sample of 200 people from a population gives a mean estimate with a margin of error of 3.1. A second random sample of 800 people is taken from the same population, using the same method. The margin of error for the second sample is most likely closest to which value?",
    choices: ["$0.8$", "$1.6$", "$3.1$", "$6.2$"],
    answer: 1,
    explanation: "Margin of error shrinks with the square root of the sample size. Four times the sample means about $\\frac{1}{\\sqrt{4}} = \\frac{1}{2}$ the margin: about 1.6. Choice A divides by 4, as if it shrank in direct proportion.",
  },
  {
    skill: "infer", level: 4,
    stem: "From a random sample of 50 plants of one species, researchers estimate the species' mean height as 34 cm, with a 95% confidence interval of 31.5 cm to 36.5 cm. Which conclusion is most appropriate?",
    choices: [
      "95% of plants of this species are between 31.5 cm and 36.5 cm tall.",
      "It is plausible that the mean height of all plants of this species is between 31.5 cm and 36.5 cm.",
      "Every plant in the sample is between 31.5 cm and 36.5 cm tall.",
      "The mean height of all plants of this species is exactly 34 cm.",
    ],
    answer: 1,
    explanation: "A confidence interval describes the population mean, not individual plants. Choice A is the classic trap.",
  },

  // ───────── Evaluating claims ─────────
  {
    skill: "claims", level: 3,
    stem: "A school wants to survey students about cafeteria food. Which survey question is most likely to produce biased results?",
    choices: [
      "How would you rate the cafeteria food on a scale from 1 to 5?",
      "How many days a week do you eat cafeteria food?",
      "Don't you agree that the cafeteria food has gotten worse this year?",
      "Which cafeteria meal do you eat most often?",
    ],
    answer: 2,
    explanation: "Choice C is a leading question. Its wording pushes students toward agreeing.",
  },
  {
    skill: "claims", level: 4,
    stem: "A researcher randomly selected 500 students from all high schools in a state, then randomly assigned half of them to a tutoring program. Students in the program had significantly higher test scores. Which conclusion is most appropriate?",
    choices: [
      "The program likely causes higher scores for high school students in that state.",
      "The program likely causes higher scores for all high school students in the country.",
      "The study shows only an association between the program and higher scores.",
      "The conclusion applies only to the 500 students in the study.",
    ],
    answer: 0,
    explanation: "Random assignment supports cause and effect. Random sampling lets you generalize to the population sampled: the state's high school students, not the whole country.",
  },
  {
    skill: "claims", level: 4,
    stem: "A battery company claims its batteries last longer than a competitor's. It tested 10 of its own batteries, chosen by company engineers, against 10 competitor batteries bought from one store. Which is the strongest criticism of the claim?",
    choices: [
      "The batteries were not chosen randomly, and the samples are small.",
      "The test should have used more than one brand.",
      "Batteries from one store are always defective.",
      "The company should have tested its batteries for longer.",
    ],
    answer: 0,
    explanation: "Engineers picking their own batteries invites bias, and 10 per group is too few to rule out chance.",
  },

  // ───────── Area and volume ─────────
  {
    skill: "area", level: 3,
    stem: "A rectangle's length is increased by 20% and its width is decreased by 20%. How does its area change?",
    choices: ["It stays the same.", "It decreases by 4%.", "It increases by 4%.", "It decreases by 20%."],
    answer: 1,
    explanation: "New area $= 1.2 \\cdot 0.8 = 0.96$ of the original, a 4% decrease.",
  },
  {
    skill: "area", level: 4,
    stem: "A right circular cone has a radius of 6 and a slant height of 10. What is its volume?",
    choices: ["$96\\pi$", "$120\\pi$", "$288\\pi$", "$360\\pi$"],
    answer: 0,
    explanation: "Height: $\\sqrt{10^2 - 6^2} = 8$. Volume: $\\frac{1}{3}\\pi(6^2)(8) = 96\\pi$. Choice B uses the slant height as the height.",
  },
  {
    skill: "area", level: 4,
    stem: "A sphere has a surface area of $144\\pi$. What is its volume?",
    choices: ["$144\\pi$", "$216\\pi$", "$288\\pi$", "$864\\pi$"],
    answer: 2,
    explanation: "$4\\pi r^2 = 144\\pi$, so $r = 6$. Volume: $\\frac{4}{3}\\pi(6^3) = 288\\pi$.",
  },

  // ───────── Lines, angles, triangles ─────────
  {
    skill: "lat", level: 3,
    stem: "In triangle $ABC$, angle $A$ measures $45°$ and angle $B$ is twice angle $C$. What is the measure of angle $C$?",
    choices: ["$30°$", "$45°$", "$67.5°$", "$90°$"],
    answer: 1,
    explanation: "$45 + 2C + C = 180$, so $3C = 135$ and $C = 45°$.",
  },
  {
    skill: "lat", level: 4,
    stem: "In triangle $ABC$, point $D$ is on $\\overline{AB}$ and point $E$ is on $\\overline{AC}$, with $\\overline{DE}$ parallel to $\\overline{BC}$. If $AD = 4$, $DB = 6$, and $DE = 5$, what is $BC$?",
    accepted: ["12.5", "25/2"],
    explanation: "Triangles $ADE$ and $ABC$ are similar. $AB = 10$, so the scale factor is $\\frac{10}{4} = 2.5$ and $BC = 2.5 \\cdot 5 = 12.5$. Using $DB = 6$ instead of $AB$ is the common mistake.",
  },
  {
    skill: "lat", level: 4,
    stem: "Each interior angle of a regular polygon measures $156°$. How many sides does the polygon have?",
    accepted: ["15"],
    explanation: "Each exterior angle is $180 - 156 = 24°$, and exterior angles sum to $360°$: $\\frac{360}{24} = 15$ sides.",
  },

  // ───────── Right triangles and trig ─────────
  {
    skill: "trig", level: 3,
    stem: "A right triangle has a hypotenuse of 26 and a leg of 10. What is the cosine of the angle opposite the leg of length 10?",
    choices: ["$\\frac{5}{13}$", "$\\frac{12}{13}$", "$\\frac{5}{12}$", "$\\frac{12}{5}$"],
    answer: 1,
    explanation: "The other leg is $\\sqrt{26^2 - 10^2} = 24$. It's adjacent to that angle, so cosine $= \\frac{24}{26} = \\frac{12}{13}$.",
  },
  {
    skill: "trig", level: 4,
    stem: "In right triangle $RST$, angle $T$ is the right angle and $\\tan R = \\frac{3}{4}$. If $RS = 35$, what is the length of $\\overline{ST}$?",
    accepted: ["21"],
    explanation: "$\\tan R = \\frac{ST}{RT} = \\frac{3}{4}$, so the sides follow a 3-4-5 pattern with hypotenuse $RS$. Scale: $\\frac{35}{5} = 7$, so $ST = 3 \\cdot 7 = 21$.",
  },
  {
    skill: "trig", level: 4,
    stem: "If $\\sin \\theta = \\frac{3}{5}$ and $\\frac{\\pi}{2} < \\theta < \\pi$, what is the value of $\\cos \\theta$?",
    choices: ["$-\\frac{4}{5}$", "$\\frac{4}{5}$", "$-\\frac{3}{4}$", "$\\frac{3}{4}$"],
    answer: 0,
    explanation: "$\\cos^2\\theta = 1 - \\frac{9}{25} = \\frac{16}{25}$. In the second quadrant cosine is negative, so $\\cos\\theta = -\\frac{4}{5}$.",
  },

  // ───────── Circles ─────────
  {
    skill: "circ", level: 3,
    stem: "A circle in the $xy$-plane has center $(-3, 4)$ and passes through $(1, 1)$. Which is an equation of the circle?",
    choices: [
      "$(x + 3)^2 + (y - 4)^2 = 25$",
      "$(x - 3)^2 + (y + 4)^2 = 25$",
      "$(x + 3)^2 + (y - 4)^2 = 5$",
      "$(x - 3)^2 + (y + 4)^2 = 5$",
    ],
    answer: 0,
    explanation: "$r^2 = (1 + 3)^2 + (1 - 4)^2 = 16 + 9 = 25$. Center $(-3, 4)$ gives $(x + 3)^2 + (y - 4)^2 = 25$.",
  },
  {
    skill: "circ", level: 4,
    stem: "A circle has radius 10. A sector of the circle has area $15\\pi$. What is the sector's central angle, in degrees?",
    accepted: ["54"],
    explanation: "$\\frac{\\theta}{360} \\cdot \\pi(10^2) = 15\\pi$, so $\\frac{\\theta}{360} = \\frac{15}{100}$ and $\\theta = 54$.",
  },
  {
    skill: "circ", level: 4,
    stem: "The equation $x^2 + y^2 + 8x - 10y = k$ defines a circle with radius 7. What is the value of $k$?",
    accepted: ["8"],
    explanation: "Complete the square: $(x + 4)^2 + (y - 5)^2 = k + 16 + 25$. Since $r^2 = 49$, $k + 41 = 49$ and $k = 8$.",
  },
];

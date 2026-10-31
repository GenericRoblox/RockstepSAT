import type { BankItem } from "./index";

// Advanced (level 3) and Expert (level 4) Reading & Writing. A literal dollar sign is written \\$.

const MAIN = "Which choice best states the main idea of the text?";
const COMPLETE = "Which choice most logically completes the text?";
const WORD = "Which choice completes the text with the most logical and precise word or phrase?";
const TRANS = "Which choice completes the text with the most logical transition?";
const CONV = "Which choice completes the text so that it conforms to the conventions of Standard English?";
const SYNTH = "Which choice most effectively uses relevant information from the notes to accomplish this goal?";

export const RW_HARD_ITEMS: BankItem[] = [
  // ───────── Central ideas ─────────
  {
    skill: "cid", level: 3,
    passage:
      "Economist Rosa Delgado studied why some farmers in a dry region adopted drought-resistant seeds while their neighbors did not. Price did not explain the difference: the seeds cost the same everywhere. Instead, Delgado found that adoption spread through personal networks. Farmers who had watched a relative or friend use the seeds successfully were far more likely to plant them the following season.",
    stem: MAIN,
    choices: [
      "Drought-resistant seeds were cheaper in some parts of the region than in others.",
      "Delgado found that farmers mostly adopted the seeds after seeing people they knew use them successfully.",
      "Drought-resistant seeds produce larger harvests than traditional seeds in wet years.",
      "Most farmers in the region preferred traditional seeds because they were more familiar.",
    ],
    answer: 1,
    explanation:
      "The text rules out price and then gives Delgado's finding: adoption spread through personal networks. A contradicts the text; C and D aren't stated.",
  },
  {
    skill: "cid", level: 4,
    passage:
      "Aunt Hester had kept the shop for forty years, and in all that time she had never once rearranged the shelves. Customers who hadn't visited since childhood found the peppermints exactly where they remembered them, beside the brass scale. When her nephew suggested modernizing—brighter lights, a register that printed receipts—she listened politely and thanked him. The next morning she dusted the brass scale with the same care she always had.",
    stem: MAIN,
    choices: [
      "Hester is persuaded by her nephew to modernize the shop gradually.",
      "Hester's customers are frustrated that the shop has not changed.",
      "Hester values the shop's continuity and quietly declines to change it despite her nephew's suggestion.",
      "Hester's nephew plans to take over the shop and run it differently.",
    ],
    answer: 2,
    explanation:
      "Hester listens politely, then carries on exactly as before. Her actions, not her words, show she won't change the shop. Nothing suggests customers are frustrated; the shop's sameness seems to please them.",
  },
  {
    skill: "cid", level: 4,
    passage:
      "Ecologists have long treated an abundance of lichens on trees as a sign of clean air, since many lichen species die when exposed to sulfur dioxide. Yet in several European cities where sulfur dioxide levels have fallen sharply, lichen recovery has been uneven. Species sensitive to sulfur dioxide have returned, but species sensitive to nitrogen pollution, which has risen with traffic, remain scarce. Ecologist Mirela Voss argues that lichens are best read not as a single gauge of 'clean' air but as a record of which particular pollutants are present.",
    stem: MAIN,
    choices: [
      "Lichens are no longer useful to ecologists studying air quality in European cities.",
      "Voss argues that lichens reveal which specific pollutants are present rather than measuring air quality overall.",
      "Sulfur dioxide levels in European cities have risen along with traffic.",
      "Nitrogen pollution harms more lichen species than sulfur dioxide does.",
    ],
    answer: 1,
    explanation:
      "The uneven recovery leads to Voss's argument, the text's conclusion. A overstates (lichens are still useful, just read differently); C confuses the two pollutants; D compares something the text never compares.",
  },

  // ───────── Textual evidence ─────────
  {
    skill: "coe_t", level: 3,
    passage:
      "Sociologist Imani Clarke claims that public libraries in small towns serve as important resources for job seekers, not just for readers.",
    stem: "Which finding, if true, would most directly support Clarke's claim?",
    choices: [
      "Fiction checkouts at small-town libraries rose during the past decade.",
      "Small-town librarians reported that most public computer sessions involved writing résumés or completing job applications.",
      "City libraries tend to stay open longer each week than small-town libraries.",
      "Many small-town libraries host weekly story times for young children.",
    ],
    answer: 1,
    explanation:
      "The claim is about job seekers. Only B links small-town library use to job searching.",
  },
  {
    skill: "coe_t", level: 4,
    passage:
      "Biologists have observed that great tits (a songbird) living in cities sing at higher pitches than those living in forests. One team hypothesized that the difference exists because low-pitched songs are drowned out by the low-frequency rumble of traffic.",
    stem: "Which finding, if true, would most directly support the team's explanation?",
    choices: [
      "City great tits sang at higher pitches than forest great tits in every city studied.",
      "City great tits sang more often each day than forest great tits did.",
      "Great tits in quiet city parks sang at pitches similar to forest birds, while those near busy roads sang at higher pitches.",
      "Forest great tits sang longer songs than city great tits did.",
    ],
    answer: 2,
    explanation:
      "Choice A only confirms the pitch difference that was already observed. C isolates the proposed cause: within the same city, pitch tracks traffic noise. That's what supports the explanation.",
  },
  {
    skill: "coe_t", level: 4,
    passage:
      "In the poem \"Orchard, Remembered\" by fictional poet Teodora Venn, the speaker suggests that memory changes the places it preserves.",
    stem: "Which quotation from the poem most effectively illustrates this claim?",
    choices: [
      "\"The orchard stands where it has always stood.\"",
      "\"Each time I walk it back in thought, the orchard / grows a little greener than it was.\"",
      "\"My father pruned the branches every March.\"",
      "\"I left the valley in the autumn rain.\"",
    ],
    answer: 1,
    explanation:
      "Choice B shows the remembered orchard changing ('greener than it was') each time the speaker recalls it. A suggests the opposite, permanence.",
  },

  // ───────── Quantitative evidence ─────────
  {
    skill: "coe_q", level: 3,
    passage:
      "A student argues that more bike lanes don't always mean more bike commuters, noting that ______",
    table: {
      title: "Bike lanes and commuting in four cities",
      headers: ["City", "Miles of bike lanes", "Commuters who bike"],
      rows: [["Arden", "120", "4.1%"], ["Bexley", "85", "6.3%"], ["Corwin", "60", "2.2%"], ["Dunmore", "40", "1.8%"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "Dunmore has the fewest miles of bike lanes and the lowest share of bike commuters.",
      "Arden has the most miles of bike lanes, yet Bexley, with fewer, has a higher share of bike commuters.",
      "Corwin has 60 miles of bike lanes.",
      "Bexley has 85 miles of bike lanes and 6.3% bike commuters.",
    ],
    answer: 1,
    explanation:
      "The argument needs a case where more lanes didn't mean more riders. Arden versus Bexley is exactly that. A actually fits the opposite pattern.",
  },
  {
    skill: "coe_q", level: 4,
    passage:
      "Researchers tested a reading program with students who began the year at different levels. They concluded that the program's benefit was concentrated among students who started below grade level: ______",
    table: {
      title: "Average reading score gain over one year (points)",
      headers: ["Starting level", "With program", "Without program"],
      rows: [["Below grade level", "12", "4"], ["At grade level", "7", "5"], ["Above grade level", "3", "3"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "students below grade level in the program gained 12 points, more than any other group.",
      "students below grade level gained 12 points with the program versus 4 without, while students above grade level gained 3 points either way.",
      "all students without the program gained 5 or fewer points.",
      "students at grade level gained 7 points with the program.",
    ],
    answer: 1,
    explanation:
      "A 'benefit' means comparing with and without the program. Choice A is true but makes no comparison to students without it. B shows a large benefit below grade level and none above.",
  },
  {
    skill: "coe_q", level: 4,
    passage:
      "An ornithologist hypothesized that a bird species lays smaller eggs in warmer regions. The data she collected, however, do not fully support this hypothesis, since ______",
    table: {
      title: "Average temperature and egg mass by region",
      headers: ["Region", "Avg. temperature (°C)", "Avg. egg mass (g)"],
      rows: [["North", "8", "24.1"], ["Central", "14", "22.6"], ["Coastal", "17", "20.2"], ["South", "21", "22.9"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "the North region, the coldest, had the heaviest eggs.",
      "the South region, the warmest, had heavier eggs on average than both the Central and Coastal regions.",
      "the Coastal region had an average temperature of 17°C.",
      "egg mass in the Central region was 22.6 grams.",
    ],
    answer: 1,
    explanation:
      "The statement needs evidence against the hypothesis. B shows the warmest region with heavier eggs than two cooler regions. A supports the hypothesis instead.",
  },

  // ───────── Inferences ─────────
  {
    skill: "inf", level: 3,
    passage:
      "Linguists have noticed that languages spoken by small, isolated communities often have more complex grammar than languages spoken by very large populations. One explanation is that when many adults learn a language as a second language, they tend to simplify its hardest grammatical features, and those simplifications spread. If this explanation is correct, a language that ______",
    stem: COMPLETE,
    choices: [
      "is spoken by an isolated community would have few speakers who know other languages.",
      "has historically been learned by many adult non-native speakers would tend to have relatively simple grammar.",
      "is learned mainly by children would become simpler over time.",
      "is spoken by a large population would become more complex over time.",
    ],
    answer: 1,
    explanation:
      "The explanation says adult learners simplify grammar. So a language with many adult learners should have simpler grammar. C and D run against the explanation.",
  },
  {
    skill: "inf", level: 4,
    passage:
      "In a lab study, mice given a drug that blocks a protein called Q7 formed fewer new memories than untreated mice. But the drug also reduces blood flow to the brain, which is itself known to impair memory formation. A second team tested mice engineered to lack Q7 entirely; these mice had normal blood flow and formed memories as well as typical mice did. Taken together, these results suggest that ______",
    stem: COMPLETE,
    choices: [
      "Q7 is essential for forming new memories in mice.",
      "blood flow to the brain has no effect on memory formation.",
      "the memory problems in drug-treated mice may have resulted from reduced blood flow rather than from blocking Q7.",
      "mice engineered to lack Q7 have unusually high blood flow to the brain.",
    ],
    answer: 2,
    explanation:
      "Mice with no Q7 but normal blood flow remembered fine, so blocking Q7 alone didn't impair memory. The drug's side effect, reduced blood flow, is the likelier cause. A is what the second study undercuts.",
  },
  {
    skill: "inf", level: 4,
    passage:
      "Historians long believed that a medieval manuscript was made in a monastery in northern France, because its decorative style matches other manuscripts from that region. However, chemical analysis shows that its blue ink came from a mineral that, at the time, was traded only through Mediterranean ports, and its parchment came from a breed of sheep raised in southern Italy. These findings suggest that the manuscript ______",
    stem: COMPLETE,
    choices: [
      "was decorated in northern France and later copied in southern Italy.",
      "may have been produced in southern Italy by someone familiar with the northern French style.",
      "was made with ink that was unavailable anywhere in Europe.",
      "was not decorated at all when it was first made.",
    ],
    answer: 1,
    explanation:
      "The materials point to southern Italy, while the style points to northern France. B reconciles both cautiously. A invents a copying step the text never mentions; C contradicts the Mediterranean trade detail.",
  },

  // ───────── Words in context ─────────
  {
    skill: "wic", level: 3,
    passage:
      "The committee's report was largely ______: it identified the weaknesses in the city's flood plan in careful detail but offered no recommendations for fixing them.",
    stem: WORD,
    choices: ["prescriptive", "diagnostic", "conciliatory", "effusive"],
    answer: 1,
    explanation:
      "The report identifies problems without proposing solutions. That's diagnostic. 'Prescriptive' would mean it did recommend fixes.",
  },
  {
    skill: "wic", level: 4,
    passage:
      "Critics have called the architect's buildings austere, but they are not so much plain as ______: every apparent absence of ornament reflects a deliberate decision about light, proportion, or material.",
    stem: WORD,
    choices: ["unfinished", "restrained", "derivative", "ostentatious"],
    answer: 1,
    explanation:
      "'Not so much plain as ___' needs a word for simplicity that is intentional. 'Restrained' means deliberately held back. 'Ostentatious' is the opposite of austere.",
  },
  {
    skill: "wic", level: 4,
    passage:
      "Some historians regard the trade treaty as a dramatic break with earlier policy, but historian Chidi Okafor sees it as more ______, arguing that it simply formalized arrangements that merchants on both sides had followed informally for decades.",
    stem: WORD,
    choices: ["revolutionary", "incremental", "arbitrary", "punitive"],
    answer: 1,
    explanation:
      "Okafor contrasts with 'dramatic break' and says the treaty formalized long-standing practice. That's a small, gradual step: incremental.",
  },

  // ───────── Text structure and purpose ─────────
  {
    skill: "tsp", level: 3,
    passage:
      "Many people assume that very tall buildings are a modern invention. Lincoln Cathedral in England, however, was topped by a central spire that made it the tallest building in the world for more than two centuries, from the early 1300s until 1548. That year the spire collapsed in a storm, and it was never rebuilt.",
    stem: "Which choice best describes the function of the second sentence in the overall structure of the text?",
    choices: [
      "It explains why the cathedral's spire collapsed.",
      "It offers an example that challenges the assumption in the first sentence.",
      "It describes how medieval builders constructed tall spires.",
      "It argues that modern buildings are less impressive than medieval ones.",
    ],
    answer: 1,
    explanation:
      "The first sentence states an assumption; 'however' introduces Lincoln Cathedral as a counterexample. The collapse is in the third sentence, and no cause is given.",
  },
  {
    skill: "tsp", level: 4,
    passage:
      "When Corin's grandmother described the flood of 1952, she never mentioned the water. She spoke instead of the neighbor who rowed from house to house with a thermos of coffee, of the church basement filled with cots, of the jar of pickled peaches someone had saved and shared out one slice at a time.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      "To describe the physical damage the flood caused to the town",
      "To show that the grandmother remembers the flood mainly through her community's acts of care",
      "To explain why the church basement was used as a shelter",
      "To criticize the town for being unprepared for the flood",
    ],
    answer: 1,
    explanation:
      "The text says she never mentioned the water and then lists only kindnesses: coffee, cots, shared peaches. A is exactly what the text says she leaves out.",
  },
  {
    skill: "tsp", level: 4,
    passage:
      "Economists have often assumed that people value a dollar saved the same way no matter the context. Yet in one experiment, shoppers were willing to drive twenty minutes to save \\$10 on a \\$25 item but not to save \\$10 on a \\$500 item. The savings were identical; only their size relative to the price differed. Such results suggest that people judge gains in relative rather than absolute terms.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      "It presents two competing theories and then endorses one of them.",
      "It describes an assumption, presents evidence inconsistent with it, and draws a conclusion from that evidence.",
      "It describes an experiment and then questions the experiment's methods.",
      "It states a conclusion and then lists several examples that support it.",
    ],
    answer: 1,
    explanation:
      "Assumption (first sentence), contrary evidence ('Yet...'), and conclusion ('Such results suggest...'). D reverses the order: the conclusion comes last.",
  },

  // ───────── Cross-text connections ─────────
  {
    skill: "ctc", level: 3,
    passage:
      "Text 1\nSome nutrition researchers argue that when people eat matters as much as what they eat. They cite studies in which participants who ate most of their calories early in the day lost more weight than those who ate mostly in the evening.",
    passage2:
      "Text 2\nIn many of these studies, the early eaters also slept more and snacked less late at night. With so many differences between the groups, it is hard to know whether meal timing itself caused the results.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the researchers in Text 1?",
    choices: [
      "By agreeing that meal timing is the main cause of weight loss",
      "By suggesting that other differences between the groups may explain the results",
      "By arguing that what people eat has no effect on weight",
      "By claiming that eating late at night improves sleep",
    ],
    answer: 1,
    explanation:
      "Text 2 points to other differences, sleep and snacking, that could explain the weight loss. That questions the cause without denying the result.",
  },
  {
    skill: "ctc", level: 4,
    passage:
      "Text 1\nThe printing press transformed European society in the 1500s. By making books cheap and plentiful, it caused literacy to spread rapidly across the continent.",
    passage2:
      "Text 2\nRegional records complicate this story. Literacy rose fastest in areas that already had networks of schools before printing presses arrived, while in some areas with many presses but few schools, literacy barely changed for generations.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?",
    choices: [
      "By rejecting the idea that printing had any effect on literacy",
      "By arguing that the claim overlooks other factors, such as existing schools, that shaped where literacy grew",
      "By agreeing that printing presses alone caused literacy to spread",
      "By claiming that books were expensive throughout the 1500s",
    ],
    answer: 1,
    explanation:
      "Text 2 says literacy tracked schools, not just presses. That complicates a simple cause, but it doesn't say printing had no effect, so A is too strong.",
  },
  {
    skill: "ctc", level: 4,
    passage:
      "Text 1\nAfter wolves were reintroduced to a national park, some ecologists reported that elk began avoiding riverbanks, where wolves could ambush them. With less grazing, streamside willows recovered. These ecologists describe the change as a clear chain of effects running from wolves to willows.",
    passage2:
      "Text 2\nOther researchers found that willow recovery was patchy. Willows grew tall mainly along streams where beavers had returned and their dams had raised the water table. Where beavers were absent, willows stayed short even in areas with few elk.",
    stem: "Based on the texts, how would the researchers in Text 2 most likely respond to the account in Text 1?",
    choices: [
      "By arguing that wolves had no effect on elk behavior",
      "By suggesting that the wolves' effect on willows may depend on other conditions, such as the presence of beaver dams",
      "By claiming that elk grazing increases willow growth",
      "By agreeing that the chain from wolves to willows is complete and clear",
    ],
    answer: 1,
    explanation:
      "Text 2 shows willows stayed short without beavers, even with few elk. So reduced grazing alone isn't enough; the effect depends on beavers. It doesn't address elk behavior, so A goes too far.",
  },

  // ───────── Rhetorical synthesis ─────────
  {
    skill: "rs", level: 3,
    passage:
      "While researching a topic, a student has taken the following notes:\n• In 1952, Rosalind Franklin's lab produced an X-ray image of DNA known as Photo 51.\n• The image showed an X-shaped pattern.\n• The pattern indicated that DNA has a helical structure.\n• In 1953, James Watson and Francis Crick used the image in developing their double-helix model of DNA.",
    stem: "The student wants to emphasize the significance of Photo 51. " + SYNTH,
    choices: [
      "Photo 51 was an X-ray image produced in Rosalind Franklin's lab in 1952.",
      "Photo 51, an X-ray image produced in Franklin's lab, revealed DNA's helical structure and informed Watson and Crick's double-helix model.",
      "Photo 51 showed an X-shaped pattern.",
      "Watson and Crick developed their double-helix model of DNA in 1953.",
    ],
    answer: 1,
    explanation:
      "Significance means why it mattered: it revealed the helix and shaped the famous model. A and C describe it without saying why it mattered.",
  },
  {
    skill: "rs", level: 4,
    passage:
      "While researching a topic, a student has taken the following notes:\n• Arctic ground squirrels and snowshoe hares both live in cold northern regions.\n• Arctic ground squirrels hibernate for up to eight months a year.\n• During hibernation, a squirrel's body temperature can drop below freezing.\n• Snowshoe hares stay active all winter.\n• A snowshoe hare's fur turns white in winter, camouflaging it against snow.",
    stem: "The student wants to contrast the two animals' strategies for surviving winter. " + SYNTH,
    choices: [
      "Both Arctic ground squirrels and snowshoe hares live in cold northern regions.",
      "Arctic ground squirrels hibernate for up to eight months, and their body temperature can drop below freezing.",
      "While Arctic ground squirrels survive winter by hibernating for up to eight months, snowshoe hares stay active, relying on fur that turns white.",
      "Snowshoe hares' fur turns white in winter, which camouflages them against the snow.",
    ],
    answer: 2,
    explanation:
      "Only C mentions both animals' strategies and sets them against each other. A is a similarity; B and D each cover one animal.",
  },
  {
    skill: "rs", level: 4,
    passage:
      "While researching a topic, a student has taken the following notes:\n• Researcher Ana Pires studied 30 schoolyards in Lisbon, Portugal.\n• She wanted to know whether replacing asphalt with grass and trees would lower surface temperatures.\n• She used thermal cameras to measure surface temperatures before and after each schoolyard was renovated.\n• Average surface temperatures dropped by 12°C after renovation.",
    stem: "The student wants to present the study's aim and methodology. " + SYNTH,
    choices: [
      "After renovation, average surface temperatures in 30 Lisbon schoolyards dropped by 12°C.",
      "Pires wanted to know whether replacing asphalt with grass and trees would lower surface temperatures.",
      "To find out whether replacing asphalt with grass and trees would cool schoolyards, Pires used thermal cameras to measure surface temperatures in 30 Lisbon schoolyards before and after renovation.",
      "Using thermal cameras, Pires found that surface temperatures dropped by 12°C after renovation.",
    ],
    answer: 2,
    explanation:
      "The goal has two parts: aim and method. C gives both. A gives results only; B gives the aim only; D gives method and results but not the aim.",
  },

  // ───────── Transitions ─────────
  {
    skill: "tr", level: 3,
    passage:
      "Most bird species build a new nest each breeding season. Bald eagles, ______ often return to the same nest year after year, adding material until some nests weigh more than a ton.",
    stem: TRANS,
    choices: ["therefore,", "by contrast,", "similarly,", "for example,"],
    answer: 1,
    explanation:
      "Most birds build new nests; eagles reuse theirs. That's a contrast. 'For example' would wrongly make eagles an example of building new nests.",
  },
  {
    skill: "tr", level: 4,
    passage:
      "Early telescopes magnified distant objects but surrounded them with blurry rings of color. Isaac Newton concluded that this flaw was impossible to eliminate from lenses. ______ he designed a telescope that gathered light with a curved mirror instead of a lens.",
    stem: TRANS,
    choices: ["Nevertheless,", "Similarly,", "Accordingly,", "In other words,"],
    answer: 2,
    explanation:
      "Newton's design follows logically from his conclusion that lenses couldn't be fixed. 'Accordingly' signals an action taken as a result. 'Nevertheless' would suggest he acted despite his conclusion.",
  },
  {
    skill: "tr", level: 4,
    passage:
      "Some scholars read the poem as a celebration of rural life, and its images of harvests and village festivals certainly support that reading. ______ the final stanza, in which the speaker leaves the village without looking back, complicates any purely celebratory interpretation.",
    stem: TRANS,
    choices: ["Thus,", "Indeed,", "Specifically,", "Still,"],
    answer: 3,
    explanation:
      "The sentence concedes support for one reading, then turns to evidence that complicates it. 'Still' marks that turn. 'Indeed' and 'Thus' would continue in the same direction.",
  },

  // ───────── Boundaries ─────────
  {
    skill: "bnd", level: 3,
    passage:
      "Marine biologist Sylvia Earle has spent more than 7,000 hours ______ in 1970, she led a team of women who lived for two weeks in an underwater laboratory.",
    stem: CONV,
    choices: ["underwater,", "underwater;", "underwater", "underwater, and,"],
    answer: 1,
    explanation:
      "Both parts are complete sentences, so a semicolon can join them. A comma alone would be a comma splice.",
  },
  {
    skill: "bnd", level: 4,
    passage:
      "The research team's central finding—that the coral had adapted to warmer water over decades rather than ______ surprised even the study's lead author.",
    stem: CONV,
    choices: ["centuries—", "centuries,", "centuries;", "centuries"],
    answer: 0,
    explanation:
      "The interruption opens with a dash, so it must close with a dash. Mixing a dash and a comma is a common trap.",
  },
  {
    skill: "bnd", level: 4,
    passage:
      "Three cities were finalists to host the summit: Lagos, ______ Lima, Peru; and Hanoi, Vietnam.",
    stem: CONV,
    choices: ["Nigeria,", "Nigeria;", "Nigeria:", "Nigeria"],
    answer: 1,
    explanation:
      "List items that contain commas are separated by semicolons. The pattern after Peru ('Peru; and') shows the semicolon is needed after Nigeria too.",
  },

  // ───────── Form, structure, and sense ─────────
  {
    skill: "fss", level: 3,
    passage:
      "Neither the coach nor the players ______ that the rain delay would last nearly three hours.",
    stem: CONV,
    choices: ["was expecting", "has expected", "were expecting", "is expecting"],
    answer: 2,
    explanation:
      "With 'neither... nor', the verb agrees with the nearer subject, 'players' (plural). Past tense fits 'would last'.",
  },
  {
    skill: "fss", level: 4,
    passage:
      "The collection of essays, along with several of the author's unpublished letters, ______ new insight into her early years as a journalist.",
    stem: CONV,
    choices: ["offer", "offers", "are offering", "have offered"],
    answer: 1,
    explanation:
      "The subject is 'collection' (singular). 'Along with several... letters' is an interrupting phrase that doesn't change the subject, so the verb is 'offers'.",
  },
  {
    skill: "fss", level: 4,
    passage:
      "By the time the expedition finally reached the summit, the climbers ______ for nearly nineteen hours without rest.",
    stem: CONV,
    choices: ["climb", "have climbed", "had been climbing", "will have climbed"],
    answer: 2,
    explanation:
      "The climbing continued up to a point in the past ('reached the summit'), so past perfect progressive, 'had been climbing', is needed.",
  },
];

import type { BankItem } from "./index";

const MAIN = "Which choice best states the main idea of the text?";
const COMPLETE = "Which choice most logically completes the text?";
const WORD = "Which choice completes the text with the most logical and precise word or phrase?";
const TRANS = "Which choice completes the text with the most logical transition?";
const CONV = "Which choice completes the text so that it conforms to the conventions of Standard English?";
const SYNTH = "Which choice most effectively uses relevant information from the notes to accomplish this goal?";

export const RW_ITEMS: BankItem[] = [
  // ───────── Central ideas and details ─────────
  {
    skill: "cid", level: 1,
    passage:
      "Farmers in parts of Kenya have found an unusual way to protect their crops from elephants. They hang beehives along the fences around their fields. Elephants avoid bees, which can sting the sensitive skin around their eyes and trunks, so the animals tend to turn away when they reach the fences. As a bonus, the farmers collect honey they can sell.",
    stem: MAIN,
    choices: [
      "Elephants in Kenya are drawn to farms that produce honey.",
      "Some Kenyan farmers use beehive fences to keep elephants away from crops while also producing honey.",
      "Bees in Kenya build their hives near elephant herds for protection.",
      "Kenyan farmers have stopped growing crops because elephants damage them.",
    ],
    answer: 1,
    explanation:
      "The text explains the beehive fences, why they keep elephants away, and the honey bonus. Choice B covers all of that. The others either contradict the text or aren't mentioned.",
  },
  {
    skill: "cid", level: 1,
    passage:
      "When the town library added a seed-lending shelf, librarian Dana Whitlock expected a few gardeners to borrow packets of tomato or bean seeds. Instead, more than three hundred residents signed up in the first spring. Many returned in the fall with seeds saved from their own plants, so the shelf was fuller at the end of the year than at the start.",
    stem: "According to the text, what surprised Whitlock about the seed-lending shelf?",
    choices: [
      "Most borrowers only wanted tomato seeds.",
      "The library had to buy more seeds every month.",
      "Far more residents used the shelf than she had expected.",
      "Gardeners refused to return any seeds.",
    ],
    answer: 2,
    explanation:
      "Whitlock expected 'a few gardeners' but more than three hundred signed up, so participation far exceeded her expectations.",
  },
  {
    skill: "cid", level: 2,
    passage:
      "Cities are often several degrees warmer than the countryside around them, partly because dark roofs and pavement absorb sunlight. Researcher Lena Ortiz and her team coated the roofs of forty buildings in one neighborhood with a white, reflective paint. Over two summers, indoor temperatures in the coated buildings stayed lower than in similar uncoated buildings nearby, and residents used their air conditioners less often.",
    stem: MAIN,
    choices: [
      "Reflective roof coatings helped keep buildings cooler and reduced air-conditioner use in Ortiz's study.",
      "Cities are warmer than rural areas only because of air conditioners.",
      "Ortiz's team found that dark pavement is more harmful than dark roofs.",
      "Residents of the neighborhood preferred white buildings for their appearance.",
    ],
    answer: 0,
    explanation:
      "The first sentence gives background; the rest describes Ortiz's study and its result: cooler buildings and less air-conditioner use. Choice A states that result.",
  },
  {
    skill: "cid", level: 2,
    passage:
      "Marisol had rehearsed her speech for the student council election for weeks, pacing her bedroom with note cards. But when she stepped onto the auditorium stage, she noticed her younger brother waving from the third row, his face painted in the school's colors. She set the note cards on the podium, smiled, and spoke to the crowd as easily as if she were talking to him at the dinner table.",
    stem: "Which choice best describes what happens in the text?",
    choices: [
      "Marisol forgets her speech and leaves the stage.",
      "Marisol decides not to run for student council after seeing her brother.",
      "Seeing her brother helps Marisol relax and speak naturally.",
      "Marisol's brother interrupts the speech to cheer for her.",
    ],
    answer: 2,
    explanation:
      "After noticing her brother, Marisol sets aside her cards and speaks 'as easily' as at home, which shows she relaxed.",
  },
  {
    skill: "cid", level: 3,
    passage:
      "For decades, biologists assumed that the bright colors of poison dart frogs evolved solely to warn predators of the frogs' toxicity. However, a team led by ecologist Tomas Reyes found that in some populations, the most brightly colored males also won more mates, even when toxicity was held constant. Reyes argues that the frogs' coloration was likely shaped by two pressures at once: avoiding predators and attracting partners.",
    stem: MAIN,
    choices: [
      "Poison dart frogs are less toxic than biologists once believed.",
      "Reyes's findings suggest that frog coloration serves both as a warning and as a way to attract mates.",
      "Predators of poison dart frogs have learned to ignore bright colors.",
      "Biologists have proven that frog coloration has nothing to do with toxicity.",
    ],
    answer: 1,
    explanation:
      "The text contrasts the old single explanation with Reyes's argument for two pressures at once. B captures that. D overstates: the text doesn't reject the warning role.",
  },

  // ───────── Textual evidence ─────────
  {
    skill: "coe_t", level: 1,
    passage:
      "A student hypothesizes that tomato plants that receive more hours of light each day will produce more tomatoes than plants that receive fewer hours of light.",
    stem: "Which finding, if true, would most directly support the student's hypothesis?",
    choices: [
      "Plants given 16 hours of light per day produced more tomatoes than plants given 8 hours.",
      "Plants given 16 hours of light per day grew taller leaves than plants given 8 hours.",
      "Plants watered twice a day produced more tomatoes than plants watered once a day.",
      "Plants given 8 hours of light per day produced the same number of tomatoes each week.",
    ],
    answer: 0,
    explanation:
      "The hypothesis links more light to more tomatoes. Only A compares light hours and tomato count. B measures leaves, C changes water, and D compares nothing.",
  },
  {
    skill: "coe_t", level: 1,
    passage:
      "In the poem \"Harbor Morning\" by fictional poet Ines Calder, the speaker expresses a longing to return to the place where she grew up.",
    stem: "Which quotation from the poem most effectively illustrates this claim?",
    choices: [
      "\"The gulls are loud above the rusted pier.\"",
      "\"Each night I walk the city's streets of glass.\"",
      "\"I would trade every lamp of this bright town / for one grey morning on my mother's shore.\"",
      "\"The boats go out before the sun is up.\"",
    ],
    answer: 2,
    explanation:
      "Choice C shows the speaker wishing to give up her current town for the shore of her mother, which is longing for home. The others describe scenes without expressing longing.",
  },
  {
    skill: "coe_t", level: 2,
    passage:
      "Some economists argue that a four-day workweek can raise productivity because rested employees make fewer mistakes. Others worry that compressing work into fewer days simply leads to longer, more tiring workdays. Economist Priya Natarajan claims that the benefits depend on whether total weekly hours are reduced or merely rearranged.",
    stem: "Which finding, if true, would most directly support Natarajan's claim?",
    choices: [
      "Workers at firms that cut weekly hours from 40 to 32 became more productive, while workers at firms that kept 40 hours over four days did not.",
      "Most employees surveyed said they would prefer a four-day workweek.",
      "Firms that adopted a four-day workweek reported lower electricity costs.",
      "Productivity rose at all firms that adopted a four-day workweek, regardless of hours.",
    ],
    answer: 0,
    explanation:
      "Natarajan says results depend on whether hours are cut or just rearranged. Choice A shows exactly that difference. D would weaken her claim.",
  },
  {
    skill: "coe_t", level: 2,
    passage:
      "Historian Malik Owens argues that the spread of public lending libraries in the 1800s did more than give people access to books; it also created new public spaces where people from different social classes mixed.",
    stem: "Which finding, if true, would most directly support Owens's argument?",
    choices: [
      "Many libraries in the 1800s were funded by wealthy donors.",
      "Library visitor logs from the period show factory workers and merchants regularly using the same reading rooms.",
      "Book prices fell sharply during the late 1800s.",
      "Some libraries in the 1800s charged membership fees that only wealthy residents could afford.",
    ],
    answer: 1,
    explanation:
      "The argument's second part is that libraries mixed social classes. Logs showing workers and merchants in the same rooms support it directly. D would weaken it.",
  },
  {
    skill: "coe_t", level: 3,
    passage:
      "Marine biologist Hana Sato hypothesizes that the decline of a kelp forest off the coast was caused mainly by a rise in sea urchins, which eat kelp, rather than by warmer water temperatures alone.",
    stem: "Which finding, if true, would most directly support Sato's hypothesis?",
    choices: [
      "Water temperatures near the kelp forest rose by two degrees during the decline.",
      "Kelp forests in other regions with similar warming but few sea urchins did not decline.",
      "Sea urchins are found in many coastal ecosystems.",
      "Kelp can grow up to half a meter per day in ideal conditions.",
    ],
    answer: 1,
    explanation:
      "To show urchins mattered more than warming, you need a case with warming but no urchins and no decline. B provides that comparison. A supports the warming explanation instead.",
  },

  // ───────── Quantitative evidence ─────────
  {
    skill: "coe_q", level: 1,
    passage:
      "A student surveyed classmates about their average daily screen time. She concluded that screen time tends to increase as students get older: ______",
    table: {
      title: "Average daily screen time by grade",
      headers: ["Grade", "Hours per day"],
      rows: [["6th", "4.2"], ["7th", "4.8"], ["8th", "5.5"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "6th graders averaged 4.2 hours per day.",
      "the average rose from 4.2 hours in 6th grade to 5.5 hours in 8th grade.",
      "8th graders averaged 5.5 hours per day.",
      "the average for 7th graders was 4.8 hours per day.",
    ],
    answer: 1,
    explanation:
      "The claim is about an increase with age, so you need a comparison across grades. Only B shows the change from 6th to 8th grade.",
  },
  {
    skill: "coe_q", level: 1,
    passage:
      "A community garden tracked its harvest. The garden manager noted that the crop with the largest harvest was not the one planted in the largest area: ______",
    table: {
      title: "Garden harvest",
      headers: ["Crop", "Area planted (sq ft)", "Harvest (lb)"],
      rows: [["Squash", "300", "180"], ["Beans", "200", "120"], ["Tomatoes", "150", "210"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "squash was planted in 300 square feet.",
      "beans produced 120 pounds from 200 square feet.",
      "tomatoes produced the most, 210 pounds, from the smallest area, 150 square feet.",
      "squash produced 180 pounds.",
    ],
    answer: 2,
    explanation:
      "The statement needs the top harvest and a comparison of planting area. Tomatoes had the largest harvest but the smallest area.",
  },
  {
    skill: "coe_q", level: 2,
    passage:
      "Researchers studied how quickly four species of seedlings grew in shade. They concluded that shade tolerance varied widely among species, noting that ______",
    table: {
      title: "Average height gain in 8 weeks (cm)",
      headers: ["Species", "Full sun", "Shade"],
      rows: [["Maple", "24", "18"], ["Oak", "20", "6"], ["Birch", "28", "9"], ["Beech", "15", "14"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "birch grew the most in full sun, 28 cm.",
      "beech grew nearly as much in shade as in sun, while oak grew less than a third as much in shade.",
      "all four species grew less in shade than in full sun.",
      "maple grew 18 cm in shade.",
    ],
    answer: 1,
    explanation:
      "To show that shade tolerance varied widely, you need a contrast between a tolerant and an intolerant species. Beech (15 vs 14) and oak (20 vs 6) show that contrast.",
  },
  {
    skill: "coe_q", level: 2,
    passage:
      "A city tracked bike-share trips before and after adding protected bike lanes on two streets. Officials argued that the lanes were associated with increased ridership on those streets specifically, since ______",
    table: {
      title: "Average weekly bike-share trips",
      headers: ["Street", "Before lanes", "After lanes"],
      rows: [["Elm St (new lane)", "410", "690"], ["Pine St (new lane)", "350", "580"], ["Oak St (no lane)", "400", "420"]],
    },
    stem: "Which choice most effectively uses data from the table to complete the statement?",
    choices: [
      "Oak Street had about 400 trips per week before the lanes were added.",
      "Elm Street had the most trips after the lanes were added.",
      "trips rose sharply on Elm and Pine Streets but barely changed on Oak Street, which got no lane.",
      "Pine Street had fewer trips than Elm Street both before and after.",
    ],
    answer: 2,
    explanation:
      "'Specifically' means the increase should appear where lanes were added and not elsewhere. C compares lane streets to the no-lane street.",
  },
  {
    skill: "coe_q", level: 3,
    passage:
      "Linguist Ada Moreau studied how often speakers of a regional dialect used a traditional word for 'creek' versus a standard alternative. She hypothesized that the traditional word is fading mainly among younger speakers rather than evenly across all ages. ______",
    table: {
      title: "Percent of speakers using the traditional word",
      headers: ["Age group", "1990 survey", "2020 survey"],
      rows: [["18–30", "62%", "21%"], ["31–50", "70%", "64%"], ["51+", "78%", "75%"]],
    },
    stem: "Which choice most effectively uses data from the table to support Moreau's hypothesis?",
    choices: [
      "In 2020, speakers aged 51 and older used the traditional word most often, at 75%.",
      "Use of the traditional word fell in every age group from 1990 to 2020.",
      "Among 18–30-year-olds, use fell from 62% to 21%, while it fell by only a few percentage points in the older groups.",
      "In 1990, at least 62% of speakers in every age group used the traditional word.",
    ],
    answer: 2,
    explanation:
      "The hypothesis contrasts young speakers with everyone else. C shows a 41-point drop for the youngest group versus small drops for older groups. B ignores the 'mainly younger' part.",
  },

  // ───────── Inferences ─────────
  {
    skill: "inf", level: 1,
    passage:
      "Arctic terns migrate farther than any other known bird, traveling between the Arctic and Antarctica each year. Because they experience summer at both ends of the planet, terns see more daylight in a year than almost any other animal. Researchers therefore expect that terns ______",
    stem: COMPLETE,
    choices: [
      "rarely migrate more than a few hundred miles.",
      "spend most of their lives in darkness.",
      "have many hours of daylight in which to hunt for food.",
      "live only in the Arctic.",
    ],
    answer: 2,
    explanation:
      "If terns see more daylight than almost any animal, it follows that they have lots of daylight hours, for example to hunt. The other choices contradict the text.",
  },
  {
    skill: "inf", level: 1,
    passage:
      "A bakery owner noticed that her bread sold out by noon on weekdays but was often left over on weekends. After reviewing her records, she found that most weekday customers were office workers who bought sandwiches for lunch. Since the nearby offices are closed on weekends, she concluded that she should ______",
    stem: COMPLETE,
    choices: [
      "bake less bread on weekends.",
      "open a second bakery near the offices.",
      "raise her bread prices on weekdays only.",
      "stop selling sandwiches entirely.",
    ],
    answer: 0,
    explanation:
      "Weekday demand comes from office workers who aren't there on weekends, so weekend demand is lower. Baking less on weekends is the logical response.",
  },
  {
    skill: "inf", level: 2,
    passage:
      "Mosses lack roots and absorb water directly through their leaves. Because they have no way to pull water from deep in the soil, most mosses survive dry periods by drying out completely and becoming dormant, then reviving when it rains. This suggests that in a region where rain is frequent but light, mosses ______",
    stem: COMPLETE,
    choices: [
      "would be unable to grow because the rain does not reach deep soil.",
      "could thrive, since even light rain wets their leaves directly.",
      "would need to grow deeper roots to survive.",
      "would remain dormant all year.",
    ],
    answer: 1,
    explanation:
      "Mosses absorb water through leaves, not from deep soil, so frequent light rain is enough. A wrongly assumes they need deep water; C contradicts 'lack roots'.",
  },
  {
    skill: "inf", level: 2,
    passage:
      "In a study of reading habits, researchers found that students who chose their own books read for more minutes per day than students assigned books by teachers. However, the two groups showed similar gains on vocabulary tests over the semester. If these results hold, then giving students a choice of books may ______",
    stem: COMPLETE,
    choices: [
      "lower students' vocabulary scores.",
      "increase reading time without necessarily producing larger vocabulary gains.",
      "be the only way to improve vocabulary.",
      "cause students to stop reading assigned books.",
    ],
    answer: 1,
    explanation:
      "Choice increased reading time, but vocabulary gains were similar. B states both parts accurately. A and C go beyond the evidence.",
  },
  {
    skill: "inf", level: 3,
    passage:
      "Some archaeologists have argued that a set of carved stones found at a coastal site were used as fishing weights. But the stones show no wear around their carved grooves, where a line would have rubbed if they had been tied to nets and dragged through water repeatedly. Moreover, similar stones have been found at inland sites far from any water. These observations suggest that the stones ______",
    stem: COMPLETE,
    choices: [
      "were probably carved by people who lived inland.",
      "were most likely made for some purpose other than fishing.",
      "were used as fishing weights only briefly before being lost.",
      "were moved inland by later residents of the coastal site.",
    ],
    answer: 1,
    explanation:
      "Both observations (no line wear, stones found far from water) argue against the fishing-weight idea. B is the cautious conclusion. A, C, and D add claims the text doesn't support.",
  },

  // ───────── Words in context ─────────
  {
    skill: "wic", level: 1,
    passage:
      "The new trail map was so ______ that even first-time hikers could find the waterfall without getting lost.",
    stem: WORD,
    choices: ["confusing", "clear", "ancient", "expensive"],
    answer: 1,
    explanation:
      "First-time hikers found the way easily, so the map must have been easy to understand: clear.",
  },
  {
    skill: "wic", level: 1,
    passage:
      "Although the team lost the first three games of the season, the coach remained ______, reminding players that they had improved every week.",
    stem: WORD,
    choices: ["hopeful", "furious", "silent", "bored"],
    answer: 0,
    explanation:
      "'Although' signals contrast with losing, and the coach points out improvement, so the coach stayed positive: hopeful.",
  },
  {
    skill: "wic", level: 2,
    passage:
      "Early reviewers dismissed the novelist's first book as slight and forgettable, but later critics ______ that judgment, arguing that its quiet style concealed a sharp critique of small-town life.",
    stem: WORD,
    choices: ["repeated", "challenged", "predicted", "ignored"],
    answer: 1,
    explanation:
      "'But' and the later critics' opposite view show they disputed the early judgment: challenged.",
  },
  {
    skill: "wic", level: 2,
    passage:
      "The chemist's findings were ______: other laboratories that followed her procedure obtained the same results again and again.",
    stem: WORD,
    choices: ["controversial", "preliminary", "reproducible", "unpublished"],
    answer: 2,
    explanation:
      "The colon introduces an explanation: other labs got the same results repeatedly. That's the definition of reproducible.",
  },
  {
    skill: "wic", level: 3,
    passage:
      "Though the senator was known for fiery speeches, her remarks at the hearing were notably ______; she spoke briefly, avoided accusations, and focused on points both parties could accept.",
    stem: WORD,
    choices: ["incendiary", "measured", "evasive", "verbose"],
    answer: 1,
    explanation:
      "'Though' contrasts with fiery speeches, and the description (brief, no accusations, common ground) means calm and careful: measured. 'Evasive' implies dodging, which the text doesn't say; 'verbose' contradicts 'briefly'.",
  },

  // ───────── Text structure and purpose ─────────
  {
    skill: "tsp", level: 1,
    passage:
      "Many people think of deserts as lifeless. In fact, the Sonoran Desert is home to more than two thousand species of plants. Some, like the saguaro cactus, store water for months, while others sprout and bloom only in the few weeks after a rain.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      "It describes a common belief and then presents evidence against it.",
      "It explains how a desert formed over millions of years.",
      "It compares two deserts and argues one is more important.",
      "It tells a story about a scientist's trip to the desert.",
    ],
    answer: 0,
    explanation:
      "The text opens with the belief that deserts are lifeless, then counters it with the Sonoran Desert's plant diversity.",
  },
  {
    skill: "tsp", level: 1,
    passage:
      "The museum's new exhibit lets visitors handle replicas of ancient tools. Children can grind grain with a stone mortar or try to start a fire with a bow drill. Museum staff hope that touching these objects will help visitors appreciate how much skill everyday tasks once required.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      "To argue that museums should stop displaying original artifacts",
      "To describe a hands-on exhibit and the reason behind it",
      "To explain how bow drills were invented",
      "To criticize children's behavior in museums",
    ],
    answer: 1,
    explanation:
      "The text describes what visitors can do in the exhibit and then states the staff's goal. That's description plus reason.",
  },
  {
    skill: "tsp", level: 2,
    passage:
      "For years, scientists believed that octopuses, being solitary, had little reason to communicate. Then divers off the coast of Australia filmed groups of octopuses living close together, changing color and posture as they approached one another. These recordings have led some researchers to propose that octopus signaling is more complex than once thought.",
    stem: "Which choice best describes the function of the second sentence in the overall structure of the text?",
    choices: [
      "It provides an observation that prompted a reconsideration of an earlier belief.",
      "It restates the earlier belief described in the first sentence.",
      "It explains why octopuses prefer to live alone.",
      "It offers a final conclusion about how all octopuses behave.",
    ],
    answer: 0,
    explanation:
      "The first sentence gives the old belief; the second gives the new observation (octopuses together, signaling); the third says this led researchers to rethink. So the second sentence is the observation prompting reconsideration.",
  },
  {
    skill: "tsp", level: 2,
    passage:
      "Composer Clara Ruiz wrote her violin sonata in just three weeks, according to her letters. Yet the manuscript tells a different story: its pages are crowded with crossed-out measures, pasted-in revisions, and notes dated over nearly two years.",
    stem: "Which choice best describes the function of the second sentence in the overall structure of the text?",
    choices: [
      "It supports Ruiz's claim by describing how quickly she worked.",
      "It presents evidence that complicates the account given in Ruiz's letters.",
      "It explains why Ruiz preferred writing for the violin.",
      "It summarizes critics' reactions to the sonata.",
    ],
    answer: 1,
    explanation:
      "'Yet' signals contrast. The manuscript's two years of revisions undercut the 'three weeks' story from her letters.",
  },
  {
    skill: "tsp", level: 3,
    passage:
      "Economists often model shoppers as rational actors who compare prices carefully. Behavioral researchers, however, have documented the 'decoy effect': when a store adds a clearly inferior option, such as a medium popcorn priced almost as high as a large, more customers choose the large. The decoy is rarely purchased, yet its presence shifts decisions in a way a strictly rational model would not predict.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      "To show that stores should stop selling medium-sized products",
      "To argue that economists' models of shopping are entirely useless",
      "To present a phenomenon that challenges a common assumption about how shoppers decide",
      "To explain how popcorn prices are set at movie theaters",
    ],
    answer: 2,
    explanation:
      "The text sets up the rational-shopper assumption and then presents the decoy effect, which a rational model wouldn't predict. B overstates: 'entirely useless' goes too far.",
  },

  // ───────── Cross-text connections ─────────
  {
    skill: "ctc", level: 1,
    passage:
      "Text 1\nSchool start times should be later. Teenagers' sleep cycles shift during adolescence, making it hard for them to fall asleep early. Starting school at 8:30 a.m. or later would let students get the sleep they need.",
    passage2:
      "Text 2\nSome districts that moved start times later found that students slept more and attendance improved. However, these districts also faced challenges, such as rescheduling bus routes and after-school sports.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the claim in Text 1?",
    choices: [
      "By rejecting the idea that later start times help students sleep",
      "By agreeing that later start times can help students but noting practical difficulties",
      "By arguing that school should start even earlier",
      "By claiming that teenagers' sleep cycles do not change",
    ],
    answer: 1,
    explanation:
      "Text 2 reports benefits (more sleep, better attendance) and then 'However' raises logistical challenges. That's agreement with a caveat.",
  },
  {
    skill: "ctc", level: 1,
    passage:
      "Text 1\nVolunteer bird counts, in which members of the public record the birds they see, have given scientists valuable data on how bird populations change across large areas.",
    passage2:
      "Text 2\nVolunteers' records can be uneven. Beginners may misidentify similar species, and counts tend to be higher near cities, where more volunteers live. Researchers must use careful statistical methods to correct for these problems.",
    stem: "Which choice best describes how Text 2 relates to Text 1?",
    choices: [
      "Text 2 describes limitations of a data source that Text 1 presents as valuable.",
      "Text 2 argues that volunteer bird counts should be stopped.",
      "Text 2 explains how birds migrate to cities.",
      "Text 2 provides the history of the first volunteer bird count.",
    ],
    answer: 0,
    explanation:
      "Text 1 praises volunteer counts; Text 2 points out their weaknesses and how researchers handle them. It qualifies, but doesn't reject, the data source.",
  },
  {
    skill: "ctc", level: 2,
    passage:
      "Text 1\nArt historian Noor Aziz argues that the painter Edda Lind abandoned realism in her later work because her failing eyesight made fine detail impossible. The blurred edges of Lind's late landscapes, Aziz says, reflect what she could actually see.",
    passage2:
      "Text 2\nLind's letters from the same period describe her excitement about 'painting the feeling of a place rather than its outline.' She also produced several sharply detailed sketches during those years, which she chose not to turn into paintings.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to Aziz's explanation?",
    choices: [
      "By agreeing that Lind's eyesight made detailed work impossible",
      "By suggesting that Lind's change in style was at least partly a deliberate artistic choice",
      "By arguing that Lind's late landscapes are more realistic than her early ones",
      "By claiming that Lind never painted landscapes",
    ],
    answer: 1,
    explanation:
      "Text 2's evidence (letters about painting feelings; detailed sketches she chose not to paint) suggests the blur was intentional, which challenges Aziz's eyesight explanation.",
  },
  {
    skill: "ctc", level: 2,
    passage:
      "Text 1\nUrban planners have long assumed that adding lanes to a congested highway will reduce traffic. More lanes mean more room for cars, so trips should move faster.",
    passage2:
      "Text 2\nStudies of 'induced demand' have found that when highways are widened, traffic often returns to its previous level within a few years. Faster roads encourage people to drive more often and farther, filling the new lanes.",
    stem: "Based on the texts, how would the author of Text 2 most likely respond to the assumption described in Text 1?",
    choices: [
      "By arguing that the assumption overlooks how wider roads change people's driving behavior",
      "By agreeing that new lanes permanently reduce traffic",
      "By claiming that highways should never be built",
      "By stating that urban planners do not study traffic",
    ],
    answer: 0,
    explanation:
      "Text 2 explains that wider roads encourage more driving, which refills them. That's exactly what Text 1's assumption ignores.",
  },
  {
    skill: "ctc", level: 3,
    passage:
      "Text 1\nNeuroscientist Ken Abara contends that the brain's ability to form new neurons in adulthood, called neurogenesis, is essential to forming long-term memories. In his lab, mice whose neurogenesis was blocked struggled to learn new mazes.",
    passage2:
      "Text 2\nNeuroscientist Iris Feld agrees that blocking neurogenesis impairs maze learning in mice, but she notes that the drugs used to block it also reduce inflammation-fighting cells throughout the brain. Until researchers can block neurogenesis without these side effects, she argues, its specific role in memory remains uncertain.",
    stem: "Based on the texts, how would Feld most likely respond to Abara's conclusion?",
    choices: [
      "She would reject his experimental results as inaccurate.",
      "She would accept his results but question whether they show neurogenesis itself is responsible for the memory effects.",
      "She would argue that neurogenesis does not occur in adult mice.",
      "She would agree that his conclusion has been conclusively proven.",
    ],
    answer: 1,
    explanation:
      "Feld 'agrees' that blocking neurogenesis impairs learning (accepts the results) but says the drugs have other effects, so the cause is uncertain. That's B. A is wrong because she doesn't dispute the results.",
  },

  // ───────── Rhetorical synthesis ─────────
  {
    skill: "rs", level: 1,
    passage:
      "While researching a topic, a student has taken the following notes:\n• The Great Wall of China is a series of fortifications in northern China.\n• Its total length, including all branches, is about 21,000 kilometers.\n• Construction took place over many centuries.\n• It was built to protect against invasions.",
    stem: "The student wants to emphasize the length of the Great Wall. " + SYNTH,
    choices: [
      "The Great Wall of China was built to protect against invasions.",
      "Including all its branches, the Great Wall of China stretches about 21,000 kilometers.",
      "The Great Wall is a series of fortifications in northern China.",
      "Construction of the Great Wall took place over many centuries.",
    ],
    answer: 1,
    explanation:
      "The goal is length. Only B mentions the 21,000-kilometer figure.",
  },
  {
    skill: "rs", level: 1,
    passage:
      "While researching a topic, a student has taken the following notes:\n• Maria Tallchief was a ballet dancer from the Osage Nation.\n• She became the first prima ballerina of the New York City Ballet.\n• She was known for her role in The Firebird (1949).\n• She was born in 1925 in Oklahoma.",
    stem: "The student wants to introduce Maria Tallchief to an audience unfamiliar with her. " + SYNTH,
    choices: [
      "The Firebird premiered in 1949.",
      "She was born in 1925.",
      "Maria Tallchief, a ballet dancer from the Osage Nation, became the first prima ballerina of the New York City Ballet.",
      "The New York City Ballet performed The Firebird.",
    ],
    answer: 2,
    explanation:
      "An introduction for an unfamiliar audience should name her and say who she is and why she matters. C does that.",
  },
  {
    skill: "rs", level: 2,
    passage:
      "While researching a topic, a student has taken the following notes:\n• Honeybees and bumblebees both pollinate crops.\n• Honeybees live in colonies of up to 60,000 bees.\n• Bumblebee colonies usually have fewer than 500 bees.\n• Bumblebees can 'buzz pollinate,' shaking pollen loose from flowers like tomatoes.",
    stem: "The student wants to emphasize a difference in colony size between the two types of bees. " + SYNTH,
    choices: [
      "Both honeybees and bumblebees pollinate crops, including tomatoes.",
      "While honeybee colonies can include up to 60,000 bees, bumblebee colonies usually have fewer than 500.",
      "Bumblebees can buzz pollinate, shaking pollen loose from flowers.",
      "Honeybees live in colonies.",
    ],
    answer: 1,
    explanation:
      "The goal is a difference in colony size. B gives both sizes in contrast. A states a similarity; C and D lack the comparison.",
  },
  {
    skill: "rs", level: 2,
    passage:
      "While researching a topic, a student has taken the following notes:\n• A 2019 study examined 500 urban parks.\n• Parks with more trees had cooler air temperatures in summer.\n• Parks with tree cover above 40% were about 3°C cooler than nearby streets.\n• Parks with less than 10% tree cover showed almost no cooling.",
    stem: "The student wants to present the study's findings to an audience already familiar with the study. " + SYNTH,
    choices: [
      "A 2019 study examined 500 urban parks.",
      "Parks are areas of green space in cities.",
      "The study found that parks with over 40% tree cover were about 3°C cooler than nearby streets, while parks with under 10% showed almost no cooling.",
      "Some researchers study city parks.",
    ],
    answer: 2,
    explanation:
      "An audience already familiar with the study doesn't need an introduction to it; they need the findings. C presents them.",
  },
  {
    skill: "rs", level: 3,
    passage:
      "While researching a topic, a student has taken the following notes:\n• Kintsugi is a Japanese technique for repairing broken pottery.\n• The cracks are joined with lacquer mixed with powdered gold.\n• Rather than hiding the damage, kintsugi highlights it.\n• The practice reflects the idea that an object's history adds to its beauty.\n• Some modern artists use similar ideas in sculpture.",
    stem: "The student wants to explain the reasoning behind kintsugi's approach to repair. " + SYNTH,
    choices: [
      "Kintsugi repairs pottery using lacquer mixed with powdered gold.",
      "Kintsugi highlights rather than hides damage, reflecting the idea that an object's history adds to its beauty.",
      "Some modern artists use ideas similar to kintsugi in their sculptures.",
      "Kintsugi is a Japanese technique for repairing broken pottery.",
    ],
    answer: 1,
    explanation:
      "The goal is the reasoning, the 'why'. Only B connects the technique (highlighting damage) to the idea behind it (history adds beauty). A describes how, not why.",
  },

  // ───────── Transitions ─────────
  {
    skill: "tr", level: 1,
    passage:
      "Sloths move very slowly, usually less than 40 yards a day. ______ algae often grow on their fur, giving them a greenish color that helps them hide in trees.",
    stem: TRANS,
    choices: ["However,", "As a result,", "For instance,", "In contrast,"],
    answer: 1,
    explanation:
      "Algae growing on fur is a consequence of sloths moving so slowly. That's cause and effect: 'As a result.'",
  },
  {
    skill: "tr", level: 1,
    passage:
      "Many early video games were made by a single programmer working alone. ______ modern games are often built by teams of hundreds of people.",
    stem: TRANS,
    choices: ["Similarly,", "Therefore,", "By contrast,", "For example,"],
    answer: 2,
    explanation:
      "The sentences contrast a single programmer with huge teams, so 'By contrast' fits.",
  },
  {
    skill: "tr", level: 2,
    passage:
      "The Atacama Desert in Chile has almost no cloud cover, which makes it a superb place to observe the night sky. ______ its high altitude means there is less atmosphere to blur the light of distant stars.",
    stem: TRANS,
    choices: ["However,", "For example,", "Instead,", "Moreover,"],
    answer: 3,
    explanation:
      "The second sentence adds another reason the desert is good for astronomy. 'Moreover' adds a point in the same direction. 'However' and 'Instead' signal contrast, and the altitude isn't an example of cloud cover.",
  },
  {
    skill: "tr", level: 2,
    passage:
      "Researchers expected that students who used laptops to take notes would remember more because they could write down more of the lecture. ______ students who wrote notes by hand performed better on later tests, possibly because they had to summarize ideas in their own words.",
    stem: TRANS,
    choices: ["Instead,", "Likewise,", "Additionally,", "Specifically,"],
    answer: 0,
    explanation:
      "The result contradicted the expectation: handwritten notes did better. 'Instead' signals an outcome different from what was expected.",
  },
  {
    skill: "tr", level: 3,
    passage:
      "Medieval maps often placed Jerusalem at the center of the world. These maps were not meant primarily as tools for travel. ______ they expressed their makers' religious beliefs about the world's structure and meaning.",
    stem: TRANS,
    choices: ["Rather,", "Consequently,", "For example,", "Meanwhile,"],
    answer: 0,
    explanation:
      "The sentence before says what the maps were not; the blank introduces what they were instead. 'Rather' corrects or replaces the previous idea.",
  },

  // ───────── Boundaries ─────────
  {
    skill: "bnd", level: 1,
    passage:
      "The volcano erupted without warning ______ villagers living nearby had only minutes to evacuate.",
    stem: CONV,
    choices: ["warning,", "warning;", "warning", "warning, and,"],
    answer: 1,
    explanation:
      "Both halves are complete sentences. A semicolon can join them. A comma alone creates a comma splice, and no punctuation creates a run-on.",
  },
  {
    skill: "bnd", level: 1,
    passage:
      "For the science fair, Jamal brought three items ______ a small solar panel, a motor, and a fan blade.",
    stem: CONV,
    choices: ["items:", "items;", "items, and", "items. A"],
    answer: 0,
    explanation:
      "A complete sentence introduces a list, so a colon is correct. A semicolon would need a complete sentence after it.",
  },
  {
    skill: "bnd", level: 2,
    passage:
      "The first public museum in the Americas ______ opened in Charleston, South Carolina, in 1773.",
    stem: CONV,
    choices: [
      "museum, the Charleston Museum,",
      "museum, the Charleston Museum",
      "museum the Charleston Museum,",
      "museum; the Charleston Museum,",
    ],
    answer: 0,
    explanation:
      "'The Charleston Museum' is extra information renaming the subject, so it needs a comma on both sides.",
  },
  {
    skill: "bnd", level: 2,
    passage:
      "Astronomer Henrietta Swan Leavitt studied thousands of variable stars at the Harvard College ______ her discovery of a link between a star's brightness and its pulsation period later helped scientists measure distances across the universe.",
    stem: CONV,
    choices: ["Observatory", "Observatory,", "Observatory, and", "Observatory, and,"],
    answer: 2,
    explanation:
      "Two independent clauses can be joined with a comma plus a coordinating conjunction: ', and'. A comma alone is a splice; nothing at all is a run-on.",
  },
  {
    skill: "bnd", level: 3,
    passage:
      "The engineers faced a difficult choice: they could reinforce the old bridge, which would preserve its historic ironwork ______ they could replace it entirely, which would be cheaper but would erase a local landmark.",
    stem: CONV,
    choices: ["ironwork, or", "ironwork; or", "ironwork or,", "ironwork. Or"],
    answer: 0,
    explanation:
      "This sentence joins two complete options with 'or'. The comma both closes the nonessential 'which' clause and comes before the conjunction 'or'. A semicolon before 'or' or a period would break up the pair of choices the colon introduced."
  },

  // ───────── Form, structure, and sense ─────────
  {
    skill: "fss", level: 1,
    passage: "The box of old photographs ______ in the attic for decades before anyone opened it.",
    stem: CONV,
    choices: ["were sitting", "have sat", "had sat", "are sitting"],
    answer: 2,
    explanation:
      "The subject is 'box' (singular), and the action happened before another past event ('before anyone opened it'), so past perfect 'had sat' fits.",
  },
  {
    skill: "fss", level: 1,
    passage: "Each of the students in the robotics club ______ responsible for building one part of the robot.",
    stem: CONV,
    choices: ["are", "is", "were", "have been"],
    answer: 1,
    explanation:
      "'Each' is singular, so the verb must be singular: 'is'. 'Of the students' is just a prepositional phrase.",
  },
  {
    skill: "fss", level: 2,
    passage:
      "When the two cities competed to host the festival, the organizing committee chose Riverton because ______ proposal included free public transportation for visitors.",
    stem: CONV,
    choices: ["their", "its", "it's", "they're"],
    answer: 1,
    explanation:
      "The pronoun refers to Riverton, a single city, and shows possession: 'its'. 'It's' means 'it is'.",
  },
  {
    skill: "fss", level: 2,
    passage:
      "Both ______ research projects focused on coral reefs in the Pacific Ocean.",
    stem: CONV,
    choices: ["scientist's", "scientists", "scientists'", "scientist"],
    answer: 2,
    explanation:
      "'Both' means more than one scientist, and the projects belong to them, so you need the plural possessive: scientists'. 'Scientist's' is singular, and 'scientists' without an apostrophe isn't possessive.",
  },
  {
    skill: "fss", level: 3,
    passage:
      "Having studied the migration patterns of monarch butterflies for over twenty years, ______",
    stem: CONV,
    choices: [
      "the data collected by Dr. Lin revealed a sharp decline.",
      "a sharp decline was revealed in Dr. Lin's data.",
      "Dr. Lin documented a sharp decline in the population.",
      "the population, according to Dr. Lin, declined sharply.",
    ],
    answer: 2,
    explanation:
      "The opening phrase describes someone who studied butterflies, so the subject right after the comma must be that person: Dr. Lin. Otherwise the modifier dangles.",
  },
];

export type Section = 'aptitude' | 'reasoning' | 'verbal' | 'coding';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  section: Section;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CodingQuestion {
  id: string;
  section: 'coding';
  topic: string;
  difficulty: Difficulty;
  question: string;
  description: string;
  examples: { input: string; output: string }[];
  testCases: { input: string; expectedOutput: string }[];
  starterCode: Record<string, string>;
}

export const sectionInfo: Record<Section, { label: string; topics: string[]; color: string; icon: string; time: number; questionCount: number }> = {
  aptitude: {
    label: 'Aptitude',
    topics: ['Percentages', 'Profit & Loss', 'Time & Work', 'Time Speed Distance', 'Permutations & Combinations', 'Probability', 'Simple & Compound Interest', 'Ratios & Averages', 'Number System'],
    color: 'aptitude',
    icon: '🟠',
    time: 40,
    questionCount: 20,
  },
  reasoning: {
    label: 'Reasoning',
    topics: ['Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Puzzles', 'Syllogisms', 'Series'],
    color: 'reasoning',
    icon: '🔵',
    time: 30,
    questionCount: 15,
  },
  verbal: {
    label: 'Verbal Ability',
    topics: ['Reading Comprehension', 'Sentence Correction', 'Synonyms/Antonyms', 'Para Jumbles', 'Fill in the Blanks'],
    color: 'verbal',
    icon: '🟢',
    time: 20,
    questionCount: 15,
  },
  coding: {
    label: 'Coding',
    topics: ['Arrays', 'Strings', 'Sorting', 'Searching', 'Basic Logic'],
    color: 'coding',
    icon: '🔴',
    time: 30,
    questionCount: 2,
  },
};

export const questions: Question[] = [
  // APTITUDE
  { id: 'apt-1', section: 'aptitude', topic: 'Percentages', difficulty: 'easy', question: 'What is 15% of 200?', options: ['25', '30', '35', '40'], correctAnswer: 1, explanation: '15% of 200 = (15/100) × 200 = 30' },
  { id: 'apt-2', section: 'aptitude', topic: 'Percentages', difficulty: 'medium', question: 'A number is increased by 20% and then decreased by 20%. What is the net change?', options: ['No change', '4% decrease', '4% increase', '2% decrease'], correctAnswer: 1, explanation: 'Let x be the number. After increase: 1.2x. After decrease: 1.2x × 0.8 = 0.96x. Net change = 4% decrease.' },
  { id: 'apt-3', section: 'aptitude', topic: 'Profit & Loss', difficulty: 'easy', question: 'A shopkeeper buys an item for ₹500 and sells it for ₹600. What is the profit percentage?', options: ['10%', '15%', '20%', '25%'], correctAnswer: 2, explanation: 'Profit = 600-500 = 100. Profit% = (100/500)×100 = 20%' },
  { id: 'apt-4', section: 'aptitude', topic: 'Profit & Loss', difficulty: 'medium', question: 'By selling 33 meters of cloth, a trader gains the cost of 11 meters. What is his gain percent?', options: ['33.33%', '30%', '25%', '11%'], correctAnswer: 0, explanation: 'Gain = CP of 11m. So gain% = (11/33)×100 = 33.33%' },
  { id: 'apt-5', section: 'aptitude', topic: 'Time & Work', difficulty: 'easy', question: 'A can do a work in 10 days and B in 15 days. In how many days can they do it together?', options: ['5', '6', '7', '8'], correctAnswer: 1, explanation: 'Combined rate = 1/10 + 1/15 = 5/30 = 1/6. So 6 days.' },
  { id: 'apt-6', section: 'aptitude', topic: 'Time & Work', difficulty: 'hard', question: 'A and B can complete a work in 12 days. B and C in 15 days. C and A in 20 days. How long will all three take together?', options: ['8 days', '10 days', '12 days', '5 days'], correctAnswer: 1, explanation: '2(A+B+C) = 1/12+1/15+1/20 = 12/60 = 1/5. So A+B+C = 1/10. Answer: 10 days.' },
  { id: 'apt-7', section: 'aptitude', topic: 'Time Speed Distance', difficulty: 'easy', question: 'A car travels 240 km in 4 hours. What is its speed?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correctAnswer: 2, explanation: 'Speed = Distance/Time = 240/4 = 60 km/h' },
  { id: 'apt-8', section: 'aptitude', topic: 'Time Speed Distance', difficulty: 'medium', question: 'Two trains running in opposite directions cross each other in 10 seconds. Their speeds are 36 km/h and 54 km/h. Combined length?', options: ['200m', '250m', '300m', '150m'], correctAnswer: 1, explanation: 'Relative speed = 36+54 = 90 km/h = 25 m/s. Length = 25×10 = 250m' },
  { id: 'apt-9', section: 'aptitude', topic: 'Permutations & Combinations', difficulty: 'easy', question: 'In how many ways can 5 people be seated in a row?', options: ['60', '120', '24', '720'], correctAnswer: 1, explanation: '5! = 120' },
  { id: 'apt-10', section: 'aptitude', topic: 'Probability', difficulty: 'easy', question: 'What is the probability of getting a head when a fair coin is tossed?', options: ['1/4', '1/2', '1/3', '1'], correctAnswer: 1, explanation: 'Fair coin has 2 outcomes. P(head) = 1/2' },
  { id: 'apt-11', section: 'aptitude', topic: 'Probability', difficulty: 'medium', question: 'Two dice are thrown. What is the probability that the sum is 7?', options: ['1/6', '5/36', '1/9', '7/36'], correctAnswer: 0, explanation: 'Favorable: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6. Total = 36. P = 6/36 = 1/6' },
  { id: 'apt-12', section: 'aptitude', topic: 'Simple & Compound Interest', difficulty: 'easy', question: 'Find simple interest on ₹5000 at 10% for 2 years.', options: ['₹500', '₹1000', '₹1500', '₹750'], correctAnswer: 1, explanation: 'SI = PRT/100 = 5000×10×2/100 = ₹1000' },
  { id: 'apt-13', section: 'aptitude', topic: 'Simple & Compound Interest', difficulty: 'medium', question: 'The difference between CI and SI on ₹8000 for 2 years at 5% per annum is?', options: ['₹10', '₹15', '₹20', '₹25'], correctAnswer: 2, explanation: 'Diff = P(r/100)² = 8000×(5/100)² = 8000×0.0025 = ₹20' },
  { id: 'apt-14', section: 'aptitude', topic: 'Ratios & Averages', difficulty: 'easy', question: 'The average of 5 numbers is 20. What is their sum?', options: ['80', '90', '100', '110'], correctAnswer: 2, explanation: 'Sum = Average × Count = 20 × 5 = 100' },
  { id: 'apt-15', section: 'aptitude', topic: 'Ratios & Averages', difficulty: 'medium', question: 'If A:B = 2:3 and B:C = 4:5, find A:B:C', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], correctAnswer: 0, explanation: 'A:B = 2:3 = 8:12. B:C = 4:5 = 12:15. So A:B:C = 8:12:15' },
  { id: 'apt-16', section: 'aptitude', topic: 'Number System', difficulty: 'easy', question: 'What is the LCM of 12 and 18?', options: ['24', '36', '48', '72'], correctAnswer: 1, explanation: 'LCM(12,18) = 36' },
  { id: 'apt-17', section: 'aptitude', topic: 'Number System', difficulty: 'medium', question: 'The sum of two numbers is 45 and their difference is 15. Find the larger number.', options: ['25', '30', '35', '20'], correctAnswer: 1, explanation: 'x+y=45, x-y=15. 2x=60, x=30.' },
  { id: 'apt-18', section: 'aptitude', topic: 'Percentages', difficulty: 'hard', question: 'In an election, candidate A got 60% votes. If the total votes were 15000 and 20% were invalid, how many valid votes did A get?', options: ['7200', '7500', '8000', '9000'], correctAnswer: 0, explanation: 'Valid votes = 80% of 15000 = 12000. A got 60% of 12000 = 7200' },
  { id: 'apt-19', section: 'aptitude', topic: 'Permutations & Combinations', difficulty: 'medium', question: 'How many 3-digit numbers can be formed using digits 1,2,3,4,5 without repetition?', options: ['60', '120', '125', '80'], correctAnswer: 0, explanation: '5P3 = 5×4×3 = 60' },
  { id: 'apt-20', section: 'aptitude', topic: 'Time & Work', difficulty: 'medium', question: 'If 6 men can do a work in 12 days, how many men are needed to do it in 8 days?', options: ['8', '9', '10', '7'], correctAnswer: 1, explanation: '6×12 = M×8. M = 72/8 = 9' },

  // REASONING
  { id: 'reas-1', section: 'reasoning', topic: 'Coding-Decoding', difficulty: 'easy', question: 'If APPLE is coded as BQQMF, how is MANGO coded?', options: ['NBOHP', 'NBOHO', 'NBOHQ', 'NBNHP'], correctAnswer: 0, explanation: 'Each letter is replaced by the next letter. M→N, A→B, N→O, G→H, O→P' },
  { id: 'reas-2', section: 'reasoning', topic: 'Coding-Decoding', difficulty: 'medium', question: 'In a code language, COMPUTER is written as RFUVQNPD. How is MEDICINE written?', options: ['MFEJDJOF', 'EMDBIFJN', 'FMECJGJO', 'EMDCJGIO'], correctAnswer: 1, explanation: 'The word is reversed and each letter shifted by +1. MEDICINE → ENICDEM → shift → EMDBIFJN' },
  { id: 'reas-3', section: 'reasoning', topic: 'Blood Relations', difficulty: 'easy', question: 'Pointing to a man, a woman said "His mother is the only daughter of my mother." How is the woman related to the man?', options: ['Mother', 'Sister', 'Aunt', 'Grandmother'], correctAnswer: 0, explanation: 'Only daughter of my mother = herself. So woman is the man\'s mother.' },
  { id: 'reas-4', section: 'reasoning', topic: 'Blood Relations', difficulty: 'medium', question: 'A is B\'s sister. C is B\'s mother. D is C\'s father. E is D\'s mother. How is A related to D?', options: ['Granddaughter', 'Daughter', 'Grandmother', 'Grandfather'], correctAnswer: 0, explanation: 'A is B\'s sister. C is their mother. D is C\'s father. So A is D\'s granddaughter.' },
  { id: 'reas-5', section: 'reasoning', topic: 'Direction Sense', difficulty: 'easy', question: 'A man walks 5 km North, turns right and walks 3 km, turns right again and walks 5 km. Which direction is he facing?', options: ['North', 'South', 'East', 'West'], correctAnswer: 1, explanation: 'North → right → East → right → South. He is facing South.' },
  { id: 'reas-6', section: 'reasoning', topic: 'Direction Sense', difficulty: 'medium', question: 'Starting from point A, a person walks 10m North, turns left, walks 5m, turns left, walks 10m. How far is he from A?', options: ['5m', '10m', '15m', '0m'], correctAnswer: 0, explanation: 'He forms a U-shape. Net displacement is 5m West from A.' },
  { id: 'reas-7', section: 'reasoning', topic: 'Series', difficulty: 'easy', question: 'What comes next: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '36'], correctAnswer: 1, explanation: 'Differences: 4,6,8,10,12. Next = 30+12 = 42' },
  { id: 'reas-8', section: 'reasoning', topic: 'Series', difficulty: 'medium', question: 'Find the missing number: 3, 9, 27, 81, ?', options: ['162', '216', '243', '729'], correctAnswer: 2, explanation: 'Each number is multiplied by 3. 81×3 = 243' },
  { id: 'reas-9', section: 'reasoning', topic: 'Syllogisms', difficulty: 'easy', question: 'All dogs are animals. All animals are living beings. Which conclusion follows?', options: ['All dogs are living beings', 'All living beings are dogs', 'Some dogs are not animals', 'None follows'], correctAnswer: 0, explanation: 'By transitivity: All dogs are animals → all animals are living beings → all dogs are living beings.' },
  { id: 'reas-10', section: 'reasoning', topic: 'Syllogisms', difficulty: 'medium', question: 'Some cats are dogs. All dogs are birds. Which conclusion follows?', options: ['All cats are birds', 'Some cats are birds', 'No cat is a bird', 'All birds are cats'], correctAnswer: 1, explanation: 'Some cats are dogs + All dogs are birds → Some cats are birds.' },
  { id: 'reas-11', section: 'reasoning', topic: 'Puzzles', difficulty: 'medium', question: 'Five people A,B,C,D,E sit in a row. A sits next to B. C sits at an end. D does not sit next to E. Who sits in the middle?', options: ['A', 'B', 'C', 'D'], correctAnswer: 1, explanation: 'By constraints: C_A_B_ or similar arrangement. B sits in the middle.' },
  { id: 'reas-12', section: 'reasoning', topic: 'Coding-Decoding', difficulty: 'easy', question: 'If CAT = 24, DOG = 26, then BAT = ?', options: ['23', '24', '22', '25'], correctAnswer: 0, explanation: 'C=3,A=1,T=20 → 24. B=2,A=1,T=20 → 23' },
  { id: 'reas-13', section: 'reasoning', topic: 'Series', difficulty: 'hard', question: 'Find next: 1, 1, 2, 3, 5, 8, 13, ?', options: ['18', '20', '21', '26'], correctAnswer: 2, explanation: 'Fibonacci series. 8+13 = 21' },
  { id: 'reas-14', section: 'reasoning', topic: 'Direction Sense', difficulty: 'hard', question: 'A person walks 4km East, 3km North, 4km West, 7km South. Distance from start?', options: ['3km', '4km', '5km', '7km'], correctAnswer: 1, explanation: 'East-West cancel. Net South = 7-3 = 4km. Distance = 4km.' },
  { id: 'reas-15', section: 'reasoning', topic: 'Blood Relations', difficulty: 'hard', question: 'If X is the brother of Y, Y is the sister of Z, and Z is the father of W, how is X related to W?', options: ['Uncle', 'Father', 'Grandfather', 'Brother'], correctAnswer: 0, explanation: 'X is brother of Y. Y is sister of Z (so same generation). Z is father of W. X is uncle of W.' },

  // VERBAL
  { id: 'verb-1', section: 'verbal', topic: 'Synonyms/Antonyms', difficulty: 'easy', question: 'Choose the synonym of "Abundant":', options: ['Scarce', 'Plentiful', 'Limited', 'Meager'], correctAnswer: 1, explanation: 'Abundant means plentiful, in large quantity.' },
  { id: 'verb-2', section: 'verbal', topic: 'Synonyms/Antonyms', difficulty: 'easy', question: 'Choose the antonym of "Benevolent":', options: ['Kind', 'Generous', 'Malevolent', 'Friendly'], correctAnswer: 2, explanation: 'Benevolent means well-meaning. Malevolent means wishing harm.' },
  { id: 'verb-3', section: 'verbal', topic: 'Sentence Correction', difficulty: 'easy', question: 'Select the correct sentence:', options: ['He don\'t know nothing.', 'He doesn\'t know anything.', 'He don\'t know anything.', 'He doesn\'t knows anything.'], correctAnswer: 1, explanation: 'Correct subject-verb agreement and no double negative.' },
  { id: 'verb-4', section: 'verbal', topic: 'Sentence Correction', difficulty: 'medium', question: 'Choose the grammatically correct sentence:', options: ['Neither the boys nor the girl were present.', 'Neither the boys nor the girl was present.', 'Neither the boys nor the girl are present.', 'Neither the boys nor the girl have been present.'], correctAnswer: 1, explanation: 'With "neither...nor", the verb agrees with the nearest subject (girl → was).' },
  { id: 'verb-5', section: 'verbal', topic: 'Fill in the Blanks', difficulty: 'easy', question: 'The teacher was ___ with the student\'s performance.', options: ['impressed', 'impress', 'impressing', 'impressment'], correctAnswer: 0, explanation: '"Impressed" is the correct past participle used as an adjective.' },
  { id: 'verb-6', section: 'verbal', topic: 'Fill in the Blanks', difficulty: 'medium', question: 'The ___ of the evidence suggests that the defendant is guilty.', options: ['preponderance', 'lightness', 'absence', 'scarcity'], correctAnswer: 0, explanation: 'Preponderance means the greater weight or amount of evidence.' },
  { id: 'verb-7', section: 'verbal', topic: 'Reading Comprehension', difficulty: 'medium', question: 'Read: "The ozone layer protects Earth from UV radiation. Its depletion leads to increased skin cancer and crop damage." What does ozone depletion cause?', options: ['Better crops', 'More UV protection', 'Skin cancer and crop damage', 'Cooler temperatures'], correctAnswer: 2, explanation: 'The passage directly states depletion leads to skin cancer and crop damage.' },
  { id: 'verb-8', section: 'verbal', topic: 'Reading Comprehension', difficulty: 'medium', question: '"Artificial Intelligence has transformed industries from healthcare to finance. AI systems can analyze vast datasets faster than humans." What is the main idea?', options: ['AI is dangerous', 'AI transforms industries with data analysis', 'Finance is the main AI sector', 'Humans are obsolete'], correctAnswer: 1, explanation: 'The passage discusses AI transformation across industries through data analysis.' },
  { id: 'verb-9', section: 'verbal', topic: 'Para Jumbles', difficulty: 'medium', question: 'Arrange: (A) He went to the market. (B) He bought vegetables. (C) He cooked dinner. (D) He came home.', options: ['ABDC', 'ABCD', 'ADBC', 'BADC'], correctAnswer: 0, explanation: 'Logical order: went to market → bought vegetables → came home → cooked dinner' },
  { id: 'verb-10', section: 'verbal', topic: 'Synonyms/Antonyms', difficulty: 'medium', question: 'Choose the synonym of "Ephemeral":', options: ['Permanent', 'Transient', 'Eternal', 'Lasting'], correctAnswer: 1, explanation: 'Ephemeral means lasting for a very short time, i.e., transient.' },
  { id: 'verb-11', section: 'verbal', topic: 'Fill in the Blanks', difficulty: 'hard', question: 'The politician\'s speech was full of ___ but lacked substance.', options: ['rhetoric', 'silence', 'facts', 'statistics'], correctAnswer: 0, explanation: 'Rhetoric refers to persuasive but often empty language.' },
  { id: 'verb-12', section: 'verbal', topic: 'Sentence Correction', difficulty: 'hard', question: 'Choose the correct sentence:', options: ['The data shows a trend.', 'The data show a trend.', 'The datas show a trend.', 'The data is showing trends.'], correctAnswer: 1, explanation: '"Data" is technically plural (singular: datum), so "show" is correct.' },
  { id: 'verb-13', section: 'verbal', topic: 'Para Jumbles', difficulty: 'hard', question: 'Arrange: (A) The results were published. (B) The experiment was designed. (C) A hypothesis was formed. (D) Data was collected.', options: ['CBDA', 'ABCD', 'BCDA', 'CDBA'], correctAnswer: 0, explanation: 'Scientific method: hypothesis → design → collect data → publish results' },
  { id: 'verb-14', section: 'verbal', topic: 'Reading Comprehension', difficulty: 'easy', question: '"Water covers 71% of Earth\'s surface. Most of it is in oceans, which contain 97% of all water." What percentage of Earth is covered by water?', options: ['97%', '71%', '29%', '50%'], correctAnswer: 1, explanation: 'The passage states water covers 71% of Earth\'s surface.' },
  { id: 'verb-15', section: 'verbal', topic: 'Synonyms/Antonyms', difficulty: 'hard', question: 'Choose the antonym of "Loquacious":', options: ['Talkative', 'Garrulous', 'Taciturn', 'Verbose'], correctAnswer: 2, explanation: 'Loquacious means very talkative. Taciturn means reserved, not talkative.' },
];

export const codingQuestions: CodingQuestion[] = [
  {
    id: 'code-1',
    section: 'coding',
    topic: 'Arrays',
    difficulty: 'easy',
    question: 'Find the largest element in an array',
    description: 'Given an array of integers, find and return the largest element.',
    examples: [
      { input: '[3, 1, 4, 1, 5, 9, 2, 6]', output: '9' },
      { input: '[1, 2, 3]', output: '3' },
    ],
    testCases: [
      { input: '3 1 4 1 5 9 2 6', expectedOutput: '9' },
      { input: '1 2 3', expectedOutput: '3' },
      { input: '5', expectedOutput: '5' },
    ],
    starterCode: {
      python: `def find_largest(arr):\n    # Write your code here\n    pass\n\n# Read input\narr = list(map(int, input().split()))\nprint(find_largest(arr))`,
      java: `import java.util.*;\npublic class Main {\n    public static int findLargest(int[] arr) {\n        // Write your code here\n        return 0;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().split(" ");\n        int[] arr = new int[parts.length];\n        for(int i=0;i<parts.length;i++) arr[i]=Integer.parseInt(parts[i]);\n        System.out.println(findLargest(arr));\n    }\n}`,
      cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    int n; cin>>n;\n    // Write your code here\n    return 0;\n}`,
      c: `#include<stdio.h>\nint main(){\n    // Write your code here\n    return 0;\n}`,
    },
  },
  {
    id: 'code-2',
    section: 'coding',
    topic: 'Strings',
    difficulty: 'medium',
    question: 'Check if a string is a palindrome',
    description: 'Given a string, check whether it reads the same forwards and backwards (case-insensitive, ignoring spaces).',
    examples: [
      { input: 'racecar', output: 'Yes' },
      { input: 'hello', output: 'No' },
    ],
    testCases: [
      { input: 'racecar', expectedOutput: 'Yes' },
      { input: 'hello', expectedOutput: 'No' },
      { input: 'A man a plan a canal Panama', expectedOutput: 'Yes' },
    ],
    starterCode: {
      python: `def is_palindrome(s):\n    # Write your code here\n    pass\n\ns = input()\nprint("Yes" if is_palindrome(s) else "No")`,
      java: `import java.util.*;\npublic class Main {\n    public static boolean isPalindrome(String s) {\n        // Write your code here\n        return false;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        System.out.println(isPalindrome(s) ? "Yes" : "No");\n    }\n}`,
      cpp: `#include<bits/stdc++.h>\nusing namespace std;\nint main(){\n    string s;\n    getline(cin, s);\n    // Write your code here\n    return 0;\n}`,
      c: `#include<stdio.h>\n#include<string.h>\nint main(){\n    char s[1000];\n    gets(s);\n    // Write your code here\n    return 0;\n}`,
    },
  },
];

export function getQuestionsBySection(section: Section): Question[] {
  return questions.filter(q => q.section === section);
}

export function getQuestionsByTopic(topic: string): Question[] {
  return questions.filter(q => q.topic === topic);
}

export function getRandomQuestions(section: Section, count: number): Question[] {
  const sectionQs = getQuestionsBySection(section);
  const shuffled = [...sectionQs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getMockTestQuestions(): { aptitude: Question[]; reasoning: Question[]; verbal: Question[] } {
  return {
    aptitude: getRandomQuestions('aptitude', 20),
    reasoning: getRandomQuestions('reasoning', 15),
    verbal: getRandomQuestions('verbal', 15),
  };
}

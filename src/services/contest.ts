import { api } from './api';
import type { Event, TeamSelection, User } from '@/pages/Index';

interface ContestResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

interface SubmitTeamResponse {
  success: boolean;
  message?: string;
  entryId?: string;
}

interface LeaderboardEntry {
  rank: number;
  teamName: string;
  score: number;
  userId: string;
}

// Helper function to generate salaries based on rank
const generateSalary = (rank: number): number => {
  // Linear interpolation between $150,000 (rank 1) and $10,000 (rank 15)
  return Math.round((150000 - (rank - 1) * (140000 / 14)) / 1000) * 1000;
};

// Helper function to format salary as currency
const formatSalary = (salary?: number): string => {
  if (salary === undefined || salary === null) {
    return '$0';
  }
  return `$${salary.toLocaleString()}`;
};

// Export formatSalary for use in other components
export { formatSalary };

// Mock data for PRCA events and contestants
const mockEvents: Event[] = [
  {
    id: 'bareback',
    name: 'Bareback Riding',
    contestants: [
      { id: 'bb1', name: 'Keenan Hayes', rank: 1, winnings: '$45,280', salary: 150000 },
      { id: 'bb2', name: 'Leighton Berry', rank: 2, winnings: '$42,150', salary: 140000 },
      { id: 'bb3', name: 'Clayton Biglow', rank: 3, winnings: '$38,940', salary: 130000 },
      { id: 'bb4', name: 'Dean Thompson', rank: 4, winnings: '$35,720', salary: 120000 },
      { id: 'bb5', name: 'Rocker Steiner', rank: 5, winnings: '$32,580', salary: 110000 },
      { id: 'bb6', name: 'Tanner Aus', rank: 6, winnings: '$30,450', salary: 100000 },
      { id: 'bb7', name: 'Garrett Shadbolt', rank: 7, winnings: '$28,320', salary: 90000 },
      { id: 'bb8', name: 'RC Landingham', rank: 8, winnings: '$26,180', salary: 80000 },
      { id: 'bb9', name: 'Taylor Broussard', rank: 9, winnings: '$24,050', salary: 70000 },
      { id: 'bb10', name: 'Bradlee Miller', rank: 10, winnings: '$21,920', salary: 60000 },
      { id: 'bb11', name: 'Jacob Lees', rank: 11, winnings: '$19,780', salary: 50000 },
      { id: 'bb12', name: 'Clayton Biglow', rank: 12, winnings: '$17,650', salary: 40000 },
      { id: 'bb13', name: 'Cole Reiner', rank: 13, winnings: '$15,520', salary: 30000 },
      { id: 'bb14', name: 'Cole Franks', rank: 14, winnings: '$13,380', salary: 20000 },
      { id: 'bb15', name: 'Waylon Bourgeois', rank: 15, winnings: '$11,250', salary: 10000 },
    ]
  },
  {
    id: 'steer-wrestling',
    name: 'Steer Wrestling',
    contestants: [
      { id: 'sw1', name: 'Tyler Waguespack', rank: 1, winnings: '$48,320', salary: 150000 },
      { id: 'sw2', name: 'J.D. Struxness', rank: 2, winnings: '$44,180', salary: 140000 },
      { id: 'sw3', name: 'Will Lummus', rank: 3, winnings: '$40,960', salary: 130000 },
      { id: 'sw4', name: 'Jacob Talley', rank: 4, winnings: '$37,540', salary: 120000 },
      { id: 'sw5', name: 'Stetson Jorgensen', rank: 5, winnings: '$34,280', salary: 110000 },
      { id: 'sw6', name: 'Dakota Eldridge', rank: 6, winnings: '$31,150', salary: 100000 },
      { id: 'sw7', name: 'Stephen Culling', rank: 7, winnings: '$28,920', salary: 90000 },
      { id: 'sw8', name: 'Stan Branco', rank: 8, winnings: '$26,780', salary: 80000 },
      { id: 'sw9', name: 'Tanner Brunner', rank: 9, winnings: '$24,650', salary: 70000 },
      { id: 'sw10', name: 'Dalton Massey', rank: 10, winnings: '$22,520', salary: 60000 },
      { id: 'sw11', name: 'Tucker Allen', rank: 11, winnings: '$20,380', salary: 50000 },
      { id: 'sw12', name: 'Tyler Pearson', rank: 12, winnings: '$18,250', salary: 40000 },
      { id: 'sw13', name: 'Walt Arnold', rank: 13, winnings: '$16,120', salary: 30000 },
      { id: 'sw14', name: 'Jacob Elder', rank: 14, winnings: '$13,980', salary: 20000 },
      { id: 'sw15', name: 'Justin Shaffer', rank: 15, winnings: '$11,850', salary: 10000 },
    ]
  },
  {
    id: 'steer-roping',
    name: 'Steer Roping',
    contestants: [
      { id: 'str1', name: 'Cole Patterson', rank: 1, winnings: '$54,720', salary: 150000 },
      { id: 'str2', name: 'Shay Good', rank: 2, winnings: '$50,480', salary: 140000 },
      { id: 'str3', name: 'Scott Snedecor', rank: 3, winnings: '$46,840', salary: 130000 },
      { id: 'str4', name: 'Vin Fisher Jr', rank: 4, winnings: '$43,280', salary: 120000 },
      { id: 'str5', name: 'John Bland', rank: 5, winnings: '$39,960', salary: 110000 },
      { id: 'str6', name: 'Clay Long', rank: 6, winnings: '$36,830', salary: 100000 },
      { id: 'str7', name: 'Jess Tierney', rank: 7, winnings: '$34,700', salary: 90000 },
      { id: 'str8', name: 'Tom Feller', rank: 8, winnings: '$32,560', salary: 80000 },
      { id: 'str9', name: 'Cody Lee', rank: 9, winnings: '$30,430', salary: 70000 },
      { id: 'str10', name: 'Brodie Poppino', rank: 10, winnings: '$28,300', salary: 60000 },
      { id: 'str11', name: 'Billy Good', rank: 11, winnings: '$26,160', salary: 50000 },
      { id: 'str12', name: 'Logan Currie', rank: 12, winnings: '$24,030', salary: 40000 },
      { id: 'str13', name: 'Cooper Mills', rank: 13, winnings: '$21,900', salary: 30000 },
      { id: 'str14', name: 'Blake Deckard', rank: 14, winnings: '$19,760', salary: 20000 },
      { id: 'str15', name: 'Kyle Gaulhum', rank: 15, winnings: '$17,630', salary: 10000 },
    ]
  },
  {
    id: 'team-roping-header',
    name: 'Team Roping Headers',
    contestants: [
      { id: 'trh1', name: 'Dustin Egusquiza', rank: 1, winnings: '$52,480', salary: 150000 },
      { id: 'trh2', name: 'JC Yeahquo', rank: 2, winnings: '$48,920', salary: 140000 },
      { id: 'trh3', name: 'Clint Summers', rank: 3, winnings: '$45,160', salary: 130000 },
      { id: 'trh4', name: 'Luke Brown', rank: 4, winnings: '$41,580', salary: 120000 },
      { id: 'trh5', name: 'Andrew Ward', rank: 5, winnings: '$38,240', salary: 110000 },
      { id: 'trh6', name: 'Marcus Theriot', rank: 6, winnings: '$35,120', salary: 100000 },
      { id: 'trh7', name: 'Kaleb Driggers', rank: 7, winnings: '$32,890', salary: 90000 },
      { id: 'trh8', name: 'Clay Smith', rank: 8, winnings: '$30,750', salary: 80000 },
      { id: 'trh9', name: 'Brenten Hall', rank: 9, winnings: '$28,620', salary: 70000 },
      { id: 'trh10', name: 'Tyler Wade', rank: 10, winnings: '$26,490', salary: 60000 },
      { id: 'trh11', name: 'Jake Clay', rank: 11, winnings: '$24,350', salary: 50000 },
      { id: 'trh12', name: 'Marcus Theriot', rank: 12, winnings: '$22,220', salary: 40000 },
      { id: 'trh13', name: 'Cody Snow', rank: 13, winnings: '$20,090', salary: 30000 },
      { id: 'trh14', name: 'Chad Masters', rank: 14, winnings: '$17,950', salary: 20000 },
      { id: 'trh15', name: 'Luke Brown', rank: 15, winnings: '$15,820', salary: 10000 },
    ]
  },
  {
    id: 'team-roping-heeler',
    name: 'Team Roping Heelers',
    contestants: [
      { id: 'tre1', name: 'Buddy Hawkins II', rank: 1, winnings: '$52,480', salary: 150000 },
      { id: 'tre2', name: 'Levi Lord', rank: 2, winnings: '$48,920', salary: 140000 },
      { id: 'tre3', name: 'Jake Long', rank: 3, winnings: '$45,160', salary: 130000 },
      { id: 'tre4', name: 'Douglas Rich', rank: 4, winnings: '$41,580', salary: 120000 },
      { id: 'tre5', name: 'Coleby Payne', rank: 5, winnings: '$38,240', salary: 110000 },
      { id: 'tre6', name: 'Cole Curry', rank: 6, winnings: '$35,120', salary: 100000 },
      { id: 'tre7', name: 'Kaden Profili', rank: 7, winnings: '$32,890', salary: 90000 },
      { id: 'tre8', name: 'Wesley Thorp', rank: 8, winnings: '$30,750', salary: 80000 },
      { id: 'tre9', name: 'Junior Nogueira', rank: 9, winnings: '$28,620', salary: 70000 },
      { id: 'tre10', name: 'Trey Yates', rank: 10, winnings: '$26,490', salary: 60000 },
      { id: 'tre11', name: 'Hunter Koch', rank: 11, winnings: '$24,350', salary: 50000 },
      { id: 'tre12', name: 'Ross Ashford', rank: 12, winnings: '$22,220', salary: 40000 },
      { id: 'tre13', name: 'Wyatt Cox', rank: 13, winnings: '$20,090', salary: 30000 },
      { id: 'tre14', name: 'Cole Curry', rank: 14, winnings: '$17,950', salary: 20000 },
      { id: 'tre15', name: 'Tanner Braden', rank: 15, winnings: '$15,820', salary: 10000 },
    ]
  },
  {
    id: 'saddle-bronc',
    name: 'Saddle Bronc',
    contestants: [
      { id: 'sb1', name: 'Damian Brennan', rank: 1, winnings: '$46,780', salary: 150000 },
      { id: 'sb2', name: 'Lefty Holman', rank: 2, winnings: '$43,560', salary: 140000 },
      { id: 'sb3', name: 'Statler Wright', rank: 3, winnings: '$40,320', salary: 130000 },
      { id: 'sb4', name: 'Ryder Wright', rank: 4, winnings: '$37,180', salary: 120000 },
      { id: 'sb5', name: 'Wyatt Casper', rank: 5, winnings: '$34,940', salary: 110000 },
      { id: 'sb6', name: 'Sage Newman', rank: 6, winnings: '$32,810', salary: 100000 },
      { id: 'sb7', name: 'Logan Hay', rank: 7, winnings: '$30,680', salary: 90000 },
      { id: 'sb8', name: 'Kade Bruno', rank: 8, winnings: '$28,540', salary: 80000 },
      { id: 'sb9', name: 'Brody Cress', rank: 9, winnings: '$26,410', salary: 70000 },
      { id: 'sb10', name: 'Zeke Thurston', rank: 10, winnings: '$24,280', salary: 60000 },
      { id: 'sb11', name: 'Brody Cress', rank: 11, winnings: '$22,140', salary: 50000 },
      { id: 'sb12', name: 'Cole Elshere', rank: 12, winnings: '$20,010', salary: 40000 },
      { id: 'sb13', name: 'Brody Wells', rank: 13, winnings: '$17,880', salary: 30000 },
      { id: 'sb14', name: 'Logan Cook', rank: 14, winnings: '$15,740', salary: 20000 },
      { id: 'sb15', name: 'Dawson Hay', rank: 15, winnings: '$13,610', salary: 10000 },
    ]
  },
  {
    id: 'tie-down-roping',
    name: 'Tie Down Roping',
    contestants: [
      { id: 'tdr1', name: 'Shad Mayfield', rank: 1, winnings: '$49,640', salary: 150000 },
      { id: 'tdr2', name: 'Ty Harris', rank: 2, winnings: '$46,280', salary: 140000 },
      { id: 'tdr3', name: 'Riley Webb', rank: 3, winnings: '$42,980', salary: 130000 },
      { id: 'tdr4', name: 'John Douch', rank: 4, winnings: '$39,760', salary: 120000 },
      { id: 'tdr5', name: 'Marty Yates', rank: 5, winnings: '$36,540', salary: 110000 },
      { id: 'tdr6', name: 'Jase Harris', rank: 6, winnings: '$33,410', salary: 100000 },
      { id: 'tdr7', name: 'Tuf Cooper', rank: 7, winnings: '$31,280', salary: 90000 },
      { id: 'tdr8', name: 'Haven Meged', rank: 8, winnings: '$29,140', salary: 80000 },
      { id: 'tdr9', name: 'Brushton Minton', rank: 9, winnings: '$27,010', salary: 70000 },
      { id: 'tdr10', name: 'Chance Thiessen', rank: 10, winnings: '$24,880', salary: 60000 },
      { id: 'tdr11', name: 'Tom Crouse', rank: 11, winnings: '$22,740', salary: 50000 },
      { id: 'tdr12', name: 'Zack Jongbloed', rank: 12, winnings: '$20,610', salary: 40000 },
      { id: 'tdr13', name: 'Marcus Costa', rank: 13, winnings: '$18,480', salary: 30000 },
      { id: 'tdr14', name: 'Trevor Hale', rank: 14, winnings: '$16,340', salary: 20000 },
      { id: 'tdr15', name: 'Tyler Hancock', rank: 15, winnings: '$14,210', salary: 10000 },
    ]
  },
  {
    id: 'barrel-racing',
    name: 'Barrel Racing',
    contestants: [
      { id: 'bar1', name: 'Leslie Smalygo', rank: 1, winnings: '$51,280', salary: 150000 },
      { id: 'bar2', name: 'Wenda Johnson', rank: 2, winnings: '$47,940', salary: 140000 },
      { id: 'bar3', name: 'Sissy Winn', rank: 3, winnings: '$44,620', salary: 130000 },
      { id: 'bar4', name: 'Ashley Castleberry', rank: 4, winnings: '$41,380', salary: 120000 },
      { id: 'bar5', name: 'Sara Wiliams', rank: 5, winnings: '$38,160', salary: 110000 },
      { id: 'bar6', name: 'Kassie Mowry', rank: 6, winnings: '$35,030', salary: 100000 },
      { id: 'bar7', name: 'Shelley Morgan', rank: 7, winnings: '$32,900', salary: 90000 },
      { id: 'bar8', name: 'Lisa Lockhart', rank: 8, winnings: '$30,760', salary: 80000 },
      { id: 'bar9', name: 'Jimmie Smith', rank: 9, winnings: '$28,630', salary: 70000 },
      { id: 'bar10', name: 'Emily Beisel', rank: 10, winnings: '$26,500', salary: 60000 },
      { id: 'bar11', name: 'Stevi Hillman', rank: 11, winnings: '$24,360', salary: 50000 },
      { id: 'bar12', name: 'Halley Merced', rank: 12, winnings: '$22,230', salary: 40000 },
      { id: 'bar13', name: 'Tiany Schuster', rank: 13, winnings: '$20,100', salary: 30000 },
      { id: 'bar14', name: 'Maggie Magee Poloncic', rank: 14, winnings: '$17,960', salary: 20000 },
      { id: 'bar15', name: 'Dona Kay Rule', rank: 15, winnings: '$15,830', salary: 10000 },
    ]
  },
  {
    id: 'bull-riding',
    name: 'Bull Riding',
    contestants: [
      { id: 'bur1', name: 'Creek Young', rank: 1, winnings: '$54,720', salary: 150000 },
      { id: 'bur2', name: 'Clayton Sellars', rank: 2, winnings: '$50,480', salary: 140000 },
      { id: 'bur3', name: 'Hayes Weinert', rank: 3, winnings: '$46,840', salary: 130000 },
      { id: 'bur4', name: 'Josh Frost', rank: 4, winnings: '$43,280', salary: 120000 },
      { id: 'bur5', name: 'Roscoe Jarboe', rank: 5, winnings: '$39,960', salary: 110000 },
      { id: 'bur6', name: 'Chase Dougherty', rank: 6, winnings: '$36,830', salary: 100000 },
      { id: 'bur7', name: 'JR Stratford', rank: 7, winnings: '$34,700', salary: 90000 },
      { id: 'bur8', name: 'Tristan Hutchings', rank: 8, winnings: '$32,560', salary: 80000 },
      { id: 'bur9', name: 'Luke Gee', rank: 9, winnings: '$30,430', salary: 70000 },
      { id: 'bur10', name: 'Jake Lockwood', rank: 10, winnings: '$28,300', salary: 60000 },
      { id: 'bur11', name: 'Trey Kimzey', rank: 11, winnings: '$26,160', salary: 50000 },
      { id: 'bur12', name: 'Trey Holston', rank: 12, winnings: '$24,030', salary: 40000 },
      { id: 'bur13', name: 'Dustin Boquet', rank: 13, winnings: '$21,900', salary: 30000 },
      { id: 'bur14', name: 'TJ Gray', rank: 14, winnings: '$19,760', salary: 20000 },
      { id: 'bur15', name: 'Brady Portenier', rank: 15, winnings: '$17,630', salary: 10000 },
    ]
  },
  {
    id: 'breakaway-roping',
    name: 'Breakaway Roping',
    contestants: [
      { id: 'br1', name: 'Jackie Crawford', rank: 1, winnings: '$49,640', salary: 150000 },
      { id: 'br2', name: 'Jordi Edens', rank: 2, winnings: '$46,280', salary: 140000 },
      { id: 'br3', name: 'Taylor Munsell', rank: 3, winnings: '$42,980', salary: 130000 },
      { id: 'br4', name: 'Shelby Boisjoli-Mcgee', rank: 4, winnings: '$39,760', salary: 120000 },
      { id: 'br5', name: 'Lari Dee Guy', rank: 5, winnings: '$36,540', salary: 110000 },
      { id: 'br6', name: 'Rickie Fanning', rank: 6, winnings: '$33,410', salary: 100000 },
      { id: 'br7', name: 'Joey Young', rank: 7, winnings: '$31,280', salary: 90000 },
      { id: 'br8', name: 'Jordan Fabrizio', rank: 8, winnings: '$29,140', salary: 80000 },
      { id: 'br9', name: 'Martha Angelone', rank: 9, winnings: '$27,010', salary: 70000 },
      { id: 'br10', name: 'Maddy Deerman', rank: 10, winnings: '$24,880', salary: 60000 },
      { id: 'br11', name: 'Halie Forre', rank: 11, winnings: '$22,740', salary: 50000 },
      { id: 'br12', name: 'Beau Good', rank: 12, winnings: '$20,610', salary: 40000 },
      { id: 'br13', name: 'Willow Wilson', rank: 13, winnings: '$18,480', salary: 30000 },
      { id: 'br14', name: 'Rylee A George', rank: 14, winnings: '$16,340', salary: 20000 },
      { id: 'br15', name: 'Hali Williams', rank: 15, winnings: '$14,210', salary: 10000 },
    ]
  }
];

// Log the event IDs to make sure they're all unique
console.log("Event IDs:", mockEvents.map(event => event.id));

// Active contest data
const christmasInJulyContest = {
  id: 'christmas-in-july-2024',
  name: 'Christmas in July',
  entryFee: 19.95,
  startDate: new Date(2024, 6, 1), // July 1, 2024
  endDate: new Date(2024, 6, 31),  // July 31, 2024
  salaryCap: 800000, // $800,000 salary cap
  prizes: [
    { place: 1, description: '2024 Ram 1500', value: 55000 },
    { place: 2, description: 'Cash', value: 15000 },
    { place: 3, description: 'Cash', value: 10000 },
    { place: '4-20', description: 'Cash Pool', value: 35000 }
  ]
};

// Mock leaderboard data
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, teamName: 'Rodeo Kings', score: 1250, userId: 'user1' },
  { rank: 2, teamName: 'Bucking Broncos', score: 1175, userId: 'user2' },
  { rank: 3, teamName: 'Lasso Legends', score: 1120, userId: 'user3' },
  { rank: 4, teamName: 'Wrangler Warriors', score: 1050, userId: 'user4' },
  { rank: 5, teamName: 'Bull Riders', score: 980, userId: 'user5' },
  { rank: 6, teamName: 'Rope Masters', score: 910, userId: 'user6' },
  { rank: 7, teamName: 'Rodeo Rebels', score: 875, userId: 'user7' },
  { rank: 8, teamName: 'Cowboys Club', score: 825, userId: 'user8' },
  { rank: 9, teamName: 'Barrel Racers', score: 780, userId: 'user9' },
  { rank: 10, teamName: 'Steer Wrestlers', score: 730, userId: 'user10' },
];

// API functions
const getEvents = async (): Promise<Event[]> => {
  // In a real implementation, this would be an API call
  console.log("getEvents called, returning mockEvents:", mockEvents);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockEvents);
    }, 300);
  });
};

const getActiveContests = async () => {
  // In a real implementation, this would be an API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(christmasInJulyContest);
    }, 200);
  });
};

const submitTeamSelection = async (
  contestId: string,
  userId: string,
  teamName: string,
  selections: TeamSelection[]
) => {
  // In a real implementation, this would be an API call
  return new Promise<{ success: boolean; teamId: string }>(resolve => {
    setTimeout(() => {
      // Mock submission logic
      const allEventsSelected = selections.length === mockEvents.length;
      if (allEventsSelected) {
        resolve({ success: true, teamId: `team-${Date.now()}` });
      } else {
        throw new Error('Must select one contestant for each event');
      }
    }, 500);
  });
};

const getLeaderboard = async (contestId: string) => {
  // In a real implementation, this would fetch real leaderboard data
  return new Promise<Array<{ rank: number; teamName: string; score: number }>>(resolve => {
    setTimeout(() => {
      // Generate some mock leaderboard data
      const leaderboard = Array.from({ length: 10 }, (_, i) => ({
        rank: i + 1,
        teamName: `Team ${['Buckin', 'Wranglers', 'Rodeo Kings', 'Cowboys', 'Bulls', 'Broncs', 
                           'Lassos', 'Spurs', 'Saddles', 'Boots'][i]}`,
        score: Math.floor(Math.random() * 500) + 500
      }));
      
      // Sort by score (highest first)
      leaderboard.sort((a, b) => b.score - a.score);
      
      // Reassign ranks after sorting
      leaderboard.forEach((entry, idx) => {
        entry.rank = idx + 1;
      });
      
      resolve(leaderboard);
    }, 400);
  });
};

const contestService = {
  getEvents,
  getActiveContests,
  submitTeamSelection,
  getLeaderboard,
  formatSalary
};

export default contestService; 
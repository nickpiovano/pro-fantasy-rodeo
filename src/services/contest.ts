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

// Mock data for PRCA events and contestants
const mockEvents: Event[] = [
  {
    id: 'bareback',
    name: 'Bareback Riding',
    contestants: [
      { id: 'bb1', name: 'Kaycee Feild', rank: 1, winnings: '$45,280' },
      { id: 'bb2', name: 'Richmond Champion', rank: 2, winnings: '$42,150' },
      { id: 'bb3', name: 'Cole Reiner', rank: 3, winnings: '$38,940' },
      { id: 'bb4', name: 'Mason Clements', rank: 4, winnings: '$35,720' },
      { id: 'bb5', name: 'Tilden Hooper', rank: 5, winnings: '$32,580' },
    ]
  },
  {
    id: 'steer-wrestling',
    name: 'Steer Wrestling',
    contestants: [
      { id: 'sw1', name: 'Tyler Waguespack', rank: 1, winnings: '$48,320' },
      { id: 'sw2', name: 'Jesse Brown', rank: 2, winnings: '$44,180' },
      { id: 'sw3', name: 'Dakota Eldridge', rank: 3, winnings: '$40,960' },
      { id: 'sw4', name: 'Stetson Jorgensen', rank: 4, winnings: '$37,540' },
      { id: 'sw5', name: 'Jacob Talley', rank: 5, winnings: '$34,280' },
    ]
  },
  {
    id: 'team-roping-header',
    name: 'Team Roping (Header)',
    contestants: [
      { id: 'trh1', name: 'Kaleb Driggers', rank: 1, winnings: '$52,480' },
      { id: 'trh2', name: 'Clay Smith', rank: 2, winnings: '$48,920' },
      { id: 'trh3', name: 'Erich Rogers', rank: 3, winnings: '$45,160' },
      { id: 'trh4', name: 'Luke Brown', rank: 4, winnings: '$41,580' },
      { id: 'trh5', name: 'Chad Masters', rank: 5, winnings: '$38,240' },
    ]
  },
  {
    id: 'team-roping-heeler',
    name: 'Team Roping (Heeler)',
    contestants: [
      { id: 'tre1', name: 'Junior Nogueira', rank: 1, winnings: '$52,480' },
      { id: 'tre2', name: 'Jade Corkill', rank: 2, winnings: '$48,920' },
      { id: 'tre3', name: 'Paden Bray', rank: 3, winnings: '$45,160' },
      { id: 'tre4', name: 'Hunter Koch', rank: 4, winnings: '$41,580' },
      { id: 'tre5', name: 'Wesley Thorp', rank: 5, winnings: '$38,240' },
    ]
  },
  {
    id: 'saddle-bronc',
    name: 'Saddle Bronc Riding',
    contestants: [
      { id: 'sb1', name: 'Sage Newman', rank: 1, winnings: '$46,780' },
      { id: 'sb2', name: 'Stetson Dell Wright', rank: 2, winnings: '$43,560' },
      { id: 'sb3', name: 'Ryder Wright', rank: 3, winnings: '$40,320' },
      { id: 'sb4', name: 'Brody Cress', rank: 4, winnings: '$37,180' },
      { id: 'sb5', name: 'Zeke Thurston', rank: 5, winnings: '$34,940' },
    ]
  },
  {
    id: 'tie-down-roping',
    name: 'Tie-Down Roping',
    contestants: [
      { id: 'tdr1', name: 'Shad Mayfield', rank: 1, winnings: '$49,640' },
      { id: 'tdr2', name: 'Caleb Smidt', rank: 2, winnings: '$46,280' },
      { id: 'tdr3', name: 'Haven Meged', rank: 3, winnings: '$42,980' },
      { id: 'tdr4', name: 'Tuf Case Cooper', rank: 4, winnings: '$39,760' },
      { id: 'tdr5', name: 'Marty Yates', rank: 5, winnings: '$36,540' },
    ]
  },
  {
    id: 'barrel-racing',
    name: 'Barrel Racing',
    contestants: [
      { id: 'br1', name: 'Hailey Kinsel', rank: 1, winnings: '$51,280' },
      { id: 'br2', name: 'Jordon Briggs', rank: 2, winnings: '$47,940' },
      { id: 'br3', name: 'Kassie Mowry', rank: 3, winnings: '$44,620' },
      { id: 'br4', name: 'Emily Beisel', rank: 4, winnings: '$41,380' },
      { id: 'br5', name: 'Shelley Morgan', rank: 5, winnings: '$38,160' },
    ]
  },
  {
    id: 'bull-riding',
    name: 'Bull Riding',
    contestants: [
      { id: 'bur1', name: 'Sage Kimzey', rank: 1, winnings: '$54,720' },
      { id: 'bur2', name: 'Josh Frost', rank: 2, winnings: '$50,480' },
      { id: 'bur3', name: 'Stetson Dell Wright', rank: 3, winnings: '$46,840' },
      { id: 'bur4', name: 'Creek Young', rank: 4, winnings: '$43,280' },
      { id: 'bur5', name: 'Parker Breding', rank: 5, winnings: '$39,960' },
    ]
  }
];

// Active contest data
const christmasInJulyContest = {
  id: 'christmas-in-july-2024',
  name: 'Christmas in July',
  entryFee: 19.95,
  startDate: new Date(2024, 6, 1), // July 1, 2024
  endDate: new Date(2024, 6, 31),  // July 31, 2024
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
  getLeaderboard
};

export default contestService; 
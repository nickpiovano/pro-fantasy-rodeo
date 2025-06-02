import { api } from './api';
import { Event, TeamSelection, User } from '@/pages/Index';

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

// Mock data for the contest (remove this when connecting to a real API)
const MOCK_EVENTS: Event[] = [
  {
    id: 'event1',
    name: 'Bareback Riding',
    contestants: [
      { id: 'cont1', name: 'Tanner Aus', rank: 1 },
      { id: 'cont2', name: 'Tim O\'Connell', rank: 2 },
      { id: 'cont3', name: 'Clayton Biglow', rank: 3 },
      { id: 'cont4', name: 'Kaycee Feild', rank: 4 },
      { id: 'cont5', name: 'Caleb Bennett', rank: 5 },
    ]
  },
  {
    id: 'event2',
    name: 'Steer Wrestling',
    contestants: [
      { id: 'cont6', name: 'Tyler Waguespack', rank: 1 },
      { id: 'cont7', name: 'Jacob Talley', rank: 2 },
      { id: 'cont8', name: 'Will Lummus', rank: 3 },
      { id: 'cont9', name: 'Jesse Brown', rank: 4 },
      { id: 'cont10', name: 'Dakota Eldridge', rank: 5 },
    ]
  },
  {
    id: 'event3',
    name: 'Team Roping',
    contestants: [
      { id: 'cont11', name: 'Kaleb Driggers / Junior Nogueira', rank: 1 },
      { id: 'cont12', name: 'Clay Smith / Jade Corkill', rank: 2 },
      { id: 'cont13', name: 'Andrew Ward / Buddy Hawkins', rank: 3 },
      { id: 'cont14', name: 'Rhen Richard / Jeremy Buhler', rank: 4 },
      { id: 'cont15', name: 'Cody Snow / Wesley Thorp', rank: 5 },
    ]
  },
  {
    id: 'event4',
    name: 'Saddle Bronc Riding',
    contestants: [
      { id: 'cont16', name: 'Ryder Wright', rank: 1 },
      { id: 'cont17', name: 'Zeke Thurston', rank: 2 },
      { id: 'cont18', name: 'Wyatt Casper', rank: 3 },
      { id: 'cont19', name: 'Brody Cress', rank: 4 },
      { id: 'cont20', name: 'Allen Boore', rank: 5 },
    ]
  },
  {
    id: 'event5',
    name: 'Tie-Down Roping',
    contestants: [
      { id: 'cont21', name: 'Shad Mayfield', rank: 1 },
      { id: 'cont22', name: 'Marty Yates', rank: 2 },
      { id: 'cont23', name: 'Shane Hanchey', rank: 3 },
      { id: 'cont24', name: 'Tuf Cooper', rank: 4 },
      { id: 'cont25', name: 'Ryan Jarrett', rank: 5 },
    ]
  },
  {
    id: 'event6',
    name: 'Barrel Racing',
    contestants: [
      { id: 'cont26', name: 'Hailey Kinsel', rank: 1 },
      { id: 'cont27', name: 'Dona Kay Rule', rank: 2 },
      { id: 'cont28', name: 'Brittany Pozzi Tonozzi', rank: 3 },
      { id: 'cont29', name: 'Emily Miller', rank: 4 },
      { id: 'cont30', name: 'Stevi Hillman', rank: 5 },
    ]
  },
  {
    id: 'event7',
    name: 'Bull Riding',
    contestants: [
      { id: 'cont31', name: 'Sage Kimzey', rank: 1 },
      { id: 'cont32', name: 'Ky Hamilton', rank: 2 },
      { id: 'cont33', name: 'Colten Fritzlan', rank: 3 },
      { id: 'cont34', name: 'Parker McCown', rank: 4 },
      { id: 'cont35', name: 'Dustin Boquet', rank: 5 },
    ]
  }
];

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

/**
 * Contest service for handling contest data and submissions
 */
export const contestService = {
  /**
   * Get all contest events with contestants
   */
  async getEvents(): Promise<Event[]> {
    try {
      // For MVP, we're using mock data
      // In a production app, you would fetch from an API
      
      // Uncomment this for real API integration:
      // return await api.get<Event[]>('/contests/events');
      
      return MOCK_EVENTS;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return [];
    }
  },

  /**
   * Submit a team for the contest
   */
  async submitTeam(user: User, selections: TeamSelection[]): Promise<SubmitTeamResponse> {
    try {
      // For MVP, we're simulating a successful submission
      // In a production app, you would send this to an API
      
      // Uncomment this for real API integration:
      // return await api.post<SubmitTeamResponse>('/contests/submit', { user, selections });
      
      // Ensure all events are selected
      if (selections.length < MOCK_EVENTS.length) {
        return {
          success: false,
          message: `You must select a contestant for all ${MOCK_EVENTS.length} events.`
        };
      }
      
      // Simulate successful submission
      return {
        success: true,
        message: 'Team submitted successfully!',
        entryId: `entry-${Date.now()}`
      };
    } catch (error) {
      console.error('Team submission failed:', error);
      return {
        success: false,
        message: 'Failed to submit team. Please try again.'
      };
    }
  },

  /**
   * Get leaderboard data
   */
  async getLeaderboard(userTeamName?: string): Promise<{ leaderboard: LeaderboardEntry[]; userRank?: number }> {
    try {
      // For MVP, we're using mock data
      // In a production app, you would fetch from an API
      
      // Uncomment this for real API integration:
      // return await api.get<{ leaderboard: LeaderboardEntry[]; userRank?: number }>('/contests/leaderboard');
      
      // Find user rank if team name provided
      let userRank;
      if (userTeamName) {
        const userTeam = MOCK_LEADERBOARD.find(team => team.teamName === userTeamName);
        userRank = userTeam?.rank;
      }
      
      return {
        leaderboard: MOCK_LEADERBOARD,
        userRank
      };
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      return {
        leaderboard: []
      };
    }
  }
}; 
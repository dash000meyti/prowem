import type { FanFollowState, Mission } from "@/types";

export const missions: Mission[] = [
  {
    id: "mis-watch-opener",
    title: "Watch Matchday openers",
    description: "Tune into any Bundesliga Matchday fixture in the opening weekend.",
    xp: 250,
    category: "watch",
    eventId: "evt-bundesliga",
    completed: true,
  },
  {
    id: "mis-predict-md",
    title: "Predict a Matchday result",
    description: "Lock in a winner before kickoff on any Matchday 10–12 fixture.",
    xp: 400,
    category: "predict",
    eventId: "evt-bundesliga",
    completed: true,
  },
  {
    id: "mis-quiz-bundesliga",
    title: "Bundesliga knowledge quiz",
    description: "Score at least 4/5 on the league history quiz.",
    xp: 300,
    category: "quiz",
    eventId: "evt-bundesliga",
    completed: true,
  },
  {
    id: "mis-check-in-arena",
    title: "Check in at the Allianz",
    description: "Confirm attendance near Allianz Arena on Klassiker matchday.",
    xp: 500,
    category: "attend",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    teamId: "team-bayern-fc",
    completed: true,
  },
  {
    id: "mis-watch-klassiker",
    title: "Stay with Der Klassiker",
    description: "Watch at least 60 live minutes of Bayern vs Dortmund.",
    xp: 600,
    category: "watch",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    teamId: "team-bayern-fc",
    rewardLabel: "Klassiker badge",
    completed: false,
  },
  {
    id: "mis-predict-klassiker",
    title: "Call the Klassiker",
    description: "Predict the final result of Bayern vs Dortmund before the 80th minute.",
    xp: 750,
    category: "predict",
    eventId: "evt-bundesliga",
    clubId: "club-dortmund",
    teamId: "team-dortmund-fc",
    completed: false,
  },
  {
    id: "mis-sponsor-telekom",
    title: "Telekom live challenge",
    description:
      "Complete the partner challenge: react to three live goal moments during Der Klassiker.",
    xp: 1000,
    category: "sponsor",
    eventId: "evt-bundesliga",
    sponsorId: "spn-telekom",
    rewardLabel: "Connectivity Boost XP ×1.2",
    completed: false,
  },
  {
    id: "mis-share-klassiker",
    title: "Share Der Klassiker",
    description: "Share a live moment from Bayern vs Dortmund to your fan feed.",
    xp: 350,
    category: "social",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    completed: false,
  },
  {
    id: "mis-quiz-multi",
    title: "Know your multi-sport club",
    description: "Answer questions covering football, socca and Dota 2 under Bayern.",
    xp: 400,
    category: "quiz",
    clubId: "club-bayern",
    completed: false,
  },
  {
    id: "mis-socca-watch",
    title: "Cage night watch",
    description: "Watch a Socca Austria Pro League fixture featuring Lorient or Werder.",
    xp: 450,
    category: "watch",
    eventId: "evt-socca-austria-pro",
    clubId: "club-lorient",
    completed: false,
  },
  {
    id: "mis-ti-highlight",
    title: "TI series highlight",
    description: "Open the Bayern vs Dortmund TI upper-bracket series recap.",
    xp: 550,
    category: "watch",
    eventId: "evt-the-international",
    clubId: "club-bayern",
    teamId: "team-bayern-dota2",
    completed: false,
  },
  {
    id: "mis-adidas-kit",
    title: "adidas kit scan",
    description: "Scan an adidas activation code at a Bundesliga partner booth.",
    xp: 450,
    category: "sponsor",
    eventId: "evt-bundesliga",
    sponsorId: "spn-adidas",
    rewardLabel: "Kit discount token",
    completed: false,
  },
];

export function getMissionById(id: string) {
  return missions.find((m) => m.id === id);
}

export function getMissionsByCategory(category: Mission["category"]) {
  return missions.filter((m) => m.category === category);
}

export function getMissionsByEventId(eventId: string) {
  return missions.filter((m) => m.eventId === eventId);
}

function missionMatchesFollows(mission: Mission, follows: FanFollowState) {
  if (
    mission.clubId &&
    follows.followedClubIds.includes(mission.clubId)
  ) {
    return true;
  }
  if (
    mission.teamId &&
    follows.followedTeamIds.includes(mission.teamId)
  ) {
    return true;
  }
  if (
    mission.eventId &&
    follows.followedEventIds.includes(mission.eventId)
  ) {
    return true;
  }
  if (
    mission.playerId &&
    follows.favoritePlayerIds.includes(mission.playerId)
  ) {
    return true;
  }
  return false;
}

export function getMissionsForFan(follows: FanFollowState) {
  const forYou = missions.filter((m) => missionMatchesFollows(m, follows));
  const forYouIds = new Set(forYou.map((m) => m.id));
  const discover = missions.filter((m) => !forYouIds.has(m.id));
  return { forYou, discover, all: missions };
}

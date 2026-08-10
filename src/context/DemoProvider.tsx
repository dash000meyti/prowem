"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getFeaturedMatch,
  getMissionsForFan,
  getPrimaryFan,
  getRewardById,
  missions as allMissions,
} from "@/data";
import {
  LIVE_GOAL_EVENT_ID,
  LIVE_GOAL_XP,
  LIVE_STANDINGS_BASE,
  MOTM_AFTER_GOAL,
  MOTM_BASE,
  applyGoalToStandings,
} from "@/data/live-match-demo";
import type {
  FanFollowState,
  Match,
  MatchEventItem,
  Mission,
  PlayerOfTheMatchStats,
  StandingRow,
} from "@/types";

interface SocialPost {
  id: string;
  headline: string;
  body: string;
  scoreLine: string;
  minute: number;
  platform: "X" | "Instagram" | "Facebook";
}

interface DemoNotification {
  id: string;
  title: string;
  body: string;
}

interface DemoState {
  match: Match;
  fanXp: number;
  fanLevel: number;
  fanStatus: string;
  fanName: string;
  fanCity: string;
  completedMissionIds: string[];
  redeemedRewardIds: string[];
  followedClubIds: string[];
  followedTeamIds: string[];
  followedEventIds: string[];
  favoritePlayerIds: string[];
  socialPosts: SocialPost[];
  notifications: DemoNotification[];
  goalTriggered: boolean;
  lastUnlockedAchievement?: string;
  automationSteps: string[];
  liveStandings: StandingRow[];
  playerOfTheMatch: PlayerOfTheMatchStats;
}

interface DemoContextValue extends DemoState {
  toggleGoal: () => void;
  /** @deprecated use toggleGoal */
  triggerGoal: () => void;
  completeMission: (missionId: string) => void;
  redeemReward: (rewardId: string) => boolean;
  toggleFollowClub: (clubId: string, label?: string) => void;
  toggleFollowTeam: (teamId: string, label?: string) => void;
  toggleFollowEvent: (eventId: string, label?: string) => void;
  toggleFavoritePlayer: (playerId: string, label?: string) => void;
  isFollowingClub: (clubId: string) => boolean;
  isFollowingTeam: (teamId: string) => boolean;
  isFollowingEvent: (eventId: string) => boolean;
  isFavoritePlayer: (playerId: string) => boolean;
  follows: FanFollowState;
  missions: Mission[];
  missionsGlobal: Mission[];
  missionsForYou: Mission[];
  missionsDiscover: Mission[];
  xpToNext: number;
}

const DemoContext = createContext<DemoContextValue | null>(null);

const AUTOMATION = [
  "Update Score",
  "Update Table",
  "Update Player Stats",
  "Create Social Post",
  "Generate Graphic",
  "Create Video Timestamp",
  "Notify Fans",
];

const GOAL_SOCIAL_ID = "social-live-goal";

function toggleId(list: string[], id: string) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

function cloneMatch(match: Match): Match {
  return {
    ...match,
    events: match.events.map((e) => ({ ...e })),
    footballStats: match.footballStats
      ? {
          possession: [...match.footballStats.possession],
          shots: [...match.footballStats.shots],
          shotsOnTarget: [...match.footballStats.shotsOnTarget],
          corners: [...match.footballStats.corners],
          fouls: [...match.footballStats.fouls],
          passAccuracy: [...match.footballStats.passAccuracy],
        }
      : undefined,
    homeLineupIds: [...match.homeLineupIds],
    awayLineupIds: [...match.awayLineupIds],
    highlightIds: [...match.highlightIds],
    newsIds: [...match.newsIds],
    videoIds: [...match.videoIds],
  };
}

function applyGoalToMatch(prev: Match): Match {
  const goalEvent: MatchEventItem = {
    id: LIVE_GOAL_EVENT_ID,
    minute: 72,
    type: "goal",
    teamId: "team-bayern-fc",
    playerId: "player-kane",
    playerName: "Harry Kane",
    detail: "Clinical finish inside the box",
    period: "2H",
  };

  const footballStats = prev.footballStats
    ? {
        ...prev.footballStats,
        shots: [prev.footballStats.shots[0] + 1, prev.footballStats.shots[1]] as [
          number,
          number,
        ],
        shotsOnTarget: [
          prev.footballStats.shotsOnTarget[0] + 1,
          prev.footballStats.shotsOnTarget[1],
        ] as [number, number],
        possession: [
          Math.min(99, prev.footballStats.possession[0] + 1),
          Math.max(1, prev.footballStats.possession[1] - 1),
        ] as [number, number],
      }
    : undefined;

  return {
    ...prev,
    homeScore: prev.homeScore + 1,
    minute: 72,
    events: [...prev.events.filter((e) => e.id !== LIVE_GOAL_EVENT_ID), goalEvent],
    footballStats,
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const baseMatch = getFeaturedMatch();
  const baseFan = getPrimaryFan();
  const matchSnapshot = useRef(cloneMatch(baseMatch));
  const standingsSnapshot = useRef(
    LIVE_STANDINGS_BASE.map((row) => ({ ...row })),
  );
  const xpSnapshot = useRef(baseFan.xp);

  const [match, setMatch] = useState<Match>(() => cloneMatch(baseMatch));
  const [fanXp, setFanXp] = useState(baseFan.xp);
  const [fanLevel] = useState(baseFan.level);
  const [fanStatus] = useState(baseFan.status);
  const [fanName] = useState(baseFan.name);
  const [fanCity] = useState(baseFan.city);
  const [completedMissionIds, setCompleted] = useState(
    baseFan.completedMissionIds,
  );
  const [redeemedRewardIds, setRedeemed] = useState<string[]>([]);
  const [followedClubIds, setFollowedClubs] = useState(baseFan.followedClubIds);
  const [followedTeamIds, setFollowedTeams] = useState(baseFan.followedTeamIds);
  const [followedEventIds, setFollowedEvents] = useState(
    baseFan.followedEventIds,
  );
  const [favoritePlayerIds, setFavoritePlayers] = useState(
    baseFan.favoritePlayerIds,
  );
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [notifications, setNotifications] = useState<DemoNotification[]>([]);
  const [goalTriggered, setGoalTriggered] = useState(false);
  const [lastUnlockedAchievement, setAchievement] = useState<string>();
  const [automationSteps, setAutomation] = useState<string[]>([]);
  const [liveStandings, setLiveStandings] = useState<StandingRow[]>(() =>
    LIVE_STANDINGS_BASE.map((row) => ({ ...row })),
  );
  const [playerOfTheMatch, setPlayerOfTheMatch] =
    useState<PlayerOfTheMatchStats>(MOTM_BASE);

  const pushNotify = useCallback((title: string, body: string) => {
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title,
        body,
      },
      ...prev,
    ]);
  }, []);

  const toggleGoal = useCallback(() => {
    if (goalTriggered) {
      setMatch(cloneMatch(matchSnapshot.current));
      setLiveStandings(standingsSnapshot.current.map((row) => ({ ...row })));
      setPlayerOfTheMatch({ ...MOTM_BASE });
      setSocialPosts((prev) => prev.filter((p) => p.id !== GOAL_SOCIAL_ID));
      setFanXp(xpSnapshot.current);
      setAutomation([]);
      setGoalTriggered(false);
      setAchievement(undefined);
      setNotifications((prev) => [
        {
          id: `n-${Date.now()}-undo`,
          title: "Goal reversed",
          body: "Live data rolled back — score, table, stats and social draft restored.",
        },
        ...prev,
      ]);
      return;
    }

    xpSnapshot.current = fanXp;
    matchSnapshot.current = cloneMatch(match);
    standingsSnapshot.current = liveStandings.map((row) => ({ ...row }));

    setMatch((prev) => applyGoalToMatch(prev));
    setLiveStandings((prev) => applyGoalToStandings(prev));
    setPlayerOfTheMatch({ ...MOTM_AFTER_GOAL });
    setSocialPosts((prev) => [
      {
        id: GOAL_SOCIAL_ID,
        headline: "GOAL!",
        body: "Harry Kane makes it three — Bayern extend the lead in Der Klassiker.",
        scoreLine: "Bayern Munich 3–1 Borussia Dortmund",
        minute: 72,
        platform: "X",
      },
      ...prev.filter((p) => p.id !== GOAL_SOCIAL_ID),
    ]);
    pushNotify(
      "Match alert",
      "GOAL — Harry Kane scores. +150 XP for live watchers.",
    );
    setFanXp((xp) => xp + LIVE_GOAL_XP);
    setAutomation(AUTOMATION);
    setGoalTriggered(true);
    setAchievement("Live Pulse");
  }, [fanXp, goalTriggered, liveStandings, match, pushNotify]);

  const completeMission = useCallback(
    (missionId: string) => {
      if (completedMissionIds.includes(missionId)) return;
      const mission = allMissions.find((m) => m.id === missionId);
      if (!mission) return;
      setCompleted((ids) => [...ids, missionId]);
      setFanXp((xp) => xp + mission.xp);
      pushNotify("Mission complete", `${mission.title} · +${mission.xp} XP`);
      if (completedMissionIds.length + 1 >= 6) {
        setAchievement("Mission Runner");
      }
    },
    [completedMissionIds, pushNotify],
  );

  const redeemReward = useCallback(
    (rewardId: string) => {
      if (redeemedRewardIds.includes(rewardId)) return false;
      const reward = getRewardById(rewardId);
      if (!reward) return false;
      if (fanXp < reward.xpCost) {
        pushNotify(
          "Not enough XP",
          `Need ${reward.xpCost} XP to redeem ${reward.title}.`,
        );
        return false;
      }
      setFanXp((xp) => xp - reward.xpCost);
      setRedeemed((ids) => [...ids, rewardId]);
      pushNotify(
        "Reward unlocked",
        `${reward.title} redeemed · −${reward.xpCost} XP`,
      );
      return true;
    },
    [fanXp, redeemedRewardIds, pushNotify],
  );

  const toggleFollowClub = useCallback(
    (clubId: string, label = "Club") => {
      setFollowedClubs((ids) => {
        const following = !ids.includes(clubId);
        queueMicrotask(() =>
          pushNotify(
            following ? "Following club" : "Unfollowed club",
            following
              ? `You're now following ${label}.`
              : `Stopped following ${label}.`,
          ),
        );
        return toggleId(ids, clubId);
      });
    },
    [pushNotify],
  );

  const toggleFollowTeam = useCallback(
    (teamId: string, label = "Team") => {
      setFollowedTeams((ids) => {
        const following = !ids.includes(teamId);
        queueMicrotask(() =>
          pushNotify(
            following ? "Following team" : "Unfollowed team",
            following
              ? `You're now following ${label}.`
              : `Stopped following ${label}.`,
          ),
        );
        return toggleId(ids, teamId);
      });
    },
    [pushNotify],
  );

  const toggleFollowEvent = useCallback(
    (eventId: string, label = "Event") => {
      setFollowedEvents((ids) => {
        const following = !ids.includes(eventId);
        queueMicrotask(() =>
          pushNotify(
            following ? "Following event" : "Unfollowed event",
            following
              ? `You're now following ${label}.`
              : `Stopped following ${label}.`,
          ),
        );
        return toggleId(ids, eventId);
      });
    },
    [pushNotify],
  );

  const toggleFavoritePlayer = useCallback(
    (playerId: string, label = "Player") => {
      setFavoritePlayers((ids) => {
        const following = !ids.includes(playerId);
        queueMicrotask(() =>
          pushNotify(
            following ? "Player favorited" : "Removed favorite",
            following
              ? `${label} added to favorites.`
              : `${label} removed from favorites.`,
          ),
        );
        return toggleId(ids, playerId);
      });
    },
    [pushNotify],
  );

  const follows = useMemo<FanFollowState>(
    () => ({
      followedClubIds,
      followedTeamIds,
      followedEventIds,
      favoritePlayerIds,
    }),
    [followedClubIds, followedTeamIds, followedEventIds, favoritePlayerIds],
  );

  const personalized = useMemo(() => getMissionsForFan(follows), [follows]);

  const liveMissions = useMemo(
    () =>
      allMissions.map((m) => ({
        ...m,
        completed: completedMissionIds.includes(m.id) || Boolean(m.completed),
      })),
    [completedMissionIds],
  );

  const missionsGlobal = useMemo(
    () =>
      personalized.global.map((m) => ({
        ...m,
        completed: completedMissionIds.includes(m.id) || Boolean(m.completed),
      })),
    [personalized.global, completedMissionIds],
  );

  const missionsForYou = useMemo(
    () =>
      personalized.forYou.map((m) => ({
        ...m,
        completed: completedMissionIds.includes(m.id) || Boolean(m.completed),
      })),
    [personalized.forYou, completedMissionIds],
  );

  const missionsDiscover = useMemo(
    () =>
      personalized.discover.map((m) => ({
        ...m,
        completed: completedMissionIds.includes(m.id) || Boolean(m.completed),
      })),
    [personalized.discover, completedMissionIds],
  );

  const value = useMemo<DemoContextValue>(
    () => ({
      match,
      fanXp,
      fanLevel,
      fanStatus,
      fanName,
      fanCity,
      completedMissionIds,
      redeemedRewardIds,
      followedClubIds,
      followedTeamIds,
      followedEventIds,
      favoritePlayerIds,
      socialPosts,
      notifications,
      goalTriggered,
      lastUnlockedAchievement,
      automationSteps,
      liveStandings,
      playerOfTheMatch,
      toggleGoal,
      triggerGoal: toggleGoal,
      completeMission,
      redeemReward,
      toggleFollowClub,
      toggleFollowTeam,
      toggleFollowEvent,
      toggleFavoritePlayer,
      isFollowingClub: (clubId) => followedClubIds.includes(clubId),
      isFollowingTeam: (teamId) => followedTeamIds.includes(teamId),
      isFollowingEvent: (eventId) => followedEventIds.includes(eventId),
      isFavoritePlayer: (playerId) => favoritePlayerIds.includes(playerId),
      follows,
      missions: liveMissions,
      missionsGlobal,
      missionsForYou,
      missionsDiscover,
      xpToNext: baseFan.xpToNext,
    }),
    [
      match,
      fanXp,
      fanLevel,
      fanStatus,
      fanName,
      fanCity,
      completedMissionIds,
      redeemedRewardIds,
      followedClubIds,
      followedTeamIds,
      followedEventIds,
      favoritePlayerIds,
      socialPosts,
      notifications,
      goalTriggered,
      lastUnlockedAchievement,
      automationSteps,
      liveStandings,
      playerOfTheMatch,
      toggleGoal,
      completeMission,
      redeemReward,
      toggleFollowClub,
      toggleFollowTeam,
      toggleFollowEvent,
      toggleFavoritePlayer,
      follows,
      liveMissions,
      missionsGlobal,
      missionsForYou,
      missionsDiscover,
      baseFan.xpToNext,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}

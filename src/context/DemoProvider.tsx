"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFeaturedMatch, getPrimaryFan, missions as allMissions } from "@/data";
import type { Match, MatchEventItem, Mission } from "@/types";

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
  completedMissionIds: string[];
  socialPosts: SocialPost[];
  notifications: DemoNotification[];
  goalTriggered: boolean;
  lastUnlockedAchievement?: string;
  automationSteps: string[];
}

interface DemoContextValue extends DemoState {
  triggerGoal: () => void;
  completeMission: (missionId: string) => void;
  missions: Mission[];
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

export function DemoProvider({ children }: { children: ReactNode }) {
  const baseMatch = getFeaturedMatch();
  const baseFan = getPrimaryFan();

  const [match, setMatch] = useState<Match>(baseMatch);
  const [fanXp, setFanXp] = useState(baseFan.xp);
  const [fanLevel] = useState(baseFan.level);
  const [completedMissionIds, setCompleted] = useState(
    baseFan.completedMissionIds,
  );
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [notifications, setNotifications] = useState<DemoNotification[]>([]);
  const [goalTriggered, setGoalTriggered] = useState(false);
  const [lastUnlockedAchievement, setAchievement] = useState<string>();
  const [automationSteps, setAutomation] = useState<string[]>([]);

  const triggerGoal = useCallback(() => {
    if (goalTriggered) return;

    const goalEvent: MatchEventItem = {
      id: "me-nb-goal-72-live",
      minute: 72,
      type: "goal",
      teamId: "team-nexus-fc",
      playerId: "player-kai-novak",
      playerName: "Kai Novak",
      detail: "Curled finish after Brandt cut-back",
      period: "2H",
    };

    // If already 2-1 with 72' goal in data, treat trigger as "propagation demo"
    // by bumping to 3-1 and adding a new event for the wow moment.
    setMatch((prev) => {
      const alreadyHas72 = prev.events.some(
        (e) => e.minute === 72 && e.type === "goal",
      );
      if (alreadyHas72) {
        const extra: MatchEventItem = {
          id: "me-nb-goal-78",
          minute: 78,
          type: "goal",
          teamId: "team-nexus-fc",
          playerId: "player-samuel-oke",
          playerName: "Samuel Oke",
          detail: "Counter-attack finish — GOAL DETECTED",
          period: "2H",
        };
        return {
          ...prev,
          homeScore: prev.homeScore + 1,
          minute: 78,
          events: [...prev.events, extra],
        };
      }
      return {
        ...prev,
        homeScore: Math.max(prev.homeScore, 2),
        events: [...prev.events, goalEvent],
        minute: 72,
      };
    });

    setSocialPosts((prev) => [
      {
        id: `social-${Date.now()}`,
        headline: "GOAL!",
        body: "NEXUS extend the lead in the NOVA CUP Semi Final.",
        scoreLine: "NEXUS FC 3–1 Berlin United",
        minute: 78,
        platform: "X",
      },
      ...prev,
    ]);

    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: "Match alert",
        body: "GOAL — NEXUS FC score. +150 XP for live watchers.",
      },
      ...prev,
    ]);

    setFanXp((xp) => xp + 150);
    setAutomation(AUTOMATION);
    setGoalTriggered(true);
    setAchievement("Live Pulse");
  }, [goalTriggered]);

  const completeMission = useCallback(
    (missionId: string) => {
      if (completedMissionIds.includes(missionId)) return;
      const mission = allMissions.find((m) => m.id === missionId);
      if (!mission) return;
      setCompleted((ids) => [...ids, missionId]);
      setFanXp((xp) => xp + mission.xp);
      setNotifications((prev) => [
        {
          id: `mission-${Date.now()}`,
          title: "Mission complete",
          body: `${mission.title} · +${mission.xp} XP`,
        },
        ...prev,
      ]);
      if (completedMissionIds.length + 1 >= 6) {
        setAchievement("Mission Runner");
      }
    },
    [completedMissionIds],
  );

  const value = useMemo<DemoContextValue>(
    () => ({
      match,
      fanXp,
      fanLevel,
      completedMissionIds,
      socialPosts,
      notifications,
      goalTriggered,
      lastUnlockedAchievement,
      automationSteps,
      triggerGoal,
      completeMission,
      missions: allMissions,
      xpToNext: baseFan.xpToNext,
    }),
    [
      match,
      fanXp,
      fanLevel,
      completedMissionIds,
      socialPosts,
      notifications,
      goalTriggered,
      lastUnlockedAchievement,
      automationSteps,
      triggerGoal,
      completeMission,
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

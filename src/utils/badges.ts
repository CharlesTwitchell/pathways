export interface Badge {
  id: string;
  icon: string;
  name: string;
  description: string;
  earned: boolean;
}

interface BadgeInput {
  totalUnlockedStops: number;
  completedJourneyCount: number;
  createdJourneyCount: number;
  allJourneysComplete: boolean;
}

export function computeBadges(input: BadgeInput): Badge[] {
  const { totalUnlockedStops, completedJourneyCount, createdJourneyCount, allJourneysComplete } = input;

  return [
    {
      id: 'first-steps',
      icon: '👣',
      name: 'First Steps',
      description: 'Unlock your first stop',
      earned: totalUnlockedStops >= 1,
    },
    {
      id: 'first-journey',
      icon: '🏁',
      name: 'Journey Complete',
      description: 'Finish your first journey',
      earned: completedJourneyCount >= 1,
    },
    {
      id: 'explorer',
      icon: '🗺️',
      name: 'Explorer',
      description: 'Complete 3 journeys',
      earned: completedJourneyCount >= 3,
    },
    {
      id: 'trailblazer',
      icon: '✍️',
      name: 'Trailblazer',
      description: 'Create your own journey',
      earned: createdJourneyCount >= 1,
    },
    {
      id: 'completionist',
      icon: '🏆',
      name: 'Completionist',
      description: 'Complete every journey on Pathways',
      earned: allJourneysComplete,
    },
  ];
}

import { JourneyCard } from '../components/JourneyCard';
import { journeys } from '../data/journeys';

export function Home() {
  return (
    <main>
      <div className="page-header">
        <h1>Pathways</h1>
        <p>Themed walking journeys. Pick one, follow the trail, unlock the story at every stop.</p>
      </div>
      <div className="journey-list">
        {journeys.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>
    </main>
  );
}

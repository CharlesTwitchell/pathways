import type { Journey } from '../types';

export const journeys: Journey[] = [
  {
    id: 'boston-freedom-trail',
    title: "Boston's Freedom Trail",
    theme: 'Colonial History',
    icon: '🔔',
    accent: '#8c2f39',
    description:
      'Walk in the footsteps of the American Revolution through eleven historic sites in downtown Boston, from the Common to Bunker Hill.',
    duration: '~2.5 hours',
    distance: '2.5 mi',
    stops: [
      {
        id: 'boston-common',
        name: 'Boston Common',
        lat: 42.3551,
        lng: -71.0657,
        icon: '🌳',
        teaser: "America's oldest public park, and the starting point of the trail.",
        story:
          "Established in 1634, Boston Common is the oldest city park in the United States. It once served as common grazing land and a military training ground — British troops camped here before marching out to Lexington and Concord in 1775. Look for the Central Burying Ground along Boylston Street, resting place for both patriots and redcoats.",
      },
      {
        id: 'state-house',
        name: 'Massachusetts State House',
        lat: 42.3588,
        lng: -71.0637,
        icon: '🏛️',
        teaser: 'The gold-domed seat of Massachusetts government since 1798.',
        story:
          "Designed by Charles Bulfinch, the State House sits atop Beacon Hill on land once owned by John Hancock. Its dome was originally wood, then copper (sheathed by Paul Revere's own company), and is now covered in 23-karat gold leaf.",
      },
      {
        id: 'park-street-church',
        name: 'Park Street Church',
        lat: 42.3567,
        lng: -71.0624,
        icon: '⛪',
        teaser: 'A 217-foot steeple that dominated the Boston skyline for a century.',
        story:
          "Built in 1809, Park Street Church stood at what was once called 'Brimstone Corner' — some say for the fiery abolitionist sermons preached here, others for the gunpowder stored in its crypt during the War of 1812. William Lloyd Garrison delivered his first major anti-slavery speech from this pulpit in 1829.",
      },
      {
        id: 'granary-burying-ground',
        name: 'Granary Burying Ground',
        lat: 42.3572,
        lng: -71.0619,
        icon: '🪦',
        teaser: 'Final resting place of Paul Revere, Samuel Adams, and John Hancock.',
        story:
          "Named for a grain storehouse that once stood nearby, this 1660 burying ground holds three signers of the Declaration of Independence, the victims of the Boston Massacre, and Benjamin Franklin's parents. Many headstones feature winged skull carvings — a Puritan reminder of mortality, not a symbol of danger.",
      },
      {
        id: 'kings-chapel',
        name: "King's Chapel",
        lat: 42.3579,
        lng: -71.0603,
        icon: '⛪',
        teaser: "Boston's first Anglican church, built to a chorus of local protest.",
        story:
          "Founded in 1686 for the royal governor's Anglican worship, King's Chapel was deeply unpopular with Boston's Puritan majority. The current stone building, completed in 1754, was built around the original wooden chapel so services never had to stop — the old chapel was then dismantled and passed out through the windows.",
      },
      {
        id: 'old-south-meeting-house',
        name: 'Old South Meeting House',
        lat: 42.3567,
        lng: -71.0575,
        icon: '🗣️',
        teaser: 'Where 5,000 colonists gathered before the Boston Tea Party.',
        story:
          "On the night of December 16, 1773, thousands packed this meeting house to debate the tea tax. When word came that Governor Hutchinson refused to send the tea back, Samuel Adams gave a signal and the crowd marched to Griffin's Wharf to dump 342 chests of tea into the harbor.",
      },
      {
        id: 'old-state-house',
        name: 'Old State House',
        lat: 42.3588,
        lng: -71.0567,
        icon: '🦁',
        teaser: 'Site of the Boston Massacre, right outside its front door.',
        story:
          "Built in 1713, this was the seat of British colonial government — and the balcony from which the Declaration of Independence was first read publicly in Boston. A ring of cobblestones in the traffic circle below marks the spot where British soldiers fired on a crowd in 1770, killing five colonists in the Boston Massacre.",
      },
      {
        id: 'faneuil-hall',
        name: 'Faneuil Hall',
        lat: 42.3600,
        lng: -71.0568,
        icon: '🎙️',
        teaser: "The 'Cradle of Liberty,' still a public meeting hall today.",
        story:
          "Donated to the city in 1742 by merchant Peter Faneuil, this hall hosted fiery town meetings against British taxation and later, in the 19th century, abolitionist and suffragist rallies. The grasshopper weathervane on top has topped the building since 1742.",
      },
      {
        id: 'paul-revere-house',
        name: 'Paul Revere House',
        lat: 42.3635,
        lng: -71.0537,
        icon: '🐴',
        teaser: "The silversmith's home before his midnight ride.",
        story:
          "Built around 1680, this is the oldest surviving structure in downtown Boston and the home Paul Revere left on the night of April 18, 1775, to warn Samuel Adams and John Hancock that British troops were marching — the ride immortalized in Longfellow's poem.",
      },
      {
        id: 'old-north-church',
        name: 'Old North Church',
        lat: 42.3662,
        lng: -71.0544,
        icon: '🕯️',
        teaser: "'One if by land, two if by sea' — the signal lanterns hung here.",
        story:
          "On April 18, 1775, sexton Robert Newman climbed to the steeple of Boston's oldest surviving church and hung two lanterns, signaling that British troops were rowing across the Charles River rather than marching by land — the warning that set Paul Revere's ride in motion.",
      },
      {
        id: 'bunker-hill-monument',
        name: 'Bunker Hill Monument',
        lat: 42.3763,
        lng: -71.0611,
        icon: '🗼',
        teaser: 'A 221-foot granite obelisk marking the Revolution’s first major battle.',
        story:
          "Fought in June 1775 mostly on adjacent Breed's Hill, the Battle of Bunker Hill was technically a British victory — but at such staggering cost that it proved the colonial militia could stand against professional soldiers. Climb the monument's 294 steps for a panoramic view of the harbor and skyline.",
      },
    ],
  },
  {
    id: 'golden-gate-park',
    title: 'Golden Gate Park Icons',
    theme: 'Nature & Culture',
    icon: '🌉',
    accent: '#1f6f5c',
    description:
      "A loop through San Francisco's great park, from Victorian glasshouses to a working Dutch windmill, by way of a Japanese garden and two world-class museums.",
    duration: '~3 hours',
    distance: '3.8 mi',
    stops: [
      {
        id: 'conservatory-of-flowers',
        name: 'Conservatory of Flowers',
        lat: 37.7729,
        lng: -122.4604,
        icon: '🌺',
        teaser: 'The oldest wood-framed greenhouse in North America.',
        story:
          "Prefabricated and shipped from England in 1878, the Conservatory of Flowers survived an 1883 fire, the 1906 earthquake, and a 1995 windstorm that shattered much of its glass. Inside, it holds one of the world's rarest high-elevation tropical plant collections.",
      },
      {
        id: 'de-young-museum',
        name: 'de Young Museum',
        lat: 37.7715,
        lng: -122.4686,
        icon: '🖼️',
        teaser: 'A copper-clad art museum with a twisting observation tower.',
        story:
          "Rebuilt in 2005 after earthquake damage doomed the original 1895 building, the de Young's perforated copper skin is designed to oxidize and turn green over decades, blending into the park's canopy. The free observation tower on the 9th floor gives a 360-degree view from the Pacific to downtown.",
      },
      {
        id: 'academy-of-sciences',
        name: 'California Academy of Sciences',
        lat: 37.7699,
        lng: -122.4661,
        icon: '🔬',
        teaser: 'An aquarium, planetarium, and rainforest under one living roof.',
        story:
          "Renowned architect Renzo Piano topped this 2008 building with a 2.5-acre living roof planted with native species, which insulates the building and captures rainwater. Beneath it: a four-story rainforest dome, a planetarium, and an aquarium built around a re-created Philippine coral reef.",
      },
      {
        id: 'japanese-tea-garden',
        name: 'Japanese Tea Garden',
        lat: 37.7702,
        lng: -122.4700,
        icon: '🍵',
        teaser: "The oldest public Japanese garden in the US, dating to 1894.",
        story:
          "Built for the 1894 California Midwinter Exposition and expanded by Japanese gardener Makoto Hagiwara and his family, who lived on site until their forced removal during WWII internment. The garden's fortune cookies were reportedly served here decades before the treat became associated with Chinese restaurants.",
      },
      {
        id: 'stow-lake',
        name: 'Stow Lake',
        lat: 37.7690,
        lng: -122.4769,
        icon: '🚣',
        teaser: 'A ring-shaped lake circling an artificial island with a waterfall.',
        story:
          "Created in 1893 around Strawberry Hill, Stow Lake encircles the park's highest point. Huff's Waterfall cascades down the hill into the lake, and paddle boats have launched from the boathouse since the early 20th century.",
      },
      {
        id: 'dutch-windmill',
        name: 'Dutch Windmill & Queen Wilhelmina Garden',
        lat: 37.7702,
        lng: -122.5107,
        icon: '🌷',
        teaser: 'A full-size working windmill at the park’s Pacific-facing edge.',
        story:
          "Completed in 1903, this windmill once pumped thousands of gallons of water per minute from an underground aquifer to irrigate the park — a job now done by modern pumps. Each spring the surrounding Queen Wilhelmina Tulip Garden bursts into bloom, planted in tribute to the Netherlands.",
      },
    ],
  },
];

export function getJourney(id: string): Journey | undefined {
  return journeys.find((j) => j.id === id);
}

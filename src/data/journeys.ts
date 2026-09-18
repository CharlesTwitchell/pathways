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
  {
    id: 'alameda-island-heritage',
    title: 'Alameda Island Heritage',
    theme: 'Naval History & Victorian Charm',
    icon: '⚓',
    accent: '#1d4e73',
    description:
      'From a WWII aircraft carrier to an Art Deco movie palace, wander the island city of Alameda — shaped by a Navy air station and lined with more Victorian buildings than almost anywhere else in California.',
    duration: '~3 hours',
    distance: '5 mi',
    stops: [
      {
        id: 'uss-hornet',
        name: 'USS Hornet Museum',
        lat: 37.7714,
        lng: -122.3011,
        icon: '🛳️',
        teaser:
          'A WWII aircraft carrier that recovered the Apollo 11 astronauts, now docked at Alameda Point.',
        story:
          "Commissioned in 1943, USS Hornet earned nine battle stars in the Pacific and later served as the primary recovery ship for both the Apollo 11 and Apollo 12 splashdowns — the quarantine trailer that held Neil Armstrong, Buzz Aldrin, and Michael Collins is still aboard. Decommissioned in 1970, she's been a museum ship since 1998, moored at what was once Naval Air Station Alameda.",
      },
      {
        id: 'alameda-point-hangars',
        name: 'Alameda Point Hangars',
        lat: 37.7862,
        lng: -122.2934,
        icon: '🛩️',
        teaser: "Rows of WWII-era hangars from the Navy's busiest West Coast air station.",
        story:
          "Naval Air Station Alameda operated from 1940 until its 1997 closure, at its peak launching aircraft carriers and squadrons across the Pacific theater. Its enormous hangars and runways — some of the largest on the West Coast — now sit alongside breweries, film studios, and open space, a reminder of the base that once employed thousands of Alamedans.",
      },
      {
        id: 'crolls-garden',
        name: "Croll's Garden",
        lat: 37.7770,
        lng: -122.2895,
        icon: '🥊',
        teaser: 'An 1883 saloon and hotel where world champion boxers once trained.',
        story:
          "Built in 1883, Croll's began as a saloon and hotel before becoming a training camp for boxing champions in the early 1900s — Jack Dempsey and James J. Jeffries both trained in the ring upstairs before major fights. It's one of the oldest commercial buildings still standing on the island.",
      },
      {
        id: 'alameda-theatre',
        name: 'Alameda Theatre & Cineplex',
        lat: 37.7652,
        lng: -122.2422,
        icon: '🎬',
        teaser: 'A restored 1932 Art Deco movie palace on the main drag.',
        story:
          "Opened in 1932 at the height of the Art Deco era, the Alameda Theatre's terrazzo floors, neon marquee, and grand auditorium were restored and reopened in 2008 after decades of decline. It anchors Park Street's historic commercial district, itself lined with buildings dating to the 1890s.",
      },
      {
        id: 'alameda-city-hall',
        name: 'Alameda City Hall',
        lat: 37.7649,
        lng: -122.2418,
        icon: '🏛️',
        teaser: 'A Beaux-Arts city hall that has served continuously since 1896.',
        story:
          "Dedicated in 1896, Alameda's City Hall is one of the oldest continuously operating city halls in California. Its Beaux-Arts facade and clock tower have presided over Santa Clara Avenue for well over a century, surviving both the 1906 and 1989 earthquakes with only minor damage.",
      },
      {
        id: 'crab-cove',
        name: 'Crab Cove & Crown Memorial State Beach',
        lat: 37.7676,
        lng: -122.2789,
        icon: '🦀',
        teaser: "A sandy Bay beach and marine reserve at the island's southern edge.",
        story:
          "Once the site of Neptune Beach, a beloved amusement park nicknamed the 'Coney Island of the West' that operated from 1917 to 1939, Crab Cove is now a protected marine reserve. The visitor center's aquarium displays the bat rays, sharks, and crabs that give the cove its name.",
      },
    ],
  },
  {
    id: 'oakland-lake-merritt',
    title: 'Oakland: Lake Merritt Loop',
    theme: 'Urban Nature & History',
    icon: '🦢',
    accent: '#b5622f',
    description:
      "Circle the country's oldest wildlife refuge in the heart of downtown Oakland, passing a Victorian mansion, a beloved children's park, and a movie palace with one of the Bay Area's most iconic signs.",
    duration: '~2 hours',
    distance: '3.4 mi',
    stops: [
      {
        id: 'camron-stanford-house',
        name: 'Camron-Stanford House',
        lat: 37.8055,
        lng: -122.2535,
        icon: '🏠',
        teaser: 'The last of the grand Victorian mansions that once ringed Lake Merritt.',
        story:
          'Built in 1876, the Camron-Stanford House is the sole survivor of a row of ornate Victorian mansions that once lined the west shore of Lake Merritt. It later served as the original home of the Oakland Museum before being restored as a house museum furnished in period style.',
      },
      {
        id: 'childrens-fairyland',
        name: "Children's Fairyland",
        lat: 37.8064,
        lng: -122.2563,
        icon: '🎠',
        teaser: "The country's first storybook theme park, and an inspiration for Disneyland.",
        story:
          "Opened in 1950 in Lakeside Park, Children's Fairyland predates Disneyland by five years and is widely credited as an inspiration for it — Walt Disney reportedly toured the park before designing his own. Its storybook sets and walk-through exhibits are still built to a child's scale.",
      },
      {
        id: 'edoff-bandstand',
        name: 'Edoff Memorial Bandstand',
        lat: 37.8087,
        lng: -122.2508,
        icon: '🎶',
        teaser: "A lakeside bandstand that's hosted free concerts since the 1930s.",
        story:
          'Built in 1938 with Works Progress Administration funding, the Edoff Memorial Bandstand sits at the edge of Lakeside Park and has hosted free public concerts for generations of Oakland residents, from big bands to community music series today.',
      },
      {
        id: 'lake-merritt-wildlife-refuge',
        name: 'Lake Merritt Wildlife Refuge',
        lat: 37.8083,
        lng: -122.2489,
        icon: '🦆',
        teaser: 'Declared a wildlife refuge in 1870 — the first in the United States.',
        story:
          "In 1870, Oakland's mayor persuaded the state legislature to designate Lake Merritt a wildlife refuge, making it the first official wildlife refuge in the United States. The tidal lagoon's small islands still shelter herons, egrets, and migratory waterfowl within sight of downtown high-rises.",
      },
      {
        id: 'grand-lake-theatre',
        name: 'Grand Lake Theatre',
        lat: 37.8117,
        lng: -122.2483,
        icon: '🍿',
        teaser: 'A 1926 movie palace famous for its rooftop marquee sign.',
        story:
          "Opened in 1926, the Grand Lake Theatre's towering illuminated marquee has been a Lake Merritt landmark for a century. Its sign has doubled as informal public art and protest space over the years, occasionally lit up with messages visible across the lake.",
      },
      {
        id: 'morcom-rose-garden',
        name: 'Morcom Rose Garden',
        lat: 37.8149,
        lng: -122.2537,
        icon: '🌹',
        teaser: 'A Depression-era terraced garden with thousands of rose bushes.',
        story:
          "Built by WPA workers between 1933 and 1937, the Morcom Amphitheatre of Roses terraces up a small canyon a few blocks north of the lake, planted with more than 4,000 rose bushes across 250 varieties. It's a quiet, fragrant detour from the lake's busier paths.",
      },
    ],
  },
];

export function getJourney(id: string): Journey | undefined {
  return journeys.find((j) => j.id === id);
}

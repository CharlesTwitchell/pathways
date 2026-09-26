-- Seed data: the four built-in journeys, as official (created_by = null) content.
-- Safe to re-run: each journey is upserted by its unique slug, and its stops
-- are fully replaced (delete + reinsert) so re-running after an edit here
-- just re-syncs them.

-- Boston's Freedom Trail
insert into public.journeys (slug, title, theme, icon, accent, description, duration, distance, created_by)
values ('boston-freedom-trail', 'Boston''s Freedom Trail', 'Colonial History', '🔔', '#8c2f39', 'Walk in the footsteps of the American Revolution through eleven historic sites in downtown Boston, from the Common to Bunker Hill.', '~2.5 hours', '2.5 mi', null)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, icon = excluded.icon, accent = excluded.accent,
  description = excluded.description, duration = excluded.duration, distance = excluded.distance;

delete from public.stops where journey_id = (select id from public.journeys where slug = 'boston-freedom-trail');

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  1, 'Boston Common', 42.3551, -71.0657, 'Tremont St, Boston, MA 02111', '🌳', 'America''s oldest public park, and the starting point of the trail.', 'Established in 1634, Boston Common is the oldest city park in the United States. It once served as common grazing land and a military training ground — British troops camped here before marching out to Lexington and Concord in 1775. Look for the Central Burying Ground along Boylston Street, resting place for both patriots and redcoats.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  2, 'Massachusetts State House', 42.3588, -71.0637, '24 Beacon St, Boston, MA 02133', '🏛️', 'The gold-domed seat of Massachusetts government since 1798.', 'Designed by Charles Bulfinch, the State House sits atop Beacon Hill on land once owned by John Hancock. Its dome was originally wood, then copper (sheathed by Paul Revere''s own company), and is now covered in 23-karat gold leaf.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  3, 'Park Street Church', 42.3567, -71.0624, '1 Park St, Boston, MA 02108', '⛪', 'A 217-foot steeple that dominated the Boston skyline for a century.', 'Built in 1809, Park Street Church stood at what was once called ''Brimstone Corner'' — some say for the fiery abolitionist sermons preached here, others for the gunpowder stored in its crypt during the War of 1812. William Lloyd Garrison delivered his first major anti-slavery speech from this pulpit in 1829.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  4, 'Granary Burying Ground', 42.3572, -71.0619, '95 Tremont St, Boston, MA 02108', '🪦', 'Final resting place of Paul Revere, Samuel Adams, and John Hancock.', 'Named for a grain storehouse that once stood nearby, this 1660 burying ground holds three signers of the Declaration of Independence, the victims of the Boston Massacre, and Benjamin Franklin''s parents. Many headstones feature winged skull carvings — a Puritan reminder of mortality, not a symbol of danger.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  5, 'King''s Chapel', 42.3579, -71.0603, '58 Tremont St, Boston, MA 02108', '⛪', 'Boston''s first Anglican church, built to a chorus of local protest.', 'Founded in 1686 for the royal governor''s Anglican worship, King''s Chapel was deeply unpopular with Boston''s Puritan majority. The current stone building, completed in 1754, was built around the original wooden chapel so services never had to stop — the old chapel was then dismantled and passed out through the windows.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  6, 'Old South Meeting House', 42.3567, -71.0575, '310 Washington St, Boston, MA 02108', '🗣️', 'Where 5,000 colonists gathered before the Boston Tea Party.', 'On the night of December 16, 1773, thousands packed this meeting house to debate the tea tax. When word came that Governor Hutchinson refused to send the tea back, Samuel Adams gave a signal and the crowd marched to Griffin''s Wharf to dump 342 chests of tea into the harbor.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  7, 'Old State House', 42.3588, -71.0567, '206 Washington St, Boston, MA 02109', '🦁', 'Site of the Boston Massacre, right outside its front door.', 'Built in 1713, this was the seat of British colonial government — and the balcony from which the Declaration of Independence was first read publicly in Boston. A ring of cobblestones in the traffic circle below marks the spot where British soldiers fired on a crowd in 1770, killing five colonists in the Boston Massacre.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  8, 'Faneuil Hall', 42.36, -71.0568, '1 Faneuil Hall Square, Boston, MA 02109', '🎙️', 'The ''Cradle of Liberty,'' still a public meeting hall today.', 'Donated to the city in 1742 by merchant Peter Faneuil, this hall hosted fiery town meetings against British taxation and later, in the 19th century, abolitionist and suffragist rallies. The grasshopper weathervane on top has topped the building since 1742.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  9, 'Paul Revere House', 42.3635, -71.0537, '19 North Square, Boston, MA 02113', '🐴', 'The silversmith''s home before his midnight ride.', 'Built around 1680, this is the oldest surviving structure in downtown Boston and the home Paul Revere left on the night of April 18, 1775, to warn Samuel Adams and John Hancock that British troops were marching — the ride immortalized in Longfellow''s poem.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  10, 'Old North Church', 42.3662, -71.0544, '193 Salem St, Boston, MA 02113', '🕯️', '''One if by land, two if by sea'' — the signal lanterns hung here.', 'On April 18, 1775, sexton Robert Newman climbed to the steeple of Boston''s oldest surviving church and hung two lanterns, signaling that British troops were rowing across the Charles River rather than marching by land — the warning that set Paul Revere''s ride in motion.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'boston-freedom-trail'),
  11, 'Bunker Hill Monument', 42.3763, -71.0611, 'Monument Square, Charlestown, MA 02129', '🗼', 'A 221-foot granite obelisk marking the Revolution’s first major battle.', 'Fought in June 1775 mostly on adjacent Breed''s Hill, the Battle of Bunker Hill was technically a British victory — but at such staggering cost that it proved the colonial militia could stand against professional soldiers. Climb the monument''s 294 steps for a panoramic view of the harbor and skyline.', 75
);

-- Golden Gate Park Icons
insert into public.journeys (slug, title, theme, icon, accent, description, duration, distance, created_by)
values ('golden-gate-park', 'Golden Gate Park Icons', 'Nature & Culture', '🌉', '#1f6f5c', 'A loop through San Francisco''s great park, from Victorian glasshouses to a working Dutch windmill, by way of a Japanese garden and two world-class museums.', '~3 hours', '3.8 mi', null)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, icon = excluded.icon, accent = excluded.accent,
  description = excluded.description, duration = excluded.duration, distance = excluded.distance;

delete from public.stops where journey_id = (select id from public.journeys where slug = 'golden-gate-park');

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'golden-gate-park'),
  1, 'Conservatory of Flowers', 37.7729, -122.4604, '100 John F Kennedy Dr, San Francisco, CA 94118', '🌺', 'The oldest wood-framed greenhouse in North America.', 'Prefabricated and shipped from England in 1878, the Conservatory of Flowers survived an 1883 fire, the 1906 earthquake, and a 1995 windstorm that shattered much of its glass. Inside, it holds one of the world''s rarest high-elevation tropical plant collections.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'golden-gate-park'),
  2, 'de Young Museum', 37.7715, -122.4686, '50 Hagiwara Tea Garden Dr, San Francisco, CA 94118', '🖼️', 'A copper-clad art museum with a twisting observation tower.', 'Rebuilt in 2005 after earthquake damage doomed the original 1895 building, the de Young''s perforated copper skin is designed to oxidize and turn green over decades, blending into the park''s canopy. The free observation tower on the 9th floor gives a 360-degree view from the Pacific to downtown.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'golden-gate-park'),
  3, 'California Academy of Sciences', 37.7699, -122.4661, '55 Music Concourse Dr, San Francisco, CA 94118', '🔬', 'An aquarium, planetarium, and rainforest under one living roof.', 'Renowned architect Renzo Piano topped this 2008 building with a 2.5-acre living roof planted with native species, which insulates the building and captures rainwater. Beneath it: a four-story rainforest dome, a planetarium, and an aquarium built around a re-created Philippine coral reef.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'golden-gate-park'),
  4, 'Japanese Tea Garden', 37.7702, -122.47, '75 Hagiwara Tea Garden Dr, San Francisco, CA 94118', '🍵', 'The oldest public Japanese garden in the US, dating to 1894.', 'Built for the 1894 California Midwinter Exposition and expanded by Japanese gardener Makoto Hagiwara and his family, who lived on site until their forced removal during WWII internment. The garden''s fortune cookies were reportedly served here decades before the treat became associated with Chinese restaurants.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'golden-gate-park'),
  5, 'Stow Lake', 37.769, -122.4769, '50 Stow Lake Dr, San Francisco, CA 94118', '🚣', 'A ring-shaped lake circling an artificial island with a waterfall.', 'Created in 1893 around Strawberry Hill, Stow Lake encircles the park''s highest point. Huff''s Waterfall cascades down the hill into the lake, and paddle boats have launched from the boathouse since the early 20th century.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'golden-gate-park'),
  6, 'Dutch Windmill & Queen Wilhelmina Garden', 37.7702, -122.5107, 'John F Kennedy Dr & Great Hwy, San Francisco, CA 94121', '🌷', 'A full-size working windmill at the park’s Pacific-facing edge.', 'Completed in 1903, this windmill once pumped thousands of gallons of water per minute from an underground aquifer to irrigate the park — a job now done by modern pumps. Each spring the surrounding Queen Wilhelmina Tulip Garden bursts into bloom, planted in tribute to the Netherlands.', 75
);

-- Alameda Island Heritage
insert into public.journeys (slug, title, theme, icon, accent, description, duration, distance, created_by)
values ('alameda-island-heritage', 'Alameda Island Heritage', 'Naval History & Victorian Charm', '⚓', '#1d4e73', 'From a WWII aircraft carrier to an Art Deco movie palace, wander the island city of Alameda — shaped by a Navy air station and lined with more Victorian buildings than almost anywhere else in California.', '~3 hours', '5 mi', null)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, icon = excluded.icon, accent = excluded.accent,
  description = excluded.description, duration = excluded.duration, distance = excluded.distance;

delete from public.stops where journey_id = (select id from public.journeys where slug = 'alameda-island-heritage');

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'alameda-island-heritage'),
  1, 'USS Hornet Museum', 37.7714, -122.3011, '707 W Hornet Ave, Alameda, CA 94501', '🛳️', 'A WWII aircraft carrier that recovered the Apollo 11 astronauts, now docked at Alameda Point.', 'Commissioned in 1943, USS Hornet earned nine battle stars in the Pacific and later served as the primary recovery ship for both the Apollo 11 and Apollo 12 splashdowns — the quarantine trailer that held Neil Armstrong, Buzz Aldrin, and Michael Collins is still aboard. Decommissioned in 1970, she''s been a museum ship since 1998, moored at what was once Naval Air Station Alameda.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'alameda-island-heritage'),
  2, 'Alameda Point Hangars', 37.7862, -122.2934, 'Alameda Point, Alameda, CA 94501', '🛩️', 'Rows of WWII-era hangars from the Navy''s busiest West Coast air station.', 'Naval Air Station Alameda operated from 1940 until its 1997 closure, at its peak launching aircraft carriers and squadrons across the Pacific theater. Its enormous hangars and runways — some of the largest on the West Coast — now sit alongside breweries, film studios, and open space, a reminder of the base that once employed thousands of Alamedans.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'alameda-island-heritage'),
  3, 'Croll''s Garden', 37.777, -122.2895, 'Webster St & Central Ave, Alameda, CA 94501', '🥊', 'An 1883 saloon and hotel where world champion boxers once trained.', 'Built in 1883, Croll''s began as a saloon and hotel before becoming a training camp for boxing champions in the early 1900s — Jack Dempsey and James J. Jeffries both trained in the ring upstairs before major fights. It''s one of the oldest commercial buildings still standing on the island.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'alameda-island-heritage'),
  4, 'Alameda Theatre & Cineplex', 37.7652, -122.2422, '2317 Central Ave, Alameda, CA 94501', '🎬', 'A restored 1932 Art Deco movie palace on the main drag.', 'Opened in 1932 at the height of the Art Deco era, the Alameda Theatre''s terrazzo floors, neon marquee, and grand auditorium were restored and reopened in 2008 after decades of decline. It anchors Park Street''s historic commercial district, itself lined with buildings dating to the 1890s.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'alameda-island-heritage'),
  5, 'Alameda City Hall', 37.7649, -122.2418, '2263 Santa Clara Ave, Alameda, CA 94501', '🏛️', 'A Beaux-Arts city hall that has served continuously since 1896.', 'Dedicated in 1896, Alameda''s City Hall is one of the oldest continuously operating city halls in California. Its Beaux-Arts facade and clock tower have presided over Santa Clara Avenue for well over a century, surviving both the 1906 and 1989 earthquakes with only minor damage.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'alameda-island-heritage'),
  6, 'Crab Cove & Crown Memorial State Beach', 37.7676, -122.2789, '1252 McKay Ave, Alameda, CA 94501', '🦀', 'A sandy Bay beach and marine reserve at the island''s southern edge.', 'Once the site of Neptune Beach, a beloved amusement park nicknamed the ''Coney Island of the West'' that operated from 1917 to 1939, Crab Cove is now a protected marine reserve. The visitor center''s aquarium displays the bat rays, sharks, and crabs that give the cove its name.', 75
);

-- Oakland: Lake Merritt Loop
insert into public.journeys (slug, title, theme, icon, accent, description, duration, distance, created_by)
values ('oakland-lake-merritt', 'Oakland: Lake Merritt Loop', 'Urban Nature & History', '🦢', '#b5622f', 'Circle the country''s oldest wildlife refuge in the heart of downtown Oakland, passing a Victorian mansion, a beloved children''s park, and a movie palace with one of the Bay Area''s most iconic signs.', '~2 hours', '3.4 mi', null)
on conflict (slug) do update set
  title = excluded.title, theme = excluded.theme, icon = excluded.icon, accent = excluded.accent,
  description = excluded.description, duration = excluded.duration, distance = excluded.distance;

delete from public.stops where journey_id = (select id from public.journeys where slug = 'oakland-lake-merritt');

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'oakland-lake-merritt'),
  1, 'Camron-Stanford House', 37.8055, -122.2535, '1418 Lakeside Dr, Oakland, CA 94612', '🏠', 'The last of the grand Victorian mansions that once ringed Lake Merritt.', 'Built in 1876, the Camron-Stanford House is the sole survivor of a row of ornate Victorian mansions that once lined the west shore of Lake Merritt. It later served as the original home of the Oakland Museum before being restored as a house museum furnished in period style.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'oakland-lake-merritt'),
  2, 'Children''s Fairyland', 37.8064, -122.2563, '699 Bellevue Ave, Oakland, CA 94610', '🎠', 'The country''s first storybook theme park, and an inspiration for Disneyland.', 'Opened in 1950 in Lakeside Park, Children''s Fairyland predates Disneyland by five years and is widely credited as an inspiration for it — Walt Disney reportedly toured the park before designing his own. Its storybook sets and walk-through exhibits are still built to a child''s scale.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'oakland-lake-merritt'),
  3, 'Edoff Memorial Bandstand', 37.8087, -122.2508, 'Lakeside Park, Oakland, CA 94610', '🎶', 'A lakeside bandstand that''s hosted free concerts since the 1930s.', 'Built in 1938 with Works Progress Administration funding, the Edoff Memorial Bandstand sits at the edge of Lakeside Park and has hosted free public concerts for generations of Oakland residents, from big bands to community music series today.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'oakland-lake-merritt'),
  4, 'Lake Merritt Wildlife Refuge', 37.8083, -122.2489, 'Lake Merritt, Oakland, CA 94610', '🦆', 'Declared a wildlife refuge in 1870 — the first in the United States.', 'In 1870, Oakland''s mayor persuaded the state legislature to designate Lake Merritt a wildlife refuge, making it the first official wildlife refuge in the United States. The tidal lagoon''s small islands still shelter herons, egrets, and migratory waterfowl within sight of downtown high-rises.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'oakland-lake-merritt'),
  5, 'Grand Lake Theatre', 37.8117, -122.2483, '3200 Grand Ave, Oakland, CA 94610', '🍿', 'A 1926 movie palace famous for its rooftop marquee sign.', 'Opened in 1926, the Grand Lake Theatre''s towering illuminated marquee has been a Lake Merritt landmark for a century. Its sign has doubled as informal public art and protest space over the years, occasionally lit up with messages visible across the lake.', 75
);

insert into public.stops (journey_id, position, name, lat, lng, address, icon, teaser, story, radius_meters)
values (
  (select id from public.journeys where slug = 'oakland-lake-merritt'),
  6, 'Morcom Rose Garden', 37.8149, -122.2537, '700 Jean St, Oakland, CA 94610', '🌹', 'A Depression-era terraced garden with thousands of rose bushes.', 'Built by WPA workers between 1933 and 1937, the Morcom Amphitheatre of Roses terraces up a small canyon a few blocks north of the lake, planted with more than 4,000 rose bushes across 250 varieties. It''s a quiet, fragrant detour from the lake''s busier paths.', 75
);


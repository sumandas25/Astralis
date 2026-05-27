export type Category =
  | "planets"
  | "moons"
  | "stars"
  | "galaxies"
  | "black-holes"
  | "nebulae"
  | "meteors";

export interface Stat {
  label: string;
  value: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  image: string;
  imageCredit: string;
  color: string; // accent dot
  stats: Stat[];
  facts: string[];
  /** Optional richer information rendered as a "Deep dive" section. */
  extras?: {
    composition?: string;
    discovery?: string;
    nameOrigin?: string;
    notableMissions?: string[];
    classification?: string;
    history?: string;
  };
}

export const categories: { id: Category; label: string; blurb: string }[] = [
  { id: "planets", label: "Planets", blurb: "Worlds orbiting our Sun" },
  { id: "moons", label: "Moons", blurb: "Natural satellites of strange beauty" },
  { id: "stars", label: "Stars", blurb: "From red dwarfs to hypergiants" },
  { id: "galaxies", label: "Galaxies", blurb: "Island universes of stars" },
  { id: "black-holes", label: "Black Holes", blurb: "Gravity beyond escape" },
  { id: "nebulae", label: "Nebulae", blurb: "Stellar nurseries and graveyards" },
  { id: "meteors", label: "Meteors", blurb: "Wanderers and impactors" },
];

// All images are NASA/ESA public domain or Wikimedia Commons.
export const bodies: CelestialBody[] = [
  // ---------- PLANETS ----------
  {
    id: "sun",
    name: "The Sun",
    category: "stars",
    tagline: "Our local G-type main sequence star",
    description:
      "The Sun is a 4.6-billion-year-old yellow dwarf star at the center of our solar system. It holds 99.86% of the system's mass and fuses 600 million tons of hydrogen into helium every second.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg",
    imageCredit: "NASA / SDO",
    color: "oklch(0.85 0.18 80)",
    stats: [
      { label: "Type", value: "G2V Yellow Dwarf" },
      { label: "Surface Temp", value: "5,500 °C" },
      { label: "Core Temp", value: "15 million °C" },
      { label: "Diameter", value: "1.39 million km" },
      { label: "Age", value: "~4.6 billion years" },
      { label: "Distance from Earth", value: "149.6 million km" },
    ],
    facts: [
      "Light from the Sun takes 8 minutes 20 seconds to reach Earth.",
      "1.3 million Earths could fit inside the Sun.",
      "The Sun will become a red giant in about 5 billion years.",
    ],
  },
  {
    id: "mercury",
    name: "Mercury",
    category: "planets",
    tagline: "The swift, scorched messenger",
    description:
      "The smallest planet and closest to the Sun, Mercury swings through extreme temperatures with almost no atmosphere to buffer them. A year here is shorter than two of its own days.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    imageCredit: "NASA / MESSENGER",
    color: "oklch(0.7 0.05 60)",
    stats: [
      { label: "Moons", value: "0" },
      { label: "Gravity vs Earth", value: "0.38 g" },
      { label: "Day length", value: "176 Earth days" },
      { label: "Year length", value: "88 Earth days" },
      { label: "Diameter", value: "4,879 km" },
      { label: "Distance from Sun", value: "57.9 million km" },
    ],
    facts: [
      "Surface swings from -180 °C at night to 430 °C in the day.",
      "Mercury has wrinkles called 'lobate scarps' from cooling and shrinking.",
      "It has a tenuous exosphere of oxygen, sodium and hydrogen.",
    ],
  },
  {
    id: "venus",
    name: "Venus",
    category: "planets",
    tagline: "Earth's hellish twin",
    description:
      "Wrapped in clouds of sulfuric acid and crushed under 92 atmospheres of CO₂, Venus is the hottest world in the solar system — hotter than Mercury despite being farther from the Sun.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
    imageCredit: "NASA / Mariner 10",
    color: "oklch(0.85 0.1 80)",
    stats: [
      { label: "Moons", value: "0" },
      { label: "Gravity vs Earth", value: "0.9 g" },
      { label: "Day length", value: "243 Earth days" },
      { label: "Year length", value: "225 Earth days" },
      { label: "Surface Temp", value: "465 °C" },
      { label: "Diameter", value: "12,104 km" },
    ],
    facts: [
      "A day on Venus is longer than its year.",
      "It rotates backwards compared to most planets.",
      "Atmospheric pressure equals being 900 m underwater on Earth.",
    ],
  },
  {
    id: "earth",
    name: "Earth",
    category: "planets",
    tagline: "The pale blue dot",
    description:
      "The only world known to host life. A thin biosphere of liquid water, plate tectonics, a magnetic field, and a stabilizing Moon make Earth uniquely habitable.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg",
    imageCredit: "NASA / Apollo 17",
    color: "oklch(0.6 0.15 230)",
    stats: [
      { label: "Moons", value: "1" },
      { label: "Gravity", value: "1.0 g (9.81 m/s²)" },
      { label: "Day length", value: "23h 56m" },
      { label: "Year length", value: "365.25 days" },
      { label: "Diameter", value: "12,742 km" },
      { label: "Age", value: "4.54 billion years" },
    ],
    facts: [
      "71% of the surface is water; the deepest ocean point is 11 km.",
      "The magnetic field deflects most of the solar wind.",
      "Earth's core is roughly as hot as the surface of the Sun.",
    ],
  },
  {
    id: "mars",
    name: "Mars",
    category: "planets",
    tagline: "The rusty red frontier",
    description:
      "A cold desert world with the largest volcano and canyon in the solar system. Mars once had rivers and lakes — and may still hold traces of life beneath its surface.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    imageCredit: "ESA / Rosetta",
    color: "oklch(0.55 0.18 35)",
    stats: [
      { label: "Moons", value: "2 (Phobos, Deimos)" },
      { label: "Gravity vs Earth", value: "0.38 g" },
      { label: "Day length", value: "24h 37m" },
      { label: "Year length", value: "687 Earth days" },
      { label: "Diameter", value: "6,779 km" },
      { label: "Surface Temp", value: "-63 °C avg" },
    ],
    facts: [
      "Olympus Mons is 22 km tall — 2.5× higher than Everest.",
      "Valles Marineris is a canyon 4,000 km long.",
      "Dust storms can engulf the entire planet for months.",
    ],
  },
  {
    id: "jupiter",
    name: "Jupiter",
    category: "planets",
    tagline: "King of the planets",
    description:
      "A gas giant so massive it could swallow all other planets combined. Jupiter's Great Red Spot is a storm wider than Earth that has raged for centuries.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    imageCredit: "NASA / Hubble",
    color: "oklch(0.65 0.12 60)",
    stats: [
      { label: "Moons", value: "95 known" },
      { label: "Gravity vs Earth", value: "2.53 g" },
      { label: "Day length", value: "9h 56m" },
      { label: "Year length", value: "11.86 Earth years" },
      { label: "Diameter", value: "139,820 km" },
      { label: "Mass vs Earth", value: "317.8×" },
    ],
    facts: [
      "Jupiter has faint rings made of dust kicked up by its moons.",
      "Its magnetic field is 20,000× stronger than Earth's.",
      "The Great Red Spot has been observed for over 350 years.",
    ],
  },
  {
    id: "saturn",
    name: "Saturn",
    category: "planets",
    tagline: "The jewel of the solar system",
    description:
      "Famed for its dazzling ring system of ice and rock. Saturn is so low in density it would float in water — if you could find a bathtub big enough.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    imageCredit: "NASA / Cassini",
    color: "oklch(0.78 0.1 85)",
    stats: [
      { label: "Moons", value: "146 known" },
      { label: "Gravity vs Earth", value: "1.07 g" },
      { label: "Day length", value: "10h 33m" },
      { label: "Year length", value: "29.5 Earth years" },
      { label: "Diameter", value: "116,460 km" },
      { label: "Ring span", value: "282,000 km" },
    ],
    facts: [
      "Saturn's rings are mostly water ice, just 10 m thick on average.",
      "Hexagonal storm at the north pole is wider than Earth.",
      "Density is less than water — 0.687 g/cm³.",
    ],
  },
  {
    id: "uranus",
    name: "Uranus",
    category: "planets",
    tagline: "The tilted ice giant",
    description:
      "Uranus rolls along its orbit on its side, with an axial tilt of 98°. Its pale cyan color comes from methane absorbing red light in its frigid atmosphere.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
    imageCredit: "NASA / Voyager 2",
    color: "oklch(0.78 0.1 200)",
    stats: [
      { label: "Moons", value: "27 known" },
      { label: "Gravity vs Earth", value: "0.89 g" },
      { label: "Day length", value: "17h 14m (retrograde)" },
      { label: "Year length", value: "84 Earth years" },
      { label: "Diameter", value: "50,724 km" },
      { label: "Surface Temp", value: "-224 °C" },
    ],
    facts: [
      "Coldest planetary atmosphere in the solar system.",
      "Each pole gets 42 years of continuous sunlight, then 42 of darkness.",
      "Discovered in 1781 — the first planet found with a telescope.",
    ],
  },
  {
    id: "neptune",
    name: "Neptune",
    category: "planets",
    tagline: "The windy blue giant",
    description:
      "The farthest planet from the Sun, Neptune hosts the fastest winds in the solar system — over 2,100 km/h — and was discovered by mathematics before being seen.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
    imageCredit: "NASA / Voyager 2",
    color: "oklch(0.5 0.18 250)",
    stats: [
      { label: "Moons", value: "14 known" },
      { label: "Gravity vs Earth", value: "1.14 g" },
      { label: "Day length", value: "16h 6m" },
      { label: "Year length", value: "165 Earth years" },
      { label: "Diameter", value: "49,244 km" },
      { label: "Wind speed", value: "Up to 2,100 km/h" },
    ],
    facts: [
      "Predicted mathematically before its discovery in 1846.",
      "Its moon Triton orbits backwards and may be a captured Kuiper Belt object.",
      "Has completed only one orbit since discovery (in 2011).",
    ],
  },

  // ---------- MOONS ----------
  {
    id: "moon",
    name: "The Moon",
    category: "moons",
    tagline: "Earth's silver companion",
    description:
      "Born from a collision 4.5 billion years ago, the Moon stabilizes Earth's axis and drives our tides. Its cratered face has barely changed in billions of years.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    imageCredit: "Gregory H. Revera / CC BY-SA 3.0 (Wikimedia Commons)",
    color: "oklch(0.85 0.005 270)",
    stats: [
      { label: "Orbits", value: "Earth" },
      { label: "Gravity vs Earth", value: "0.166 g" },
      { label: "Diameter", value: "3,474 km" },
      { label: "Distance", value: "384,400 km" },
      { label: "Orbital period", value: "27.3 days" },
    ],
    facts: [
      "The Moon drifts 3.8 cm further from Earth each year.",
      "12 humans have walked on its surface.",
      "Its far side is permanently hidden from Earth.",
    ],
  },
  {
    id: "europa",
    name: "Europa",
    category: "moons",
    tagline: "Jupiter's ocean world",
    description:
      "Beneath Europa's cracked ice shell lies a salty global ocean — possibly twice the volume of all Earth's oceans. It may be the best place to find alien life.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Europa-moon-with-margins.jpg",
    imageCredit: "NASA / Galileo",
    color: "oklch(0.85 0.05 80)",
    stats: [
      { label: "Orbits", value: "Jupiter" },
      { label: "Gravity vs Earth", value: "0.134 g" },
      { label: "Diameter", value: "3,121 km" },
      { label: "Ice shell", value: "15–25 km thick" },
      { label: "Ocean depth", value: "60–150 km" },
    ],
    facts: [
      "Smoothest surface of any solid body in the solar system.",
      "Plumes of water vapor erupt from the surface.",
      "NASA's Europa Clipper mission launched in 2024.",
    ],
  },
  {
    id: "titan",
    name: "Titan",
    category: "moons",
    tagline: "The moon with seas of methane",
    description:
      "Saturn's largest moon is the only other world with stable liquid on its surface — but it's methane and ethane, not water. Titan has a dense atmosphere, rain, rivers and lakes.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Titan_in_true_color.jpg",
    imageCredit: "NASA / Cassini",
    color: "oklch(0.75 0.12 75)",
    stats: [
      { label: "Orbits", value: "Saturn" },
      { label: "Gravity vs Earth", value: "0.14 g" },
      { label: "Diameter", value: "5,150 km" },
      { label: "Surface Temp", value: "-179 °C" },
      { label: "Atmosphere", value: "1.5× Earth's pressure" },
    ],
    facts: [
      "Larger than the planet Mercury.",
      "Has a full hydrological cycle — but with methane.",
      "NASA's Dragonfly drone will fly Titan's skies in the 2030s.",
    ],
  },

  // ---------- STARS ----------
  {
    id: "betelgeuse",
    name: "Betelgeuse",
    category: "stars",
    tagline: "The red supergiant about to explode",
    description:
      "Marking Orion's shoulder, Betelgeuse is so vast it would engulf Jupiter if placed at the Sun's position. It will go supernova — sometime in the next 100,000 years.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Betelgeuse_captured_by_ALMA.jpg",
    imageCredit: "ESO / P. Kervella",
    color: "oklch(0.65 0.2 30)",
    stats: [
      { label: "Type", value: "Red Supergiant" },
      { label: "Distance", value: "~548 light-years" },
      { label: "Radius vs Sun", value: "~700×" },
      { label: "Mass vs Sun", value: "~16.5×" },
      { label: "Luminosity vs Sun", value: "~126,000×" },
    ],
    facts: [
      "When it goes supernova, it will be visible in daylight for weeks.",
      "Dimmed dramatically in 2019–2020 due to a dust cloud.",
      "One of the largest stars visible to the naked eye.",
    ],
  },
  {
    id: "proxima-centauri",
    name: "Proxima Centauri",
    category: "stars",
    tagline: "Our nearest stellar neighbor",
    description:
      "A small red dwarf 4.24 light-years away, Proxima hosts at least three known planets — including one in the habitable zone.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Proxima_Centauri_2MASS_Atlas.jpg",
    imageCredit: "2MASS / NASA",
    color: "oklch(0.55 0.2 30)",
    stats: [
      { label: "Type", value: "Red Dwarf (M5.5Ve)" },
      { label: "Distance", value: "4.24 light-years" },
      { label: "Mass vs Sun", value: "0.12×" },
      { label: "Age", value: "~4.85 billion years" },
      { label: "Known planets", value: "3" },
    ],
    facts: [
      "Too faint to see with the naked eye despite being closest.",
      "Will live for trillions of years — far longer than the Sun.",
      "Erupts violent flares that bombard its planets.",
    ],
  },
  {
    id: "sirius",
    name: "Sirius",
    category: "stars",
    tagline: "The brightest star in our sky",
    description:
      "A binary system 8.6 light-years away. Sirius A is twice the Sun's mass; its white dwarf companion Sirius B is the size of Earth but as heavy as the Sun.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Sirius_A_and_B_Hubble_photo.jpg",
    imageCredit: "NASA / Hubble",
    color: "oklch(0.95 0.05 240)",
    stats: [
      { label: "Type", value: "A1V + White Dwarf" },
      { label: "Distance", value: "8.6 light-years" },
      { label: "Mass vs Sun", value: "2.06×" },
      { label: "Luminosity vs Sun", value: "25.4×" },
      { label: "Apparent magnitude", value: "-1.46" },
    ],
    facts: [
      "Known as the 'Dog Star' from the constellation Canis Major.",
      "Egyptians timed the Nile floods by its heliacal rising.",
      "Sirius B was the first white dwarf ever discovered.",
    ],
  },

  // ---------- GALAXIES ----------
  {
    id: "milky-way",
    name: "Milky Way",
    category: "galaxies",
    tagline: "Our home galaxy",
    description:
      "A barred spiral galaxy containing 100–400 billion stars. The Sun orbits its center once every 225 million years.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Milky_Way_Arch.jpg",
    imageCredit: "ESO / B. Tafreshi",
    color: "oklch(0.7 0.12 280)",
    stats: [
      { label: "Type", value: "Barred Spiral" },
      { label: "Diameter", value: "~100,000 light-years" },
      { label: "Stars", value: "100–400 billion" },
      { label: "Central black hole", value: "Sagittarius A*" },
      { label: "Age", value: "~13.6 billion years" },
    ],
    facts: [
      "We orbit at 828,000 km/h around the galactic center.",
      "Will collide with Andromeda in ~4.5 billion years.",
      "Contains at least 100 billion planets.",
    ],
  },
  {
    id: "andromeda",
    name: "Andromeda (M31)",
    category: "galaxies",
    tagline: "Our galactic twin, closing in",
    description:
      "The nearest major spiral galaxy, 2.5 million light-years away. It's heading toward us at 110 km/s and will eventually merge with the Milky Way.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg",
    imageCredit: "Adam Evans",
    color: "oklch(0.7 0.12 290)",
    stats: [
      { label: "Type", value: "Barred Spiral" },
      { label: "Distance", value: "2.537 million light-years" },
      { label: "Diameter", value: "~220,000 light-years" },
      { label: "Stars", value: "~1 trillion" },
      { label: "Approach speed", value: "110 km/s" },
    ],
    facts: [
      "Visible to the naked eye as a faint smudge.",
      "The merger will form a new galaxy nicknamed 'Milkomeda'.",
      "Has at least 14 satellite galaxies.",
    ],
  },
  {
    id: "whirlpool",
    name: "Whirlpool Galaxy (M51)",
    category: "galaxies",
    tagline: "A cosmic dance partner",
    description:
      "M51 is an iconic face-on spiral interacting with smaller galaxy NGC 5195 — a textbook example of gravitational tides shaping galactic arms.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Messier51.jpg",
    imageCredit: "NASA / Hubble",
    color: "oklch(0.65 0.15 280)",
    stats: [
      { label: "Type", value: "Grand Design Spiral" },
      { label: "Distance", value: "~31 million light-years" },
      { label: "Diameter", value: "~76,000 light-years" },
      { label: "Constellation", value: "Canes Venatici" },
    ],
    facts: [
      "First galaxy where spiral structure was identified (1845).",
      "Interaction triggers intense star formation.",
    ],
  },

  // ---------- BLACK HOLES ----------
  {
    id: "sagittarius-a",
    name: "Sagittarius A*",
    category: "black-holes",
    tagline: "The monster at our galaxy's heart",
    description:
      "The supermassive black hole at the center of the Milky Way, 26,000 light-years from Earth. Imaged for the first time in 2022 by the Event Horizon Telescope.",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/EHT_Saggitarius_A_black_hole.tif",
    imageCredit: "EHT Collaboration",
    color: "oklch(0.7 0.2 60)",
    stats: [
      { label: "Type", value: "Supermassive Black Hole" },
      { label: "Mass", value: "4.15 million Suns" },
      { label: "Distance", value: "26,000 light-years" },
      { label: "Event horizon", value: "~24 million km" },
    ],
    facts: [
      "Stars orbit it at up to 5,000 km/s.",
      "Despite its mass, it's relatively quiet — only sips gas.",
      "Light from it bends around itself due to extreme gravity.",
    ],
  },
  {
    id: "m87",
    name: "M87*",
    category: "black-holes",
    tagline: "The first black hole ever photographed",
    description:
      "A monstrous 6.5 billion solar-mass black hole in galaxy M87. Its first image, released in 2019, showed the shadow predicted by Einstein a century earlier.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg",
    imageCredit: "EHT Collaboration",
    color: "oklch(0.7 0.2 50)",
    stats: [
      { label: "Type", value: "Supermassive Black Hole" },
      { label: "Mass", value: "6.5 billion Suns" },
      { label: "Distance", value: "55 million light-years" },
      { label: "Event horizon", value: "~38 billion km" },
    ],
    facts: [
      "First direct image of a black hole, released April 2019.",
      "Powers a relativistic jet 5,000 light-years long.",
      "Its shadow is larger than our solar system.",
    ],
  },
  {
    id: "white-hole",
    name: "White Holes",
    category: "black-holes",
    tagline: "The theoretical opposite",
    description:
      "A hypothetical region of spacetime that cannot be entered from outside — only matter and light can escape. Allowed by general relativity but never observed.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Black_hole_-_Messier_87.jpg",
    imageCredit: "EHT Collaboration (conceptual)",
    color: "oklch(0.95 0.05 270)",
    stats: [
      { label: "Status", value: "Hypothetical" },
      { label: "Predicted by", value: "General Relativity" },
      { label: "Observed", value: "Never" },
    ],
    facts: [
      "Mathematically a time-reversed black hole.",
      "Some theorists link them to the Big Bang itself.",
      "Would violate the second law of thermodynamics if eternal.",
    ],
  },

  // ---------- NEBULAE ----------
  {
    id: "orion-nebula",
    name: "Orion Nebula (M42)",
    category: "nebulae",
    tagline: "A stellar nursery in Orion's sword",
    description:
      "One of the brightest nebulae in the sky, M42 is a vast cloud of gas and dust where new stars are being born right now, only 1,344 light-years away.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.65 0.2 25)",
    stats: [
      { label: "Type", value: "Diffuse / Emission Nebula" },
      { label: "Distance", value: "1,344 light-years" },
      { label: "Diameter", value: "~24 light-years" },
      { label: "Stars forming", value: "~700" },
    ],
    facts: [
      "Visible to the naked eye in Orion's sword.",
      "Contains the Trapezium Cluster of young hot stars.",
      "One of the most photographed objects in the sky.",
    ],
  },
  {
    id: "pillars-of-creation",
    name: "Pillars of Creation",
    category: "nebulae",
    tagline: "Hubble's most iconic image",
    description:
      "Towering columns of cold gas and dust in the Eagle Nebula (M16), being slowly eroded by ultraviolet light from nearby young stars.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.6 0.18 50)",
    stats: [
      { label: "Located in", value: "Eagle Nebula (M16)" },
      { label: "Distance", value: "~6,500 light-years" },
      { label: "Height", value: "~4–5 light-years tall" },
    ],
    facts: [
      "May already be destroyed — we'd see it in ~1,000 years.",
      "First imaged by Hubble in 1995, revisited by JWST in 2022.",
      "Each pillar is a star-forming region.",
    ],
  },
  {
    id: "crab-nebula",
    name: "Crab Nebula (M1)",
    category: "nebulae",
    tagline: "The aftermath of a supernova",
    description:
      "The expanding remnant of a star that exploded in 1054 AD — bright enough to be recorded by Chinese astronomers. At its heart spins a pulsar 30 times a second.",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.65 0.2 320)",
    stats: [
      { label: "Type", value: "Supernova Remnant" },
      { label: "Distance", value: "6,500 light-years" },
      { label: "Diameter", value: "~11 light-years" },
      { label: "Pulsar spin", value: "30.2 rotations/sec" },
    ],
    facts: [
      "Still expanding at 1,500 km/s.",
      "Visible in daylight when the supernova occurred in 1054.",
      "The pulsar at its center is a neutron star.",
    ],
  },

  // ---------- METEORS ----------
  {
    id: "halleys-comet",
    name: "Halley's Comet",
    category: "meteors",
    tagline: "The 76-year visitor",
    description:
      "The most famous periodic comet, Halley returns every 75–76 years. It last visited in 1986 and won't return until 2061. Its debris causes two annual meteor showers.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Lspn_comet_halley.jpg",
    imageCredit: "NASA / W. Liller",
    color: "oklch(0.8 0.15 200)",
    stats: [
      { label: "Type", value: "Periodic Comet" },
      { label: "Orbital period", value: "75–76 years" },
      { label: "Nucleus", value: "11 × 8 × 8 km" },
      { label: "Next perihelion", value: "July 28, 2061" },
    ],
    facts: [
      "Causes the Eta Aquariids (May) and Orionids (October) showers.",
      "First identified as periodic by Edmond Halley in 1705.",
      "Visited by 5 spacecraft in 1986.",
    ],
  },
  {
    id: "chelyabinsk",
    name: "Chelyabinsk Meteor",
    category: "meteors",
    tagline: "The 2013 Russian airburst",
    description:
      "A 20-meter asteroid that exploded over Russia in February 2013, releasing 30× the energy of the Hiroshima bomb and injuring 1,500 people from shattered glass.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/2013_Chelyabinsk_meteor_trace.jpg",
    imageCredit: "Aleksandr Ivanov / CC BY-SA 3.0 (Wikimedia Commons)",
    color: "oklch(0.7 0.2 60)",
    stats: [
      { label: "Date", value: "Feb 15, 2013" },
      { label: "Diameter", value: "~20 m" },
      { label: "Mass", value: "~13,000 tons" },
      { label: "Energy released", value: "~440 kilotons TNT" },
      { label: "Speed", value: "19 km/s" },
    ],
    facts: [
      "Brightest object since the 1908 Tunguska event.",
      "Detected by infrasound stations worldwide.",
      "Largest fragment (650 kg) recovered from Lake Chebarkul.",
    ],
  },
  {
    id: "oumuamua",
    name: "ʻOumuamua",
    category: "meteors",
    tagline: "The first known interstellar visitor",
    description:
      "Discovered in 2017, this cigar-shaped object came from outside our solar system. Its odd shape and unexplained acceleration sparked wild theories — including alien probe.",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Combined_deep_image_of_%60Oumuamua_from_the_VLT_and_other_telescopes_%28annotated%29_%28eso1737b%29.jpg",
    imageCredit: "ESO / M. Kornmesser",
    color: "oklch(0.6 0.1 30)",
    stats: [
      { label: "Type", value: "Interstellar Object" },
      { label: "Discovered", value: "Oct 19, 2017" },
      { label: "Length", value: "~100–1000 m" },
      { label: "Speed", value: "26.33 km/s (relative to Sun)" },
    ],
    facts: [
      "Name means 'scout' in Hawaiian.",
      "Showed non-gravitational acceleration leaving the solar system.",
      "Already too distant to study by 2018.",
    ],
  },
  // ---------- ADDITIONAL PLANETS / DWARF PLANETS ----------
  {
    id: "pluto",
    name: "Pluto",
    category: "planets",
    tagline: "The reclassified dwarf with a heart",
    description:
      "Demoted from planet to dwarf planet in 2006, Pluto remains one of the most surprising worlds in the solar system. New Horizons revealed nitrogen glaciers, towering ice mountains, and a giant heart-shaped plain called Tombaugh Regio.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/1024px-Pluto_in_True_Color_-_High-Res.jpg",
    imageCredit: "NASA / Johns Hopkins APL / SwRI",
    color: "oklch(0.7 0.06 50)",
    stats: [
      { label: "Moons", value: "5 (Charon largest)" },
      { label: "Gravity vs Earth", value: "0.063 g" },
      { label: "Day length", value: "6.4 Earth days" },
      { label: "Year length", value: "248 Earth years" },
      { label: "Diameter", value: "2,377 km" },
      { label: "Surface Temp", value: "-229 °C" },
    ],
    facts: [
      "Smaller than Earth's Moon.",
      "Pluto and Charon are tidally locked to each other.",
      "Has a thin nitrogen atmosphere that freezes in winter.",
    ],
    extras: {
      classification: "Dwarf planet, Kuiper Belt Object",
      discovery: "Discovered by Clyde Tombaugh in 1930 at Lowell Observatory.",
      nameOrigin: "Named by 11-year-old Venetia Burney after the Roman god of the underworld.",
      composition:
        "Rocky core surrounded by a thick mantle of water ice and a nitrogen-methane surface.",
      notableMissions: ["New Horizons (2015 flyby)"],
    },
  },
  {
    id: "ceres",
    name: "Ceres",
    category: "planets",
    tagline: "Queen of the asteroid belt",
    description:
      "The largest object in the asteroid belt and the only dwarf planet in the inner solar system. Ceres hosts bright salt deposits and may harbor a subsurface ocean.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/PIA19562-Ceres-DwarfPlanet-Dawn-RC3-image19-20150506.jpg/1024px-PIA19562-Ceres-DwarfPlanet-Dawn-RC3-image19-20150506.jpg",
    imageCredit: "NASA / Dawn",
    color: "oklch(0.7 0.04 80)",
    stats: [
      { label: "Classification", value: "Dwarf Planet" },
      { label: "Diameter", value: "940 km" },
      { label: "Day length", value: "9 hours" },
      { label: "Year length", value: "4.6 Earth years" },
      { label: "Discovered", value: "Jan 1, 1801" },
    ],
    facts: [
      "The brightest spots in Occator Crater are sodium carbonate salts.",
      "Contains 25% of the total mass of the asteroid belt.",
      "Likely has a layer of briny water beneath its surface.",
    ],
    extras: {
      discovery:
        "Found by Giuseppe Piazzi — originally classified as a planet for 50 years before being demoted to asteroid, then promoted to dwarf planet.",
      nameOrigin: "Named after the Roman goddess of agriculture.",
      notableMissions: ["Dawn (2015–2018 orbital survey)"],
    },
  },

  // ---------- ADDITIONAL MOONS ----------
  {
    id: "io",
    name: "Io",
    category: "moons",
    tagline: "The most volcanic world in the solar system",
    description:
      "Io is squeezed and stretched by Jupiter's immense gravity, generating enough internal heat to power 400+ active volcanoes. Its surface is a sulfurous yellow-orange canvas constantly being repaved by lava.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/1024px-Io_highest_resolution_true_color.jpg",
    imageCredit: "NASA / Galileo",
    color: "oklch(0.85 0.16 90)",
    stats: [
      { label: "Orbits", value: "Jupiter" },
      { label: "Diameter", value: "3,643 km" },
      { label: "Gravity vs Earth", value: "0.183 g" },
      { label: "Surface Temp", value: "-130 °C avg / 1,600 °C lava" },
      { label: "Orbital period", value: "1.77 Earth days" },
    ],
    facts: [
      "Volcanic plumes rise 500 km above the surface.",
      "Tidal flexing of Io produces 100× more heat than Earth's interior.",
      "Has almost no impact craters — its surface is constantly resurfaced.",
    ],
    extras: {
      discovery: "Discovered by Galileo Galilei in 1610 — one of the four Galilean moons.",
      composition:
        "Silicate rock with an iron-sulfide core and crust coated in sulfur and SO₂ frost.",
      notableMissions: ["Voyager 1/2", "Galileo", "Juno (recent close flybys)"],
    },
  },
  {
    id: "ganymede",
    name: "Ganymede",
    category: "moons",
    tagline: "The largest moon in the solar system",
    description:
      "Jupiter's giant moon Ganymede is bigger than Mercury and the only moon known to have its own magnetic field. Beneath its icy crust lies a saltwater ocean believed to hold more water than all of Earth's oceans combined.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Moon_Ganymede_by_NOAA.jpg/1024px-Moon_Ganymede_by_NOAA.jpg",
    imageCredit: "NASA / Galileo",
    color: "oklch(0.75 0.03 70)",
    stats: [
      { label: "Orbits", value: "Jupiter" },
      { label: "Diameter", value: "5,268 km" },
      { label: "Gravity vs Earth", value: "0.146 g" },
      { label: "Orbital period", value: "7.15 Earth days" },
      { label: "Ocean depth", value: "~100 km" },
    ],
    facts: [
      "Bigger than the planet Mercury.",
      "Only moon known to have a magnetic field.",
      "ESA's JUICE mission will orbit it from 2034.",
    ],
    extras: {
      discovery: "Discovered by Galileo in 1610.",
      notableMissions: ["Voyager", "Galileo", "Juno", "JUICE (arriving 2031, orbit 2034)"],
    },
  },
  {
    id: "enceladus",
    name: "Enceladus",
    category: "moons",
    tagline: "Saturn's geyser moon",
    description:
      "This tiny, brilliantly white moon erupts jets of water vapor and ice from its south pole, fed by a subsurface ocean. Cassini flew through those plumes — and tasted the ingredients for life.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/PIA17202_-_Approaching_Enceladus.jpg/1024px-PIA17202_-_Approaching_Enceladus.jpg",
    imageCredit: "NASA / Cassini",
    color: "oklch(0.95 0.01 220)",
    stats: [
      { label: "Orbits", value: "Saturn" },
      { label: "Diameter", value: "504 km" },
      { label: "Gravity vs Earth", value: "0.0113 g" },
      { label: "Surface Temp", value: "-198 °C" },
      { label: "Ice shell", value: "~30 km thick" },
    ],
    facts: [
      "Whitest body in the solar system (reflects 99% of sunlight).",
      "Cassini detected hydrogen — a chemical food source for microbes.",
      "Source of Saturn's E-ring.",
    ],
    extras: {
      composition: "Water-ice crust over a global liquid ocean and rocky core.",
      notableMissions: ["Cassini (2004–2017)"],
    },
  },

  // ---------- ADDITIONAL STARS ----------
  {
    id: "polaris",
    name: "Polaris",
    category: "stars",
    tagline: "The North Star",
    description:
      "Polaris sits almost directly above Earth's north rotational axis, making it appear stationary while the sky wheels around it. It's actually a triple-star system dominated by a pulsating yellow supergiant.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Polaris_alpha_ursae_minoris.jpg/1024px-Polaris_alpha_ursae_minoris.jpg",
    imageCredit: "NASA / Hubble",
    color: "oklch(0.9 0.05 90)",
    stats: [
      { label: "Type", value: "Yellow Supergiant + 2 companions" },
      { label: "Distance", value: "~433 light-years" },
      { label: "Mass vs Sun", value: "5.4×" },
      { label: "Luminosity vs Sun", value: "~1,260×" },
      { label: "Variable period", value: "3.97 days" },
    ],
    facts: [
      "Has been used for navigation for over 1,500 years.",
      "Won't be the pole star forever — Earth's axis wobbles.",
      "Brightens and dims as it pulsates.",
    ],
    extras: {
      classification: "Classical Cepheid variable",
      nameOrigin: "From the Greek 'polos' meaning axis or pivot.",
    },
  },
  {
    id: "vy-canis-majoris",
    name: "VY Canis Majoris",
    category: "stars",
    tagline: "One of the largest stars known",
    description:
      "A red hypergiant so vast that if placed in our solar system, its surface would extend beyond the orbit of Jupiter. It's shedding mass at a furious rate and will end in a supernova or hypernova.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/VY_Canis_Majoris.jpg",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.55 0.18 25)",
    stats: [
      { label: "Type", value: "Red Hypergiant" },
      { label: "Distance", value: "~3,820 light-years" },
      { label: "Radius vs Sun", value: "~1,420×" },
      { label: "Mass vs Sun", value: "~17×" },
      { label: "Luminosity vs Sun", value: "~270,000×" },
    ],
    facts: [
      "Light would take 8.5 hours to circle its surface.",
      "Losing mass 30 million times faster than the Sun.",
      "Surrounded by a complex nebula of its own expelled gas.",
    ],
  },

  // ---------- ADDITIONAL GALAXIES ----------
  {
    id: "triangulum",
    name: "Triangulum Galaxy (M33)",
    category: "galaxies",
    tagline: "The third member of our Local Group",
    description:
      "The third-largest galaxy in the Local Group after Andromeda and the Milky Way. M33 is a face-on spiral with intense star-forming regions and may be a satellite of Andromeda.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/VST_snaps_a_very_detailed_view_of_the_Triangulum_Galaxy.jpg/1024px-VST_snaps_a_very_detailed_view_of_the_Triangulum_Galaxy.jpg",
    imageCredit: "ESO",
    color: "oklch(0.65 0.15 270)",
    stats: [
      { label: "Type", value: "Spiral (Sc)" },
      { label: "Distance", value: "~2.73 million light-years" },
      { label: "Diameter", value: "~60,000 light-years" },
      { label: "Stars", value: "~40 billion" },
      { label: "Constellation", value: "Triangulum" },
    ],
    facts: [
      "Visible to the naked eye under exceptionally dark skies.",
      "Hosts NGC 604, one of the largest known star-forming regions.",
      "Likely bound gravitationally to Andromeda.",
    ],
  },
  {
    id: "ngc-1300",
    name: "NGC 1300",
    category: "galaxies",
    tagline: "A textbook barred spiral",
    description:
      "Located in Eridanus, NGC 1300 is one of the most photographed barred spiral galaxies — its perfectly defined bar and grand spiral arms are a benchmark for galactic morphology studies.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/NGC1300.jpg",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.7 0.12 260)",
    stats: [
      { label: "Type", value: "Barred Spiral (SBbc)" },
      { label: "Distance", value: "~61 million light-years" },
      { label: "Diameter", value: "~110,000 light-years" },
    ],
    facts: [
      "Bar is roughly 50,000 light-years across.",
      "Spiral arms host vigorous star formation.",
    ],
  },

  // ---------- ADDITIONAL BLACK HOLES ----------
  {
    id: "ton-618",
    name: "TON 618",
    category: "black-holes",
    tagline: "One of the most massive black holes known",
    description:
      "An ultramassive black hole at the heart of a hyperluminous quasar — its mass is 66 billion Suns. The brilliant quasar it powers shines from 18.2 billion light-years away.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/TON_618_SDSS9_version_2.jpg",
    imageCredit: "SDSS / public domain",
    color: "oklch(0.6 0.18 40)",
    stats: [
      { label: "Type", value: "Ultramassive Black Hole" },
      { label: "Mass", value: "~66 billion Suns" },
      { label: "Distance", value: "~18.2 billion light-years" },
      { label: "Event horizon", value: "~390 billion km" },
    ],
    facts: [
      "Its event horizon is 40× the size of Neptune's orbit.",
      "Quasar luminosity exceeds 100 trillion Suns.",
      "Identified in the Tonantzintla catalog (Mexico) in the 1950s.",
    ],
  },
  {
    id: "cygnus-x-1",
    name: "Cygnus X-1",
    category: "black-holes",
    tagline: "The first confirmed black hole",
    description:
      "Discovered as an intense X-ray source in 1964, Cygnus X-1 is a stellar-mass black hole greedily devouring its blue supergiant companion. Its 1974 confirmation settled a famous bet between Stephen Hawking and Kip Thorne.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cygnus_X-1.jpg",
    imageCredit: "DSS / public domain",
    color: "oklch(0.55 0.2 240)",
    stats: [
      { label: "Type", value: "Stellar-mass Black Hole" },
      { label: "Mass", value: "~21 Suns" },
      { label: "Distance", value: "~7,200 light-years" },
      { label: "Companion", value: "HDE 226868 (blue supergiant)" },
    ],
    facts: [
      "Hawking conceded his bet against its existence in 1990.",
      "Pulls a stream of gas from its supergiant companion.",
      "Spins at >95% the speed of light.",
    ],
  },

  // ---------- ADDITIONAL NEBULAE ----------
  {
    id: "carina-nebula",
    name: "Carina Nebula",
    category: "nebulae",
    tagline: "JWST's first showcase",
    description:
      "A vast star-forming complex in the southern sky containing some of the most luminous stars known, including the unstable Eta Carinae. JWST's first 'Cosmic Cliffs' image revealed pillars of newborn stars in stunning detail.",
    image: "https://cdn.esawebb.org/archives/images/screen/weic2205b.jpg",
    imageCredit: "NASA / ESA / CSA / STScI / JWST",
    color: "oklch(0.7 0.18 25)",
    stats: [
      { label: "Type", value: "Emission Nebula" },
      { label: "Distance", value: "~8,500 light-years" },
      { label: "Diameter", value: "~460 light-years" },
      { label: "Constellation", value: "Carina" },
    ],
    facts: [
      "Hosts Eta Carinae, a star that could go supernova at any moment.",
      "Four times larger than the Orion Nebula.",
      "JWST's debut image of the 'Cosmic Cliffs' was taken here.",
    ],
  },
  {
    id: "helix-nebula",
    name: "Helix Nebula (NGC 7293)",
    category: "nebulae",
    tagline: "The 'Eye of God'",
    description:
      "One of the closest planetary nebulae to Earth — the final exhalation of a dying Sun-like star. Its eerie eye-like glow comes from gas heated by the central white dwarf.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC7293_%282004%29.jpg/1024px-NGC7293_%282004%29.jpg",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.65 0.18 200)",
    stats: [
      { label: "Type", value: "Planetary Nebula" },
      { label: "Distance", value: "~655 light-years" },
      { label: "Diameter", value: "~2.5 light-years" },
      { label: "Central star", value: "White dwarf" },
    ],
    facts: [
      "Glimpse of our Sun's fate in ~5 billion years.",
      "Nicknamed the 'Eye of God' for its striking appearance.",
      "Contains thousands of comet-like 'cometary knots'.",
    ],
  },

  // ---------- ADDITIONAL METEORS / ASTEROIDS ----------
  {
    id: "bennu",
    name: "Bennu",
    category: "meteors",
    tagline: "The asteroid we touched",
    description:
      "A carbon-rich near-Earth asteroid sampled by NASA's OSIRIS-REx in 2020. Its returned samples — delivered to Earth in 2023 — preserve organic molecules from the dawn of the solar system.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bennu_mosaic_OSIRIS-REx.jpg/1024px-Bennu_mosaic_OSIRIS-REx.jpg",
    imageCredit: "NASA / OSIRIS-REx",
    color: "oklch(0.4 0.04 40)",
    stats: [
      { label: "Type", value: "B-type Carbonaceous Asteroid" },
      { label: "Diameter", value: "~492 m" },
      { label: "Discovered", value: "Sep 11, 1999" },
      { label: "Sample mass", value: "~121.6 g returned" },
      { label: "Impact risk", value: "1-in-1,750 by 2300" },
    ],
    facts: [
      "Sample contains water and carbon — building blocks of life.",
      "Surface is a rubble pile of loose boulders.",
      "Has a tiny chance of impacting Earth in 2182.",
    ],
    extras: {
      notableMissions: ["OSIRIS-REx (2018–2023)", "OSIRIS-APEX (continuing mission)"],
    },
  },
  {
    id: "borisov",
    name: "2I/Borisov",
    category: "meteors",
    tagline: "The second interstellar visitor",
    description:
      "Discovered in 2019 by amateur astronomer Gennadiy Borisov, this was the first confirmed interstellar comet — clearly displaying a tail and coma like a familiar comet, but from another star system.",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Borisov_Hubble_first_image.png",
    imageCredit: "NASA / ESA / Hubble",
    color: "oklch(0.75 0.1 200)",
    stats: [
      { label: "Type", value: "Interstellar Comet" },
      { label: "Discovered", value: "Aug 30, 2019" },
      { label: "Nucleus", value: "~0.5 km" },
      { label: "Speed", value: "32.2 km/s (hyperbolic)" },
    ],
    facts: [
      "First confirmed interstellar comet.",
      "Tail contains carbon monoxide at unusually high levels.",
      "Now leaving the solar system, never to return.",
    ],
  },
];

export const getBody = (id: string) => bodies.find((b) => b.id === id);
export const byCategory = (cat: Category) => bodies.filter((b) => b.category === cat);

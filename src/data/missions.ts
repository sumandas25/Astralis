export type MissionStatus = "active" | "upcoming" | "completed" | "cruise";

export interface Mission {
  id: string;
  name: string;
  agency: string;
  country: string;
  flag: string;
  target: string;
  launched: string;
  status: MissionStatus;
  summary: string;
  highlights: string[];
  image: string;
}

export const missions: Mission[] = [
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    agency: "NASA / ESA / CSA",
    country: "International",
    flag: "🌍",
    target: "Deep Space (L2)",
    launched: "Dec 25, 2021",
    status: "active",
    summary:
      "The largest, most powerful space telescope ever built — peering back to the first galaxies that formed after the Big Bang.",
    highlights: [
      "6.5 m gold-coated primary mirror",
      "Sees in infrared through cosmic dust",
      "Imaged the most distant galaxies ever observed",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/James_Webb_Primary_Mirror.jpg/1024px-James_Webb_Primary_Mirror.jpg",
  },
  {
    id: "artemis",
    name: "Artemis Program",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "The Moon",
    launched: "Nov 16, 2022 (Artemis I)",
    status: "active",
    summary:
      "NASA's flagship program to return humans to the Moon and establish a sustainable lunar presence — paving the way for Mars.",
    highlights: [
      "Artemis II: first crewed lunar flyby in Sept 2025",
      "Artemis III will land the first woman on the Moon",
      "Lunar Gateway space station planned",
    ],
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Artemis_I_Launch.jpg",
  },
  {
    id: "chandrayaan-3",
    name: "Chandrayaan-3",
    agency: "ISRO",
    country: "India",
    flag: "🇮🇳",
    target: "Lunar South Pole",
    launched: "Jul 14, 2023",
    status: "completed",
    summary:
      "India became the first nation to soft-land near the Moon's south pole — and the fourth ever to land on the Moon.",
    highlights: [
      "Vikram lander touched down Aug 23, 2023",
      "Pragyan rover surveyed the lunar surface",
      "Detected sulfur, aluminum, iron near the pole",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Chandrayaan-3_LVM3_M4_Vehicle_Lifting_off_from_the_Second_Launch_Pad_of_SDSC-SHAR_03.jpg/1024px-Chandrayaan-3_LVM3_M4_Vehicle_Lifting_off_from_the_Second_Launch_Pad_of_SDSC-SHAR_03.jpg",
  },
  {
    id: "tianwen-1",
    name: "Tianwen-1 / Zhurong",
    agency: "CNSA",
    country: "China",
    flag: "🇨🇳",
    target: "Mars",
    launched: "Jul 23, 2020",
    status: "completed",
    summary:
      "China's first independent Mars mission — successfully orbited, landed, and roved on the Red Planet on its first attempt.",
    highlights: [
      "Zhurong rover landed May 14, 2021",
      "Traveled 1.9 km on Utopia Planitia",
      "Found evidence of recent liquid water activity",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Zhurong_rover_and_lander_imaged_by_remote_camera.png/1024px-Zhurong_rover_and_lander_imaged_by_remote_camera.png",
  },
  {
    id: "perseverance",
    name: "Mars 2020 / Perseverance",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "Mars (Jezero Crater)",
    launched: "Jul 30, 2020",
    status: "active",
    summary:
      "Hunting for signs of ancient microbial life and caching samples for future return to Earth. Brought the first helicopter to fly on another world.",
    highlights: [
      "Ingenuity helicopter flew 72 times",
      "Caching 43 rock samples for return",
      "First MOXIE oxygen production on Mars",
    ],
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/NASA%27s_Mars_2020_Perseverance_rover.jpg",
  },
  {
    id: "europa-clipper",
    name: "Europa Clipper",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "Europa (Jupiter)",
    launched: "Oct 14, 2024",
    status: "cruise",
    summary:
      "En route to Jupiter's icy ocean moon, where it will perform 49 close flybys to assess Europa's habitability beneath the ice.",
    highlights: [
      "Arrival at Jupiter: April 2030",
      "Largest spacecraft NASA has built for a planetary mission",
      "Will sample plumes erupting from Europa",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Europa_Clipper_spacecraft_model_-_2.png/1024px-Europa_Clipper_spacecraft_model_-_2.png",
  },
  {
    id: "juice",
    name: "JUICE",
    agency: "ESA",
    country: "European Union",
    flag: "🇪🇺",
    target: "Jovian Moons",
    launched: "Apr 14, 2023",
    status: "cruise",
    summary:
      "Jupiter Icy Moons Explorer — ESA's mission to characterize Ganymede, Europa and Callisto and their potential as habitats.",
    highlights: [
      "Will enter Ganymede orbit in 2034",
      "First mission to orbit a moon other than our own",
      "Performed first Earth–Moon double flyby in 2024",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Juice_spacecraft_model.png/1024px-Juice_spacecraft_model.png",
  },
  {
    id: "parker",
    name: "Parker Solar Probe",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "The Sun",
    launched: "Aug 12, 2018",
    status: "active",
    summary:
      "The fastest human-made object ever. Parker is repeatedly diving through the Sun's corona to unlock the secrets of the solar wind.",
    highlights: [
      "Closest approach: 6.1 million km from the Sun",
      "Top speed: 692,000 km/h",
      "First spacecraft to 'touch' the Sun (2021)",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Parker_Solar_Probe_-_Solar_Array_Cooling_System_Testing_%2826033922387%29.jpg/1024px-Parker_Solar_Probe_-_Solar_Array_Cooling_System_Testing_%2826033922387%29.jpg",
  },
  {
    id: "aditya-l1",
    name: "Aditya-L1",
    agency: "ISRO",
    country: "India",
    flag: "🇮🇳",
    target: "Sun–Earth L1",
    launched: "Sep 2, 2023",
    status: "active",
    summary:
      "India's first dedicated solar observatory, parked at the L1 Lagrange point to continuously study the Sun's corona and solar storms.",
    highlights: [
      "Reached L1 halo orbit in Jan 2024",
      "7 onboard instruments for solar imaging & particles",
      "Captured first images of a major solar flare",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/PSLV-C57_Aditya-L1_Mission_lift_off_03.jpg/1024px-PSLV-C57_Aditya-L1_Mission_lift_off_03.jpg",
  },
  {
    id: "chang-e-6",
    name: "Chang'e 6",
    agency: "CNSA",
    country: "China",
    flag: "🇨🇳",
    target: "Lunar Far Side",
    launched: "May 3, 2024",
    status: "completed",
    summary:
      "The first mission in history to return samples from the far side of the Moon — landing in the South Pole–Aitken basin.",
    highlights: [
      "Returned 1,935 g of lunar far-side samples",
      "Sample return capsule landed June 25, 2024",
      "Opening new chapter in lunar geology",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Chang%27e_6_launch_01.jpg/1024px-Chang%27e_6_launch_01.jpg",
  },
  {
    id: "osiris-apex",
    name: "OSIRIS-APEX",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "Asteroid Apophis",
    launched: "Sep 8, 2016",
    status: "cruise",
    summary:
      "After delivering Bennu samples to Earth, the OSIRIS-REx spacecraft was rechristened APEX to chase asteroid Apophis during its 2029 Earth flyby.",
    highlights: [
      "Bennu samples returned Sep 24, 2023",
      "Will rendezvous with Apophis in April 2029",
      "Studying how Earth's gravity reshapes asteroids",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/OSIRIS-REx_artist_rendering.png/1024px-OSIRIS-REx_artist_rendering.png",
  },
  {
    id: "dart",
    name: "DART",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "Asteroid Dimorphos",
    launched: "Nov 24, 2021",
    status: "completed",
    summary:
      "Humanity's first planetary defense test — DART slammed into asteroid Dimorphos to prove we can deflect a threatening space rock.",
    highlights: [
      "Impacted Sep 26, 2022 at 22,500 km/h",
      "Shortened Dimorphos' orbit by 33 minutes",
      "ESA's Hera follow-up arrives in 2026",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/DART_-_spacecraft_model_-_2021-Aug-04.png/1024px-DART_-_spacecraft_model_-_2021-Aug-04.png",
  },
  {
    id: "gaganyaan",
    name: "Gaganyaan",
    agency: "ISRO",
    country: "India",
    flag: "🇮🇳",
    target: "Low Earth Orbit",
    launched: "2025–2026 (planned)",
    status: "upcoming",
    summary:
      "India's first crewed orbital spaceflight program — aiming to send three astronauts to a 400 km orbit aboard an indigenously built capsule.",
    highlights: [
      "Crew of 3 for up to 7 days",
      "First uncrewed test flight: 2025",
      "Will make India the 4th nation with independent human spaceflight",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Crew_Module_of_Gaganyaan.jpg/1024px-Crew_Module_of_Gaganyaan.jpg",
  },
  {
    id: "tiangong",
    name: "Tiangong Space Station",
    agency: "CNSA",
    country: "China",
    flag: "🇨🇳",
    target: "Low Earth Orbit",
    launched: "Apr 29, 2021 (Tianhe core)",
    status: "active",
    summary:
      "China's permanently crewed orbital outpost. Three modules host rotating crews of taikonauts conducting microgravity science 380 km above Earth.",
    highlights: [
      "Three-module T-shape configuration",
      "Continuously crewed since June 2022",
      "Hosts the Chinese Space Station Telescope (Xuntian) — coming 2026",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tiangong_space_station_-_Shenzhou_16_post-departure_view_%28cropped%29.png/1024px-Tiangong_space_station_-_Shenzhou_16_post-departure_view_%28cropped%29.png",
  },
  {
    id: "mars-sample-return",
    name: "Mars Sample Return",
    agency: "NASA / ESA",
    country: "International",
    flag: "🌍",
    target: "Mars → Earth",
    launched: "Late 2020s (planned)",
    status: "upcoming",
    summary:
      "The most ambitious robotic mission ever conceived — retrieve the sample tubes cached by Perseverance and ferry them back to Earth.",
    highlights: [
      "First rocket launch from another planet",
      "ESA Earth Return Orbiter to ferry samples home",
      "Samples arrive on Earth in 2030s",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Mars_Sample_Return_-_lander_artist_concept.jpg/1024px-Mars_Sample_Return_-_lander_artist_concept.jpg",
  },
  {
    id: "dragonfly",
    name: "Dragonfly",
    agency: "NASA",
    country: "United States",
    flag: "🇺🇸",
    target: "Titan (Saturn)",
    launched: "Jul 2028 (planned)",
    status: "upcoming",
    summary:
      "A nuclear-powered rotorcraft that will hop across Saturn's moon Titan, studying its complex prebiotic chemistry and methane lakes.",
    highlights: [
      "First flying mission to another moon",
      "Will explore dozens of sites across Titan",
      "Arrives at Titan in 2034",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Dragonfly_on_Titan_%28Artist%27s_Impression%29.png/1024px-Dragonfly_on_Titan_%28Artist%27s_Impression%29.png",
  },
];

export const statusLabel: Record<MissionStatus, string> = {
  active: "Active",
  upcoming: "Upcoming",
  completed: "Completed",
  cruise: "In Transit",
};

export const statusColor: Record<MissionStatus, string> = {
  active: "oklch(0.78 0.18 150)",
  upcoming: "oklch(0.78 0.14 295)",
  completed: "oklch(0.72 0.04 280)",
  cruise: "oklch(0.78 0.15 210)",
};

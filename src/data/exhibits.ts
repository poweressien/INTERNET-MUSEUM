import type { Exhibit } from "@/types";

// Ordered chronologically — this order also drives the catalog / accession numbers.
export const EXHIBITS: Exhibit[] = [
  {
    id: "geocities",
    name: "GeoCities",
    year: 1996,
    eraLabel: "1996–1999",
    category: "personal-web",
    shortDescription:
      "Free homepages organized into themed 'neighborhoods' — the first place millions of people built something of their own online.",
    historicalContext:
      "GeoCities let anyone claim a small plot of web space for free, grouped into neighborhoods like Hollywood or SiliconValley by subject. At its peak it was one of the most-visited destinations on the web — a sprawling, self-decorated city of hit counters, MIDI files, and animated construction banners. Yahoo acquired it in 1999; the U.S. site shut down a decade later, though a chaotic snapshot survives thanks to volunteer archivists.",
    status: "reconstructed",
    accent: "#D6529A",
    hasReconstruction: true,
  },
  {
    id: "google",
    name: "Google",
    year: 1998,
    eraLabel: "1998–Today",
    category: "search",
    shortDescription:
      "A famously empty page with one box in the middle, built by two Stanford students who thought search could be simpler.",
    historicalContext:
      "Larry Page and Sergey Brin launched Google in September 1998 with a homepage defined almost entirely by empty space — a sharp contrast to the cluttered portals of the era. The 'I'm Feeling Lucky' button was a quiet bet on confidence: skip the results page and go straight to the best answer. It would go on to become the default verb for looking something up.",
    status: "reconstructed",
    accent: "#3B78C2",
    hasReconstruction: true,
  },
  {
    id: "myspace",
    name: "MySpace",
    year: 2005,
    eraLabel: "2004–2013",
    category: "social",
    shortDescription:
      "The social network everyone customized into a glittery mess — then, in 2013, tried to reinvent itself as something else entirely.",
    historicalContext:
      "MySpace let members edit their profile's CSS directly, so every page became a small, chaotic act of self-expression — clashing backgrounds, blinking text, and a song that started before the page finished loading. Ranking your 'Top 8' friends was a genuine social event. By 2006 it was briefly the most-visited website in the United States, before Facebook's open registration that same year began pulling its audience away.",
    status: "reconstructed",
    accent: "#22346B",
    hasReconstruction: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    year: 2006,
    eraLabel: "2005–2017",
    category: "video",
    shortDescription:
      "Three former PayPal employees' video-sharing side project, bought by Google before its second birthday.",
    historicalContext:
      "YouTube launched in February 2005 with a simple pitch: paste in a video file, get a link anyone could watch without downloading anything. It rated videos with five stars long before the thumbs-up icon existed, and by October 2006 — barely 18 months after launch — Google acquired it for $1.65 billion in stock.",
    status: "reconstructed",
    accent: "#C23B3B",
    hasReconstruction: true,
  },
  {
    id: "facebook",
    name: "Facebook",
    year: 2007,
    eraLabel: "2004–2011",
    category: "social",
    shortDescription:
      "From a Harvard-only directory to the 2011 Timeline redesign — including the feature-phone version most of Africa first met Facebook through.",
    historicalContext:
      "Facebook opened to the public in September 2006 after two years as a college-only network, and by 2007 it had launched the Facebook Platform, letting outside developers build apps on top of it. Profiles were arranged around 'The Wall' — a literal metaphor for writing on someone's page — while the News Feed, introduced in 2006, was still controversial enough that students had organized protest groups against it. The 2011 Timeline redesign then replaced the Wall with a scrollable life story. Separately, 'Facebook for Every Phone' (2011) — built on Snaptu's technology and often reached through a data-compressing browser like Opera Mini — brought Facebook to basic Java handsets, and was how a huge number of people across Africa and Asia actually first used it.",
    status: "reconstructed",
    accent: "#3B5998",
    hasReconstruction: true,
  },
  {
    id: "twitter",
    name: "Twitter",
    year: 2007,
    eraLabel: "2006–2017",
    category: "microblogging",
    shortDescription:
      "From an SMS-only status service to 280 characters and a heart instead of a star — four stops across Twitter's first decade.",
    historicalContext:
      "Twitter launched publicly in 2006 and broke out at SXSW in March 2007, where attendees used it to coordinate in real time and two lobby screens ran the public feed nonstop. There was no retweet button, no photo attachments, and no @-reply convention yet — those all started as habits the community invented, which Twitter later turned into real features.",
    status: "reconstructed",
    accent: "#5FA9E0",
    hasReconstruction: true,
  },
  {
    id: "iphone",
    name: "iPhone",
    year: 2007,
    eraLabel: "2007–2026",
    category: "mobile-os",
    shortDescription:
      "No keyboard, no stylus, no App Store yet — just a grid of icons and a glass screen you touched directly.",
    historicalContext:
      "Steve Jobs introduced the iPhone in January 2007 as 'three revolutionary products' in one device: a phone, an iPod, and an internet communicator. It shipped that June without a native App Store — third-party software arrived only as bookmarked 'web apps' until the App Store opened a year later, in July 2008, which is really when the modern idea of a 'phone full of apps' began.",
    status: "reconstructed",
    accent: "#6FA8DC",
    hasReconstruction: true,
  },
  {
    id: "android",
    name: "Android",
    year: 2008,
    eraLabel: "2008–2026",
    category: "mobile-os",
    shortDescription:
      "Google's answer to the iPhone, first shipped on a phone with a slide-out keyboard and a trackball.",
    historicalContext:
      "The T-Mobile G1 launched in October 2008 as the first commercial Android device, running the plain, utilitarian Android 1.0 — built around a pull-down notification shade that would go on to become one of the most widely copied ideas in mobile software. Android was open-source and licensable, and phone makers everywhere spent the next decade building on top of it.",
    status: "reconstructed",
    accent: "#6BAA3C",
    hasReconstruction: true,
  },
  {
    id: "gmail",
    name: "Gmail",
    year: 2004,
    eraLabel: "2004–Today",
    category: "webmail",
    shortDescription:
      "Announced on April Fools' Day 2004 with 1GB of storage — so much more than rivals offered that plenty of people assumed it was a joke.",
    historicalContext:
      "Gmail launched April 1, 2004, invite-only, offering roughly 500 times the storage of Hotmail at the time and introducing threaded 'conversation view' plus fast, Google-powered search instead of folders you had to manage by hand. Invites became a genuine currency, changing hands on eBay. Google Talk chat arrived in the sidebar in 2006, inbox category tabs (Primary/Social/Promotions) reorganized everyone's mail in 2013, and a 2018 Material redesign brought the cleaner, rounder Gmail most people use today.",
    status: "reconstructed",
    accent: "#D64545",
    hasReconstruction: true,
  },
  {
    id: "yahoo",
    name: "Yahoo",
    year: 1995,
    eraLabel: "1995–Today",
    category: "portal",
    shortDescription:
      "A hand-curated list of links that grew into the busiest, most module-packed homepage on the entire web.",
    historicalContext:
      "Yahoo began in 1994 as 'Jerry and David's Guide to the World Wide Web,' a simple hand-sorted directory built by two Stanford students. By the early 2000s it had become the archetypal internet portal — mail, news, weather, stock tickers, horoscopes and a dozen other modules crammed onto one homepage, on the theory that a portal's job was to be the one page you never needed to leave. Yahoo Mail itself launched in 1997 (as the acquired RocketMail) and was long a top rival to Hotmail and, later, Gmail. As search and social media took over that role, Yahoo's own homepage shrank back down to something much closer to its original self.",
    status: "reconstructed",
    accent: "#7B0099",
    hasReconstruction: true,
  },
];

export function getExhibitById(id: string): Exhibit | undefined {
  return EXHIBITS.find((e) => e.id === id);
}

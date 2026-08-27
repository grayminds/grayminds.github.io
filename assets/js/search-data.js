// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-featured",
          title: "featured",
          description: "Labyrinthian - a vault-backed tabletop RPG dashboard, live in production on Cloudflare.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/featured/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "Agentic AI and automation builds, plus technical and digital archival work, powered by curiosity and Claude Code.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "dropdown-tech-stack",
              title: "Tech Stack",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/tech-stack/";
              },
            },{id: "dropdown-timeline-cat-tested",
              title: "Timeline (Cat Tested)",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/timeline-cats/";
              },
            },{id: "dropdown-publications",
              title: "Publications",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/publications/";
              },
            },{id: "dropdown-labyrinthian",
              title: "Labyrinthian",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/labyrinthian/";
              },
            },{id: "dropdown-gray-minds-llc",
              title: "Gray Minds LLC",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/graymindsllc/";
              },
            },{id: "dropdown-sky-time-studio",
              title: "Sky Time Studio",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/skytimestudio/";
              },
            },{id: "post-chasing-a-20x-spawn-tax",
        
          title: "Chasing a 20x Spawn Tax",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/b-chasing-a-spawn-tax/";
          
        },
      },{id: "post-the-night-the-dead-man-switch-earned-its-keep",
        
          title: "The Night the Dead-Man Switch Earned Its Keep",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-security-on-the-critical-path/";
          
        },
      },{id: "post-panels-that-earn-their-place",
        
          title: "Panels That Earn Their Place",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/b-panels-that-earn-their-place/";
          
        },
      },{id: "post-wiring-the-dead-man-switch",
        
          title: "Wiring the Dead-Man Switch",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/b-dead-man-switch-wiring/";
          
        },
      },{id: "post-a-dead-man-switch-for-agent-memory",
        
          title: "A Dead-Man Switch for Agent Memory",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-dead-man-switch-for-agent-memory/";
          
        },
      },{id: "post-from-mission-control-to-compass-rose",
        
          title: "From Mission Control to compass-rose",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-mission-control-to-compass-rose/";
          
        },
      },{id: "post-how-i-use-claude-code",
        
          title: "How I Use Claude Code",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/how-i-use-claude-code/";
          
        },
      },{id: "post-the-boris-checkride-scorecard",
        
          title: "The Boris Checkride Scorecard",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/b-boris-checkride-scorecard/";
          
        },
      },{id: "post-the-checkride-one-day-against-the-boris-playbook",
        
          title: "The Checkride: One Day Against the Boris Playbook",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-boris-playbook-checkride/";
          
        },
      },{id: "post-errors-of-omission-and-commission",
        
          title: "Errors of Omission and Commission",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/errors-of-omission-and-commission/";
          
        },
      },{id: "post-when-the-ai-memory-lied",
        
          title: "When the (AI) Memory Lied",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/when-the-memory-lied/";
          
        },
      },{id: "post-don-39-t-hang-the-test-shots",
        
          title: "Don&#39;t Hang the Test Shots",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/d-media-studio/";
          
        },
      },{id: "post-show-the-trailer-keep-the-ending",
        
          title: "Show the Trailer, Keep the Ending",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/c-teasers-without-leaks/";
          
        },
      },{id: "post-players-gms-and-the-screen-between-them",
        
          title: "Players, GMs, and the Screen Between Them",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/b-players-gms-screen/";
          
        },
      },{id: "post-the-painting-of-change",
        
          title: "The Painting of Change",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-painting-of-change/";
          
        },
      },{id: "post-keeping-the-transcripts",
        
          title: "Keeping the Transcripts",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/keeping-the-transcripts/";
          
        },
      },{id: "post-two-apps-and-a-sticky-note",
        
          title: "Two Apps and a Sticky Note",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/two-apps-sticky-note/";
          
        },
      },{id: "post-a-sign-says-please-a-fence-says-no",
        
          title: "A Sign Says Please.  A Fence Says No.",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/fence-not-a-sign/";
          
        },
      },{id: "post-the-bag-you-carry-every-day",
        
          title: "The Bag You Carry Every Day",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/slimming-session-start-context/";
          
        },
      },{id: "post-it-didn-39-t-need-a-new-home-it-needed-a-better-window",
        
          title: "It Didn&#39;t Need a New Home, It Needed a Better Window",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ttrpg-dashboard-vault-backed/";
          
        },
      },{id: "post-let-the-assistant-do-the-voices",
        
          title: "Let the Assistant Do the Voices",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/tonespeak-dialect-switch/";
          
        },
      },{id: "post-the-menu-that-has-no-opinions",
        
          title: "The Menu That Has No Opinions",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/cnc-menu-terminal-front-door/";
          
        },
      },{id: "post-beyond-mission-control-khimai",
        
          title: "Beyond Mission Control: KHIMAI",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/f-beyond-mission-control-khimai/";
          
        },
      },{id: "post-mission-foundations-operating-the-room",
        
          title: "Mission Foundations: Operating the Room",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/e-operating-the-room/";
          
        },
      },{id: "post-mission-foundations-from-disk-to-dashboard",
        
          title: "Mission Foundations: From Disk to Dashboard",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/d-disk-to-dashboard/";
          
        },
      },{id: "post-mission-foundations-behind-the-curtain",
        
          title: "Mission Foundations: Behind the Curtain",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/c-mission-foundations-tech-specs/";
          
        },
      },{id: "post-mission-foundations-where-things-live",
        
          title: "Mission Foundations: Where Things Live",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/b-mission-foundations/";
          
        },
      },{id: "post-entropic-drift",
        
          title: "Entropic Drift",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-entropic-drift/";
          
        },
      },{id: "post-the-future-caught-up-to-the-past",
        
          title: "The Future Caught Up to the Past",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/future-catching-up-to-the-past/";
          
        },
      },{id: "post-claude-code-obsidian-the-addiction-nobody-warned-me-about",
        
          title: "Claude Code + Obsidian: The Addiction Nobody Warned Me About",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/claude-code-obsidian-addiction/";
          
        },
      },{id: "post-ai-doesn-39-t-have-motivation-you-do",
        
          title: "AI Doesn&#39;t Have Motivation.  You Do.",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/you-bring-motivation-not-ai/";
          
        },
      },{id: "post-why-i-39-m-building-a-website-in-2026-and-why-you-should-too",
        
          title: "Why I&#39;m Building a Website in 2026 (And Why You Should Too)",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/evolving-website/";
          
        },
      },{id: "post-the-eq-side-of-ai",
        
          title: "The EQ Side of AI",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/eq-side-of-ai/";
          
        },
      },{id: "post-ai-is-not-a-differentiator-it-is-a-force-multiplier",
        
          title: "AI is not a Differentiator, It is a Force Multiplier",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ai-force-multiplier-design/";
          
        },
      },{id: "post-international-lego-day",
        
          title: "International Lego Day",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/international-lego-day/";
          
        },
      },{id: "post-why-i-39-m-building-a-website-in-2026-and-why-you-should-too",
        
          title: "Why I&#39;m Building a Website in 2026 (And Why You Should Too)",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/why-website-branding/";
          
        },
      },{id: "projects-standing-up-grayminds-com",
          title: 'Standing Up grayminds.com',
          description: "Building a personal portfolio site from scratch using al-folio, Jekyll, and Claude Code as a co-developer.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_github-site/";
            },},{id: "projects-bbs-ansi-art-recovery",
          title: 'BBS ANSI Art Recovery',
          description: "Converting early-1990s TheDraw ANSI animation files into viewable animated GIFs using Claude Code.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_ansi-conversion/";
            },},{id: "projects-legacy-document-conversion",
          title: 'Legacy Document Conversion',
          description: "Converting decades of documents from dead formats (PFS First Choice, Microsoft Works, WordPerfect, early Word) into searchable markdown.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_legacy-docs/";
            },},{id: "projects-photo-archive-consolidation",
          title: 'Photo Archive Consolidation',
          description: "Organizing and deduplicating 25 years of digital photos across backup drives and NAS storage using Claude Code automation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_photo-organization/";
            },},{id: "projects-mission-control",
          title: 'Mission Control',
          description: "A self-hosted dashboard that gives a single view of every Claude Code project, session, plan, and memory file.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/mission-control/";
            },},{id: "projects-tonespeak",
          title: 'Tonespeak',
          description: "A multi-persona skill family for Claude Code that gives output a distinct voice under a strict per-dialect tone budget.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/tonespeak/";
            },},{id: "projects-labyrinthian",
          title: 'Labyrinthian',
          description: "A vault-backed character and game-master dashboard for tabletop RPG sessions, running in production on Cloudflare.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/labyrinthian/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];

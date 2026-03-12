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
        },{id: "nav-projects",
          title: "projects",
          description: "Technical builds and digital archival work, powered by curiosity and Claude Code.",
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
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "projects-standing-up-grayminds-com",
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

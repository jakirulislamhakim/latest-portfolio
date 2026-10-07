import { HeroSection } from '@/features/hero';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section
        id="about"
        className="flex min-h-[380px] scroll-mt-24 flex-col justify-center rounded-2xl border border-border/50 bg-card p-8 shadow-xs sm:p-12"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight">About Me</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          I am a passionate software developer specializing in building modern, fast, and scalable
          web applications. My focus is on clean architecture, user-centric design, and smooth
          micro-interactions.
        </p>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="flex min-h-[380px] scroll-mt-24 flex-col justify-center rounded-2xl border border-border/50 bg-card p-8 shadow-xs sm:p-12"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight">
          Skills &amp; Technologies
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Next.js, React, TypeScript, Tailwind CSS, Node.js, and modern UI component libraries.
          Constantly refining development workflows with strict type safety and automated testing.
        </p>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="flex min-h-[380px] scroll-mt-24 flex-col justify-center rounded-2xl border border-border/50 bg-card p-8 shadow-xs sm:p-12"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          A showcase of recent web applications, design systems, and developer tools created with
          React and Next.js.
        </p>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="flex min-h-[380px] scroll-mt-24 flex-col justify-center rounded-2xl border border-border/50 bg-card p-8 shadow-xs sm:p-12"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight">Work Experience</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Detailed career history, key projects delivered, and technical contributions across
          engineering teams.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="mb-24 flex min-h-[380px] scroll-mt-24 flex-col justify-center rounded-2xl border border-border/50 bg-card p-8 shadow-xs sm:p-12"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight">Get In Touch</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Have an exciting project in mind or looking for a dedicated developer? Feel free to send a
          message or connect through social links.
        </p>
      </section>
    </div>
  );
}

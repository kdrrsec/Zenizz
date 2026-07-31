import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <header className={cn("border-b border-line pt-36 pb-16 md:pt-44 md:pb-24", className)}>
      <Container wide>
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display max-w-5xl text-[clamp(2.8rem,8vw,6.5rem)] text-balance">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </header>
  );
}

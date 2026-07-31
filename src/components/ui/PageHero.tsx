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
    <header
      className={cn(
        "border-b border-line bg-paper pt-[calc(var(--announce-height)+var(--nav-height)+4rem)] pb-14 md:pb-20",
        className,
      )}
    >
      <Container wide>
        <Reveal>
          <p className="eyebrow mb-5">{eyebrow}</p>
          <h1 className="display max-w-5xl text-[clamp(2.6rem,8vw,6rem)]">{title}</h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-faded md:text-lg">
              {description}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </header>
  );
}

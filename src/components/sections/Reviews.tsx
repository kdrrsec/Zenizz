import { reviews } from "@/data/reviews";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";

export function Reviews() {
  return (
    <section className="bg-paper py-20 md:py-28" aria-labelledby="reviews-title">
      <Container wide>
        <Reveal className="mb-12">
          <p className="eyebrow mb-3">Reviews</p>
          <h2 id="reviews-title" className="display text-4xl md:text-6xl">
            What clients say
          </h2>
        </Reveal>

        <Stagger className="grid gap-8 md:grid-cols-2">
          {reviews.map((review) => (
            <StaggerItem key={review.id} className="border-t border-line pt-8">
              <blockquote className="display text-2xl md:text-3xl !normal-case !tracking-[-0.02em] !leading-snug">
                “{review.text}”
              </blockquote>
              <p className="mt-6 font-mono text-[0.7rem] tracking-[0.1em] uppercase text-faded">
                {review.name}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

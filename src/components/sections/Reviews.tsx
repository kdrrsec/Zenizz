import { reviews } from "@/data/reviews";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Reviews() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="reviews-title">
      <Container wide>
        <SectionHeading
          eyebrow="Reviews"
          title="Wat klanten voelen."
          description="Geen lawaai. Wel precisie, rust en een stoel waar je graag terugkomt."
        />

        <Stagger className="mt-16 grid gap-8 md:grid-cols-2">
          {reviews.map((review) => (
            <StaggerItem
              key={review.id}
              className="border-t border-line pt-8"
            >
              <div className="flex gap-1" aria-label={`${review.rating} van 5 sterren`}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-ink" aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="mt-6 display text-2xl md:text-3xl leading-snug text-balance">
                “{review.text}”
              </blockquote>
              <p className="eyebrow mt-8">{review.name}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <h2 id="reviews-title" className="sr-only">
          Reviews
        </h2>
      </Container>
    </section>
  );
}

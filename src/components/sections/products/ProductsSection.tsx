import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SplitHeader } from "@/components/sections/shared/SplitHeader";
import { products, productsIntro as intro } from "@/content/products";
import { contactHref } from "@/content/navigation";
import { ProductCard } from "./ProductCard";

// Stagger by visual column on desktop: row 1 = Kitchen (cols 1–2), Dining, Bedroom; row 2 = 4 cards
const delays = [0, 0.2, 0.3, 0, 0.1, 0.2, 0.3];

export function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="bg-ivory pb-24 pt-8 text-ink md:pb-32 xl:pb-[180px]"
    >
      <SplitHeader
        id="products-heading"
        eyebrow={intro.eyebrow}
        title={intro.title}
        body={intro.body}
        actions={
          <>
            <Button href="/gallery" variant="accent">Discover Our Work</Button>
            <Button href={contactHref} variant="outline">Contact Us</Button>
          </>
        }
      />

      <Container>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4 xl:mt-[178px]">
          {products.map((product, i) => {
            const featured = i === 0;
            return (
              <ProductCard
                key={product.slug}
                product={product}
                index={i}
                total={products.length}
                delay={delays[i]}
                className={featured ? "sm:col-span-2" : undefined}
                aspect={featured ? "aspect-[4/5] sm:aspect-[630/354]" : "aspect-[305/354]"}
                sizes={
                  featured
                    ? "(min-width: 640px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}
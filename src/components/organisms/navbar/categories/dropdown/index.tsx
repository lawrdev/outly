import Link from "next/link";
import { chakra } from "@chakra-ui/react";
import { Container } from "@/components/atoms";

interface Props {
  showCate: string;
}

export function CategoryItem({ showCate }: Props) {
  if (showCate !== "")
    return (
      <chakra.div className="flyoutWrapper" bg="backgrounds.4">
        <Container>
          <div
            id="sale"
            className="flyout flex justify-between gap-5 pt-4 pb-8"
            aria-label="Women"
          >
            <div className="flyout-col">
              <div className="flyout-inner-col">
                <h5>{`Women's Clothing`}</h5>
                <Link href="/">{`All Women's Clothing`}</Link>
                <Link href="/">New Arrivals</Link>
                <Link href="/">Activewear</Link>
                <Link href="/">Bras, Underwear &amp; Lingerie</Link>
                <Link href="/">Cashmere</Link>
                <Link href="/">Suits &amp; Suit Separates</Link>
                <Link href="/">Sweaters</Link>
                <Link href="/">Swimsuits &amp; Cover-Ups</Link>
                <Link href="/">Tights, Socks, &amp; Hosiery</Link>
                <Link href="/">hrefps</Link>
              </div>
            </div>

            <div className="flyout-col">
              <div className="flyout-inner-col">
                <h5>Juniors</h5>
                <Link href="/">{`All Juniors' Clothing`}</Link>
                <Link href="/">Coats &amp; Jackets</Link>
                <Link href="/">Dresses</Link>
              </div>
              <div className="flyout-inner-col">
                <h5>Plus Sizes</h5>
                <Link href="/">All Plus Size Clothing</Link>
                <Link href="/">hrefps</Link>
              </div>
              <div className="flyout-inner-col">
                <h5>More Sizes</h5>
                <Link href="/">{`Petites (5'4" &amp; Under)`}</Link>
                <Link href="/">Maternity</Link>
              </div>
            </div>

            <div className="flyout-col">
              <div className="flyout-inner-col">
                <h5>Complete Your Look</h5>
                <Link href="/">Shoes</Link>
                <Link href="/">Perfume</Link>
              </div>
              <div className="flyout-inner-col">
                <h5>{`Women's Brands`}</h5>
                <Link href="/">{`All Women's Brands`}</Link>
                <Link href="/">hrefmmy Hilfiger</Link>
              </div>
            </div>

            <div className="flyout-col">
              <div className="flyout-inner-col">
                <h5>Shop By Occasion</h5>
                <Link href="/">Evening</Link>
                <Link href="/">Wedding</Link>
              </div>

              <div className="flyout-inner-col">
                <h5>Discover</h5>
                <Link href="/">Coat Trends</Link>
                <Link href="/">Dress Trends</Link>
                <Link href="/">Own Your Style</Link>
              </div>

              <div className="flyout-inner-col">
                <Link href="/">30% Off Best Brands</Link>
              </div>
            </div>
          </div>
        </Container>
      </chakra.div>
    );
  else
    return (
      <chakra.div
        className="flyoutWrapper"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <p>Nothing href show</p>
      </chakra.div>
    );
}

import Reveal from "@/components/motion/Reveal";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import hoodieImg from "@/assets/images/custom-hoodies.png";
import img1 from "@/assets/images/custom-sweatshirts.png";
import img2 from "@/assets/images/custom-sweatshirts.png";
import styles from "./ProductDetails.module.css";

const RelatedProduct = () => {
  const relatedProducts = [
    {
      id: 2,
      brand: "Gildan",
      name: "Heavy Blend Hooded Sweatshirt",
      description:
        "Narrow-fit hoodie with a double-lined hood and pouch pocket.",
      price: 19.31,
      image: hoodieImg,
      colors: ["Black", "White", "Sport Grey", "Navy"],
    },
    {
      id: 3,
      brand: "Jerzees",
      name: "NuBlend Hooded Sweatshirt",
      description: "Double-napped inside keeps you warm and cosy all season.",
      price: 16.56,
      image: img1,
      colors: ["Black", "White", "Sport Grey"],
    },
    {
      id: 4,
      brand: "Champion",
      name: "Reverse Weave Pullover Hood",
      description: "Heavyweight premium construction that holds its shape.",
      price: 50.21,
      image: hoodieImg,
      colors: ["Black", "Sport Grey", "Navy", "Red"],
    },
    {
      id: 5,
      brand: "Next Level",
      name: "Unisex Pullover Hood 80/20",
      description: "Soft ringspun cotton blend with a smooth print surface.",
      price: 21.66,
      image: img1,
      colors: ["Black", "White", "Sport Grey", "Navy"],
    },
  ];

  const swatches = {
    Black: "#111111",
    White: "#ffffff",
    Gray: "#8b8b8b",
    Navy: "#23395d",
    Red: "#b0302c",
  };

  return (
    <div className="ic_section_space">
      <Reveal as="section" className="ic_container">
        <div className={styles.sectionHead}>
          <div>
            <span className="ic_eyebrow">You may also like</span>
            <h2>More hoodies to customize</h2>
          </div>

          <Link href="/" className={styles.sectionLink}>
            View all
            <FiArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.relatedGrid}>
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              href={`/products/womens/${item.id}`}
              swatches={swatches}
              titleAs="h3"
              sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
};

export default RelatedProduct;

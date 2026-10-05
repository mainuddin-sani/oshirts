"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiChevronDown, FiSliders, FiX } from "react-icons/fi";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./DaynamicCategory.module.css";
import img1 from "@/assets/images/custom-sweatshirts.png";
import img2 from "@/assets/images/custom-hoodies.png";

const swatches = {
    Black: "#111111",
    White: "#ffffff",
    Gray: "#8b8b8b",
    Navy: "#23395d",
    Red: "#b0302c",
};

const products = [
    {
        id: 1,
        brand: "Jerzees",
        name: "50/50 Hooded Sweatshirt",
        description: "Double-napped inside keeps you warm and cozy.",
        price: 16.56,
        image: img1,
        material: "50/50",
        styleTags: ["Pullover"],
        colors: ["Black", "White", "Gray", "Navy"],
    },
    {
        id: 2,
        brand: "Gildan",
        name: "50/50 Hooded Sweatshirt",
        description: "Narrow-fit sweatshirt with a double-lined hood.",
        price: 19.31,
        image: img2,
        material: "50/50",
        styleTags: ["Pullover", "Pocket"],
        colors: ["Black", "White", "Gray", "Navy"],
    },
    {
        id: 3,
        brand: "Hanes",
        name: "50/50 Hooded Sweatshirt",
        description: "Super smooth cotton-polyester blend prevents pilling.",
        price: 18.81,
        image: img1,
        material: "50/50",
        styleTags: ["Pullover"],
        colors: ["Black", "White", "Gray"],
    },
    {
        id: 4,
        brand: "Hanes",
        name: "10 oz. Ultimate Cotton 90/10 Pullover Hood",
        description: "Warm with high cotton density, great for printing.",
        price: 33.55,
        image: img2,
        material: "Ringspun",
        styleTags: ["Pullover", "Pocket"],
        colors: ["Black", "White", "Gray", "Red"],
    },
    {
        id: 5,
        brand: "Gildan",
        name: "Ultra Cotton Hooded Sweatshirt",
        description: "Narrow-fit sweatshirt made of heavyweight cotton.",
        price: 15.34,
        image: img1,
        material: "100% Cotton",
        styleTags: ["Pullover"],
        colors: ["Black", "White", "Gray", "Navy"],
    },
    {
        id: 6,
        brand: "Champion",
        name: "Reverse Weave 12 oz. Pullover Hood 80/20",
        description: "Heavyweight premium reverse weave construction.",
        price: 50.21,
        image: img1,
        material: "Ringspun",
        styleTags: ["Pullover"],
        colors: ["Black", "White", "Gray"],
    },
    {
        id: 7,
        brand: "Next Level",
        name: "Unisex Pullover Hood 80/20",
        description: "Soft and comfortable everyday pullover hoodie.",
        price: 21.66,
        image: img2,
        material: "Ringspun",
        styleTags: ["Pullover"],
        colors: ["Black", "White", "Gray", "Navy"],
    },
    {
        id: 8,
        brand: "Gildan",
        name: "Heavy Blend Full-Zip Hooded Sweatshirt",
        description: "Full-zip hood with matching drawcord and roomy pouch pockets.",
        price: 23.4,
        image: img1,
        material: "50/50",
        styleTags: ["Zip Up", "Pocket"],
        colors: ["Black", "White", "Navy", "Red"],
    },
    {
        id: 9,
        brand: "Champion",
        name: "Powerblend Full-Zip Hood 50/50",
        description: "Holds its shape wash after wash with minimal shrinkage.",
        price: 38.9,
        image: img2,
        material: "100% Cotton",
        styleTags: ["Zip Up"],
        colors: ["Black", "Gray", "Navy"],
    },
];

const filterGroups = [
    {
        title: "Brand",
        key: "brand",
        options: ["Gildan", "Hanes", "Jerzees", "Champion", "Next Level"],
    },
    {
        title: "Material",
        key: "material",
        options: ["100% Cotton", "50/50", "Ringspun"],
    },
    {
        title: "Style",
        key: "style",
        options: ["Pullover", "Zip Up", "Pocket"],
    },
    {
        title: "Color",
        key: "color",
        options: ["Black", "White", "Gray", "Navy", "Red"],
    },
    {
        title: "Price",
        key: "price",
        options: ["Under $20", "$20 - $35", "Over $35"],
    },
];

const emptyFilters = {
    brand: [],
    material: [],
    style: [],
    color: [],
    price: [],
};

const priceRanges = {
    "Under $20": (price) => price < 20,
    "$20 - $35": (price) => price >= 20 && price <= 35,
    "Over $35": (price) => price > 35,
};

const matchers = {
    brand: (product, value) => product.brand === value,
    material: (product, value) => product.material === value,
    style: (product, value) => product.styleTags.includes(value),
    color: (product, value) => product.colors.includes(value),
    price: (product, value) => priceRanges[value](product.price),
};

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Custom Apparel" },
    { label: "Custom Hoodies" },
];

const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
];

export default function DaynamicCategory() {
    const reduce = useReducedMotion();

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sort, setSort] = useState("featured");
    const [selectedFilters, setSelectedFilters] = useState(emptyFilters);
    const [openGroups, setOpenGroups] = useState(() =>
        Object.fromEntries(filterGroups.map((group) => [group.key, true]))
    );

    const toggleGroup = (key) => {
        setOpenGroups((current) => ({ ...current, [key]: !current[key] }));
    };

    const toggleFilter = (key, value) => {
        setSelectedFilters((current) => {
            const exists = current[key].includes(value);

            return {
                ...current,
                [key]: exists
                    ? current[key].filter((item) => item !== value)
                    : [...current[key], value],
            };
        });
    };

    const clearFilters = () => setSelectedFilters(emptyFilters);

    const filteredProducts = useMemo(() => {
        const result = products.filter((product) =>
            Object.entries(selectedFilters).every(([key, values]) =>
                values.length
                    ? values.some((value) => matchers[key](product, value))
                    : true
            )
        );

        if (sort === "price-low") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "price-high") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sort === "name") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [selectedFilters, sort]);

    const activeChips = useMemo(
        () =>
            Object.entries(selectedFilters).flatMap(([key, values]) =>
                values.map((value) => ({ key, value }))
            ),
        [selectedFilters]
    );

    const activeFilterCount = activeChips.length;

    useEffect(() => {
        if (!filtersOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setFiltersOpen(false);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [filtersOpen]);

    return (
        <section className={styles.page}>
            <div className="ic_container">
                <Breadcrumb items={breadcrumbItems} />

                <div className={styles.topBar}>
                    <div className={styles.topBarText}>
                        <span className="ic_eyebrow">Custom Apparel</span>
                        <h1 className={styles.title}>Custom Hoodies</h1>
                        <p className={styles.subtitle}>
                            Premium blanks from the brands print shops trust — no minimums,
                            free shipping, and a live artwork proof before we print.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={`${styles.mobileFilterButton} ic_btn ic_btn_secondary`}
                        onClick={() => setFiltersOpen(true)}
                    >
                        <FiSliders aria-hidden="true" />
                        Filter &amp; Sort
                        {activeFilterCount > 0 && (
                            <span className={styles.filterCount}>{activeFilterCount}</span>
                        )}
                    </button>
                </div>

                <div className={styles.layout}>
                    <aside
                        className={`${styles.sidebar} ${filtersOpen ? styles.sidebarOpen : ""}`}
                        aria-label="Product filters"
                    >
                        <div className={styles.mobileSidebarHeader}>
                            <h3>Filters</h3>

                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={() => setFiltersOpen(false)}
                                aria-label="Close filters"
                            >
                                <FiX aria-hidden="true" />
                            </button>
                        </div>

                        <div className={styles.sidebarInner}>
                            <div className={styles.sidebarHeader}>
                                <span className={styles.sidebarTitle}>Refine</span>

                                {activeFilterCount > 0 && (
                                    <button
                                        type="button"
                                        className={styles.clearButton}
                                        onClick={clearFilters}
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {filterGroups.map((group) => {
                                const open = openGroups[group.key];
                                const selectedCount = selectedFilters[group.key].length;
                                const panelId = `filter-panel-${group.key}`;
                                const buttonId = `filter-button-${group.key}`;

                                return (
                                    <div className={styles.filterGroup} key={group.key}>
                                        <h3 className={styles.filterHeadingWrap}>
                                            <button
                                                type="button"
                                                id={buttonId}
                                                className={styles.filterHeading}
                                                aria-expanded={open}
                                                aria-controls={panelId}
                                                onClick={() => toggleGroup(group.key)}
                                            >
                                                <span className={styles.filterTitle}>
                                                    {group.title}

                                                    {selectedCount > 0 && (
                                                        <span className={styles.groupCount}>
                                                            {selectedCount}
                                                        </span>
                                                    )}
                                                </span>

                                                <span
                                                    className={`${styles.chevron} ${open ? styles.chevronOpen : ""
                                                        }`}
                                                    aria-hidden="true"
                                                >
                                                    <FiChevronDown />
                                                </span>
                                            </button>
                                        </h3>

                                        <AnimatePresence initial={false}>
                                            {open && (
                                                <motion.div
                                                    id={panelId}
                                                    role="region"
                                                    aria-labelledby={buttonId}
                                                    className={styles.filterPanel}
                                                    initial={reduce ? false : { height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={
                                                        reduce
                                                            ? { opacity: 0, transition: { duration: 0 } }
                                                            : { height: 0, opacity: 0 }
                                                    }
                                                    transition={{
                                                        duration: 0.32,
                                                        ease: [0.2, 0.7, 0.2, 1],
                                                    }}
                                                >
                                                    <div className={styles.filterOptions}>
                                                        {group.options.map((option) => {
                                                            const checked =
                                                                selectedFilters[group.key].includes(option);

                                                            return (
                                                                <label
                                                                    className={`${styles.checkboxRow} ${checked ? styles.checkboxRowActive : ""
                                                                        }`}
                                                                    key={option}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={checked}
                                                                        onChange={() =>
                                                                            toggleFilter(group.key, option)
                                                                        }
                                                                    />

                                                                    <span className={styles.customCheckbox} />

                                                                    {group.key === "color" && (
                                                                        <span
                                                                            className={styles.optionSwatch}
                                                                            style={{
                                                                                backgroundColor: swatches[option],
                                                                            }}
                                                                            aria-hidden="true"
                                                                        />
                                                                    )}

                                                                    <span className={styles.optionLabel}>
                                                                        {option}
                                                                    </span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={styles.sidebarFooter}>
                            <button
                                type="button"
                                className="ic_btn ic_btn_primary"
                                onClick={() => setFiltersOpen(false)}
                            >
                                Show {filteredProducts.length}{" "}
                                {filteredProducts.length === 1 ? "product" : "products"}
                            </button>
                        </div>
                    </aside>

                    {filtersOpen && (
                        <button
                            type="button"
                            className={styles.overlay}
                            aria-label="Close filters"
                            onClick={() => setFiltersOpen(false)}
                        />
                    )}

                    <div className={styles.productsArea}>
                        <div className={styles.toolbar}>
                            <p className={styles.resultInfo}>
                                <strong>{filteredProducts.length}</strong>{" "}
                                {filteredProducts.length === 1 ? "Product" : "Products"}
                                {activeFilterCount > 0 && (
                                    <span className={styles.resultDivider}>
                                        {activeFilterCount}{" "}
                                        {activeFilterCount === 1 ? "filter" : "filters"} applied
                                    </span>
                                )}
                            </p>

                            <div className={styles.sortBox}>
                                <label htmlFor="sort">Sort by</label>

                                <div className={styles.selectWrap}>
                                    <select
                                        id="sort"
                                        value={sort}
                                        onChange={(event) => setSort(event.target.value)}
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <FiChevronDown aria-hidden="true" />
                                </div>
                            </div>
                        </div>

                        {activeFilterCount > 0 && (
                            <div className={styles.chipRow}>
                                {activeChips.map((chip) => (
                                    <span
                                        className={styles.activeTag}
                                        key={`${chip.key}-${chip.value}`}
                                    >
                                        {chip.value}

                                        <button
                                            type="button"
                                            onClick={() => toggleFilter(chip.key, chip.value)}
                                            aria-label={`Remove ${chip.value} filter`}
                                        >
                                            <FiX aria-hidden="true" />
                                        </button>
                                    </span>
                                ))}

                                <button
                                    type="button"
                                    className={styles.clearChip}
                                    onClick={clearFilters}
                                >
                                    Clear all
                                </button>
                            </div>
                        )}

                        {filteredProducts.length > 0 ? (
                            <div className={styles.productGrid}>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        href={`/products/womens/${product.id}`}
                                        swatches={swatches}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <span className={styles.emptyIcon} aria-hidden="true">
                                    <FiSliders />
                                </span>

                                <h3>No products found</h3>
                                <p>Try removing one or more filters to see more results.</p>

                                <button
                                    type="button"
                                    className="ic_btn ic_btn_primary"
                                    onClick={clearFilters}
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

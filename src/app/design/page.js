import { redirect } from "next/navigation";

/** Generic "Start designing" entry (no product chosen): open the studio with
 * the default tee. Product pages link straight to their own design route. */
export default function DefaultDesignPage() {
  redirect("/products/t-shirts/classic-cotton-tee/design?style=classic-cotton-tee&color=White&qty=24");
}

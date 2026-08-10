import { redirect } from "next/navigation";

/** Profile merged into `/fans` — keep path for old links. */
export default function FanProfilePage() {
  redirect("/fans");
}

import { redirect } from "next/navigation";

export default function LegacyColophonPage() {
  redirect("/?case=colophon");
}

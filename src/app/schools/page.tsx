import type { Metadata } from "next";
import { getProgram } from "@/data/programs";
import { ProgramTrackPage } from "@/components/ProgramTrackPage";

const track = getProgram("schools")!;

export const metadata: Metadata = {
  title: "Innovation Lab programs for schools",
  description: track.intro,
  alternates: { canonical: "/schools" },
};

export default function Schools() {
  return <ProgramTrackPage track={track} />;
}

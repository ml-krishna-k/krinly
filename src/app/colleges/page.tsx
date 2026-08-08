import type { Metadata } from "next";
import { getProgram } from "@/data/programs";
import { ProgramTrackPage } from "@/components/ProgramTrackPage";

const track = getProgram("colleges")!;

export const metadata: Metadata = {
  title: "Industry programs & workshops for colleges",
  description: track.intro,
  alternates: { canonical: "/colleges" },
};

export default function Colleges() {
  return <ProgramTrackPage track={track} />;
}


import React from "react";
import ProjectContextBar from "@/components/ProjectContextBar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Add time-of-day data to each species observation
const mockCameraObservations = [
  {
    camera: "Camera A",
    species: [
      { name: "Gray Wolf", count: 3, times: ["04:20", "05:10", "06:00"] },
      { name: "Moose", count: 2, times: ["09:30", "11:00"] },
      { name: "Raccoon", count: 1, times: ["21:45"] },
    ],
  },
  {
    camera: "Camera B",
    species: [
      { name: "Gray Wolf", count: 2, times: ["03:50", "19:10"] },
      { name: "Red Fox", count: 4, times: ["06:00", "06:30", "15:00", "19:45"] },
    ],
  },
  {
    camera: "Camera C",
    species: [
      { name: "Gray Wolf", count: 2, times: ["02:00", "22:20"] },
      { name: "Moose", count: 1, times: ["12:15"] },
      { name: "Bald Eagle", count: 2, times: ["10:00", "13:30"] },
    ],
  },
];

// Helper for converting a "HH:mm" string to an hour number
function getHour(time: string) {
  return parseInt(time.split(":")[0], 10);
}

// Determine which period the observation falls into
function getTimePeriod(hour: number) {
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
}

// Analyze diurnal patterns
function analyzeDiurnalPatterns(observations: typeof mockCameraObservations) {
  const speciesTimeCounts: Record<string, Record<string, number>> = {};
  observations.forEach((obs) => {
    obs.species.forEach((sp) => {
      if (!speciesTimeCounts[sp.name]) {
        speciesTimeCounts[sp.name] = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };
      }
      if (sp.times && sp.times.length > 0) {
        sp.times.forEach((time) => {
          const period = getTimePeriod(getHour(time));
          speciesTimeCounts[sp.name][period] += 1;
        });
      }
    });
  });
  // For each species, determine the most common period
  const speciesPatterns: Record<string, string> = {};
  Object.entries(speciesTimeCounts).forEach(([sp, periods]) => {
    const sorted = Object.entries(periods).sort((a, b) => b[1] - a[1]);
    if (sorted[0][1] > 0) {
      speciesPatterns[sp] = sorted[0][0];
    }
  });
  return { speciesTimeCounts, speciesPatterns };
}

// Existing species/camera pattern summaries
function summarizePatterns(observations: typeof mockCameraObservations) {
  const totalBySpecies: Record<string, number> = {};
  observations.forEach((obs) => {
    obs.species.forEach((sp) => {
      totalBySpecies[sp.name] = (totalBySpecies[sp.name] || 0) + sp.count;
    });
  });

  const sortedSpecies = Object.entries(totalBySpecies).sort(
    (a, b) => b[1] - a[1]
  );
  const mostFrequentSpecies =
    sortedSpecies.length > 0 ? sortedSpecies[0][0] : null;

  const wolfCameraCounts = observations.map(
    (c) => ({
      camera: c.camera,
      wolves: c.species.find((s) => s.name === "Gray Wolf")?.count || 0,
    })
  );
  const camerasWithMostWolves = wolfCameraCounts
    .sort((a, b) => b.wolves - a.wolves)
    .slice(0, 1)
    .map((c) => c.camera);

  return {
    mostFrequentSpecies,
    camerasWithMostWolves,
  };
}

const patternSummary = summarizePatterns(mockCameraObservations);
const diurnalPatterns = analyzeDiurnalPatterns(mockCameraObservations);

// New: flatten all camera/species/times/counts into rows for display
type ObservationRow = {
  camera: string;
  species: string;
  count: number;
  time: string;
};
function getObservationRows(observations: typeof mockCameraObservations): ObservationRow[] {
  const rows: ObservationRow[] = [];
  for (const cam of observations) {
    for (const sp of cam.species) {
      if (sp.times && sp.times.length > 0) {
        // If species lists more times than count, just map 1-1; if count > times, group multiple at a time
        // Assumption: Each time corresponds to a count (seen N individuals at that time)
        const timeCount = Math.min(sp.times.length, sp.count);
        // Most common case: times.length === count
        for (let i = 0; i < timeCount; i++) {
          rows.push({
            camera: cam.camera,
            species: sp.name,
            count: 1,
            time: sp.times[i],
          });
        }
        // If there are more counts than times, lump into the earliest time
        if (sp.count > sp.times.length) {
          rows.push({
            camera: cam.camera,
            species: sp.name,
            count: sp.count - sp.times.length + 1,
            time: sp.times[0],
          });
        }
      } else {
        // No times, just list count
        rows.push({
          camera: cam.camera,
          species: sp.name,
          count: sp.count,
          time: "-",
        });
      }
    }
  }
  return rows;
}

const observationRows = getObservationRows(mockCameraObservations);

const Analysis = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Analysis</h1>
    <ProjectContextBar projectName="Wolf Camera Survey" />
    <p className="text-muted-foreground mb-6">
      Analyze media - manual or automated. CAMTRAP-DP: Platform for analysis of collected data.
    </p>
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Species Observations per Camera</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            A summary of individual species observations at each camera with count and time.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Camera</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {observationRows.map((row, idx) => (
              <TableRow key={row.camera + row.species + row.time + idx}>
                <TableCell>{row.camera}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.time !== "-" ? `${row.time}` : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Analysis Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-6">
          <li>
            <span className="font-medium">Most observed species:</span>{" "}
            {patternSummary.mostFrequentSpecies}
          </li>
          <li>
            <span className="font-medium">Camera with most wolf observations:</span>{" "}
            {patternSummary.camerasWithMostWolves.join(", ")}
          </li>
          <li>
            <span className="font-medium">Potential pattern:</span> Gray Wolves appear at all cameras, but are seen most frequently at{" "}
            {patternSummary.camerasWithMostWolves.join(", ")}. Other species like Moose and Red Fox are seen less frequently and distribution varies by location.
          </li>
          <li>
            <span className="font-medium">Diurnal patterns:</span>{" "}
            {Object.keys(diurnalPatterns.speciesPatterns).length === 0
              ? "No pattern detected"
              : (
                  Object.entries(diurnalPatterns.speciesPatterns)
                    .map(([sp, period]) =>
                      `${sp} visits mainly in the ${period.toLowerCase()}`
                    ).join("; ")
                )
            }
          </li>
        </ul>
      </CardContent>
    </Card>
  </div>
);

export default Analysis;

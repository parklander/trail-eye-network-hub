
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

// Ideally, this would come from central data.
// Copy/paste the rows and mock data structure from Analysis for now.
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

// Flat per-record table (per observation per camera per species)
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
        const timeCount = Math.min(sp.times.length, sp.count);
        for (let i = 0; i < timeCount; i++) {
          rows.push({
            camera: cam.camera,
            species: sp.name,
            count: 1,
            time: sp.times[i],
          });
        }
        if (sp.count > sp.times.length) {
          rows.push({
            camera: cam.camera,
            species: sp.name,
            count: sp.count - sp.times.length + 1,
            time: sp.times[0],
          });
        }
      } else {
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

const Observations = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Observations</h1>
    <ProjectContextBar projectName="Wolf Camera Survey" />
    <p className="text-muted-foreground mb-6">
      This table corresponds to the CAMTRAP-DP observations table. Each row = a species observation event at a specific camera/location and time.
    </p>
    <Card>
      <CardHeader>
        <CardTitle>Species Observations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>
            Per-record summary of observed species: camera, species, (individual) count, time.
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
            {observationRows.map((row, i) => (
              <TableRow key={row.camera + row.species + row.time + i}>
                <TableCell>{row.camera}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.count}</TableCell>
                <TableCell>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

export default Observations;

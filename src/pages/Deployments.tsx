
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Map from "@/components/Map";
import { DeploymentForm } from "@/components/DeploymentForm";
import ProjectContextBar from "@/components/ProjectContextBar";

const Deployments = () => {
  const [showForm, setShowForm] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Deployments</h1>
          <ProjectContextBar projectName="Wolf Camera Survey" />
          <p className="text-muted-foreground">
            Track camera deployments in the field. CAMTRAP-DP: Location, time, and deployment metadata.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2" />
          Add
        </Button>
      </div>

      {/* Prompt for Mapbox Token if not set */}
      {!mapboxToken ? (
        <div className="bg-muted rounded-lg p-4 my-8 flex flex-col items-center">
          <p className="mb-2">
            <span className="font-medium">Mapbox Public Token required:</span>
            <br />
            Enter your Mapbox public token to display the deployments map.
          </p>
          <input
            className="border px-3 py-2 rounded-md w-full max-w-md mb-2"
            placeholder="pk.ey..."
            value={mapboxToken}
            onChange={e => setMapboxToken(e.target.value)}
          />
          <a
            href="https://mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline"
          >
            Where do I find my Mapbox public token?
          </a>
        </div>
      ) : (
        <Map accessToken={mapboxToken} />
      )}

      <DeploymentForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
};

export default Deployments;

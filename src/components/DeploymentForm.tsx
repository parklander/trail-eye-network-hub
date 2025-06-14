
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type DeploymentFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // future: onSubmit, initialValues etc.
};

export const DeploymentForm: React.FC<DeploymentFormProps> = ({ open, onOpenChange }) => {
  // Add state for latitude, longitude, and error message
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [geoLoading, setGeoLoading] = useState<boolean>(false);
  const [geoError, setGeoError] = useState<string>("");

  // Geolocation logic
  const handleUseMyLocation = () => {
    setGeoError("");
    setGeoLoading(true);
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation is not supported by your browser.");
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setGeoLoading(false);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("Permission denied. Please allow location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setGeoError("Location request timed out.");
            break;
          default:
            setGeoError("Failed to get location.");
        }
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Form state, validation, etc., can be added later
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Camera Deployment</DialogTitle>
          <DialogDescription>
            Enter details for the new camera deployment. (This is a demo form.)
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="deployment-name">
              Deployment Name
            </label>
            <Input id="deployment-name" placeholder="Ex: North Forest" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="location">
              Location Description
            </label>
            <Textarea id="location" placeholder="Describe location or coordinates" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <label className="block text-sm font-medium" htmlFor="latitude">
                Latitude
              </label>
              <label className="block text-sm font-medium" htmlFor="longitude">
                / Longitude
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={handleUseMyLocation}
                disabled={geoLoading}
              >
                {geoLoading ? "Locating..." : "Use My Location"}
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                id="latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                placeholder="Latitude"
                type="number"
                step="any"
                min={-90}
                max={90}
                inputMode="decimal"
              />
              <Input
                id="longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                placeholder="Longitude"
                type="number"
                step="any"
                min={-180}
                max={180}
                inputMode="decimal"
              />
            </div>
            {geoError && (
              <p className="text-xs text-destructive mt-1">{geoError}</p>
            )}
          </div>
          {/* Future: Camera select, date pickers, metadata */}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled>
            Save (Demo Only)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

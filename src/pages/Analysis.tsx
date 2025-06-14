
import ProjectContextBar from "@/components/ProjectContextBar";

const Analysis = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">Analysis</h1>
    <ProjectContextBar projectName="Wolf Camera Survey" />
    <p className="text-muted-foreground">
      Analyze media - manual or automated. CAMTRAP-DP: Platform for analysis of collected data.
    </p>
    {/* Future: Integrate AI, manual review, export results */}
  </div>
);

export default Analysis;

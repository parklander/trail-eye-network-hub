
// Home page with intro and navigation reference

const Index = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">Trail Eye Network Hub</h1>
      <p className="text-lg mb-4 text-muted-foreground">
        Welcome! This hybrid web/mobile app helps you manage trail camera deployments, media, and wildlife analysis, with standards based on CAMTRAP-DP.
      </p>
      <ul className="space-y-2 ml-6 list-disc text-base text-muted-foreground">
        <li>Manage trail <b>Cameras</b></li>
        <li>Track <b>Deployments</b> and field sites</li>
        <li>Browse and review <b>Media</b> assets</li>
        <li>Perform <b>Analysis</b> of your images and videos</li>
      </ul>
      <p className="mt-6 text-muted-foreground">Use the menu at left to get started.</p>
    </div>
  );
};
export default Index;

import ProjectSelection from "./ProjectSelection";
import ScrumSelection from "./ScrumSelection";
import SprintSelection from "./SprintSelection";

function HomeSelection(props: any) {
  return (
    <div>
      <ScrumSelection {...props} />
      <ProjectSelection {...props} />
      <SprintSelection {...props} />
    </div>
  );
}

export default HomeSelection;

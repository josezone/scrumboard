import groupArray from "group-array";
import { Tree, TreeNode } from "react-organizational-chart";
import { EstimateGraphStyled } from "./EstimateGraph.style";
import GraphLeaf from "./GraphLeaf";
import ProjectCard from "./ProjectCard";
import ProjectGroup from "./ProjectGroup";

function EstimateGraph(props: any) {
  const result: any = groupArray(
    props.ticketList,
    "sprint.project.project",
    "sprint.country.country",
    "sprint.sprint"
  );
  return (
    <EstimateGraphStyled>
      <Tree
        label={<div className="title">
          <ProjectGroup {...props}/>
        </div>}
        lineColor={"rgba(0, 0, 0, 0.12)"}
      >
        {Object.keys(result)?.map((project) => {
          return (
            <TreeNode
              key={project}
              label={
                <ProjectCard
                  project={project}
                  ticketList={props.ticketList}
                  estimateList={props.estimateList}
                  send={props.send}
                />
              }
            >
              {Object.keys(result[project])?.map((country) => {
                return (
                  <TreeNode
                    key={country}
                    label={<div className="title">{country}</div>}
                  >
                    {Object.keys(result[project][country])?.map((sprint) => {
                      return (
                        <TreeNode
                          key={sprint}
                          label={<div className="title">{sprint}</div>}
                        >
                          {result[project][country][sprint]?.map(
                            (ticket: any) => {
                              return (
                                <TreeNode
                                  key={ticket.ticket}
                                  label={<GraphLeaf {...ticket} />}
                                ></TreeNode>
                              );
                            }
                          )}
                        </TreeNode>
                      );
                    })}
                  </TreeNode>
                );
              })}
            </TreeNode>
          );
        })}
      </Tree>
    </EstimateGraphStyled>
  );
}
export default EstimateGraph;

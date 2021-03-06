import { ProjectCardStyled } from "./ProjectCard.style";
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';

function storyPoint(props: any) {
    let el = {};
    let storyFe = 0;
    let storyBe = 0;
    let storyQa = 0;
    if (props.scope.scope.includes("FE")) {
        if (props.spill) {
            storyFe = props.fe_spill;
        } else {
            storyFe = props.fe_story;
        }
    }
    if (props.scope.scope.includes("BE")) {
        if (props.spill) {
            storyBe = props.be_spill;
        } else {
            storyBe = props.be_story;
        }
    }
    if (props.scope.scope.includes("QA")) {
        if (props.spill) {
            storyQa = props.qa_spill;
        } else {
            storyQa = props.qa_story;
        }
    }
    return { storyFe, storyBe, storyQa };
}

const pointsChanged = (item: any, send: any) => (event: any) => {
    send({ type: "updatePoints", data: { id: item.id, story: event.target.value } })
}

function ProjectCard(props: any) {
    let fePoint = 0;
    let bePoint = 0;
    let qaPoint = 0;
    props.ticketList.forEach((ticket: any) => {
        const { storyFe, storyBe, storyQa } = storyPoint(ticket) as any;
        fePoint += storyFe;
        bePoint += storyBe;
        qaPoint += storyQa;
    });
    const estimate = props.estimateList?.filter((estimate: any) => {
        if (estimate.project.project === props.project) {
            return estimate;
        }
    });
    let el = estimate?.map((item: any) => {
        return (
            <div className={item["resource_type"]["resource_type"]} key={item["resource_type"]["resource_type"]}>
                <TextField label={"max " + item['resource_type']['resource_type']} value={item.story} variant="outlined" onChange={pointsChanged(item, props.send)} type="number" />
            </div>
        );
    })
    const maxTotal = estimate?.reduce((acc: any, val: any) => {
        return acc + Number(val.story);
    }, 0)

    return (
        <ProjectCardStyled>
            <div className="cardHead">
                <div>
                    {props.project}
                </div>
                <div className="Total">
                    <span>Total:</span>
                    {fePoint + bePoint + qaPoint}
                </div>
                <div className="Total">
                    <span>Max total:</span>
                    {maxTotal}
                </div>
            </div>
            <Divider style={{ marginTop: "2px" }} />
            <div className="cardBody">
                <div className="FE">
                    <span>FE:</span>
                    {fePoint}
                </div>
                <div className="BE">
                    <span>BE:</span>
                    {bePoint}
                </div>
                <div className="QA">
                    <span>QA:</span>
                    {qaPoint}
                </div>
            </div>
            <Divider style={{ marginTop: "2px" }} />
            <div className="cardBody">
                {el}
            </div>
        </ProjectCardStyled>)
}

export default ProjectCard;
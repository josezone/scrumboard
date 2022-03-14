import { GraphLeafStyled } from "./GraphLeaf.style";
import Divider from '@mui/material/Divider';
import BugReportIcon from "@mui/icons-material/BugReport";
import { IconButton } from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";

function storyPoint(props: any) {
    const el = [];
    let storyFe = 0;
    let storyBe = 0;
    let storyQa = 0;
    if (props.scope?.scope?.includes("FE")) {
        if (props.spill) {
            storyFe = props.fe_spill;
        } else {
            storyFe = props.fe_story;
        }
        el.push(
            <div className="FE" key={"FE" + storyFe}>
                <span>FE:</span>
                {storyFe}
            </div>
        );
    }
    if (props.scope?.scope?.includes("BE")) {
        if (props.spill) {
            storyBe = props.be_spill;
        } else {
            storyBe = props.be_story;
        }
        el.push(
            <div className="BE" key={"BE" + storyBe}>
                <span>BE:</span>
                {storyBe}
            </div>
        );
    }
    if (props.scope?.scope?.includes("QA")) {
        if (props.spill) {
            storyQa = props.qa_spill;
        } else {
            storyQa = props.qa_story;
        }
        el.push(
            <div className="QA" key={"QA" + storyQa}>
                <span>QA:</span>
                {storyQa}
            </div>
        );
    }
    const total = storyFe + storyBe + storyQa
    el.push(
        <div className="total" key={"total" + total}>
            <span>Total:</span>
            {total}
        </div>
    );
    return <div className="cardBody">{el}</div>;
}

function GraphLeaf(props: any) {
    const navigate = useNavigate();

    function issueClicked() {
        navigate({
            pathname: `/issue/${props.id}`,
            search: `?${createSearchParams({
                type: "estimate"
            })}`
        });
    }

    return (
        <GraphLeafStyled>
            <div className="headContainer">
                <div className="cardHead">
                    {props.ticket}
                </div>
                <IconButton onClick={issueClicked}>
                    <BugReportIcon />
                </IconButton>
            </div>
            <Divider style={{ marginTop: "2px" }} />
            <div>
                {storyPoint(props)}
            </div>
        </GraphLeafStyled>
    );
}

export default GraphLeaf;
import { GraphLeafStyled } from "./GraphLeaf.style";
import Divider from '@mui/material/Divider';

function storyPoint(props: any) {
    const el = [];
    let storyFe = 0;
    let storyBe = 0;
    let storyQa = 0;
    if (props.scope.scope.includes("FE")) {
        if (props.spill) {
            storyFe = props.fe_spill;
        } else {
            storyFe = props.fe_story;
        }
        el.push(
            <div className="FE">
                <span>FE:</span>
                {storyFe}
            </div>
        );
    }
    if (props.scope.scope.includes("BE")) {
        if (props.spill) {
            storyBe = props.be_spill;
        } else {
            storyBe = props.be_story;
        }
        el.push(
            <div className="BE">
                <span>BE:</span>
                {storyBe}
            </div>
        );
    }
    if (props.scope.scope.includes("QA")) {
        if (props.spill) {
            storyQa = props.qa_spill;
        } else {
            storyQa = props.qa_story;
        }
        el.push(
            <div className="QA">
                <span>QA:</span>
                {storyQa}
            </div>
        );
    }
    el.push(
        <div className="total">
            <span>Total:</span>
            {storyFe + storyBe + storyQa}
        </div>
    );
    return <div className="cardBody">{el}</div>;
}

function GraphLeaf(props: any) {
    return (
        <GraphLeafStyled>
            <div className="cardHead">
                {props.ticket}
            </div>
            <Divider style={{marginTop:"2px"}}/>
            <div>
                {storyPoint(props)}
            </div>
        </GraphLeafStyled>
    );
}

export default GraphLeaf;
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Fab from '@mui/material/Fab';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { TableStoryPointStyle } from './tableStoryPoint.style';

function TableStoryPoint(props: any) {
    const [storyPoint, setStorypoint] = useState(props.scrumResourceProjectData?.length ? props.scrumResourceProjectData[0].story : 0)
    function storyPointChanged(event: any) {
        setStorypoint(event.target.value)
    }

    useEffect(() => {
        setStorypoint(
          props.scrumResourceProjectData?.length
            ? props.scrumResourceProjectData[0].story
            : 0
        );
      }, [
        props.scrumResourceProjectData?.length
          ? props.scrumResourceProjectData[0].story
          : 0,
      ]);

    function updateStoryPoint() {
        props.send({
            type: "updateStoryPoint", data: {
                storyPoint,
                id: props.scrumResourceProjectData[0].id
            }
        })
    }

    if (props.scrumResourceProjectData && props.scrumResourceProjectData.length) {
        return (
            <TableStoryPointStyle>
                <TextField
                    label="Story Point"
                    variant="standard"
                    value={storyPoint}
                    onChange={storyPointChanged}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 10 } }}
                />
                <Fab size="small" color="primary" onClick={updateStoryPoint}>
                    <UpgradeIcon />
                </Fab>
            </TableStoryPointStyle>
        )
    }
    return <></>
}

export default TableStoryPoint
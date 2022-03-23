const removeScrumResourceProjectCond = (context: any, event: any) => {
    if (context.removeScrumResourceProject) {
        return true;
    }
    return false;
}

const updateScrumResourceProjectCond = (context: any, event: any) => {
    if (context.updateScrumResourceProject) {
        return true;
    }
    return false;
}

const insertScrumResourceProjectCond = (context: any, event: any) => {
    if (context.insertScrumResourceProject) {
        return true;
    }
    return false;
}

export const guards = {
    removeScrumResourceProjectCond,
    updateScrumResourceProjectCond,
    insertScrumResourceProjectCond,
}
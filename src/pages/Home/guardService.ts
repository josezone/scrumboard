const checkPrjectGroupExists = (context: any, event: any) => {
    if (context.projectGroupList.length) {
        return true;
    }
    return false;
}

export const guards = {
    checkPrjectGroupExists,
}
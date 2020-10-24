

export function isNotEmpty(value) {
    return  value !== undefined && value !== null && value !== ''
}


export function parseParams(loadOptions) {
    let params = '';
    [
        'skip',
        'take',
        'requireTotalCount',
        'requireGroupCount',
        'sort',
        'filter',
        'totalSummary',
        'group',
        'groupSummary'
    ].forEach(function(i) {
        if(i in loadOptions && isNotEmpty(loadOptions[i]))
        { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
    });
    params = params.slice(0, -1);
    return params
}


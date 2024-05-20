export function getFilterColor(array: any[], tagToFind: string, not_empty?: boolean)    {
    let count = 0;

    if(not_empty) {
        return 'green';
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i].tag === tagToFind) {
            count = count + 1;
        }
    }

    if(count >= 3) {
        return 'red';
    }
    if(count < 3 && count > 0) {
        return 'yellow';
    }

    return 'green';
}

import { groupBy } from 'lodash';
import moment from 'moment';
const groups = (() => {
    const day = (item) => moment(item.time).format('MMM DD YYYY'),
        hour = (item) => day(item) + ' ' + moment(item.time).format('hh a'),
        month = (item) => moment(item.time).format('MMM YYYY'),
        week = (item) => month(item) + ' ' + moment(item.time).format('ww');
    return {
        day,
        hour,
        month,
        week,
    };
})();

export function groupByDateRange<T>({
    list,
    dateGroup,
}: {
    list: T[];
    dateGroup: string;
}) {
    const groupedList = groupBy(list, groups[dateGroup]);
    let count = {};
    Object.keys(groupedList).forEach((x) => {
        count[x] = groupedList[x].length;
    });
    return count;
}

// by6Hour = (item) => {
//     const m = moment(item.time);
//     return (
//         day(item) +
//         ' ' +
//         ['first', 'second', 'third', 'fourth'][
//             Number(m.format('k')) % 6
//         ] +
//         ' 6 hours'
//     );
// },

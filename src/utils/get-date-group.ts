export function getDateGroup({ from, to }: { from: Date; to: Date }) {
    //difference in hours
    const diffHours = Math.round(
        (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60),
    );
    if (diffHours < 24) return 'hour';
    //difference in weeks
    const diffWeeks = Math.round(
        (new Date(to).getTime() - new Date(from).getTime()) /
            (1000 * 60 * 60 * 24 * 7),
    );
    if (diffWeeks < 3) return 'day';
    //difference in months
    const diffMonths = Math.round(
        (new Date(to).getTime() - new Date(from).getTime()) /
            (1000 * 60 * 60 * 24 * 30),
    );
    if (diffMonths < 2) return 'week';

    return 'month';
}

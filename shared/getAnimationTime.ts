export default function getAnimationTime(velocity: number, distance: number): number {
    const time = distance / velocity / 1000;
    return time;
}

export function animateRace(
    allSvg: HTMLElement[],
    allEndX: number,
    allDurations: number[],
    requestIdRace: number[]
): number[] {
    requestIdRace = allSvg.map((_, i) => {
        let currentX: number = 0;
        const framesCount: number = allDurations[i] * 60;
        const dx: number = (allEndX - allSvg[i].offsetLeft) / framesCount;
        const tick = (): void => {
            currentX += dx;
            allSvg[i].style.transform = `translateX(${currentX}px)`;
            if (currentX < allEndX) {
                requestIdRace[i] = window.requestAnimationFrame(tick);
            }
        };
        tick();

        return requestIdRace[i];
    });
    return requestIdRace;
}

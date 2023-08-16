import {
    numberOfGrannies,
    pageNum,
    wrapper,
    winMessage,
    startRaceBtn,
    stopRaceBtn,
    displayedItems,
} from '../../shared/consts';
import { globalParentId } from '../../entities/granny/grannyModel';
import {
    sendRequestToUpdateInfo,
    sendRequestToAddGranny,
    getGranniesData,
    startDrivingApi,
    stopEngineApi,
} from '../../api/api';
import { granniesNames, granniesLastNames } from '../../shared/GrannyNames';
import { startEngineApi } from '../../api/api';
import { getWinnerId } from '../../shared/getWinnerId';
import GranniesPageView from './granniesPageView';
import { GrannyPram, DriveParams } from '../../types/types';

export let requestIdRace: number[] = [];
const allNeededId: string[] = [];
const imageContainer: HTMLElement[] = [];

export default class GranniesPageController {
    public updateGranniesNumber(root: HTMLDivElement, data: GrannyPram[]): HTMLDivElement {
        root.innerHTML = '';
        numberOfGrannies.innerText = `Grannies (${data.length})`;

        root.append(numberOfGrannies, pageNum);
        return wrapper;
    }

    public updateGrannyParam(): void {
        const updateNameInput = document.getElementById('update-name');
        const updateColorInput = document.getElementById('update-color');
        const updateBtn = document.getElementById('update-btn');

        if (
            updateNameInput instanceof HTMLInputElement &&
            updateColorInput instanceof HTMLInputElement &&
            updateBtn instanceof HTMLButtonElement
        ) {
            const colorInputValue: string = updateColorInput.value;
            const nameInputValue: string = updateNameInput.value || 'No__Name';

            if (globalParentId) {
                sendRequestToUpdateInfo(globalParentId, nameInputValue, colorInputValue);
            }
            updateBtn.disabled = true;
            updateNameInput.disabled = true;
            updateColorInput.disabled = true;
        }
    }

    public addNewGrannyToServer(): void {
        const createNameInput = document.getElementById('create-name');
        const createColorInput = document.getElementById('create-color');
        if (
            createNameInput instanceof HTMLInputElement &&
            createColorInput instanceof HTMLInputElement
        ) {
            const nameInputValue: string = createNameInput.value || 'No__Name';
            const colorInputValue: string = createColorInput.value;

            sendRequestToAddGranny(nameInputValue, colorInputValue);
        }
    }

    public async generateGrannies(): Promise<void> {
        await getGranniesData();

        const grannyList: GrannyPram[] = [];

        granniesNames.forEach((gName: string) => {
            granniesLastNames.forEach((lastName: string) => {
                const name: string = gName + ' ' + lastName;
                const color: string = getRandomColor();
                grannyList.push({ name, color });
            });
        });

        const numOfGrannies: number = 100;
        const randomGrannies: GrannyPram[] = grannyList
            .sort(() => Math.random() - Math.random())
            .slice(0, numOfGrannies);

        randomGrannies.forEach((newGranny) => {
            sendRequestToAddGranny(newGranny.name, newGranny.color);
        });

        function getRandomColor(): string {
            const letters: string = '0123456789ABCDEF';
            let color: string = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }

    public async startRace(): Promise<void> {
        allNeededId.length = 0;
        const openedPage: number = +pageNum.innerText.split(' ')[1];
        const allGrannies: HTMLLIElement[] = Array.from(document.querySelectorAll('.granny-item'));
        const granniesToRace = allGrannies.slice(
            +`${(openedPage - 1) * displayedItems}`,
            +`${openedPage * displayedItems}`
        );

        granniesToRace.forEach((granny) => {
            allNeededId.push(granny.id);
        });

        const imageContainerWidth: number = (
            document.querySelectorAll('.granny-block')[
                `${(openedPage - 1) * displayedItems}`
            ] as HTMLDivElement
        ).offsetWidth;
        const animationTimeList: number[] = [];

        addAnimation(animationTimeList, granniesToRace, imageContainerWidth);

        addWinsMessage(allGrannies, animationTimeList);
    }

    public stopRace(): void {
        allNeededId.map((id: string) => stopEngineApi(id));

        imageContainer.forEach((container: HTMLElement) => {
            container.style.transform = 'none';
        });

        winMessage.classList.remove('active');
        stopRaceBtn.disabled = true;
        startRaceBtn.disabled = false;
    }
}

async function addAnimation(
    animationTimeList: number[],
    granniesToRace: HTMLLIElement[],
    imageContainerWidth: number
): Promise<void> {
    await Promise.all(allNeededId.map((id: string) => startEngineApi(id))).then(
        (
            allDriveParams: {
                driveParams: DriveParams;
            }[]
        ) => {
            const driveParamsArr: DriveParams[] = allDriveParams.map(
                (eachParam) => eachParam.driveParams
            );
            animationTimeList.length = 0;
            driveParamsArr.map((param) => {
                const distance = Object.values(param)[1];
                const velocity = Object.values(param)[0];
                animationTimeList.push(distance / velocity / 1000);
            });
            const allImages: HTMLElement[] = [];
            granniesToRace.forEach((granny) => {
                allImages.push(
                    granny.lastChild?.firstChild?.nextSibling?.firstChild as HTMLElement
                );
                imageContainer.push(
                    granny.lastChild?.firstChild?.nextSibling?.firstChild as HTMLElement
                );
            });
            createAnimation(allImages, imageContainerWidth, animationTimeList);
            startRaceBtn.disabled = true;
        }
    );
}

function createAnimation(
    allGranniesSvg: HTMLElement[],
    allEndX: number,
    allDurations: number[]
): number[] {
    requestIdRace = allGranniesSvg.map((_, i) => {
        let currentX: number = 0;
        const framesCount: number = allDurations[i] * 60;
        const dx: number = (allEndX - allGranniesSvg[i].offsetLeft) / framesCount;
        const tick = (): void => {
            currentX += dx;
            allGranniesSvg[i].style.transform = `translateX(${currentX}px)`;
            if (currentX < allEndX) {
                requestIdRace[i] = window.requestAnimationFrame(tick);
            }
        };
        tick();
        return requestIdRace[i];
    });
    return requestIdRace;
}

function addWinsMessage(allGrannies: HTMLLIElement[], animationTimeList: number[]): void {
    Promise.any(allNeededId.map((id: string) => startDrivingApi(id)))
        .then((id: { url: string }) => {
            const winnersId: number = getWinnerId(id);
            new GranniesPageView().showWinner(
                winnersId,
                allGrannies,
                animationTimeList[winnersId - 1]
            );
            stopRaceBtn.disabled = false;
        })
        .catch(() => {
            stopRaceBtn.disabled = false;
        });
}

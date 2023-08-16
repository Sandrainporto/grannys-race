import {
    baseUrl,
    Path,
    GrannyPram,
    EngineStatus,
    WinnersParam,
    Methods,
    DriveParams,
} from '../types/types';
import { grannyList, granniesPageInfo, pageNum, tableTitle, table } from '../shared/consts';
import GranniesPageController, {
    requestIdRace,
} from '../pages/granniesPage/granniesPageController';
import { GrannyView } from '../entities/granny/grannyView';
import getAnimationTime from '../shared/getAnimationTime';
import { requestID } from '../entities/granny/grannyModel';
import WinnersController from '../pages/winnersPage/winnersController';
import pagination from '../shared/pagination';

export let granniesData: GrannyPram[];
export let animationTime: number;
const initialPageNum: number = 1;
let displayedItems: number;

export async function getGranniesData(): Promise<GrannyPram[]> {
    try {
        const response: Response = await fetch(`${baseUrl}${Path.Grannies}`);
        granniesData = await response.json();
        return granniesData;
    } catch (error) {
        throw new Error('Server is not started. Turn on the server');
    }
}

export async function showGranniesPage(): Promise<GrannyPram[]> {
    try {
        const response: Response = await fetch(`${baseUrl}${Path.Grannies}`);
        const grannies: [] = await response.json();

        new GranniesPageController().updateGranniesNumber(granniesPageInfo, grannies);
        new GrannyView().drawGranny(grannyList, grannies);

        const allGrannies: NodeListOf<Element> = document.querySelectorAll('.granny-item');
        displayedItems = 7;

        pagination(pageNum, initialPageNum, allGrannies, displayedItems);
        return grannies;
    } catch (error) {
        throw new Error(`Couldn't get data from ${baseUrl}${Path.Grannies}`);
    }
}

export const grannies = async (): Promise<void> => {
    await showGranniesPage();
};

export const createRequestToAddGranny = async (granny: GrannyPram): Promise<GrannyPram> => {
    try {
        const response: Response = await fetch(`${baseUrl}${Path.Grannies}`, {
            method: Methods.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(granny),
        });
        const newGrannyParam: GrannyPram = await response.json();
        return newGrannyParam;
    } catch (error) {
        throw new Error("Request to add a new granny to the server wasn't created.");
    }
};

export const sendRequestToAddGranny = async (name: string, color: string): Promise<void> => {
    await createRequestToAddGranny({ name, color });
    await showGranniesPage();
};

export async function deleteGrannyApi(id: string): Promise<{ deleteResponse: [] }> {
    try {
        const response: Response = await fetch(`${baseUrl}${Path.Grannies}/${id}`, {
            method: Methods.DELETE,
        });

        deleteWinnerApi(id);

        const deleteResponse: [] = await response.json();

        await showGranniesPage();

        return { deleteResponse };
    } catch (error) {
        throw new Error("An error occurred while deleting the granny. Granny wasn't found.");
    }
}

export async function updateGrannyApi(id: string, granny: GrannyPram): Promise<GrannyPram[]> {
    try {
        const response: Response = await fetch(`${baseUrl}${Path.Grannies}/${id}`, {
            method: Methods.PUT,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(granny),
        });

        const updatedGranyParam: GrannyPram[] = await response.json();

        return updatedGranyParam;
    } catch (error) {
        throw new Error("An error occurred while updating. Granny wasn't found.");
    }
}

export const sendRequestToUpdateInfo = async (
    id: string,
    name: string,
    color: string
): Promise<void> => {
    await updateGrannyApi(id, { name: name, color: color });
    await showGranniesPage();
};

export async function startEngineApi(id: string): Promise<{ driveParams: DriveParams }> {
    try {
        const response: Response = await fetch(
            `${baseUrl}${Path.Engine}/?id=${id}&status=${EngineStatus.Start}`,
            {
                method: Methods.PATCH,
            }
        );
        const driveParams: DriveParams = await response.json();

        animationTime = +getAnimationTime(driveParams.velocity, driveParams.distance).toFixed(2);
        return { driveParams };
    } catch (error) {
        throw new Error('Granny with such id was not found in the grannies page. Start engine.');
    }
}

export async function stopEngineApi(id: string): Promise<DriveParams> {
    try {
        const response: Response = await fetch(
            `${baseUrl}${Path.Engine}/?id=${id}&status=${EngineStatus.Stop}`,
            {
                method: Methods.PATCH,
            }
        );
        const engineData: DriveParams = await response.json();

        requestIdRace.length !== 0
            ? cancelAnimationFrame(requestIdRace[+`${id}` - 1])
            : cancelAnimationFrame(requestID);

        return engineData;
    } catch (error) {
        throw new Error('Granny with such id was not found in the grannies page. Stop engine.');
    }
}

export async function startDrivingApi(id: string): Promise<{ url: string }> {
    try {
        const url: string = `${baseUrl}${Path.Engine}/?id=${id}&status=${EngineStatus.Drive}`;
        const response: Response = await fetch(url, {
            method: Methods.PATCH,
        });

        await response.json();

        return { url };
    } catch (error) {
        requestIdRace.length !== 0
            ? cancelAnimationFrame(requestIdRace[+`${id}` - 1])
            : cancelAnimationFrame(requestID);
        throw new Error("Granny has been stopped suddenly. It's engine was broken down.");
    }
}

export async function getOneWinner(id: number): Promise<void> {
    const response: Response = await fetch(`${baseUrl}${Path.Winners}/${id}`);

    const winTime: number = +animationTime.toFixed(2);
    let numberOfWins: number = 1;

    if (response.ok) {
        const winnerData: WinnersParam = await response.json();
        numberOfWins = winnerData.wins;

        updateWinner({ wins: numberOfWins + 1, time: winTime }, id);
    } else {
        createWinner({ id, wins: numberOfWins, time: animationTime });
    }
}

export async function createWinner(winner: WinnersParam): Promise<number | undefined> {
    const response: Response = await fetch(`${baseUrl}${Path.Winners}`, {
        method: Methods.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
    });
    if (response.ok) {
        await response.json();
    } else {
        return response.status;
    }
}

export async function updateWinner(
    winner: WinnersParam,
    id: number
): Promise<number | WinnersParam> {
    const response: Response = await fetch(`${baseUrl}${Path.Winners}/${id}`, {
        method: Methods.PUT,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(winner),
    });
    if (response.ok) {
        const newWinnersParam: WinnersParam = await response.json();
        return newWinnersParam;
    } else {
        return response.status;
    }
}

export async function deleteWinnerApi(id: string): Promise<[]> {
    try {
        const response: Response = await fetch(`${baseUrl}${Path.Winners}/${id}`, {
            method: Methods.DELETE,
        });
        const grannyData: [] = await response.json();

        await showGranniesPage();

        return grannyData;
    } catch (error) {
        throw new Error('An error occurred while deleting the granny from winners.');
    }
}

export async function getWinners(): Promise<WinnersParam[]> {
    const response: Response = await fetch(`${baseUrl}${Path.Winners}`);
    const existedWinners: WinnersParam[] = await response.json();
    const createdGrannies: GrannyPram[] = await getGranniesData();

    new WinnersController().createTable(existedWinners, createdGrannies);

    tableTitle.innerText = `Winners (${existedWinners.length})`;

    return existedWinners;
}

export async function getSortedWinnnersData(
    sortBy: string,
    order: string
): Promise<WinnersParam[]> {
    try {
        const response: Response = await fetch(
            `${baseUrl}${Path.Winners}?_sort=${sortBy}&_order=${order}`,
            {}
        );
        const sortedWinnersData: WinnersParam[] = await response.json();
        const createdGrannies: GrannyPram[] = await getGranniesData();
        table.innerHTML = '';

        new WinnersController().createTable(sortedWinnersData, createdGrannies);

        return sortedWinnersData;
    } catch (error) {
        throw new Error('An error occurred while getting sorted winnres data.');
    }
}

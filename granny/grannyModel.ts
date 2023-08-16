import { animationTime, deleteGrannyApi, startEngineApi, stopEngineApi } from '../../api/api';
import { enableUpdateForm, changeButtonsState } from '../../shared/enableForm';
import { startDrivingApi } from '../../api/api';
import { getWinnerId } from '../../shared/getWinnerId';
import GranniesPageView from '../../pages/granniesPage/granniesPageView';
import { winMessage } from '../../shared/consts';

export let globalParentId: string | undefined;
export let requestID: number;

export default class GrannyModel {
    public deleteGranny(event: MouseEvent): void {
        const parentNode: ParentNode | null = (event.target as HTMLElement).parentNode;
        if (parentNode) {
            const parentId: string | undefined = parentNode.parentElement?.id;
            if (parentId) {
                deleteGrannyApi(parentId);
            }
        }
    }

    public selectGranny(event: MouseEvent): string | undefined {
        enableUpdateForm();
        const parentNode: ParentNode | null = (event.target as HTMLElement).parentNode;
        if (parentNode) {
            const parentId: string | undefined = parentNode.parentElement?.id;
            if (parentId) {
                globalParentId = parentId;
                return parentId;
            }
        }
    }

    public async startEngine(event: MouseEvent): Promise<void> {
        const parentNode: ParentNode | null = (event.target as HTMLElement).parentNode;
        const imagesContainer = parentNode?.nextSibling?.firstChild as HTMLDivElement;
        const distanceToOvercome = parentNode?.nextSibling as HTMLDivElement;

        if (parentNode) {
            changeButtonsState(parentNode, true, true);

            const liContainer = parentNode.parentNode?.parentNode as HTMLLIElement;
            const parentId: string | undefined = parentNode.parentElement?.id;

            if (parentId) {
                await startEngineApi(parentId);
                animateCar(imagesContainer, distanceToOvercome.offsetWidth, animationTime);

                startDrivingApi(parentId)
                    .then((id: { url: string }) => {
                        const winnersId: number = getWinnerId(id);
                        new GranniesPageView().showWinner(winnersId, liContainer, animationTime);
                        changeButtonsState(parentNode, true, false);
                    })
                    .catch(() => {
                        console.log('No successful promises');
                        changeButtonsState(parentNode, true, false);
                    });
            }
        }
    }

    public async stopEngine(event: MouseEvent): Promise<void> {
        const parentNode: ParentNode | null = (event.target as HTMLElement).parentNode;

        if (parentNode) {
            changeButtonsState(parentNode, false, true);
            const parentId: string | undefined = parentNode.parentElement?.id;

            if (parentId) {
                await stopEngineApi(parentId);

                const imagesContainer = parentNode?.nextSibling?.firstChild as HTMLDivElement;
                imagesContainer.style.transform = 'none';
            }
        }
        winMessage.classList.remove('active');
    }
}

export function animateCar(imagesContainer: HTMLDivElement, endX: number, duration: number): void {
    let currentX: number = 0;
    const framesCount: number = duration * 60;
    const dx: number = (endX - imagesContainer.offsetLeft) / framesCount;

    const tick = (): void => {
        currentX += dx;
        imagesContainer.style.transform = `translateX(${currentX}px)`;
        if (currentX < endX) {
            requestID = window.requestAnimationFrame(tick);
        }
    };
    tick();
}

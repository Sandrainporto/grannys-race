import './granniesPage.css';
import { getOneWinner } from '../../api/api';
import drawPaginationControllers from '../../shared/buttons';
import {
    wrapper,
    granniesPageInfo,
    numberOfGrannies,
    grannyList,
    pageNum,
    winMessage,
    stopRaceBtn,
    startRaceBtn,
    displayedItems,
} from '../../shared/consts';
import createForm from '../../shared/createForm';
import { CallbackEvent, CreareFormParam, UpdateFormValues } from '../../types/types';
import GarageController from './granniesPageController';
import pagination from '../../shared/pagination';

export default class GranniesPageView {
    public drawPage(): HTMLDivElement {
        const pageTool = document.createElement('div');
        pageTool.classList.add('page__tools');
        const buttonsRace = document.createElement('div');
        buttonsRace.classList.add('race-btns');

        const updateGranny = new GarageController().updateGrannyParam;
        const addNewGranny = new GarageController().addNewGrannyToServer;
        createForm(pageTool, CreareFormParam, addNewGranny);
        createForm(pageTool, UpdateFormValues, updateGranny);

        pageTool.append(buttonsRace);

        this.generateGranniesBtn(buttonsRace, new GarageController().generateGrannies);
        this.startRace(buttonsRace, new GarageController().startRace);
        this.stopRace(buttonsRace, new GarageController().stopRace);

        granniesPageInfo.append(numberOfGrannies, pageNum);
        wrapper.append(pageTool, granniesPageInfo, grannyList);

        drawPaginationControllers(wrapper, 'grannies__pagination');

        const allGrannies = document.querySelectorAll('.granny-item');
        const savedPage = localStorage.getItem('paginationPageG') as string;
        if (localStorage.getItem('paginationPageG')) {
            pagination(pageNum, +savedPage, allGrannies, displayedItems);
        }
        return wrapper;
    }

    public selectGrannyBtn(root: HTMLDivElement, callback: CallbackEvent): void {
        const grannySelect = document.createElement('button');
        grannySelect.classList.add('granny-select', 'button');
        grannySelect.innerText = 'Select';
        grannySelect.addEventListener('click', callback);
        root.append(grannySelect);
    }

    public removeGrannyBtn(root: HTMLDivElement, callback: CallbackEvent): void {
        const grannyRemove = document.createElement('button');
        grannyRemove.classList.add('granny-remove', 'button');
        grannyRemove.innerText = 'Remove';
        grannyRemove.addEventListener('click', callback);
        root.append(grannyRemove);
    }

    private generateGranniesBtn(root: HTMLDivElement, callback: CallbackEvent): void {
        const generateGrannies = document.createElement('button');
        generateGrannies.classList.add('generate-grannies', 'button');
        generateGrannies.innerText = 'Generate Grannies';
        generateGrannies.addEventListener('click', callback);
        root.append(generateGrannies);
    }

    private startRace(root: HTMLDivElement, callback: CallbackEvent): void {
        startRaceBtn.innerText = 'Race';
        startRaceBtn.addEventListener('click', callback);
        root.append(startRaceBtn);
    }

    private stopRace(root: HTMLDivElement, callback: CallbackEvent): void {
        stopRaceBtn.innerText = 'Stop';
        stopRaceBtn.addEventListener('click', callback);
        stopRaceBtn.disabled = true;
        root.append(stopRaceBtn);
    }

    public showWinner(
        id: number,
        allGrannies: HTMLLIElement[] | HTMLLIElement,
        time: number
    ): void {
        let winnerName: string | undefined;

        if (Array.isArray(allGrannies)) {
            allGrannies.forEach((granny) => {
                if (+granny.id === id) {
                    winnerName = granny.querySelector('h3')?.innerText;
                }
            });
        } else {
            winnerName = allGrannies.querySelector('h3')?.innerText;
        }

        winMessage.classList.add('active');
        winMessage.innerText = `The Winner is ${winnerName}`;

        document.body.prepend(winMessage);
        getOneWinner(id);
    }
}

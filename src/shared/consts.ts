import { grannies } from '../api/api';

export const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');
wrapper.id = 'grannies';
document.body.append(wrapper);

export const table = document.createElement('table');
table.classList.add('page__table', 'table');

export const granniesPageInfo = document.createElement('div');
granniesPageInfo.classList.add('grannies__box', 'box');

export const numberOfGrannies = document.createElement('h2');
numberOfGrannies.classList.add('grannies-page__title');
numberOfGrannies.innerText = `Grannies (${grannies()})`;

export const tableTitle = document.createElement('h2');
tableTitle.classList.add('page__title');

export const pageNum = document.createElement('h3');
pageNum.classList.add('grannies__page');

export const tablePage = document.createElement('h3');
tablePage.classList.add('page__page-num');

export const grannyList = document.createElement('ul');
grannyList.classList.add('grannies__car-list', 'grannies-list');

export const displayedItems: number = 7;

export const winMessage = document.createElement('div');
winMessage.classList.add('win-message');

export const stopRaceBtn = document.createElement('button');
stopRaceBtn.classList.add('race-stop', 'button');

export const startRaceBtn = document.createElement('button');
startRaceBtn.classList.add('race-start', 'button');

import { Buttons } from '../types/types';
export const headerButtons = document.createElement('div');
headerButtons.classList.add('header__buttons', 'buttons');

export const toGranniesBtn = document.createElement('button');
toGranniesBtn.classList.add('buttons__grannies', 'button');
toGranniesBtn.id = Buttons.ToGranniesId;
toGranniesBtn.innerHTML = Buttons.ToGrannies;

export const winnersBtn = document.createElement('button');
winnersBtn.classList.add('buttons__winners', 'button');
winnersBtn.id = Buttons.ToWinnersId;
winnersBtn.innerHTML = Buttons.ToWinners;

export default function drawPaginationControllers(root: HTMLDivElement, className: string): void {
    const paginationBlock = document.createElement('div');
    paginationBlock.classList.add(className, 'pagination');
    prevPageBtn(paginationBlock);
    nextPageBtn(paginationBlock);
    root.append(paginationBlock);
}

function prevPageBtn(root: HTMLDivElement): void {
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('prev-btn', 'btn');
    prevBtn.innerText = 'Prev';
    root.append(prevBtn);
}

function nextPageBtn(root: HTMLDivElement): void {
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next-btn', 'btn');
    nextBtn.innerText = 'Next';
    root.append(nextBtn);
}

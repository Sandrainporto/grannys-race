import './tracks.css';
import GranniesPageView from '../../pages/granniesPage/granniesPageView';
import GrannyModel from './grannyModel';
import { CallbackEvent, GrannyPram } from '../../types/types';

export class GrannyView {
    public getCartSVG(color: string): string {
        const carSvg = `
        <?xml version="1.0" standalone="no"?>
        <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
        "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="40pt" height="40pt" viewBox="0 0 85.000000 85.000000"
        preserveAspectRatio="xMidYMid meet">
        <g transform="translate(0.000000,85.000000) scale(0.100000,-0.100000)"
        fill='${color}' stroke="black" stroke-width="20"><path d="M717 740 c-14 -11 -28 -33 -32 -50 -8 -35 12 -31 -348 -58 -142 -11 -261 -22 -264 -25 -6 -7 17 -141 43 -260 13 -58 20 -70 42 -78 30 -12 354 -15
        424 -4 38 6 48 12 57 34 15 39 48 156 66 236 30 135 43 163 80 175 28 9 45 27 45 46 0 2 -20 4 -44 4 -28 0 -52 -7 -69 -20z m-327 -191 c8 0 30 3 48 7 73 15
        107 -58 61 -132 -22 -36 -89 -94 -109 -94 -16 0 -67 43 -102 87 -55 69 -25 152 50 139 21 -4 44 -7 52 -7z"/>
        <path d="M184 192 c-13 -9 -34 -46 -34 -62 0 -19 48 -60 70 -60 28 0 60 35 60
        65 0 46 -60 82 -96 57z"/>
        <path d="M520 180 c-11 -11 -20 -30 -20 -42 1 -68 95 -89 120 -28 27 66 -50
        120 -100 70z"/>
        </g>
        </svg>`;
        return carSvg;
    }

    public drawGranny(root: HTMLElement, data: GrannyPram[]): void {
        root.innerHTML = '';
        const granniesServerData: GrannyPram[] = data;
        granniesServerData.map(({ id, name, color }) => {
            const grannyItem = document.createElement('li');
            grannyItem.classList.add('granny-item', 'item');
            grannyItem.id = `${id}`;
            const grannyControllers = document.createElement('div');
            grannyControllers.classList.add('granny-controllers');
            const grannyName = document.createElement('h3');
            grannyName.classList.add('granny-name');
            grannyName.innerText = `${name}`;

            new GranniesPageView().selectGrannyBtn(
                grannyControllers,
                new GrannyModel().selectGranny
            );
            new GranniesPageView().removeGrannyBtn(
                grannyControllers,
                new GrannyModel().deleteGranny
            );

            const grannyBox = document.createElement('div');
            grannyBox.classList.add('granny-box');
            grannyBox.id = `${id}`;
            const engineControllers = document.createElement('div');
            engineControllers.classList.add('engine-controllers');

            this.startGrannyBtn(engineControllers, new GrannyModel().startEngine);
            this.stopGrannyBtn(engineControllers, new GrannyModel().stopEngine);

            grannyControllers.append(grannyName);
            grannyBox.append(engineControllers);

            this.drawGrannyImage(grannyBox, color);
            this.finishLine(grannyBox);
            grannyItem.append(grannyControllers, grannyBox);
            root.append(grannyItem);
        });
    }

    private drawGrannyImage(root: HTMLDivElement, color: string): void {
        const grannyBlock = document.createElement('div');
        grannyBlock.classList.add('granny-block');

        const grannyImg = document.createElement('img');
        grannyImg.classList.add('granny-image');
        grannyImg.src = require('../../assets/granny.png');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.innerHTML = this.getCartSVG(color);
        imageContainer.append(grannyImg);

        grannyBlock.append(imageContainer);
        root.append(grannyBlock);
    }

    private startGrannyBtn(root: HTMLDivElement, callback: CallbackEvent): void {
        const startBtn = document.createElement('button');
        startBtn.classList.add('granny-start', 'button');
        startBtn.innerText = 'Start';
        startBtn.addEventListener('click', callback);
        root.append(startBtn);
    }

    private stopGrannyBtn(root: HTMLDivElement, callback: CallbackEvent): void {
        const stopBtn = document.createElement('button');
        stopBtn.classList.add('granny-stop', 'button');
        stopBtn.innerText = 'Stop';
        stopBtn.disabled = true;
        stopBtn.addEventListener('click', callback);
        root.append(stopBtn);
    }

    private finishLine(root: HTMLDivElement): void {
        const finish = document.createElement('div');
        finish.classList.add('finish-line');

        const finishIcon = document.createElement('img');
        finishIcon.classList.add('finish-icon');
        finishIcon.alt = 'finish-icon-flag';
        finishIcon.src = require('../../assets/post-office.png');

        finish.append(finishIcon);
        root.append(finish);
    }
}

import './header.css';
import { headerButtons, toGranniesBtn, winnersBtn } from '../../shared/buttons';
import HeaderController from './headerController';

export default class HeaderView {
    public showHeader(): HTMLElement {
        const header = document.createElement('header');
        header.classList.add('header');

        const siteTitle = document.createElement('h1');
        siteTitle.className = 'header__title';
        siteTitle.innerText = "Granny's Race";

        header.append(siteTitle, headerButtons);
        headerButtons.append(toGranniesBtn, winnersBtn);
        header.append(headerButtons);
        document.body.prepend(header);

        new HeaderController().changePage();
        return header;
    }
}

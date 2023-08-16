import { headerButtons } from '../../shared/buttons';
import { pageNum, tablePage, wrapper } from '../../shared/consts';
import WinnersView from '../../pages/winnersPage/winnersView';
import GranniesPageView from '../../pages/granniesPage/granniesPageView';

export default class HeaderController {
    public changePage(): HTMLDivElement {
        headerButtons.addEventListener('click', (e: MouseEvent) => {
            const target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
            if (wrapper && target) {
                wrapper.id = target.id;
                wrapper.innerHTML = '';
            }
            wrapper.id === 'grannies'
                ? wrapper.replaceWith(new GranniesPageView().drawPage())
                : wrapper.replaceWith(new WinnersView().drawPage());
            localStorage.setItem('paginationPageG', pageNum.innerText.split(' ')[1]);
            localStorage.setItem('paginationPageW', tablePage.innerText.split(' ')[1]);
        });
        return wrapper;
    }
}

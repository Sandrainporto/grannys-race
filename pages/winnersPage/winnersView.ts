import './winnersPage.css';
import drawPaginationControllers from '../../shared/buttons';
import { wrapper, tableTitle, tablePage } from '../../shared/consts';
import { table } from '../../shared/consts';
import { getWinners } from '../../api/api';

export default class WinnersView {
    public drawPage(): HTMLDivElement {
        const winnersTable = document.createElement('div');
        winnersTable.classList.add('winners__page', 'page');
        table.innerHTML = '';

        getWinners();

        winnersTable.append(tableTitle, tablePage, table);

        drawPaginationControllers(winnersTable, 'winners-pagination');

        wrapper.append(winnersTable);
        return wrapper;
    }
}

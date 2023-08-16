import { GrannyPram, SortingOrder, WinnersParam } from '../../types/types';
import { table } from '../../shared/consts';
import { GrannyView } from '../../entities/granny/grannyView';
import { getSortedWinnnersData } from '../../api/api';

export default class WinnersController {
    public createTable(winners: WinnersParam[], grannies: GrannyPram[]): HTMLDivElement {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
        <th>№</th>
        <th>Cart Image</th>
        <th>Name</th>
        <th id='wins'>Wins</th>
        <th id='time'>Best time (sec)</th>`;
        table.append(tableRow);

        let rowNumber = 1;
        winners.map(({ id, wins, time }) => {
            const sortedGrannies = grannies.find((granny) => granny.id === id);
            const row = document.createElement('tr');
            row.classList.add('winners-info');
            if (sortedGrannies) {
                row.innerHTML = `
            <td class="granny__id">${rowNumber++}</td>    
            <td class="granny__color">${new GrannyView().getCartSVG(sortedGrannies.color)}</td> 
            <td class="granny__name">${sortedGrannies.name}</td>
            <td class="granny__wins">${wins}</td>
            <td class="granny__time">${time}</td></tr>`;
            }
            table.append(row);
        });

        const winsHeader = document.querySelector('tr:nth-child(1)');
        winsHeader?.addEventListener('click', (e) => {
            const target = e.target instanceof HTMLTableCellElement ? e.target : null;
            if (target) {
                localStorage.getItem('sortFlag') === 'sort'
                    ? target.classList.remove('sort')
                    : target.classList.add('sort');

                this.getSortedTable(target);
            }
        });
        return table;
    }

    private getSortedTable(target: HTMLTableCellElement): void {
        if (target) {
            const cellID: string = target.id;

            localStorage.setItem('sortFlag', target.className);

            target.classList.contains('sort')
                ? getSortedWinnnersData(cellID, SortingOrder.desc)
                : getSortedWinnnersData(cellID, SortingOrder.asc);
        }
    }
}

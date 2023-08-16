import HeaderView from '../widgets/header/headerView';
import { wrapper } from '../shared/consts';
import GranniesPageView from '../pages/granniesPage/granniesPageView';

export default class App {
    public drawPage(): HTMLElement {
        const header = new HeaderView().showHeader();
        wrapper.replaceWith(new GranniesPageView().drawPage());
        return header;
    }
}

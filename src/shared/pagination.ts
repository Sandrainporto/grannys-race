export default function pagination(
    pageNum: HTMLHeadElement,
    initialPageNum: number,
    allItems: NodeListOf<Element>,
    maxItems: number
): void {
    const prevBtn: HTMLElement | null = document.querySelector('.prev-btn');
    const nextBtn: HTMLElement | null = document.querySelector('.next-btn');
    if (!initialPageNum) {
        initialPageNum = 1;
    }
    const maxItemsOnThePage: number = maxItems;
    const lastPage: number = Math.ceil(allItems.length / maxItemsOnThePage);

    if (prevBtn && nextBtn) {
        checkBtn(prevBtn, nextBtn, lastPage, initialPageNum);
        showItems(allItems, initialPageNum, maxItemsOnThePage);
        pageNum.innerText = `Page ${initialPageNum} / ${lastPage}`;
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            initialPageNum--;
            checkBtn(prevBtn, nextBtn, lastPage, initialPageNum);
            showItems(allItems, initialPageNum, maxItemsOnThePage);
            pageNum.innerText = `Page ${initialPageNum} / ${lastPage}`;
        });

        nextBtn.addEventListener('click', () => {
            initialPageNum++;
            checkBtn(prevBtn, nextBtn, lastPage, initialPageNum);
            showItems(allItems, initialPageNum, maxItemsOnThePage);
            pageNum.innerText = `Page ${initialPageNum} / ${lastPage}`;
        });
    }
}

function checkBtn(
    prevBtn: HTMLElement,
    nextBtn: HTMLElement,
    lastPage: number,
    initialPageNum: number
): void {
    if (prevBtn && nextBtn) {
        initialPageNum === lastPage
            ? nextBtn.classList.add('disabled')
            : nextBtn.classList.remove('disabled');
        initialPageNum === 1
            ? prevBtn.classList.add('disabled')
            : prevBtn.classList.remove('disabled');
    }
}

function showItems(
    allItems: NodeListOf<Element>,
    initialPageNum: number,
    maxItemsOnThePage: number
): void {
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].classList.remove('show');
        allItems[i].classList.add('hide');

        if (
            i >= initialPageNum * maxItemsOnThePage - maxItemsOnThePage &&
            i < initialPageNum * maxItemsOnThePage
        ) {
            allItems[i].classList.remove('hide');
            allItems[i].classList.add('show');
        }
    }
}

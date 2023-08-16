export function enableUpdateForm(): void {
    const updateNameInput = document.getElementById('update-name');
    const updateColorInput = document.getElementById('update-color');
    const updateBtn = document.getElementById('update-btn');
    if (
        updateNameInput instanceof HTMLInputElement &&
        updateColorInput instanceof HTMLInputElement &&
        updateBtn instanceof HTMLButtonElement
    ) {
        updateBtn.disabled = false;
        updateNameInput.disabled = false;
        updateColorInput.disabled = false;
    }
}

export function changeButtonsState(parentNode: ParentNode, state1: boolean, state2: boolean): void {
    const startBtn = parentNode.firstChild;
    const stopBtn = parentNode.lastChild;

    if (startBtn instanceof HTMLButtonElement && stopBtn instanceof HTMLButtonElement) {
        startBtn.disabled = state1;
        stopBtn.disabled = state2;
    }
}

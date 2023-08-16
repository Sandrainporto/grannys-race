import { ParamTypes, Callback } from '../types/types';

export default function createForm(
    root: HTMLDivElement,
    param: ParamTypes,
    callback: Callback
): void {
    const createTool = document.createElement('form');
    createTool.classList.add('form');
    createTool.id = param.toolId;

    const nameField = document.createElement('input');
    nameField.classList.add('form__input');
    nameField.type = 'text';
    nameField.id = param.nameId;

    const colorField = document.createElement('input');
    colorField.classList.add('form__color');
    colorField.type = 'color';
    colorField.value = param.color;
    colorField.id = param.colorId;

    const btnField = document.createElement('button');
    btnField.classList.add('form__btn', 'btn');
    btnField.type = 'button';
    btnField.id = param.btnId;
    btnField.innerText = param.btnText;
    btnField.addEventListener('click', callback);

    if (createTool.id === 'update-form') {
        nameField.disabled = true;
        colorField.disabled = true;
        btnField.disabled = true;
    }

    createTool.append(nameField, colorField, btnField);
    root.append(createTool);
}

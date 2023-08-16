export const baseUrl = 'http://127.0.0.1:3000';

export enum Path {
    Grannies = '/garage',
    Winners = '/winners',
    Engine = '/engine',
}

export enum EngineStatus {
    Start = 'started',
    Stop = 'stopped',
    Drive = 'drive',
}

export enum Methods {
    PATCH = 'PATCH',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
}

export enum Buttons {
    ToGrannies = 'to grannies',
    ToGranniesId = 'grannies',
    ToWinners = 'to winners',
    ToWinnersId = 'winnersBtn',
}

export interface ParamTypes {
    toolId: string;
    nameId: string;
    colorId: string;
    color: string;
    btnId: string;
    btnText: string;
}

export type Callback = () => void;

export type CallbackEvent = (event: MouseEvent) => void;

export enum CreareFormParam {
    toolId = 'create-form',
    nameId = 'create-name',
    colorId = 'create-color',
    color = '#40E0D0',
    btnId = 'create-btn',
    btnText = 'Create',
}

export enum UpdateFormValues {
    toolId = 'update-form',
    nameId = 'update-name',
    colorId = 'update-color',
    color = '#90EE90',
    btnId = 'update-btn',
    btnText = 'Update',
}

export interface GrannyPram {
    name: string;
    color: string;
    id?: number;
}

export interface DriveParams {
    distance: number;
    velocity: number;
}

export interface WinnersParam {
    id?: number;
    wins: number;
    time?: number;
    name?: string;
    color?: string;
}
export enum SortingOrder {
    desc = 'desc',
    asc = 'asc',
}

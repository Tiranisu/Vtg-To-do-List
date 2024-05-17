export interface ITask {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

export class Task implements ITask {
  private _name: string;
  private _description: string;
  private _checked: boolean;
  id: string;

  constructor(id: string, name: string, description: string, checked: boolean) {
    this.id = id;
    this._name = name;
    this._description = description;
    this._checked = checked;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(value: boolean) {
    this._checked = value;
  }
}

export interface INestedMenuItem {
  label: string;
  path: string;
}

export interface ISubMenuItem {
  label: string;
  submenu?: INestedMenuItem[];
  path?: string;
}

export interface IMenuItem {
  label: string;
  submenu?: ISubMenuItem[];
  path: any;
}

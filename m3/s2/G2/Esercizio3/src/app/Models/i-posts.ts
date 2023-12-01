export interface IPosts {

    id: number;
    title: string;
    content: string;
    subContent: string;
    active: boolean;
    type: 'news' | 'politic' | 'education';

}

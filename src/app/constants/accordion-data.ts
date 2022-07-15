export interface IElementFieldProperties {
    propertyName: string;
    displayedFieldName: string;
    value?: string;
    suffix?: string;
    options?: string[];
}

export const formProps: IElementFieldProperties[] = [
    {
        propertyName: 'text-content',
        displayedFieldName: 'Form label',
    },
    {
        propertyName: 'color',
        displayedFieldName: 'Text color',
        suffix: 'RGB'
    },
    {
        propertyName: 'background-color',
        displayedFieldName: 'Background',
        suffix: 'RGB'
    },
    {
        propertyName: 'border-style',
        displayedFieldName: 'Border type',
        options: ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
    },
    {
        propertyName: 'border-color',
        displayedFieldName: 'Border color',
        suffix: 'RGB'
    },
];
export const formFieldProps: IElementFieldProperties[] = [
    {
        propertyName: 'text-content',
        displayedFieldName: 'label',
    },
    {
        propertyName: 'placeholder',
        displayedFieldName: 'Placeholder',
    },
    {
        propertyName: 'width',
        displayedFieldName: 'Width',
        suffix: 'px'
    },
    {
        propertyName: 'height',
        displayedFieldName: 'Height',
        suffix: 'px'
    },
    {
        propertyName: 'font-size',
        displayedFieldName: 'Font size',
        suffix: 'px'
    },
    {
        propertyName: 'font-weight',
        displayedFieldName: 'Font weight',
        options: ['400', '500', '600', '700', '900']
    },
    {
        propertyName: 'color',
        displayedFieldName: 'Color',
        suffix: 'RGB'
    },
    {
        propertyName: 'border-style',
        displayedFieldName: 'Border style',
        options: ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
    },
]
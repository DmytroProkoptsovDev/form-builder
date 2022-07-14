export interface IElementFieldProperties {
    propertyName: string;
    displayedFieldName: string;
    value: string;
    format?: string;
    options?: string[];
}

export const formProps: IElementFieldProperties[] = [
    {
        propertyName: 'text-content',
        displayedFieldName: 'Form label',
        value: 'Form label'
    },
    {
        propertyName: 'color',
        displayedFieldName: 'Text color',
        value: '0, 0, 0',
        format: 'RGB'
    },
    {
        propertyName: 'background-color',
        displayedFieldName: 'Background',
        value: '0, 0, 0',
        format: 'RGB'
    },
    {
        propertyName: 'border-style',
        displayedFieldName: 'Border type',
        value: '0, 0, 0'
    },
    {
        propertyName: 'border-color',
        displayedFieldName: 'Border color',
        value: '255, 255, 255',
        format: 'RGB'
    },
];
export const formFieldProps: IElementFieldProperties[] = [
    {
        propertyName: 'text-content',
        displayedFieldName: 'label',
        value: 'label'
    },
    {
        propertyName: 'placeholder',
        displayedFieldName: 'Placeholder',
        value: 'placeholder',
    },
    {
        propertyName: 'width',
        displayedFieldName: 'Width',
        value: '300',
        format: 'px'
    },
    {
        propertyName: 'height',
        displayedFieldName: 'Height',
        value: '20',
        format: 'px'
    },
    {
        propertyName: 'font-size',
        displayedFieldName: 'Font size',
        value: '16',
        format: 'px'
    },
    {
        propertyName: 'font-weight',
        displayedFieldName: 'Font weight',
        value: '400',
        options: ['400', '500', '600', '700', '900']
    },
    {
        propertyName: 'color',
        displayedFieldName: 'Color',
        value: '0, 0, 0',
        format: 'RGB'
    },
    {
        propertyName: 'border-style',
        displayedFieldName: 'Border style',
        value: 'solid',
        options: ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']
    },
]
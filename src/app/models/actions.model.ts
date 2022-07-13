// model defining types of selected elements
export type TElement = 'input' | 'textarea' | 'select' | 'button' | 'checkbox' | 'form';

// model defining payload of setElementType action
export interface IElementType {
    elementType: TElement;
}

// model defining paylod of props to be applied to the element
export interface IElementProps {
    elementType: 'input';
    label?: string;
    placeholder?: string;
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    borderStyle?: string;
    borderColor?: string;
    backgroundColor?: string;
    isRequired: boolean;
}
import { ElementRef, Injectable } from '@angular/core';
import { ToStringPipe } from 'src/app/pipes/to-string/to-string.pipe';

interface IProps {
  [key: string]: string;
}
const nonCSSProperties = [
  'placeholder',
  'textContent',
  'required',
  'id'
]

@Injectable({
  providedIn: 'root'
})
export class PropertySetterService {
  public elementRef!: HTMLElement;
  public nonCSSProps!: IProps;
  public cssProps!: IProps;
  private isRef!: boolean; 
  
  constructor(private toString: ToStringPipe) {}

  setRef (elRef: ElementRef | undefined) {
    if (!elRef) {
      this.isRef = false;

      return this;
    }

    this.elementRef = elRef.nativeElement;
    this.isRef = true;
    return this;
  }
  setProps (props: IProps | undefined = {}) {
    this.cssProps = { ...props };
    this.nonCSSProps = Object.keys(this.cssProps).reduce((acc: IProps, prop) => {
      
      if (nonCSSProperties.includes(prop)) {
        acc[prop] = this.cssProps[prop];
        
        delete this.cssProps[prop];
      }

      return acc;
    }, {})

    return this;
  }
  applyCSSProperties () {
    const cssText = this.toString.transform(this.cssProps);

    if (this.isRef) {
      this.elementRef.style.cssText = cssText;
    }

    return this;
  }
  applyNonCSSProperties () {
    if (this.isRef) {
      Object.keys(this.nonCSSProps).forEach((prop: string) => (this.elementRef as any)[prop] = this.nonCSSProps[prop]);
    }

    return this;
  }
  applyAllProperties () {
    this.applyCSSProperties();
    this.applyNonCSSProperties();

    return this;
  }
}

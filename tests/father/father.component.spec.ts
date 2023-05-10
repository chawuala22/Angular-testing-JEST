import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherComponent } from '../../src/app/basic/father/father.component';
import { FatherSonComponent } from '../../src/app/basic/father-son/father-son.component';
import { By } from '@angular/platform-browser';

describe('FatherComponent', () => {
  let component: FatherComponent;
  let fixture: ComponentFixture<FatherComponent>;
  let compiled : HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatherComponent, FatherSonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe hacer match con snapshot', ()=>{
    expect(compiled).toMatchSnapshot();
  });


  test('Debe establecer el cliente con el nombre indicado', ()=>{
    component.onSetClient('Pedro');
    fixture.detectChanges();

    const codeDiv = compiled.querySelector('.mt-2');
    expect (codeDiv?.textContent).toContain('"name');
    expect (codeDiv?.textContent).toContain('"Pedro');
  });

  test('Debe borrar el cliente si se emite onDeleteClient (hijo)', ()=>{

    component.client={
      id:1,
      name:"Eduardo"
    };
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) );
    const sonComponent: FatherSonComponent = sonDebugElement.componentInstance;
    sonComponent.onDeleteClient.emit();
    expect ( component.client ).toBe(undefined);
  });

  test('Debe actualizar el cliente con onClientUpdate',()=>{

    component.client={
      id:1,
      name:"Eduardo"
    };
    fixture.detectChanges();

    const sonDebugElement = fixture.debugElement.query( By.directive(FatherSonComponent) );
    const sonComponent: FatherSonComponent = sonDebugElement.componentInstance;
    sonComponent.onUpdateClient.emit({id:10, name:'Pedro'});
    expect ( component.client ).toEqual({id:10, name:'Pedro'});
  })

});

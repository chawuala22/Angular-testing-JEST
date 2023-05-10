import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatherSonComponent } from '../../src/app/basic/father-son/father-son.component';

describe('FatherSonComponent', () => {
  let component: FatherSonComponent;
  let fixture: ComponentFixture<FatherSonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FatherSonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FatherSonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('no deberia aparecer botones si no hay cliente', () => {
    const buttons = compiled.querySelectorAll('Button');
    expect(buttons.length).toBe(0);
  });
  test('no deberia aparecer dos botones si  hay cliente', () => {
    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();
    const buttons = compiled.querySelectorAll('Button');
    expect(buttons.length).toBe(2);
  });

  test('si hay cliente hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  test('si toco boton borrar cliente emita el evento ondeleteClient', () => {
    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();

    jest.spyOn(component.onDeleteClient, 'emit');

    const buttonDelete = compiled.querySelector('[data-test=btnDelete]');
    buttonDelete?.dispatchEvent(new Event('click'));
    expect(component.onDeleteClient.emit).toHaveBeenCalled();
  });

  test('Debe emitir onClientUpdate  con el boton de "Cambiar ID"', () => {
    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();

    jest.spyOn(component.onUpdateClient, 'emit');

    const buttonChangeId = compiled.querySelector('[data-test=btnUpdate]');
    buttonChangeId?.dispatchEvent(new Event('click'));
    expect(component.onUpdateClient.emit).toHaveBeenCalledWith({
      id: 5,
      name: 'Juan',
    });
  });

  test('Deben emitir onChangeClient con el ID especificado si hay un cliente', () => {
    jest.spyOn(component.onUpdateClient, 'emit');
    component.onChange(10);
    expect(component.onUpdateClient.emit).not.toHaveBeenCalled();

    component.client = { id: 1, name: 'Juan' };
    fixture.detectChanges();
    component.onChange(10);
    expect (component.onUpdateClient.emit).toHaveBeenCalledWith({
      id:10,
      name:'Juan'
    })
  });
});

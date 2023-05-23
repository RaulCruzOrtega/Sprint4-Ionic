import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFavouritesPage } from './user-favourites.page';

describe('UserFavouritesPage', () => {
  let component: UserFavouritesPage;
  let fixture: ComponentFixture<UserFavouritesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserFavouritesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

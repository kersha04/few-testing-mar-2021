import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { first, skip, tap } from 'rxjs/operators';
import { TodoListItem } from 'src/app/models/todos';
import { environment } from 'src/environments/environment';
import { TodosDataService } from './todos-data.service';

describe('TodosDataService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: TodosDataService;
  const baseUrl = environment.baseUrl + 'todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosDataService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TodosDataService);
  });
  it('loads the data', () => {
    const testData: TodoListItem[] = [{
      id: '1', description: 'Clean Garage'
    }, {
      id: '2', description: 'Wash Windows'
    }];

    service.getData$().pipe(
      first(),
      tap(data => expect(data).toEqual([])),
    ).subscribe();

    service.getData$().pipe(
      skip(1),
      tap(r => expect(r).toEqual(testData)),
      tap(() => console.log('in the second get data'))
    ).subscribe();

    service.loadData();

    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ data: testData });

  });

  it('can add one', (done) => {
    const description = 'Shoe Laces';
    service.getData$()
      .pipe(
        skip(1),
        tap(item => expect(item).toEqual([{ id: 'TESTID', description }])),
        tap(() => done())
      ).subscribe();

    service.addTodo({ description: 'Beer' });
    const req = httpTestingController.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 'TESTID', description });
  });
});

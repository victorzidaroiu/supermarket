import { Subject } from 'rxjs';
import { basketStore } from './store'

jest.spyOn(Subject.prototype, 'next')

describe('The Basket Store', () => {
  afterEach(() => {
    basketStore.clearBasket()
    basketStore.init()
    jest.resetAllMocks()
  })

  describe('addToBasket', () => {
    test('when adding an item will update the state correctly', () => {
      basketStore.addToBasket('BEANS')

      expect(Subject.prototype.next).toHaveBeenCalledTimes(1);
      expect(Subject.prototype.next).toHaveBeenCalledWith({ "data": [{ "id": "BEANS", "quantity": 1 }], "error": "", "newDataCount": 1, "status": "" });
    })

    test('when adding 2 items will update the state correctly', () => {
      basketStore.addToBasket('BEANS')
      basketStore.addToBasket('COKE')

      expect(Subject.prototype.next).toHaveBeenCalledTimes(2);
      expect(Subject.prototype.next).toHaveBeenNthCalledWith(1, { "data": [{ "id": "BEANS", "quantity": 1 }], "error": "", "newDataCount": 1, "status": "" });
      expect(Subject.prototype.next).toHaveBeenNthCalledWith(2, { "data": [{ "id": "BEANS", "quantity": 1 }, { "id": "COKE", "quantity": 1 }], "error": "", "newDataCount": 2, "status": "" })
    })
  })
})
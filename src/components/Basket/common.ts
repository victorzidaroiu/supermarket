export interface InventorySavings {
    value: number,
    units: number
}

export interface BasketItem {
    id: string,
    quantity: number,
}

export interface Price {
    value: number,
    type: PriceType
}

export interface InventoryItem {
    name: string,
    price: Price,
    savings: InventorySavings | null
}

export enum PriceType { Unit, Weight }

export interface ReceiptSavings {
    total: number,
    items: {
        [key: string]: {
            value: number
        }
    }
}

export interface Receipt {
    total: number,
    savings: ReceiptSavings
}

export interface Items { [key: string]: InventoryItem }

export const items: Items = {
    BEANS: {
        name: 'Beans',
        price: {
            value: 0.5,
            type: PriceType.Unit
        },
        savings: {
            units: 3,
            value: 0.5
        }
    },
    COKE: {
        name: 'Coke',
        price: {
            value: 0.7,
            type: PriceType.Unit
        },
        savings: {
            units: 2,
            value: 0.4
        }
    },
    ORANGES: {
        name: 'Oranges',
        price: {
            value: 1.99,
            type: PriceType.Weight
        },
        savings: null
    }
}
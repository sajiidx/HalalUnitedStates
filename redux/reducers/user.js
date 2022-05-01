import * as constants from "../constants/index";

const initialState = {
    currentUser: null,
    wishlist: {},
    cart: {},
    gui: {
        cart: {
            cost: 0,
            discount: 0,
            items: [],
        },
        wishlist: {
            items: []
        }
    },
    cost: 0,
    profile: {},
    orders: [],
    currentStoreProducts: [],
    TimoutWhileLoadingCurrentStoreProducts: false,
    ErrorWhileLoadingCurrentStoreProducts: null,
    StoreProductSelectedForUpdateOperation: null,
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case constants.USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case constants.LOADED_ITEM_IN_WISHLIST:
            return {
                ...state,
                wishlist: action.wishlist
            }
        case constants.LOADED_ITEM_IN_CART:
            return {
                ...state,
                cart: action.cart
            }
        case constants.ADDED_ITEM_IN_CART:
            return {
                ...state,
                cart: {
                    ...state.cart,
                    items: [
                        ...state.cart.items,
                        action.item
                    ]
                }
            }
        case constants.ADDED_ITEM_IN_WISHLIST:
            return {
                ...state,
                wishlist: {
                    ...state.wishlist,
                    items: [
                        ...state.wishlist.items,
                        action.item
                    ]
                }
            }
        case constants.REMOVED_ITEM_FROM_CART:
            return{
                ...state,
                cart: {
                    ...state.cart,
                    items: state.cart.items.filter(item => item.id != action.itemID)
                }
            }
        case constants.REMOVED_ITEM_FROM_WISHLIST:
            return{
                ...state,
                wishlist: {
                    ...state.wishlist,
                    items: state.wishlist.items.filter(item => item.id != action.itemID)
                }
            }
        case constants.ADDED_ITEM_IN_CART_GUI:
            return {
                ...state,
                gui:{
                    ...state.gui,
                    cart: {
                        ...state.gui.cart,
                        items: [
                            ...state.gui.cart.items,
                            action.item
                        ]
                    }
                }
            }
        case constants.ADDED_ITEM_IN_WISHLIST_GUI:
            return {
                ...state,
                gui:{
                    ...state.gui,
                    wishlist: {
                        ...state.gui.wishlist,
                        items: [
                            ...state.gui.wishlist.items,
                            action.item
                        ]
                    }
                }
            }
        case constants.LOADED_ITEM_IN_CART_GUI:
            return {
                ...state,
                gui: {
                    ...state.gui,
                    cart: action.cart
                }
            }
        case constants.LOADED_ITEM_IN_WISHLIST_GUI:
            return {
                ...state,
                gui: {
                    ...state.gui,
                    wishlist: action.wishlist
                }
            }
        case constants.REMOVED_ITEM_FROM_CART_GUI:
            return {
                ...state,
                gui:{
                    ...state.gui,
                    cart: {
                        ...state.gui.cart,
                        items: state.gui.cart.items.filter(item => item.id != action.itemID)
                    }
                }
            }
        case constants.REMOVED_ITEM_FROM_WISHLIST_GUI:
            return {
                ...state,
                gui:{
                    ...state.gui,
                    wishlist: {
                        ...state.gui.wishlist,
                        items: state.gui.wishlist.items.filter(item => item.id != action.itemID)
                    }
                }
            }
        case constants.ON_COST_CHANGED:
            return {
                ...state,
                cost: action.cost
            }
        case constants.ON_QONT_UPDATE:
            return {
                ...state,
                 gui:{
                    ...state.gui,
                    cart: {
                        ...state.gui.cart,
                        items: state.gui.cart.items.map((content, i) => content.id === action.id  ? {...content, qont: action.qont} : content)
                    }
                }
            }
        case constants.ON_PROFILE_LOAD:
            return {
                ...state,
                profile: action.profile
            }
        case constants.ON_ORDERS_LOAD:
            return {
                ...state,
                orders: action.orders
            }
        case constants.STORE_PRODUCTS_LOADED:
            return {
                ...state,
                currentStoreProducts: action.currentStoreProducts,
                ErrorWhileLoadingCurrentStoreProducts: null,
                TimoutWhileLoadingCurrentStoreProducts: true,
            }
        case constants.STORE_PRODUCTS_FAILED_TO_LOAD:
            return {
                ...state,
                currentStoreProducts: [],
                ErrorWhileLoadingCurrentStoreProducts: action.error,
                TimoutWhileLoadingCurrentStoreProducts: true,
            }
        case constants.STORE_PRODUCT_SELECTED_FOR_UPDATE_OPERATION:
            return {
                ...state,
                StoreProductSelectedForUpdateOperation: action.StoreProductSelectedForUpdateOperation
            }
        case constants.CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}
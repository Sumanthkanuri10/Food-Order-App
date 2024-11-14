import { createContext, useReducer } from "react";
const CartContext=createContext({
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{}
});
 function cartReducer(state,action){
    if (action.type==='ADD_ITEM'){
        const exisistingCartItemIndex=state.items.findIndex(item=>item.id===action.item.id)
        const updatedItems=[...state.items]
        if (exisistingCartItemIndex>-1){
            const exisistingItem=state.items[exisistingCartItemIndex]
            const updatedItem={
                ...exisistingItem,
                quantity:exisistingItem.quantity+1
            };
            updatedItems[exisistingCartItemIndex]=updatedItem
        }else{
            updatedItems.push({...action.item, quantity:1});
        }
        return {...state,items:updatedItems}
    }
    if (action.type==='REMOVE_ITEM'){
        const exisistingCartItemIndex=state.items.findIndex(item=>item.id===action.id)
        const exisistingItem=state.items[exisistingCartItemIndex]
        const updatedItems=[...state.items];
        if (exisistingItem.quantity===1){
            updatedItems.splice(exisistingCartItemIndex,1)
        }else{
            const updatedItem={
                ...exisistingItem,
                quantity:exisistingItem.quantity-1
            }
        updatedItems[exisistingCartItemIndex]=updatedItem;
            
        }
        return {...state,items:updatedItems}
    }
    return state;
 }
export function CartContextProvider({children}){
    const[cart,dispatchCartAction]=useReducer(cartReducer,{items:[]})
    function addItem(item){
        dispatchCartAction({type:'ADD_ITEM',item})
    }
    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM',id})
    } 
    const cartContext={
        items:cart.items,
        addItem,
        removeItem
    };
    return(
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    )
}
export default CartContext;
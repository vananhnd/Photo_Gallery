import { useContext } from "react";
import ItemsContext from "../context/items";

function useItemsContext() {
    return useContext(ItemsContext);
}

export default useItemsContext;

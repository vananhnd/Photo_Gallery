import { createContext, useCallback, useState, ReactNode } from "react";
import axios from "axios";

interface Item {
    id: number;
    albumId: number;
    title: string;
    url: URL;
    thumbnailUrl: URL;
}

interface ItemsContextType {
    items: Item[];
    deleteBookById: (id: number) => Promise<void>;
    editBookById: (id: number, newTitle: string) => Promise<void>;
    handleCreateBook: (title: string) => Promise<void>;
    fetchBooks: () => Promise<void>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

function Provider({ children }: ProviderProps) {
    const [items, setItems] = useState<Item[]>([]);

    const fetchBooks = useCallback(async () => {
        const response = await axios.get<Item[]>("http://localhost:3000");
        setItems(response.data);
    }, []);

    const editBookById = async (id: number, newTitle: string) => {
        const response = await axios.put<Item>(`http://localhost:3002/books/${id}`, {
            title: newTitle,
        });

        const updatedBooks = items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    ...response.data,
                };
            }
            return item;
        });
        setItems(updatedBooks);
    };

    const deleteBookById = async (id: number) => {
        await axios.delete(`http://localhost:3002/books/${id}`);

        const updatedBooks = items.filter((item) => {
            return item.id !== id;
        });
        setItems(updatedBooks);
    };

    const handleCreateBook = async (title: string) => {
        const response = await axios.post<Item>("http://localhost:3000/item", {
            title,
        });

        const updatedBooks = [...items, response.data];
        setItems(updatedBooks);
    };

    const valueToShare: ItemsContextType = {
        items,
        deleteBookById,
        editBookById,
        handleCreateBook,
        fetchBooks,
    };

    return (
        <ItemsContext.Provider value={valueToShare}>
            {children}
        </ItemsContext.Provider>
    );
}

export { Provider };
export default ItemsContext;

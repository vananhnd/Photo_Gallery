// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// interface Photo {
//     albumId: number;
//     id: number;
//     title: string;
//     url: string;
//     thumbnailUrl: string;
// }
// const PhotoList: React.FC = () => {
//     const [items, setItems] = useState<Photo[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [pageSize, setPageSize] = useState<number>(20);
//     const [selectedItem, setSelectedItem] = useState<Photo | null>(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
//                 setItems(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     const filteredItems = items.filter((item) =>
//         item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     const indexOfLastItem = currentPage * pageSize;
//     const indexOfFirstItem = indexOfLastItem - pageSize;
//     const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//
//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
//
//     const renderPagination = () => {
//         const pageCount = Math.ceil(filteredItems.length / pageSize);
//
//         if (pageCount <= 1) return null;
//
//         const firstPage = 1;
//         const lastPage = pageCount;
//         const visiblePages = [firstPage, lastPage];
//
//         // Add ellipsis between the first and last page numbers
//         for (let i = 2; i < lastPage; i += Math.ceil(pageCount / 5)) {
//             visiblePages.splice(visiblePages.length - 1, 0, i);
//         }
//         return (
//             <div className="item-center mt-4">
//                 {visiblePages.map((pageNumber, index) => (
//                     <React.Fragment key={index}>
//                         {index > 0 && visiblePages[index - 1] !== pageNumber - 1 && (
//                             <span className="mx-1">...</span>
//                         )}
//                         <button
//                             onClick={() => paginate(pageNumber)}
//                             className={`mx-1 px-3 py-1 ${
//                                 currentPage === pageNumber
//                                     ? 'bg-blue-500 text-white'
//                                     : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
//                             } rounded transition duration-300`}
//                         >
//                             {pageNumber}
//                         </button>
//                     </React.Fragment>
//                 ))}
//             </div>
//         );
//     };
//     const handleCreate = () => {
//         // Implement logic to create a new item and update the state
//         // Example: axios.post('your_api_endpoint', newItem).then((response) => setItems([...items, response.data]));
//     };
//
//     const handleUpdate = () => {
//         if (selectedItem) {
//             // Implement logic to update the selected item and update the state
//             // Example: axios.put(`your_api_endpoint/${selectedItem.id}`, updatedItem).then(() => fetchData());
//         }
//     };
//
//     const handleDelete = () => {
//         if (selectedItem) {
//             // Implement logic to delete the selected item and update the state
//             // Example: axios.delete(`your_api_endpoint/${selectedItem.id}`).then(() => fetchData());
//         }
//     };
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-3xl font-bold mb-6">Photo Gallery</h1>
//
//             <div className="mb-4 flex items-center space-x-4">
//                 <input
//                     type="text"
//                     placeholder="Search by title"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//                 />
//                 <button
//                     onClick={handleCreate}
//                     className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
//                 >
//                     Create
//                 </button>
//                 <button
//                     onClick={handleUpdate}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//                     disabled={!selectedItem}
//                 >
//                     Update
//                 </button>
//                 <button
//                     onClick={handleDelete}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
//                     disabled={!selectedItem}
//                 >
//                     Delete
//                 </button>
//             </div>
//
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {currentItems.map((item) => (
//                     <div
//                         key={item.id}
//                         className="bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
//                         onClick={() => setSelectedItem(item)}
//                     >
//                         <img src={item.thumbnailUrl} alt={item.title} className="mb-2 h-40 w-full object-cover rounded" />
//                         <p className="font-semibold text-gray-800">{item.title}</p>
//                     </div>
//                 ))}
//             </div>
//
//             {renderPagination()}
//
//             {/*<div className="mt-4">*/}
//             {/*    {Array.from({ length: Math.ceil(filteredItems.length / pageSize) }).map((_, index) => (*/}
//             {/*        <button*/}
//             {/*            key={index}*/}
//             {/*            onClick={() => paginate(index + 1)}*/}
//             {/*            className={`mx-1 px-3 py-1 ${*/}
//             {/*                currentPage === index + 1*/}
//             {/*                    ? 'bg-blue-500 text-white'*/}
//             {/*                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'*/}
//             {/*            } rounded transition duration-300`}*/}
//             {/*        >*/}
//             {/*            {index + 1}*/}
//             {/*        </button>*/}
//             {/*    ))}*/}
//             {/*</div>*/}
//         </div>
//     );
// };
//
// export default PhotoList;

// src/components/PhotoList.tsx

// src/components/PhotoList.tsx
// -------------------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
//
// interface Photo {
//     albumId: number;
//     id: number;
//     title: string;
//     url: string;
//     thumbnailUrl: string;
// }
//
// const PhotoList: React.FC = () => {
//     const [photos, setPhotos] = useState<Photo[]>([]);
//     const [search, setSearch] = useState<string>("");
//     const [page, setPage] = useState<number>(1);
//     const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
//
//     useEffect(() => {
//         fetchPhotos();
//     }, [page]);
//
//     const fetchPhotos = async () => {
//         try {
//             const response = await axios.get(
//                 `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
//             );
//             setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
//         } catch (error) {
//             console.error("Error fetching photos:", error);
//         }
//     };
//
//     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearch(e.target.value);
//     };
//
//     const filteredPhotos = photos.filter((photo) =>
//         photo.title.toLowerCase().includes(search.toLowerCase())
//     );
//
//     const handleScroll = () => {
//         const scrolledToBottom =
//             window.innerHeight + document.documentElement.scrollTop + 100 >=
//             document.documentElement.offsetHeight;
//
//         setShowBackToTop(document.documentElement.scrollTop > 100);
//
//         if (scrolledToBottom) {
//             setPage((prevPage) => prevPage + 1);
//         }
//     };
//
//     const handleBackToTop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };
//
//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);
//
//     return (
//         <div className="container mx-auto mt-8">
//             <input
//                 type="text"
//                 placeholder="Search by title"
//                 value={search}
//                 onChange={handleSearch}
//                 className="p-2 mb-4 border border-gray-300 rounded"
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {filteredPhotos.map((photo) => (
//                     <div key={photo.id} className="border p-4 rounded">
//                         <img src={photo.thumbnailUrl} alt={photo.title} className="mb-2" />
//                         <p className="text-sm font-semibold">{photo.title}</p>
//                     </div>
//                 ))}
//             </div>
//             {showBackToTop && (
//                 <button
//                     onClick={handleBackToTop}
//                     className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Back to Top
//                 </button>
//             )}
//         </div>
//     );
// };
//
// export default PhotoList;
// ------------------------------------

import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from "axios";
interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
const PhotoList: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

    useEffect(() => {
        fetchPhotos();
    }, [page, search]);

    const fetchPhotos = async () => {
        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
            );
            setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1); // Reset page when searching to start from the first page
    };


    const filteredPhotos = photos
        .filter((photo) =>
            photo.title.toLowerCase().includes(search.toLowerCase())
        )
        // .slice(0, page * 10);


    const handleScroll = () => {
        const scrolledToBottom =
            window.innerHeight + document.documentElement.scrollTop + 100 >=
            document.documentElement.offsetHeight;

        setShowBackToTop(document.documentElement.scrollTop > 100);

        if (scrolledToBottom) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <div className="sticky top-0 bg-white z-10 p-2">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={handleSearch}
                    className="p-2 w-full border border-gray-300 rounded"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {filteredPhotos.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg"

                    >
                        <img src={item.thumbnailUrl} alt={item.title} className="mb-2 rounded" />
                        <p className="font-semibold text-gray-800">{item.title}</p>
                    </div>
                ))}

            </div>
            {showBackToTop && (
                <button
                    onClick={handleBackToTop}
                    className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                    <ArrowUpwardIcon/>
                </button>
            )}
        </div>
    );
};

export default PhotoList;

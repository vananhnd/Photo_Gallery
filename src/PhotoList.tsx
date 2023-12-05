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
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [newPhotoTitle, setNewPhotoTitle] = useState<string>("");
    const [updatedTitle, setUpdatedTitle] = useState<string>("");
    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

    const handleOpenCreatePopup = () => {
        setIsCreatePopupOpen(true);
    };

    const handleCloseCreatePopup = () => {
        setIsCreatePopupOpen(false);
    };
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
        .slice(0, page * 10);

    const handleCreate = async () => {
        try {
            // Make an API request to create a new photo
            const response = await axios.post("https://jsonplaceholder.typicode.com/photos", {
                title: newPhotoTitle,
                // Include other properties as needed
            });

            // Fetch the entire list again after creating a new item
            const updatedPhotos = await axios.get("https://jsonplaceholder.typicode.com/photos");
            setPhotos(updatedPhotos.data);

            setNewPhotoTitle(""); // Clear the input field after creating a new photo
            handleCloseCreatePopup(); // Close the popup after creating a new photo
        } catch (error) {
            console.error("Error creating photo:", error);
        }
    };
    const handleUpdate = (photo: Photo) => {
        setSelectedPhoto(photo);
        setUpdatedTitle(photo.title);
    };

    const handleSaveUpdate = () => {
        const updatedPhotos = photos.map((photo) =>
            photo.id === selectedPhoto?.id ? { ...photo, title: updatedTitle } : photo
        );
        setPhotos(updatedPhotos);
        setSelectedPhoto(null);
    };

    const handleCancelUpdate = () => {
        setSelectedPhoto(null);
    };

    const handleDelete = async (id:number) => {
        const confirmed = window.confirm("Are you sure you want to delete this photo?");
        if (confirmed) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
                setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== id));
            }  catch (error) {
                console.error("Error deleting photo:", error);
            }
        }
    };
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
        <div className="container mx-auto mt-8 px-8">
            <div className="sticky top-0 bg-white z-10 space-y-3 p-2">
                <p className="text-center text-xl"> Photo gallery </p>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search}
                    onChange={handleSearch}
                    className="p-2 w-full border border-gray-300 rounded"
                />
                <button onClick={handleOpenCreatePopup}>Create</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {filteredPhotos.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg justify-between"

                    >
                        <img src={item.thumbnailUrl} alt={item.title} className="mb-2 rounded" />
                        <p className="text-center text-gray-800">{item.title}</p>
                        <div className="flex justify-between items-end">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleUpdate(item)}>Update</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(item.id)}>Delete</button>

                        </div>

                    </div>
                ))}
                {selectedPhoto && (
                    <div>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <button onClick={handleSaveUpdate}>Save</button>
                        <button onClick={handleCancelUpdate}>Cancel</button>
                    </div>
                )}
            </div>
            {showBackToTop && (
                <button
                    onClick={handleBackToTop}
                    className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                    <ArrowUpwardIcon/>
                </button>
            )}

            {isCreatePopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md">
                        <label htmlFor="newPhotoTitle">Title:</label>
                        <input
                            type="text"
                            id="newPhotoTitle"
                            value={newPhotoTitle}
                            onChange={(e) => setNewPhotoTitle(e.target.value)}
                        />
                        <button onClick={handleCreate}>Create</button>
                        <button onClick={handleCloseCreatePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoList;


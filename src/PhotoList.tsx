import React, {useState, useEffect, useRef} from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
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
    const [filteredData, setFilteredData] = useState<Photo[]>([]);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    // create
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    const [newPhotoTitle, setNewPhotoTitle] = useState<string>("");
    const [newPhotoUrl, setNewPhotoUrl] = useState<string>("");
    const [newThumbnailUrl, setNewThumbnailUrl] = useState<string>("");

    // update
    const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo>({
        albumId: 1,
        id: 0,
        title: "",
        url: "",
        thumbnailUrl: "",
    });

    const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
    const isLoading = useRef(false);

    const handleOpenCreatePopup = () => {
        setIsCreatePopupOpen(true);
    };

    const handleOpenUpdatePopup = (photo: Photo) => {
        console.log("handleOpenUpdatePopup", photo)
        setSelectedPhoto(photo);
        setIsUpdatePopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsCreatePopupOpen(false);
        handleCancelUpdate();
        setIsUpdatePopupOpen(false)
    };

    useEffect(() => {
        // if (isLoading.current) {
        //     isLoading.current = false
        //     return;
        // }

        fetchPhotos()
            .then(() => {console.log("fetchPhotos", page);})
            .catch((error) => console.error("Error fetching photos:", error));
    }   , [page]);

    useEffect(() => {
        const filteredPhotos = photos
            .filter((photo) =>
                search === '' || photo.title.toLowerCase().includes(search.toLowerCase())

            )
        setFilteredData(filteredPhotos)
    }, [photos, search]);

    const fetchPhotos = async () => {
        if(isLoading.current) {
            return;
        }

        isLoading.current = true;
        try {
            console.log("~~~~~~~~!!!!!!call fetchPhotos page", page)

            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
            );
            console.log("fetchPhotos response", response.data)

            setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);

        } catch (error) {
            console.error("Error fetching photos:", error);
        }

        isLoading.current = false;
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleCreate = async () => {
        const newPhoto = {
            albumId: 1,
            title: newPhotoTitle,
            url: newPhotoUrl,
            thumbnailUrl: newThumbnailUrl,
        };
        // console.log(newPhoto);
        if (!newPhotoTitle || !newPhotoUrl || !newThumbnailUrl) {
            window.alert("Please fill in all information!");
        } else {
            try {
                const response = await axios.post("https://jsonplaceholder.typicode.com/photos", newPhoto)
                filteredData.unshift(response.data);
                setPhotos(filteredData);
                setFilteredData(filteredData);
                setNewPhotoTitle("");
                setNewPhotoUrl("");
                setNewThumbnailUrl("");
                handleClosePopup();

            } catch (error) {
                console.error("Error creating photo:", error);
            }
        }


    };

    const handleSaveUpdate = () => {
        console.log("selectedPhoto", selectedPhoto)
        const updatedPhotos = photos.map((photo) =>
            photo.id === selectedPhoto.id ? selectedPhoto : photo
        );
        setPhotos(updatedPhotos);
        setFilteredData(updatedPhotos);
        setSelectedPhoto({
            albumId: 0,
            id: 0,
            title: "",
            url: "",
            thumbnailUrl: "",
        });
        handleClosePopup();
    };

    const handleCancelUpdate = () => {
        setSelectedPhoto({
            albumId: 0,
            id: 0,
            title: "",
            url: "",
            thumbnailUrl: "",
        });
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

        if (scrolledToBottom && !isLoading.current) {
            console.log("scroll to bottom!", page)
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

    const highlightMatch = (text: string, search: string) => {
        if (!search) return text;

        const regex = new RegExp(`(${search})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
                regex.test(part) ? (
                    <span key={index} className="bg-yellow-300">
          {part}
        </span>
                ) : (
                    part
                )
        );
    };

    return (
        <div className="container mx-auto mt-8 px-8">
            <p className="text-2xl font-bold text-[#95774F]"> Photo gallery </p>
            <div className="z-10 sticky top-0 w-full bg-gradient-to-b from-white p-2 rounded-md">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={search}
                        onChange={handleSearch}
                        className="p-2 w-full border border-gray-300 rounded-md focus:border-[#95774F] focus:outline-none focus:ring-0"
                    />
                    <button className="bg-[#F1E6DB] text-[#95774F] hover:bg-[#95774F] hover:text-white mx-2 py-2 px-2.5 md:px-4 rounded-full md:rounded-md"
                            onClick={handleOpenCreatePopup}>
                        <p className="hidden md:flex">Create</p>
                        <div className="md:hidden">
                            <AddPhotoAlternateIcon/>
                        </div>

                    </button>
                </div>

            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {filteredData.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col bg-white p-4 rounded-lg shadow-md transition duration-300 hover:shadow-lg justify-between"

                    >
                        <img src={item.thumbnailUrl} alt={item.title} className="mb-2 rounded-md" />
                        <p key={item.id} className="text-center text-gray-800">
                            {highlightMatch(item.title, search)}
                        </p>

                        <div className="flex justify-between items-end">
                            <button className="bg-[#A0C7B5] hover:bg-[#6EB3B2] text-white py-2 px-2.5 md:px-4 rounded-full md:rounded-md"
                                    onClick={() => handleOpenUpdatePopup(item)}>

                                <p className="hidden md:flex">Edit</p>
                                <div className="md:hidden">
                                    <EditIcon/>
                                </div>
                            </button>
                            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-2.5 md:px-4 rounded-full md:rounded-md"
                                    onClick={() => handleDelete(item.id)}>
                                <p className="hidden md:flex">Delete</p>
                                <div className="md:hidden">
                                    <DeleteIcon/>
                                </div>
                            </button>

                        </div>

                    </div>
                ))}
            </div>
            {showBackToTop && (
                <button
                    onClick={handleBackToTop}
                    className="fixed bottom-8 right-8 bg-[#95774F] text-white py-2 px-2.5 rounded-full"
                >
                    <ArrowUpwardIcon/>
                </button>
            )}

            {isCreatePopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-lg w-96">
                        <div className="mb-4">
                            <label htmlFor="newPhotoTitle" className="block text-sm font-medium text-gray-700">Title:</label>
                            <input
                                type="text"
                                id="newPhotoTitle"
                                value={newPhotoTitle}
                                onChange={(e) => setNewPhotoTitle(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#95774F]"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newPhotoUrl" className="block text-sm font-medium text-gray-700">Photo URL:</label>
                            <input
                                type="text"
                                id="newPhotoUrl"
                                value={newPhotoUrl}
                                required
                                onChange={(e) => setNewPhotoUrl(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#95774F]"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="newThumbnailUrl" className="block text-sm font-medium text-gray-700">Thumbnail URL:</label>
                            <input
                                type="text"
                                id="newThumbnailUrl"
                                value={newThumbnailUrl}
                                required
                                onChange={(e) => setNewThumbnailUrl(e.target.value)}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#95774F]"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleCreate} className="mr-2 px-2.5 md:px-4 py-2 bg-green-500 text-white rounded-full md:rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green">

                                <p className="hidden md:flex">Create</p>
                                <div className="md:hidden">
                                    <CheckIcon/>
                                </div>
                            </button>
                            <button onClick={handleClosePopup} className="px-2.5 md:px-4 py-2 bg-red-500 text-white rounded-full md:rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-gray">
                                <p className="hidden md:flex">Cancel</p>
                                <div className="md:hidden">
                                    <CloseIcon/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isUpdatePopupOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-lg w-96 lg:w-1/3">
                        <div className="mb-4">
                            <label htmlFor="photoTitle" className="block text-sm font-medium text-gray-700">Title:</label>
                            <input
                                type="text"
                                id="photoTitle"
                                defaultValue={selectedPhoto.title}
                                onChange={(e) => setSelectedPhoto({ ...selectedPhoto, title: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#95774F]"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">Photo URL:</label>
                            <input
                                type="text"
                                id="photoUrl"
                                value={selectedPhoto.url}
                                onChange={(e) => setSelectedPhoto({ ...selectedPhoto, url: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#95774F]"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">Thumbnail URL:</label>
                            <input
                                type="text"
                                id="thumbnailUrl"
                                defaultValue={selectedPhoto.thumbnailUrl}
                                onChange={(e) => setSelectedPhoto({ ...selectedPhoto, thumbnailUrl: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-[#95774F]"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handleSaveUpdate} className="mr-2 px-2.5 md:px-4 py-2 bg-[#A0C7B5] hover:bg-[#6EB3B2] text-white rounded-full md:rounded-md focus:outline-none focus:shadow-outline-blue">
                                <p className="hidden md:flex">Save</p>
                                <div className="md:hidden">
                                    <CheckIcon/>
                                </div>
                            </button>
                            <button onClick={handleClosePopup} className="px-2.5 md:px-4 py-2 bg-red-500 text-white rounded-full md:rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-gray">
                                <p className="hidden md:flex">Cancel</p>
                                <div className="md:hidden">
                                    <CloseIcon/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhotoList;


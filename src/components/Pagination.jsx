import React, { useState, useEffect } from 'react';

const Pagination = () => {
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const imagesPerPage = 3;

    useEffect(() => {
        setLoading(true);
        fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${imagesPerPage}`)
            .then(response => response.json())
            .then(data => {
                setImages(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching images:', error);
                setLoading(false);
            });
    }, [currentPage]);

    const totalPages = 10; // Assume there are 10 pages for now

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <p className="text-center text-lg">Loading...</p>
            ) : (
                <div className="flex flex-wrap justify-center gap-4">
                    {images.map(image => (
                        <div key={image.id} className="w-full sm:w-1/2 lg:w-3/12">
                            <img src={image.download_url} alt={image.author} className="w-full h-auto rounded shadow-md" />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-6">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-2 text-white rounded ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-2 text-white rounded ${currentPage === totalPages ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;

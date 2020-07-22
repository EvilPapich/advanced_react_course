import React from "react";

export const useWindow = () => {
    const getDimension = () => ({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [dimension, setDimension] = React.useState(getDimension());

    React.useEffect(() => {
        const handleResize = () => setDimension(getDimension());

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimension;
};
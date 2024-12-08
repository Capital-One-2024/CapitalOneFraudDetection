import React from 'react';
import PublicIcon from '@mui/icons-material/Public';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import classNames from "classnames";

interface LocationSpoofProps {
    show: boolean;
    setShow: (value: boolean) => void;
    latitude: number;
    setLatitude: (value: number) => void;
    longitude: number;
    setLongitude: (value: number) => void;
}

export default function LocationSpoof({
    show,
    setShow,
    latitude,
    setLatitude,
    longitude,
    setLongitude
}: LocationSpoofProps) {
    // Function to set opposite side of globe
    const setOppositeLocation = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any default form submission behavior
        
        // Calculate antipodal coordinates
        const newLatitude = parseFloat((-1 * latitude).toFixed(6));
        const newLongitude = parseFloat(longitude > 0 ? 
            (longitude - 180).toFixed(6) : 
            (longitude + 180).toFixed(6))
        
        setLatitude(newLatitude);
        setLongitude(newLongitude);
    };

    // Function to set a nearby location (within ~10km)
    const setNearbyLocation = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any default form submission behavior
        
        const currentLat = latitude;
        const currentLong = longitude;

        // Small offset to create a nearby location (approximately 0.1 degrees)
        const newLatitude = parseFloat((currentLat + 0.1).toFixed(6));
        const newLongitude = parseFloat((currentLong + 0.1).toFixed(6));

        setLatitude(newLatitude);
        setLongitude(newLongitude);
    };

    return (
        <div className="w-full">
            {show && (
                <div className="space-y-2 mt-2">
                    <div className="flex space-x-2">
                        <button
                            className="w-full btn btn-blue"
                            onClick={setOppositeLocation}
                        >
                            <PublicIcon/>
                            Set Opposite Location
                        </button>
                        <button
                            className="w-full btn "
                            onClick={setNearbyLocation}
                        >
                            <FmdGoodIcon/>
                            Set Nearby Location
                        </button>
                    </div>
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">
                            Current Location:
                            Lat {latitude || 'N/A'}, Long {longitude || 'N/A'}
                        </p>
                    </div>
                </div>
            )}
            <button
                className={classNames( // Tried to match style of original submit
                    "w-full border bg-c1-blue p-2 my-3 rounded-lg bg-gray-200 mt-1"
                )}
                // Prevent default prevents zod checks when clicked
                onClick={(e: React.MouseEvent) => { e.preventDefault(); setShow(!show); }}
            >
                {show ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                {show ? 'Hide Additional Settings' : 'Additional Settings'}
            </button>
        </div>
    );
}
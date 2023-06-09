import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import profilePic from "../../assets/pofilePic.jpeg";
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/action/UserAction';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';



const months = [
    {
        value: 'January',
        label: 'January',
    },
    {
        value: 'February',
        label: 'February',
    },
    {
        value: 'March',
        label: 'March',
    },
    {
        value: 'April',
        label: 'April',
    },
    {
        value: 'May',
        label: 'May',
    },
    {
        value: 'June',
        label: 'June',
    },
    {
        value: 'July',
        label: 'July',
    },
    {
        value: 'August',
        label: 'August',
    },
    {
        value: 'September',
        label: 'September',
    },
    {
        value: 'October',
        label: 'October',
    },
    {
        value: 'November',
        label: 'November',
    },
    {
        value: 'December',
        label: 'December',
    },
];
interface EditProfileProps {
    openEdits: boolean;
    setOpenEdits: (open: boolean) => void;
}


const days = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    return {
        value: day.toString(),
        label: day.toString(),
    };
});

const years = [];
const currentYear = new Date().getFullYear();

for (let i = 1900; i <= 2023; i++) {
    years.push({
        value: i.toString(),
        label: i.toString(),
    });
}

const EditProfile = ({ openEdits, setOpenEdits }) => {
    const { user, loading } = useSelector((state) => state.user);
    const [name, setName] = useState(user?.name);
    const dispatch = useDispatch();
    const [bio, setBio] = useState(user?.bio);
    const [location, setLocation] = useState(user?.country + ',' + user?.state);
    const [website, setWebsite] = useState(user?.website);
    const dob = user?.dob;
    const dobParts = dob?.split(' ');

    const [selectedMonth, setSelectedMonth] = useState(dobParts?.[0] || 'January');
    const [selectedDay, setSelectedDay] = useState(dobParts?.[1] || '1');
    const [selectedYear, setSelectedYear] = useState(dobParts?.[2] || '2000');
    const [selectedImage, setSelectedImage] = useState(null); // Store the selected image file

    const locat = location?.split(',')
    const birth = selectedMonth + " " + selectedDay + " " + selectedYear;



    const saveData = () => {
        const userData = {
            name,
            bio,
            state: locat[1],
            country: locat[0],
            website,
            dob: birth,
            avatar: selectedImage

        }
        dispatch(updateProfile(userData))
        setOpenEdits(!openEdits);

    }
    // Splitting dob into year, month, and day

    const openCloseEdit = () => {
        setOpenEdits(!openEdits)
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedImage(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    return (
        <>
            <div className={`w-full m-auto p-5 editProfile rounded-lg pb-14 ${openEdits ? "" : "none"}`}>
                <div className="flex justify-between w-full h-19 bg-transparent items-center sticky top-[-20px] h-18 stayTop">
                    <div className="flex gap-4 items-center">
                        <span className="flex font-bold cursor-pointer hover:bg-gray-200 hover:rounded-full" onClick={openCloseEdit}>
                            <CloseIcon />
                        </span>
                        <span className="flex font-bold text-1xl">Edit Profile</span>
                    </div>
                    <span onClick={saveData} className='bg-blue-500  w-fit  p-3 cursor-pointer text-white h-8 flex items-center  rounded-full hover:bg-blue-600'>Save</span>
                </div>

                <div className="flex flex-col mt-5 p-2">
                    <div className="cover-div h-52  bg-gray-300  cursor-pointer"></div>

                    <div className="relative h-fit">
                        <div className="flex justify-between relative items-center w-full profile-absolute-div pl-4">
                            <div className="profil-image relative w-[100px] h-[100px]  rounded-full border-4 overflow-hidden">
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <img



                                        src={selectedImage ? selectedImage : user?.avatar.url}
                                        className="object-cover h-full w-full cursor-pointer"
                                        alt=""
                                    />
                                    <div className="absolute top-0 flex items-center justify-center cursor-pointer hover:bg-gray-600 opacity-0 hover:opacity-50 w-full h-full">
                                        <span className="text-white">
                                            <CameraAltOutlinedIcon />
                                        </span>
                                    </div>
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form w-full flex flex-col gap-5">
                        <TextField
                            id="filled-multiline-flexible"
                            label="Name"
                            multiline
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full'
                            maxRows={4}
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-multiline-static"
                            label="Bio"
                            className='w-full'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Locatioon"
                            multiline
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className='w-full'
                            maxRows={4}
                            variant="outlined"
                        />
                        <TextField
                            id="filled-multiline-flexible"
                            label="Website"
                            multiline
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            className='w-full'
                            maxRows={4}
                            variant="outlined"
                        />

                        <div className="flex w-full max-w-[450px] gap-3">
                            <TextField
                                id="outlined"
                                select
                                label="Month"
                                className="flex-grow"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {months.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-"
                                select
                                className="flex-1"
                                label="Day"
                                defaultValue={days[0].value}
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {days.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined"
                                select
                                className="flex-1"
                                label="Year"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                {years.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProfile;

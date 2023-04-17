import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { FiChevronLeft } from "react-icons/fi";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function EditListing() {
    //eslint-disable-next-line
    const [geolocationEnabled, setGeolocationEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        offer: true,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0,
    });

    const {
        type,
        name,
        bedrooms,
        bathrooms,
        parking,
        furnished,
        address,
        offer,
        regularPrice,
        discountedPrice,
        images,
        latitude,
        longitude,
    } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const params = useParams();
    const isMounted = useRef(true);

    useEffect(() => {
        if (listing && listing.userRef !== auth.currentUser.uid) {
            toast.error("You can not edit that listing");
            navigate("/");
        }
    });

    useEffect(() => {
        setLoading(true);
        const fetchListing = async () => {
            const docRef = doc(db, "listings", params.listingId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setListing(docSnap.data());
                setFormData({
                    ...docSnap.data(),
                    address: docSnap.data().location,
                });
                setLoading(false);
            }
        };

        fetchListing();
    }, [params.listingId]);

    useEffect(() => {
        if (isMounted) {
            // Get the currently sign-in user
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid });
                } else {
                    navigate("/sign-in");
                }
            });
        }

        return () => {
            isMounted.current = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (discountedPrice > regularPrice) {
            setLoading(false);
            toast.error("Discounted pricce need to be less than regular price");
            return;
        }

        if (images.length > 6) {
            setLoading(false);
            toast.error("Max 6 images");
            return;
        }

        let geolocation = {};
        let location;

        if (geolocationEnabled) {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
            );
            const data = await response.json();

            if (data.length > 0) {
                geolocation.lat = data[0].lat ?? 0;
                geolocation.lng = data[0].lon ?? 0;
                location = data[0].display_name;

                console.log(geolocation, location);
            } else {
                setLoading(false);
                toast.error("Please enter a correct address");
                return;
            }
        } else {
            geolocation.lat = latitude;
            geolocation.lng = longitude;
        }

        // Store image in firebase
        const storeImage = async (image) => {
            return new Promise((resolve, reject) => {
                const storage = getStorage();
                const fileName = `${auth.currentUser.uid}-${
                    image.name
                }-${uuidv4()}`;

                const storageRef = ref(storage, "images/" + fileName);

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                            default:
                                break;
                        }
                    },
                    (error) => {
                        reject(error);
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                resolve(downloadURL);
                            }
                        );
                    }
                );
            });
        };

        const imageUrls = await Promise.all(
            [...images].map((image) => storeImage(image))
        ).catch(() => {
            setLoading(false);
            toast.error("Images not uploaded");
            return;
        });

        const formDataCopy = {
            ...formData,
            imageUrls,
            geolocation,
            timestamp: serverTimestamp(),
        };

        delete formDataCopy.images;
        delete formDataCopy.address;
        location && (formDataCopy.location = location);
        !formDataCopy.offer && delete formDataCopy.discountedPrice;

        const docRef = doc(db, "listings", params.listingId);
        await updateDoc(docRef, formDataCopy);
        setLoading(false);
        toast.success("Listing has been updated");
        navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    };

    const onMutate = (e) => {
        let boolean = null;
        if (e.target.value === "true") {
            boolean = true;
        } else if (e.target.value === "false") {
            boolean = false;
        }

        // Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }));
        }

        // Text/boolean /number
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }));
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="text-sm">
            <div className="relative mb-10">
                <Link to="/user-listings" className="absolute">
                    <FiChevronLeft size={25} className="text-zinc-600" />
                </Link>
                <h1 className="text-base font-semibold text-center">
                    Edit Listing
                </h1>
            </div>

            <form
                className="sm:max-w-2xl mx-auto sm:border-2 border-gray-100 rounded-2xl sm:p-8"
                onSubmit={onSubmit}
            >
                <label className="block mb-2">Sell / Rent</label>
                <div className="mb-4">
                    <button
                        type="button"
                        className={`inline-block w-20 py-2 bg-white shadow rounded-lg mr-2 ${
                            type === "sale"
                                ? "bg-indigo-500 text-gray-50"
                                : "bg-white"
                        }`}
                        id="type"
                        value="sale"
                        onClick={onMutate}
                    >
                        Sell
                    </button>
                    <button
                        type="button"
                        className={`w-20 py-2 bg-white shadow rounded-lg ${
                            type === "rent"
                                ? "bg-indigo-500 text-gray-50"
                                : "bg-white"
                        }`}
                        id="type"
                        value="rent"
                        onClick={onMutate}
                    >
                        Rent
                    </button>
                </div>
                <label className="block mb-2">Name</label>
                <input
                    className="w-full px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300 mb-4"
                    type="text"
                    id="name"
                    value={name}
                    onChange={onMutate}
                    maxLength="32"
                    minLength="10"
                    required
                />
                <div className="flex mb-4">
                    <div className="mr-3">
                        <label className="block mb-2">Bedrooms</label>
                        <input
                            className="px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300"
                            type="number"
                            id="bedrooms"
                            value={bedrooms}
                            onChange={onMutate}
                            min="1"
                            max="50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Bathrooms</label>
                        <input
                            className="px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300"
                            type="number"
                            id="bathrooms"
                            value={bathrooms}
                            onChange={onMutate}
                            min="1"
                            max="50"
                            required
                        />
                    </div>
                </div>
                <label className="block mb-2">Parking spot</label>
                <div className="mb-4">
                    <button
                        className={`w-20 py-2 bg-white shadow rounded-lg mr-3 ${
                            parking ? "bg-indigo-500 text-gray-50" : "bg-white"
                        }`}
                        type="button"
                        id="parking"
                        value={true}
                        onClick={onMutate}
                        min="1"
                        max="50"
                    >
                        Yes
                    </button>
                    <button
                        className={`w-20 py-2 bg-white shadow rounded-lg ${
                            !parking && parking !== null
                                ? "bg-indigo-500 text-gray-50"
                                : "bg-white"
                        }`}
                        type="button"
                        id="parking"
                        value={false}
                        onClick={onMutate}
                    >
                        No
                    </button>
                </div>
                <label className="block mb-2">Furnished</label>
                <div className="mb-4">
                    <button
                        className={`w-20 py-2 bg-white shadow rounded-lg mr-3 ${
                            furnished
                                ? "bg-indigo-500 text-gray-50"
                                : "bg-white"
                        }`}
                        type="button"
                        id="furnished"
                        value={true}
                        onClick={onMutate}
                    >
                        Yes
                    </button>
                    <button
                        className={`w-20 py-2 bg-white shadow rounded-lg ${
                            !furnished && furnished !== null
                                ? "bg-indigo-500 text-gray-50"
                                : "bg-white"
                        }`}
                        type="button"
                        id="furnished"
                        value={false}
                        onClick={onMutate}
                    >
                        No
                    </button>
                </div>
                <label className="block mb-2">Address</label>
                <textarea
                    className="w-full px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300 mb-4"
                    type="text"
                    id="address"
                    value={address}
                    onChange={onMutate}
                    required
                />
                {!geolocationEnabled && (
                    <div className="flex mb-4">
                        <div className="mr-3">
                            <label className="block mb-2">Latitude</label>
                            <input
                                className="w-full px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300"
                                type="number"
                                id="latitude"
                                value={latitude}
                                onChange={onMutate}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Longitude</label>
                            <input
                                className="w-full px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300"
                                type="number"
                                id="longitude"
                                value={longitude}
                                onChange={onMutate}
                                required
                            />
                        </div>
                    </div>
                )}
                <label className="block mb-2">Offer</label>
                <div className="mb-4">
                    <button
                        className={`w-20 py-2 bg-white shadow rounded-lg mr-3 ${
                            offer ? "bg-indigo-500 text-gray-50" : "bg-white"
                        }`}
                        type="button"
                        id="offer"
                        value={true}
                        onClick={onMutate}
                    >
                        Yes
                    </button>
                    <button
                        className={`w-20 py-2 bg-white shadow rounded-lg ${
                            !offer && offer !== null
                                ? "bg-indigo-500 text-gray-50"
                                : "bg-white"
                        }`}
                        type="button"
                        id="offer"
                        value={false}
                        onClick={onMutate}
                    >
                        No
                    </button>
                </div>
                <label className="block mb-2">Regular Price</label>
                <div className="mb-4 flex items-center">
                    <input
                        className="w-32 px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300 mr-2"
                        type="number"
                        id="regularPrice"
                        value={regularPrice}
                        onChange={onMutate}
                        min="50"
                        max="750000000"
                        required
                    />
                    {type === "rent" && <p>RM / Month</p>}
                </div>
                {offer && (
                    <>
                        <label className="block mb-2">Discounted Price</label>
                        <div className="mb-4 flex items-center">
                            <input
                                className="w-32 px-3 py-2 border bg-white rounded-lg focus:outline-indigo-300 mr-2"
                                type="number"
                                id="discountedPrice"
                                value={discountedPrice}
                                onChange={onMutate}
                                min="50"
                                max="750000000"
                                required={offer}
                            />
                            {type === "rent" && <p>RM / Month</p>}
                        </div>
                    </>
                )}
                <label className="block mb-1">Images</label>
                <p className="text-xs text-gray-500 mb-3">
                    The first image will be the cover (max 6).
                </p>
                <input
                    className="formInputFile w-full p-2 border bg-white rounded-lg focus:outline-indigo-300 mr-2 mb-8"
                    type="file"
                    id="images"
                    onChange={onMutate}
                    max="6"
                    accept=".jpg,.png,.jpeg"
                    multiple
                    required
                />
                <button
                    type="submit"
                    className="bg-indigo-700 w-full text-sm font-semibold text-white py-3 rounded-xl"
                >
                    Update Listing
                </button>
            </form>
        </div>
    );
}

export default EditListing;

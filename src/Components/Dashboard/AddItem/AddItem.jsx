import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecret from "../../../Hooks/useAxiosSecret";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItem = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecret();



    const onSubmit = async (data) => {
        //upload image to imbb and get aurl
        const imageFile = { image: data.image[0] };
        console.log(imageFile)

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(res.data)
        if (res.data.success) {
            const item = {
                name: data.name,
                recipe: data.details,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price),
            }
            console.log(item)
            //post
            const resItem = await axiosSecure.post('/menu', item)
            if (resItem.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item Added",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }


    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const img = e.target.files[0];
            setImageURL(URL.createObjectURL(img));
        }
    };

    return (
        <div>
            <h2 className="text-4xl font-semibold text-center">Add Item</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0  w-full gap-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name <b className="text-red-500">*</b></span>
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Recipe Name is required" })}
                        placeholder="Recipe Name"
                        className="input input-bordered"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full">
                        <label className="label-text font-semibold">
                            Category <b className="text-red-500">*</b>
                        </label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className="select w-full input input-bordered"
                        >
                            <option value="" >
                                Select Category
                            </option>
                            <option value="Salad">salad</option>
                            <option value="Pizza">pizza</option>
                            <option value="Soup">soup</option>
                            <option value="Dessert">dessert</option>
                            <option value="Drink">drinks</option>
                            <option value="Popular">popular</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                        )}
                    </div>

                    <div className=" w-full form-control">
                        <span className="label-text font-semibold">Price <b className="text-red-500">*</b></span>
                        <input
                            type="number"
                            {...register("price", { required: "Price is required" })}
                            placeholder="Price"
                            className="input input-bordered"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                </div>
                <div className="form-control">
                    <textarea
                        {...register("details", { required: "Details is required" })}
                        className="input input-bordered pt-2"
                        placeholder="Recipe Details"
                    >
                    </textarea>
                    {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>}
                </div>
                <div className="form-control">
                    <span className="label-text font-semibold">Image <b className="text-red-500">*</b></span>
                    <input
                        type="file"
                        {...register("image", { required: "Image is required" })}
                        onChange={handleImageChange}
                        className="file-input w-full max-w-xs"
                    />
                    {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
                </div>
                <div>
                    {
                        imageURL &&
                        <div className="mt-4"><img src={imageURL} alt="Selected" className="max-w-full h-auto" />
                        </div>
                    }
                </div>
                <div className="form-control">
                    <button className="btn">
                        Add Item <FaUtensils></FaUtensils>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
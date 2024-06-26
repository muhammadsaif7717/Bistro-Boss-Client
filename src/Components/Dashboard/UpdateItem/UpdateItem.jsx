import { useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecret from "../../../Hooks/useAxiosSecret";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { id } = useParams()
    const items = useLoaderData();
    const clickedItem = items.find(item => item._id === id)


    const [imageURL, setImageURL] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecret();


    const onSubmit = async (data) => {
        //upload image to imbb and get aurl
        const imageFile = { image: data.image[0] };
        // console.log(imageFile)

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // console.log(res.data)
        if (res.data.success) {   
            const item = {
                name: data.name,
                recipe: data.details,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price),
            }
            // console.log(item)
            // update item to database
            const resItem = await axiosSecure.patch(`/menu/${clickedItem._id}`, item)
            if (resItem.data.modifiedCount>0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Item updated",
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
            <h2 className="text-4xl font-semibold text-center">Update Item: {clickedItem.name}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0  w-full gap-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name <b className="text-red-500">*</b></span>
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Recipe Name is required" })}
                        defaultValue={clickedItem.name}
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
                            defaultValue={clickedItem.category}
                            {...register("category", { required: "Category is required" })}
                            className="select w-full input input-bordered"
                        >
                            <option>Select Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drink">Drinks</option>
                            <option value="popular">Popular</option>
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
                            defaultValue={clickedItem.price}
                            className="input input-bordered"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                </div>
                <div className="form-control">
                    <textarea
                        {...register("details", { required: "Details is required" })}
                        className="input input-bordered pt-2"
                        defaultValue={clickedItem.recipe}
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

export default UpdateItem;
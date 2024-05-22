

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex gap-5">
            <img src={image} style={{ borderRadius: '0 200px 200px 200px ' }} className="w-[120px] rounded-xl border"  />
            <div className="flex flex-col gap-2">
                <h3>{name}------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;
import { Parallax } from 'react-parallax';


const MenuItemsCover = ({ img, title, desc }) => {
    return (
        <Parallax
        className='h-[380px]'
        blur={{ min: -50, max: 50 }}
        bgImage={img}
        bgImageAlt="the menu"
        strength={-200}
    >
        <div className="hero h-[380px]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-3xl font-semibold uppercase">{title}</h1>
                    <p className="mb-5">{desc}</p>
                </div>
            </div>
        </div>
        <div style={{ height: '200px' }} />
    </Parallax>
    );
};

export default MenuItemsCover;